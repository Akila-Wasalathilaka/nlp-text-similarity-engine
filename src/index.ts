import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { registerRoutes } from './api/routes.js';

const fastify = Fastify({
  logger: {
    level: 'info'
  }
});

async function start() {
  try {
    // Register CORS
    await fastify.register(cors, {
      origin: true
    });

    // Register routes
    await registerRoutes(fastify);

    // Start server
    const port = parseInt(process.env.PORT || '3000');
    await fastify.listen({ port, host: '0.0.0.0' });
    
    console.log(`🚀 Humanizer Engine running on port ${port}`);
    console.log(`📝 Available modes: academic-student, academic-professional, professional, casual-formal`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

start();