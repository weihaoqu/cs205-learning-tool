'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function PriorityQueuePage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/modules/heaps/heapsort">
          <Button variant="ghost" className="gap-2"><ArrowLeft className="w-4 h-4" /> Heap Sort</Button>
        </Link>
        <Link href="/modules/heaps/practice">
          <Button variant="ghost" className="gap-2">Practice <ArrowRight className="w-4 h-4" /></Button>
        </Link>
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-4">Priority Queue</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          A priority queue is an abstract data type where elements are dequeued by priority,
          not insertion order. A heap is the most common implementation.
        </p>
      </div>

      {/* What is a PQ */}
      <Card>
        <CardHeader><CardTitle>Priority Queue vs Regular Queue</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200">Regular Queue (FIFO)</h4>
              <p className="text-sm text-blue-600 dark:text-blue-300">First in, first out. Order = arrival time.</p>
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              <h4 className="font-medium text-purple-800 dark:text-purple-200">Priority Queue</h4>
              <p className="text-sm text-purple-600 dark:text-purple-300">Highest priority first. Order = priority value.</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Related:{' '}
            <Link href="/modules/stack-queue/queue" className="text-primary hover:underline">Queues (FIFO)</Link>
          </p>
        </CardContent>
      </Card>

      {/* Java Code */}
      <Card>
        <CardHeader><CardTitle>Java: Using PriorityQueue</CardTitle></CardHeader>
        <CardContent>
          <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto text-sm font-mono">{`// Min-heap (default in Java)
PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.add(5);
pq.add(1);
pq.add(3);
System.out.println(pq.poll()); // 1 (smallest)

// Max-heap
PriorityQueue<Integer> maxPQ =
    new PriorityQueue<>(Collections.reverseOrder());`}</pre>
        </CardContent>
      </Card>

      {/* Complexity comparison */}
      <Card>
        <CardHeader><CardTitle>Implementation Comparison</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b">
                <th className="text-left p-3">Structure</th><th className="text-left p-3">Insert</th><th className="text-left p-3">Remove Min/Max</th><th className="text-left p-3">Peek</th>
              </tr></thead>
              <tbody>
                <tr className="border-b"><td className="p-3">Unsorted Array</td><td className="p-3">O(1)</td><td className="p-3">O(n)</td><td className="p-3">O(n)</td></tr>
                <tr className="border-b"><td className="p-3">Sorted Array</td><td className="p-3">O(n)</td><td className="p-3">O(1)</td><td className="p-3">O(1)</td></tr>
                <tr className="border-b font-medium"><td className="p-3">Heap</td><td className="p-3 text-green-600">O(log n)</td><td className="p-3 text-green-600">O(log n)</td><td className="p-3 text-green-600">O(1)</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            A heap gives the best balanced performance for both insert and remove.
          </p>
        </CardContent>
      </Card>

      {/* Applications */}
      <Card>
        <CardHeader><CardTitle>Real-World Applications</CardTitle></CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200">OS Process Scheduling</h4>
              <p className="text-sm text-green-600 dark:text-green-300">Higher-priority processes run first</p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200">Dijkstra&apos;s Algorithm</h4>
              <p className="text-sm text-blue-600 dark:text-blue-300">
                Always process nearest unvisited vertex —{' '}
                <Link href="/modules/graphs/dijkstra" className="underline">see Graphs module</Link>
              </p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
              <h4 className="font-medium text-red-800 dark:text-red-200">Emergency Room Triage</h4>
              <p className="text-sm text-red-600 dark:text-red-300">Patients treated by severity, not arrival time</p>
            </div>
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Event Simulation</h4>
              <p className="text-sm text-yellow-600 dark:text-yellow-300">Process events in chronological order</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Link href="/modules/heaps/heapsort">
          <Button variant="outline" className="gap-2"><ArrowLeft className="w-4 h-4" /> Heap Sort</Button>
        </Link>
        <Link href="/modules/heaps/practice">
          <Button className="gap-2">Practice <ArrowRight className="w-4 h-4" /></Button>
        </Link>
      </div>
    </div>
  );
}
