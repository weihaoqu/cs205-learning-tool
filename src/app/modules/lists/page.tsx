'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const listTopics = [
  {
    id: 'arraylist',
    title: 'ArrayList',
    description: 'Dynamic array implementation with automatic resizing',
    concepts: [
      'Backing array storage',
      'Capacity vs size',
      'Dynamic resizing (doubling)',
      'Element shifting on insert/remove',
    ],
    complexity: {
      access: 'O(1)',
      insertEnd: 'O(1) amortized',
      insertMiddle: 'O(n)',
      remove: 'O(n)',
    },
    color: 'bg-blue-500',
  },
  {
    id: 'singly-linked',
    title: 'Singly Linked List',
    description: 'Linear collection of nodes connected by next pointers',
    concepts: [
      'Node structure (data + next)',
      'Head reference',
      'Sequential traversal',
      'Pointer manipulation',
    ],
    complexity: {
      access: 'O(n)',
      insertFront: 'O(1)',
      insertEnd: 'O(1) with tail',
      remove: 'O(n)',
    },
    color: 'bg-green-500',
  },
  {
    id: 'doubly-linked',
    title: 'Doubly Linked List',
    description: 'Nodes connected by both next and previous pointers',
    concepts: [
      'Node structure (data + next + prev)',
      'Head and tail references',
      'Bidirectional traversal',
      'Complex pointer updates',
    ],
    complexity: {
      access: 'O(n)',
      insertFront: 'O(1)',
      insertEnd: 'O(1)',
      removeEnd: 'O(1)',
    },
    color: 'bg-purple-500',
  },
];

export default function ListsOverviewPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Lists Module</h1>
        <p className="text-muted-foreground text-lg">
          Learn how List data structures work internally. Understand the mechanics of
          ArrayList, Singly Linked List, and Doubly Linked List implementations.
        </p>
      </div>

      {/* What You'll Learn */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>What You&apos;ll Learn</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Internal Implementation</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>- How ArrayList uses a backing array</li>
                <li>- How LinkedList uses nodes and pointers</li>
                <li>- Memory layout differences</li>
                <li>- Dynamic resizing strategies</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Operations</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>- add, get, set, remove at any index</li>
                <li>- addFirst, addLast, removeFirst, removeLast</li>
                <li>- Step-by-step visualization of each operation</li>
                <li>- Java code and pseudocode</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Structure Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {listTopics.map((topic) => (
          <Card key={topic.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-3 h-3 rounded-full ${topic.color}`} />
                <CardTitle>{topic.title}</CardTitle>
              </div>
              <CardDescription>{topic.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2">Key Concepts</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {topic.concepts.map((concept, i) => (
                    <li key={i}>- {concept}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2">Time Complexity</h4>
                <div className="text-xs text-muted-foreground grid grid-cols-2 gap-1">
                  {Object.entries(topic.complexity).map(([op, time]) => (
                    <div key={op}>
                      <span className="capitalize">{op.replace(/([A-Z])/g, ' $1')}: </span>
                      <span className="font-mono">{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <div className="p-4 pt-0">
              <Button asChild className="w-full">
                <Link href={`/modules/lists/${topic.id}`}>
                  Explore {topic.title}
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Comparison Link */}
      <Card className="bg-muted">
        <CardHeader>
          <CardTitle>Compare All List Types</CardTitle>
          <CardDescription>
            See ArrayList vs LinkedList side-by-side with interactive performance demos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline">
            <Link href="/modules/lists/comparison">
              View Comparison
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Visual Guide */}
      <div className="mt-8 p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Visual Guide: Memory Layout</h2>

        <div className="space-y-6">
          {/* ArrayList visualization */}
          <div>
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              ArrayList - Contiguous Memory
            </h3>
            <div className="flex items-center gap-1 font-mono text-sm">
              <span className="text-muted-foreground mr-2">data[]:</span>
              {[10, 20, 30, 40, null, null].map((val, i) => (
                <div
                  key={i}
                  className={`w-12 h-10 flex items-center justify-center border ${
                    val !== null ? 'bg-blue-100 border-blue-300' : 'bg-gray-50 border-dashed'
                  }`}
                >
                  {val ?? ''}
                </div>
              ))}
              <span className="text-muted-foreground ml-2">size=4, capacity=6</span>
            </div>
          </div>

          {/* Singly LinkedList visualization */}
          <div>
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500" />
              Singly Linked List - Nodes with Next Pointers
            </h3>
            <div className="flex items-center gap-2 font-mono text-sm">
              <span className="text-muted-foreground">head</span>
              <span>→</span>
              {[10, 20, 30, 40].map((val, i, arr) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex border border-green-300 rounded">
                    <div className="w-10 h-10 flex items-center justify-center bg-green-100 border-r border-green-300">
                      {val}
                    </div>
                    <div className="w-8 h-10 flex items-center justify-center bg-green-50 text-xs">
                      next
                    </div>
                  </div>
                  {i < arr.length - 1 ? <span>→</span> : <span>→ null</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Doubly LinkedList visualization */}
          <div>
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-500" />
              Doubly Linked List - Bidirectional Pointers
            </h3>
            <div className="flex items-center gap-2 font-mono text-sm">
              <span className="text-muted-foreground">head</span>
              <span>→</span>
              {[10, 20, 30].map((val, i, arr) => (
                <div key={i} className="flex items-center gap-1">
                  <div className="flex border border-purple-300 rounded">
                    <div className="w-6 h-10 flex items-center justify-center bg-purple-50 text-xs border-r border-purple-300">
                      prev
                    </div>
                    <div className="w-10 h-10 flex items-center justify-center bg-purple-100 border-r border-purple-300">
                      {val}
                    </div>
                    <div className="w-6 h-10 flex items-center justify-center bg-purple-50 text-xs">
                      next
                    </div>
                  </div>
                  {i < arr.length - 1 ? <span>⇄</span> : <span>→ null</span>}
                </div>
              ))}
              <span className="text-muted-foreground ml-2">← tail</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
