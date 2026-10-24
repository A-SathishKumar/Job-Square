/**
 * Practice, Whitepaper & Case Study Controller
 * Delivers domain-specific strategic practice definitions, research publications, and case metrics.
 */

import { Request, Response } from 'express';
import { getPractices, getPracticeBySlug } from '../models/Practice.ts';
import { getWhitepapers, getWhitepaperBySlug, incrementWhitepaperDownload } from '../models/Whitepaper.ts';
import { getCaseStudies } from '../models/CaseStudy.ts';
import logger from '../utils/logger.ts';

export function getAllPractices(_req: Request, res: Response): void {
  const practices = getPractices();
  res.status(200).json({
    success: true,
    count: practices.length,
    practices
  });
}

export function getPracticeDetails(req: Request, res: Response): void {
  const { slug } = req.params;
  const practice = getPracticeBySlug(slug);

  if (!practice) {
    res.status(404).json({
      success: false,
      message: `Strategic practice '${slug}' not found.`
    });
    return;
  }

  res.status(200).json({
    success: true,
    practice
  });
}

export function getAllWhitepapers(_req: Request, res: Response): void {
  const whitepapers = getWhitepapers();
  res.status(200).json({
    success: true,
    count: whitepapers.length,
    whitepapers
  });
}

export function downloadWhitepaper(req: Request, res: Response): void {
  const { slug } = req.params;
  const paper = incrementWhitepaperDownload(slug);

  if (!paper) {
    res.status(404).json({
      success: false,
      message: 'Requested whitepaper publication was not found.'
    });
    return;
  }

  logger.audit('Executive whitepaper downloaded', {
    slug: paper.slug,
    title: paper.title,
    newCount: paper.downloadCount
  });

  res.status(200).json({
    success: true,
    message: 'Whitepaper download authorization granted.',
    downloadUrl: paper.fileUrl,
    whitepaper: paper
  });
}

export function getAllCaseStudies(req: Request, res: Response): void {
  const { category } = req.query;
  const caseStudies = getCaseStudies(category as string);

  res.status(200).json({
    success: true,
    count: caseStudies.length,
    caseStudies
  });
}
