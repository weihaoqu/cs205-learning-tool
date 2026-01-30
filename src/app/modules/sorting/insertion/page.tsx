import { AlgorithmPage } from '@/components/visualizer/sorting';

const explanation = {
  howItWorks: [
    'Start with the second element (first element is "sorted")',
    'Take the current element and compare it with elements in the sorted portion',
    'Shift larger elements one position to the right',
    'Insert the current element in its correct position',
    'Move to the next element and repeat',
    'Continue until all elements are in the sorted portion',
  ],
  pseudocode: `for i = 1 to n-1:
    key = arr[i]
    j = i - 1
    while j >= 0 and arr[j] > key:
        arr[j+1] = arr[j]
        j = j - 1
    arr[j+1] = key`,
  advantages: [
    'Simple and intuitive - like sorting cards in your hand',
    'Efficient for small datasets',
    'Very fast for nearly sorted arrays - O(n)',
    'Stable sort - preserves order of equal elements',
    'In-place and online (can sort as data arrives)',
  ],
  disadvantages: [
    'Slow for large datasets - O(n^2)',
    'Many element shifts required for reverse-sorted data',
    'Not suitable for random large arrays',
  ],
  useCases: [
    'Small arrays (typically < 50 elements)',
    'Nearly sorted data - very efficient',
    'Online sorting - data arrives incrementally',
    'Hybrid algorithms (used in Timsort for small runs)',
    'When stability is required',
  ],
};

export default function InsertionSortPage() {
  return <AlgorithmPage algorithm="insertion" explanation={explanation} />;
}
