'use client';

import Link from 'next/link';
import { LinkedListVisualizer } from '@/components/visualizer/lists';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DoublyLinkedListPage() {
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
          <span className="w-4 h-4 rounded-full bg-purple-500" />
          Doubly Linked List
        </h1>
        <p className="text-muted-foreground text-lg">
          A linear collection where each node has references to both the next and
          previous nodes. Provides O(1) insertion/deletion at both ends.
        </p>
      </div>

      {/* Key Concepts */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>How Doubly Linked List Works Internally</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Node Structure</h4>
              <p className="text-sm text-muted-foreground">
                Each node contains three fields: <code>data</code>, <code>next</code>,
                and <code>prev</code>. The prev pointer allows backward traversal
                and enables O(1) deletion from the end.
              </p>
              <pre className="mt-2 text-xs bg-slate-100 p-2 rounded">
{`class Node {
    E data;
    Node next;
    Node prev;
}`}
              </pre>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Head and Tail</h4>
              <p className="text-sm text-muted-foreground">
                Both <code>head</code> and <code>tail</code> references are maintained.
                head.prev is null, tail.next is null. This enables efficient
                operations at both ends of the list.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Bidirectional Traversal</h4>
              <p className="text-sm text-muted-foreground">
                You can traverse forward (using next) or backward (using prev).
                For get(index), you can optimize by starting from the closer end:
                if index &lt; size/2, start from head; otherwise start from tail.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">More Pointers to Update</h4>
              <p className="text-sm text-muted-foreground">
                Insert and delete operations require updating more pointers than
                singly-linked. For middle insertions, you update 4 pointers:
                new.next, new.prev, prev.next, and next.prev.
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
                <td className="py-2 text-yellow-600 font-mono">O(n/2) = O(n)</td>
                <td className="py-2 text-muted-foreground">Traverse from closer end (head or tail)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-mono">set(index, value)</td>
                <td className="py-2 text-yellow-600 font-mono">O(n/2) = O(n)</td>
                <td className="py-2 text-muted-foreground">Traverse from closer end (head or tail)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-mono">addFirst(value)</td>
                <td className="py-2 text-green-600 font-mono">O(1)</td>
                <td className="py-2 text-muted-foreground">Update head pointer and new.next</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-mono">addLast(value)</td>
                <td className="py-2 text-green-600 font-mono">O(1)</td>
                <td className="py-2 text-muted-foreground">Update tail pointer and new.prev</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-mono">add(index, value)</td>
                <td className="py-2 text-red-600 font-mono">O(n)</td>
                <td className="py-2 text-muted-foreground">Traverse to index, then O(1) insert</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-mono">removeFirst()</td>
                <td className="py-2 text-green-600 font-mono">O(1)</td>
                <td className="py-2 text-muted-foreground">Update head and new head&apos;s prev</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-mono">removeLast()</td>
                <td className="py-2 text-green-600 font-mono">O(1)</td>
                <td className="py-2 text-muted-foreground">Update tail using tail.prev</td>
              </tr>
              <tr>
                <td className="py-2 font-mono">remove(index)</td>
                <td className="py-2 text-red-600 font-mono">O(n)</td>
                <td className="py-2 text-muted-foreground">Traverse to index, then O(1) remove</td>
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
            Notice the bidirectional arrows between nodes. Watch how both next
            and prev pointers are updated during operations.
          </p>
        </CardHeader>
        <CardContent>
          <LinkedListVisualizer type="doubly-linked" initialValues={[10, 20, 30, 40]} showCode={true} />
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
              1. Create new node &nbsp;
              2. new.next = head &nbsp;
              3. head.prev = new &nbsp;
              4. head = new
            </div>
            <div className="font-mono text-sm">
              <div>Before: null ← [A] ⇄ [B] ⇄ [C] → null</div>
              <div className="text-green-600">After:  null ← [NEW] ⇄ [A] ⇄ [B] ⇄ [C] → null</div>
            </div>
          </div>

          {/* Add Last */}
          <div className="p-4 bg-slate-50 rounded">
            <h4 className="font-semibold mb-2">addLast(value) - O(1)</h4>
            <div className="text-sm text-muted-foreground mb-2">
              1. Create new node &nbsp;
              2. new.prev = tail &nbsp;
              3. tail.next = new &nbsp;
              4. tail = new
            </div>
            <div className="font-mono text-sm">
              <div>Before: null ← [A] ⇄ [B] ⇄ [C] → null</div>
              <div className="text-green-600">After:  null ← [A] ⇄ [B] ⇄ [C] ⇄ [NEW] → null</div>
            </div>
          </div>

          {/* Remove Last */}
          <div className="p-4 bg-slate-50 rounded">
            <h4 className="font-semibold mb-2">removeLast() - O(1)</h4>
            <div className="text-sm text-muted-foreground mb-2">
              1. Save tail.data &nbsp;
              2. tail = tail.prev &nbsp;
              3. tail.next = null &nbsp;
              4. Return saved data
            </div>
            <div className="font-mono text-sm">
              <div>Before: null ← [A] ⇄ [B] ⇄ [C] → null</div>
              <div className="text-red-600">After:  null ← [A] ⇄ [B] → null (C removed)</div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              This is O(1) because we can directly access the previous node via tail.prev!
            </p>
          </div>

          {/* Insert in Middle */}
          <div className="p-4 bg-slate-50 rounded">
            <h4 className="font-semibold mb-2">add(1, value) - Insert at index 1</h4>
            <div className="text-sm text-muted-foreground mb-2">
              1. Traverse to node at index 1 &nbsp;
              2. Create new node &nbsp;
              3. Update 4 pointers: new.next, new.prev, prev.next, current.prev
            </div>
            <div className="font-mono text-sm">
              <div>Before: null ← [A] ⇄ [B] ⇄ [C] → null</div>
              <div className="text-green-600">After:  null ← [A] ⇄ [NEW] ⇄ [B] ⇄ [C] → null</div>
            </div>
          </div>

          {/* Remove from Middle */}
          <div className="p-4 bg-slate-50 rounded">
            <h4 className="font-semibold mb-2">remove(1) - Remove at index 1</h4>
            <div className="text-sm text-muted-foreground mb-2">
              1. Traverse to node at index 1 &nbsp;
              2. prev.next = current.next &nbsp;
              3. next.prev = current.prev &nbsp;
              4. Return current.data
            </div>
            <div className="font-mono text-sm">
              <div>Before: null ← [A] ⇄ [B] ⇄ [C] → null</div>
              <div className="text-red-600">After:  null ← [A] ⇄ [C] → null (B removed)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison with Singly Linked */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Doubly vs Singly Linked List</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Aspect</th>
                <th className="text-left py-2">Singly Linked</th>
                <th className="text-left py-2">Doubly Linked</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Node size</td>
                <td className="py-2">data + 1 pointer</td>
                <td className="py-2 text-yellow-600">data + 2 pointers (more memory)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">removeLast()</td>
                <td className="py-2 text-red-600">O(n) - must traverse</td>
                <td className="py-2 text-green-600">O(1) - use tail.prev</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Traversal</td>
                <td className="py-2">Forward only</td>
                <td className="py-2 text-green-600">Forward and backward</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Insert complexity</td>
                <td className="py-2">2 pointer updates</td>
                <td className="py-2 text-yellow-600">4 pointer updates</td>
              </tr>
              <tr>
                <td className="py-2">get(index) optimization</td>
                <td className="py-2">Always from head</td>
                <td className="py-2 text-green-600">From closer end</td>
              </tr>
            </tbody>
          </table>
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
              <h4 className="font-semibold mb-2">Empty List</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• head == null AND tail == null</li>
                <li>• addFirst/addLast: set both head and tail to new node</li>
                <li>• new node has prev = null and next = null</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-50 rounded">
              <h4 className="font-semibold mb-2">Single Element</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• head == tail (same node)</li>
                <li>• node.prev == null AND node.next == null</li>
                <li>• Removing: set both head and tail to null</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-50 rounded">
              <h4 className="font-semibold mb-2">Boundary Pointers</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• First node: prev must be null</li>
                <li>• Last node: next must be null</li>
                <li>• After removeFirst: new head&apos;s prev = null</li>
                <li>• After removeLast: new tail&apos;s next = null</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-50 rounded">
              <h4 className="font-semibold mb-2">Null Checks</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Check if node.prev != null before node.prev.next</li>
                <li>• Check if node.next != null before node.next.prev</li>
                <li>• Prevents NullPointerException</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* When to Use */}
      <Card>
        <CardHeader>
          <CardTitle>When to Use Doubly Linked List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-600 mb-2">Good For</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ Frequent insertions/deletions at both ends</li>
                <li>✓ Implementing deques (double-ended queues)</li>
                <li>✓ Navigation (browser history, undo/redo)</li>
                <li>✓ LRU cache implementation</li>
                <li>✓ When backward traversal is needed</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-600 mb-2">Not Good For</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✗ Random access by index</li>
                <li>✗ Memory-constrained environments</li>
                <li>✗ Simple LIFO stacks (use singly-linked)</li>
                <li>✗ When pointer overhead is a concern</li>
                <li>✗ Cache-sensitive applications</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-purple-50 rounded">
            <h4 className="font-semibold mb-2">Real-World Usage</h4>
            <p className="text-sm text-muted-foreground">
              Java&apos;s <code>LinkedList</code> class is actually a doubly-linked list!
              It implements both <code>List</code> and <code>Deque</code> interfaces,
              allowing it to be used as a list, stack, or queue.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
