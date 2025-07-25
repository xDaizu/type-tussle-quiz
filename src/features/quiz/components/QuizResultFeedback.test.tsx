import { render } from '@testing-library/react';
import QuizResultFeedback from './QuizResultFeedback';
import React from 'react';

describe('QuizResultFeedback', () => {
  const baseProps = {
    showResult: { correct: true, effectiveness: 2 },
    selectedEffectiveness: 2,
    attacker: { name: 'Bulbasaur', type: 'Grass' },
    feedbackText: 'Great job!',
  };

  it('displays correct result and feedback', () => {
    const { getByText } = render(<QuizResultFeedback {...baseProps} />);
    expect(getByText('Correct!')).toBeInTheDocument();
    expect(getByText('Great job!')).toBeInTheDocument();
  });

  it('displays wrong result when correct is false', () => {
    const { getByText } = render(
      <QuizResultFeedback {...baseProps} showResult={{ correct: false, effectiveness: 1 }} selectedEffectiveness={2} />
    );
    expect(getByText('Wrong!')).toBeInTheDocument();
  });
}); 