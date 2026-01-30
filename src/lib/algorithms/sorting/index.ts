export * from './types';
export { bubbleSortGenerator, bubbleSortCode } from './bubbleSort';
export { selectionSortGenerator, selectionSortCode } from './selectionSort';
export { insertionSortGenerator, insertionSortCode } from './insertionSort';
export { mergeSortGenerator, mergeSortCode } from './mergeSort';
export { quickSortGenerator, quickSortCode } from './quickSort';
export { heapSortGenerator, heapSortCode } from './heapSort';

import { bubbleSortGenerator, bubbleSortCode } from './bubbleSort';
import { selectionSortGenerator, selectionSortCode } from './selectionSort';
import { insertionSortGenerator, insertionSortCode } from './insertionSort';
import { mergeSortGenerator, mergeSortCode } from './mergeSort';
import { quickSortGenerator, quickSortCode } from './quickSort';
import { heapSortGenerator, heapSortCode } from './heapSort';
import type { SortingAlgorithm, SortingStep } from './types';

type SortingGenerator = (arr: number[]) => Generator<SortingStep>;

export const sortingGenerators: Record<SortingAlgorithm, SortingGenerator> = {
  bubble: bubbleSortGenerator,
  selection: selectionSortGenerator,
  insertion: insertionSortGenerator,
  merge: mergeSortGenerator,
  quick: quickSortGenerator,
  heap: heapSortGenerator,
};

export const sortingCode: Record<SortingAlgorithm, string> = {
  bubble: bubbleSortCode,
  selection: selectionSortCode,
  insertion: insertionSortCode,
  merge: mergeSortCode,
  quick: quickSortCode,
  heap: heapSortCode,
};

export function generateSortingSteps(
  algorithm: SortingAlgorithm,
  array: number[]
): SortingStep[] {
  const generator = sortingGenerators[algorithm];
  return [...generator(array)];
}
