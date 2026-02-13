'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SearchVisualizer } from '@/components/visualizer/searching';
import { binarySearchIterativeCode, binarySearchRecursiveCode } from '@/lib/algorithms/searching';

export default function BinarySearchPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/modules/searching/linear">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Linear Search
          </Button>
        </Link>
        <Link href="/modules/searching/comparison">
          <Button variant="ghost" className="gap-2">
            Comparison <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-4">Binary Search</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          A divide-and-conquer algorithm that halves the search space with each comparison.
          Requires a sorted array.
        </p>
      </div>

      {/* How it works */}
      <Card>
        <CardHeader>
          <CardTitle>How Binary Search Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <strong>Prerequisite:</strong> The array must be sorted!
          </div>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Set <code className="bg-muted px-1 rounded">low = 0</code> and <code className="bg-muted px-1 rounded">high = arr.length - 1</code></li>
            <li>Calculate <code className="bg-muted px-1 rounded">mid = low + (high - low) / 2</code></li>
            <li>If <code className="bg-muted px-1 rounded">arr[mid] == target</code>, found it!</li>
            <li>If <code className="bg-muted px-1 rounded">arr[mid] &lt; target</code>, search right half: <code className="bg-muted px-1 rounded">low = mid + 1</code></li>
            <li>If <code className="bg-muted px-1 rounded">arr[mid] &gt; target</code>, search left half: <code className="bg-muted px-1 rounded">high = mid - 1</code></li>
            <li>Repeat until found or <code className="bg-muted px-1 rounded">low &gt; high</code></li>
          </ol>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200">Time Complexity: O(log n)</h4>
              <p className="text-sm text-green-600 dark:text-green-300">
                Each step eliminates half the remaining elements. For 1,024 elements, at most 10 comparisons!
              </p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200">Space Complexity</h4>
              <p className="text-sm text-blue-600 dark:text-blue-300">
                Iterative: O(1) | Recursive: O(log n) stack space
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            <strong>Connection to Recursion:</strong>{' '}
            <Link href="/modules/recursion" className="text-primary hover:underline">
              Binary search can be implemented recursively
            </Link>
            , where each call handles a smaller subarray.
          </p>
        </CardContent>
      </Card>

      {/* Java Code */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Iterative Implementation</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto text-sm font-mono">
              {binarySearchIterativeCode}
            </pre>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recursive Implementation</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto text-sm font-mono">
              {binarySearchRecursiveCode}
            </pre>
          </CardContent>
        </Card>
      </div>

      {/* Visualizer */}
      <SearchVisualizer mode="binary" />

      {/* Navigation */}
      <div className="flex justify-between">
        <Link href="/modules/searching/linear">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Linear Search
          </Button>
        </Link>
        <Link href="/modules/searching/comparison">
          <Button className="gap-2">
            Comparison <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
