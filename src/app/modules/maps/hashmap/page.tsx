'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HashTableVisualizer } from '@/components/visualizer/maps';
import { hashMapCode } from '@/lib/algorithms/maps';

export default function HashMapPage() {
  return (
    <div className="container py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">HashMap</h1>
        <p className="text-muted-foreground text-lg">
          Explore HashMap operations with an interactive table view. See how keys are
          hashed, where they're stored, and how collisions are handled.
        </p>
      </div>

      {/* Visualizer */}
      <HashTableVisualizer showControls={true} />

      {/* Operations Explanation */}
      <div className="mt-8">
        <Tabs defaultValue="put">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="put">put()</TabsTrigger>
            <TabsTrigger value="get">get()</TabsTrigger>
            <TabsTrigger value="remove">remove()</TabsTrigger>
          </TabsList>

          <TabsContent value="put" className="mt-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>How put() Works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Calculate the hash code of the key</li>
                    <li>Compute bucket index: <code>hash % capacity</code></li>
                    <li>Search the bucket for existing key</li>
                    <li>If found: update the value</li>
                    <li>If not found: add new entry to bucket</li>
                    <li>Check if rehashing is needed</li>
                  </ol>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Java Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-muted p-4 rounded-lg overflow-x-auto">
                    {hashMapCode.put}
                  </pre>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="get" className="mt-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>How get() Works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Calculate the hash code of the key</li>
                    <li>Compute bucket index: <code>hash % capacity</code></li>
                    <li>Search the bucket's chain for the key</li>
                    <li>If found: return the value</li>
                    <li>If not found: return null</li>
                  </ol>
                  <p className="text-sm text-muted-foreground">
                    Average time: O(1) — if hash function distributes evenly
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Java Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-muted p-4 rounded-lg overflow-x-auto">
                    {hashMapCode.get}
                  </pre>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="remove" className="mt-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>How remove() Works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Calculate the hash code of the key</li>
                    <li>Compute bucket index: <code>hash % capacity</code></li>
                    <li>Search the bucket's chain for the key</li>
                    <li>If found: remove from chain, decrement size</li>
                    <li>If not found: return null (nothing to remove)</li>
                  </ol>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Java Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-muted p-4 rounded-lg overflow-x-auto">
                    {hashMapCode.remove}
                  </pre>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Collision Handling */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Collision Handling: Chaining</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                When two keys hash to the same bucket index, we have a <strong>collision</strong>.
                Java's HashMap uses <strong>chaining</strong> to handle this — each bucket stores
                a linked list of entries.
              </p>
              <div className="p-4 bg-muted rounded-lg font-mono text-sm">
                Bucket[3]: "apple"→5 → "grape"→7 → "mango"→3
              </div>
              <p className="text-sm text-muted-foreground">
                When searching, we traverse the chain comparing keys until we find a match
                or reach the end.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Impact on Performance</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>
                  <strong>Best case:</strong> No collisions → O(1) access
                </li>
                <li>
                  <strong>Average case:</strong> Few collisions → O(1) access
                </li>
                <li>
                  <strong>Worst case:</strong> All keys in one bucket → O(n) access
                </li>
              </ul>
              <p className="text-sm text-muted-foreground mt-4">
                A good hash function and appropriate load factor minimize collisions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
