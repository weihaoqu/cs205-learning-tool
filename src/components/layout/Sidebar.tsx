'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
      { id: 'sorting', title: 'Sorting Algorithms' },
      { id: '2d-arrays', title: '2D Arrays' },
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
    id: 'complexity',
    title: 'Algorithm Complexity',
    topics: [
      { id: 'visualization', title: 'Growth Visualization' },
      { id: 'patterns', title: 'Code Patterns' },
      { id: 'practice', title: 'Practice & Reference' },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-muted/30 p-4 hidden md:block">
      <nav className="space-y-4">
        {modules.map((module) => (
          <div key={module.id}>
            <h3 className="mb-2 px-2 text-sm font-semibold text-foreground">
              {module.title}
            </h3>
            <ul className="space-y-1">
              {module.topics.map((topic) => {
                const href = `/modules/${module.id}/${topic.id}`;
                const isActive = pathname === href;

                return (
                  <li key={topic.id}>
                    <Link
                      href={href}
                      className={cn(
                        'block rounded-md px-2 py-1.5 text-sm transition-colors',
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
        ))}
      </nav>
    </aside>
  );
}
