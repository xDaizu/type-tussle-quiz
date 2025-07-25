import { describe, it, expect } from 'vitest';
import { SpriteProvider } from './SpriteProvider';
import { PokemonType } from '@/types/PokemonType';

describe('SpriteProvider', () => {
  it('getPokemonHomeSprite returns correct URL', () => {
    expect(SpriteProvider.getPokemonHomeSprite('Pikachu')).toBe(
      'https://img.pokemondb.net/sprites/home/normal/pikachu.png'
    );
    expect(SpriteProvider.getPokemonHomeSprite('Pikachu', 'female')).toBe(
      'https://img.pokemondb.net/sprites/home/normal/pikachu-f.png'
    );
  });

  it('getTypeSpriteWithWord returns correct path', () => {
    expect(SpriteProvider.getTypeSpriteWithWord(PokemonType.Fire)).toBe('/sprites/types/wordy/FireIC_SV.png');
    expect(SpriteProvider.getTypeSpriteWithWord(PokemonType.Water)).toBe('/sprites/types/wordy/WaterIC_SV.png');
  });

  it('getTypeSpriteSymbol returns correct path', () => {
    expect(SpriteProvider.getTypeSpriteSymbol(PokemonType.Fire)).toBe('/sprites/types/symbols/Fire_icon_Sleep.png');
    expect(SpriteProvider.getTypeSpriteSymbol(PokemonType.Water)).toBe('/sprites/types/symbols/Water_icon_Sleep.png');
  });

  it('isLeftFacing returns true for left-facing Pokémon', () => {
    expect(SpriteProvider.isLeftFacing('Voltorb')).toBe(true);
    expect(SpriteProvider.isLeftFacing('Tangela')).toBe(true);
  });

  it('isLeftFacing returns false for non-left-facing Pokémon', () => {
    expect(SpriteProvider.isLeftFacing('Pikachu')).toBe(false);
    expect(SpriteProvider.isLeftFacing('Charmander')).toBe(false);
  });
}); 