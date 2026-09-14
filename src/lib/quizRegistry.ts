import type { Quiz } from '@/types/exercise';
import { getQuizById as getArraysQuizById } from '@/content/quizzes/arrays';
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

const LOOKUPS = [
  getArraysQuizById, getListQuizById, getRecursionQuizById, getStackQueueQuizById,
  getComplexityQuizById, getSortingQuizById, getMapsQuizById, getSearchingQuizById,
  getTreesQuizById, getHeapsQuizById, getGraphsQuizById, getDPQuizById,
];

/**
 * Resolve a quiz by id across every topic. Exists so the SERVER can look up a
 * quiz's real point values instead of trusting whatever score the browser
 * reports -- the gap that let a client-side scoring bug write impossible
 * scores (285/260) straight into the database.
 */
export function findQuizById(quizId: string): Quiz | undefined {
  for (const lookup of LOOKUPS) {
    const q = lookup(quizId);
    if (q) return q;
  }
  return undefined;
}
