'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  ArrayListState,
  ListAnimationStep,
  ListOperationResult,
} from '@/lib/algorithms/lists/types';
import {
  createArrayList,
  arrayListAdd,
  arrayListAddFirst,
  arrayListAddLast,
  arrayListGet,
  arrayListSet,
  arrayListRemove,
  arrayListRemoveFirst,
  arrayListRemoveLast,
  arrayListCode,
  arrayListPseudocode,
} from '@/lib/algorithms/lists/arraylist';

interface ArrayListVisualizerProps {
  initialValues?: number[];
  showCode?: boolean;
}

type Operation = 'add' | 'addFirst' | 'addLast' | 'get' | 'set' | 'remove' | 'removeFirst' | 'removeLast';

export function ArrayListVisualizer({
  initialValues = [10, 20, 30, 40],
  showCode = true,
}: ArrayListVisualizerProps) {
  const [state, setState] = useState<ArrayListState>(() => createArrayList(initialValues));
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
  const displayState = (currentStep?.state as ArrayListState) || state;

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
          result = arrayListAdd(state, index, value);
          break;
        case 'addFirst':
          if (isNaN(value)) {
            setError('Please enter a valid value');
            return;
          }
          result = arrayListAddFirst(state, value);
          break;
        case 'addLast':
          if (isNaN(value)) {
            setError('Please enter a valid value');
            return;
          }
          result = arrayListAddLast(state, value);
          break;
        case 'get':
          if (isNaN(index)) {
            setError('Please enter a valid index');
            return;
          }
          result = arrayListGet(state, index);
          break;
        case 'set':
          if (isNaN(index) || isNaN(value)) {
            setError('Please enter valid index and value');
            return;
          }
          result = arrayListSet(state, index, value);
          break;
        case 'remove':
          if (isNaN(index)) {
            setError('Please enter a valid index');
            return;
          }
          result = arrayListRemove(state, index);
          break;
        case 'removeFirst':
          result = arrayListRemoveFirst(state);
          break;
        case 'removeLast':
          result = arrayListRemoveLast(state);
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
        setState(result.finalState as ArrayListState);
      }, result.steps.length * speed);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  }, [selectedOperation, indexInput, valueInput, state, speed]);

  const reset = () => {
    setState(createArrayList(initialValues));
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

  const getElementStyle = (index: number) => {
    if (!currentStep) return '';

    const { type, index: stepIndex, fromIndex, toIndex } = currentStep;

    if (type === 'highlight-index' && stepIndex === index) {
      return 'ring-2 ring-yellow-500 bg-yellow-100';
    }
    if (type === 'shift-right' && fromIndex === index) {
      return 'ring-2 ring-blue-500 bg-blue-100 animate-pulse';
    }
    if (type === 'shift-left' && fromIndex === index) {
      return 'ring-2 ring-orange-500 bg-orange-100 animate-pulse';
    }
    if (type === 'insert-value' && stepIndex === index) {
      return 'ring-2 ring-green-500 bg-green-100';
    }
    if (type === 'remove-value' && stepIndex === index) {
      return 'ring-2 ring-red-500 bg-red-100';
    }

    return '';
  };

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
      <div className="p-6 border rounded-lg bg-slate-50 min-h-[200px]">
        {viewMode === 'diagram' ? (
          <div className="space-y-4">
            {/* Size and Capacity */}
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>Size: {displayState.size}</span>
              <span>Capacity: {displayState.capacity}</span>
            </div>

            {/* Array Visualization */}
            <div className="flex flex-wrap items-end gap-1">
              {displayState.data.map((value, index) => (
                <div key={index} className="flex flex-col items-center">
                  <span className="text-xs text-muted-foreground mb-1">{index}</span>
                  <div
                    className={`w-14 h-14 flex items-center justify-center border-2 rounded font-mono text-lg transition-all duration-300 ${
                      value !== null
                        ? `bg-blue-100 border-blue-300 ${getElementStyle(index)}`
                        : 'bg-gray-50 border-dashed border-gray-300'
                    }`}
                  >
                    {value ?? ''}
                  </div>
                  {index === displayState.size - 1 && value !== null && (
                    <span className="text-xs text-green-600 mt-1">last</span>
                  )}
                </div>
              ))}
            </div>

            {/* Capacity indicator */}
            <div className="text-xs text-muted-foreground">
              <span className="inline-block w-4 h-4 bg-blue-100 border border-blue-300 mr-1" /> Used
              <span className="inline-block w-4 h-4 bg-gray-50 border border-dashed border-gray-300 ml-3 mr-1" /> Available capacity
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Memory Layout View */}
            <div className="text-sm text-muted-foreground mb-2">
              Memory addresses (simplified)
            </div>
            <div className="flex items-start gap-4">
              <div className="text-xs text-muted-foreground">
                <div className="h-8">data →</div>
              </div>
              <div className="flex flex-col">
                <div className="flex">
                  {displayState.data.map((value, index) => (
                    <div
                      key={index}
                      className={`w-16 h-12 flex flex-col items-center justify-center border font-mono text-sm ${
                        value !== null
                          ? `bg-blue-100 border-blue-300 ${getElementStyle(index)}`
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <span className="text-xs text-muted-foreground">0x{(100 + index * 4).toString(16)}</span>
                      <span>{value ?? '-'}</span>
                    </div>
                  ))}
                </div>
                <div className="flex text-xs text-muted-foreground">
                  {displayState.data.map((_, index) => (
                    <div key={index} className="w-16 text-center">
                      [{index}]
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              ArrayList stores elements in contiguous memory. Access by index is O(1) because
              address = baseAddress + (index × elementSize)
            </p>
          </div>
        )}
      </div>

      {/* Step Description */}
      {currentStep && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
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
            <pre className="text-sm bg-slate-900 text-slate-100 p-4 rounded overflow-x-auto">
              <code>{arrayListCode[selectedOperation as keyof typeof arrayListCode]}</code>
            </pre>
          </div>

          {/* Pseudocode */}
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Pseudocode</h3>
            <div className="bg-slate-50 p-4 rounded">
              {arrayListPseudocode[selectedOperation as keyof typeof arrayListPseudocode]?.map(
                (line, i) => (
                  <div
                    key={i}
                    className={`text-sm py-1 ${
                      currentStep?.codeLineStart === i + 1
                        ? 'bg-yellow-200 font-medium'
                        : ''
                    }`}
                  >
                    {line}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
