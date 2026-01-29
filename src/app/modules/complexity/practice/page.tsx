'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { CheatSheet } from '@/components/visualizer/complexity';

export default function PracticePage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link href="/modules/complexity/patterns">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Code Patterns
          </Button>
        </Link>
        <Link href="/quiz">
          <Button variant="default" className="gap-2">
            Take the Quiz
          </Button>
        </Link>
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-4">Practice & Reference</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Use the cheat sheet for quick reference, and learn about common mistakes
          to avoid in your complexity analysis.
        </p>
      </div>

      {/* Cheat Sheet */}
      <CheatSheet showSpaceComplexity={true} />

      {/* Common Mistakes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            Common Mistakes to Avoid
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mistake 1 */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-red-50 dark:bg-red-900 px-4 py-3 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="font-medium text-red-800 dark:text-red-200">
                Mistake: &quot;Nested loops always mean O(n²)&quot;
              </span>
            </div>
            <div className="p-4 space-y-3">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
                <code>{`void process(int[] arr) {
    for (int i = 0; i < arr.length; i++) {     // n times
        for (int j = 0; j < 5; j++) {           // 5 times (constant!)
            System.out.println(arr[i] + j);
        }
    }
}
// This is O(n), NOT O(n²)!`}</code>
              </pre>
              <div className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-green-800 dark:text-green-200">Correct understanding:</span>
                  <p className="text-green-700 dark:text-green-300">
                    The inner loop runs a fixed 5 times, not n times. 5n operations = O(n).
                    Only when BOTH loops depend on n do we get O(n²).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mistake 2 */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-red-50 dark:bg-red-900 px-4 py-3 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="font-medium text-red-800 dark:text-red-200">
                Mistake: &quot;Two O(n) loops make O(n²)&quot;
              </span>
            </div>
            <div className="p-4 space-y-3">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
                <code>{`void twoLoops(int[] arr) {
    // First loop: O(n)
    for (int i = 0; i < arr.length; i++) {
        System.out.println(arr[i]);
    }
    // Second loop: O(n)
    for (int i = 0; i < arr.length; i++) {
        System.out.println(arr[i] * 2);
    }
}
// This is O(n) + O(n) = O(2n) = O(n), NOT O(n²)!`}</code>
              </pre>
              <div className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-green-800 dark:text-green-200">Correct understanding:</span>
                  <p className="text-green-700 dark:text-green-300">
                    Sequential (one after another) operations ADD. Nested operations MULTIPLY.
                    O(n) + O(n) = O(2n) = O(n). Only O(n) × O(n) = O(n²).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mistake 3 */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-red-50 dark:bg-red-900 px-4 py-3 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="font-medium text-red-800 dark:text-red-200">
                Mistake: &quot;Constants matter in Big O&quot;
              </span>
            </div>
            <div className="p-4 space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded">
                  <div className="font-medium mb-2">What students think:</div>
                  <ul className="text-sm space-y-1">
                    <li>O(2n) is worse than O(n)</li>
                    <li>O(n² + 1000) is worse than O(n²)</li>
                    <li>O(n/2) is better than O(n)</li>
                  </ul>
                </div>
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded">
                  <div className="font-medium mb-2">Reality:</div>
                  <ul className="text-sm space-y-1">
                    <li>O(2n) = O(n)</li>
                    <li>O(n² + 1000) = O(n²)</li>
                    <li>O(n/2) = O(n)</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-green-800 dark:text-green-200">Correct understanding:</span>
                  <p className="text-green-700 dark:text-green-300">
                    Big O cares about growth rate, not exact count. Constants and lower-order
                    terms become insignificant as n grows large. We always simplify to the
                    dominant term.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mistake 4 */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-red-50 dark:bg-red-900 px-4 py-3 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="font-medium text-red-800 dark:text-red-200">
                Mistake: Confusing best, worst, and average case
              </span>
            </div>
            <div className="p-4 space-y-3">
              <p>Consider linear search:</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
                <code>{`int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}`}</code>
              </pre>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded">
                  <div className="font-medium text-green-800 dark:text-green-200">Best Case</div>
                  <div className="text-2xl font-bold text-green-600">O(1)</div>
                  <p className="text-sm text-green-700 dark:text-green-300">Target is first element</p>
                </div>
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded">
                  <div className="font-medium text-yellow-800 dark:text-yellow-200">Average Case</div>
                  <div className="text-2xl font-bold text-yellow-600">O(n/2) = O(n)</div>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">Target is in middle</p>
                </div>
                <div className="p-3 bg-red-100 dark:bg-red-900 rounded">
                  <div className="font-medium text-red-800 dark:text-red-200">Worst Case</div>
                  <div className="text-2xl font-bold text-red-600">O(n)</div>
                  <p className="text-sm text-red-700 dark:text-red-300">Target is last or missing</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-blue-800 dark:text-blue-200">Remember:</span>
                  <p className="text-blue-700 dark:text-blue-300">
                    When we say an algorithm is O(n), we usually mean the <strong>worst case</strong>.
                    This is the most useful measure because it gives an upper bound guarantee.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Practice Links */}
      <Card>
        <CardHeader>
          <CardTitle>Ready to Practice?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/exercises">
              <div className="p-4 border rounded-lg hover:border-blue-500 hover:shadow-md transition-all cursor-pointer">
                <h4 className="font-medium text-lg mb-2">Exercises</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Practice identifying Big O from code snippets with immediate feedback.
                </p>
              </div>
            </Link>
            <Link href="/quiz">
              <div className="p-4 border rounded-lg hover:border-green-500 hover:shadow-md transition-all cursor-pointer">
                <h4 className="font-medium text-lg mb-2">Quiz</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Test your understanding with conceptual and code tracing questions.
                </p>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Link href="/modules/complexity/patterns">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Code Patterns
          </Button>
        </Link>
        <Link href="/modules/complexity">
          <Button variant="outline" className="gap-2">
            Back to Overview
          </Button>
        </Link>
      </div>
    </div>
  );
}
