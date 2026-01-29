import { complexityFullQuiz, complexityConceptualQuiz, complexityTracingQuiz, complexityQuizzes } from './complexity-quiz';

export { complexityFullQuiz, complexityConceptualQuiz, complexityTracingQuiz, complexityQuizzes };

export function getComplexityQuizById(id: string) {
  return complexityQuizzes.find((q) => q.id === id);
}
