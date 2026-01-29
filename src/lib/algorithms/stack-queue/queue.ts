// Queue operations and examples

import type {
  QueueItem,
  QueueState,
  OperationResult,
  CodeExample,
  ImplementationComparison
} from './types';

// Generate unique ID
let idCounter = 0;
export const generateQueueId = (): string => `queue-item-${++idCounter}`;

// Queue operations
export const createQueue = (maxSize?: number): QueueState => ({
  items: [],
  maxSize,
});

export const enqueue = (queue: QueueState, value: string | number, priority?: number): { queue: QueueState; result: OperationResult } => {
  if (queue.maxSize && queue.items.length >= queue.maxSize) {
    return {
      queue,
      result: { success: false, error: 'Queue Overflow: Queue is full' }
    };
  }

  const newItem: QueueItem = {
    id: generateQueueId(),
    value,
    priority,
    addedAt: Date.now(),
  };

  return {
    queue: { ...queue, items: [...queue.items, newItem] },
    result: { success: true, value }
  };
};

export const dequeue = (queue: QueueState): { queue: QueueState; result: OperationResult } => {
  if (queue.items.length === 0) {
    return {
      queue,
      result: { success: false, error: 'Queue Underflow: Queue is empty' }
    };
  }

  const dequeuedItem = queue.items[0];
  return {
    queue: { ...queue, items: queue.items.slice(1) },
    result: { success: true, value: dequeuedItem.value }
  };
};

export const peekQueue = (queue: QueueState): OperationResult => {
  if (queue.items.length === 0) {
    return { success: false, error: 'Queue is empty' };
  }
  return { success: true, value: queue.items[0].value };
};

export const isQueueEmpty = (queue: QueueState): boolean => queue.items.length === 0;

export const queueSize = (queue: QueueState): number => queue.items.length;

// Priority Queue operations
export const enqueuePriority = (queue: QueueState, value: string | number, priority: number): { queue: QueueState; result: OperationResult } => {
  if (queue.maxSize && queue.items.length >= queue.maxSize) {
    return {
      queue,
      result: { success: false, error: 'Queue Overflow: Queue is full' }
    };
  }

  const newItem: QueueItem = {
    id: generateQueueId(),
    value,
    priority,
    addedAt: Date.now(),
  };

  // Insert in priority order (higher priority first)
  const newItems = [...queue.items];
  let inserted = false;
  for (let i = 0; i < newItems.length; i++) {
    if ((newItems[i].priority ?? 0) < priority) {
      newItems.splice(i, 0, newItem);
      inserted = true;
      break;
    }
  }
  if (!inserted) {
    newItems.push(newItem);
  }

  return {
    queue: { ...queue, items: newItems },
    result: { success: true, value }
  };
};

// Code Examples
export const queueArrayImplementation: CodeExample = {
  title: 'Array-Based Queue',
  description: 'Queue implementation using an array with front and rear pointers',
  javaCode: `public class ArrayQueue<T> {
    private T[] array;
    private int front;
    private int rear;
    private int size;
    private int capacity;

    @SuppressWarnings("unchecked")
    public ArrayQueue(int capacity) {
        this.capacity = capacity;
        this.array = (T[]) new Object[capacity];
        this.front = 0;
        this.rear = -1;
        this.size = 0;
    }

    public void enqueue(T item) {
        if (size >= capacity) {
            throw new IllegalStateException("Queue is full");
        }
        rear = (rear + 1) % capacity;
        array[rear] = item;
        size++;
    }

    public T dequeue() {
        if (isEmpty()) {
            throw new NoSuchElementException("Queue is empty");
        }
        T item = array[front];
        front = (front + 1) % capacity;
        size--;
        return item;
    }

    public T peek() {
        if (isEmpty()) {
            throw new NoSuchElementException("Queue is empty");
        }
        return array[front];
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public int size() {
        return size;
    }
}`,
  timeComplexity: 'O(1) for all operations',
  spaceComplexity: 'O(n) where n is capacity'
};

export const queueLinkedListImplementation: CodeExample = {
  title: 'LinkedList-Based Queue',
  description: 'Queue implementation using a singly linked list',
  javaCode: `public class LinkedQueue<T> {
    private class Node {
        T data;
        Node next;

        Node(T data) {
            this.data = data;
        }
    }

    private Node front;
    private Node rear;
    private int size;

    public void enqueue(T item) {
        Node newNode = new Node(item);
        if (isEmpty()) {
            front = rear = newNode;
        } else {
            rear.next = newNode;
            rear = newNode;
        }
        size++;
    }

    public T dequeue() {
        if (isEmpty()) {
            throw new NoSuchElementException("Queue is empty");
        }
        T item = front.data;
        front = front.next;
        if (front == null) {
            rear = null;
        }
        size--;
        return item;
    }

    public T peek() {
        if (isEmpty()) {
            throw new NoSuchElementException("Queue is empty");
        }
        return front.data;
    }

    public boolean isEmpty() {
        return front == null;
    }

    public int size() {
        return size;
    }
}`,
  timeComplexity: 'O(1) for all operations',
  spaceComplexity: 'O(n) where n is number of elements'
};

export const priorityQueueExample: CodeExample = {
  title: 'Java PriorityQueue Usage',
  description: 'Using Java\'s built-in PriorityQueue (min-heap by default)',
  javaCode: `import java.util.PriorityQueue;
import java.util.Comparator;

// Min-heap (default) - smallest element first
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
minHeap.offer(5);
minHeap.offer(2);
minHeap.offer(8);
System.out.println(minHeap.poll()); // 2 (smallest)

// Max-heap - largest element first
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(
    Comparator.reverseOrder()
);
maxHeap.offer(5);
maxHeap.offer(2);
maxHeap.offer(8);
System.out.println(maxHeap.poll()); // 8 (largest)

// Custom priority - Patient example
class Patient {
    String name;
    int severity; // higher = more urgent

    Patient(String name, int severity) {
        this.name = name;
        this.severity = severity;
    }
}

PriorityQueue<Patient> erQueue = new PriorityQueue<>(
    (a, b) -> b.severity - a.severity // Higher severity first
);
erQueue.offer(new Patient("Alice", 3));
erQueue.offer(new Patient("Bob", 8));   // Critical
erQueue.offer(new Patient("Carol", 5));
// Bob gets treated first (severity 8)`,
  timeComplexity: 'O(log n) for offer/poll, O(1) for peek',
  spaceComplexity: 'O(n)'
};

export const queueImplementationComparison: ImplementationComparison[] = [
  {
    aspect: 'Memory',
    arrayBased: 'Fixed size, may waste space',
    linkedListBased: 'Dynamic, node overhead per element'
  },
  {
    aspect: 'Enqueue/Dequeue',
    arrayBased: 'O(1) with circular array',
    linkedListBased: 'O(1) with front/rear pointers'
  },
  {
    aspect: 'Overflow',
    arrayBased: 'Can overflow if array is full',
    linkedListBased: 'No overflow (until memory exhausted)'
  },
  {
    aspect: 'Wrap-around',
    arrayBased: 'Needs modulo arithmetic',
    linkedListBased: 'Not applicable'
  },
  {
    aspect: 'Use case',
    arrayBased: 'Known max size, circular buffer',
    linkedListBased: 'Unknown size, simple implementation'
  }
];

// Real-world examples
export const queueRealWorldExamples = [
  {
    title: 'Print Queue',
    description: 'Documents are printed in the order they were sent. First document sent is first to print.',
    icon: 'Printer'
  },
  {
    title: 'Task Scheduling',
    description: 'CPU schedules processes in a queue. First come, first served (in basic scheduling).',
    icon: 'ListTodo'
  },
  {
    title: 'BFS Traversal',
    description: 'Breadth-First Search uses a queue to explore graph nodes level by level.',
    icon: 'GitBranch'
  },
  {
    title: 'Customer Service',
    description: 'Customers wait in line and are served in arrival order.',
    icon: 'Users'
  }
];

// Common pitfalls
export const queuePitfalls = [
  {
    title: 'Dequeue from Empty Queue',
    problem: 'Calling dequeue() without checking if queue is empty',
    example: `Queue<Integer> queue = new LinkedList<>();
// queue.remove(); // Throws NoSuchElementException!

// Correct way:
if (!queue.isEmpty()) {
    int value = queue.remove();
}
// Or use poll() which returns null instead of throwing
Integer value = queue.poll(); // null if empty`,
    prevention: 'Always check isEmpty() or use poll() instead of remove()'
  },
  {
    title: 'Confusing FIFO with LIFO',
    problem: 'Expecting stack behavior from a queue',
    example: `Queue<Integer> queue = new LinkedList<>();
queue.offer(1);
queue.offer(2);
queue.offer(3);
// queue.poll() returns 1, not 3!
// For LIFO, use Stack or Deque as stack`,
    prevention: 'Remember: Queue = FIFO (first in, first out)'
  },
  {
    title: 'Priority Queue Assumptions',
    problem: 'Assuming PriorityQueue maintains insertion order',
    example: `PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.offer(3);
pq.offer(1);
pq.offer(2);
// pq.poll() returns 1 (smallest), not 3 (first inserted)

// For FIFO with priority, need custom comparator
// that considers both priority AND arrival time`,
    prevention: 'PriorityQueue orders by natural ordering or comparator, not insertion order'
  }
];
