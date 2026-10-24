/**
 * Interactive Practice Areas Hub Component
 * Allows executive decision-makers to inspect the 5 core strategic human capital practices.
 */

import { useState } from 'react';
import {
  Users,
  Network,
  Scale,
  Target,
  Compass,
  CheckCircle2,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { PRACTICES_DATA, PracticeArea } from '../../server/models/Practice.ts';

interface PracticeTabsProps {
  onSelectPracticeForBooking: (practiceName: string) => void;
}

export function PracticeTabs({ onSelectPracticeForBooking }: PracticeTabsProps) {
  const [activeTab, setActiveTab] = useState<string>(PRACTICES_DATA[0].slug);

  const activePractice: PracticeArea =
    PRACTICES_DATA.find(p => p.slug === activeTab) || PRACTICES_DATA[0];

  // Specific visual assets for practices
  const practiceImages: Record<string, string> = {
    'executive-search': '/src/assets/images/practice_leadership_advisory_1792761592784.jpg',
    'organizational-transformation': '/src/assets/images/practice_org_transformation_1792761593444.jpg',
    'csuite-leadership-coaching': '/src/assets/images/practice_leadership_advisory_1792761592784.jpg',
    'hr-compliance-labor-audits': '/src/assets/images/hero_executive_boardroom_1792761593520.jpg',
    'performance-okrs': '/src/assets/images/practice_org_transformation_1792761593444.jpg'
  };

  const getPracticeIcon = (slug: string) => {
    switch (slug) {
      case 'executive-search':
        return <Users className="w-4 h-4 shrink-0" />;
      case 'organizational-transformation':
        return <Network className="w-4 h-4 shrink-0" />;
      case 'hr-compliance-labor-audits':
        return <Scale className="w-4 h-4 shrink-0" />;
      case 'performance-okrs':
        return <Target className="w-4 h-4 shrink-0" />;
      case 'csuite-leadership-coaching':
        return <Compass className="w-4 h-4 shrink-0" />;
      default:
        return <Users className="w-4 h-4 shrink-0" />;
    }
  };

  return (
    <section id="practices" className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700">
            <span>Specialized Capabilities</span>
            <span aria-hidden="true">·</span>
            <span>Enterprise Human Capital</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            Strategic Practice Areas
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Our advisory mandates are led exclusively by Senior Managing Partners who have served as Fortune 500 Chief People Officers and General Counsels.
          </p>
        </div>

        {/* Practice Navigator Segmented Tab Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar border-b border-slate-200">
          {PRACTICES_DATA.map(practice => {
            const isActive = activeTab === practice.slug;
            return (
              <button
                key={practice.slug}
                onClick={() => setActiveTab(practice.slug)}
                className={`flex items-center gap-2.5 px-4 py-3 text-xs sm:text-sm font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {getPracticeIcon(practice.slug)}
                <span>{practice.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Practice Detail Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Practice Core Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {activePractice.category}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                {activePractice.title}
              </h3>
              <p className="text-base font-medium text-amber-800">
                {activePractice.tagline}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed pt-1">
                {activePractice.description}
              </p>
            </div>

            {/* Key Deliverables */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Executive Deliverables &amp; Mandate Artifacts
              </h4>
              <div className="space-y-2.5">
                {activePractice.keyDeliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lead Partner Identification */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                  Practice Leadership
                </div>
                <div className="text-sm font-bold text-slate-900">{activePractice.leadPartner}</div>
                <div className="text-xs text-slate-600">{activePractice.leadPartnerTitle}</div>
              </div>
              <button
                onClick={() => onSelectPracticeForBooking(activePractice.title)}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <span>Initiate Mandate</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>

            {/* 4-Step Practice Methodology Preview */}
            <div className="pt-2 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Practice Execution Roadmap
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activePractice.methodologySteps.map(step => (
                  <div key={step.step} className="p-4 rounded-lg border border-slate-200 bg-white">
                    <div className="text-xs font-mono font-bold text-amber-700 mb-1">
                      {step.step}. {step.title}
                    </div>
                    <p className="text-xs text-slate-600 leading-normal">
                      {step.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Practice Visual & Quantitative Metrics Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual Feature Card */}
            <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 aspect-[4/3] shadow-md group">
              <img
                src={practiceImages[activePractice.slug] || practiceImages['executive-search']}
                alt={activePractice.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-5 right-5 text-white pointer-events-none">
                <div className="text-[11px] font-mono text-amber-400 uppercase">Boardroom Advisory</div>
                <div className="text-sm font-semibold">{activePractice.title}</div>
              </div>
            </div>

            {/* Quantitative Impact Card */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                  <span>Verified Practice Impact</span>
                </div>
                <span className="text-[11px] text-slate-500">2024–2026 Audited</span>
              </div>

              <div className="space-y-4">
                {activePractice.dynamicMetrics.map((metric, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-medium text-slate-700">{metric.label}</span>
                      <span className="text-xl font-bold text-slate-900 font-mono tabular-nums">
                        {metric.value}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">{metric.description}</div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onSelectPracticeForBooking(activePractice.title)}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-center text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Request Detailed Scope Dossier
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default PracticeTabs;
