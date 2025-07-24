// SpriteProvider.ts

import { PokemonType } from '@/types/PokemonType';

// Helper to capitalize the first letter
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// List of Pokémon whose sprites are left-facing
const LEFT_FACING_POKEMON = [
  'voltorb',
  'tangela',
  'rookidee',
  'dratini',
  'koffing',
];

export class SpriteProvider {
  static getPokemonHomeSprite(pokemonName: string, sex?: 'male' | 'female'): string {
    const baseName = pokemonName.toLowerCase();
    const suffix = sex === 'female' ? '-f' : '';
    return `https://img.pokemondb.net/sprites/home/normal/${baseName}${suffix}.png`;
  }

  static getTypeSpriteWithWord(type: PokemonType): string {
    // e.g., sprites/types/wordy/FireIC_SV.png
    return `sprites/types/wordy/${capitalize(type)}IC_SV.png`;
  }

  static getTypeSpriteSymbol(type: PokemonType): string {
    // e.g., sprites/types/symbols/Fire_icon_Sleep.png
    return `sprites/types/symbols/${capitalize(type)}_icon_Sleep.png`;
  }

  /**
   * Returns true if the given Pokémon name is left-facing.
   */
  static isLeftFacing(pokemonName: string): boolean {
    return LEFT_FACING_POKEMON.includes(pokemonName.toLowerCase());
  }
} 