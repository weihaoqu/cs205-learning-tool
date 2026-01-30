// Maps quiz exports

import { mapsQuiz, allMapsQuizzes } from './maps-quiz';

export { mapsQuiz, allMapsQuizzes };

export const mapsQuizzes = allMapsQuizzes;

export function getMapsQuizById(id: string) {
  return allMapsQuizzes.find(quiz => quiz.id === id);
}
