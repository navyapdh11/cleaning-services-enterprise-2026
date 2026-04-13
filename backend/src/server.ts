import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { env } from './config/env';
import logger from './middleware/logger';
import { prisma } from './config/database';

const PORT = env.PORT;

const start = async () => {
  try {
    await prisma.$connect();
    logger.info('Database connected');

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT} in ${env.NODE_ENV} mode`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

start();
