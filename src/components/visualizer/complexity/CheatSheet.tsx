'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ComplexityType, complexityInfo } from '@/lib/algorithms/complexity';

const ALL_COMPLEXITIES: ComplexityType[] = [
  'O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)'
];

interface CheatSheetProps {
  showSpaceComplexity?: boolean;
}

export default function CheatSheet({ showSpaceComplexity = true }: CheatSheetProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Big O Cheat Sheet</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Time Complexity Table */}
        <div className="overflow-x-auto mb-8">
          <h3 className="text-lg font-semibold mb-3">Time Complexity</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border px-4 py-2 text-left">Notation</th>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Example Patterns</th>
                <th className="border px-4 py-2 text-left">n=10</th>
                <th className="border px-4 py-2 text-left">n=100</th>
                <th className="border px-4 py-2 text-left">n=1000</th>
              </tr>
            </thead>
            <tbody>
              {ALL_COMPLEXITIES.map(complexity => {
                const info = complexityInfo[complexity];
                const fn = (n: number) => {
                  switch (complexity) {
                    case 'O(1)': return 1;
                    case 'O(log n)': return Math.log2(n);
                    case 'O(n)': return n;
                    case 'O(n log n)': return n * Math.log2(n);
                    case 'O(n²)': return n * n;
                    case 'O(2^n)': return Math.pow(2, n);
                    default: return n;
                  }
                };

                const formatVal = (v: number) => {
                  if (v >= 1e12) return '> 1T';
                  if (v >= 1e9) return `${(v / 1e9).toFixed(0)}B`;
                  if (v >= 1e6) return `${(v / 1e6).toFixed(0)}M`;
                  if (v >= 1e3) return `${(v / 1e3).toFixed(0)}K`;
                  return v.toFixed(v < 10 ? 1 : 0);
                };

                return (
                  <tr key={complexity} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                    <td className="border px-4 py-2">
                      <span
                        className="px-2 py-1 rounded text-white text-sm font-medium"
                        style={{ backgroundColor: info.color }}
                      >
                        {complexity}
                      </span>
                    </td>
                    <td className="border px-4 py-2 font-medium">{info.name}</td>
                    <td className="border px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
                      {info.examples.slice(0, 2).join(', ')}
                    </td>
                    <td className="border px-4 py-2 text-right font-mono">{formatVal(fn(10))}</td>
                    <td className="border px-4 py-2 text-right font-mono">{formatVal(fn(100))}</td>
                    <td className="border px-4 py-2 text-right font-mono">{formatVal(fn(1000))}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Quick Reference Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {ALL_COMPLEXITIES.map(complexity => {
            const info = complexityInfo[complexity];
            return (
              <div
                key={complexity}
                className="p-4 rounded-lg border-2"
                style={{ borderColor: info.color }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-2 py-1 rounded text-white text-sm font-bold"
                    style={{ backgroundColor: info.color }}
                  >
                    {complexity}
                  </span>
                  <span className="font-medium">{info.name}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {info.description}
                </p>
                <div className="text-xs text-gray-500">
                  {info.growthDescription}
                </div>
              </div>
            );
          })}
        </div>

        {/* Space Complexity Quick Reference */}
        {showSpaceComplexity && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Space Complexity Quick Reference</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="border px-4 py-2 text-left">Pattern</th>
                    <th className="border px-4 py-2 text-left">Space Complexity</th>
                    <th className="border px-4 py-2 text-left">Example</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">Single variables</td>
                    <td className="border px-4 py-2">
                      <span className="px-2 py-1 rounded text-white text-sm bg-green-500">O(1)</span>
                    </td>
                    <td className="border px-4 py-2 font-mono text-sm">int x, y, z;</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Array of size n</td>
                    <td className="border px-4 py-2">
                      <span className="px-2 py-1 rounded text-white text-sm bg-yellow-500">O(n)</span>
                    </td>
                    <td className="border px-4 py-2 font-mono text-sm">int[] arr = new int[n];</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">2D array n×n</td>
                    <td className="border px-4 py-2">
                      <span className="px-2 py-1 rounded text-white text-sm bg-red-500">O(n²)</span>
                    </td>
                    <td className="border px-4 py-2 font-mono text-sm">int[][] matrix = new int[n][n];</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Recursive call stack (depth d)</td>
                    <td className="border px-4 py-2">
                      <span className="px-2 py-1 rounded text-white text-sm bg-orange-500">O(d)</span>
                    </td>
                    <td className="border px-4 py-2 font-mono text-sm">recursive calls to depth d</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Key Rules */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Key Rules to Remember</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                Drop Constants
              </h4>
              <p className="text-sm text-blue-600 dark:text-blue-300">
                O(2n) = O(n)<br />
                O(n² + 1000) = O(n²)
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                Drop Lower Terms
              </h4>
              <p className="text-sm text-green-600 dark:text-green-300">
                O(n² + n) = O(n²)<br />
                O(n + log n) = O(n)
              </p>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                Sequential = Addition
              </h4>
              <p className="text-sm text-yellow-600 dark:text-yellow-300">
                O(n) then O(m)<br />
                = O(n + m)
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
              <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                Nested = Multiplication
              </h4>
              <p className="text-sm text-purple-600 dark:text-purple-300">
                O(n) inside O(m)<br />
                = O(n × m)
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
