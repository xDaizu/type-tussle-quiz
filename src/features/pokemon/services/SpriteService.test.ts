import { describe, it, expect } from 'vitest';
import { SpriteService } from './SpriteService';
import { PokemonType } from '@/features/pokemon/types/PokemonType';

describe('SpriteProvider', () => {
  it('getPokemonHomeSprite returns correct URL', () => {
    expect(SpriteService.getPokemonHomeSprite('Pikachu')).toBe(
      'https://img.pokemondb.net/sprites/home/normal/pikachu.png'
    );
    expect(SpriteService.getPokemonHomeSprite('Pikachu', 'female')).toBe(
      'https://img.pokemondb.net/sprites/home/normal/pikachu-f.png'
    );
  });

  it('getTypeSpriteWithWord returns correct path', () => {
    expect(SpriteService.getTypeSpriteWithWord(PokemonType.Fire)).toBe('/sprites/types/wordy/FireIC_SV.png');
    expect(SpriteService.getTypeSpriteWithWord(PokemonType.Water)).toBe('/sprites/types/wordy/WaterIC_SV.png');
  });

  it('getTypeSpriteSymbol returns correct path', () => {
    expect(SpriteService.getTypeSpriteSymbol(PokemonType.Fire)).toBe('/sprites/types/symbols/Fire_icon_Sleep.png');
    expect(SpriteService.getTypeSpriteSymbol(PokemonType.Water)).toBe('/sprites/types/symbols/Water_icon_Sleep.png');
  });

  it('isLeftFacing returns true for left-facing Pokémon', () => {
    expect(SpriteService.isLeftFacing('Voltorb')).toBe(true);
    expect(SpriteService.isLeftFacing('Tangela')).toBe(true);
  });

  it('isLeftFacing returns false for non-left-facing Pokémon', () => {
    expect(SpriteService.isLeftFacing('Pikachu')).toBe(false);
    expect(SpriteService.isLeftFacing('Charmander')).toBe(false);
  });
}); 