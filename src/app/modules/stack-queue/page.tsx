'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function StackQueueOverviewPage() {
  return (
    <div className="container py-8 max-w-6xl">
      <h1 className="text-4xl font-bold mb-2">Stacks & Queues</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Fundamental linear data structures with different access patterns
      </p>

      {/* Introduction */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <span className="text-2xl">📚</span>
              Stack (LIFO)
            </CardTitle>
            <CardDescription className="text-blue-600">
              Last-In, First-Out
            </CardDescription>
          </CardHeader>
          <CardContent className="text-blue-700">
            <p className="mb-3">
              Think of a <strong>stack of plates</strong>. You can only add or remove from the top.
              The last plate you put on is the first one you take off.
            </p>
            <div className="bg-white p-4 rounded-lg text-center mb-3">
              <div className="inline-flex flex-col gap-1">
                <div className="px-8 py-2 bg-blue-500 text-white rounded">3 ← top</div>
                <div className="px-8 py-2 bg-blue-300 rounded">2</div>
                <div className="px-8 py-2 bg-blue-200 rounded">1</div>
              </div>
            </div>
            <p className="text-sm">
              <strong>Operations:</strong> push (add to top), pop (remove from top), peek (view top)
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <span className="text-2xl">🚶‍♂️</span>
              Queue (FIFO)
            </CardTitle>
            <CardDescription className="text-green-600">
              First-In, First-Out
            </CardDescription>
          </CardHeader>
          <CardContent className="text-green-700">
            <p className="mb-3">
              Think of a <strong>line at a store</strong>. The first person in line is the first to be served.
              New people join at the back.
            </p>
            <div className="bg-white p-4 rounded-lg text-center mb-3">
              <div className="inline-flex gap-1 items-center">
                <span className="text-xs mr-1">front →</span>
                <div className="px-4 py-2 bg-green-500 text-white rounded">1</div>
                <div className="px-4 py-2 bg-green-300 rounded">2</div>
                <div className="px-4 py-2 bg-green-200 rounded">3</div>
                <span className="text-xs ml-1">← rear</span>
              </div>
            </div>
            <p className="text-sm">
              <strong>Operations:</strong> enqueue (add to rear), dequeue (remove from front), peek (view front)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* When to use */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>When to Use Which?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-blue-700 mb-2">Use a Stack when:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span>🔙</span>
                  <span><strong>Undo/Redo</strong> - Most recent action should be undone first</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>🌐</span>
                  <span><strong>Browser History</strong> - Back button goes to most recent page</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>📞</span>
                  <span><strong>Function Calls</strong> - Most recent function returns first</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>🔤</span>
                  <span><strong>Balanced Parentheses</strong> - Match most recent opening bracket</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>🔄</span>
                  <span><strong>Reverse Order</strong> - Need to process in reverse</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-green-700 mb-2">Use a Queue when:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span>🖨️</span>
                  <span><strong>Print Queue</strong> - Documents print in order sent</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>⏳</span>
                  <span><strong>Task Scheduling</strong> - First task submitted runs first</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>🌳</span>
                  <span><strong>BFS Traversal</strong> - Explore level by level</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>🎫</span>
                  <span><strong>Customer Service</strong> - First come, first served</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>📨</span>
                  <span><strong>Message Buffers</strong> - Process messages in order</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Aspect</th>
                  <th className="text-left p-3 bg-blue-50">Stack</th>
                  <th className="text-left p-3 bg-green-50">Queue</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-medium">Order</td>
                  <td className="p-3 bg-blue-50">LIFO (Last-In, First-Out)</td>
                  <td className="p-3 bg-green-50">FIFO (First-In, First-Out)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Insert</td>
                  <td className="p-3 bg-blue-50">push() - at top</td>
                  <td className="p-3 bg-green-50">enqueue() - at rear</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Remove</td>
                  <td className="p-3 bg-blue-50">pop() - from top</td>
                  <td className="p-3 bg-green-50">dequeue() - from front</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">View</td>
                  <td className="p-3 bg-blue-50">peek() - top element</td>
                  <td className="p-3 bg-green-50">peek() - front element</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Time Complexity</td>
                  <td className="p-3 bg-blue-50">O(1) for all operations</td>
                  <td className="p-3 bg-green-50">O(1) for all operations</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Java Class</td>
                  <td className="p-3 bg-blue-50 font-mono text-xs">Stack&lt;E&gt; or Deque&lt;E&gt;</td>
                  <td className="p-3 bg-green-50 font-mono text-xs">Queue&lt;E&gt;, LinkedList&lt;E&gt;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Module Navigation */}
      <h2 className="text-2xl font-bold mb-4">Explore Topics</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <Link href="/modules/stack-queue/stack">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full border-blue-200 hover:border-blue-400">
            <CardHeader>
              <CardTitle className="text-lg text-blue-700">Stack Deep Dive</CardTitle>
              <CardDescription>
                Interactive stack operations, balanced parentheses, and more
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Drag-and-drop push/pop</li>
                <li>• Balanced parentheses checker</li>
                <li>• Array vs LinkedList implementation</li>
              </ul>
            </CardContent>
          </Card>
        </Link>

        <Link href="/modules/stack-queue/queue">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full border-green-200 hover:border-green-400">
            <CardHeader>
              <CardTitle className="text-lg text-green-700">Queue Deep Dive</CardTitle>
              <CardDescription>
                Interactive queue operations and priority queue concept
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Drag-and-drop enqueue/dequeue</li>
                <li>• Priority Queue (ER triage demo)</li>
                <li>• Array vs LinkedList implementation</li>
              </ul>
            </CardContent>
          </Card>
        </Link>

        <Link href="/modules/stack-queue/comparison">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full border-purple-200 hover:border-purple-400">
            <CardHeader>
              <CardTitle className="text-lg text-purple-700">Comparison</CardTitle>
              <CardDescription>
                Side-by-side comparison and decision guide
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Same operations, different results</li>
                <li>• Implementation comparison</li>
                <li>• When to use which</li>
              </ul>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
