export { sortingQuiz, sortingQuizQuestions } from './sorting-quiz';
export { arraysQuiz, arraysQuizQuestions } from './arrays-quiz';

import { sortingQuiz } from './sorting-quiz';
import { arraysQuiz } from './arrays-quiz';
import type { Quiz } from '@/types/exercise';

export const allQuizzes: Quiz[] = [arraysQuiz, sortingQuiz];

export function getQuizById(id: string): Quiz | undefined {
  return allQuizzes.find((quiz) => quiz.id === id);
}

export function getQuizzesByTopic(topic: string): Quiz[] {
  return allQuizzes.filter((quiz) => quiz.topic === topic);
}
