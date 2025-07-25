import { render } from '@testing-library/react';
import QuizActiveGame from './QuizActiveGame';
import React from 'react';

vi.mock('./ScoreDisplay', () => ({ default: () => <div>ScoreDisplay</div> }));
vi.mock('./BattleArena', () => ({ default: () => <div>BattleArena</div> }));
vi.mock('./QuizResultFeedback', () => ({ default: () => <div>QuizResultFeedback</div> }));
vi.mock('./QuizAnswerSection', () => ({ default: () => <div>QuizAnswerSection</div> }));

describe('QuizActiveGame', () => {
  const baseProps = {
    currentRound: 1,
    score: 0,
    totalRounds: 10,
    attacker: { name: 'Bulbasaur', type: 'Grass' },
    defender: { name: 'Charmander', type: 'Fire' },
    showResult: null,
    selectedEffectiveness: null,
    handleAnswer: vi.fn(),
    setScore: vi.fn(),
    feedbackText: '',
  };

  it('renders ScoreDisplay and BattleArena', () => {
    const { getByText } = render(<QuizActiveGame {...baseProps} />);
    expect(getByText('ScoreDisplay')).toBeInTheDocument();
    expect(getByText('Attacks')).toBeInTheDocument();
  });

  it('renders QuizResultFeedback when showResult is truthy', () => {
    const { getByText } = render(<QuizActiveGame {...baseProps} showResult={{ correct: true, effectiveness: 2 }} />);
    expect(getByText('QuizResultFeedback')).toBeInTheDocument();
  });

  it('renders QuizAnswerSection when showResult is falsy', () => {
    const { getByText } = render(<QuizActiveGame {...baseProps} showResult={null} />);
    expect(getByText('QuizAnswerSection')).toBeInTheDocument();
  });
}); 