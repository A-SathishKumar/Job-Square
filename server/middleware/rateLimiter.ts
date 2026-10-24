/**
 * Tiered Rate Limiting Middleware (OWASP Defense against Brute Force & DoS)
 * Employs express-rate-limit with customized response headers and audit logging.
 */

import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';
import logger from '../utils/logger.ts';

// General API Rate Limiter: 100 requests per 15 minutes per IP
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please wait 15 minutes before retrying.'
  },
  handler: (req: Request, res: Response, _next, options) => {
    logger.security('Rate limit exceeded on general API', { ip: req.ip, path: req.originalUrl });
    res.status(options.statusCode).json(options.message);
  }
});

// Strict Rate Limiter for Authentication & Advisory Booking (10 requests per 15 minutes per IP)
export const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests to this sensitive endpoint. Executive rate-protection active. Please retry after 15 minutes.'
  },
  handler: (req: Request, res: Response, _next, options) => {
    logger.security('Strict rate limit breached on sensitive endpoint', { ip: req.ip, path: req.originalUrl });
    res.status(options.statusCode).json(options.message);
  }
});
