import type { SortingStep } from './types';

export function* selectionSortGenerator(inputArray: number[]): Generator<SortingStep> {
  const arr = [...inputArray];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    // Find minimum element in unsorted portion
    for (let j = i + 1; j < n; j++) {
      comparisons++;

      yield {
        type: 'compare',
        indices: [minIdx, j],
        array: [...arr],
        codeLine: 5,
        message: `Comparing arr[${minIdx}]=${arr[minIdx]} with arr[${j}]=${arr[j]}`,
        stats: { comparisons, swaps },
      };

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    // Swap if minimum is not at position i
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      swaps++;

      yield {
        type: 'swap',
        indices: [i, minIdx],
        array: [...arr],
        codeLine: 10,
        message: `Swapping arr[${i}]=${arr[minIdx]} with minimum arr[${minIdx}]=${arr[i]}`,
        stats: { comparisons, swaps },
      };
    }

    // Mark element as sorted
    yield {
      type: 'sorted',
      indices: [i],
      array: [...arr],
      codeLine: 12,
      message: `Element ${arr[i]} is now in sorted position at index ${i}`,
      stats: { comparisons, swaps },
    };
  }

  // Mark last element as sorted
  yield {
    type: 'sorted',
    indices: [n - 1],
    array: [...arr],
    codeLine: 14,
    message: `Last element is in sorted position`,
    stats: { comparisons, swaps },
  };

  yield {
    type: 'complete',
    indices: [],
    array: [...arr],
    codeLine: 15,
    message: `Sorting complete! ${comparisons} comparisons, ${swaps} swaps`,
    stats: { comparisons, swaps },
  };
}

export const selectionSortCode = `public static void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        // Swap arr[i] and arr[minIdx]
        int temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
}`;
