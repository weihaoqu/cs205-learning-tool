import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const students = await prisma.user.findMany({
      where: { role: 'STUDENT' },
      select: {
        id: true,
        name: true,
        email: true,
        pageVisits: {
          select: {
            visitedAt: true,
            duration: true,
          },
        },
        quizAttempts: {
          select: {
            percentage: true,
          },
        },
      },
    });

    const result = students.map((student) => {
      // Most recent page visit
      const lastActive =
        student.pageVisits.length > 0
          ? student.pageVisits.reduce((latest, pv) =>
              pv.visitedAt > latest ? pv.visitedAt : latest,
              student.pageVisits[0].visitedAt
            )
          : null;

      // Sum of all page visit durations (in seconds)
      const totalTime = student.pageVisits.reduce(
        (sum, pv) => sum + (pv.duration ?? 0),
        0
      );

      // Average quiz percentage
      const quizCount = student.quizAttempts.length;
      const quizAvg =
        quizCount > 0
          ? Math.round(
              (student.quizAttempts.reduce((sum, qa) => sum + qa.percentage, 0) /
                quizCount) *
                100
            ) / 100
          : 0;

      return {
        id: student.id,
        name: student.name,
        email: student.email,
        lastActive,
        totalTime,
        quizAvg,
        quizCount,
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Admin students error:', error);
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}
