'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { fibNaiveCount, generateFibMemoSteps, generateFibTabSteps } from '@/lib/algorithms/dynamic-programming';

export function FibComparisonVisualizer() {
  const [n, setN] = useState(6);

  const data = useMemo(() => {
    const naiveCalls = fibNaiveCount(n);
    const memoSteps = generateFibMemoSteps(n);
    const tabSteps = generateFibTabSteps(n);
    const memoFinal = memoSteps[memoSteps.length - 1];
    const tabFinal = tabSteps[tabSteps.length - 1];
    return { naiveCalls, memoCalls: memoFinal?.callCount ?? 0, tabIterations: tabFinal?.callCount ?? 0, result: tabFinal?.table?.[n] ?? 0, memoMemo: memoFinal?.memo ?? {}, tabTable: tabFinal?.table ?? [] };
  }, [n]);

  const maxCalls = Math.max(data.naiveCalls, 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Fibonacci: Naive vs Memoized vs Tabulation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">
            fib(<span className="text-blue-600 font-bold">{n}</span>)
          </label>
          <Slider value={[n]} onValueChange={([v]) => setN(v)} min={1} max={12} step={1} className="w-48" />
          <span className="text-sm text-muted-foreground">= <strong>{data.result}</strong></span>
        </div>

        {/* Three panels */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Naive */}
          <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Naive Recursive</h4>
            <div className="text-3xl font-bold text-red-600">{data.naiveCalls.toLocaleString()}</div>
            <div className="text-sm text-red-500">function calls</div>
            <div className="mt-2 h-4 bg-red-200 dark:bg-red-800 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 rounded-full" style={{ width: '100%' }} />
            </div>
            <div className="text-xs text-red-400 mt-1">O(2^n) — exponential</div>
          </div>

          {/* Memoized */}
          <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
            <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Memoized (Top-Down)</h4>
            <div className="text-3xl font-bold text-yellow-600">{data.memoCalls}</div>
            <div className="text-sm text-yellow-500">function calls</div>
            <div className="mt-2 h-4 bg-yellow-200 dark:bg-yellow-800 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${Math.max(2, (data.memoCalls / maxCalls) * 100)}%` }} />
            </div>
            <div className="text-xs text-yellow-400 mt-1">O(n) — linear</div>
            <div className="mt-2 flex gap-1 flex-wrap">
              {Object.entries(data.memoMemo).map(([k, v]) => (
                <span key={k} className="text-[10px] px-1 bg-yellow-200 dark:bg-yellow-800 rounded">
                  [{k}]={v}
                </span>
              ))}
            </div>
          </div>

          {/* Tabulation */}
          <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Tabulation (Bottom-Up)</h4>
            <div className="text-3xl font-bold text-green-600">{data.tabIterations}</div>
            <div className="text-sm text-green-500">iterations</div>
            <div className="mt-2 h-4 bg-green-200 dark:bg-green-800 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: `${Math.max(2, (data.tabIterations / maxCalls) * 100)}%` }} />
            </div>
            <div className="text-xs text-green-400 mt-1">O(n) — linear, no recursion</div>
            <div className="mt-2 flex gap-1 flex-wrap">
              {data.tabTable.map((v, i) => (
                <span key={i} className="text-[10px] px-1 bg-green-200 dark:bg-green-800 rounded">
                  dp[{i}]={v}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scale comparison */}
        <div className="p-3 bg-muted/50 rounded-lg text-sm">
          <strong>Why DP matters:</strong> Naive fib({n}) makes{' '}
          <span className="text-red-600 font-bold">{data.naiveCalls.toLocaleString()}</span> calls.
          With memoization: <span className="text-yellow-600 font-bold">{data.memoCalls}</span>.
          That&apos;s a {data.naiveCalls > 0 ? (data.naiveCalls / Math.max(data.memoCalls, 1)).toFixed(0) : 0}x improvement!
        </div>
      </CardContent>
    </Card>
  );
}
