'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Lightbulb, RotateCcw, ArrowRight } from 'lucide-react';
import { hashString, getBucketIndex } from '@/lib/algorithms/maps';

type ExerciseType = 'hash-index' | 'collision' | 'load-factor' | 'rehash-position';

interface Exercise {
  type: ExerciseType;
  question: string;
  data: Record<string, unknown>;
  correctAnswer: number | string | number[];
  hint: string;
  explanation: string;
}

function generateExercise(type: ExerciseType): Exercise {
  const keys = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon', 'mango', 'orange'];
  const randomKey = () => keys[Math.floor(Math.random() * keys.length)];

  switch (type) {
    case 'hash-index': {
      const key = randomKey();
      const capacity = [4, 8, 16][Math.floor(Math.random() * 3)];
      const hashCode = hashString(key);
      const answer = getBucketIndex(hashCode, capacity);

      return {
        type,
        question: `What is the bucket index for key "${key}" in a HashMap with capacity ${capacity}?`,
        data: { key, capacity, hashCode },
        correctAnswer: answer,
        hint: `hashCode("${key}") = ${hashCode}. Use modulo operation.`,
        explanation: `${hashCode} % ${capacity} = ${answer}`,
      };
    }

    case 'collision': {
      const capacity = 8;
      // Pick keys that have same bucket index
      const allKeys = keys.slice(0, 8);
      const bucketMap: Record<number, string[]> = {};

      for (const key of allKeys) {
        const idx = getBucketIndex(hashString(key), capacity);
        if (!bucketMap[idx]) bucketMap[idx] = [];
        bucketMap[idx].push(key);
      }

      // Find a bucket with multiple keys (collision)
      const collisionBucket = Object.entries(bucketMap).find(([, v]) => v.length >= 2);

      if (collisionBucket) {
        const [idx, collidingKeys] = collisionBucket;
        return {
          type,
          question: `Which bucket will have a collision when adding these keys: ${collidingKeys.slice(0, 3).join(', ')}? (Capacity = ${capacity})`,
          data: { keys: collidingKeys.slice(0, 3), capacity },
          correctAnswer: parseInt(idx),
          hint: `Calculate the bucket index for each key using hashCode % ${capacity}`,
          explanation: `Keys ${collidingKeys.slice(0, 2).join(' and ')} both hash to bucket ${idx}`,
        };
      }

      // Fallback
      return generateExercise('hash-index');
    }

    case 'load-factor': {
      const size = Math.floor(Math.random() * 10) + 3;
      const capacity = [8, 16][Math.floor(Math.random() * 2)];
      const loadFactor = size / capacity;
      const threshold = Math.floor(capacity * 0.75);
      const willRehash = size > threshold;

      return {
        type,
        question: `HashMap has size=${size}, capacity=${capacity}. What is the load factor? (Answer as decimal, e.g., 0.5)`,
        data: { size, capacity, threshold, willRehash },
        correctAnswer: parseFloat(loadFactor.toFixed(2)),
        hint: `Load factor = size / capacity`,
        explanation: `${size} / ${capacity} = ${loadFactor.toFixed(2)}. Threshold is ${threshold} (capacity × 0.75). ${willRehash ? 'Rehashing IS needed!' : 'No rehashing needed yet.'}`,
      };
    }

    case 'rehash-position': {
      const key = randomKey();
      const oldCapacity = 8;
      const newCapacity = 16;
      const hashCode = hashString(key);
      const oldIndex = getBucketIndex(hashCode, oldCapacity);
      const newIndex = getBucketIndex(hashCode, newCapacity);

      return {
        type,
        question: `Key "${key}" is in bucket ${oldIndex} (capacity=8). After rehashing to capacity=16, which bucket will it be in?`,
        data: { key, oldCapacity, newCapacity, hashCode, oldIndex },
        correctAnswer: newIndex,
        hint: `hashCode("${key}") = ${hashCode}. Calculate new index with new capacity.`,
        explanation: `${hashCode} % ${newCapacity} = ${newIndex}`,
      };
    }

    default:
      return generateExercise('hash-index');
  }
}

export function HashMapPractice() {
  const [exerciseType, setExerciseType] = useState<ExerciseType>('hash-index');
  const [exercise, setExercise] = useState<Exercise>(() => generateExercise('hash-index'));
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const checkAnswer = useCallback(() => {
    const userNum = parseFloat(userAnswer);
    let correct = false;

    if (typeof exercise.correctAnswer === 'number') {
      correct = Math.abs(userNum - exercise.correctAnswer) < 0.01;
    } else if (Array.isArray(exercise.correctAnswer)) {
      correct = exercise.correctAnswer.includes(userNum);
    } else {
      correct = userAnswer.trim() === exercise.correctAnswer;
    }

    setIsCorrect(correct);
    setShowResult(true);
    setScore((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
    }));
  }, [userAnswer, exercise]);

  const nextExercise = useCallback(() => {
    setExercise(generateExercise(exerciseType));
    setUserAnswer('');
    setShowResult(false);
    setShowHint(false);
  }, [exerciseType]);

  const changeExerciseType = (type: ExerciseType) => {
    setExerciseType(type);
    setExercise(generateExercise(type));
    setUserAnswer('');
    setShowResult(false);
    setShowHint(false);
  };

  return (
    <div className="space-y-4">
      {/* Exercise Type Selection */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Practice Exercises</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={exerciseType === 'hash-index' ? 'default' : 'outline'}
              size="sm"
              onClick={() => changeExerciseType('hash-index')}
            >
              Hash Index
            </Button>
            <Button
              variant={exerciseType === 'collision' ? 'default' : 'outline'}
              size="sm"
              onClick={() => changeExerciseType('collision')}
            >
              Collisions
            </Button>
            <Button
              variant={exerciseType === 'load-factor' ? 'default' : 'outline'}
              size="sm"
              onClick={() => changeExerciseType('load-factor')}
            >
              Load Factor
            </Button>
            <Button
              variant={exerciseType === 'rehash-position' ? 'default' : 'outline'}
              size="sm"
              onClick={() => changeExerciseType('rehash-position')}
            >
              Rehash Position
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Score */}
      <div className="flex justify-end">
        <Badge variant="outline" className="text-sm">
          Score: {score.correct} / {score.total}
        </Badge>
      </div>

      {/* Exercise Card */}
      <Card>
        <CardContent className="p-6 space-y-4">
          {/* Question */}
          <div className="text-lg font-medium">{exercise.question}</div>

          {/* Additional Data Display */}
          {exercise.type === 'hash-index' && (
            <div className="p-3 bg-muted rounded-lg font-mono text-sm">
              hashCode("{(exercise.data as { key: string }).key}") = {(exercise.data as { hashCode: number }).hashCode}
            </div>
          )}

          {/* Answer Input */}
          <div className="flex gap-3 items-end">
            <div className="flex-1 space-y-1">
              <Label htmlFor="answer">Your Answer</Label>
              <Input
                id="answer"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer"
                disabled={showResult}
                onKeyDown={(e) => e.key === 'Enter' && !showResult && checkAnswer()}
              />
            </div>
            {!showResult ? (
              <Button onClick={checkAnswer} disabled={!userAnswer}>
                Check
              </Button>
            ) : (
              <Button onClick={nextExercise}>
                Next <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>

          {/* Hint */}
          {!showResult && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHint(true)}
              disabled={showHint}
              className="text-yellow-600"
            >
              <Lightbulb className="w-4 h-4 mr-1" />
              Show Hint
            </Button>
          )}

          <AnimatePresence>
            {showHint && !showResult && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-sm"
              >
                <strong>Hint:</strong> {exercise.hint}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result */}
          <AnimatePresence>
            {showResult && (
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
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="font-medium text-green-700">Correct!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-500" />
                      <span className="font-medium text-red-700">
                        Incorrect. Answer: {String(exercise.correctAnswer)}
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{exercise.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Reset */}
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => {
            setScore({ correct: 0, total: 0 });
            nextExercise();
          }}
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          Reset Score
        </Button>
      </div>
    </div>
  );
}
