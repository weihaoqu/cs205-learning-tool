import { SortingVisualizer, SortingRace, SortingWithCode } from '@/components/visualizer/sorting';

export default function SortingPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Sorting Algorithms</h1>
        <p className="text-muted-foreground">
          Visualize and compare different sorting algorithms. Watch step-by-step how each
          algorithm organizes data, and understand their time and space complexity.
        </p>
      </div>

      <SortingVisualizer />

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Code Tracing</h2>
        <p className="text-muted-foreground mb-4">
          Watch the visualization alongside the Java code. The current line of execution
          is highlighted as the algorithm progresses.
        </p>
        <SortingWithCode />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Race Mode</h2>
        <p className="text-muted-foreground mb-4">
          Compare multiple algorithms simultaneously! Select the algorithms you want to race
          and watch them compete to sort the same array.
        </p>
        <SortingRace />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section className="p-4 rounded-lg bg-muted">
          <h2 className="text-xl font-semibold mb-4">Keyboard Shortcuts</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <kbd className="px-2 py-1 bg-background rounded border text-xs font-mono">
                Space
              </kbd>{' '}
              Play / Pause
            </li>
            <li>
              <kbd className="px-2 py-1 bg-background rounded border text-xs font-mono">
                ←
              </kbd>{' '}
              Step Backward
            </li>
            <li>
              <kbd className="px-2 py-1 bg-background rounded border text-xs font-mono">
                →
              </kbd>{' '}
              Step Forward
            </li>
            <li>
              <kbd className="px-2 py-1 bg-background rounded border text-xs font-mono">
                R
              </kbd>{' '}
              Reset
            </li>
          </ul>
        </section>

        <section className="p-4 rounded-lg bg-muted">
          <h2 className="text-xl font-semibold mb-4">Tips</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Use the speed slider to slow down or speed up the animation</li>
            <li>• Click Randomize to generate a new array</li>
            <li>• Step through manually to understand each operation</li>
            <li>• Compare algorithms by switching between them</li>
            <li>• Watch the comparison and swap counters to compare efficiency</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
