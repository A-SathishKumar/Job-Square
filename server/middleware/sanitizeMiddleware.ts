/**
 * Input Sanitization Middleware (OWASP Top 10: Injection & XSS Defenses)
 * Strips NoSQL injection vectors (keys with $, .), prototype pollution, and dangerous script tags.
 */

import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.ts';

function sanitizeValue(value: unknown): unknown {
  if (value === null || value === undefined) {
    return value;
  }

  if (typeof value === 'string') {
    // Strip script tags and dangerous HTML/JS injections
    let clean = value
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+="[^"]*"/gi, '')
      .replace(/on\w+='[^']*'/gi, '');
    
    // Trim leading/trailing whitespace
    return clean.trim();
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }

  if (typeof value === 'object') {
    const sanitizedObj: Record<string, unknown> = {};
    for (const key of Object.keys(value as Record<string, unknown>)) {
      // Prevent Prototype Pollution
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        logger.security('Prototype pollution attack blocked', { key });
        continue;
      }

      // Prevent NoSQL Injection: reject or strip keys starting with $ or containing .
      if (key.startsWith('$') || key.includes('.')) {
        logger.security('NoSQL injection vector stripped', { key });
        continue;
      }

      sanitizedObj[key] = sanitizeValue((value as Record<string, unknown>)[key]);
    }
    return sanitizedObj;
  }

  return value;
}

export function sanitizeInput(req: Request, _res: Response, next: NextFunction): void {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeValue(req.body);
  }

  if (req.query && typeof req.query === 'object') {
    req.query = sanitizeValue(req.query) as Record<string, any>;
  }

  if (req.params && typeof req.params === 'object') {
    req.params = sanitizeValue(req.params) as Record<string, string>;
  }

  next();
}
