import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useQuizGame } from './useQuizGame';

// Mock PokemonProvider for deterministic results
vi.mock('@/lib/PokemonProvider', () => ({
  PokemonProvider: {
    getAll: () => [{ id: 1, name: 'Bulbasaur', type: 'Grass' }, { id: 2, name: 'Charmander', type: 'Fire' }],
    getRandomByType: (type: string) => ({ id: 1, name: 'Bulbasaur', type }),
  },
}));

describe('useQuizGame', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useQuizGame(5));
    expect(result.current.currentRound).toBe(1);
    expect(result.current.score).toBe(0);
    expect(result.current.gameOver).toBe(false);
    expect(result.current.totalRounds).toBe(5);
    expect(result.current.attacker).toBeNull();
    expect(result.current.defender).toBeNull();
  });

  it('should generate a battle with attacker and defender', () => {
    const { result } = renderHook(() => useQuizGame(5));
    act(() => {
      result.current.generateBattle();
    });
    expect(result.current.attacker).not.toBeNull();
    expect(result.current.defender).not.toBeNull();
  });

  it('should reset the game state', () => {
    const { result } = renderHook(() => useQuizGame(5));
    act(() => {
      result.current.setScore(3);
      result.current.setCurrentRound(4);
      result.current.setGameOver(true);
      result.current.resetGame();
    });
    expect(result.current.currentRound).toBe(1);
    expect(result.current.score).toBe(0);
    expect(result.current.gameOver).toBe(false);
  });
}); 