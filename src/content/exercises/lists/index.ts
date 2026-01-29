import { arrayListExercises } from './arraylist-exercises';
import { linkedListExercises } from './linkedlist-exercises';

export const allListExercises = [...arrayListExercises, ...linkedListExercises];

export function getListExerciseById(id: string) {
  return allListExercises.find((ex) => ex.id === id);
}

export { arrayListExercises, linkedListExercises };
