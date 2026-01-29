# List Module - Project Specification

## Initial Idea
A learning module focused on **how Lists, ArrayLists, and LinkedLists work internally** - emphasizing implementation details to help CS205 students understand the underlying mechanics of these data structures.

---

## 1. Overview

### Problem Statement
Students often use ArrayList and LinkedList without understanding how they work internally. This leads to poor data structure choices and difficulty debugging issues related to list operations.

### Goals
- Help students understand the **internal implementation** of ArrayList, Singly LinkedList, and Doubly LinkedList
- Visualize how data is stored and manipulated in memory
- Build intuition for when to use each data structure through hands-on exploration
- Provide guided exercises where students implement parts of these data structures themselves

### Success Criteria
- Students can explain how ArrayList resizing works
- Students can trace through pointer/reference changes in LinkedList operations
- Students can implement basic list operations given partial code
- Students understand trade-offs between ArrayList and LinkedList

---

## 2. Data Structures Covered

### 2.1 ArrayList
**Internal concepts to cover:**
- Backing array storage
- Capacity vs. size distinction
- Dynamic resizing (array doubling strategy)
- Element shifting on insert/remove at arbitrary indices
- Index-to-memory-location mapping

### 2.2 Singly LinkedList
**Internal concepts to cover:**
- Node class structure (`data` + `next` reference)
- Head reference management
- Traversal mechanics
- Pointer manipulation during insert/remove

### 2.3 Doubly LinkedList
**Internal concepts to cover:**
- Node class structure (`data` + `next` + `prev` references)
- Head and tail reference management
- Bidirectional traversal
- More complex pointer manipulation (updating both next and prev)

---

## 3. Operations to Implement & Visualize

### Basic Operations
| Operation | Description |
|-----------|-------------|
| `add(index, element)` | Insert element at specified index |
| `get(index)` | Retrieve element at index |
| `set(index, element)` | Replace element at index |
| `remove(index)` | Remove element at index |

### Position-Based Operations
| Operation | Description |
|-----------|-------------|
| `addFirst(element)` | Insert at beginning |
| `addLast(element)` | Insert at end |
| `removeFirst()` | Remove from beginning |
| `removeLast()` | Remove from end |

---

## 4. Visualizations

### 4.1 Dual View System
Students can toggle between two visualization modes:

**Node-Based Diagram View:**
- Traditional CS diagram style
- Boxes representing nodes/elements
- Arrows showing pointer/reference connections
- Head/tail markers clearly labeled

**Memory Layout View:**
- Shows how data is actually laid out in memory
- ArrayList: contiguous memory blocks with capacity indicator
- LinkedList: scattered nodes with address-like identifiers

### 4.2 Animation Style
- **Simplified step-by-step**: Show key steps of each operation without micro-level detail
- Highlight the current operation step
- Show before/after state for pointer changes
- Color coding:
  - Green: newly added elements/connections
  - Red: elements/connections being removed
  - Yellow: elements being shifted or modified

### 4.3 Interactivity
- **Full student control**: Students can perform any operation and see results
- Input field for element values
- Buttons for each operation type
- Step forward/backward through animation
- Speed control slider
- Reset to initial state

---

## 5. Code Display

### 5.1 Java Implementation
Show actual Java code for each data structure and operation:

```java
// Example: ArrayList add at index
public void add(int index, E element) {
    if (index < 0 || index > size) {
        throw new IndexOutOfBoundsException();
    }
    ensureCapacity(size + 1);
    // Shift elements to the right
    for (int i = size; i > index; i--) {
        data[i] = data[i - 1];
    }
    data[index] = element;
    size++;
}
```

### 5.2 Pseudocode Explanation
Accompany each Java implementation with plain-language pseudocode:

```
ADD element at index:
1. Check if index is valid (0 to size)
2. If array is full, double the capacity
3. Shift all elements from index to end one position right
4. Place new element at index
5. Increment size
```

### 5.3 Code Highlighting
- Highlight the current line being executed during animation
- Sync code highlighting with visualization state

---

## 6. Guided Exercises

### 6.1 Exercise Style
**Fill-in-the-blank**: Students complete missing parts of implementations

### 6.2 Exercises Per Structure

**ArrayList (2-3 exercises):**
1. Implement `add(index, element)` - fill in the shifting logic
2. Implement `remove(index)` - fill in the shifting and size update
3. Implement `ensureCapacity()` - fill in the array copying logic

**Singly LinkedList (2-3 exercises):**
1. Implement `addFirst(element)` - create node and update head
2. Implement `removeFirst()` - update head and return removed element
3. Implement `add(index, element)` - traverse and insert

**Doubly LinkedList (2-3 exercises):**
1. Implement `addLast(element)` - handle tail pointer updates
2. Implement `remove(index)` - update both prev and next pointers
3. Implement `addFirst(element)` - handle head and prev pointers

### 6.3 Exercise Features
- Step-by-step instructions for each exercise
- Hints available (progressive reveal)
- Validation of student code
- Explanation shown after completion

---

## 7. Quizzes & Assessments

### 7.1 Conceptual Multiple Choice
Test understanding of internal mechanics:
- "What happens to the backing array when ArrayList reaches capacity?"
- "Which operation is O(1) for LinkedList but O(n) for ArrayList?"
- "What references need to be updated when removing a middle node from a doubly linked list?"

### 7.2 Code Tracing Questions
Given code and initial state, predict the outcome:
- "After these 5 operations, what does the list contain?"
- "What is the value of `head.next.data` after this sequence?"
- "How many element shifts occur when adding at index 2 in an ArrayList of size 5?"

---

## 8. Comparison Section

### 8.1 Conceptual Comparison
Side-by-side comparison table:

| Aspect | ArrayList | LinkedList |
|--------|-----------|------------|
| Memory | Contiguous | Scattered |
| Access by index | O(1) | O(n) |
| Insert at beginning | O(n) | O(1) |
| Insert at end | O(1) amortized | O(1) with tail |
| Memory overhead | Low | High (pointers) |

### 8.2 Interactive Performance Demo
- Students can run the same operation on both data structures
- Show operation count/time comparison
- Visualize why certain operations are faster/slower
- Example: "Insert 100 elements at index 0" - see ArrayList shift vs LinkedList pointer update

---

## 9. Edge Cases to Cover

### 9.1 Empty List Operations
- What happens when calling `removeFirst()` on empty list?
- Adding to an empty list (first element handling)

### 9.2 Boundary Operations
- Operations at index 0
- Operations at last valid index
- IndexOutOfBoundsException scenarios

### 9.3 Single Element Cases
- Removing the only element
- List with one element: head == tail scenarios

### 9.4 Null Handling
- Can null be stored as an element?
- Behavior when null is passed

---

## 10. Page Structure

### Navigation: `/modules/lists/`

```
/modules/lists/
  ├── page.tsx              # Lists overview & introduction
  ├── arraylist/
  │   └── page.tsx          # ArrayList deep dive
  ├── singly-linked/
  │   └── page.tsx          # Singly LinkedList deep dive
  ├── doubly-linked/
  │   └── page.tsx          # Doubly LinkedList deep dive
  └── comparison/
      └── page.tsx          # Side-by-side comparison & performance demo
```

### Page Layout (for each data structure page)
1. **Introduction** - What is this data structure? Internal structure overview
2. **Visualizer** - Interactive visualization with dual view toggle
3. **Operations** - Java code + pseudocode for each operation
4. **Try It** - Interactive section where students perform operations
5. **Edge Cases** - Highlight special scenarios with examples

---

## 11. Technical Implementation Notes

### Components to Build
- `ListVisualizer` - Base visualizer component
- `ArrayListVisualizer` - ArrayList-specific visualization
- `LinkedListVisualizer` - Shared for singly/doubly with mode prop
- `NodeDiagram` - Renders node-based view
- `MemoryLayout` - Renders memory view
- `ListOperationControls` - Buttons and inputs for operations
- `PerformanceComparison` - Side-by-side comparison demo

### State Management
- Current list state (elements, size, capacity for ArrayList)
- Animation step state
- View mode (node diagram vs memory layout)
- Operation history for undo/replay

### Animation Library
- Reuse animation approach from Arrays module
- Extend for pointer/arrow animations

---

## 12. Acceptance Criteria

### ArrayList Section
- [ ] Visualizer shows backing array with capacity indicator
- [ ] Resizing animation shows array doubling
- [ ] Element shifting is clearly animated on insert/remove
- [ ] All 8 operations work correctly with animation
- [ ] 2-3 fill-in-the-blank exercises functional

### Singly LinkedList Section
- [ ] Visualizer shows nodes with next pointers as arrows
- [ ] Head reference clearly marked
- [ ] Pointer updates animated on insert/remove
- [ ] All 8 operations work correctly with animation
- [ ] 2-3 fill-in-the-blank exercises functional

### Doubly LinkedList Section
- [ ] Visualizer shows nodes with both next and prev pointers
- [ ] Head and tail references clearly marked
- [ ] Bidirectional pointer updates animated
- [ ] All 8 operations work correctly with animation
- [ ] 2-3 fill-in-the-blank exercises functional

### Comparison Section
- [ ] Side-by-side conceptual comparison displayed
- [ ] Interactive performance demo works
- [ ] Clear explanation of when to use which

### Quizzes
- [ ] At least 5 conceptual multiple choice questions
- [ ] At least 3 code tracing questions
- [ ] Scoring and feedback functional

---

## 13. Open Questions

*None at this time - spec is implementation-ready.*

---

## 14. Timeline Estimate

| Phase | Tasks | Estimate |
|-------|-------|----------|
| 1 | ArrayList visualizer + operations | 2-3 sessions |
| 2 | Singly LinkedList visualizer + operations | 2-3 sessions |
| 3 | Doubly LinkedList visualizer + operations | 2-3 sessions |
| 4 | Comparison section + performance demo | 1-2 sessions |
| 5 | Exercises (all structures) | 2-3 sessions |
| 6 | Quizzes + polish | 1-2 sessions |

**Total: ~10-16 working sessions**
