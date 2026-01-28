import type { TraversalStep } from './types';

export function* rowMajorTraversal(matrix: number[][]): Generator<TraversalStep> {
  const rows = matrix.length;
  const cols = matrix[0]?.length ?? 0;
  const visited: [number, number][] = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      visited.push([i, j]);
      yield {
        type: 'visit',
        row: i,
        col: j,
        value: matrix[i][j],
        visitedCells: [...visited],
        message: `Visiting matrix[${i}][${j}] = ${matrix[i][j]}`,
        codeLine: 3,
      };
    }
  }

  yield {
    type: 'complete',
    row: -1,
    col: -1,
    value: 0,
    visitedCells: visited,
    message: `Traversal complete! Visited ${visited.length} cells.`,
    codeLine: 6,
  };
}

export function* columnMajorTraversal(matrix: number[][]): Generator<TraversalStep> {
  const rows = matrix.length;
  const cols = matrix[0]?.length ?? 0;
  const visited: [number, number][] = [];

  for (let j = 0; j < cols; j++) {
    for (let i = 0; i < rows; i++) {
      visited.push([i, j]);
      yield {
        type: 'visit',
        row: i,
        col: j,
        value: matrix[i][j],
        visitedCells: [...visited],
        message: `Visiting matrix[${i}][${j}] = ${matrix[i][j]}`,
        codeLine: 3,
      };
    }
  }

  yield {
    type: 'complete',
    row: -1,
    col: -1,
    value: 0,
    visitedCells: visited,
    message: `Traversal complete! Visited ${visited.length} cells.`,
    codeLine: 6,
  };
}

export function* diagonalTraversal(matrix: number[][]): Generator<TraversalStep> {
  const rows = matrix.length;
  const cols = matrix[0]?.length ?? 0;
  const visited: [number, number][] = [];

  // Traverse all diagonals starting from first row and first column
  for (let d = 0; d < rows + cols - 1; d++) {
    const startRow = d < cols ? 0 : d - cols + 1;
    const startCol = d < cols ? d : cols - 1;

    let i = startRow;
    let j = startCol;

    while (i < rows && j >= 0) {
      visited.push([i, j]);
      yield {
        type: 'visit',
        row: i,
        col: j,
        value: matrix[i][j],
        visitedCells: [...visited],
        message: `Diagonal ${d + 1}: Visiting matrix[${i}][${j}] = ${matrix[i][j]}`,
        codeLine: 5,
      };
      i++;
      j--;
    }
  }

  yield {
    type: 'complete',
    row: -1,
    col: -1,
    value: 0,
    visitedCells: visited,
    message: `Traversal complete! Visited ${visited.length} cells.`,
    codeLine: 10,
  };
}

export function* antiDiagonalTraversal(matrix: number[][]): Generator<TraversalStep> {
  const rows = matrix.length;
  const cols = matrix[0]?.length ?? 0;
  const visited: [number, number][] = [];

  // Traverse all anti-diagonals
  for (let d = 0; d < rows + cols - 1; d++) {
    const startRow = d < cols ? 0 : d - cols + 1;
    const startCol = d < cols ? cols - 1 - d : 0;

    let i = startRow;
    let j = startCol;

    while (i < rows && j < cols) {
      visited.push([i, j]);
      yield {
        type: 'visit',
        row: i,
        col: j,
        value: matrix[i][j],
        visitedCells: [...visited],
        message: `Anti-diagonal ${d + 1}: Visiting matrix[${i}][${j}] = ${matrix[i][j]}`,
        codeLine: 5,
      };
      i++;
      j++;
    }
  }

  yield {
    type: 'complete',
    row: -1,
    col: -1,
    value: 0,
    visitedCells: visited,
    message: `Traversal complete! Visited ${visited.length} cells.`,
    codeLine: 10,
  };
}

export function* spiralTraversal(matrix: number[][]): Generator<TraversalStep> {
  const rows = matrix.length;
  const cols = matrix[0]?.length ?? 0;
  const visited: [number, number][] = [];

  let top = 0;
  let bottom = rows - 1;
  let left = 0;
  let right = cols - 1;

  while (top <= bottom && left <= right) {
    // Traverse right
    for (let j = left; j <= right; j++) {
      visited.push([top, j]);
      yield {
        type: 'visit',
        row: top,
        col: j,
        value: matrix[top][j],
        visitedCells: [...visited],
        message: `Moving right: matrix[${top}][${j}] = ${matrix[top][j]}`,
        codeLine: 6,
      };
    }
    top++;

    // Traverse down
    for (let i = top; i <= bottom; i++) {
      visited.push([i, right]);
      yield {
        type: 'visit',
        row: i,
        col: right,
        value: matrix[i][right],
        visitedCells: [...visited],
        message: `Moving down: matrix[${i}][${right}] = ${matrix[i][right]}`,
        codeLine: 10,
      };
    }
    right--;

    // Traverse left
    if (top <= bottom) {
      for (let j = right; j >= left; j--) {
        visited.push([bottom, j]);
        yield {
          type: 'visit',
          row: bottom,
          col: j,
          value: matrix[bottom][j],
          visitedCells: [...visited],
          message: `Moving left: matrix[${bottom}][${j}] = ${matrix[bottom][j]}`,
          codeLine: 15,
        };
      }
      bottom--;
    }

    // Traverse up
    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        visited.push([i, left]);
        yield {
          type: 'visit',
          row: i,
          col: left,
          value: matrix[i][left],
          visitedCells: [...visited],
          message: `Moving up: matrix[${i}][${left}] = ${matrix[i][left]}`,
          codeLine: 20,
        };
      }
      left++;
    }
  }

  yield {
    type: 'complete',
    row: -1,
    col: -1,
    value: 0,
    visitedCells: visited,
    message: `Spiral traversal complete! Visited ${visited.length} cells.`,
    codeLine: 24,
  };
}

export function* zigzagTraversal(matrix: number[][]): Generator<TraversalStep> {
  const rows = matrix.length;
  const cols = matrix[0]?.length ?? 0;
  const visited: [number, number][] = [];

  for (let i = 0; i < rows; i++) {
    if (i % 2 === 0) {
      // Left to right
      for (let j = 0; j < cols; j++) {
        visited.push([i, j]);
        yield {
          type: 'visit',
          row: i,
          col: j,
          value: matrix[i][j],
          visitedCells: [...visited],
          message: `Row ${i} (left→right): matrix[${i}][${j}] = ${matrix[i][j]}`,
          codeLine: 4,
        };
      }
    } else {
      // Right to left
      for (let j = cols - 1; j >= 0; j--) {
        visited.push([i, j]);
        yield {
          type: 'visit',
          row: i,
          col: j,
          value: matrix[i][j],
          visitedCells: [...visited],
          message: `Row ${i} (right→left): matrix[${i}][${j}] = ${matrix[i][j]}`,
          codeLine: 8,
        };
      }
    }
  }

  yield {
    type: 'complete',
    row: -1,
    col: -1,
    value: 0,
    visitedCells: visited,
    message: `Zigzag traversal complete! Visited ${visited.length} cells.`,
    codeLine: 12,
  };
}
