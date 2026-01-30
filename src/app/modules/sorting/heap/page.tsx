import { AlgorithmPage } from '@/components/visualizer/sorting';

const explanation = {
  howItWorks: [
    'Build a max-heap from the unsorted array',
    'The largest element is now at the root (index 0)',
    'Swap root with the last element in the heap',
    'Reduce heap size by 1 (excluding sorted elements)',
    'Heapify the root to restore max-heap property',
    'Repeat until heap size is 1',
  ],
  pseudocode: `heapSort(arr):
    n = arr.length

    // Build max heap
    for i = n/2 - 1 down to 0:
        heapify(arr, n, i)

    // Extract elements one by one
    for i = n-1 down to 1:
        swap(arr[0], arr[i])
        heapify(arr, i, 0)

heapify(arr, heapSize, rootIndex):
    largest = rootIndex
    left = 2 * rootIndex + 1
    right = 2 * rootIndex + 2

    if left < heapSize and arr[left] > arr[largest]:
        largest = left
    if right < heapSize and arr[right] > arr[largest]:
        largest = right
    if largest != rootIndex:
        swap(arr[rootIndex], arr[largest])
        heapify(arr, heapSize, largest)`,
  advantages: [
    'Guaranteed O(n log n) time in all cases',
    'In-place sorting - O(1) extra space',
    'No worst-case scenario like quicksort',
    'Good for finding k largest/smallest elements',
    'Useful in priority queue implementations',
  ],
  disadvantages: [
    'Not stable - may change order of equal elements',
    'Poor cache performance (jumps around in memory)',
    'Slower than quicksort in practice for random data',
    'More complex than simple O(n^2) algorithms',
  ],
  useCases: [
    'When worst-case O(n log n) guarantee is needed',
    'Memory-constrained environments (in-place)',
    'Finding k largest or smallest elements',
    'Priority queue operations',
    'Embedded systems with limited memory',
  ],
};

export default function HeapSortPage() {
  return <AlgorithmPage algorithm="heap" explanation={explanation} />;
}
