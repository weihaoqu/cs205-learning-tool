'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useAnimationStore } from '@/stores/animationStore';

export function StepControls() {
  const {
    currentStep,
    totalSteps,
    isPlaying,
    speed,
    togglePlay,
    stepForward,
    stepBackward,
    reset,
    setSpeed,
    isAtStart,
    isAtEnd,
  } = useAnimationStore();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance when playing
  useEffect(() => {
    if (isPlaying && !isAtEnd()) {
      intervalRef.current = setInterval(() => {
        const { isAtEnd: checkEnd, stepForward: advance, pause } = useAnimationStore.getState();
        if (checkEnd()) {
          pause();
        } else {
          advance();
        }
      }, speed);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, speed]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowRight':
          e.preventDefault();
          stepForward();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          stepBackward();
          break;
        case 'r':
        case 'R':
          e.preventDefault();
          reset();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, stepForward, stepBackward, reset]);

  const progress = totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={reset}
            disabled={isAtStart()}
            title="Reset (R)"
          >
            ⏮
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={stepBackward}
            disabled={isAtStart()}
            title="Step Back (←)"
          >
            ⏪
          </Button>
          <Button
            size="sm"
            onClick={togglePlay}
            disabled={totalSteps === 0}
            title="Play/Pause (Space)"
          >
            {isPlaying ? '⏸' : '▶'}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={stepForward}
            disabled={isAtEnd()}
            title="Step Forward (→)"
          >
            ⏩
          </Button>
        </div>

        {/* Step counter */}
        <div className="text-sm text-muted-foreground">
          Step {totalSteps > 0 ? currentStep + 1 : 0} of {totalSteps}
        </div>

        {/* Speed control */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Speed:</span>
          <Slider
            value={[2000 - speed]}
            onValueChange={([value]) => setSpeed(2000 - value)}
            min={0}
            max={1950}
            step={50}
            className="w-24"
          />
          <span className="text-xs text-muted-foreground w-12">
            {speed}ms
          </span>
        </div>
      </div>
    </div>
  );
}
