import { z } from 'zod';
import { WritingMode } from '../engine/modes.js';

export const RewriteRequestSchema = z.object({
  text: z.string().min(1, 'Text cannot be empty').max(50000, 'Text too long'),
  mode: z.nativeEnum(WritingMode),
  preserveFormatting: z.boolean().optional().default(true)
});

export type RewriteRequest = z.infer<typeof RewriteRequestSchema>;