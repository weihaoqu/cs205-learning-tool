import type { SortingStep } from './types';

interface QuickSortState {
  comparisons: number;
  swaps: number;
}

function* partition(
  arr: number[],
  low: number,
  high: number,
  state: QuickSortState
): Generator<SortingStep, number> {
  const pivot = arr[high];

  yield {
    type: 'pivot',
    indices: [high],
    array: [...arr],
    codeLine: 3,
    message: `Pivot element: ${pivot} at index ${high}`,
    auxiliaryData: { pivotIndex: high },
    stats: { ...state },
  };

  let i = low - 1;

  for (let j = low; j < high; j++) {
    state.comparisons++;

    yield {
      type: 'compare',
      indices: [j, high],
      array: [...arr],
      codeLine: 6,
      message: `Comparing arr[${j}]=${arr[j]} with pivot ${pivot}`,
      stats: { ...state },
    };

    if (arr[j] < pivot) {
      i++;

      if (i !== j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        state.swaps++;

        yield {
          type: 'swap',
          indices: [i, j],
          array: [...arr],
          codeLine: 9,
          message: `Swapping arr[${i}]=${arr[j]} with arr[${j}]=${arr[i]}`,
          stats: { ...state },
        };
      }
    }
  }

  // Place pivot in correct position
  const pivotPos = i + 1;
  if (pivotPos !== high) {
    [arr[pivotPos], arr[high]] = [arr[high], arr[pivotPos]];
    state.swaps++;

    yield {
      type: 'swap',
      indices: [pivotPos, high],
      array: [...arr],
      codeLine: 13,
      message: `Placing pivot ${pivot} at position ${pivotPos}`,
      stats: { ...state },
    };
  }

  yield {
    type: 'sorted',
    indices: [pivotPos],
    array: [...arr],
    codeLine: 15,
    message: `Pivot ${pivot} is in final sorted position at index ${pivotPos}`,
    auxiliaryData: { partitionIndex: pivotPos },
    stats: { ...state },
  };

  return pivotPos;
}

function* quickSortHelper(
  arr: number[],
  low: number,
  high: number,
  state: QuickSortState
): Generator<SortingStep> {
  if (low < high) {
    yield {
      type: 'partition',
      indices: [low, high],
      array: [...arr],
      codeLine: 2,
      message: `Partitioning array from index ${low} to ${high}`,
      stats: { ...state },
    };

    // Get partition index
    const partitionGen = partition(arr, low, high, state);
    let result = partitionGen.next();

    while (!result.done) {
      yield result.value as SortingStep;
      result = partitionGen.next();
    }

    const pi = result.value;

    // Recursively sort left partition
    yield* quickSortHelper(arr, low, pi - 1, state);

    // Recursively sort right partition
    yield* quickSortHelper(arr, pi + 1, high, state);
  } else if (low === high) {
    // Single element is already sorted
    yield {
      type: 'sorted',
      indices: [low],
      array: [...arr],
      codeLine: 18,
      message: `Single element ${arr[low]} at index ${low} is sorted`,
      stats: { ...state },
    };
  }
}

export function* quickSortGenerator(inputArray: number[]): Generator<SortingStep> {
  const arr = [...inputArray];
  const state: QuickSortState = { comparisons: 0, swaps: 0 };

  yield* quickSortHelper(arr, 0, arr.length - 1, state);

  yield {
    type: 'complete',
    indices: [],
    array: [...arr],
    codeLine: 20,
    message: `Sorting complete! ${state.comparisons} comparisons, ${state.swaps} swaps`,
    stats: { ...state },
  };
}

export const quickSortCode = `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

private static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            // Swap arr[i] and arr[j]
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    // Place pivot in correct position
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    return i + 1;
}`;
