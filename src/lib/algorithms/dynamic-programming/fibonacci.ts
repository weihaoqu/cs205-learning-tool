import type { FibStep } from './types';

/** Naive recursive — count calls */
export function fibNaiveCount(n: number): number {
  if (n <= 1) return 1;
  return fibNaiveCount(n - 1) + fibNaiveCount(n - 2) + 1;
}

/** Memoized fibonacci with step tracking */
export function* fibMemoGenerator(n: number): Generator<FibStep> {
  const memo: Record<number, number> = {};
  let callCount = 0;

  function* helper(k: number): Generator<FibStep, number> {
    callCount++;

    if (k <= 1) {
      memo[k] = k;
      yield { type: 'compute', n: k, memo: { ...memo }, callCount, message: `Base case: fib(${k}) = ${k}` };
      return k;
    }

    if (memo[k] !== undefined) {
      yield { type: 'cache-hit', n: k, memo: { ...memo }, callCount, message: `Cache hit! fib(${k}) = ${memo[k]} (already computed)` };
      return memo[k];
    }

    yield { type: 'call', n: k, memo: { ...memo }, callCount, message: `Computing fib(${k})...` };

    const left: number = yield* helper(k - 1);
    const right: number = yield* helper(k - 2);
    memo[k] = left + right;

    yield { type: 'compute', n: k, memo: { ...memo }, callCount, message: `fib(${k}) = fib(${k - 1}) + fib(${k - 2}) = ${left} + ${right} = ${memo[k]}` };

    return memo[k];
  }

  yield* helper(n);

  yield { type: 'complete', n, memo: { ...memo }, callCount, message: `Memoized: fib(${n}) = ${memo[n]}, ${callCount} calls` };
}

/** Tabulation fibonacci with step tracking */
export function* fibTabGenerator(n: number): Generator<FibStep> {
  const table: number[] = new Array(n + 1).fill(0);
  table[0] = 0;
  if (n >= 1) table[1] = 1;
  let callCount = 0;

  yield { type: 'fill', n: 0, memo: {}, table: [...table], callCount: 0, message: 'Initialize: dp[0] = 0, dp[1] = 1' };

  for (let i = 2; i <= n; i++) {
    callCount++;
    table[i] = table[i - 1] + table[i - 2];
    yield { type: 'fill', n: i, memo: {}, table: [...table], callCount, message: `dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${table[i - 1]} + ${table[i - 2]} = ${table[i]}` };
  }

  yield { type: 'complete', n, memo: {}, table: [...table], callCount, message: `Tabulation: fib(${n}) = ${table[n]}, ${callCount} iterations` };
}

export function generateFibMemoSteps(n: number): FibStep[] {
  return [...fibMemoGenerator(n)];
}

export function generateFibTabSteps(n: number): FibStep[] {
  return [...fibTabGenerator(n)];
}
