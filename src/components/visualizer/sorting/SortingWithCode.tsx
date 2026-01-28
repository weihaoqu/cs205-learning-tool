'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { CodeEditor } from '@/components/editor/CodeEditor';
import {
  generateSortingSteps,
  sortingCode,
  ALGORITHM_INFO,
  type SortingAlgorithm,
  type SortingStep,
} from '@/lib/algorithms/sorting';
import { AlgorithmSelector } from './AlgorithmSelector';

interface SortingWithCodeProps {
  initialArray?: number[];
  initialAlgorithm?: SortingAlgorithm;
}

const stateColors: Record<string, string> = {
  default: '#3b82f6',
  comparing: '#eab308',
  swapping: '#f97316',
  sorted: '#22c55e',
  pivot: '#ef4444',
};

export function SortingWithCode({
  initialArray = [64, 34, 25, 12, 22, 11, 90],
  initialAlgorithm = 'bubble',
}: SortingWithCodeProps) {
  const [array, setArray] = useState<number[]>(initialArray);
  const [algorithm, setAlgorithm] = useState<SortingAlgorithm>(initialAlgorithm);
  const [steps, setSteps] = useState<SortingStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [sortedIndices, setSortedIndices] = useState<Set<number>>(new Set());

  // Generate steps when array or algorithm changes
  useEffect(() => {
    const newSteps = generateSortingSteps(algorithm, array);
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
    setSortedIndices(new Set());
  }, [array, algorithm]);

  // Track sorted indices
  useEffect(() => {
    if (steps.length === 0) return;

    const newSorted = new Set<number>();
    for (let i = 0; i <= currentStep && i < steps.length; i++) {
      const step = steps[i];
      if (step.type === 'sorted' || step.type === 'complete') {
        step.indices.forEach((idx) => newSorted.add(idx));
      }
    }
    setSortedIndices(newSorted);
  }, [currentStep, steps]);

  // Auto-advance when playing
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

  const currentStepData = steps[currentStep];
  const displayArray = currentStepData?.array ?? array;
  const highlightedLine = currentStepData?.codeLine ?? null;

  const getElementState = useCallback(
    (index: number) => {
      if (!currentStepData) return 'default';

      const { type, indices } = currentStepData;

      if (sortedIndices.has(index) && type !== 'compare' && type !== 'swap') {
        return 'sorted';
      }

      if (indices.includes(index)) {
        switch (type) {
          case 'compare': return 'comparing';
          case 'swap': return 'swapping';
          case 'pivot': return 'pivot';
          case 'sorted': return 'sorted';
          default: return 'default';
        }
      }

      if (sortedIndices.has(index)) return 'sorted';
      return 'default';
    },
    [currentStepData, sortedIndices]
  );

  const handleRandomize = useCallback(() => {
    setArray(Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)));
  }, []);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
    setSortedIndices(new Set());
  }, []);

  const maxValue = Math.max(...displayArray, 1);
  const barWidth = Math.max(30, Math.min(50, 400 / displayArray.length));
  const maxHeight = 150;
  const progress = steps.length > 0 ? ((currentStep + 1) / steps.length) * 100 : 0;

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Left: Visualizer */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="text-lg">{ALGORITHM_INFO[algorithm].name}</CardTitle>
            <div className="flex gap-2">
              <AlgorithmSelector
                value={algorithm}
                onChange={setAlgorithm}
                disabled={isPlaying}
              />
              <Button size="sm" variant="outline" onClick={handleRandomize} disabled={isPlaying}>
                Randomize
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Bar chart */}
          <div className="flex items-end justify-center gap-1 h-48 mb-4 bg-muted/30 rounded-lg p-4">
            {displayArray.map((value, index) => {
              const state = getElementState(index);
              const height = (value / maxValue) * maxHeight;

              return (
                <motion.div
                  key={index}
                  className="rounded-t-md flex flex-col items-center justify-end"
                  style={{ width: barWidth, minHeight: 20 }}
                  animate={{
                    height,
                    backgroundColor: stateColors[state] || stateColors.default,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-xs font-bold text-white mb-1">{value}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Message */}
          <div className="text-center text-sm text-muted-foreground mb-4 h-6">
            {currentStepData?.message ?? 'Ready to start'}
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-primary transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={handleReset} disabled={currentStep === 0}>
                ⏮
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
                disabled={currentStep === 0}
              >
                ⏪
              </Button>
              <Button
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                disabled={steps.length === 0}
                className="w-12"
              >
                {isPlaying ? '⏸' : '▶'}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))}
                disabled={currentStep >= steps.length - 1}
              >
                ⏩
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              Step {steps.length > 0 ? currentStep + 1 : 0} / {steps.length}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Speed:</span>
              <Slider
                value={[2000 - speed]}
                onValueChange={([v]) => setSpeed(2000 - v)}
                min={0}
                max={1900}
                step={50}
                className="w-20"
              />
            </div>
          </div>

          {/* Stats */}
          {currentStepData && (
            <div className="flex justify-center gap-6 mt-4 text-sm">
              <span className="text-muted-foreground">
                Comparisons: <span className="font-bold text-yellow-600">{currentStepData.stats.comparisons}</span>
              </span>
              <span className="text-muted-foreground">
                Swaps: <span className="font-bold text-orange-600">{currentStepData.stats.swaps}</span>
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Right: Code with line highlighting */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Java Code</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <CodeEditor
            value={sortingCode[algorithm]}
            language="java"
            height="400px"
            readOnly
            highlightedLine={highlightedLine}
          />
        </CardContent>
      </Card>
    </div>
  );
}
