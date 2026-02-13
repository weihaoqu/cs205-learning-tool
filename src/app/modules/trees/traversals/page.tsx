'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { TraversalVisualizer } from '@/components/visualizer/trees';

export default function TraversalsPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/modules/trees">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Overview
          </Button>
        </Link>
        <Link href="/modules/trees/practice">
          <Button variant="ghost" className="gap-2">
            Practice <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-4">Tree Traversals</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Learn four ways to visit every node in a tree — three depth-first orders
          and one breadth-first order.
        </p>
      </div>

      {/* Traversal Explanations */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-base">In-Order (Left → Root → Right)</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <pre className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">{`void inOrder(TreeNode node) {
    if (node == null) return;
    inOrder(node.left);
    print(node.value);
    inOrder(node.right);
}`}</pre>
            <p className="text-sm text-muted-foreground">For BSTs, produces sorted output. Mnemonic: root is <em>IN</em> the middle.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Pre-Order (Root → Left → Right)</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <pre className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">{`void preOrder(TreeNode node) {
    if (node == null) return;
    print(node.value);
    preOrder(node.left);
    preOrder(node.right);
}`}</pre>
            <p className="text-sm text-muted-foreground">Useful for copying/serializing a tree. Mnemonic: root comes <em>BEFORE</em> children.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Post-Order (Left → Right → Root)</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <pre className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">{`void postOrder(TreeNode node) {
    if (node == null) return;
    postOrder(node.left);
    postOrder(node.right);
    print(node.value);
}`}</pre>
            <p className="text-sm text-muted-foreground">Useful for deleting a tree safely. Mnemonic: root comes <em>AFTER</em> children.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Level-Order (BFS)</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <pre className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">{`void levelOrder(TreeNode root) {
    Queue<TreeNode> q = new LinkedList<>();
    q.add(root);
    while (!q.isEmpty()) {
        TreeNode node = q.poll();
        print(node.value);
        if (node.left != null) q.add(node.left);
        if (node.right != null) q.add(node.right);
    }
}`}</pre>
            <p className="text-sm text-muted-foreground">
              Uses a{' '}
              <Link href="/modules/stack-queue/queue" className="text-primary hover:underline">queue</Link>
              . Visits nodes level by level.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Visualizer */}
      <TraversalVisualizer />

      {/* Connection to recursion */}
      <Card>
        <CardHeader><CardTitle>Connection to Recursion</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            The depth-first traversals (in-order, pre-order, post-order) are naturally{' '}
            <Link href="/modules/recursion" className="text-primary hover:underline">recursive</Link>
            . Each call processes the current node and recurses on children — exactly like the
            factorial and Fibonacci examples. Level-order is iterative, using a{' '}
            <Link href="/modules/stack-queue/queue" className="text-primary hover:underline">queue</Link>
            .
          </p>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Link href="/modules/trees">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Overview
          </Button>
        </Link>
        <Link href="/modules/trees/practice">
          <Button className="gap-2">
            Practice <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
