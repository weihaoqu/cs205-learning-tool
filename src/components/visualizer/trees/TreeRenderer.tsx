'use client';

import type { TreeNode } from '@/lib/algorithms/trees';
import { getHeight } from '@/lib/algorithms/trees';

interface TreeRendererProps {
  root: TreeNode | null;
  highlightValues?: Set<number>;
  visitedValues?: Set<number>;
  width?: number;
  height?: number;
  nodeRadius?: number;
  showLabels?: boolean;
  arrayHighlightIndex?: number;
}

interface NodePosition {
  value: number;
  x: number;
  y: number;
  parentX?: number;
  parentY?: number;
}

function getPositions(
  node: TreeNode | null,
  x: number,
  y: number,
  width: number,
  verticalGap: number,
  positions: NodePosition[],
  parentX?: number,
  parentY?: number
) {
  if (!node) return;
  positions.push({ value: node.value, x, y, parentX, parentY });
  const childWidth = width / 2;
  getPositions(node.left, x - childWidth, y + verticalGap, childWidth, verticalGap, positions, x, y);
  getPositions(node.right, x + childWidth, y + verticalGap, childWidth, verticalGap, positions, x, y);
}

export function TreeRenderer({
  root,
  highlightValues = new Set(),
  visitedValues = new Set(),
  width = 600,
  height: propHeight,
  nodeRadius = 22,
}: TreeRendererProps) {
  if (!root) {
    return (
      <div className="flex items-center justify-center h-32 text-muted-foreground">
        No tree to display
      </div>
    );
  }

  const treeHeight = getHeight(root);
  const verticalGap = 65;
  const svgHeight = propHeight || Math.max(200, (treeHeight + 1) * verticalGap + 40);
  const startWidth = Math.min(width / 2 - 40, (Math.pow(2, treeHeight) * 30));

  const positions: NodePosition[] = [];
  getPositions(root, width / 2, 35, startWidth, verticalGap, positions);

  return (
    <div className="overflow-x-auto">
      <svg width={width} height={svgHeight} className="min-w-full">
        {/* Draw edges first */}
        {positions.map((pos) =>
          pos.parentX !== undefined && pos.parentY !== undefined ? (
            <line
              key={`edge-${pos.value}-${pos.x}-${pos.y}`}
              x1={pos.parentX}
              y1={pos.parentY + nodeRadius}
              x2={pos.x}
              y2={pos.y - nodeRadius}
              stroke="#94a3b8"
              strokeWidth={2}
            />
          ) : null
        )}
        {/* Draw nodes */}
        {positions.map((pos) => {
          const isHighlighted = highlightValues.has(pos.value);
          const isVisited = visitedValues.has(pos.value);
          let fill = '#dbeafe';
          let stroke = '#3b82f6';
          if (isHighlighted) {
            fill = '#fef3c7';
            stroke = '#f59e0b';
          } else if (isVisited) {
            fill = '#dcfce7';
            stroke = '#22c55e';
          }

          return (
            <g key={`node-${pos.value}-${pos.x}-${pos.y}`}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={nodeRadius}
                fill={fill}
                stroke={stroke}
                strokeWidth={2.5}
              />
              <text
                x={pos.x}
                y={pos.y + 5}
                textAnchor="middle"
                className="text-sm font-bold fill-gray-700 dark:fill-gray-200"
                style={{ fontSize: '14px' }}
              >
                {pos.value}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
