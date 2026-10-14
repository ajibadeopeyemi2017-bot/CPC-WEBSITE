import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { saveDonation } from '../../../../lib/db';
import { CHURCH } from '../../../../lib/site-config';
import { sanitizeText, sanitizeEmail } from '../../../../lib/sanitize';

export const runtime = 'nodejs';

/**
 * Paystack Asynchronous Server-to-Server Webhook Handler
 * Securely receives and verifies payment events via HMAC SHA512 signature.
 */
export async function POST(request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-paystack-signature');
    const secretKey = process.env.PAYSTACK_SECRET_KEY?.trim();

    // 1. Verify webhook signature if PAYSTACK_SECRET_KEY is configured
    if (secretKey) {
      const hash = crypto
        .createHmac('sha512', secretKey)
        .update(rawBody)
        .digest('hex');

      const hashBuf = Buffer.from(hash, 'utf-8');
      const sigBuf = Buffer.from(signature || '', 'utf-8');

      if (hashBuf.length !== sigBuf.length || !crypto.timingSafeEqual(hashBuf, sigBuf)) {
        console.warn('[API/PAYSTACK/WEBHOOK] Invalid HMAC signature received.');
        return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
      }
    } else {
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ message: 'Webhook signing key not configured' }, { status: 503 });
      }
    }

    const payload = JSON.parse(rawBody);
    const { event, data } = payload;

    // 2. Handle successful charge event
    if (event === 'charge.success') {
      const reference = sanitizeText(data.reference, 100);
      const amount = (Number(data.amount) || 0) / 100; // Convert from kobo/cents
      const currency = data.currency === 'USD' ? 'USD' : 'NGN';
      const email = sanitizeEmail(data.customer?.email);

      // Extract custom metadata fields configured in openPaystackPayment
      let donorName = 'Anonymous Giver';
      let category = 'General Offering';

      if (data.metadata?.custom_fields && Array.isArray(data.metadata.custom_fields)) {
        const nameField = data.metadata.custom_fields.find((f) => f.variable_name === 'donor_name');
        const catField = data.metadata.custom_fields.find((f) => f.variable_name === 'giving_category');
        if (nameField && nameField.value) donorName = sanitizeText(nameField.value, 100);
        if (catField && catField.value) category = sanitizeText(catField.value, 80);
      }

      // 3. Persist the giving transaction into the database
      const recorded = await saveDonation({
        reference,
        amount,
        currency,
        donorName,
        email,
        category,
        channel: sanitizeText(data.channel, 50) || 'paystack_webhook',
        verified: true,
        status: 'success',
        paidAt: data.paid_at || new Date().toISOString(),
      });

      console.log(`[PAYSTACK WEBHOOK] Recorded giving: ${currency} ${amount} (${reference})`);

      // 4. Dispatch notification email to church administrators via Resend
      const resendApiKey = process.env.RESEND_API_KEY?.trim();
      const recipient = process.env.NOTIFICATION_RECIPIENT_EMAIL || CHURCH.email || 'christthepotterchurch@gmail.com';

      if (resendApiKey) {
        try {
          const resend = new Resend(resendApiKey);
          const fromAddress = process.env.NOTIFICATION_FROM_EMAIL || 'Christ The Potter Church <onboarding@resend.dev>';
          const symbol = currency === 'USD' ? '$' : '₦';
          const formattedAmount = `${symbol}${amount.toLocaleString('en-US')}`;

          await resend.emails.send({
            from: fromAddress,
            to: [recipient],
            reply_to: email && email.includes('@') ? email : undefined,
            subject: `[CPC Giving Webhook] ${formattedAmount} (${category}) — ${donorName}`,
            text: `
NEW KINGDOM GIVING VERIFIED VIA WEBHOOK
--------------------------------------------------
Amount: ${formattedAmount} (${currency})
Category: ${category}
Donor: ${donorName} (${email || 'No email'})
Reference: ${reference}
Channel: ${data.channel || 'Paystack'}
Paid At: ${data.paid_at || new Date().toISOString()}
            `.trim(),
          });
        } catch (emailErr) {
          console.warn('[API/PAYSTACK/WEBHOOK] Failed to dispatch admin receipt email:', emailErr.message);
        }
      }
    }

    // Always respond with 200 OK to acknowledge receipt to Paystack
    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (error) {
    console.error('[API/PAYSTACK/WEBHOOK] Error processing webhook:', error);
    return NextResponse.json(
      { message: 'Error processing webhook', error: error.message },
      { status: 500 }
    );
  }
}

