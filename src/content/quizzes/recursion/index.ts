import { recursionFullQuiz, recursionConceptualQuiz, recursionTracingQuiz, recursionQuizzes } from './recursion-quiz';

export { recursionFullQuiz, recursionConceptualQuiz, recursionTracingQuiz, recursionQuizzes };

export function getRecursionQuizById(id: string) {
  return recursionQuizzes.find((q) => q.id === id);
}
