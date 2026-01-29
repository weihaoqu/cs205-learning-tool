'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StackVisualizer, BalancedParenthesesVisualizer } from '@/components/visualizer/stack-queue';
import {
  stackArrayImplementation,
  stackLinkedListImplementation,
  stackImplementationComparison,
  stackPitfalls
} from '@/lib/algorithms/stack-queue/stack';

export default function StackPage() {
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

      <h1 className="text-4xl font-bold mb-2">Stack</h1>
      <p className="text-xl text-muted-foreground mb-8">
        LIFO (Last-In, First-Out) data structure
      </p>

      {/* Operations Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Interactive Stack Operations</h2>
        <p className="text-muted-foreground mb-4">
          Drag elements onto the stack to push, or click the top element to pop.
        </p>
        <StackVisualizer />
      </section>

      {/* Java Implementation */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Java Implementation</h2>
        <Tabs defaultValue="array" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="array">Array-Based</TabsTrigger>
            <TabsTrigger value="linkedlist">LinkedList-Based</TabsTrigger>
          </TabsList>
          <TabsContent value="array">
            <Card>
              <CardHeader>
                <CardTitle>{stackArrayImplementation.title}</CardTitle>
                <p className="text-muted-foreground">{stackArrayImplementation.description}</p>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{stackArrayImplementation.javaCode}</code>
                </pre>
                <div className="mt-4 flex gap-4 text-sm">
                  <span className="text-green-600">
                    <strong>Time:</strong> {stackArrayImplementation.timeComplexity}
                  </span>
                  <span className="text-blue-600">
                    <strong>Space:</strong> {stackArrayImplementation.spaceComplexity}
                  </span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="linkedlist">
            <Card>
              <CardHeader>
                <CardTitle>{stackLinkedListImplementation.title}</CardTitle>
                <p className="text-muted-foreground">{stackLinkedListImplementation.description}</p>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{stackLinkedListImplementation.javaCode}</code>
                </pre>
                <div className="mt-4 flex gap-4 text-sm">
                  <span className="text-green-600">
                    <strong>Time:</strong> {stackLinkedListImplementation.timeComplexity}
                  </span>
                  <span className="text-blue-600">
                    <strong>Space:</strong> {stackLinkedListImplementation.spaceComplexity}
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
                  {stackImplementationComparison.map((row, index) => (
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

      {/* Balanced Parentheses Application */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Application: Balanced Parentheses</h2>
        <p className="text-muted-foreground mb-4">
          One of the most common uses of stacks is checking if brackets are balanced.
          Watch how the stack helps match opening and closing brackets.
        </p>
        <BalancedParenthesesVisualizer />
      </section>

      {/* Common Pitfalls */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Common Pitfalls</h2>
        <div className="grid gap-4">
          {stackPitfalls.map((pitfall, index) => (
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
          href="/modules/stack-queue"
          className="text-primary hover:underline"
        >
          ← Overview
        </Link>
        <Link
          href="/modules/stack-queue/queue"
          className="text-primary hover:underline"
        >
          Queue →
        </Link>
      </div>
    </div>
  );
}
