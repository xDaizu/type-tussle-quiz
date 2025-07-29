import { PokemonType } from '@/features/pokemon/types/PokemonType';
import pokemonListJson from '@/data/pokemonList.json';
import { SpriteService } from './SpriteService';
import { Result, createSuccess, createError } from '@/shared/types/Result';
import { PokemonNotFoundError } from '@/shared/types/Errors';

export type Pokemon = {
  id: string;
  name: string;
  type: PokemonType;
  sprite: string;
};

export class PokemonService {
  static getAll(): Pokemon[] {
    return pokemonListJson.map((p) => ({
      ...p,
      id: p.id.toString(),
      type: PokemonType[p.type as keyof typeof PokemonType],
      sprite: SpriteService.getPokemonHomeSprite(p.name),
    }));
  }

  static getRandom(): Pokemon {
    const all = this.getAll();
    return all[Math.floor(Math.random() * all.length)];
  }

  static getRandomByType(type: PokemonType): Result<Pokemon, PokemonNotFoundError> {
    const all = this.getAll();
    const filtered = all.filter((p) => p.type === type);
    
    if (filtered.length === 0) {
      return createError(new PokemonNotFoundError(type));
    }
    
    const randomPokemon = filtered[Math.floor(Math.random() * filtered.length)];
    return createSuccess(randomPokemon);
  }

  static getRandomByTypeOrFallback(type: PokemonType): Pokemon {
    const result = this.getRandomByType(type);
    if (result.success) {
      return result.data;
    }
    // Fallback to random Pokemon if type not found
    return this.getRandom();
  }
} 