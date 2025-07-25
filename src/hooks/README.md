# Pokemon Type Tussle Quiz - Custom Hooks

This directory contains custom React hooks that encapsulate the core logic, state, and orchestration for the Pokemon Type Tussle Quiz game. Each hook is focused on a single responsibility, making the codebase modular, testable, and easy to maintain.

---

## `useQuizGame`

**Purpose:**
Manages the core game state: current round, score, attacker/defender Pokemon, game over state, and total rounds. Provides actions to generate a new battle and reset the game.

**API:**
- `currentRound: number`
- `score: number`
- `attacker: Pokemon | null`
- `defender: Pokemon | null`
- `gameOver: boolean`
- `totalRounds: number`
- `generateBattle(): void`
- `resetGame(): void`
- `setCurrentRound(round: number): void`
- `setScore(score: number): void`
- `setGameOver(over: boolean): void`

**Example:**
```ts
const game = useQuizGame(10);
// Access game.currentRound, game.score, game.attacker, etc.
// Call game.generateBattle() or game.resetGame() as needed
```

---

## `useQuizTimer`

**Purpose:**
Handles result display timing, skip functionality, and timer cleanup for the quiz. Manages setTimeout/clearTimeout for result display, enables skip after a short delay, and provides manual advance control.

**API:**
- `showResult: { correct: boolean } | null` (input)
- `onAdvance: () => void` (input)
- `currentRound: number` (input)
- `totalRounds: number` (input)
- `skipEnabled: React.RefObject<boolean>`
- `manualAdvance: () => void`
- `timeoutRef: React.RefObject<NodeJS.Timeout | null>`

**Example:**
```ts
useQuizTimer({ showResult, onAdvance, currentRound, totalRounds });
```

---

## `useQuizFeedback`

**Purpose:**
Handles answer validation, result feedback, and effectiveness calculation for the quiz. Manages result state (`showResult`), selected effectiveness, and provides a handler for answer selection.

**API:**
- `showResult: { correct: boolean; effectiveness: Effectiveness } | null`
- `setShowResult: (result: { correct: boolean; effectiveness: Effectiveness } | null) => void`
- `selectedEffectiveness: Effectiveness | null`
- `setSelectedEffectiveness: (e: Effectiveness | null) => void`
- `handleAnswer: (e: Effectiveness) => boolean | undefined`
- `resetFeedback: () => void`

**Example:**
```ts
const feedback = useQuizFeedback(attacker, defender);
feedback.handleAnswer(Effectiveness.SuperEffective);
```

---

## `useQuizNavigation`

**Purpose:**
Handles round progression, game completion detection, and game flow orchestration. Provides actions to advance to the next round or restart the game, and exposes game completion state.

**API:**
- `advanceRound(): void`
- `restartGame(): void`
- `isGameOver: boolean`

**Example:**
```ts
const navigation = useQuizNavigation({
  currentRound, totalRounds, setCurrentRound, setGameOver, generateBattle, resetGame
});
navigation.advanceRound();
```

---

Each hook is designed for single responsibility and can be tested independently. For more details, see the JSDoc comments in each file. 