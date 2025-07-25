import { useRef, useEffect, useCallback } from 'react';

/**
 * useQuizTimer - Handles result display timing, skip functionality, and timer cleanup for the quiz.
 *
 * Manages setTimeout/clearTimeout for result display, enables skip after a short delay, and provides manual advance control.
 *
 * @param {Object} params
 * @param {{ correct: boolean } | null} params.showResult - The current result state (or null if not showing result)
 * @param {() => void} params.onAdvance - Callback to advance to the next round
 * @param {number} params.currentRound - The current round number
 * @param {number} params.totalRounds - The total number of rounds
 * @returns {Object} - Timer controls and skip state
 *
 * @example
 * useQuizTimer({ showResult, onAdvance, currentRound, totalRounds });
 */
export function useQuizTimer({
  showResult,
  onAdvance,
  currentRound,
  totalRounds,
}: {
  showResult: { correct: boolean } | null;
  onAdvance: () => void;
  currentRound: number;
  totalRounds: number;
}) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const skipEnabled = useRef(false);

  // Expose a function to manually advance (e.g., on click)
  const manualAdvance = useCallback(() => {
    if (!skipEnabled.current) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    onAdvance();
  }, [onAdvance]);

  useEffect(() => {
    if (!showResult) return;
    skipEnabled.current = false;
    const enableSkip = setTimeout(() => { skipEnabled.current = true; }, 50);

    // Set up timeout for auto-advance
    timeoutRef.current = setTimeout(manualAdvance, showResult.correct ? 1000 : 2500);

    // Set up click-to-skip
    const handleClick = () => manualAdvance();
    window.addEventListener('click', handleClick);

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      window.removeEventListener('click', handleClick);
      clearTimeout(enableSkip);
    };
  }, [showResult, manualAdvance, currentRound, totalRounds]);

  return {
    skipEnabled,
    manualAdvance,
    timeoutRef,
  };
} 