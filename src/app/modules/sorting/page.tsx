import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, BarChart3, Layers } from 'lucide-react';
import { ALGORITHM_INFO } from '@/lib/algorithms/sorting';

const algorithms = [
  {
    id: 'bubble',
    name: 'Bubble Sort',
    description: 'Repeatedly swaps adjacent elements that are out of order. Simple but inefficient.',
    complexity: 'O(n^2)',
    category: 'simple',
    color: 'bg-blue-500',
  },
  {
    id: 'selection',
    name: 'Selection Sort',
    description: 'Finds the minimum element and places it at the beginning. Easy to understand.',
    complexity: 'O(n^2)',
    category: 'simple',
    color: 'bg-purple-500',
  },
  {
    id: 'insertion',
    name: 'Insertion Sort',
    description: 'Builds sorted array one element at a time. Efficient for small or nearly sorted data.',
    complexity: 'O(n^2)',
    category: 'simple',
    color: 'bg-pink-500',
  },
  {
    id: 'merge',
    name: 'Merge Sort',
    description: 'Divides array in half, sorts recursively, then merges. Stable and consistent.',
    complexity: 'O(n log n)',
    category: 'efficient',
    color: 'bg-emerald-500',
  },
  {
    id: 'quick',
    name: 'Quick Sort',
    description: 'Picks a pivot, partitions around it, sorts recursively. Very fast in practice.',
    complexity: 'O(n log n)',
    category: 'efficient',
    color: 'bg-amber-500',
  },
  {
    id: 'heap',
    name: 'Heap Sort',
    description: 'Builds a heap, then extracts elements. In-place with guaranteed O(n log n).',
    complexity: 'O(n log n)',
    category: 'efficient',
    color: 'bg-cyan-500',
  },
];

export default function SortingOverviewPage() {
  const simpleAlgorithms = algorithms.filter(a => a.category === 'simple');
  const efficientAlgorithms = algorithms.filter(a => a.category === 'efficient');

  return (
    <div className="container py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Sorting Algorithms</h1>
        <p className="text-muted-foreground text-lg">
          Master the fundamental sorting algorithms. Learn how they work, compare their performance,
          and practice sorting arrays yourself.
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Link href="/modules/sorting/comparison" className="block">
          <Card className="hover:shadow-md transition-shadow h-full">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <BarChart3 className="w-8 h-8 text-primary mb-2" />
              <span className="font-medium">Race Mode</span>
              <span className="text-xs text-muted-foreground">Compare algorithms</span>
            </CardContent>
          </Card>
        </Link>
        <Link href="/quiz?topic=sorting" className="block">
          <Card className="hover:shadow-md transition-shadow h-full">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <Layers className="w-8 h-8 text-primary mb-2" />
              <span className="font-medium">Quiz</span>
              <span className="text-xs text-muted-foreground">Test your knowledge</span>
            </CardContent>
          </Card>
        </Link>
        <Card className="h-full">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <Clock className="w-8 h-8 text-blue-500 mb-2" />
            <span className="font-medium">O(n^2)</span>
            <span className="text-xs text-muted-foreground">Simple algorithms</span>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <Clock className="w-8 h-8 text-green-500 mb-2" />
            <span className="font-medium">O(n log n)</span>
            <span className="text-xs text-muted-foreground">Efficient algorithms</span>
          </CardContent>
        </Card>
      </div>

      {/* Simple Algorithms */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-2xl font-bold">Simple Algorithms</h2>
          <Badge variant="outline" className="text-blue-600 border-blue-300">
            O(n^2)
          </Badge>
        </div>
        <p className="text-muted-foreground mb-4">
          These algorithms are easy to understand and implement, but have quadratic time complexity.
          Good for small datasets or educational purposes.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {simpleAlgorithms.map((algo) => (
            <Card key={algo.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${algo.color}`} />
                  <CardTitle className="text-lg">{algo.name}</CardTitle>
                </div>
                <CardDescription>{algo.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Time: </span>
                    <span className="font-mono">{algo.complexity}</span>
                  </div>
                  <Button asChild size="sm">
                    <Link href={`/modules/sorting/${algo.id}`}>
                      Learn <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Efficient Algorithms */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-2xl font-bold">Efficient Algorithms</h2>
          <Badge variant="outline" className="text-green-600 border-green-300">
            O(n log n)
          </Badge>
        </div>
        <p className="text-muted-foreground mb-4">
          These algorithms are more complex but much faster for large datasets. They use divide-and-conquer
          or heap-based approaches to achieve optimal time complexity.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {efficientAlgorithms.map((algo) => (
            <Card key={algo.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${algo.color}`} />
                  <CardTitle className="text-lg">{algo.name}</CardTitle>
                </div>
                <CardDescription>{algo.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Time: </span>
                    <span className="font-mono">{algo.complexity}</span>
                  </div>
                  <Button asChild size="sm">
                    <Link href={`/modules/sorting/${algo.id}`}>
                      Learn <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Algorithm Comparison</h2>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-medium">Algorithm</th>
                    <th className="text-left p-3 font-medium">Best</th>
                    <th className="text-left p-3 font-medium">Average</th>
                    <th className="text-left p-3 font-medium">Worst</th>
                    <th className="text-left p-3 font-medium">Space</th>
                    <th className="text-left p-3 font-medium">Stable</th>
                  </tr>
                </thead>
                <tbody>
                  {algorithms.map((algo, idx) => {
                    const info = ALGORITHM_INFO[algo.id as keyof typeof ALGORITHM_INFO];
                    return (
                      <tr key={algo.id} className={idx % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                        <td className="p-3">
                          <Link
                            href={`/modules/sorting/${algo.id}`}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {algo.name}
                          </Link>
                        </td>
                        <td className="p-3 font-mono text-green-600">{info.timeComplexity.best}</td>
                        <td className="p-3 font-mono text-amber-600">{info.timeComplexity.average}</td>
                        <td className="p-3 font-mono text-red-600">{info.timeComplexity.worst}</td>
                        <td className="p-3 font-mono">{info.spaceComplexity}</td>
                        <td className="p-3">
                          {info.stable ? (
                            <Badge variant="outline" className="text-green-600 border-green-300">Yes</Badge>
                          ) : (
                            <Badge variant="outline" className="text-muted-foreground">No</Badge>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
