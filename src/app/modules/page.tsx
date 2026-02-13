import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ModulesPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Learning Modules</h1>
      <p className="text-muted-foreground mb-8">
        Select a topic from the sidebar or choose a module below to get started.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/modules/arrays/basic-arrays">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                Arrays
              </CardTitle>
              <CardDescription>
                Master 1D and 2D arrays with interactive visualizations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Basic Array Operations</li>
                <li>• Sorting Algorithms</li>
                <li>• 2D Arrays and Matrices</li>
              </ul>
            </CardContent>
          </Card>
        </Link>

        <Link href="/modules/lists">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500" />
                Lists
              </CardTitle>
              <CardDescription>
                Understand ArrayList and LinkedList implementations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• ArrayList (Dynamic Arrays)</li>
                <li>• Singly Linked Lists</li>
                <li>• Doubly Linked Lists</li>
                <li>• Performance Comparison</li>
              </ul>
            </CardContent>
          </Card>
        </Link>

        <Link href="/modules/recursion">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange-500" />
                Recursion
              </CardTitle>
              <CardDescription>
                Understand recursive algorithms with interactive visualizations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Factorial & Array Sum</li>
                <li>• Fibonacci Call Tree</li>
                <li>• Recursion vs Iteration</li>
                <li>• Common Pitfalls</li>
              </ul>
            </CardContent>
          </Card>
        </Link>

        <Link href="/modules/stack-queue">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-cyan-500" />
                Stacks & Queues
              </CardTitle>
              <CardDescription>
                Master LIFO and FIFO data structures with drag-and-drop
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Stack Operations (LIFO)</li>
                <li>• Queue Operations (FIFO)</li>
                <li>• Balanced Parentheses</li>
                <li>• Priority Queue</li>
              </ul>
            </CardContent>
          </Card>
        </Link>

        <Link href="/modules/complexity">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500" />
                Algorithm Complexity
              </CardTitle>
              <CardDescription>
                Master Big O notation and complexity analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Big O Fundamentals</li>
                <li>• Growth Rate Visualization</li>
                <li>• Code Pattern Recognition</li>
                <li>• Common Mistakes to Avoid</li>
              </ul>
            </CardContent>
          </Card>
        </Link>

        <Link href="/modules/sorting">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-500" />
                Sorting Algorithms
              </CardTitle>
              <CardDescription>
                Visualize and compare classic sorting algorithms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Bubble, Selection, Insertion Sort</li>
                <li>• Merge Sort & Quick Sort</li>
                <li>• Heap Sort</li>
                <li>• Algorithm Race & Comparison</li>
              </ul>
            </CardContent>
          </Card>
        </Link>

        <Link href="/modules/maps">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                Maps & HashTables
              </CardTitle>
              <CardDescription>
                Learn hashing, HashMaps, and HashSets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Hashing Basics</li>
                <li>• HashMap Operations</li>
                <li>• HashSet</li>
                <li>• Load Factor & Rehashing</li>
              </ul>
            </CardContent>
          </Card>
        </Link>

        <Link href="/modules/searching/linear">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                Searching Algorithms
              </CardTitle>
              <CardDescription>
                Compare linear and binary search with step-by-step animations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Linear Search</li>
                <li>• Binary Search</li>
                <li>• Performance Comparison & Race</li>
              </ul>
            </CardContent>
          </Card>
        </Link>

        <Link href="/modules/trees">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                Trees
              </CardTitle>
              <CardDescription>
                Explore binary trees and traversal algorithms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Tree Terminology & Types</li>
                <li>• Inorder, Preorder, Postorder, Level-order</li>
                <li>• Interactive Traversal Visualizer</li>
              </ul>
            </CardContent>
          </Card>
        </Link>

        <Link href="/modules/heaps/basics">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-sky-500" />
                Heaps & Priority Queues
              </CardTitle>
              <CardDescription>
                Understand heap structure, heap sort, and priority queues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Heap Basics (Min/Max)</li>
                <li>• Heap Sort Algorithm</li>
                <li>• Priority Queue Applications</li>
                <li>• Dual Tree + Array View</li>
              </ul>
            </CardContent>
          </Card>
        </Link>

        <Link href="/modules/graphs">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-violet-500" />
                Graphs
              </CardTitle>
              <CardDescription>
                Learn graph representations and traversal algorithms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Graph Terminology & Representations</li>
                <li>• BFS (Breadth-First Search)</li>
                <li>• DFS (Depth-First Search)</li>
                <li>• Dijkstra&apos;s Shortest Path</li>
              </ul>
            </CardContent>
          </Card>
        </Link>

        <Link href="/modules/dynamic-programming/fundamentals">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-fuchsia-500" />
                Dynamic Programming
              </CardTitle>
              <CardDescription>
                Master DP concepts, memoization, and classic problems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Memoization vs Tabulation</li>
                <li>• Coin Change, Knapsack, LCS</li>
                <li>• DP Patterns & Problem Recognition</li>
                <li>• Fibonacci 3-Panel Comparison</li>
              </ul>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
