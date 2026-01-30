'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RehashingDemo } from '@/components/visualizer/maps';

export default function RehashingPage() {
  return (
    <div className="container py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Load Factor & Rehashing</h1>
        <p className="text-muted-foreground text-lg">
          Watch what happens when a HashMap gets too full and needs to resize.
        </p>
      </div>

      {/* Explanation */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>What is Load Factor?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              The <strong>load factor</strong> measures how full the hash table is:
            </p>
            <div className="p-4 bg-muted rounded-lg font-mono text-center text-lg">
              loadFactor = size / capacity
            </div>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>
                <strong>Java's default:</strong> 0.75 (75% full triggers resize)
              </li>
              <li>
                <strong>Higher load factor:</strong> More space efficient, more collisions
              </li>
              <li>
                <strong>Lower load factor:</strong> Fewer collisions, wastes space
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>When Does Rehashing Occur?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Rehashing is triggered when:
            </p>
            <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg font-mono text-center">
              size &gt; capacity × loadFactor
            </div>
            <p className="text-sm text-muted-foreground">
              Example: With capacity=8 and loadFactor=0.75:
            </p>
            <div className="p-3 bg-muted rounded-lg text-sm font-mono">
              threshold = 8 × 0.75 = 6<br />
              When size &gt; 6, rehashing occurs
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Demo */}
      <RehashingDemo />

      {/* What Happens During Rehashing */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>The Rehashing Process</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <Badge className="h-6 w-6 rounded-full flex items-center justify-center">1</Badge>
              <div>
                <h4 className="font-medium">Create New Array</h4>
                <p className="text-sm text-muted-foreground">
                  A new bucket array is created with <strong>double the capacity</strong>.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <Badge className="h-6 w-6 rounded-full flex items-center justify-center">2</Badge>
              <div>
                <h4 className="font-medium">Recalculate All Indices</h4>
                <p className="text-sm text-muted-foreground">
                  For each entry, compute new index: <code>hashCode % newCapacity</code>.
                  Indices will change because capacity changed!
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <Badge className="h-6 w-6 rounded-full flex items-center justify-center">3</Badge>
              <div>
                <h4 className="font-medium">Move All Entries</h4>
                <p className="text-sm text-muted-foreground">
                  Each entry is inserted into its new bucket in the larger array.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <Badge className="h-6 w-6 rounded-full flex items-center justify-center">4</Badge>
              <div>
                <h4 className="font-medium">Update Threshold</h4>
                <p className="text-sm text-muted-foreground">
                  New threshold = newCapacity × loadFactor. The map can now hold more entries.
                </p>
              </div>
            </li>
          </ol>
        </CardContent>
      </Card>

      {/* Why Indices Change */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Why Do Indices Change?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            The bucket index depends on the capacity through the modulo operation.
            When capacity changes, the index changes too:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Old Capacity = 8</h4>
              <div className="font-mono text-sm space-y-1">
                <div>"apple" (hash=93029210) % 8 = <span className="text-blue-600 font-bold">2</span></div>
                <div>"banana" (hash=98715246) % 8 = <span className="text-blue-600 font-bold">6</span></div>
                <div>"cherry" (hash=94615849) % 8 = <span className="text-blue-600 font-bold">1</span></div>
              </div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">New Capacity = 16</h4>
              <div className="font-mono text-sm space-y-1">
                <div>"apple" (hash=93029210) % 16 = <span className="text-green-600 font-bold">10</span></div>
                <div>"banana" (hash=98715246) % 16 = <span className="text-green-600 font-bold">14</span></div>
                <div>"cherry" (hash=94615849) % 16 = <span className="text-green-600 font-bold">9</span></div>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Notice how all indices changed! This is why we must recalculate positions for every entry.
          </p>
        </CardContent>
      </Card>

      {/* Performance Impact */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Performance Impact of Rehashing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-red-600 mb-2">Cost of Rehashing</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• O(n) time to move all entries</li>
                <li>• Temporarily doubles memory usage</li>
                <li>• Can cause latency spikes</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-green-600 mb-2">Why It's Worth It</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Maintains O(1) average operations</li>
                <li>• Reduces collision chains</li>
                <li>• Amortized cost is still O(1) per insert</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-sm">
              <strong>Tip:</strong> If you know the approximate size ahead of time, initialize the
              HashMap with that capacity to avoid rehashing:
            </p>
            <code className="text-sm font-mono block mt-2">
              Map&lt;String, Integer&gt; map = new HashMap&lt;&gt;(1000);
            </code>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
