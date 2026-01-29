# PRD: Algorithm Complexity (Big O) Module

## Overview

### Problem Statement
Students in CS205 often struggle to understand algorithm complexity analysis. They need to learn how to evaluate code efficiency, recognize common patterns, and understand why complexity matters for real-world applications.

### Goals
1. Teach Big O notation fundamentals with clear, visual explanations
2. Help students recognize common code patterns and their complexities
3. Provide interactive visualizations to understand growth rates
4. Build practical skills for analyzing code complexity
5. Address common misconceptions about complexity analysis

### Target Users
CS205 students learning algorithm analysis for the first time.

---

## Scope

### In Scope
- Time complexity: O(1), O(n), O(n²), O(log n), O(n log n), O(2^n)
- Basic space complexity introduction
- Interactive growth rate visualization
- Step counter for code execution
- Code pattern recognition exercises
- Common misconceptions coverage
- Cheat sheet reference
- Real-world context examples

### Out of Scope
- Big Omega (Ω) and Big Theta (Θ) notation
- Amortized analysis
- O(n!), O(√n) complexities
- Deep integration with other modules
- Advanced mathematical proofs

---

## Module Structure

### Page Organization (By Learning Goal)

#### Page 1: Introduction & Concepts (`/modules/complexity/`)
**Purpose:** Establish foundational understanding of Big O notation

**Content:**
- What is Big O notation and why it matters
- Real-world context: Why efficiency matters at scale
  - Example: Searching 1 million vs 1 billion records
  - Example: Mobile app performance on limited devices
- The concept of "worst case" analysis
- How we drop constants and lower-order terms
- Brief introduction to space complexity

**Key Concepts:**
- Time complexity measures operations, not actual time
- We care about growth rate as input size increases
- Constants and lower-order terms are ignored in Big O

#### Page 2: Growth Visualization (`/modules/complexity/visualization/`)
**Purpose:** Visual understanding of how different complexities grow

**Interactive Components:**
1. **Growth Rate Graph**
   - X-axis: Input size (n) with slider control (1 to 1000)
   - Y-axis: Number of operations
   - Lines for each complexity: O(1), O(n), O(n²), O(log n), O(n log n), O(2^n)
   - Checkbox toggles to show/hide individual complexity curves
   - Color-coded legend

2. **Comparison Table**
   - Dynamic table showing actual values at current n
   - Columns: Complexity | n=10 | n=100 | n=1000
   - Highlight dramatic differences (e.g., O(n²) vs O(n))

**Visualizer Features:**
- Slider to adjust input size n
- Real-time graph updates
- Clear color coding for each complexity
- Tooltips explaining each complexity type

#### Page 3: Code Patterns (`/modules/complexity/patterns/`)
**Purpose:** Teach students to recognize complexity from code structure

**Pattern Categories:**

1. **O(1) - Constant Time**
   ```java
   int getFirst(int[] arr) {
       return arr[0];
   }

   void swap(int[] arr, int i, int j) {
       int temp = arr[i];
       arr[i] = arr[j];
       arr[j] = temp;
   }
   ```

2. **O(n) - Linear Time**
   ```java
   int sum(int[] arr) {
       int total = 0;
       for (int i = 0; i < arr.length; i++) {
           total += arr[i];
       }
       return total;
   }

   // Sequential loops are still O(n)
   void twoLoops(int[] arr) {
       for (int i = 0; i < arr.length; i++) { /* ... */ }
       for (int i = 0; i < arr.length; i++) { /* ... */ }
   }
   ```

3. **O(n²) - Quadratic Time**
   ```java
   void printPairs(int[] arr) {
       for (int i = 0; i < arr.length; i++) {
           for (int j = 0; j < arr.length; j++) {
               System.out.println(arr[i] + ", " + arr[j]);
           }
       }
   }
   ```

4. **O(log n) - Logarithmic Time**
   ```java
   int binarySearch(int[] arr, int target) {
       int left = 0, right = arr.length - 1;
       while (left <= right) {
           int mid = (left + right) / 2;
           if (arr[mid] == target) return mid;
           if (arr[mid] < target) left = mid + 1;
           else right = mid - 1;
       }
       return -1;
   }

   // Loop that halves each iteration
   void halvingLoop(int n) {
       while (n > 0) {
           n = n / 2;
       }
   }
   ```

5. **O(n log n) - Linearithmic Time**
   ```java
   // Mentioned as: Merge Sort, Quick Sort (average), Heap Sort
   // Show pattern: O(n) work done O(log n) times
   void nLogNPattern(int[] arr) {
       for (int size = 1; size < arr.length; size *= 2) {  // log n iterations
           for (int i = 0; i < arr.length; i++) {           // n work each
               // process
           }
       }
   }
   ```

6. **O(2^n) - Exponential Time**
   ```java
   int fibonacci(int n) {
       if (n <= 1) return n;
       return fibonacci(n - 1) + fibonacci(n - 2);
   }
   ```

**Step Counter Demo:**
- Interactive component where students can:
  - Select a code pattern
  - Choose input size
  - Watch operations count in real-time
  - See highlighted line being executed
  - Compare actual count to Big O prediction

#### Page 4: Practice & Reference (`/modules/complexity/practice/`)
**Purpose:** Summary, cheat sheet, and common mistakes

**Sections:**

1. **Cheat Sheet Reference Card**
   | Complexity | Name | Example Pattern | Growth |
   |------------|------|-----------------|--------|
   | O(1) | Constant | Array access, arithmetic | Flat |
   | O(log n) | Logarithmic | Binary search, halving loops | Slow curve |
   | O(n) | Linear | Single loop through data | Straight line |
   | O(n log n) | Linearithmic | Efficient sorts | Gentle curve |
   | O(n²) | Quadratic | Nested loops | Steep curve |
   | O(2^n) | Exponential | Naive recursion | Explosive |

2. **Common Mistakes Section**

   **Mistake 1: "Nested loops always mean O(n²)"**
   - Counter-example: Inner loop with constant iterations
   ```java
   for (int i = 0; i < n; i++) {
       for (int j = 0; j < 5; j++) {  // O(n), not O(n²)
           // ...
       }
   }
   ```

   **Mistake 2: "Two O(n) loops make O(n²)"**
   - Reality: Sequential O(n) + O(n) = O(2n) = O(n)

   **Mistake 3: "Constants matter"**
   - O(2n) = O(n), O(n² + 1000n) = O(n²)
   - We focus on dominant terms

   **Mistake 4: "Confusing best, worst, and average case"**
   - Big O typically refers to worst case
   - Example: Linear search best=O(1), worst=O(n)

3. **Space Complexity Quick Reference**
   - Variables: O(1)
   - Arrays of size n: O(n)
   - 2D arrays n×n: O(n²)
   - Recursive call stack: Depends on depth

---

## Exercises

### Format
Code-to-Big-O matching: Given Java code snippets, students identify the correct Big O notation.

### Exercise Distribution (15-18 total)

**O(1) Exercises (2-3):**
1. Simple array access and assignment
2. Arithmetic operations and comparisons
3. Method with fixed number of operations

**O(n) Exercises (3):**
1. Single loop iterating through array
2. Two sequential loops (trick: still O(n))
3. Loop with early exit possibility

**O(n²) Exercises (3):**
1. Classic nested loops
2. Nested loops with different bounds
3. Loop that prints all pairs

**O(log n) Exercises (2-3):**
1. Binary search pattern
2. Loop that halves n each iteration
3. Loop with i *= 2 increment

**O(n log n) Exercises (2):**
1. Nested loop with halving outer loop
2. Pattern recognition from description

**O(2^n) Exercises (2):**
1. Recursive Fibonacci
2. Subset generation pattern

---

## Quizzes

### Question Types
1. **Conceptual Multiple Choice** - Understanding Big O concepts
2. **Code Tracing** - Count operations for given input

### Quiz Questions (15-20 total)

**Conceptual Questions (10):**
- What does Big O measure?
- Why do we ignore constants?
- Which is more efficient: O(n) or O(n²)?
- What's the complexity of accessing array element by index?
- Identify complexity from code snippet
- Best vs worst case scenarios
- Space complexity basics

**Tracing Questions (6-8):**
- Given this loop with n=5, how many times does line X execute?
- Count total operations in nested loop
- Trace binary search steps for given array
- Count recursive calls for fibonacci(5)

---

## Technical Implementation

### Components to Build

1. **ComplexityGraph.tsx**
   - Recharts or Chart.js based line graph
   - Slider component for n (1-1000)
   - Toggle checkboxes for each complexity
   - Real-time calculation and rendering

2. **StepCounter.tsx**
   - Code display with syntax highlighting
   - Step-by-step execution simulation
   - Operation counter display
   - Speed controls (slow/medium/fast)

3. **ComplexityCard.tsx**
   - Reusable card for each complexity type
   - Shows: Name, notation, example, use cases

4. **CheatSheet.tsx**
   - Printable/saveable reference table
   - All complexities at a glance

### Data Structures

```typescript
interface ComplexityExample {
  id: string;
  complexity: 'O(1)' | 'O(n)' | 'O(n²)' | 'O(log n)' | 'O(n log n)' | 'O(2^n)';
  name: string;
  description: string;
  javaCode: string;
  stepCount: (n: number) => number;  // Function to calculate steps for input n
}

interface CodePattern {
  id: string;
  title: string;
  complexity: string;
  code: string;
  explanation: string;
  commonMistake?: string;
}
```

### File Structure
```
src/
├── app/modules/complexity/
│   ├── page.tsx                 # Overview/Intro
│   ├── visualization/page.tsx   # Interactive graph
│   ├── patterns/page.tsx        # Code patterns
│   └── practice/page.tsx        # Cheat sheet & mistakes
├── components/visualizer/complexity/
│   ├── ComplexityGraph.tsx
│   ├── StepCounter.tsx
│   ├── ComplexityCard.tsx
│   └── CheatSheet.tsx
├── lib/algorithms/complexity/
│   ├── types.ts
│   ├── examples.ts              # Code examples with step functions
│   └── calculations.ts          # Growth rate calculations
├── content/exercises/complexity/
│   └── complexity-exercises.ts
└── content/quizzes/complexity/
    └── complexity-quiz.ts
```

---

## Acceptance Criteria

### Page 1: Introduction
- [ ] Clear explanation of Big O notation
- [ ] At least 2 real-world examples of why complexity matters
- [ ] Brief space complexity introduction

### Page 2: Visualization
- [ ] Interactive graph with slider (n: 1-1000)
- [ ] All 6 complexity curves displayed
- [ ] Checkbox toggles for each curve
- [ ] Comparison table with values at n=10, 100, 1000

### Page 3: Code Patterns
- [ ] At least 2 examples per complexity type
- [ ] Step counter demo functional
- [ ] Syntax-highlighted Java code

### Page 4: Practice
- [ ] Complete cheat sheet with all complexities
- [ ] 4 common mistakes explained with examples
- [ ] Space complexity quick reference

### Exercises
- [ ] 15-18 code-to-Big-O matching exercises
- [ ] Cover all 6 complexity types
- [ ] Clear explanations for correct answers

### Quizzes
- [ ] 10 conceptual multiple choice questions
- [ ] 6-8 code tracing questions
- [ ] Mix of difficulties

---

## Success Metrics
- Students can identify complexity from code patterns
- Students understand growth rate differences visually
- Students avoid common misconceptions
- Quiz pass rate > 70% on first attempt

---

## Open Questions
None - scope is well-defined and focused on core Big O concepts.
