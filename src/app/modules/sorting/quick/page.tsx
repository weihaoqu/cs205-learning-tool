import { AlgorithmPage } from '@/components/visualizer/sorting';

const explanation = {
  howItWorks: [
    'Choose a pivot element (commonly last, first, or median)',
    'Partition: rearrange array so elements smaller than pivot are on left, larger on right',
    'The pivot is now in its final sorted position',
    'Recursively apply quicksort to left and right subarrays',
    'Base case: subarrays with 0 or 1 elements are sorted',
  ],
  pseudocode: `quickSort(arr, low, high):
    if low < high:
        pivotIndex = partition(arr, low, high)
        quickSort(arr, low, pivotIndex - 1)
        quickSort(arr, pivotIndex + 1, high)

partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j = low to high - 1:
        if arr[j] < pivot:
            i++
            swap(arr[i], arr[j])
    swap(arr[i+1], arr[high])
    return i + 1`,
  advantages: [
    'Very fast in practice - often faster than merge sort',
    'In-place sorting - O(log n) stack space',
    'Good cache performance due to locality',
    'Can be parallelized for better performance',
    'Works well with virtual memory',
  ],
  disadvantages: [
    'Worst case O(n^2) for already sorted or reverse sorted',
    'Not stable - may change order of equal elements',
    'Performance depends heavily on pivot selection',
    'Recursive - can cause stack overflow for very large arrays',
  ],
  useCases: [
    'General purpose sorting in many standard libraries',
    'When average case performance matters most',
    'Memory-constrained environments',
    'When stability is not required',
    'Arrays with random data',
  ],
};

export default function QuickSortPage() {
  return <AlgorithmPage algorithm="quick" explanation={explanation} />;
}
