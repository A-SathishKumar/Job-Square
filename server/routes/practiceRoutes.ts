/**
 * Strategic Practices, Case Studies & Whitepapers Routes
 */

import { Router } from 'express';
import {
  getAllPractices,
  getPracticeDetails,
  getAllWhitepapers,
  downloadWhitepaper,
  getAllCaseStudies
} from '../controllers/practiceController.ts';
import { apiLimiter, strictLimiter } from '../middleware/rateLimiter.ts';

const router = Router();

router.get('/', apiLimiter, getAllPractices);
router.get('/case-studies', apiLimiter, getAllCaseStudies);
router.get('/whitepapers', apiLimiter, getAllWhitepapers);
router.post('/whitepapers/:slug/download', strictLimiter, downloadWhitepaper);
router.get('/:slug', apiLimiter, getPracticeDetails);

export default router;
