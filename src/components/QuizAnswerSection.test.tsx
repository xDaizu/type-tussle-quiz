import { render, fireEvent } from '@testing-library/react';
import QuizAnswerSection from './QuizAnswerSection';
import React from 'react';

vi.mock('./QuizAnswerButton', () => ({ default: (props: any) => <button onClick={props.onClick}>{props.label}</button> }));

describe('QuizAnswerSection', () => {
  const options = [
    { effectiveness: 2, label: 'Super Effective', multiplier: 2 },
    { effectiveness: 1, label: 'Normal', multiplier: 1 },
  ];

  it('renders answer buttons', () => {
    const { getByText } = render(
      <QuizAnswerSection options={options} onAnswer={() => {}} />
    );
    expect(getByText('Super Effective')).toBeInTheDocument();
    expect(getByText('Normal')).toBeInTheDocument();
  });

  it('calls onAnswer when a button is clicked', () => {
    const onAnswer = vi.fn();
    const { getByText } = render(
      <QuizAnswerSection options={options} onAnswer={onAnswer} />
    );
    fireEvent.click(getByText('Super Effective'));
    expect(onAnswer).toHaveBeenCalledWith(2);
  });
}); 