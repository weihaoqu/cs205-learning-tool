'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { TreeRenderer } from '@/components/visualizer/trees';
import { buildSampleTree } from '@/lib/algorithms/trees';

export default function TreesOverviewPage() {
  const sampleTree = buildSampleTree();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div />
        <Link href="/modules/trees/traversals">
          <Button variant="ghost" className="gap-2">
            Traversals <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-4">Trees</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          A hierarchical data structure where each node has a value and references
          to child nodes. Trees are everywhere — from file systems to HTML DOMs.
        </p>
      </div>

      {/* Terminology */}
      <Card>
        <CardHeader>
          <CardTitle>Tree Terminology</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-3">
            {[
              ['Root', 'The top node with no parent'],
              ['Leaf', 'A node with no children'],
              ['Parent / Child', 'Nodes connected by an edge'],
              ['Siblings', 'Nodes sharing the same parent'],
              ['Height', 'Longest path from root to a leaf'],
              ['Depth', 'Distance from root to a node'],
              ['Subtree', 'A node and all its descendants'],
            ].map(([term, def]) => (
              <div key={term} className="p-2 bg-muted/50 rounded-lg">
                <span className="font-medium">{term}:</span>{' '}
                <span className="text-sm text-muted-foreground">{def}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Binary Tree */}
      <Card>
        <CardHeader>
          <CardTitle>Binary Trees</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>A <strong>binary tree</strong> is a tree where each node has at most 2 children (left and right).</p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200">Full Binary Tree</h4>
              <p className="text-sm text-blue-600 dark:text-blue-300">Every node has 0 or 2 children</p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200">Complete Binary Tree</h4>
              <p className="text-sm text-green-600 dark:text-green-300">All levels filled except possibly last (filled left-to-right)</p>
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              <h4 className="font-medium text-purple-800 dark:text-purple-200">Perfect Binary Tree</h4>
              <p className="text-sm text-purple-600 dark:text-purple-300">All internal nodes have 2 children, all leaves at same level</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Java Code */}
      <Card>
        <CardHeader>
          <CardTitle>Java Implementation</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto text-sm font-mono">{`class TreeNode {
    int value;
    TreeNode left;
    TreeNode right;

    TreeNode(int value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}`}</pre>
        </CardContent>
      </Card>

      {/* Sample Tree Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Sample Binary Search Tree</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg bg-white dark:bg-gray-950 p-2">
            <TreeRenderer root={sampleTree} />
          </div>
          <p className="text-sm text-muted-foreground mt-2 text-center">
            A BST where each node&apos;s left children are smaller and right children are larger.
          </p>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-end">
        <Link href="/modules/trees/traversals">
          <Button className="gap-2">
            Traversals <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
