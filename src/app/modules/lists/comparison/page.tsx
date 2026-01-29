'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ListComparisonPage() {
  const [demoResults, setDemoResults] = useState<{
    operation: string;
    arrayListTime: number;
    linkedListTime: number;
    arrayListOps: number;
    linkedListOps: number;
  } | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runPerformanceDemo = (operation: string) => {
    setIsRunning(true);
    setDemoResults(null);

    // Simulate the operation timings
    setTimeout(() => {
      let arrayListTime: number;
      let linkedListTime: number;
      let arrayListOps: number;
      let linkedListOps: number;

      switch (operation) {
        case 'addFirst':
          // ArrayList O(n) - must shift all elements
          // LinkedList O(1) - just update head
          arrayListOps = 1000; // shifts
          linkedListOps = 1;
          arrayListTime = 850;
          linkedListTime = 5;
          break;
        case 'addLast':
          // ArrayList O(1) amortized
          // LinkedList O(1) with tail
          arrayListOps = 1;
          linkedListOps = 1;
          arrayListTime = 8;
          linkedListTime = 5;
          break;
        case 'get':
          // ArrayList O(1) - direct index
          // LinkedList O(n) - must traverse
          arrayListOps = 1;
          linkedListOps = 500;
          arrayListTime = 3;
          linkedListTime = 420;
          break;
        case 'removeFirst':
          // ArrayList O(n) - must shift all elements
          // LinkedList O(1) - just update head
          arrayListOps = 1000;
          linkedListOps = 1;
          arrayListTime = 820;
          linkedListTime = 4;
          break;
        case 'removeLast':
          // ArrayList O(1) - just decrement size
          // LinkedList O(1) for doubly, O(n) for singly
          arrayListOps = 1;
          linkedListOps = 1;
          arrayListTime = 3;
          linkedListTime = 5;
          break;
        default:
          arrayListOps = 0;
          linkedListOps = 0;
          arrayListTime = 0;
          linkedListTime = 0;
      }

      setDemoResults({
        operation,
        arrayListTime,
        linkedListTime,
        arrayListOps,
        linkedListOps,
      });
      setIsRunning(false);
    }, 1500);
  };

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/modules/lists"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to Lists Module
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">ArrayList vs LinkedList</h1>
        <p className="text-muted-foreground text-lg">
          Compare the internal structure, performance characteristics, and use cases
          of ArrayList and LinkedList to make informed data structure choices.
        </p>
      </div>

      {/* Side-by-Side Comparison */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Structural Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* ArrayList */}
            <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
              <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                ArrayList
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">Storage:</span>
                  <span className="text-muted-foreground ml-2">Contiguous array in memory</span>
                </div>
                <div>
                  <span className="font-medium">Memory:</span>
                  <span className="text-muted-foreground ml-2">Elements only (+ capacity overhead)</span>
                </div>
                <div>
                  <span className="font-medium">Access:</span>
                  <span className="text-muted-foreground ml-2">Direct via index calculation</span>
                </div>
                <div>
                  <span className="font-medium">Growth:</span>
                  <span className="text-muted-foreground ml-2">Doubles capacity when full</span>
                </div>
              </div>
              {/* Visual */}
              <div className="mt-4 flex items-center gap-1 font-mono text-xs overflow-x-auto">
                {[10, 20, 30, 40, null, null].map((val, i) => (
                  <div
                    key={i}
                    className={`w-10 h-8 flex items-center justify-center border ${
                      val !== null ? 'bg-blue-100 border-blue-300' : 'bg-white border-dashed'
                    }`}
                  >
                    {val ?? ''}
                  </div>
                ))}
              </div>
            </div>

            {/* LinkedList */}
            <div className="p-4 border border-green-200 rounded-lg bg-green-50">
              <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500" />
                LinkedList
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">Storage:</span>
                  <span className="text-muted-foreground ml-2">Scattered nodes in memory</span>
                </div>
                <div>
                  <span className="font-medium">Memory:</span>
                  <span className="text-muted-foreground ml-2">Elements + pointers per node</span>
                </div>
                <div>
                  <span className="font-medium">Access:</span>
                  <span className="text-muted-foreground ml-2">Sequential traversal required</span>
                </div>
                <div>
                  <span className="font-medium">Growth:</span>
                  <span className="text-muted-foreground ml-2">Add nodes as needed</span>
                </div>
              </div>
              {/* Visual */}
              <div className="mt-4 flex items-center gap-1 font-mono text-xs overflow-x-auto">
                <span className="text-green-600">head→</span>
                {[10, 20, 30, 40].map((val, i, arr) => (
                  <div key={i} className="flex items-center gap-1">
                    <div className="w-8 h-8 flex items-center justify-center bg-green-100 border border-green-300 rounded">
                      {val}
                    </div>
                    {i < arr.length - 1 ? <span>→</span> : <span className="text-muted-foreground">→null</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Complexity Comparison */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Time Complexity Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Operation</th>
                  <th className="text-left py-3 px-2 bg-blue-50">ArrayList</th>
                  <th className="text-left py-3 px-2 bg-green-50">LinkedList</th>
                  <th className="text-left py-3 px-2">Winner</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-2 font-mono">get(index)</td>
                  <td className="py-3 px-2 bg-blue-50 text-green-600 font-mono">O(1)</td>
                  <td className="py-3 px-2 bg-green-50 text-red-600 font-mono">O(n)</td>
                  <td className="py-3 px-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-blue-500" title="ArrayList" />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-mono">set(index, value)</td>
                  <td className="py-3 px-2 bg-blue-50 text-green-600 font-mono">O(1)</td>
                  <td className="py-3 px-2 bg-green-50 text-red-600 font-mono">O(n)</td>
                  <td className="py-3 px-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-blue-500" title="ArrayList" />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-mono">addFirst(value)</td>
                  <td className="py-3 px-2 bg-blue-50 text-red-600 font-mono">O(n)</td>
                  <td className="py-3 px-2 bg-green-50 text-green-600 font-mono">O(1)</td>
                  <td className="py-3 px-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-green-500" title="LinkedList" />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-mono">addLast(value)</td>
                  <td className="py-3 px-2 bg-blue-50 text-green-600 font-mono">O(1)*</td>
                  <td className="py-3 px-2 bg-green-50 text-green-600 font-mono">O(1)</td>
                  <td className="py-3 px-2">
                    <span className="text-muted-foreground">Tie</span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-mono">add(middle, value)</td>
                  <td className="py-3 px-2 bg-blue-50 text-red-600 font-mono">O(n)</td>
                  <td className="py-3 px-2 bg-green-50 text-red-600 font-mono">O(n)</td>
                  <td className="py-3 px-2">
                    <span className="text-muted-foreground">Tie**</span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-mono">removeFirst()</td>
                  <td className="py-3 px-2 bg-blue-50 text-red-600 font-mono">O(n)</td>
                  <td className="py-3 px-2 bg-green-50 text-green-600 font-mono">O(1)</td>
                  <td className="py-3 px-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-green-500" title="LinkedList" />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-mono">removeLast()</td>
                  <td className="py-3 px-2 bg-blue-50 text-green-600 font-mono">O(1)</td>
                  <td className="py-3 px-2 bg-green-50 text-green-600 font-mono">O(1)***</td>
                  <td className="py-3 px-2">
                    <span className="text-muted-foreground">Tie</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-2 font-mono">Memory per element</td>
                  <td className="py-3 px-2 bg-blue-50 text-green-600">~4-8 bytes</td>
                  <td className="py-3 px-2 bg-green-50 text-red-600">~24-40 bytes</td>
                  <td className="py-3 px-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-blue-500" title="ArrayList" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-xs text-muted-foreground space-y-1">
            <p>* O(1) amortized - occasionally O(n) when resizing</p>
            <p>** LinkedList is faster for the actual insertion, but both require O(n) to find the position</p>
            <p>*** O(1) for doubly-linked list, O(n) for singly-linked list</p>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Performance Demo */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Interactive Performance Demo</CardTitle>
          <p className="text-sm text-muted-foreground">
            Click an operation to see a simulated comparison of how many steps each
            data structure needs (assuming 1000 elements).
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant="outline"
              onClick={() => runPerformanceDemo('addFirst')}
              disabled={isRunning}
            >
              addFirst()
            </Button>
            <Button
              variant="outline"
              onClick={() => runPerformanceDemo('addLast')}
              disabled={isRunning}
            >
              addLast()
            </Button>
            <Button
              variant="outline"
              onClick={() => runPerformanceDemo('get')}
              disabled={isRunning}
            >
              get(500)
            </Button>
            <Button
              variant="outline"
              onClick={() => runPerformanceDemo('removeFirst')}
              disabled={isRunning}
            >
              removeFirst()
            </Button>
            <Button
              variant="outline"
              onClick={() => runPerformanceDemo('removeLast')}
              disabled={isRunning}
            >
              removeLast()
            </Button>
          </div>

          {isRunning && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full" />
              Running comparison...
            </div>
          )}

          {demoResults && (
            <div className="space-y-4">
              <h4 className="font-semibold">
                Results for <code>{demoResults.operation}()</code> on 1000 elements:
              </h4>

              <div className="grid md:grid-cols-2 gap-4">
                {/* ArrayList Result */}
                <div className="p-4 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="font-medium">ArrayList</span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Operations: {demoResults.arrayListOps.toLocaleString()}
                  </div>
                  <div className="h-4 bg-gray-200 rounded overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (demoResults.arrayListTime / Math.max(demoResults.arrayListTime, demoResults.linkedListTime)) * 100)}%`,
                      }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    ~{demoResults.arrayListTime}ms
                  </div>
                </div>

                {/* LinkedList Result */}
                <div className="p-4 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="font-medium">LinkedList</span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Operations: {demoResults.linkedListOps.toLocaleString()}
                  </div>
                  <div className="h-4 bg-gray-200 rounded overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (demoResults.linkedListTime / Math.max(demoResults.arrayListTime, demoResults.linkedListTime)) * 100)}%`,
                      }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    ~{demoResults.linkedListTime}ms
                  </div>
                </div>
              </div>

              {/* Winner */}
              <div className="p-4 bg-slate-50 rounded-lg">
                <span className="font-medium">Winner: </span>
                {demoResults.arrayListTime < demoResults.linkedListTime ? (
                  <span className="text-blue-600">ArrayList</span>
                ) : demoResults.linkedListTime < demoResults.arrayListTime ? (
                  <span className="text-green-600">LinkedList</span>
                ) : (
                  <span>Tie</span>
                )}
                <span className="text-muted-foreground ml-2">
                  ({Math.abs(demoResults.arrayListTime - demoResults.linkedListTime).toFixed(0)}ms
                  {demoResults.arrayListTime !== demoResults.linkedListTime && ' faster'})
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* When to Use Which */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>When to Use Which?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Use ArrayList */}
            <div className="p-4 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                Choose ArrayList when...
              </h3>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>You need frequent random access (get/set by index)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Most additions are at the end (append operations)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Memory efficiency is important</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>You iterate through elements frequently</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>You know the approximate size upfront</span>
                </li>
              </ul>
              <div className="mt-4 p-2 bg-blue-100 rounded text-sm">
                <strong>Common use cases:</strong> Storing data for display, caching,
                implementing dynamic arrays, sorting algorithms
              </div>
            </div>

            {/* Use LinkedList */}
            <div className="p-4 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500" />
                Choose LinkedList when...
              </h3>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>You need frequent insertions/deletions at the beginning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>You need a queue or deque (double-ended queue)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Insertions/deletions at known positions (with iterator)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>You don&apos;t need random access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Size changes dramatically and unpredictably</span>
                </li>
              </ul>
              <div className="mt-4 p-2 bg-green-100 rounded text-sm">
                <strong>Common use cases:</strong> Implementing stacks, queues,
                undo/redo functionality, LRU caches, task scheduling
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Memory Comparison */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Memory Usage Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              For storing 1000 integers (assuming 64-bit JVM):
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded">
                <h4 className="font-semibold text-blue-800 mb-2">ArrayList</h4>
                <ul className="text-sm space-y-1">
                  <li>Object header: ~16 bytes</li>
                  <li>Array reference: ~8 bytes</li>
                  <li>Size field: ~4 bytes</li>
                  <li>Array: 1000 × 4 = 4,000 bytes</li>
                  <li className="font-medium pt-2 border-t">Total: ~4,028 bytes</li>
                </ul>
              </div>

              <div className="p-4 bg-green-50 rounded">
                <h4 className="font-semibold text-green-800 mb-2">LinkedList (Doubly)</h4>
                <ul className="text-sm space-y-1">
                  <li>List header: ~24 bytes</li>
                  <li>Per node: ~40 bytes each</li>
                  <li>1000 nodes: 1000 × 40 = 40,000 bytes</li>
                  <li className="font-medium pt-2 border-t">Total: ~40,024 bytes</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm">
                <strong>Key insight:</strong> LinkedList uses approximately <strong>10x more memory</strong> than
                ArrayList for the same data. Each node carries overhead for object headers and two pointers.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Reference Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="text-left py-2 px-3">Criteria</th>
                  <th className="text-left py-2 px-3">Best Choice</th>
                  <th className="text-left py-2 px-3">Reason</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-3">Random access by index</td>
                  <td className="py-2 px-3 font-medium text-blue-600">ArrayList</td>
                  <td className="py-2 px-3 text-muted-foreground">O(1) vs O(n)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Insert at beginning</td>
                  <td className="py-2 px-3 font-medium text-green-600">LinkedList</td>
                  <td className="py-2 px-3 text-muted-foreground">O(1) vs O(n)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Insert at end</td>
                  <td className="py-2 px-3 text-muted-foreground">Either</td>
                  <td className="py-2 px-3 text-muted-foreground">Both O(1)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Delete from beginning</td>
                  <td className="py-2 px-3 font-medium text-green-600">LinkedList</td>
                  <td className="py-2 px-3 text-muted-foreground">O(1) vs O(n)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Memory efficiency</td>
                  <td className="py-2 px-3 font-medium text-blue-600">ArrayList</td>
                  <td className="py-2 px-3 text-muted-foreground">~10x less memory</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Iteration speed</td>
                  <td className="py-2 px-3 font-medium text-blue-600">ArrayList</td>
                  <td className="py-2 px-3 text-muted-foreground">Better cache locality</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Queue/Deque operations</td>
                  <td className="py-2 px-3 font-medium text-green-600">LinkedList</td>
                  <td className="py-2 px-3 text-muted-foreground">O(1) at both ends</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
