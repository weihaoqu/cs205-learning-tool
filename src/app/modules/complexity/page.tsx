'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Code, BookOpen, Zap } from 'lucide-react';
import { complexityInfo, ComplexityType } from '@/lib/algorithms/complexity';

const ALL_COMPLEXITIES: ComplexityType[] = [
  'O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)'
];

export default function ComplexityOverviewPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Algorithm Complexity (Big O)</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Learn how to analyze algorithm efficiency and understand how code scales with input size.
        </p>
      </div>

      {/* What is Big O? */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            What is Big O Notation?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            <strong>Big O notation</strong> describes how an algorithm&apos;s performance scales as the
            input size grows. It tells us the <em>worst-case</em> number of operations needed.
          </p>
          <p>
            When we write <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">O(n)</code>,
            we mean that as the input size <em>n</em> grows, the number of operations grows
            proportionally. Double the input, roughly double the work.
          </p>
          <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Key Point</h4>
            <p className="text-blue-600 dark:text-blue-300">
              Big O measures <strong>operations</strong>, not actual time. A O(n) algorithm
              might be slower than O(n²) for small inputs, but will always be faster for
              large enough inputs.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Why Does It Matter? */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Why Does Complexity Matter?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            In the real world, efficiency can make or break your application. Consider these scenarios:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 dark:bg-red-900 rounded-lg">
              <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">
                Searching 1 Billion Records
              </h4>
              <ul className="text-sm text-red-600 dark:text-red-300 space-y-1">
                <li>• <strong>O(n) Linear Search:</strong> 1,000,000,000 operations</li>
                <li>• <strong>O(log n) Binary Search:</strong> ~30 operations</li>
              </ul>
              <p className="text-sm mt-2 text-red-700 dark:text-red-200">
                That&apos;s 33 million times faster!
              </p>
            </div>
            <div className="p-4 bg-orange-50 dark:bg-orange-900 rounded-lg">
              <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-2">
                Mobile App Performance
              </h4>
              <p className="text-sm text-orange-600 dark:text-orange-300">
                On a phone with limited CPU, an O(n²) algorithm sorting 10,000 items
                could freeze your app, while O(n log n) completes instantly.
              </p>
            </div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
            <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
              Job Interviews
            </h4>
            <p className="text-sm text-green-600 dark:text-green-300">
              Every technical interview asks about Big O. Understanding complexity
              is essential for getting software engineering jobs.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Complexity Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Common Complexities at a Glance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ALL_COMPLEXITIES.map(complexity => {
              const info = complexityInfo[complexity];
              return (
                <div
                  key={complexity}
                  className="p-4 rounded-lg border-2 hover:shadow-md transition-shadow"
                  style={{ borderColor: info.color }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="px-3 py-1 rounded text-white font-bold"
                      style={{ backgroundColor: info.color }}
                    >
                      {complexity}
                    </span>
                  </div>
                  <h4 className="font-medium mb-1">{info.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {info.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    Examples: {info.examples.slice(0, 2).join(', ')}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Space Complexity Intro */}
      <Card>
        <CardHeader>
          <CardTitle>Brief Introduction to Space Complexity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            While time complexity measures operations, <strong>space complexity</strong> measures
            how much memory an algorithm uses. The same Big O notation applies:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>O(1) space:</strong> Uses a fixed amount of memory regardless of input
              (a few variables)
            </li>
            <li>
              <strong>O(n) space:</strong> Memory grows with input size (like creating a copy of an array)
            </li>
            <li>
              <strong>O(n²) space:</strong> Memory grows quadratically (like a 2D matrix of size n×n)
            </li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400">
            There&apos;s often a trade-off between time and space: you can sometimes make
            an algorithm faster by using more memory, and vice versa.
          </p>
        </CardContent>
      </Card>

      {/* Module Navigation */}
      <Card>
        <CardHeader>
          <CardTitle>Explore This Module</CardTitle>
          <CardDescription>
            Navigate through the different sections to master algorithm complexity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/modules/complexity/visualization">
              <div className="p-4 border rounded-lg hover:border-blue-500 hover:shadow-md transition-all cursor-pointer">
                <TrendingUp className="w-8 h-8 text-blue-500 mb-2" />
                <h4 className="font-medium">Growth Visualization</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Interactive graph comparing how complexities grow
                </p>
              </div>
            </Link>
            <Link href="/modules/complexity/patterns">
              <div className="p-4 border rounded-lg hover:border-green-500 hover:shadow-md transition-all cursor-pointer">
                <Code className="w-8 h-8 text-green-500 mb-2" />
                <h4 className="font-medium">Code Patterns</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Learn to recognize complexity from code structure
                </p>
              </div>
            </Link>
            <Link href="/modules/complexity/practice">
              <div className="p-4 border rounded-lg hover:border-purple-500 hover:shadow-md transition-all cursor-pointer">
                <BookOpen className="w-8 h-8 text-purple-500 mb-2" />
                <h4 className="font-medium">Practice & Reference</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Cheat sheet, common mistakes, and exercises
                </p>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <div className="flex justify-center">
        <Link href="/modules/complexity/visualization">
          <Button size="lg" className="gap-2">
            Start with Visualization <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
