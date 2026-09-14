import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { findQuizById } from '@/lib/quizRegistry';
import { scoreQuiz } from '@/lib/quizScoring';

interface SubmittedAnswer {
  questionId?: unknown;
  isCorrect?: unknown;
}

/**
 * Record a quiz attempt.
 *
 * The score is computed HERE, from the quiz's own point values. The browser no
 * longer decides it. A client-side scoring bug previously wrote impossible
 * scores (285 out of 260) into the database because this endpoint stored
 * whatever number it was handed.
 *
 * An unrecognised quizId is rejected rather than stored: the quiz page shows
 * "Quiz Not Found" and never starts a quiz it cannot resolve, so such a
 * request is a stale client or a crafted one. Either way there is no point
 * total to grade against, and guessing one is how bad data gets in.
 *
 * Remaining trust: per-question `isCorrect` still comes from the client, so a
 * crafted request can claim a correct answer. Closing that requires the server
 * to re-check userAnswer against correctAnswer for each question type.
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { quizId, answers } = await request.json();

    if (typeof quizId !== 'string' || !quizId) {
      return NextResponse.json({ error: 'quizId is required' }, { status: 400 });
    }

    const quiz = findQuizById(quizId);
    if (!quiz) {
      return NextResponse.json({ error: `Unknown quiz: ${quizId}` }, { status: 400 });
    }

    const submitted: SubmittedAnswer[] = Array.isArray(answers) ? answers : [];
    const scorable = submitted
      .filter((a) => a && typeof a.questionId === 'string')
      .map((a) => ({ questionId: a.questionId as string, isCorrect: a.isCorrect === true }));

    const { score, totalPoints, percentage } = scoreQuiz(quiz, scorable);

    const attempt = await prisma.quizAttempt.create({
      data: {
        userId: user.id,
        quizId,
        score,
        totalPoints,
        percentage,
        answers: Array.isArray(answers) ? answers : [],
      },
    });

    return NextResponse.json({ attemptId: attempt.id, score, totalPoints, percentage });
  } catch (error) {
    console.error('Quiz tracking error:', error);
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
  }
}
