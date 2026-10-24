/**
 * Interactive Filterable Case Studies Component
 * Real-world executive outcomes, ROI metrics, and attributable client testimonials.
 */

import { useState } from 'react';
import { Quote, ArrowUpRight } from 'lucide-react';

interface CaseStudy {
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

const CASE_STUDIES: CaseStudy[] = [
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
      { metric: '$18.4M', label: 'Reduction in redundant overhead & contractor fees' }
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

interface CaseStudiesProps {
  onOpenBooking: () => void;
}

export function CaseStudies({ onOpenBooking }: CaseStudiesProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Tech', 'Healthcare', 'Financial Services', 'Global Manufacturing'];

  const filtered = activeCategory === 'All' 
    ? CASE_STUDIES 
    : CASE_STUDIES.filter(cs => cs.category === activeCategory);

  return (
    <section id="case-studies" className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <span>Verified Results</span>
              <span aria-hidden="true">·</span>
              <span>Audited Case Records</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
              Executive Outcomes &amp; Client Impact
            </h2>
            <p className="text-base text-slate-600">
              Real-world strategic interventions measured in operational speed, retained leadership capital, and mitigated legal liabilities.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg overflow-x-auto no-scrollbar shrink-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map(cs => (
            <div
              key={cs.id}
              className="rounded-2xl border border-slate-200 bg-slate-50/50 p-8 flex flex-col justify-between hover:border-slate-300 transition-all hover:shadow-sm"
            >
              <div className="space-y-6">
                
                {/* Quiet unboxed metadata kicker */}
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">{cs.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{cs.clientIndustry}</span>
                  <span aria-hidden="true">·</span>
                  <span>{cs.organizationScope}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 leading-snug">
                  {cs.title}
                </h3>

                {/* Challenge & Strategic Intervention */}
                <div className="space-y-3 text-xs leading-relaxed">
                  <div>
                    <span className="font-semibold text-slate-900">Enterprise Challenge: </span>
                    <span className="text-slate-600">{cs.primaryChallenge}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900">Advisory Intervention: </span>
                    <span className="text-slate-600">{cs.strategicIntervention}</span>
                  </div>
                </div>

                {/* 3 Outcome Metrics with Tabular Numerals */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200">
                  {cs.keyOutcomes.map((out, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="text-lg sm:text-xl font-bold text-slate-900 font-mono tabular-nums">
                        {out.metric}
                      </div>
                      <div className="text-[11px] text-slate-500 leading-tight">
                        {out.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Attributable Testimonial Quote */}
                <div className="p-4 rounded-xl bg-white border border-slate-200/90 relative">
                  <Quote className="w-5 h-5 text-amber-500/40 absolute top-3 right-3" />
                  <p className="text-xs text-slate-700 italic pr-6 leading-relaxed">
                    "{cs.testimonial.quote}"
                  </p>
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <div>
                      <span className="font-bold text-slate-900">{cs.testimonial.author}</span>
                      <span className="text-slate-500"> · {cs.testimonial.role}</span>
                    </div>
                    <span className="text-slate-400 font-medium">{cs.testimonial.organization}</span>
                  </div>
                </div>

              </div>

              {/* Bottom CTA to discuss similar scope */}
              <div className="pt-6 mt-6 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500">Confidential Mandate Dossier Available</span>
                <button
                  onClick={onOpenBooking}
                  className="text-xs font-semibold text-slate-900 hover:text-amber-700 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Similar Engagement</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default CaseStudies;
