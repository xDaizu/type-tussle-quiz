import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useQuizGame } from './useQuizGame';
import { PokemonService } from '@/features/pokemon/services/PokemonService';

// Mock the PokemonService
vi.mock('@/features/pokemon/services/PokemonService', () => ({
  PokemonService: {
    getAll: vi.fn(),
    getRandom: vi.fn(),
    getRandomByType: vi.fn(),
  },
}));

describe('useQuizGame', () => {
  const mockPokemon = {
    id: '1',
    name: 'Pikachu',
    type: 'Electric',
    sprite: 'pikachu.png',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock successful Pokemon generation
    vi.mocked(PokemonService.getRandomByType).mockReturnValue({
      success: true,
      data: mockPokemon,
    });
    
    vi.mocked(PokemonService.getRandom).mockReturnValue(mockPokemon);
  });

  it('should generate a battle with attacker and defender', () => {
    const { result } = renderHook(() => useQuizGame());

    act(() => {
      result.current.generateBattle();
    });

    expect(result.current.attacker).toBeDefined();
    expect(result.current.defender).toBeDefined();
    expect(PokemonService.getRandomByType).toHaveBeenCalled();
  });

  it('should reset the game state', () => {
    const { result } = renderHook(() => useQuizGame());

    // Set some initial state
    act(() => {
      result.current.setCurrentRound(5);
      result.current.setScore(100);
      result.current.setGameOver(true);
    });

    // Reset the game
    act(() => {
      result.current.resetGame();
    });

    expect(result.current.currentRound).toBe(1);
    expect(result.current.score).toBe(0);
    expect(result.current.gameOver).toBe(false);
    expect(result.current.attacker).toBeDefined();
    expect(result.current.defender).toBeDefined();
  });

  it('should handle Pokemon generation failures gracefully', () => {
    // Mock PokemonService to fail initially, then succeed
    vi.mocked(PokemonService.getRandomByType)
      .mockReturnValueOnce({ success: false, error: new Error('No Pokemon found') })
      .mockReturnValueOnce({ success: true, data: mockPokemon });

    const { result } = renderHook(() => useQuizGame());

    act(() => {
      result.current.generateBattle();
    });

    // Should still generate Pokemon using fallback
    expect(result.current.attacker).toBeDefined();
    expect(result.current.defender).toBeDefined();
  });
}); 