'use client';

import { TRAVERSAL_INFO, type TraversalType } from '@/lib/algorithms/arrays2d';

interface TraversalSelectorProps {
  value: TraversalType;
  onChange: (traversal: TraversalType) => void;
  disabled?: boolean;
}

const traversals: TraversalType[] = [
  'row-major',
  'column-major',
  'zigzag',
  'diagonal',
  'anti-diagonal',
  'spiral',
];

export function TraversalSelector({
  value,
  onChange,
  disabled = false,
}: TraversalSelectorProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as TraversalType)}
      disabled={disabled}
      className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
    >
      {traversals.map((t) => (
        <option key={t} value={t}>
          {TRAVERSAL_INFO[t].name}
        </option>
      ))}
    </select>
  );
}
