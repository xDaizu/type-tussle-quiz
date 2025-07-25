import React from 'react';
import { Card } from '@/shared/components/ui/ui/card';
import { quizAnswerOptions } from '@/lib/quizAnswerOptions';
import { Effectiveness } from '@/shared/services/utils';

interface QuizResultFeedbackProps {
  showResult: {
    correct: boolean;
    effectiveness: Effectiveness;
  };
  selectedEffectiveness: Effectiveness | null;
  attacker: any;
  feedbackText: string;
}

const getEffectivenessText = (effectiveness: Effectiveness) => {
  switch (effectiveness) {
    case Effectiveness.SuperEffective: return 'Super Effective!';
    case Effectiveness.NotVeryEffective: return 'Not Very Effective...';
    case Effectiveness.NoEffect: return 'It has no effect...';
    default: return 'Normal effectiveness';
  }
};

const QuizResultFeedback: React.FC<QuizResultFeedbackProps> = ({ showResult, selectedEffectiveness, attacker, feedbackText }) => {
  const correctOption = quizAnswerOptions.find(option => option.effectiveness === showResult.effectiveness);
  return (
    <Card className="mt-6 p-6 text-center shadow-card animate-bounce-in">
      <div className={`text-2xl font-bold mb-2 text-${showResult.correct ? 'super-effective' : 'not-very-effective'}`}>
        {showResult.correct ? '✅ Correct!' : '❌ Wrong!'}
      </div>
      <p id="effectiveness-text" className="text-lg">
        {showResult.correct ? (
          <span className={`font-bold inline-block px-3 py-1 rounded drop-shadow ${correctOption?.gradientClass || ''} ${correctOption?.textColorClass || ''} ${correctOption?.ringClass || ''}`}>
            {getEffectivenessText(showResult.effectiveness)} (×{showResult.effectiveness})
          </span>
        ) : (
          <>
            <span className="line-through text-gray-400 mr-2">
              {selectedEffectiveness !== null ? getEffectivenessText(selectedEffectiveness) + ` (×${selectedEffectiveness})` : ''}
            </span>
            <span className={`font-bold inline-block px-3 py-1 rounded drop-shadow ${correctOption?.gradientClass || ''} ${correctOption?.textColorClass || ''} ${correctOption?.ringClass || ''}`}>
              {getEffectivenessText(showResult.effectiveness)} (×{showResult.effectiveness})
            </span>
          </>
        )}
      </p>
      <p className="text-m">
        {feedbackText}
      </p>
    </Card>
  );
};

export default QuizResultFeedback; 