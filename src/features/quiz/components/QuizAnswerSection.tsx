import React from 'react';
import QuizAnswerButton from './QuizAnswerButton';

interface QuizAnswerOption {
  effectiveness: number;
  label: string;
  multiplier: string;
  gradientClass?: string;
  textColorClass?: string;
  ringClass?: string;
  onMouseOverBoxShadow?: string;
  onMouseOutBoxShadow?: string;
}

interface QuizAnswerSectionProps {
  options: QuizAnswerOption[];
  onAnswer: (effectiveness: number) => void;
  disabled?: boolean;
}

const QuizAnswerSection: React.FC<QuizAnswerSectionProps> = ({ options, onAnswer, disabled }) => (
  <div className="mt-2 p-2 shadow-card border-0 bg-white rounded">
    <h2 className="text-l font-bold mb-2 text-center text-foreground">
      How effective is this attack?
    </h2>
    <div className="grid grid-cols-2 gap-2">
      {options.map(option => (
        <QuizAnswerButton
          key={option.effectiveness}
          label={option.label}
          multiplier={option.multiplier}
          onClick={() => onAnswer(option.effectiveness)}
          gradientClass={option.gradientClass}
          textColorClass={option.textColorClass}
          ringClass={option.ringClass}
          onMouseOverBoxShadow={option.onMouseOverBoxShadow}
          onMouseOutBoxShadow={option.onMouseOutBoxShadow}
          disabled={disabled}
        />
      ))}
    </div>
  </div>
);

export default QuizAnswerSection; 