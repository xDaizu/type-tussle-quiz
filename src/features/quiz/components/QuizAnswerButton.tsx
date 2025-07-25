import React from 'react';

interface QuizAnswerButtonProps {
  label: string;
  multiplier: string;
  onClick: () => void;
  colorClass?: string;
  gradientClass?: string;
  textColorClass?: string;
  ringClass?: string;
  style?: React.CSSProperties;
  onMouseOverBoxShadow?: string;
  onMouseOutBoxShadow?: string;
}

const QuizAnswerButton: React.FC<QuizAnswerButtonProps> = ({
  label,
  multiplier,
  onClick,
  gradientClass = '',
  textColorClass = '',
  ringClass = '',
  style = {},
  onMouseOverBoxShadow = '',
  onMouseOutBoxShadow = '',
}) => (
  <button
    onClick={onClick}
    className={`w-full py-3 px-2 rounded-lg font-bold shadow-md transition-all duration-200 text-lg border-2 border-transparent focus:outline-none ${gradientClass} ${textColorClass} ${ringClass}`}
    style={style}
    onMouseOver={e => (e.currentTarget.style.boxShadow = onMouseOverBoxShadow)}
    onMouseOut={e => (e.currentTarget.style.boxShadow = onMouseOutBoxShadow)}
  >
    <span>{label}</span>
    <span className="ml-2 text-base font-normal">{multiplier}</span>
  </button>
);

export default QuizAnswerButton; 