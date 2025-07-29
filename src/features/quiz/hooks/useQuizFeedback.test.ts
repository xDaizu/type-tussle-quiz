import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useQuizFeedback } from './useQuizFeedback';
import { Effectiveness } from '@/shared/services/utils';

const attacker = { id: '1', name: 'Bulbasaur', type: 'Grass', sprite: 'bulbasaur.png' };
const defender = { id: '2', name: 'Squirtle', type: 'Water', sprite: 'squirtle.png' };

vi.mock('@/shared/services/utils', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getTypeEffectiveness: () => Effectiveness.SuperEffective,
  };
});

describe('useQuizFeedback', () => {
  it('should initialize with null state', () => {
    const { result } = renderHook(() => useQuizFeedback(attacker, defender));
    expect(result.current.showResult).toBeNull();
    expect(result.current.selectedEffectiveness).toBeNull();
  });

  it('should validate correct answer', () => {
    const { result } = renderHook(() => useQuizFeedback(attacker, defender));
    act(() => {
      const isCorrect = result.current.handleAnswer(Effectiveness.SuperEffective);
      expect(isCorrect).toBe(true);
    });
    expect(result.current.showResult?.correct).toBe(true);
    expect(result.current.showResult?.effectiveness).toBe(Effectiveness.SuperEffective);
    expect(result.current.selectedEffectiveness).toBe(Effectiveness.SuperEffective);
  });

  it('should validate incorrect answer', () => {
    const { result } = renderHook(() => useQuizFeedback(attacker, defender));
    act(() => {
      const isCorrect = result.current.handleAnswer(Effectiveness.NotVeryEffective);
      expect(isCorrect).toBe(false);
    });
    expect(result.current.showResult?.correct).toBe(false);
    expect(result.current.showResult?.effectiveness).toBe(Effectiveness.SuperEffective);
    expect(result.current.selectedEffectiveness).toBe(Effectiveness.NotVeryEffective);
  });

  it('should reset feedback state', () => {
    const { result } = renderHook(() => useQuizFeedback(attacker, defender));
    act(() => {
      result.current.handleAnswer(Effectiveness.SuperEffective);
      result.current.resetFeedback();
    });
    expect(result.current.showResult).toBeNull();
    expect(result.current.selectedEffectiveness).toBeNull();
  });
}); 