import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Total students (role = STUDENT)
    const totalStudents = await prisma.user.count({
      where: { role: 'STUDENT' },
    });

    // Active students: distinct students with a PageVisit in last 7 days
    const activeStudentsResult = await prisma.pageVisit.findMany({
      where: {
        visitedAt: { gte: sevenDaysAgo },
        user: { role: 'STUDENT' },
      },
      select: { userId: true },
      distinct: ['userId'],
    });
    const activeStudents = activeStudentsResult.length;

    // Average quiz score (average of percentage across all attempts)
    const avgResult = await prisma.quizAttempt.aggregate({
      _avg: { percentage: true },
    });
    const avgQuizScore = avgResult._avg.percentage
      ? Math.round(avgResult._avg.percentage * 100) / 100
      : 0;

    // Page views in last 7 days
    const weekPageViews = await prisma.pageVisit.count({
      where: {
        visitedAt: { gte: sevenDaysAgo },
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
