'use client';

import { useState } from 'react';
import { CodeEditorPanel } from '@/components/editor';
import { SortingVisualizer } from '@/components/visualizer/sorting';
import { Array2DVisualizer } from '@/components/visualizer/arrays2d';
import { ArrayVisualizer } from '@/components/visualizer/arrays';
import { Button } from '@/components/ui/button';

type VisualizerType = 'array' | 'sorting' | '2d-array';

export default function SandboxPage() {
  const [activeVisualizer, setActiveVisualizer] = useState<VisualizerType>('sorting');

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Sandbox Mode</h1>
        <p className="text-muted-foreground">
          Experiment freely with data structures and algorithms. Write code, run it,
          and see the results in real-time.
        </p>
      </div>

      {/* Visualizer Type Selector */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={activeVisualizer === 'array' ? 'default' : 'outline'}
          onClick={() => setActiveVisualizer('array')}
        >
          1D Array
        </Button>
        <Button
          variant={activeVisualizer === 'sorting' ? 'default' : 'outline'}
          onClick={() => setActiveVisualizer('sorting')}
        >
          Sorting
        </Button>
        <Button
          variant={activeVisualizer === '2d-array' ? 'default' : 'outline'}
          onClick={() => setActiveVisualizer('2d-array')}
        >
          2D Array
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: Visualizer */}
        <div>
          {activeVisualizer === 'array' && (
            <ArrayVisualizer
              initialArray={[64, 34, 25, 12, 22, 11, 90]}
              showIndices
              interactive
            />
          )}
          {activeVisualizer === 'sorting' && <SortingVisualizer />}
          {activeVisualizer === '2d-array' && <Array2DVisualizer />}
        </div>

        {/* Right: Code Editor */}
        <div>
          <CodeEditorPanel
            initialTemplate={
              activeVisualizer === 'sorting'
                ? 'bubbleSort'
                : activeVisualizer === '2d-array'
                ? 'twoDArray'
                : 'basicArray'
            }
            showTemplateSelector
            height="400px"
          />
        </div>
      </div>

      <div className="mt-8 p-4 rounded-lg bg-muted">
        <h2 className="text-xl font-semibold mb-4">Sandbox Tips</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div>
            <h3 className="font-medium text-foreground mb-2">Visualizer</h3>
            <ul className="space-y-1">
              <li>• Use play/pause controls to step through animations</li>
              <li>• Adjust speed with the slider</li>
              <li>• Click &quot;Randomize&quot; for new data</li>
              <li>• Keyboard: Space (play/pause), ← → (step)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-2">Code Editor</h3>
            <ul className="space-y-1">
              <li>• Select a template from the dropdown</li>
              <li>• Modify the code as you wish</li>
              <li>• Click &quot;Run&quot; to execute</li>
              <li>• Click &quot;Reset&quot; to restore the template</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
