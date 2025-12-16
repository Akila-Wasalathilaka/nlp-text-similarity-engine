export class InputNormalizer {
  static normalize(text: string): string {
    return text
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/[ \t]+/g, ' ')
      .trim();
  }

  static validateInput(text: string): { valid: boolean; error?: string } {
    if (!text || text.trim().length === 0) {
      return { valid: false, error: 'Input text cannot be empty' };
    }
    
    if (text.length > 50000) {
      return { valid: false, error: 'Input text too long (max 50,000 characters)' };
    }

    return { valid: true };
  }

  static preserveStructure(text: string): { paragraphs: string[]; structure: string } {
    const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0);
    const structure = text.replace(/[^\n]/g, 'X');
    
    return { paragraphs, structure };
  }
}