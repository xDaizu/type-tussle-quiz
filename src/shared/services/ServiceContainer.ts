import { PokemonService } from '@/features/pokemon/services/PokemonService';
import { getTypeEffectiveness, Effectiveness } from '@/features/battle/services/TypeEffectivenessService';
import { SpriteService } from '@/features/pokemon/services/SpriteService';

export interface ServiceContainer {
  pokemonService: PokemonService;
  typeEffectivenessService: {
    getTypeEffectiveness: typeof getTypeEffectiveness;
    Effectiveness: typeof Effectiveness;
  };
  spriteService: SpriteService;
}

export const createServiceContainer = (): ServiceContainer => ({
  pokemonService: PokemonService,
  typeEffectivenessService: {
    getTypeEffectiveness,
    Effectiveness,
  },
  spriteService: SpriteService,
});

// Global service container instance
export const serviceContainer = createServiceContainer(); 