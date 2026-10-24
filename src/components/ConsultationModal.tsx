/**
 * Production Booking & Lead Capture Modal for Executive Advisory
 * Enforces real-time corporate validation, sanitization, and immediate booking confirmation.
 */

import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, AlertCircle, ArrowRight, Building, Mail, User, Briefcase, FileText } from 'lucide-react';
import apiClient from '../api/apiClient.ts';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPractice?: string;
}

export function ConsultationModal({ isOpen, onClose, initialPractice }: ConsultationModalProps) {
  const [fullName, setFullName] = useState('');
  const [corporateEmail, setCorporateEmail] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [headcountScope, setHeadcountScope] = useState<'100-500' | '501-2,000' | '2,001-10,000' | '10,000+'>('501-2,000');
  const [primaryInterest, setPrimaryInterest] = useState(initialPractice || 'Executive Search & C-Suite Recruitment');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [bookingReceipt, setBookingReceipt] = useState<{
    referenceCode: string;
    organization: string;
    partner: string;
  } | null>(null);

  if (!isOpen) return null;

  const practices = [
    'Executive Search & C-Suite Recruitment',
    'Organizational Transformation',
    'HR Compliance & Labor Audits',
    'Performance Management & OKRs',
    'C-Suite Leadership Coaching'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Client-side corporate email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(corporateEmail.trim())) {
      setErrorMessage('Please enter a valid corporate email address.');
      return;
    }

    if (!organizationName.trim()) {
      setErrorMessage('Please specify your organization or firm.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiClient.createConsultation({
        fullName: fullName.trim(),
        corporateEmail: corporateEmail.trim(),
        organizationName: organizationName.trim(),
        headcountScope,
        primaryInterest,
        notes: notes.trim()
      });

      setBookingReceipt({
        referenceCode: response.referenceCode,
        organization: organizationName.trim(),
        partner: response.consultation?.assignedPartnerName || 'Senior Managing Partner'
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Consultation booking failed.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setFullName('');
    setCorporateEmail('');
    setOrganizationName('');
    setNotes('');
    setErrorMessage(null);
    setBookingReceipt(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Confidential Board Advisory Mandate</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Book Executive Consultation
            </h3>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Booking Receipt (Success State) */}
        {bookingReceipt ? (
          <div className="space-y-6 py-4 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h4 className="text-xl font-bold text-slate-900">
                Advisory Session Confirmed
              </h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Your preliminary scope brief has been registered with our senior partner triage committee.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Reference Tracking Code</span>
                <span className="font-mono font-bold text-amber-700 text-sm">
                  {bookingReceipt.referenceCode}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs border-t border-slate-200/60 pt-2">
                <span className="text-slate-500">Client Enterprise</span>
                <span className="font-semibold text-slate-900">{bookingReceipt.organization}</span>
              </div>
              <div className="flex items-center justify-between text-xs border-t border-slate-200/60 pt-2">
                <span className="text-slate-500">Designated Managing Partner</span>
                <span className="font-semibold text-slate-900">{bookingReceipt.partner}</span>
              </div>
              <div className="flex items-center justify-between text-xs border-t border-slate-200/60 pt-2">
                <span className="text-slate-500">Practice Area</span>
                <span className="font-semibold text-slate-900">{primaryInterest}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 text-center leading-relaxed">
              A private briefing calendar link and NDA charter have been dispatched to your corporate email. For expedited board inquiries, reference your code directly with our managing desk.
            </p>

            <button
              onClick={resetAndClose}
              className="w-full py-3 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Done &amp; Return to Overview
            </button>
          </div>
        ) : (
          /* Form State */
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name & Corporate Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Victoria Sterling"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>Corporate Email *</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="v.sterling@enterprise.com"
                  value={corporateEmail}
                  onChange={e => setCorporateEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Organization Name & Headcount Scope */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>Organization Name *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enterprise or Sovereign Entity"
                  value={organizationName}
                  onChange={e => setOrganizationName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  <span>Headcount Scope *</span>
                </label>
                <select
                  value={headcountScope}
                  onChange={e => setHeadcountScope(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                >
                  <option value="100-500">100 – 500 Employees</option>
                  <option value="501-2,000">501 – 2,000 Employees</option>
                  <option value="2,001-10,000">2,001 – 10,000 Employees</option>
                  <option value="10,000+">10,000+ Global Enterprise</option>
                </select>
              </div>
            </div>

            {/* Strategic Practice Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Primary Practice Area *
              </label>
              <select
                value={primaryInterest}
                onChange={e => setPrimaryInterest(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
              >
                {practices.map(p => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Consultation Notes */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>Confidential Mandate Objectives (Optional)</span>
                </label>
                <span className="text-[10px] text-slate-400 font-mono">
                  {notes.length}/1000
                </span>
              </div>
              <textarea
                rows={3}
                maxLength={1000}
                placeholder="Briefly describe key leadership transitions, M&A restructuring, or compliance deadlines..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
              />
            </div>

            {/* Fiduciary Guarantee */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60 text-[11px] text-slate-500 leading-normal">
              All communications are strictly covered under Job Square's mutual non-disclosure and fiduciary governance protocols.
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={resetAndClose}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{isSubmitting ? 'Registering Mandate...' : 'Submit Advisory Request'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}

export default ConsultationModal;
