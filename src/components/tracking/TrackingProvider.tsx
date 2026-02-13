'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';

const API = '/cs205';
const SKIP_PATHS = ['/login', '/register'];

export function TrackingProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const visitIdRef = useRef<string | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const sendPageLeave = useCallback(() => {
    if (!visitIdRef.current) return;

    const duration = (Date.now() - startTimeRef.current) / 1000;
    const body = JSON.stringify({ visitId: visitIdRef.current, duration });

    // Use sendBeacon for reliability during page unload
    if (navigator.sendBeacon) {
      navigator.sendBeacon(`${API}/api/tracking/pageleave`, new Blob([body], { type: 'application/json' }));
    } else {
      fetch(`${API}/api/tracking/pageleave`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      }).catch(() => {});
    }

    visitIdRef.current = null;
  }, []);

  useEffect(() => {
    // Skip tracking for auth pages
    if (SKIP_PATHS.some((p) => pathname === p)) return;

    // Send leave for previous page
    sendPageLeave();

    // Track new page visit
    startTimeRef.current = Date.now();

    fetch(`${API}/api/tracking/pagevisit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: pathname }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.visitId) visitIdRef.current = data.visitId;
      })
      .catch(() => {});

    // Handle page visibility changes and unload
    function handleVisibilityChange() {
      if (document.visibilityState === 'hidden') {
        sendPageLeave();
      }
    }

    function handleBeforeUnload() {
      sendPageLeave();
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname, sendPageLeave]);

  return <>{children}</>;
}
