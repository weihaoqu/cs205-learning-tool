'use client';

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { checkBalancedParentheses } from '@/lib/algorithms/stack-queue/stack';
import type { ParenthesesStep } from '@/lib/algorithms/stack-queue/types';

export function BalancedParenthesesVisualizer() {
  const [expression, setExpression] = useState('');
  const [steps, setSteps] = useState<ParenthesesStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [result, setResult] = useState<{ balanced: boolean; message: string } | null>(null);

  const exampleExpressions = [
    '{[()]}',
    '((()))',
    '{[(])}',
    '([)]',
    '((())',
    'a + (b * c) - {d / [e + f]}',
  ];

  const handleCheck = useCallback(() => {
    if (!expression.trim()) return;

    const newSteps = checkBalancedParentheses(expression);
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);

    // Determine result
    const lastStep = newSteps[newSteps.length - 1];
    const isBalanced = lastStep?.isValid !== false &&
                       (lastStep?.stack.length === 0 || newSteps.every(s => s.isValid));

    if (isBalanced && newSteps.every(s => s.action !== 'mismatch')) {
      setResult({ balanced: true, message: 'Expression is balanced!' });
    } else {
      const mismatchStep = newSteps.find(s => !s.isValid);
      setResult({
        balanced: false,
        message: mismatchStep?.explanation || 'Expression is not balanced'
      });
    }
  }, [expression]);

  const handlePlay = useCallback(() => {
    if (currentStep >= steps.length - 1) {
      setCurrentStep(0);
    }
    setIsPlaying(true);
  }, [currentStep, steps.length]);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleStepForward = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, steps.length]);

  const handleStepBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  // Auto-play effect
  React.useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else if (isPlaying && currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, steps.length]);

  const currentStepData = steps[currentStep];

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Balanced Parentheses Checker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              type="text"
              placeholder="Enter expression with brackets: {[()]}"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
              className="font-mono"
            />
            <Button onClick={handleCheck} disabled={!expression.trim()}>
              Check
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground mr-2">Try:</span>
            {exampleExpressions.map((expr, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setExpression(expr)}
                className="font-mono text-xs"
              >
                {expr}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {steps.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Expression with highlight */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Expression</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-mono text-2xl flex flex-wrap gap-1 mb-4">
                {expression.split('').map((char, index) => {
                  const isCurrentChar = currentStepData?.index === index;
                  const stepForChar = steps.find(s => s.index === index);
                  const isBracket = '()[]{}' .includes(char);

                  return (
                    <span
                      key={index}
                      className={`
                        px-1 rounded transition-all duration-200
                        ${isCurrentChar ? 'bg-yellow-300 scale-125' : ''}
                        ${stepForChar?.action === 'match' && !isCurrentChar ? 'bg-green-200' : ''}
                        ${stepForChar?.action === 'mismatch' ? 'bg-red-200' : ''}
                        ${!isBracket ? 'text-gray-400' : 'font-bold'}
                      `}
                    >
                      {char}
                    </span>
                  );
                })}
              </div>

              {/* Result */}
              {result && (
                <div className={`p-3 rounded-lg ${
                  result.balanced ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  <div className="font-bold">
                    {result.balanced ? '✓ Balanced' : '✗ Not Balanced'}
                  </div>
                  <div className="text-sm">{result.message}</div>
                </div>
              )}

              {/* Controls */}
              <div className="flex gap-2 mt-4">
                <Button onClick={handleStepBack} variant="outline" size="sm" disabled={currentStep === 0}>
                  ← Back
                </Button>
                {isPlaying ? (
                  <Button onClick={handlePause} variant="outline" size="sm">
                    Pause
                  </Button>
                ) : (
                  <Button onClick={handlePlay} variant="outline" size="sm" disabled={steps.length === 0}>
                    Play
                  </Button>
                )}
                <Button onClick={handleStepForward} variant="outline" size="sm" disabled={currentStep >= steps.length - 1}>
                  Next →
                </Button>
                <Button onClick={handleReset} variant="ghost" size="sm">
                  Reset
                </Button>
              </div>

              <div className="text-sm text-muted-foreground mt-2">
                Step {currentStep + 1} of {steps.length}
              </div>
            </CardContent>
          </Card>

          {/* Stack Visualization */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Stack State</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Current action explanation */}
              {currentStepData && (
                <div className={`p-3 rounded-lg mb-4 ${
                  currentStepData.action === 'push' ? 'bg-blue-100 text-blue-800' :
                  currentStepData.action === 'match' ? 'bg-green-100 text-green-800' :
                  currentStepData.action === 'mismatch' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  <div className="font-mono font-bold mb-1">
                    {currentStepData.action === 'push' && `push('${currentStepData.char}')`}
                    {currentStepData.action === 'match' && `pop() - matched '${currentStepData.char}'`}
                    {currentStepData.action === 'mismatch' && `Error at '${currentStepData.char}'`}
                    {currentStepData.action === 'skip' && `skip '${currentStepData.char}'`}
                  </div>
                  <div className="text-sm">{currentStepData.explanation}</div>
                </div>
              )}

              {/* Stack visual */}
              <div className="border-2 border-gray-300 rounded-lg p-4 min-h-[200px] relative">
                <div className="absolute -left-8 top-0 text-xs text-muted-foreground">top →</div>

                <div className="flex flex-col-reverse gap-1">
                  {currentStepData?.stack.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                      Stack is empty
                    </div>
                  ) : (
                    currentStepData?.stack.map((char, index) => {
                      const isTop = index === currentStepData.stack.length - 1;
                      return (
                        <div
                          key={index}
                          className={`
                            h-12 rounded-lg flex items-center justify-center font-mono text-2xl
                            ${isTop ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}
                          `}
                        >
                          {char}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="text-sm text-muted-foreground mt-2 text-center">
                Stack size: {currentStepData?.stack.length || 0}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step History */}
      {steps.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Step-by-Step Trace</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Step</th>
                    <th className="text-left p-2">Char</th>
                    <th className="text-left p-2">Action</th>
                    <th className="text-left p-2">Stack</th>
                    <th className="text-left p-2">Explanation</th>
                  </tr>
                </thead>
                <tbody>
                  {steps.map((step, index) => (
                    <tr
                      key={index}
                      className={`border-b ${
                        index === currentStep ? 'bg-yellow-100' : ''
                      } ${!step.isValid ? 'bg-red-50' : ''}`}
                    >
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2 font-mono font-bold">{step.char || '-'}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          step.action === 'push' ? 'bg-blue-100 text-blue-800' :
                          step.action === 'match' ? 'bg-green-100 text-green-800' :
                          step.action === 'mismatch' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {step.action}
                        </span>
                      </td>
                      <td className="p-2 font-mono">[{step.stack.join(', ')}]</td>
                      <td className="p-2 text-muted-foreground">{step.explanation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
