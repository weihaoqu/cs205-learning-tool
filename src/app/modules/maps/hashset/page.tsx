'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HashSetVisualizer } from '@/components/visualizer/maps';
import { hashSetCode } from '@/lib/algorithms/maps';

export default function HashSetPage() {
  return (
    <div className="container py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">HashSet</h1>
        <p className="text-muted-foreground text-lg">
          A HashSet stores unique elements only. Try adding duplicates and see what happens!
        </p>
      </div>

      {/* Visualizer */}
      <HashSetVisualizer />

      {/* How it Works */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>HashSet = HashMap Wrapper</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Internally, a HashSet uses a HashMap where:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• The element is stored as the <strong>key</strong></li>
              <li>• A dummy constant is stored as the <strong>value</strong></li>
            </ul>
            <div className="p-4 bg-muted rounded-lg font-mono text-sm">
              // HashSet internally<br />
              set.add("apple")<br />
              ↓<br />
              map.put("apple", PRESENT)
            </div>
            <p className="text-sm text-muted-foreground">
              This is why HashSet operations have the same O(1) average time complexity.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Java Implementation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-2">add()</h4>
              <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
                {hashSetCode.add}
              </pre>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-2">contains()</h4>
              <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
                {hashSetCode.contains}
              </pre>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-2">remove()</h4>
              <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
                {hashSetCode.remove}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Use Cases */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Common Use Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">1. Remove Duplicates</h3>
              <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto mb-2">
{`List<Integer> list = Arrays.asList(1, 2, 2, 3, 3, 3);
Set<Integer> unique = new HashSet<>(list);
// unique = {1, 2, 3}`}
              </pre>
            </div>
            <div>
              <h3 className="font-semibold mb-3">2. Membership Testing</h3>
              <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto mb-2">
{`Set<String> visited = new HashSet<>();
if (!visited.contains(node)) {
    visited.add(node);
    // process node
}`}
              </pre>
            </div>
            <div>
              <h3 className="font-semibold mb-3">3. Find Common Elements</h3>
              <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto mb-2">
{`Set<Integer> set1 = new HashSet<>(list1);
Set<Integer> set2 = new HashSet<>(list2);
set1.retainAll(set2); // intersection`}
              </pre>
            </div>
            <div>
              <h3 className="font-semibold mb-3">4. Count Unique Items</h3>
              <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto mb-2">
{`Set<String> words = new HashSet<>();
for (String word : document) {
    words.add(word);
}
int uniqueCount = words.size();`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Differences */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>HashSet vs TreeSet vs LinkedHashSet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3">Feature</th>
                  <th className="text-left p-3">HashSet</th>
                  <th className="text-left p-3">TreeSet</th>
                  <th className="text-left p-3">LinkedHashSet</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">Ordering</td>
                  <td className="p-3">None</td>
                  <td className="p-3">Sorted</td>
                  <td className="p-3">Insertion order</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">add/remove/contains</td>
                  <td className="p-3 font-mono text-green-600">O(1)</td>
                  <td className="p-3 font-mono text-yellow-600">O(log n)</td>
                  <td className="p-3 font-mono text-green-600">O(1)</td>
                </tr>
                <tr>
                  <td className="p-3">Implementation</td>
                  <td className="p-3">HashMap</td>
                  <td className="p-3">Red-Black Tree</td>
                  <td className="p-3">HashMap + LinkedList</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
