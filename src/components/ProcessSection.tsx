/**
 * How We Work Process Section for Job Square
 * Clear 3-phase agile sprint roadmap for startup teams.
 */

import { Search, Rocket, Repeat, ArrowRight } from 'lucide-react';

export function ProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'Sprint Audit & Talent Roadmap',
      timeframe: 'Days 1–7',
      icon: Search,
      description: 'We audit your immediate talent bottlenecks, calibrate technical scorecards, set up market salary/equity benchmarks, and link into your team’s Slack and Notion.',
      outputs: [
        'Hiring scorecard & technical interview matrix',
        'Competitive equity & salary tier benchmark',
        'Shared candidate tracking board (Ashby / Notion)'
      ]
    },
    {
      number: '02',
      title: 'Embedded Sourcing & Systems Build',
      timeframe: 'Weeks 2–8',
      icon: Rocket,
      description: 'We execute targeted outbound talent pipelines, conduct rigorous preliminary screens, manage candidate feedback loops, and structure winning offer letters.',
      outputs: [
        'Curated 3-to-5 candidate qualified slates per role',
        'Compliant offer letters & IP assignment docs',
        'Offer closing & equity negotiation support'
      ]
    },
    {
      number: '03',
      title: 'Onboarding & Autonomous Scale',
      timeframe: 'Day 90 & Beyond',
      icon: Repeat,
      description: 'We embed your Day 1–90 onboarding workflows, institute team feedback rituals, and train your internal hiring managers to scale autonomously.',
      outputs: [
        'Day 1–90 milestone-driven onboarding roadmaps',
        'Quarterly performance & goal check-in cadence',
        'Clean handover when you hire in-house talent leads'
      ]
    }
  ];

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="how-we-work" className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <span>Agile Sprint Model</span>
            <span aria-hidden="true">·</span>
            <span>Zero Bureaucracy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            How we partner with founders
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            A fast, structured process designed to integrate seamlessly with your product and sprint cycles. No long ramp-ups.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map(step => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-7 flex flex-col justify-between hover:border-slate-300 transition-all hover:shadow-sm"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-bold text-slate-900">
                      {step.number}
                    </span>
                    <span className="text-xs font-mono font-medium text-slate-600 bg-white px-2.5 py-1 rounded border border-slate-200">
                      {step.timeframe}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Icon className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{step.title}</span>
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Outputs */}
                  <div className="pt-4 border-t border-slate-200/80 space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Concrete Sprint Outputs
                    </div>
                    <div className="space-y-1.5">
                      {step.outputs.map((out, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <span className="text-amber-600 font-bold">›</span>
                          <span>{out}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium">
                  Continuous Slack communication &amp; weekly sync
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="mt-14 p-8 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-white">
              Have a key role to fill or need an equity review?
            </h3>
            <p className="text-xs text-slate-300">
              We can launch an embedded hiring sprint within 48 hours of our first alignment call.
            </p>
          </div>
          <button
            onClick={scrollToContact}
            className="px-6 py-3 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 shrink-0"
          >
            <span>Start a 1-Week Sprint</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}

export default ProcessSection;
