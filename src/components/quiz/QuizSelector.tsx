'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Quiz } from '@/types/exercise';

interface QuizSelectorProps {
  quizzes: Quiz[];
}

const difficultyColors = {
  beginner: 'bg-green-500',
  intermediate: 'bg-yellow-500',
  advanced: 'bg-red-500',
};

const topicLabels = {
  arrays: 'Arrays',
  sorting: 'Sorting',
  '2d-arrays': '2D Arrays',
  complexity: 'Complexity',
};

export function QuizSelector({ quizzes }: QuizSelectorProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {quizzes.map((quiz) => {
        const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
        const difficulties = [...new Set(quiz.questions.map((q) => q.difficulty))];

        return (
          <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{quiz.title}</CardTitle>
                  <CardDescription>{quiz.description}</CardDescription>
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                  {topicLabels[quiz.topic] || quiz.topic}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span>{quiz.questions.length} questions</span>
                <span>{totalPoints} points</span>
                {quiz.timeLimit && <span>{quiz.timeLimit} min</span>}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-muted-foreground">Difficulty:</span>
                {difficulties.map((d) => (
                  <span
                    key={d}
                    className={`w-2 h-2 rounded-full ${difficultyColors[d]}`}
                    title={d}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Pass: {quiz.passingScore}%
                </span>
                <Button asChild size="sm">
                  <Link href={`/quiz/${quiz.id}`}>Start Quiz</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
