export interface TextSegment {
  content: string;
  index: number;
  wordCount: number;
}

export class ParagraphSegmenter {
  static segment(paragraphs: string[]): TextSegment[] {
    return paragraphs.map((paragraph, index) => ({
      content: paragraph.trim(),
      index,
      wordCount: this.countWords(paragraph)
    })).filter(segment => segment.wordCount > 0);
  }

  private static countWords(text: string): number {
    return text.trim().split(/\s+/).length;
  }

  static shouldSplit(segment: TextSegment): boolean {
    return segment.wordCount > 200;
  }

  static splitLongSegment(segment: TextSegment): TextSegment[] {
    const sentences = segment.content.split(/(?<=[.!?])\s+/);
    const chunks: string[] = [];
    let currentChunk = '';
    
    for (const sentence of sentences) {
      if ((currentChunk + sentence).split(/\s+/).length > 150) {
        if (currentChunk) chunks.push(currentChunk.trim());
        currentChunk = sentence;
      } else {
        currentChunk += (currentChunk ? ' ' : '') + sentence;
      }
    }
    
    if (currentChunk) chunks.push(currentChunk.trim());
    
    return chunks.map((chunk, i) => ({
      content: chunk,
      index: segment.index + i * 0.1,
      wordCount: this.countWords(chunk)
    }));
  }
}