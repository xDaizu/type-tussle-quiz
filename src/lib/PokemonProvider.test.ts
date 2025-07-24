import { describe, it, expect } from 'vitest';
import { PokemonProvider } from './PokemonProvider';


describe('PokemonProvider', () => {
  it('should return all Pokémon with correct structure', () => {
    const all = PokemonProvider.getAll();
    expect(Array.isArray(all)).toBe(true);
    expect(all.length).toBeGreaterThan(0);
    for (const p of all) {
      expect(p).toHaveProperty('id');
      expect(p).toHaveProperty('name');
      expect(p).toHaveProperty('type');
      expect(p).toHaveProperty('sprite');
      expect(typeof p.sprite).toBe('string');
      expect(p.sprite.length).toBeGreaterThan(0);
    }
  });

  it('should return a random Pokémon from the list', () => {
    const random = PokemonProvider.getRandom();
    const all = PokemonProvider.getAll();
    expect(all).toContainEqual(random);
  });
}); 