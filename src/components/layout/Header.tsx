'use client';

import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CS205
          </span>
          <span className="hidden sm:inline-block text-sm text-muted-foreground">
            Data Structures
          </span>
        </Link>

        <nav className="ml-auto flex items-center space-x-4">
          <Link
            href="/modules"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Modules
          </Link>
          <Link
            href="/sandbox"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Sandbox
          </Link>
          <Link
            href="/quiz"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Quiz
          </Link>
        </nav>
      </div>
    </header>
  );
}
