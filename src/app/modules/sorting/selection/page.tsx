import { AlgorithmPage } from '@/components/visualizer/sorting';

const explanation = {
  howItWorks: [
    'Find the minimum element in the unsorted portion of the array',
    'Swap it with the first unsorted element',
    'Move the boundary between sorted and unsorted portions one step right',
    'Repeat until the entire array is sorted',
    'The sorted portion grows from left to right',
  ],
  pseudocode: `for i = 0 to n-1:
    minIndex = i
    for j = i+1 to n:
        if arr[j] < arr[minIndex]:
            minIndex = j
    swap(arr[i], arr[minIndex])`,
  advantages: [
    'Simple to understand and implement',
    'Performs minimal number of swaps - O(n)',
    'Good when memory writes are expensive',
    'In-place sorting - no extra memory needed',
  ],
  disadvantages: [
    'Slow - O(n^2) time complexity in all cases',
    'Not stable - may change order of equal elements',
    'Always performs O(n^2) comparisons even if sorted',
    'Not adaptive - doesn\'t benefit from partially sorted data',
  ],
  useCases: [
    'When minimizing memory writes is important',
    'Small arrays where simplicity is preferred',
    'Educational purposes',
    'When you need a predictable number of swaps',
  ],
};

export default function SelectionSortPage() {
  return <AlgorithmPage algorithm="selection" explanation={explanation} />;
}
