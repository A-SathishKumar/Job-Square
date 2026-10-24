/**
 * Authentication Controller for Job Square Advisory Portal
 * Handles login, registration, session management, and HTTP-only cookie handling.
 */

import { Request, Response } from 'express';
import {
  findUserByEmail,
  verifyPassword,
  generateToken,
  toSafeUser,
  createUser,
  isAccountLocked,
  recordFailedLogin,
  recordSuccessfulLogin
} from '../models/User.ts';
import logger from '../utils/logger.ts';
import { AuthenticatedRequest } from '../middleware/authMiddleware.ts';

const COOKIE_NAME = 'jwt_token';
const IS_PROD = process.env.NODE_ENV === 'production';

function setAuthCookie(res: Response, token: string): void {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: 'lax',
    maxAge: 8 * 60 * 60 * 1000 // 8 hours
  });
}

export function register(req: Request, res: Response): void {
  try {
    const { name, email, password, role, title } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: 'Name, corporate email, and a secure password are required.'
      });
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        message: 'A valid email address is required.'
      });
      return;
    }

    // Password strength verification (min 8 chars, 1 uppercase, 1 number)
    if (password.length < 8) {
      res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long.'
      });
      return;
    }

    const safeUser = createUser({
      name,
      email,
      password,
      role: role === 'admin' ? 'admin' : (role === 'partner' ? 'partner' : 'client'),
      title
    });

    const token = generateToken(safeUser);
    setAuthCookie(res, token);

    logger.audit('New user account registered', {
      userId: safeUser.id,
      email: safeUser.email,
      role: safeUser.role
    });

    res.status(201).json({
      success: true,
      message: 'Account successfully registered.',
      user: safeUser,
      token
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    res.status(400).json({
      success: false,
      message: errorMsg
    });
  }
}

export function login(req: Request, res: Response): void {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Email and password are required.'
      });
      return;
    }

    const userDoc = findUserByEmail(email);
    if (!userDoc) {
      logger.security('Failed login: unknown email', { email, ip: req.ip });
      res.status(401).json({
        success: false,
        message: 'Invalid corporate credentials.'
      });
      return;
    }

    // Check account lockout
    if (isAccountLocked(userDoc)) {
      logger.security('Login attempt on locked account', { userId: userDoc.id, email });
      res.status(423).json({
        success: false,
        message: 'Account temporarily locked due to excessive failed attempts. Please retry in 15 minutes.'
      });
      return;
    }

    // Verify bcrypt hash
    const isMatch = verifyPassword(password, userDoc.password);
    if (!isMatch) {
      recordFailedLogin(userDoc);
      logger.security('Failed login: bad password', { userId: userDoc.id, ip: req.ip });
      res.status(401).json({
        success: false,
        message: 'Invalid corporate credentials.'
      });
      return;
    }

    // Successful login
    recordSuccessfulLogin(userDoc);
    const safeUser = toSafeUser(userDoc);
    const token = generateToken(safeUser);
    setAuthCookie(res, token);

    logger.audit('User logged in successfully', {
      userId: safeUser.id,
      role: safeUser.role,
      ip: req.ip
    });

    res.status(200).json({
      success: true,
      message: 'Authentication successful.',
      user: safeUser,
      token
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    logger.error('Login processing error', { error: errorMsg });
    res.status(500).json({
      success: false,
      message: 'An internal authentication error occurred.'
    });
  }
}

export function logout(req: Request, res: Response): void {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: 'lax'
  });

  logger.info('User logged out', { ip: req.ip });

  res.status(200).json({
    success: true,
    message: 'Session successfully terminated.'
  });
}

export function getMe(req: AuthenticatedRequest, res: Response): void {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: 'Not authenticated.'
    });
    return;
  }

  res.status(200).json({
    success: true,
    user: req.user
  });
}
