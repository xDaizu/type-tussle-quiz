import { PokemonType } from '@/features/pokemon/types/PokemonType';
import { AssetService } from '@/shared/services/AssetService';

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const LEFT_FACING_POKEMON = [
  'voltorb',
  'tangela',
  'rookidee',
  'dratini',
  'koffing',
];

export class SpriteService {
  static getPokemonHomeSprite(pokemonName: string, sex?: 'male' | 'female'): string {
    const baseName = pokemonName.toLowerCase();
    const suffix = sex === 'female' ? '-f' : '';
    return `https://img.pokemondb.net/sprites/home/normal/${baseName}${suffix}.png`;
  }

  static getTypeSpriteWithWord(type: PokemonType): string {
    return AssetService.getAssetPath(`sprites/types/wordy/${capitalize(type)}IC_SV.png`);
  }

  static getTypeSpriteSymbol(type: PokemonType): string {
    return AssetService.getAssetPath(`sprites/types/symbols/${capitalize(type)}_icon_Sleep.png`);
  }

  static isLeftFacing(pokemonName: string): boolean {
    return LEFT_FACING_POKEMON.includes(pokemonName.toLowerCase());
  }
} 