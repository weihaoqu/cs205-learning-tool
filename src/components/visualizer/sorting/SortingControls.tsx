'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface SortingControlsProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}

export function SortingControls({
  currentStep,
  totalSteps,
  isPlaying,
  speed,
  onPlay,
  onPause,
  onStepForward,
  onStepBackward,
  onReset,
  onSpeedChange,
}: SortingControlsProps) {
  const isAtStart = currentStep === 0;
  const isAtEnd = currentStep >= totalSteps - 1;
  const progress = totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case ' ':
          e.preventDefault();
          if (isPlaying) {
            onPause();
          } else if (!isAtEnd) {
            onPlay();
          } else {
            onReset();
            setTimeout(onPlay, 50);
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (!isAtEnd) onStepForward();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (!isAtStart) onStepBackward();
          break;
        case 'r':
        case 'R':
          e.preventDefault();
          onReset();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isAtStart, isAtEnd, onPlay, onPause, onStepForward, onStepBackward, onReset]);

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
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={onReset}
            disabled={isAtStart}
            title="Reset (R)"
          >
            ⏮
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onStepBackward}
            disabled={isAtStart}
            title="Step Back (←)"
          >
            ⏪
          </Button>
          <Button
            size="sm"
            onClick={() => (isPlaying ? onPause() : onPlay())}
            disabled={totalSteps === 0}
            title="Play/Pause (Space)"
            className="w-12"
          >
            {isPlaying ? '⏸' : '▶'}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onStepForward}
            disabled={isAtEnd}
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
            onValueChange={([value]) => onSpeedChange(2000 - value)}
            min={0}
            max={1900}
            step={50}
            className="w-24"
          />
          <span className="text-xs text-muted-foreground w-14">
            {speed}ms
          </span>
        </div>
      </div>
    </div>
  );
}
