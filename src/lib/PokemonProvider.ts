import { PokemonType } from '@/types/PokemonType';
import pokemonListJson from './pokemonList.json' assert { type: 'json' };

export class PokemonProvider {
  static getAll() {
    return pokemonListJson.map((p) => ({
      ...p,
      type: PokemonType[p.type as keyof typeof PokemonType],
    }));
  }

  static getRandom() {
    const all = this.getAll();
    return all[Math.floor(Math.random() * all.length)];
  }
} 