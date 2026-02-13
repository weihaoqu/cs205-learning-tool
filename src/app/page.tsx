import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Code, FlaskConical, Presentation } from 'lucide-react';

const modules = [
  {
    id: 'arrays',
    title: 'Arrays',
    description: 'Master 1D and 2D arrays with interactive visualizations',
    href: '/modules/arrays/basic-arrays',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'sorting',
    title: 'Sorting Algorithms',
    description: 'Visualize and compare classic sorting algorithms',
    href: '/modules/sorting',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    id: 'lists',
    title: 'Lists',
    description: 'Understand ArrayList and LinkedList implementations',
    href: '/modules/lists',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'recursion',
    title: 'Recursion',
    description: 'Understand recursive algorithms with interactive visualizations',
    href: '/modules/recursion',
    color: 'from-orange-500 to-amber-500',
  },
  {
    id: 'stack-queue',
    title: 'Stacks & Queues',
    description: 'Master LIFO and FIFO data structures',
    href: '/modules/stack-queue',
    color: 'from-cyan-500 to-teal-500',
  },
  {
    id: 'maps',
    title: 'Maps & HashTables',
    description: 'Learn hashing, HashMaps, and HashSets',
    href: '/modules/maps',
    color: 'from-amber-500 to-yellow-500',
  },
  {
    id: 'complexity',
    title: 'Algorithm Complexity',
    description: 'Master Big O notation and complexity analysis',
    href: '/modules/complexity',
    color: 'from-purple-500 to-violet-500',
  },
  {
    id: 'searching',
    title: 'Searching Algorithms',
    description: 'Compare linear and binary search step by step',
    href: '/modules/searching/linear',
    color: 'from-rose-500 to-pink-500',
  },
  {
    id: 'trees',
    title: 'Trees',
    description: 'Explore binary trees and traversal algorithms',
    href: '/modules/trees',
    color: 'from-emerald-500 to-green-500',
  },
  {
    id: 'heaps',
    title: 'Heaps & Priority Queues',
    description: 'Understand heap structure, heap sort, and priority queues',
    href: '/modules/heaps/basics',
    color: 'from-sky-500 to-blue-500',
  },
  {
    id: 'graphs',
    title: 'Graphs',
    description: 'Learn graph representations, BFS, DFS, and Dijkstra',
    href: '/modules/graphs',
    color: 'from-violet-500 to-purple-500',
  },
  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming',
    description: 'Master DP concepts, memoization, and classic problems',
    href: '/modules/dynamic-programming/fundamentals',
    color: 'from-fuchsia-500 to-pink-500',
  },
];

export default function Home() {
  return (
    <div className="container py-8">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          CS205 Data Structures
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Interactive visualizations and exercises to master data structures and algorithms.
          Watch algorithms come to life, step through code execution, and practice with guided exercises.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button asChild size="lg">
            <Link href="/modules">Browse Modules</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/slides">View Slides</Link>
          </Button>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="grid gap-4 md:grid-cols-4 mb-12">
        <Link href="/modules">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer text-center py-4">
            <CardContent className="flex flex-col items-center gap-2 p-4">
              <BookOpen className="w-8 h-8 text-blue-500" />
              <span className="font-semibold">12 Modules</span>
              <span className="text-xs text-muted-foreground">Interactive lessons</span>
            </CardContent>
          </Card>
        </Link>
        <Link href="/slides">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer text-center py-4">
            <CardContent className="flex flex-col items-center gap-2 p-4">
              <Presentation className="w-8 h-8 text-violet-500" />
              <span className="font-semibold">15 Slide Decks</span>
              <span className="text-xs text-muted-foreground">Lecture presentations</span>
            </CardContent>
          </Card>
        </Link>
        <Link href="/quiz">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer text-center py-4">
            <CardContent className="flex flex-col items-center gap-2 p-4">
              <FlaskConical className="w-8 h-8 text-green-500" />
              <span className="font-semibold">12 Quizzes</span>
              <span className="text-xs text-muted-foreground">Test your knowledge</span>
            </CardContent>
          </Card>
        </Link>
        <Link href="/sandbox">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer text-center py-4">
            <CardContent className="flex flex-col items-center gap-2 p-4">
              <Code className="w-8 h-8 text-orange-500" />
              <span className="font-semibold">Sandbox</span>
              <span className="text-xs text-muted-foreground">Experiment freely</span>
            </CardContent>
          </Card>
        </Link>
      </section>

      {/* All Modules */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Learning Modules</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {modules.map((module) => (
            <Link key={module.id} href={module.href}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className={`h-1.5 bg-gradient-to-r ${module.color}`} />
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{module.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{module.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
