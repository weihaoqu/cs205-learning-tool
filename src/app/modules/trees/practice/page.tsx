'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export default function TreesPracticePage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/modules/trees/traversals">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Traversals
          </Button>
        </Link>
        <div />
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-4">Applications & Practice</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Trees are used everywhere in computer science. Let&apos;s explore real-world
          applications and test your understanding.
        </p>
      </div>

      {/* Expression Trees */}
      <Card>
        <CardHeader><CardTitle>Expression Trees</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <p>Mathematical expressions can be stored as trees. For <code className="bg-muted px-1 rounded">(3 + 5) * 2</code>:</p>
          <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-mono text-center">{`       *
      / \\
     +   2
    / \\
   3   5`}</pre>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            <li><strong>In-order</strong> traversal gives infix notation: 3 + 5 * 2</li>
            <li><strong>Post-order</strong> traversal gives postfix (RPN): 3 5 + 2 *</li>
            <li><strong>Pre-order</strong> traversal gives prefix: * + 3 5 2</li>
          </ul>
        </CardContent>
      </Card>

      {/* File System Trees */}
      <Card>
        <CardHeader><CardTitle>File System Trees</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <p>Your file system is a tree structure!</p>
          <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-mono">{`home/
├── Documents/
│   ├── report.pdf
│   └── notes.txt
├── Pictures/
│   └── photo.jpg
└── code/
    ├── Main.java
    └── Utils.java`}</pre>
          <p className="text-sm text-muted-foreground">
            <code className="bg-muted px-1 rounded">ls -R</code> is essentially a pre-order traversal!
          </p>
        </CardContent>
      </Card>

      {/* Other Applications */}
      <Card>
        <CardHeader><CardTitle>More Applications</CardTitle></CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200">HTML DOM</h4>
              <p className="text-sm text-blue-600 dark:text-blue-300">Web pages are trees of HTML elements</p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200">Decision Trees</h4>
              <p className="text-sm text-green-600 dark:text-green-300">AI/ML uses trees for classification</p>
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              <h4 className="font-medium text-purple-800 dark:text-purple-200">Org Charts</h4>
              <p className="text-sm text-purple-600 dark:text-purple-300">Company hierarchies are tree structures</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exercises */}
      <Card>
        <CardHeader><CardTitle>Practice Exercises</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">Consider this tree:</p>
          <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-mono text-center">{`       8
      / \\
     3   10
    / \\    \\
   1   6    14
      / \\   /
     4   7 13`}</pre>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Write the <strong>in-order</strong> traversal output. <span className="text-muted-foreground">(Answer: 1, 3, 4, 6, 7, 8, 10, 13, 14)</span></li>
            <li>Write the <strong>pre-order</strong> traversal output. <span className="text-muted-foreground">(Answer: 8, 3, 1, 6, 4, 7, 10, 14, 13)</span></li>
            <li>Write the <strong>post-order</strong> traversal output. <span className="text-muted-foreground">(Answer: 1, 4, 7, 6, 3, 13, 14, 10, 8)</span></li>
            <li>Write the <strong>level-order</strong> traversal output. <span className="text-muted-foreground">(Answer: 8, 3, 10, 1, 6, 14, 4, 7, 13)</span></li>
            <li>What is the <strong>height</strong> of this tree? <span className="text-muted-foreground">(Answer: 3)</span></li>
          </ol>
        </CardContent>
      </Card>

      {/* Quiz Link */}
      <Card>
        <CardHeader><CardTitle>Ready to Test Your Knowledge?</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Take the Trees quiz to check your understanding of tree structures and traversals.
          </p>
          <Link href="/quiz">
            <Button>Go to Quizzes</Button>
          </Link>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-start">
        <Link href="/modules/trees/traversals">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Traversals
          </Button>
        </Link>
      </div>
    </div>
  );
}
