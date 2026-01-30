'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, SkipForward, SkipBack, RotateCcw, X } from 'lucide-react';
import {
  createInitialSetState,
  addGenerator,
  containsGenerator,
  removeSetGenerator,
  type HashSetState,
  type HashSetStep,
} from '@/lib/algorithms/maps';

export function HashSetVisualizer() {
  const [state, setState] = useState<HashSetState>(() => createInitialSetState(8));
  const [steps, setSteps] = useState<HashSetStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed] = useState(800);
  const [valueInput, setValueInput] = useState('');
  const [message, setMessage] = useState('Enter a value and click Add');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
    (operation: 'add' | 'contains' | 'remove', value: string) => {
      const newSteps: HashSetStep[] = [];
      let generator;

      if (operation === 'add') {
        generator = addGenerator(state, value);
      } else if (operation === 'contains') {
        generator = containsGenerator(state, value);
      } else if (operation === 'remove') {
        generator = removeSetGenerator(state, value);
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

  const handleAdd = () => {
    if (valueInput.trim()) {
      executeOperation('add', valueInput.trim());
      setValueInput('');
    }
  };

  const handleContains = () => {
    if (valueInput.trim()) {
      executeOperation('contains', valueInput.trim());
    }
  };

  const handleRemove = () => {
    if (valueInput.trim()) {
      executeOperation('remove', valueInput.trim());
      setValueInput('');
    }
  };

  const handleReset = () => {
    setState(createInitialSetState(8));
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
    setMessage('HashSet reset. Enter a value and click Add');
  };

  const currentStepData = steps[currentStep];
  const isDuplicate = currentStepData?.type === 'duplicate';

  return (
    <div className="space-y-4">
      {/* Controls */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">HashSet Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="space-y-1">
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                value={valueInput}
                onChange={(e) => setValueInput(e.target.value)}
                placeholder="e.g., apple"
                className="w-40"
              />
            </div>
            <Button onClick={handleAdd} disabled={!valueInput}>
              Add
            </Button>
            <Button onClick={handleContains} variant="outline" disabled={!valueInput}>
              Contains?
            </Button>
            <Button onClick={handleRemove} variant="outline" disabled={!valueInput}>
              Remove
            </Button>
            <Button onClick={handleReset} variant="ghost">
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

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
      <div className={`p-3 rounded-lg text-center ${
        isDuplicate ? 'bg-red-500/10 border border-red-500/30' : 'bg-muted'
      }`}>
        <p className="text-sm flex items-center justify-center gap-2">
          {isDuplicate && <X className="w-4 h-4 text-red-500" />}
          {message}
        </p>
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
      </div>

      {/* Table View */}
      <Card>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 w-20">Index</th>
                  <th className="text-left p-2">Elements</th>
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
                                const isRejectingDuplicate =
                                  isDuplicate && isEntryHighlighted;

                                return (
                                  <motion.div
                                    key={`${entry.value}-${entryIdx}`}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{
                                      opacity: 1,
                                      scale: isEntryHighlighted ? 1.05 : 1,
                                    }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className={`px-3 py-1 rounded-full border ${
                                      isRejectingDuplicate
                                        ? 'bg-red-300 border-red-500 font-bold'
                                        : isEntryHighlighted
                                        ? 'bg-yellow-300 border-yellow-500 font-bold'
                                        : 'bg-purple-100 border-purple-300'
                                    }`}
                                  >
                                    {entry.value}
                                  </motion.div>
                                );
                              })}
                            </AnimatePresence>
                          </div>
                        )}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium mb-2">HashSet Properties</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• <strong>No duplicates</strong> - adding an existing element does nothing</li>
            <li>• <strong>O(1) average</strong> for add, remove, contains</li>
            <li>• <strong>Unordered</strong> - iteration order is not guaranteed</li>
            <li>• Implemented using HashMap internally (element → dummy value)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
