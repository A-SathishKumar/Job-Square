/**
 * Hero & Proof Metrics Section for Job Square
 * Clean, modern startup visual with high-impact value proposition.
 */

import { useState } from 'react';
import { ArrowRight, ChevronRight, Zap, Users, ShieldCheck, DollarSign } from 'lucide-react';

export function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const heroImagePath = 'src\\assets\\images\\startup_founders_loft_1792762668871.jpg';

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 border-b border-slate-200 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Unboxed Metadata Kicker */}
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-500 uppercase mb-6">
          <span>Startup Talent Operations</span>
          {/* <span aria-hidden="true">·</span> */}
          {/* <span>Seed to Series B</span> */}
          {/* <span aria-hidden="true">·</span> */}
          {/* <span>Che</span> */}
        </div>

        {/* 2-Column Split Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Proposition & CTA Cluster */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.12] [text-wrap:balance]">
              Modern People &amp; Talent Operations for Fast-Growing Startups
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              From recruiting your founding engineers to scaling past 100 people. Job Square provides agile technical hiring, equity compensation design, and lightweight HR foundations — built for speed, without corporate bloat.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={scrollToContact}
                className="px-7 py-3.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Schedule an Intro Call</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>

              <button
                onClick={scrollToServices}
                className="px-6 py-3.5 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Explore Services</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Quiet Startup Trust Marker */}
            <div className="pt-4 flex items-center gap-2.5 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Embedded directly in your Slack · Flat sprint pricing · No 25% recruiter commission fees</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-900 aspect-[16/11] lg:aspect-[4/3] group">
              
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center text-slate-400 text-xs font-medium">
                  Loading Startup Team Visual...
                </div>
              )}

              {imageError ? (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex flex-col justify-end p-8 text-white">
                  <div className="text-xs text-amber-400 font-mono mb-2 uppercase tracking-wider">Startup Talent</div>
                  <h3 className="text-xl font-bold">Scaling High-Velocity Engineering Teams</h3>
                  <p className="text-sm text-slate-300 mt-1">From First Key Hire to Series B</p>
                </div>
              ) : (
                <img
                  src={heroImagePath}
                  alt="Job Square collaborative startup founders and engineers around whiteboard"
                  referrerPolicy="no-referrer"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              )}

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Context Label at bottom of image */}
              <div className="absolute bottom-4 left-5 right-5 text-white pointer-events-none">
                <div className="text-[11px] font-mono uppercase tracking-wider text-amber-300">Agile People Ops</div>
                <div className="text-sm font-semibold text-slate-100">Collaborative Sprints &amp; Talent Roadmaps</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Pillar Startup Proof Strip */}
        <div className="mt-16 pt-10 border-t border-slate-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                <span>Hiring Velocity</span>
              </div>
              <div className="text-3xl font-bold text-slate-900 font-mono tabular-nums">
                21 Days
              </div>
              <p className="text-xs text-slate-500">
                Average time-to-offer for senior engineers and team leads.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                <Users className="w-3.5 h-3.5 text-sky-600" />
                <span>Startups Scaled</span>
              </div>
              <div className="text-3xl font-bold text-slate-900 font-mono tabular-nums">
                85+
              </div>
              <p className="text-xs text-slate-500">
                Early-stage teams guided from Seed to Series B milestones.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Talent Retention</span>
              </div>
              <div className="text-3xl font-bold text-slate-900 font-mono tabular-nums">
                94.8%
              </div>
              <p className="text-xs text-slate-500">
                18-month retention rate for placed startup hires.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                <DollarSign className="w-3.5 h-3.5 text-amber-600" />
                <span>Zero Recruiter Fees</span>
              </div>
              <div className="text-3xl font-bold text-slate-900 font-mono tabular-nums">
                $0
              </div>
              <p className="text-xs text-slate-500">
                Transparent flat monthly sprints — no 25% commission surprises.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
