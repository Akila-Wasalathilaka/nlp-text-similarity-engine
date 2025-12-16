import { FORBIDDEN_PHRASES } from './modes.js';

export class PostProcessor {
  static process(paragraphs: string[]): string {
    const cleaned = paragraphs.map(p => this.cleanParagraph(p));
    const merged = this.mergeNaturally(cleaned);
    return this.finalCleanup(merged);
  }

  private static cleanParagraph(paragraph: string): string {
    let cleaned = paragraph;
    
    // Remove forbidden phrases
    FORBIDDEN_PHRASES.forEach(phrase => {
      const regex = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      cleaned = cleaned.replace(regex, '');
    });
    
    // Clean up double spaces and punctuation
    cleaned = cleaned
      .replace(/\s{2,}/g, ' ')
      .replace(/\s+([,.!?;:])/g, '$1')
      .replace(/([.!?])\s*([.!?])/g, '$1')
      .trim();
    
    return cleaned;
  }

  private static mergeNaturally(paragraphs: string[]): string {
    return paragraphs
      .filter(p => p.length > 0)
      .join('\n\n');
  }

  private static finalCleanup(text: string): string {
    return text
      .replace(/\n{3,}/g, '\n\n')
      .replace(/\s+$/gm, '')
      .trim();
  }

  static calculateMetrics(original: string, rewritten: string) {
    const originalSentences = this.getSentences(original);
    const rewrittenSentences = this.getSentences(rewritten);
    
    return {
      sentenceLengthVariance: this.calculateVariance(rewrittenSentences.map(s => s.split(' ').length)),
      repetitionRate: this.calculateRepetition(rewritten),
      readabilityImprovement: this.estimateReadability(rewritten) - this.estimateReadability(original)
    };
  }

  private static getSentences(text: string): string[] {
    return text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  }

  private static calculateVariance(lengths: number[]): number {
    const mean = lengths.reduce((a, b) => a + b, 0) / lengths.length;
    const variance = lengths.reduce((acc, len) => acc + Math.pow(len - mean, 2), 0) / lengths.length;
    return Math.sqrt(variance);
  }

  private static calculateRepetition(text: string): number {
    const words = text.toLowerCase().split(/\s+/);
    const unique = new Set(words);
    return 1 - (unique.size / words.length);
  }

  private static estimateReadability(text: string): number {
    const sentences = this.getSentences(text);
    const words = text.split(/\s+/);
    const avgWordsPerSentence = words.length / sentences.length;
    
    // Simple readability estimate (lower is more readable)
    return Math.max(0, Math.min(100, avgWordsPerSentence * 2));
  }
}