/**
 * Startup Case Studies & Founder Stories Component
 * Real, attributable startup milestones, team scale velocity, and founder quotes.
 */

import { Quote, ArrowRight, Zap, Award, CheckCircle } from 'lucide-react';

export function StartupCaseStudies() {
  const caseStudies = [
    {
      id: 'neoflow',
      company: 'NeoFlow Systems',
      stage: 'Seed → Series A',
      industry: 'Distributed Fintech & Protocols',
      scale: 'Scaled 6 → 24 Engineers',
      challenge: 'Needed 8 high-caliber distributed systems engineers within 90 days to ship their core transaction engine before their Series A pitch.',
      solution: 'Job Square embedded directly in their Slack, structured candidate technical scorecards, and ran targeted outbound sourcing on GitHub and specialized networks.',
      metrics: [
        { label: 'Time-to-Hire', value: '23 Days', desc: 'Average offer turnaround' },
        { label: 'Offer Acceptance', value: '100%', desc: '8 offers extended & signed' },
        { label: 'Recruiter Fees Saved', value: '$180,000+', desc: 'Compared to 25% agency rates' }
      ],
      founderQuote: 'Job Square felt like having an elite Head of Talent on our founding team from Day 1. They spoke our engineering language and closed candidates who had competing FAANG offers.',
      founderName: 'Marcus Lin',
      founderTitle: 'Co-Founder & CEO, NeoFlow'
    },
    {
      id: 'cortex',
      company: 'Cortex Robotics',
      stage: 'Seed',
      industry: 'Applied AI & Autonomous Systems',
      scale: 'Scaled 4 → 18 Team Members',
      challenge: 'Traditional recruiting agencies sent generic software resumes with zero understanding of ROS, embedded firmware, or computer vision hardware requirements.',
      solution: 'Engineered specialized technical interview rubrics, designed Carta ESOP incentive packages, and closed founding AI and hardware leads in 3 fast sprints.',
      metrics: [
        { label: 'Core Hires Made', value: '7 Engineers', desc: 'Founding technical leads' },
        { label: '18-Mo Retention', value: '95.2%', desc: 'High team continuity' },
        { label: 'Equity Clarity', value: 'Carta Ready', desc: 'Standardized 4-year vesting' }
      ],
      founderQuote: 'They didn’t just send resumes — they calibrated our interview loop, explained equity vesting to our early engineers, and protected our scarce seed runway.',
      founderName: 'Dr. Sarah Al-Sayed',
      founderTitle: 'Co-Founder & CTO, Cortex Robotics'
    },
    {
      id: 'loomis',
      company: 'Loomis Health',
      stage: 'Series A',
      industry: 'Digital Care & Healthtech SaaS',
      scale: 'Scaled 15 → 55 Remote FTEs',
      challenge: 'Rapid multi-state remote hiring created nightmare payroll tax registrations, chaotic offer letters, and messy new hire onboarding.',
      solution: 'Implemented Rippling and Deel compliance infrastructure, created a modern Notion onboarding university, and established clear remote compensation bands.',
      metrics: [
        { label: 'Onboarding Velocity', value: '4 Days', desc: 'Down from 3 weeks previously' },
        { label: 'Multi-State States', value: '16 States', desc: 'Compliant payroll & benefits' },
        { label: 'Compliance Audits', value: '100% Clean', desc: 'Zero statutory penalties' }
      ],
      founderQuote: 'Our onboarding went from a stressful manual scramble to a slick, world-class experience that our new hires constantly praise on their first week.',
      founderName: 'Evan Campbell',
      founderTitle: 'Head of Operations, Loomis Health'
    }
  ];

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="case-studies" className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <span>Proven Track Record</span>
            <span aria-hidden="true">·</span>
            <span>Founder Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            How we helped early teams scale their product and culture
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Real stories from founders who scaled from their first key hires to closing institutional funding rounds with Job Square by their side.
          </p>
        </div>

        {/* 3 Case Study Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map(cs => (
            <div
              key={cs.id}
              className="bg-slate-50 rounded-2xl border border-slate-200 p-7 flex flex-col justify-between hover:border-slate-300 transition-all hover:shadow-sm"
            >
              <div className="space-y-6">
                
                {/* Header with Company & Stage */}
                <div className="space-y-1 border-b border-slate-200/80 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {cs.stage}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {cs.industry}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 pt-1">
                    {cs.company}
                  </h3>
                  <div className="text-xs font-medium text-slate-600">
                    {cs.scale}
                  </div>
                </div>

                {/* Challenge & Solution */}
                <div className="space-y-3 text-xs leading-relaxed">
                  <div>
                    <span className="font-bold text-slate-900">The Problem: </span>
                    <span className="text-slate-600">{cs.challenge}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">What We Did: </span>
                    <span className="text-slate-600">{cs.solution}</span>
                  </div>
                </div>

                {/* 3 Metrics */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-200">
                  {cs.metrics.map((m, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <div className="text-base font-bold font-mono text-slate-900">
                        {m.value}
                      </div>
                      <div className="text-[11px] font-semibold text-slate-600 leading-tight">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Testimonial */}
                <div className="p-4 rounded-xl bg-white border border-slate-200/90 relative">
                  <Quote className="w-4 h-4 text-amber-500/40 absolute top-3 right-3" />
                  <p className="text-xs text-slate-700 italic pr-4 leading-relaxed">
                    "{cs.founderQuote}"
                  </p>
                  <div className="mt-3 pt-2 border-t border-slate-100 text-[11px]">
                    <div className="font-bold text-slate-900">{cs.founderName}</div>
                    <div className="text-slate-500">{cs.founderTitle}</div>
                  </div>
                </div>

              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/60">
                <button
                  onClick={scrollToContact}
                  className="w-full text-xs font-semibold text-slate-800 hover:text-amber-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Build a Similar Team</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default StartupCaseStudies;
