import { PokemonType } from '@/types/PokemonType';
import pokemonListJson from './pokemonList.json' assert { type: 'json' };
import { SpriteProvider } from './SpriteProvider';

export class PokemonProvider {
  static getAll() {
    return pokemonListJson.map((p) => ({
      ...p,
      id: p.id.toString(),
      type: PokemonType[p.type as keyof typeof PokemonType],
      sprite: SpriteProvider.getPokemonHomeSprite(p.name),
    }));
  }

  static getRandom() {
    const all = this.getAll();
    return all[Math.floor(Math.random() * all.length)];
  }

  static getRandomByType(type: PokemonType) {
    const all = this.getAll();
    const filtered = all.filter((p) => p.type === type);
    if (filtered.length === 0) throw new Error(`No Pokémon found for type: ${type}`);
    return filtered[Math.floor(Math.random() * filtered.length)];
  }
} 