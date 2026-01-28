import type { GuidedExercise } from '@/types/guided-exercise';

export const reverseArrayExercise: GuidedExercise = {
  id: 'reverse-array',
  title: 'Reverse an Array',
  description: 'Learn how to reverse an array in-place by swapping elements from both ends.',
  topic: 'arrays',
  difficulty: 'beginner',
  estimatedTime: 12,
  objectives: [
    'Understand two-pointer technique',
    'Learn in-place array manipulation',
    'Practice element swapping',
  ],
  starterCode: `public class Main {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};

        System.out.print("Original: ");
        printArray(arr);

        // TODO: Reverse the array in-place

        System.out.print("Reversed: ");
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
        int[] arr = {1, 2, 3, 4, 5};

        System.out.print("Original: ");
        printArray(arr);

        int left = 0;
        int right = arr.length - 1;

        while (left < right) {
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }

        System.out.print("Reversed: ");
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
      title: 'Set up two pointers',
      instruction: 'We\'ll use two pointers: one starting at the beginning (left) and one at the end (right) of the array. Add these after the first printArray call.',
      hint: 'Initialize `int left = 0;` and `int right = arr.length - 1;`',
      codeTemplate: `public class Main {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};

        System.out.print("Original: ");
        printArray(arr);

        // Step 1: Initialize two pointers
        _______________
        _______________

        System.out.print("Reversed: ");
        printArray(arr);
    }

    static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}`,
      solution: 'int left = 0;\n        int right = arr.length - 1;',
      validation: {
        type: 'contains',
        value: 'int left = 0',
      },
      explanation: 'The two-pointer technique is efficient for array problems. Left starts at index 0, right starts at the last index (length - 1).',
    },
    {
      id: 'step-2',
      title: 'Create the while loop',
      instruction: 'Add a while loop that continues as long as left is less than right. This ensures we stop when the pointers meet in the middle.',
      hint: 'Use `while (left < right) { }`',
      codeTemplate: `public class Main {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};

        System.out.print("Original: ");
        printArray(arr);

        int left = 0;
        int right = arr.length - 1;

        // Step 2: Loop while left < right
        _______________ {

        }

        System.out.print("Reversed: ");
        printArray(arr);
    }

    static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}`,
      solution: 'while (left < right)',
      validation: {
        type: 'contains',
        value: 'while (left < right)',
      },
      explanation: 'We continue swapping until the pointers meet. When left >= right, all elements have been swapped and the array is reversed.',
    },
    {
      id: 'step-3',
      title: 'Swap the elements',
      instruction: 'Inside the loop, swap the elements at the left and right positions using a temporary variable.',
      hint: 'Use three lines: `int temp = arr[left];`, `arr[left] = arr[right];`, `arr[right] = temp;`',
      codeTemplate: `public class Main {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};

        System.out.print("Original: ");
        printArray(arr);

        int left = 0;
        int right = arr.length - 1;

        while (left < right) {
            // Step 3: Swap elements at left and right
            _______________
            _______________
            _______________
        }

        System.out.print("Reversed: ");
        printArray(arr);
    }

    static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}`,
      solution: 'int temp = arr[left];\n            arr[left] = arr[right];\n            arr[right] = temp;',
      validation: {
        type: 'contains',
        value: 'int temp = arr[left]',
      },
      explanation: 'To swap two values, we need a temporary variable. We save arr[left], then overwrite it with arr[right], then put the saved value into arr[right].',
    },
    {
      id: 'step-4',
      title: 'Move the pointers',
      instruction: 'After swapping, move both pointers toward the center: increment left and decrement right.',
      hint: 'Add `left++;` and `right--;` after the swap.',
      codeTemplate: `public class Main {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};

        System.out.print("Original: ");
        printArray(arr);

        int left = 0;
        int right = arr.length - 1;

        while (left < right) {
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;

            // Step 4: Move pointers toward center
            _______________
            _______________
        }

        System.out.print("Reversed: ");
        printArray(arr);
    }

    static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}`,
      solution: 'left++;\n            right--;',
      validation: {
        type: 'contains',
        value: 'left++',
      },
      explanation: 'After each swap, we move left forward and right backward. This progresses us toward the center where the pointers will meet.',
    },
  ],
};
