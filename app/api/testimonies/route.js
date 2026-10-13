import { NextResponse } from 'next/server';
import { getPrayers, getTestimonies, togglePrayerAmen, toggleTestimonyPraise } from '../../../lib/db';

export const runtime = 'nodejs';

/**
 * Public Feed for Community Prayer Wall and Approved Praise Reports
 */
export async function GET() {
  try {
    const prayers = getPrayers().filter((p) => !p.isConfidential);
    const testimonies = getTestimonies({ approvedOnly: true });

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
 * Handle "Amen" agreement and "Praise" reactions
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { action, id } = body;

    if (!action || !id) {
      return NextResponse.json(
        { success: false, error: 'Action and ID required' },
        { status: 400 }
      );
    }

    if (action === 'amen') {
      const updated = togglePrayerAmen(id);
      return NextResponse.json({ success: true, updated });
    }

    if (action === 'praise') {
      const updated = toggleTestimonyPraise(id);
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
