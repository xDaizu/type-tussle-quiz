import { render, fireEvent } from '@testing-library/react';
import QuizGameOverScreen from './QuizGameOverScreen';
import React from 'react';

describe('QuizGameOverScreen', () => {
  it('displays score and result phrase', () => {
    const { getByText } = render(
      <QuizGameOverScreen score={7} totalRounds={10} resultPhrase="Great job!" onReset={() => {}} />
    );
    expect(getByText('Your Score:')).toBeInTheDocument();
    expect(getByText('7/10')).toBeInTheDocument();
    expect(getByText('Great job!')).toBeInTheDocument();
  });

  it('calls onReset when Play Again is clicked', () => {
    const onReset = vi.fn();
    const { getByText } = render(
      <QuizGameOverScreen score={5} totalRounds={10} resultPhrase="Try again!" onReset={onReset} />
    );
    fireEvent.click(getByText('Play Again'));
    expect(onReset).toHaveBeenCalled();
  });
}); 