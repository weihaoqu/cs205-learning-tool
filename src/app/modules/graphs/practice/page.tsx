'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export default function GraphsPracticePage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/modules/graphs/dijkstra"><Button variant="ghost" className="gap-2"><ArrowLeft className="w-4 h-4" /> Dijkstra&apos;s</Button></Link>
        <div />
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-4">Practice & Quiz</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Test your understanding of graph concepts, BFS, DFS, and Dijkstra&apos;s algorithm.
        </p>
      </div>

      <Card>
        <CardHeader><CardTitle>Practice Exercises</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">Consider this graph:</p>
          <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-mono text-center">{`    A --- B
    |   / |
    |  /  |
    C --- D
     \\   /
      \\ /
       E`}</pre>
          <ol className="list-decimal list-inside space-y-3 text-sm">
            <li>Write the <strong>BFS</strong> traversal starting from A. <span className="text-muted-foreground">(Answer: A, B, C, D, E)</span></li>
            <li>Write the <strong>DFS</strong> traversal starting from A. <span className="text-muted-foreground">(Answer: A, B, C, D, E — varies by neighbor order)</span></li>
            <li>Given this weighted graph, trace <strong>Dijkstra&apos;s</strong> from A:
              <pre className="p-2 bg-muted rounded mt-1 font-mono text-xs">{`A --4-- B --1-- E
|       |
2       3
|       |
C --4-- D --5-- E`}</pre>
              <span className="text-muted-foreground">Show distance table at each step.</span>
            </li>
            <li>Given an adjacency matrix, draw the corresponding graph.</li>
            <li>Is this graph directed? Connected? Does it have cycles?</li>
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Ready to Test?</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Take the Graphs quiz to check your understanding.
          </p>
          <Link href="/quiz"><Button>Go to Quizzes</Button></Link>
        </CardContent>
      </Card>

      <div className="flex justify-start">
        <Link href="/modules/graphs/dijkstra"><Button variant="outline" className="gap-2"><ArrowLeft className="w-4 h-4" /> Dijkstra&apos;s</Button></Link>
      </div>
    </div>
  );
}
