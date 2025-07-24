import { PokemonType } from '@/types/PokemonType';
import pokemonListJson from './pokemonList.json' assert { type: 'json' };
import pokemonListEevee from './pokemonList.eevee.json' assert { type: 'json' };
import { SpriteProvider } from './SpriteProvider';

export type Pokemon = ReturnType<typeof PokemonProvider.getAll>[number];

export class PokemonProvider {
  static getAll(): Array<{
    id: string;
    name: string;
    type: PokemonType;
    sprite: string;
  }> {
    return pokemonListJson.map((p) => ({
      ...p,
      id: p.id.toString(),
      type: PokemonType[p.type as keyof typeof PokemonType],
      sprite: SpriteProvider.getPokemonHomeSprite(p.name),
    }));
  }

  static getRandom(): Pokemon {
    const all = this.getAll();
    return all[Math.floor(Math.random() * all.length)];
  }

  static getRandomByType(type: PokemonType): Pokemon {
    const all = this.getAll();
    const filtered = all.filter((p) => p.type === type);
    if (filtered.length === 0) throw new Error(`No Pokémon found for type: ${type}`);
    return filtered[Math.floor(Math.random() * filtered.length)];
  }

  static getEevolutionByType(type: PokemonType): Pokemon {
    // Mapping of PokemonType to Eeveelution name
    const eeveelutionMap: Partial<Record<PokemonType, string>> = {
      [PokemonType.Normal]: 'Eevee',
      [PokemonType.Water]: 'Vaporeon',
      [PokemonType.Electric]: 'Jolteon',
      [PokemonType.Fire]: 'Flareon',
      [PokemonType.Psychic]: 'Espeon',
      [PokemonType.Dark]: 'Umbreon',
      [PokemonType.Grass]: 'Leafeon',
      [PokemonType.Ice]: 'Glaceon',
      [PokemonType.Fairy]: 'Sylveon',
    };
    const name = eeveelutionMap[type];
    if (!name) throw new Error(`No Eeveelution for type: ${type}`);
    const eeveeData = pokemonListEevee.find((p: { name: string }) => p.name === name);
    if (!eeveeData) throw new Error(`Eeveelution data not found for type: ${type}`);
    return {
      ...eeveeData,
      id: eeveeData.id.toString(),
      type: PokemonType[eeveeData.type as keyof typeof PokemonType],
      sprite: SpriteProvider.getPokemonHomeSprite(eeveeData.name),
    };
  }
} 