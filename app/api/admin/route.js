import { NextResponse } from 'next/server';
import {
  getVisitors,
  updateVisitorStatus,
  getPrayers,
  getTestimonies,
  approveTestimony,
  getVolunteers,
  getDonations,
  getDonationStats,
} from '../../../lib/db';

export const runtime = 'nodejs';

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'cpc2026admin';

function isAuthorized(request) {
  const authHeader = request.headers.get('x-admin-token') || '';
  const urlPasscode = request.nextUrl.searchParams.get('token') || '';
  return authHeader === ADMIN_PASSCODE || urlPasscode === ADMIN_PASSCODE;
}

/**
 * Admin Authentication & Token Verification
 */
export async function POST(request) {
  try {
    const { passcode } = await request.json();

    if (passcode === ADMIN_PASSCODE) {
      return NextResponse.json({
        success: true,
        token: ADMIN_PASSCODE,
        message: 'Authentication successful',
      });
    }

    return NextResponse.json(
      { success: false, error: 'Incorrect pastoral admin passcode.' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * Fetch all administrative data (visitors, prayers, testimonies, volunteers, giving)
 */
export async function GET(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized access to CPC Pastoral Portal' },
      { status: 401 }
    );
  }

  try {
    const visitors = getVisitors();
    const prayers = getPrayers();
    const testimonies = getTestimonies({ approvedOnly: false });
    const volunteers = getVolunteers();
    const donations = getDonations();
    const stats = getDonationStats();

    return NextResponse.json({
      success: true,
      data: {
        visitors,
        prayers,
        testimonies,
        volunteers,
        donations,
        stats: {
          ...stats,
          totalVisitors: visitors.length,
          totalPrayers: prayers.length,
          totalTestimonies: testimonies.length,
          pendingTestimonies: testimonies.filter((t) => !t.approved).length,
          totalVolunteers: volunteers.length,
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * Administrative Actions: Approve testimony, update guest status, etc.
 */
export async function PATCH(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { action, id, value } = body;

    if (action === 'approve_testimony') {
      const updated = approveTestimony(id, value !== false);
      return NextResponse.json({ success: true, updated });
    }

    if (action === 'update_visitor_status') {
      const updated = updateVisitorStatus(id, value || 'confirmed');
      return NextResponse.json({ success: true, updated });
    }

    return NextResponse.json(
      { success: false, error: 'Unsupported admin action' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
