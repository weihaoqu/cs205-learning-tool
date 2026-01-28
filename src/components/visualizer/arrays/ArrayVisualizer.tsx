'use client';

import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrayElement } from './ArrayElement';

interface ArrayVisualizerProps {
  initialArray?: number[];
  maxElements?: number;
  elementWidth?: number;
  elementHeight?: number;
  highlightedIndices?: number[];
  comparisonIndices?: [number, number] | null;
  sortedIndices?: number[];
  showIndices?: boolean;
  interactive?: boolean;
  onArrayChange?: (array: number[]) => void;
}

export function ArrayVisualizer({
  initialArray = [64, 34, 25, 12, 22, 11, 90],
  maxElements = 50,
  elementWidth = 50,
  elementHeight = 50,
  highlightedIndices = [],
  comparisonIndices = null,
  sortedIndices = [],
  showIndices = true,
  interactive = false,
  onArrayChange,
}: ArrayVisualizerProps) {
  const [array, setArray] = useState<number[]>(initialArray);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const highlightSet = new Set(highlightedIndices);
  const sortedSet = new Set(sortedIndices);

  const handleAddElement = useCallback(() => {
    if (array.length >= maxElements) return;
    const newValue = Math.floor(Math.random() * 100);
    const newArray = [...array, newValue];
    setArray(newArray);
    onArrayChange?.(newArray);
  }, [array, maxElements, onArrayChange]);

  const handleRemoveElement = useCallback(() => {
    if (array.length === 0) return;
    const newArray = array.slice(0, -1);
    setArray(newArray);
    onArrayChange?.(newArray);
  }, [array, onArrayChange]);

  const handleRandomize = useCallback(() => {
    const newArray = array.map(() => Math.floor(Math.random() * 100));
    setArray(newArray);
    onArrayChange?.(newArray);
  }, [array, onArrayChange]);

  const handleElementClick = useCallback((index: number) => {
    if (!interactive) return;
    setSelectedIndex(selectedIndex === index ? null : index);
  }, [interactive, selectedIndex]);

  const getElementState = (index: number) => {
    if (comparisonIndices && (comparisonIndices[0] === index || comparisonIndices[1] === index)) {
      return 'comparing';
    }
    if (sortedSet.has(index)) {
      return 'sorted';
    }
    if (highlightSet.has(index)) {
      return 'highlighted';
    }
    if (selectedIndex === index) {
      return 'selected';
    }
    return 'default';
  };

  const svgWidth = Math.max(array.length * (elementWidth + 8) + 40, 300);
  const svgHeight = elementHeight + (showIndices ? 40 : 20);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Array</CardTitle>
          {interactive && (
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handleAddElement}>
                Add
              </Button>
              <Button size="sm" variant="outline" onClick={handleRemoveElement}>
                Remove
              </Button>
              <Button size="sm" variant="outline" onClick={handleRandomize}>
                Randomize
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <svg
            width={svgWidth}
            height={svgHeight}
            className="min-w-full"
          >
            <g transform={`translate(20, 10)`}>
              {array.map((value, index) => (
                <ArrayElement
                  key={`${index}-${value}`}
                  value={value}
                  index={index}
                  x={index * (elementWidth + 8)}
                  y={0}
                  width={elementWidth}
                  height={elementHeight}
                  state={getElementState(index)}
                  showIndex={showIndices}
                  onClick={() => handleElementClick(index)}
                  interactive={interactive}
                />
              ))}
            </g>
          </svg>
        </div>

        <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-500" />
            <span>Default</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-500" />
            <span>Comparing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500" />
            <span>Sorted</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
