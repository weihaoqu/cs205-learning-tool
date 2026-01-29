import { GuidedExercise } from '@/types/guided-exercise';

export const arrayListAddExercise: GuidedExercise = {
  id: 'arraylist-add',
  title: 'Implement ArrayList add()',
  description:
    'Complete the add(index, element) method for ArrayList that inserts an element at a specified index.',
  topic: 'arrays',
  difficulty: 'beginner',
  estimatedTime: 10,
  objectives: [
    'Understand how ArrayList shifts elements on insert',
    'Handle array resizing when capacity is reached',
    'Implement boundary checking for valid indices',
  ],
  steps: [
    {
      id: 'step-1',
      title: 'Validate the index',
      instruction:
        'First, check if the index is valid. For add(), the valid range is 0 to size (inclusive). If invalid, throw an IndexOutOfBoundsException.',
      hint: 'Use an if statement to check if index < 0 or index > size',
      codeTemplate: `public void add(int index, E element) {
    // TODO: Check if index is out of bounds
    ___CHECK_BOUNDS___

    ensureCapacity(size + 1);
    // shift elements and insert
}`,
      solution: `if (index < 0 || index > size) {
        throw new IndexOutOfBoundsException();
    }`,
      validation: {
        type: 'contains',
        value: 'IndexOutOfBoundsException',
      },
      explanation:
        'We check both lower and upper bounds. Unlike get(), add() allows index == size because we can append at the end.',
    },
    {
      id: 'step-2',
      title: 'Shift elements to the right',
      instruction:
        'Before inserting, shift all elements from index to the end one position to the right. Start from the last element and work backwards to avoid overwriting.',
      hint: 'Use a for loop starting from size-1 down to index, moving each element to i+1',
      codeTemplate: `public void add(int index, E element) {
    if (index < 0 || index > size)
        throw new IndexOutOfBoundsException();
    ensureCapacity(size + 1);

    // TODO: Shift elements to the right
    ___SHIFT_LOOP___

    data[index] = element;
    size++;
}`,
      solution: `for (int i = size; i > index; i--) {
        data[i] = data[i - 1];
    }`,
      validation: {
        type: 'contains',
        value: 'data[i] = data[i - 1]',
      },
      explanation:
        'We iterate backwards to prevent overwriting. Each element moves from position i-1 to position i, making room at the target index.',
    },
    {
      id: 'step-3',
      title: 'Insert the element',
      instruction:
        'Now insert the new element at the specified index and increment the size.',
      hint: 'Assign element to data[index] and increment size',
      codeTemplate: `public void add(int index, E element) {
    if (index < 0 || index > size)
        throw new IndexOutOfBoundsException();
    ensureCapacity(size + 1);
    for (int i = size; i > index; i--) {
        data[i] = data[i - 1];
    }

    // TODO: Insert element and update size
    ___INSERT___
}`,
      solution: `data[index] = element;
    size++;`,
      validation: {
        type: 'contains',
        value: 'data[index] = element',
      },
      explanation:
        'After shifting, the position at index is available. We place the new element there and increment size to reflect the addition.',
    },
  ],
  starterCode: `public void add(int index, E element) {
    // Your implementation here
}`,
  finalSolution: `public void add(int index, E element) {
    if (index < 0 || index > size)
        throw new IndexOutOfBoundsException();
    ensureCapacity(size + 1);
    for (int i = size; i > index; i--) {
        data[i] = data[i - 1];
    }
    data[index] = element;
    size++;
}`,
};

export const arrayListRemoveExercise: GuidedExercise = {
  id: 'arraylist-remove',
  title: 'Implement ArrayList remove()',
  description:
    'Complete the remove(index) method that removes and returns the element at a specified index.',
  topic: 'arrays',
  difficulty: 'beginner',
  estimatedTime: 10,
  objectives: [
    'Understand how ArrayList shifts elements on remove',
    'Properly return the removed element',
    'Clear the last position to avoid memory leaks',
  ],
  steps: [
    {
      id: 'step-1',
      title: 'Validate and save the element',
      instruction:
        'First, check if the index is valid (0 to size-1). Then save the element to be removed so we can return it later.',
      hint: 'Unlike add(), remove() requires index < size (not <=)',
      codeTemplate: `public E remove(int index) {
    // TODO: Check bounds and save element
    ___VALIDATE_AND_SAVE___

    // shift elements left
    // clear last position
    // return removed
}`,
      solution: `if (index < 0 || index >= size)
        throw new IndexOutOfBoundsException();
    E removed = data[index];`,
      validation: {
        type: 'contains',
        value: 'E removed = data[index]',
      },
      explanation:
        'We save the element before shifting because the original value will be overwritten. The bound check uses >= size because index must be less than size.',
    },
    {
      id: 'step-2',
      title: 'Shift elements to the left',
      instruction:
        'Shift all elements after the removed index one position to the left. This fills the gap left by the removed element.',
      hint: 'Loop from index to size-2, copying from i+1 to i',
      codeTemplate: `public E remove(int index) {
    if (index < 0 || index >= size)
        throw new IndexOutOfBoundsException();
    E removed = data[index];

    // TODO: Shift elements to the left
    ___SHIFT_LEFT___

    data[--size] = null;
    return removed;
}`,
      solution: `for (int i = index; i < size - 1; i++) {
        data[i] = data[i + 1];
    }`,
      validation: {
        type: 'contains',
        value: 'data[i] = data[i + 1]',
      },
      explanation:
        'Unlike add(), we shift forward. Each element moves from i+1 to i, filling the gap. We stop at size-2 because size-1 is the last element.',
    },
    {
      id: 'step-3',
      title: 'Clear and return',
      instruction:
        'Set the last position to null (to help garbage collection), decrement size, and return the removed element.',
      hint: 'Use data[--size] = null to decrement and clear in one step',
      codeTemplate: `public E remove(int index) {
    if (index < 0 || index >= size)
        throw new IndexOutOfBoundsException();
    E removed = data[index];
    for (int i = index; i < size - 1; i++) {
        data[i] = data[i + 1];
    }

    // TODO: Clear last position and return
    ___CLEAR_AND_RETURN___
}`,
      solution: `data[--size] = null;
    return removed;`,
      validation: {
        type: 'contains',
        value: 'return removed',
      },
      explanation:
        'Setting the old last position to null prevents memory leaks by allowing garbage collection of the object reference. We return the saved element.',
    },
  ],
  starterCode: `public E remove(int index) {
    // Your implementation here
}`,
  finalSolution: `public E remove(int index) {
    if (index < 0 || index >= size)
        throw new IndexOutOfBoundsException();
    E removed = data[index];
    for (int i = index; i < size - 1; i++) {
        data[i] = data[i + 1];
    }
    data[--size] = null;
    return removed;
}`,
};

export const arrayListEnsureCapacityExercise: GuidedExercise = {
  id: 'arraylist-ensure-capacity',
  title: 'Implement ArrayList ensureCapacity()',
  description:
    'Complete the ensureCapacity() method that doubles the array size when more space is needed.',
  topic: 'arrays',
  difficulty: 'intermediate',
  estimatedTime: 8,
  objectives: [
    'Understand dynamic array resizing',
    'Learn the doubling strategy',
    'Copy elements to a new array',
  ],
  steps: [
    {
      id: 'step-1',
      title: 'Check if resize is needed',
      instruction:
        'First, check if the minimum capacity requested exceeds the current array length. If not, no resize is needed.',
      hint: 'Compare minCapacity with data.length',
      codeTemplate: `private void ensureCapacity(int minCapacity) {
    // TODO: Check if resize is needed
    ___CHECK_CAPACITY___
        // resize logic
    }
}`,
      solution: `if (minCapacity > data.length) {`,
      validation: {
        type: 'contains',
        value: 'minCapacity > data.length',
      },
      explanation:
        'We only resize when the requested capacity exceeds current capacity. This avoids unnecessary array copying.',
    },
    {
      id: 'step-2',
      title: 'Calculate new capacity and copy',
      instruction:
        'Double the current capacity and create a new array. Then copy all existing elements to the new array.',
      hint: 'Use Arrays.copyOf() or create a new array and loop to copy',
      codeTemplate: `private void ensureCapacity(int minCapacity) {
    if (minCapacity > data.length) {
        // TODO: Double capacity and copy elements
        ___RESIZE___
    }
}`,
      solution: `int newCapacity = data.length * 2;
        data = Arrays.copyOf(data, newCapacity);`,
      validation: {
        type: 'contains',
        value: 'data.length * 2',
      },
      explanation:
        'Doubling the capacity provides amortized O(1) time for add operations. Arrays.copyOf creates a new array and copies elements efficiently.',
    },
  ],
  starterCode: `private void ensureCapacity(int minCapacity) {
    // Your implementation here
}`,
  finalSolution: `private void ensureCapacity(int minCapacity) {
    if (minCapacity > data.length) {
        int newCapacity = data.length * 2;
        data = Arrays.copyOf(data, newCapacity);
    }
}`,
};

export const arrayListExercises = [
  arrayListAddExercise,
  arrayListRemoveExercise,
  arrayListEnsureCapacityExercise,
];
