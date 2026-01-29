'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  LinkedListState,
  ListAnimationStep,
  ListOperationResult,
} from '@/lib/algorithms/lists/types';
import {
  createLinkedList,
  linkedListAdd,
  linkedListAddFirst,
  linkedListAddLast,
  linkedListGet,
  linkedListSet,
  linkedListRemove,
  linkedListRemoveFirst,
  linkedListRemoveLast,
  singlyLinkedListCode,
  doublyLinkedListCode,
  linkedListPseudocode,
} from '@/lib/algorithms/lists/linkedlist';

interface LinkedListVisualizerProps {
  type: 'singly-linked' | 'doubly-linked';
  initialValues?: number[];
  showCode?: boolean;
}

type Operation = 'add' | 'addFirst' | 'addLast' | 'get' | 'set' | 'remove' | 'removeFirst' | 'removeLast';

export function LinkedListVisualizer({
  type,
  initialValues = [10, 20, 30, 40],
  showCode = true,
}: LinkedListVisualizerProps) {
  const [state, setState] = useState<LinkedListState>(() => createLinkedList(type, initialValues));
  const [steps, setSteps] = useState<ListAnimationStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [selectedOperation, setSelectedOperation] = useState<Operation>('add');
  const [indexInput, setIndexInput] = useState('');
  const [valueInput, setValueInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [returnValue, setReturnValue] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'diagram' | 'memory'>('diagram');

  const currentStep = currentStepIndex >= 0 ? steps[currentStepIndex] : null;
  const displayState = (currentStep?.state as LinkedListState) || state;

  const isDoubly = type === 'doubly-linked';
  const codeTemplates = isDoubly ? doublyLinkedListCode : singlyLinkedListCode;
  const pseudocode = isDoubly ? linkedListPseudocode.doubly : linkedListPseudocode.singly;

  // Auto-play animation
  useEffect(() => {
    if (!isPlaying || currentStepIndex >= steps.length - 1) {
      if (currentStepIndex >= steps.length - 1) {
        setIsPlaying(false);
      }
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStepIndex((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIndex, steps.length, speed]);

  const executeOperation = useCallback(() => {
    setError(null);
    setReturnValue(null);

    let result: ListOperationResult;
    const index = parseInt(indexInput);
    const value = parseInt(valueInput);

    try {
      switch (selectedOperation) {
        case 'add':
          if (isNaN(index) || isNaN(value)) {
            setError('Please enter valid index and value');
            return;
          }
          result = linkedListAdd(state, index, value);
          break;
        case 'addFirst':
          if (isNaN(value)) {
            setError('Please enter a valid value');
            return;
          }
          result = linkedListAddFirst(state, value);
          break;
        case 'addLast':
          if (isNaN(value)) {
            setError('Please enter a valid value');
            return;
          }
          result = linkedListAddLast(state, value);
          break;
        case 'get':
          if (isNaN(index)) {
            setError('Please enter a valid index');
            return;
          }
          result = linkedListGet(state, index);
          break;
        case 'set':
          if (isNaN(index) || isNaN(value)) {
            setError('Please enter valid index and value');
            return;
          }
          result = linkedListSet(state, index, value);
          break;
        case 'remove':
          if (isNaN(index)) {
            setError('Please enter a valid index');
            return;
          }
          result = linkedListRemove(state, index);
          break;
        case 'removeFirst':
          result = linkedListRemoveFirst(state);
          break;
        case 'removeLast':
          result = linkedListRemoveLast(state);
          break;
        default:
          return;
      }

      setSteps(result.steps);
      setCurrentStepIndex(0);
      setIsPlaying(true);

      if (result.error) {
        setError(result.error);
      }
      if (result.returnValue !== undefined) {
        setReturnValue(result.returnValue);
      }

      // Update state after animation completes
      setTimeout(() => {
        setState(result.finalState as LinkedListState);
      }, result.steps.length * speed);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  }, [selectedOperation, indexInput, valueInput, state, speed]);

  const reset = () => {
    setState(createLinkedList(type, initialValues));
    setSteps([]);
    setCurrentStepIndex(-1);
    setIsPlaying(false);
    setError(null);
    setReturnValue(null);
  };

  const stepForward = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const stepBackward = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const getNodeStyle = (nodeId: string) => {
    if (!currentStep) return '';

    const { type: stepType, nodeId: stepNodeId, targetNodeId } = currentStep;

    if (stepNodeId === nodeId) {
      switch (stepType) {
        case 'highlight-node':
          return 'ring-2 ring-yellow-500';
        case 'traverse':
          return 'ring-2 ring-blue-500 animate-pulse';
        case 'create-node':
          return 'ring-2 ring-green-500 bg-green-100';
        case 'delete-node':
          return 'ring-2 ring-red-500 bg-red-100 opacity-50';
        default:
          return '';
      }
    }

    if (targetNodeId === nodeId && stepType === 'update-pointer') {
      return 'ring-2 ring-purple-500';
    }

    return '';
  };

  // Get nodes in order for rendering
  const getOrderedNodes = () => {
    const nodes: Array<{ id: string; value: number; next: string | null; prev: string | null }> = [];
    let current = displayState.head;
    while (current !== null) {
      const node = displayState.nodes.get(current);
      if (node) {
        nodes.push(node);
        current = node.next;
      } else {
        break;
      }
    }
    return nodes;
  };

  const orderedNodes = getOrderedNodes();

  const operationNeedsIndex = ['add', 'get', 'set', 'remove'].includes(selectedOperation);
  const operationNeedsValue = ['add', 'addFirst', 'addLast', 'set'].includes(selectedOperation);

  return (
    <div className="space-y-6">
      {/* View Mode Toggle */}
      <div className="flex gap-2">
        <Button
          variant={viewMode === 'diagram' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('diagram')}
        >
          Node Diagram
        </Button>
        <Button
          variant={viewMode === 'memory' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('memory')}
        >
          Memory Layout
        </Button>
      </div>

      {/* Visualization Area */}
      <div className="p-6 border rounded-lg bg-slate-50 min-h-[200px] overflow-x-auto">
        {viewMode === 'diagram' ? (
          <div className="space-y-4">
            {/* Size info */}
            <div className="text-sm text-muted-foreground">
              Size: {displayState.size}
            </div>

            {/* Node Visualization */}
            {orderedNodes.length === 0 ? (
              <div className="text-muted-foreground italic">List is empty</div>
            ) : (
              <div className="flex items-center gap-2 flex-wrap">
                {/* Head pointer */}
                <div className="flex flex-col items-center">
                  <span className="text-xs text-blue-600 font-medium">head</span>
                  <span className="text-blue-600">↓</span>
                </div>

                {orderedNodes.map((node, index) => (
                  <div key={node.id} className="flex items-center gap-2">
                    {/* Node */}
                    <div
                      className={`flex border-2 rounded transition-all duration-300 ${
                        isDoubly ? 'border-purple-300' : 'border-green-300'
                      } ${getNodeStyle(node.id)}`}
                    >
                      {/* Prev pointer (doubly only) */}
                      {isDoubly && (
                        <div className="w-8 h-16 flex items-center justify-center bg-purple-50 border-r border-purple-300 text-xs">
                          prev
                        </div>
                      )}

                      {/* Data */}
                      <div
                        className={`w-14 h-16 flex flex-col items-center justify-center ${
                          isDoubly ? 'bg-purple-100' : 'bg-green-100'
                        }`}
                      >
                        <span className="text-xs text-muted-foreground">[{index}]</span>
                        <span className="font-mono text-lg">{node.value}</span>
                      </div>

                      {/* Next pointer */}
                      <div
                        className={`w-8 h-16 flex items-center justify-center text-xs ${
                          isDoubly
                            ? 'bg-purple-50 border-l border-purple-300'
                            : 'bg-green-50 border-l border-green-300'
                        }`}
                      >
                        next
                      </div>
                    </div>

                    {/* Arrow to next */}
                    {index < orderedNodes.length - 1 ? (
                      <div className="flex items-center">
                        {isDoubly ? (
                          <span className="text-xl">⇄</span>
                        ) : (
                          <span className="text-xl">→</span>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">→ null</span>
                    )}
                  </div>
                ))}

                {/* Tail pointer */}
                {orderedNodes.length > 0 && (
                  <div className="flex flex-col items-center ml-2">
                    <span className="text-xs text-blue-600 font-medium">← tail</span>
                  </div>
                )}
              </div>
            )}

            {/* Legend */}
            <div className="text-xs text-muted-foreground mt-4">
              <span
                className={`inline-block w-4 h-4 ${
                  isDoubly ? 'bg-purple-100 border border-purple-300' : 'bg-green-100 border border-green-300'
                } mr-1`}
              />{' '}
              Node data
              <span
                className={`inline-block w-4 h-4 ${
                  isDoubly ? 'bg-purple-50 border border-purple-300' : 'bg-green-50 border border-green-300'
                } ml-3 mr-1`}
              />{' '}
              Pointer
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Memory Layout View */}
            <div className="text-sm text-muted-foreground mb-2">
              Memory addresses (simplified) - Nodes scattered in memory
            </div>

            {orderedNodes.length === 0 ? (
              <div className="text-muted-foreground italic">List is empty</div>
            ) : (
              <div className="space-y-2">
                {orderedNodes.map((node, index) => {
                  const address = 0x100 + index * 0x30 + (index % 3) * 0x10;
                  return (
                    <div key={node.id} className="flex items-center gap-4">
                      <span className="font-mono text-xs text-muted-foreground w-16">
                        0x{address.toString(16)}
                      </span>
                      <div
                        className={`flex border rounded ${
                          isDoubly ? 'border-purple-300' : 'border-green-300'
                        } ${getNodeStyle(node.id)}`}
                      >
                        {isDoubly && (
                          <div className="w-20 h-10 flex flex-col items-center justify-center bg-purple-50 border-r border-purple-300 text-xs">
                            <span className="text-muted-foreground">prev</span>
                            <span className="font-mono">
                              {node.prev ? `0x${(0x100 + orderedNodes.findIndex(n => n.id === node.prev) * 0x30).toString(16)}` : 'null'}
                            </span>
                          </div>
                        )}
                        <div
                          className={`w-16 h-10 flex flex-col items-center justify-center ${
                            isDoubly ? 'bg-purple-100' : 'bg-green-100'
                          }`}
                        >
                          <span className="text-xs text-muted-foreground">data</span>
                          <span className="font-mono">{node.value}</span>
                        </div>
                        <div
                          className={`w-20 h-10 flex flex-col items-center justify-center text-xs ${
                            isDoubly ? 'bg-purple-50 border-l border-purple-300' : 'bg-green-50 border-l border-green-300'
                          }`}
                        >
                          <span className="text-muted-foreground">next</span>
                          <span className="font-mono">
                            {node.next ? `0x${(0x100 + orderedNodes.findIndex(n => n.id === node.next) * 0x30 + ((orderedNodes.findIndex(n => n.id === node.next) + 1) % 3) * 0x10).toString(16)}` : 'null'}
                          </span>
                        </div>
                      </div>
                      {index === 0 && <span className="text-xs text-blue-600">← head</span>}
                      {index === orderedNodes.length - 1 && <span className="text-xs text-blue-600">← tail</span>}
                    </div>
                  );
                })}
              </div>
            )}

            <p className="text-xs text-muted-foreground mt-4">
              LinkedList nodes are scattered in memory. Each node stores data plus pointer(s) to other nodes.
              {isDoubly
                ? ' Doubly-linked has both prev and next pointers.'
                : ' Singly-linked only has next pointer.'}
            </p>
          </div>
        )}
      </div>

      {/* Step Description */}
      {currentStep && (
        <div
          className={`p-4 border rounded-lg ${
            isDoubly ? 'bg-purple-50 border-purple-200' : 'bg-green-50 border-green-200'
          }`}
        >
          <p className="font-medium">{currentStep.description}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Step {currentStepIndex + 1} of {steps.length}
          </p>
        </div>
      )}

      {/* Error/Return Value Display */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}
      {returnValue !== null && !error && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          Return value: {returnValue}
        </div>
      )}

      {/* Controls */}
      <div className="space-y-4 p-4 border rounded-lg">
        <div className="flex flex-wrap gap-4">
          {/* Operation Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Operation</label>
            <select
              value={selectedOperation}
              onChange={(e) => setSelectedOperation(e.target.value as Operation)}
              className="border rounded px-3 py-2"
            >
              <option value="add">add(index, value)</option>
              <option value="addFirst">addFirst(value)</option>
              <option value="addLast">addLast(value)</option>
              <option value="get">get(index)</option>
              <option value="set">set(index, value)</option>
              <option value="remove">remove(index)</option>
              <option value="removeFirst">removeFirst()</option>
              <option value="removeLast">removeLast()</option>
            </select>
          </div>

          {/* Index Input */}
          {operationNeedsIndex && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Index</label>
              <input
                type="number"
                value={indexInput}
                onChange={(e) => setIndexInput(e.target.value)}
                placeholder="0"
                className="border rounded px-3 py-2 w-20"
                min="0"
              />
            </div>
          )}

          {/* Value Input */}
          {operationNeedsValue && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Value</label>
              <input
                type="number"
                value={valueInput}
                onChange={(e) => setValueInput(e.target.value)}
                placeholder="0"
                className="border rounded px-3 py-2 w-20"
              />
            </div>
          )}

          {/* Execute Button */}
          <div className="flex flex-col justify-end">
            <Button onClick={executeOperation} disabled={isPlaying}>
              Execute
            </Button>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={stepBackward} disabled={currentStepIndex <= 0}>
            ← Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={steps.length === 0}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={stepForward}
            disabled={currentStepIndex >= steps.length - 1}
          >
            Next →
          </Button>
          <Button variant="outline" size="sm" onClick={reset}>
            Reset
          </Button>

          {/* Speed Control */}
          <div className="flex items-center gap-2 ml-4">
            <span className="text-sm text-muted-foreground">Speed:</span>
            <Slider
              value={[2000 - speed]}
              onValueChange={([v]) => setSpeed(2000 - v)}
              min={0}
              max={1800}
              step={100}
              className="w-24"
            />
          </div>
        </div>
      </div>

      {/* Code Display */}
      {showCode && (
        <div className="grid md:grid-cols-2 gap-4">
          {/* Java Code */}
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Java Implementation</h3>
            <pre className="text-sm bg-slate-900 text-slate-100 p-4 rounded overflow-x-auto max-h-80">
              <code>{codeTemplates[selectedOperation as keyof typeof codeTemplates]}</code>
            </pre>
          </div>

          {/* Pseudocode */}
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Pseudocode</h3>
            <div className="bg-slate-50 p-4 rounded max-h-80 overflow-y-auto">
              {pseudocode[selectedOperation as keyof typeof pseudocode]?.map((line, i) => (
                <div
                  key={i}
                  className={`text-sm py-1 ${
                    currentStep?.codeLineStart === i + 1 ? 'bg-yellow-200 font-medium' : ''
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Node Class Display */}
      {showCode && (
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Node Class Structure</h3>
          <pre className="text-sm bg-slate-900 text-slate-100 p-4 rounded overflow-x-auto">
            <code>{codeTemplates.nodeClass}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
