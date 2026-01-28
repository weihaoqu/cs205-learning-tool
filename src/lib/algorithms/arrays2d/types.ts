export type TraversalType =
  | 'row-major'
  | 'column-major'
  | 'diagonal'
  | 'anti-diagonal'
  | 'spiral'
  | 'zigzag';

export interface TraversalStep {
  type: 'visit' | 'complete';
  row: number;
  col: number;
  value: number;
  visitedCells: [number, number][];
  message: string;
  codeLine: number;
}

export interface TraversalInfo {
  id: TraversalType;
  name: string;
  description: string;
  complexity: string;
}

export const TRAVERSAL_INFO: Record<TraversalType, TraversalInfo> = {
  'row-major': {
    id: 'row-major',
    name: 'Row-Major Order',
    description: 'Visits elements row by row, left to right.',
    complexity: 'O(m × n)',
  },
  'column-major': {
    id: 'column-major',
    name: 'Column-Major Order',
    description: 'Visits elements column by column, top to bottom.',
    complexity: 'O(m × n)',
  },
  diagonal: {
    id: 'diagonal',
    name: 'Diagonal Traversal',
    description: 'Visits elements along diagonals from top-left to bottom-right.',
    complexity: 'O(m × n)',
  },
  'anti-diagonal': {
    id: 'anti-diagonal',
    name: 'Anti-Diagonal Traversal',
    description: 'Visits elements along diagonals from top-right to bottom-left.',
    complexity: 'O(m × n)',
  },
  spiral: {
    id: 'spiral',
    name: 'Spiral Order',
    description: 'Visits elements in a clockwise spiral pattern from outside to inside.',
    complexity: 'O(m × n)',
  },
  zigzag: {
    id: 'zigzag',
    name: 'Zigzag Traversal',
    description: 'Visits elements in alternating left-right and right-left pattern.',
    complexity: 'O(m × n)',
  },
};
