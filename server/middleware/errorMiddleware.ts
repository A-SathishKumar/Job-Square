/**
 * Centralized Enterprise Error Handling Middleware
 * Prevents information disclosure (OWASP A05) and logs security anomalies.
 */

import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.ts';

export interface AppError extends Error {
  statusCode?: number;
  code?: string | number;
  isOperational?: boolean;
}

export function notFound(req: Request, res: Response, next: NextFunction): void {
  const error: AppError = new Error(`Resource not found at ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

export function errorHandler(err: AppError, req: Request, res: Response, _next: NextFunction): void {
  const statusCode = err.statusCode || (res.statusCode !== 200 ? res.statusCode : 500);

  // Security and operational error logging
  if (statusCode >= 500) {
    logger.error(`Internal Server Error: ${err.message}`, {
      path: req.originalUrl,
      method: req.method,
      ip: req.ip,
      stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
    });
  } else {
    logger.warn(`Handled client exception (${statusCode}): ${err.message}`, {
      path: req.originalUrl,
      method: req.method
    });
  }

  const isProduction = process.env.NODE_ENV === 'production';

  res.status(statusCode).json({
    success: false,
    message: isProduction && statusCode === 500 
      ? 'An internal executive advisory error occurred. The incident has been recorded.' 
      : err.message,
    ...(isProduction ? {} : { stack: err.stack })
  });
}
