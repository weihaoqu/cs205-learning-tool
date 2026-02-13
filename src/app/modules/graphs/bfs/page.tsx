'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { GraphAlgorithmVisualizer } from '@/components/visualizer/graphs';

export default function BFSPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/modules/graphs"><Button variant="ghost" className="gap-2"><ArrowLeft className="w-4 h-4" /> Overview</Button></Link>
        <Link href="/modules/graphs/dfs"><Button variant="ghost" className="gap-2">DFS <ArrowRight className="w-4 h-4" /></Button></Link>
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-4">Breadth-First Search (BFS)</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Explore all neighbors before going deeper. BFS visits nodes level by level, using a queue.
        </p>
      </div>

      <Card>
        <CardHeader><CardTitle>How BFS Works</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <p>BFS uses a <Link href="/modules/stack-queue/queue" className="text-primary hover:underline">queue (FIFO)</Link> to ensure we process nodes in the order they were discovered.</p>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Mark start as visited, enqueue it</li>
            <li>Dequeue a vertex, process it</li>
            <li>Enqueue all unvisited neighbors</li>
            <li>Repeat until queue is empty</li>
          </ol>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200">Time: O(V + E)</h4>
              <p className="text-sm text-blue-600 dark:text-blue-300">Every vertex and edge visited once</p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200">Space: O(V)</h4>
              <p className="text-sm text-green-600 dark:text-green-300">Queue can hold all vertices</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Java Implementation</CardTitle></CardHeader>
        <CardContent>
          <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto text-sm font-mono">{`void bfs(List<List<Integer>> graph, int start) {
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
}`}</pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Applications</CardTitle></CardHeader>
        <CardContent>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li><strong>Shortest path</strong> in unweighted graphs</li>
            <li><strong>Level-order traversal</strong> of <Link href="/modules/trees/traversals" className="text-primary hover:underline">trees</Link></li>
            <li>Finding connected components</li>
            <li>Social network &quot;degrees of separation&quot;</li>
          </ul>
        </CardContent>
      </Card>

      <GraphAlgorithmVisualizer algorithm="bfs" />

      <div className="flex justify-between">
        <Link href="/modules/graphs"><Button variant="outline" className="gap-2"><ArrowLeft className="w-4 h-4" /> Overview</Button></Link>
        <Link href="/modules/graphs/dfs"><Button className="gap-2">DFS <ArrowRight className="w-4 h-4" /></Button></Link>
      </div>
    </div>
  );
}
