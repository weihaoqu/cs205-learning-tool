// Stack & Queue quiz exports

import {
  stackQueueFullQuiz,
  stackQueueConceptualQuiz,
  stackQueueTracingQuiz,
  allStackQueueQuizzes
} from './stack-queue-quiz';

export {
  stackQueueFullQuiz,
  stackQueueConceptualQuiz,
  stackQueueTracingQuiz,
  allStackQueueQuizzes
};

export const stackQueueQuizzes = allStackQueueQuizzes;

export function getStackQueueQuizById(id: string) {
  return allStackQueueQuizzes.find(quiz => quiz.id === id);
}
