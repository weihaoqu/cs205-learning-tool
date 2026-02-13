import { dpQuiz, allDPQuizzes } from './dp-quiz';

export { dpQuiz, allDPQuizzes };

export const dpQuizzes = allDPQuizzes;

export function getDPQuizById(id: string) {
  return allDPQuizzes.find(quiz => quiz.id === id);
}
