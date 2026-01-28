import { ExerciseCard } from '@/components/exercises';
import { allExercises } from '@/content/exercises/arrays';

export default function ExercisesPage() {
  const beginnerExercises = allExercises.filter((ex) => ex.difficulty === 'beginner');
  const intermediateExercises = allExercises.filter((ex) => ex.difficulty === 'intermediate');
  const advancedExercises = allExercises.filter((ex) => ex.difficulty === 'advanced');

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Guided Exercises</h1>
        <p className="text-muted-foreground">
          Learn by doing! These step-by-step exercises will guide you through implementing
          common algorithms and data structure operations.
        </p>
      </div>

      {beginnerExercises.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500" />
            Beginner
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {beginnerExercises.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </div>
        </section>
      )}

      {intermediateExercises.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            Intermediate
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {intermediateExercises.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </div>
        </section>
      )}

      {advancedExercises.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            Advanced
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {advancedExercises.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-8 p-4 rounded-lg bg-muted">
        <h2 className="text-xl font-semibold mb-4">How Guided Exercises Work</h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</span>
              <span className="font-medium text-foreground">Read the instruction</span>
            </div>
            <p>Each step has a clear explanation of what to do next.</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">2</span>
              <span className="font-medium text-foreground">Write the code</span>
            </div>
            <p>Fill in the blanks in the code editor. Use hints if you get stuck.</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">3</span>
              <span className="font-medium text-foreground">Check and learn</span>
            </div>
            <p>Submit your answer to get instant feedback and explanations.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
