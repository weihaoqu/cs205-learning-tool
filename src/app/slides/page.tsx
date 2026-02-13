'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Presentation } from 'lucide-react';

const API = '/cs205';

const slides = [
  {
    title: 'Singly Linked Lists',
    file: 'linked-list-explained.html',
    topic: 'Lists',
    color: 'bg-green-500',
  },
  {
    title: 'Algorithm Analysis',
    file: 'algorithm-analysis-explained.html',
    topic: 'Complexity',
    color: 'bg-purple-500',
  },
  {
    title: 'Recursion',
    file: 'recursion-explained.html',
    topic: 'Recursion',
    color: 'bg-orange-500',
  },
  {
    title: 'Stacks',
    file: 'stacks-explained.html',
    topic: 'Stacks & Queues',
    color: 'bg-cyan-500',
  },
  {
    title: 'Queues',
    file: 'queues-explained.html',
    topic: 'Stacks & Queues',
    color: 'bg-cyan-500',
  },
  {
    title: 'ArrayLists & NodeLists',
    file: 'arraylists-explained.html',
    topic: 'Lists',
    color: 'bg-green-500',
  },
  {
    title: 'Priority Queues',
    file: 'priority-queues-explained.html',
    topic: 'Heaps',
    color: 'bg-sky-500',
  },
  {
    title: 'Heaps',
    file: 'heap-explained.html',
    topic: 'Heaps',
    color: 'bg-sky-500',
  },
  {
    title: 'Maps',
    file: 'maps-explained.html',
    topic: 'Maps',
    color: 'bg-amber-500',
  },
  {
    title: 'Hash Tables',
    file: 'hashtables-explained.html',
    topic: 'Maps',
    color: 'bg-amber-500',
  },
  {
    title: 'Trees',
    file: 'trees-explained.html',
    topic: 'Trees',
    color: 'bg-emerald-500',
  },
  {
    title: 'Graphs',
    file: 'graph-explained.html',
    topic: 'Graphs',
    color: 'bg-violet-500',
  },
  {
    title: 'Breadth-First Search (BFS)',
    file: 'bfs-explained.html',
    topic: 'Graphs',
    color: 'bg-violet-500',
  },
  {
    title: 'Depth-First Search (DFS)',
    file: 'dfs-explained.html',
    topic: 'Graphs',
    color: 'bg-violet-500',
  },
  {
    title: 'Shortest Path (Dijkstra)',
    file: 'shortest-path-explained.html',
    topic: 'Graphs',
    color: 'bg-violet-500',
  },
];

function trackSlideView(slideFile: string) {
  fetch(`${API}/api/tracking/slide`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slideFile }),
  }).catch(() => {});
}

export default function SlidesPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Lecture Slides</h1>
        <p className="text-muted-foreground">
          Interactive HTML slide decks covering CS205 Data Structures topics.
          Click any slide deck to view it full-screen with built-in navigation.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {slides.map((slide) => (
          <Link
            key={slide.file}
            href={`/slides/${slide.file}`}
            target="_blank"
            onClick={() => trackSlideView(slide.file)}
          >
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Presentation className="w-5 h-5 text-muted-foreground shrink-0" />
                  {slide.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-muted`}>
                  <span className={`w-2 h-2 rounded-full ${slide.color}`} />
                  {slide.topic}
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 p-4 rounded-lg bg-muted">
        <h2 className="text-lg font-semibold mb-2">Navigation Tips</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <ul className="space-y-2">
            <li>• Use arrow keys or on-screen buttons to navigate slides</li>
            <li>• A progress bar at the top shows your position</li>
          </ul>
          <ul className="space-y-2">
            <li>• Each deck opens in a new tab for full-screen viewing</li>
            <li>• Slides are self-contained and work offline</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
