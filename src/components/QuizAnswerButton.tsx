import React from 'react';

interface QuizAnswerButtonProps {
  label: string;
  multiplier: string;
  onClick: () => void;
  colorClass: string;
  style: React.CSSProperties;
  textColorClass: string;
  ringClass: string;
  onMouseOverBoxShadow: string;
  onMouseOutBoxShadow: string;
}

const QuizAnswerButton: React.FC<QuizAnswerButtonProps> = ({
  label,
  multiplier,
  onClick,
  colorClass,
  style,
  textColorClass,
  ringClass,
  onMouseOverBoxShadow,
  onMouseOutBoxShadow,
}) => (
  <button
    onClick={onClick}
    className={`group relative h-16 text-lg font-bold rounded-2xl border-2 shadow-lg transition-all duration-300 focus:outline-none ${ringClass}`}
    style={style}
    onMouseOver={e => (e.currentTarget.style.boxShadow = onMouseOverBoxShadow)}
    onMouseOut={e => (e.currentTarget.style.boxShadow = onMouseOutBoxShadow)}
  >
    <div className={`flex flex-col items-center justify-center h-full ${textColorClass} drop-shadow-md`}>
      <span className="text-lg font-bold">{label}</span>
      <span className="text-sm opacity-75">({multiplier})</span>
    </div>
  </button>
);

export default QuizAnswerButton; 