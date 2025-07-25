import { useState, useEffect } from 'react';
import { getTypeEffectiveness, Effectiveness } from '@/shared/services/utils';
import { PokemonType } from '@/features/pokemon/types/PokemonType';
import { Pokemon } from './useQuizGame';

export type EffectivenessType = Effectiveness;

/**
 * useQuizFeedback - Handles answer validation, result feedback, and effectiveness calculation for the quiz.
 *
 * Manages result state (showResult), selected effectiveness, and provides a handler for answer selection.
 *
 * @param {Pokemon | null} attacker - The attacking Pokemon
 * @param {Pokemon | null} defender - The defending Pokemon
 * @returns {Object} - Feedback state and validation functions
 *
 * @example
 * const feedback = useQuizFeedback(attacker, defender);
 * feedback.handleAnswer(Effectiveness.SuperEffective);
 */
export function useQuizFeedback(attacker: Pokemon | null, defender: Pokemon | null) {
  const [showResult, setShowResult] = useState<{
    correct: boolean;
    effectiveness: Effectiveness;
  } | null>(null);
  const [selectedEffectiveness, setSelectedEffectiveness] = useState<Effectiveness | null>(null);

  useEffect(() => {
    if (!showResult) setSelectedEffectiveness(null);
  }, [showResult]);

  // Reset feedback when Pokemon change (new battle)
  useEffect(() => {
    setShowResult(null);
    setSelectedEffectiveness(null);
  }, [attacker, defender]);

  const handleAnswer = (selected: Effectiveness) => {
    if (!attacker || !defender || showResult) return;
    const correctEffectiveness = getTypeEffectiveness(attacker.type as PokemonType, defender.type as PokemonType);
    const isCorrect = selected === correctEffectiveness;
    setSelectedEffectiveness(selected);
    setShowResult({ correct: isCorrect, effectiveness: correctEffectiveness });
    return isCorrect;
  };

  const resetFeedback = () => {
    setShowResult(null);
    setSelectedEffectiveness(null);
  };

  return {
    showResult,
    setShowResult,
    selectedEffectiveness,
    setSelectedEffectiveness,
    handleAnswer,
    resetFeedback,
  };
} 