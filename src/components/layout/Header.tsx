'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, LayoutDashboard } from 'lucide-react';

const API = '/cs205';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'ADMIN';
}

export function Header() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`${API}/api/auth/me`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) setUser(data.user);
      })
      .catch(() => {});
  }, []);

  async function handleLogout() {
    await fetch(`${API}/api/auth/logout`, { method: 'POST' });
    setUser(null);
    router.push('/login');
    router.refresh();
  }

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
            href="/slides"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Slides
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

          {user && (
            <>
              {user.role === 'ADMIN' && (
                <Link
                  href="/admin"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
              )}

              <span className="text-sm text-muted-foreground hidden md:inline">
                {user.name}
              </span>

              <Button
                variant="ghost"
                size="icon-sm"
                onClick={handleLogout}
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
