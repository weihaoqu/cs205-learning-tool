# PRD: Stack & Queue Module

## Overview

### Problem Statement
Students learning data structures need to understand stacks and queues - two fundamental linear data structures with different access patterns. Visual understanding of LIFO (Last-In-First-Out) and FIFO (First-In-First-Out) principles is crucial for applying these structures correctly.

### Goals
- Teach stack and queue concepts with interactive drag-and-drop visualizations
- Cover all basic operations (push, pop, enqueue, dequeue, peek, isEmpty)
- Demonstrate real-world applications (balanced parentheses, undo/redo, expression evaluation, priority queue)
- Compare array-based vs linked-list-based implementations
- Highlight common mistakes and when to use each data structure

### Target Audience
CS205 students learning fundamental data structures in Java

---

## Module Structure (4 Pages)

### Page 1: Overview (`/modules/stack-queue/`)
**Purpose:** Introduce both data structures and their core differences

**Content:**
- What are Stacks and Queues?
  - Stack: LIFO (Last-In, First-Out) - like a stack of plates
  - Queue: FIFO (First-In, First-Out) - like a line at a store
- Visual analogy cards with images
- When to use Stack vs Queue decision guide
- Real-world examples preview:
  - Stack: Browser back button, undo/redo, call stack, expression evaluation
  - Queue: Print queue, task scheduling, BFS traversal, customer service line
- Navigation cards to subpages

### Page 2: Stack (`/modules/stack-queue/stack/`)
**Purpose:** Deep dive into stack operations and applications

**Content:**
1. **Operations Section:**
   - Interactive drag-and-drop visualizer for stack operations
   - Operations: push(element), pop(), peek(), isEmpty(), size()
   - User can drag elements to push, click to pop
   - Show array representation with top pointer

2. **Java Implementation:**
   - Array-based implementation with code
   - Linked-list-based implementation with code
   - Comparison table (pros/cons)

3. **Applications:**
   - **Balanced Parentheses Checker:**
     - Interactive input field for expressions like `{[()]}`
     - Step-by-step visualization showing push/pop
     - Highlight matching pairs
   - **Expression Evaluation (Postfix):**
     - Show how `3 4 + 5 *` evaluates to 35
     - Step-by-step stack trace
   - **Undo/Redo Simulation:**
     - Simple text editor simulation
     - Show two stacks (undo stack, redo stack)

4. **Common Mistakes:**
   - Popping from empty stack (EmptyStackException)
   - Stack overflow (fixed-size array implementation)
   - Using stack when queue is needed

### Page 3: Queue (`/modules/stack-queue/queue/`)
**Purpose:** Deep dive into queue operations and priority queue concept

**Content:**
1. **Operations Section:**
   - Interactive drag-and-drop visualizer for queue operations
   - Operations: enqueue(element), dequeue(), peek(), isEmpty(), size()
   - User can drag elements to enqueue, click front to dequeue
   - Show array representation with front/rear pointers

2. **Java Implementation:**
   - Array-based implementation with code
   - Linked-list-based implementation with code
   - Comparison table (pros/cons)

3. **Priority Queue Section:**
   - Concept explanation (elements have priority)
   - Visual comparison: Regular queue vs Priority queue
   - Show same elements, different dequeue order
   - Java PriorityQueue usage example
   - Real-world example: Hospital ER triage

4. **Common Mistakes:**
   - Dequeue from empty queue
   - Not handling wrap-around in circular array (if mentioned)
   - Confusing FIFO with LIFO

### Page 4: Comparison (`/modules/stack-queue/comparison/`)
**Purpose:** Side-by-side comparison and decision guide

**Content:**
1. **Side-by-Side Visualization:**
   - Same sequence of operations on Stack vs Queue
   - Show different outcomes visually
   - Example: Add 1, 2, 3 then remove - Stack gives 3, Queue gives 1

2. **Comparison Table:**
   | Aspect | Stack | Queue |
   |--------|-------|-------|
   | Order | LIFO | FIFO |
   | Insert | push (top) | enqueue (rear) |
   | Remove | pop (top) | dequeue (front) |
   | Access | Only top | Only front |
   | Use case | Undo, recursion | Scheduling, BFS |

3. **Implementation Comparison:**
   - Array vs LinkedList for Stack
   - Array vs LinkedList for Queue
   - Time complexity table

4. **Decision Guide:**
   - Flowchart or decision tree
   - "Need to process in reverse order?" → Stack
   - "Need to process in arrival order?" → Queue
   - "Need priority-based processing?" → Priority Queue

5. **Real-World Examples Deep Dive:**
   - Browser Navigation (Stack)
   - Print Spooler (Queue)
   - Call Stack in Recursion (Stack)
   - Task Scheduler (Queue)

---

## Interactive Components

### 1. StackVisualizer Component
**Features:**
- Vertical stack display (bottom to top)
- Drag-and-drop to push elements
- Click top element to pop
- Peek highlights top element
- Animation for push/pop operations
- Custom input field for element values
- Array index display alongside stack
- Top pointer indicator

**States:**
- Empty stack state with prompt
- Normal operation state
- Overflow warning (if max size set)
- Underflow error on empty pop attempt

### 2. QueueVisualizer Component
**Features:**
- Horizontal queue display (left to right)
- Drag-and-drop to enqueue at rear
- Click front element to dequeue
- Peek highlights front element
- Animation for enqueue/dequeue
- Front and rear pointer indicators
- Wrap-around visualization (optional)

**States:**
- Empty queue state with prompt
- Normal operation state
- Full queue warning (if max size set)
- Underflow error on empty dequeue attempt

### 3. BalancedParenthesesVisualizer Component
**Features:**
- Input field for bracket expression
- Character-by-character processing
- Stack visualization showing push/pop
- Color-coded matching pairs
- Result: Balanced / Not Balanced with explanation

### 4. StackQueueComparison Component
**Features:**
- Split view: Stack on left, Queue on right
- Synchronized operations (same action on both)
- Show different results side-by-side
- Operation history log

### 5. PriorityQueueVisualizer Component
**Features:**
- Elements with visible priority values
- Enqueue shows element going to correct position
- Dequeue always removes highest priority
- Compare with regular queue behavior

---

## Quiz Content (8-10 Questions)

### Conceptual Questions (5):
1. What order does a stack return elements? (LIFO)
2. What operation adds to a queue? (enqueue)
3. Which data structure for undo functionality? (Stack)
4. What's the time complexity of push/pop? (O(1))
5. Priority queue: what determines removal order? (Priority value)

### Tracing Questions (4):
1. Stack operations sequence: push(1), push(2), pop(), push(3), pop() - what remains?
2. Queue operations sequence: enqueue(A), enqueue(B), dequeue(), enqueue(C) - front element?
3. Balanced parentheses: Is `{[(])}` balanced?
4. Given operations, what's the stack/queue state?

### Application Question (1):
Which data structure for BFS traversal? (Queue)

---

## Technical Specifications

### File Structure
```
src/
├── lib/algorithms/stack-queue/
│   ├── types.ts           # StackItem, QueueItem, Operation interfaces
│   ├── stack.ts           # Stack operations and examples
│   ├── queue.ts           # Queue operations and examples
│   └── index.ts
├── components/visualizer/stack-queue/
│   ├── StackVisualizer.tsx
│   ├── QueueVisualizer.tsx
│   ├── BalancedParenthesesVisualizer.tsx
│   ├── StackQueueComparison.tsx
│   ├── PriorityQueueVisualizer.tsx
│   └── index.ts
├── app/modules/stack-queue/
│   ├── page.tsx           # Overview
│   ├── stack/page.tsx     # Stack deep dive
│   ├── queue/page.tsx     # Queue deep dive
│   └── comparison/page.tsx # Side-by-side comparison
└── content/quizzes/stack-queue/
    ├── stack-queue-quiz.ts
    └── index.ts
```

### Type Definitions
```typescript
interface StackItem {
  id: string;
  value: string | number;
  addedAt: number;  // for animation timing
}

interface QueueItem {
  id: string;
  value: string | number;
  priority?: number;  // for priority queue
  addedAt: number;
}

interface StackState {
  items: StackItem[];
  maxSize?: number;
  topIndex: number;
}

interface QueueState {
  items: QueueItem[];
  maxSize?: number;
  frontIndex: number;
  rearIndex: number;
}

interface Operation {
  type: 'push' | 'pop' | 'enqueue' | 'dequeue' | 'peek';
  value?: string | number;
  result?: string | number;
  timestamp: number;
}
```

### Drag-and-Drop Implementation
- Use `@dnd-kit/core` for drag-and-drop (already in project dependencies if available)
- Or implement with native HTML5 drag-and-drop API
- Draggable elements palette with values 1-9 or custom input
- Drop zones: Stack top area, Queue rear area

---

## UI/UX Details

### Color Scheme
- Stack: Blue theme (`bg-blue-100`, `border-blue-500`)
- Queue: Green theme (`bg-green-100`, `border-green-500`)
- Priority Queue: Purple theme
- Error states: Red
- Success states: Green

### Animations
- Push: Element slides in from top, settles into place
- Pop: Element lifts up and fades out
- Enqueue: Element slides in from right
- Dequeue: Element slides out to left
- All animations: 300-500ms duration, ease-in-out

### Responsive Design
- Stack: Vertical on all screens
- Queue: Horizontal on desktop, may stack on mobile
- Comparison: Side-by-side on desktop, tabbed on mobile

---

## Common Pitfalls Section

### Stack Pitfalls
1. **Empty Stack Pop**
   - Problem: Calling pop() on empty stack
   - Java behavior: EmptyStackException
   - Prevention: Always check isEmpty() first

2. **Stack Overflow**
   - Problem: Pushing to full fixed-size stack
   - Prevention: Use dynamic sizing or check before push

3. **Wrong Data Structure**
   - Problem: Using stack when order doesn't matter
   - Example: Using stack for BFS (should use queue)

### Queue Pitfalls
1. **Empty Queue Dequeue**
   - Problem: Calling dequeue() on empty queue
   - Prevention: Always check isEmpty() first

2. **Ignoring Return Values**
   - Problem: Calling peek() but not using result
   - Prevention: Store and use return values

3. **Priority Queue Confusion**
   - Problem: Expecting FIFO from PriorityQueue
   - Clarification: PriorityQueue orders by priority, not arrival

---

## Success Criteria

1. Students can visually see LIFO vs FIFO behavior through drag-and-drop
2. Students can trace stack/queue operations on paper
3. Students understand when to use Stack vs Queue
4. Students can implement both using arrays and linked lists
5. Students can apply stacks to parentheses matching
6. Students understand priority queue concept
7. Quiz pass rate > 80% for conceptual questions

---

## Implementation Priority

1. **Phase 1:** Core visualizers (StackVisualizer, QueueVisualizer)
2. **Phase 2:** Overview and basic pages with drag-and-drop
3. **Phase 3:** Applications (BalancedParentheses, PriorityQueue)
4. **Phase 4:** Comparison page
5. **Phase 5:** Quizzes and polish

---

## Open Questions

- None currently - ready for implementation
