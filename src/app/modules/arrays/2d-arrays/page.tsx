import { Array2DVisualizer } from '@/components/visualizer/arrays2d';

export default function TwoDArraysPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">2D Arrays (Matrices)</h1>
        <p className="text-muted-foreground">
          Explore two-dimensional arrays and learn different traversal patterns.
          Watch how each traversal visits cells in a specific order.
        </p>
      </div>

      <Array2DVisualizer />

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section className="p-4 rounded-lg bg-muted">
          <h2 className="text-xl font-semibold mb-4">Key Concepts</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <strong>Row-Major:</strong> Standard traversal, row by row. Used in most
              programming languages for memory layout.
            </li>
            <li>
              <strong>Column-Major:</strong> Column by column traversal. Used in languages
              like Fortran and MATLAB.
            </li>
            <li>
              <strong>Spiral:</strong> Clockwise from outside to inside. Common interview
              question pattern.
            </li>
            <li>
              <strong>Diagonal:</strong> Traverses along diagonal lines. Useful for matrix
              operations and pattern recognition.
            </li>
          </ul>
        </section>

        <section className="p-4 rounded-lg bg-muted">
          <h2 className="text-xl font-semibold mb-4">Java Syntax</h2>
          <pre className="text-sm bg-background p-3 rounded overflow-x-auto">
{`// Declare 2D array
int[][] matrix = new int[rows][cols];

// Initialize with values
int[][] matrix = {
  {1, 2, 3},
  {4, 5, 6},
  {7, 8, 9}
};

// Access element
int value = matrix[row][col];

// Row-major traversal
for (int i = 0; i < rows; i++) {
  for (int j = 0; j < cols; j++) {
    System.out.print(matrix[i][j]);
  }
}`}
          </pre>
        </section>
      </div>

      <div className="mt-8 p-4 rounded-lg bg-muted">
        <h2 className="text-xl font-semibold mb-4">Keyboard Shortcuts</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
          <div>
            <kbd className="px-2 py-1 bg-background rounded border text-xs font-mono">Space</kbd>
            {' '}Play / Pause
          </div>
          <div>
            <kbd className="px-2 py-1 bg-background rounded border text-xs font-mono">←</kbd>
            {' '}Step Back
          </div>
          <div>
            <kbd className="px-2 py-1 bg-background rounded border text-xs font-mono">→</kbd>
            {' '}Step Forward
          </div>
          <div>
            <kbd className="px-2 py-1 bg-background rounded border text-xs font-mono">R</kbd>
            {' '}Reset
          </div>
        </div>
      </div>
    </div>
  );
}
