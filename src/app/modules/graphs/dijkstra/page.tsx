'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { GraphAlgorithmVisualizer } from '@/components/visualizer/graphs';

export default function DijkstraPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/modules/graphs/dfs"><Button variant="ghost" className="gap-2"><ArrowLeft className="w-4 h-4" /> DFS</Button></Link>
        <Link href="/modules/graphs/practice"><Button variant="ghost" className="gap-2">Practice <ArrowRight className="w-4 h-4" /></Button></Link>
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-4">Dijkstra&apos;s Algorithm</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Find the shortest path from a source to all other vertices in a weighted graph
          with non-negative edge weights.
        </p>
      </div>

      <Card>
        <CardHeader><CardTitle>How It Works</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <strong>Prerequisite:</strong> No negative edge weights!
          </div>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Set distance to source = 0, all others = &infin;</li>
            <li>Add source to priority queue</li>
            <li>Extract vertex with minimum distance</li>
            <li>For each unvisited neighbor: if new path is shorter, update distance</li>
            <li>Repeat until priority queue is empty</li>
          </ol>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200">Time: O((V + E) log V)</h4>
              <p className="text-sm text-blue-600 dark:text-blue-300">With a min-heap priority queue</p>
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              <h4 className="font-medium text-purple-800 dark:text-purple-200">Uses: Priority Queue</h4>
              <p className="text-sm text-purple-600 dark:text-purple-300">
                <Link href="/modules/heaps/priority-queue" className="underline">Min-heap PQ</Link> for efficient extraction
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Java Implementation</CardTitle></CardHeader>
        <CardContent>
          <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto text-sm font-mono">{`int[] dijkstra(int[][] graph, int source) {
    int V = graph.length;
    int[] dist = new int[V];
    boolean[] visited = new boolean[V];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[source] = 0;

    // Min-heap: (distance, vertex)
    PriorityQueue<int[]> pq =
        new PriorityQueue<>((a, b) -> a[0] - b[0]);
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
}`}</pre>
        </CardContent>
      </Card>

      <GraphAlgorithmVisualizer algorithm="dijkstra" />

      <div className="flex justify-between">
        <Link href="/modules/graphs/dfs"><Button variant="outline" className="gap-2"><ArrowLeft className="w-4 h-4" /> DFS</Button></Link>
        <Link href="/modules/graphs/practice"><Button className="gap-2">Practice <ArrowRight className="w-4 h-4" /></Button></Link>
      </div>
    </div>
  );
}
