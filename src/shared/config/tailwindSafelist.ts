import { PokemonType } from '../../features/pokemon/types/PokemonType';

const pokemonTypes = Object.values(PokemonType);

const baseClasses = ['from', 'to', 'text', 'bg'] as const;
const opacityVariants = ['80', '60', '30'] as const;

export function generatePokemonTypeSafelist(): string[] {
  const safelist: string[] = [];

  // Generate base classes for each type
  for (const type of pokemonTypes) {
    for (const baseClass of baseClasses) {
      safelist.push(`${baseClass}-${type}`);
    }
  }

  // Generate opacity variants for gradient classes (from-* and to-*)
  for (const type of pokemonTypes) {
    for (const opacity of opacityVariants) {
      safelist.push(`from-${type}/${opacity}`);
      safelist.push(`to-${type}/${opacity}`);
    }
  }

  // Generate opacity variants for background classes (bg-*)
  for (const type of pokemonTypes) {
    for (const opacity of opacityVariants) {
      safelist.push(`bg-${type}/${opacity}`);
    }
  }

  // Generate opacity variants for text classes (text-*)
  for (const type of pokemonTypes) {
    for (const opacity of opacityVariants) {
      safelist.push(`text-${type}/${opacity}`);
    }
  }

  return safelist;
} 