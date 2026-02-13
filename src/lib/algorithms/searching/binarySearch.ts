import type { SearchStep } from './types';

export function* binarySearchGenerator(array: number[], target: number): Generator<SearchStep> {
  let comparisons = 0;
  let low = 0;
  let high = array.length - 1;

  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);
    comparisons++;

    yield {
      type: 'check',
      array: [...array],
      currentIndex: mid,
      low,
      mid,
      high,
      comparisons,
      message: `low=${low}, high=${high}, mid=${mid}: arr[${mid}] = ${array[mid]} vs target ${target}`,
      found: false,
    };

    if (array[mid] === target) {
      yield {
        type: 'found',
        array: [...array],
        currentIndex: mid,
        low,
        mid,
        high,
        comparisons,
        message: `Found ${target} at index ${mid}! Total comparisons: ${comparisons}`,
        found: true,
      };
      return;
    } else if (array[mid] < target) {
      yield {
        type: 'eliminate',
        array: [...array],
        currentIndex: mid,
        low,
        mid,
        high,
        comparisons,
        message: `${array[mid]} < ${target}, eliminating left half. New low = ${mid + 1}`,
        found: false,
      };
      low = mid + 1;
    } else {
      yield {
        type: 'eliminate',
        array: [...array],
        currentIndex: mid,
        low,
        mid,
        high,
        comparisons,
        message: `${array[mid]} > ${target}, eliminating right half. New high = ${mid - 1}`,
        found: false,
      };
      high = mid - 1;
    }
  }

  yield {
    type: 'not-found',
    array: [...array],
    currentIndex: -1,
    low,
    high,
    comparisons,
    message: `${target} not found in the array. Total comparisons: ${comparisons}`,
    found: false,
  };
}

export function generateBinarySearchSteps(array: number[], target: number): SearchStep[] {
  return [...binarySearchGenerator(array, target)];
}

export const binarySearchIterativeCode = `int binarySearch(int[] arr, int target) {
    int low = 0, high = arr.length - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`;

export const binarySearchRecursiveCode = `int binarySearch(int[] arr, int target, int low, int high) {
    if (low > high) return -1;
    int mid = low + (high - low) / 2;
    if (arr[mid] == target) return mid;
    else if (arr[mid] < target)
        return binarySearch(arr, target, mid + 1, high);
    else
        return binarySearch(arr, target, low, mid - 1);
}`;
