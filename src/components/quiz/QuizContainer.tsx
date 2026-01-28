'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MultipleChoice } from './MultipleChoice';
import { TracingQuestion } from './TracingQuestion';
import type { Quiz, Question, QuizResult } from '@/types/exercise';

interface QuizContainerProps {
  quiz: Quiz;
  onComplete?: (result: QuizResult) => void;
}

interface AnswerRecord {
  questionId: string;
  isCorrect: boolean;
  userAnswer: string | number;
  timeTaken: number;
}

export function QuizContainer({ quiz, onComplete }: QuizContainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  const currentQuestion = quiz.questions[currentIndex];
  const totalQuestions = quiz.questions.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const handleAnswer = useCallback(
    (isCorrect: boolean, userAnswer: string | number) => {
      const timeTaken = (Date.now() - questionStartTime) / 1000;

      setAnswers((prev) => [
        ...prev,
        {
          questionId: currentQuestion.id,
          isCorrect,
          userAnswer,
          timeTaken,
        },
      ]);
    },
    [currentQuestion.id, questionStartTime]
  );

  const handleNext = useCallback(() => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setQuestionStartTime(Date.now());
    } else {
      setIsComplete(true);

      const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
      const earnedPoints = answers.reduce((sum, a, i) => {
        return sum + (a.isCorrect ? quiz.questions[i].points : 0);
      }, 0);
      // Add current answer points if correct
      const lastAnswer = answers[answers.length - 1];
      const finalScore = lastAnswer?.isCorrect
        ? earnedPoints + currentQuestion.points
        : earnedPoints;

      const result: QuizResult = {
        quizId: quiz.id,
        score: finalScore,
        totalPoints,
        answers: answers.map((a) => ({
          ...a,
          userAnswer: a.userAnswer as string | number | number[],
        })),
        completedAt: new Date(),
      };

      onComplete?.(result);
    }
  }, [currentIndex, totalQuestions, answers, quiz, currentQuestion.points, onComplete]);

  const hasAnsweredCurrent = answers.length > currentIndex;

  const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
  const earnedPoints = answers.reduce((sum, a, i) => {
    return sum + (a.isCorrect ? quiz.questions[i].points : 0);
  }, 0);

  const correctCount = answers.filter((a) => a.isCorrect).length;
  const scorePercentage = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
  const passed = scorePercentage >= quiz.passingScore;

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Quiz Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div
              className={`text-center p-6 rounded-lg ${
                passed
                  ? 'bg-green-500/10 border border-green-500/30'
                  : 'bg-yellow-500/10 border border-yellow-500/30'
              }`}
            >
              <div className="text-4xl font-bold mb-2">
                {earnedPoints} / {totalPoints}
              </div>
              <div className="text-lg text-muted-foreground">
                {scorePercentage.toFixed(0)}% Score
              </div>
              <div className="mt-2">
                {passed ? (
                  <span className="text-green-500 font-medium">
                    ✓ Passed! (Required: {quiz.passingScore}%)
                  </span>
                ) : (
                  <span className="text-yellow-500 font-medium">
                    Keep practicing! (Required: {quiz.passingScore}%)
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-green-500">
                  {correctCount}
                </div>
                <div className="text-sm text-muted-foreground">Correct</div>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold text-red-500">
                  {totalQuestions - correctCount}
                </div>
                <div className="text-sm text-muted-foreground">Incorrect</div>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <div className="text-2xl font-bold">
                  {answers.reduce((sum, a) => sum + a.timeTaken, 0).toFixed(0)}s
                </div>
                <div className="text-sm text-muted-foreground">Total Time</div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Question Summary</h3>
              <div className="space-y-1">
                {quiz.questions.map((q, i) => {
                  const answer = answers[i];
                  return (
                    <div
                      key={q.id}
                      className={`flex items-center justify-between p-2 rounded ${
                        answer?.isCorrect ? 'bg-green-500/10' : 'bg-red-500/10'
                      }`}
                    >
                      <span className="text-sm">
                        {i + 1}. {q.title}
                      </span>
                      <span className="text-sm">
                        {answer?.isCorrect ? (
                          <span className="text-green-500">+{q.points} pts</span>
                        ) : (
                          <span className="text-red-500">0 pts</span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <Button
              className="w-full"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Progress Header */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span className="text-sm font-medium">
              Score: {earnedPoints} pts
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
        </CardContent>
      </Card>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {currentQuestion.type === 'multiple-choice' && (
            <MultipleChoice
              question={currentQuestion}
              onAnswer={handleAnswer}
            />
          )}
          {currentQuestion.type === 'tracing' && (
            <TracingQuestion
              question={currentQuestion}
              onAnswer={handleAnswer}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Next Button */}
      {hasAnsweredCurrent && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button onClick={handleNext} className="w-full">
            {currentIndex < totalQuestions - 1
              ? 'Next Question'
              : 'See Results'}
          </Button>
        </motion.div>
      )}
    </div>
  );
}
