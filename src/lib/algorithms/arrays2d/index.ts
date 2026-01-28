export * from './types';
export * from './traversals';

import {
  rowMajorTraversal,
  columnMajorTraversal,
  diagonalTraversal,
  antiDiagonalTraversal,
  spiralTraversal,
  zigzagTraversal,
} from './traversals';
import type { TraversalType, TraversalStep } from './types';

type TraversalGenerator = (matrix: number[][]) => Generator<TraversalStep>;

export const traversalGenerators: Record<TraversalType, TraversalGenerator> = {
  'row-major': rowMajorTraversal,
  'column-major': columnMajorTraversal,
  diagonal: diagonalTraversal,
  'anti-diagonal': antiDiagonalTraversal,
  spiral: spiralTraversal,
  zigzag: zigzagTraversal,
};

export function generateTraversalSteps(
  traversalType: TraversalType,
  matrix: number[][]
): TraversalStep[] {
  const generator = traversalGenerators[traversalType];
  return [...generator(matrix)];
}

export function createMatrix(rows: number, cols: number, fill: 'sequential' | 'random' = 'sequential'): number[][] {
  const matrix: number[][] = [];
  let counter = 1;

  for (let i = 0; i < rows; i++) {
    const row: number[] = [];
    for (let j = 0; j < cols; j++) {
      if (fill === 'sequential') {
        row.push(counter++);
      } else {
        row.push(Math.floor(Math.random() * 100));
      }
    }
    matrix.push(row);
  }

  return matrix;
}
