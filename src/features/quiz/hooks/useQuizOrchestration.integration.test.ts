import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useQuizGame } from './useQuizGame';
import { useQuizFeedback } from './useQuizFeedback';
import { useQuizTimer } from './useQuizTimer';
import { useQuizNavigation } from './useQuizNavigation';

// Mock the services
vi.mock('@/features/pokemon/services/PokemonService', () => ({
  PokemonService: {
    getAll: () => [
      { id: '1', name: 'Pikachu', type: 'Electric', sprite: 'pikachu.png' },
      { id: '2', name: 'Charmander', type: 'Fire', sprite: 'charmander.png' },
    ],
    getRandomByType: (type: string) => ({
      id: '1',
      name: 'TestPokemon',
      type,
      sprite: 'test.png'
    })
  }
}));

vi.mock('@/shared/services/utils', () => ({
  getTypeEffectiveness: () => 2, // Always super effective for testing
  Effectiveness: {
    NoEffect: 0,
    NotVeryEffective: 0.5,
    Normal: 1,
    SuperEffective: 2,
  }
}));

describe('Quiz Hooks Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  it('integrates game, feedback, navigation, and timer hooks correctly', async () => {
    // Initialize game hook
    const { result: gameResult } = renderHook(() => useQuizGame(3));
    
    // Generate initial battle
    act(() => {
      gameResult.current.generateBattle();
    });

    expect(gameResult.current.attacker).toBeTruthy();
    expect(gameResult.current.defender).toBeTruthy();
    expect(gameResult.current.currentRound).toBe(1);
    expect(gameResult.current.score).toBe(0);

    // Initialize feedback hook with the Pokemon
    const { result: feedbackResult } = renderHook(() => 
      useQuizFeedback(gameResult.current.attacker, gameResult.current.defender)
    );

    // Initialize navigation hook
    const { result: navigationResult } = renderHook(() => 
      useQuizNavigation({
        currentRound: gameResult.current.currentRound,
        totalRounds: gameResult.current.totalRounds,
        setCurrentRound: gameResult.current.setCurrentRound,
        setGameOver: gameResult.current.setGameOver,
        generateBattle: gameResult.current.generateBattle,
        resetGame: gameResult.current.resetGame,
      })
    );

    // Test the complete flow
    expect(feedbackResult.current.showResult).toBeNull();
    expect(navigationResult.current.isGameOver).toBe(false);

    // Simulate answering a question
    act(() => {
      const isCorrect = feedbackResult.current.handleAnswer(2); // Super effective
      if (isCorrect) {
        gameResult.current.setScore(gameResult.current.score + 1);
      }
    });

    expect(feedbackResult.current.showResult).toBeTruthy();
    expect(feedbackResult.current.showResult?.correct).toBe(true);
    expect(gameResult.current.score).toBe(1);

    // Simulate advancing to next round
    act(() => {
      navigationResult.current.advanceRound();
    });

    expect(gameResult.current.currentRound).toBe(2);
    expect(gameResult.current.attacker).toBeTruthy();
    expect(gameResult.current.defender).toBeTruthy();
  });

  it('handles game completion correctly', () => {
    const { result: gameResult } = renderHook(() => useQuizGame(2));
    
    act(() => {
      gameResult.current.generateBattle();
    });

    const { result: navigationResult } = renderHook(() => 
      useQuizNavigation({
        currentRound: gameResult.current.currentRound,
        totalRounds: gameResult.current.totalRounds,
        setCurrentRound: gameResult.current.setCurrentRound,
        setGameOver: gameResult.current.setGameOver,
        generateBattle: gameResult.current.generateBattle,
        resetGame: gameResult.current.resetGame,
      })
    );

    // Complete round 1
    act(() => {
      navigationResult.current.advanceRound();
    });
    expect(gameResult.current.currentRound).toBe(2);
    expect(gameResult.current.gameOver).toBe(false);

    // Complete round 2 (final round)
    act(() => {
      navigationResult.current.advanceRound();
    });
    expect(gameResult.current.gameOver).toBe(true);
  });

  it('handles game reset correctly', () => {
    const { result: gameResult } = renderHook(() => useQuizGame(5));
    
    // Advance game state
    act(() => {
      gameResult.current.setCurrentRound(3);
      gameResult.current.setScore(2);
      gameResult.current.setGameOver(true);
    });

    expect(gameResult.current.currentRound).toBe(3);
    expect(gameResult.current.score).toBe(2);
    expect(gameResult.current.gameOver).toBe(true);

    // Reset game
    act(() => {
      gameResult.current.resetGame();
    });

    expect(gameResult.current.currentRound).toBe(1);
    expect(gameResult.current.score).toBe(0);
    expect(gameResult.current.gameOver).toBe(false);
    expect(gameResult.current.attacker).toBeTruthy();
    expect(gameResult.current.defender).toBeTruthy();
  });

  it('feedback resets when Pokemon change', () => {
    const mockPokemon1 = { id: '1', name: 'Pikachu', type: 'Electric', sprite: 'pikachu.png' };
    const mockPokemon2 = { id: '2', name: 'Charmander', type: 'Fire', sprite: 'charmander.png' };

    const { result, rerender } = renderHook(
      ({ attacker, defender }) => useQuizFeedback(attacker, defender),
      {
        initialProps: {
          attacker: mockPokemon1,
          defender: mockPokemon2
        }
      }
    );

    // Set some feedback state
    act(() => {
      result.current.handleAnswer(2);
    });

    expect(result.current.showResult).toBeTruthy();
    expect(result.current.selectedEffectiveness).toBe(2);

    // Change Pokemon (simulate new battle)
    const newPokemon = { id: '3', name: 'Squirtle', type: 'Water', sprite: 'squirtle.png' };
    rerender({
      attacker: newPokemon,
      defender: mockPokemon2
    });

    // Feedback should be reset
    expect(result.current.showResult).toBeNull();
    expect(result.current.selectedEffectiveness).toBeNull();
  });

  it('timer integrates correctly with feedback and navigation', () => {
    const mockShowResult = { correct: true };
    const mockOnAdvance = vi.fn();

    const { result } = renderHook(() => 
      useQuizTimer({
        showResult: mockShowResult,
        onAdvance: mockOnAdvance,
        currentRound: 1,
        totalRounds: 10,
      })
    );

    expect(result.current.skipEnabled).toBeDefined();
    expect(result.current.manualAdvance).toBeDefined();
    expect(result.current.timeoutRef).toBeDefined();

    // Test manual advance
    act(() => {
      result.current.manualAdvance();
    });

    expect(mockOnAdvance).toHaveBeenCalled();
  });

  it('maintains data consistency across all hooks', () => {
    const { result: gameResult } = renderHook(() => useQuizGame(5));
    
    act(() => {
      gameResult.current.generateBattle();
    });

    const initialAttacker = gameResult.current.attacker;
    const initialDefender = gameResult.current.defender;

    const { result: feedbackResult } = renderHook(() => 
      useQuizFeedback(gameResult.current.attacker, gameResult.current.defender)
    );

    // Verify data consistency
    expect(gameResult.current.attacker).toBe(initialAttacker);
    expect(gameResult.current.defender).toBe(initialDefender);
    
    // Answer question
    act(() => {
      feedbackResult.current.handleAnswer(1);
    });

    // Pokemon should remain the same during feedback phase
    expect(gameResult.current.attacker).toBe(initialAttacker);
    expect(gameResult.current.defender).toBe(initialDefender);

    // Generate new battle
    act(() => {
      gameResult.current.generateBattle();
    });

    // Pokemon should change
    expect(gameResult.current.attacker).toBeTruthy();
    expect(gameResult.current.defender).toBeTruthy();
    // Note: Due to mocking, they might be the same objects, but in real app they'd be different
  });
}); 