'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, SkipForward, SkipBack, RotateCcw } from 'lucide-react';
import {
  createInitialState,
  putGenerator,
  getGenerator,
  removeGenerator,
  type HashMapState,
  type HashMapStep,
} from '@/lib/algorithms/maps';

interface HashTableVisualizerProps {
  showControls?: boolean;
  initialEntries?: { key: string; value: number }[];
}

export function HashTableVisualizer({
  showControls = true,
  initialEntries = [],
}: HashTableVisualizerProps) {
  const [state, setState] = useState<HashMapState>(() => createInitialState(8));
  const [steps, setSteps] = useState<HashMapStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [keyInput, setKeyInput] = useState('');
  const [valueInput, setValueInput] = useState('');
  const [message, setMessage] = useState('Enter a key-value pair and click Put');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize with entries if provided
  useEffect(() => {
    if (initialEntries.length > 0) {
      let currentState = createInitialState(8);
      for (const entry of initialEntries) {
        for (const step of putGenerator(currentState, entry.key, entry.value)) {
          currentState = step.state;
        }
      }
      setState(currentState);
    }
  }, [initialEntries]);

  // Auto-play effect
  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      intervalRef.current = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, speed);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [isPlaying, currentStep, steps.length, speed]);

  // Update message when step changes
  useEffect(() => {
    if (steps.length > 0 && currentStep < steps.length) {
      setMessage(steps[currentStep].message);
      setState(steps[currentStep].state);
    }
  }, [currentStep, steps]);

  const executeOperation = useCallback(
    (operation: 'put' | 'get' | 'remove', key: string, value?: number) => {
      const newSteps: HashMapStep[] = [];
      let generator;

      if (operation === 'put' && value !== undefined) {
        generator = putGenerator(state, key, value);
      } else if (operation === 'get') {
        generator = getGenerator(state, key);
      } else if (operation === 'remove') {
        generator = removeGenerator(state, key);
      }

      if (generator) {
        for (const step of generator) {
          newSteps.push(step);
        }
        setSteps(newSteps);
        setCurrentStep(0);
        setIsPlaying(true);
      }
    },
    [state]
  );

  const handlePut = () => {
    if (keyInput.trim() && valueInput.trim()) {
      const value = parseInt(valueInput, 10);
      if (!isNaN(value)) {
        executeOperation('put', keyInput.trim(), value);
        setKeyInput('');
        setValueInput('');
      }
    }
  };

  const handleGet = () => {
    if (keyInput.trim()) {
      executeOperation('get', keyInput.trim());
    }
  };

  const handleRemove = () => {
    if (keyInput.trim()) {
      executeOperation('remove', keyInput.trim());
      setKeyInput('');
    }
  };

  const handleReset = () => {
    setState(createInitialState(8));
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
    setMessage('HashMap reset. Enter a key-value pair and click Put');
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="space-y-4">
      {/* Controls */}
      {showControls && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">HashMap Operations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 items-end">
              <div className="space-y-1">
                <Label htmlFor="key">Key</Label>
                <Input
                  id="key"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  placeholder="e.g., apple"
                  className="w-32"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="value">Value</Label>
                <Input
                  id="value"
                  value={valueInput}
                  onChange={(e) => setValueInput(e.target.value)}
                  placeholder="e.g., 5"
                  className="w-24"
                  type="number"
                />
              </div>
              <Button onClick={handlePut} disabled={!keyInput || !valueInput}>
                Put
              </Button>
              <Button onClick={handleGet} variant="outline" disabled={!keyInput}>
                Get
              </Button>
              <Button onClick={handleRemove} variant="outline" disabled={!keyInput}>
                Remove
              </Button>
              <Button onClick={handleReset} variant="ghost">
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Playback Controls */}
      {steps.length > 0 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            <SkipBack className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1}
          >
            <SkipForward className="w-4 h-4" />
          </Button>
          <span className="text-sm text-muted-foreground ml-2">
            Step {currentStep + 1} / {steps.length}
          </span>
        </div>
      )}

      {/* Message Display */}
      <div className="p-3 bg-muted rounded-lg text-center">
        <p className="text-sm">{message}</p>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-6 text-sm">
        <div>
          <span className="text-muted-foreground">Size: </span>
          <span className="font-mono font-bold">{state.size}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Capacity: </span>
          <span className="font-mono font-bold">{state.capacity}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Load Factor: </span>
          <span className="font-mono font-bold">
            {(state.size / state.capacity).toFixed(2)}
          </span>
        </div>
        <div>
          <span className="text-muted-foreground">Threshold: </span>
          <span className="font-mono font-bold">{state.threshold}</span>
        </div>
      </div>

      {/* Table View */}
      <Card>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 w-20">Index</th>
                  <th className="text-left p-2">Entries (Key → Value)</th>
                  <th className="text-left p-2 w-32">Hash Codes</th>
                </tr>
              </thead>
              <tbody>
                {state.buckets.map((bucket, idx) => {
                  const isHighlighted = currentStepData?.highlightBucket === idx;
                  const highlightEntry = currentStepData?.highlightEntry;

                  return (
                    <motion.tr
                      key={idx}
                      className={`border-b transition-colors ${
                        isHighlighted ? 'bg-blue-500/10' : ''
                      }`}
                      animate={{
                        backgroundColor: isHighlighted
                          ? 'rgba(59, 130, 246, 0.1)'
                          : 'transparent',
                      }}
                    >
                      <td className="p-2 font-mono">
                        <Badge variant={isHighlighted ? 'default' : 'outline'}>
                          {idx}
                        </Badge>
                      </td>
                      <td className="p-2">
                        {bucket.entries.length === 0 ? (
                          <span className="text-muted-foreground italic">
                            (empty)
                          </span>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            <AnimatePresence mode="popLayout">
                              {bucket.entries.map((entry, entryIdx) => {
                                const isEntryHighlighted =
                                  highlightEntry?.bucket === idx &&
                                  highlightEntry?.index === entryIdx;

                                return (
                                  <motion.div
                                    key={`${entry.key}-${entryIdx}`}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{
                                      opacity: 1,
                                      scale: isEntryHighlighted ? 1.05 : 1,
                                    }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className={`px-2 py-1 rounded border ${
                                      isEntryHighlighted
                                        ? 'bg-yellow-300 border-yellow-500 font-bold'
                                        : 'bg-background'
                                    }`}
                                  >
                                    <span className="text-blue-600">"{entry.key}"</span>
                                    <span className="mx-1">→</span>
                                    <span className="text-green-600 font-mono">
                                      {entry.value}
                                    </span>
                                  </motion.div>
                                );
                              })}
                            </AnimatePresence>
                            {bucket.entries.length > 1 && (
                              <Badge variant="secondary" className="text-xs">
                                chain: {bucket.entries.length}
                              </Badge>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="p-2 font-mono text-xs text-muted-foreground">
                        {bucket.entries.map((e) => e.hashCode).join(', ')}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500/20 border border-blue-500 rounded" />
          <span className="text-muted-foreground">Current Bucket</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-300 border border-yellow-500 rounded" />
          <span className="text-muted-foreground">Current Entry</span>
        </div>
      </div>
    </div>
  );
}
