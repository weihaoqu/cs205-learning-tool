import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const modules = [
  {
    id: 'arrays',
    title: 'Arrays',
    description: 'Learn about 1D and 2D arrays, and sorting algorithms',
    topics: ['Basic Arrays', 'Sorting Algorithms', '2D Arrays'],
    color: 'from-blue-500 to-cyan-500',
  },
];

export default function Home() {
  return (
    <div className="container py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          CS205 Data Structures
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Interactive visualizations and exercises to master data structures and algorithms.
          Watch algorithms come to life, step through code execution, and practice with guided exercises.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Learning Modules</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <Card key={module.id} className="overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${module.color}`} />
              <CardHeader>
                <CardTitle>{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground mb-4 space-y-1">
                  {module.topics.map((topic) => (
                    <li key={topic} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {topic}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full">
                  <Link href={`/modules/${module.id}/basic-arrays`}>
                    Start Learning
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sandbox Mode</CardTitle>
            <CardDescription>
              Experiment freely with data structures without guided exercises
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/sandbox">Open Sandbox</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Practice Quiz</CardTitle>
            <CardDescription>
              Test your understanding with interactive quizzes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/quiz">Take Quiz</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
