import type { Graph, GraphStep, NodeState } from './types';
import { getAdjacencyList } from './graphUtils';

export function* dijkstraGenerator(graph: Graph, startId: string): Generator<GraphStep> {
  const adj = getAdjacencyList(graph);
  const nodeStates: Record<string, NodeState> = {};
  const distances: Record<string, number> = {};
  const previous: Record<string, string | null> = {};

  for (const node of graph.nodes) {
    nodeStates[node.id] = 'unvisited';
    distances[node.id] = Infinity;
    previous[node.id] = null;
  }
  distances[startId] = 0;

  const visited: string[] = [];
  // PQ as array of [distance, nodeId]
  const pq: [number, string][] = [[0, startId]];
  nodeStates[startId] = 'frontier';

  yield {
    type: 'init',
    nodeStates: { ...nodeStates },
    currentNode: null,
    edgeHighlight: [],
    dataStructure: pq.map(([d, n]) => `${n}(${d})`),
    visited: [...visited],
    distances: { ...distances },
    previous: { ...previous },
    message: `Start Dijkstra from ${startId}. Distance to ${startId} = 0, all others = ∞`,
  };

  while (pq.length > 0) {
    // Extract minimum
    pq.sort((a, b) => a[0] - b[0]);
    const [dist, current] = pq.shift()!;

    if (nodeStates[current] === 'visited') continue;

    nodeStates[current] = 'visiting';
    visited.push(current);

    yield {
      type: 'visit',
      nodeStates: { ...nodeStates },
      currentNode: current,
      edgeHighlight: [],
      dataStructure: pq.map(([d, n]) => `${n}(${d})`),
      visited: [...visited],
      distances: { ...distances },
      previous: { ...previous },
      message: `Process ${current} with distance ${dist}.`,
    };

    const neighbors = adj[current] || [];
    for (const { node: neighbor, weight } of neighbors) {
      if (nodeStates[neighbor] === 'visited') continue;

      const newDist = dist + weight;
      const oldDist = distances[neighbor];

      yield {
        type: 'relax',
        nodeStates: { ...nodeStates },
        currentNode: current,
        edgeHighlight: [[current, neighbor]],
        dataStructure: pq.map(([d, n]) => `${n}(${d})`),
        visited: [...visited],
        distances: { ...distances },
        previous: { ...previous },
        message: `Relax edge ${current}→${neighbor}: ${dist} + ${weight} = ${newDist} ${newDist < oldDist ? `< ${oldDist === Infinity ? '∞' : oldDist} → update!` : `≥ ${oldDist} → skip`}`,
      };

      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        previous[neighbor] = current;
        pq.push([newDist, neighbor]);
        if (nodeStates[neighbor] === 'unvisited') {
          nodeStates[neighbor] = 'frontier';
        }

        yield {
          type: 'update',
          nodeStates: { ...nodeStates },
          currentNode: current,
          edgeHighlight: [[current, neighbor]],
          dataStructure: pq.map(([d, n]) => `${n}(${d})`),
          visited: [...visited],
          distances: { ...distances },
          previous: { ...previous },
          message: `Updated distance to ${neighbor}: ${newDist}. PQ: [${pq.map(([d, n]) => `${n}(${d})`).join(', ')}]`,
        };
      }
    }

    nodeStates[current] = 'visited';
  }

  yield {
    type: 'complete',
    nodeStates: { ...nodeStates },
    currentNode: null,
    edgeHighlight: [],
    dataStructure: [],
    visited: [...visited],
    distances: { ...distances },
    previous: { ...previous },
    message: `Dijkstra complete! Shortest distances from ${startId}: ${Object.entries(distances).map(([n, d]) => `${n}=${d}`).join(', ')}`,
  };
}

export function generateDijkstraSteps(graph: Graph, startId: string): GraphStep[] {
  return [...dijkstraGenerator(graph, startId)];
}
