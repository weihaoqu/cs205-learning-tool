'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QueueVisualizer, PriorityQueueVisualizer } from '@/components/visualizer/stack-queue';
import {
  queueArrayImplementation,
  queueLinkedListImplementation,
  priorityQueueExample,
  queueImplementationComparison,
  queuePitfalls
} from '@/lib/algorithms/stack-queue/queue';

export default function QueuePage() {
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

      <h1 className="text-4xl font-bold mb-2">Queue</h1>
      <p className="text-xl text-muted-foreground mb-8">
        FIFO (First-In, First-Out) data structure
      </p>

      {/* Operations Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Interactive Queue Operations</h2>
        <p className="text-muted-foreground mb-4">
          Drag elements to enqueue at the rear, or click the front element to dequeue.
        </p>
        <QueueVisualizer />
      </section>

      {/* Java Implementation */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Java Implementation</h2>
        <Tabs defaultValue="array" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-lg">
            <TabsTrigger value="array">Array-Based</TabsTrigger>
            <TabsTrigger value="linkedlist">LinkedList</TabsTrigger>
            <TabsTrigger value="priority">PriorityQueue</TabsTrigger>
          </TabsList>
          <TabsContent value="array">
            <Card>
              <CardHeader>
                <CardTitle>{queueArrayImplementation.title}</CardTitle>
                <p className="text-muted-foreground">{queueArrayImplementation.description}</p>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{queueArrayImplementation.javaCode}</code>
                </pre>
                <div className="mt-4 flex gap-4 text-sm">
                  <span className="text-green-600">
                    <strong>Time:</strong> {queueArrayImplementation.timeComplexity}
                  </span>
                  <span className="text-blue-600">
                    <strong>Space:</strong> {queueArrayImplementation.spaceComplexity}
                  </span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="linkedlist">
            <Card>
              <CardHeader>
                <CardTitle>{queueLinkedListImplementation.title}</CardTitle>
                <p className="text-muted-foreground">{queueLinkedListImplementation.description}</p>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{queueLinkedListImplementation.javaCode}</code>
                </pre>
                <div className="mt-4 flex gap-4 text-sm">
                  <span className="text-green-600">
                    <strong>Time:</strong> {queueLinkedListImplementation.timeComplexity}
                  </span>
                  <span className="text-blue-600">
                    <strong>Space:</strong> {queueLinkedListImplementation.spaceComplexity}
                  </span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="priority">
            <Card>
              <CardHeader>
                <CardTitle>{priorityQueueExample.title}</CardTitle>
                <p className="text-muted-foreground">{priorityQueueExample.description}</p>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{priorityQueueExample.javaCode}</code>
                </pre>
                <div className="mt-4 flex gap-4 text-sm">
                  <span className="text-green-600">
                    <strong>Time:</strong> {priorityQueueExample.timeComplexity}
                  </span>
                  <span className="text-blue-600">
                    <strong>Space:</strong> {priorityQueueExample.spaceComplexity}
                  </span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Comparison Table */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Implementation Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Aspect</th>
                    <th className="text-left p-3">Array-Based</th>
                    <th className="text-left p-3">LinkedList-Based</th>
                  </tr>
                </thead>
                <tbody>
                  {queueImplementationComparison.map((row, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-3 font-medium">{row.aspect}</td>
                      <td className="p-3">{row.arrayBased}</td>
                      <td className="p-3">{row.linkedListBased}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Priority Queue Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Priority Queue</h2>
        <p className="text-muted-foreground mb-4">
          A Priority Queue removes elements based on priority, not arrival order.
          See how it differs from a regular queue in this ER triage simulation.
        </p>
        <PriorityQueueVisualizer />
      </section>

      {/* Common Pitfalls */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Common Pitfalls</h2>
        <div className="grid gap-4">
          {queuePitfalls.map((pitfall, index) => (
            <Card key={index} className="border-red-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-red-700">
                  ⚠️ {pitfall.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">{pitfall.problem}</p>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mb-3">
                  <code>{pitfall.example}</code>
                </pre>
                <p className="text-sm text-green-700">
                  <strong>Prevention:</strong> {pitfall.prevention}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between">
        <Link
          href="/modules/stack-queue/stack"
          className="text-primary hover:underline"
        >
          ← Stack
        </Link>
        <Link
          href="/modules/stack-queue/comparison"
          className="text-primary hover:underline"
        >
          Comparison →
        </Link>
      </div>
    </div>
  );
}
