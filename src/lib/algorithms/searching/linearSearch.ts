import type { SearchStep } from './types';

export function* linearSearchGenerator(array: number[], target: number): Generator<SearchStep> {
  let comparisons = 0;

  for (let i = 0; i < array.length; i++) {
    comparisons++;

    yield {
      type: 'check',
      array: [...array],
      currentIndex: i,
      comparisons,
      message: `Checking index ${i}: arr[${i}] = ${array[i]} ${array[i] === target ? '== ' : '!= '}${target}`,
      found: false,
    };

    if (array[i] === target) {
      yield {
        type: 'found',
        array: [...array],
        currentIndex: i,
        comparisons,
        message: `Found ${target} at index ${i}! Total comparisons: ${comparisons}`,
        found: true,
      };
      return;
    }
  }

  yield {
    type: 'not-found',
    array: [...array],
    currentIndex: -1,
    comparisons,
    message: `${target} not found in the array. Total comparisons: ${comparisons}`,
    found: false,
  };
}

export function generateLinearSearchSteps(array: number[], target: number): SearchStep[] {
  return [...linearSearchGenerator(array, target)];
}

export const linearSearchCode = `int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i; // Found at index i
        }
    }
    return -1; // Not found
}`;
