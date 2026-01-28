'use client';

interface SortingStatsProps {
  comparisons: number;
  swaps: number;
}

export function SortingStats({ comparisons, swaps }: SortingStatsProps) {
  return (
    <div className="flex justify-center gap-8 mt-4 text-sm">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Comparisons:</span>
        <span className="font-mono font-bold text-yellow-600">{comparisons}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Swaps:</span>
        <span className="font-mono font-bold text-orange-600">{swaps}</span>
      </div>
    </div>
  );
}
