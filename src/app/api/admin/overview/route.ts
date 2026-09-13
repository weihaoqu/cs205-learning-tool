import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/adminGuard';
import { studentWhere, studentRelWhere } from '@/lib/semester';

export async function GET(request: Request) {
  try {
    const ctx = await requireAdmin(request);
    if (!ctx.ok) return ctx.response;
    const sel = ctx.sel;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Total students (role = STUDENT)
    const totalStudents = await prisma.user.count({
      where: studentWhere(sel),
    });

    // Active students: distinct students with a PageVisit in last 7 days
    const activeStudentsResult = await prisma.pageVisit.findMany({
      where: {
        visitedAt: { gte: sevenDaysAgo },
        ...studentRelWhere(sel),
      },
      select: { userId: true },
      distinct: ['userId'],
    });
    const activeStudents = activeStudentsResult.length;

    // Average quiz score (average of percentage across all attempts)
    // Had NO where clause at all -- included admin attempts and every cohort.
    const avgResult = await prisma.quizAttempt.aggregate({
      _avg: { percentage: true },
      where: studentRelWhere(sel),
    });
    const avgQuizScore = avgResult._avg.percentage
      ? Math.round(avgResult._avg.percentage * 100) / 100
      : 0;

    // Page views in last 7 days
    // Had no role filter -- counted the instructor's own page views.
    const weekPageViews = await prisma.pageVisit.count({
      where: {
        visitedAt: { gte: sevenDaysAgo },
        ...studentRelWhere(sel),
      },
    });

    return NextResponse.json({
      totalStudents,
      activeStudents,
      avgQuizScore,
      weekPageViews,
    });
  } catch (error) {
    console.error('Admin overview error:', error);
    return NextResponse.json({ error: 'Failed to fetch overview' }, { status: 500 });
  }
}
