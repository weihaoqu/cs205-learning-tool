import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    // Generate all 30 days (including today)
    const days: string[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toISOString().split('T')[0]);
    }

    // Query distinct users per day using raw SQL for efficient date grouping
    const results = await prisma.$queryRaw<
      { day: string; count: bigint }[]
    >`
      SELECT
        TO_CHAR("visitedAt", 'YYYY-MM-DD') AS day,
        COUNT(DISTINCT "userId") AS count
      FROM "PageVisit"
      WHERE "visitedAt" >= ${thirtyDaysAgo}
      GROUP BY day
      ORDER BY day
    `;

    // Build a lookup map from the DB results
    const countMap: Record<string, number> = {};
    for (const row of results) {
      countMap[row.day] = Number(row.count);
    }

    // Fill in all 30 days, defaulting missing days to 0
    const activity = days.map((date) => ({
      date,
      count: countMap[date] ?? 0,
    }));

    return NextResponse.json(activity);
  } catch (error) {
    console.error('Admin activity error:', error);
    return NextResponse.json({ error: 'Failed to fetch activity data' }, { status: 500 });
  }
}
