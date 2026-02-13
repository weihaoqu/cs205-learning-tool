'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { HeapVisualizer } from '@/components/visualizer/heaps';

export default function HeapBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div />
        <Link href="/modules/heaps/heapsort">
          <Button variant="ghost" className="gap-2">
            Heap Sort <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-4">Heap Basics</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          A heap is a complete binary tree that satisfies the heap property — every parent
          is greater (max-heap) or smaller (min-heap) than its children.
        </p>
      </div>

      {/* Heap Property */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-base">Max-Heap</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm mb-2">Parent &ge; Children (largest at root)</p>
            <pre className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono text-center">{`       50
      /  \\
    30    40
   / \\   / \\
  10 20 35 15`}</pre>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Min-Heap</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm mb-2">Parent &le; Children (smallest at root)</p>
            <pre className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono text-center">{`       10
      /  \\
    20    15
   / \\   / \\
  30 40 35 50`}</pre>
          </CardContent>
        </Card>
      </div>

      {/* Array Representation */}
      <Card>
        <CardHeader><CardTitle>Array Representation</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm">A heap is stored as an array. For a node at index <code className="bg-muted px-1 rounded">i</code>:</p>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-center">
              <div className="font-mono text-sm font-bold">Parent = (i - 1) / 2</div>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg text-center">
              <div className="font-mono text-sm font-bold">Left = 2 * i + 1</div>
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg text-center">
              <div className="font-mono text-sm font-bold">Right = 2 * i + 2</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Java Code */}
      <Card>
        <CardHeader><CardTitle>Java: Insert (Bubble Up)</CardTitle></CardHeader>
        <CardContent>
          <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto text-sm font-mono">{`void insert(int value) {
    heap[size] = value;
    size++;
    bubbleUp(size - 1);
}

void bubbleUp(int index) {
    while (index > 0) {
        int parent = (index - 1) / 2;
        if (heap[index] > heap[parent]) { // max-heap
            swap(index, parent);
            index = parent;
        } else break;
    }
}`}</pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Java: Extract Max (Bubble Down)</CardTitle></CardHeader>
        <CardContent>
          <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto text-sm font-mono">{`int extractMax() {
    int max = heap[0];
    heap[0] = heap[size - 1];
    size--;
    bubbleDown(0);
    return max;
}

void bubbleDown(int index) {
    while (2 * index + 1 < size) {
        int largest = index;
        int left = 2 * index + 1, right = 2 * index + 2;
        if (left < size && heap[left] > heap[largest]) largest = left;
        if (right < size && heap[right] > heap[largest]) largest = right;
        if (largest != index) {
            swap(index, largest);
            index = largest;
        } else break;
    }
}`}</pre>
        </CardContent>
      </Card>

      {/* Interactive Visualizer */}
      <HeapVisualizer />

      {/* Navigation */}
      <div className="flex justify-end">
        <Link href="/modules/heaps/heapsort">
          <Button className="gap-2">Heap Sort <ArrowRight className="w-4 h-4" /></Button>
        </Link>
      </div>
    </div>
  );
}
