import { create } from 'zustand';
import type { AnimationStep } from '@/types/animation';

interface AnimationState {
  // Current state
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  speed: number; // milliseconds per step

  // Step history
  steps: AnimationStep[];

  // Actions
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  reset: () => void;
  setSpeed: (speed: number) => void;
  setSteps: (steps: AnimationStep[]) => void;
  goToStep: (step: number) => void;

  // Computed
  getCurrentStep: () => AnimationStep | null;
  isAtStart: () => boolean;
  isAtEnd: () => boolean;
}

export const useAnimationStore = create<AnimationState>((set, get) => ({
  currentStep: 0,
  totalSteps: 0,
  isPlaying: false,
  speed: 500,
  steps: [],

  play: () => {
    set({ isPlaying: true });
  },

  pause: () => {
    set({ isPlaying: false });
  },

  togglePlay: () => {
    const { isPlaying, isAtEnd } = get();
    if (isAtEnd()) {
      // Reset to beginning if at end
      set({ currentStep: 0, isPlaying: true });
    } else {
      set({ isPlaying: !isPlaying });
    }
  },

  stepForward: () => {
    const { currentStep, totalSteps } = get();
    if (currentStep < totalSteps - 1) {
      set({ currentStep: currentStep + 1, isPlaying: false });
    }
  },

  stepBackward: () => {
    const { currentStep } = get();
    if (currentStep > 0) {
      set({ currentStep: currentStep - 1, isPlaying: false });
    }
  },

  reset: () => {
    set({ currentStep: 0, isPlaying: false });
  },

  setSpeed: (speed: number) => {
    set({ speed: Math.max(50, Math.min(2000, speed)) });
  },

  setSteps: (steps: AnimationStep[]) => {
    set({
      steps,
      totalSteps: steps.length,
      currentStep: 0,
      isPlaying: false,
    });
  },

  goToStep: (step: number) => {
    const { totalSteps } = get();
    const clampedStep = Math.max(0, Math.min(step, totalSteps - 1));
    set({ currentStep: clampedStep, isPlaying: false });
  },

  getCurrentStep: () => {
    const { steps, currentStep } = get();
    return steps[currentStep] ?? null;
  },

  isAtStart: () => {
    return get().currentStep === 0;
  },

  isAtEnd: () => {
    const { currentStep, totalSteps } = get();
    return currentStep >= totalSteps - 1;
  },
}));
