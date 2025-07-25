import { useState } from 'react';
import { PokemonType } from '@/features/pokemon/types/PokemonType';
import { PokemonProvider } from '@/features/pokemon/services/PokemonProvider';

export type Pokemon = ReturnType<typeof PokemonProvider.getAll>[number];

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

  const pokemonList = PokemonProvider.getAll();

  const getRandomType = (): PokemonType => {
    const types = Object.values(PokemonType);
    return types[Math.floor(Math.random() * types.length)];
  };

  const generateBattle = () => {
    let randomAttacker = null;
    let randomDefender = null;
    let attackerType: PokemonType;
    let defenderType: PokemonType;

    while (!randomAttacker) {
      try {
        attackerType = getRandomType();
        randomAttacker = PokemonProvider.getRandomByType(attackerType);
      } catch (e) {}
    }
    while (!randomDefender) {
      try {
        defenderType = getRandomType();
        randomDefender = PokemonProvider.getRandomByType(defenderType);
      } catch (e) {}
    }
    setAttacker(randomAttacker);
    setDefender(randomDefender);
  };

  const resetGame = () => {
    setCurrentRound(1);
    setScore(0);
    setGameOver(false);
    generateBattle();
  };

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