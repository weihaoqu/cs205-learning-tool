'use client';

import Link from 'next/link';
import { LinkedListVisualizer } from '@/components/visualizer/lists';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SinglyLinkedListPage() {
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
          <span className="w-4 h-4 rounded-full bg-green-500" />
          Singly Linked List
        </h1>
        <p className="text-muted-foreground text-lg">
          A linear collection of nodes where each node contains data and a reference
          to the next node. Provides O(1) insertion/deletion at the beginning.
        </p>
      </div>

      {/* Key Concepts */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>How Singly Linked List Works Internally</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Node Structure</h4>
              <p className="text-sm text-muted-foreground">
                Each node contains two fields: <code>data</code> (the actual value)
                and <code>next</code> (a reference/pointer to the next node).
                The last node&apos;s next is null.
              </p>
              <pre className="mt-2 text-xs bg-slate-100 p-2 rounded">
{`class Node {
    E data;
    Node next;
}`}
              </pre>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Head and Tail References</h4>
              <p className="text-sm text-muted-foreground">
                The list maintains a <code>head</code> reference pointing to the first node.
                Optionally, a <code>tail</code> reference points to the last node,
                enabling O(1) insertion at the end.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Sequential Access</h4>
              <p className="text-sm text-muted-foreground">
                To access element at index i, you must start at head and follow
                i &quot;next&quot; pointers. This is why get(index) is O(n) - you can&apos;t
                jump directly to a position.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Pointer Manipulation</h4>
              <p className="text-sm text-muted-foreground">
                Insert and delete operations involve changing &quot;next&quot; pointers.
                No shifting of elements is needed - just redirect the pointers.
                This is the key advantage over ArrayList for certain operations.
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
                <td className="py-2 text-red-600 font-mono">O(n)</td>
                <td className="py-2 text-muted-foreground">Must traverse from head to index</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-mono">set(index, value)</td>
                <td className="py-2 text-red-600 font-mono">O(n)</td>
                <td className="py-2 text-muted-foreground">Must traverse from head to index</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-mono">addFirst(value)</td>
                <td className="py-2 text-green-600 font-mono">O(1)</td>
                <td className="py-2 text-muted-foreground">Just update head pointer</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-mono">addLast(value)</td>
                <td className="py-2 text-green-600 font-mono">O(1)*</td>
                <td className="py-2 text-muted-foreground">O(1) with tail pointer, O(n) without</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-mono">add(index, value)</td>
                <td className="py-2 text-red-600 font-mono">O(n)</td>
                <td className="py-2 text-muted-foreground">Must traverse to index-1, then O(1) insert</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-mono">removeFirst()</td>
                <td className="py-2 text-green-600 font-mono">O(1)</td>
                <td className="py-2 text-muted-foreground">Just update head pointer</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-mono">removeLast()</td>
                <td className="py-2 text-red-600 font-mono">O(n)</td>
                <td className="py-2 text-muted-foreground">Must traverse to find second-to-last</td>
              </tr>
              <tr>
                <td className="py-2 font-mono">remove(index)</td>
                <td className="py-2 text-red-600 font-mono">O(n)</td>
                <td className="py-2 text-muted-foreground">Must traverse to index-1, then O(1) remove</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-muted-foreground mt-2">
            * With tail pointer maintained
          </p>
        </CardContent>
      </Card>

      {/* Interactive Visualizer */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Interactive Visualizer</CardTitle>
          <p className="text-sm text-muted-foreground">
            Try different operations and watch how pointers are updated.
            Notice the traversal needed to access middle elements.
          </p>
        </CardHeader>
        <CardContent>
          <LinkedListVisualizer type="singly-linked" initialValues={[10, 20, 30, 40]} showCode={true} />
        </CardContent>
      </Card>

      {/* Pointer Operations Visual */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Pointer Operations Explained</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add First */}
          <div className="p-4 bg-slate-50 rounded">
            <h4 className="font-semibold mb-2">addFirst(value) - O(1)</h4>
            <div className="text-sm text-muted-foreground mb-2">
              1. Create new node &nbsp; 2. Set new.next = head &nbsp; 3. Set head = new
            </div>
            <div className="font-mono text-sm">
              <div>Before: head → [A] → [B] → [C] → null</div>
              <div className="text-green-600">After:  head → [NEW] → [A] → [B] → [C] → null</div>
            </div>
          </div>

          {/* Remove First */}
          <div className="p-4 bg-slate-50 rounded">
            <h4 className="font-semibold mb-2">removeFirst() - O(1)</h4>
            <div className="text-sm text-muted-foreground mb-2">
              1. Save head.data &nbsp; 2. Set head = head.next &nbsp; 3. Return saved data
            </div>
            <div className="font-mono text-sm">
              <div>Before: head → [A] → [B] → [C] → null</div>
              <div className="text-red-600">After:  head → [B] → [C] → null (A removed)</div>
            </div>
          </div>

          {/* Add in Middle */}
          <div className="p-4 bg-slate-50 rounded">
            <h4 className="font-semibold mb-2">add(1, value) - Insert at index 1</h4>
            <div className="text-sm text-muted-foreground mb-2">
              1. Traverse to node at index 0 &nbsp; 2. Create new node &nbsp;
              3. Set new.next = prev.next &nbsp; 4. Set prev.next = new
            </div>
            <div className="font-mono text-sm">
              <div>Before: head → [A] → [B] → [C] → null</div>
              <div className="text-green-600">After:  head → [A] → [NEW] → [B] → [C] → null</div>
            </div>
          </div>
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
                <li>• <code>head == null</code> indicates empty list</li>
                <li>• <code>addFirst</code> on empty: new node becomes both head and tail</li>
                <li>• <code>removeFirst</code> on empty → NoSuchElementException</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-50 rounded">
              <h4 className="font-semibold mb-2">Single Element</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• head == tail when only one element</li>
                <li>• Removing single element: both head and tail become null</li>
                <li>• Need to update tail when removing last element</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-50 rounded">
              <h4 className="font-semibold mb-2">Tail Management</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Must update tail when adding to empty list</li>
                <li>• Must update tail when removing last element</li>
                <li>• <code>removeLast</code> needs to find new tail (O(n))</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-50 rounded">
              <h4 className="font-semibold mb-2">Traversal</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Always check for null before accessing next</li>
                <li>• Can only traverse forward (no prev pointer)</li>
                <li>• Keep track of previous node for deletions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* When to Use */}
      <Card>
        <CardHeader>
          <CardTitle>When to Use Singly Linked List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-600 mb-2">Good For</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ Frequent insertions at beginning</li>
                <li>✓ Frequent deletions at beginning</li>
                <li>✓ When you don&apos;t need random access</li>
                <li>✓ Implementing stacks (push/pop at head)</li>
                <li>✓ When memory for pointers is acceptable</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-600 mb-2">Not Good For</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✗ Random access by index</li>
                <li>✗ Searching for elements</li>
                <li>✗ Removing from the end (use doubly-linked)</li>
                <li>✗ When memory is very constrained</li>
                <li>✗ When cache locality matters</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
