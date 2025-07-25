import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export { getTypeEffectiveness, Effectiveness } from '@/features/battle/services/TypeEffectivenessService';

export function getResultPhrase(score: number, maxScore: number): string {
  // Clamp score between 0 and maxScore
  const s = Math.max(0, Math.min(score, maxScore));
  const phrases = [
    "Como un Magikarp haciendo Salpicadura...",
    "Fallaste más que un Hipnosis, pero lo importante es seguir.",
    "Un poco Slowpoke, ¡pero irás acelerando!",
    "No fuiste muy eficaz… pero hasta Pikachu necesitó entrenamiento",
    "Como un Zubat en una cueva: persistente, pero un poco perdido!",
    "Ni bien ni mal: tipo Normal. Pero eso también tiene su encanto",
    "¡Estás evolucionando! ¡En breve serás SUPER EFECTIVO!",
    "¡Serías un gran entrenador de Gimnasio!",
    "¡A la altura del Alto Mando!",
    "¡Súper eficaz! Solo te faltó un Caramelo Raro más",
    "Legendary! You caught'em all! 🎉"
  ];
  // Use Math.round to map score to index (for non-integer scores)
  return phrases[Math.round((s / maxScore) * 10)] || "Keep battling!";
}
