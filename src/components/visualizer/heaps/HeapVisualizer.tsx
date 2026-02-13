'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { TreeRenderer } from '@/components/visualizer/trees';
import { buildFromArray } from '@/lib/algorithms/trees';
import {
  generateInsertSteps,
  generateExtractSteps,
  type HeapStep,
  type HeapType,
} from '@/lib/algorithms/heaps';

export function HeapVisualizer() {
  const [heap, setHeap] = useState<number[]>([50, 30, 40, 10, 20, 35, 15]);
  const [heapType, setHeapType] = useState<HeapType>('max');
  const [inputValue, setInputValue] = useState('');
  const [steps, setSteps] = useState<HeapStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);

  useEffect(() => {
    if (!isPlaying || steps.length === 0) return;
    if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
      // Apply final state
      const finalStep = steps[steps.length - 1];
      setHeap(finalStep.array);
      setSteps([]);
      setCurrentStep(0);
      return;
    }
    const timer = setTimeout(() => {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, speed, steps]);

  const handleInsert = useCallback(() => {
    const val = parseInt(inputValue);
    if (isNaN(val)) return;
    const newSteps = generateInsertSteps(heap, val, heapType);
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(true);
    setInputValue('');
  }, [heap, inputValue, heapType]);

  const handleExtract = useCallback(() => {
    if (heap.length === 0) return;
    const newSteps = generateExtractSteps(heap, heapType);
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(true);
  }, [heap, heapType]);

  const handleReset = useCallback(() => {
    setHeap(heapType === 'max' ? [50, 30, 40, 10, 20, 35, 15] : [10, 20, 15, 30, 40, 35, 50]);
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [heapType]);

  const step = steps.length > 0 ? steps[currentStep] : null;
  const displayArray = step?.array ?? heap;
  const highlightSet = new Set(step?.highlightIndices.map(i => displayArray[i]).filter((v): v is number => v !== undefined) ?? []);
  const treeRoot = buildFromArray(displayArray);

  const isAnimating = steps.length > 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <CardTitle className="text-lg">Heap Visualizer</CardTitle>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={heapType === 'max' ? 'default' : 'outline'}
              onClick={() => { setHeapType('max'); handleReset(); }}
              disabled={isAnimating}
            >
              Max-Heap
            </Button>
            <Button
              size="sm"
              variant={heapType === 'min' ? 'default' : 'outline'}
              onClick={() => { setHeapType('min'); handleReset(); }}
              disabled={isAnimating}
            >
              Min-Heap
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Controls */}
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex gap-2 items-end">
            <div>
              <label className="text-sm font-medium mb-1 block">Insert value:</label>
              <Input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleInsert()}
                disabled={isAnimating}
                className="w-24"
                placeholder="e.g. 45"
              />
            </div>
            <Button size="sm" onClick={handleInsert} disabled={isAnimating || !inputValue}>
              Insert
            </Button>
          </div>
          <Button size="sm" variant="outline" onClick={handleExtract} disabled={isAnimating || heap.length === 0}>
            Extract {heapType === 'max' ? 'Max' : 'Min'}
          </Button>
          <Button size="sm" variant="outline" onClick={handleReset} disabled={isAnimating}>
            Reset
          </Button>
        </div>

        {/* Tree View */}
        <div className="border rounded-lg bg-white dark:bg-gray-950 p-2">
          <TreeRenderer root={treeRoot} highlightValues={highlightSet} />
        </div>

        {/* Array View */}
        <div>
          <span className="text-sm font-medium">Array representation:</span>
          <div className="flex gap-1 mt-1 flex-wrap">
            {displayArray.map((val, i) => {
              const isHighlighted = step?.highlightIndices.includes(i) || step?.compareIndices.includes(i);
              return (
                <div
                  key={i}
                  className={`w-12 h-12 flex flex-col items-center justify-center rounded-md text-sm font-bold transition-all ${
                    isHighlighted ? 'bg-yellow-400 text-yellow-900' : 'bg-blue-500 text-white'
                  }`}
                >
                  <span>{val}</span>
                  <span className="text-[10px] opacity-70">[{i}]</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Index formulas */}
        <div className="text-sm text-muted-foreground p-3 bg-muted/50 rounded-lg">
          <strong>Array index formulas:</strong> Parent = ⌊(i-1)/2⌋ | Left child = 2i+1 | Right child = 2i+2
        </div>

        {/* Step message */}
        <div className="text-center text-sm text-muted-foreground h-6">
          {step?.message ?? `${heapType === 'max' ? 'Max' : 'Min'}-heap with ${heap.length} elements. Insert or extract to see animation.`}
        </div>

        {/* Animation speed */}
        {isAnimating && (
          <div className="flex items-center gap-4 justify-center">
            <span className="text-sm text-muted-foreground">Speed:</span>
            <Slider value={[2000 - speed]} onValueChange={([v]) => setSpeed(2000 - v)} min={0} max={1900} step={50} className="w-32" />
            <span className="text-xs text-muted-foreground">{speed}ms</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
