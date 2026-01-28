import type { SortingStep } from './types';

interface MergeSortState {
  comparisons: number;
  swaps: number;
}

function* merge(
  arr: number[],
  left: number,
  mid: number,
  right: number,
  state: MergeSortState
): Generator<SortingStep> {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);

  yield {
    type: 'partition',
    indices: [left, mid, mid + 1, right],
    array: [...arr],
    codeLine: 3,
    message: `Merging [${left}..${mid}] and [${mid + 1}..${right}]`,
    auxiliaryData: { leftArray: leftArr, rightArray: rightArr },
    stats: { ...state },
  };

  let i = 0;
  let j = 0;
  let k = left;

  while (i < leftArr.length && j < rightArr.length) {
    state.comparisons++;

    yield {
      type: 'compare',
      indices: [left + i, mid + 1 + j],
      array: [...arr],
      codeLine: 8,
      message: `Comparing ${leftArr[i]} with ${rightArr[j]}`,
      stats: { ...state },
    };

    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i];
      i++;
    } else {
      arr[k] = rightArr[j];
      j++;
    }
    state.swaps++;

    yield {
      type: 'merge',
      indices: [k],
      array: [...arr],
      codeLine: 12,
      message: `Placed ${arr[k]} at position ${k}`,
      stats: { ...state },
    };

    k++;
  }

  // Copy remaining elements from left array
  while (i < leftArr.length) {
    arr[k] = leftArr[i];
    state.swaps++;

    yield {
      type: 'merge',
      indices: [k],
      array: [...arr],
      codeLine: 16,
      message: `Copying remaining ${arr[k]} from left array`,
      stats: { ...state },
    };

    i++;
    k++;
  }

  // Copy remaining elements from right array
  while (j < rightArr.length) {
    arr[k] = rightArr[j];
    state.swaps++;

    yield {
      type: 'merge',
      indices: [k],
      array: [...arr],
      codeLine: 20,
      message: `Copying remaining ${arr[k]} from right array`,
      stats: { ...state },
    };

    j++;
    k++;
  }

  // Mark merged section as sorted
  for (let idx = left; idx <= right; idx++) {
    yield {
      type: 'sorted',
      indices: [idx],
      array: [...arr],
      codeLine: 22,
      message: `Merged section [${left}..${right}] is sorted`,
      stats: { ...state },
    };
  }
}

function* mergeSortHelper(
  arr: number[],
  left: number,
  right: number,
  state: MergeSortState
): Generator<SortingStep> {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);

    yield {
      type: 'partition',
      indices: [left, right],
      array: [...arr],
      codeLine: 2,
      message: `Dividing array [${left}..${right}] at midpoint ${mid}`,
      stats: { ...state },
    };

    // Recursively sort left half
    yield* mergeSortHelper(arr, left, mid, state);

    // Recursively sort right half
    yield* mergeSortHelper(arr, mid + 1, right, state);

    // Merge the sorted halves
    yield* merge(arr, left, mid, right, state);
  }
}

export function* mergeSortGenerator(inputArray: number[]): Generator<SortingStep> {
  const arr = [...inputArray];
  const state: MergeSortState = { comparisons: 0, swaps: 0 };

  yield* mergeSortHelper(arr, 0, arr.length - 1, state);

  yield {
    type: 'complete',
    indices: [],
    array: [...arr],
    codeLine: 24,
    message: `Sorting complete! ${state.comparisons} comparisons, ${state.swaps} moves`,
    stats: { ...state },
  };
}

export const mergeSortCode = `public static void mergeSort(int[] arr, int left, int right) {
    if (left < right) {
        int mid = (left + right) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

private static void merge(int[] arr, int left, int mid, int right) {
    int[] leftArr = Arrays.copyOfRange(arr, left, mid + 1);
    int[] rightArr = Arrays.copyOfRange(arr, mid + 1, right + 1);

    int i = 0, j = 0, k = left;
    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k++] = leftArr[i++];
        } else {
            arr[k++] = rightArr[j++];
        }
    }
    while (i < leftArr.length) arr[k++] = leftArr[i++];
    while (j < rightArr.length) arr[k++] = rightArr[j++];
}`;
