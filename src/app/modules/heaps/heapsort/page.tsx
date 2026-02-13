'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { HeapSortVisualizer } from '@/components/visualizer/heaps';

export default function HeapSortPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/modules/heaps/basics">
          <Button variant="ghost" className="gap-2"><ArrowLeft className="w-4 h-4" /> Heap Basics</Button>
        </Link>
        <Link href="/modules/heaps/priority-queue">
          <Button variant="ghost" className="gap-2">Priority Queue <ArrowRight className="w-4 h-4" /></Button>
        </Link>
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-4">Heapify & Heap Sort</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Build a heap efficiently with heapify, then use it to sort in O(n log n) time.
        </p>
      </div>

      {/* Heapify explanation */}
      <Card>
        <CardHeader><CardTitle>Building a Heap: Heapify</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
              <h4 className="font-medium">Naive: Insert one by one — O(n log n)</h4>
              <p className="text-sm text-muted-foreground">Each insert is O(log n), repeated n times</p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <h4 className="font-medium">Efficient: Bottom-up heapify — O(n)</h4>
              <p className="text-sm text-muted-foreground">Start from last non-leaf, sift down. Most nodes are near bottom and sift down a short distance.</p>
            </div>
          </div>
          <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto text-sm font-mono">{`void heapify(int[] arr) {
    int n = arr.length;
    // Start from last non-leaf node
    for (int i = n / 2 - 1; i >= 0; i--) {
        bubbleDown(arr, n, i);
    }
}`}</pre>
        </CardContent>
      </Card>

      {/* Heap Sort */}
      <Card>
        <CardHeader><CardTitle>Heap Sort Algorithm</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto text-sm font-mono">{`void heapSort(int[] arr) {
    int n = arr.length;
    // Phase 1: Build max-heap
    for (int i = n / 2 - 1; i >= 0; i--)
        bubbleDown(arr, n, i);
    // Phase 2: Extract elements one by one
    for (int i = n - 1; i > 0; i--) {
        swap(arr, 0, i);       // Move max to end
        bubbleDown(arr, i, 0); // Restore heap
    }
}`}</pre>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b">
                <th className="text-left p-2">Operation</th><th className="text-left p-2">Time</th><th className="text-left p-2">Space</th>
              </tr></thead>
              <tbody>
                <tr className="border-b"><td className="p-2">Build Heap</td><td className="p-2">O(n)</td><td className="p-2">O(1)</td></tr>
                <tr className="border-b"><td className="p-2">Heap Sort</td><td className="p-2">O(n log n)</td><td className="p-2">O(1)</td></tr>
                <tr className="border-b"><td className="p-2">Insert</td><td className="p-2">O(log n)</td><td className="p-2">O(1)</td></tr>
                <tr><td className="p-2">Extract Max/Min</td><td className="p-2">O(log n)</td><td className="p-2">O(1)</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground">
            <strong>Connection:</strong> Heap sort is also covered in the{' '}
            <Link href="/modules/sorting/heap" className="text-primary hover:underline">Sorting module</Link>.
            It&apos;s not stable but is in-place with guaranteed O(n log n).
          </p>
        </CardContent>
      </Card>

      {/* Visualizer */}
      <HeapSortVisualizer />

      <div className="flex justify-between">
        <Link href="/modules/heaps/basics">
          <Button variant="outline" className="gap-2"><ArrowLeft className="w-4 h-4" /> Heap Basics</Button>
        </Link>
        <Link href="/modules/heaps/priority-queue">
          <Button className="gap-2">Priority Queue <ArrowRight className="w-4 h-4" /></Button>
        </Link>
      </div>
    </div>
  );
}
