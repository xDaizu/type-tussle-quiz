export class PokemonNotFoundError extends Error {
  constructor(type: string) {
    super(`No Pokémon found for type: ${type}`);
    this.name = 'PokemonNotFoundError';
  }
}

export class InvalidBattleGenerationError extends Error {
  constructor(message: string) {
    super(`Failed to generate battle: ${message}`);
    this.name = 'InvalidBattleGenerationError';
  }
}

export class QuizValidationError extends Error {
  constructor(message: string) {
    super(`Quiz validation failed: ${message}`);
    this.name = 'QuizValidationError';
  }
} 