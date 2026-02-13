'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import {
  generateLinearSearchSteps,
  generateBinarySearchSteps,
  type SearchStep,
} from '@/lib/algorithms/searching';

interface SearchVisualizerProps {
  mode: 'linear' | 'binary';
}

export function SearchVisualizer({ mode }: SearchVisualizerProps) {
  const defaultArray = mode === 'binary'
    ? [2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91]
    : [38, 12, 72, 5, 23, 91, 16, 45, 8, 56, 2];
  const [array, setArray] = useState<number[]>(defaultArray);
  const [target, setTarget] = useState(23);
  const [arrayInput, setArrayInput] = useState(defaultArray.join(', '));
  const [steps, setSteps] = useState<SearchStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);

  useEffect(() => {
    const newSteps = mode === 'linear'
      ? generateLinearSearchSteps(array, target)
      : generateBinarySearchSteps(array, target);
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [array, target, mode]);

  useEffect(() => {
    if (!isPlaying) return;
    if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }
    const timer = setTimeout(() => {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, speed]);

  const handleArrayChange = useCallback(() => {
    const parsed = arrayInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    if (parsed.length > 0) {
      const sorted = mode === 'binary' ? [...parsed].sort((a, b) => a - b) : parsed;
      setArray(sorted);
      if (mode === 'binary') setArrayInput(sorted.join(', '));
    }
  }, [arrayInput, mode]);

  const handleRandomize = useCallback(() => {
    const size = 10 + Math.floor(Math.random() * 6);
    let newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 99) + 1);
    if (mode === 'binary') newArray.sort((a, b) => a - b);
    // Remove duplicates for cleaner display
    newArray = [...new Set(newArray)];
    setArray(newArray);
    setArrayInput(newArray.join(', '));
  }, [mode]);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  const step = steps[currentStep];

  const getCellColor = (index: number) => {
    if (!step) return 'bg-blue-500';
    if (step.type === 'found' && index === step.currentIndex) return 'bg-green-500 ring-4 ring-green-300';
    if (step.type === 'not-found') return 'bg-red-300';
    if (index === step.currentIndex) return 'bg-yellow-400';
    if (mode === 'binary' && step.low !== undefined && step.high !== undefined) {
      if (index < step.low || index > step.high) return 'bg-gray-300 dark:bg-gray-700 opacity-40';
    }
    return 'bg-blue-500';
  };

  const isAtStart = currentStep === 0;
  const isAtEnd = currentStep >= steps.length - 1;
  const progress = steps.length > 0 ? ((currentStep + 1) / steps.length) * 100 : 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          {mode === 'linear' ? 'Linear' : 'Binary'} Search Visualizer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Input controls */}
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="text-sm font-medium mb-1 block">Array{mode === 'binary' ? ' (will be sorted)' : ''}:</label>
            <Input
              value={arrayInput}
              onChange={(e) => setArrayInput(e.target.value)}
              onBlur={handleArrayChange}
              onKeyDown={(e) => e.key === 'Enter' && handleArrayChange()}
              disabled={isPlaying}
              placeholder="e.g. 5, 12, 23, 38"
            />
          </div>
          <div className="w-24">
            <label className="text-sm font-medium mb-1 block">Target:</label>
            <Input
              type="number"
              value={target}
              onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
              disabled={isPlaying}
            />
          </div>
          <Button size="sm" variant="outline" onClick={handleRandomize} disabled={isPlaying}>
            Randomize
          </Button>
        </div>

        {/* Array visualization */}
        <div className="flex flex-wrap items-end justify-center gap-1 min-h-[80px] bg-muted/30 rounded-lg p-4">
          {array.map((value, index) => (
            <div key={index} className="flex flex-col items-center gap-1">
              {/* Pointer labels */}
              <div className="text-xs h-5 font-mono text-center">
                {step && mode === 'binary' && index === step.low && 'L'}
                {step && mode === 'binary' && index === step.mid && 'M'}
                {step && mode === 'binary' && index === step.high && 'H'}
                {step && mode === 'linear' && index === step.currentIndex && '\u25BC'}
              </div>
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-md text-white font-bold text-sm transition-all duration-200 ${getCellColor(index)}`}
              >
                {value}
              </div>
              <div className="text-xs text-muted-foreground">{index}</div>
            </div>
          ))}
        </div>

        {/* Step message */}
        <div className="text-center text-sm text-muted-foreground h-6">
          {step?.message ?? 'Ready to search'}
        </div>

        {/* Comparisons counter */}
        <div className="text-center">
          <span className="inline-block px-3 py-1 bg-muted rounded-full text-sm">
            Comparisons: <strong>{step?.comparisons ?? 0}</strong>
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={handleReset} disabled={isAtStart}>
              \u23EE
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentStep((p) => Math.max(p - 1, 0))}
              disabled={isAtStart}
            >
              \u23EA
            </Button>
            <Button
              size="sm"
              onClick={() => (isPlaying ? setIsPlaying(false) : setIsPlaying(true))}
              disabled={steps.length === 0}
              className="w-12"
            >
              {isPlaying ? '\u23F8' : '\u25B6'}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentStep((p) => Math.min(p + 1, steps.length - 1))}
              disabled={isAtEnd}
            >
              \u23E9
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            Step {steps.length > 0 ? currentStep + 1 : 0} of {steps.length}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Speed:</span>
            <Slider
              value={[2000 - speed]}
              onValueChange={([v]) => setSpeed(2000 - v)}
              min={0}
              max={1900}
              step={50}
              className="w-24"
            />
            <span className="text-xs text-muted-foreground w-14">{speed}ms</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground justify-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-500" />
            <span>Unchecked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-400" />
            <span>Checking</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500" />
            <span>Found</span>
          </div>
          {mode === 'binary' && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-300" />
              <span>Eliminated</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
