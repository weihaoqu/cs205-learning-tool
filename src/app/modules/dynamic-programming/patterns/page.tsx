'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function DPPatternsPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/modules/dynamic-programming/classic">
          <Button variant="ghost" className="gap-2"><ArrowLeft className="w-4 h-4" /> Classic Problems</Button>
        </Link>
        <Link href="/modules/dynamic-programming/practice">
          <Button variant="ghost" className="gap-2">Practice <ArrowRight className="w-4 h-4" /></Button>
        </Link>
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-4">DP Patterns</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Learn to recognize and categorize DP problems by their structure.
        </p>
      </div>

      {/* 1D DP */}
      <Card>
        <CardHeader><CardTitle>1D DP Pattern</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Climbing Stairs</h4>
              <p className="text-sm text-muted-foreground mb-2">How many ways to climb n stairs (1 or 2 steps)?</p>
              <pre className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">{`int climbStairs(int n) {
    int[] dp = new int[n + 1];
    dp[0] = 1; dp[1] = 1;
    for (int i = 2; i <= n; i++)
        dp[i] = dp[i - 1] + dp[i - 2];
    return dp[n];
}`}</pre>
              <p className="text-xs text-muted-foreground mt-1">Pattern: dp[i] = f(dp[i-1], dp[i-2])</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">House Robber</h4>
              <p className="text-sm text-muted-foreground mb-2">Maximize loot; can&apos;t rob adjacent houses.</p>
              <pre className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">{`int rob(int[] nums) {
    int n = nums.length;
    int[] dp = new int[n];
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);
    for (int i = 2; i < n; i++)
        dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i]);
    return dp[n - 1];
}`}</pre>
              <p className="text-xs text-muted-foreground mt-1">Pattern: dp[i] = max(dp[i-1], dp[i-2] + val[i])</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2D DP */}
      <Card>
        <CardHeader><CardTitle>2D DP Pattern</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <h4 className="font-medium">Grid Paths</h4>
          <p className="text-sm text-muted-foreground">Count unique paths from top-left to bottom-right (move right or down only).</p>
          <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto text-sm font-mono">{`int uniquePaths(int m, int n) {
    int[][] dp = new int[m][n];
    for (int i = 0; i < m; i++) dp[i][0] = 1;
    for (int j = 0; j < n; j++) dp[0][j] = 1;
    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    return dp[m - 1][n - 1];
}`}</pre>
          <p className="text-sm text-muted-foreground">Pattern: dp[i][j] = f(dp[i-1][j], dp[i][j-1])</p>
        </CardContent>
      </Card>

      {/* How to identify */}
      <Card>
        <CardHeader><CardTitle>How to Identify a DP Problem</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Can it be broken into <strong>overlapping subproblems</strong>?</li>
            <li>Does it ask for <strong>optimal (min/max)</strong> or <strong>count of ways</strong>?</li>
            <li>Does a greedy approach <strong>fail</strong>? (e.g., coins [1, 3, 4], amount 6: greedy gives 4+1+1=3 coins, DP gives 3+3=2 coins)</li>
            <li>Can you define a <strong>recurrence relation</strong>?</li>
          </ol>

          <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-mono">{`Is it an optimization or counting problem?
├── Yes → Can you define subproblems?
│     ├── Yes → Do subproblems overlap?
│     │     ├── Yes → USE DP ✓
│     │     └── No  → Use divide & conquer
│     └── No  → Try greedy or brute force
└── No  → Probably not DP`}</pre>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Link href="/modules/dynamic-programming/classic">
          <Button variant="outline" className="gap-2"><ArrowLeft className="w-4 h-4" /> Classic Problems</Button>
        </Link>
        <Link href="/modules/dynamic-programming/practice">
          <Button className="gap-2">Practice <ArrowRight className="w-4 h-4" /></Button>
        </Link>
      </div>
    </div>
  );
}
