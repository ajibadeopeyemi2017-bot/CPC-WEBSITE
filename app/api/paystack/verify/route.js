import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { CHURCH } from '../../../../lib/site-config';
import { saveDonation } from '../../../../lib/db';
import { checkRateLimit, getClientIp } from '../../../../lib/rate-limit';
import { sanitizeText, sanitizeEmail, escapeHtml } from '../../../../lib/sanitize';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    // Rate limit check: 15 verification calls per minute per IP
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`paystack-verify-${clientIp}`, 15, 60);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait a moment.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { reference, amount, currency = 'NGN', donorName, email, category } = body;

    const cleanRef = sanitizeText(reference, 100);
    const cleanDonorName = sanitizeText(donorName, 100) || 'Anonymous Giver';
    const cleanEmail = sanitizeEmail(email);
    const cleanCategory = sanitizeText(category, 80) || 'General Offering';
    const cleanCurrency = currency === 'USD' ? 'USD' : 'NGN';
    const expectedAmount = Math.max(0, Number(amount) || 0);

    if (!cleanRef) {
      return NextResponse.json(
        { success: false, error: 'Transaction reference is required for verification.' },
        { status: 400 }
      );
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY?.trim();
    let verificationResult = null;

    // 1. If PAYSTACK_SECRET_KEY is configured, verify with official Paystack API
    if (secretKey) {
      try {
        const paystackRes = await fetch(
          `https://api.paystack.co/transaction/verify/${encodeURIComponent(cleanRef)}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${secretKey}`,
              'Content-Type': 'application/json',
            },
            cache: 'no-store',
          }
        );

        const paystackData = await paystackRes.json();

        if (!paystackData.status || paystackData.data?.status !== 'success') {
          return NextResponse.json(
            {
              success: false,
              error: paystackData.message || 'Payment verification failed with Paystack.',
            },
            { status: 400 }
          );
        }

        const paidAmount = Number(paystackData.data.amount) / 100; // converted back from kobo
        const paidCurrency = String(paystackData.data.currency || '').toUpperCase();

        // Security check: verify that actual paid amount matches client expected amount
        if (expectedAmount > 0 && Math.abs(paidAmount - expectedAmount) > 0.01) {
          console.warn(`[PAYSTACK VERIFY] Amount mismatch for ${cleanRef}: expected ${expectedAmount}, received ${paidAmount}`);
          return NextResponse.json(
            {
              success: false,
              error: `Amount mismatch: Paid amount does not match expected transaction value.`,
            },
            { status: 400 }
          );
        }

        // Security check: verify currency matches
        if (paidCurrency && paidCurrency !== cleanCurrency.toUpperCase()) {
          return NextResponse.json(
            { success: false, error: 'Currency mismatch on transaction record.' },
            { status: 400 }
          );
        }

        verificationResult = {
          verified: true,
          reference: paystackData.data.reference,
          amount: paidAmount,
          currency: paidCurrency || cleanCurrency,
          channel: paystackData.data.channel || 'card',
          paidAt: paystackData.data.paid_at || new Date().toISOString(),
          gatewayResponse: paystackData.data.gateway_response,
        };
      } catch (err) {
        console.error('[API/PAYSTACK/VERIFY] Error contacting Paystack:', err);
        return NextResponse.json(
          { success: false, error: 'Could not connect to Paystack servers to verify payment.' },
          { status: 502 }
        );
      }
    } else {
      // 2. Production safety guard: do NOT allow simulated giving in live production
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json(
          {
            success: false,
            error: 'Live payment verification is unavailable. Server configuration in progress.',
          },
          { status: 503 }
        );
      }

      // Dev / Localhost Simulation Mode
      console.log('------------------------------------------------------------');
      console.log('[PAYSTACK VERIFY - DEV SIMULATION]');
      console.log(`Reference: ${cleanRef}`);
      console.log(`Amount: ${cleanCurrency} ${expectedAmount}`);
      console.log(`Category: ${cleanCategory}`);
      console.log(`Donor: ${cleanDonorName} (${cleanEmail || 'No email'})`);
      console.log('(To enable live server-side verification, add PAYSTACK_SECRET_KEY in .env.local)');
      console.log('------------------------------------------------------------');

      verificationResult = {
        verified: false,
        simulated: true,
        reference: cleanRef,
        amount: expectedAmount,
        currency: cleanCurrency,
        channel: 'inline_card',
        paidAt: new Date().toISOString(),
      };
    }

    // Persist verified donation into church database
    await saveDonation({
      reference: verificationResult.reference,
      amount: verificationResult.amount,
      currency: verificationResult.currency,
      donorName: cleanDonorName,
      email: cleanEmail,
      category: cleanCategory,
      channel: verificationResult.channel || 'inline_card',
      verified: Boolean(verificationResult.verified),
      status: 'success',
      paidAt: verificationResult.paidAt,
    });

    // 3. Dispatch an email notification to the church administrators
    const recipient = process.env.NOTIFICATION_RECIPIENT_EMAIL || CHURCH.email || 'christthepotterchurch@gmail.com';
    const resendApiKey = process.env.RESEND_API_KEY?.trim();

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const fromAddress = process.env.NOTIFICATION_FROM_EMAIL || 'Christ The Potter Church <onboarding@resend.dev>';
        const symbol = verificationResult.currency === 'USD' ? '$' : '₦';
        const formattedAmount = `${symbol}${Number(verificationResult.amount).toLocaleString('en-US')}`;

        await resend.emails.send({
          from: fromAddress,
          to: [recipient],
          reply_to: cleanEmail && cleanEmail.includes('@') ? cleanEmail : undefined,
          subject: `[CPC Kingdom Giving] ${formattedAmount} (${cleanCategory}) — ${cleanDonorName}`,
          text: `
NEW KINGDOM GIVING RECEIVED
--------------------------------------------------
Amount: ${formattedAmount} (${verificationResult.currency})
Category: ${cleanCategory}
Donor Name: ${cleanDonorName}
Donor Email: ${cleanEmail || 'N/A'}
Gateway: Paystack Online
Transaction Reference: ${verificationResult.reference}
Status: Successful / Paid
Verified with Paystack: ${verificationResult.verified ? 'Yes (Live)' : 'Simulation'}
          `.trim(),
        });
      } catch (emailErr) {
        console.warn('[API/PAYSTACK/VERIFY] Failed to dispatch admin receipt email:', emailErr.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Giving confirmed and recorded successfully.',
      data: verificationResult,
    });
  } catch (error) {
    console.error('[API/PAYSTACK/VERIFY] Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

