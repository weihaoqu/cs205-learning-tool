export type SearchStepType = 'check' | 'found' | 'not-found' | 'eliminate' | 'complete';

export interface SearchStep {
  type: SearchStepType;
  array: number[];
  currentIndex: number;
  low?: number;
  mid?: number;
  high?: number;
  comparisons: number;
  message: string;
  found: boolean;
}
