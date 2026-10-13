import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { CHURCH } from '../../../../lib/site-config';
import { saveDonation } from '../../../../lib/db';
import { checkRateLimit, getClientIp } from '../../../../lib/rate-limit';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    // Rate limit check
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

    if (!reference) {
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
          `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
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

        verificationResult = {
          verified: true,
          reference: paystackData.data.reference,
          amount: paystackData.data.amount / 100, // converted back from kobo
          currency: paystackData.data.currency,
          channel: paystackData.data.channel,
          paidAt: paystackData.data.paid_at,
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
      // 2. Dev / Simulation Mode (when PAYSTACK_SECRET_KEY is not yet added in .env.local)
      console.log('------------------------------------------------------------');
      console.log('[PAYSTACK VERIFY - DEV SIMULATION]');
      console.log(`Reference: ${reference}`);
      console.log(`Amount: ${currency} ${amount}`);
      console.log(`Category: ${category}`);
      console.log(`Donor: ${donorName} (${email || 'No email'})`);
      console.log('(To enable live server-side verification, add PAYSTACK_SECRET_KEY in .env.local)');
      console.log('------------------------------------------------------------');

      verificationResult = {
        verified: false,
        simulated: true,
        reference,
        amount: Number(amount) || 0,
        currency,
        channel: 'inline_card',
        paidAt: new Date().toISOString(),
      };
    }

    // Persist donation into church database
    saveDonation({
      reference,
      amount: verificationResult.amount,
      currency: verificationResult.currency,
      donorName,
      email,
      category,
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
        const symbol = currency === 'USD' ? '$' : '₦';
        const formattedAmount = `${symbol}${Number(amount).toLocaleString('en-US')}`;

        await resend.emails.send({
          from: fromAddress,
          to: [recipient],
          reply_to: email && email.includes('@') ? email : undefined,
          subject: `[CPC Kingdom Giving] ${formattedAmount} (${category || 'Offering'}) — ${donorName || 'Anonymous Giver'}`,
          text: `
NEW KINGDOM GIVING RECEIVED
--------------------------------------------------
Amount: ${formattedAmount} (${currency})
Category: ${category || 'General Offering'}
Donor Name: ${donorName || 'Anonymous Giver'}
Donor Email: ${email || 'N/A'}
Gateway: Paystack Online
Transaction Reference: ${reference}
Status: Successful / Paid
Verified with Paystack: ${verificationResult.verified ? 'Yes (Live)' : 'Simulation'}
          `.trim(),
        });
      } catch (emailErr) {
        // Log but don't fail the donor's transaction if admin email dispatch fails
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
