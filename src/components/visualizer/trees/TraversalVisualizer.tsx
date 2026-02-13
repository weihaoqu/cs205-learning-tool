'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { TreeRenderer } from './TreeRenderer';
import {
  buildSampleTree,
  generateTraversalSteps,
  type TreeNode,
  type TraversalStep,
  type TraversalType,
} from '@/lib/algorithms/trees';

const TRAVERSAL_INFO: Record<TraversalType, { name: string; order: string; color: string }> = {
  inorder: { name: 'In-Order', order: 'Left → Root → Right', color: '#3b82f6' },
  preorder: { name: 'Pre-Order', order: 'Root → Left → Right', color: '#8b5cf6' },
  postorder: { name: 'Post-Order', order: 'Left → Right → Root', color: '#f59e0b' },
  levelorder: { name: 'Level-Order (BFS)', order: 'Level by level', color: '#22c55e' },
};

export function TraversalVisualizer() {
  const [tree] = useState<TreeNode>(buildSampleTree);
  const [traversalType, setTraversalType] = useState<TraversalType>('inorder');
  const [steps, setSteps] = useState<TraversalStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);

  useEffect(() => {
    const newSteps = generateTraversalSteps(traversalType, tree);
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [traversalType, tree]);

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

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  const step = steps[currentStep];
  const visitedSet = new Set(step?.visited ?? []);
  const highlightSet = new Set(step?.highlightNodeValue !== null && step?.highlightNodeValue !== undefined ? [step.highlightNodeValue] : []);

  const isAtStart = currentStep === 0;
  const isAtEnd = currentStep >= steps.length - 1;
  const progress = steps.length > 0 ? ((currentStep + 1) / steps.length) * 100 : 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <CardTitle className="text-lg">Tree Traversal Visualizer</CardTitle>
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(TRAVERSAL_INFO) as TraversalType[]).map((t) => (
              <Button
                key={t}
                size="sm"
                variant={traversalType === t ? 'default' : 'outline'}
                onClick={() => setTraversalType(t)}
                disabled={isPlaying}
                style={traversalType === t ? { backgroundColor: TRAVERSAL_INFO[t].color } : undefined}
              >
                {TRAVERSAL_INFO[t].name}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Traversal order */}
        <div className="text-sm text-muted-foreground text-center">
          Order: <strong>{TRAVERSAL_INFO[traversalType].order}</strong>
        </div>

        {/* Tree */}
        <div className="border rounded-lg bg-white dark:bg-gray-950 p-2">
          <TreeRenderer
            root={tree}
            highlightValues={highlightSet}
            visitedValues={visitedSet}
          />
        </div>

        {/* Visited output */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium">Output:</span>
          <div className="flex gap-1 flex-wrap">
            {(step?.visited ?? []).map((v, i) => (
              <span
                key={i}
                className="inline-block px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-sm font-mono"
              >
                {v}
              </span>
            ))}
          </div>
        </div>

        {/* Call stack / Queue */}
        <div className="p-3 bg-muted/50 rounded-lg">
          <span className="text-sm font-medium">
            {traversalType === 'levelorder' ? 'Queue' : 'Call Stack'}:
          </span>
          <div className="flex flex-col gap-1 mt-1">
            {(step?.stack ?? []).map((frame, i) => (
              <span
                key={i}
                className="text-xs font-mono px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded"
              >
                {frame}
              </span>
            ))}
          </div>
        </div>

        {/* Message */}
        <div className="text-center text-sm text-muted-foreground h-6">
          {step?.message ?? 'Ready to traverse'}
        </div>

        {/* Progress */}
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all duration-200" style={{ width: `${progress}%` }} />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={handleReset} disabled={isAtStart}>{'\u23EE'}</Button>
            <Button size="sm" variant="outline" onClick={() => setCurrentStep(p => Math.max(p - 1, 0))} disabled={isAtStart}>{'\u23EA'}</Button>
            <Button size="sm" onClick={() => isPlaying ? setIsPlaying(false) : setIsPlaying(true)} disabled={steps.length === 0} className="w-12">
              {isPlaying ? '\u23F8' : '\u25B6'}
            </Button>
            <Button size="sm" variant="outline" onClick={() => setCurrentStep(p => Math.min(p + 1, steps.length - 1))} disabled={isAtEnd}>{'\u23E9'}</Button>
          </div>
          <div className="text-sm text-muted-foreground">
            Step {steps.length > 0 ? currentStep + 1 : 0} of {steps.length}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Speed:</span>
            <Slider value={[2000 - speed]} onValueChange={([v]) => setSpeed(2000 - v)} min={0} max={1900} step={50} className="w-24" />
            <span className="text-xs text-muted-foreground w-14">{speed}ms</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground justify-center">
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-blue-200 border-2 border-blue-500" /><span>Unvisited</span></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-yellow-200 border-2 border-yellow-500" /><span>Current</span></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-green-200 border-2 border-green-500" /><span>Visited</span></div>
        </div>
      </CardContent>
    </Card>
  );
}
