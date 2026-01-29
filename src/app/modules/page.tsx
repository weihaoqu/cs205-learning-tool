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
      </div>
    </div>
  );
}
