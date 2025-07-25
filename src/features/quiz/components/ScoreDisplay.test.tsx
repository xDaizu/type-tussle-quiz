import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ScoreDisplay from './ScoreDisplay';

describe('ScoreDisplay', () => {
  it('renders round and score information', () => {
    render(<ScoreDisplay round={3} score={2} totalRounds={10} />);
    
    expect(screen.getByText('3')).toBeDefined();
    expect(screen.getAllByText('/ 10')).toHaveLength(2); // One for round, one for score
    expect(screen.getByText('2')).toBeDefined();
    expect(screen.getByText('Round')).toBeDefined();
    expect(screen.getByText('Score')).toBeDefined();
  });

  it('renders game title and burger menu', () => {
    render(<ScoreDisplay round={1} score={0} totalRounds={5} />);
    
    expect(screen.getByText('Type Tussle Quiz')).toBeDefined();
    expect(screen.getByRole('button', { name: /open menu/i })).toBeDefined();
  });

  it('shows progress bar when round > 1', () => {
    render(<ScoreDisplay round={3} score={2} totalRounds={10} />);
    
    expect(screen.getByText('Progress')).toBeDefined();
  });
}); 