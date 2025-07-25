import { useCallback } from 'react';
import { QuizGameState } from './useQuizGame';
import { useQuizFeedback } from './useQuizFeedback';

/**
 * useQuizNavigation - Handles round progression, game completion detection, and game flow orchestration.
 *
 * Provides actions to advance to the next round or restart the game, and exposes game completion state.
 *
 * @param {Object} params - Game state and actions from useQuizGame
 * @returns {Object} - Navigation actions and completion state
 *
 * @example
 * const navigation = useQuizNavigation({
 *   currentRound, totalRounds, setCurrentRound, setGameOver, generateBattle, resetGame
 * });
 * navigation.advanceRound();
 */
export function useQuizNavigation({
  currentRound,
  totalRounds,
  setCurrentRound,
  setGameOver,
  generateBattle,
  resetGame,
}: Pick<QuizGameState, 'currentRound' | 'totalRounds' | 'setCurrentRound' | 'setGameOver' | 'generateBattle' | 'resetGame'>) {
  // Advance to next round or end game
  const advanceRound = useCallback(() => {
    if (currentRound >= totalRounds) {
      setGameOver(true);
    } else {
      setCurrentRound(currentRound + 1);
      generateBattle();
    }
  }, [currentRound, totalRounds, setCurrentRound, setGameOver, generateBattle]);

  // Reset navigation (for replay)
  const restartGame = useCallback(() => {
    resetGame();
  }, [resetGame]);

  return {
    advanceRound,
    restartGame,
    isGameOver: currentRound > totalRounds,
  };
} 