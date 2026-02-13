'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { GraphCanvas } from '@/components/visualizer/graphs';
import { PRESET_GRAPHS } from '@/lib/algorithms/graphs';

export default function GraphsOverviewPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div />
        <Link href="/modules/graphs/bfs">
          <Button variant="ghost" className="gap-2">BFS <ArrowRight className="w-4 h-4" /></Button>
        </Link>
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-4">Graphs</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Graphs model relationships between objects. Vertices (nodes) connected by edges
          form one of the most versatile data structures in computer science.
        </p>
      </div>

      {/* Terminology */}
      <Card>
        <CardHeader><CardTitle>Graph Terminology</CardTitle></CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              ['Vertex (Node)', 'A point in the graph'],
              ['Edge', 'A connection between two vertices'],
              ['Directed', 'Edges have a direction (one-way)'],
              ['Undirected', 'Edges go both ways'],
              ['Weighted', 'Edges have associated costs'],
              ['Path', 'Sequence of vertices connected by edges'],
              ['Cycle', 'A path that starts and ends at same vertex'],
              ['Degree', 'Number of edges connected to a vertex'],
              ['Adjacent', 'Two vertices connected by an edge'],
              ['Connected', 'Every vertex reachable from every other'],
            ].map(([term, def]) => (
              <div key={term} className="p-2 bg-muted/50 rounded-lg">
                <span className="font-medium">{term}:</span>{' '}
                <span className="text-sm text-muted-foreground">{def}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sample Graph */}
      <Card>
        <CardHeader><CardTitle>Example Graph</CardTitle></CardHeader>
        <CardContent>
          <div className="border rounded-lg bg-white dark:bg-gray-950 p-2">
            <GraphCanvas graph={PRESET_GRAPHS.simple} />
          </div>
        </CardContent>
      </Card>

      {/* Representations */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-base">Adjacency Matrix</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <pre className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">{`// Undirected graph with 4 vertices
int[][] adjMatrix = {
    {0, 1, 1, 0},  // vertex 0 → 1, 2
    {1, 0, 0, 1},  // vertex 1 → 0, 3
    {1, 0, 0, 1},  // vertex 2 → 0, 3
    {0, 1, 1, 0}   // vertex 3 → 1, 2
};`}</pre>
            <div className="text-sm text-muted-foreground">
              <strong>Space:</strong> O(V²) | <strong>Edge lookup:</strong> O(1) | <strong>Best for:</strong> Dense graphs
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Adjacency List</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <pre className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">{`List<List<Integer>> adjList = new ArrayList<>();
adjList.add(Arrays.asList(1, 2));  // vertex 0
adjList.add(Arrays.asList(0, 3));  // vertex 1
adjList.add(Arrays.asList(0, 3));  // vertex 2
adjList.add(Arrays.asList(1, 2));  // vertex 3`}</pre>
            <div className="text-sm text-muted-foreground">
              <strong>Space:</strong> O(V + E) | <strong>Edge lookup:</strong> O(degree) | <strong>Best for:</strong> Sparse graphs
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comparison table */}
      <Card>
        <CardHeader><CardTitle>Representation Comparison</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b">
                <th className="text-left p-3">Aspect</th><th className="text-left p-3">Adjacency Matrix</th><th className="text-left p-3">Adjacency List</th>
              </tr></thead>
              <tbody>
                <tr className="border-b"><td className="p-3">Space</td><td className="p-3">O(V²)</td><td className="p-3">O(V + E)</td></tr>
                <tr className="border-b"><td className="p-3">Check edge exists</td><td className="p-3">O(1)</td><td className="p-3">O(degree)</td></tr>
                <tr className="border-b"><td className="p-3">Find all neighbors</td><td className="p-3">O(V)</td><td className="p-3">O(degree)</td></tr>
                <tr><td className="p-3">Best for</td><td className="p-3">Dense graphs</td><td className="p-3">Sparse graphs</td></tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Link href="/modules/graphs/bfs">
          <Button className="gap-2">BFS <ArrowRight className="w-4 h-4" /></Button>
        </Link>
      </div>
    </div>
  );
}
