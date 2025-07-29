import { useState, useCallback } from 'react';
import { PokemonType } from '@/features/pokemon/types/PokemonType';
import { PokemonService, type Pokemon } from '@/features/pokemon/services/PokemonService';
import { InvalidBattleGenerationError } from '@/shared/types/Errors';

export interface QuizGameState {
  currentRound: number;
  score: number;
  attacker: Pokemon | null;
  defender: Pokemon | null;
  gameOver: boolean;
  totalRounds: number;
  generateBattle: () => void;
  resetGame: () => void;
  setCurrentRound: (round: number) => void;
  setScore: (score: number) => void;
  setGameOver: (over: boolean) => void;
}

/**
 * useQuizGame - Core game state and logic for the Pokemon Type Tussle Quiz.
 *
 * Manages the main game state: current round, score, attacker/defender Pokemon, game over state, and total rounds.
 * Provides actions to generate a new battle and reset the game.
 *
 * @param {number} totalRounds - Total number of rounds in the quiz (default: 10)
 * @returns {QuizGameState} - Game state and actions for the quiz UI
 *
 * @example
 * const game = useQuizGame(10);
 * // Access game.currentRound, game.score, game.attacker, etc.
 * // Call game.generateBattle() or game.resetGame() as needed
 */
export function useQuizGame(totalRounds: number = 10): QuizGameState {
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState(0);
  const [attacker, setAttacker] = useState<Pokemon | null>(null);
  const [defender, setDefender] = useState<Pokemon | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const getRandomType = useCallback((): PokemonType => {
    const types = Object.values(PokemonType);
    return types[Math.floor(Math.random() * types.length)];
  }, []);

  const generateBattle = useCallback(() => {
    const maxAttempts = 50; // Increased for better reliability
    let attempts = 0;
    
    // Generate attacker
    let randomAttacker: Pokemon | null = null;
    while (!randomAttacker && attempts < maxAttempts) {
      const attackerType = getRandomType();
      const attackerResult = PokemonService.getRandomByType(attackerType);
      
      if (attackerResult.success) {
        randomAttacker = attackerResult.data;
      }
      attempts++;
    }
    
    if (!randomAttacker) {
      // Fallback to random Pokemon if type-specific generation fails
      randomAttacker = PokemonService.getRandom();
    }
    
    // Generate defender
    attempts = 0;
    let randomDefender: Pokemon | null = null;
    while (!randomDefender && attempts < maxAttempts) {
      const defenderType = getRandomType();
      const defenderResult = PokemonService.getRandomByType(defenderType);
      
      if (defenderResult.success) {
        randomDefender = defenderResult.data;
      }
      attempts++;
    }
    
    if (!randomDefender) {
      // Fallback to random Pokemon if type-specific generation fails
      randomDefender = PokemonService.getRandom();
    }
    
    setAttacker(randomAttacker);
    setDefender(randomDefender);
  }, [getRandomType]);

  const resetGame = useCallback(() => {
    setCurrentRound(1);
    setScore(0);
    setGameOver(false);
    generateBattle();
  }, [generateBattle]);

  return {
    currentRound,
    score,
    attacker,
    defender,
    gameOver,
    totalRounds,
    generateBattle,
    resetGame,
    setCurrentRound,
    setScore,
    setGameOver,
  };
} 