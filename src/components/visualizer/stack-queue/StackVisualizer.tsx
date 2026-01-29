'use client';

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createStack, push, pop, peek, isEmpty, size } from '@/lib/algorithms/stack-queue/stack';
import type { StackState, Operation } from '@/lib/algorithms/stack-queue/types';

export function StackVisualizer() {
  const [stack, setStack] = useState<StackState>(createStack(8));
  const [inputValue, setInputValue] = useState('');
  const [operations, setOperations] = useState<Operation[]>([]);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [highlightTop, setHighlightTop] = useState(false);
  const [animatingItem, setAnimatingItem] = useState<string | null>(null);
  const [draggedValue, setDraggedValue] = useState<number | null>(null);

  const addOperation = useCallback((op: Operation) => {
    setOperations(prev => [op, ...prev].slice(0, 10));
  }, []);

  const handlePush = useCallback((value: string | number) => {
    const val = typeof value === 'string' ? (isNaN(Number(value)) ? value : Number(value)) : value;
    const { stack: newStack, result } = push(stack, val);

    if (result.success) {
      const newItem = newStack.items[newStack.items.length - 1];
      setAnimatingItem(newItem.id);
      setTimeout(() => setAnimatingItem(null), 300);
      setStack(newStack);
      setMessage({ text: `Pushed ${val}`, type: 'success' });
      addOperation({ type: 'push', value: val, result: val, timestamp: Date.now(), success: true });
    } else {
      setMessage({ text: result.error || 'Push failed', type: 'error' });
      addOperation({ type: 'push', value: val, timestamp: Date.now(), success: false, error: result.error });
    }
    setInputValue('');
  }, [stack, addOperation]);

  const handlePop = useCallback(() => {
    if (stack.items.length > 0) {
      const topItem = stack.items[stack.items.length - 1];
      setAnimatingItem(topItem.id);

      setTimeout(() => {
        const { stack: newStack, result } = pop(stack);
        if (result.success) {
          setStack(newStack);
          setMessage({ text: `Popped ${result.value}`, type: 'success' });
          addOperation({ type: 'pop', result: result.value, timestamp: Date.now(), success: true });
        }
        setAnimatingItem(null);
      }, 300);
    } else {
      setMessage({ text: 'Stack Underflow: Stack is empty', type: 'error' });
      addOperation({ type: 'pop', timestamp: Date.now(), success: false, error: 'Stack is empty' });
    }
  }, [stack, addOperation]);

  const handlePeek = useCallback(() => {
    const result = peek(stack);
    if (result.success) {
      setHighlightTop(true);
      setTimeout(() => setHighlightTop(false), 1000);
      setMessage({ text: `Top element: ${result.value}`, type: 'info' });
      addOperation({ type: 'peek', result: result.value, timestamp: Date.now(), success: true });
    } else {
      setMessage({ text: result.error || 'Stack is empty', type: 'error' });
      addOperation({ type: 'peek', timestamp: Date.now(), success: false, error: result.error });
    }
  }, [stack, addOperation]);

  const handleClear = useCallback(() => {
    setStack(createStack(8));
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
      handlePush(draggedValue);
    }
    setDraggedValue(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      handlePush(inputValue.trim());
    }
  };

  const maxHeight = 8;

  return (
    <div className="space-y-6">
      {/* Draggable Elements */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Drag elements to push onto stack</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <div
                key={num}
                draggable
                onDragStart={(e) => handleDragStart(e, num)}
                className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold text-lg cursor-grab active:cursor-grabbing hover:bg-blue-600 transition-colors select-none"
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
              onClick={() => inputValue.trim() && handlePush(inputValue.trim())}
              disabled={!inputValue.trim()}
              variant="outline"
            >
              Push
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Stack Visualization */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              <span>Stack (LIFO)</span>
              <span className="text-sm font-normal text-muted-foreground">
                Size: {size(stack)} / {maxHeight}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Stack Container */}
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={`relative min-h-[320px] border-2 border-dashed rounded-lg p-4 transition-colors ${
                draggedValue !== null ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              {/* Top indicator */}
              {stack.items.length > 0 && (
                <div className="absolute -left-8 text-xs text-muted-foreground"
                     style={{ bottom: `${(stack.items.length - 1) * 44 + 16}px` }}>
                  top →
                </div>
              )}

              {/* Stack items - bottom to top */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-col-reverse gap-1">
                {stack.items.map((item, index) => {
                  const isTop = index === stack.items.length - 1;
                  const isAnimating = animatingItem === item.id;

                  return (
                    <div
                      key={item.id}
                      onClick={isTop ? handlePop : undefined}
                      className={`
                        h-10 rounded-lg flex items-center justify-between px-4 font-mono
                        transition-all duration-300
                        ${isTop
                          ? 'bg-blue-500 text-white cursor-pointer hover:bg-blue-600'
                          : 'bg-gray-200 text-gray-700'
                        }
                        ${isTop && highlightTop ? 'ring-4 ring-yellow-400' : ''}
                        ${isAnimating ? 'transform -translate-y-2 opacity-70' : ''}
                      `}
                    >
                      <span className="text-xs opacity-70">[{index}]</span>
                      <span className="font-bold">{item.value}</span>
                      {isTop && <span className="text-xs opacity-70">← click to pop</span>}
                    </div>
                  );
                })}
              </div>

              {/* Empty state */}
              {isEmpty(stack) && (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <p>Stack is empty</p>
                    <p className="text-sm">Drag an element here to push</p>
                  </div>
                </div>
              )}
            </div>

            {/* Control buttons */}
            <div className="flex gap-2 mt-4">
              <Button onClick={handlePeek} variant="outline" size="sm">
                Peek
              </Button>
              <Button onClick={handlePop} variant="outline" size="sm">
                Pop
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
            <div className="space-y-2 max-h-[360px] overflow-y-auto">
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
                      op.type === 'push' ? 'text-green-600' :
                      op.type === 'pop' ? 'text-red-600' :
                      'text-blue-600'
                    }`}>
                      {op.type}
                    </span>
                    {op.value !== undefined && <span>({op.value})</span>}
                    {op.result !== undefined && op.type !== 'push' && (
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
