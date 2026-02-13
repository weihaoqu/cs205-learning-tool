import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// No auth required — sendBeacon doesn't reliably send cookies during page unload
export async function POST(request: NextRequest) {
  try {
    const { visitId, duration } = await request.json();
    if (!visitId) {
      return NextResponse.json({ error: 'visitId is required' }, { status: 400 });
    }

    await prisma.pageVisit.update({
      where: { id: visitId },
      data: {
        duration: Math.round(duration),
        leftAt: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Page leave tracking error:', error);
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
  }
}
