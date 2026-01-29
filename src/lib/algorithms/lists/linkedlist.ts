// LinkedList operations with animation steps (Singly and Doubly)

import {
  LinkedListState,
  ListNode,
  ListAnimationStep,
  ListOperationResult,
} from './types';

let nodeIdCounter = 0;

function generateNodeId(): string {
  return `node_${++nodeIdCounter}`;
}

export function createLinkedList(
  type: 'singly-linked' | 'doubly-linked',
  initialValues: number[] = []
): LinkedListState {
  const nodes = new Map<string, ListNode>();
  let head: string | null = null;
  let tail: string | null = null;
  let prevId: string | null = null;

  for (const value of initialValues) {
    const id = generateNodeId();
    const node: ListNode = {
      id,
      value,
      next: null,
      prev: type === 'doubly-linked' ? prevId : null,
    };

    nodes.set(id, node);

    if (prevId !== null) {
      const prevNode = nodes.get(prevId)!;
      prevNode.next = id;
    }

    if (head === null) {
      head = id;
    }
    tail = id;
    prevId = id;
  }

  return {
    type,
    nodes,
    head,
    tail,
    size: initialValues.length,
  };
}

function cloneState(state: LinkedListState): LinkedListState {
  const newNodes = new Map<string, ListNode>();
  state.nodes.forEach((node, id) => {
    newNodes.set(id, { ...node });
  });
  return {
    ...state,
    nodes: newNodes,
  };
}

function getNodeAtIndex(state: LinkedListState, index: number): string | null {
  if (index < 0 || index >= state.size) return null;

  let current = state.head;
  for (let i = 0; i < index && current !== null; i++) {
    current = state.nodes.get(current)!.next;
  }
  return current;
}

export function linkedListAdd(
  state: LinkedListState,
  index: number,
  value: number
): ListOperationResult {
  const steps: ListAnimationStep[] = [];
  let currentState = cloneState(state);
  const isDoubly = state.type === 'doubly-linked';

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

  // Create new node
  const newNodeId = generateNodeId();
  const newNode: ListNode = {
    id: newNodeId,
    value,
    next: null,
    prev: null,
  };

  steps.push({
    type: 'create-node',
    description: `Creating new node with value ${value}.`,
    nodeId: newNodeId,
    value,
    codeLineStart: 2,
    codeLineEnd: 2,
    state: cloneState(currentState),
  });

  // Case 1: Adding to empty list
  if (currentState.size === 0) {
    currentState.nodes.set(newNodeId, newNode);
    currentState.head = newNodeId;
    currentState.tail = newNodeId;
    currentState.size = 1;

    steps.push({
      type: 'update-head',
      description: `List was empty. Setting head to new node.`,
      nodeId: newNodeId,
      pointerType: 'head',
      state: cloneState(currentState),
    });

    steps.push({
      type: 'update-tail',
      description: `Setting tail to new node.`,
      nodeId: newNodeId,
      pointerType: 'tail',
      state: cloneState(currentState),
    });
  }
  // Case 2: Adding at beginning (index 0)
  else if (index === 0) {
    newNode.next = currentState.head;
    if (isDoubly && currentState.head) {
      const oldHead = currentState.nodes.get(currentState.head)!;
      oldHead.prev = newNodeId;
      steps.push({
        type: 'update-pointer',
        description: `Setting old head's prev to new node.`,
        nodeId: currentState.head,
        targetNodeId: newNodeId,
        pointerType: 'prev',
        state: cloneState(currentState),
      });
    }

    currentState.nodes.set(newNodeId, newNode);
    currentState.head = newNodeId;
    currentState.size++;

    steps.push({
      type: 'update-pointer',
      description: `Setting new node's next to old head.`,
      nodeId: newNodeId,
      targetNodeId: newNode.next,
      pointerType: 'next',
      state: cloneState(currentState),
    });

    steps.push({
      type: 'update-head',
      description: `Updating head to point to new node.`,
      nodeId: newNodeId,
      pointerType: 'head',
      state: cloneState(currentState),
    });
  }
  // Case 3: Adding at end
  else if (index === currentState.size) {
    if (currentState.tail) {
      const tailNode = currentState.nodes.get(currentState.tail)!;
      tailNode.next = newNodeId;
      newNode.prev = isDoubly ? currentState.tail : null;

      steps.push({
        type: 'update-pointer',
        description: `Setting old tail's next to new node.`,
        nodeId: currentState.tail,
        targetNodeId: newNodeId,
        pointerType: 'next',
        state: cloneState(currentState),
      });

      if (isDoubly) {
        steps.push({
          type: 'update-pointer',
          description: `Setting new node's prev to old tail.`,
          nodeId: newNodeId,
          targetNodeId: currentState.tail,
          pointerType: 'prev',
          state: cloneState(currentState),
        });
      }
    }

    currentState.nodes.set(newNodeId, newNode);
    currentState.tail = newNodeId;
    currentState.size++;

    steps.push({
      type: 'update-tail',
      description: `Updating tail to point to new node.`,
      nodeId: newNodeId,
      pointerType: 'tail',
      state: cloneState(currentState),
    });
  }
  // Case 4: Adding in middle
  else {
    // Traverse to find the node before insertion point
    let prevNode = currentState.head;
    for (let i = 0; i < index - 1; i++) {
      steps.push({
        type: 'traverse',
        description: `Traversing: at index ${i}, moving to next node.`,
        nodeId: prevNode!,
        codeLineStart: 5,
        codeLineEnd: 6,
        state: cloneState(currentState),
      });
      prevNode = currentState.nodes.get(prevNode!)!.next;
    }

    steps.push({
      type: 'highlight-node',
      description: `Found insertion point: inserting after node at index ${index - 1}.`,
      nodeId: prevNode!,
      state: cloneState(currentState),
    });

    const prevNodeObj = currentState.nodes.get(prevNode!)!;
    const nextNodeId = prevNodeObj.next;

    // Update pointers
    newNode.next = nextNodeId;
    newNode.prev = isDoubly ? prevNode : null;

    currentState.nodes.set(newNodeId, newNode);

    steps.push({
      type: 'update-pointer',
      description: `Setting new node's next to node at index ${index}.`,
      nodeId: newNodeId,
      targetNodeId: nextNodeId,
      pointerType: 'next',
      state: cloneState(currentState),
    });

    if (isDoubly) {
      steps.push({
        type: 'update-pointer',
        description: `Setting new node's prev to node at index ${index - 1}.`,
        nodeId: newNodeId,
        targetNodeId: prevNode,
        pointerType: 'prev',
        state: cloneState(currentState),
      });
    }

    prevNodeObj.next = newNodeId;

    steps.push({
      type: 'update-pointer',
      description: `Setting node at index ${index - 1}'s next to new node.`,
      nodeId: prevNode!,
      targetNodeId: newNodeId,
      pointerType: 'next',
      state: cloneState(currentState),
    });

    if (isDoubly && nextNodeId) {
      const nextNode = currentState.nodes.get(nextNodeId)!;
      nextNode.prev = newNodeId;
      steps.push({
        type: 'update-pointer',
        description: `Setting node at index ${index + 1}'s prev to new node.`,
        nodeId: nextNodeId,
        targetNodeId: newNodeId,
        pointerType: 'prev',
        state: cloneState(currentState),
      });
    }

    currentState.size++;
  }

  steps.push({
    type: 'complete',
    description: `Successfully added ${value} at index ${index}. Size is now ${currentState.size}.`,
    state: cloneState(currentState),
  });

  return {
    steps,
    finalState: currentState,
  };
}

export function linkedListAddFirst(
  state: LinkedListState,
  value: number
): ListOperationResult {
  return linkedListAdd(state, 0, value);
}

export function linkedListAddLast(
  state: LinkedListState,
  value: number
): ListOperationResult {
  return linkedListAdd(state, state.size, value);
}

export function linkedListGet(
  state: LinkedListState,
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

  // Traverse to find the node
  let current = currentState.head;
  for (let i = 0; i < index; i++) {
    steps.push({
      type: 'traverse',
      description: `Traversing: at index ${i}, moving to next node.`,
      nodeId: current!,
      codeLineStart: 4,
      codeLineEnd: 5,
      state: currentState,
    });
    current = currentState.nodes.get(current!)!.next;
  }

  const node = currentState.nodes.get(current!)!;

  steps.push({
    type: 'highlight-node',
    description: `Found node at index ${index} with value ${node.value}.`,
    nodeId: current!,
    value: node.value,
    state: currentState,
  });

  steps.push({
    type: 'complete',
    description: `Retrieved value ${node.value} from index ${index}. Required ${index} traversals. Time complexity: O(n).`,
    nodeId: current!,
    value: node.value,
    state: currentState,
  });

  return {
    steps,
    finalState: currentState,
    returnValue: node.value,
  };
}

export function linkedListSet(
  state: LinkedListState,
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

  // Traverse to find the node
  let current = currentState.head;
  for (let i = 0; i < index; i++) {
    steps.push({
      type: 'traverse',
      description: `Traversing: at index ${i}, moving to next node.`,
      nodeId: current!,
      state: cloneState(currentState),
    });
    current = currentState.nodes.get(current!)!.next;
  }

  const node = currentState.nodes.get(current!)!;
  const oldValue = node.value;

  steps.push({
    type: 'highlight-node',
    description: `Found node at index ${index}. Changing value from ${oldValue} to ${value}.`,
    nodeId: current!,
    value: oldValue,
    state: cloneState(currentState),
  });

  node.value = value;

  steps.push({
    type: 'complete',
    description: `Set index ${index} to ${value}. Previous value was ${oldValue}.`,
    nodeId: current!,
    value,
    state: cloneState(currentState),
  });

  return {
    steps,
    finalState: currentState,
    returnValue: oldValue,
  };
}

export function linkedListRemove(
  state: LinkedListState,
  index: number
): ListOperationResult {
  const steps: ListAnimationStep[] = [];
  let currentState = cloneState(state);
  const isDoubly = state.type === 'doubly-linked';

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

  // Case 1: Removing from single-element list
  if (currentState.size === 1) {
    const nodeId = currentState.head!;
    const removedValue = currentState.nodes.get(nodeId)!.value;

    steps.push({
      type: 'highlight-node',
      description: `Removing only node (value: ${removedValue}).`,
      nodeId,
      value: removedValue,
      state: cloneState(currentState),
    });

    currentState.nodes.delete(nodeId);
    currentState.head = null;
    currentState.tail = null;
    currentState.size = 0;

    steps.push({
      type: 'update-head',
      description: `Setting head to null.`,
      pointerType: 'head',
      state: cloneState(currentState),
    });

    steps.push({
      type: 'update-tail',
      description: `Setting tail to null.`,
      pointerType: 'tail',
      state: cloneState(currentState),
    });

    steps.push({
      type: 'complete',
      description: `Removed ${removedValue}. List is now empty.`,
      value: removedValue,
      state: cloneState(currentState),
    });

    return {
      steps,
      finalState: currentState,
      returnValue: removedValue,
    };
  }

  // Case 2: Removing first element
  if (index === 0) {
    const nodeId = currentState.head!;
    const node = currentState.nodes.get(nodeId)!;
    const removedValue = node.value;

    steps.push({
      type: 'highlight-node',
      description: `Removing first node (value: ${removedValue}).`,
      nodeId,
      value: removedValue,
      state: cloneState(currentState),
    });

    const newHead = node.next;
    currentState.head = newHead;

    if (isDoubly && newHead) {
      const newHeadNode = currentState.nodes.get(newHead)!;
      newHeadNode.prev = null;
      steps.push({
        type: 'update-pointer',
        description: `Setting new head's prev to null.`,
        nodeId: newHead,
        pointerType: 'prev',
        state: cloneState(currentState),
      });
    }

    steps.push({
      type: 'update-head',
      description: `Updating head to next node.`,
      nodeId: newHead,
      pointerType: 'head',
      state: cloneState(currentState),
    });

    currentState.nodes.delete(nodeId);
    currentState.size--;

    steps.push({
      type: 'delete-node',
      description: `Deleted old head node.`,
      nodeId,
      state: cloneState(currentState),
    });

    steps.push({
      type: 'complete',
      description: `Removed ${removedValue} from index 0. Size is now ${currentState.size}.`,
      value: removedValue,
      state: cloneState(currentState),
    });

    return {
      steps,
      finalState: currentState,
      returnValue: removedValue,
    };
  }

  // Case 3: Removing last element
  if (index === currentState.size - 1) {
    const nodeId = currentState.tail!;
    const node = currentState.nodes.get(nodeId)!;
    const removedValue = node.value;

    steps.push({
      type: 'highlight-node',
      description: `Removing last node (value: ${removedValue}).`,
      nodeId,
      value: removedValue,
      state: cloneState(currentState),
    });

    // Find the new tail (node before current tail)
    let newTail = currentState.head;
    if (isDoubly) {
      newTail = node.prev;
    } else {
      // For singly linked, traverse to find previous node
      while (newTail && currentState.nodes.get(newTail)!.next !== nodeId) {
        steps.push({
          type: 'traverse',
          description: `Traversing to find node before tail.`,
          nodeId: newTail,
          state: cloneState(currentState),
        });
        newTail = currentState.nodes.get(newTail)!.next;
      }
    }

    if (newTail) {
      const newTailNode = currentState.nodes.get(newTail)!;
      newTailNode.next = null;
      steps.push({
        type: 'update-pointer',
        description: `Setting new tail's next to null.`,
        nodeId: newTail,
        pointerType: 'next',
        state: cloneState(currentState),
      });
    }

    currentState.tail = newTail;
    currentState.nodes.delete(nodeId);
    currentState.size--;

    steps.push({
      type: 'update-tail',
      description: `Updating tail to previous node.`,
      nodeId: newTail,
      pointerType: 'tail',
      state: cloneState(currentState),
    });

    steps.push({
      type: 'delete-node',
      description: `Deleted old tail node.`,
      nodeId,
      state: cloneState(currentState),
    });

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

  // Case 4: Removing from middle
  let prevNode = currentState.head;
  for (let i = 0; i < index - 1; i++) {
    steps.push({
      type: 'traverse',
      description: `Traversing: at index ${i}, moving to next node.`,
      nodeId: prevNode!,
      state: cloneState(currentState),
    });
    prevNode = currentState.nodes.get(prevNode!)!.next;
  }

  const prevNodeObj = currentState.nodes.get(prevNode!)!;
  const nodeToRemove = prevNodeObj.next!;
  const nodeToRemoveObj = currentState.nodes.get(nodeToRemove)!;
  const removedValue = nodeToRemoveObj.value;
  const nextNode = nodeToRemoveObj.next;

  steps.push({
    type: 'highlight-node',
    description: `Found node to remove at index ${index} (value: ${removedValue}).`,
    nodeId: nodeToRemove,
    value: removedValue,
    state: cloneState(currentState),
  });

  // Update pointers
  prevNodeObj.next = nextNode;
  steps.push({
    type: 'update-pointer',
    description: `Setting previous node's next to skip removed node.`,
    nodeId: prevNode!,
    targetNodeId: nextNode,
    pointerType: 'next',
    state: cloneState(currentState),
  });

  if (isDoubly && nextNode) {
    const nextNodeObj = currentState.nodes.get(nextNode)!;
    nextNodeObj.prev = prevNode;
    steps.push({
      type: 'update-pointer',
      description: `Setting next node's prev to skip removed node.`,
      nodeId: nextNode,
      targetNodeId: prevNode,
      pointerType: 'prev',
      state: cloneState(currentState),
    });
  }

  currentState.nodes.delete(nodeToRemove);
  currentState.size--;

  steps.push({
    type: 'delete-node',
    description: `Deleted node.`,
    nodeId: nodeToRemove,
    state: cloneState(currentState),
  });

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

export function linkedListRemoveFirst(
  state: LinkedListState
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
  return linkedListRemove(state, 0);
}

export function linkedListRemoveLast(
  state: LinkedListState
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
  return linkedListRemove(state, state.size - 1);
}

// Java code templates
export const singlyLinkedListCode = {
  nodeClass: `private class Node {
    E data;
    Node next;

    Node(E data) {
        this.data = data;
        this.next = null;
    }
}`,

  add: `public void add(int index, E element) {
    if (index < 0 || index > size)
        throw new IndexOutOfBoundsException();
    Node newNode = new Node(element);
    if (index == 0) {
        newNode.next = head;
        head = newNode;
        if (tail == null) tail = newNode;
    } else if (index == size) {
        tail.next = newNode;
        tail = newNode;
    } else {
        Node prev = getNode(index - 1);
        newNode.next = prev.next;
        prev.next = newNode;
    }
    size++;
}`,

  addFirst: `public void addFirst(E element) {
    Node newNode = new Node(element);
    newNode.next = head;
    head = newNode;
    if (tail == null) tail = newNode;
    size++;
}`,

  addLast: `public void addLast(E element) {
    Node newNode = new Node(element);
    if (tail == null) {
        head = tail = newNode;
    } else {
        tail.next = newNode;
        tail = newNode;
    }
    size++;
}`,

  get: `public E get(int index) {
    if (index < 0 || index >= size)
        throw new IndexOutOfBoundsException();
    Node current = head;
    for (int i = 0; i < index; i++) {
        current = current.next;
    }
    return current.data;
}`,

  set: `public E set(int index, E element) {
    if (index < 0 || index >= size)
        throw new IndexOutOfBoundsException();
    Node current = head;
    for (int i = 0; i < index; i++) {
        current = current.next;
    }
    E oldValue = current.data;
    current.data = element;
    return oldValue;
}`,

  remove: `public E remove(int index) {
    if (index < 0 || index >= size)
        throw new IndexOutOfBoundsException();
    E removed;
    if (index == 0) {
        removed = head.data;
        head = head.next;
        if (head == null) tail = null;
    } else {
        Node prev = getNode(index - 1);
        removed = prev.next.data;
        prev.next = prev.next.next;
        if (index == size - 1) tail = prev;
    }
    size--;
    return removed;
}`,

  removeFirst: `public E removeFirst() {
    if (size == 0)
        throw new NoSuchElementException();
    E removed = head.data;
    head = head.next;
    if (head == null) tail = null;
    size--;
    return removed;
}`,

  removeLast: `public E removeLast() {
    if (size == 0)
        throw new NoSuchElementException();
    if (size == 1) {
        E removed = head.data;
        head = tail = null;
        size = 0;
        return removed;
    }
    Node prev = head;
    while (prev.next != tail) {
        prev = prev.next;
    }
    E removed = tail.data;
    tail = prev;
    tail.next = null;
    size--;
    return removed;
}`,
};

export const doublyLinkedListCode = {
  nodeClass: `private class Node {
    E data;
    Node next;
    Node prev;

    Node(E data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}`,

  add: `public void add(int index, E element) {
    if (index < 0 || index > size)
        throw new IndexOutOfBoundsException();
    Node newNode = new Node(element);
    if (size == 0) {
        head = tail = newNode;
    } else if (index == 0) {
        newNode.next = head;
        head.prev = newNode;
        head = newNode;
    } else if (index == size) {
        newNode.prev = tail;
        tail.next = newNode;
        tail = newNode;
    } else {
        Node current = getNode(index);
        newNode.next = current;
        newNode.prev = current.prev;
        current.prev.next = newNode;
        current.prev = newNode;
    }
    size++;
}`,

  addFirst: `public void addFirst(E element) {
    Node newNode = new Node(element);
    if (head == null) {
        head = tail = newNode;
    } else {
        newNode.next = head;
        head.prev = newNode;
        head = newNode;
    }
    size++;
}`,

  addLast: `public void addLast(E element) {
    Node newNode = new Node(element);
    if (tail == null) {
        head = tail = newNode;
    } else {
        newNode.prev = tail;
        tail.next = newNode;
        tail = newNode;
    }
    size++;
}`,

  get: `public E get(int index) {
    if (index < 0 || index >= size)
        throw new IndexOutOfBoundsException();
    Node current;
    if (index < size / 2) {
        current = head;
        for (int i = 0; i < index; i++)
            current = current.next;
    } else {
        current = tail;
        for (int i = size - 1; i > index; i--)
            current = current.prev;
    }
    return current.data;
}`,

  set: `public E set(int index, E element) {
    if (index < 0 || index >= size)
        throw new IndexOutOfBoundsException();
    Node node = getNode(index);
    E oldValue = node.data;
    node.data = element;
    return oldValue;
}`,

  remove: `public E remove(int index) {
    if (index < 0 || index >= size)
        throw new IndexOutOfBoundsException();
    Node toRemove = getNode(index);
    E removed = toRemove.data;
    if (toRemove.prev != null)
        toRemove.prev.next = toRemove.next;
    else
        head = toRemove.next;
    if (toRemove.next != null)
        toRemove.next.prev = toRemove.prev;
    else
        tail = toRemove.prev;
    size--;
    return removed;
}`,

  removeFirst: `public E removeFirst() {
    if (size == 0)
        throw new NoSuchElementException();
    E removed = head.data;
    head = head.next;
    if (head == null)
        tail = null;
    else
        head.prev = null;
    size--;
    return removed;
}`,

  removeLast: `public E removeLast() {
    if (size == 0)
        throw new NoSuchElementException();
    E removed = tail.data;
    tail = tail.prev;
    if (tail == null)
        head = null;
    else
        tail.next = null;
    size--;
    return removed;
}`,
};

export const linkedListPseudocode = {
  singly: {
    add: [
      '1. Check if index is valid (0 to size)',
      '2. Create a new node with the element',
      '3. If adding at index 0:',
      '   - Point new node to current head',
      '   - Update head to new node',
      '4. If adding at end:',
      '   - Point current tail to new node',
      '   - Update tail to new node',
      '5. If adding in middle:',
      '   - Traverse to node at index-1',
      '   - Point new node to node at index',
      '   - Point previous node to new node',
      '6. Increment size',
    ],
    addFirst: [
      '1. Create a new node',
      '2. Point new node\'s next to current head',
      '3. Update head to new node',
      '4. If list was empty, update tail too',
      '5. Increment size',
    ],
    addLast: [
      '1. Create a new node',
      '2. If list is empty, set head and tail to new node',
      '3. Otherwise, point current tail to new node',
      '4. Update tail to new node',
      '5. Increment size',
    ],
    get: [
      '1. Check if index is valid (0 to size-1)',
      '2. Start at head',
      '3. Traverse index times following next pointers',
      '4. Return the data at current node',
    ],
    set: [
      '1. Check if index is valid (0 to size-1)',
      '2. Traverse to node at index',
      '3. Save old value',
      '4. Update node\'s data',
      '5. Return old value',
    ],
    remove: [
      '1. Check if index is valid (0 to size-1)',
      '2. If removing first:',
      '   - Save head\'s data',
      '   - Update head to head.next',
      '3. Otherwise:',
      '   - Traverse to node at index-1',
      '   - Save next node\'s data',
      '   - Point previous node to skip removed node',
      '4. Update tail if needed',
      '5. Decrement size',
      '6. Return removed data',
    ],
    removeFirst: [
      '1. Check if list is empty',
      '2. Save head\'s data',
      '3. Update head to head.next',
      '4. If list is now empty, update tail to null',
      '5. Decrement size',
      '6. Return removed data',
    ],
    removeLast: [
      '1. Check if list is empty',
      '2. If only one element, clear head and tail',
      '3. Otherwise, traverse to second-to-last node',
      '4. Save tail\'s data',
      '5. Update tail to previous node',
      '6. Set new tail\'s next to null',
      '7. Decrement size',
      '8. Return removed data',
    ],
  },
  doubly: {
    add: [
      '1. Check if index is valid (0 to size)',
      '2. Create a new node with the element',
      '3. If list is empty: set head and tail to new node',
      '4. If adding at index 0:',
      '   - Point new node\'s next to head',
      '   - Point head\'s prev to new node',
      '   - Update head to new node',
      '5. If adding at end:',
      '   - Point new node\'s prev to tail',
      '   - Point tail\'s next to new node',
      '   - Update tail to new node',
      '6. If adding in middle:',
      '   - Traverse to node at index',
      '   - Update all four pointers',
      '7. Increment size',
    ],
    addFirst: [
      '1. Create a new node',
      '2. If list is empty, set head and tail to new node',
      '3. Otherwise:',
      '   - Point new node\'s next to head',
      '   - Point head\'s prev to new node',
      '   - Update head to new node',
      '4. Increment size',
    ],
    addLast: [
      '1. Create a new node',
      '2. If list is empty, set head and tail to new node',
      '3. Otherwise:',
      '   - Point new node\'s prev to tail',
      '   - Point tail\'s next to new node',
      '   - Update tail to new node',
      '4. Increment size',
    ],
    get: [
      '1. Check if index is valid (0 to size-1)',
      '2. Optimize: if index < size/2, start from head',
      '3. Otherwise, start from tail and go backwards',
      '4. Traverse to the node at index',
      '5. Return the data',
    ],
    set: [
      '1. Check if index is valid (0 to size-1)',
      '2. Traverse to node at index (optimize direction)',
      '3. Save old value',
      '4. Update node\'s data',
      '5. Return old value',
    ],
    remove: [
      '1. Check if index is valid (0 to size-1)',
      '2. Traverse to node at index',
      '3. Save the data',
      '4. If not first: point prev.next to removed.next',
      '5. Else: update head',
      '6. If not last: point next.prev to removed.prev',
      '7. Else: update tail',
      '8. Decrement size',
      '9. Return removed data',
    ],
    removeFirst: [
      '1. Check if list is empty',
      '2. Save head\'s data',
      '3. Update head to head.next',
      '4. If list is now empty, update tail to null',
      '5. Otherwise, set new head\'s prev to null',
      '6. Decrement size',
      '7. Return removed data',
    ],
    removeLast: [
      '1. Check if list is empty',
      '2. Save tail\'s data',
      '3. Update tail to tail.prev',
      '4. If list is now empty, update head to null',
      '5. Otherwise, set new tail\'s next to null',
      '6. Decrement size',
      '7. Return removed data',
    ],
  },
};
