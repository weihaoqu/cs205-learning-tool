import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/adminGuard';

export async function GET(request: Request) {
  try {
    const ctx = await requireAdmin(request);
    if (!ctx.ok) return ctx.response;
    const sel = ctx.sel;

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
    // `semParam` is bound as a VALUE by the tagged template -- never
    // interpolated. Do not switch to Prisma.raw() or $queryRawUnsafe here:
    // this value originates in a client query parameter.
    const semParam = sel.kind === 'all' ? 'all' : sel.semester;

    const results = await prisma.$queryRaw<
      { day: string; count: bigint }[]
    >`
      SELECT
        TO_CHAR(pv."visitedAt", 'YYYY-MM-DD') AS day,
        COUNT(DISTINCT pv."userId") AS count
      FROM "PageVisit" pv
      JOIN "User" u ON u."id" = pv."userId"
      WHERE pv."visitedAt" >= ${thirtyDaysAgo}
        AND u."role" = 'STUDENT'
        AND (${semParam}::text = 'all' OR u."semester" = ${semParam})
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
