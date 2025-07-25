import { render } from '@testing-library/react';
import QuizGameContainer from './QuizGameContainer';
import React from 'react';

describe('QuizGameContainer', () => {
  it('renders children', () => {
    const { getByText } = render(
      <QuizGameContainer gameOver={false}>
        <div>Child Content</div>
      </QuizGameContainer>
    );
    expect(getByText('Child Content')).toBeInTheDocument();
  });

  it('applies gameOver layout classes', () => {
    const { container } = render(
      <QuizGameContainer gameOver={true}>
        <div>Game Over</div>
      </QuizGameContainer>
    );
    expect(container.firstChild).toHaveClass('flex');
    expect(container.firstChild).toHaveClass('items-center');
  });

  it('applies normal layout classes when not game over', () => {
    const { container } = render(
      <QuizGameContainer gameOver={false}>
        <div>Not Over</div>
      </QuizGameContainer>
    );
    expect(container.firstChild).toHaveClass('p-4');
  });
}); 