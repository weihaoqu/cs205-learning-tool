'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, RotateCcw, SkipForward, SkipBack } from 'lucide-react';
import { ExecutionStep, RecursiveExample } from '@/lib/algorithms/recursion';

interface CallStackVisualizerProps {
  example: RecursiveExample;
  generateTrace: (input: number | number[]) => ExecutionStep[];
}

export default function CallStackVisualizer({ example, generateTrace }: CallStackVisualizerProps) {
  const [input, setInput] = useState<number | number[]>(example.defaultInput);
  const [inputString, setInputString] = useState(
    Array.isArray(example.defaultInput)
      ? example.defaultInput.join(', ')
      : String(example.defaultInput)
  );
  const [steps, setSteps] = useState<ExecutionStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<'slow' | 'medium' | 'fast'>('medium');

  const speedMs = { slow: 1500, medium: 800, fast: 400 };

  // Generate trace when input changes
  const handleGenerateTrace = useCallback(() => {
    const newSteps = generateTrace(input);
    setSteps(newSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [input, generateTrace]);

  useEffect(() => {
    handleGenerateTrace();
  }, [handleGenerateTrace]);

  // Animation loop
  useEffect(() => {
    if (!isPlaying || currentStepIndex >= steps.length - 1) {
      if (currentStepIndex >= steps.length - 1 && isPlaying) {
        setIsPlaying(false);
      }
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStepIndex(prev => prev + 1);
    }, speedMs[speed]);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIndex, steps.length, speed]);

  const handleInputChange = (value: string) => {
    setInputString(value);
    if (example.inputType === 'array') {
      const arr = value.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
      if (arr.length > 0 && arr.length <= example.maxInput) {
        setInput(arr);
      }
    } else {
      const num = parseInt(value);
      if (!isNaN(num) && num >= 0 && num <= example.maxInput) {
        setInput(num);
      }
    }
  };

  const handlePlay = () => {
    if (currentStepIndex >= steps.length - 1) {
      setCurrentStepIndex(0);
    }
    setIsPlaying(true);
  };

  const handlePause = () => setIsPlaying(false);
  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };
  const handleStepForward = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };
  const handleStepBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const currentStep = steps[currentStepIndex];
  const isComplete = currentStepIndex >= steps.length - 1;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{example.name} - Call Stack Visualizer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Input control */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">
            {example.inputType === 'array' ? 'Array (comma-separated):' : 'Input n:'}
          </label>
          <input
            type="text"
            value={inputString}
            onChange={(e) => handleInputChange(e.target.value)}
            className="border rounded px-3 py-1 w-48"
            disabled={isPlaying}
          />
          <Button onClick={handleGenerateTrace} variant="outline" size="sm" disabled={isPlaying}>
            Generate
          </Button>
          <span className="text-sm text-gray-500">
            (max: {example.inputType === 'array' ? `${example.maxInput} elements` : example.maxInput})
          </span>
        </div>

        {/* Code display */}
        <div className="border rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900">
          <div className="bg-gray-200 dark:bg-gray-800 px-3 py-1 text-sm font-medium">
            {example.name} Code
          </div>
          <pre className="p-4 text-sm overflow-x-auto">
            <code>{example.code}</code>
          </pre>
        </div>

        {/* Main visualization area */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Call Stack */}
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-3">Call Stack</h4>
            <div className="space-y-2 min-h-[200px]">
              {currentStep?.frames.slice().reverse().map((frame, idx) => (
                <div
                  key={frame.id}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    frame.status === 'executing'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                      : frame.status === 'waiting'
                      ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900'
                      : frame.status === 'returning'
                      ? 'border-green-500 bg-green-50 dark:bg-green-900'
                      : 'border-gray-300 bg-gray-50 dark:bg-gray-800'
                  }`}
                  style={{ marginLeft: `${idx * 0}px` }}
                >
                  <div className="font-mono text-sm font-medium">
                    {frame.functionName}(
                    {Object.entries(frame.params)
                      .map(([k, v]) => `${k}=${Array.isArray(v) ? `[${v.join(',')}]` : v}`)
                      .join(', ')}
                    )
                  </div>
                  {frame.returnValue !== undefined && (
                    <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                      → returns {frame.returnValue}
                    </div>
                  )}
                  <div className="text-xs text-gray-500 mt-1">
                    {frame.status === 'executing' && '▶ Executing'}
                    {frame.status === 'waiting' && '⏸ Waiting for recursive call'}
                    {frame.status === 'returning' && '↩ Returning'}
                  </div>
                </div>
              ))}
              {(!currentStep || currentStep.frames.length === 0) && (
                <div className="text-gray-400 text-center py-8">
                  Stack is empty
                </div>
              )}
            </div>
          </div>

          {/* Execution log */}
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-3">Execution Trace</h4>
            <div className="space-y-1 max-h-[250px] overflow-y-auto">
              {steps.slice(0, currentStepIndex + 1).map((step, idx) => (
                <div
                  key={idx}
                  className={`text-sm p-2 rounded ${
                    idx === currentStepIndex
                      ? 'bg-blue-100 dark:bg-blue-900 font-medium'
                      : ''
                  }`}
                >
                  <span className="text-gray-500 mr-2">{step.stepNumber}.</span>
                  <span
                    className={`inline-block w-16 ${
                      step.action === 'call'
                        ? 'text-blue-600'
                        : step.action === 'return'
                        ? 'text-green-600'
                        : 'text-yellow-600'
                    }`}
                  >
                    [{step.action}]
                  </span>
                  {step.explanation}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Current step explanation */}
        {currentStep && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
            <div className="font-medium text-blue-800 dark:text-blue-200">
              Step {currentStep.stepNumber} of {steps.length}
            </div>
            <div className="text-blue-600 dark:text-blue-300">
              {currentStep.explanation}
            </div>
            <div className="text-sm text-blue-500 mt-1">
              Stack depth: {currentStep.stackDepth}
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button onClick={handleStepBack} variant="outline" size="sm" disabled={isPlaying || currentStepIndex === 0}>
            <SkipBack className="w-4 h-4" />
          </Button>
          {isPlaying ? (
            <Button onClick={handlePause} variant="outline" size="sm">
              <Pause className="w-4 h-4 mr-1" /> Pause
            </Button>
          ) : (
            <Button onClick={handlePlay} size="sm" disabled={steps.length === 0}>
              <Play className="w-4 h-4 mr-1" /> {isComplete ? 'Replay' : 'Play'}
            </Button>
          )}
          <Button onClick={handleStepForward} variant="outline" size="sm" disabled={isPlaying || isComplete}>
            <SkipForward className="w-4 h-4" />
          </Button>
          <Button onClick={handleReset} variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-1" /> Reset
          </Button>

          <div className="ml-4 flex items-center gap-2">
            <span className="text-sm">Speed:</span>
            {(['slow', 'medium', 'fast'] as const).map(s => (
              <Button
                key={s}
                onClick={() => setSpeed(s)}
                variant={speed === s ? 'default' : 'outline'}
                size="sm"
                className="capitalize"
              >
                {s}
              </Button>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1">
          <Slider
            value={[currentStepIndex]}
            onValueChange={(value) => {
              setIsPlaying(false);
              setCurrentStepIndex(value[0]);
            }}
            min={0}
            max={Math.max(0, steps.length - 1)}
            step={1}
            className="w-full"
          />
          <div className="text-sm text-gray-500 text-center">
            Step {currentStepIndex + 1} of {steps.length}
          </div>
        </div>

        {/* Complexity info */}
        <div className="flex gap-4 text-sm">
          <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded">
            <span className="text-gray-600 dark:text-gray-400">Time:</span>{' '}
            <span className="font-medium">{example.complexity.time}</span>
          </div>
          <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded">
            <span className="text-gray-600 dark:text-gray-400">Space:</span>{' '}
            <span className="font-medium">{example.complexity.space}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
