'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { SearchRaceVisualizer } from '@/components/visualizer/searching';

export default function SearchComparisonPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/modules/searching/binary">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Binary Search
          </Button>
        </Link>
        <div />
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-4">Comparison & Practice</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          See the dramatic difference in performance between linear and binary search,
          and learn when to use each.
        </p>
      </div>

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Linear vs Binary Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Aspect</th>
                  <th className="text-left p-3 font-medium">Linear Search</th>
                  <th className="text-left p-3 font-medium">Binary Search</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-medium">Time Complexity</td>
                  <td className="p-3">O(n)</td>
                  <td className="p-3">O(log n)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Space Complexity</td>
                  <td className="p-3">O(1)</td>
                  <td className="p-3">O(1) iterative / O(log n) recursive</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Prerequisite</td>
                  <td className="p-3">None</td>
                  <td className="p-3">Sorted array</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Best For</td>
                  <td className="p-3">Small/unsorted arrays</td>
                  <td className="p-3">Large sorted arrays</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Worst Case</td>
                  <td className="p-3">Must check every element</td>
                  <td className="p-3">log\u2082(n) comparisons</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Works on Linked Lists?</td>
                  <td className="p-3">Yes</td>
                  <td className="p-3">No (needs random access)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* When to use */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">When to Use Linear Search</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2 list-disc list-inside">
              <li>Data is unsorted and sorting isn&apos;t worth it</li>
              <li>Array is small (n &lt; ~20)</li>
              <li>Searching a linked list</li>
              <li>Need to find all occurrences</li>
              <li>Searching only once (not worth sorting first)</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">When to Use Binary Search</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2 list-disc list-inside">
              <li>Array is already sorted</li>
              <li>Array is large and searched frequently</li>
              <li>Need O(log n) performance</li>
              <li>Data is in a random-access structure (array)</li>
              <li>Related:{' '}
                <Link href="/modules/complexity" className="text-primary hover:underline">
                  Algorithm Complexity
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Scale demonstration */}
      <Card>
        <CardHeader>
          <CardTitle>Scale: Why O(log n) Matters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Array Size</th>
                  <th className="text-left p-3 font-medium">Linear (worst)</th>
                  <th className="text-left p-3 font-medium">Binary (worst)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [10, 10, 4],
                  [100, 100, 7],
                  [1000, 1000, 10],
                  [1000000, 1000000, 20],
                  [1000000000, 1000000000, 30],
                ].map(([size, linear, binary]) => (
                  <tr key={size} className="border-b">
                    <td className="p-3 font-mono">{Number(size).toLocaleString()}</td>
                    <td className="p-3 font-mono">{Number(linear).toLocaleString()} comparisons</td>
                    <td className="p-3 font-mono text-green-600">{binary} comparisons</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            For 1 billion elements, binary search needs only 30 comparisons!
          </p>
        </CardContent>
      </Card>

      {/* Race Visualizer */}
      <SearchRaceVisualizer />

      {/* Navigation */}
      <div className="flex justify-start">
        <Link href="/modules/searching/binary">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Binary Search
          </Button>
        </Link>
      </div>
    </div>
  );
}
