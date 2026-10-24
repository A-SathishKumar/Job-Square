/**
 * Whitepaper & Executive Insights Entity
 * Strategic research publications, board briefing memos, and human capital analytics.
 */

export interface WhitepaperDocument {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  downloadCount: number;
  publishedDate: string;
  readTime: string;
  pageCount: number;
  keyTakeaways: string[];
  executiveQuote: string;
  author: string;
  authorTitle: string;
  fileUrl: string;
}

const WHITEPAPERS_DATA: WhitepaperDocument[] = [
  {
    id: 'wp-01',
    slug: '2026-executive-compensation-governance',
    title: 'The 2026 Boardroom Directive: Executive Compensation, Say-on-Pay, and Clawback Mandates',
    category: 'Executive Governance & Compensation',
    summary: 'A deep empirical study of S&P 500 and FTSE 100 proxy filings analyzing shifting performance-share structures, non-financial ESG hurdles, and SEC clawback enforcement.',
    downloadCount: 1420,
    publishedDate: 'January 2026',
    readTime: '12 min read',
    pageCount: 38,
    keyTakeaways: [
      'Over 74% of enterprise compensation committees now tie at least 25% of LTIP grants to relative TSR and human capital retention ratios.',
      'SEC and European statutory clawback provisions require explicit automated recovery mechanisms in standard executive contracts.',
      'Median CEO pay ratios stabilized at 198:1, with an increasing shift toward restricted stock units with multi-year performance gates.'
    ],
    executiveQuote: 'Compensation design is no longer just a recruitment lever; it is the ultimate expression of corporate risk governance.',
    author: 'Eleanor Vance',
    authorTitle: 'Senior Managing Partner - Executive Search & Governance',
    fileUrl: '/downloads/whitepapers/JobSquare_Executive_Comp_2026.pdf'
  },
  {
    id: 'wp-02',
    slug: 'span-of-control-organizational-velocity',
    title: 'Span of Control & Organizational Velocity: Eradicating Enterprise Managerial Drag',
    category: 'Organizational Architecture',
    summary: 'Forensic analysis of 120 global enterprises demonstrating how excessive organizational layers inflate SG&A by 24% while halving market execution speed.',
    downloadCount: 980,
    publishedDate: 'November 2025',
    readTime: '14 min read',
    pageCount: 46,
    keyTakeaways: [
      'Optimal managerial spans of control range between 7 and 10 direct reports for knowledge work, yet 62% of enterprises average 3.8.',
      'Each redundant supervisory layer between frontline execution and the C-Suite reduces operational message fidelity by up to 35%.',
      'Enterprises adopting flat matrix governance achieve 2.4x higher velocity in rolling out digital products.'
    ],
    executiveQuote: 'Organizational charts are not trophies of hierarchy; they are hydraulic plumbing systems for strategic decision-making.',
    author: 'Marcus Sterling',
    authorTitle: 'Chief Advisory Architect & Head of Organizational Practice',
    fileUrl: '/downloads/whitepapers/JobSquare_Span_Of_Control_Velocity.pdf'
  },
  {
    id: 'wp-03',
    slug: 'cross-border-labor-compliance-dossier',
    title: 'Cross-Border Workforce Compliance: Navigating Statutory Worker Classification and AI In Hiring',
    category: 'Regulatory Compliance & Risk',
    summary: 'A definitive legal and human capital risk playbook for multinational enterprises navigating the EU AI Act, US EEOC algorithmic guidelines, and global payroll compliance.',
    downloadCount: 1150,
    publishedDate: 'September 2025',
    readTime: '16 min read',
    pageCount: 52,
    keyTakeaways: [
      'Automated candidate screening models are now classified as high-risk under the EU AI Act, requiring explicit human oversight logs.',
      'Independent contractor misclassification audits surged by 180% globally over the last 18 months.',
      'Proactive compliance diagnostics reduce unexpected labor settlement exposures by an average of $3.2M per 1,000 employees.'
    ],
    executiveQuote: 'Ignoring labor regulation in cross-border scaling is the single most expensive oversight in modern corporate strategy.',
    author: 'Claire Delacroix, J.D.',
    authorTitle: 'Partner - Regulatory Practice & Global Labor Advisory',
    fileUrl: '/downloads/whitepapers/JobSquare_Labor_Compliance_Dossier.pdf'
  }
];

export function getWhitepapers(): WhitepaperDocument[] {
  return WHITEPAPERS_DATA;
}

export function getWhitepaperBySlug(slug: string): WhitepaperDocument | undefined {
  return WHITEPAPERS_DATA.find(w => w.slug === slug || w.id === slug);
}

export function incrementWhitepaperDownload(slug: string): WhitepaperDocument | undefined {
  const item = WHITEPAPERS_DATA.find(w => w.slug === slug || w.id === slug);
  if (item) {
    item.downloadCount += 1;
  }
  return item;
}
