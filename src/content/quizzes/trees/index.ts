import { treesQuiz, allTreesQuizzes } from './trees-quiz';

export { treesQuiz, allTreesQuizzes };

export const treesQuizzes = allTreesQuizzes;

export function getTreesQuizById(id: string) {
  return allTreesQuizzes.find(quiz => quiz.id === id);
}
