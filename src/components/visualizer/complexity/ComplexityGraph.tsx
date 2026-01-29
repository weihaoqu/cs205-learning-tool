'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import {
  ComplexityType,
  complexityFunctions,
  complexityInfo,
  formatNumber
} from '@/lib/algorithms/complexity';

interface ComplexityGraphProps {
  initialN?: number;
  showControls?: boolean;
  selectedComplexities?: ComplexityType[];
}

const ALL_COMPLEXITIES: ComplexityType[] = [
  'O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)'
];

export default function ComplexityGraph({
  initialN = 50,
  showControls = true,
  selectedComplexities = ALL_COMPLEXITIES
}: ComplexityGraphProps) {
  const [n, setN] = useState(initialN);
  const [visibleComplexities, setVisibleComplexities] = useState<Set<ComplexityType>>(
    new Set(selectedComplexities)
  );

  // Calculate graph dimensions
  const graphWidth = 600;
  const graphHeight = 400;
  const padding = { top: 20, right: 20, bottom: 40, left: 60 };
  const plotWidth = graphWidth - padding.left - padding.right;
  const plotHeight = graphHeight - padding.top - padding.bottom;

  // Generate data points for visible complexities
  const graphData = useMemo(() => {
    const points: Record<ComplexityType, { x: number; y: number }[]> = {
      'O(1)': [],
      'O(log n)': [],
      'O(n)': [],
      'O(n log n)': [],
      'O(n²)': [],
      'O(2^n)': [],
    };

    // Determine max Y value for scaling
    let maxY = 0;
    const numPoints = 100;

    for (let i = 1; i <= numPoints; i++) {
      const xVal = Math.floor((i / numPoints) * n);
      if (xVal < 1) continue;

      ALL_COMPLEXITIES.forEach(complexity => {
        if (visibleComplexities.has(complexity)) {
          const yVal = complexityFunctions[complexity](xVal);
          // Cap exponential to prevent graph overflow
          const cappedY = complexity === 'O(2^n)' ? Math.min(yVal, n * n * 10) : yVal;
          if (cappedY > maxY) maxY = cappedY;
          points[complexity].push({ x: xVal, y: cappedY });
        }
      });
    }

    return { points, maxY: Math.max(maxY, 1) };
  }, [n, visibleComplexities]);

  // Convert data point to SVG coordinates
  const toSvgX = (x: number) => padding.left + (x / n) * plotWidth;
  const toSvgY = (y: number) => padding.top + plotHeight - (y / graphData.maxY) * plotHeight;

  // Generate SVG path for a complexity
  const getPath = (complexity: ComplexityType): string => {
    const pts = graphData.points[complexity];
    if (pts.length === 0) return '';

    return pts.map((pt, i) => {
      const x = toSvgX(pt.x);
      const y = toSvgY(pt.y);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  // Toggle complexity visibility
  const toggleComplexity = (complexity: ComplexityType) => {
    const newSet = new Set(visibleComplexities);
    if (newSet.has(complexity)) {
      newSet.delete(complexity);
    } else {
      newSet.add(complexity);
    }
    setVisibleComplexities(newSet);
  };

  // Generate Y-axis labels
  const yLabels = useMemo(() => {
    const labels = [];
    const step = graphData.maxY / 5;
    for (let i = 0; i <= 5; i++) {
      labels.push(Math.round(step * i));
    }
    return labels;
  }, [graphData.maxY]);

  // Generate X-axis labels
  const xLabels = useMemo(() => {
    const labels = [];
    const step = n / 5;
    for (let i = 0; i <= 5; i++) {
      labels.push(Math.round(step * i));
    }
    return labels;
  }, [n]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Complexity Growth Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Input size slider */}
        {showControls && (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Input Size (n): <span className="font-bold text-blue-600">{n}</span>
            </label>
            <Slider
              value={[n]}
              onValueChange={(value) => setN(value[0])}
              min={10}
              max={1000}
              step={10}
              className="w-full max-w-md"
            />
          </div>
        )}

        {/* Complexity toggles */}
        {showControls && (
          <div className="flex flex-wrap gap-2 mb-4">
            {ALL_COMPLEXITIES.map(complexity => (
              <button
                key={complexity}
                onClick={() => toggleComplexity(complexity)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  visibleComplexities.has(complexity)
                    ? 'text-white shadow-md'
                    : 'bg-gray-200 text-gray-500'
                }`}
                style={{
                  backgroundColor: visibleComplexities.has(complexity)
                    ? complexityInfo[complexity].color
                    : undefined
                }}
              >
                {complexity}
              </button>
            ))}
          </div>
        )}

        {/* SVG Graph */}
        <div className="overflow-x-auto">
          <svg
            width={graphWidth}
            height={graphHeight}
            className="bg-white border rounded"
          >
            {/* Grid lines */}
            {yLabels.map((label, i) => (
              <g key={`y-${i}`}>
                <line
                  x1={padding.left}
                  y1={toSvgY(label)}
                  x2={graphWidth - padding.right}
                  y2={toSvgY(label)}
                  stroke="#e5e7eb"
                  strokeDasharray="4,4"
                />
                <text
                  x={padding.left - 10}
                  y={toSvgY(label)}
                  textAnchor="end"
                  alignmentBaseline="middle"
                  className="text-xs fill-gray-500"
                >
                  {formatNumber(label)}
                </text>
              </g>
            ))}

            {/* X-axis labels */}
            {xLabels.map((label, i) => (
              <text
                key={`x-${i}`}
                x={toSvgX(label)}
                y={graphHeight - 10}
                textAnchor="middle"
                className="text-xs fill-gray-500"
              >
                {label}
              </text>
            ))}

            {/* Axis labels */}
            <text
              x={graphWidth / 2}
              y={graphHeight - 2}
              textAnchor="middle"
              className="text-sm fill-gray-700 font-medium"
            >
              Input Size (n)
            </text>
            <text
              x={15}
              y={graphHeight / 2}
              textAnchor="middle"
              transform={`rotate(-90, 15, ${graphHeight / 2})`}
              className="text-sm fill-gray-700 font-medium"
            >
              Operations
            </text>

            {/* Complexity lines */}
            {ALL_COMPLEXITIES.map(complexity => (
              visibleComplexities.has(complexity) && (
                <path
                  key={complexity}
                  d={getPath(complexity)}
                  fill="none"
                  stroke={complexityInfo[complexity].color}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )
            ))}

            {/* Axes */}
            <line
              x1={padding.left}
              y1={padding.top}
              x2={padding.left}
              y2={graphHeight - padding.bottom}
              stroke="#374151"
              strokeWidth={2}
            />
            <line
              x1={padding.left}
              y1={graphHeight - padding.bottom}
              x2={graphWidth - padding.right}
              y2={graphHeight - padding.bottom}
              stroke="#374151"
              strokeWidth={2}
            />
          </svg>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4">
          {ALL_COMPLEXITIES.filter(c => visibleComplexities.has(c)).map(complexity => (
            <div key={complexity} className="flex items-center gap-2">
              <div
                className="w-4 h-1 rounded"
                style={{ backgroundColor: complexityInfo[complexity].color }}
              />
              <span className="text-sm">
                {complexity} - {complexityInfo[complexity].name}
              </span>
            </div>
          ))}
        </div>

        {/* Values at current n */}
        <div className="mt-6">
          <h4 className="font-medium mb-2">Operations at n = {n}:</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {ALL_COMPLEXITIES.filter(c => visibleComplexities.has(c)).map(complexity => (
              <div
                key={complexity}
                className="p-2 rounded text-white text-sm"
                style={{ backgroundColor: complexityInfo[complexity].color }}
              >
                <span className="font-medium">{complexity}:</span>{' '}
                {formatNumber(complexityFunctions[complexity](n))}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
