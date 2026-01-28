'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  generateSortingSteps,
  ALGORITHM_INFO,
  type SortingAlgorithm,
  type SortingStep,
} from '@/lib/algorithms/sorting';

interface RacerState {
  algorithm: SortingAlgorithm;
  steps: SortingStep[];
  currentStep: number;
  isComplete: boolean;
}

const stateColors: Record<string, string> = {
  default: '#3b82f6',
  comparing: '#eab308',
  swapping: '#f97316',
  sorted: '#22c55e',
  pivot: '#ef4444',
  merge: '#a855f7',
  partition: '#06b6d4',
};

const algorithmColors: Record<SortingAlgorithm, string> = {
  bubble: '#3b82f6',
  selection: '#8b5cf6',
  insertion: '#ec4899',
  merge: '#10b981',
  quick: '#f59e0b',
};

export function SortingRace() {
  const [baseArray, setBaseArray] = useState<number[]>([64, 34, 25, 12, 22, 11, 90, 45, 33, 18]);
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<SortingAlgorithm[]>([
    'bubble',
    'selection',
    'insertion',
  ]);
  const [racers, setRacers] = useState<RacerState[]>([]);
  const [isRacing, setIsRacing] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [raceComplete, setRaceComplete] = useState(false);

  // Initialize racers when algorithms or array changes
  useEffect(() => {
    const newRacers = selectedAlgorithms.map((algorithm) => ({
      algorithm,
      steps: generateSortingSteps(algorithm, baseArray),
      currentStep: 0,
      isComplete: false,
    }));
    setRacers(newRacers);
    setRaceComplete(false);
  }, [selectedAlgorithms, baseArray]);

  // Race animation loop
  useEffect(() => {
    if (!isRacing) return;

    const allComplete = racers.every((r) => r.isComplete);
    if (allComplete) {
      setIsRacing(false);
      setRaceComplete(true);
      return;
    }

    const timer = setTimeout(() => {
      setRacers((prev) =>
        prev.map((racer) => {
          if (racer.isComplete) return racer;

          const nextStep = racer.currentStep + 1;
          const isComplete = nextStep >= racer.steps.length;

          return {
            ...racer,
            currentStep: isComplete ? racer.currentStep : nextStep,
            isComplete,
          };
        })
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [isRacing, racers, speed]);

  const handleRandomize = useCallback(() => {
    const newArray = Array.from({ length: 12 }, () =>
      Math.floor(Math.random() * 100)
    );
    setBaseArray(newArray);
    setIsRacing(false);
    setRaceComplete(false);
  }, []);

  const handleStartRace = useCallback(() => {
    // Reset all racers
    setRacers((prev) =>
      prev.map((racer) => ({
        ...racer,
        currentStep: 0,
        isComplete: false,
      }))
    );
    setRaceComplete(false);
    setIsRacing(true);
  }, []);

  const handleStopRace = useCallback(() => {
    setIsRacing(false);
  }, []);

  const handleResetRace = useCallback(() => {
    setRacers((prev) =>
      prev.map((racer) => ({
        ...racer,
        currentStep: 0,
        isComplete: false,
      }))
    );
    setIsRacing(false);
    setRaceComplete(false);
  }, []);

  const toggleAlgorithm = (algo: SortingAlgorithm) => {
    if (isRacing) return;

    setSelectedAlgorithms((prev) => {
      if (prev.includes(algo)) {
        if (prev.length <= 2) return prev; // Keep at least 2
        return prev.filter((a) => a !== algo);
      }
      if (prev.length >= 5) return prev; // Max 5
      return [...prev, algo];
    });
  };

  const allAlgorithms: SortingAlgorithm[] = ['bubble', 'selection', 'insertion', 'merge', 'quick'];

  // Sort racers by completion for ranking
  const sortedRacers = [...racers].sort((a, b) => {
    if (a.isComplete && !b.isComplete) return -1;
    if (!a.isComplete && b.isComplete) return 1;
    if (a.isComplete && b.isComplete) {
      return a.steps.length - b.steps.length;
    }
    return 0;
  });

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <CardTitle className="text-lg">Algorithm Race</CardTitle>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleRandomize}
              disabled={isRacing}
            >
              Randomize
            </Button>
            {!isRacing ? (
              <Button size="sm" onClick={handleStartRace} disabled={racers.length < 2}>
                Start Race
              </Button>
            ) : (
              <Button size="sm" variant="destructive" onClick={handleStopRace}>
                Stop
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={handleResetRace}
              disabled={isRacing}
            >
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Algorithm selection */}
        <div className="flex flex-wrap gap-2 mb-6">
          {allAlgorithms.map((algo) => {
            const isSelected = selectedAlgorithms.includes(algo);
            return (
              <Button
                key={algo}
                size="sm"
                variant={isSelected ? 'default' : 'outline'}
                onClick={() => toggleAlgorithm(algo)}
                disabled={isRacing}
                style={{
                  backgroundColor: isSelected ? algorithmColors[algo] : undefined,
                  borderColor: algorithmColors[algo],
                }}
              >
                {ALGORITHM_INFO[algo].name}
              </Button>
            );
          })}
        </div>

        {/* Speed control */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-sm text-muted-foreground">Race Speed:</span>
          <Slider
            value={[500 - speed]}
            onValueChange={([value]) => setSpeed(500 - value)}
            min={0}
            max={450}
            step={10}
            className="w-32"
          />
          <span className="text-xs text-muted-foreground">{speed}ms</span>
        </div>

        {/* Race tracks */}
        <div className="space-y-4">
          {racers.map((racer, idx) => {
            const currentStepData = racer.steps[racer.currentStep];
            const displayArray = currentStepData?.array ?? baseArray;
            const maxValue = Math.max(...displayArray, 1);
            const progress = racer.steps.length > 0
              ? (racer.currentStep / racer.steps.length) * 100
              : 0;

            const rank = raceComplete
              ? sortedRacers.findIndex((r) => r.algorithm === racer.algorithm) + 1
              : null;

            return (
              <div
                key={racer.algorithm}
                className="p-4 rounded-lg bg-muted/30 border"
                style={{ borderColor: algorithmColors[racer.algorithm] }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: algorithmColors[racer.algorithm] }}
                    />
                    <span className="font-medium">
                      {ALGORITHM_INFO[racer.algorithm].name}
                    </span>
                    {rank && (
                      <span
                        className={`text-sm font-bold ${
                          rank === 1
                            ? 'text-yellow-500'
                            : rank === 2
                            ? 'text-gray-400'
                            : rank === 3
                            ? 'text-orange-600'
                            : 'text-muted-foreground'
                        }`}
                      >
                        #{rank}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {racer.isComplete ? (
                      <span className="text-green-500 font-medium">Complete!</span>
                    ) : (
                      `Step ${racer.currentStep + 1} / ${racer.steps.length}`
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-1 bg-muted rounded-full overflow-hidden mb-2">
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: algorithmColors[racer.algorithm] }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>

                {/* Mini bar chart */}
                <div className="flex items-end gap-px h-16">
                  {displayArray.map((value, i) => {
                    const height = (value / maxValue) * 100;
                    const isActive =
                      currentStepData?.indices.includes(i) ?? false;
                    const isSorted =
                      currentStepData?.type === 'sorted' &&
                      currentStepData.indices.includes(i);

                    return (
                      <motion.div
                        key={i}
                        className="flex-1 rounded-t-sm"
                        style={{
                          backgroundColor: isSorted
                            ? stateColors.sorted
                            : isActive
                            ? stateColors.comparing
                            : algorithmColors[racer.algorithm],
                          opacity: isActive || isSorted ? 1 : 0.6,
                        }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.05 }}
                      />
                    );
                  })}
                </div>

                {/* Stats */}
                {currentStepData && (
                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Comparisons: {currentStepData.stats.comparisons}</span>
                    <span>Swaps: {currentStepData.stats.swaps}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Race results */}
        {raceComplete && (
          <div className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
            <h3 className="font-semibold text-green-600 mb-2">Race Complete!</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              {sortedRacers.map((racer, idx) => {
                const finalStep = racer.steps[racer.steps.length - 1];
                return (
                  <div key={racer.algorithm} className="flex items-center gap-2">
                    <span className="font-bold">#{idx + 1}</span>
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: algorithmColors[racer.algorithm] }}
                    />
                    <span>{ALGORITHM_INFO[racer.algorithm].name}</span>
                    <span className="text-muted-foreground">
                      ({racer.steps.length} steps)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
