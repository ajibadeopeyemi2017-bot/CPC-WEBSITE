import crypto from 'crypto';
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
  getDatabaseStatus,
} from '../../../lib/db';
import { checkRateLimit, getClientIp } from '../../../lib/rate-limit';
import { sanitizeText } from '../../../lib/sanitize';

export const runtime = 'nodejs';

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'cpc2026admin';

/**
 * Constant-time string comparison to prevent timing attacks
 */
function timingSafeCompare(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function isAuthorized(request) {
  const authHeader = request.headers.get('x-admin-token') || '';
  return timingSafeCompare(authHeader, ADMIN_PASSCODE);
}

/**
 * Admin Authentication & Token Verification with Brute-Force Rate Limiting
 */
export async function POST(request) {
  try {
    const clientIp = getClientIp(request);

    // Limit to 5 attempts per 15 minutes per IP to block automated brute-forcing
    const rateCheck = checkRateLimit(`admin-auth-${clientIp}`, 5, 15 * 60);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many login attempts. Access temporarily locked for ${rateCheck.resetInSeconds} seconds.`,
        },
        { status: 429 }
      );
    }

    const { passcode } = await request.json();

    if (timingSafeCompare(passcode, ADMIN_PASSCODE)) {
      return NextResponse.json({
        success: true,
        token: ADMIN_PASSCODE,
        message: 'Authentication successful',
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: `Incorrect pastoral admin passcode. (${rateCheck.remaining} attempts remaining)`,
      },
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
      { success: false, error: 'Unauthorized access to CPC Pastoral Portal. Valid token header required.' },
      { status: 401 }
    );
  }

  try {
    const [visitors, prayers, testimonies, volunteers, donations, stats, dbStatus] = await Promise.all([
      getVisitors(),
      getPrayers(),
      getTestimonies({ approvedOnly: false }),
      getVolunteers(),
      getDonations(),
      getDonationStats(),
      getDatabaseStatus(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        visitors,
        prayers,
        testimonies,
        volunteers,
        donations,
        dbStatus,
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

  // Rate limit admin state mutations (60 actions/minute)
  const clientIp = getClientIp(request);
  const actionRate = checkRateLimit(`admin-patch-${clientIp}`, 60, 60);
  if (!actionRate.allowed) {
    return NextResponse.json(
      { success: false, error: 'Action rate limit exceeded. Please wait a moment.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { action, id, value } = body;
    const cleanId = sanitizeText(id, 64);

    if (action === 'approve_testimony') {
      const updated = await approveTestimony(cleanId, value !== false);
      return NextResponse.json({ success: true, updated });
    }

    if (action === 'update_visitor_status') {
      const cleanStatus = sanitizeText(value || 'confirmed', 32);
      const updated = await updateVisitorStatus(cleanId, cleanStatus);
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

