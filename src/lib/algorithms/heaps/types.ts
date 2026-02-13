export type HeapType = 'max' | 'min';

export type HeapStepType = 'insert' | 'bubble-up' | 'swap' | 'extract' | 'bubble-down' | 'heapify' | 'sorted' | 'complete';

export interface HeapStep {
  type: HeapStepType;
  array: number[];
  highlightIndices: number[];
  compareIndices: number[];
  sortedBoundary?: number; // for heap sort: everything at this index and beyond is sorted
  message: string;
}
