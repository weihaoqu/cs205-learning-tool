'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, RotateCcw, FastForward } from 'lucide-react';
import { ComplexityExample, complexityInfo } from '@/lib/algorithms/complexity';

interface StepCounterProps {
  example: ComplexityExample;
}

interface ExecutionStep {
  line: number;
  description: string;
  variables?: Record<string, number | string>;
}

export default function StepCounter({ example }: StepCounterProps) {
  const [inputSize, setInputSize] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [operationCount, setOperationCount] = useState(0);
  const [speed, setSpeed] = useState<'slow' | 'medium' | 'fast'>('medium');
  const [executionSteps, setExecutionSteps] = useState<ExecutionStep[]>([]);

  const speedMs = { slow: 1000, medium: 500, fast: 200 };

  // Generate execution steps based on the example
  const generateSteps = useCallback((n: number): ExecutionStep[] => {
    const steps: ExecutionStep[] = [];

    // Generate steps based on complexity type
    switch (example.complexity) {
      case 'O(1)':
        steps.push({ line: 1, description: 'Execute operation', variables: { n } });
        break;

      case 'O(n)':
        for (let i = 0; i < n; i++) {
          steps.push({ line: 2, description: `Loop iteration i=${i}`, variables: { i, n } });
          steps.push({ line: 3, description: 'Process element', variables: { i, n } });
        }
        break;

      case 'O(n²)':
        for (let i = 0; i < Math.min(n, 10); i++) {
          for (let j = 0; j < Math.min(n, 10); j++) {
            steps.push({ line: 2, description: `Outer i=${i}`, variables: { i, j, n } });
            steps.push({ line: 3, description: `Inner j=${j}`, variables: { i, j, n } });
            steps.push({ line: 4, description: 'Process pair', variables: { i, j, n } });
          }
        }
        break;

      case 'O(log n)':
        let left = 0;
        let right = n - 1;
        while (left <= right) {
          const mid = Math.floor((left + right) / 2);
          steps.push({ line: 4, description: `Calculate mid=${mid}`, variables: { left, right, mid } });
          steps.push({ line: 5, description: 'Compare with target', variables: { left, right, mid } });
          // Simulate searching for middle element (always go left)
          right = mid - 1;
          steps.push({ line: 8, description: `Update right=${right}`, variables: { left, right: mid - 1, mid } });
        }
        break;

      case 'O(n log n)':
        for (let size = 1; size < n; size *= 2) {
          for (let i = 0; i < Math.min(n, 10); i++) {
            steps.push({ line: 2, description: `Size=${size}, i=${i}`, variables: { size, i, n } });
          }
        }
        break;

      case 'O(2^n)':
        // Show limited steps for exponential
        const maxSteps = Math.min(Math.pow(2, n), 32);
        for (let i = 0; i < maxSteps; i++) {
          steps.push({ line: 3, description: `Recursive call ${i + 1}`, variables: { call: i + 1 } });
        }
        break;
    }

    return steps;
  }, [example.complexity]);

  // Initialize steps when input size changes
  useEffect(() => {
    const steps = generateSteps(inputSize);
    setExecutionSteps(steps);
    setCurrentStep(0);
    setOperationCount(0);
    setIsRunning(false);
  }, [inputSize, generateSteps]);

  // Animation loop
  useEffect(() => {
    if (!isRunning || currentStep >= executionSteps.length) {
      if (currentStep >= executionSteps.length && isRunning) {
        setIsRunning(false);
      }
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
      setOperationCount(prev => prev + 1);
    }, speedMs[speed]);

    return () => clearTimeout(timer);
  }, [isRunning, currentStep, executionSteps.length, speed, speedMs]);

  const handlePlay = () => {
    if (currentStep >= executionSteps.length) {
      setCurrentStep(0);
      setOperationCount(0);
    }
    setIsRunning(true);
  };

  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setOperationCount(0);
  };

  const handleStepForward = () => {
    if (currentStep < executionSteps.length) {
      setCurrentStep(prev => prev + 1);
      setOperationCount(prev => prev + 1);
    }
  };

  // Highlight current line in code
  const getHighlightedCode = () => {
    const lines = example.javaCode.split('\n');
    const currentExecStep = executionSteps[currentStep - 1];
    const highlightLine = currentExecStep?.line ?? -1;

    return lines.map((line, idx) => {
      const lineNum = idx + 1;
      const isHighlighted = lineNum === highlightLine;

      return (
        <div
          key={idx}
          className={`px-2 font-mono text-sm ${
            isHighlighted ? 'bg-yellow-200 dark:bg-yellow-900' : ''
          }`}
        >
          <span className="inline-block w-6 text-gray-400 text-right mr-2">
            {lineNum}
          </span>
          {line}
        </div>
      );
    });
  };

  const currentStepInfo = executionSteps[currentStep - 1];
  const predictedOperations = example.stepCount(inputSize);
  const isComplete = currentStep >= executionSteps.length;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span
            className="px-2 py-1 rounded text-white text-sm"
            style={{ backgroundColor: complexityInfo[example.complexity].color }}
          >
            {example.complexity}
          </span>
          {example.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Input size control */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Input Size (n): <span className="font-bold text-blue-600">{inputSize}</span>
          </label>
          <Slider
            value={[inputSize]}
            onValueChange={(value) => setInputSize(value[0])}
            min={2}
            max={example.complexity === 'O(2^n)' ? 8 : 20}
            step={1}
            className="w-full max-w-xs"
            disabled={isRunning}
          />
        </div>

        {/* Code display */}
        <div className="border rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900">
          <div className="bg-gray-200 dark:bg-gray-800 px-3 py-1 text-sm font-medium">
            Java Code
          </div>
          <div className="p-2">
            {getHighlightedCode()}
          </div>
        </div>

        {/* Current step info */}
        {currentStepInfo && (
          <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
            <div className="font-medium text-blue-800 dark:text-blue-200">
              Step {currentStep}: {currentStepInfo.description}
            </div>
            {currentStepInfo.variables && (
              <div className="text-sm text-blue-600 dark:text-blue-300 mt-1">
                Variables: {Object.entries(currentStepInfo.variables)
                  .map(([k, v]) => `${k}=${v}`)
                  .join(', ')}
              </div>
            )}
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center gap-2">
          {isRunning ? (
            <Button onClick={handlePause} variant="outline" size="sm">
              <Pause className="w-4 h-4 mr-1" /> Pause
            </Button>
          ) : (
            <Button onClick={handlePlay} size="sm" disabled={isComplete}>
              <Play className="w-4 h-4 mr-1" /> {isComplete ? 'Complete' : 'Run'}
            </Button>
          )}
          <Button onClick={handleStepForward} variant="outline" size="sm" disabled={isRunning || isComplete}>
            <FastForward className="w-4 h-4 mr-1" /> Step
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

        {/* Operation counter */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Actual Operations</div>
            <div className="text-3xl font-bold text-blue-600">{operationCount}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Predicted {example.complexity}</div>
            <div className="text-3xl font-bold text-green-600">{Math.round(predictedOperations)}</div>
          </div>
        </div>

        {/* Explanation */}
        <div className="text-sm text-gray-600 dark:text-gray-400 p-3 bg-gray-50 dark:bg-gray-900 rounded">
          <strong>Why {example.complexity}?</strong> {example.explanation}
        </div>
      </CardContent>
    </Card>
  );
}
