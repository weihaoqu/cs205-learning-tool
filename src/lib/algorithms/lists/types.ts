// Types for List data structures and animations

export type ListType = 'arraylist' | 'singly-linked' | 'doubly-linked';

export interface ListNode {
  id: string;
  value: number;
  next: string | null; // ID of next node
  prev: string | null; // ID of prev node (for doubly linked)
}

export interface ArrayListState {
  type: 'arraylist';
  data: (number | null)[]; // Backing array (may have null slots for capacity)
  size: number;
  capacity: number;
}

export interface LinkedListState {
  type: 'singly-linked' | 'doubly-linked';
  nodes: Map<string, ListNode>;
  head: string | null;
  tail: string | null;
  size: number;
}

export type ListState = ArrayListState | LinkedListState;

export type ListOperation =
  | 'add'
  | 'addFirst'
  | 'addLast'
  | 'get'
  | 'set'
  | 'remove'
  | 'removeFirst'
  | 'removeLast';

export interface ListAnimationStep {
  type:
    | 'highlight-index'      // Highlight an index in ArrayList
    | 'highlight-node'       // Highlight a node in LinkedList
    | 'highlight-pointer'    // Highlight a pointer/reference
    | 'shift-right'          // Shift elements right (ArrayList insert)
    | 'shift-left'           // Shift elements left (ArrayList remove)
    | 'resize'               // ArrayList capacity doubling
    | 'create-node'          // Create a new node
    | 'update-pointer'       // Update next/prev pointer
    | 'update-head'          // Update head reference
    | 'update-tail'          // Update tail reference
    | 'delete-node'          // Remove a node
    | 'traverse'             // Traversing to find index
    | 'insert-value'         // Insert value at position
    | 'remove-value'         // Remove value from position
    | 'complete';            // Operation complete

  description: string;

  // For ArrayList operations
  index?: number;
  fromIndex?: number;
  toIndex?: number;
  value?: number;
  oldCapacity?: number;
  newCapacity?: number;

  // For LinkedList operations
  nodeId?: string | null;
  targetNodeId?: string | null;
  pointerType?: 'next' | 'prev' | 'head' | 'tail';

  // Code highlighting
  codeLineStart?: number;
  codeLineEnd?: number;

  // State snapshot after this step
  state: ListState;
}

export interface ListOperationResult {
  steps: ListAnimationStep[];
  finalState: ListState;
  returnValue?: number | null;
  error?: string;
}

// Pseudocode for operations
export interface ListPseudocode {
  operation: ListOperation;
  listType: ListType;
  pseudocode: string[];
  javaCode: string;
}
