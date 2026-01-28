'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  generateTraversalSteps,
  createMatrix,
  TRAVERSAL_INFO,
  type TraversalType,
  type TraversalStep,
} from '@/lib/algorithms/arrays2d';
import { TraversalSelector } from './TraversalSelector';

interface Array2DVisualizerProps {
  initialRows?: number;
  initialCols?: number;
  initialTraversal?: TraversalType;
}

const cellSize = 50;
const cellGap = 4;

export function Array2DVisualizer({
  initialRows = 4,
  initialCols = 5,
  initialTraversal = 'row-major',
}: Array2DVisualizerProps) {
  const [matrix, setMatrix] = useState<number[][]>(() =>
    createMatrix(initialRows, initialCols, 'sequential')
  );
  const [traversalType, setTraversalType] = useState<TraversalType>(initialTraversal);
  const [steps, setSteps] = useState<TraversalStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(300);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);

  const rows = matrix.length;
  const cols = matrix[0]?.length ?? 0;

  // Generate steps when matrix or traversal type changes
  useEffect(() => {
    const newSteps = generateTraversalSteps(traversalType, matrix);
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [matrix, traversalType]);

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

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case ' ':
          e.preventDefault();
          if (isPlaying) {
            setIsPlaying(false);
          } else if (currentStep >= steps.length - 1) {
            setCurrentStep(0);
            setTimeout(() => setIsPlaying(true), 50);
          } else {
            setIsPlaying(true);
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1);
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
          }
          break;
        case 'r':
        case 'R':
          e.preventDefault();
          setCurrentStep(0);
          setIsPlaying(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, currentStep, steps.length]);

  const currentStepData = steps[currentStep];
  const visitedCells = new Set(
    currentStepData?.visitedCells.map(([r, c]) => `${r},${c}`) ?? []
  );
  const currentCell = currentStepData?.type === 'visit'
    ? `${currentStepData.row},${currentStepData.col}`
    : null;

  const handleRandomize = useCallback(() => {
    setMatrix(createMatrix(rows, cols, 'random'));
  }, [rows, cols]);

  const handleReset = useCallback(() => {
    setMatrix(createMatrix(rows, cols, 'sequential'));
  }, [rows, cols]);

  const handleResize = useCallback((newRows: number, newCols: number) => {
    setMatrix(createMatrix(newRows, newCols, 'sequential'));
  }, []);

  const getCellColor = (row: number, col: number) => {
    const key = `${row},${col}`;

    if (currentCell === key) {
      return '#ef4444'; // red - current cell
    }
    if (visitedCells.has(key)) {
      return '#22c55e'; // green - visited
    }
    if (selectedCell && selectedCell[0] === row && selectedCell[1] === col) {
      return '#3b82f6'; // blue - selected
    }
    return '#64748b'; // slate - default
  };

  const progress = steps.length > 0 ? ((currentStep + 1) / steps.length) * 100 : 0;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <CardTitle className="text-lg">
              {TRAVERSAL_INFO[traversalType].name}
            </CardTitle>
            <div className="flex gap-2 flex-wrap">
              <TraversalSelector
                value={traversalType}
                onChange={setTraversalType}
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
              <Button
                size="sm"
                variant="outline"
                onClick={handleReset}
                disabled={isPlaying}
              >
                Sequential
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Matrix Size Controls */}
          <div className="flex items-center gap-4 mb-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Rows:</span>
              <select
                value={rows}
                onChange={(e) => handleResize(Number(e.target.value), cols)}
                disabled={isPlaying}
                className="h-8 rounded-md border border-input bg-background px-2 text-sm"
              >
                {[2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Cols:</span>
              <select
                value={cols}
                onChange={(e) => handleResize(rows, Number(e.target.value))}
                disabled={isPlaying}
                className="h-8 rounded-md border border-input bg-background px-2 text-sm"
              >
                {[2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Matrix Visualization */}
          <div className="flex justify-center mb-4 overflow-x-auto">
            <div className="inline-block">
              {/* Column indices */}
              <div className="flex ml-10 mb-1">
                {Array.from({ length: cols }).map((_, j) => (
                  <div
                    key={j}
                    className="text-xs text-muted-foreground text-center"
                    style={{ width: cellSize, marginRight: cellGap }}
                  >
                    [{j}]
                  </div>
                ))}
              </div>

              {/* Matrix rows */}
              {matrix.map((row, i) => (
                <div key={i} className="flex items-center mb-1">
                  {/* Row index */}
                  <div
                    className="text-xs text-muted-foreground text-right pr-2"
                    style={{ width: 36 }}
                  >
                    [{i}]
                  </div>

                  {/* Cells */}
                  {row.map((value, j) => (
                    <motion.div
                      key={`${i}-${j}`}
                      className="flex items-center justify-center rounded-md cursor-pointer font-mono font-bold text-white"
                      style={{
                        width: cellSize,
                        height: cellSize,
                        marginRight: cellGap,
                      }}
                      animate={{
                        backgroundColor: getCellColor(i, j),
                        scale: currentCell === `${i},${j}` ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setSelectedCell([i, j])}
                      whileHover={{ scale: 1.05 }}
                    >
                      {value}
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Step message */}
          <div className="text-center text-sm text-muted-foreground mb-4 h-6">
            {currentStepData?.message ?? 'Ready to start traversal'}
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-primary transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => { setCurrentStep(0); setIsPlaying(false); }}
                disabled={currentStep === 0}
                title="Reset (R)"
              >
                ⏮
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
                disabled={currentStep === 0}
                title="Step Back (←)"
              >
                ⏪
              </Button>
              <Button
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                disabled={steps.length === 0}
                title="Play/Pause (Space)"
                className="w-12"
              >
                {isPlaying ? '⏸' : '▶'}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))}
                disabled={currentStep >= steps.length - 1}
                title="Step Forward (→)"
              >
                ⏩
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              Step {steps.length > 0 ? currentStep + 1 : 0} of {steps.length}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Speed:</span>
              <Slider
                value={[1000 - speed]}
                onValueChange={([value]) => setSpeed(1000 - value)}
                min={0}
                max={900}
                step={50}
                className="w-24"
              />
              <span className="text-xs text-muted-foreground w-14">
                {speed}ms
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground justify-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#64748b' }} />
              <span>Unvisited</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#ef4444' }} />
              <span>Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#22c55e' }} />
              <span>Visited</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Traversal Info */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Traversal Info</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            {TRAVERSAL_INFO[traversalType].description}
          </p>
          <div className="flex gap-8 text-sm">
            <div>
              <div className="font-medium">Time Complexity</div>
              <div className="text-muted-foreground">
                {TRAVERSAL_INFO[traversalType].complexity}
              </div>
            </div>
            <div>
              <div className="font-medium">Matrix Size</div>
              <div className="text-muted-foreground">
                {rows} × {cols} = {rows * cols} cells
              </div>
            </div>
            <div>
              <div className="font-medium">Cells Visited</div>
              <div className="text-muted-foreground">
                {visitedCells.size} / {rows * cols}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
