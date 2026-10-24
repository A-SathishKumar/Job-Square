/**
 * About Us & Team Values Section for Job Square
 * Authentic, clean background on the team behind Job Square.
 */

import { Code2, HeartHandshake, Eye, Sparkles } from 'lucide-react';

export function AboutSection() {
  const values = [
    {
      icon: Code2,
      title: 'Technical Literacy First',
      description: 'We don’t just match resume keywords. We evaluate GitHub commits, architectural thinking, and genuine builder mindsets.'
    },
    {
      icon: HeartHandshake,
      title: 'Zero Fiduciary Conflicts',
      description: 'We never charge 25% commission fees, which misalign incentives. We charge flat monthly sprints aligned with your runway.'
    },
    {
      icon: Eye,
      title: 'Total Transparency',
      description: 'Shared Ashby or Notion pipeline boards, real-time Slack channels, and direct feedback on every candidate interaction.'
    },
    {
      icon: Sparkles,
      title: 'Founder-Speed Execution',
      description: 'We start sourcing within 48 hours of kickoff. No 4-week bureaucratic alignment phases or 60-page PDF reports.'
    }
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <span>About Job Square</span>
            <span aria-hidden="true">·</span>
            <span>Startup DNA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            We built the talent partner we wished we had as founders
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Job Square was founded by former startup operators and technical recruiters who grew tired of transactional agencies sending spammy candidate resumes and charging exorbitant 25% fees.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200/60">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">{v.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {v.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Founder Bio Banner */}
        <div className="mt-14 bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-900 text-white font-mono font-bold text-2xl flex items-center justify-center shrink-0 border border-slate-300">
            JS
          </div>
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-xl font-bold text-slate-900">
              Headquartered in Chennai, Tamilnadu, operating globally.
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              Whether you are an AI lab in Hayes Valley looking for your first 3 research engineers or a European fintech setting up multi-state US payroll, our distributed team embeds with your leadership to make hiring a repeatable competitive advantage.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1 text-xs text-slate-500 font-medium">
              <span></span>
              <span>Chennai, TamilNadu</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutSection;
