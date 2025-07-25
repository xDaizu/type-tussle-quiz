import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useQuizTimer } from './useQuizTimer';

beforeEach(() => {
  vi.useFakeTimers();
});
afterEach(() => {
  vi.useRealTimers();
});

describe('useQuizTimer', () => {
  it('should call onAdvance after correct result timeout', () => {
    const onAdvance = vi.fn();
    const { rerender } = renderHook((props) => useQuizTimer(props), {
      initialProps: {
        showResult: null,
        onAdvance,
        currentRound: 1,
        totalRounds: 5,
      },
    });
    rerender({ showResult: { correct: true }, onAdvance, currentRound: 1, totalRounds: 5 });
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(onAdvance).toHaveBeenCalled();
  });

  it('should call onAdvance after incorrect result timeout', () => {
    const onAdvance = vi.fn();
    const { rerender } = renderHook((props) => useQuizTimer(props), {
      initialProps: {
        showResult: null,
        onAdvance,
        currentRound: 1,
        totalRounds: 5,
      },
    });
    rerender({ showResult: { correct: false }, onAdvance, currentRound: 1, totalRounds: 5 });
    act(() => {
      vi.advanceTimersByTime(2500);
    });
    expect(onAdvance).toHaveBeenCalled();
  });

  it('should allow manual advance after skipEnabled is true', () => {
    const onAdvance = vi.fn();
    const { result, rerender } = renderHook((props) => useQuizTimer(props), {
      initialProps: {
        showResult: null,
        onAdvance,
        currentRound: 1,
        totalRounds: 5,
      },
    });
    rerender({ showResult: { correct: true }, onAdvance, currentRound: 1, totalRounds: 5 });
    act(() => {
      vi.advanceTimersByTime(51); // skipEnabled becomes true
      result.current.manualAdvance();
    });
    expect(onAdvance).toHaveBeenCalled();
  });
}); 