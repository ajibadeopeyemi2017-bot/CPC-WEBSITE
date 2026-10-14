import { NextResponse } from 'next/server';
import { getPrayers, getTestimonies, togglePrayerAmen, toggleTestimonyPraise } from '../../../lib/db';
import { checkRateLimit, getClientIp } from '../../../lib/rate-limit';
import { sanitizeText } from '../../../lib/sanitize';

export const runtime = 'nodejs';

/**
 * Public Feed for Community Prayer Wall and Approved Praise Reports
 */
export async function GET() {
  try {
    const [allPrayers, testimonies] = await Promise.all([
      getPrayers(),
      getTestimonies({ approvedOnly: true }),
    ]);
    const prayers = (allPrayers || []).filter((p) => !p.isConfidential);

    return NextResponse.json({
      success: true,
      prayers,
      testimonies,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * Handle "Amen" agreement and "Praise" reactions with rate limiting
 */
export async function POST(request) {
  try {
    const clientIp = getClientIp(request);
    // Allow up to 30 reaction clicks per minute per client IP to prevent bot inflation
    const rateCheck = checkRateLimit(`reaction-${clientIp}`, 30, 60);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many reactions. Please wait a moment.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { action, id } = body;

    if (!action || !id) {
      return NextResponse.json(
        { success: false, error: 'Action and ID required' },
        { status: 400 }
      );
    }

    const cleanId = sanitizeText(id, 64);

    if (action === 'amen') {
      const updated = await togglePrayerAmen(cleanId);
      return NextResponse.json({ success: true, updated });
    }

    if (action === 'praise') {
      const updated = await toggleTestimonyPraise(cleanId);
      return NextResponse.json({ success: true, updated });
    }

    return NextResponse.json(
      { success: false, error: 'Unknown action' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

