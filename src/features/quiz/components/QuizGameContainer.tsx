import React from 'react';

interface QuizGameContainerProps {
  gameOver: boolean;
  children: React.ReactNode;
}

const QuizGameContainer: React.FC<QuizGameContainerProps> = ({ gameOver, children }) => {
  return (
    <div className={gameOver ? 'min-h-screen bg-arena-gradient flex items-center justify-center p-4' : 'min-h-screen bg-arena-gradient p-4'}>
      <div className={gameOver ? '' : 'max-w-4xl mx-auto'}>
        {children}
      </div>
    </div>
  );
};

export default QuizGameContainer; 