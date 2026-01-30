'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, RotateCcw, Lightbulb } from 'lucide-react';
import { ArrayDisplay, ArrayLegend } from './ArrayDisplay';
import {
  generateSortingSteps,
  ALGORITHM_INFO,
  type SortingAlgorithm,
  type SortingStep,
} from '@/lib/algorithms/sorting';

interface SortingPracticeProps {
  algorithm: SortingAlgorithm;
  initialArray?: number[];
}

type PracticeState = 'selecting' | 'comparing' | 'deciding' | 'correct' | 'incorrect' | 'complete';

export function SortingPractice({
  algorithm,
  initialArray = [64, 34, 25, 12, 22, 11, 90],
}: SortingPracticeProps) {
  const [array, setArray] = useState<number[]>([...initialArray]);
  const [originalArray, setOriginalArray] = useState<number[]>([...initialArray]);
  const [steps, setSteps] = useState<SortingStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [practiceState, setPracticeState] = useState<PracticeState>('selecting');
  const [message, setMessage] = useState('Click two elements to compare them');
  const [sortedIndices, setSortedIndices] = useState<Set<number>>(new Set());
  const [mistakes, setMistakes] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  // Generate expected steps
  useEffect(() => {
    const newSteps = generateSortingSteps(algorithm, originalArray);
    setSteps(newSteps);
    setCurrentStepIndex(0);
    setArray([...originalArray]);
    setSelectedIndices([]);
    setPracticeState('selecting');
    setSortedIndices(new Set());
    setMistakes(0);
    setShowHint(false);
    setComparisons(0);
    setSwaps(0);
    setMessage(getInitialMessage());
  }, [originalArray, algorithm]);

  const getInitialMessage = () => {
    switch (algorithm) {
      case 'bubble':
        return 'Bubble Sort: Click two adjacent elements to compare them. Start from the left!';
      case 'selection':
        return 'Selection Sort: Find the minimum element in the unsorted portion. Click to compare!';
      case 'insertion':
        return 'Insertion Sort: Take the next unsorted element and insert it in the correct position.';
      case 'merge':
        return 'Merge Sort: This algorithm divides and conquers. Watch and learn the pattern!';
      case 'quick':
        return 'Quick Sort: Select a pivot, then partition elements around it.';
      case 'heap':
        return 'Heap Sort: Build a max-heap, then extract elements one by one.';
      default:
        return 'Click two elements to compare them';
    }
  };

  const getCurrentExpectedStep = (): SortingStep | null => {
    // Find the next compare or swap step
    for (let i = currentStepIndex; i < steps.length; i++) {
      const step = steps[i];
      if (step.type === 'compare' || step.type === 'swap') {
        return step;
      }
    }
    return null;
  };

  const advanceToNextActionStep = () => {
    let nextIndex = currentStepIndex + 1;
    while (nextIndex < steps.length) {
      const step = steps[nextIndex];
      if (step.type === 'compare' || step.type === 'swap') {
        break;
      }
      // Handle sorted indices
      if (step.type === 'sorted') {
        setSortedIndices(prev => {
          const newSet = new Set(prev);
          step.indices.forEach(i => newSet.add(i));
          return newSet;
        });
      }
      // Update array for intermediate steps
      setArray([...step.array]);
      nextIndex++;
    }

    if (nextIndex >= steps.length) {
      // Check if complete
      const lastStep = steps[steps.length - 1];
      if (lastStep?.type === 'complete') {
        setArray([...lastStep.array]);
        setSortedIndices(new Set(lastStep.array.map((_, i) => i)));
        setPracticeState('complete');
        setMessage(`Congratulations! You sorted the array with ${mistakes} mistakes.`);
      }
    }

    setCurrentStepIndex(nextIndex);
  };

  const handleElementClick = useCallback((index: number) => {
    if (practiceState === 'complete') return;

    // Toggle selection
    setSelectedIndices(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      }
      if (prev.length < 2) {
        return [...prev, index];
      }
      // Replace first selection
      return [prev[1], index];
    });
  }, [practiceState]);

  const handleCompare = useCallback(() => {
    if (selectedIndices.length !== 2) {
      setMessage('Please select exactly two elements to compare');
      return;
    }

    const expectedStep = getCurrentExpectedStep();
    if (!expectedStep) {
      setMessage('No more steps expected!');
      return;
    }

    const [i, j] = selectedIndices.sort((a, b) => a - b);
    const [expI, expJ] = expectedStep.indices.sort((a, b) => a - b);

    if (expectedStep.type === 'compare') {
      if (i === expI && j === expJ) {
        // Correct comparison
        setComparisons(prev => prev + 1);
        setPracticeState('deciding');
        setMessage(`Comparing ${array[i]} and ${array[j]}. Should we swap? (${array[i]} ${array[i] > array[j] ? '>' : '<='} ${array[j]})`);
        setShowHint(false);
      } else {
        // Wrong elements selected
        setMistakes(prev => prev + 1);
        setPracticeState('incorrect');
        setMessage(`Wrong elements! Expected to compare indices [${expI}, ${expJ}]. Try again!`);
        setTimeout(() => {
          setPracticeState('selecting');
          setSelectedIndices([]);
        }, 1500);
      }
    } else if (expectedStep.type === 'swap') {
      // Expected a swap, not a compare
      setMessage('These elements need to be swapped! Click the Swap button.');
      setPracticeState('deciding');
    }
  }, [selectedIndices, array, steps, currentStepIndex]);

  const handleSwap = useCallback(() => {
    if (selectedIndices.length !== 2) {
      setMessage('Please select exactly two elements to swap');
      return;
    }

    const expectedStep = getCurrentExpectedStep();

    // Check if a swap is expected
    const needsSwap = expectedStep?.type === 'swap' ||
      (practiceState === 'deciding' && array[selectedIndices[0]] > array[selectedIndices[1]]);

    if (!needsSwap) {
      setMistakes(prev => prev + 1);
      setMessage('No swap needed here! These elements are already in order.');
      setPracticeState('incorrect');
      setTimeout(() => {
        setPracticeState('selecting');
        setSelectedIndices([]);
        advanceToNextActionStep();
      }, 1500);
      return;
    }

    // Perform swap
    const [i, j] = selectedIndices;
    const newArray = [...array];
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    setArray(newArray);
    setSwaps(prev => prev + 1);

    setPracticeState('correct');
    setMessage(`Swapped ${newArray[j]} and ${newArray[i]}!`);

    setTimeout(() => {
      setPracticeState('selecting');
      setSelectedIndices([]);
      advanceToNextActionStep();
      setMessage(getInitialMessage());
    }, 800);
  }, [selectedIndices, array, practiceState]);

  const handleNoSwap = useCallback(() => {
    const expectedStep = getCurrentExpectedStep();

    // Check if we're at a compare step and no swap follows
    if (practiceState === 'deciding') {
      const [i, j] = selectedIndices;
      if (array[i] <= array[j]) {
        // Correct - no swap needed
        setPracticeState('correct');
        setMessage('Correct! No swap needed.');
        setTimeout(() => {
          setPracticeState('selecting');
          setSelectedIndices([]);
          advanceToNextActionStep();
          setMessage(getInitialMessage());
        }, 800);
      } else {
        // Wrong - swap was needed
        setMistakes(prev => prev + 1);
        setMessage(`Wrong! ${array[i]} > ${array[j]}, so we need to swap!`);
        setPracticeState('incorrect');
        setTimeout(() => {
          setPracticeState('deciding');
        }, 1500);
      }
    }
  }, [selectedIndices, array, practiceState]);

  const handleRandomize = useCallback(() => {
    const newArray = Array.from({ length: 8 }, () =>
      Math.floor(Math.random() * 99) + 1
    );
    setOriginalArray(newArray);
  }, []);

  const handleReset = useCallback(() => {
    setArray([...originalArray]);
    const newSteps = generateSortingSteps(algorithm, originalArray);
    setSteps(newSteps);
    setCurrentStepIndex(0);
    setSelectedIndices([]);
    setPracticeState('selecting');
    setSortedIndices(new Set());
    setMistakes(0);
    setShowHint(false);
    setComparisons(0);
    setSwaps(0);
    setMessage(getInitialMessage());
  }, [originalArray, algorithm]);

  const handleShowHint = useCallback(() => {
    const expectedStep = getCurrentExpectedStep();
    if (expectedStep) {
      setShowHint(true);
      setMessage(`Hint: Next step is to ${expectedStep.type} elements at indices [${expectedStep.indices.join(', ')}]`);
    }
  }, [steps, currentStepIndex]);

  const getComparing = () => {
    if (practiceState === 'deciding' || practiceState === 'comparing') {
      return selectedIndices;
    }
    return [];
  };

  const getSwapping = () => {
    if (practiceState === 'correct' && swaps > 0) {
      return selectedIndices;
    }
    return [];
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <CardTitle className="text-lg">
                Practice: {ALGORITHM_INFO[algorithm].name}
              </CardTitle>
              <Badge variant={practiceState === 'complete' ? 'default' : 'outline'}>
                {practiceState === 'complete' ? 'Complete!' : 'In Progress'}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handleRandomize}>
                New Array
              </Button>
              <Button size="sm" variant="outline" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Array display */}
          <div className="py-8 bg-muted/30 rounded-lg">
            <ArrayDisplay
              array={array}
              comparing={getComparing()}
              swapping={getSwapping()}
              sorted={Array.from(sortedIndices)}
              selected={selectedIndices}
              onElementClick={handleElementClick}
              interactive={practiceState !== 'complete'}
              size="lg"
            />
          </div>

          {/* Message display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={message}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`p-4 rounded-lg flex items-start gap-3 ${
                practiceState === 'incorrect'
                  ? 'bg-red-500/10 border border-red-500/30'
                  : practiceState === 'correct'
                  ? 'bg-green-500/10 border border-green-500/30'
                  : practiceState === 'complete'
                  ? 'bg-blue-500/10 border border-blue-500/30'
                  : 'bg-muted'
              }`}
            >
              {practiceState === 'incorrect' ? (
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              ) : practiceState === 'correct' || practiceState === 'complete' ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              ) : (
                <Lightbulb className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              )}
              <span className="text-sm">{message}</span>
            </motion.div>
          </AnimatePresence>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              onClick={handleCompare}
              disabled={selectedIndices.length !== 2 || practiceState === 'deciding' || practiceState === 'complete'}
              variant="outline"
            >
              Compare
            </Button>
            <Button
              onClick={handleSwap}
              disabled={selectedIndices.length !== 2 || practiceState === 'complete'}
              variant="default"
              className="bg-orange-500 hover:bg-orange-600"
            >
              Swap
            </Button>
            <Button
              onClick={handleNoSwap}
              disabled={practiceState !== 'deciding'}
              variant="outline"
            >
              No Swap Needed
            </Button>
            <Button
              onClick={handleShowHint}
              disabled={practiceState === 'complete'}
              variant="ghost"
              className="text-yellow-600"
            >
              <Lightbulb className="w-4 h-4 mr-1" />
              Hint
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{comparisons}</div>
              <div className="text-xs text-muted-foreground">Comparisons</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{swaps}</div>
              <div className="text-xs text-muted-foreground">Swaps</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-red-500">{mistakes}</div>
              <div className="text-xs text-muted-foreground">Mistakes</div>
            </div>
          </div>

          {/* Legend */}
          <ArrayLegend />
        </CardContent>
      </Card>

      {/* Algorithm info card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">How {ALGORITHM_INFO[algorithm].name} Works</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            {ALGORITHM_INFO[algorithm].description}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="font-medium">Best Case</div>
              <div className="text-muted-foreground font-mono">
                {ALGORITHM_INFO[algorithm].timeComplexity.best}
              </div>
            </div>
            <div>
              <div className="font-medium">Average Case</div>
              <div className="text-muted-foreground font-mono">
                {ALGORITHM_INFO[algorithm].timeComplexity.average}
              </div>
            </div>
            <div>
              <div className="font-medium">Worst Case</div>
              <div className="text-muted-foreground font-mono">
                {ALGORITHM_INFO[algorithm].timeComplexity.worst}
              </div>
            </div>
            <div>
              <div className="font-medium">Space</div>
              <div className="text-muted-foreground font-mono">
                {ALGORITHM_INFO[algorithm].spaceComplexity}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
