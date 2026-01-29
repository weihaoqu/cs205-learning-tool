'use client';

import Link from 'next/link';
import { ArrayListVisualizer } from '@/components/visualizer/lists';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ArrayListPage() {
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
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-blue-500" />
          ArrayList
        </h1>
        <p className="text-muted-foreground text-lg">
          A dynamic array implementation that automatically resizes when needed.
          Elements are stored in contiguous memory, providing O(1) access by index.
        </p>
      </div>

      {/* Key Concepts */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>How ArrayList Works Internally</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Backing Array</h4>
              <p className="text-sm text-muted-foreground">
                ArrayList uses a regular array internally. When you create an ArrayList,
                it allocates an array with some initial capacity (typically 10 in Java).
                Elements are stored starting from index 0.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Size vs Capacity</h4>
              <p className="text-sm text-muted-foreground">
                <strong>Size</strong> is the number of elements actually stored.
                <strong> Capacity</strong> is the length of the backing array.
                Capacity ≥ Size always. Empty slots exist when Capacity &gt; Size.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Dynamic Resizing</h4>
              <p className="text-sm text-muted-foreground">
                When you add an element and the array is full (size = capacity),
                ArrayList creates a new array with double the capacity, copies
                all elements over, then adds the new element.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Element Shifting</h4>
              <p className="text-sm text-muted-foreground">
                To insert at index i, all elements from i to end must shift right.
                To remove at index i, all elements from i+1 to end must shift left.
                This is why insert/remove in middle is O(n).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Complexity */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Time Complexity</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Operation</th>
                <th className="text-left py-2">Time</th>
                <th className="text-left py-2">Why</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 font-mono">get(index)</td>
                <td className="py-2 text-green-600 font-mono">O(1)</td>
                <td className="py-2 text-muted-foreground">Direct array access: data[index]</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-mono">set(index, value)</td>
                <td className="py-2 text-green-600 font-mono">O(1)</td>
                <td className="py-2 text-muted-foreground">Direct array access: data[index] = value</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-mono">addLast(value)</td>
                <td className="py-2 text-green-600 font-mono">O(1) amortized</td>
                <td className="py-2 text-muted-foreground">Usually O(1), occasionally O(n) when resizing</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-mono">addFirst(value)</td>
                <td className="py-2 text-red-600 font-mono">O(n)</td>
                <td className="py-2 text-muted-foreground">Must shift all n elements right</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-mono">add(index, value)</td>
                <td className="py-2 text-red-600 font-mono">O(n)</td>
                <td className="py-2 text-muted-foreground">Must shift n-index elements right</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-mono">removeLast()</td>
                <td className="py-2 text-green-600 font-mono">O(1)</td>
                <td className="py-2 text-muted-foreground">Just decrement size, no shifting</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-mono">removeFirst()</td>
                <td className="py-2 text-red-600 font-mono">O(n)</td>
                <td className="py-2 text-muted-foreground">Must shift all n-1 elements left</td>
              </tr>
              <tr>
                <td className="py-2 font-mono">remove(index)</td>
                <td className="py-2 text-red-600 font-mono">O(n)</td>
                <td className="py-2 text-muted-foreground">Must shift n-index-1 elements left</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Interactive Visualizer */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Interactive Visualizer</CardTitle>
          <p className="text-sm text-muted-foreground">
            Try different operations and watch how ArrayList handles them internally.
            Toggle between diagram and memory views to see different perspectives.
          </p>
        </CardHeader>
        <CardContent>
          <ArrayListVisualizer initialValues={[10, 20, 30, 40]} showCode={true} />
        </CardContent>
      </Card>

      {/* Edge Cases */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Edge Cases to Consider</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded">
              <h4 className="font-semibold mb-2">Empty List Operations</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <code>get(0)</code> on empty list → IndexOutOfBoundsException</li>
                <li>• <code>removeFirst()</code> on empty → NoSuchElementException</li>
                <li>• <code>add(0, value)</code> on empty → Works (adds first element)</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-50 rounded">
              <h4 className="font-semibold mb-2">Boundary Operations</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <code>add(size, value)</code> → Same as addLast</li>
                <li>• <code>add(-1, value)</code> → IndexOutOfBoundsException</li>
                <li>• <code>add(size+1, value)</code> → IndexOutOfBoundsException</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-50 rounded">
              <h4 className="font-semibold mb-2">Resizing Behavior</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Adding to full array triggers resize</li>
                <li>• New capacity = old capacity × 2</li>
                <li>• All elements copied to new array</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-50 rounded">
              <h4 className="font-semibold mb-2">Single Element</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <code>remove(0)</code> on single element → Empty list</li>
                <li>• No shifting needed for single element operations</li>
                <li>• Size becomes 0, but capacity unchanged</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* When to Use */}
      <Card>
        <CardHeader>
          <CardTitle>When to Use ArrayList</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-600 mb-2">Good For</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ Random access by index (get/set)</li>
                <li>✓ Adding/removing at the end</li>
                <li>✓ Iterating through all elements</li>
                <li>✓ When you know the approximate size</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-600 mb-2">Not Good For</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✗ Frequent insertions at beginning/middle</li>
                <li>✗ Frequent deletions at beginning/middle</li>
                <li>✗ When size changes dramatically</li>
                <li>✗ When memory is very constrained</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
