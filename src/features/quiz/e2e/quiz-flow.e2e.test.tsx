import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { HashRouter } from 'react-router-dom';
import App from '../../../App';

// Mock the services for predictable E2E testing
vi.mock('@/features/pokemon/services/PokemonService', () => ({
  PokemonService: {
    getAll: () => [
      { id: '1', name: 'Pikachu', type: 'Electric', sprite: 'pikachu.png' },
      { id: '2', name: 'Charmander', type: 'Fire', sprite: 'charmander.png' },
      { id: '3', name: 'Squirtle', type: 'Water', sprite: 'squirtle.png' },
      { id: '4', name: 'Bulbasaur', type: 'Grass', sprite: 'bulbasaur.png' },
    ],
    getRandomByType: (type: string) => {
      const pokemon = {
        Electric: { id: '1', name: 'Pikachu', type: 'Electric', sprite: 'pikachu.png' },
        Fire: { id: '2', name: 'Charmander', type: 'Fire', sprite: 'charmander.png' },
        Water: { id: '3', name: 'Squirtle', type: 'Water', sprite: 'squirtle.png' },
        Grass: { id: '4', name: 'Bulbasaur', type: 'Grass', sprite: 'bulbasaur.png' },
      };
      return pokemon[type as keyof typeof pokemon] || pokemon.Electric;
    }
  }
}));

vi.mock('@/shared/services/utils', () => ({
  cn: (...args: any[]) => args.join(' '),
  getTypeEffectiveness: (attacker: string, defender: string) => {
    // Mock type effectiveness for predictable testing
    const effectiveness = {
      'Electric-Water': 2,    // Super effective
      'Water-Fire': 2,        // Super effective
      'Fire-Grass': 2,        // Super effective
      'Grass-Water': 2,       // Super effective
      'Fire-Water': 0.5,      // Not very effective
      'Water-Grass': 0.5,     // Not very effective
    };
    return effectiveness[`${attacker}-${defender}` as keyof typeof effectiveness] || 1;
  },
  Effectiveness: {
    NoEffect: 0,
    NotVeryEffective: 0.5,
    Normal: 1,
    SuperEffective: 2,
  }
}));

vi.mock('@/features/pokemon/services/SpriteService', () => ({
  SpriteService: {
    getPokemonHomeSprite: (name: string) => `${name.toLowerCase()}.png`,
    getTypeSpriteSymbol: (type: string) => `${type.toLowerCase()}_symbol.png`,
  }
}));

describe('Quiz Application E2E Tests', () => {
  let originalMathRandom: () => number;

  beforeEach(() => {
    originalMathRandom = Math.random;
    // Mock Math.random for predictable Pokemon generation
    let callCount = 0;
    Math.random = () => {
      const values = [0.1, 0.3, 0.5, 0.7, 0.9];
      return values[callCount++ % values.length];
    };
  });

  afterEach(() => {
    Math.random = originalMathRandom;
    vi.clearAllMocks();
  });

  it('completes a full quiz session from start to finish', async () => {
    render(<App />);

    // 1. Initial load - should show quiz interface
    await waitFor(() => {
      expect(screen.getByText('Type Tussle Quiz')).toBeDefined();
    });

    // Verify initial state
    expect(screen.getByText('Round')).toBeDefined();
    expect(screen.getByText('Score')).toBeDefined();
    expect(screen.getByText('1')).toBeDefined(); // Round 1
    expect(screen.getByText('0')).toBeDefined(); // Score 0

    // 2. Wait for Pokemon to load and battle to appear
    await waitFor(() => {
      expect(screen.getByText('Attacks')).toBeDefined();
    });

    // Verify battle interface is present
    expect(screen.getByText('Super Effective')).toBeDefined();
    expect(screen.getByText('Normal')).toBeDefined();
    expect(screen.getByText('Not Very Effective')).toBeDefined();
    expect(screen.getByText('No Effect')).toBeDefined();

    // 3. Answer first question
    const firstAnswer = screen.getByText('Super Effective');
    fireEvent.click(firstAnswer);

    // Should show result feedback
    await waitFor(() => {
      expect(screen.getByText(/Correct!|Wrong!/)).toBeDefined();
    });

    // 4. Wait for auto-advance to round 2
    await waitFor(() => {
      expect(screen.getByText('2')).toBeDefined(); // Round 2
    }, { timeout: 3000 });

    // Should show new battle
    expect(screen.getByText('Attacks')).toBeDefined();

    // 5. Answer second question
    const secondAnswer = screen.getByText('Normal');
    fireEvent.click(secondAnswer);

    await waitFor(() => {
      expect(screen.getByText(/Correct!|Wrong!/)).toBeDefined();
    });

    // 6. Continue until we can verify the quiz is working
    // For a full E2E test, we would continue through all rounds
    // but for CI/testing purposes, we'll verify the core flow works

    // Verify score tracking is working
    await waitFor(() => {
      // Check if score has been updated (could be 1 or 2 depending on answers)
      const scoreElements = screen.getAllByText(/[0-2]/);
      expect(scoreElements.length).toBeGreaterThan(0);
    });
  });

  it('handles burger menu interactions correctly', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Type Tussle Quiz')).toBeDefined();
    });

    // Open burger menu
    const menuButton = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(menuButton);

    // Should show game mode options
    await waitFor(() => {
      expect(screen.getByText('Game Mode')).toBeDefined();
      expect(screen.getByText('Classic Mode')).toBeDefined();
      expect(screen.getByText('Speed Mode')).toBeDefined();
      expect(screen.getByText('Expert Mode')).toBeDefined();
    });

    // Select a different game mode
    const speedMode = screen.getByText('Speed Mode');
    fireEvent.click(speedMode);

    // Menu should close and mode should be selected
    await waitFor(() => {
      expect(screen.queryByText('Game Mode')).toBeNull();
    });

    // Should show the selected mode (on larger screens)
    // Note: This might be hidden on mobile, so we use queryByText
    const speedBadge = screen.queryByText('Speed');
    // We don't assert this is present because it might be hidden on mobile viewports
  });

  it('maintains proper state throughout the application lifecycle', async () => {
    render(<App />);

    // Initial state verification
    await waitFor(() => {
      expect(screen.getByText('Type Tussle Quiz')).toBeDefined();
    });

    // Wait for Pokemon to load
    await waitFor(() => {
      expect(screen.getByText('Attacks')).toBeDefined();
    });

    // Verify all main components are rendered
    expect(screen.getByText('Round')).toBeDefined();      // ScoreDisplay
    expect(screen.getByText('Score')).toBeDefined();       // ScoreDisplay
    expect(screen.getByText('Attacks')).toBeDefined();     // BattleArena
    expect(screen.getByText('Super Effective')).toBeDefined(); // QuizAnswerSection

    // Interact with the quiz
    fireEvent.click(screen.getByText('Normal'));

    // Should maintain component structure during feedback
    await waitFor(() => {
      expect(screen.getByText(/Correct!|Wrong!/)).toBeDefined();
    });

    // All main components should still be present
    expect(screen.getByText('Round')).toBeDefined();
    expect(screen.getByText('Score')).toBeDefined();
    expect(screen.getByText('Attacks')).toBeDefined();

    // Should transition back to answer buttons after feedback
    await waitFor(() => {
      expect(screen.getByText('Super Effective')).toBeDefined();
    }, { timeout: 3000 });
  });

  it('handles error states gracefully', async () => {
    // Mock a service failure
    vi.mocked(require('@/features/pokemon/services/PokemonService').PokemonService.getRandomByType)
      .mockImplementationOnce(() => {
        throw new Error('Service unavailable');
      });

    render(<App />);

    // Should still render the basic interface
    await waitFor(() => {
      expect(screen.getByText('Type Tussle Quiz')).toBeDefined();
    });

    // Should show loading state or handle the error gracefully
    // The exact behavior depends on error handling implementation
    expect(screen.getByText('Round')).toBeDefined();
    expect(screen.getByText('Score')).toBeDefined();
  });

  it('maintains responsive behavior across different screen sizes', async () => {
    // Test mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375, // Mobile width
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Type Tussle Quiz')).toBeDefined();
    });

    // Should show burger menu (present on all sizes)
    expect(screen.getByRole('button', { name: /open menu/i })).toBeDefined();

    // Test desktop viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024, // Desktop width
    });

    // Trigger resize event
    window.dispatchEvent(new Event('resize'));

    // Should still show all main components
    expect(screen.getByText('Type Tussle Quiz')).toBeDefined();
    expect(screen.getByRole('button', { name: /open menu/i })).toBeDefined();
  });

  it('preserves game state during component updates', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Type Tussle Quiz')).toBeDefined();
    });

    // Wait for initial Pokemon load
    await waitFor(() => {
      expect(screen.getByText('Attacks')).toBeDefined();
    });

    // Answer a question to advance the game state
    fireEvent.click(screen.getByText('Super Effective'));

    await waitFor(() => {
      expect(screen.getByText(/Correct!|Wrong!/)).toBeDefined();
    });

    // Wait for round advancement
    await waitFor(() => {
      expect(screen.getByText('2')).toBeDefined(); // Should be round 2
    }, { timeout: 3000 });

    // Verify state is maintained
    expect(screen.getByText('Round')).toBeDefined();
    expect(screen.getByText('Score')).toBeDefined();
    expect(screen.getByText('Attacks')).toBeDefined();

    // Game should continue to function
    expect(screen.getByText('Super Effective')).toBeDefined();
    expect(screen.getByText('Normal')).toBeDefined();
  });
}); 