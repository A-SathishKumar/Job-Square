/**
 * Consultation & Advisory Booking Routes
 * Handles public executive inquiry capture and authenticated partner pipeline management.
 */

import { Router } from 'express';
import {
  createBooking,
  getConsultations,
  getConsultationById,
  updateConsultation
} from '../controllers/consultationController.ts';
import { protect, authorize } from '../middleware/authMiddleware.ts';
import { strictLimiter, apiLimiter } from '../middleware/rateLimiter.ts';
import { sanitizeInput } from '../middleware/sanitizeMiddleware.ts';

const router = Router();

// Public: Lead capture & consultation booking with strict limiter
router.post('/', strictLimiter, sanitizeInput, createBooking);

// Protected: Partner & Admin triage endpoints
router.get('/', protect, authorize('admin', 'partner'), apiLimiter, getConsultations);
router.get('/:id', protect, authorize('admin', 'partner'), apiLimiter, getConsultationById);
router.patch('/:id', protect, authorize('admin', 'partner'), sanitizeInput, updateConsultation);

export default router;
