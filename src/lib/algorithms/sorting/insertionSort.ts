import type { SortingStep } from './types';

export function* insertionSortGenerator(inputArray: number[]): Generator<SortingStep> {
  const arr = [...inputArray];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;

  // First element is already sorted
  yield {
    type: 'sorted',
    indices: [0],
    array: [...arr],
    codeLine: 2,
    message: `First element ${arr[0]} is trivially sorted`,
    stats: { comparisons, swaps },
  };

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    yield {
      type: 'compare',
      indices: [i],
      array: [...arr],
      codeLine: 4,
      message: `Inserting element ${key} into sorted portion`,
      stats: { comparisons, swaps },
    };

    // Shift elements greater than key to the right
    while (j >= 0 && arr[j] > key) {
      comparisons++;

      yield {
        type: 'compare',
        indices: [j, j + 1],
        array: [...arr],
        codeLine: 6,
        message: `Comparing ${arr[j]} > ${key}? Yes, shifting right`,
        stats: { comparisons, swaps },
      };

      arr[j + 1] = arr[j];
      swaps++;

      yield {
        type: 'swap',
        indices: [j, j + 1],
        array: [...arr],
        codeLine: 7,
        message: `Shifting ${arr[j + 1]} to position ${j + 1}`,
        stats: { comparisons, swaps },
      };

      j--;
    }

    // Count the final comparison when loop exits
    if (j >= 0) {
      comparisons++;
      yield {
        type: 'compare',
        indices: [j, j + 1],
        array: [...arr],
        codeLine: 6,
        message: `Comparing ${arr[j]} > ${key}? No, found insertion point`,
        stats: { comparisons, swaps },
      };
    }

    // Insert key at correct position
    arr[j + 1] = key;

    yield {
      type: 'insert',
      indices: [j + 1],
      array: [...arr],
      codeLine: 9,
      message: `Inserted ${key} at position ${j + 1}`,
      stats: { comparisons, swaps },
    };

    // Mark sorted portion
    yield {
      type: 'sorted',
      indices: [j + 1],
      array: [...arr],
      codeLine: 10,
      message: `Elements 0 to ${i} are now sorted`,
      stats: { comparisons, swaps },
    };
  }

  yield {
    type: 'complete',
    indices: [],
    array: [...arr],
    codeLine: 12,
    message: `Sorting complete! ${comparisons} comparisons, ${swaps} swaps`,
    stats: { comparisons, swaps },
  };
}

export const insertionSortCode = `public static void insertionSort(int[] arr) {
    int n = arr.length;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`;
