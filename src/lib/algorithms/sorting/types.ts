export type SortingStepType =
  | 'compare'
  | 'swap'
  | 'sorted'
  | 'pivot'
  | 'merge'
  | 'partition'
  | 'insert'
  | 'complete';

export interface SortingStep {
  type: SortingStepType;
  indices: number[];
  array: number[];
  codeLine: number;
  message: string;
  auxiliaryData?: {
    leftArray?: number[];
    rightArray?: number[];
    pivotIndex?: number;
    partitionIndex?: number;
  };
  stats: {
    comparisons: number;
    swaps: number;
  };
}

export type SortingAlgorithm = 'bubble' | 'selection' | 'insertion' | 'merge' | 'quick';

export interface AlgorithmInfo {
  id: SortingAlgorithm;
  name: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  stable: boolean;
  description: string;
}

export const ALGORITHM_INFO: Record<SortingAlgorithm, AlgorithmInfo> = {
  bubble: {
    id: 'bubble',
    name: 'Bubble Sort',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    stable: true,
    description: 'Repeatedly swaps adjacent elements if they are in the wrong order.',
  },
  selection: {
    id: 'selection',
    name: 'Selection Sort',
    timeComplexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    stable: false,
    description: 'Finds the minimum element and places it at the beginning.',
  },
  insertion: {
    id: 'insertion',
    name: 'Insertion Sort',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    stable: true,
    description: 'Builds the sorted array one element at a time by inserting each element into its correct position.',
  },
  merge: {
    id: 'merge',
    name: 'Merge Sort',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(n)',
    stable: true,
    description: 'Divides the array in half, recursively sorts each half, then merges them.',
  },
  quick: {
    id: 'quick',
    name: 'Quick Sort',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
    spaceComplexity: 'O(log n)',
    stable: false,
    description: 'Picks a pivot element and partitions the array around it.',
  },
};
