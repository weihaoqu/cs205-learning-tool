'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SortingVisualizer } from './SortingVisualizer';
import { SortingPractice } from './SortingPractice';
import { SortingWithCode } from './SortingWithCode';
import { ALGORITHM_INFO, type SortingAlgorithm } from '@/lib/algorithms/sorting';

interface AlgorithmPageProps {
  algorithm: SortingAlgorithm;
  explanation: {
    howItWorks: string[];
    pseudocode: string;
    advantages: string[];
    disadvantages: string[];
    useCases: string[];
  };
}

export function AlgorithmPage({ algorithm, explanation }: AlgorithmPageProps) {
  const [mode, setMode] = useState<'watch' | 'practice' | 'code'>('watch');
  const info = ALGORITHM_INFO[algorithm];

  return (
    <div className="container py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">{info.name}</h1>
          <Badge variant="outline" className="font-mono">
            {info.timeComplexity.average}
          </Badge>
        </div>
        <p className="text-muted-foreground text-lg">
          {info.description}
        </p>
      </div>

      {/* Mode Tabs */}
      <Tabs value={mode} onValueChange={(v) => setMode(v as typeof mode)} className="mb-6">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="watch">Watch</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>

        <TabsContent value="watch" className="mt-4">
          <SortingVisualizer initialAlgorithm={algorithm} />
        </TabsContent>

        <TabsContent value="practice" className="mt-4">
          <SortingPractice algorithm={algorithm} />
        </TabsContent>

        <TabsContent value="code" className="mt-4">
          <SortingWithCode initialAlgorithm={algorithm} />
        </TabsContent>
      </Tabs>

      {/* Explanation Section */}
      <div className="grid gap-6 md:grid-cols-2 mt-8">
        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              {explanation.howItWorks.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Pseudocode */}
        <Card>
          <CardHeader>
            <CardTitle>Pseudocode</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
              {explanation.pseudocode}
            </pre>
          </CardContent>
        </Card>

        {/* Complexity Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Complexity Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium mb-2">Time Complexity</div>
                <div className="space-y-1 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Best:</span>
                    <span className="font-mono text-green-600">{info.timeComplexity.best}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average:</span>
                    <span className="font-mono text-amber-600">{info.timeComplexity.average}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Worst:</span>
                    <span className="font-mono text-red-600">{info.timeComplexity.worst}</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="font-medium mb-2">Space Complexity</div>
                <div className="text-muted-foreground">
                  <span className="font-mono">{info.spaceComplexity}</span>
                </div>
                <div className="mt-4">
                  <div className="font-medium mb-2">Stable Sort?</div>
                  <Badge variant={info.stable ? 'default' : 'secondary'}>
                    {info.stable ? 'Yes' : 'No'}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pros and Cons */}
        <Card>
          <CardHeader>
            <CardTitle>Advantages & Disadvantages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div>
                <div className="font-medium text-green-600 mb-2">Advantages</div>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {explanation.advantages.map((adv, idx) => (
                    <li key={idx}>{adv}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-medium text-red-600 mb-2">Disadvantages</div>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {explanation.disadvantages.map((dis, idx) => (
                    <li key={idx}>{dis}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Use Cases */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>When to Use {info.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
            {explanation.useCases.map((use, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-primary">•</span>
                {use}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
