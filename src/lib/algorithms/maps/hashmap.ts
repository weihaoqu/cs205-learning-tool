import type { HashMapState, HashMapStep, HashMapEntry, Bucket } from './types';

// Simple hash function for strings (similar to Java's String.hashCode)
export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

// Calculate bucket index from hash code
export function getBucketIndex(hashCode: number, capacity: number): number {
  return hashCode % capacity;
}

// Create initial empty state
export function createInitialState(capacity: number = 8, loadFactor: number = 0.75): HashMapState {
  const buckets: Bucket[] = Array.from({ length: capacity }, () => ({ entries: [] }));
  return {
    buckets,
    size: 0,
    capacity,
    loadFactor,
    threshold: Math.floor(capacity * loadFactor),
  };
}

// Clone state for immutability
function cloneState(state: HashMapState): HashMapState {
  return {
    ...state,
    buckets: state.buckets.map(bucket => ({
      entries: bucket.entries.map(entry => ({ ...entry })),
    })),
  };
}

// Generator for put operation
export function* putGenerator(
  state: HashMapState,
  key: string,
  value: number
): Generator<HashMapStep> {
  let currentState = cloneState(state);

  // Step 1: Calculate hash code
  const hashCode = hashString(key);
  yield {
    type: 'hash',
    key,
    value,
    hashCode,
    message: `Calculate hashCode for "${key}": ${hashCode}`,
    state: cloneState(currentState),
  };

  // Step 2: Calculate bucket index
  const bucketIndex = getBucketIndex(hashCode, currentState.capacity);
  yield {
    type: 'index',
    key,
    value,
    hashCode,
    bucketIndex,
    message: `Calculate bucket index: ${hashCode} % ${currentState.capacity} = ${bucketIndex}`,
    state: cloneState(currentState),
    highlightBucket: bucketIndex,
  };

  // Step 3: Search for existing key in bucket
  const bucket = currentState.buckets[bucketIndex];
  let existingIndex = -1;

  for (let i = 0; i < bucket.entries.length; i++) {
    yield {
      type: 'search',
      key,
      value,
      hashCode,
      bucketIndex,
      chainIndex: i,
      message: `Searching bucket ${bucketIndex}: comparing with "${bucket.entries[i].key}"`,
      state: cloneState(currentState),
      highlightBucket: bucketIndex,
      highlightEntry: { bucket: bucketIndex, index: i },
    };

    if (bucket.entries[i].key === key) {
      existingIndex = i;
      break;
    }
  }

  if (existingIndex >= 0) {
    // Update existing entry
    const oldValue = currentState.buckets[bucketIndex].entries[existingIndex].value;
    currentState.buckets[bucketIndex].entries[existingIndex].value = value;

    yield {
      type: 'update',
      key,
      value,
      hashCode,
      bucketIndex,
      chainIndex: existingIndex,
      message: `Key "${key}" exists. Updating value from ${oldValue} to ${value}`,
      state: cloneState(currentState),
      highlightBucket: bucketIndex,
      highlightEntry: { bucket: bucketIndex, index: existingIndex },
    };
  } else {
    // Check for collision
    if (bucket.entries.length > 0) {
      yield {
        type: 'collision',
        key,
        value,
        hashCode,
        bucketIndex,
        message: `Collision detected! Bucket ${bucketIndex} already has ${bucket.entries.length} entry(ies). Adding to chain.`,
        state: cloneState(currentState),
        highlightBucket: bucketIndex,
      };
    }

    // Insert new entry
    const newEntry: HashMapEntry = { key, value, hashCode };
    currentState.buckets[bucketIndex].entries.push(newEntry);
    currentState.size++;

    yield {
      type: 'insert',
      key,
      value,
      hashCode,
      bucketIndex,
      chainIndex: currentState.buckets[bucketIndex].entries.length - 1,
      message: `Inserted "${key}" → ${value} at bucket ${bucketIndex}`,
      state: cloneState(currentState),
      highlightBucket: bucketIndex,
      highlightEntry: { bucket: bucketIndex, index: currentState.buckets[bucketIndex].entries.length - 1 },
    };

    // Check if rehashing is needed
    if (currentState.size > currentState.threshold) {
      yield* rehashGenerator(currentState);
    }
  }

  yield {
    type: 'complete',
    key,
    value,
    message: `Operation complete. Size: ${currentState.size}/${currentState.capacity}`,
    state: cloneState(currentState),
  };
}

// Generator for get operation
export function* getGenerator(
  state: HashMapState,
  key: string
): Generator<HashMapStep> {
  const currentState = cloneState(state);

  // Step 1: Calculate hash code
  const hashCode = hashString(key);
  yield {
    type: 'hash',
    key,
    hashCode,
    message: `Calculate hashCode for "${key}": ${hashCode}`,
    state: cloneState(currentState),
  };

  // Step 2: Calculate bucket index
  const bucketIndex = getBucketIndex(hashCode, currentState.capacity);
  yield {
    type: 'index',
    key,
    hashCode,
    bucketIndex,
    message: `Calculate bucket index: ${hashCode} % ${currentState.capacity} = ${bucketIndex}`,
    state: cloneState(currentState),
    highlightBucket: bucketIndex,
  };

  // Step 3: Search in bucket
  const bucket = currentState.buckets[bucketIndex];

  for (let i = 0; i < bucket.entries.length; i++) {
    yield {
      type: 'search',
      key,
      hashCode,
      bucketIndex,
      chainIndex: i,
      message: `Searching: comparing "${key}" with "${bucket.entries[i].key}"`,
      state: cloneState(currentState),
      highlightBucket: bucketIndex,
      highlightEntry: { bucket: bucketIndex, index: i },
    };

    if (bucket.entries[i].key === key) {
      yield {
        type: 'found',
        key,
        value: bucket.entries[i].value,
        hashCode,
        bucketIndex,
        chainIndex: i,
        message: `Found "${key}" → ${bucket.entries[i].value}`,
        state: cloneState(currentState),
        highlightBucket: bucketIndex,
        highlightEntry: { bucket: bucketIndex, index: i },
      };
      return;
    }
  }

  yield {
    type: 'not-found',
    key,
    hashCode,
    bucketIndex,
    message: `Key "${key}" not found in the map`,
    state: cloneState(currentState),
    highlightBucket: bucketIndex,
  };
}

// Generator for remove operation
export function* removeGenerator(
  state: HashMapState,
  key: string
): Generator<HashMapStep> {
  let currentState = cloneState(state);

  // Step 1: Calculate hash code
  const hashCode = hashString(key);
  yield {
    type: 'hash',
    key,
    hashCode,
    message: `Calculate hashCode for "${key}": ${hashCode}`,
    state: cloneState(currentState),
  };

  // Step 2: Calculate bucket index
  const bucketIndex = getBucketIndex(hashCode, currentState.capacity);
  yield {
    type: 'index',
    key,
    hashCode,
    bucketIndex,
    message: `Calculate bucket index: ${hashCode} % ${currentState.capacity} = ${bucketIndex}`,
    state: cloneState(currentState),
    highlightBucket: bucketIndex,
  };

  // Step 3: Search and remove
  const bucket = currentState.buckets[bucketIndex];

  for (let i = 0; i < bucket.entries.length; i++) {
    yield {
      type: 'search',
      key,
      hashCode,
      bucketIndex,
      chainIndex: i,
      message: `Searching: comparing "${key}" with "${bucket.entries[i].key}"`,
      state: cloneState(currentState),
      highlightBucket: bucketIndex,
      highlightEntry: { bucket: bucketIndex, index: i },
    };

    if (bucket.entries[i].key === key) {
      const removedValue = bucket.entries[i].value;
      currentState.buckets[bucketIndex].entries.splice(i, 1);
      currentState.size--;

      yield {
        type: 'remove',
        key,
        value: removedValue,
        hashCode,
        bucketIndex,
        message: `Removed "${key}" → ${removedValue} from bucket ${bucketIndex}`,
        state: cloneState(currentState),
        highlightBucket: bucketIndex,
      };

      yield {
        type: 'complete',
        key,
        message: `Remove complete. Size: ${currentState.size}/${currentState.capacity}`,
        state: cloneState(currentState),
      };
      return;
    }
  }

  yield {
    type: 'not-found',
    key,
    hashCode,
    bucketIndex,
    message: `Key "${key}" not found. Nothing to remove.`,
    state: cloneState(currentState),
    highlightBucket: bucketIndex,
  };
}

// Generator for rehashing
export function* rehashGenerator(state: HashMapState): Generator<HashMapStep> {
  const oldState = cloneState(state);
  const newCapacity = state.capacity * 2;

  yield {
    type: 'rehash-start',
    message: `Load factor exceeded! Size (${state.size}) > Threshold (${state.threshold}). Rehashing to capacity ${newCapacity}...`,
    state: cloneState(state),
    oldState: cloneState(oldState),
  };

  // Create new state with doubled capacity
  const newBuckets: Bucket[] = Array.from({ length: newCapacity }, () => ({ entries: [] }));
  const newState: HashMapState = {
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
        key: entry.key,
        value: entry.value,
        hashCode: entry.hashCode,
        bucketIndex: newBucketIdx,
        message: `Moving "${entry.key}": old index ${oldBucketIdx} → new index ${newBucketIdx} (${entry.hashCode} % ${newCapacity})`,
        state: cloneState(newState),
        oldState: cloneState(oldState),
        highlightBucket: newBucketIdx,
      };
    }
  }

  yield {
    type: 'rehash-complete',
    message: `Rehashing complete! New capacity: ${newCapacity}, New threshold: ${newState.threshold}`,
    state: cloneState(newState),
    oldState: cloneState(oldState),
  };

  // Update the original state reference
  state.buckets = newState.buckets;
  state.capacity = newState.capacity;
  state.threshold = newState.threshold;
}

// Generate all steps for a sequence of operations
export function generateHashMapSteps(
  operations: { type: 'put' | 'get' | 'remove'; key: string; value?: number }[],
  initialCapacity: number = 8
): HashMapStep[] {
  const steps: HashMapStep[] = [];
  let state = createInitialState(initialCapacity);

  steps.push({
    type: 'init',
    message: `Initialize HashMap with capacity ${initialCapacity}, load factor 0.75`,
    state: cloneState(state),
  });

  for (const op of operations) {
    if (op.type === 'put' && op.value !== undefined) {
      for (const step of putGenerator(state, op.key, op.value)) {
        steps.push(step);
        state = step.state;
      }
    } else if (op.type === 'get') {
      for (const step of getGenerator(state, op.key)) {
        steps.push(step);
      }
    } else if (op.type === 'remove') {
      for (const step of removeGenerator(state, op.key)) {
        steps.push(step);
        state = step.state;
      }
    }
  }

  return steps;
}

// Java-style code for display
export const hashMapCode = {
  put: `public V put(K key, V value) {
    int hash = key.hashCode();
    int index = hash % capacity;

    // Search for existing key
    for (Entry e : buckets[index]) {
        if (e.key.equals(key)) {
            V oldValue = e.value;
            e.value = value;
            return oldValue;
        }
    }

    // Add new entry
    buckets[index].add(new Entry(key, value, hash));
    size++;

    // Check if rehashing needed
    if (size > threshold) {
        rehash();
    }
    return null;
}`,
  get: `public V get(K key) {
    int hash = key.hashCode();
    int index = hash % capacity;

    for (Entry e : buckets[index]) {
        if (e.key.equals(key)) {
            return e.value;
        }
    }
    return null;
}`,
  remove: `public V remove(K key) {
    int hash = key.hashCode();
    int index = hash % capacity;

    Iterator<Entry> it = buckets[index].iterator();
    while (it.hasNext()) {
        Entry e = it.next();
        if (e.key.equals(key)) {
            it.remove();
            size--;
            return e.value;
        }
    }
    return null;
}`,
};
