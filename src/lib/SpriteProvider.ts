// SpriteProvider.ts

import { PokemonType } from '@/types/PokemonType';

const spriteCDNMap = {
  charmander: { id: 4, hasFemaleVariant: false, type: PokemonType.Fire },
  squirtle: { id: 7, hasFemaleVariant: false, type: PokemonType.Water },
  chikorita: { id: 152, hasFemaleVariant: false, type: PokemonType.Grass },
  pikachu: { id: 25, hasFemaleVariant: true, type: PokemonType.Electric },
  meowth: { id: 52, hasFemaleVariant: false, type: PokemonType.Normal },
  mankey: { id: 56, hasFemaleVariant: false, type: PokemonType.Fighting },
};

const typeSpriteCDNMap = {
  normal: {
    symbol: 'sprites/types/symbols/Normal_icon_Sleep.png',
    word: 'sprites/types/wordy/NormalIC_SV.png',
  },
  fire: {
    symbol: 'sprites/types/symbols/Fire_icon_Sleep.png',
    word: 'sprites/types/wordy/FireIC_SV.png',
  },
  water: {
    symbol: 'sprites/types/symbols/Water_icon_Sleep.png',
    word: 'sprites/types/wordy/WaterIC_SV.png',
  },
  electric: {
    symbol: 'sprites/types/symbols/Electric_icon_Sleep.png',
    word: 'sprites/types/wordy/ElectricIC_SV.png',
  },
  grass: {
    symbol: 'sprites/types/symbols/Grass_icon_Sleep.png',
    word: 'sprites/types/wordy/GrassIC_SV.png',
  },
  ice: {
    symbol: 'sprites/types/symbols/Ice_icon_Sleep.png',
    word: 'sprites/types/wordy/IceIC_SV.png',
  },
  fighting: {
    symbol: 'sprites/types/symbols/Fighting_icon_Sleep.png',
    word: 'sprites/types/wordy/FightingIC_SV.png',
  },
  poison: {
    symbol: 'sprites/types/symbols/Poison_icon_Sleep.png',
    word: 'sprites/types/wordy/PoisonIC_SV.png',
  },
  ground: {
    symbol: 'sprites/types/symbols/Ground_icon_Sleep.png',
    word: 'sprites/types/wordy/GroundIC_SV.png',
  },
  flying: {
    symbol: 'sprites/types/symbols/Flying_icon_Sleep.png',
    word: 'sprites/types/wordy/FlyingIC_SV.png',
  },
  psychic: {
    symbol: 'sprites/types/symbols/Psychic_icon_Sleep.png',
    word: 'sprites/types/wordy/PsychicIC_SV.png',
  },
  bug: {
    symbol: 'sprites/types/symbols/Bug_icon_Sleep.png',
    word: 'sprites/types/wordy/BugIC_SV.png',
  },
  rock: {
    symbol: 'sprites/types/symbols/Rock_icon_Sleep.png',
    word: 'sprites/types/wordy/RockIC_SV.png',
  },
  ghost: {
    symbol: 'sprites/types/symbols/Ghost_icon_Sleep.png',
    word: 'sprites/types/wordy/GhostIC_SV.png',
  },
  dragon: {
    symbol: 'sprites/types/symbols/Dragon_icon_Sleep.png',
    word: 'sprites/types/wordy/DragonIC_SV.png',
  },
  dark: {
    symbol: 'sprites/types/symbols/Dark_icon_Sleep.png',
    word: 'sprites/types/wordy/DarkIC_SV.png',
  },
  steel: {
    symbol: 'sprites/types/symbols/Steel_icon_Sleep.png',
    word: 'sprites/types/wordy/SteelIC_SV.png',
  },
  fairy: {
    symbol: 'sprites/types/symbols/Fairy_icon_Sleep.png',
    word: 'sprites/types/wordy/FairyIC_SV.png',
  },
};



export class SpriteProvider {
  static getPokemonSprite(pokemonId: string, isAttacker: boolean): string {
    const entry = spriteCDNMap[pokemonId as keyof typeof spriteCDNMap];
    if (!entry) return '';
    const { id, hasFemaleVariant } = entry;
    // If the Pokémon has a female variant, randomly pick male or female
    let genderPath = '';
    if (hasFemaleVariant) {
      genderPath = Math.random() < 0.5 ? '' : 'female/';
    }
    const baseUrl = 'https://easycdn.es/1/poke/i/imagendex/sprites/blackwhite/';
    const back = isAttacker ? 'back/' : '';
    return `${baseUrl}${back}${genderPath}${id}.png`;
  }

  static getPokemonModernSprite(pokemonName: string, isAttacker: boolean): string {
    // Find the Pokémon by name in spriteCDNMap (case-insensitive)
    const entry = Object.entries(spriteCDNMap).find(([name]) => name.toLowerCase() === pokemonName.toLowerCase());
    if (!entry) throw new Error(`No Pokémon found with name: ${pokemonName}`);
    const [name] = entry;
    return `https://img.pokemondb.net/sprites/scarlet-violet/normal/${name.toLowerCase()}.png`;
  }

  static getPokemonModernSpriteByType(type: PokemonType): string {
    // Get all Pokémon names with the given type
    const matching = Object.entries(spriteCDNMap)
      .filter(([_, data]) => data.type === type)
      .map(([name]) => name);
    if (matching.length === 0) return '';
    const randomName = matching[Math.floor(Math.random() * matching.length)];
    return `https://img.pokemondb.net/sprites/scarlet-violet/normal/${randomName.toLowerCase()}.png`;
  }

  static getTypeSpriteWithWord(type: PokemonType): string {
    const entry = typeSpriteCDNMap[type as keyof typeof typeSpriteCDNMap];
    if (!entry) return '';
    return entry.word;
  }

  static getTypeSpriteSymbol(type: PokemonType): string {
    const entry = typeSpriteCDNMap[type as keyof typeof typeSpriteCDNMap];
    if (!entry) return '';
    return entry.symbol;
  }
} 