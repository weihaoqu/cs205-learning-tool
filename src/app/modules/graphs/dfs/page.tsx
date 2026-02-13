'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { GraphAlgorithmVisualizer } from '@/components/visualizer/graphs';

export default function DFSPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/modules/graphs/bfs"><Button variant="ghost" className="gap-2"><ArrowLeft className="w-4 h-4" /> BFS</Button></Link>
        <Link href="/modules/graphs/dijkstra"><Button variant="ghost" className="gap-2">Dijkstra&apos;s <ArrowRight className="w-4 h-4" /></Button></Link>
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-4">Depth-First Search (DFS)</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Explore as deep as possible before backtracking. DFS uses a stack (or recursion).
        </p>
      </div>

      <Card>
        <CardHeader><CardTitle>How DFS Works</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <p>DFS uses a <Link href="/modules/stack-queue/stack" className="text-primary hover:underline">stack (LIFO)</Link> or <Link href="/modules/recursion" className="text-primary hover:underline">recursion</Link> to go as deep as possible before backtracking.</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200">Time: O(V + E)</h4>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200">Space: O(V)</h4>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-base">Recursive DFS</CardTitle></CardHeader>
          <CardContent>
            <pre className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">{`void dfs(List<List<Integer>> graph,
         int vertex, boolean[] visited) {
    visited[vertex] = true;
    System.out.print(vertex + " ");

    for (int neighbor : graph.get(vertex)) {
        if (!visited[neighbor]) {
            dfs(graph, neighbor, visited);
        }
    }
}`}</pre>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Iterative DFS</CardTitle></CardHeader>
          <CardContent>
            <pre className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">{`void dfsIterative(List<List<Integer>> graph,
                  int start) {
    boolean[] visited = new boolean[graph.size()];
    Stack<Integer> stack = new Stack<>();
    stack.push(start);

    while (!stack.isEmpty()) {
        int vertex = stack.pop();
        if (!visited[vertex]) {
            visited[vertex] = true;
            System.out.print(vertex + " ");
            for (int n : graph.get(vertex))
                if (!visited[n]) stack.push(n);
        }
    }
}`}</pre>
          </CardContent>
        </Card>
      </div>

      {/* BFS vs DFS */}
      <Card>
        <CardHeader><CardTitle>BFS vs DFS</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b">
                <th className="text-left p-3">Aspect</th><th className="text-left p-3">BFS</th><th className="text-left p-3">DFS</th>
              </tr></thead>
              <tbody>
                <tr className="border-b"><td className="p-3">Data Structure</td><td className="p-3">Queue</td><td className="p-3">Stack / Recursion</td></tr>
                <tr className="border-b"><td className="p-3">Explores</td><td className="p-3">Level by level</td><td className="p-3">As deep as possible</td></tr>
                <tr className="border-b"><td className="p-3">Shortest Path</td><td className="p-3">Yes (unweighted)</td><td className="p-3">No</td></tr>
                <tr><td className="p-3">Best For</td><td className="p-3">Shortest path, nearby nodes</td><td className="p-3">Cycle detection, topological order</td></tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Applications</CardTitle></CardHeader>
        <CardContent>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Cycle detection</li>
            <li>Path finding (any path, not shortest)</li>
            <li>Maze solving</li>
            <li>Connected components</li>
            <li>Topological sorting</li>
          </ul>
        </CardContent>
      </Card>

      <GraphAlgorithmVisualizer algorithm="dfs" />

      <div className="flex justify-between">
        <Link href="/modules/graphs/bfs"><Button variant="outline" className="gap-2"><ArrowLeft className="w-4 h-4" /> BFS</Button></Link>
        <Link href="/modules/graphs/dijkstra"><Button className="gap-2">Dijkstra&apos;s <ArrowRight className="w-4 h-4" /></Button></Link>
      </div>
    </div>
  );
}
