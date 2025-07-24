import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export { getTypeEffectiveness, Effectiveness } from './TypeEffectivenessProvider';

export function getResultPhrase(score: number, maxScore: number): string {
  // Clamp score between 0 and maxScore
  const s = Math.max(0, Math.min(score, maxScore));
  const phrases = [
    "Like a Magikarp using Splash... but you'll evolve soon!",
    "You missed, but even Ash lost his first battle!",
    "That's a Slowpoke start, but you'll speed up!",
    "You might be stuck in Viridian Forest, but keep going!",
    "Like a Zubat in a cave: persistent, but a little lost!",
    "Halfway there! Like catching a Pidgey on Route 1.",
    "You're evolving! Soon you'll be super effective!",
    "You'd make a great Gym Trainer!",
    "Almost an Elite Four challenger!",
    "So close! Like a Quick Attack away from victory!",
    "Legendary! You caught'em all! 🎉"
  ];
  // Use Math.round to map score to index (for non-integer scores)
  return phrases[Math.round((s / maxScore) * 10)] || "Keep battling!";
}
