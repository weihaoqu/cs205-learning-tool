'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const API = '/cs205';

export function ExportButton({ semester }: { semester: string }) {
  const [loading, setLoading] = useState(false);

  async function handleExport() {
    setLoading(true);
    try {
      // This component owns its own fetch, so the cohort must be passed
      // explicitly -- it is not threaded through the dashboard's Promise.all.
      const res = await fetch(
        `${API}/api/admin/export?semester=${encodeURIComponent(semester)}`
      );
      if (!res.ok) throw new Error('Export failed');

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cs205-analytics-${semester}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      alert('Failed to export data.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button variant="outline" onClick={handleExport} disabled={loading}>
      <Download className="h-4 w-4 mr-2" />
      {loading ? 'Exporting...' : 'Export CSV'}
    </Button>
  );
}
