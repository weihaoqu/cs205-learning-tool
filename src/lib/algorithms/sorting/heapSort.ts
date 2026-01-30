import type { SortingStep } from './types';

export function* heapSortGenerator(inputArray: number[]): Generator<SortingStep> {
  const arr = [...inputArray];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(arr, n, i);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    [arr[0], arr[i]] = [arr[i], arr[0]];
    swaps++;

    yield {
      type: 'swap',
      indices: [0, i],
      array: [...arr],
      codeLine: 8,
      message: `Swap root ${arr[i]} with last unsorted element ${arr[0]}`,
      stats: { comparisons, swaps },
    };

    // Mark element as sorted
    yield {
      type: 'sorted',
      indices: [i],
      array: [...arr],
      codeLine: 9,
      message: `Element ${arr[i]} is now in sorted position`,
      stats: { comparisons, swaps },
    };

    // Heapify the reduced heap
    yield* heapify(arr, i, 0);
  }

  // Mark first element as sorted
  yield {
    type: 'sorted',
    indices: [0],
    array: [...arr],
    codeLine: 11,
    message: `First element ${arr[0]} is in sorted position`,
    stats: { comparisons, swaps },
  };

  yield {
    type: 'complete',
    indices: [],
    array: [...arr],
    codeLine: 12,
    message: `Sorting complete! ${comparisons} comparisons, ${swaps} swaps`,
    stats: { comparisons, swaps },
  };

  function* heapify(arr: number[], heapSize: number, rootIndex: number): Generator<SortingStep> {
    let largest = rootIndex;
    const left = 2 * rootIndex + 1;
    const right = 2 * rootIndex + 2;

    // Compare with left child
    if (left < heapSize) {
      comparisons++;
      yield {
        type: 'compare',
        indices: [largest, left],
        array: [...arr],
        codeLine: 3,
        message: `Comparing arr[${largest}]=${arr[largest]} with left child arr[${left}]=${arr[left]}`,
        stats: { comparisons, swaps },
        auxiliaryData: { pivotIndex: rootIndex },
      };

      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    // Compare with right child
    if (right < heapSize) {
      comparisons++;
      yield {
        type: 'compare',
        indices: [largest, right],
        array: [...arr],
        codeLine: 4,
        message: `Comparing arr[${largest}]=${arr[largest]} with right child arr[${right}]=${arr[right]}`,
        stats: { comparisons, swaps },
        auxiliaryData: { pivotIndex: rootIndex },
      };

      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    // If largest is not root
    if (largest !== rootIndex) {
      [arr[rootIndex], arr[largest]] = [arr[largest], arr[rootIndex]];
      swaps++;

      yield {
        type: 'swap',
        indices: [rootIndex, largest],
        array: [...arr],
        codeLine: 6,
        message: `Swap arr[${rootIndex}]=${arr[largest]} with arr[${largest}]=${arr[rootIndex]} to maintain heap property`,
        stats: { comparisons, swaps },
      };

      // Recursively heapify the affected sub-tree
      yield* heapify(arr, heapSize, largest);
    }
  }
}

export const heapSortCode = `public static void heapSort(int[] arr) {
    int n = arr.length;

    // Build max heap
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // Extract elements from heap one by one
    for (int i = n - 1; i > 0; i--) {
        // Move current root to end
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;

        // Heapify reduced heap
        heapify(arr, i, 0);
    }
}

private static void heapify(int[] arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest != i) {
        int swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;

        heapify(arr, n, largest);
    }
}`;
