import type { TreeNode, TraversalStep } from './types';

export function* inorderGenerator(node: TreeNode | null, visited: number[] = [], stack: string[] = []): Generator<TraversalStep> {
  if (!node) return;

  stack.push(`inOrder(${node.value})`);
  yield { type: 'push', nodeValue: node.value, visited: [...visited], stack: [...stack], message: `Call inOrder(${node.value}) — go left first`, highlightNodeValue: node.value };

  yield* inorderGenerator(node.left, visited, stack);

  visited.push(node.value);
  yield { type: 'visit', nodeValue: node.value, visited: [...visited], stack: [...stack], message: `Visit ${node.value} (left done, visit root)`, highlightNodeValue: node.value };

  yield* inorderGenerator(node.right, visited, stack);

  stack.pop();
  yield { type: 'pop', nodeValue: node.value, visited: [...visited], stack: [...stack], message: `Return from inOrder(${node.value})`, highlightNodeValue: node.value };
}

export function* preorderGenerator(node: TreeNode | null, visited: number[] = [], stack: string[] = []): Generator<TraversalStep> {
  if (!node) return;

  stack.push(`preOrder(${node.value})`);
  visited.push(node.value);
  yield { type: 'visit', nodeValue: node.value, visited: [...visited], stack: [...stack], message: `Visit ${node.value} first (pre-order), then go left`, highlightNodeValue: node.value };

  yield* preorderGenerator(node.left, visited, stack);
  yield* preorderGenerator(node.right, visited, stack);

  stack.pop();
  yield { type: 'pop', nodeValue: node.value, visited: [...visited], stack: [...stack], message: `Return from preOrder(${node.value})`, highlightNodeValue: node.value };
}

export function* postorderGenerator(node: TreeNode | null, visited: number[] = [], stack: string[] = []): Generator<TraversalStep> {
  if (!node) return;

  stack.push(`postOrder(${node.value})`);
  yield { type: 'push', nodeValue: node.value, visited: [...visited], stack: [...stack], message: `Call postOrder(${node.value}) — go left first`, highlightNodeValue: node.value };

  yield* postorderGenerator(node.left, visited, stack);
  yield* postorderGenerator(node.right, visited, stack);

  visited.push(node.value);
  yield { type: 'visit', nodeValue: node.value, visited: [...visited], stack: [...stack], message: `Visit ${node.value} (both children done)`, highlightNodeValue: node.value };

  stack.pop();
  yield { type: 'pop', nodeValue: node.value, visited: [...visited], stack: [...stack], message: `Return from postOrder(${node.value})`, highlightNodeValue: node.value };
}

export function* levelorderGenerator(root: TreeNode): Generator<TraversalStep> {
  const queue: TreeNode[] = [root];
  const visited: number[] = [];

  yield { type: 'enqueue', nodeValue: root.value, visited: [...visited], stack: [`Queue: [${root.value}]`], message: `Enqueue root ${root.value}`, highlightNodeValue: root.value };

  while (queue.length > 0) {
    const node = queue.shift()!;
    visited.push(node.value);

    const queueValues = queue.map(n => n.value);
    yield { type: 'visit', nodeValue: node.value, visited: [...visited], stack: [`Queue: [${queueValues.join(', ')}]`], message: `Dequeue and visit ${node.value}`, highlightNodeValue: node.value };

    if (node.left) {
      queue.push(node.left);
      const qv = queue.map(n => n.value);
      yield { type: 'enqueue', nodeValue: node.left.value, visited: [...visited], stack: [`Queue: [${qv.join(', ')}]`], message: `Enqueue left child ${node.left.value}`, highlightNodeValue: node.left.value };
    }
    if (node.right) {
      queue.push(node.right);
      const qv = queue.map(n => n.value);
      yield { type: 'enqueue', nodeValue: node.right.value, visited: [...visited], stack: [`Queue: [${qv.join(', ')}]`], message: `Enqueue right child ${node.right.value}`, highlightNodeValue: node.right.value };
    }
  }

  yield { type: 'complete', nodeValue: null, visited: [...visited], stack: ['Queue: []'], message: `Traversal complete: [${visited.join(', ')}]`, highlightNodeValue: null };
}

export function generateTraversalSteps(type: string, root: TreeNode): TraversalStep[] {
  let gen;
  switch (type) {
    case 'inorder': gen = inorderGenerator(root); break;
    case 'preorder': gen = preorderGenerator(root); break;
    case 'postorder': gen = postorderGenerator(root); break;
    case 'levelorder': gen = levelorderGenerator(root); break;
    default: return [];
  }
  return [...gen];
}
