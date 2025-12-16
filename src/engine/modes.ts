export enum WritingMode {
  ACADEMIC_STUDENT = 'academic-student',
  ACADEMIC_PROFESSIONAL = 'academic-professional', 
  PROFESSIONAL = 'professional',
  CASUAL_FORMAL = 'casual-formal'
}

export interface ModeConfig {
  avgSentenceLength: number;
  sentenceVariation: number;
  hedgingFrequency: number;
  complexityLevel: number;
  formalityScore: number;
}

export const MODE_CONFIGS: Record<WritingMode, ModeConfig> = {
  [WritingMode.ACADEMIC_STUDENT]: {
    avgSentenceLength: 18,
    sentenceVariation: 0.7,
    hedgingFrequency: 0.3,
    complexityLevel: 0.6,
    formalityScore: 0.7
  },
  [WritingMode.ACADEMIC_PROFESSIONAL]: {
    avgSentenceLength: 22,
    sentenceVariation: 0.6,
    hedgingFrequency: 0.4,
    complexityLevel: 0.8,
    formalityScore: 0.9
  },
  [WritingMode.PROFESSIONAL]: {
    avgSentenceLength: 16,
    sentenceVariation: 0.8,
    hedgingFrequency: 0.2,
    complexityLevel: 0.5,
    formalityScore: 0.8
  },
  [WritingMode.CASUAL_FORMAL]: {
    avgSentenceLength: 14,
    sentenceVariation: 0.9,
    hedgingFrequency: 0.1,
    complexityLevel: 0.4,
    formalityScore: 0.5
  }
};

export const FORBIDDEN_PHRASES = [
  'Additionally,', 'Furthermore,', 'Moreover,',
  'It is important to note', 'This demonstrates that',
  'In conclusion,', 'To summarize,', 'In summary,',
  'It should be noted that', 'It is worth mentioning',
  'As previously mentioned', 'As stated earlier'
];