import type { DPStep } from './types';

export function* lcsGenerator(s1: string, s2: string): Generator<DPStep> {
  const m = s1.length, n = s2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  yield {
    type: 'fill',
    table: [],
    table2D: dp.map(r => [...r]),
    currentIndex: 0,
    currentIndex2: 0,
    highlightIndices: [],
    message: `Initialize ${m + 1}×${n + 1} table with zeros`,
  };

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        yield {
          type: 'fill',
          table: [],
          table2D: dp.map(r => [...r]),
          currentIndex: i,
          currentIndex2: j,
          highlightIndices: [],
          message: `'${s1[i - 1]}' == '${s2[j - 1]}': dp[${i}][${j}] = dp[${i - 1}][${j - 1}] + 1 = ${dp[i][j]}`,
        };
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        yield {
          type: 'compare',
          table: [],
          table2D: dp.map(r => [...r]),
          currentIndex: i,
          currentIndex2: j,
          highlightIndices: [],
          message: `'${s1[i - 1]}' != '${s2[j - 1]}': dp[${i}][${j}] = max(dp[${i - 1}][${j}], dp[${i}][${j - 1}]) = ${dp[i][j]}`,
        };
      }
    }
  }

  // Traceback to find the actual LCS
  let lcs = '';
  let i = m, j = n;
  while (i > 0 && j > 0) {
    if (s1[i - 1] === s2[j - 1]) {
      lcs = s1[i - 1] + lcs;
      i--; j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  yield {
    type: 'complete',
    table: [],
    table2D: dp.map(r => [...r]),
    currentIndex: m,
    currentIndex2: n,
    highlightIndices: [],
    message: `LCS length: ${dp[m][n]}, LCS: "${lcs}"`,
  };
}

export function generateLCSSteps(s1: string, s2: string): DPStep[] {
  return [...lcsGenerator(s1, s2)];
}
