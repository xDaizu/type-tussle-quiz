import React from 'react';
import ScoreDisplay from './ScoreDisplay';
import BattleArena from '@/features/battle/components/BattleArena';
import QuizResultFeedback from './QuizResultFeedback';
import QuizAnswerSection from './QuizAnswerSection';
import { Effectiveness } from '@/shared/services/utils';
import { quizAnswerOptions } from '@/features/quiz/config/quizAnswerOptions';
import { Pokemon } from '@/features/quiz/hooks/useQuizGame';

interface QuizActiveGameProps {
  currentRound: number;
  score: number;
  totalRounds: number;
  attacker: Pokemon | null;
  defender: Pokemon | null;
  showResult: { correct: boolean; effectiveness: Effectiveness } | null;
  selectedEffectiveness: Effectiveness | null;
  handleAnswer: (effectiveness: Effectiveness) => boolean;
  setScore: (score: number) => void;
  feedbackText: string;
}

const QuizActiveGame: React.FC<QuizActiveGameProps> = ({
  currentRound,
  score,
  totalRounds,
  attacker,
  defender,
  showResult,
  selectedEffectiveness,
  handleAnswer,
  setScore,
  feedbackText,
}) => {
  return (
    <>
      <ScoreDisplay round={currentRound} score={score} totalRounds={totalRounds} />
      {attacker && defender ? (
        <BattleArena attacker={attacker} defender={defender} showResult={showResult} />
      ) : (
        <div className="p-4 text-center">
          <p>Loading Pokemon...</p>
        </div>
      )}
      <div className="min-h-[180px] overflow-hidden transition-all duration-300">
        {showResult ? (
          <QuizResultFeedback
            showResult={showResult}
            selectedEffectiveness={selectedEffectiveness}
            attacker={attacker}
            feedbackText={feedbackText}
          />
        ) : (
          <QuizAnswerSection
            options={quizAnswerOptions}
            onAnswer={(effectiveness) => {
              const isCorrect = handleAnswer(effectiveness);
              if (isCorrect) setScore(score + 1);
            }}
          />
        )}
      </div>
    </>
  );
};

export default QuizActiveGame; 