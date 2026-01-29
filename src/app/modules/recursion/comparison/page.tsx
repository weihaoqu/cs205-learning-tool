'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { RecursionComparison } from '@/components/visualizer/recursion';
import { factorialComparison, fibonacciComparison } from '@/lib/algorithms/recursion';

export default function ComparisonPage() {
  const [selectedExample, setSelectedExample] = useState<'factorial' | 'fibonacci'>('factorial');

  const example = selectedExample === 'factorial' ? factorialComparison : fibonacciComparison;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link href="/modules/recursion/fibonacci">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Fibonacci
          </Button>
        </Link>
        <Link href="/quiz">
          <Button variant="default" className="gap-2">
            Take the Quiz
          </Button>
        </Link>
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-4">Recursion vs Iteration</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Compare recursive and iterative solutions side-by-side. See how they differ
          in code, complexity, and performance.
        </p>
      </div>

      {/* Example Selector */}
      <div className="flex gap-2">
        <Button
          onClick={() => setSelectedExample('factorial')}
          variant={selectedExample === 'factorial' ? 'default' : 'outline'}
        >
          Factorial
        </Button>
        <Button
          onClick={() => setSelectedExample('fibonacci')}
          variant={selectedExample === 'fibonacci' ? 'default' : 'outline'}
        >
          Fibonacci
        </Button>
      </div>

      {/* Comparison Component */}
      <RecursionComparison example={example} />

      {/* Summary Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Decision Guide: When to Use Each</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border px-4 py-2 text-left">Situation</th>
                  <th className="border px-4 py-2 text-left">Recommendation</th>
                  <th className="border px-4 py-2 text-left">Why</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Tree/graph traversal</td>
                  <td className="border px-4 py-2 text-blue-600 font-medium">Recursion</td>
                  <td className="border px-4 py-2">Natural tree structure maps to recursive calls</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Simple counting/looping</td>
                  <td className="border px-4 py-2 text-green-600 font-medium">Iteration</td>
                  <td className="border px-4 py-2">Simpler, no stack overhead</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Divide and conquer</td>
                  <td className="border px-4 py-2 text-blue-600 font-medium">Recursion</td>
                  <td className="border px-4 py-2">Problem naturally splits into subproblems</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Very large input</td>
                  <td className="border px-4 py-2 text-green-600 font-medium">Iteration</td>
                  <td className="border px-4 py-2">Avoids stack overflow risk</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Performance critical</td>
                  <td className="border px-4 py-2 text-green-600 font-medium">Iteration</td>
                  <td className="border px-4 py-2">No function call overhead</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Code clarity important</td>
                  <td className="border px-4 py-2 text-blue-600 font-medium">Depends</td>
                  <td className="border px-4 py-2">Sometimes recursion is cleaner, sometimes iteration</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Key Differences Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Key Differences Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-blue-600">Recursion</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Elegant for problems with recursive structure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Often more intuitive for tree-like problems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Can express complex logic concisely</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Uses O(n) stack space</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Function call overhead</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Risk of stack overflow</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-green-600">Iteration</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Uses O(1) space (usually)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>No function call overhead</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>No stack overflow risk</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Generally faster</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Can be less intuitive for complex problems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span>May require explicit stack for tree-like problems</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Final Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                Start with Recursion, Optimize Later
              </h4>
              <p className="text-sm text-blue-600 dark:text-blue-300">
                If the problem has recursive structure, write the recursive solution first.
                It&apos;s often easier to get correct. Then optimize to iteration if needed.
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                Every Recursion Can Be Converted to Iteration
              </h4>
              <p className="text-sm text-green-600 dark:text-green-300">
                Any recursive algorithm can be written iteratively using an explicit stack.
                The question is whether the conversion improves clarity or performance.
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
              <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                Know Your Constraints
              </h4>
              <p className="text-sm text-purple-600 dark:text-purple-300">
                If input can be very large (n &gt; 10,000), prefer iteration.
                If you&apos;re working with trees or graphs, recursion is often natural and safe.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Link href="/modules/recursion/fibonacci">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Fibonacci
          </Button>
        </Link>
        <Link href="/modules/recursion">
          <Button variant="outline" className="gap-2">
            Back to Overview
          </Button>
        </Link>
      </div>
    </div>
  );
}
