'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { FibComparisonVisualizer } from '@/components/visualizer/dynamic-programming';

export default function DPFundamentalsPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div />
        <Link href="/modules/dynamic-programming/classic">
          <Button variant="ghost" className="gap-2">Classic Problems <ArrowRight className="w-4 h-4" /></Button>
        </Link>
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-4">Dynamic Programming Fundamentals</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          DP is not a single algorithm — it&apos;s a problem-solving approach that optimizes problems
          with overlapping subproblems and optimal substructure.
        </p>
      </div>

      {/* Two properties */}
      <Card>
        <CardHeader><CardTitle>When Does DP Apply?</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200">1. Overlapping Subproblems</h4>
              <p className="text-sm text-blue-600 dark:text-blue-300">
                The same subproblems are solved repeatedly. Example: naive fib(5) computes fib(3) twice!
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200">2. Optimal Substructure</h4>
              <p className="text-sm text-green-600 dark:text-green-300">
                The optimal solution can be built from optimal solutions to subproblems.
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            <strong>Connection to Recursion:</strong> DP starts where{' '}
            <Link href="/modules/recursion/fibonacci" className="text-primary hover:underline">naive recursion</Link>{' '}
            becomes too slow. The call tree has repeated work that we can eliminate.
          </p>
        </CardContent>
      </Card>

      {/* Memoization vs Tabulation */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-base">Top-Down: Memoization</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <pre className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">{`int[] memo;

int fibMemo(int n) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    memo[n] = fibMemo(n - 1) + fibMemo(n - 2);
    return memo[n];
}`}</pre>
            <p className="text-sm text-muted-foreground">Recursive + cache. Only computes needed subproblems.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Bottom-Up: Tabulation</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <pre className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">{`int fibTab(int n) {
    int[] dp = new int[n + 1];
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; i++)
        dp[i] = dp[i - 1] + dp[i - 2];
    return dp[n];
}`}</pre>
            <p className="text-sm text-muted-foreground">Iterative + table. No recursion, no stack risk.</p>
          </CardContent>
        </Card>
      </div>

      {/* Comparison */}
      <Card>
        <CardHeader><CardTitle>Memoization vs Tabulation</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b">
                <th className="text-left p-3">Aspect</th><th className="text-left p-3">Memoization (Top-Down)</th><th className="text-left p-3">Tabulation (Bottom-Up)</th>
              </tr></thead>
              <tbody>
                <tr className="border-b"><td className="p-3">Approach</td><td className="p-3">Recursive + cache</td><td className="p-3">Iterative + table</td></tr>
                <tr className="border-b"><td className="p-3">Computes</td><td className="p-3">Only needed subproblems</td><td className="p-3">All subproblems</td></tr>
                <tr className="border-b"><td className="p-3">Stack risk</td><td className="p-3">Deep recursion possible</td><td className="p-3">No stack risk</td></tr>
                <tr className="border-b"><td className="p-3">Ease of writing</td><td className="p-3">More intuitive</td><td className="p-3">Requires understanding order</td></tr>
                <tr><td className="p-3">Space optimization</td><td className="p-3">Harder</td><td className="p-3">Easier (rolling array)</td></tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Fibonacci Comparison Visualizer */}
      <FibComparisonVisualizer />

      <div className="flex justify-end">
        <Link href="/modules/dynamic-programming/classic">
          <Button className="gap-2">Classic Problems <ArrowRight className="w-4 h-4" /></Button>
        </Link>
      </div>
    </div>
  );
}
