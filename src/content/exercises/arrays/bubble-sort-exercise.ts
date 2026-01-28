import type { GuidedExercise } from '@/types/guided-exercise';

export const bubbleSortExercise: GuidedExercise = {
  id: 'bubble-sort',
  title: 'Implement Bubble Sort',
  description: 'Learn the bubble sort algorithm step by step. Bubble sort repeatedly compares adjacent elements and swaps them if they are in the wrong order.',
  topic: 'sorting',
  difficulty: 'intermediate',
  estimatedTime: 15,
  objectives: [
    'Understand the bubble sort algorithm',
    'Learn nested loop patterns',
    'Practice array element swapping',
    'Understand algorithm optimization',
  ],
  prerequisites: ['find-max', 'reverse-array'],
  starterCode: `public class Main {
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};

        System.out.print("Original: ");
        printArray(arr);

        // TODO: Implement bubble sort

        System.out.print("Sorted: ");
        printArray(arr);
    }

    static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}`,
  finalSolution: `public class Main {
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};

        System.out.print("Original: ");
        printArray(arr);

        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }

        System.out.print("Sorted: ");
        printArray(arr);
    }

    static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}`,
  steps: [
    {
      id: 'step-1',
      title: 'Get the array length',
      instruction: 'First, store the array length in a variable. This makes our code cleaner and slightly more efficient.',
      hint: 'Add `int n = arr.length;` after the first printArray call.',
      codeTemplate: `public class Main {
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};

        System.out.print("Original: ");
        printArray(arr);

        // Step 1: Store array length
        _______________

        System.out.print("Sorted: ");
        printArray(arr);
    }

    static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}`,
      solution: 'int n = arr.length;',
      validation: {
        type: 'contains',
        value: 'int n = arr.length',
      },
      explanation: 'Storing the length in a variable is a common practice. It makes the code more readable and avoids repeated property access.',
    },
    {
      id: 'step-2',
      title: 'Create the outer loop',
      instruction: 'Add the outer loop. It runs n-1 times because after n-1 passes, the array is guaranteed to be sorted. Each pass places one element in its final position.',
      hint: 'Use `for (int i = 0; i < n - 1; i++) { }`',
      codeTemplate: `public class Main {
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};

        System.out.print("Original: ");
        printArray(arr);

        int n = arr.length;

        // Step 2: Outer loop for passes
        _______________ {

        }

        System.out.print("Sorted: ");
        printArray(arr);
    }

    static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}`,
      solution: 'for (int i = 0; i < n - 1; i++)',
      validation: {
        type: 'contains',
        value: 'for (int i = 0; i < n - 1; i++)',
      },
      explanation: 'The outer loop represents passes through the array. After each pass, the largest unsorted element "bubbles up" to its correct position.',
    },
    {
      id: 'step-3',
      title: 'Create the inner loop',
      instruction: 'Inside the outer loop, add the inner loop. It compares adjacent elements. Notice it only goes up to n-i-1 because the last i elements are already sorted.',
      hint: 'Use `for (int j = 0; j < n - i - 1; j++) { }`',
      codeTemplate: `public class Main {
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};

        System.out.print("Original: ");
        printArray(arr);

        int n = arr.length;

        for (int i = 0; i < n - 1; i++) {
            // Step 3: Inner loop for comparisons
            _______________ {

            }
        }

        System.out.print("Sorted: ");
        printArray(arr);
    }

    static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}`,
      solution: 'for (int j = 0; j < n - i - 1; j++)',
      validation: {
        type: 'contains',
        value: 'for (int j = 0; j < n - i - 1; j++)',
      },
      explanation: 'The inner loop compares adjacent pairs. We use n-i-1 because after i passes, the last i elements are already in their final positions.',
    },
    {
      id: 'step-4',
      title: 'Compare adjacent elements',
      instruction: 'Inside the inner loop, compare arr[j] with arr[j+1]. If the first is greater, we need to swap them.',
      hint: 'Use `if (arr[j] > arr[j + 1]) { }`',
      codeTemplate: `public class Main {
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};

        System.out.print("Original: ");
        printArray(arr);

        int n = arr.length;

        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                // Step 4: Compare adjacent elements
                _______________ {

                }
            }
        }

        System.out.print("Sorted: ");
        printArray(arr);
    }

    static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}`,
      solution: 'if (arr[j] > arr[j + 1])',
      validation: {
        type: 'contains',
        value: 'if (arr[j] > arr[j + 1])',
      },
      explanation: 'We compare each element with its neighbor. If the current element is larger, they are out of order and need to be swapped.',
    },
    {
      id: 'step-5',
      title: 'Swap the elements',
      instruction: 'Inside the if block, swap arr[j] and arr[j+1] using a temporary variable.',
      hint: 'Use the standard swap pattern: temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;',
      codeTemplate: `public class Main {
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};

        System.out.print("Original: ");
        printArray(arr);

        int n = arr.length;

        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Step 5: Swap the elements
                    _______________
                    _______________
                    _______________
                }
            }
        }

        System.out.print("Sorted: ");
        printArray(arr);
    }

    static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}`,
      solution: 'int temp = arr[j];\n                    arr[j] = arr[j + 1];\n                    arr[j + 1] = temp;',
      validation: {
        type: 'contains',
        value: 'int temp = arr[j]',
      },
      explanation: 'The swap puts the smaller element before the larger one. After all passes complete, the array will be sorted in ascending order.',
    },
  ],
};
