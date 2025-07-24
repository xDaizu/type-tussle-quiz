import feedbackData from './answer-feedback.es.json';

export class FeedbackProvider {
  static getFeedback(type: string, result: 'pass' | 'fail'): string {
    // Normalize type to lowercase for lookup
    const entry = feedbackData[type.toLowerCase()];
    if (entry && entry[result]) {
      return entry[result];
    }
    // Fallback message
    return result === 'pass' ? '¡Bien hecho!' : 'Sigue intentándolo.';
  }
} 