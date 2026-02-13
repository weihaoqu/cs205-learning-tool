export interface GraphNode {
  id: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  from: string;
  to: string;
  weight?: number;
}

export interface Graph {
  nodes: GraphNode[];
  edges: GraphEdge[];
  directed: boolean;
  weighted: boolean;
}

export type NodeState = 'unvisited' | 'frontier' | 'visiting' | 'visited' | 'backtrack';

export interface GraphStep {
  type: string;
  nodeStates: Record<string, NodeState>;
  currentNode: string | null;
  edgeHighlight: [string, string][];
  dataStructure: string[]; // queue for BFS, stack for DFS, PQ for Dijkstra
  visited: string[];
  message: string;
  distances?: Record<string, number>; // for Dijkstra
  previous?: Record<string, string | null>; // for Dijkstra path reconstruction
}

// Preset graphs
export const PRESET_GRAPHS: Record<string, Graph> = {
  simple: {
    nodes: [
      { id: 'A', x: 200, y: 50 },
      { id: 'B', x: 80, y: 150 },
      { id: 'C', x: 320, y: 150 },
      { id: 'D', x: 50, y: 280 },
      { id: 'E', x: 200, y: 280 },
      { id: 'F', x: 350, y: 280 },
    ],
    edges: [
      { from: 'A', to: 'B' }, { from: 'A', to: 'C' },
      { from: 'B', to: 'D' }, { from: 'B', to: 'E' },
      { from: 'C', to: 'E' }, { from: 'C', to: 'F' },
      { from: 'D', to: 'E' }, { from: 'E', to: 'F' },
    ],
    directed: false,
    weighted: false,
  },
  weighted: {
    nodes: [
      { id: 'A', x: 80, y: 80 },
      { id: 'B', x: 250, y: 50 },
      { id: 'C', x: 80, y: 250 },
      { id: 'D', x: 250, y: 250 },
      { id: 'E', x: 380, y: 150 },
    ],
    edges: [
      { from: 'A', to: 'B', weight: 4 },
      { from: 'A', to: 'C', weight: 2 },
      { from: 'B', to: 'D', weight: 3 },
      { from: 'B', to: 'E', weight: 1 },
      { from: 'C', to: 'D', weight: 4 },
      { from: 'C', to: 'A', weight: 2 },
      { from: 'D', to: 'E', weight: 5 },
    ],
    directed: false,
    weighted: true,
  },
};
