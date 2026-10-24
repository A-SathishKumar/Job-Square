/**
 * Consultation & Advisory Booking Model
 * Manages executive inquiries, status workflows, and partner assignment tracking.
 */

import crypto from 'crypto';

export type HeadcountScope = '100-500' | '501-2,000' | '2,001-10,000' | '10,000+';

export type PrimaryPracticeInterest =
  | 'Executive Search & C-Suite Recruitment'
  | 'Organizational Transformation'
  | 'HR Compliance & Labor Audits'
  | 'Performance Management & OKRs'
  | 'C-Suite Leadership Coaching';

export type ConsultationStatus = 'Pending' | 'Reviewed' | 'Scheduled' | 'Archived';

export interface ConsultationDocument {
  id: string;
  referenceCode: string;
  fullName: string;
  corporateEmail: string;
  organizationName: string;
  headcountScope: HeadcountScope;
  primaryInterest: PrimaryPracticeInterest;
  notes: string;
  status: ConsultationStatus;
  assignedPartnerId?: string;
  assignedPartnerName?: string;
  ipHash: string;
  createdAt: string;
  updatedAt: string;
}

// In-memory data store with indexing
const consultationsStore = new Map<string, ConsultationDocument>();

export function generateReferenceCode(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `JS-ADV-${num}`;
}

export function hashIp(ip: string): string {
  return crypto.createHash('sha256').update(ip + (process.env.IP_SALT || 'job_square_salt_2026')).digest('hex').substring(0, 16);
}

export function createConsultation(data: {
  fullName: string;
  corporateEmail: string;
  organizationName: string;
  headcountScope: HeadcountScope;
  primaryInterest: PrimaryPracticeInterest;
  notes: string;
  ip: string;
}): ConsultationDocument {
  const id = `csl_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const now = new Date().toISOString();

  const consultation: ConsultationDocument = {
    id,
    referenceCode: generateReferenceCode(),
    fullName: data.fullName.trim(),
    corporateEmail: data.corporateEmail.toLowerCase().trim(),
    organizationName: data.organizationName.trim(),
    headcountScope: data.headcountScope,
    primaryInterest: data.primaryInterest,
    notes: data.notes.trim(),
    status: 'Pending',
    assignedPartnerName: 'Eleanor Vance', // Default senior partner triage
    ipHash: hashIp(data.ip),
    createdAt: now,
    updatedAt: now
  };

  consultationsStore.set(id, consultation);
  return consultation;
}

export function findConsultationById(id: string): ConsultationDocument | undefined {
  return consultationsStore.get(id);
}

export function listConsultations(filters?: {
  status?: ConsultationStatus;
  primaryInterest?: string;
  search?: string;
}): ConsultationDocument[] {
  let list = Array.from(consultationsStore.values());

  if (filters?.status) {
    list = list.filter(c => c.status === filters.status);
  }

  if (filters?.primaryInterest && filters.primaryInterest !== 'all') {
    list = list.filter(c => c.primaryInterest === filters.primaryInterest);
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(c => 
      c.fullName.toLowerCase().includes(q) ||
      c.organizationName.toLowerCase().includes(q) ||
      c.corporateEmail.toLowerCase().includes(q) ||
      c.referenceCode.toLowerCase().includes(q)
    );
  }

  // Sort descending by createdAt
  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function updateConsultationStatus(
  id: string,
  status: ConsultationStatus,
  assignedPartnerName?: string
): ConsultationDocument | undefined {
  const item = consultationsStore.get(id);
  if (!item) return undefined;

  item.status = status;
  if (assignedPartnerName) {
    item.assignedPartnerName = assignedPartnerName;
  }
  item.updatedAt = new Date().toISOString();
  consultationsStore.set(id, item);
  return item;
}

// Pre-seed a few realistic executive submissions so reviewers and partners see a populated pipeline
if (consultationsStore.size === 0) {
  consultationsStore.set('csl_sample_01', {
    id: 'csl_sample_01',
    referenceCode: 'JS-ADV-4192',
    fullName: 'Sophia Al-Mansoor',
    corporateEmail: 'sophia.almansoor@apexfintech.global',
    organizationName: 'Apex Global Financial Technologies',
    headcountScope: '2,001-10,000',
    primaryInterest: 'Executive Search & C-Suite Recruitment',
    notes: 'Requiring confidential retained advisory to recruit an Enterprise Chief People Officer to lead transatlantic headcount expansion across London and New York.',
    status: 'Reviewed',
    assignedPartnerName: 'Eleanor Vance',
    ipHash: 'a7f3b89012cd',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString()
  });

  consultationsStore.set('csl_sample_02', {
    id: 'csl_sample_02',
    referenceCode: 'JS-ADV-8834',
    fullName: 'Dr. Julian Thorne',
    corporateEmail: 'j.thorne@celestialpharma.com',
    organizationName: 'Celestial Biotherapeutics',
    headcountScope: '501-2,000',
    primaryInterest: 'Organizational Transformation',
    notes: 'Planning post-merger integration of 3 clinical research units. Need complete restructuring of human capital grading, OKR frameworks, and retention packages.',
    status: 'Scheduled',
    assignedPartnerName: 'Marcus Sterling',
    ipHash: 'b490f238d810',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString()
  });

  consultationsStore.set('csl_sample_03', {
    id: 'csl_sample_03',
    referenceCode: 'JS-ADV-9021',
    fullName: 'Helena Lindqvist',
    corporateEmail: 'h.lindqvist@nordichealthcare.se',
    organizationName: 'Nordic Health Systems Group',
    headcountScope: '10,000+',
    primaryInterest: 'HR Compliance & Labor Audits',
    notes: 'Conducting comprehensive cross-border labor audit and compliance risk assessment ahead of dual-market enterprise listing.',
    status: 'Pending',
    assignedPartnerName: 'Eleanor Vance',
    ipHash: 'c129e87bb674',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 3).toISOString()
  });
}
