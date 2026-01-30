import { AlgorithmPage } from '@/components/visualizer/sorting';

const explanation = {
  howItWorks: [
    'Divide the array into two halves',
    'Recursively sort each half',
    'Merge the two sorted halves back together',
    'During merge: compare elements from both halves',
    'Place smaller element first, creating sorted output',
    'Base case: array of size 1 is already sorted',
  ],
  pseudocode: `mergeSort(arr, left, right):
    if left < right:
        mid = (left + right) / 2
        mergeSort(arr, left, mid)
        mergeSort(arr, mid+1, right)
        merge(arr, left, mid, right)

merge(arr, left, mid, right):
    create temp arrays L and R
    copy data to temp arrays
    merge temp arrays back into arr`,
  advantages: [
    'Guaranteed O(n log n) time - always',
    'Stable sort - preserves order of equal elements',
    'Predictable performance regardless of input',
    'Excellent for linked lists (no random access needed)',
    'Parallelizable - can sort halves independently',
  ],
  disadvantages: [
    'Requires O(n) extra space for merging',
    'Not in-place - needs auxiliary arrays',
    'Slightly slower than quicksort for random data',
    'Overkill for small arrays',
  ],
  useCases: [
    'When stable sort is required',
    'Sorting linked lists',
    'External sorting (large files)',
    'When worst-case guarantee is important',
    'Parallel processing environments',
  ],
};

export default function MergeSortPage() {
  return <AlgorithmPage algorithm="merge" explanation={explanation} />;
}
