export interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export type TraversalType = 'inorder' | 'preorder' | 'postorder' | 'levelorder';

export interface TraversalStep {
  type: 'visit' | 'push' | 'pop' | 'enqueue' | 'dequeue' | 'complete';
  nodeValue: number | null;
  visited: number[];
  stack: string[];
  message: string;
  highlightNodeValue: number | null;
}
