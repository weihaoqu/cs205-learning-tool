'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HashCalculator } from '@/components/visualizer/maps';

export default function HashingBasicsPage() {
  return (
    <div className="container py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Hashing Basics</h1>
        <p className="text-muted-foreground text-lg">
          Learn how hash functions convert keys into array indices for fast lookups.
        </p>
      </div>

      {/* Explanation */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>What is a Hash Function?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              A <strong>hash function</strong> takes an input (key) and returns a fixed-size
              integer called a <strong>hash code</strong>. This hash code is then used to
              determine where to store the data in an array.
            </p>
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-mono text-sm">
                key → hashCode() → bucket index
              </p>
            </div>
            <p className="text-muted-foreground text-sm">
              Good hash functions distribute keys evenly across buckets, minimizing collisions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Java's hashCode() Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              In Java, every object has a <code className="bg-muted px-1 rounded">hashCode()</code> method.
              For Strings, it's calculated using character values:
            </p>
            <div className="p-4 bg-muted rounded-lg font-mono text-sm">
              s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]
            </div>
            <p className="text-muted-foreground text-sm">
              The multiplier 31 is chosen because it's an odd prime, which helps distribute
              hash codes more evenly.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Calculator */}
      <HashCalculator />

      {/* Key Points */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Key Points</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Hash Code to Index</h3>
              <p className="text-sm text-muted-foreground mb-2">
                The bucket index is calculated using the modulo operation:
              </p>
              <div className="p-3 bg-muted rounded-lg font-mono text-sm">
                index = hashCode % capacity
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                This ensures the index is always within [0, capacity-1].
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Collisions</h3>
              <p className="text-sm text-muted-foreground mb-2">
                When two different keys hash to the same index, we have a <strong>collision</strong>.
              </p>
              <p className="text-sm text-muted-foreground">
                Java's HashMap handles collisions using <strong>chaining</strong> — storing
                multiple entries in the same bucket as a linked list.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Why Modulo? */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Why Use Modulo?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Hash codes can be very large numbers (up to 2^31 - 1 in Java). We can't create
              an array that large! The modulo operation maps any hash code to a valid array index.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">96354</div>
                <div className="text-sm text-muted-foreground">Hash Code</div>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-2xl font-bold">% 8</div>
                <div className="text-sm text-muted-foreground">Modulo Capacity</div>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">2</div>
                <div className="text-sm text-muted-foreground">Bucket Index</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Different capacities will give different indices for the same key. This is why
              rehashing (changing capacity) requires recalculating all indices.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
