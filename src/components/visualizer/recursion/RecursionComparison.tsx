'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Clock, Database } from 'lucide-react';
import { ComparisonExample } from '@/lib/algorithms/recursion';

interface RecursionComparisonProps {
  example: ComparisonExample;
}

export default function RecursionComparison({ example }: RecursionComparisonProps) {
  const [n, setN] = useState(10);
  const [results, setResults] = useState<{
    recursiveResult: number;
    iterativeResult: number;
    recursiveTime: number;
    iterativeTime: number;
  } | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const maxN = example.id === 'fibonacci-comparison' ? 35 : 20;

  const runComparison = async () => {
    setIsRunning(true);
    setResults(null);

    // Small delay to let UI update
    await new Promise(resolve => setTimeout(resolve, 100));

    // Run recursive version
    const recursiveStart = performance.now();
    let recursiveResult: number;
    try {
      recursiveResult = example.recursiveFunction(n);
    } catch {
      recursiveResult = -1; // Stack overflow
    }
    const recursiveTime = performance.now() - recursiveStart;

    // Run iterative version
    const iterativeStart = performance.now();
    const iterativeResult = example.iterativeFunction(n);
    const iterativeTime = performance.now() - iterativeStart;

    setResults({
      recursiveResult,
      iterativeResult,
      recursiveTime,
      iterativeTime,
    });
    setIsRunning(false);
  };

  const formatTime = (ms: number) => {
    if (ms < 0.01) return '< 0.01 ms';
    if (ms < 1) return `${ms.toFixed(2)} ms`;
    if (ms < 1000) return `${ms.toFixed(1)} ms`;
    return `${(ms / 1000).toFixed(2)} s`;
  };

  const speedRatio = results
    ? results.recursiveTime > 0
      ? (results.recursiveTime / Math.max(results.iterativeTime, 0.001)).toFixed(1)
      : '~'
    : null;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{example.name}: Recursive vs Iterative</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input control */}
        <div className="flex items-center gap-4 flex-wrap">
          <label className="text-sm font-medium">
            Input n: <span className="text-blue-600 font-bold">{n}</span>
          </label>
          <Slider
            value={[n]}
            onValueChange={(value) => setN(value[0])}
            min={1}
            max={maxN}
            step={1}
            className="w-48"
          />
          <Button onClick={runComparison} disabled={isRunning}>
            <Play className="w-4 h-4 mr-2" />
            {isRunning ? 'Running...' : 'Run Comparison'}
          </Button>
        </div>

        {/* Side-by-side code */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Recursive */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-blue-100 dark:bg-blue-900 px-4 py-2 font-medium text-blue-800 dark:text-blue-200">
              Recursive
            </div>
            <pre className="p-4 bg-gray-50 dark:bg-gray-900 text-sm overflow-x-auto">
              <code>{example.recursiveCode}</code>
            </pre>
            <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-sm">
              <div className="flex justify-between">
                <span>Time: <strong>{example.timeComplexity.recursive}</strong></span>
                <span>Space: <strong>{example.spaceComplexity.recursive}</strong></span>
              </div>
            </div>
          </div>

          {/* Iterative */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-green-100 dark:bg-green-900 px-4 py-2 font-medium text-green-800 dark:text-green-200">
              Iterative
            </div>
            <pre className="p-4 bg-gray-50 dark:bg-gray-900 text-sm overflow-x-auto">
              <code>{example.iterativeCode}</code>
            </pre>
            <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-sm">
              <div className="flex justify-between">
                <span>Time: <strong>{example.timeComplexity.iterative}</strong></span>
                <span>Space: <strong>{example.spaceComplexity.iterative}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-4">
            <h4 className="font-medium">Results for n = {n}</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Recursive results */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Recursive</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600 dark:text-blue-400">Result:</span>
                    <span className="font-mono font-bold">
                      {results.recursiveResult === -1 ? 'Stack Overflow!' : results.recursiveResult.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-blue-600 dark:text-blue-400">Time:</span>
                    <span className="font-mono">{formatTime(results.recursiveTime)}</span>
                  </div>
                </div>
              </div>

              {/* Iterative results */}
              <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">Iterative</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 dark:text-green-400">Result:</span>
                    <span className="font-mono font-bold">{results.iterativeResult.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span className="text-green-600 dark:text-green-400">Time:</span>
                    <span className="font-mono">{formatTime(results.iterativeTime)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Speed comparison */}
            {speedRatio && results.recursiveResult !== -1 && (
              <div className={`p-4 rounded-lg ${
                parseFloat(speedRatio) > 10
                  ? 'bg-red-50 dark:bg-red-900'
                  : parseFloat(speedRatio) > 2
                  ? 'bg-yellow-50 dark:bg-yellow-900'
                  : 'bg-gray-50 dark:bg-gray-800'
              }`}>
                <div className="text-center">
                  <span className="text-lg font-medium">
                    Recursive is <strong>{speedRatio}x</strong> {parseFloat(speedRatio) > 1 ? 'slower' : 'faster'}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Comparison table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border px-4 py-2 text-left">Aspect</th>
                <th className="border px-4 py-2 text-left text-blue-600">Recursive</th>
                <th className="border px-4 py-2 text-left text-green-600">Iterative</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2 font-medium">Time Complexity</td>
                <td className="border px-4 py-2">{example.timeComplexity.recursive}</td>
                <td className="border px-4 py-2">{example.timeComplexity.iterative}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">Space Complexity</td>
                <td className="border px-4 py-2">{example.spaceComplexity.recursive}</td>
                <td className="border px-4 py-2">{example.spaceComplexity.iterative}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">Code Clarity</td>
                <td className="border px-4 py-2">Often more intuitive</td>
                <td className="border px-4 py-2">More explicit control flow</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">Stack Risk</td>
                <td className="border px-4 py-2 text-red-600">StackOverflow possible</td>
                <td className="border px-4 py-2 text-green-600">No stack risk</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">Best For</td>
                <td className="border px-4 py-2">Tree structures, divide & conquer</td>
                <td className="border px-4 py-2">Simple loops, large inputs</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* When to use each */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
              Use Recursion When:
            </h4>
            <ul className="text-sm text-blue-600 dark:text-blue-300 space-y-1">
              <li>• Problem has natural recursive structure (trees)</li>
              <li>• Code clarity is more important than performance</li>
              <li>• Input size is bounded and small</li>
              <li>• Divide & conquer approach needed</li>
            </ul>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
            <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
              Use Iteration When:
            </h4>
            <ul className="text-sm text-green-600 dark:text-green-300 space-y-1">
              <li>• Simple linear traversal</li>
              <li>• Performance is critical</li>
              <li>• Very large input sizes expected</li>
              <li>• Memory is constrained</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
