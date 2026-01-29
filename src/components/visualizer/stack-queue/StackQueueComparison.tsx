'use client';

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { createStack, push, pop, isEmpty } from '@/lib/algorithms/stack-queue/stack';
import { createQueue, enqueue, dequeue, isQueueEmpty } from '@/lib/algorithms/stack-queue/queue';
import type { StackState, QueueState } from '@/lib/algorithms/stack-queue/types';

interface ComparisonOperation {
  type: 'add' | 'remove';
  value?: number;
  stackResult?: number | null;
  queueResult?: number | null;
}

export function StackQueueComparison() {
  const [stack, setStack] = useState<StackState>(createStack());
  const [queue, setQueue] = useState<QueueState>(createQueue());
  const [operations, setOperations] = useState<ComparisonOperation[]>([]);
  const [nextValue, setNextValue] = useState(1);

  const handleAdd = useCallback(() => {
    const value = nextValue;
    setNextValue(prev => prev + 1);

    const { stack: newStack } = push(stack, value);
    setStack(newStack);

    const { queue: newQueue } = enqueue(queue, value);
    setQueue(newQueue);

    setOperations(prev => [...prev, { type: 'add', value }]);
  }, [stack, queue, nextValue]);

  const handleRemove = useCallback(() => {
    let stackResult: number | null = null;
    let queueResult: number | null = null;

    if (!isEmpty(stack)) {
      const { stack: newStack, result } = pop(stack);
      setStack(newStack);
      stackResult = result.value as number;
    }

    if (!isQueueEmpty(queue)) {
      const { queue: newQueue, result } = dequeue(queue);
      setQueue(newQueue);
      queueResult = result.value as number;
    }

    setOperations(prev => [...prev, { type: 'remove', stackResult, queueResult }]);
  }, [stack, queue]);

  const handleReset = useCallback(() => {
    setStack(createStack());
    setQueue(createQueue());
    setOperations([]);
    setNextValue(1);
  }, []);

  const handleSequence = useCallback(() => {
    handleReset();
    // Simulate: add 1, 2, 3, then remove, remove, remove
    let s = createStack();
    let q = createQueue();
    const ops: ComparisonOperation[] = [];

    for (let i = 1; i <= 3; i++) {
      const { stack: newS } = push(s, i);
      s = newS;
      const { queue: newQ } = enqueue(q, i);
      q = newQ;
      ops.push({ type: 'add', value: i });
    }

    for (let i = 0; i < 3; i++) {
      const { stack: newS, result: sRes } = pop(s);
      s = newS;
      const { queue: newQ, result: qRes } = dequeue(q);
      q = newQ;
      ops.push({ type: 'remove', stackResult: sRes.value as number, queueResult: qRes.value as number });
    }

    setStack(s);
    setQueue(q);
    setOperations(ops);
    setNextValue(4);
  }, []);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Side-by-Side Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Perform the same operations on both Stack and Queue to see how they behave differently.
          </p>
          <div className="flex gap-2 flex-wrap">
            <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700">
              Add {nextValue}
            </Button>
            <Button
              onClick={handleRemove}
              className="bg-red-600 hover:bg-red-700"
              disabled={isEmpty(stack) && isQueueEmpty(queue)}
            >
              Remove
            </Button>
            <Button onClick={handleSequence} variant="outline">
              Demo: Add 1,2,3 then Remove All
            </Button>
            <Button onClick={handleReset} variant="ghost">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Side by side visualization */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Stack */}
        <Card>
          <CardHeader className="pb-3 bg-blue-50">
            <CardTitle className="text-lg text-blue-800">
              Stack (LIFO)
              <span className="text-sm font-normal ml-2">Last-In, First-Out</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="border-2 border-blue-200 rounded-lg p-4 min-h-[200px] relative">
              {isEmpty(stack) ? (
                <div className="text-muted-foreground text-center py-16">
                  Stack is empty
                </div>
              ) : (
                <div className="flex flex-col-reverse gap-1">
                  {stack.items.map((item, index) => {
                    const isTop = index === stack.items.length - 1;
                    return (
                      <div
                        key={item.id}
                        className={`
                          h-12 rounded-lg flex items-center justify-center font-mono text-lg
                          ${isTop ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-800'}
                        `}
                      >
                        {item.value}
                        {isTop && <span className="text-xs ml-2 opacity-70">← TOP</span>}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <p className="text-sm text-blue-600 mt-2 text-center">
              Remove returns: <strong>most recently added</strong>
            </p>
          </CardContent>
        </Card>

        {/* Queue */}
        <Card>
          <CardHeader className="pb-3 bg-green-50">
            <CardTitle className="text-lg text-green-800">
              Queue (FIFO)
              <span className="text-sm font-normal ml-2">First-In, First-Out</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="border-2 border-green-200 rounded-lg p-4 min-h-[200px]">
              {isQueueEmpty(queue) ? (
                <div className="text-muted-foreground text-center py-16">
                  Queue is empty
                </div>
              ) : (
                <div className="flex gap-2 items-center flex-wrap">
                  {queue.items.map((item, index) => {
                    const isFront = index === 0;
                    return (
                      <div
                        key={item.id}
                        className={`
                          w-14 h-14 rounded-lg flex flex-col items-center justify-center font-mono
                          ${isFront ? 'bg-green-500 text-white' : 'bg-green-100 text-green-800'}
                        `}
                      >
                        {item.value}
                        {isFront && <span className="text-xs opacity-70">FRONT</span>}
                      </div>
                    );
                  })}
                  <span className="text-muted-foreground text-sm">→ rear</span>
                </div>
              )}
            </div>
            <p className="text-sm text-green-600 mt-2 text-center">
              Remove returns: <strong>first added (oldest)</strong>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Operation Log */}
      {operations.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Operation Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">#</th>
                    <th className="text-left p-2">Operation</th>
                    <th className="text-left p-2">Stack Result</th>
                    <th className="text-left p-2">Queue Result</th>
                    <th className="text-left p-2">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {operations.map((op, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          op.type === 'add' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {op.type === 'add' ? `add(${op.value})` : 'remove()'}
                        </span>
                      </td>
                      <td className="p-2 font-mono">
                        {op.type === 'add' ? (
                          <span className="text-blue-600">push({op.value})</span>
                        ) : (
                          <span className="text-blue-600">pop() → {op.stackResult}</span>
                        )}
                      </td>
                      <td className="p-2 font-mono">
                        {op.type === 'add' ? (
                          <span className="text-green-600">enqueue({op.value})</span>
                        ) : (
                          <span className="text-green-600">dequeue() → {op.queueResult}</span>
                        )}
                      </td>
                      <td className="p-2 text-muted-foreground">
                        {op.type === 'remove' && op.stackResult !== op.queueResult && (
                          <span className="text-orange-600 font-medium">
                            Different results!
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key difference highlight */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-yellow-800">Key Difference</CardTitle>
        </CardHeader>
        <CardContent className="text-yellow-700">
          <p>
            After adding elements <strong>1, 2, 3</strong> in order:
          </p>
          <ul className="mt-2 space-y-1">
            <li>• <strong>Stack</strong> removes in order: <strong>3, 2, 1</strong> (reverse order - LIFO)</li>
            <li>• <strong>Queue</strong> removes in order: <strong>1, 2, 3</strong> (same order - FIFO)</li>
          </ul>
          <p className="mt-3 text-sm">
            Click &quot;Demo: Add 1,2,3 then Remove All&quot; to see this in action!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
