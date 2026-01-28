'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CodeEditor } from '@/components/editor/CodeEditor';
import type { GuidedExercise as GuidedExerciseType, ExerciseStep } from '@/types/guided-exercise';

interface GuidedExerciseProps {
  exercise: GuidedExerciseType;
  onComplete?: () => void;
}

interface StepStatus {
  completed: boolean;
  attempts: number;
}

export function GuidedExercise({ exercise, onComplete }: GuidedExerciseProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [code, setCode] = useState(exercise.steps[0]?.codeTemplate || exercise.starterCode);
  const [stepStatuses, setStepStatuses] = useState<Record<string, StepStatus>>({});
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const currentStep = exercise.steps[currentStepIndex];
  const totalSteps = exercise.steps.length;
  const completedSteps = Object.values(stepStatuses).filter((s) => s.completed).length;
  const progress = (completedSteps / totalSteps) * 100;

  const validateStep = useCallback((step: ExerciseStep, userCode: string): boolean => {
    const { validation } = step;
    const normalizedCode = userCode.replace(/\s+/g, ' ').trim();
    const normalizedValue = validation.value.replace(/\s+/g, ' ').trim();

    switch (validation.type) {
      case 'exact':
        return normalizedCode === normalizedValue;
      case 'contains':
        return normalizedCode.includes(normalizedValue);
      case 'regex':
        return new RegExp(validation.value).test(userCode);
      default:
        return false;
    }
  }, []);

  const handleCheckAnswer = useCallback(() => {
    const isCorrect = validateStep(currentStep, code);

    setStepStatuses((prev) => ({
      ...prev,
      [currentStep.id]: {
        completed: isCorrect,
        attempts: (prev[currentStep.id]?.attempts || 0) + 1,
      },
    }));

    if (isCorrect) {
      setFeedback({
        type: 'success',
        message: 'Correct! ' + currentStep.explanation,
      });
      setShowHint(false);
    } else {
      setFeedback({
        type: 'error',
        message: 'Not quite right. Check your code and try again.',
      });
    }
  }, [currentStep, code, validateStep]);

  const handleNextStep = useCallback(() => {
    if (currentStepIndex < totalSteps - 1) {
      const nextStep = exercise.steps[currentStepIndex + 1];
      setCurrentStepIndex(currentStepIndex + 1);
      setCode(nextStep.codeTemplate);
      setFeedback(null);
      setShowHint(false);
    } else {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentStepIndex, totalSteps, exercise.steps, onComplete]);

  const handleShowSolution = useCallback(() => {
    // Replace the blank with the solution
    const solutionCode = code.replace(/_{3,}/g, currentStep.solution.split('\n')[0]);
    setCode(solutionCode);
  }, [code, currentStep.solution]);

  const isStepCompleted = stepStatuses[currentStep?.id]?.completed;

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center text-green-600">
              🎉 Exercise Complete!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-center text-muted-foreground">
              Great job! You&apos;ve completed the &quot;{exercise.title}&quot; exercise.
            </p>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-green-500">{completedSteps}</div>
                <div className="text-sm text-muted-foreground">Steps Completed</div>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold">{exercise.estimatedTime} min</div>
                <div className="text-sm text-muted-foreground">Est. Time</div>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold capitalize">{exercise.difficulty}</div>
                <div className="text-sm text-muted-foreground">Difficulty</div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">What you learned:</h3>
              <ul className="space-y-1">
                {exercise.objectives.map((obj, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-green-500">✓</span> {obj}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Final Solution:</h3>
              <CodeEditor
                value={exercise.finalSolution}
                language="java"
                height="300px"
                readOnly
              />
            </div>

            <Button className="w-full" onClick={() => window.location.href = '/exercises'}>
              Back to Exercises
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress Header */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">{exercise.title}</span>
            <span className="text-sm text-muted-foreground">
              Step {currentStepIndex + 1} of {totalSteps}
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          {/* Step indicators */}
          <div className="flex justify-between mt-2">
            {exercise.steps.map((step, i) => (
              <div
                key={step.id}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  stepStatuses[step.id]?.completed
                    ? 'bg-green-500 text-white'
                    : i === currentStepIndex
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {stepStatuses[step.id]?.completed ? '✓' : i + 1}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Step */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{currentStep.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{currentStep.instruction}</p>

          {/* Hint Button */}
          {currentStep.hint && !showHint && !isStepCompleted && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHint(true)}
            >
              💡 Show Hint
            </Button>
          )}

          {/* Hint Display */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30"
              >
                <p className="text-sm">
                  <span className="font-medium">💡 Hint: </span>
                  {currentStep.hint}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Code Editor */}
          <CodeEditor
            value={code}
            onChange={setCode}
            language="java"
            height="300px"
            readOnly={isStepCompleted}
          />

          {/* Feedback */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-4 rounded-lg ${
                  feedback.type === 'success'
                    ? 'bg-green-500/10 border border-green-500/30'
                    : 'bg-red-500/10 border border-red-500/30'
                }`}
              >
                <p className="text-sm">{feedback.message}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {!isStepCompleted ? (
              <>
                <Button onClick={handleCheckAnswer} className="flex-1">
                  Check Answer
                </Button>
                {(stepStatuses[currentStep.id]?.attempts || 0) >= 2 && (
                  <Button variant="outline" onClick={handleShowSolution}>
                    Show Solution
                  </Button>
                )}
              </>
            ) : (
              <Button onClick={handleNextStep} className="flex-1">
                {currentStepIndex < totalSteps - 1 ? 'Next Step →' : 'Complete Exercise 🎉'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Objectives Sidebar */}
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm">Learning Objectives</CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <ul className="space-y-1">
            {exercise.objectives.map((obj, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {obj}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
