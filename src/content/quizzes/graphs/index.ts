import { graphsQuiz, allGraphsQuizzes } from './graphs-quiz';

export { graphsQuiz, allGraphsQuizzes };

export const graphsQuizzes = allGraphsQuizzes;

export function getGraphsQuizById(id: string) {
  return allGraphsQuizzes.find(quiz => quiz.id === id);
}
