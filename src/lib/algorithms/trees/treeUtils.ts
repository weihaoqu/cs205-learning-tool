import type { TreeNode } from './types';

export function createNode(value: number, left: TreeNode | null = null, right: TreeNode | null = null): TreeNode {
  return { value, left, right };
}

/** Build a sample binary tree:
 *         4
 *        / \
 *       2   6
 *      / \ / \
 *     1  3 5  7
 */
export function buildSampleTree(): TreeNode {
  return createNode(4,
    createNode(2, createNode(1), createNode(3)),
    createNode(6, createNode(5), createNode(7))
  );
}

/** Build from array (level-order), nulls represent missing nodes */
export function buildFromArray(values: (number | null)[]): TreeNode | null {
  if (values.length === 0 || values[0] === null) return null;

  const root: TreeNode = { value: values[0], left: null, right: null };
  const queue: TreeNode[] = [root];
  let i = 1;

  while (i < values.length && queue.length > 0) {
    const node = queue.shift()!;
    if (i < values.length && values[i] !== null) {
      node.left = { value: values[i]!, left: null, right: null };
      queue.push(node.left);
    }
    i++;
    if (i < values.length && values[i] !== null) {
      node.right = { value: values[i]!, left: null, right: null };
      queue.push(node.right);
    }
    i++;
  }

  return root;
}

/** Get tree height */
export function getHeight(node: TreeNode | null): number {
  if (!node) return -1;
  return 1 + Math.max(getHeight(node.left), getHeight(node.right));
}

/** Get depth of a specific value */
export function getDepth(root: TreeNode | null, target: number, depth: number = 0): number {
  if (!root) return -1;
  if (root.value === target) return depth;
  const left = getDepth(root.left, target, depth + 1);
  if (left !== -1) return left;
  return getDepth(root.right, target, depth + 1);
}

/** Check if a node is a leaf */
export function isLeaf(node: TreeNode): boolean {
  return !node.left && !node.right;
}

/** Count nodes */
export function countNodes(node: TreeNode | null): number {
  if (!node) return 0;
  return 1 + countNodes(node.left) + countNodes(node.right);
}

/** Convert tree to array for heap-style indexing */
export function treeToArray(root: TreeNode | null): (number | null)[] {
  if (!root) return [];
  const result: (number | null)[] = [];
  const queue: (TreeNode | null)[] = [root];

  while (queue.length > 0) {
    const node = queue.shift() ?? null;
    if (node) {
      result.push(node.value);
      queue.push(node.left);
      queue.push(node.right);
    } else {
      result.push(null);
    }
  }

  // Remove trailing nulls
  while (result.length > 0 && result[result.length - 1] === null) {
    result.pop();
  }
  return result;
}
