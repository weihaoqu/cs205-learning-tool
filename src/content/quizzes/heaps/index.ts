import { heapsQuiz, allHeapsQuizzes } from './heaps-quiz';

export { heapsQuiz, allHeapsQuizzes };

export const heapsQuizzes = allHeapsQuizzes;

export function getHeapsQuizById(id: string) {
  return allHeapsQuizzes.find(quiz => quiz.id === id);
}
