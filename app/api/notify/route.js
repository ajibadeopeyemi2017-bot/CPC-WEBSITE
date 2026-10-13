import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { CHURCH } from '../../../lib/site-config';
import { saveVisitor, savePrayer, saveTestimony, saveVolunteer } from '../../../lib/db';
import { checkRateLimit, getClientIp } from '../../../lib/rate-limit';

export const runtime = 'nodejs';

function buildEmailContent(type, data) {
  const timestamp = new Date().toLocaleString('en-GB', {
    timeZone: 'Africa/Lagos',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  if (type === 'visit') {
    const subject = `[CPC Guest RSVP] ${data.name || 'Visitor'} — ${data.serviceDate || 'Upcoming Service'}`;
    const text = `
NEW FIRST-TIME GUEST PRE-REGISTRATION
--------------------------------------------------
Time: ${timestamp}
Guest Name: ${data.name || 'N/A'}
Phone Number: ${data.phone || 'N/A'}
Email: ${data.email || 'N/A'}
Target Service: ${data.serviceDate || 'N/A'}
Party Size: ${data.attendeeCount || '1'}
Coming with Children: ${data.hasKids || 'No'} ${data.kidAges ? `(Ages: ${data.kidAges})` : ''}
Special Needs / Assistance: ${data.specialAssistance || 'None noted'}

Please alert the Ushers & Hospitality Directorate to prepare their welcome pack and reserve guest seating.
    `.trim();

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background: #0f4a17; color: #ffffff; padding: 24px 28px;">
          <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #dcefd3;">Christ The Potter Church &bull; Protocol Desk</p>
          <h2 style="margin: 6px 0 0; font-size: 22px; font-weight: 700;">New First-Time Guest RSVP</h2>
        </div>
        <div style="padding: 28px;">
          <p style="margin: 0 0 20px; font-size: 15px; color: #334155; line-height: 1.5;">
            A visitor has pre-registered to worship at the main auditorium in Ile-Ife.
          </p>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569; width: 35%; border-bottom: 1px solid #e2e8f0;">Full Name</td>
              <td style="padding: 10px 12px; color: #0f172a; font-weight: 700; border-bottom: 1px solid #e2e8f0;">${data.name || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Phone Number</td>
              <td style="padding: 10px 12px; color: #0f172a; border-bottom: 1px solid #e2e8f0;"><a href="tel:${data.phone}" style="color: #0f4a17; font-weight: 600;">${data.phone || 'N/A'}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Email</td>
              <td style="padding: 10px 12px; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${data.email ? `<a href="mailto:${data.email}">${data.email}</a>` : 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Service Reserved</td>
              <td style="padding: 10px 12px; color: #0f4a17; font-weight: 700; border-bottom: 1px solid #e2e8f0;">${data.serviceDate || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Party Size</td>
              <td style="padding: 10px 12px; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${data.attendeeCount || '1'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Children</td>
              <td style="padding: 10px 12px; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${data.hasKids || 'No'} ${data.kidAges ? `(Ages: ${data.kidAges})` : ''}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Special Notes</td>
              <td style="padding: 10px 12px; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${data.specialAssistance || 'None noted'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569;">Submission Time</td>
              <td style="padding: 10px 12px; color: #64748b; font-size: 13px;">${timestamp}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 14px; background: #eef7ea; border-radius: 8px; font-size: 13px; color: #17611f; line-height: 1.5;">
            <strong>Action for Ushers:</strong> Ensure a first-timer reception package and welcome card are ready for this guest on arrival.
          </div>
        </div>
      </div>
    `;
    return { subject, text, html };
  }

  if (type === 'prayer') {
    const subject = `[CPC Prayer Request] (${data.category || 'General'}) from ${data.name || 'Anonymous'}`;
    const text = `
NEW PRAYER REQUEST RECEIVED
--------------------------------------------------
Time: ${timestamp}
Name: ${data.name || 'Anonymous Believer'}
Phone: ${data.phone || 'N/A'}
Email: ${data.email || 'N/A'}
Prayer Category: ${data.category || 'General'}
Confidential: ${data.isConfidential ? 'Yes (Pastoral Altar Only)' : 'Public prayer agreement'}

PRAYER BURDEN / DETAILS:
${data.details || 'No details specified'}

Apostle Oluwafunminiyi Olufisayo and the School of Prayer intercessors will lift this need before the Lord.
    `.trim();

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background: #1e3a6c; color: #ffffff; padding: 24px 28px;">
          <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #93c5fd;">School of Prayer Intercession Altar</p>
          <h2 style="margin: 6px 0 0; font-size: 22px; font-weight: 700;">New Prayer Request</h2>
        </div>
        <div style="padding: 28px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
            <tr>
              <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569; width: 35%; border-bottom: 1px solid #e2e8f0;">Name</td>
              <td style="padding: 10px 12px; color: #0f172a; font-weight: 700; border-bottom: 1px solid #e2e8f0;">${data.name || 'Anonymous Believer'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Category</td>
              <td style="padding: 10px 12px; color: #1e3a6c; font-weight: 700; border-bottom: 1px solid #e2e8f0;">${data.category || 'General Intercession'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Phone</td>
              <td style="padding: 10px 12px; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${data.phone ? `<a href="tel:${data.phone}" style="color: #1e3a6c; font-weight: 600;">${data.phone}</a>` : 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Email</td>
              <td style="padding: 10px 12px; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${data.email ? `<a href="mailto:${data.email}">${data.email}</a>` : 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569;">Submission Time</td>
              <td style="padding: 10px 12px; color: #64748b; font-size: 13px;">${timestamp}</td>
            </tr>
          </table>
          <div style="background: #f1f5f9; border-left: 4px solid #1e3a6c; padding: 16px; border-radius: 4px;">
            <p style="margin: 0 0 6px; font-weight: 700; font-size: 13px; text-transform: uppercase; color: #475569;">The Prayer Burden / Petition:</p>
            <p style="margin: 0; font-size: 15px; color: #0f172a; line-height: 1.6; white-space: pre-wrap;">${data.details || 'No details provided'}</p>
          </div>
        </div>
      </div>
    `;
    return { subject, text, html };
  }

  if (type === 'volunteer') {
    const subject = `[CPC Volunteer Application] ${data.name || 'Member'} — ${data.department || 'Ministry'}`;
    const text = `
NEW MINISTRY WORKER / VOLUNTEER APPLICATION
--------------------------------------------------
Time: ${timestamp}
Name: ${data.name || 'N/A'}
Phone / WhatsApp: ${data.phone || 'N/A'}
Email: ${data.email || 'N/A'}
Department: ${data.department || 'N/A'}
Experience / Calling: ${data.experience || 'None noted'}

Please follow up with this believer within 48 hours.
    `.trim();

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background: #0f4a17; color: #ffffff; padding: 24px 28px;">
          <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #dcefd3;">Christ The Potter Church &bull; Helps Ministry</p>
          <h2 style="margin: 6px 0 0; font-size: 22px; font-weight: 700;">New Ministry Worker Application</h2>
        </div>
        <div style="padding: 28px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
            <tr>
              <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569; width: 35%; border-bottom: 1px solid #e2e8f0;">Full Name</td>
              <td style="padding: 10px 12px; color: #0f172a; font-weight: 700; border-bottom: 1px solid #e2e8f0;">${data.name || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Department</td>
              <td style="padding: 10px 12px; color: #0f4a17; font-weight: 700; border-bottom: 1px solid #e2e8f0;">${data.department || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Phone / WhatsApp</td>
              <td style="padding: 10px 12px; color: #0f172a; border-bottom: 1px solid #e2e8f0;"><a href="tel:${data.phone}" style="color: #0f4a17; font-weight: 600;">${data.phone || 'N/A'}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Email</td>
              <td style="padding: 10px 12px; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${data.email ? `<a href="mailto:${data.email}">${data.email}</a>` : 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569;">Submission Time</td>
              <td style="padding: 10px 12px; color: #64748b; font-size: 13px;">${timestamp}</td>
            </tr>
          </table>
          <div style="background: #f8fafc; border-left: 4px solid #0f4a17; padding: 16px; border-radius: 4px;">
            <p style="margin: 0 0 6px; font-weight: 700; font-size: 13px; text-transform: uppercase; color: #475569;">Prior Experience / Notes:</p>
            <p style="margin: 0; font-size: 14px; color: #0f172a; line-height: 1.6; white-space: pre-wrap;">${data.experience || 'None noted'}</p>
          </div>
        </div>
      </div>
    `;
    return { subject, text, html };
  }

  if (type === 'giving') {
    const symbol = data.currency === 'USD' ? '$' : '₦';
    const formattedAmount = `${symbol}${Number(data.amount).toLocaleString('en-US')}`;
    const subject = `[CPC Kingdom Giving] ${formattedAmount} (${data.category || 'Offering'}) — ${data.name || 'Anonymous Giver'}`;
    const text = `
NEW KINGDOM GIVING RECEIVED
--------------------------------------------------
Time: ${timestamp}
Amount: ${formattedAmount} (${data.currency || 'NGN'})
Category: ${data.category || 'General Offering'}
Donor Name: ${data.name || 'Anonymous Giver'}
Donor Email: ${data.email || 'N/A'}
Gateway: Paystack Online
Transaction Reference: ${data.reference || 'N/A'}
Status: Confirmed / Paid

“Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver.” — 2 Cor. 9:7
    `.trim();

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background: #0f4a17; color: #ffffff; padding: 24px 28px;">
          <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #dcefd3;">Christ The Potter Church &bull; Treasury & Finance</p>
          <h2 style="margin: 6px 0 0; font-size: 22px; font-weight: 700;">New Kingdom Giving Received</h2>
        </div>
        <div style="padding: 28px;">
          <div style="text-align: center; padding: 20px 0; border-bottom: 1px solid #e2e8f0;">
            <p style="margin: 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b;">Amount Given</p>
            <h1 style="margin: 4px 0 0; font-size: 36px; color: #0f4a17; font-weight: 800;">${formattedAmount}</h1>
            <span style="display: inline-block; margin-top: 6px; padding: 4px 10px; background: #eef7ea; color: #17611f; font-size: 12px; font-weight: 600; border-radius: 999px;">
              ${data.category || 'General Offering'}
            </span>
          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-top: 20px;">
            <tr>
              <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569; width: 35%; border-bottom: 1px solid #e2e8f0;">Donor Name</td>
              <td style="padding: 10px 12px; color: #0f172a; font-weight: 700; border-bottom: 1px solid #e2e8f0;">${data.name || 'Anonymous Giver'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Donor Email</td>
              <td style="padding: 10px 12px; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${data.email ? `<a href="mailto:${data.email}">${data.email}</a>` : 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Reference ID</td>
              <td style="padding: 10px 12px; font-family: monospace; color: #0f172a; font-size: 13px; border-bottom: 1px solid #e2e8f0;">${data.reference || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Payment Channel</td>
              <td style="padding: 10px 12px; color: #0f172a; border-bottom: 1px solid #e2e8f0;">Paystack Inline</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569;">Transaction Time</td>
              <td style="padding: 10px 12px; color: #64748b; font-size: 13px;">${timestamp}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 14px; background: #f8fafc; border-left: 4px solid #0f4a17; border-radius: 4px; font-size: 13px; color: #334155; line-height: 1.5;">
            <em>“And God is able to make all grace abound toward you; that ye, always having all sufficiency in all things, may abound to every good work.” &mdash; 2 Corinthians 9:8</em>
          </div>
        </div>
      </div>
    `;
    return { subject, text, html };
  }

  if (type === 'testimony') {
    const subject = `[CPC Praise Report] (${data.category || 'Testimony'}) — ${data.name || 'A Believer'}`;
    const text = `
NEW PRAISE REPORT / TESTIMONY RECEIVED
--------------------------------------------------
Time: ${timestamp}
Name: ${data.name || 'Anonymous Believer'}
Category: ${data.category || 'Divine Encounter'}
Title / Summary: ${data.title || 'Answered Prayer'}
Phone: ${data.phone || 'N/A'}
Email: ${data.email || 'N/A'}
Permission to Share in Church: ${data.allowShare !== false ? 'Yes (Granted)' : 'No (Pastoral Office Only)'}

TESTIMONY DETAILS:
${data.details || 'No details provided'}

“And they overcame him by the blood of the Lamb, and by the word of their testimony.” — Revelation 12:11
    `.trim();

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background: #92400e; color: #ffffff; padding: 24px 28px;">
          <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #fde68a;">Christ The Potter Church &bull; Thanksgiving & Praise Altar</p>
          <h2 style="margin: 6px 0 0; font-size: 22px; font-weight: 700;">New Praise Report / Testimony</h2>
        </div>
        <div style="padding: 28px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
            <tr>
              <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569; width: 35%; border-bottom: 1px solid #e2e8f0;">Name</td>
              <td style="padding: 10px 12px; color: #0f172a; font-weight: 700; border-bottom: 1px solid #e2e8f0;">${data.name || 'Anonymous Believer'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Category</td>
              <td style="padding: 10px 12px; color: #92400e; font-weight: 700; border-bottom: 1px solid #e2e8f0;">${data.category || 'Divine Encounter'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Testimony Title</td>
              <td style="padding: 10px 12px; color: #0f172a; font-weight: 600; border-bottom: 1px solid #e2e8f0;">${data.title || 'Answered Prayer'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Phone / WhatsApp</td>
              <td style="padding: 10px 12px; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${data.phone ? `<a href="tel:${data.phone}" style="color: #0f4a17; font-weight: 600;">${data.phone}</a>` : 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Email</td>
              <td style="padding: 10px 12px; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${data.email ? `<a href="mailto:${data.email}">${data.email}</a>` : 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Share in Church</td>
              <td style="padding: 10px 12px; color: #0f172a; border-bottom: 1px solid #e2e8f0;"><strong>${data.allowShare !== false ? 'Yes (Permission granted to share)' : 'No (Private to pastors)'}</strong></td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569;">Submission Time</td>
              <td style="padding: 10px 12px; color: #64748b; font-size: 13px;">${timestamp}</td>
            </tr>
          </table>
          <div style="background: #fffbeb; border-left: 4px solid #b45309; padding: 16px; border-radius: 4px;">
            <p style="margin: 0 0 6px; font-weight: 700; font-size: 13px; text-transform: uppercase; color: #92400e;">The Testimony Story:</p>
            <p style="margin: 0; font-size: 15px; color: #0f172a; line-height: 1.6; white-space: pre-wrap;">${data.details || 'No details provided'}</p>
          </div>
          <div style="margin-top: 20px; font-size: 12px; color: #64748b; font-style: italic;">
            “And they overcame him by the blood of the Lamb, and by the word of their testimony.” &mdash; Revelation 12:11
          </div>
        </div>
      </div>
    `;
    return { subject, text, html };
  }

  return {
    subject: `[CPC Notification] New submission`,
    text: JSON.stringify(data, null, 2),
    html: `<pre>${JSON.stringify(data, null, 2)}</pre>`,
  };
}

export async function POST(request) {
  try {
    // Rate limit check
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`notify-${clientIp}`, 12, 60);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many submissions. Please wait a moment.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { type, data } = body;

    if (!type || !data) {
      return NextResponse.json(
        { success: false, error: 'Missing type or data in request body' },
        { status: 400 }
      );
    }

    if (!data.name && !data.phone) {
      return NextResponse.json(
        { success: false, error: 'Please provide at least a name or phone number' },
        { status: 400 }
      );
    }

    // Persist submission into church database
    if (type === 'visit') {
      saveVisitor(data);
    } else if (type === 'prayer') {
      savePrayer(data);
    } else if (type === 'testimony') {
      saveTestimony(data);
    } else if (type === 'volunteer') {
      saveVolunteer(data);
    }

    const recipient = process.env.NOTIFICATION_RECIPIENT_EMAIL || CHURCH.email || 'christthepotterchurch@gmail.com';
    const fromAddress = process.env.NOTIFICATION_FROM_EMAIL || 'Christ The Potter Church <onboarding@resend.dev>';
    const apiKey = process.env.RESEND_API_KEY?.trim();

    const { subject, text, html } = buildEmailContent(type, data);

    // If RESEND_API_KEY is configured, dispatch the live email
    if (apiKey) {
      const resend = new Resend(apiKey);
      const emailPayload = {
        from: fromAddress,
        to: [recipient],
        subject,
        text,
        html,
      };

      if (data.email && data.email.includes('@')) {
        emailPayload.reply_to = data.email;
      }

      const response = await resend.emails.send(emailPayload);

      if (response.error) {
        console.error('[API/NOTIFY] Resend API error:', response.error);
        return NextResponse.json(
          { success: false, error: response.error.message || 'Failed to dispatch email' },
          { status: 502 }
        );
      }

      return NextResponse.json({
        success: true,
        id: response.data?.id,
        recipient,
        message: 'Email dispatched successfully via Resend',
      });
    }

    // DEV FALLBACK: If RESEND_API_KEY is not set yet, log neatly to the server console
    console.log('------------------------------------------------------------');
    console.log(`[CPC NOTIFICATION - DEV SIMULATION MODE]`);
    console.log(`To: ${recipient}`);
    console.log(`Subject: ${subject}`);
    console.log(`Payload Summary:`, {
      type,
      name: data.name,
      phone: data.phone,
      email: data.email,
    });
    console.log(`(Add RESEND_API_KEY in .env.local to dispatch live emails to ${recipient})`);
    console.log('------------------------------------------------------------');

    return NextResponse.json({
      success: true,
      devMode: true,
      recipient,
      message: 'Submission received and logged (simulation mode).',
    });
  } catch (error) {
    console.error('[API/NOTIFY] Error processing request:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
