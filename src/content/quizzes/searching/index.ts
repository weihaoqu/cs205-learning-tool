import { searchingQuiz, allSearchingQuizzes } from './searching-quiz';

export { searchingQuiz, allSearchingQuizzes };

export const searchingQuizzes = allSearchingQuizzes;

export function getSearchingQuizById(id: string) {
  return allSearchingQuizzes.find(quiz => quiz.id === id);
}
