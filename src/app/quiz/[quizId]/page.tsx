'use client';

import { use } from 'react';
import Link from 'next/link';
import { QuizContainer } from '@/components/quiz';
import { getQuizById } from '@/content/quizzes/arrays';
import { getListQuizById } from '@/content/quizzes/lists';
import { getRecursionQuizById } from '@/content/quizzes/recursion';
import { getStackQueueQuizById } from '@/content/quizzes/stack-queue';
import { getComplexityQuizById } from '@/content/quizzes/complexity';
import { getSortingQuizById } from '@/content/quizzes/sorting';
import { getMapsQuizById } from '@/content/quizzes/maps';
import { getSearchingQuizById } from '@/content/quizzes/searching';
import { getTreesQuizById } from '@/content/quizzes/trees';
import { getHeapsQuizById } from '@/content/quizzes/heaps';
import { getGraphsQuizById } from '@/content/quizzes/graphs';
import { getDPQuizById } from '@/content/quizzes/dynamic-programming';
import { Button } from '@/components/ui/button';
import { useProgressStore } from '@/stores/progressStore';
import type { QuizResult } from '@/types/exercise';

interface QuizPageProps {
  params: Promise<{ quizId: string }>;
}

export default function QuizDetailPage({ params }: QuizPageProps) {
  const { quizId } = use(params);
  const quiz = getQuizById(quizId) || getListQuizById(quizId) || getRecursionQuizById(quizId) || getStackQueueQuizById(quizId) || getComplexityQuizById(quizId) || getSortingQuizById(quizId) || getMapsQuizById(quizId) || getSearchingQuizById(quizId) || getTreesQuizById(quizId) || getHeapsQuizById(quizId) || getGraphsQuizById(quizId) || getDPQuizById(quizId);
  const { addQuizResult, getBestScore } = useProgressStore();

  const bestScore = quiz ? getBestScore(quiz.id) : null;

  const handleComplete = (result: QuizResult) => {
    // Keep localStorage as fallback
    addQuizResult(result);

    // Also persist to server
    fetch('/cs205/api/tracking/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quizId: result.quizId,
        score: result.score,
        totalPoints: result.totalPoints,
        percentage: result.totalPoints > 0 ? (result.score / result.totalPoints) * 100 : 0,
        answers: result.answers,
      }),
    }).catch(() => {}); // silent failure
  };

  if (!quiz) {
    return (
      <div className="container py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Quiz Not Found</h1>
        <p className="text-muted-foreground mb-4">
          The quiz you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button asChild>
          <Link href="/quiz">Back to Quizzes</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/quiz"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to Quizzes
        </Link>
        {bestScore !== null && (
          <span className="text-sm text-muted-foreground">
            Best Score: <span className="font-medium text-primary">{bestScore.toFixed(0)}%</span>
          </span>
        )}
      </div>

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
        <p className="text-muted-foreground">{quiz.description}</p>
      </div>

      <QuizContainer quiz={quiz} onComplete={handleComplete} />
    </div>
  );
}
