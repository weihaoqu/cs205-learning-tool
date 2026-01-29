'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Repeat, Layers, GitBranch, Scale } from 'lucide-react';

export default function RecursionOverviewPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Recursion</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Learn how functions can call themselves to solve problems by breaking them into smaller pieces.
        </p>
      </div>

      {/* What is Recursion? */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Repeat className="w-5 h-5" />
            What is Recursion?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            <strong>Recursion</strong> is when a function calls itself to solve a problem.
            It&apos;s like solving a puzzle by breaking it into smaller, identical puzzles.
          </p>
          <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
            <p className="text-blue-800 dark:text-blue-200 italic">
              &quot;To understand recursion, you must first understand recursion.&quot;
            </p>
          </div>
          <p>
            Every recursive function has two essential parts:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                1. Base Case
              </h4>
              <p className="text-sm text-green-600 dark:text-green-300">
                The condition that stops the recursion. Without it, the function would call
                itself forever!
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
              <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                2. Recursive Case
              </h4>
              <p className="text-sm text-purple-600 dark:text-purple-300">
                The function calls itself with a smaller/simpler version of the problem,
                moving toward the base case.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Structure of a Recursive Function */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="w-5 h-5" />
            Structure of a Recursive Function
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
            <code>{`returnType recursiveFunction(parameters) {
    // BASE CASE: When to stop
    if (baseCondition) {
        return baseValue;
    }

    // RECURSIVE CASE: Call itself with smaller problem
    return recursiveFunction(smallerProblem);
}`}</code>
          </pre>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
            <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
              Key Insight
            </h4>
            <p className="text-sm text-yellow-600 dark:text-yellow-300">
              The recursive case must make progress toward the base case. If it doesn&apos;t,
              the recursion will never end!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Visual Analogy */}
      <Card>
        <CardHeader>
          <CardTitle>Visual Analogy: Russian Nesting Dolls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Think of recursion like Russian nesting dolls (matryoshka):
          </p>
          <div className="flex items-center justify-center gap-2 p-4">
            <div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
              Open
            </div>
            <span className="text-2xl">→</span>
            <div className="w-16 h-16 rounded-full bg-red-400 flex items-center justify-center text-white text-xs">
              Open
            </div>
            <span className="text-2xl">→</span>
            <div className="w-12 h-12 rounded-full bg-red-300 flex items-center justify-center text-white text-xs">
              Open
            </div>
            <span className="text-2xl">→</span>
            <div className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center text-xs">
              Done!
            </div>
          </div>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Each doll contains a smaller doll (recursive case)</li>
            <li>The smallest doll has nothing inside (base case)</li>
            <li>You must open each doll to reach the smallest one</li>
            <li>Then you close them in reverse order (returning values)</li>
          </ul>
        </CardContent>
      </Card>

      {/* How the Call Stack Works */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            How the Call Stack Works
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            When a recursive function calls itself, each call is added to the <strong>call stack</strong>:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Going Down (Calling)</h4>
              <div className="space-y-1">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded text-sm">factorial(4)</div>
                <div className="p-2 bg-blue-200 dark:bg-blue-800 rounded text-sm ml-4">factorial(3)</div>
                <div className="p-2 bg-blue-300 dark:bg-blue-700 rounded text-sm ml-8">factorial(2)</div>
                <div className="p-2 bg-blue-400 dark:bg-blue-600 rounded text-sm ml-12">factorial(1) ← base case!</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Coming Back Up (Returning)</h4>
              <div className="space-y-1">
                <div className="p-2 bg-green-400 dark:bg-green-600 rounded text-sm ml-12">returns 1</div>
                <div className="p-2 bg-green-300 dark:bg-green-700 rounded text-sm ml-8">returns 2 × 1 = 2</div>
                <div className="p-2 bg-green-200 dark:bg-green-800 rounded text-sm ml-4">returns 3 × 2 = 6</div>
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded text-sm">returns 4 × 6 = 24</div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Each call waits for its recursive call to return before it can complete.
            The stack grows until we hit the base case, then unwinds as values are returned.
          </p>
        </CardContent>
      </Card>

      {/* When to Use Recursion */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="w-5 h-5" />
            When to Use Recursion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                Good for Recursion
              </h4>
              <ul className="text-sm text-green-600 dark:text-green-300 space-y-1">
                <li>• Problems with recursive structure (trees, graphs)</li>
                <li>• Divide and conquer algorithms</li>
                <li>• When the problem naturally breaks into smaller same-type problems</li>
                <li>• When code clarity matters more than performance</li>
              </ul>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900 rounded-lg">
              <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">
                Consider Iteration Instead
              </h4>
              <ul className="text-sm text-red-600 dark:text-red-300 space-y-1">
                <li>• Simple loops or counting</li>
                <li>• When performance is critical</li>
                <li>• Very deep recursion (risk of stack overflow)</li>
                <li>• When iterative solution is just as clear</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Module Navigation */}
      <Card>
        <CardHeader>
          <CardTitle>Explore This Module</CardTitle>
          <CardDescription>
            Learn recursion through interactive examples and visualizations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/modules/recursion/factorial">
              <div className="p-4 border rounded-lg hover:border-blue-500 hover:shadow-md transition-all cursor-pointer">
                <Layers className="w-8 h-8 text-blue-500 mb-2" />
                <h4 className="font-medium">Factorial & Sum</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Interactive call stack visualizer with step-by-step animation
                </p>
              </div>
            </Link>
            <Link href="/modules/recursion/fibonacci">
              <div className="p-4 border rounded-lg hover:border-orange-500 hover:shadow-md transition-all cursor-pointer">
                <GitBranch className="w-8 h-8 text-orange-500 mb-2" />
                <h4 className="font-medium">Fibonacci</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Call tree visualization showing exponential growth
                </p>
              </div>
            </Link>
            <Link href="/modules/recursion/comparison">
              <div className="p-4 border rounded-lg hover:border-green-500 hover:shadow-md transition-all cursor-pointer">
                <Scale className="w-8 h-8 text-green-500 mb-2" />
                <h4 className="font-medium">Recursion vs Iteration</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Side-by-side comparison with performance demo
                </p>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <div className="flex justify-center">
        <Link href="/modules/recursion/factorial">
          <Button size="lg" className="gap-2">
            Start with Factorial & Sum <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
