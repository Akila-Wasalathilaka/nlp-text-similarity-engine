import { InputNormalizer } from './normalizer.js';
import { ParagraphSegmenter, TextSegment } from './segmenter.js';
import { MistralClient } from './mistralClient.js';
import { PostProcessor } from './postProcessor.js';
import { WritingMode } from './modes.js';

export interface RewriteOptions {
  mode: WritingMode;
  preserveFormatting?: boolean;
}

export interface RewriteResult {
  rewrittenText: string;
  metrics: {
    sentenceLengthVariance: number;
    repetitionRate: number;
    readabilityImprovement: number;
  };
  processingTime: number;
}

export class RewriteController {
  private mistralClient: MistralClient;

  constructor(mistralApiKey: string) {
    this.mistralClient = new MistralClient(mistralApiKey);
  }

  async rewrite(inputText: string, options: RewriteOptions): Promise<RewriteResult> {
    const startTime = Date.now();
    
    // Step 1: Normalize and validate
    const validation = InputNormalizer.validateInput(inputText);
    if (!validation.valid) {
      throw new Error(validation.error);
    }
    
    const normalizedText = InputNormalizer.normalize(inputText);
    const { paragraphs } = InputNormalizer.preserveStructure(normalizedText);
    
    // Step 2: Segment paragraphs
    let segments = ParagraphSegmenter.segment(paragraphs);
    
    // Split long segments
    const processedSegments: TextSegment[] = [];
    for (const segment of segments) {
      if (ParagraphSegmenter.shouldSplit(segment)) {
        processedSegments.push(...ParagraphSegmenter.splitLongSegment(segment));
      } else {
        processedSegments.push(segment);
      }
    }
    
    // Step 3: Rewrite each segment
    const rewrittenSegments: string[] = [];
    for (const segment of processedSegments) {
      try {
        const rewritten = await this.mistralClient.rewriteParagraph(segment.content, options.mode);
        rewrittenSegments.push(rewritten);
        
        // Add small delay to avoid rate limiting
        await this.delay(100);
      } catch (error) {
        console.error(`Error rewriting segment ${segment.index}:`, error);
        rewrittenSegments.push(segment.content); // Fallback to original
      }
    }
    
    // Step 4: Post-process
    const finalText = PostProcessor.process(rewrittenSegments);
    const metrics = PostProcessor.calculateMetrics(normalizedText, finalText);
    
    return {
      rewrittenText: finalText,
      metrics,
      processingTime: Date.now() - startTime
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}