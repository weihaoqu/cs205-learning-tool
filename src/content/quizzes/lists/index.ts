import { listsQuiz, listsConceptualQuiz, listsTracingQuiz } from './lists-quiz';

export const listQuizzes = [listsQuiz, listsConceptualQuiz, listsTracingQuiz];

export function getListQuizById(id: string) {
  return listQuizzes.find((q) => q.id === id);
}

export { listsQuiz, listsConceptualQuiz, listsTracingQuiz };
