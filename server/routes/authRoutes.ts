/**
 * Authentication Routes for Job Square Advisory Portal
 * Protected with strict rate limiting and session guardrails.
 */

import { Router } from 'express';
import { register, login, logout, getMe } from '../controllers/authController.ts';
import { protect } from '../middleware/authMiddleware.ts';
import { strictLimiter } from '../middleware/rateLimiter.ts';
import { sanitizeInput } from '../middleware/sanitizeMiddleware.ts';

const router = Router();

router.post('/register', strictLimiter, sanitizeInput, register);
router.post('/login', strictLimiter, sanitizeInput, login);
router.post('/logout', logout);
router.get('/me', protect, getMe);

export default router;
