# CS205 Learning Tool — New Modules Specification

## Initial Idea
Expand the CS205 Learning Tool with 5 new modules: Searching Algorithms, Trees, Heaps & Priority Queues, Graphs, and Dynamic Programming. Each module matches the depth and interactivity of existing modules (3–8 subtopics, animated visualizations with play/pause/step controls, code examples in Java, exercises, and quizzes).

---

## Overview

### Problem Statement
The current tool covers 7 core data structures topics but is missing several foundational CS205 subjects — searching, trees, heaps, and graphs. Students need the same interactive, visual learning experience for these topics.

### Goals
1. Add 4 new modules with ~15 new pages total
2. Maintain consistent quality with existing modules (interactive visualizations, code examples, exercises, quizzes)
3. Build on concepts from existing modules where appropriate (e.g., Heaps connects to Sorting, Graphs uses Dijkstra's which connects to Heaps)

### Target Users
CS205 students at Monmouth University learning data structures.

### Constraints
- Match existing tech stack: Next.js 16, Tailwind v4, TypeScript, lucide-react icons
- All visualizations client-side (no backend needed)
- Java code examples (matching existing modules)
- Deployed under `/cs205` basePath

---

## Module 1: Searching Algorithms

### Sidebar Entry
```
Searching
├── Linear Search
├── Binary Search
└── Comparison & Practice
```

### Page 1: Linear Search (`/modules/searching/linear`)

**Purpose:** Introduce sequential search and its characteristics.

**Content:**
- What is linear search? Scanning elements one by one
- Algorithm walkthrough with pseudocode and Java
- Best case (O(1) — first element), worst case (O(n) — last/not found), average case (O(n/2))
- Works on unsorted and sorted arrays

**Java Code:**
```java
int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i; // Found at index i
        }
    }
    return -1; // Not found
}
```

**Interactive Visualization:**
- Input: array of numbers + target value
- Step-by-step animation highlighting the current element being checked
- Show comparisons counter
- Play/Pause/Step/Reset controls + speed slider
- Visual feedback: green highlight when found, red X when not found
- Show current index pointer moving through array

### Page 2: Binary Search (`/modules/searching/binary`)

**Purpose:** Teach divide-and-conquer searching on sorted arrays.

**Content:**
- Prerequisite: array must be sorted
- How it works: compare middle element, eliminate half
- Iterative implementation
- Recursive implementation
- Time complexity: O(log n), Space: O(1) iterative / O(log n) recursive

**Java Code (Iterative):**
```java
int binarySearch(int[] arr, int target) {
    int low = 0, high = arr.length - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}
```

**Java Code (Recursive):**
```java
int binarySearch(int[] arr, int target, int low, int high) {
    if (low > high) return -1;
    int mid = low + (high - low) / 2;
    if (arr[mid] == target) return mid;
    else if (arr[mid] < target)
        return binarySearch(arr, target, mid + 1, high);
    else
        return binarySearch(arr, target, low, mid - 1);
}
```

**Interactive Visualization:**
- Input: sorted array of numbers + target value
- Show low, mid, high pointers on the array
- Step-by-step animation:
  - Highlight the current search range
  - Show mid calculation
  - Eliminate half (gray out eliminated portion)
  - Update low/high pointers
- Comparisons counter
- Show logarithmic narrowing visually (search space shrinking)
- Play/Pause/Step/Reset controls + speed slider

### Page 3: Comparison & Practice (`/modules/searching/comparison`)

**Purpose:** Compare search algorithms and test understanding.

**Content:**

**Comparison Table:**
| Aspect | Linear Search | Binary Search |
|--------|--------------|---------------|
| Time Complexity | O(n) | O(log n) |
| Space Complexity | O(1) | O(1) iterative / O(log n) recursive |
| Prerequisite | None | Sorted array |
| Best For | Small/unsorted arrays | Large sorted arrays |
| Worst Case | Must check every element | log₂(n) comparisons |

**When to Use Each:**
- **Linear Search:** unsorted data, small arrays, linked lists, finding all occurrences
- **Binary Search:** sorted arrays, large datasets, when O(log n) matters

**Interactive Demo:**
- Race mode: run both searches on same sorted array, show comparison count side by side
- Input: array size + target
- Visual demonstration of why binary search is faster on large arrays

**Quiz Questions (6–8):**
1. What is the time complexity of linear search? (O(n))
2. What must be true about an array to use binary search? (sorted)
3. Binary search on 1024 elements makes at most how many comparisons? (10)
4. Which search works on a linked list? (linear)
5. What does binary search do when arr[mid] < target? (search right half)
6. Best case time complexity of linear search? (O(1))
7. If binary search has low=3, high=9, what is mid? (6)
8. Which search algorithm uses divide-and-conquer? (binary search)

---

## Module 2: Trees

### Sidebar Entry
```
Trees
├── Overview
├── Traversals
└── Applications & Practice
```

### Page 1: Overview (`/modules/trees`)

**Purpose:** Introduce tree data structure concepts and terminology.

**Content:**
- What is a tree? A hierarchical data structure with nodes and edges
- Tree terminology:
  - **Root**: top node with no parent
  - **Leaf**: node with no children
  - **Parent / Child**: relationship between connected nodes
  - **Siblings**: nodes sharing the same parent
  - **Height**: longest path from root to a leaf
  - **Depth**: distance from root to a node
  - **Subtree**: a node and all its descendants
- Binary tree: each node has at most 2 children (left, right)
- Types of binary trees:
  - **Full binary tree**: every node has 0 or 2 children
  - **Complete binary tree**: all levels filled except possibly last (filled left to right)
  - **Perfect binary tree**: all internal nodes have 2 children, all leaves at same level

**Java Code:**
```java
class TreeNode {
    int value;
    TreeNode left;
    TreeNode right;

    TreeNode(int value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
```

**Interactive Visualization:**
- Display a sample binary tree with labeled nodes
- Hover/click nodes to see: parent, children, depth, height
- Toggle labels showing terminology (root, leaf, height annotations)
- Build-your-own-tree: click to add/remove nodes and see how properties change

### Page 2: Traversals (`/modules/trees/traversals`)

**Purpose:** Teach the three depth-first traversal orders and breadth-first traversal.

**Content:**

**In-Order Traversal (Left → Root → Right):**
```java
void inOrder(TreeNode node) {
    if (node == null) return;
    inOrder(node.left);
    System.out.print(node.value + " ");
    inOrder(node.right);
}
```
- For BSTs, produces sorted output
- Mnemonic: "in" = root is IN the middle

**Pre-Order Traversal (Root → Left → Right):**
```java
void preOrder(TreeNode node) {
    if (node == null) return;
    System.out.print(node.value + " ");
    preOrder(node.left);
    preOrder(node.right);
}
```
- Useful for copying/serializing a tree
- Mnemonic: "pre" = root comes BEFORE children

**Post-Order Traversal (Left → Right → Root):**
```java
void postOrder(TreeNode node) {
    if (node == null) return;
    postOrder(node.left);
    postOrder(node.right);
    System.out.print(node.value + " ");
}
```
- Useful for deleting a tree (delete children before parent)
- Mnemonic: "post" = root comes AFTER children

**Level-Order Traversal (BFS):**
```java
void levelOrder(TreeNode root) {
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        TreeNode node = queue.poll();
        System.out.print(node.value + " ");
        if (node.left != null) queue.add(node.left);
        if (node.right != null) queue.add(node.right);
    }
}
```

**Interactive Visualization:**
- Display a binary tree (same sample or user-built)
- Buttons to select traversal type: In-Order, Pre-Order, Post-Order, Level-Order
- Step-by-step animation:
  - Highlight current node being visited
  - Show the call stack for recursive traversals
  - Build the output array incrementally
  - Show traversal path with arrows
- Play/Pause/Step/Reset controls + speed slider
- Output display showing the order numbers are visited

### Page 3: Applications & Practice (`/modules/trees/practice`)

**Purpose:** Show real-world tree applications and test understanding.

**Content:**

**Expression Trees:**
- How mathematical expressions are stored as trees
- Example: `(3 + 5) * 2` as a tree with `*` at root
- In-order traversal gives infix notation
- Post-order traversal gives postfix (RPN) notation
- Visual builder: enter an expression, see the tree

**File System Trees:**
- Directories and files form a tree structure
- Show a sample file system as a tree diagram
- How `ls -R` is essentially a pre-order traversal

**Real-World Uses:**
- HTML DOM is a tree
- Decision trees in AI
- Organization charts

**Exercises (4–5):**
1. Given a tree diagram, write the in-order traversal output
2. Given a tree diagram, write the pre-order traversal output
3. Given a tree diagram, write the post-order traversal output
4. Build a tree from given pre-order and in-order sequences
5. What traversal order would you use to evaluate an expression tree?

**Quiz Questions (6–8):**
1. What is the maximum number of nodes in a binary tree of height h? (2^(h+1) - 1)
2. Which traversal visits the root first? (pre-order)
3. Which traversal of a BST gives sorted output? (in-order)
4. A node with no children is called a ___? (leaf)
5. What data structure does level-order traversal use? (queue)
6. In a complete binary tree with 10 nodes, how many leaves? (5)
7. Which traversal is used to delete a tree safely? (post-order)
8. What is the height of a single-node tree? (0)

---

## Module 3: Heaps & Priority Queues

### Sidebar Entry
```
Heaps & Priority Queues
├── Heap Basics
├── Heapify & Heap Sort
├── Priority Queue
└── Practice & Quiz
```

### Page 1: Heap Basics (`/modules/heaps/basics`)

**Purpose:** Introduce heap data structure, properties, and core operations.

**Content:**
- What is a heap? A complete binary tree satisfying the heap property
- **Max-Heap**: parent ≥ children (largest at root)
- **Min-Heap**: parent ≤ children (smallest at root)
- Array representation:
  - Parent of index `i`: `(i - 1) / 2`
  - Left child of index `i`: `2 * i + 1`
  - Right child of index `i`: `2 * i + 2`

**Insert Operation (Bubble Up / Sift Up):**
```java
void insert(int value) {
    heap[size] = value;
    size++;
    bubbleUp(size - 1);
}

void bubbleUp(int index) {
    while (index > 0) {
        int parent = (index - 1) / 2;
        if (heap[index] > heap[parent]) { // max-heap
            swap(index, parent);
            index = parent;
        } else {
            break;
        }
    }
}
```

**Extract Max/Min (Bubble Down / Sift Down):**
```java
int extractMax() {
    int max = heap[0];
    heap[0] = heap[size - 1];
    size--;
    bubbleDown(0);
    return max;
}

void bubbleDown(int index) {
    while (2 * index + 1 < size) {
        int largest = index;
        int left = 2 * index + 1;
        int right = 2 * index + 2;
        if (left < size && heap[left] > heap[largest]) largest = left;
        if (right < size && heap[right] > heap[largest]) largest = right;
        if (largest != index) {
            swap(index, largest);
            index = largest;
        } else {
            break;
        }
    }
}
```

**Interactive Visualization:**
- Dual view: tree representation + array representation (synchronized)
- Insert mode: type a value, watch it get added and bubble up
- Extract mode: click to remove root, watch replacement bubble down
- Step-by-step animation showing swaps
- Highlight parent-child comparisons at each step
- Toggle between min-heap and max-heap
- Play/Pause/Step/Reset controls + speed slider

### Page 2: Heapify & Heap Sort (`/modules/heaps/heapsort`)

**Purpose:** Show how to build a heap efficiently and use it for sorting.

**Content:**

**Heapify (Build Heap):**
- Naive approach: insert elements one by one — O(n log n)
- Efficient approach: start from last non-leaf, sift down — O(n)
- Why O(n)? Most nodes are near the bottom and sift down a short distance

```java
void heapify(int[] arr) {
    int n = arr.length;
    // Start from last non-leaf node
    for (int i = n / 2 - 1; i >= 0; i--) {
        bubbleDown(arr, n, i);
    }
}
```

**Heap Sort Algorithm:**
```java
void heapSort(int[] arr) {
    int n = arr.length;
    // Build max-heap
    for (int i = n / 2 - 1; i >= 0; i--)
        bubbleDown(arr, n, i);
    // Extract elements one by one
    for (int i = n - 1; i > 0; i--) {
        swap(arr, 0, i);       // Move max to end
        bubbleDown(arr, i, 0); // Restore heap on reduced array
    }
}
```

**Complexity:**
| Operation | Time | Space |
|-----------|------|-------|
| Build Heap (heapify) | O(n) | O(1) |
| Heap Sort | O(n log n) | O(1) |
| Insert | O(log n) | O(1) |
| Extract Max/Min | O(log n) | O(1) |

**Connection to Sorting Module:**
- Link back to sorting module's comparison page
- Heap sort is not stable but is in-place with guaranteed O(n log n)

**Interactive Visualization:**
- Input: array of numbers
- Phase 1: Watch heapify build the heap bottom-up
- Phase 2: Watch heap sort extract elements and rebuild
- Show both tree view and array view simultaneously
- Highlight the sorted portion growing at the end of the array
- Play/Pause/Step/Reset controls + speed slider

### Page 3: Priority Queue (`/modules/heaps/priority-queue`)

**Purpose:** Introduce the Priority Queue ADT and its heap-based implementation.

**Content:**
- What is a priority queue? Elements dequeued by priority, not insertion order
- Difference from regular queue: FIFO vs priority-based
- Operations:
  - `enqueue(element, priority)` — insert with priority
  - `dequeue()` — remove highest-priority element
  - `peek()` — view highest-priority without removing

**Java Code:**
```java
// Using Java's built-in PriorityQueue (min-heap by default)
PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.add(5);
pq.add(1);
pq.add(3);
System.out.println(pq.poll()); // 1 (smallest)

// Max-heap priority queue
PriorityQueue<Integer> maxPQ = new PriorityQueue<>(Collections.reverseOrder());
```

**Real-World Applications:**
- **OS scheduling**: processes with higher priority run first
- **Dijkstra's algorithm**: always process the nearest unvisited node (connection to Graphs module)
- **Emergency room**: patients triaged by severity
- **Event simulation**: process events in chronological order

**Comparison with Other Structures:**
| Structure | Insert | Remove Min/Max | Peek |
|-----------|--------|---------------|------|
| Unsorted Array | O(1) | O(n) | O(n) |
| Sorted Array | O(n) | O(1) | O(1) |
| Heap | O(log n) | O(log n) | O(1) |

**Interactive Visualization:**
- Visual priority queue with labeled priorities
- Enqueue: add elements with priorities, watch heap insertion
- Dequeue: remove highest priority, watch heap extraction
- Show both the conceptual "queue" view and underlying heap structure
- Real-world scenario simulator: e.g., ER triage — patients arrive with severity levels

### Page 4: Practice & Quiz (`/modules/heaps/practice`)

**Purpose:** Test understanding with exercises and quiz.

**Exercises (4–5):**
1. Given array [4, 10, 3, 5, 1], draw the max-heap after heapify
2. Show the array state after extracting max from a given heap
3. Insert values 7, 3, 9, 1, 5 into an empty min-heap — show final state
4. Trace heap sort on [3, 1, 4, 1, 5, 9]
5. Given a priority queue scenario, determine the dequeue order

**Quiz Questions (8–10):**
1. What is the time complexity of building a heap using heapify? (O(n))
2. In a max-heap, where is the largest element? (root / index 0)
3. For a node at index 5, what is its parent index? (2)
4. What is the time complexity of heap sort? (O(n log n))
5. Is heap sort stable? (No)
6. What data structure is a priority queue typically implemented with? (heap)
7. In a min-heap with values [1, 3, 5, 7, 9], what happens when you insert 2? (bubbles up to index 1)
8. What is the space complexity of heap sort? (O(1))
9. For a node at index 3, what are its children's indices? (7 and 8)
10. What is the advantage of a heap over a sorted array for a priority queue? (O(log n) insert vs O(n))

---

## Module 4: Graphs

### Sidebar Entry
```
Graphs
├── Overview
├── BFS
├── DFS
├── Dijkstra's Algorithm
└── Practice & Quiz
```

### Page 1: Overview (`/modules/graphs`)

**Purpose:** Introduce graph concepts, terminology, and representations.

**Content:**
- What is a graph? Vertices (nodes) connected by edges
- Graph terminology:
  - **Vertex / Node**: a point in the graph
  - **Edge**: a connection between two vertices
  - **Directed vs Undirected**: one-way vs two-way edges
  - **Weighted vs Unweighted**: edges with or without costs
  - **Path**: sequence of vertices connected by edges
  - **Cycle**: path that starts and ends at the same vertex
  - **Connected**: every vertex is reachable from every other
  - **Degree**: number of edges connected to a vertex (in-degree / out-degree for directed)
  - **Adjacent**: two vertices connected by an edge

**Adjacency Matrix:**
```java
// Undirected graph with 4 vertices
int[][] adjMatrix = {
    {0, 1, 1, 0},  // vertex 0 connects to 1, 2
    {1, 0, 0, 1},  // vertex 1 connects to 0, 3
    {1, 0, 0, 1},  // vertex 2 connects to 0, 3
    {0, 1, 1, 0}   // vertex 3 connects to 1, 2
};
```
- Pros: O(1) edge lookup, simple
- Cons: O(V²) space, wasteful for sparse graphs

**Adjacency List:**
```java
// Same graph as above
List<List<Integer>> adjList = new ArrayList<>();
adjList.add(Arrays.asList(1, 2));    // vertex 0
adjList.add(Arrays.asList(0, 3));    // vertex 1
adjList.add(Arrays.asList(0, 3));    // vertex 2
adjList.add(Arrays.asList(1, 2));    // vertex 3
```
- Pros: O(V + E) space, efficient for sparse graphs
- Cons: O(degree) edge lookup

**Comparison:**
| Aspect | Adjacency Matrix | Adjacency List |
|--------|-----------------|----------------|
| Space | O(V²) | O(V + E) |
| Check edge exists | O(1) | O(degree) |
| Find all neighbors | O(V) | O(degree) |
| Best for | Dense graphs | Sparse graphs |

**Interactive Visualization:**
- Canvas with draggable nodes and clickable edges
- Build a graph by clicking to add nodes and dragging to add edges
- Toggle: directed/undirected, weighted/unweighted
- Toggle view: show adjacency matrix and adjacency list side by side
- Both representations update live as the graph is modified
- Pre-loaded example graphs (complete, tree, cycle, disconnected)

### Page 2: BFS (`/modules/graphs/bfs`)

**Purpose:** Teach breadth-first search algorithm and its applications.

**Content:**
- What is BFS? Explore all neighbors before going deeper (level by level)
- Uses a **queue** (FIFO) — connection to Stacks & Queues module
- Visited set to avoid revisiting nodes

**Java Code:**
```java
void bfs(List<List<Integer>> graph, int start) {
    boolean[] visited = new boolean[graph.size()];
    Queue<Integer> queue = new LinkedList<>();

    visited[start] = true;
    queue.add(start);

    while (!queue.isEmpty()) {
        int vertex = queue.poll();
        System.out.print(vertex + " ");

        for (int neighbor : graph.get(vertex)) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.add(neighbor);
            }
        }
    }
}
```

**Complexity:** Time O(V + E), Space O(V)

**Applications:**
- Shortest path in unweighted graphs
- Level-order traversal of trees (connection to Trees module)
- Finding connected components
- Social network "degrees of separation"

**Interactive Visualization:**
- Display a graph (pre-loaded or user-built)
- Select a starting vertex
- Step-by-step BFS animation:
  - Show the queue contents at each step
  - Color code: unvisited (gray), in queue/frontier (yellow), visited (green), current (blue)
  - Show discovery order numbers on nodes
  - Highlight edges being traversed
  - Show BFS tree forming
- Play/Pause/Step/Reset controls + speed slider

### Page 3: DFS (`/modules/graphs/dfs`)

**Purpose:** Teach depth-first search algorithm and compare with BFS.

**Content:**
- What is DFS? Explore as deep as possible before backtracking
- Uses a **stack** (LIFO) or recursion — connection to Stacks & Queues and Recursion modules
- Visited set to avoid revisiting nodes

**Java Code (Recursive):**
```java
void dfs(List<List<Integer>> graph, int vertex, boolean[] visited) {
    visited[vertex] = true;
    System.out.print(vertex + " ");

    for (int neighbor : graph.get(vertex)) {
        if (!visited[neighbor]) {
            dfs(graph, neighbor, visited);
        }
    }
}
```

**Java Code (Iterative with Stack):**
```java
void dfsIterative(List<List<Integer>> graph, int start) {
    boolean[] visited = new boolean[graph.size()];
    Stack<Integer> stack = new Stack<>();

    stack.push(start);

    while (!stack.isEmpty()) {
        int vertex = stack.pop();
        if (!visited[vertex]) {
            visited[vertex] = true;
            System.out.print(vertex + " ");

            for (int neighbor : graph.get(vertex)) {
                if (!visited[neighbor]) {
                    stack.push(neighbor);
                }
            }
        }
    }
}
```

**Complexity:** Time O(V + E), Space O(V)

**BFS vs DFS Comparison:**
| Aspect | BFS | DFS |
|--------|-----|-----|
| Data Structure | Queue | Stack / Recursion |
| Explores | Level by level | As deep as possible |
| Shortest Path | Yes (unweighted) | No |
| Space | O(V) — can be wide | O(V) — can be deep |
| Best For | Shortest path, nearby nodes | Cycle detection, topological order |

**Applications:**
- Cycle detection
- Path finding (any path, not necessarily shortest)
- Maze solving
- Connected components

**Interactive Visualization:**
- Same graph display as BFS page
- Select starting vertex
- Step-by-step DFS animation:
  - Show the stack contents (or call stack for recursive) at each step
  - Color code: unvisited (gray), in stack (yellow), visited (green), current (blue), backtracking (orange)
  - Show discovery order numbers on nodes
  - Highlight edges: tree edges vs back edges
  - Show DFS tree forming
- Toggle: recursive vs iterative view
- Side-by-side mode: run BFS and DFS on same graph to compare visitation order
- Play/Pause/Step/Reset controls + speed slider

### Page 4: Dijkstra's Algorithm (`/modules/graphs/dijkstra`)

**Purpose:** Teach shortest path in weighted graphs using Dijkstra's algorithm.

**Content:**
- Problem: find shortest path from source to all other vertices in a weighted graph
- Prerequisite: no negative edge weights
- Greedy approach: always process the nearest unvisited vertex
- Uses a **priority queue** — connection to Heaps module

**Java Code:**
```java
int[] dijkstra(int[][] graph, int source) {
    int V = graph.length;
    int[] dist = new int[V];
    boolean[] visited = new boolean[V];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[source] = 0;

    // Min-heap: (distance, vertex)
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    pq.add(new int[]{0, source});

    while (!pq.isEmpty()) {
        int[] curr = pq.poll();
        int u = curr[1];

        if (visited[u]) continue;
        visited[u] = true;

        for (int v = 0; v < V; v++) {
            if (graph[u][v] != 0 && !visited[v]) {
                int newDist = dist[u] + graph[u][v];
                if (newDist < dist[v]) {
                    dist[v] = newDist;
                    pq.add(new int[]{newDist, v});
                }
            }
        }
    }
    return dist;
}
```

**Complexity:** O((V + E) log V) with priority queue

**Algorithm Steps:**
1. Set distance to source = 0, all others = ∞
2. Add source to priority queue
3. While priority queue is not empty:
   a. Extract vertex with minimum distance
   b. For each unvisited neighbor: if new path is shorter, update distance
4. Result: shortest distance from source to every vertex

**Interactive Visualization:**
- Weighted graph display (pre-loaded examples + user-editable)
- Select source vertex
- Step-by-step animation:
  - Show distance table updating at each step
  - Show priority queue contents
  - Color code: unvisited (gray), in PQ/frontier (yellow), finalized (green), current (blue)
  - Show edge weights on the graph
  - Highlight the edge being "relaxed"
  - Show shortest path tree forming
  - Display current shortest distances on/near each node
- After completion: click any node to see the shortest path from source highlighted
- Play/Pause/Step/Reset controls + speed slider

### Page 5: Practice & Quiz (`/modules/graphs/practice`)

**Purpose:** Test understanding with exercises and quiz.

**Exercises (5–6):**
1. Given a graph diagram, write the BFS traversal order starting from vertex A
2. Given a graph diagram, write the DFS traversal order starting from vertex A
3. Given a weighted graph, trace Dijkstra's from vertex A — show the distance table at each step
4. Given an adjacency matrix, draw the graph
5. Given a graph, identify: is it directed? connected? does it have cycles?
6. Convert between adjacency matrix and adjacency list representations

**Quiz Questions (8–10):**
1. What data structure does BFS use? (queue)
2. What data structure does DFS use? (stack / recursion)
3. Time complexity of BFS on a graph with V vertices and E edges? (O(V + E))
4. Which algorithm finds shortest path in an unweighted graph? (BFS)
5. What is the space complexity of an adjacency matrix? (O(V²))
6. Can Dijkstra's handle negative edge weights? (No)
7. What data structure makes Dijkstra's efficient? (priority queue / min-heap)
8. In an undirected graph, if vertex A is adjacent to B, is B adjacent to A? (Yes)
9. What is the degree of a vertex with 4 edges? (4)
10. DFS can be used to detect ___? (cycles)

---

## Components to Build

### Shared / Reusable
These components can be shared across modules:

1. **ArrayVisualizer** (extend existing) — add search pointer highlighting for Searching module
2. **AnimationControls** (extend existing) — Play/Pause/Step/Reset/Speed used across all new modules

### Searching Module
1. **LinearSearchVisualizer.tsx** — array with moving pointer, comparison counter
2. **BinarySearchVisualizer.tsx** — array with low/mid/high pointers, range elimination
3. **SearchRaceVisualizer.tsx** — side-by-side comparison running both algorithms

### Trees Module
1. **TreeVisualizer.tsx** — interactive binary tree display with node creation/deletion
2. **TraversalVisualizer.tsx** — step-by-step traversal animation with call stack display
3. **ExpressionTreeBuilder.tsx** — enter expression, see tree representation

### Heaps Module
1. **HeapVisualizer.tsx** — dual view (tree + array), insert/extract animations, min/max toggle
2. **HeapSortVisualizer.tsx** — heapify + sort phases with tree and array views
3. **PriorityQueueVisualizer.tsx** — enqueue/dequeue with priority labels

### Graphs Module
1. **GraphBuilder.tsx** — canvas for creating/editing graphs (nodes, edges, weights, direction)
2. **GraphRepresentationView.tsx** — synchronized adjacency matrix + adjacency list display
3. **BFSVisualizer.tsx** — BFS animation with queue display
4. **DFSVisualizer.tsx** — DFS animation with stack/call-stack display, recursive vs iterative toggle
5. **DijkstraVisualizer.tsx** — shortest path animation with distance table and priority queue

---

## File Structure

```
src/
├── app/modules/
│   ├── searching/
│   │   ├── linear/page.tsx
│   │   ├── binary/page.tsx
│   │   └── comparison/page.tsx
│   ├── trees/
│   │   ├── page.tsx                    # Overview
│   │   ├── traversals/page.tsx
│   │   └── practice/page.tsx
│   ├── heaps/
│   │   ├── basics/page.tsx
│   │   ├── heapsort/page.tsx
│   │   ├── priority-queue/page.tsx
│   │   └── practice/page.tsx
│   └── graphs/
│       ├── page.tsx                    # Overview
│       ├── bfs/page.tsx
│       ├── dfs/page.tsx
│       ├── dijkstra/page.tsx
│       └── practice/page.tsx
├── components/visualizer/
│   ├── searching/
│   │   ├── LinearSearchVisualizer.tsx
│   │   ├── BinarySearchVisualizer.tsx
│   │   ├── SearchRaceVisualizer.tsx
│   │   └── index.ts
│   ├── trees/
│   │   ├── TreeVisualizer.tsx
│   │   ├── TraversalVisualizer.tsx
│   │   ├── ExpressionTreeBuilder.tsx
│   │   └── index.ts
│   ├── heaps/
│   │   ├── HeapVisualizer.tsx
│   │   ├── HeapSortVisualizer.tsx
│   │   ├── PriorityQueueVisualizer.tsx
│   │   └── index.ts
│   └── graphs/
│       ├── GraphBuilder.tsx
│       ├── GraphRepresentationView.tsx
│       ├── BFSVisualizer.tsx
│       ├── DFSVisualizer.tsx
│       ├── DijkstraVisualizer.tsx
│       └── index.ts
├── lib/algorithms/
│   ├── searching/
│   │   ├── types.ts
│   │   ├── linearSearch.ts
│   │   ├── binarySearch.ts
│   │   └── index.ts
│   ├── trees/
│   │   ├── types.ts
│   │   ├── traversals.ts
│   │   └── index.ts
│   ├── heaps/
│   │   ├── types.ts
│   │   ├── heap.ts
│   │   ├── heapSort.ts
│   │   └── index.ts
│   └── graphs/
│       ├── types.ts
│       ├── bfs.ts
│       ├── dfs.ts
│       ├── dijkstra.ts
│       └── index.ts
└── content/quizzes/
    ├── searching-quiz.ts
    ├── trees-quiz.ts
    ├── heaps-quiz.ts
    └── graphs-quiz.ts
```

---

## Cross-Module Connections

The new modules connect to existing ones in several places:

| New Module | Connects To | How |
|------------|------------|-----|
| Trees: Level-Order | Stacks & Queues (Queue) | Level-order traversal uses a queue |
| Trees: Traversals | Recursion | Traversals are recursive algorithms |
| Heaps: Heap Sort | Sorting Algorithms | Heap sort appears in sorting comparison |
| Heaps: Priority Queue | Graphs (Dijkstra's) | Dijkstra's uses a priority queue |
| Graphs: BFS | Stacks & Queues (Queue) | BFS uses a queue |
| Graphs: DFS | Stacks & Queues (Stack), Recursion | DFS uses stack/recursion |
| Graphs: Dijkstra's | Heaps (Priority Queue) | Dijkstra's uses min-heap PQ |
| Searching: Binary | Recursion | Recursive binary search |
| Searching: Binary | Algorithm Complexity | O(log n) analysis |

These connections should be noted with links/callouts on the relevant pages to help students see how concepts build on each other.

---

## Implementation Plan

### Phase 1: Searching Algorithms
- Simplest module, fewest new component patterns
- 3 pages, 3 visualizer components
- Establishes patterns for search/animation controls

### Phase 2: Trees
- Foundation for Heaps and Graphs
- 3 pages, 3 visualizer components
- Tree rendering component will be reused by Heaps

### Phase 3: Heaps & Priority Queues
- Builds on tree visualization from Phase 2
- 4 pages, 3 visualizer components
- Priority queue concept needed for Dijkstra's in Phase 4

### Phase 4: Graphs
- Most complex module, depends on concepts from Phase 3 (priority queue)
- 5 pages, 5 visualizer components
- Graph builder component is the most complex new component

---

## Acceptance Criteria

### Searching Algorithms
- [ ] Linear search visualizer with step-by-step animation
- [ ] Binary search visualizer with range elimination
- [ ] Race mode comparing both algorithms
- [ ] 6–8 quiz questions
- [ ] All pages responsive and match existing module styling

### Trees
- [ ] Interactive tree display with terminology labels
- [ ] All 4 traversal types animated with call stack
- [ ] Expression tree builder
- [ ] 6–8 quiz questions
- [ ] Build-your-own-tree interaction

### Heaps & Priority Queues
- [ ] Dual view (tree + array) heap visualizer
- [ ] Insert and extract animations with bubble up/down
- [ ] Heapify and heap sort visualization
- [ ] Priority queue demo with real-world scenario
- [ ] 8–10 quiz questions
- [ ] Min/max heap toggle

### Graphs
- [ ] Interactive graph builder (add/remove nodes and edges)
- [ ] Adjacency matrix and list toggle view
- [ ] BFS animation with queue display
- [ ] DFS animation with stack display + recursive vs iterative toggle
- [ ] Dijkstra's animation with distance table and priority queue
- [ ] Path highlighting after Dijkstra's completes
- [ ] 8–10 quiz questions

### General
- [ ] All modules accessible via sidebar with collapsible sections
- [ ] Cross-module links work correctly
- [ ] All pages work under `/cs205` basePath
- [ ] Consistent styling with existing modules
- [ ] All visualizations have Play/Pause/Step/Reset + speed controls

---

## Success Criteria
- Students can explain and trace through all 4 new algorithm categories
- Interactive visualizations help build intuition (not just show answers)
- Quiz pass rate > 70% on first attempt across all new modules
- Students recognize connections between modules (e.g., Dijkstra's uses a priority queue)
- All 11 modules (7 existing + 4 new) form a cohesive learning path

---

## Module 5: Dynamic Programming

### Sidebar Entry
```
Dynamic Programming
├── Fundamentals
├── Classic Problems
├── DP Patterns
└── Practice & Quiz
```

### Page 1: Fundamentals (`/modules/dynamic-programming/fundamentals`)

**Purpose:** Introduce DP concepts, connect to recursion, and teach memoization vs tabulation.

**Content:**

**What is Dynamic Programming?**
- An optimization technique for problems with:
  1. **Overlapping subproblems**: same subproblems solved repeatedly
  2. **Optimal substructure**: optimal solution built from optimal sub-solutions
- Not a single algorithm — a problem-solving *approach*

**Connection to Recursion** (link to Recursion module):
- Start with naive recursive Fibonacci from the Recursion module
- Show the call tree with repeated work (fib(3) computed multiple times)
- Motivate: "What if we remembered results we already computed?"

**Top-Down: Memoization**
```java
int[] memo;

int fibMemo(int n) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n]; // Already computed
    memo[n] = fibMemo(n - 1) + fibMemo(n - 2);
    return memo[n];
}
```
- Same recursive structure, but cache results
- Recursive calls that hit the cache return immediately
- Time: O(n), Space: O(n)

**Bottom-Up: Tabulation**
```java
int fibTab(int n) {
    int[] dp = new int[n + 1];
    dp[0] = 0;
    dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}
```
- Build solution from smallest subproblems up
- No recursion — iterative with a table
- Time: O(n), Space: O(n) (can optimize to O(1) with two variables)

**Memoization vs Tabulation:**
| Aspect | Memoization (Top-Down) | Tabulation (Bottom-Up) |
|--------|----------------------|----------------------|
| Approach | Recursive + cache | Iterative + table |
| Computes | Only needed subproblems | All subproblems |
| Stack risk | Deep recursion possible | No stack risk |
| Ease of writing | More intuitive (start from recursion) | Requires understanding order |
| Space optimization | Harder | Easier (rolling array) |

**Interactive Visualization:**
- **Fibonacci comparison tool:**
  - Input: n value
  - Three side-by-side panels:
    1. Naive recursive: show full call tree, count total calls (exponential)
    2. Memoized: show call tree with cache hits highlighted (gray out skipped branches), count calls (linear)
    3. Tabulation: show table filling left to right, no tree
  - Call counter for each approach
  - Play/Pause/Step/Reset controls + speed slider
- **Cache visualization:** show memo array filling as recursive calls execute

### Page 2: Classic Problems (`/modules/dynamic-programming/classic`)

**Purpose:** Teach DP through three canonical problems with table-filling visualizations.

**Content:**

#### Problem 1: Coin Change
*Given coin denominations and a target amount, find the minimum number of coins needed.*

```java
int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1); // Initialize to "impossible"
    dp[0] = 0; // 0 coins needed for amount 0

    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}
```

**Interactive Visualization:**
- Input: coin denominations + target amount
- Show 1D DP table filling left to right
- For each cell: highlight which previous cells are being checked (i - coin)
- Show the recurrence: `dp[i] = min(dp[i], dp[i - coin] + 1)`
- After completion: trace back to show which coins were used
- Play/Pause/Step/Reset controls

#### Problem 2: 0/1 Knapsack
*Given items with weights and values, maximize value within a weight limit.*

```java
int knapsack(int[] weights, int[] values, int capacity) {
    int n = weights.length;
    int[][] dp = new int[n + 1][capacity + 1];

    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= capacity; w++) {
            dp[i][w] = dp[i - 1][w]; // Don't take item i
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(dp[i][w],
                    dp[i - 1][w - weights[i - 1]] + values[i - 1]); // Take item i
            }
        }
    }
    return dp[n][capacity];
}
```

**Interactive Visualization:**
- Input: list of items (name, weight, value) + capacity
- Show 2D DP table (rows = items, columns = capacities 0..W)
- Cell-by-cell filling animation
- For each cell: highlight the two choices (take vs skip) and which cells they reference
- Color code: cells contributing to optimal solution
- After completion: trace back to show which items were selected
- Play/Pause/Step/Reset controls

#### Problem 3: Longest Common Subsequence (LCS)
*Find the longest subsequence common to two strings.*

```java
int lcs(String s1, String s2) {
    int m = s1.length(), n = s2.length();
    int[][] dp = new int[m + 1][n + 1];

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1] + 1; // Characters match
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]); // Skip one
            }
        }
    }
    return dp[m][n];
}
```

**Interactive Visualization:**
- Input: two strings
- Show 2D DP table (rows = chars of s1, columns = chars of s2)
- Cell-by-cell filling animation
- Highlight character comparisons: match (green diagonal arrow) vs mismatch (arrows from top and left)
- After completion: trace back through table to highlight the actual LCS
- Show the LCS string building as traceback progresses
- Play/Pause/Step/Reset controls

### Page 3: DP Patterns (`/modules/dynamic-programming/patterns`)

**Purpose:** Teach students to recognize and categorize DP problems.

**Content:**

#### 1D DP Pattern

**Climbing Stairs:**
*How many distinct ways to climb n stairs, taking 1 or 2 steps at a time?*
```java
int climbStairs(int n) {
    int[] dp = new int[n + 1];
    dp[0] = 1; dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}
```
- Recognize: current state depends on previous 1–2 states
- Pattern: `dp[i] = f(dp[i-1], dp[i-2], ...)`
- Similar to Fibonacci structure

**House Robber:**
*Maximize loot from houses in a row; can't rob two adjacent houses.*
```java
int rob(int[] nums) {
    int n = nums.length;
    int[] dp = new int[n];
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);
    for (int i = 2; i < n; i++) {
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    }
    return dp[n - 1];
}
```
- Recognize: take/skip decision at each step
- Pattern: `dp[i] = max(dp[i-1], dp[i-2] + value[i])`

#### 2D DP Pattern

**Grid Paths:**
*Count unique paths from top-left to bottom-right in an m×n grid (only move right or down).*
```java
int uniquePaths(int m, int n) {
    int[][] dp = new int[m][n];
    for (int i = 0; i < m; i++) dp[i][0] = 1; // Left column
    for (int j = 0; j < n; j++) dp[0][j] = 1; // Top row
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }
    return dp[m - 1][n - 1];
}
```
- Recognize: 2D state space, build from edges inward
- Pattern: `dp[i][j] = f(dp[i-1][j], dp[i][j-1])`

**How to Identify a DP Problem:**
1. Can it be broken into overlapping subproblems?
2. Does it ask for optimal (min/max) or count of ways?
3. Does a greedy approach fail? (e.g., coin change with denominations [1, 3, 4] and amount 6)
4. Can you define a recurrence relation?

**Decision Framework:**
```
Is it an optimization or counting problem?
  ├── Yes → Can you define subproblems?
  │     ├── Yes → Do subproblems overlap?
  │     │     ├── Yes → USE DP
  │     │     └── No  → Use divide & conquer
  │     └── No  → Try greedy or brute force
  └── No  → Probably not DP
```

**Interactive Visualization:**
- **Grid paths visualizer:**
  - Input: grid dimensions (m × n)
  - Show grid filling cell by cell
  - Highlight arrows showing where each value comes from (top + left)
  - Show all paths animating through the grid
- **Climbing stairs visualizer:**
  - Input: number of stairs
  - Show DP array filling
  - Animate a figure climbing stairs showing different path choices
- Play/Pause/Step/Reset controls for both

### Page 4: Practice & Quiz (`/modules/dynamic-programming/practice`)

**Purpose:** Test understanding with exercises and quiz.

**Exercises (5–6):**
1. Given `fib(6)`, fill in the memoization table step by step
2. Coin change: coins = [1, 3, 4], amount = 6. Fill the DP table and find the minimum coins
3. Knapsack: items = [(w=2, v=3), (w=3, v=4), (w=4, v=5)], capacity = 5. Fill the 2D table
4. LCS of "ABCBDAB" and "BDCAB" — fill the table and find the LCS
5. Climbing stairs with n=6: how many ways? Show the DP array
6. Is this problem solvable with DP? "Find the shortest path in a weighted graph" (Yes — Dijkstra's/Bellman-Ford are DP)

**Quiz Questions (8–10):**
1. What two properties must a problem have for DP to apply? (overlapping subproblems + optimal substructure)
2. What is the difference between memoization and tabulation? (top-down recursive vs bottom-up iterative)
3. Time complexity of naive recursive Fibonacci? (O(2^n))
4. Time complexity of memoized Fibonacci? (O(n))
5. In the coin change problem, what does `dp[i]` represent? (minimum coins to make amount i)
6. What is the time complexity of the 0/1 knapsack algorithm? (O(n × W))
7. In the LCS table, what happens when characters match? (take diagonal + 1)
8. How do you recover the actual solution from a DP table? (traceback from dp[n][m])
9. Which DP approach avoids stack overflow risk? (tabulation / bottom-up)
10. Climbing stairs is structurally identical to which classic problem? (Fibonacci)

---

### Dynamic Programming — Components to Build

1. **FibonacciComparisonVisualizer.tsx** — three-panel view (naive/memo/tabulation) with call trees and cache
2. **DPTableVisualizer.tsx** — reusable 1D and 2D DP table with cell-by-cell fill animation, arrow overlays showing dependencies, and traceback highlighting
3. **CoinChangeVisualizer.tsx** — 1D table fill with coin selection traceback
4. **KnapsackVisualizer.tsx** — 2D table fill with take/skip decision highlighting
5. **LCSVisualizer.tsx** — 2D table fill with character matching and LCS traceback
6. **GridPathsVisualizer.tsx** — grid with path counting and route animation
7. **ClimbingStairsVisualizer.tsx** — 1D array + staircase path animation

### Dynamic Programming — File Structure

```
src/
├── app/modules/dynamic-programming/
│   ├── fundamentals/page.tsx
│   ├── classic/page.tsx
│   ├── patterns/page.tsx
│   └── practice/page.tsx
├── components/visualizer/dynamic-programming/
│   ├── FibonacciComparisonVisualizer.tsx
│   ├── DPTableVisualizer.tsx
│   ├── CoinChangeVisualizer.tsx
│   ├── KnapsackVisualizer.tsx
│   ├── LCSVisualizer.tsx
│   ├── GridPathsVisualizer.tsx
│   ├── ClimbingStairsVisualizer.tsx
│   └── index.ts
├── lib/algorithms/dynamic-programming/
│   ├── types.ts
│   ├── fibonacci.ts
│   ├── coinChange.ts
│   ├── knapsack.ts
│   ├── lcs.ts
│   ├── gridPaths.ts
│   └── index.ts
└── content/quizzes/
    └── dynamic-programming-quiz.ts
```

### Dynamic Programming — Cross-Module Connections

| Connects To | How |
|------------|-----|
| Recursion (Fibonacci) | DP fundamentals page starts with naive recursive Fibonacci from Recursion module, then optimizes it |
| Recursion (concepts) | Memoization is recursive + caching; builds directly on recursive thinking |
| Algorithm Complexity | Exponential → polynomial time improvement is a key complexity topic |
| Graphs (Dijkstra's) | Dijkstra's is a form of DP; mentioned in practice exercises |
| Searching (Binary Search) | Binary search can be viewed as divide & conquer (not DP), useful contrast |

---

## Updated Cross-Module Connections

Add to the existing cross-module table:

| New Module | Connects To | How |
|------------|------------|-----|
| Dynamic Programming | Recursion (Fibonacci) | Starts from naive recursive Fibonacci, adds memoization |
| Dynamic Programming | Algorithm Complexity | Shows exponential → polynomial optimization |
| Dynamic Programming | Graphs (Dijkstra's) | Dijkstra's as DP; mentioned in exercises |

---

## Updated Implementation Plan

### Phase 1: Searching Algorithms
### Phase 2: Trees
### Phase 3: Heaps & Priority Queues
### Phase 4: Graphs

### Phase 5: Dynamic Programming
- Builds on Recursion module (Fibonacci connection)
- 4 pages, 7 visualizer components
- Most complex visualizations (2D table fills with arrows and traceback)
- Should be implemented last since it references concepts from multiple other modules

---

## Updated Acceptance Criteria

### Dynamic Programming
- [ ] Three-panel Fibonacci comparison (naive/memo/tabulation) with call trees
- [ ] Coin change 1D table fill with traceback
- [ ] Knapsack 2D table fill with take/skip highlighting
- [ ] LCS 2D table fill with character matching and traceback
- [ ] Grid paths visualizer with path animation
- [ ] Climbing stairs visualizer
- [ ] DP identification decision framework
- [ ] 8–10 quiz questions
- [ ] Link back to Recursion module's Fibonacci page

---

## Updated Success Criteria
- Students can explain and trace through all 5 new algorithm/data structure categories
- Interactive visualizations help build intuition (not just show answers)
- Quiz pass rate > 70% on first attempt across all new modules
- Students recognize connections between modules (e.g., DP builds on recursion, Dijkstra's uses priority queue)
- All 12 modules (7 existing + 5 new) form a cohesive learning path

---

## Open Questions
- Sidebar ordering: to be decided during implementation (currently set to "decide later")
- Whether to add a Trees → BST subtopic in the future (excluded from this scope)
- Whether Heap Sort should also update the existing Sorting module's comparison page
- Whether to add space-optimized DP variants (rolling array) as an advanced subtopic in the future
