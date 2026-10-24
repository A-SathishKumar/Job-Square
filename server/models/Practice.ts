/**
 * Practice Area Entity & Strategic Advisory Models
 * Represents the 5 specialized Human Capital practices of Job Square.
 */

export interface DynamicMetric {
  label: string;
  value: string;
  description: string;
}

export interface PracticeArea {
  id: string;
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  leadPartner: string;
  leadPartnerTitle: string;
  keyDeliverables: string[];
  dynamicMetrics: DynamicMetric[];
  methodologySteps: { step: string; title: string; detail: string }[];
}

export const PRACTICES_DATA: PracticeArea[] = [
  {
    id: 'practice-csuite',
    slug: 'executive-search',
    category: 'Talent Acquisition & Board Advisory',
    title: 'Executive Search & C-Suite Recruitment',
    tagline: 'Precision placement of transformative C-Suite officers and governance boards.',
    description: 'We partner with enterprise boards and CEOs to identify, evaluate, and secure Tier-1 executive talent. Leveraging our proprietary forensic leadership assessment matrix, we de-risk senior appointments and ensure strategic cultural alignment.',
    leadPartner: 'Eleanor Vance',
    leadPartnerTitle: 'Senior Managing Partner - Executive Search & Governance',
    keyDeliverables: [
      'Comprehensive 360° Forensic Leadership Due Diligence',
      'Confidential Cross-Market Mapping & Competitor Intelligence',
      'Proprietary Executive Cultural Fit & Psychometric Diagnostic',
      'Board-Level Compensation Structuring & Equity Benchmarking',
      '180-Day Executive Onboarding & C-Suite Assimilation Protocol'
    ],
    dynamicMetrics: [
      { label: 'Retention at 24 Months', value: '96.4%', description: 'Industry benchmark: 72%' },
      { label: 'Average Time-to-Shortlist', value: '28 Days', description: 'Curated 3-candidate slate' },
      { label: 'Searches Completed', value: '520+', description: 'Across Fortune 500 & Unicorns' }
    ],
    methodologySteps: [
      { step: '01', title: 'Mandate Scoping & Core Competency Matrix', detail: 'Deconstructing strategic goals into discrete behavioral and performance leadership criteria.' },
      { step: '02', title: 'Target Market Forensics & Discretionary Sourcing', detail: 'Deploying direct executive intelligence networks to engage passive C-level leaders.' },
      { step: '03', title: 'Psychometric & Behavioral Board Evaluation', detail: 'Rigorous behavioral simulation and peer-level governance committee review.' },
      { step: '04', title: 'Offer Orchestration & Transitional Integration', detail: 'High-touch alignment ensuring friction-free departure and immediate strategic traction.' }
    ]
  },
  {
    id: 'practice-org',
    slug: 'organizational-transformation',
    category: 'Enterprise Architecture & M&A',
    title: 'Organizational Transformation & Design',
    tagline: 'Restructuring enterprise operating models for agility, speed, and capital efficiency.',
    description: 'When companies scale, merge, or pivot, outdated organizational topologies create friction and headcount bloat. Job Square architects high-efficiency operating models, span-of-control frameworks, and post-merger integration blueprints.',
    leadPartner: 'Marcus Sterling',
    leadPartnerTitle: 'Chief Advisory Architect & Head of Organizational Practice',
    keyDeliverables: [
      'Operating Model Architecture & Span of Control Rationalization',
      'Post-Merger Integration (PMI) Human Capital Harmonization',
      'Functional Redundancy Deconstruction & Cost Optimization',
      'Global Capability Center (GCC) Talent Blueprinting',
      'Agile Matrix Governance & Decision-Rights Frameworks (RAPID)'
    ],
    dynamicMetrics: [
      { label: 'Operational Cost Efficiency', value: '$42M+', description: 'Identified & realized across mandates' },
      { label: 'Span of Control Optimization', value: '38%', description: 'Reduction in managerial bottlenecks' },
      { label: 'M&A Talent Retention', value: '94%', description: 'Key leadership retained post-closing' }
    ],
    methodologySteps: [
      { step: '01', title: 'Topological Diagnostic & Span Audit', detail: 'Automated structural analysis of reporting lines, managerial layers, and functional siloing.' },
      { step: '02', title: 'Target Operating Model (TOM) Formulation', detail: 'Crafting agile multi-disciplinary business unit blueprints tailored to market dynamics.' },
      { step: '03', title: 'Transition Roadmapping & Change Governance', detail: 'Phase-gated organizational rollouts minimizing operational disruption.' },
      { step: '04', title: 'Value Capture & Productivity Measurement', detail: 'Institutionalizing KPIs and cost-to-revenue human capital metrics.' }
    ]
  },
  {
    id: 'practice-compliance',
    slug: 'hr-compliance-labor-audits',
    category: 'Regulatory Governance & Risk',
    title: 'HR Compliance & Labor Audits',
    tagline: 'Immunizing enterprise balance sheets against employment liability and regulatory scrutiny.',
    description: 'Modern labor regulations across multi-jurisdictional jurisdictions are complex and volatile. Our regulatory advisory team conducts thorough audits covering wage & hour laws, worker classification, executive compensation disclosure, and DEI statutory filings.',
    leadPartner: 'Claire Delacroix, J.D.',
    leadPartnerTitle: 'Partner - Regulatory Practice & Global Labor Advisory',
    keyDeliverables: [
      'Multi-Jurisdiction Labor Law Exposure & Liability Diagnostics',
      'FLSA, Worker Classification & Independent Contractor Audits',
      'Executive Severance, Non-Compete & Clawback Policy Hardening',
      'Statutory Equal Pay & Forensic Pay Equity Studies',
      'Board-Ready Human Capital Risk & Governance Dossiers'
    ],
    dynamicMetrics: [
      { label: 'Audit Clean Rate', value: '100%', description: 'Zero statutory penalties post-audit' },
      { label: 'Contingency Risk Mitigated', value: '$85M+', description: 'Potential litigation exposure resolved' },
      { label: 'Global Jurisdictions Covered', value: '42', description: 'North America, EMEA, and APAC' }
    ],
    methodologySteps: [
      { step: '01', title: 'Forensic Policy & Documentation Ingestion', detail: 'Systematic inventory of contracts, collective agreements, handbooks, and payroll records.' },
      { step: '02', title: 'Vulnerability Scoring & Gap Identification', detail: 'Quantifying high-severity legal exposure points against federal and state statutes.' },
      { step: '03', title: 'Policy Remediation & Standard Operating Procedures', detail: 'Drafting board-approved policies that strictly align with regulatory standards.' },
      { step: '04', title: 'Continuous Surveillance & Regulatory Tracking', detail: 'Quarterly compliance health checks and proactive alert triggers.' }
    ]
  },
  {
    id: 'practice-okrs',
    slug: 'performance-okrs',
    category: 'Enterprise Execution & Strategy',
    title: 'Performance Management & Strategic OKRs',
    tagline: 'Translating board strategies into disciplined, high-velocity operational execution.',
    description: 'Most performance appraisal systems fail because they are disconnected from business outcomes. Job Square replaces bureaucratic review rituals with synchronized Objectives & Key Results (OKRs) and continuous feedback architectures that drive measurable ROI.',
    leadPartner: 'Dr. Raymond Chen',
    leadPartnerTitle: 'Principal Advisor - Human Capital Strategy & Analytics',
    keyDeliverables: [
      'Enterprise OKR Cascade & Alignment Frameworks',
      'Continuous Feedback & Decoupled Merit Compensation Models',
      'High-Performer Calibration & Succession Talent Pools',
      'Executive Leadership Scorecards & Board Reporting Metrics',
      'Managerial Coaching Toolkits for Asynchronous Evaluation'
    ],
    dynamicMetrics: [
      { label: 'Strategic Alignment Score', value: '+62%', description: 'Clarity in individual contribution' },
      { label: 'Goal Velocity Improvement', value: '2.4x', description: 'Faster execution of quarterly milestones' },
      { label: 'Appraisal Cycle Overhead', value: '-70%', description: 'Hours saved through modern continuous rituals' }
    ],
    methodologySteps: [
      { step: '01', title: 'Corporate Objective Harmonization', detail: 'Distilling board-level revenue and market targets into unambiguous top-level OKRs.' },
      { step: '02', title: 'Cascading Architecture Design', detail: 'Establishing bi-directional key result alignments across product, revenue, and operations.' },
      { step: '03', title: 'Ritual Implementation & Cadence Structuring', detail: 'Instituting weekly check-ins, monthly scoring reviews, and quarterly resets.' },
      { step: '04', title: 'Talent Differentiation & Reward Linking', detail: 'Equitably connecting outperformance with long-term incentive and retention capital.' }
    ]
  },
  {
    id: 'practice-coaching',
    slug: 'csuite-leadership-coaching',
    category: 'Executive Development & Succession',
    title: 'C-Suite Leadership Coaching & Succession',
    tagline: 'Refining executive presence, decision clarity, and sustainable board leadership.',
    description: 'The highest leverage point in any enterprise is the psychological and strategic clarity of its top leaders. Job Square provides confidential, 1-on-1 executive coaching tailored for incoming CEOs, newly promoted CxOs, and founders navigating hyper-growth scale.',
    leadPartner: 'Dame Vivienne Ross',
    leadPartnerTitle: 'Executive Fellow & Master Certified Coach (MCC)',
    keyDeliverables: [
      'Confidential 1-on-1 Executive Advisory & Sparring Partnership',
      '360-Degree Board & Subordinate Perception Forensics',
      'Strategic Crisis Management & High-Stakes Decision Support',
      'Executive Succession Pipeline & Emergency Continuity Planning',
      'C-Suite Emotional Resilience & Energy Management Regimens'
    ],
    dynamicMetrics: [
      { label: 'Leader Effectiveness Rating', value: '98.2%', description: 'Affirmed by supervisory boards' },
      { label: 'First-Time CEO Tenure Success', value: '92%', description: 'Meeting or beating 3-year milestones' },
      { label: 'Succession Readiness Ratio', value: '3:1', description: 'Ready-now internal successors per seat' }
    ],
    methodologySteps: [
      { step: '01', title: 'Executive Baseline & Blindspot Diagnosis', detail: 'Comprehensive multi-stakeholder assessment uncovering behavioral inhibitors.' },
      { step: '02', title: 'Strategic Action Blueprint', detail: 'Crafting a 6-month prioritized personal and institutional impact curriculum.' },
      { step: '03', title: 'Bi-Weekly High-Stakes Sparring Sessions', detail: 'Deconstructing real-time board negotiations, team dynamics, and crisis scenarios.' },
      { step: '04', title: 'Long-Term Impact Audit & Board Feedback', detail: 'Reviewing organizational velocity metrics and behavioral evolution.' }
    ]
  }
];

export function getPractices(): PracticeArea[] {
  return PRACTICES_DATA;
}

export function getPracticeBySlug(slug: string): PracticeArea | undefined {
  return PRACTICES_DATA.find(p => p.slug === slug || p.id === slug);
}
