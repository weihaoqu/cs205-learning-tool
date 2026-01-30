'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HashMapPractice } from '@/components/visualizer/maps';

export default function MapsPracticePage() {
  return (
    <div className="container py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Practice Exercises</h1>
        <p className="text-muted-foreground text-lg">
          Test your understanding of hash tables with these interactive exercises.
        </p>
      </div>

      {/* Practice Component */}
      <HashMapPractice />

      {/* Tips */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quick Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Formulas</h3>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-muted rounded font-mono">
                  bucketIndex = hashCode % capacity
                </div>
                <div className="p-2 bg-muted rounded font-mono">
                  loadFactor = size / capacity
                </div>
                <div className="p-2 bg-muted rounded font-mono">
                  threshold = capacity × 0.75
                </div>
                <div className="p-2 bg-muted rounded font-mono">
                  rehash when: size &gt; threshold
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Key Concepts</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>
                  <strong>Collision:</strong> Two keys with the same bucket index
                </li>
                <li>
                  <strong>Chaining:</strong> Store colliding entries in a linked list
                </li>
                <li>
                  <strong>Load Factor:</strong> How full the table is (default 0.75)
                </li>
                <li>
                  <strong>Rehashing:</strong> Doubling capacity when threshold exceeded
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Common Mistakes */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Common Mistakes to Avoid</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <h4 className="font-medium text-red-700 mb-1">Forgetting modulo</h4>
                <p className="text-sm text-muted-foreground">
                  Always use hashCode <strong>% capacity</strong> to get the index
                </p>
              </div>
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <h4 className="font-medium text-red-700 mb-1">Confusing size and capacity</h4>
                <p className="text-sm text-muted-foreground">
                  Size = number of entries. Capacity = array length
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <h4 className="font-medium text-red-700 mb-1">Threshold calculation</h4>
                <p className="text-sm text-muted-foreground">
                  Threshold = capacity × loadFactor (floor the result)
                </p>
              </div>
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <h4 className="font-medium text-red-700 mb-1">New indices after rehash</h4>
                <p className="text-sm text-muted-foreground">
                  Use the NEW capacity in the modulo: hashCode % newCapacity
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
