'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, AlertTriangle } from 'lucide-react';
import { StepCounter } from '@/components/visualizer/complexity';
import { codePatterns, complexityExamples, ComplexityType, complexityInfo } from '@/lib/algorithms/complexity';

const ALL_COMPLEXITIES: ComplexityType[] = [
  'O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)'
];

export default function PatternsPage() {
  const [selectedExample, setSelectedExample] = useState(complexityExamples[2]); // Default to O(n) sum

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link href="/modules/complexity/visualization">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Visualization
          </Button>
        </Link>
        <Link href="/modules/complexity/practice">
          <Button variant="ghost" className="gap-2">
            Practice <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-4">Code Patterns</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Learn to recognize complexity by looking at code structure. Each pattern
          has telltale signs that reveal its Big O.
        </p>
      </div>

      {/* Step Counter Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Step Counter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Select a code example and watch the operations count as it runs. Compare
            the actual count to the Big O prediction.
          </p>

          {/* Example Selector */}
          <div className="flex flex-wrap gap-2">
            {complexityExamples.map(example => (
              <Button
                key={example.id}
                onClick={() => setSelectedExample(example)}
                variant={selectedExample.id === example.id ? 'default' : 'outline'}
                size="sm"
                style={{
                  backgroundColor: selectedExample.id === example.id
                    ? complexityInfo[example.complexity].color
                    : undefined,
                  borderColor: complexityInfo[example.complexity].color
                }}
              >
                {example.complexity} - {example.title}
              </Button>
            ))}
          </div>

          {/* Step Counter Component */}
          <StepCounter example={selectedExample} />
        </CardContent>
      </Card>

      {/* Code Patterns by Complexity */}
      {ALL_COMPLEXITIES.map(complexity => {
        const patterns = codePatterns.filter(p => p.complexity === complexity);
        const info = complexityInfo[complexity];

        if (patterns.length === 0) return null;

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
                {info.name} Patterns
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {patterns.map(pattern => (
                <div key={pattern.id} className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 font-medium">
                    {pattern.title}
                  </div>
                  <div className="p-4 space-y-3">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
                      <code>{pattern.code}</code>
                    </pre>
                    <p className="text-gray-600 dark:text-gray-400">
                      <strong>Why {complexity}?</strong> {pattern.explanation}
                    </p>
                    {pattern.commonMistake && (
                      <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-yellow-800 dark:text-yellow-200">
                            Common Mistake:
                          </span>
                          <span className="text-yellow-700 dark:text-yellow-300 ml-1">
                            {pattern.commonMistake}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        );
      })}

      {/* Pattern Recognition Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Pattern Recognition Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Look for Loops</h4>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>No loops:</strong> Probably O(1)</li>
                <li>• <strong>Single loop (0 to n):</strong> O(n)</li>
                <li>• <strong>Nested loops (both 0 to n):</strong> O(n²)</li>
                <li>• <strong>Loop that halves (n/2):</strong> O(log n)</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Check Loop Bounds</h4>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Inner loop constant (0 to 5):</strong> Still O(n)!</li>
                <li>• <strong>Inner loop depends on outer (j = i):</strong> Still O(n²)</li>
                <li>• <strong>Loop increments by *2:</strong> O(log n)</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Recursion Hints</h4>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• <strong>Single recursive call:</strong> Usually O(n) or O(log n)</li>
                <li>• <strong>Two recursive calls:</strong> Often O(2^n)</li>
                <li>• <strong>Divide & conquer:</strong> Usually O(n log n)</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Sequential Operations</h4>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• O(n) + O(n) = O(n), not O(n²)</li>
                <li>• O(n) + O(n²) = O(n²)</li>
                <li>• Drop constants: O(3n) = O(n)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Link href="/modules/complexity/visualization">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Visualization
          </Button>
        </Link>
        <Link href="/modules/complexity/practice">
          <Button className="gap-2">
            Practice & Reference <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
