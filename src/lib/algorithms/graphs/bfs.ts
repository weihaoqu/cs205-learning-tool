import type { Graph, GraphStep, NodeState } from './types';
import { getAdjacencyList } from './graphUtils';

export function* bfsGenerator(graph: Graph, startId: string): Generator<GraphStep> {
  const adj = getAdjacencyList(graph);
  const nodeStates: Record<string, NodeState> = {};
  for (const node of graph.nodes) nodeStates[node.id] = 'unvisited';

  const visited: string[] = [];
  const queue: string[] = [startId];
  nodeStates[startId] = 'frontier';

  yield {
    type: 'init',
    nodeStates: { ...nodeStates },
    currentNode: null,
    edgeHighlight: [],
    dataStructure: [...queue],
    visited: [...visited],
    message: `Start BFS from ${startId}. Enqueue ${startId}.`,
  };

  while (queue.length > 0) {
    const current = queue.shift()!;
    nodeStates[current] = 'visiting';
    visited.push(current);

    yield {
      type: 'visit',
      nodeStates: { ...nodeStates },
      currentNode: current,
      edgeHighlight: [],
      dataStructure: [...queue],
      visited: [...visited],
      message: `Dequeue ${current}. Visit it. Queue: [${queue.join(', ')}]`,
    };

    const neighbors = adj[current] || [];
    for (const { node: neighbor } of neighbors) {
      if (nodeStates[neighbor] === 'unvisited') {
        nodeStates[neighbor] = 'frontier';
        queue.push(neighbor);

        yield {
          type: 'enqueue',
          nodeStates: { ...nodeStates },
          currentNode: current,
          edgeHighlight: [[current, neighbor]],
          dataStructure: [...queue],
          visited: [...visited],
          message: `Enqueue neighbor ${neighbor}. Queue: [${queue.join(', ')}]`,
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
    message: `BFS complete! Visit order: ${visited.join(' → ')}`,
  };
}

export function generateBFSSteps(graph: Graph, startId: string): GraphStep[] {
  return [...bfsGenerator(graph, startId)];
}
