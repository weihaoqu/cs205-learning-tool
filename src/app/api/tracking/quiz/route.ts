import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { findQuizById } from '@/lib/quizRegistry';
import { scoreQuiz } from '@/lib/quizScoring';
import { gradeAttempt } from '@/lib/quizGrading';

interface SubmittedAnswer {
  questionId?: unknown;
  userAnswer?: unknown;
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
 * Correctness is decided here too. The client's `isCorrect` flag is ignored --
 * it is a claim, not evidence. Each submitted `userAnswer` is re-checked
 * against the question definition using the same comparison the UI performs,
 * so what a student sees and what is recorded agree.
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
    const raw = submitted
      .filter((a) => a && typeof a.questionId === 'string')
      .map((a) => ({ questionId: a.questionId as string, userAnswer: a.userAnswer }));

    const graded = gradeAttempt(quiz, raw);
    const { score, totalPoints, percentage } = scoreQuiz(quiz, graded);

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
