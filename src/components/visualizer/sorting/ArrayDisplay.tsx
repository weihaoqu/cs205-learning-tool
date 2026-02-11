'use client';

import { motion } from 'motion/react';

interface ArrayDisplayProps {
  array: number[];
  comparing?: number[];
  swapping?: number[];
  sorted?: number[];
  selected?: number[];
  onElementClick?: (index: number) => void;
  interactive?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-10 h-10 text-sm',
  md: 'w-12 h-12 text-base',
  lg: 'w-14 h-14 text-lg',
};

function getElementColor(
  index: number,
  comparing: number[],
  swapping: number[],
  sorted: number[],
  selected: number[]
): string {
  if (swapping.includes(index)) return 'bg-orange-500 text-white';
  if (comparing.includes(index)) return 'bg-yellow-500 text-white';
  if (sorted.includes(index)) return 'bg-green-500 text-white';
  if (selected.includes(index)) return 'bg-blue-500 text-white';
  return 'bg-muted text-foreground';
}

export function ArrayDisplay({
  array,
  comparing = [],
  swapping = [],
  sorted = [],
  selected = [],
  onElementClick,
  interactive = false,
  size = 'md',
}: ArrayDisplayProps) {
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {array.map((value, index) => {
        const colorClass = getElementColor(index, comparing, swapping, sorted, selected);
        return (
          <motion.div
            key={index}
            layout
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={`
              ${sizeClasses[size]} ${colorClass}
              rounded-lg font-bold flex items-center justify-center
              ${interactive ? 'cursor-pointer hover:ring-2 hover:ring-primary transition-shadow' : ''}
            `}
            onClick={() => interactive && onElementClick?.(index)}
            whileHover={interactive ? { scale: 1.1 } : undefined}
            whileTap={interactive ? { scale: 0.95 } : undefined}
          >
            {value}
          </motion.div>
        );
      })}
    </div>
  );
}

export function ArrayLegend() {
  const items = [
    { color: 'bg-muted', label: 'Default' },
    { color: 'bg-blue-500', label: 'Selected' },
    { color: 'bg-yellow-500', label: 'Comparing' },
    { color: 'bg-orange-500', label: 'Swapping' },
    { color: 'bg-green-500', label: 'Sorted' },
  ];

  return (
    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground justify-center">
      {items.map(({ color, label }) => (
        <div key={label} className="flex items-center gap-2">
          <div className={`w-4 h-4 rounded ${color}`} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
