import type { HeapStep, HeapType } from './types';

function compare(a: number, b: number, heapType: HeapType): boolean {
  return heapType === 'max' ? a > b : a < b;
}

export function* heapInsertGenerator(existingHeap: number[], value: number, heapType: HeapType): Generator<HeapStep> {
  const arr = [...existingHeap, value];
  let i = arr.length - 1;

  yield {
    type: 'insert',
    array: [...arr],
    highlightIndices: [i],
    compareIndices: [],
    message: `Insert ${value} at index ${i}`,
  };

  while (i > 0) {
    const parent = Math.floor((i - 1) / 2);

    yield {
      type: 'bubble-up',
      array: [...arr],
      highlightIndices: [i],
      compareIndices: [i, parent],
      message: `Compare ${arr[i]} (index ${i}) with parent ${arr[parent]} (index ${parent})`,
    };

    if (compare(arr[i], arr[parent], heapType)) {
      [arr[i], arr[parent]] = [arr[parent], arr[i]];
      yield {
        type: 'swap',
        array: [...arr],
        highlightIndices: [parent],
        compareIndices: [i, parent],
        message: `Swap ${arr[parent]} and ${arr[i]}. Move up to index ${parent}`,
      };
      i = parent;
    } else {
      yield {
        type: 'complete',
        array: [...arr],
        highlightIndices: [i],
        compareIndices: [],
        message: `Heap property satisfied. ${value} is in correct position at index ${i}`,
      };
      return;
    }
  }

  yield {
    type: 'complete',
    array: [...arr],
    highlightIndices: [0],
    compareIndices: [],
    message: `${value} bubbled up to the root!`,
  };
}

export function* heapExtractGenerator(heap: number[], heapType: HeapType): Generator<HeapStep> {
  if (heap.length === 0) return;
  const arr = [...heap];
  const extracted = arr[0];

  yield {
    type: 'extract',
    array: [...arr],
    highlightIndices: [0],
    compareIndices: [],
    message: `Extract root ${extracted}. Replace with last element ${arr[arr.length - 1]}`,
  };

  arr[0] = arr[arr.length - 1];
  arr.pop();
  if (arr.length === 0) return;

  let i = 0;

  while (true) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let target = i;

    if (left < arr.length && compare(arr[left], arr[target], heapType)) target = left;
    if (right < arr.length && compare(arr[right], arr[target], heapType)) target = right;

    yield {
      type: 'bubble-down',
      array: [...arr],
      highlightIndices: [i],
      compareIndices: [i, ...(left < arr.length ? [left] : []), ...(right < arr.length ? [right] : [])],
      message: `Compare ${arr[i]} with children. ${target !== i ? `Swap with ${arr[target]}` : 'Heap property satisfied'}`,
    };

    if (target !== i) {
      [arr[i], arr[target]] = [arr[target], arr[i]];
      yield {
        type: 'swap',
        array: [...arr],
        highlightIndices: [target],
        compareIndices: [i, target],
        message: `Swapped. Continue bubbling down at index ${target}`,
      };
      i = target;
    } else {
      yield {
        type: 'complete',
        array: [...arr],
        highlightIndices: [],
        compareIndices: [],
        message: `Extraction complete. Removed ${extracted}`,
      };
      return;
    }
  }
}

export function generateInsertSteps(heap: number[], value: number, heapType: HeapType): HeapStep[] {
  return [...heapInsertGenerator(heap, value, heapType)];
}

export function generateExtractSteps(heap: number[], heapType: HeapType): HeapStep[] {
  return [...heapExtractGenerator(heap, heapType)];
}
