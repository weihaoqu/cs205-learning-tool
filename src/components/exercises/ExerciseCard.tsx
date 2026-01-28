'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { GuidedExercise } from '@/types/guided-exercise';

interface ExerciseCardProps {
  exercise: GuidedExercise;
  isCompleted?: boolean;
}

const difficultyColors = {
  beginner: 'bg-green-500',
  intermediate: 'bg-yellow-500',
  advanced: 'bg-red-500',
};

const difficultyLabels = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

const topicLabels = {
  arrays: 'Arrays',
  sorting: 'Sorting',
  '2d-arrays': '2D Arrays',
};

export function ExerciseCard({ exercise, isCompleted = false }: ExerciseCardProps) {
  return (
    <Card className={`hover:shadow-lg transition-shadow ${isCompleted ? 'border-green-500/50' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {isCompleted && (
                <span className="text-green-500" title="Completed">✓</span>
              )}
              <CardTitle className="text-lg">{exercise.title}</CardTitle>
            </div>
            <CardDescription>{exercise.description}</CardDescription>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
              {topicLabels[exercise.topic]}
            </span>
            <div className="flex items-center gap-1">
              <span
                className={`w-2 h-2 rounded-full ${difficultyColors[exercise.difficulty]}`}
              />
              <span className="text-xs text-muted-foreground">
                {difficultyLabels[exercise.difficulty]}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span>{exercise.steps.length} steps</span>
          <span>~{exercise.estimatedTime} min</span>
        </div>

        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-1">You&apos;ll learn:</p>
          <ul className="text-sm text-muted-foreground space-y-0.5">
            {exercise.objectives.slice(0, 2).map((obj, i) => (
              <li key={i} className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                {obj}
              </li>
            ))}
            {exercise.objectives.length > 2 && (
              <li className="text-xs">+{exercise.objectives.length - 2} more</li>
            )}
          </ul>
        </div>

        <Button asChild className="w-full" variant={isCompleted ? 'outline' : 'default'}>
          <Link href={`/exercises/${exercise.id}`}>
            {isCompleted ? 'Review Exercise' : 'Start Exercise'}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
