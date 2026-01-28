import { ArrayVisualizer } from '@/components/visualizer/arrays/ArrayVisualizer';

export default function BasicArraysPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Basic Arrays</h1>
        <p className="text-muted-foreground">
          Learn the fundamentals of arrays: declaration, initialization, accessing elements,
          and basic operations like insertion and deletion.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="text-xl font-semibold mb-4">Array Visualization</h2>
          <ArrayVisualizer
            initialArray={[64, 34, 25, 12, 22, 11, 90]}
            showIndices
            interactive
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Key Concepts</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted">
              <h3 className="font-medium mb-2">What is an Array?</h3>
              <p className="text-sm text-muted-foreground">
                An array is a collection of elements stored at contiguous memory locations.
                Each element can be accessed using its index, starting from 0.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <h3 className="font-medium mb-2">Time Complexity</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><strong>Access:</strong> O(1) - Direct index access</li>
                <li><strong>Search:</strong> O(n) - Linear search</li>
                <li><strong>Insert:</strong> O(n) - May require shifting</li>
                <li><strong>Delete:</strong> O(n) - May require shifting</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
