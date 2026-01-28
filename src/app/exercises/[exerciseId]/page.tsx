'use client';

import { use } from 'react';
import Link from 'next/link';
import { GuidedExercise } from '@/components/exercises';
import { getExerciseById } from '@/content/exercises/arrays';
import { Button } from '@/components/ui/button';

interface ExercisePageProps {
  params: Promise<{ exerciseId: string }>;
}

export default function ExerciseDetailPage({ params }: ExercisePageProps) {
  const { exerciseId } = use(params);
  const exercise = getExerciseById(exerciseId);

  if (!exercise) {
    return (
      <div className="container py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Exercise Not Found</h1>
        <p className="text-muted-foreground mb-4">
          The exercise you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button asChild>
          <Link href="/exercises">Back to Exercises</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-4xl">
      <div className="mb-6">
        <Link
          href="/exercises"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to Exercises
        </Link>
      </div>

      <GuidedExercise exercise={exercise} />
    </div>
  );
}
