/**
 * Global game settings configuration
 * These settings can be modified by users through the UI settings panel
 */

export interface GameSettings {
  /** Whether to automatically advance rounds after showing results */
  roundResultTimer: boolean;
  /** Timeout duration for correct answers (in milliseconds) */
  correctAnswerTimeout: number;
  /** Timeout duration for incorrect answers (in milliseconds) */
  incorrectAnswerTimeout: number;
  /** Total number of rounds in a quiz game */
  totalRounds: number;
}

export const DEFAULT_GAME_SETTINGS: GameSettings = {
  // Accessibility: Default to manual advancement for better user control
  roundResultTimer: false,
  correctAnswerTimeout: 1000,
  incorrectAnswerTimeout: 2500,
  totalRounds: 10,
};

/**
 * Get current game settings
 * In the future, this will read from user preferences/localStorage
 */
export const getGameSettings = (): GameSettings => {
  // TODO: Later integrate with user settings from UI
  // For now, return default settings
  return { ...DEFAULT_GAME_SETTINGS };
};

/**
 * Update game settings
 * In the future, this will save to user preferences/localStorage
 */
export const updateGameSettings = (updates: Partial<GameSettings>): GameSettings => {
  // TODO: Later integrate with user settings persistence
  // For now, just return merged settings (not persisted)
  return { ...DEFAULT_GAME_SETTINGS, ...updates };
}; 