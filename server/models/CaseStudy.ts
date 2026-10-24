/**
 * Case Study Model & Quantitative Executive Proof Points
 * Quantifiable outcomes, client testimonials, and industry metrics.
 */

export interface CaseStudyDocument {
  id: string;
  category: 'Tech' | 'Healthcare' | 'Financial Services' | 'Global Manufacturing';
  title: string;
  clientIndustry: string;
  organizationScope: string;
  primaryChallenge: string;
  strategicIntervention: string;
  keyOutcomes: {
    metric: string;
    label: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    organization: string;
  };
}

const CASE_STUDIES_DATA: CaseStudyDocument[] = [
  {
    id: 'cs-01',
    category: 'Tech',
    title: 'CloudScale Technologies: C-Suite Succession & Hypergrowth Org Redesign',
    clientIndustry: 'Enterprise SaaS & Cloud Infrastructure',
    organizationScope: '3,800 FTEs across 14 Countries',
    primaryChallenge: 'Experiencing 42% executive turnover during a post-Series D transition, with severe managerial bottlenecks in engineering and product lines.',
    strategicIntervention: 'Conducted a forensic 360° span-of-control audit, recruited a veteran Chief People Officer and Chief Revenue Officer, and instituted quarterly OKR cascades.',
    keyOutcomes: [
      { metric: '96.2%', label: 'Executive retention over 24-month horizon' },
      { metric: '2.8x', label: 'Faster time-to-market for enterprise features' },
      { metric: '$18.4M', label: 'Reduction in redundant overhead and contractor fees' }
    ],
    testimonial: {
      quote: 'Job Square transformed our leadership architecture from a chaotic startup model into a disciplined, high-velocity enterprise powerhouse.',
      author: 'David K. Vance',
      role: 'Chief Executive Officer',
      organization: 'CloudScale Technologies Inc.'
    }
  },
  {
    id: 'cs-02',
    category: 'Healthcare',
    title: 'Veritas Health Alliance: Post-Merger Labor Compliance & Clinical Integration',
    clientIndustry: 'Integrated Hospital Networks & Biopharma',
    organizationScope: '14,500 Clinical & Administrative Personnel',
    primaryChallenge: 'Merger of three regional health systems resulting in massive FLSA classification discrepancies, overlapping unions, and $34M in potential exposure.',
    strategicIntervention: 'Executed an exhaustive multi-site labor audit across 18 hospital facilities, harmonized compensation bands, and developed a standardized governance model.',
    keyOutcomes: [
      { metric: '100%', label: 'Statutory compliance achieved with zero regulatory fines' },
      { metric: '$29M+', label: 'Contingent labor liability eliminated prior to audit' },
      { metric: '91%', label: 'Clinical department chair retention rate' }
    ],
    testimonial: {
      quote: 'Their regulatory precision and deep empathy for clinical workflows shielded our health network from catastrophic compliance liabilities during a volatile merger.',
      author: 'Dr. Rebecca Aris',
      role: 'Chief Medical Officer & Trustee',
      organization: 'Veritas Health Alliance'
    }
  },
  {
    id: 'cs-03',
    category: 'Financial Services',
    title: 'Meridian Capital Partners: Executive Search & Board Governance Overhaul',
    clientIndustry: 'Private Equity & Sovereign Wealth Management',
    organizationScope: '$48B AUM / 85 Portfolio Holdings',
    primaryChallenge: 'Urgent need to replace retiring Chief Investment Officer and install an independent audit and risk committee for a new London and Dubai fund launch.',
    strategicIntervention: 'Confidential executive search mandate mapping 140 global investment leaders, executing behavioral due diligence and structuring a clawback-hardened LTIP.',
    keyOutcomes: [
      { metric: '34 Days', label: 'From mandate launch to signed employment offer' },
      { metric: '100%', label: 'Unanimous supervisory board endorsement' },
      { metric: 'Top Decile', label: 'Fund performance ranking achieved within 18 months' }
    ],
    testimonial: {
      quote: 'Job Square is our sovereign firm’s only call for confidential executive placements. Their discretion, forensic rigor, and board presence are unparalleled.',
      author: 'Tariq Al-Sabah',
      role: 'Managing Partner & Executive Board Chair',
      organization: 'Meridian Capital Partners'
    }
  },
  {
    id: 'cs-04',
    category: 'Global Manufacturing',
    title: 'Volta Industrial Group: Span of Control & GCC Talent Optimization',
    clientIndustry: 'Advanced Precision Robotics & Automotive OEM',
    organizationScope: '22,000 Employees across Europe & APAC',
    primaryChallenge: 'Decentralized factory operations with 9 layers of management, causing crippling delays in capital expenditure authorizations and talent attrition.',
    strategicIntervention: 'Redesigned the corporate center into agile cross-functional value streams and established a 600-person high-value Global Capability Center (GCC).',
    keyOutcomes: [
      { metric: '38%', label: 'Reduction in managerial layers (from 9 down to 5)' },
      { metric: '$42M', label: 'Annual recurring operational cost savings' },
      { metric: '+48 pts', label: 'Improvement in employee engagement index' }
    ],
    testimonial: {
      quote: 'The operating model restructuring designed by Job Square gave Volta the speed of a software company with the scale of a global manufacturing titan.',
      author: 'Henrik Von Berg',
      role: 'Executive Vice President of Operations',
      organization: 'Volta Industrial Group'
    }
  }
];

export function getCaseStudies(category?: string): CaseStudyDocument[] {
  if (!category || category === 'All') {
    return CASE_STUDIES_DATA;
  }
  return CASE_STUDIES_DATA.filter(cs => cs.category.toLowerCase() === category.toLowerCase());
}
