// Sorting quiz exports

import { sortingDeepQuiz, allSortingQuizzes } from './sorting-deep-quiz';

export { sortingDeepQuiz, allSortingQuizzes };

export const sortingQuizzes = allSortingQuizzes;

export function getSortingQuizById(id: string) {
  return allSortingQuizzes.find(quiz => quiz.id === id);
}
