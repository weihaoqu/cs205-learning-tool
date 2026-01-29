// Code examples for each complexity type

import { ComplexityExample, CodePattern, ComplexityType } from './types';

// Full code examples with step counting
export const complexityExamples: ComplexityExample[] = [
  // O(1) Examples
  {
    id: 'o1-array-access',
    complexity: 'O(1)',
    title: 'Array Access',
    description: 'Accessing an element by index',
    javaCode: `int getElement(int[] arr, int index) {
    return arr[index];  // 1 operation
}`,
    explanation: 'Array access by index is always O(1) because we can calculate the memory address directly.',
    stepCount: () => 1,
  },
  {
    id: 'o1-swap',
    complexity: 'O(1)',
    title: 'Swap Elements',
    description: 'Swapping two elements in an array',
    javaCode: `void swap(int[] arr, int i, int j) {
    int temp = arr[i];   // 1 operation
    arr[i] = arr[j];     // 1 operation
    arr[j] = temp;       // 1 operation
}`,
    explanation: 'No matter how large the array is, swapping takes exactly 3 operations.',
    stepCount: () => 3,
  },

  // O(n) Examples
  {
    id: 'on-sum',
    complexity: 'O(n)',
    title: 'Sum Array',
    description: 'Calculate the sum of all elements',
    javaCode: `int sum(int[] arr) {
    int total = 0;
    for (int i = 0; i < arr.length; i++) {
        total += arr[i];
    }
    return total;
}`,
    explanation: 'We visit each element exactly once, so operations grow linearly with array size.',
    stepCount: (n) => n + 2, // n iterations + init + return
  },
  {
    id: 'on-find-max',
    complexity: 'O(n)',
    title: 'Find Maximum',
    description: 'Find the largest element in an array',
    javaCode: `int findMax(int[] arr) {
    int max = arr[0];
    for (int i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}`,
    explanation: 'Must check every element to guarantee we found the maximum.',
    stepCount: (n) => n, // n-1 comparisons + initial assignment ≈ n
  },
  {
    id: 'on-two-loops',
    complexity: 'O(n)',
    title: 'Sequential Loops',
    description: 'Two separate loops through the array',
    javaCode: `void twoLoops(int[] arr) {
    // First loop: O(n)
    for (int i = 0; i < arr.length; i++) {
        System.out.println(arr[i]);
    }
    // Second loop: O(n)
    for (int i = 0; i < arr.length; i++) {
        System.out.println(arr[i] * 2);
    }
}`,
    explanation: 'O(n) + O(n) = O(2n) = O(n). Sequential loops add, not multiply!',
    stepCount: (n) => 2 * n,
  },

  // O(n²) Examples
  {
    id: 'on2-pairs',
    complexity: 'O(n²)',
    title: 'Print All Pairs',
    description: 'Print every pair of elements',
    javaCode: `void printPairs(int[] arr) {
    for (int i = 0; i < arr.length; i++) {
        for (int j = 0; j < arr.length; j++) {
            System.out.println(arr[i] + ", " + arr[j]);
        }
    }
}`,
    explanation: 'Nested loops where both depend on n result in n × n = n² operations.',
    stepCount: (n) => n * n,
  },
  {
    id: 'on2-bubble-sort',
    complexity: 'O(n²)',
    title: 'Bubble Sort',
    description: 'Sort array by repeatedly swapping adjacent elements',
    javaCode: `void bubbleSort(int[] arr) {
    for (int i = 0; i < arr.length - 1; i++) {
        for (int j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
    explanation: 'Inner loop runs n-1, n-2, n-3... times. Sum ≈ n²/2 which is O(n²).',
    stepCount: (n) => (n * (n - 1)) / 2,
  },

  // O(log n) Examples
  {
    id: 'ologn-binary-search',
    complexity: 'O(log n)',
    title: 'Binary Search',
    description: 'Search sorted array by halving search space',
    javaCode: `int binarySearch(int[] arr, int target) {
    int left = 0;
    int right = arr.length - 1;

    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`,
    explanation: 'Each iteration cuts the search space in half. For n=1000, only ~10 iterations needed.',
    stepCount: (n) => Math.ceil(Math.log2(Math.max(1, n))),
  },
  {
    id: 'ologn-halving',
    complexity: 'O(log n)',
    title: 'Halving Loop',
    description: 'Loop that divides by 2 each iteration',
    javaCode: `int countHalves(int n) {
    int count = 0;
    while (n > 0) {
        count++;
        n = n / 2;
    }
    return count;
}`,
    explanation: 'Dividing by 2 each time means log₂(n) iterations until n becomes 0.',
    stepCount: (n) => Math.ceil(Math.log2(Math.max(1, n))) + 1,
  },

  // O(n log n) Examples
  {
    id: 'onlogn-pattern',
    complexity: 'O(n log n)',
    title: 'N Log N Pattern',
    description: 'Outer loop halves, inner loop is linear',
    javaCode: `void nLogNPattern(int[] arr) {
    for (int size = 1; size < arr.length; size *= 2) {
        // Outer loop: log(n) iterations
        for (int i = 0; i < arr.length; i++) {
            // Inner loop: n iterations
            process(arr[i]);
        }
    }
}`,
    explanation: 'Outer loop runs log(n) times (doubling), inner runs n times. Total: n × log(n).',
    stepCount: (n) => n * Math.ceil(Math.log2(Math.max(1, n))),
  },

  // O(2^n) Examples
  {
    id: 'o2n-fibonacci',
    complexity: 'O(2^n)',
    title: 'Naive Fibonacci',
    description: 'Recursive Fibonacci without memoization',
    javaCode: `int fibonacci(int n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}`,
    explanation: 'Each call spawns 2 more calls. Calls double at each level: 1, 2, 4, 8, 16...',
    stepCount: (n) => Math.pow(2, Math.min(n, 25)),
  },
];

// Code patterns for the patterns page
export const codePatterns: CodePattern[] = [
  // O(1) Patterns
  {
    id: 'pattern-o1-access',
    title: 'Array Index Access',
    complexity: 'O(1)',
    code: `int getFirst(int[] arr) {
    return arr[0];
}`,
    explanation: 'Direct memory address calculation - always one operation.',
  },
  {
    id: 'pattern-o1-arithmetic',
    title: 'Arithmetic Operations',
    complexity: 'O(1)',
    code: `int calculate(int a, int b) {
    int sum = a + b;
    int product = a * b;
    int result = sum + product;
    return result;
}`,
    explanation: 'Fixed number of operations regardless of input values.',
  },

  // O(n) Patterns
  {
    id: 'pattern-on-single-loop',
    title: 'Single Loop',
    complexity: 'O(n)',
    code: `void printAll(int[] arr) {
    for (int i = 0; i < arr.length; i++) {
        System.out.println(arr[i]);
    }
}`,
    explanation: 'Loop runs exactly n times where n is array length.',
  },
  {
    id: 'pattern-on-linear-search',
    title: 'Linear Search',
    complexity: 'O(n)',
    code: `int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
    explanation: 'Worst case: target is last or not present, checking all n elements.',
  },
  {
    id: 'pattern-on-sequential',
    title: 'Sequential Loops (Still O(n)!)',
    complexity: 'O(n)',
    code: `void process(int[] arr) {
    for (int i = 0; i < arr.length; i++) {
        // First pass
    }
    for (int i = 0; i < arr.length; i++) {
        // Second pass
    }
}`,
    explanation: 'O(n) + O(n) = O(2n) = O(n). Constants are dropped!',
    commonMistake: 'Students often think this is O(n²) because there are two loops.',
  },

  // O(n²) Patterns
  {
    id: 'pattern-on2-nested',
    title: 'Nested Loops',
    complexity: 'O(n²)',
    code: `void nestedLoops(int[] arr) {
    for (int i = 0; i < arr.length; i++) {
        for (int j = 0; j < arr.length; j++) {
            System.out.println(arr[i] + arr[j]);
        }
    }
}`,
    explanation: 'Inner loop runs n times for EACH of the n outer iterations: n × n = n².',
  },
  {
    id: 'pattern-on2-triangular',
    title: 'Triangular Nested Loop',
    complexity: 'O(n²)',
    code: `void upperTriangle(int[] arr) {
    for (int i = 0; i < arr.length; i++) {
        for (int j = i; j < arr.length; j++) {
            System.out.println(arr[i] + arr[j]);
        }
    }
}`,
    explanation: 'Inner loop runs n, n-1, n-2... times. Sum = n(n+1)/2 ≈ n²/2 = O(n²).',
  },
  {
    id: 'pattern-on-not-n2',
    title: 'NOT O(n²): Constant Inner Loop',
    complexity: 'O(n)',
    code: `void notQuadratic(int[] arr) {
    for (int i = 0; i < arr.length; i++) {
        for (int j = 0; j < 5; j++) {  // Fixed iterations!
            System.out.println(arr[i]);
        }
    }
}`,
    explanation: 'Inner loop is constant (5 iterations), not dependent on n. Total: 5n = O(n).',
    commonMistake: 'Nested loops are NOT always O(n²). Check if inner loop depends on n!',
  },

  // O(log n) Patterns
  {
    id: 'pattern-ologn-binary',
    title: 'Binary Search Pattern',
    complexity: 'O(log n)',
    code: `int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
    explanation: 'Search space halves each iteration. 1000 → 500 → 250 → 125... only ~10 steps!',
  },
  {
    id: 'pattern-ologn-doubling',
    title: 'Doubling Loop',
    complexity: 'O(log n)',
    code: `void doublingLoop(int n) {
    int i = 1;
    while (i < n) {
        System.out.println(i);
        i = i * 2;  // Doubles each time
    }
}`,
    explanation: 'i grows as 1, 2, 4, 8, 16... reaches n in log₂(n) steps.',
  },

  // O(n log n) Patterns
  {
    id: 'pattern-onlogn',
    title: 'Linear × Logarithmic',
    complexity: 'O(n log n)',
    code: `void mergePattern(int[] arr) {
    // Outer: log(n) levels (like merge sort)
    for (int size = 1; size < arr.length; size *= 2) {
        // Inner: n elements processed at each level
        for (int i = 0; i < arr.length; i++) {
            process(arr, i, size);
        }
    }
}`,
    explanation: 'Outer loop doubles (log n iterations), inner processes all n elements.',
  },

  // O(2^n) Patterns
  {
    id: 'pattern-o2n-recursive',
    title: 'Recursive Branching',
    complexity: 'O(2^n)',
    code: `int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}`,
    explanation: 'Each call makes 2 recursive calls. Tree of calls doubles at each level.',
  },
];

// Get examples by complexity type
export function getExamplesByComplexity(complexity: ComplexityType): ComplexityExample[] {
  return complexityExamples.filter(ex => ex.complexity === complexity);
}

// Get patterns by complexity type
export function getPatternsByComplexity(complexity: ComplexityType): CodePattern[] {
  return codePatterns.filter(p => p.complexity === complexity);
}
