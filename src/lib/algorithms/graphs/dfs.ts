import type { Graph, GraphStep, NodeState } from './types';
import { getAdjacencyList } from './graphUtils';

export function* dfsGenerator(graph: Graph, startId: string): Generator<GraphStep> {
  const adj = getAdjacencyList(graph);
  const nodeStates: Record<string, NodeState> = {};
  for (const node of graph.nodes) nodeStates[node.id] = 'unvisited';

  const visited: string[] = [];
  const stack: string[] = [startId];

  yield {
    type: 'init',
    nodeStates: { ...nodeStates },
    currentNode: null,
    edgeHighlight: [],
    dataStructure: [...stack],
    visited: [...visited],
    message: `Start DFS from ${startId}. Push ${startId} to stack.`,
  };

  while (stack.length > 0) {
    const current = stack.pop()!;

    if (nodeStates[current] === 'visited') continue;

    nodeStates[current] = 'visiting';
    visited.push(current);

    yield {
      type: 'visit',
      nodeStates: { ...nodeStates },
      currentNode: current,
      edgeHighlight: [],
      dataStructure: [...stack],
      visited: [...visited],
      message: `Pop ${current}. Visit it. Stack: [${[...stack].reverse().join(', ')}]`,
    };

    const neighbors = (adj[current] || []).slice().reverse(); // reverse so we visit in alphabetical order
    for (const { node: neighbor } of neighbors) {
      if (nodeStates[neighbor] !== 'visited') {
        stack.push(neighbor);
        if (nodeStates[neighbor] === 'unvisited') {
          nodeStates[neighbor] = 'frontier';
        }

        yield {
          type: 'push',
          nodeStates: { ...nodeStates },
          currentNode: current,
          edgeHighlight: [[current, neighbor]],
          dataStructure: [...stack],
          visited: [...visited],
          message: `Push neighbor ${neighbor}. Stack: [${[...stack].reverse().join(', ')}]`,
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
    message: `DFS complete! Visit order: ${visited.join(' → ')}`,
  };
}

export function generateDFSSteps(graph: Graph, startId: string): GraphStep[] {
  return [...dfsGenerator(graph, startId)];
}
