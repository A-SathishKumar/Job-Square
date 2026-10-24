/**
 * Consultation & Advisory Booking Controller
 * Processes executive advisory requests, validates corporate credentials,
 * and maintains the consultation lifecycle.
 */

import { Request, Response } from 'express';
import {
  createConsultation,
  listConsultations,
  findConsultationById,
  updateConsultationStatus,
  HeadcountScope,
  PrimaryPracticeInterest,
  ConsultationStatus
} from '../models/Consultation.ts';
import { sendEmail } from '../utils/sendEmail.ts';
import logger from '../utils/logger.ts';
import { AuthenticatedRequest } from '../middleware/authMiddleware.ts';

const VALID_HEADCOUNTS: HeadcountScope[] = ['100-500', '501-2,000', '2,001-10,000', '10,000+'];

const VALID_PRACTICES: PrimaryPracticeInterest[] = [
  'Executive Search & C-Suite Recruitment',
  'Organizational Transformation',
  'HR Compliance & Labor Audits',
  'Performance Management & OKRs',
  'C-Suite Leadership Coaching'
];

export async function createBooking(req: Request, res: Response): Promise<void> {
  try {
    const { fullName, corporateEmail, organizationName, headcountScope, primaryInterest, notes } = req.body;

    // Strict validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      res.status(400).json({
        success: false,
        message: 'A valid executive contact name is required.'
      });
      return;
    }

    if (!corporateEmail || typeof corporateEmail !== 'string') {
      res.status(400).json({
        success: false,
        message: 'A valid corporate email address is required.'
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(corporateEmail.trim())) {
      res.status(400).json({
        success: false,
        message: 'Please provide a valid corporate email format (e.g. name@company.com).'
      });
      return;
    }

    if (!organizationName || typeof organizationName !== 'string' || organizationName.trim().length < 2) {
      res.status(400).json({
        success: false,
        message: 'Enterprise or organization name is required.'
      });
      return;
    }

    if (!VALID_HEADCOUNTS.includes(headcountScope)) {
      res.status(400).json({
        success: false,
        message: 'Please select a valid enterprise headcount scope tier.'
      });
      return;
    }

    if (!VALID_PRACTICES.includes(primaryInterest)) {
      res.status(400).json({
        success: false,
        message: 'Please select one of Job Square’s 5 strategic practice areas.'
      });
      return;
    }

    // Notes length guard (max 1000 characters)
    const sanitizedNotes = typeof notes === 'string' ? notes.substring(0, 1000) : '';

    const ip = req.ip || req.socket.remoteAddress || '127.0.0.1';

    const consultation = createConsultation({
      fullName,
      corporateEmail,
      organizationName,
      headcountScope,
      primaryInterest,
      notes: sanitizedNotes,
      ip
    });

    logger.audit('Executive advisory booking registered', {
      referenceCode: consultation.referenceCode,
      organization: consultation.organizationName,
      practice: consultation.primaryInterest
    });

    // Send confirmation email
    await sendEmail({
      to: consultation.corporateEmail,
      subject: `Executive Consultation Confirmed [Ref: ${consultation.referenceCode}] — Job Square Advisory`,
      html: `
        <h2>Executive Advisory Session Scheduled</h2>
        <p>Dear ${consultation.fullName},</p>
        <p>Your strategic consultation with <strong>Job Square</strong> has been registered under Reference Code <strong>${consultation.referenceCode}</strong>.</p>
        <p><strong>Practice:</strong> ${consultation.primaryInterest}</p>
        <p><strong>Organization:</strong> ${consultation.organizationName}</p>
        <p>A Senior Managing Partner has been designated to review your scope notes prior to our preliminary briefing call.</p>
      `
    });

    res.status(201).json({
      success: true,
      message: 'Executive advisory session request submitted successfully.',
      referenceCode: consultation.referenceCode,
      consultation: {
        id: consultation.id,
        referenceCode: consultation.referenceCode,
        fullName: consultation.fullName,
        organizationName: consultation.organizationName,
        headcountScope: consultation.headcountScope,
        primaryInterest: consultation.primaryInterest,
        status: consultation.status,
        assignedPartnerName: consultation.assignedPartnerName,
        createdAt: consultation.createdAt
      }
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    logger.error('Error creating consultation booking', { error: errorMsg });
    res.status(500).json({
      success: false,
      message: 'Failed to record consultation booking due to an internal advisory error.'
    });
  }
}

export function getConsultations(req: AuthenticatedRequest, res: Response): void {
  try {
    const { status, primaryInterest, search } = req.query;

    const consultations = listConsultations({
      status: status as ConsultationStatus,
      primaryInterest: primaryInterest as string,
      search: search as string
    });

    res.status(200).json({
      success: true,
      count: consultations.length,
      consultations
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    logger.error('Error listing consultations', { error: errorMsg });
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve executive advisory pipeline.'
    });
  }
}

export function getConsultationById(req: AuthenticatedRequest, res: Response): void {
  try {
    const { id } = req.params;
    const consultation = findConsultationById(id);

    if (!consultation) {
      res.status(404).json({
        success: false,
        message: 'Advisory consultation record not found.'
      });
      return;
    }

    res.status(200).json({
      success: true,
      consultation
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    res.status(500).json({
      success: false,
      message: errorMsg
    });
  }
}

export function updateConsultation(req: AuthenticatedRequest, res: Response): void {
  try {
    const { id } = req.params;
    const { status, assignedPartnerName } = req.body;

    const validStatuses: ConsultationStatus[] = ['Pending', 'Reviewed', 'Scheduled', 'Archived'];
    if (status && !validStatuses.includes(status)) {
      res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
      return;
    }

    const updated = updateConsultationStatus(id, status, assignedPartnerName);
    if (!updated) {
      res.status(404).json({
        success: false,
        message: 'Advisory consultation record not found.'
      });
      return;
    }

    logger.audit('Advisory consultation updated', {
      id: updated.id,
      referenceCode: updated.referenceCode,
      status: updated.status,
      assignedPartner: updated.assignedPartnerName,
      updatedBy: req.user?.email
    });

    res.status(200).json({
      success: true,
      message: 'Consultation record updated successfully.',
      consultation: updated
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    res.status(500).json({
      success: false,
      message: errorMsg
    });
  }
}
