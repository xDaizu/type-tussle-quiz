import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useQuizNavigation } from './useQuizNavigation';

describe('useQuizNavigation', () => {
  it('should advance round and call generateBattle', () => {
    const setCurrentRound = vi.fn();
    const setGameOver = vi.fn();
    const generateBattle = vi.fn();
    const resetGame = vi.fn();
    const currentRound = 1;
    const totalRounds = 3;
    const { result } = renderHook(() => useQuizNavigation({
      currentRound,
      totalRounds,
      setCurrentRound,
      setGameOver,
      generateBattle,
      resetGame,
    }));
    act(() => {
      result.current.advanceRound();
    });
    expect(setCurrentRound).toHaveBeenCalledWith(2);
    expect(generateBattle).toHaveBeenCalled();
    expect(setGameOver).not.toHaveBeenCalled();
  });

  it('should set game over when last round is reached', () => {
    const setCurrentRound = vi.fn();
    const setGameOver = vi.fn();
    const generateBattle = vi.fn();
    const resetGame = vi.fn();
    const currentRound = 3;
    const totalRounds = 3;
    const { result } = renderHook(() => useQuizNavigation({
      currentRound,
      totalRounds,
      setCurrentRound,
      setGameOver,
      generateBattle,
      resetGame,
    }));
    act(() => {
      result.current.advanceRound();
    });
    expect(setGameOver).toHaveBeenCalledWith(true);
    expect(setCurrentRound).not.toHaveBeenCalledWith(4);
  });

  it('should restart the game', () => {
    const setCurrentRound = vi.fn();
    const setGameOver = vi.fn();
    const generateBattle = vi.fn();
    const resetGame = vi.fn();
    const currentRound = 2;
    const totalRounds = 3;
    const { result } = renderHook(() => useQuizNavigation({
      currentRound,
      totalRounds,
      setCurrentRound,
      setGameOver,
      generateBattle,
      resetGame,
    }));
    act(() => {
      result.current.restartGame();
    });
    expect(resetGame).toHaveBeenCalled();
  });
}); 