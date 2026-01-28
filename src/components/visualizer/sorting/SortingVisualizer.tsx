'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  generateSortingSteps,
  ALGORITHM_INFO,
  type SortingAlgorithm,
  type SortingStep,
} from '@/lib/algorithms/sorting';
import { SortingControls } from './SortingControls';
import { SortingStats } from './SortingStats';
import { AlgorithmSelector } from './AlgorithmSelector';

interface SortingVisualizerProps {
  initialArray?: number[];
  initialAlgorithm?: SortingAlgorithm;
}

type ElementState = 'default' | 'comparing' | 'swapping' | 'sorted' | 'pivot' | 'merge' | 'partition';

const stateColors: Record<ElementState, string> = {
  default: '#3b82f6',
  comparing: '#eab308',
  swapping: '#f97316',
  sorted: '#22c55e',
  pivot: '#ef4444',
  merge: '#a855f7',
  partition: '#06b6d4',
};

export function SortingVisualizer({
  initialArray = [64, 34, 25, 12, 22, 11, 90],
  initialAlgorithm = 'bubble',
}: SortingVisualizerProps) {
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

  // Track sorted indices across steps
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

  const getElementState = useCallback(
    (index: number): ElementState => {
      if (!currentStepData) return 'default';

      const { type, indices } = currentStepData;

      if (sortedIndices.has(index) && type !== 'compare' && type !== 'swap') {
        return 'sorted';
      }

      if (indices.includes(index)) {
        switch (type) {
          case 'compare':
            return 'comparing';
          case 'swap':
            return 'swapping';
          case 'pivot':
            return 'pivot';
          case 'merge':
            return 'merge';
          case 'partition':
            return 'partition';
          case 'sorted':
            return 'sorted';
          default:
            return 'default';
        }
      }

      if (sortedIndices.has(index)) {
        return 'sorted';
      }

      return 'default';
    },
    [currentStepData, sortedIndices]
  );

  const handleRandomize = useCallback(() => {
    const newArray = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 100)
    );
    setArray(newArray);
  }, []);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
    setSortedIndices(new Set());
  }, []);

  const maxValue = Math.max(...displayArray, 1);
  const barWidth = Math.max(30, Math.min(60, 600 / displayArray.length));
  const maxHeight = 200;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <CardTitle className="text-lg">
              {ALGORITHM_INFO[algorithm].name}
            </CardTitle>
            <div className="flex gap-2">
              <AlgorithmSelector
                value={algorithm}
                onChange={setAlgorithm}
                disabled={isPlaying}
              />
              <Button
                size="sm"
                variant="outline"
                onClick={handleRandomize}
                disabled={isPlaying}
              >
                Randomize
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Bar chart visualization */}
          <div className="flex items-end justify-center gap-1 h-64 mb-4 bg-muted/30 rounded-lg p-4">
            <AnimatePresence mode="popLayout">
              {displayArray.map((value, index) => {
                const state = getElementState(index);
                const height = (value / maxValue) * maxHeight;

                return (
                  <motion.div
                    key={index}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      height,
                      backgroundColor: stateColors[state],
                    }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 25,
                      backgroundColor: { duration: 0.2 },
                    }}
                    className="rounded-t-md flex flex-col items-center justify-end"
                    style={{ width: barWidth, minHeight: 20 }}
                  >
                    <span className="text-xs font-bold text-white mb-1">
                      {value}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Index labels */}
          <div
            className="flex justify-center gap-1 mb-4"
            style={{ paddingLeft: 16, paddingRight: 16 }}
          >
            {displayArray.map((_, index) => (
              <div
                key={index}
                className="text-xs text-muted-foreground text-center"
                style={{ width: barWidth }}
              >
                {index}
              </div>
            ))}
          </div>

          {/* Step message */}
          <div className="text-center text-sm text-muted-foreground mb-4 h-6">
            {currentStepData?.message ?? 'Ready to start'}
          </div>

          {/* Controls */}
          <SortingControls
            currentStep={currentStep}
            totalSteps={steps.length}
            isPlaying={isPlaying}
            speed={speed}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onStepForward={() =>
              setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
            }
            onStepBackward={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
            onReset={handleReset}
            onSpeedChange={setSpeed}
          />

          {/* Stats */}
          {currentStepData && (
            <SortingStats
              comparisons={currentStepData.stats.comparisons}
              swaps={currentStepData.stats.swaps}
            />
          )}

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground justify-center">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: stateColors.default }}
              />
              <span>Default</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: stateColors.comparing }}
              />
              <span>Comparing</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: stateColors.swapping }}
              />
              <span>Swapping</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: stateColors.sorted }}
              />
              <span>Sorted</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: stateColors.pivot }}
              />
              <span>Pivot</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Algorithm Info */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Algorithm Info</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            {ALGORITHM_INFO[algorithm].description}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="font-medium">Best Case</div>
              <div className="text-muted-foreground">
                {ALGORITHM_INFO[algorithm].timeComplexity.best}
              </div>
            </div>
            <div>
              <div className="font-medium">Average Case</div>
              <div className="text-muted-foreground">
                {ALGORITHM_INFO[algorithm].timeComplexity.average}
              </div>
            </div>
            <div>
              <div className="font-medium">Worst Case</div>
              <div className="text-muted-foreground">
                {ALGORITHM_INFO[algorithm].timeComplexity.worst}
              </div>
            </div>
            <div>
              <div className="font-medium">Space</div>
              <div className="text-muted-foreground">
                {ALGORITHM_INFO[algorithm].spaceComplexity}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
