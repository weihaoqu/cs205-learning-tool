'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, AlertTriangle, XCircle } from 'lucide-react';
import { CallTreeVisualizer } from '@/components/visualizer/recursion';
import { fibonacciExample } from '@/lib/algorithms/recursion';

export default function FibonacciPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link href="/modules/recursion/factorial">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Factorial & Sum
          </Button>
        </Link>
        <Link href="/modules/recursion/comparison">
          <Button variant="ghost" className="gap-2">
            Comparison <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-4">Fibonacci</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          The Fibonacci sequence demonstrates tree-like recursion where each call
          spawns multiple recursive calls.
        </p>
      </div>

      {/* Fibonacci Explanation */}
      <Card>
        <CardHeader>
          <CardTitle>Understanding Fibonacci</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            The Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, ...
          </p>
          <p>
            Each number is the sum of the two preceding ones:
          </p>
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-center">
            fib(n) = fib(n-1) + fib(n-2)
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-green-50 dark:bg-green-900 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200">Base Cases</h4>
              <p className="text-sm text-green-600 dark:text-green-300">
                fib(0) = 0, fib(1) = 1
              </p>
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-900 rounded-lg">
              <h4 className="font-medium text-purple-800 dark:text-purple-200">Recursive Case</h4>
              <p className="text-sm text-purple-600 dark:text-purple-300">
                fib(n) = fib(n-1) + fib(n-2)
              </p>
            </div>
          </div>

          {/* Code */}
          <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
            <code>{fibonacciExample.code}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Call Tree Visualizer */}
      <CallTreeVisualizer maxN={8} />

      {/* Common Pitfalls Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            Common Recursion Pitfalls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Pitfall 1: Missing Base Case */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-red-50 dark:bg-red-900 px-4 py-3 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="font-medium text-red-800 dark:text-red-200">
                Pitfall 1: Missing Base Case
              </span>
            </div>
            <div className="p-4 space-y-3">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
                <code>{`// BAD: No base case = infinite recursion!
int badFactorial(int n) {
    return n * badFactorial(n - 1);  // Never stops!
}

// This will crash with StackOverflowError`}</code>
              </pre>
              <div className="p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                <span className="font-medium text-green-800 dark:text-green-200">Fix: </span>
                <span className="text-green-600 dark:text-green-300">
                  Always include a base case that returns without recursing.
                </span>
              </div>
            </div>
          </div>

          {/* Pitfall 2: Base Case Never Reached */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-red-50 dark:bg-red-900 px-4 py-3 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="font-medium text-red-800 dark:text-red-200">
                Pitfall 2: Base Case Never Reached
              </span>
            </div>
            <div className="p-4 space-y-3">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
                <code>{`// BAD: Recursion doesn't progress toward base case
int badSum(int n) {
    if (n == 0) return 0;
    return n + badSum(n);  // n never changes!
}

// This will also crash - n stays the same forever`}</code>
              </pre>
              <div className="p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                <span className="font-medium text-green-800 dark:text-green-200">Fix: </span>
                <span className="text-green-600 dark:text-green-300">
                  Ensure the recursive call moves toward the base case (e.g., n-1 not n).
                </span>
              </div>
            </div>
          </div>

          {/* Pitfall 3: Stack Overflow */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-red-50 dark:bg-red-900 px-4 py-3 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="font-medium text-red-800 dark:text-red-200">
                Pitfall 3: Stack Overflow from Deep Recursion
              </span>
            </div>
            <div className="p-4 space-y-3">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
                <code>{`// This code is CORRECT but will crash for large n
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

factorial(100000);  // StackOverflowError!
// The stack can only hold ~10,000 frames`}</code>
              </pre>
              <div className="p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                <span className="font-medium text-green-800 dark:text-green-200">Fix: </span>
                <span className="text-green-600 dark:text-green-300">
                  Use iteration for very large inputs, or use tail recursion (if supported).
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Why Fibonacci is Inefficient */}
      <Card>
        <CardHeader>
          <CardTitle>Why Naive Fibonacci is Inefficient</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            The tree visualization above shows the problem: <strong>repeated calculations</strong>.
          </p>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
            <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
              The Problem: Exponential Time Complexity O(2^n)
            </h4>
            <p className="text-sm text-yellow-600 dark:text-yellow-300">
              For fib(5), we calculate fib(2) three times and fib(3) twice!
              As n grows, the wasted work grows exponentially.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border px-4 py-2">n</th>
                  <th className="border px-4 py-2">Total Calls</th>
                  <th className="border px-4 py-2">Time (approx)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border px-4 py-2 text-center">10</td><td className="border px-4 py-2 text-center">177</td><td className="border px-4 py-2 text-center">instant</td></tr>
                <tr><td className="border px-4 py-2 text-center">20</td><td className="border px-4 py-2 text-center">21,891</td><td className="border px-4 py-2 text-center">instant</td></tr>
                <tr><td className="border px-4 py-2 text-center">30</td><td className="border px-4 py-2 text-center">2,692,537</td><td className="border px-4 py-2 text-center">~1 second</td></tr>
                <tr><td className="border px-4 py-2 text-center">40</td><td className="border px-4 py-2 text-center">331,160,281</td><td className="border px-4 py-2 text-center">~1 minute</td></tr>
                <tr><td className="border px-4 py-2 text-center">50</td><td className="border px-4 py-2 text-center">40+ billion</td><td className="border px-4 py-2 text-center">~2 hours</td></tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
              The Solution: Memoization or Iteration
            </h4>
            <p className="text-sm text-blue-600 dark:text-blue-300">
              By storing previously calculated values (memoization) or using a simple loop,
              we can reduce this to O(n) time. We&apos;ll compare approaches on the next page!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Link href="/modules/recursion/factorial">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Factorial & Sum
          </Button>
        </Link>
        <Link href="/modules/recursion/comparison">
          <Button className="gap-2">
            Recursion vs Iteration <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
