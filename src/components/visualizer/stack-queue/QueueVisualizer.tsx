'use client';

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createQueue, enqueue, dequeue, peekQueue, isQueueEmpty, queueSize } from '@/lib/algorithms/stack-queue/queue';
import type { QueueState, Operation } from '@/lib/algorithms/stack-queue/types';

export function QueueVisualizer() {
  const [queue, setQueue] = useState<QueueState>(createQueue(8));
  const [inputValue, setInputValue] = useState('');
  const [operations, setOperations] = useState<Operation[]>([]);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [highlightFront, setHighlightFront] = useState(false);
  const [animatingItem, setAnimatingItem] = useState<string | null>(null);
  const [animationType, setAnimationType] = useState<'enqueue' | 'dequeue' | null>(null);
  const [draggedValue, setDraggedValue] = useState<number | null>(null);

  const addOperation = useCallback((op: Operation) => {
    setOperations(prev => [op, ...prev].slice(0, 10));
  }, []);

  const handleEnqueue = useCallback((value: string | number) => {
    const val = typeof value === 'string' ? (isNaN(Number(value)) ? value : Number(value)) : value;
    const { queue: newQueue, result } = enqueue(queue, val);

    if (result.success) {
      const newItem = newQueue.items[newQueue.items.length - 1];
      setAnimatingItem(newItem.id);
      setAnimationType('enqueue');
      setTimeout(() => {
        setAnimatingItem(null);
        setAnimationType(null);
      }, 300);
      setQueue(newQueue);
      setMessage({ text: `Enqueued ${val}`, type: 'success' });
      addOperation({ type: 'enqueue', value: val, result: val, timestamp: Date.now(), success: true });
    } else {
      setMessage({ text: result.error || 'Enqueue failed', type: 'error' });
      addOperation({ type: 'enqueue', value: val, timestamp: Date.now(), success: false, error: result.error });
    }
    setInputValue('');
  }, [queue, addOperation]);

  const handleDequeue = useCallback(() => {
    if (queue.items.length > 0) {
      const frontItem = queue.items[0];
      setAnimatingItem(frontItem.id);
      setAnimationType('dequeue');

      setTimeout(() => {
        const { queue: newQueue, result } = dequeue(queue);
        if (result.success) {
          setQueue(newQueue);
          setMessage({ text: `Dequeued ${result.value}`, type: 'success' });
          addOperation({ type: 'dequeue', result: result.value, timestamp: Date.now(), success: true });
        }
        setAnimatingItem(null);
        setAnimationType(null);
      }, 300);
    } else {
      setMessage({ text: 'Queue Underflow: Queue is empty', type: 'error' });
      addOperation({ type: 'dequeue', timestamp: Date.now(), success: false, error: 'Queue is empty' });
    }
  }, [queue, addOperation]);

  const handlePeek = useCallback(() => {
    const result = peekQueue(queue);
    if (result.success) {
      setHighlightFront(true);
      setTimeout(() => setHighlightFront(false), 1000);
      setMessage({ text: `Front element: ${result.value}`, type: 'info' });
      addOperation({ type: 'peek', result: result.value, timestamp: Date.now(), success: true });
    } else {
      setMessage({ text: result.error || 'Queue is empty', type: 'error' });
      addOperation({ type: 'peek', timestamp: Date.now(), success: false, error: result.error });
    }
  }, [queue, addOperation]);

  const handleClear = useCallback(() => {
    setQueue(createQueue(8));
    setOperations([]);
    setMessage(null);
  }, []);

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, value: number) => {
    setDraggedValue(value);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedValue !== null) {
      handleEnqueue(draggedValue);
    }
    setDraggedValue(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      handleEnqueue(inputValue.trim());
    }
  };

  const maxSize = 8;

  return (
    <div className="space-y-6">
      {/* Draggable Elements */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Drag elements to enqueue (add to rear)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <div
                key={num}
                draggable
                onDragStart={(e) => handleDragStart(e, num)}
                className="w-12 h-12 bg-green-500 text-white rounded-lg flex items-center justify-center font-bold text-lg cursor-grab active:cursor-grabbing hover:bg-green-600 transition-colors select-none"
              >
                {num}
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <Input
              type="text"
              placeholder="Or type custom value..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="max-w-[200px]"
            />
            <Button
              onClick={() => inputValue.trim() && handleEnqueue(inputValue.trim())}
              disabled={!inputValue.trim()}
              variant="outline"
            >
              Enqueue
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Queue Visualization */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              <span>Queue (FIFO)</span>
              <span className="text-sm font-normal text-muted-foreground">
                Size: {queueSize(queue)} / {maxSize}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Queue Container */}
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={`relative min-h-[120px] border-2 border-dashed rounded-lg p-4 transition-colors ${
                draggedValue !== null ? 'border-green-500 bg-green-50' : 'border-gray-300'
              }`}
            >
              {/* Front/Rear labels */}
              {queue.items.length > 0 && (
                <>
                  <div className="absolute -top-6 left-4 text-xs text-muted-foreground">
                    ↓ front (dequeue)
                  </div>
                  <div className="absolute -top-6 right-4 text-xs text-muted-foreground">
                    rear (enqueue) ↓
                  </div>
                </>
              )}

              {/* Queue items - left to right */}
              <div className="flex gap-2 items-center min-h-[80px]">
                {queue.items.map((item, index) => {
                  const isFront = index === 0;
                  const isRear = index === queue.items.length - 1;
                  const isAnimating = animatingItem === item.id;

                  return (
                    <div
                      key={item.id}
                      onClick={isFront ? handleDequeue : undefined}
                      className={`
                        w-14 h-14 rounded-lg flex flex-col items-center justify-center font-mono
                        transition-all duration-300
                        ${isFront
                          ? 'bg-green-500 text-white cursor-pointer hover:bg-green-600'
                          : 'bg-gray-200 text-gray-700'
                        }
                        ${isFront && highlightFront ? 'ring-4 ring-yellow-400' : ''}
                        ${isAnimating && animationType === 'enqueue' ? 'transform translate-x-2 opacity-70' : ''}
                        ${isAnimating && animationType === 'dequeue' ? 'transform -translate-x-4 opacity-0' : ''}
                      `}
                    >
                      <span className="text-xs opacity-70">[{index}]</span>
                      <span className="font-bold">{item.value}</span>
                    </div>
                  );
                })}

                {/* Empty state */}
                {isQueueEmpty(queue) && (
                  <div className="flex-1 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <p>Queue is empty</p>
                      <p className="text-sm">Drag an element here to enqueue</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Direction arrow */}
              {queue.items.length > 0 && (
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">
                  ← dequeue | enqueue →
                </div>
              )}
            </div>

            {/* Click hint */}
            {queue.items.length > 0 && (
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Click the front element (green) to dequeue
              </p>
            )}

            {/* Control buttons */}
            <div className="flex gap-2 mt-4">
              <Button onClick={handlePeek} variant="outline" size="sm">
                Peek
              </Button>
              <Button onClick={handleDequeue} variant="outline" size="sm">
                Dequeue
              </Button>
              <Button onClick={handleClear} variant="ghost" size="sm">
                Clear
              </Button>
            </div>

            {/* Message */}
            {message && (
              <div className={`mt-3 p-2 rounded text-sm ${
                message.type === 'success' ? 'bg-green-100 text-green-800' :
                message.type === 'error' ? 'bg-red-100 text-red-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {message.text}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Operation History */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Operation History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {operations.length === 0 ? (
                <p className="text-muted-foreground text-sm">No operations yet</p>
              ) : (
                operations.map((op, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded text-sm font-mono ${
                      op.success ? 'bg-gray-100' : 'bg-red-50'
                    }`}
                  >
                    <span className={`font-bold ${
                      op.type === 'enqueue' ? 'text-green-600' :
                      op.type === 'dequeue' ? 'text-red-600' :
                      'text-blue-600'
                    }`}>
                      {op.type}
                    </span>
                    {op.value !== undefined && <span>({op.value})</span>}
                    {op.result !== undefined && op.type !== 'enqueue' && (
                      <span className="text-gray-500"> → {op.result}</span>
                    )}
                    {op.error && <span className="text-red-500 block text-xs">{op.error}</span>}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
