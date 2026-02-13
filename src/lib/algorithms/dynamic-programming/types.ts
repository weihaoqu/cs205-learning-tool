export interface DPStep {
  type: 'fill' | 'compare' | 'traceback' | 'complete';
  table: number[];
  table2D?: number[][];
  currentIndex: number;
  currentIndex2?: number;
  highlightIndices: number[];
  message: string;
}

export interface FibStep {
  type: 'call' | 'cache-hit' | 'compute' | 'fill' | 'complete';
  n: number;
  memo: Record<number, number>;
  table?: number[];
  callCount: number;
  message: string;
}
