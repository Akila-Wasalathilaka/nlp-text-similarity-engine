import { FastifyInstance } from 'fastify';
import { RewriteController } from '../engine/rewriteController.js';
import { RewriteRequestSchema } from '../utils/validation.js';
import { WritingMode } from '../engine/modes.js';

export async function registerRoutes(fastify: FastifyInstance) {
  const rewriteController = new RewriteController(process.env.MISTRAL_API_KEY!);

  // Health check
  fastify.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  // Get available writing modes
  fastify.get('/modes', async () => {
    return {
      modes: Object.values(WritingMode).map(mode => ({
        id: mode,
        name: mode.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
      }))
    };
  });

  // Main rewrite endpoint
  fastify.post('/rewrite', {
    schema: {
      body: {
        type: 'object',
        required: ['text', 'mode'],
        properties: {
          text: { type: 'string', minLength: 1, maxLength: 50000 },
          mode: { type: 'string', enum: Object.values(WritingMode) },
          preserveFormatting: { type: 'boolean', default: true }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const validatedData = RewriteRequestSchema.parse(request.body);
      
      const result = await rewriteController.rewrite(validatedData.text, {
        mode: validatedData.mode,
        preserveFormatting: validatedData.preserveFormatting
      });

      return {
        success: true,
        data: result
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      reply.status(400);
      return {
        success: false,
        error: message
      };
    }
  });
}