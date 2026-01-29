import { GuidedExercise } from '@/types/guided-exercise';

export const singlyAddFirstExercise: GuidedExercise = {
  id: 'singly-add-first',
  title: 'Implement Singly LinkedList addFirst()',
  description:
    'Complete the addFirst() method that inserts an element at the beginning of a singly linked list.',
  topic: 'arrays',
  difficulty: 'beginner',
  estimatedTime: 8,
  objectives: [
    'Understand node creation',
    'Learn to update head pointer',
    'Handle the empty list case',
  ],
  steps: [
    {
      id: 'step-1',
      title: 'Create a new node',
      instruction:
        'First, create a new Node containing the element to be added.',
      hint: 'Use the Node constructor: new Node(element)',
      codeTemplate: `public void addFirst(E element) {
    // TODO: Create a new node
    ___CREATE_NODE___

    // Link to list and update head
}`,
      solution: `Node newNode = new Node(element);`,
      validation: {
        type: 'contains',
        value: 'new Node(element)',
      },
      explanation:
        'We create a new Node object that will hold our element. The Node class has a data field and a next pointer.',
    },
    {
      id: 'step-2',
      title: 'Link the new node to the list',
      instruction:
        'Set the new node\'s next pointer to the current head. This connects the new node to the existing list.',
      hint: 'newNode.next should point to the current head',
      codeTemplate: `public void addFirst(E element) {
    Node newNode = new Node(element);

    // TODO: Point new node to current head
    ___LINK_NODE___

    head = newNode;
    if (tail == null) tail = newNode;
    size++;
}`,
      solution: `newNode.next = head;`,
      validation: {
        type: 'contains',
        value: 'newNode.next = head',
      },
      explanation:
        'By setting newNode.next to head, the new node now points to what was the first element. This works even if head is null (empty list).',
    },
    {
      id: 'step-3',
      title: 'Update head and handle empty list',
      instruction:
        'Update head to point to the new node. If the list was empty (tail is null), also update tail.',
      hint: 'Check if tail == null to detect empty list',
      codeTemplate: `public void addFirst(E element) {
    Node newNode = new Node(element);
    newNode.next = head;

    // TODO: Update head, handle empty list, increment size
    ___UPDATE_HEAD___
}`,
      solution: `head = newNode;
    if (tail == null) tail = newNode;
    size++;`,
      validation: {
        type: 'contains',
        value: 'head = newNode',
      },
      explanation:
        'We update head to the new node. If the list was empty (tail == null), the new node is both the first and last element, so we update tail too.',
    },
  ],
  starterCode: `public void addFirst(E element) {
    // Your implementation here
}`,
  finalSolution: `public void addFirst(E element) {
    Node newNode = new Node(element);
    newNode.next = head;
    head = newNode;
    if (tail == null) tail = newNode;
    size++;
}`,
};

export const singlyRemoveFirstExercise: GuidedExercise = {
  id: 'singly-remove-first',
  title: 'Implement Singly LinkedList removeFirst()',
  description:
    'Complete the removeFirst() method that removes and returns the first element.',
  topic: 'arrays',
  difficulty: 'beginner',
  estimatedTime: 8,
  objectives: [
    'Handle empty list case',
    'Update head pointer correctly',
    'Update tail when removing last element',
  ],
  steps: [
    {
      id: 'step-1',
      title: 'Check for empty list',
      instruction:
        'First, check if the list is empty. If so, throw a NoSuchElementException.',
      hint: 'Check if size == 0 or head == null',
      codeTemplate: `public E removeFirst() {
    // TODO: Check if list is empty
    ___CHECK_EMPTY___

    // Remove and return first element
}`,
      solution: `if (size == 0)
        throw new NoSuchElementException();`,
      validation: {
        type: 'contains',
        value: 'NoSuchElementException',
      },
      explanation:
        'We cannot remove from an empty list. Throwing an exception signals this error condition to the caller.',
    },
    {
      id: 'step-2',
      title: 'Save data and update head',
      instruction:
        'Save the data from the first node, then update head to point to the second node (head.next).',
      hint: 'Store head.data before updating head',
      codeTemplate: `public E removeFirst() {
    if (size == 0)
        throw new NoSuchElementException();

    // TODO: Save data and move head forward
    ___SAVE_AND_UPDATE___

    if (head == null) tail = null;
    size--;
    return removed;
}`,
      solution: `E removed = head.data;
    head = head.next;`,
      validation: {
        type: 'contains',
        value: 'head = head.next',
      },
      explanation:
        'We save the data before updating head because we need to return it. Moving head to head.next effectively removes the first node from the list.',
    },
    {
      id: 'step-3',
      title: 'Handle single element case',
      instruction:
        'If the list is now empty (head became null), also set tail to null. Then decrement size and return the removed data.',
      hint: 'Check if head == null after the update',
      codeTemplate: `public E removeFirst() {
    if (size == 0)
        throw new NoSuchElementException();
    E removed = head.data;
    head = head.next;

    // TODO: Handle empty case, decrement size, return
    ___FINALIZE___
}`,
      solution: `if (head == null) tail = null;
    size--;
    return removed;`,
      validation: {
        type: 'contains',
        value: 'return removed',
      },
      explanation:
        'If we removed the only element, head is now null and tail should also be null to maintain consistency. We decrement size and return the saved data.',
    },
  ],
  starterCode: `public E removeFirst() {
    // Your implementation here
}`,
  finalSolution: `public E removeFirst() {
    if (size == 0)
        throw new NoSuchElementException();
    E removed = head.data;
    head = head.next;
    if (head == null) tail = null;
    size--;
    return removed;
}`,
};

export const doublyAddLastExercise: GuidedExercise = {
  id: 'doubly-add-last',
  title: 'Implement Doubly LinkedList addLast()',
  description:
    'Complete the addLast() method for a doubly linked list, handling both prev and next pointers.',
  topic: 'arrays',
  difficulty: 'intermediate',
  estimatedTime: 10,
  objectives: [
    'Understand doubly-linked node structure',
    'Update both prev and next pointers',
    'Handle empty list case',
  ],
  steps: [
    {
      id: 'step-1',
      title: 'Create node and handle empty case',
      instruction:
        'Create a new node. If the list is empty (tail is null), set both head and tail to the new node.',
      hint: 'Check if tail == null to detect empty list',
      codeTemplate: `public void addLast(E element) {
    Node newNode = new Node(element);

    // TODO: Handle empty list case
    ___EMPTY_CASE___

    // Handle non-empty case
}`,
      solution: `if (tail == null) {
        head = tail = newNode;
    }`,
      validation: {
        type: 'contains',
        value: 'head = tail = newNode',
      },
      explanation:
        'When the list is empty, the new node becomes both the first (head) and last (tail) element. Its prev and next are both null by default.',
    },
    {
      id: 'step-2',
      title: 'Link to existing tail',
      instruction:
        'For a non-empty list: set the new node\'s prev to the current tail, then set the current tail\'s next to the new node.',
      hint: 'Update newNode.prev and tail.next',
      codeTemplate: `public void addLast(E element) {
    Node newNode = new Node(element);
    if (tail == null) {
        head = tail = newNode;
    } else {
        // TODO: Link new node to current tail
        ___LINK_TO_TAIL___

        tail = newNode;
    }
    size++;
}`,
      solution: `newNode.prev = tail;
        tail.next = newNode;`,
      validation: {
        type: 'contains',
        value: 'newNode.prev = tail',
      },
      explanation:
        'In a doubly-linked list, we must update pointers in both directions: the new node points back to old tail, and old tail points forward to new node.',
    },
    {
      id: 'step-3',
      title: 'Update tail',
      instruction:
        'Finally, update the tail reference to point to the new node and increment size.',
      hint: 'Set tail = newNode',
      codeTemplate: `public void addLast(E element) {
    Node newNode = new Node(element);
    if (tail == null) {
        head = tail = newNode;
    } else {
        newNode.prev = tail;
        tail.next = newNode;

        // TODO: Update tail and size
        ___UPDATE_TAIL___
    }
}`,
      solution: `tail = newNode;
    }
    size++;`,
      validation: {
        type: 'contains',
        value: 'tail = newNode',
      },
      explanation:
        'After linking, we update tail to point to the new node. This completes the insertion at the end in O(1) time.',
    },
  ],
  starterCode: `public void addLast(E element) {
    // Your implementation here
}`,
  finalSolution: `public void addLast(E element) {
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
};

export const doublyRemoveExercise: GuidedExercise = {
  id: 'doubly-remove',
  title: 'Implement Doubly LinkedList remove()',
  description:
    'Complete the remove(index) method for a doubly linked list, updating both prev and next pointers.',
  topic: 'arrays',
  difficulty: 'intermediate',
  estimatedTime: 12,
  objectives: [
    'Traverse to find the node to remove',
    'Update pointers on both sides',
    'Handle edge cases (first/last element)',
  ],
  steps: [
    {
      id: 'step-1',
      title: 'Validate and traverse',
      instruction:
        'Check if the index is valid. Then traverse to the node at the given index.',
      hint: 'You can optimize by starting from tail if index > size/2',
      codeTemplate: `public E remove(int index) {
    if (index < 0 || index >= size)
        throw new IndexOutOfBoundsException();

    // TODO: Traverse to find the node
    ___TRAVERSE___

    // Update pointers and remove
}`,
      solution: `Node toRemove = head;
    for (int i = 0; i < index; i++) {
        toRemove = toRemove.next;
    }`,
      validation: {
        type: 'contains',
        value: 'toRemove = toRemove.next',
      },
      explanation:
        'We traverse from head, following next pointers until we reach the target index. For optimization, we could start from tail if index is closer to the end.',
    },
    {
      id: 'step-2',
      title: 'Update previous node pointer',
      instruction:
        'If the node to remove has a previous node, update its next to skip the removed node. Otherwise, update head.',
      hint: 'Check if toRemove.prev != null',
      codeTemplate: `public E remove(int index) {
    // ... validation and traversal ...
    Node toRemove = getNode(index);
    E removed = toRemove.data;

    // TODO: Update previous node's next (or head)
    ___UPDATE_PREV___

    // Update next node's prev (or tail)
    // ...
}`,
      solution: `if (toRemove.prev != null)
        toRemove.prev.next = toRemove.next;
    else
        head = toRemove.next;`,
      validation: {
        type: 'contains',
        value: 'toRemove.prev.next = toRemove.next',
      },
      explanation:
        'If the node has a predecessor, we make it skip over the removed node. If not (removing first element), we update head to point to the next node.',
    },
    {
      id: 'step-3',
      title: 'Update next node pointer',
      instruction:
        'If the node to remove has a next node, update its prev to skip the removed node. Otherwise, update tail.',
      hint: 'Check if toRemove.next != null',
      codeTemplate: `public E remove(int index) {
    // ... validation and traversal ...
    Node toRemove = getNode(index);
    E removed = toRemove.data;

    if (toRemove.prev != null)
        toRemove.prev.next = toRemove.next;
    else
        head = toRemove.next;

    // TODO: Update next node's prev (or tail)
    ___UPDATE_NEXT___

    size--;
    return removed;
}`,
      solution: `if (toRemove.next != null)
        toRemove.next.prev = toRemove.prev;
    else
        tail = toRemove.prev;`,
      validation: {
        type: 'contains',
        value: 'toRemove.next.prev = toRemove.prev',
      },
      explanation:
        'If the node has a successor, we make it point back to the predecessor. If not (removing last element), we update tail. This completes the removal by unlinking from both sides.',
    },
  ],
  starterCode: `public E remove(int index) {
    // Your implementation here
}`,
  finalSolution: `public E remove(int index) {
    if (index < 0 || index >= size)
        throw new IndexOutOfBoundsException();

    Node toRemove = head;
    for (int i = 0; i < index; i++) {
        toRemove = toRemove.next;
    }
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
};

export const linkedListExercises = [
  singlyAddFirstExercise,
  singlyRemoveFirstExercise,
  doublyAddLastExercise,
  doublyRemoveExercise,
];
