import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ModulesPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Learning Modules</h1>
      <p className="text-muted-foreground mb-8">
        Select a topic from the sidebar or choose a module below to get started.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/modules/arrays/basic-arrays">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle>Arrays</CardTitle>
              <CardDescription>
                Master 1D and 2D arrays with interactive visualizations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Basic Array Operations</li>
                <li>Sorting Algorithms</li>
                <li>2D Arrays and Matrices</li>
              </ul>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
