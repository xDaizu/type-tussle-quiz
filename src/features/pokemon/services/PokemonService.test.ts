import { describe, it, expect } from 'vitest';
import { PokemonService } from './PokemonService';
import { PokemonType } from '@/features/pokemon/types/PokemonType';


describe('PokemonProvider', () => {
  it('should return all Pokémon with correct structure', () => {
    const all = PokemonService.getAll();
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
    const random = PokemonService.getRandom();
    const all = PokemonService.getAll();
    expect(all).toContainEqual(random);
  });
}); 