import type { HashSetState, HashSetStep } from './types';
import { hashString, getBucketIndex } from './hashmap';

// Create initial empty HashSet state
export function createInitialSetState(capacity: number = 8, loadFactor: number = 0.75): HashSetState {
  const buckets = Array.from({ length: capacity }, () => ({ entries: [] as { value: string; hashCode: number }[] }));
  return {
    buckets,
    size: 0,
    capacity,
    loadFactor,
    threshold: Math.floor(capacity * loadFactor),
  };
}

// Clone state for immutability
function cloneSetState(state: HashSetState): HashSetState {
  return {
    ...state,
    buckets: state.buckets.map(bucket => ({
      entries: bucket.entries.map(entry => ({ ...entry })),
    })),
  };
}

// Generator for add operation
export function* addGenerator(
  state: HashSetState,
  value: string
): Generator<HashSetStep> {
  let currentState = cloneSetState(state);

  // Step 1: Calculate hash code
  const hashCode = hashString(value);
  yield {
    type: 'hash',
    value,
    hashCode,
    message: `Calculate hashCode for "${value}": ${hashCode}`,
    state: cloneSetState(currentState),
  };

  // Step 2: Calculate bucket index
  const bucketIndex = getBucketIndex(hashCode, currentState.capacity);
  yield {
    type: 'index',
    value,
    hashCode,
    bucketIndex,
    message: `Calculate bucket index: ${hashCode} % ${currentState.capacity} = ${bucketIndex}`,
    state: cloneSetState(currentState),
    highlightBucket: bucketIndex,
  };

  // Step 3: Search for existing value
  const bucket = currentState.buckets[bucketIndex];

  for (let i = 0; i < bucket.entries.length; i++) {
    yield {
      type: 'search',
      value,
      hashCode,
      bucketIndex,
      chainIndex: i,
      message: `Checking if "${value}" already exists: comparing with "${bucket.entries[i].value}"`,
      state: cloneSetState(currentState),
      highlightBucket: bucketIndex,
      highlightEntry: { bucket: bucketIndex, index: i },
    };

    if (bucket.entries[i].value === value) {
      yield {
        type: 'duplicate',
        value,
        hashCode,
        bucketIndex,
        chainIndex: i,
        message: `"${value}" already exists in the set. Duplicate rejected!`,
        state: cloneSetState(currentState),
        highlightBucket: bucketIndex,
        highlightEntry: { bucket: bucketIndex, index: i },
      };
      return;
    }
  }

  // Insert new value
  currentState.buckets[bucketIndex].entries.push({ value, hashCode });
  currentState.size++;

  yield {
    type: 'insert',
    value,
    hashCode,
    bucketIndex,
    chainIndex: currentState.buckets[bucketIndex].entries.length - 1,
    message: `Added "${value}" to bucket ${bucketIndex}`,
    state: cloneSetState(currentState),
    highlightBucket: bucketIndex,
    highlightEntry: { bucket: bucketIndex, index: currentState.buckets[bucketIndex].entries.length - 1 },
  };

  // Check if rehashing is needed
  if (currentState.size > currentState.threshold) {
    yield* rehashSetGenerator(currentState);
  }
}

// Generator for contains operation
export function* containsGenerator(
  state: HashSetState,
  value: string
): Generator<HashSetStep> {
  const currentState = cloneSetState(state);

  // Step 1: Calculate hash code
  const hashCode = hashString(value);
  yield {
    type: 'hash',
    value,
    hashCode,
    message: `Calculate hashCode for "${value}": ${hashCode}`,
    state: cloneSetState(currentState),
  };

  // Step 2: Calculate bucket index
  const bucketIndex = getBucketIndex(hashCode, currentState.capacity);
  yield {
    type: 'index',
    value,
    hashCode,
    bucketIndex,
    message: `Calculate bucket index: ${hashCode} % ${currentState.capacity} = ${bucketIndex}`,
    state: cloneSetState(currentState),
    highlightBucket: bucketIndex,
  };

  // Step 3: Search in bucket
  const bucket = currentState.buckets[bucketIndex];

  for (let i = 0; i < bucket.entries.length; i++) {
    yield {
      type: 'search',
      value,
      hashCode,
      bucketIndex,
      chainIndex: i,
      message: `Searching: comparing "${value}" with "${bucket.entries[i].value}"`,
      state: cloneSetState(currentState),
      highlightBucket: bucketIndex,
      highlightEntry: { bucket: bucketIndex, index: i },
    };

    if (bucket.entries[i].value === value) {
      yield {
        type: 'found',
        value,
        hashCode,
        bucketIndex,
        chainIndex: i,
        message: `Found "${value}" in the set!`,
        state: cloneSetState(currentState),
        highlightBucket: bucketIndex,
        highlightEntry: { bucket: bucketIndex, index: i },
      };
      return;
    }
  }

  yield {
    type: 'not-found',
    value,
    hashCode,
    bucketIndex,
    message: `"${value}" is not in the set`,
    state: cloneSetState(currentState),
    highlightBucket: bucketIndex,
  };
}

// Generator for remove operation
export function* removeSetGenerator(
  state: HashSetState,
  value: string
): Generator<HashSetStep> {
  let currentState = cloneSetState(state);

  // Step 1: Calculate hash code
  const hashCode = hashString(value);
  yield {
    type: 'hash',
    value,
    hashCode,
    message: `Calculate hashCode for "${value}": ${hashCode}`,
    state: cloneSetState(currentState),
  };

  // Step 2: Calculate bucket index
  const bucketIndex = getBucketIndex(hashCode, currentState.capacity);
  yield {
    type: 'index',
    value,
    hashCode,
    bucketIndex,
    message: `Calculate bucket index: ${hashCode} % ${currentState.capacity} = ${bucketIndex}`,
    state: cloneSetState(currentState),
    highlightBucket: bucketIndex,
  };

  // Step 3: Search and remove
  const bucket = currentState.buckets[bucketIndex];

  for (let i = 0; i < bucket.entries.length; i++) {
    yield {
      type: 'search',
      value,
      hashCode,
      bucketIndex,
      chainIndex: i,
      message: `Searching: comparing "${value}" with "${bucket.entries[i].value}"`,
      state: cloneSetState(currentState),
      highlightBucket: bucketIndex,
      highlightEntry: { bucket: bucketIndex, index: i },
    };

    if (bucket.entries[i].value === value) {
      currentState.buckets[bucketIndex].entries.splice(i, 1);
      currentState.size--;

      yield {
        type: 'remove',
        value,
        hashCode,
        bucketIndex,
        message: `Removed "${value}" from bucket ${bucketIndex}`,
        state: cloneSetState(currentState),
        highlightBucket: bucketIndex,
      };
      return;
    }
  }

  yield {
    type: 'not-found',
    value,
    hashCode,
    bucketIndex,
    message: `"${value}" not found. Nothing to remove.`,
    state: cloneSetState(currentState),
    highlightBucket: bucketIndex,
  };
}

// Generator for rehashing
function* rehashSetGenerator(state: HashSetState): Generator<HashSetStep> {
  const oldState = cloneSetState(state);
  const newCapacity = state.capacity * 2;

  yield {
    type: 'rehash-start',
    message: `Load factor exceeded! Rehashing to capacity ${newCapacity}...`,
    state: cloneSetState(state),
  };

  // Create new state with doubled capacity
  const newBuckets = Array.from({ length: newCapacity }, () => ({ entries: [] as { value: string; hashCode: number }[] }));
  const newState: HashSetState = {
    buckets: newBuckets,
    size: state.size,
    capacity: newCapacity,
    loadFactor: state.loadFactor,
    threshold: Math.floor(newCapacity * state.loadFactor),
  };

  // Move all entries
  for (let oldBucketIdx = 0; oldBucketIdx < oldState.buckets.length; oldBucketIdx++) {
    for (const entry of oldState.buckets[oldBucketIdx].entries) {
      const newBucketIdx = getBucketIndex(entry.hashCode, newCapacity);
      newState.buckets[newBucketIdx].entries.push({ ...entry });

      yield {
        type: 'rehash-move',
        value: entry.value,
        hashCode: entry.hashCode,
        bucketIndex: newBucketIdx,
        message: `Moving "${entry.value}": old index ${oldBucketIdx} → new index ${newBucketIdx}`,
        state: cloneSetState(newState),
        highlightBucket: newBucketIdx,
      };
    }
  }

  yield {
    type: 'rehash-complete',
    message: `Rehashing complete! New capacity: ${newCapacity}`,
    state: cloneSetState(newState),
  };

  // Update the original state
  state.buckets = newState.buckets;
  state.capacity = newState.capacity;
  state.threshold = newState.threshold;
}

// Java-style code for display
export const hashSetCode = {
  add: `public boolean add(E element) {
    // HashSet uses HashMap internally
    // Stores element as key, dummy value as value
    return map.put(element, PRESENT) == null;
}`,
  contains: `public boolean contains(E element) {
    return map.containsKey(element);
}`,
  remove: `public boolean remove(E element) {
    return map.remove(element) == PRESENT;
}`,
};
