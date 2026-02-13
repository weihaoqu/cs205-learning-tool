'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { GraphCanvas } from './GraphCanvas';
import {
  generateBFSSteps,
  generateDFSSteps,
  generateDijkstraSteps,
  PRESET_GRAPHS,
  type Graph,
  type GraphStep,
} from '@/lib/algorithms/graphs';

interface GraphAlgorithmVisualizerProps {
  algorithm: 'bfs' | 'dfs' | 'dijkstra';
}

const ALGO_INFO = {
  bfs: { name: 'BFS', ds: 'Queue', preset: 'simple' as const },
  dfs: { name: 'DFS', ds: 'Stack', preset: 'simple' as const },
  dijkstra: { name: "Dijkstra's", ds: 'Priority Queue', preset: 'weighted' as const },
};

export function GraphAlgorithmVisualizer({ algorithm }: GraphAlgorithmVisualizerProps) {
  const info = ALGO_INFO[algorithm];
  const [graph] = useState<Graph>(PRESET_GRAPHS[info.preset]);
  const [startNode, setStartNode] = useState('A');
  const [steps, setSteps] = useState<GraphStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);

  useEffect(() => {
    let newSteps: GraphStep[];
    switch (algorithm) {
      case 'bfs': newSteps = generateBFSSteps(graph, startNode); break;
      case 'dfs': newSteps = generateDFSSteps(graph, startNode); break;
      case 'dijkstra': newSteps = generateDijkstraSteps(graph, startNode); break;
    }
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [algorithm, graph, startNode]);

  useEffect(() => {
    if (!isPlaying) return;
    if (currentStep >= steps.length - 1) { setIsPlaying(false); return; }
    const timer = setTimeout(() => {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, speed]);

  const handleReset = useCallback(() => { setCurrentStep(0); setIsPlaying(false); }, []);

  const step = steps[currentStep];
  const isAtStart = currentStep === 0;
  const isAtEnd = currentStep >= steps.length - 1;
  const progress = steps.length > 0 ? ((currentStep + 1) / steps.length) * 100 : 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <CardTitle className="text-lg">{info.name} Visualizer</CardTitle>
          <div className="flex gap-2 items-center">
            <span className="text-sm text-muted-foreground">Start:</span>
            {graph.nodes.map(n => (
              <Button
                key={n.id}
                size="sm"
                variant={startNode === n.id ? 'default' : 'outline'}
                onClick={() => setStartNode(n.id)}
                disabled={isPlaying}
                className="w-8 h-8 p-0"
              >
                {n.id}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Graph */}
        <div className="border rounded-lg bg-white dark:bg-gray-950 p-2">
          <GraphCanvas
            graph={graph}
            nodeStates={step?.nodeStates}
            edgeHighlight={step?.edgeHighlight}
            currentNode={step?.currentNode}
            distances={algorithm === 'dijkstra' ? step?.distances : undefined}
          />
        </div>

        {/* Data structure + visited */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-3 bg-muted/50 rounded-lg">
            <span className="text-sm font-medium">{info.ds}:</span>
            <div className="flex gap-1 mt-1 flex-wrap">
              {(step?.dataStructure ?? []).map((item, i) => (
                <span key={i} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded text-xs font-mono">
                  {item}
                </span>
              ))}
              {(step?.dataStructure ?? []).length === 0 && <span className="text-xs text-muted-foreground">(empty)</span>}
            </div>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg">
            <span className="text-sm font-medium">Visited:</span>
            <div className="flex gap-1 mt-1 flex-wrap">
              {(step?.visited ?? []).map((v, i) => (
                <span key={i} className="px-2 py-1 bg-green-100 dark:bg-green-900 rounded text-xs font-mono">
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Distance table for Dijkstra */}
        {algorithm === 'dijkstra' && step?.distances && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b">
                <th className="p-2 text-left">Node</th>
                {graph.nodes.map(n => <th key={n.id} className="p-2 text-center">{n.id}</th>)}
              </tr></thead>
              <tbody><tr>
                <td className="p-2 font-medium">Distance</td>
                {graph.nodes.map(n => (
                  <td key={n.id} className={`p-2 text-center font-mono ${step.currentNode === n.id ? 'bg-blue-100 dark:bg-blue-900' : ''}`}>
                    {step.distances![n.id] === Infinity ? '∞' : step.distances![n.id]}
                  </td>
                ))}
              </tr></tbody>
            </table>
          </div>
        )}

        {/* Message */}
        <div className="text-center text-sm text-muted-foreground h-6">{step?.message ?? 'Ready'}</div>

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
          <div className="text-sm text-muted-foreground">Step {steps.length > 0 ? currentStep + 1 : 0} of {steps.length}</div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Speed:</span>
            <Slider value={[2000 - speed]} onValueChange={([v]) => setSpeed(2000 - v)} min={0} max={1900} step={50} className="w-24" />
            <span className="text-xs text-muted-foreground w-14">{speed}ms</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground justify-center">
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-gray-200 border border-gray-400" /> Unvisited</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-yellow-200 border border-yellow-500" /> Frontier</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-blue-200 border border-blue-500" /> Current</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-green-200 border border-green-500" /> Visited</div>
        </div>
      </CardContent>
    </Card>
  );
}
