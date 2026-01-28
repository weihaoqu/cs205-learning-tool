'use client';

import { ALGORITHM_INFO, type SortingAlgorithm } from '@/lib/algorithms/sorting';

interface AlgorithmSelectorProps {
  value: SortingAlgorithm;
  onChange: (algorithm: SortingAlgorithm) => void;
  disabled?: boolean;
}

const algorithms: SortingAlgorithm[] = ['bubble', 'selection', 'insertion', 'merge', 'quick'];

export function AlgorithmSelector({
  value,
  onChange,
  disabled = false,
}: AlgorithmSelectorProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortingAlgorithm)}
      disabled={disabled}
      className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
    >
      {algorithms.map((algo) => (
        <option key={algo} value={algo}>
          {ALGORITHM_INFO[algo].name}
        </option>
      ))}
    </select>
  );
}
