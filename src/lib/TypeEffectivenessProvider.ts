import { PokemonType } from '@/features/pokemon/types/PokemonType';
export enum Effectiveness {
  NoEffect = 0,
  NotVeryEffective = 0.5,
  Normal = 1,
  SuperEffective = 2,
}

import typeStrength from './type.strength.json';

/**
 * Returns the effectiveness multiplier for an attacker's type against a defender's type.
 * Only returns Effectiveness enum values. Defaults to Effectiveness.Normal for any other value.
 * @param attacker - The attacking type (PokemonType)
 * @param defender - The defending type (PokemonType)
 * @returns The effectiveness multiplier as an Effectiveness enum value
 */
export function getTypeEffectiveness(attacker: PokemonType, defender: PokemonType): Effectiveness {
  const attackerData = (typeStrength as Record<string, Record<string, number>>)[attacker];
  const effectiveness = attackerData[defender];
  switch (effectiveness) {
    case 0: return Effectiveness.NoEffect;
    case 0.5: return Effectiveness.NotVeryEffective;
    case 1: return Effectiveness.Normal;
    case 2: return Effectiveness.SuperEffective;
    default: return Effectiveness.Normal;
  }
} 