import type { GuidedExercise } from '@/types/guided-exercise';

export const findMaxExercise: GuidedExercise = {
  id: 'find-max',
  title: 'Find Maximum Element',
  description: 'Learn how to find the maximum element in an array by iterating through all elements.',
  topic: 'arrays',
  difficulty: 'beginner',
  estimatedTime: 10,
  objectives: [
    'Understand array traversal',
    'Learn to track a running maximum',
    'Practice comparison operations',
  ],
  starterCode: `public class Main {
    public static void main(String[] args) {
        int[] numbers = {23, 45, 12, 67, 34, 89, 21};

        // TODO: Find and print the maximum element

    }
}`,
  finalSolution: `public class Main {
    public static void main(String[] args) {
        int[] numbers = {23, 45, 12, 67, 34, 89, 21};

        int max = numbers[0];
        for (int i = 1; i < numbers.length; i++) {
            if (numbers[i] > max) {
                max = numbers[i];
            }
        }
        System.out.println("Maximum: " + max);
    }
}`,
  steps: [
    {
      id: 'step-1',
      title: 'Initialize the maximum',
      instruction: 'First, we need a variable to store the maximum value. Initialize it with the first element of the array. Add this line after the array declaration:',
      hint: 'Use `int max = numbers[0];` to start with the first element as our initial maximum.',
      codeTemplate: `public class Main {
    public static void main(String[] args) {
        int[] numbers = {23, 45, 12, 67, 34, 89, 21};

        // Step 1: Initialize max with the first element
        _______________

    }
}`,
      solution: 'int max = numbers[0];',
      validation: {
        type: 'contains',
        value: 'int max = numbers[0]',
      },
      explanation: 'We start by assuming the first element is the maximum. This gives us a starting point to compare against all other elements.',
    },
    {
      id: 'step-2',
      title: 'Create a loop',
      instruction: 'Now create a for loop that starts from index 1 (since we already have index 0 in max) and goes through the rest of the array.',
      hint: 'Use `for (int i = 1; i < numbers.length; i++)` - we start at 1 because we already used index 0.',
      codeTemplate: `public class Main {
    public static void main(String[] args) {
        int[] numbers = {23, 45, 12, 67, 34, 89, 21};

        int max = numbers[0];

        // Step 2: Loop through remaining elements
        _______________ {

        }

    }
}`,
      solution: 'for (int i = 1; i < numbers.length; i++)',
      validation: {
        type: 'contains',
        value: 'for (int i = 1; i < numbers.length; i++)',
      },
      explanation: 'We loop starting from index 1 because we already initialized max with numbers[0]. This avoids an unnecessary comparison.',
    },
    {
      id: 'step-3',
      title: 'Compare and update',
      instruction: 'Inside the loop, compare each element with the current max. If the element is greater, update max.',
      hint: 'Use an if statement: `if (numbers[i] > max) { max = numbers[i]; }`',
      codeTemplate: `public class Main {
    public static void main(String[] args) {
        int[] numbers = {23, 45, 12, 67, 34, 89, 21};

        int max = numbers[0];

        for (int i = 1; i < numbers.length; i++) {
            // Step 3: Compare and update max if current element is larger
            _______________
        }

    }
}`,
      solution: 'if (numbers[i] > max) { max = numbers[i]; }',
      validation: {
        type: 'contains',
        value: 'if (numbers[i] > max)',
      },
      explanation: 'For each element, we check if it\'s greater than our current maximum. If it is, we update max to this new larger value.',
    },
    {
      id: 'step-4',
      title: 'Print the result',
      instruction: 'Finally, print the maximum value after the loop completes.',
      hint: 'Use `System.out.println("Maximum: " + max);`',
      codeTemplate: `public class Main {
    public static void main(String[] args) {
        int[] numbers = {23, 45, 12, 67, 34, 89, 21};

        int max = numbers[0];

        for (int i = 1; i < numbers.length; i++) {
            if (numbers[i] > max) {
                max = numbers[i];
            }
        }

        // Step 4: Print the maximum
        _______________
    }
}`,
      solution: 'System.out.println("Maximum: " + max);',
      validation: {
        type: 'contains',
        value: 'System.out.println',
      },
      explanation: 'After checking all elements, max contains the largest value in the array. We print it to show the result.',
    },
  ],
};
