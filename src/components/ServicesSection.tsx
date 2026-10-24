/**
 * Startup Services Section for Job Square
 * Clear, pragmatic, founder-focused services without enterprise fluff.
 */

import { useState } from 'react';
import { 
  Users, 
  Coins, 
  FileCheck, 
  Flame, 
  UserCheck, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  tagline: string;
  icon: any;
  deliverables: string[];
  techStack: string[];
  timeframe: string;
}

const STARTUP_SERVICES: ServiceItem[] = [
  {
    id: 'technical-hiring',
    title: 'Founding & Technical Team Hiring',
    shortDesc: 'Sourcing and closing high-impact engineers, product architects, and growth leads.',
    tagline: 'Close the 10x talent that defines your product DNA.',
    icon: Users,
    timeframe: '2–4 Week Sprints',
    techStack: ['Ashby', 'Linear', 'GitHub', 'LinkedIn Recruiter', 'Wellfound'],
    deliverables: [
      'Targeted outbound sourcing of passive senior technical talent',
      'Technical scorecards and structured interview rubric design',
      'Candidate experience management & high-touch closing conversations',
      'Real-time pipeline transparency via shared Notion or Ashby board',
      'Offer structuring, reference audits, and transition support'
    ]
  },
  {
    id: 'equity-comp',
    title: 'Equity & Compensation Architecture',
    shortDesc: 'ESOP option pools, Carta modeling, and competitive startup salary benchmarks.',
    tagline: 'Balance cash runway with compelling equity grants that retain talent.',
    icon: Coins,
    timeframe: '1–2 Week Advisory Sprint',
    techStack: ['Carta', 'Pave', 'Levels.fyi Data', 'OptionTrax'],
    deliverables: [
      'Option pool sizing and employee stock option plan (ESOP) design',
      'Market-tested salary and equity bands indexed by startup funding stage',
      'Candidate equity education decks (explaining strike price, vesting, and potential upside)',
      'Founder-friendly equity modeling for early engineering hires',
      'Performance-based refresh grant structures'
    ]
  },
  {
    id: 'lean-compliance',
    title: 'Lean HR Infrastructure & Compliance',
    shortDesc: 'Multi-state payroll, contractor agreements, and international hiring frameworks.',
    tagline: 'Protect your startup from employment liability without slowing down.',
    icon: FileCheck,
    timeframe: 'Immediate Setup (3–5 Days)',
    techStack: ['Rippling', 'Deel', 'Gusto', 'Remote.com'],
    deliverables: [
      'Standardized offer letters, IP assignment (PIIA), and contractor agreements',
      'Multi-state remote payroll and benefits setup (health, 401k, PTO policies)',
      'Cross-border contractor-to-FTE conversion frameworks via Deel / Remote',
      'Lean, compliant startup team handbook (plain English, no 80-page corporate manual)',
      'Automated new hire onboarding checklist and compliance document vault'
    ]
  },
  {
    id: 'culture-onboarding',
    title: 'Onboarding & High-Output Culture',
    shortDesc: 'First 90-day onboarding playbooks, async rituals, and transparent goal setting.',
    tagline: 'Turn new hires into productive contributors within their first 14 days.',
    icon: Flame,
    timeframe: 'Ongoing Integration',
    techStack: ['Notion', 'Slack', 'Loom', 'Google Workspace'],
    deliverables: [
      'Day 1–30–60–90 milestone-driven onboarding roadmaps',
      'Internal team wiki setup with company context, engineering setup, and culture values',
      'Async communication guidelines and meeting hygiene protocols',
      'Lightweight quarterly goal alignment (Startup OKRs / KPI tracking)',
      'Founder-led monthly all-hands templates and team pulse surveys'
    ]
  },
  {
    id: 'fractional-people',
    title: 'Fractional Head of People',
    shortDesc: 'On-demand senior talent leadership embedded directly in your team’s Slack.',
    tagline: 'Executive HR expertise when you need it, at a fraction of a full-time hire.',
    icon: UserCheck,
    timeframe: 'Monthly Retainer (10–20 hrs/week)',
    techStack: ['Slack', 'Notion', 'Zoom', 'Google Meet'],
    deliverables: [
      'Direct partner attendance in founder sprint planning & headcount forecasting',
      'Manager coaching for newly promoted tech leads and first-time managers',
      'Sensitive personnel resolution, performance management, and offboarding',
      'Investor & board reporting on hiring metrics, runway, and headcount burns',
      'Full recruitment team orchestration and interview panel calibration'
    ]
  }
];

export function ServicesSection() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(STARTUP_SERVICES[0].id);

  const activeService = STARTUP_SERVICES.find(s => s.id === selectedServiceId) || STARTUP_SERVICES[0];

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700">
            <span>Core Capabilities</span>
            <span aria-hidden="true">·</span>
            <span>Startup People Operations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            Everything your startup needs to hire, retain, and scale
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            We don't do generic HR manuals or high-commission transactional headhunting. We embed into your workflow to build an agile talent machine.
          </p>
        </div>

        {/* 2-Column Services Interactive Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Service Selector Cards */}
          <div className="lg:col-span-5 space-y-3">
            {STARTUP_SERVICES.map(service => {
              const Icon = service.icon;
              const isSelected = service.id === selectedServiceId;
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-900'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2.5 rounded-lg shrink-0 ${
                        isSelected ? 'bg-amber-500 text-slate-950' : 'bg-white text-slate-800 border border-slate-200'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-bold flex items-center gap-2">
                        <span>{service.title}</span>
                      </div>
                      <p
                        className={`text-xs leading-relaxed ${
                          isSelected ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        {service.shortDesc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Deep-Dive Service Details */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
            
            <div className="space-y-2 border-b border-slate-200 pb-5">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-mono font-semibold uppercase tracking-wider text-amber-700">
                  Sprint Scope
                </span>
                <span className="font-mono font-medium bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700">
                  Typical Duration: {activeService.timeframe}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                {activeService.title}
              </h3>
              <p className="text-sm font-medium text-slate-700 italic">
                "{activeService.tagline}"
              </p>
            </div>

            {/* Deliverables Checklist */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-900">
                What We Deliver Directly to Your Team
              </div>
              <div className="space-y-2.5">
                {activeService.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modern Tooling & Tech Stack */}
            <div className="pt-2 border-t border-slate-200 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Modern Tools We Integrate With
              </div>
              <div className="flex flex-wrap gap-2">
                {activeService.techStack.map(tool => (
                  <span
                    key={tool}
                    className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded-md text-xs font-mono"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Inquire CTA */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Tailored for Seed, Series A &amp; Bootstrapped teams</span>
              </div>

              <button
                onClick={scrollToContact}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:scale-[1.01]"
              >
                <span>Discuss {activeService.title}</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default ServicesSection;
