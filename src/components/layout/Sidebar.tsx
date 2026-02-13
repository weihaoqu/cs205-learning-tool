'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Module {
  id: string;
  title: string;
  topics: {
    id: string;
    title: string;
  }[];
}

const modules: Module[] = [
  {
    id: 'arrays',
    title: 'Arrays',
    topics: [
      { id: 'basic-arrays', title: 'Basic Arrays' },
      { id: 'sorting', title: 'Sorting (Quick)' },
      { id: '2d-arrays', title: '2D Arrays' },
    ],
  },
  {
    id: 'sorting',
    title: 'Sorting Algorithms',
    topics: [
      { id: '', title: 'Overview' },
      { id: 'bubble', title: 'Bubble Sort' },
      { id: 'selection', title: 'Selection Sort' },
      { id: 'insertion', title: 'Insertion Sort' },
      { id: 'merge', title: 'Merge Sort' },
      { id: 'quick', title: 'Quick Sort' },
      { id: 'heap', title: 'Heap Sort' },
      { id: 'comparison', title: 'Race & Compare' },
    ],
  },
  {
    id: 'lists',
    title: 'Lists',
    topics: [
      { id: 'arraylist', title: 'ArrayList' },
      { id: 'singly-linked', title: 'Singly Linked List' },
      { id: 'doubly-linked', title: 'Doubly Linked List' },
      { id: 'comparison', title: 'Comparison' },
    ],
  },
  {
    id: 'recursion',
    title: 'Recursion',
    topics: [
      { id: 'factorial', title: 'Factorial & Sum' },
      { id: 'fibonacci', title: 'Fibonacci' },
      { id: 'comparison', title: 'Recursion vs Iteration' },
    ],
  },
  {
    id: 'stack-queue',
    title: 'Stacks & Queues',
    topics: [
      { id: 'stack', title: 'Stack' },
      { id: 'queue', title: 'Queue' },
      { id: 'comparison', title: 'Comparison' },
    ],
  },
  {
    id: 'maps',
    title: 'Maps & HashTables',
    topics: [
      { id: '', title: 'Overview' },
      { id: 'hashing', title: 'Hashing Basics' },
      { id: 'hashmap', title: 'HashMap' },
      { id: 'hashset', title: 'HashSet' },
      { id: 'rehashing', title: 'Load Factor & Rehashing' },
      { id: 'practice', title: 'Practice' },
    ],
  },
  {
    id: 'complexity',
    title: 'Algorithm Complexity',
    topics: [
      { id: 'visualization', title: 'Growth Visualization' },
      { id: 'patterns', title: 'Code Patterns' },
      { id: 'practice', title: 'Practice & Reference' },
    ],
  },
  {
    id: 'searching',
    title: 'Searching Algorithms',
    topics: [
      { id: 'linear', title: 'Linear Search' },
      { id: 'binary', title: 'Binary Search' },
      { id: 'comparison', title: 'Comparison & Practice' },
    ],
  },
  {
    id: 'trees',
    title: 'Trees',
    topics: [
      { id: '', title: 'Overview' },
      { id: 'traversals', title: 'Traversals' },
      { id: 'practice', title: 'Applications & Practice' },
    ],
  },
  {
    id: 'heaps',
    title: 'Heaps & Priority Queues',
    topics: [
      { id: 'basics', title: 'Heap Basics' },
      { id: 'heapsort', title: 'Heapify & Heap Sort' },
      { id: 'priority-queue', title: 'Priority Queue' },
      { id: 'practice', title: 'Practice & Quiz' },
    ],
  },
  {
    id: 'graphs',
    title: 'Graphs',
    topics: [
      { id: '', title: 'Overview' },
      { id: 'bfs', title: 'BFS' },
      { id: 'dfs', title: 'DFS' },
      { id: 'dijkstra', title: "Dijkstra's Algorithm" },
      { id: 'practice', title: 'Practice & Quiz' },
    ],
  },
  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming',
    topics: [
      { id: 'fundamentals', title: 'Fundamentals' },
      { id: 'classic', title: 'Classic Problems' },
      { id: 'patterns', title: 'DP Patterns' },
      { id: 'practice', title: 'Practice & Quiz' },
    ],
  },
];

function getActiveModuleId(pathname: string): string | null {
  for (const mod of modules) {
    if (pathname.startsWith(`/modules/${mod.id}`)) return mod.id;
  }
  return null;
}

function CollapsibleSection({
  module,
  isExpanded,
  onToggle,
  pathname,
}: {
  module: Module;
  isExpanded: boolean;
  onToggle: () => void;
  pathname: string;
}) {
  const contentRef = useRef<HTMLUListElement>(null);
  const [height, setHeight] = useState<number | undefined>(
    isExpanded ? undefined : 0
  );

  // Measure and animate height changes
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (isExpanded) {
      // Expand: measure scrollHeight, set it explicitly, then clear after transition
      const scrollHeight = el.scrollHeight;
      setHeight(scrollHeight);
      const timer = setTimeout(() => setHeight(undefined), 200);
      return () => clearTimeout(timer);
    } else {
      // Collapse: set current height first so transition has a start value, then set to 0
      const scrollHeight = el.scrollHeight;
      setHeight(scrollHeight);
      // Force reflow so browser registers the starting height
      el.offsetHeight; // eslint-disable-line @typescript-eslint/no-unused-expressions
      requestAnimationFrame(() => setHeight(0));
    }
  }, [isExpanded]);

  const hasActiveTopic = pathname.startsWith(`/modules/${module.id}`);

  return (
    <div>
      <button
        onClick={onToggle}
        className={cn(
          'flex w-full items-center gap-1 rounded-md px-2 py-1.5 text-sm font-semibold transition-colors',
          hasActiveTopic
            ? 'text-foreground'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        <ChevronRight
          className={cn(
            'h-4 w-4 shrink-0 transition-transform duration-200',
            isExpanded && 'rotate-90'
          )}
        />
        {module.title}
      </button>
      <ul
        ref={contentRef}
        className="space-y-1 overflow-hidden transition-[height] duration-200 ease-in-out"
        style={{ height: height !== undefined ? `${height}px` : 'auto' }}
      >
        {module.topics.map((topic) => {
          const href = topic.id
            ? `/modules/${module.id}/${topic.id}`
            : `/modules/${module.id}`;
          const isActive = pathname === href;

          return (
            <li key={topic.id || 'overview'}>
              <Link
                href={href}
                className={cn(
                  'block rounded-md px-2 py-1.5 pl-7 text-sm transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {topic.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<Set<string>>(() => {
    const activeId = getActiveModuleId(pathname);
    return activeId ? new Set([activeId]) : new Set();
  });

  // Auto-expand the module for the current page when navigating
  useEffect(() => {
    const activeId = getActiveModuleId(pathname);
    if (activeId && !expanded.has(activeId)) {
      setExpanded((prev) => new Set(prev).add(activeId));
    }
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  return (
    <aside className="w-64 border-r bg-muted/30 p-4 hidden md:block">
      <nav className="space-y-1">
        {modules.map((module) => (
          <CollapsibleSection
            key={module.id}
            module={module}
            isExpanded={expanded.has(module.id)}
            onToggle={() => toggle(module.id)}
            pathname={pathname}
          />
        ))}
      </nav>
    </aside>
  );
}
