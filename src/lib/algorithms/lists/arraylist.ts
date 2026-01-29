// ArrayList operations with animation steps

import {
  ArrayListState,
  ListAnimationStep,
  ListOperationResult,
} from './types';

const DEFAULT_CAPACITY = 4;

export function createArrayList(initialValues: number[] = []): ArrayListState {
  const capacity = Math.max(DEFAULT_CAPACITY, initialValues.length * 2);
  const data: (number | null)[] = new Array(capacity).fill(null);
  initialValues.forEach((val, i) => {
    data[i] = val;
  });

  return {
    type: 'arraylist',
    data,
    size: initialValues.length,
    capacity,
  };
}

function cloneState(state: ArrayListState): ArrayListState {
  return {
    ...state,
    data: [...state.data],
  };
}

export function arrayListAdd(
  state: ArrayListState,
  index: number,
  value: number
): ListOperationResult {
  const steps: ListAnimationStep[] = [];
  let currentState = cloneState(state);

  // Validate index
  if (index < 0 || index > currentState.size) {
    return {
      steps: [
        {
          type: 'complete',
          description: `Error: Index ${index} out of bounds (valid: 0 to ${currentState.size})`,
          state: currentState,
        },
      ],
      finalState: currentState,
      error: `IndexOutOfBoundsException: ${index}`,
    };
  }

  // Step 1: Check if resize is needed
  if (currentState.size >= currentState.capacity) {
    const oldCapacity = currentState.capacity;
    const newCapacity = currentState.capacity * 2;

    steps.push({
      type: 'resize',
      description: `Array is full (size=${currentState.size}, capacity=${oldCapacity}). Doubling capacity to ${newCapacity}.`,
      oldCapacity,
      newCapacity,
      codeLineStart: 3,
      codeLineEnd: 3,
      state: cloneState(currentState),
    });

    // Perform resize
    const newData: (number | null)[] = new Array(newCapacity).fill(null);
    for (let i = 0; i < currentState.size; i++) {
      newData[i] = currentState.data[i];
    }
    currentState = {
      ...currentState,
      data: newData,
      capacity: newCapacity,
    };

    steps.push({
      type: 'resize',
      description: `Created new array with capacity ${newCapacity} and copied ${currentState.size} elements.`,
      oldCapacity,
      newCapacity,
      state: cloneState(currentState),
    });
  }

  // Step 2: Highlight the target index
  steps.push({
    type: 'highlight-index',
    description: `Adding value ${value} at index ${index}.`,
    index,
    value,
    codeLineStart: 5,
    codeLineEnd: 5,
    state: cloneState(currentState),
  });

  // Step 3: Shift elements right (if not adding at end)
  if (index < currentState.size) {
    for (let i = currentState.size; i > index; i--) {
      steps.push({
        type: 'shift-right',
        description: `Shifting element at index ${i - 1} (value: ${currentState.data[i - 1]}) to index ${i}.`,
        fromIndex: i - 1,
        toIndex: i,
        codeLineStart: 6,
        codeLineEnd: 8,
        state: cloneState(currentState),
      });

      currentState.data[i] = currentState.data[i - 1];
    }
  }

  // Step 4: Insert the value
  currentState.data[index] = value;
  currentState.size++;

  steps.push({
    type: 'insert-value',
    description: `Inserted ${value} at index ${index}. Size is now ${currentState.size}.`,
    index,
    value,
    codeLineStart: 9,
    codeLineEnd: 10,
    state: cloneState(currentState),
  });

  steps.push({
    type: 'complete',
    description: `Successfully added ${value} at index ${index}.`,
    state: cloneState(currentState),
  });

  return {
    steps,
    finalState: currentState,
  };
}

export function arrayListAddFirst(
  state: ArrayListState,
  value: number
): ListOperationResult {
  return arrayListAdd(state, 0, value);
}

export function arrayListAddLast(
  state: ArrayListState,
  value: number
): ListOperationResult {
  return arrayListAdd(state, state.size, value);
}

export function arrayListGet(
  state: ArrayListState,
  index: number
): ListOperationResult {
  const steps: ListAnimationStep[] = [];
  const currentState = cloneState(state);

  // Validate index
  if (index < 0 || index >= currentState.size) {
    return {
      steps: [
        {
          type: 'complete',
          description: `Error: Index ${index} out of bounds (valid: 0 to ${currentState.size - 1})`,
          state: currentState,
        },
      ],
      finalState: currentState,
      error: `IndexOutOfBoundsException: ${index}`,
    };
  }

  steps.push({
    type: 'highlight-index',
    description: `Accessing element at index ${index}. Direct access via data[${index}].`,
    index,
    codeLineStart: 2,
    codeLineEnd: 2,
    state: currentState,
  });

  const value = currentState.data[index]!;
  steps.push({
    type: 'complete',
    description: `Retrieved value ${value} from index ${index}. Time complexity: O(1).`,
    index,
    value,
    state: currentState,
  });

  return {
    steps,
    finalState: currentState,
    returnValue: value,
  };
}

export function arrayListSet(
  state: ArrayListState,
  index: number,
  value: number
): ListOperationResult {
  const steps: ListAnimationStep[] = [];
  let currentState = cloneState(state);

  // Validate index
  if (index < 0 || index >= currentState.size) {
    return {
      steps: [
        {
          type: 'complete',
          description: `Error: Index ${index} out of bounds (valid: 0 to ${currentState.size - 1})`,
          state: currentState,
        },
      ],
      finalState: currentState,
      error: `IndexOutOfBoundsException: ${index}`,
    };
  }

  const oldValue = currentState.data[index];

  steps.push({
    type: 'highlight-index',
    description: `Setting index ${index} from ${oldValue} to ${value}.`,
    index,
    value,
    codeLineStart: 2,
    codeLineEnd: 2,
    state: cloneState(currentState),
  });

  currentState.data[index] = value;

  steps.push({
    type: 'complete',
    description: `Set index ${index} to ${value}. Previous value was ${oldValue}. Time complexity: O(1).`,
    index,
    value,
    state: cloneState(currentState),
  });

  return {
    steps,
    finalState: currentState,
    returnValue: oldValue,
  };
}

export function arrayListRemove(
  state: ArrayListState,
  index: number
): ListOperationResult {
  const steps: ListAnimationStep[] = [];
  let currentState = cloneState(state);

  // Validate index
  if (index < 0 || index >= currentState.size) {
    return {
      steps: [
        {
          type: 'complete',
          description: `Error: Index ${index} out of bounds (valid: 0 to ${currentState.size - 1})`,
          state: currentState,
        },
      ],
      finalState: currentState,
      error: `IndexOutOfBoundsException: ${index}`,
    };
  }

  const removedValue = currentState.data[index]!;

  steps.push({
    type: 'highlight-index',
    description: `Removing element at index ${index} (value: ${removedValue}).`,
    index,
    value: removedValue,
    codeLineStart: 2,
    codeLineEnd: 3,
    state: cloneState(currentState),
  });

  steps.push({
    type: 'remove-value',
    description: `Marking index ${index} for removal.`,
    index,
    value: removedValue,
    state: cloneState(currentState),
  });

  // Shift elements left
  for (let i = index; i < currentState.size - 1; i++) {
    steps.push({
      type: 'shift-left',
      description: `Shifting element at index ${i + 1} (value: ${currentState.data[i + 1]}) to index ${i}.`,
      fromIndex: i + 1,
      toIndex: i,
      codeLineStart: 5,
      codeLineEnd: 7,
      state: cloneState(currentState),
    });

    currentState.data[i] = currentState.data[i + 1];
  }

  // Clear the last position and decrement size
  currentState.data[currentState.size - 1] = null;
  currentState.size--;

  steps.push({
    type: 'complete',
    description: `Removed ${removedValue} from index ${index}. Size is now ${currentState.size}.`,
    value: removedValue,
    state: cloneState(currentState),
  });

  return {
    steps,
    finalState: currentState,
    returnValue: removedValue,
  };
}

export function arrayListRemoveFirst(
  state: ArrayListState
): ListOperationResult {
  if (state.size === 0) {
    return {
      steps: [
        {
          type: 'complete',
          description: 'Error: Cannot remove from empty list.',
          state: cloneState(state),
        },
      ],
      finalState: state,
      error: 'NoSuchElementException: List is empty',
    };
  }
  return arrayListRemove(state, 0);
}

export function arrayListRemoveLast(
  state: ArrayListState
): ListOperationResult {
  if (state.size === 0) {
    return {
      steps: [
        {
          type: 'complete',
          description: 'Error: Cannot remove from empty list.',
          state: cloneState(state),
        },
      ],
      finalState: state,
      error: 'NoSuchElementException: List is empty',
    };
  }
  return arrayListRemove(state, state.size - 1);
}

// Java code templates for display
export const arrayListCode = {
  add: `public void add(int index, E element) {
    if (index < 0 || index > size)
        throw new IndexOutOfBoundsException();
    ensureCapacity(size + 1);
    // Shift elements to the right
    for (int i = size; i > index; i--) {
        data[i] = data[i - 1];
    }
    data[index] = element;
    size++;
}`,

  addFirst: `public void addFirst(E element) {
    add(0, element);
}`,

  addLast: `public void addLast(E element) {
    add(size, element);
}`,

  get: `public E get(int index) {
    if (index < 0 || index >= size)
        throw new IndexOutOfBoundsException();
    return data[index];
}`,

  set: `public E set(int index, E element) {
    if (index < 0 || index >= size)
        throw new IndexOutOfBoundsException();
    E oldValue = data[index];
    data[index] = element;
    return oldValue;
}`,

  remove: `public E remove(int index) {
    if (index < 0 || index >= size)
        throw new IndexOutOfBoundsException();
    E removed = data[index];
    // Shift elements to the left
    for (int i = index; i < size - 1; i++) {
        data[i] = data[i + 1];
    }
    data[--size] = null;
    return removed;
}`,

  removeFirst: `public E removeFirst() {
    if (size == 0)
        throw new NoSuchElementException();
    return remove(0);
}`,

  removeLast: `public E removeLast() {
    if (size == 0)
        throw new NoSuchElementException();
    return remove(size - 1);
}`,

  ensureCapacity: `private void ensureCapacity(int minCapacity) {
    if (minCapacity > data.length) {
        int newCapacity = data.length * 2;
        data = Arrays.copyOf(data, newCapacity);
    }
}`,
};

export const arrayListPseudocode = {
  add: [
    '1. Check if index is valid (0 to size)',
    '2. If array is full, double the capacity',
    '3. Shift all elements from index to end one position right',
    '4. Place new element at index',
    '5. Increment size',
  ],
  addFirst: ['1. Call add(0, element)'],
  addLast: ['1. Call add(size, element)'],
  get: [
    '1. Check if index is valid (0 to size-1)',
    '2. Return data[index] directly',
  ],
  set: [
    '1. Check if index is valid (0 to size-1)',
    '2. Save old value',
    '3. Replace with new value',
    '4. Return old value',
  ],
  remove: [
    '1. Check if index is valid (0 to size-1)',
    '2. Save the element to be removed',
    '3. Shift all elements from index+1 to end one position left',
    '4. Set last position to null',
    '5. Decrement size',
    '6. Return removed element',
  ],
  removeFirst: ['1. Check if list is empty', '2. Call remove(0)'],
  removeLast: ['1. Check if list is empty', '2. Call remove(size - 1)'],
};
