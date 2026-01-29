'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { generateFibonacciTree, countFibonacciCalls, CallTreeNode } from '@/lib/algorithms/recursion';

interface CallTreeVisualizerProps {
  maxN?: number;
}

export default function CallTreeVisualizer({ maxN = 7 }: CallTreeVisualizerProps) {
  const [n, setN] = useState(5);

  const { tree, totalCalls, duplicates } = useMemo(() => {
    return generateFibonacciTree(n);
  }, [n]);

  // Calculate tree layout
  const renderTree = (node: CallTreeNode, x: number, y: number, width: number, level: number): React.ReactNode => {
    const nodeWidth = 60;
    const nodeHeight = 40;
    const verticalGap = 60;

    const childCount = node.children.length;
    const childWidth = width / Math.max(childCount, 1);

    return (
      <g key={node.id}>
        {/* Draw lines to children */}
        {node.children.map((child, idx) => {
          const childX = x - width / 2 + childWidth * idx + childWidth / 2;
          const childY = y + verticalGap;
          return (
            <line
              key={`line-${node.id}-${child.id}`}
              x1={x}
              y1={y + nodeHeight / 2}
              x2={childX}
              y2={childY - nodeHeight / 2}
              stroke="#94a3b8"
              strokeWidth={2}
            />
          );
        })}

        {/* Draw node */}
        <g transform={`translate(${x - nodeWidth / 2}, ${y - nodeHeight / 2})`}>
          <rect
            width={nodeWidth}
            height={nodeHeight}
            rx={6}
            fill={node.isDuplicate ? '#fef3c7' : '#dbeafe'}
            stroke={node.isDuplicate ? '#f59e0b' : '#3b82f6'}
            strokeWidth={2}
          />
          <text
            x={nodeWidth / 2}
            y={nodeHeight / 2 - 5}
            textAnchor="middle"
            className="text-xs font-medium fill-gray-700"
          >
            fib({node.params.n})
          </text>
          <text
            x={nodeWidth / 2}
            y={nodeHeight / 2 + 10}
            textAnchor="middle"
            className="text-xs fill-gray-500"
          >
            = {node.returnValue}
          </text>
        </g>

        {/* Recursively render children */}
        {node.children.map((child, idx) => {
          const childX = x - width / 2 + childWidth * idx + childWidth / 2;
          const childY = y + verticalGap;
          return renderTree(child, childX, childY, childWidth, level + 1);
        })}
      </g>
    );
  };

  // Calculate SVG dimensions based on tree depth
  const treeDepth = n;
  const svgWidth = Math.max(800, Math.pow(2, Math.min(n, 5)) * 80);
  const svgHeight = Math.max(300, (treeDepth + 1) * 70);

  // Get duplicate counts for display
  const duplicateEntries = Array.from(duplicates.entries())
    .filter(([, count]) => count > 1)
    .sort((a, b) => b[1] - a[1]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Fibonacci Call Tree</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Input control */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">
            Calculate fibonacci(n): <span className="text-blue-600 font-bold">{n}</span>
          </label>
          <Slider
            value={[n]}
            onValueChange={(value) => setN(value[0])}
            min={1}
            max={maxN}
            step={1}
            className="w-48"
          />
        </div>

        {/* Stats */}
        <div className="flex gap-4 flex-wrap">
          <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <div className="text-sm text-blue-600 dark:text-blue-400">Total Calls</div>
            <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">{totalCalls}</div>
          </div>
          <div className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
            <div className="text-sm text-yellow-600 dark:text-yellow-400">Duplicate Calculations</div>
            <div className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">
              {duplicateEntries.reduce((sum, [, count]) => sum + count - 1, 0)}
            </div>
          </div>
          <div className="px-4 py-2 bg-green-100 dark:bg-green-900 rounded-lg">
            <div className="text-sm text-green-600 dark:text-green-400">Result</div>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">
              {tree.returnValue}
            </div>
          </div>
        </div>

        {/* Tree visualization */}
        <div className="overflow-x-auto border rounded-lg bg-white dark:bg-gray-950">
          <svg
            width={svgWidth}
            height={svgHeight}
            className="min-w-full"
          >
            {renderTree(tree, svgWidth / 2, 40, svgWidth - 40, 0)}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-100 border-2 border-blue-500" />
            <span>Unique calculation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-100 border-2 border-yellow-500" />
            <span>Duplicate (wasted work)</span>
          </div>
        </div>

        {/* Duplicate breakdown */}
        {duplicateEntries.length > 0 && (
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
            <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
              Wasted Calculations:
            </h4>
            <div className="flex flex-wrap gap-2">
              {duplicateEntries.map(([num, count]) => (
                <span
                  key={num}
                  className="px-2 py-1 bg-yellow-200 dark:bg-yellow-800 rounded text-sm"
                >
                  fib({num}) called {count} times
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Growth warning */}
        <div className="p-4 bg-red-50 dark:bg-red-900 rounded-lg">
          <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">
            Exponential Growth Warning!
          </h4>
          <div className="text-sm text-red-600 dark:text-red-300 space-y-1">
            <p>This naive recursive implementation is O(2^n). Look how fast it grows:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {[5, 10, 15, 20, 25, 30].map(num => (
                <span key={num} className="px-2 py-1 bg-red-100 dark:bg-red-800 rounded text-xs">
                  fib({num}): {countFibonacciCalls(num).toLocaleString()} calls
                </span>
              ))}
            </div>
            <p className="mt-2">
              fib(30) makes over 2.6 million calls! This is why we need memoization or iteration.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
