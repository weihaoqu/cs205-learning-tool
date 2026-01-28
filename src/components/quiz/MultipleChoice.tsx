'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { MultipleChoiceQuestion } from '@/types/exercise';

interface MultipleChoiceProps {
  question: MultipleChoiceQuestion;
  onAnswer: (isCorrect: boolean, selectedIndex: number) => void;
  showResult?: boolean;
}

export function MultipleChoice({
  question,
  onAnswer,
  showResult = false,
}: MultipleChoiceProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelect = (index: number) => {
    if (hasSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;

    const correct = selectedOption === question.correctAnswer;
    setIsCorrect(correct);
    setHasSubmitted(true);
    onAnswer(correct, selectedOption);
  };

  const getOptionStyle = (index: number) => {
    if (!hasSubmitted) {
      return selectedOption === index
        ? 'border-primary bg-primary/10'
        : 'border-border hover:border-primary/50 hover:bg-muted/50';
    }

    if (index === question.correctAnswer) {
      return 'border-green-500 bg-green-500/10';
    }

    if (index === selectedOption && !isCorrect) {
      return 'border-red-500 bg-red-500/10';
    }

    return 'border-border opacity-50';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{question.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground">{question.question}</p>

        {question.codeSnippet && (
          <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-lg text-sm overflow-x-auto">
            {question.codeSnippet}
          </pre>
        )}

        <div className="space-y-2">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={hasSubmitted}
              className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${getOptionStyle(
                index
              )}`}
              whileHover={!hasSubmitted ? { scale: 1.01 } : {}}
              whileTap={!hasSubmitted ? { scale: 0.99 } : {}}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                    selectedOption === index
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-muted-foreground'
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
                {hasSubmitted && index === question.correctAnswer && (
                  <span className="ml-auto text-green-500">✓</span>
                )}
                {hasSubmitted &&
                  index === selectedOption &&
                  !isCorrect && (
                    <span className="ml-auto text-red-500">✗</span>
                  )}
              </div>
            </motion.button>
          ))}
        </div>

        {!hasSubmitted && (
          <Button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="w-full"
          >
            Submit Answer
          </Button>
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
            <p className="text-sm text-muted-foreground">
              {question.explanation}
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
