'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StackQueueComparison } from '@/components/visualizer/stack-queue';

export default function ComparisonPage() {
  return (
    <div className="container py-8 max-w-6xl">
      <div className="mb-6">
        <Link
          href="/modules/stack-queue"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to Stack & Queue Overview
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-2">Stack vs Queue Comparison</h1>
      <p className="text-xl text-muted-foreground mb-8">
        See how the same operations produce different results
      </p>

      {/* Interactive Comparison */}
      <section className="mb-12">
        <StackQueueComparison />
      </section>

      {/* Detailed Comparison Table */}
      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Complete Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Feature</th>
                    <th className="text-left p-3 bg-blue-50">Stack</th>
                    <th className="text-left p-3 bg-green-50">Queue</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Principle</td>
                    <td className="p-3 bg-blue-50">LIFO (Last-In, First-Out)</td>
                    <td className="p-3 bg-green-50">FIFO (First-In, First-Out)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Insert Operation</td>
                    <td className="p-3 bg-blue-50">push() - adds to top</td>
                    <td className="p-3 bg-green-50">enqueue() - adds to rear</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Remove Operation</td>
                    <td className="p-3 bg-blue-50">pop() - removes from top</td>
                    <td className="p-3 bg-green-50">dequeue() - removes from front</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">View Operation</td>
                    <td className="p-3 bg-blue-50">peek() - views top</td>
                    <td className="p-3 bg-green-50">peek() - views front</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Time Complexity</td>
                    <td className="p-3 bg-blue-50">O(1) for all ops</td>
                    <td className="p-3 bg-green-50">O(1) for all ops</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Java Interface</td>
                    <td className="p-3 bg-blue-50 font-mono text-xs">Deque&lt;E&gt; (preferred)</td>
                    <td className="p-3 bg-green-50 font-mono text-xs">Queue&lt;E&gt;</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Java Implementation</td>
                    <td className="p-3 bg-blue-50 font-mono text-xs">ArrayDeque, LinkedList</td>
                    <td className="p-3 bg-green-50 font-mono text-xs">LinkedList, ArrayDeque</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Analogy</td>
                    <td className="p-3 bg-blue-50">Stack of plates</td>
                    <td className="p-3 bg-green-50">Line at a store</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Best For</td>
                    <td className="p-3 bg-blue-50">Undo, backtracking, recursion</td>
                    <td className="p-3 bg-green-50">Scheduling, BFS, buffers</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Decision Guide */}
      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Decision Guide: Which One to Use?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-blue-200">
                  <CardHeader className="pb-2 bg-blue-50">
                    <CardTitle className="text-lg text-blue-700">Choose Stack When...</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-3">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">✓</span>
                        You need to reverse order
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">✓</span>
                        Most recent item matters most
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">✓</span>
                        Implementing undo/redo
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">✓</span>
                        Parsing expressions/brackets
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">✓</span>
                        Implementing DFS traversal
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">✓</span>
                        Converting recursion to iteration
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardHeader className="pb-2 bg-green-50">
                    <CardTitle className="text-lg text-green-700">Choose Queue When...</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-3">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        First-come, first-served matters
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        Processing in arrival order
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        Implementing task scheduling
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        Buffering data streams
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        Implementing BFS traversal
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        Level-order processing
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-purple-200">
                <CardHeader className="pb-2 bg-purple-50">
                  <CardTitle className="text-lg text-purple-700">Choose Priority Queue When...</CardTitle>
                </CardHeader>
                <CardContent className="pt-3">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500">✓</span>
                      Elements have different priorities/importance
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500">✓</span>
                      Need to always process the &quot;most important&quot; item next
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500">✓</span>
                      Implementing Dijkstra&apos;s or A* algorithms
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500">✓</span>
                      Event-driven simulation (process earliest event first)
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Real-world Examples */}
      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Real-World Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-blue-700 mb-3">Stack Examples</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-medium">🔙 Browser Back Button</div>
                    <p className="text-sm text-muted-foreground">
                      Pages visited are pushed. Back button pops to show previous page.
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-medium">↩️ Undo in Text Editors</div>
                    <p className="text-sm text-muted-foreground">
                      Actions pushed to undo stack. Undo pops most recent action.
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-medium">📞 Function Call Stack</div>
                    <p className="text-sm text-muted-foreground">
                      Each function call pushes a frame. Return pops it.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-green-700 mb-3">Queue Examples</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="font-medium">🖨️ Print Queue</div>
                    <p className="text-sm text-muted-foreground">
                      Documents printed in order they were sent.
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="font-medium">🎫 Customer Service</div>
                    <p className="text-sm text-muted-foreground">
                      Customers served in order they arrived.
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="font-medium">⚙️ Task Scheduler</div>
                    <p className="text-sm text-muted-foreground">
                      CPU processes tasks in submission order (basic scheduling).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Summary Tips */}
      <section className="mb-12">
        <Card className="bg-gradient-to-r from-blue-50 to-green-50">
          <CardHeader>
            <CardTitle>Key Takeaways</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <span className="font-bold">1.</span>
                  <strong>Stack = LIFO</strong> (think of a stack of plates)
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-bold">2.</span>
                  <strong>Queue = FIFO</strong> (think of a waiting line)
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-bold">3.</span>
                  Both have <strong>O(1)</strong> time for all basic operations
                </p>
              </div>
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <span className="font-bold">4.</span>
                  Use <strong>Stack</strong> for undo, backtracking, DFS
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-bold">5.</span>
                  Use <strong>Queue</strong> for scheduling, buffering, BFS
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-bold">6.</span>
                  Use <strong>PriorityQueue</strong> when order depends on priority
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Navigation */}
      <div className="flex justify-between">
        <Link
          href="/modules/stack-queue/queue"
          className="text-primary hover:underline"
        >
          ← Queue
        </Link>
        <Link
          href="/quiz"
          className="text-primary hover:underline"
        >
          Take Quiz →
        </Link>
      </div>
    </div>
  );
}
