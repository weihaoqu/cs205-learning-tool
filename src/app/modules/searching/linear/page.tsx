'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { SearchVisualizer } from '@/components/visualizer/searching';
import { linearSearchCode } from '@/lib/algorithms/searching';

export default function LinearSearchPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div />
        <Link href="/modules/searching/binary">
          <Button variant="ghost" className="gap-2">
            Binary Search <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-4">Linear Search</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          The simplest search algorithm — check every element one by one until you find the target.
        </p>
      </div>

      {/* Explanation */}
      <Card>
        <CardHeader>
          <CardTitle>How Linear Search Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Linear search (or sequential search) scans each element of an array from the
            beginning until it finds the target value or reaches the end.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200">Best Case: O(1)</h4>
              <p className="text-sm text-green-600 dark:text-green-300">Target is the first element</p>
            </div>
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Average Case: O(n/2)</h4>
              <p className="text-sm text-yellow-600 dark:text-yellow-300">Target is somewhere in the middle</p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
              <h4 className="font-medium text-red-800 dark:text-red-200">Worst Case: O(n)</h4>
              <p className="text-sm text-red-600 dark:text-red-300">Target is last or not present</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200">Advantages</h4>
              <ul className="text-sm text-blue-600 dark:text-blue-300 list-disc list-inside mt-1">
                <li>Works on unsorted arrays</li>
                <li>Simple to implement</li>
                <li>Works on linked lists</li>
                <li>No extra space needed</li>
              </ul>
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              <h4 className="font-medium text-purple-800 dark:text-purple-200">Disadvantages</h4>
              <ul className="text-sm text-purple-600 dark:text-purple-300 list-disc list-inside mt-1">
                <li>Slow for large arrays</li>
                <li>Must check every element in worst case</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Java Code */}
      <Card>
        <CardHeader>
          <CardTitle>Java Implementation</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto text-sm font-mono">
            {linearSearchCode}
          </pre>
        </CardContent>
      </Card>

      {/* Visualizer */}
      <SearchVisualizer mode="linear" />

      {/* Navigation */}
      <div className="flex justify-end">
        <Link href="/modules/searching/binary">
          <Button className="gap-2">
            Binary Search <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
