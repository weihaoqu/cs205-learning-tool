import type { Graph } from './types';

/** Get adjacency list from graph */
export function getAdjacencyList(graph: Graph): Record<string, { node: string; weight: number }[]> {
  const adj: Record<string, { node: string; weight: number }[]> = {};
  for (const node of graph.nodes) {
    adj[node.id] = [];
  }
  for (const edge of graph.edges) {
    adj[edge.from].push({ node: edge.to, weight: edge.weight ?? 1 });
    if (!graph.directed) {
      adj[edge.to].push({ node: edge.from, weight: edge.weight ?? 1 });
    }
  }
  return adj;
}

/** Get adjacency matrix from graph */
export function getAdjacencyMatrix(graph: Graph): { matrix: (number | null)[][]; labels: string[] } {
  const labels = graph.nodes.map(n => n.id).sort();
  const indexMap = new Map(labels.map((l, i) => [l, i]));
  const n = labels.length;
  const matrix: (number | null)[][] = Array.from({ length: n }, () => Array(n).fill(null));

  for (const edge of graph.edges) {
    const from = indexMap.get(edge.from)!;
    const to = indexMap.get(edge.to)!;
    matrix[from][to] = edge.weight ?? 1;
    if (!graph.directed) {
      matrix[to][from] = edge.weight ?? 1;
    }
  }

  return { matrix, labels };
}
