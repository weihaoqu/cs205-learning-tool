'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CallStackVisualizer } from '@/components/visualizer/recursion';
import {
  factorialExample,
  sumExample,
  generateFactorialTrace,
  generateSumTrace,
} from '@/lib/algorithms/recursion';

export default function FactorialPage() {
  const [selectedExample, setSelectedExample] = useState<'factorial' | 'sum'>('factorial');

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link href="/modules/recursion">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Overview
          </Button>
        </Link>
        <Link href="/modules/recursion/fibonacci">
          <Button variant="ghost" className="gap-2">
            Fibonacci <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-4">Factorial & Sum</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Explore how recursion works with simple examples. Watch the call stack grow
          and unwind as the function calls itself.
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
          onClick={() => setSelectedExample('sum')}
          variant={selectedExample === 'sum' ? 'default' : 'outline'}
        >
          Array Sum
        </Button>
      </div>

      {/* Explanation Card */}
      {selectedExample === 'factorial' ? (
        <Card>
          <CardHeader>
            <CardTitle>Understanding Factorial</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The factorial of n (written as n!) is the product of all positive integers
              from 1 to n:
            </p>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-center">
              5! = 5 × 4 × 3 × 2 × 1 = 120
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                <h4 className="font-medium text-green-800 dark:text-green-200">Base Case</h4>
                <p className="text-sm text-green-600 dark:text-green-300">
                  When n ≤ 1, return 1 (0! = 1! = 1)
                </p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900 rounded-lg">
                <h4 className="font-medium text-purple-800 dark:text-purple-200">Recursive Case</h4>
                <p className="text-sm text-purple-600 dark:text-purple-300">
                  n! = n × (n-1)!
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Try entering different values of n below and watch how the call stack builds
              up until it reaches the base case, then unwinds with the calculated values.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Understanding Array Sum</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Recursively sum all elements in an array by adding the first element
              to the sum of the rest:
            </p>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-center">
              sum([1, 2, 3, 4]) = 1 + sum([2, 3, 4]) = 1 + 2 + 3 + 4 = 10
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                <h4 className="font-medium text-green-800 dark:text-green-200">Base Case</h4>
                <p className="text-sm text-green-600 dark:text-green-300">
                  When index reaches end of array, return 0
                </p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900 rounded-lg">
                <h4 className="font-medium text-purple-800 dark:text-purple-200">Recursive Case</h4>
                <p className="text-sm text-purple-600 dark:text-purple-300">
                  arr[index] + sum(arr, index + 1)
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Enter comma-separated numbers below and watch the recursion process each
              element from left to right.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Call Stack Visualizer */}
      {selectedExample === 'factorial' ? (
        <CallStackVisualizer
          example={factorialExample}
          generateTrace={(input) => generateFactorialTrace(input as number)}
        />
      ) : (
        <CallStackVisualizer
          example={sumExample}
          generateTrace={(input) => generateSumTrace(input as number[])}
        />
      )}

      {/* Memory Diagram Explanation */}
      <Card>
        <CardHeader>
          <CardTitle>Understanding the Call Stack Memory</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Each recursive call creates a new <strong>stack frame</strong> in memory:
          </p>
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="space-y-2">
              <div className="text-sm text-gray-500">← Stack grows downward</div>
              <div className="border-2 border-blue-500 p-3 rounded bg-white dark:bg-gray-900">
                <div className="font-mono text-sm">factorial(4)</div>
                <div className="text-xs text-gray-500">n = 4, waiting for factorial(3)</div>
              </div>
              <div className="border-2 border-blue-400 p-3 rounded bg-white dark:bg-gray-900 ml-4">
                <div className="font-mono text-sm">factorial(3)</div>
                <div className="text-xs text-gray-500">n = 3, waiting for factorial(2)</div>
              </div>
              <div className="border-2 border-blue-300 p-3 rounded bg-white dark:bg-gray-900 ml-8">
                <div className="font-mono text-sm">factorial(2)</div>
                <div className="text-xs text-gray-500">n = 2, waiting for factorial(1)</div>
              </div>
              <div className="border-2 border-green-500 p-3 rounded bg-white dark:bg-gray-900 ml-12">
                <div className="font-mono text-sm">factorial(1) ← Currently executing</div>
                <div className="text-xs text-gray-500">n = 1, base case! returns 1</div>
              </div>
            </div>
          </div>
          <ul className="text-sm space-y-1 ml-4 list-disc list-inside">
            <li>Each frame stores its own copy of parameters and local variables</li>
            <li>Frames are created on function call and destroyed on return</li>
            <li>Too many frames = StackOverflowError!</li>
          </ul>
        </CardContent>
      </Card>

      {/* Key Takeaways */}
      <Card>
        <CardHeader>
          <CardTitle>Key Takeaways</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                Stack Grows Then Shrinks
              </h4>
              <p className="text-sm text-blue-600 dark:text-blue-300">
                Each call adds a frame. When base case is hit, frames start returning
                and popping off the stack.
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                Returns Happen in Reverse
              </h4>
              <p className="text-sm text-green-600 dark:text-green-300">
                The deepest call returns first (LIFO - Last In, First Out).
                Results bubble up through the call chain.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Link href="/modules/recursion">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Overview
          </Button>
        </Link>
        <Link href="/modules/recursion/fibonacci">
          <Button className="gap-2">
            Fibonacci <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
