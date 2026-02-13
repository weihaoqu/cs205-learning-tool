'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { TreeRenderer } from '@/components/visualizer/trees';
import { buildFromArray } from '@/lib/algorithms/trees';
import { generateHeapSortSteps, type HeapStep } from '@/lib/algorithms/heaps';

export function HeapSortVisualizer() {
  const [array, setArray] = useState<number[]>([4, 10, 3, 5, 1, 8, 7, 2, 9, 6]);
  const [arrayInput, setArrayInput] = useState('4, 10, 3, 5, 1, 8, 7, 2, 9, 6');
  const [steps, setSteps] = useState<HeapStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(400);

  useEffect(() => {
    const newSteps = generateHeapSortSteps(array);
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [array]);

  useEffect(() => {
    if (!isPlaying) return;
    if (currentStep >= steps.length - 1) { setIsPlaying(false); return; }
    const timer = setTimeout(() => {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, speed]);

  const handleArrayChange = useCallback(() => {
    const parsed = arrayInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    if (parsed.length > 1) setArray(parsed);
  }, [arrayInput]);

  const handleRandomize = useCallback(() => {
    const newArr = Array.from({ length: 8 + Math.floor(Math.random() * 5) }, () => Math.floor(Math.random() * 50) + 1);
    setArray(newArr);
    setArrayInput(newArr.join(', '));
  }, []);

  const handleReset = useCallback(() => { setCurrentStep(0); setIsPlaying(false); }, []);

  const step = steps[currentStep];
  const displayArray = step?.array ?? array;
  const sortedBoundary = step?.sortedBoundary ?? displayArray.length;

  // Build tree only from the unsorted portion
  const unsortedPortion = displayArray.slice(0, sortedBoundary);
  const treeRoot = buildFromArray(unsortedPortion);
  const highlightSet = new Set(step?.highlightIndices.map(i => displayArray[i]).filter((v): v is number => v !== undefined) ?? []);

  const isAtStart = currentStep === 0;
  const isAtEnd = currentStep >= steps.length - 1;
  const progress = steps.length > 0 ? ((currentStep + 1) / steps.length) * 100 : 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <CardTitle className="text-lg">Heap Sort Visualizer</CardTitle>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handleRandomize} disabled={isPlaying}>Randomize</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Input */}
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <label className="text-sm font-medium mb-1 block">Array:</label>
            <Input value={arrayInput} onChange={(e) => setArrayInput(e.target.value)} onBlur={handleArrayChange} onKeyDown={(e) => e.key === 'Enter' && handleArrayChange()} disabled={isPlaying} />
          </div>
        </div>

        {/* Tree View */}
        {unsortedPortion.length > 0 && (
          <div className="border rounded-lg bg-white dark:bg-gray-950 p-2">
            <TreeRenderer root={treeRoot} highlightValues={highlightSet} />
          </div>
        )}

        {/* Array View */}
        <div className="flex gap-1 flex-wrap justify-center">
          {displayArray.map((val, i) => {
            const isSorted = i >= sortedBoundary;
            const isHighlighted = step?.highlightIndices.includes(i);
            let bgColor = 'bg-blue-500';
            if (isSorted) bgColor = 'bg-green-500';
            else if (isHighlighted) bgColor = 'bg-yellow-400 text-yellow-900';

            return (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <div className={`w-10 h-10 flex items-center justify-center rounded-md text-sm font-bold text-white transition-all ${bgColor}`}>
                  {val}
                </div>
                <span className="text-[10px] text-muted-foreground">{i}</span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex gap-4 text-sm text-muted-foreground justify-center">
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-blue-500" /> Heap</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-yellow-400" /> Active</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-green-500" /> Sorted</div>
        </div>

        {/* Message */}
        <div className="text-center text-sm text-muted-foreground h-6">{step?.message ?? 'Ready to sort'}</div>

        {/* Progress */}
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all duration-200" style={{ width: `${progress}%` }} />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={handleReset} disabled={isAtStart}>{'\u23EE'}</Button>
            <Button size="sm" variant="outline" onClick={() => setCurrentStep(p => Math.max(p - 1, 0))} disabled={isAtStart}>{'\u23EA'}</Button>
            <Button size="sm" onClick={() => isPlaying ? setIsPlaying(false) : setIsPlaying(true)} disabled={steps.length === 0} className="w-12">
              {isPlaying ? '\u23F8' : '\u25B6'}
            </Button>
            <Button size="sm" variant="outline" onClick={() => setCurrentStep(p => Math.min(p + 1, steps.length - 1))} disabled={isAtEnd}>{'\u23E9'}</Button>
          </div>
          <div className="text-sm text-muted-foreground">Step {steps.length > 0 ? currentStep + 1 : 0} of {steps.length}</div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Speed:</span>
            <Slider value={[2000 - speed]} onValueChange={([v]) => setSpeed(2000 - v)} min={0} max={1900} step={50} className="w-24" />
            <span className="text-xs text-muted-foreground w-14">{speed}ms</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
