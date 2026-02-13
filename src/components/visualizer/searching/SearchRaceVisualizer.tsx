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

interface RacerState {
  name: string;
  steps: SearchStep[];
  currentStep: number;
  isComplete: boolean;
  color: string;
}

export function SearchRaceVisualizer() {
  const [arraySize, setArraySize] = useState(20);
  const [array, setArray] = useState<number[]>([]);
  const [target, setTarget] = useState(0);
  const [racers, setRacers] = useState<RacerState[]>([]);
  const [isRacing, setIsRacing] = useState(false);
  const [speed, setSpeed] = useState(200);
  const [raceComplete, setRaceComplete] = useState(false);

  const generateRace = useCallback(() => {
    const sorted = Array.from({ length: arraySize }, (_, i) => (i + 1) * 3 + Math.floor(Math.random() * 3));
    const t = sorted[Math.floor(Math.random() * sorted.length)];
    setArray(sorted);
    setTarget(t);

    const linearSteps = generateLinearSearchSteps(sorted, t);
    const binarySteps = generateBinarySearchSteps(sorted, t);

    setRacers([
      { name: 'Linear Search', steps: linearSteps, currentStep: 0, isComplete: false, color: '#3b82f6' },
      { name: 'Binary Search', steps: binarySteps, currentStep: 0, isComplete: false, color: '#22c55e' },
    ]);
    setRaceComplete(false);
    setIsRacing(false);
  }, [arraySize]);

  useEffect(() => {
    generateRace();
  }, [generateRace]);

  useEffect(() => {
    if (!isRacing) return;
    const allDone = racers.every(r => r.isComplete);
    if (allDone) {
      setIsRacing(false);
      setRaceComplete(true);
      return;
    }

    const timer = setTimeout(() => {
      setRacers(prev =>
        prev.map(racer => {
          if (racer.isComplete) return racer;
          const next = racer.currentStep + 1;
          const done = next >= racer.steps.length;
          return { ...racer, currentStep: done ? racer.currentStep : next, isComplete: done };
        })
      );
    }, speed);
    return () => clearTimeout(timer);
  }, [isRacing, racers, speed]);

  const handleStart = () => {
    setRacers(prev => prev.map(r => ({ ...r, currentStep: 0, isComplete: false })));
    setRaceComplete(false);
    setIsRacing(true);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <CardTitle className="text-lg">Search Algorithm Race</CardTitle>
          <div className="flex gap-2 items-center">
            <label className="text-sm text-muted-foreground">Array size:</label>
            <Input
              type="number"
              value={arraySize}
              onChange={(e) => setArraySize(Math.max(5, Math.min(50, parseInt(e.target.value) || 10)))}
              className="w-20"
              disabled={isRacing}
            />
            <Button size="sm" variant="outline" onClick={generateRace} disabled={isRacing}>
              New Race
            </Button>
            {!isRacing ? (
              <Button size="sm" onClick={handleStart}>Start Race</Button>
            ) : (
              <Button size="sm" variant="destructive" onClick={() => setIsRacing(false)}>Stop</Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground text-center">
          Searching for <strong>{target}</strong> in a sorted array of {array.length} elements
        </div>

        <div className="flex items-center gap-4 justify-center">
          <span className="text-sm text-muted-foreground">Race Speed:</span>
          <Slider
            value={[1000 - speed]}
            onValueChange={([v]) => setSpeed(1000 - v)}
            min={0}
            max={950}
            step={10}
            className="w-32"
          />
          <span className="text-xs text-muted-foreground">{speed}ms</span>
        </div>

        {/* Race tracks */}
        <div className="space-y-4">
          {racers.map((racer) => {
            const step = racer.steps[racer.currentStep];
            const progress = racer.steps.length > 0
              ? (racer.currentStep / racer.steps.length) * 100
              : 0;

            return (
              <div
                key={racer.name}
                className="p-4 rounded-lg bg-muted/30 border"
                style={{ borderColor: racer.color }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: racer.color }} />
                    <span className="font-medium">{racer.name}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {racer.isComplete ? (
                      <span className="text-green-500 font-medium">
                        Done! ({step?.comparisons ?? 0} comparisons)
                      </span>
                    ) : (
                      `Comparisons: ${step?.comparisons ?? 0}`
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full transition-all duration-100"
                    style={{ backgroundColor: racer.color, width: `${progress}%` }}
                  />
                </div>

                {/* Mini array view */}
                <div className="flex gap-px h-8 items-end">
                  {array.map((val, i) => {
                    const maxVal = Math.max(...array);
                    const h = (val / maxVal) * 100;
                    let bgColor = racer.color;
                    let opacity = 0.4;

                    if (step) {
                      if (step.type === 'found' && i === step.currentIndex) {
                        bgColor = '#22c55e';
                        opacity = 1;
                      } else if (i === step.currentIndex) {
                        bgColor = '#eab308';
                        opacity = 1;
                      } else if (step.low !== undefined && step.high !== undefined) {
                        if (i >= step.low && i <= step.high) opacity = 0.7;
                        else opacity = 0.15;
                      }
                    }

                    return (
                      <div
                        key={i}
                        className="flex-1 rounded-t-sm transition-all duration-75"
                        style={{ height: `${h}%`, backgroundColor: bgColor, opacity }}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Results */}
        {raceComplete && (
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
            <h3 className="font-semibold text-green-600 mb-2">Race Complete!</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {racers
                .sort((a, b) => {
                  const aComp = a.steps[a.steps.length - 1]?.comparisons ?? Infinity;
                  const bComp = b.steps[b.steps.length - 1]?.comparisons ?? Infinity;
                  return aComp - bComp;
                })
                .map((racer, idx) => {
                  const finalStep = racer.steps[racer.steps.length - 1];
                  return (
                    <div key={racer.name} className="flex items-center gap-2">
                      <span className="font-bold">#{idx + 1}</span>
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: racer.color }} />
                      <span>{racer.name}</span>
                      <span className="text-muted-foreground">
                        ({finalStep?.comparisons ?? 0} comparisons)
                      </span>
                    </div>
                  );
                })}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Binary search used ~log\u2082({array.length}) = {Math.ceil(Math.log2(array.length))} comparisons vs linear search&apos;s up to {array.length}.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
