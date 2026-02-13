'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export default function HeapsPracticePage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/modules/heaps/priority-queue">
          <Button variant="ghost" className="gap-2"><ArrowLeft className="w-4 h-4" /> Priority Queue</Button>
        </Link>
        <div />
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-4">Practice & Quiz</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Test your understanding of heaps, heap sort, and priority queues.
        </p>
      </div>

      {/* Exercises */}
      <Card>
        <CardHeader><CardTitle>Practice Exercises</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <ol className="list-decimal list-inside space-y-3 text-sm">
            <li>
              <strong>Build a max-heap:</strong> Given array [4, 10, 3, 5, 1], draw the max-heap after heapify.
              <span className="text-muted-foreground block ml-5">(Answer: [10, 5, 3, 4, 1])</span>
            </li>
            <li>
              <strong>Extract max:</strong> From heap [50, 30, 40, 10, 20], show the array after extracting the max.
              <span className="text-muted-foreground block ml-5">(Answer: [40, 30, 20, 10])</span>
            </li>
            <li>
              <strong>Insert sequence:</strong> Insert values 7, 3, 9, 1, 5 into an empty min-heap. Show the final array.
              <span className="text-muted-foreground block ml-5">(Answer: [1, 3, 9, 7, 5])</span>
            </li>
            <li>
              <strong>Trace heap sort:</strong> Sort [3, 1, 4, 1, 5, 9] using heap sort. Show each extraction step.
            </li>
            <li>
              <strong>Priority queue:</strong> Tasks arrive: A(priority 3), B(priority 1), C(priority 4), D(priority 2). What is the dequeue order?
              <span className="text-muted-foreground block ml-5">(Answer: C, A, D, B — highest priority first in max-PQ)</span>
            </li>
          </ol>
        </CardContent>
      </Card>

      {/* Quiz Link */}
      <Card>
        <CardHeader><CardTitle>Ready to Test?</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Take the Heaps & Priority Queues quiz to check your understanding.
          </p>
          <Link href="/quiz">
            <Button>Go to Quizzes</Button>
          </Link>
        </CardContent>
      </Card>

      <div className="flex justify-start">
        <Link href="/modules/heaps/priority-queue">
          <Button variant="outline" className="gap-2"><ArrowLeft className="w-4 h-4" /> Priority Queue</Button>
        </Link>
      </div>
    </div>
  );
}
