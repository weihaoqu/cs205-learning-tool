import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { quizId, score, totalPoints, percentage, answers } = await request.json();

    if (!quizId || score === undefined || !totalPoints) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const attempt = await prisma.quizAttempt.create({
      data: {
        userId: user.id,
        quizId,
        score,
        totalPoints,
        percentage: percentage ?? (totalPoints > 0 ? (score / totalPoints) * 100 : 0),
        answers: answers ?? [],
      },
    });

    return NextResponse.json({ attemptId: attempt.id });
  } catch (error) {
    console.error('Quiz tracking error:', error);
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
  }
}
