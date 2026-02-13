'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CoinChangeVisualizer } from '@/components/visualizer/dynamic-programming';

export default function DPClassicPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/modules/dynamic-programming/fundamentals">
          <Button variant="ghost" className="gap-2"><ArrowLeft className="w-4 h-4" /> Fundamentals</Button>
        </Link>
        <Link href="/modules/dynamic-programming/patterns">
          <Button variant="ghost" className="gap-2">DP Patterns <ArrowRight className="w-4 h-4" /></Button>
        </Link>
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-4">Classic DP Problems</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Three canonical problems that demonstrate DP table-filling: Coin Change, 0/1 Knapsack, and LCS.
        </p>
      </div>

      {/* Coin Change */}
      <Card>
        <CardHeader><CardTitle>Problem 1: Coin Change</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm">Given coin denominations and a target amount, find the minimum number of coins needed.</p>
          <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto text-sm font-mono">{`int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    dp[0] = 0;

    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`}</pre>
          <p className="text-sm text-muted-foreground">
            <strong>Recurrence:</strong> dp[i] = min(dp[i], dp[i - coin] + 1) for each coin
          </p>
        </CardContent>
      </Card>

      <CoinChangeVisualizer />

      {/* Knapsack */}
      <Card>
        <CardHeader><CardTitle>Problem 2: 0/1 Knapsack</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm">Given items with weights and values, maximize value within a weight limit.</p>
          <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto text-sm font-mono">{`int knapsack(int[] weights, int[] values, int capacity) {
    int n = weights.length;
    int[][] dp = new int[n + 1][capacity + 1];

    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= capacity; w++) {
            dp[i][w] = dp[i - 1][w]; // Skip item
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(dp[i][w],
                    dp[i - 1][w - weights[i - 1]] + values[i - 1]);
            }
        }
    }
    return dp[n][capacity];
}`}</pre>
          <p className="text-sm text-muted-foreground">
            <strong>Time:</strong> O(n &times; W) | <strong>Decision:</strong> Take or skip each item
          </p>
        </CardContent>
      </Card>

      {/* LCS */}
      <Card>
        <CardHeader><CardTitle>Problem 3: Longest Common Subsequence (LCS)</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm">Find the longest subsequence common to two strings.</p>
          <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto text-sm font-mono">{`int lcs(String s1, String s2) {
    int m = s1.length(), n = s2.length();
    int[][] dp = new int[m + 1][n + 1];

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1.charAt(i - 1) == s2.charAt(j - 1))
                dp[i][j] = dp[i - 1][j - 1] + 1;
            else
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    return dp[m][n];
}`}</pre>
          <p className="text-sm text-muted-foreground">
            <strong>Match:</strong> diagonal + 1 | <strong>Mismatch:</strong> max(top, left)
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Link href="/modules/dynamic-programming/fundamentals">
          <Button variant="outline" className="gap-2"><ArrowLeft className="w-4 h-4" /> Fundamentals</Button>
        </Link>
        <Link href="/modules/dynamic-programming/patterns">
          <Button className="gap-2">DP Patterns <ArrowRight className="w-4 h-4" /></Button>
        </Link>
      </div>
    </div>
  );
}
