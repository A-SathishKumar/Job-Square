/**
 * 4-Step HR Transformation Methodology Component
 * Clear executive roadmap: Discovery -> Strategy -> Execution -> Continuous Optimization.
 */

import { Search, Compass, Cpu, Gauge, ArrowRight } from 'lucide-react';

interface MethodologyProps {
  onOpenBooking: () => void;
}

export function Methodology({ onOpenBooking }: MethodologyProps) {
  const steps = [
    {
      number: '01',
      title: 'Discovery & Forensic Audit',
      timeframe: 'Weeks 1–3',
      icon: <Search className="w-5 h-5 text-amber-600" />,
      description: 'Comprehensive quantitative and regulatory diagnostics of your existing organizational topology, span of control, payroll risk, and executive competency gaps.',
      artifacts: [
        'Span-of-control forensic heatmap',
        'Multi-jurisdictional labor compliance scorecard',
        'Executive competency matrix vs. peer benchmarks'
      ]
    },
    {
      number: '02',
      title: 'Target Strategy & Operating Design',
      timeframe: 'Weeks 4–7',
      icon: <Compass className="w-5 h-5 text-sky-600" />,
      description: 'Formulating the Target Operating Model (TOM), governance charters, succession pipelines, and decoupled incentive frameworks aligned with board mandates.',
      artifacts: [
        'Target operating model architecture (TOM)',
        'RAPID decision-rights matrix',
        'Executive compensation & LTIP blueprint'
      ]
    },
    {
      number: '03',
      title: 'Execution & Executive Integration',
      timeframe: 'Weeks 8–16',
      icon: <Cpu className="w-5 h-5 text-emerald-600" />,
      description: 'Hands-on orchestration of C-suite recruitment, functional restructuring, OKR cascade rollouts, and confidential transition management.',
      artifacts: [
        'Curated 3-candidate executive search shortlist',
        'Enterprise OKR synchronization ritual guides',
        'Day-1 to Day-180 executive onboarding charter'
      ]
    },
    {
      number: '04',
      title: 'Continuous Governance & Optimization',
      timeframe: 'Ongoing Quarterly',
      icon: <Gauge className="w-5 h-5 text-slate-800" />,
      description: 'Institutionalizing quarterly governance health checks, executive perception forensics, and proactive compliance surveillance.',
      artifacts: [
        'Quarterly board human capital dossier',
        'Predictive retention risk intelligence alerts',
        'Annual statutory regulatory review certification'
      ]
    }
  ];

  return (
    <section id="methodology" className="py-20 md:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <span>Rigorous Governance</span>
            <span aria-hidden="true">·</span>
            <span>Advisory Framework</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            The 4-Step Strategic Transformation Methodology
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Every mandate adheres to our closed-loop advisory framework, ensuring board accountability, zero business disruption, and audited capital return.
          </p>
        </div>

        {/* 4-Step Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(step => (
            <div
              key={step.number}
              className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all"
            >
              <div className="space-y-4">
                {/* Header with Step Number & Timeframe */}
                <div className="flex items-center justify-between">
                  <div className="font-mono text-xl font-bold text-slate-900">
                    {step.number}
                  </div>
                  <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {step.timeframe}
                  </span>
                </div>

                <div className="pt-1">
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Key Artifacts */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                    Key Governance Artifacts
                  </div>
                  <ul className="space-y-1.5">
                    {step.artifacts.map((art, idx) => (
                      <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5">
                        <span className="text-amber-600 font-bold">›</span>
                        <span>{art}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Phase Milestone Complete
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Methodology Action Callout */}
        <div className="mt-14 p-8 rounded-xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-bold text-white">
              Ready to benchmark your organization's human capital structure?
            </h3>
            <p className="text-xs text-slate-300">
              Our Senior Managing Partners conduct complimentary preliminary diagnostic audits for qualified enterprise boards.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 shrink-0"
          >
            <span>Request Diagnostic Audit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}

export default Methodology;
