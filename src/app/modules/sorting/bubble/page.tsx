import { AlgorithmPage } from '@/components/visualizer/sorting';

const explanation = {
  howItWorks: [
    'Start at the beginning of the array',
    'Compare adjacent elements (position i and i+1)',
    'If they are in wrong order (arr[i] > arr[i+1]), swap them',
    'Move to the next pair and repeat',
    'After each pass, the largest unsorted element "bubbles up" to its correct position',
    'Repeat until no more swaps are needed',
  ],
  pseudocode: `for i = 0 to n-1:
    for j = 0 to n-i-1:
        if arr[j] > arr[j+1]:
            swap(arr[j], arr[j+1])`,
  advantages: [
    'Very simple to understand and implement',
    'No extra space required (in-place)',
    'Stable sort - preserves order of equal elements',
    'Can detect if array is already sorted (optimized version)',
  ],
  disadvantages: [
    'Very slow - O(n^2) time complexity',
    'Not suitable for large datasets',
    'Many unnecessary comparisons and swaps',
    'Outperformed by almost all other sorting algorithms',
  ],
  useCases: [
    'Educational purposes - learning sorting concepts',
    'Very small arrays (< 10 elements)',
    'Nearly sorted data (with early termination optimization)',
    'When simplicity is more important than performance',
  ],
};

export default function BubbleSortPage() {
  return <AlgorithmPage algorithm="bubble" explanation={explanation} />;
}
