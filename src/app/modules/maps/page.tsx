import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Hash, Layers, RefreshCw, BookOpen } from 'lucide-react';

const topics = [
  {
    id: 'hashing',
    title: 'Hashing Basics',
    description: 'Learn how hash functions work and how keys map to bucket indices.',
    icon: Hash,
    color: 'text-blue-500',
  },
  {
    id: 'hashmap',
    title: 'HashMap',
    description: 'Explore put, get, remove operations with visual table view.',
    icon: Layers,
    color: 'text-green-500',
  },
  {
    id: 'hashset',
    title: 'HashSet',
    description: 'Understand sets and how duplicates are rejected.',
    icon: Layers,
    color: 'text-purple-500',
  },
  {
    id: 'rehashing',
    title: 'Load Factor & Rehashing',
    description: 'Watch hash tables resize when they get too full.',
    icon: RefreshCw,
    color: 'text-orange-500',
  },
  {
    id: 'practice',
    title: 'Practice',
    description: 'Test your understanding with hands-on exercises.',
    icon: BookOpen,
    color: 'text-pink-500',
  },
];

export default function MapsOverviewPage() {
  return (
    <div className="container py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Maps & HashTables</h1>
        <p className="text-muted-foreground text-lg">
          Learn how hash-based data structures provide O(1) average-time operations
          for storing and retrieving key-value pairs.
        </p>
      </div>

      {/* Quick Intro */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-3">What is a HashMap?</h2>
              <p className="text-muted-foreground mb-4">
                A HashMap stores <strong>key-value pairs</strong> and provides fast access
                using a hash function. Think of it like a dictionary where you can
                instantly look up a word (key) to find its definition (value).
              </p>
              <div className="font-mono text-sm bg-muted p-3 rounded">
                map.put("apple", 5);<br />
                map.get("apple"); // returns 5
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3">What is a HashSet?</h2>
              <p className="text-muted-foreground mb-4">
                A HashSet stores <strong>unique elements</strong> only. It's implemented
                using a HashMap internally, where elements are stored as keys.
                Perfect for checking membership or removing duplicates.
              </p>
              <div className="font-mono text-sm bg-muted p-3 rounded">
                set.add("apple");<br />
                set.add("apple"); // duplicate rejected<br />
                set.contains("apple"); // true
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Complexity Comparison */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Time Complexity Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3">Operation</th>
                  <th className="text-left p-3">HashMap</th>
                  <th className="text-left p-3">TreeMap</th>
                  <th className="text-left p-3">ArrayList</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-medium">Insert</td>
                  <td className="p-3 font-mono text-green-600">O(1)*</td>
                  <td className="p-3 font-mono text-yellow-600">O(log n)</td>
                  <td className="p-3 font-mono text-yellow-600">O(1) / O(n)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Search</td>
                  <td className="p-3 font-mono text-green-600">O(1)*</td>
                  <td className="p-3 font-mono text-yellow-600">O(log n)</td>
                  <td className="p-3 font-mono text-red-600">O(n)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Delete</td>
                  <td className="p-3 font-mono text-green-600">O(1)*</td>
                  <td className="p-3 font-mono text-yellow-600">O(log n)</td>
                  <td className="p-3 font-mono text-red-600">O(n)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Ordered?</td>
                  <td className="p-3"><Badge variant="outline">No</Badge></td>
                  <td className="p-3"><Badge variant="outline" className="text-green-600 border-green-300">Yes</Badge></td>
                  <td className="p-3"><Badge variant="outline" className="text-green-600 border-green-300">Yes</Badge></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            * Average case. Worst case is O(n) with poor hash function or many collisions.
          </p>
        </CardContent>
      </Card>

      {/* Topic Cards */}
      <h2 className="text-2xl font-bold mb-4">Topics</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => {
          const Icon = topic.icon;
          return (
            <Card key={topic.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Icon className={`w-5 h-5 ${topic.color}`} />
                  <CardTitle className="text-lg">{topic.title}</CardTitle>
                </div>
                <CardDescription>{topic.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild size="sm" className="w-full">
                  <Link href={`/modules/maps/${topic.id}`}>
                    Start Learning <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* When to Use */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>When to Use HashMap vs HashSet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-green-600 mb-2">Use HashMap when:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• You need to associate values with keys</li>
                <li>• Counting occurrences (word frequency)</li>
                <li>• Caching computed results</li>
                <li>• Looking up data by ID</li>
                <li>• Phone book (name → number)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-purple-600 mb-2">Use HashSet when:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• You only need to track unique items</li>
                <li>• Removing duplicates from a list</li>
                <li>• Checking if item exists (membership)</li>
                <li>• Finding intersection/union of collections</li>
                <li>• Tracking visited nodes in graph traversal</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
