import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SortingRace } from '@/components/visualizer/sorting';
import { ALGORITHM_INFO } from '@/lib/algorithms/sorting';
import { Badge } from '@/components/ui/badge';

export default function SortingComparisonPage() {
  return (
    <div className="container py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Algorithm Comparison</h1>
        <p className="text-muted-foreground text-lg">
          Race sorting algorithms against each other! See which algorithm performs best
          on different types of data.
        </p>
      </div>

      {/* Race Component */}
      <SortingRace />

      {/* Comparison Analysis */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* When to Use Which */}
        <Card>
          <CardHeader>
            <CardTitle>When to Use Which Algorithm?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-blue-500">Bubble Sort</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Only for educational purposes or very small arrays. Avoid in production.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-purple-500">Selection Sort</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                When memory writes are expensive. Makes minimum number of swaps.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-pink-500">Insertion Sort</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Small arrays or nearly sorted data. Used in hybrid algorithms like Timsort.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-emerald-500">Merge Sort</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                When stability is required. Great for linked lists and external sorting.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-amber-500">Quick Sort</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                General purpose. Fastest in practice for random data. Used in many libraries.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-cyan-500">Heap Sort</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                When O(n log n) guarantee needed with O(1) space. Good for priority queues.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Performance Characteristics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Characteristics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Best for Sorted/Nearly Sorted Data</h4>
                <div className="flex gap-2">
                  <Badge variant="outline">Insertion Sort</Badge>
                  <Badge variant="outline">Bubble Sort (optimized)</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">O(n) when data is almost sorted</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Best for Random Data</h4>
                <div className="flex gap-2">
                  <Badge variant="outline">Quick Sort</Badge>
                  <Badge variant="outline">Merge Sort</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">O(n log n) average case</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Best for Worst Case Guarantee</h4>
                <div className="flex gap-2">
                  <Badge variant="outline">Merge Sort</Badge>
                  <Badge variant="outline">Heap Sort</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">O(n log n) guaranteed</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Best for Memory Efficiency</h4>
                <div className="flex gap-2">
                  <Badge variant="outline">Heap Sort</Badge>
                  <Badge variant="outline">Quick Sort</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">O(1) auxiliary space (or O(log n) for recursion)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Complexity Comparison Table */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Complete Complexity Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">Algorithm</th>
                  <th className="text-left p-3 font-medium">Best Time</th>
                  <th className="text-left p-3 font-medium">Average Time</th>
                  <th className="text-left p-3 font-medium">Worst Time</th>
                  <th className="text-left p-3 font-medium">Space</th>
                  <th className="text-left p-3 font-medium">Stable</th>
                  <th className="text-left p-3 font-medium">Method</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-medium">Bubble Sort</td>
                  <td className="p-3 font-mono text-green-600">O(n)</td>
                  <td className="p-3 font-mono text-amber-600">O(n^2)</td>
                  <td className="p-3 font-mono text-red-600">O(n^2)</td>
                  <td className="p-3 font-mono">O(1)</td>
                  <td className="p-3"><Badge variant="outline" className="text-green-600">Yes</Badge></td>
                  <td className="p-3 text-muted-foreground">Exchanging</td>
                </tr>
                <tr className="border-b bg-muted/30">
                  <td className="p-3 font-medium">Selection Sort</td>
                  <td className="p-3 font-mono text-amber-600">O(n^2)</td>
                  <td className="p-3 font-mono text-amber-600">O(n^2)</td>
                  <td className="p-3 font-mono text-red-600">O(n^2)</td>
                  <td className="p-3 font-mono">O(1)</td>
                  <td className="p-3"><Badge variant="outline">No</Badge></td>
                  <td className="p-3 text-muted-foreground">Selection</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Insertion Sort</td>
                  <td className="p-3 font-mono text-green-600">O(n)</td>
                  <td className="p-3 font-mono text-amber-600">O(n^2)</td>
                  <td className="p-3 font-mono text-red-600">O(n^2)</td>
                  <td className="p-3 font-mono">O(1)</td>
                  <td className="p-3"><Badge variant="outline" className="text-green-600">Yes</Badge></td>
                  <td className="p-3 text-muted-foreground">Insertion</td>
                </tr>
                <tr className="border-b bg-muted/30">
                  <td className="p-3 font-medium">Merge Sort</td>
                  <td className="p-3 font-mono text-green-600">O(n log n)</td>
                  <td className="p-3 font-mono text-green-600">O(n log n)</td>
                  <td className="p-3 font-mono text-green-600">O(n log n)</td>
                  <td className="p-3 font-mono">O(n)</td>
                  <td className="p-3"><Badge variant="outline" className="text-green-600">Yes</Badge></td>
                  <td className="p-3 text-muted-foreground">Merging</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Quick Sort</td>
                  <td className="p-3 font-mono text-green-600">O(n log n)</td>
                  <td className="p-3 font-mono text-green-600">O(n log n)</td>
                  <td className="p-3 font-mono text-red-600">O(n^2)</td>
                  <td className="p-3 font-mono">O(log n)</td>
                  <td className="p-3"><Badge variant="outline">No</Badge></td>
                  <td className="p-3 text-muted-foreground">Partitioning</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Heap Sort</td>
                  <td className="p-3 font-mono text-green-600">O(n log n)</td>
                  <td className="p-3 font-mono text-green-600">O(n log n)</td>
                  <td className="p-3 font-mono text-green-600">O(n log n)</td>
                  <td className="p-3 font-mono">O(1)</td>
                  <td className="p-3"><Badge variant="outline">No</Badge></td>
                  <td className="p-3 text-muted-foreground">Selection</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Tips for the Race */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Experiment Ideas</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">1.</span>
              Try racing with a nearly sorted array - watch Insertion Sort shine!
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">2.</span>
              Compare O(n^2) algorithms with O(n log n) - see the difference grow with array size
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">3.</span>
              Race Quick Sort vs Merge Sort - which wins more often?
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">4.</span>
              Watch the comparison and swap counts - efficiency isn&apos;t just about speed
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">5.</span>
              Try reverse-sorted data - worst case for some algorithms
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">6.</span>
              Compare Heap Sort vs Quick Sort - predictability vs speed
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
