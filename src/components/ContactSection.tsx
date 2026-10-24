/**
 * Clean & Professional Contact Section for Job Square
 * Straightforward inquiry touchpoint for startup founders.
 * Completely static with instant client-side confirmation.
 */

import React, { useState } from 'react';
import { Mail, MessageSquare, Clock, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [startupName, setStartupName] = useState('');
  const [stage, setStage] = useState('Seed');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulated static submission with immediate feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setStartupName('');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Touchpoints */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700">
                <span>Direct Contact</span>
                <span aria-hidden="true">·</span>
                <span>Let's Build</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                Let’s talk about your startup’s hiring roadmap
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Whether you need to close a key engineering lead, fix multi-state remote payroll, or set up Carta equity pools — we’re here to help you scale fast.
              </p>
            </div>

            {/* Direct Details Box */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 shrink-0">
                  <Mail className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    General Inquiries
                  </div>
                  <a
                    href="mailto:hello@jobsquare.in"
                    className="text-sm font-bold text-slate-900 hover:text-amber-700 transition-colors"
                  >
                    hello@jobsquare.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 border-t border-slate-200/60 pt-4">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 shrink-0">
                  <Clock className="w-4 h-4 text-sky-600" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Response Guarantee
                  </div>
                  <div className="text-xs text-slate-700 font-medium">
                    We respond to every founder inquiry within 24 hours (usually under 4 hours).
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 border-t border-slate-200/60 pt-4">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 shrink-0">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Office Desks
                  </div>
                  <div className="text-xs text-slate-700 font-medium">
                    Chennai, TamilNadu
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>We provide a free 20-minute hiring audit call for early-stage founders.</span>
            </div> */}
          </div>

          {/* Right Column: Clean Inquiry Form */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
            
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Message Received!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thanks for reaching out, <strong>{name}</strong>. A Job Square talent partner will review your notes on <strong>{startupName || 'your startup'}</strong> and reply to <strong>{email}</strong> shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Send us a quick message
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Tell us what you're working on and what roles or HR setups you need.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Chen"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="maya@yourstartup.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Startup / Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex AI"
                      value={startupName}
                      onChange={e => setStartupName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Current Stage
                    </label>
                    <select
                      value={stage}
                      onChange={e => setStage(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                    >
                      <option value="Pre-Seed">Pre-Seed (1–5 people)</option>
                      <option value="Seed">Seed (5–15 people)</option>
                      <option value="Series A">Series A (15–40 people)</option>
                      <option value="Series B">Series B (40–100+ people)</option>
                      <option value="Bootstrapped">Bootstrapped / Profitable</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    What are you looking to achieve? *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="e.g. Looking to hire 3 founding engineers, design our ESOP pool, and set up payroll for remote hires..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Strict confidentiality guaranteed.
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.01]"
                  >
                    <span>{isSubmitting ? 'Sending Note...' : 'Send Message'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}

export default ContactSection;
