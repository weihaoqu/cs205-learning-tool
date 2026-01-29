'use client';

import { use } from 'react';
import Link from 'next/link';
import { QuizContainer } from '@/components/quiz';
import { getQuizById } from '@/content/quizzes/arrays';
import { getListQuizById } from '@/content/quizzes/lists';
import { Button } from '@/components/ui/button';
import { useProgressStore } from '@/stores/progressStore';
import type { QuizResult } from '@/types/exercise';

interface QuizPageProps {
  params: Promise<{ quizId: string }>;
}

export default function QuizDetailPage({ params }: QuizPageProps) {
  const { quizId } = use(params);
  const quiz = getQuizById(quizId) || getListQuizById(quizId);
  const { addQuizResult, getBestScore } = useProgressStore();

  const bestScore = quiz ? getBestScore(quiz.id) : null;

  const handleComplete = (result: QuizResult) => {
    addQuizResult(result);
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
