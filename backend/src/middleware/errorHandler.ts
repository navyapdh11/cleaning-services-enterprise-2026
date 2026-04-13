import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';
import logger from './logger';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        code: err.code,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
      },
    });
  }

  logger.error('Unhandled error:', err);

  return res.status(500).json({
    success: false,
    error: {
      message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
    },
  });
};
