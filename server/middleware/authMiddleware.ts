/**
 * Authentication & Role-Based Authorization Middleware
 * Verifies JWT from HTTP-only cookies or Authorization Bearer header.
 * Enforces Role-Based Access Control (RBAC).
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger.ts';
import { findUserById, SafeUser } from '../models/User.ts';

const JWT_SECRET = process.env.JWT_SECRET || 'jobsquare_executive_jwt_super_secret_key_2026_production';

export interface AuthenticatedRequest extends Request {
  user?: SafeUser;
}

export function protect(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  try {
    let token: string | undefined;

    // 1. Check Authorization Bearer header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    } 
    // 2. Check HTTP-only cookie
    else if (req.cookies && req.cookies.jwt_token) {
      token = req.cookies.jwt_token;
    }

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Authentication required. Access denied.'
      });
      return;
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string; role: string };

    const user = findUserById(decoded.id);
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Account not found or session revoked.'
      });
      return;
    }

    req.user = user;
    next();
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    logger.security('Invalid token authentication attempt', { error: errorMsg, ip: req.ip });
    res.status(401).json({
      success: false,
      message: 'Invalid or expired session token.'
    });
  }
}

export function authorize(...roles: Array<'admin' | 'partner' | 'client'>) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'User authentication required.'
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      logger.security('Unauthorized role access attempt', {
        userId: req.user.id,
        userRole: req.user.role,
        requiredRoles: roles,
        path: req.originalUrl
      });
      res.status(403).json({
        success: false,
        message: 'Forbidden: Insufficient privileges for this executive resource.'
      });
      return;
    }

    next();
  };
}
