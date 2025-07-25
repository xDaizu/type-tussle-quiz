import React from 'react';

interface ScoreDisplayProps {
  round: number;
  score: number;
  totalRounds: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ round, score, totalRounds }) => (
  <div className="score-display">
    <span>Round: {round} / {totalRounds}</span>
    <span>Score: {score}</span>
  </div>
);

export default ScoreDisplay; 