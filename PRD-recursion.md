# PRD: Recursion Module

## Overview

### Problem Statement
Students often struggle to understand recursion - how it works, why it works, and when to use it. They need visual tools to see the call stack in action, understand base cases vs recursive cases, and build intuition for recursive problem-solving.

### Goals
1. Teach recursion fundamentals with clear, visual explanations
2. Provide interactive call stack visualization where students can input their own values
3. Show memory allocation and stack frames for each recursive call
4. Cover classic examples: factorial, fibonacci, sum
5. Compare recursion vs iteration with code and performance analysis
6. Address common pitfalls and debugging strategies

### Target Users
CS205 students learning recursion for the first time.

---

## Scope

### In Scope
- Recursion concepts (base case, recursive case, how calls work)
- Interactive call stack visualizer with custom input
- Memory/stack frame diagrams
- Classic examples: factorial, fibonacci, array sum
- Recursion vs iteration comparison (code + complexity)
- Common pitfalls section
- Tracing exercises
- 8-10 quiz questions

### Out of Scope
- Advanced recursion (mutual recursion, tail recursion optimization)
- Tree/graph recursion (covered in separate Trees module)
- Dynamic programming / memoization (brief mention only)
- Backtracking algorithms

---

## Module Structure

### Page Organization (By Example Type)

#### Page 1: Overview (`/modules/recursion/`)
**Purpose:** Introduce recursion concepts and build foundational understanding

**Content:**
- What is recursion? A function that calls itself
- The two essential parts:
  - **Base Case**: When to stop (prevents infinite recursion)
  - **Recursive Case**: How to break down the problem
- Visual analogy: Russian nesting dolls, mirrors facing each other
- When to use recursion vs iteration
- Simple conceptual diagram of a recursive call

**Key Concepts:**
```java
// Structure of a recursive function
returnType recursiveFunction(parameters) {
    // Base case - stop condition
    if (baseCondition) {
        return baseValue;
    }
    // Recursive case - call itself with smaller problem
    return recursiveFunction(smallerProblem);
}
```

#### Page 2: Factorial & Sum (`/modules/recursion/factorial/`)
**Purpose:** First hands-on examples with interactive visualization

**Content:**

**Factorial Example:**
```java
int factorial(int n) {
    // Base case: factorial of 0 or 1 is 1
    if (n <= 1) {
        return 1;
    }
    // Recursive case: n! = n * (n-1)!
    return n * factorial(n - 1);
}
```

**Array Sum Example:**
```java
int sum(int[] arr, int index) {
    // Base case: reached end of array
    if (index >= arr.length) {
        return 0;
    }
    // Recursive case: current element + sum of rest
    return arr[index] + sum(arr, index + 1);
}
```

**Interactive Components:**
1. **Call Stack Visualizer**
   - Input field for n (factorial) or array (sum)
   - Step-by-step animation showing:
     - Each call pushing onto the stack
     - Current parameters and local variables
     - Return values as calls pop off
   - Play/Pause/Step controls
   - Speed slider

2. **Memory Diagram**
   - Show stack frames with:
     - Function name
     - Parameter values
     - Return address
     - Local variables
   - Highlight current executing frame
   - Show frames being created and destroyed

#### Page 3: Fibonacci (`/modules/recursion/fibonacci/`)
**Purpose:** Show tree-like recursion and discuss efficiency

**Content:**

**Fibonacci Code:**
```java
int fibonacci(int n) {
    // Base cases
    if (n <= 0) return 0;
    if (n == 1) return 1;
    // Recursive case: fib(n) = fib(n-1) + fib(n-2)
    return fibonacci(n - 1) + fibonacci(n - 2);
}
```

**Interactive Components:**
1. **Call Tree Visualizer**
   - Show the tree of recursive calls
   - Highlight repeated calculations (same subproblems)
   - Count total number of calls
   - Show exponential growth: fib(5) makes 15 calls

2. **Efficiency Warning**
   - Show call count for fib(10), fib(20), fib(30)
   - Explain O(2^n) time complexity
   - Brief mention of memoization as solution (not implemented)

**Common Pitfalls Section (on this page):**
1. **Missing Base Case**
   ```java
   // BAD: No base case = infinite recursion!
   int badFactorial(int n) {
       return n * badFactorial(n - 1); // Never stops!
   }
   ```

2. **Base Case Never Reached**
   ```java
   // BAD: Recursion doesn't progress toward base case
   int badSum(int n) {
       if (n == 0) return 0;
       return n + badSum(n); // n never changes!
   }
   ```

3. **Stack Overflow**
   - What happens when recursion is too deep
   - Stack has limited memory
   - Example: factorial(100000) will crash

#### Page 4: Recursion vs Iteration (`/modules/recursion/comparison/`)
**Purpose:** Compare approaches and help students choose

**Content:**

**Side-by-Side Code Comparison:**

| Recursive | Iterative |
|-----------|-----------|
```java
// Recursive Factorial
int factorialRec(int n) {
    if (n <= 1) return 1;
    return n * factorialRec(n-1);
}
```
|
```java
// Iterative Factorial
int factorialIter(int n) {
    int result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
```

**Complexity Comparison Table:**
| Aspect | Recursive | Iterative |
|--------|-----------|-----------|
| Time Complexity | O(n) | O(n) |
| Space Complexity | O(n) - call stack | O(1) |
| Readability | Often cleaner for tree-like problems | Often cleaner for linear problems |
| Performance | Function call overhead | Usually faster |
| Risk | Stack overflow for large n | No stack risk |

**When to Use Each:**
- **Use Recursion When:**
  - Problem has natural recursive structure (trees, nested data)
  - Code clarity is more important than performance
  - Depth is bounded and reasonable

- **Use Iteration When:**
  - Simple linear traversal
  - Performance is critical
  - Very large input sizes expected
  - Memory is constrained

**Interactive Demo:**
- Run both versions with same input
- Show execution time comparison
- Show memory usage comparison

---

## Components to Build

### 1. CallStackVisualizer.tsx
**Purpose:** Interactive visualization of recursive call stack

**Features:**
- Input field for function parameter(s)
- Stack visualization showing frames
- Each frame displays:
  - Function name
  - Parameters
  - Local variables
  - Return value (when returning)
- Animation controls: Play, Pause, Step Forward, Step Back, Reset
- Speed control slider
- Color coding: active frame, completed frames, waiting frames

**State Management:**
```typescript
interface StackFrame {
  id: string;
  functionName: string;
  params: Record<string, number>;
  localVars: Record<string, number>;
  returnValue?: number;
  status: 'executing' | 'waiting' | 'returning' | 'completed';
}

interface CallStackState {
  frames: StackFrame[];
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  speed: 'slow' | 'medium' | 'fast';
}
```

### 2. CallTreeVisualizer.tsx
**Purpose:** Show tree of recursive calls (for Fibonacci)

**Features:**
- Tree layout showing all calls
- Nodes show function name and parameter
- Edges show call relationships
- Highlight duplicate calculations
- Show total call count
- Animate execution order

### 3. MemoryDiagram.tsx
**Purpose:** Show stack memory allocation

**Features:**
- Visual representation of stack memory
- Show frame allocation as calls happen
- Show deallocation as calls return
- Display memory addresses (simplified)
- Show stack growing downward (convention)

### 4. RecursionComparison.tsx
**Purpose:** Side-by-side recursive vs iterative comparison

**Features:**
- Two code panels with syntax highlighting
- Run both with same input
- Show execution metrics (time, memory)
- Complexity labels

---

## Exercises

### Tracing Exercises (4-5 questions)
Students manually trace through recursive calls and provide the answer.

1. **Trace factorial(4)** - What is the return value?
2. **Trace sum([1,2,3], 0)** - How many recursive calls are made?
3. **Trace fibonacci(5)** - What is the return value?
4. **Trace fibonacci(4)** - How many times is fibonacci(2) called?

### Conceptual Questions (4-5 questions)
Multiple choice about recursion concepts.

1. What happens if a recursive function has no base case?
2. What is the space complexity of recursive factorial?
3. Which problem is naturally suited for recursion?
4. What causes a StackOverflowError?

---

## Quiz Questions (8-10 total)

### Conceptual (5-6 questions)
1. **Base Case Purpose**: Why is a base case necessary?
2. **Recursive Case**: What must the recursive case do to eventually reach the base case?
3. **Stack Overflow**: What causes stack overflow in recursion?
4. **Space Complexity**: Why does recursion use more memory than iteration?
5. **When to Use**: Which scenario is best suited for recursion?
6. **Call Order**: In what order do recursive calls return?

### Tracing (3-4 questions)
1. What does `factorial(5)` return?
2. How many times is `factorial` called for `factorial(4)`?
3. What is the maximum stack depth for `fibonacci(4)`?
4. What does `sum([2,4,6], 0)` return?

---

## File Structure

```
src/
├── app/modules/recursion/
│   ├── page.tsx                 # Overview/Concepts
│   ├── factorial/page.tsx       # Factorial & Sum examples
│   ├── fibonacci/page.tsx       # Fibonacci + pitfalls
│   └── comparison/page.tsx      # Recursion vs Iteration
├── components/visualizer/recursion/
│   ├── CallStackVisualizer.tsx
│   ├── CallTreeVisualizer.tsx
│   ├── MemoryDiagram.tsx
│   ├── RecursionComparison.tsx
│   └── index.ts
├── lib/algorithms/recursion/
│   ├── types.ts
│   ├── examples.ts              # Recursive function definitions
│   ├── traceGenerator.ts        # Generate execution traces
│   └── index.ts
├── content/exercises/recursion/
│   └── recursion-exercises.ts
└── content/quizzes/recursion/
    └── recursion-quiz.ts
```

---

## Technical Implementation

### Trace Generation
```typescript
interface ExecutionStep {
  stepNumber: number;
  action: 'call' | 'return';
  functionName: string;
  params: Record<string, number>;
  returnValue?: number;
  stackDepth: number;
  explanation: string;
}

function generateFactorialTrace(n: number): ExecutionStep[] {
  // Generate step-by-step trace of factorial(n)
  // Used by visualizer for animation
}
```

### Recursive Examples
```typescript
interface RecursiveExample {
  id: string;
  name: string;
  description: string;
  code: string;
  baseCase: string;
  recursiveCase: string;
  generateTrace: (input: number | number[]) => ExecutionStep[];
  complexity: {
    time: string;
    space: string;
  };
}
```

---

## Acceptance Criteria

### Page 1: Overview
- [ ] Clear explanation of recursion concept
- [ ] Base case vs recursive case defined
- [ ] Visual diagram of recursive structure
- [ ] "When to use" guidance

### Page 2: Factorial & Sum
- [ ] Interactive call stack visualizer working
- [ ] Custom input support
- [ ] Animation controls functional
- [ ] Memory diagram showing stack frames
- [ ] Both factorial and sum examples

### Page 3: Fibonacci
- [ ] Call tree visualization
- [ ] Shows repeated calculations
- [ ] Call count display
- [ ] Common pitfalls section with 3 examples
- [ ] Stack overflow explanation

### Page 4: Comparison
- [ ] Side-by-side code display
- [ ] Complexity comparison table
- [ ] "When to use each" guidance
- [ ] Interactive demo comparing both approaches

### Exercises & Quizzes
- [ ] 4-5 tracing exercises
- [ ] 8-10 quiz questions total
- [ ] Mix of conceptual and tracing

---

## Success Criteria
- Students can explain what recursion is and identify base/recursive cases
- Students can trace through simple recursive functions
- Students understand call stack behavior
- Students know when to choose recursion vs iteration
- Quiz pass rate > 70% on first attempt

---

## Open Questions
None - scope is well-defined for core recursion concepts.
