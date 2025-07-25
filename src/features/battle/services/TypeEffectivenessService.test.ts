import { describe, it, expect } from 'vitest';
import { getTypeEffectiveness, Effectiveness } from './TypeEffectivenessService';
import { PokemonType } from '@/features/pokemon/types/PokemonType';

describe('TypeEffectivenessService', () => {
  it('returns SuperEffective (2) for bug vs dark', () => {
    expect(getTypeEffectiveness(PokemonType.Bug, PokemonType.Dark)).toBe(Effectiveness.SuperEffective);
  });

  it('returns NotVeryEffective (0.5) for bug vs fire', () => {
    expect(getTypeEffectiveness(PokemonType.Bug, PokemonType.Fire)).toBe(Effectiveness.NotVeryEffective);
  });

  it('returns NoEffect (0) for dragon vs fairy', () => {
    expect(getTypeEffectiveness(PokemonType.Dragon, PokemonType.Fairy)).toBe(Effectiveness.NoEffect);
  });

  it('returns Normal (1) for bug vs normal', () => {
    expect(getTypeEffectiveness(PokemonType.Bug, PokemonType.Normal)).toBe(Effectiveness.Normal);
  });

  it('returns correct values for electric vs flying (2), electric vs ground (0)', () => {
    expect(getTypeEffectiveness(PokemonType.Electric, PokemonType.Flying)).toBe(Effectiveness.SuperEffective);
    expect(getTypeEffectiveness(PokemonType.Electric, PokemonType.Ground)).toBe(Effectiveness.NoEffect);
  });

  it('returns correct effectiveness for many type matchups', () => {
    const cases = [
      // [attacker, defender, expected effectiveness]
      [PokemonType.Fire, PokemonType.Grass, Effectiveness.SuperEffective],
      [PokemonType.Fire, PokemonType.Water, Effectiveness.NotVeryEffective],
      [PokemonType.Fire, PokemonType.Rock, Effectiveness.NotVeryEffective],
      [PokemonType.Fire, PokemonType.Ice, Effectiveness.SuperEffective],
      [PokemonType.Fire, PokemonType.Bug, Effectiveness.SuperEffective],
      [PokemonType.Fire, PokemonType.Steel, Effectiveness.SuperEffective],
      [PokemonType.Fire, PokemonType.Dragon, Effectiveness.NotVeryEffective],
      [PokemonType.Water, PokemonType.Fire, Effectiveness.SuperEffective],
      [PokemonType.Water, PokemonType.Grass, Effectiveness.NotVeryEffective],
      [PokemonType.Water, PokemonType.Ground, Effectiveness.SuperEffective],
      [PokemonType.Water, PokemonType.Rock, Effectiveness.SuperEffective],
      [PokemonType.Water, PokemonType.Dragon, Effectiveness.NotVeryEffective],
      [PokemonType.Electric, PokemonType.Water, Effectiveness.SuperEffective],
      [PokemonType.Electric, PokemonType.Ground, Effectiveness.NoEffect],
      [PokemonType.Electric, PokemonType.Flying, Effectiveness.SuperEffective],
      [PokemonType.Electric, PokemonType.Dragon, Effectiveness.NotVeryEffective],
      [PokemonType.Grass, PokemonType.Water, Effectiveness.SuperEffective],
      [PokemonType.Grass, PokemonType.Fire, Effectiveness.NotVeryEffective],
      [PokemonType.Grass, PokemonType.Ground, Effectiveness.SuperEffective],
      [PokemonType.Grass, PokemonType.Flying, Effectiveness.NotVeryEffective],
      [PokemonType.Grass, PokemonType.Bug, Effectiveness.NotVeryEffective],
      [PokemonType.Grass, PokemonType.Poison, Effectiveness.NotVeryEffective],
      [PokemonType.Grass, PokemonType.Rock, Effectiveness.SuperEffective],
      [PokemonType.Grass, PokemonType.Steel, Effectiveness.NotVeryEffective],
      [PokemonType.Ice, PokemonType.Dragon, Effectiveness.SuperEffective],
      [PokemonType.Ice, PokemonType.Flying, Effectiveness.SuperEffective],
      [PokemonType.Ice, PokemonType.Grass, Effectiveness.SuperEffective],
      [PokemonType.Ice, PokemonType.Ground, Effectiveness.SuperEffective],
      [PokemonType.Ice, PokemonType.Fire, Effectiveness.NotVeryEffective],
      [PokemonType.Ice, PokemonType.Water, Effectiveness.NotVeryEffective],
      [PokemonType.Ice, PokemonType.Steel, Effectiveness.NotVeryEffective],
      [PokemonType.Fighting, PokemonType.Normal, Effectiveness.SuperEffective],
      [PokemonType.Fighting, PokemonType.Ice, Effectiveness.SuperEffective],
      [PokemonType.Fighting, PokemonType.Rock, Effectiveness.SuperEffective],
      [PokemonType.Fighting, PokemonType.Dark, Effectiveness.SuperEffective],
      [PokemonType.Fighting, PokemonType.Steel, Effectiveness.SuperEffective],
      [PokemonType.Fighting, PokemonType.Flying, Effectiveness.NotVeryEffective],
      [PokemonType.Fighting, PokemonType.Poison, Effectiveness.NotVeryEffective],
      [PokemonType.Fighting, PokemonType.Psychic, Effectiveness.NotVeryEffective],
      [PokemonType.Fighting, PokemonType.Bug, Effectiveness.NotVeryEffective],
      [PokemonType.Fighting, PokemonType.Fairy, Effectiveness.NotVeryEffective],
      [PokemonType.Fighting, PokemonType.Ghost, Effectiveness.NoEffect],
      [PokemonType.Poison, PokemonType.Grass, Effectiveness.SuperEffective],
      [PokemonType.Poison, PokemonType.Fairy, Effectiveness.SuperEffective],
      [PokemonType.Poison, PokemonType.Poison, Effectiveness.NotVeryEffective],
      [PokemonType.Poison, PokemonType.Ground, Effectiveness.NotVeryEffective],
      [PokemonType.Poison, PokemonType.Rock, Effectiveness.NotVeryEffective],
      [PokemonType.Poison, PokemonType.Ghost, Effectiveness.NotVeryEffective],
      [PokemonType.Poison, PokemonType.Steel, Effectiveness.NoEffect],
      [PokemonType.Ground, PokemonType.Fire, Effectiveness.SuperEffective],
      [PokemonType.Ground, PokemonType.Electric, Effectiveness.SuperEffective],
      [PokemonType.Ground, PokemonType.Poison, Effectiveness.SuperEffective],
      [PokemonType.Ground, PokemonType.Rock, Effectiveness.SuperEffective],
      [PokemonType.Ground, PokemonType.Steel, Effectiveness.SuperEffective],
      [PokemonType.Ground, PokemonType.Bug, Effectiveness.NotVeryEffective],
      [PokemonType.Ground, PokemonType.Grass, Effectiveness.NotVeryEffective],
      [PokemonType.Ground, PokemonType.Flying, Effectiveness.NoEffect],
      [PokemonType.Flying, PokemonType.Grass, Effectiveness.SuperEffective],
      [PokemonType.Flying, PokemonType.Fighting, Effectiveness.SuperEffective],
      [PokemonType.Flying, PokemonType.Bug, Effectiveness.SuperEffective],
      [PokemonType.Flying, PokemonType.Electric, Effectiveness.NotVeryEffective],
      [PokemonType.Flying, PokemonType.Rock, Effectiveness.NotVeryEffective],
      [PokemonType.Flying, PokemonType.Steel, Effectiveness.NotVeryEffective],
      [PokemonType.Psychic, PokemonType.Fighting, Effectiveness.SuperEffective],
      [PokemonType.Psychic, PokemonType.Poison, Effectiveness.SuperEffective],
      [PokemonType.Psychic, PokemonType.Psychic, Effectiveness.NotVeryEffective],
      [PokemonType.Psychic, PokemonType.Steel, Effectiveness.NotVeryEffective],
      [PokemonType.Psychic, PokemonType.Dark, Effectiveness.NoEffect],
      [PokemonType.Bug, PokemonType.Grass, Effectiveness.SuperEffective],
      [PokemonType.Bug, PokemonType.Psychic, Effectiveness.SuperEffective],
      [PokemonType.Bug, PokemonType.Dark, Effectiveness.SuperEffective],
      [PokemonType.Bug, PokemonType.Fire, Effectiveness.NotVeryEffective],
      [PokemonType.Bug, PokemonType.Fighting, Effectiveness.NotVeryEffective],
      [PokemonType.Bug, PokemonType.Flying, Effectiveness.NotVeryEffective],
      [PokemonType.Bug, PokemonType.Ghost, Effectiveness.NotVeryEffective],
      [PokemonType.Bug, PokemonType.Steel, Effectiveness.NotVeryEffective],
      [PokemonType.Bug, PokemonType.Fairy, Effectiveness.NotVeryEffective],
      [PokemonType.Rock, PokemonType.Fire, Effectiveness.SuperEffective],
      [PokemonType.Rock, PokemonType.Ice, Effectiveness.SuperEffective],
      [PokemonType.Rock, PokemonType.Flying, Effectiveness.SuperEffective],
      [PokemonType.Rock, PokemonType.Bug, Effectiveness.SuperEffective],
      [PokemonType.Rock, PokemonType.Fighting, Effectiveness.NotVeryEffective],
      [PokemonType.Rock, PokemonType.Ground, Effectiveness.NotVeryEffective],
      [PokemonType.Rock, PokemonType.Steel, Effectiveness.NotVeryEffective],
      [PokemonType.Ghost, PokemonType.Ghost, Effectiveness.SuperEffective],
      [PokemonType.Ghost, PokemonType.Psychic, Effectiveness.SuperEffective],
      [PokemonType.Ghost, PokemonType.Dark, Effectiveness.NotVeryEffective],
      [PokemonType.Ghost, PokemonType.Normal, Effectiveness.NoEffect],
      [PokemonType.Dragon, PokemonType.Dragon, Effectiveness.SuperEffective],
      [PokemonType.Dragon, PokemonType.Steel, Effectiveness.NotVeryEffective],
      [PokemonType.Dragon, PokemonType.Fairy, Effectiveness.NoEffect],
      [PokemonType.Dark, PokemonType.Ghost, Effectiveness.SuperEffective],
      [PokemonType.Dark, PokemonType.Psychic, Effectiveness.SuperEffective],
      [PokemonType.Dark, PokemonType.Fighting, Effectiveness.NotVeryEffective],
      [PokemonType.Dark, PokemonType.Dark, Effectiveness.NotVeryEffective],
      [PokemonType.Dark, PokemonType.Fairy, Effectiveness.NotVeryEffective],
      [PokemonType.Steel, PokemonType.Ice, Effectiveness.SuperEffective],
      [PokemonType.Steel, PokemonType.Rock, Effectiveness.SuperEffective],
      [PokemonType.Steel, PokemonType.Fairy, Effectiveness.SuperEffective],
      [PokemonType.Steel, PokemonType.Fire, Effectiveness.NotVeryEffective],
      [PokemonType.Steel, PokemonType.Water, Effectiveness.NotVeryEffective],
      [PokemonType.Steel, PokemonType.Electric, Effectiveness.NotVeryEffective],
      [PokemonType.Steel, PokemonType.Steel, Effectiveness.NotVeryEffective],
      [PokemonType.Fairy, PokemonType.Fighting, Effectiveness.SuperEffective],
      [PokemonType.Fairy, PokemonType.Dragon, Effectiveness.SuperEffective],
      [PokemonType.Fairy, PokemonType.Dark, Effectiveness.SuperEffective],
      [PokemonType.Fairy, PokemonType.Fire, Effectiveness.NotVeryEffective],
      [PokemonType.Fairy, PokemonType.Poison, Effectiveness.NotVeryEffective],
      [PokemonType.Fairy, PokemonType.Steel, Effectiveness.NotVeryEffective],
    ];
    for (const [attacker, defender, expected] of cases as [PokemonType, PokemonType, Effectiveness][]) {
      const result = getTypeEffectiveness(attacker, defender);
      if (result !== expected) {
         
        console.error(`Failed: ${attacker} vs ${defender} (expected ${expected}, got ${result})`);
      }
      expect(result).toBe(expected);
    }
  });

  it('covers all immunities (effectiveness 0)', () => {
    const immunities: [PokemonType, PokemonType][] = [
      [PokemonType.Dragon, PokemonType.Fairy], // dragon vs fairy
      [PokemonType.Electric, PokemonType.Ground], // electric vs ground
      [PokemonType.Fighting, PokemonType.Ghost], // fighting vs ghost
      [PokemonType.Ghost, PokemonType.Normal], // ghost vs normal
      [PokemonType.Ground, PokemonType.Flying], // ground vs flying
      [PokemonType.Normal, PokemonType.Ghost], // normal vs ghost
      [PokemonType.Poison, PokemonType.Steel], // poison vs steel
      [PokemonType.Psychic, PokemonType.Dark], // psychic vs dark
    ];
    for (const [attacker, defender] of immunities) {
      expect(getTypeEffectiveness(attacker, defender)).toBe(Effectiveness.NoEffect);
    }
  });
}); 