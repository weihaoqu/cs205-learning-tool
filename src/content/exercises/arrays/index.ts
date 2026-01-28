import { findMaxExercise } from './find-max-exercise';
import { reverseArrayExercise } from './reverse-array-exercise';
import { bubbleSortExercise } from './bubble-sort-exercise';
import type { GuidedExercise } from '@/types/guided-exercise';

export const allExercises: GuidedExercise[] = [
  findMaxExercise,
  reverseArrayExercise,
  bubbleSortExercise,
];

export function getExerciseById(id: string): GuidedExercise | undefined {
  return allExercises.find((ex) => ex.id === id);
}

export function getExercisesByTopic(topic: string): GuidedExercise[] {
  return allExercises.filter((ex) => ex.topic === topic);
}

export function getExercisesByDifficulty(difficulty: string): GuidedExercise[] {
  return allExercises.filter((ex) => ex.difficulty === difficulty);
}

export { findMaxExercise, reverseArrayExercise, bubbleSortExercise };
