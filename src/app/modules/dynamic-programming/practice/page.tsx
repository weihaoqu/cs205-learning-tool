'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export default function DPPracticePage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/modules/dynamic-programming/patterns">
          <Button variant="ghost" className="gap-2"><ArrowLeft className="w-4 h-4" /> DP Patterns</Button>
        </Link>
        <div />
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-4">Practice & Quiz</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Test your understanding of dynamic programming concepts and problems.
        </p>
      </div>

      <Card>
        <CardHeader><CardTitle>Practice Exercises</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <ol className="list-decimal list-inside space-y-3 text-sm">
            <li>
              <strong>Fibonacci memoization:</strong> Given fib(6), fill in the memoization table step by step.
              <span className="text-muted-foreground block ml-5">(Answer: memo = {'{0: 0, 1: 1, 2: 1, 3: 2, 4: 3, 5: 5, 6: 8}'})</span>
            </li>
            <li>
              <strong>Coin change:</strong> coins = [1, 3, 4], amount = 6. Fill the DP table.
              <span className="text-muted-foreground block ml-5">(Answer: dp = [0, 1, 2, 1, 1, 2, 2]. Min coins = 2, using 3+3)</span>
            </li>
            <li>
              <strong>Knapsack:</strong> items = [(w=2,v=3), (w=3,v=4), (w=4,v=5)], capacity = 5. Fill the 2D table.
              <span className="text-muted-foreground block ml-5">(Answer: max value = 7, items 1 and 2)</span>
            </li>
            <li>
              <strong>LCS:</strong> Find the LCS of &quot;ABCBDAB&quot; and &quot;BDCAB&quot;.
              <span className="text-muted-foreground block ml-5">(Answer: LCS length = 4, LCS = &quot;BCAB&quot;)</span>
            </li>
            <li>
              <strong>Climbing stairs:</strong> n = 6. How many ways?
              <span className="text-muted-foreground block ml-5">(Answer: dp = [1, 1, 2, 3, 5, 8, 13]. Answer = 13 ways)</span>
            </li>
            <li>
              <strong>Identification:</strong> Is &quot;find the shortest path in a weighted graph&quot; solvable with DP?
              <span className="text-muted-foreground block ml-5">(Answer: Yes — <Link href="/modules/graphs/dijkstra" className="text-primary hover:underline">Dijkstra&apos;s</Link> and Bellman-Ford are DP-based)</span>
            </li>
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Ready to Test?</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Take the Dynamic Programming quiz to check your understanding.
          </p>
          <Link href="/quiz"><Button>Go to Quizzes</Button></Link>
        </CardContent>
      </Card>

      <div className="flex justify-start">
        <Link href="/modules/dynamic-programming/patterns">
          <Button variant="outline" className="gap-2"><ArrowLeft className="w-4 h-4" /> DP Patterns</Button>
        </Link>
      </div>
    </div>
  );
}
