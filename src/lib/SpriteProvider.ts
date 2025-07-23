// SpriteProvider.ts

const spriteCDNMap = {
  charmander: {
    attacking: 'https://easycdn.es/1/poke/i/imagendex/sprites/blackwhite/back/4.png',
    defending: 'https://easycdn.es/1/poke/i/imagendex/sprites/blackwhite/4.png',
  },
  squirtle: {
    attacking: 'https://easycdn.es/1/poke/i/imagendex/sprites/blackwhite/back/7.png',
    defending: 'https://easycdn.es/1/poke/i/imagendex/sprites/blackwhite/7.png',
  },
  chikorita: {
    attacking: 'https://easycdn.es/1/poke/i/imagendex/sprites/blackwhite/back/152.png',
    defending: 'https://easycdn.es/1/poke/i/imagendex/sprites/blackwhite/152.png',
  },
  pikachu: {
    attacking: [
      'https://easycdn.es/1/poke/i/imagendex/sprites/blackwhite/back/25.png', // Male
      'https://easycdn.es/1/poke/i/imagendex/sprites/blackwhite/back/female/25.png', // Female
    ],
    defending: [
      'https://easycdn.es/1/poke/i/imagendex/sprites/blackwhite/25.png',
      'https://easycdn.es/1/poke/i/imagendex/sprites/blackwhite/female/25.png'
    ]
  },
};

const typeSpriteCDNMap = {
  fire: {
    symbol: 'https://archives.bulbagarden.net/media/upload/b/b3/Fire_icon_Sleep.png',
    word: 'https://archives.bulbagarden.net/media/upload/a/a2/FireIC_SV.png',
  },
  water: {
    symbol: 'https://archives.bulbagarden.net/media/upload/2/25/Water_icon_Sleep.png',
    word: 'https://archives.bulbagarden.net/media/upload/d/de/WaterIC_SV.png?20221118013713',
  },
  grass: {
    symbol: 'https://archives.bulbagarden.net/media/upload/e/ef/Grass_icon_Sleep.png',
    word: 'https://archives.bulbagarden.net/media/upload/7/7b/GrassIC_SV.png?20221118013404',
  },
  electric: {
    symbol: 'https://archives.bulbagarden.net/media/upload/4/4c/Electric_icon_Sleep.png',
    word: 'https://archives.bulbagarden.net/media/upload/7/77/ElectricIC_SV.png',
  },
};




export class SpriteProvider {
  static getPokemonSprite(pokemonId: string, isAttacker: boolean): string {
    const entry = spriteCDNMap[pokemonId as keyof typeof spriteCDNMap];
    if (!entry) return '';
    const sprite = entry[isAttacker ? 'attacking' : 'defending'];
    if (Array.isArray(sprite)) {
      return sprite[Math.floor(Math.random() * sprite.length)];
    }
    return sprite;
  }

  static getTypeSpriteWithWord(type: string): string {
    const entry = typeSpriteCDNMap[type as keyof typeof typeSpriteCDNMap];
    if (!entry) return '';
    return entry.word;
  }
} 