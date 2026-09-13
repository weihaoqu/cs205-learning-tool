import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/adminGuard';
import { studentRelWhere } from '@/lib/semester';

function getBucketIndex(percentage: number): number {
  if (percentage < 60) return 0;
  if (percentage < 70) return 1;
  if (percentage < 80) return 2;
  if (percentage < 90) return 3;
  return 4;
}

const BUCKET_LABELS = ['0-59%', '60-69%', '70-79%', '80-89%', '90-100%'];

export async function GET(request: Request) {
  try {
    const ctx = await requireAdmin(request);
    if (!ctx.ok) return ctx.response;
    const sel = ctx.sel;

    // Get aggregate stats per quiz using groupBy
    const quizGroups = await prisma.quizAttempt.groupBy({
      by: ['quizId'],
      where: studentRelWhere(sel),
      _count: { id: true },
      _avg: { percentage: true },
      _min: { percentage: true },
      _max: { percentage: true },
    });

    // For distribution, we need the raw percentages per quiz
    // Identical filter to the groupBy above -- filtering only one produces
    // internally inconsistent stats vs. distributions.
    const allAttempts = await prisma.quizAttempt.findMany({
      where: studentRelWhere(sel),
      select: { quizId: true, percentage: true },
    });

    // Build a map of quizId -> distribution buckets
    const distributionMap: Record<string, number[]> = {};
    for (const attempt of allAttempts) {
      if (!distributionMap[attempt.quizId]) {
        distributionMap[attempt.quizId] = [0, 0, 0, 0, 0];
      }
      distributionMap[attempt.quizId][getBucketIndex(attempt.percentage)]++;
    }

    const quizzes = quizGroups.map((group) => ({
      quizId: group.quizId,
      attempts: group._count.id,
      avgScore: group._avg.percentage
        ? Math.round(group._avg.percentage * 100) / 100
        : 0,
      minScore: group._min.percentage
        ? Math.round(group._min.percentage * 100) / 100
        : 0,
      maxScore: group._max.percentage
        ? Math.round(group._max.percentage * 100) / 100
        : 0,
      distribution: BUCKET_LABELS.map((label, i) => ({
        label,
        count: distributionMap[group.quizId]?.[i] ?? 0,
      })),
    }));

    return NextResponse.json(quizzes);
  } catch (error) {
    console.error('Admin quizzes error:', error);
    return NextResponse.json({ error: 'Failed to fetch quiz data' }, { status: 500 });
  }
}
