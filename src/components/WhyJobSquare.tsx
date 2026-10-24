/**
 * Why Job Square Comparison Component
 * Honest, transparent comparison for startup founders evaluating talent options.
 */

import { Check, X, Sparkles } from 'lucide-react';

export function WhyJobSquare() {
  const criteria = [
    {
      feature: 'Pricing Model',
      traditional: '20%–30% contingent fee per hire ($35k+ each)',
      consulting: '$50k+ fixed enterprise contracts',
      jobSquare: 'Flat, predictable monthly sprint pricing · Zero commission markups'
    },
    {
      feature: 'Team Integration',
      traditional: 'External email barrage, disconnected from team',
      consulting: 'Formal scheduled quarterly review decks',
      jobSquare: 'Directly embedded in your Slack, Notion, and Ashby'
    },
    {
      feature: 'Technical Understanding',
      traditional: 'Keyword matching on resumes (no real depth)',
      consulting: 'Generic HR theory without code literacy',
      jobSquare: 'Evaluates real GitHub repos, system design, and tech culture'
    },
    {
      feature: 'Equity & Comp Design',
      traditional: 'None (only cares about closing the base salary)',
      consulting: 'Complex enterprise benchmarking',
      jobSquare: 'Carta ESOP modeling, 409A guidance & candidate equity decks'
    },
    {
      feature: 'Onboarding & Retention',
      traditional: 'Stops the moment the contract is signed',
      consulting: 'Theoretical manuals no engineer reads',
      jobSquare: 'Complete Day 1–90 onboarding roadmap & retention tracking'
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <span>The Modern Alternative</span>
            <span aria-hidden="true">·</span>
            <span>Founder-Friendly Value</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            Built differently for startup speed and budget
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            High-growth startups shouldn't choose between paying predatory 25% recruitment commissions or wading through slow corporate bureaucracy.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[760px] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            
            {/* Table Header */}
            <div className="grid grid-cols-12 bg-slate-100/70 border-b border-slate-200 text-xs font-bold text-slate-800 py-4 px-6">
              <div className="col-span-3">Dimension</div>
              <div className="col-span-3 text-slate-500">Traditional Agency</div>
              <div className="col-span-3 text-slate-500">Big Enterprise HR Firm</div>
              <div className="col-span-3 text-amber-700 flex items-center gap-1.5 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Job Square Model</span>
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-slate-100 text-xs">
              {criteria.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 py-4 px-6 items-center hover:bg-slate-50/70 transition-colors"
                >
                  <div className="col-span-3 font-semibold text-slate-900 pr-3">
                    {item.feature}
                  </div>
                  
                  <div className="col-span-3 text-slate-500 pr-3 flex items-start gap-1.5">
                    <X className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{item.traditional}</span>
                  </div>

                  <div className="col-span-3 text-slate-500 pr-3 flex items-start gap-1.5">
                    <X className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{item.consulting}</span>
                  </div>

                  <div className="col-span-3 text-slate-900 font-medium pr-2 flex items-start gap-1.5 bg-amber-50/50 -my-4 py-4 px-3 rounded-md">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item.jobSquare}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default WhyJobSquare;
