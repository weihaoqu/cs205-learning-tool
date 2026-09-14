import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Record how long a page visit lasted.
 *
 * Deliberately unauthenticated: this is called via sendBeacon during page
 * unload, where session cookies are not reliably attached. The visitId is an
 * unguessable UUID issued by /api/tracking/pagevisit to the signed-in user who
 * opened the page.
 *
 * `duration` arrives from the browser, so it is bounded here rather than
 * stored as given. An abandoned tab once recorded 17.2 hours on a single page,
 * which alone accounted for 44% of all tracked study time and made the
 * instructor dashboard's "Total Time" column meaningless.
 */
const MAX_DURATION_SECONDS = 4 * 60 * 60; // beyond this it is an idle tab, not study time

export async function POST(request: NextRequest) {
  try {
    const { visitId, duration } = await request.json();

    if (typeof visitId !== 'string' || !visitId) {
      return NextResponse.json({ error: 'visitId is required' }, { status: 400 });
    }

    const seconds = Number(duration);
    if (!Number.isFinite(seconds) || seconds < 0) {
      return NextResponse.json({ error: 'duration must be a non-negative number' }, { status: 400 });
    }

    // Write at most once per visit, so a replayed or duplicated beacon cannot
    // extend a recorded duration.
    const result = await prisma.pageVisit.updateMany({
      where: { id: visitId, leftAt: null },
      data: {
        duration: Math.min(Math.round(seconds), MAX_DURATION_SECONDS),
        leftAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, updated: result.count });
  } catch (error) {
    console.error('Page leave tracking error:', error);
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
  }
}
