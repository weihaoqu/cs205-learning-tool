'use client';

import type { Graph, NodeState } from '@/lib/algorithms/graphs';

interface GraphCanvasProps {
  graph: Graph;
  nodeStates?: Record<string, NodeState>;
  edgeHighlight?: [string, string][];
  currentNode?: string | null;
  distances?: Record<string, number>;
  width?: number;
  height?: number;
}

const STATE_COLORS: Record<NodeState, { fill: string; stroke: string }> = {
  unvisited: { fill: '#e2e8f0', stroke: '#94a3b8' },
  frontier: { fill: '#fef3c7', stroke: '#f59e0b' },
  visiting: { fill: '#bfdbfe', stroke: '#3b82f6' },
  visited: { fill: '#dcfce7', stroke: '#22c55e' },
  backtrack: { fill: '#fed7aa', stroke: '#f97316' },
};

export function GraphCanvas({
  graph,
  nodeStates = {},
  edgeHighlight = [],
  currentNode = null,
  distances,
  width = 450,
  height = 350,
}: GraphCanvasProps) {
  const nodeRadius = 22;

  const isEdgeHighlighted = (from: string, to: string) => {
    return edgeHighlight.some(
      ([a, b]) => (a === from && b === to) || (a === to && b === from)
    );
  };

  const nodeMap = new Map(graph.nodes.map(n => [n.id, n]));

  return (
    <div className="overflow-x-auto">
      <svg width={width} height={height} className="min-w-full">
        {/* Edges */}
        {graph.edges.map((edge, idx) => {
          const fromNode = nodeMap.get(edge.from);
          const toNode = nodeMap.get(edge.to);
          if (!fromNode || !toNode) return null;

          const highlighted = isEdgeHighlighted(edge.from, edge.to);
          const midX = (fromNode.x + toNode.x) / 2;
          const midY = (fromNode.y + toNode.y) / 2;

          return (
            <g key={`edge-${idx}`}>
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={highlighted ? '#3b82f6' : '#94a3b8'}
                strokeWidth={highlighted ? 3 : 1.5}
              />
              {graph.weighted && edge.weight !== undefined && (
                <g>
                  <rect
                    x={midX - 12}
                    y={midY - 10}
                    width={24}
                    height={18}
                    rx={4}
                    fill="white"
                    stroke="#d1d5db"
                  />
                  <text
                    x={midX}
                    y={midY + 3}
                    textAnchor="middle"
                    className="text-xs font-bold fill-gray-700"
                    style={{ fontSize: '11px' }}
                  >
                    {edge.weight}
                  </text>
                </g>
              )}
              {graph.directed && (
                <ArrowHead
                  fromX={fromNode.x}
                  fromY={fromNode.y}
                  toX={toNode.x}
                  toY={toNode.y}
                  nodeRadius={nodeRadius}
                  highlighted={highlighted}
                />
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {graph.nodes.map((node) => {
          const state = nodeStates[node.id] || 'unvisited';
          const colors = STATE_COLORS[state];
          const isCurrent = node.id === currentNode;
          const dist = distances?.[node.id];

          return (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r={nodeRadius}
                fill={colors.fill}
                stroke={isCurrent ? '#2563eb' : colors.stroke}
                strokeWidth={isCurrent ? 3.5 : 2}
              />
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                className="text-sm font-bold fill-gray-700"
                style={{ fontSize: '14px' }}
              >
                {node.id}
              </text>
              {dist !== undefined && (
                <text
                  x={node.x}
                  y={node.y - nodeRadius - 6}
                  textAnchor="middle"
                  className="text-xs font-mono fill-blue-600"
                  style={{ fontSize: '11px' }}
                >
                  {dist === Infinity ? '∞' : dist}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function ArrowHead({
  fromX,
  fromY,
  toX,
  toY,
  nodeRadius,
  highlighted,
}: {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  nodeRadius: number;
  highlighted: boolean;
}) {
  const angle = Math.atan2(toY - fromY, toX - fromX);
  const tipX = toX - nodeRadius * Math.cos(angle);
  const tipY = toY - nodeRadius * Math.sin(angle);
  const arrowSize = 8;

  const x1 = tipX - arrowSize * Math.cos(angle - Math.PI / 6);
  const y1 = tipY - arrowSize * Math.sin(angle - Math.PI / 6);
  const x2 = tipX - arrowSize * Math.cos(angle + Math.PI / 6);
  const y2 = tipY - arrowSize * Math.sin(angle + Math.PI / 6);

  return (
    <polygon
      points={`${tipX},${tipY} ${x1},${y1} ${x2},${y2}`}
      fill={highlighted ? '#3b82f6' : '#94a3b8'}
    />
  );
}
