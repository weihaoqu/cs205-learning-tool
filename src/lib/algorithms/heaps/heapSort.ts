import type { HeapStep } from './types';

function* bubbleDownGen(arr: number[], size: number, i: number, phase: string): Generator<HeapStep> {
  while (true) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < size && arr[left] > arr[largest]) largest = left;
    if (right < size && arr[right] > arr[largest]) largest = right;

    if (largest !== i) {
      yield {
        type: 'bubble-down',
        array: [...arr],
        highlightIndices: [i, largest],
        compareIndices: [i, left < size ? left : -1, right < size ? right : -1].filter(x => x >= 0),
        sortedBoundary: size,
        message: `[${phase}] Swap arr[${i}]=${arr[i]} with arr[${largest}]=${arr[largest]}`,
      };
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      i = largest;
    } else {
      break;
    }
  }
}

export function* heapSortGenerator(inputArray: number[]): Generator<HeapStep> {
  const arr = [...inputArray];
  const n = arr.length;

  // Phase 1: Build max-heap (heapify)
  yield {
    type: 'heapify',
    array: [...arr],
    highlightIndices: [],
    compareIndices: [],
    sortedBoundary: n,
    message: 'Phase 1: Build max-heap using heapify (bottom-up)',
  };

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield {
      type: 'heapify',
      array: [...arr],
      highlightIndices: [i],
      compareIndices: [],
      sortedBoundary: n,
      message: `Heapify: sift down from index ${i} (value ${arr[i]})`,
    };
    yield* bubbleDownGen(arr, n, i, 'Heapify');
  }

  yield {
    type: 'complete',
    array: [...arr],
    highlightIndices: [],
    compareIndices: [],
    sortedBoundary: n,
    message: `Max-heap built! Root is max: ${arr[0]}`,
  };

  // Phase 2: Extract elements
  yield {
    type: 'heapify',
    array: [...arr],
    highlightIndices: [],
    compareIndices: [],
    sortedBoundary: n,
    message: 'Phase 2: Repeatedly extract max and rebuild heap',
  };

  for (let i = n - 1; i > 0; i--) {
    yield {
      type: 'swap',
      array: [...arr],
      highlightIndices: [0, i],
      compareIndices: [],
      sortedBoundary: i + 1,
      message: `Swap root ${arr[0]} with last unsorted element ${arr[i]}`,
    };

    [arr[0], arr[i]] = [arr[i], arr[0]];

    yield {
      type: 'sorted',
      array: [...arr],
      highlightIndices: [i],
      compareIndices: [],
      sortedBoundary: i,
      message: `${arr[i]} is now in its final sorted position`,
    };

    yield* bubbleDownGen(arr, i, 0, 'Sort');
  }

  yield {
    type: 'complete',
    array: [...arr],
    highlightIndices: [],
    compareIndices: [],
    sortedBoundary: 0,
    message: `Heap sort complete! [${arr.join(', ')}]`,
  };
}

export function generateHeapSortSteps(array: number[]): HeapStep[] {
  return [...heapSortGenerator(array)];
}
