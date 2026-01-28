import type { SortingStep } from './types';

export function* bubbleSortGenerator(inputArray: number[]): Generator<SortingStep> {
  const arr = [...inputArray];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;

      // Yield comparison step
      yield {
        type: 'compare',
        indices: [j, j + 1],
        array: [...arr],
        codeLine: 4,
        message: `Comparing arr[${j}]=${arr[j]} with arr[${j + 1}]=${arr[j + 1]}`,
        stats: { comparisons, swaps },
      };

      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swaps++;
        swapped = true;

        // Yield swap step
        yield {
          type: 'swap',
          indices: [j, j + 1],
          array: [...arr],
          codeLine: 6,
          message: `Swapping ${arr[j + 1]} and ${arr[j]}`,
          stats: { comparisons, swaps },
        };
      }
    }

    // Mark element as sorted
    yield {
      type: 'sorted',
      indices: [n - i - 1],
      array: [...arr],
      codeLine: 10,
      message: `Element at index ${n - i - 1} is now in sorted position`,
      stats: { comparisons, swaps },
    };

    // Early termination if no swaps occurred
    if (!swapped) {
      // Mark all remaining elements as sorted
      for (let k = 0; k < n - i - 1; k++) {
        yield {
          type: 'sorted',
          indices: [k],
          array: [...arr],
          codeLine: 12,
          message: `Array is already sorted!`,
          stats: { comparisons, swaps },
        };
      }
      break;
    }
  }

  // Mark first element as sorted (if not already)
  yield {
    type: 'complete',
    indices: [],
    array: [...arr],
    codeLine: 14,
    message: `Sorting complete! ${comparisons} comparisons, ${swaps} swaps`,
    stats: { comparisons, swaps },
  };
}

export const bubbleSortCode = `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap arr[j] and arr[j+1]
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`;
