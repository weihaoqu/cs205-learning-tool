import type { DPStep } from './types';

export function* coinChangeGenerator(coins: number[], amount: number): Generator<DPStep> {
  const dp = new Array(amount + 1).fill(amount + 1);
  dp[0] = 0;

  yield { type: 'fill', table: [...dp], currentIndex: 0, highlightIndices: [0], message: 'Initialize: dp[0] = 0, all others = ∞' };

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        yield { type: 'compare', table: [...dp], currentIndex: i, highlightIndices: [i, i - coin], message: `dp[${i}]: check coin ${coin} → dp[${i} - ${coin}] + 1 = ${dp[i - coin] === amount + 1 ? '∞' : dp[i - coin] + 1}` };
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
    yield { type: 'fill', table: [...dp], currentIndex: i, highlightIndices: [i], message: `dp[${i}] = ${dp[i] > amount ? '∞ (impossible)' : dp[i]}` };
  }

  yield { type: 'complete', table: [...dp], currentIndex: amount, highlightIndices: [], message: `Minimum coins for ${amount}: ${dp[amount] > amount ? 'impossible' : dp[amount]}` };
}

export function generateCoinChangeSteps(coins: number[], amount: number): DPStep[] {
  return [...coinChangeGenerator(coins, amount)];
}
