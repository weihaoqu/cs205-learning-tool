export type StepType =
  | 'idle'
  | 'compare'
  | 'swap'
  | 'sorted'
  | 'pivot'
  | 'merge'
  | 'partition'
  | 'highlight'
  | 'insert'
  | 'delete'
  | 'complete';

export interface AnimationStep {
  type: StepType;
  indices: number[];
  array: number[];
  codeLine: number;
  message: string;
  auxiliaryData?: Record<string, unknown>;
}

export interface ArrayPointer {
  index: number;
  label: string;
  color: string;
  position: 'above' | 'below';
}

export interface ArrayVisualizerState {
  array: number[];
  highlightedIndices: Set<number>;
  comparisonIndices: [number, number] | null;
  swappingIndices: [number, number] | null;
  sortedIndices: Set<number>;
  pointers: ArrayPointer[];
  currentOperation: string;
}
