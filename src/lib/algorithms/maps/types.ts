// Types for HashMap and HashSet visualizations

export interface HashMapEntry<K = string, V = number> {
  key: K;
  value: V;
  hashCode: number;
}

export interface Bucket<K = string, V = number> {
  entries: HashMapEntry<K, V>[];
}

export interface HashMapState<K = string, V = number> {
  buckets: Bucket<K, V>[];
  size: number;
  capacity: number;
  loadFactor: number;
  threshold: number; // capacity * loadFactor
}

export type HashMapStepType =
  | 'init'
  | 'hash'
  | 'index'
  | 'search'
  | 'found'
  | 'not-found'
  | 'insert'
  | 'update'
  | 'remove'
  | 'collision'
  | 'rehash-start'
  | 'rehash-move'
  | 'rehash-complete'
  | 'complete';

export interface HashMapStep<K = string, V = number> {
  type: HashMapStepType;
  key?: K;
  value?: V;
  hashCode?: number;
  bucketIndex?: number;
  chainIndex?: number; // position in the chain (for collisions)
  message: string;
  state: HashMapState<K, V>;
  highlightBucket?: number;
  highlightEntry?: { bucket: number; index: number };
  oldState?: HashMapState<K, V>; // for rehashing comparison
}

export interface HashSetState<T = string> {
  buckets: { entries: { value: T; hashCode: number }[] }[];
  size: number;
  capacity: number;
  loadFactor: number;
  threshold: number;
}

export type HashSetStepType =
  | 'init'
  | 'hash'
  | 'index'
  | 'search'
  | 'found'
  | 'not-found'
  | 'insert'
  | 'duplicate'
  | 'remove'
  | 'rehash-start'
  | 'rehash-move'
  | 'rehash-complete'
  | 'complete';

export interface HashSetStep<T = string> {
  type: HashSetStepType;
  value?: T;
  hashCode?: number;
  bucketIndex?: number;
  chainIndex?: number;
  message: string;
  state: HashSetState<T>;
  highlightBucket?: number;
  highlightEntry?: { bucket: number; index: number };
}

// Hash function info
export const HASH_INFO = {
  defaultCapacity: 8,
  defaultLoadFactor: 0.75,
  description: 'Hash tables use a hash function to compute an index into an array of buckets.',
};
