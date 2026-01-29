'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ComplexityGraph from '@/components/visualizer/complexity/ComplexityGraph';
import { complexityInfo, ComplexityType, formatNumber, complexityFunctions } from '@/lib/algorithms/complexity';

const ALL_COMPLEXITIES: ComplexityType[] = [
  'O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)'
];

export default function VisualizationPage() {
  // Pre-calculated comparison table data
  const comparisonData = [10, 100, 1000, 10000].map(n => ({
    n,
    values: ALL_COMPLEXITIES.reduce((acc, c) => {
      acc[c] = complexityFunctions[c](n);
      return acc;
    }, {} as Record<ComplexityType, number>)
  }));

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link href="/modules/complexity">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Overview
          </Button>
        </Link>
        <Link href="/modules/complexity/patterns">
          <Button variant="ghost" className="gap-2">
            Code Patterns <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-4">Growth Rate Visualization</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          See how different complexities grow as input size increases. Use the slider
          to explore different values of n.
        </p>
      </div>

      {/* Main Interactive Graph */}
      <ComplexityGraph initialN={100} showControls={true} />

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Side-by-Side Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border px-4 py-2 text-left">Complexity</th>
                  {comparisonData.map(d => (
                    <th key={d.n} className="border px-4 py-2 text-right">n = {formatNumber(d.n)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ALL_COMPLEXITIES.map(complexity => {
                  const info = complexityInfo[complexity];
                  return (
                    <tr key={complexity} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                      <td className="border px-4 py-2">
                        <span
                          className="px-2 py-1 rounded text-white text-sm font-medium"
                          style={{ backgroundColor: info.color }}
                        >
                          {complexity}
                        </span>
                        <span className="ml-2 text-gray-600 dark:text-gray-400">{info.name}</span>
                      </td>
                      {comparisonData.map(d => (
                        <td key={d.n} className="border px-4 py-2 text-right font-mono">
                          {formatNumber(d.values[complexity])}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Notice how O(n²) and O(2^n) explode for large inputs. At n=1000, O(n²) is
            1 million operations, while O(log n) is only about 10!
          </p>
        </CardContent>
      </Card>

      {/* Growth Rate Explanations */}
      <div className="grid md:grid-cols-2 gap-6">
        {ALL_COMPLEXITIES.map(complexity => {
          const info = complexityInfo[complexity];
          return (
            <Card key={complexity}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span
                    className="px-3 py-1 rounded text-white"
                    style={{ backgroundColor: info.color }}
                  >
                    {complexity}
                  </span>
                  {info.name} Time
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p>{info.description}</p>
                <div className="text-sm">
                  <strong>Growth pattern:</strong> {info.growthDescription}
                </div>
                <div className="text-sm">
                  <strong>Common examples:</strong>
                  <ul className="list-disc list-inside mt-1 text-gray-600 dark:text-gray-400">
                    {info.examples.map((ex, i) => (
                      <li key={i}>{ex}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Key Takeaways */}
      <Card>
        <CardHeader>
          <CardTitle>Key Takeaways</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                Efficient: O(1), O(log n), O(n)
              </h4>
              <p className="text-sm text-green-600 dark:text-green-300">
                These scale well even for very large inputs. Binary search on 1 billion
                items takes only ~30 steps!
              </p>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                Moderate: O(n log n)
              </h4>
              <p className="text-sm text-yellow-600 dark:text-yellow-300">
                The sweet spot for sorting. Merge sort and quick sort use this complexity
                to efficiently sort large datasets.
              </p>
            </div>
            <div className="p-4 bg-orange-50 dark:bg-orange-900 rounded-lg">
              <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-2">
                Use with Caution: O(n²)
              </h4>
              <p className="text-sm text-orange-600 dark:text-orange-300">
                Nested loops are fine for small inputs (n &lt; 1000), but become slow for
                larger datasets. Often can be optimized.
              </p>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900 rounded-lg">
              <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">
                Avoid: O(2^n), O(n!)
              </h4>
              <p className="text-sm text-red-600 dark:text-red-300">
                Exponential algorithms only work for tiny inputs (n &lt; 20). Beyond that,
                they become impractical.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Link href="/modules/complexity">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Overview
          </Button>
        </Link>
        <Link href="/modules/complexity/patterns">
          <Button className="gap-2">
            Code Patterns <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
