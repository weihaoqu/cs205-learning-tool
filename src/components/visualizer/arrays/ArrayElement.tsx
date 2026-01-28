'use client';

import { motion } from 'motion/react';

type ElementState = 'default' | 'comparing' | 'swapping' | 'sorted' | 'highlighted' | 'selected' | 'pivot';

interface ArrayElementProps {
  value: number;
  index: number;
  x: number;
  y: number;
  width: number;
  height: number;
  state?: ElementState;
  showIndex?: boolean;
  onClick?: () => void;
  interactive?: boolean;
}

const stateColors: Record<ElementState, string> = {
  default: '#3b82f6',      // blue-500
  comparing: '#eab308',    // yellow-500
  swapping: '#f97316',     // orange-500
  sorted: '#22c55e',       // green-500
  highlighted: '#a855f7',  // purple-500
  selected: '#06b6d4',     // cyan-500
  pivot: '#ef4444',        // red-500
};

const stateBorderColors: Record<ElementState, string> = {
  default: '#2563eb',      // blue-600
  comparing: '#ca8a04',    // yellow-600
  swapping: '#ea580c',     // orange-600
  sorted: '#16a34a',       // green-600
  highlighted: '#9333ea',  // purple-600
  selected: '#0891b2',     // cyan-600
  pivot: '#dc2626',        // red-600
};

export function ArrayElement({
  value,
  index,
  x,
  y,
  width,
  height,
  state = 'default',
  showIndex = true,
  onClick,
  interactive = false,
}: ArrayElementProps) {
  const fillColor = stateColors[state];
  const strokeColor = stateBorderColors[state];

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        x,
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25,
        x: { type: 'spring', stiffness: 200, damping: 20 }
      }}
      onClick={onClick}
      style={{ cursor: interactive ? 'pointer' : 'default' }}
    >
      {/* Element box */}
      <motion.rect
        x={0}
        y={y}
        width={width}
        height={height}
        rx={6}
        ry={6}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={2}
        animate={{ fill: fillColor, stroke: strokeColor }}
        transition={{ duration: 0.3 }}
        whileHover={interactive ? { scale: 1.05 } : undefined}
        whileTap={interactive ? { scale: 0.95 } : undefined}
      />

      {/* Value text */}
      <motion.text
        x={width / 2}
        y={y + height / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize={width > 40 ? 16 : 12}
        fontWeight="bold"
        style={{ userSelect: 'none', pointerEvents: 'none' }}
      >
        {value}
      </motion.text>

      {/* Index label */}
      {showIndex && (
        <text
          x={width / 2}
          y={y + height + 16}
          textAnchor="middle"
          fill="currentColor"
          fontSize={12}
          className="text-muted-foreground"
          style={{ userSelect: 'none' }}
        >
          {index}
        </text>
      )}
    </motion.g>
  );
}
