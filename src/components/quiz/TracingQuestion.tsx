'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { TracingQuestion as TracingQuestionType } from '@/types/exercise';

interface TracingQuestionProps {
  question: TracingQuestionType;
  onAnswer: (isCorrect: boolean, userAnswer: string) => void;
}

export function TracingQuestion({ question, onAnswer }: TracingQuestionProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showSteps, setShowSteps] = useState(false);

  const handleSubmit = () => {
    if (!userAnswer.trim()) return;

    const correct =
      userAnswer.trim().toLowerCase() ===
      question.finalAnswer.trim().toLowerCase();
    setIsCorrect(correct);
    setHasSubmitted(true);
    onAnswer(correct, userAnswer);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{question.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground">{question.question}</p>

        <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-lg text-sm overflow-x-auto">
          {question.code}
        </pre>

        <div className="space-y-2">
          <label className="text-sm font-medium">Your Answer:</label>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={hasSubmitted}
            placeholder={
              question.answerType === 'array-state'
                ? 'e.g., [3, 5, 4, 2, 8]'
                : 'Enter your answer'
            }
            className="w-full p-3 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !hasSubmitted) {
                handleSubmit();
              }
            }}
          />
        </div>

        {!hasSubmitted && (
          <div className="flex gap-2">
            <Button
              onClick={handleSubmit}
              disabled={!userAnswer.trim()}
              className="flex-1"
            >
              Submit Answer
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowSteps(!showSteps)}
            >
              {showSteps ? 'Hide Steps' : 'Show Steps'}
            </Button>
          </div>
        )}

        {showSteps && !hasSubmitted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-2"
          >
            <p className="text-sm font-medium text-muted-foreground">
              Execution Steps:
            </p>
            <div className="space-y-1">
              {question.steps.map((step, index) => (
                <div
                  key={index}
                  className="p-2 bg-muted/50 rounded text-sm font-mono"
                >
                  <span className="text-muted-foreground">
                    Line {step.line}:{' '}
                  </span>
                  {Object.entries(step.variables).map(([key, value]) => (
                    <span key={key} className="mr-3">
                      <span className="text-blue-500">{key}</span>=
                      <span className="text-green-500">{value}</span>
                    </span>
                  ))}
                  {step.output && (
                    <span className="text-yellow-500 ml-2">→ {step.output}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {hasSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg ${
              isCorrect
                ? 'bg-green-500/10 border border-green-500/30'
                : 'bg-red-500/10 border border-red-500/30'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={isCorrect ? 'text-green-500' : 'text-red-500'}>
                {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
              </span>
              <span className="text-sm text-muted-foreground">
                +{isCorrect ? question.points : 0} points
              </span>
            </div>
            {!isCorrect && (
              <p className="text-sm">
                <span className="text-muted-foreground">Correct answer: </span>
                <span className="font-mono font-bold">
                  {question.finalAnswer}
                </span>
              </p>
            )}

            {/* Show execution steps after submission */}
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm font-medium mb-2">Execution Trace:</p>
              <div className="space-y-1">
                {question.steps.map((step, index) => (
                  <div
                    key={index}
                    className="p-2 bg-background/50 rounded text-sm font-mono"
                  >
                    <span className="text-muted-foreground">
                      Step {index + 1}:{' '}
                    </span>
                    {Object.entries(step.variables).map(([key, value]) => (
                      <span key={key} className="mr-3">
                        <span className="text-blue-400">{key}</span>=
                        <span className="text-green-400">{value}</span>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
