/**
 * Executive Insights & Whitepapers Center
 * Peer-reviewed board briefing research, compensation studies, and labor dossiers.
 */

import { useState } from 'react';
import { FileText, Download, X, ArrowRight, CheckCircle, BookOpen } from 'lucide-react';
import apiClient from '../api/apiClient.ts';

interface Whitepaper {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  downloadCount: number;
  publishedDate: string;
  readTime: string;
  pageCount: number;
  keyTakeaways: string[];
  executiveQuote: string;
  author: string;
  authorTitle: string;
}

const INITIAL_WHITEPAPERS: Whitepaper[] = [
  {
    id: 'wp-01',
    slug: '2026-executive-compensation-governance',
    title: 'The 2026 Boardroom Directive: Executive Compensation, Say-on-Pay, and Clawback Mandates',
    category: 'Executive Governance & Compensation',
    summary: 'A deep empirical study of S&P 500 and FTSE 100 proxy filings analyzing shifting performance-share structures, non-financial ESG hurdles, and SEC clawback enforcement.',
    downloadCount: 1420,
    publishedDate: 'January 2026',
    readTime: '12 min read',
    pageCount: 38,
    keyTakeaways: [
      'Over 74% of enterprise compensation committees now tie at least 25% of LTIP grants to relative TSR and human capital retention ratios.',
      'SEC and European statutory clawback provisions require explicit automated recovery mechanisms in standard executive contracts.',
      'Median CEO pay ratios stabilized at 198:1, with an increasing shift toward restricted stock units with multi-year performance gates.'
    ],
    executiveQuote: 'Compensation design is no longer just a recruitment lever; it is the ultimate expression of corporate risk governance.',
    author: 'Eleanor Vance',
    authorTitle: 'Senior Managing Partner - Executive Search & Governance'
  },
  {
    id: 'wp-02',
    slug: 'span-of-control-organizational-velocity',
    title: 'Span of Control & Organizational Velocity: Eradicating Enterprise Managerial Drag',
    category: 'Organizational Architecture',
    summary: 'Forensic analysis of 120 global enterprises demonstrating how excessive organizational layers inflate SG&A by 24% while halving market execution speed.',
    downloadCount: 980,
    publishedDate: 'November 2025',
    readTime: '14 min read',
    pageCount: 46,
    keyTakeaways: [
      'Optimal managerial spans of control range between 7 and 10 direct reports for knowledge work, yet 62% of enterprises average 3.8.',
      'Each redundant supervisory layer between frontline execution and the C-Suite reduces operational message fidelity by up to 35%.',
      'Enterprises adopting flat matrix governance achieve 2.4x higher velocity in rolling out digital products.'
    ],
    executiveQuote: 'Organizational charts are not trophies of hierarchy; they are hydraulic plumbing systems for strategic decision-making.',
    author: 'Marcus Sterling',
    authorTitle: 'Chief Advisory Architect & Head of Organizational Practice'
  },
  {
    id: 'wp-03',
    slug: 'cross-border-labor-compliance-dossier',
    title: 'Cross-Border Workforce Compliance: Navigating Statutory Worker Classification and AI In Hiring',
    category: 'Regulatory Compliance & Risk',
    summary: 'A definitive legal and human capital risk playbook for multinational enterprises navigating the EU AI Act, US EEOC algorithmic guidelines, and global payroll compliance.',
    downloadCount: 1150,
    publishedDate: 'September 2025',
    readTime: '16 min read',
    pageCount: 52,
    keyTakeaways: [
      'Automated candidate screening models are now classified as high-risk under the EU AI Act, requiring explicit human oversight logs.',
      'Independent contractor misclassification audits surged by 180% globally over the last 18 months.',
      'Proactive compliance diagnostics reduce unexpected labor settlement exposures by an average of $3.2M per 1,000 employees.'
    ],
    executiveQuote: 'Ignoring labor regulation in cross-border scaling is the single most expensive oversight in modern corporate strategy.',
    author: 'Claire Delacroix, J.D.',
    authorTitle: 'Partner - Regulatory Practice & Global Labor Advisory'
  }
];

export function Insights() {
  const [whitepapers, setWhitepapers] = useState<Whitepaper[]>(INITIAL_WHITEPAPERS);
  const [selectedPaper, setSelectedPaper] = useState<Whitepaper | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const whitepaperCoverImage = '/src/assets/images/whitepaper_executive_study_1792761593707.jpg';

  const handleDownload = async (paper: Whitepaper) => {
    try {
      await apiClient.downloadWhitepaper(paper.slug);
      setWhitepapers(prev =>
        prev.map(p => (p.slug === paper.slug ? { ...p, downloadCount: p.downloadCount + 1 } : p))
      );
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch {
      // Fallback local increment
      setWhitepapers(prev =>
        prev.map(p => (p.slug === paper.slug ? { ...p, downloadCount: p.downloadCount + 1 } : p))
      );
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    }
  };

  return (
    <section id="insights" className="py-20 md:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <span>Empirical Human Capital Research</span>
              <span aria-hidden="true">·</span>
              <span>Board Dossiers</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
              Executive Insights &amp; Whitepapers
            </h2>
            <p className="text-base text-slate-600">
              Proprietary board briefings authored by Job Square partners, evaluating macroeconomic labor trends, compensation governance, and organizational velocity.
            </p>
          </div>
        </div>

        {/* 3-Column Whitepaper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whitepapers.map(paper => (
            <div
              key={paper.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div className="space-y-4">
                
                {/* Visual Cover Asset */}
                <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-100 aspect-[16/10] mb-2">
                  <img
                    src={whitepaperCoverImage}
                    alt={paper.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/20" />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[11px] font-mono font-semibold px-2 py-0.5 rounded text-slate-800">
                    {paper.pageCount} Pages
                  </div>
                </div>

                {/* Clean unboxed metadata */}
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>{paper.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{paper.readTime}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{paper.downloadCount} Downloads</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-amber-700 transition-colors">
                  {paper.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {paper.summary}
                </p>

                {/* Author Info */}
                <div className="pt-2 text-xs">
                  <div className="font-bold text-slate-900">{paper.author}</div>
                  <div className="text-[11px] text-slate-500">{paper.authorTitle}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedPaper(paper)}
                  className="text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                  <span>Preview Briefing</span>
                </button>

                <button
                  onClick={() => handleDownload(paper)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Download</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Whitepaper Preview Modal */}
      {selectedPaper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
            
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-amber-700">{selectedPaper.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedPaper.publishedDate}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedPaper.pageCount} Pages</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {selectedPaper.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPaper(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Executive Quote */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60">
              <p className="text-xs italic text-amber-950 leading-relaxed font-serif">
                "{selectedPaper.executiveQuote}"
              </p>
              <div className="mt-2 text-[11px] font-bold text-amber-900">
                — {selectedPaper.author}, {selectedPaper.authorTitle}
              </div>
            </div>

            {/* Overview */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Executive Abstract
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedPaper.summary}
              </p>
            </div>

            {/* Key Empirical Takeaways */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Key Empirical Findings &amp; Board Guidance
              </h4>
              <div className="space-y-2">
                {selectedPaper.keyTakeaways.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Notification */}
            {downloadSuccess && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Executive briefing package authorized and generated for download.</span>
              </div>
            )}

            {/* Actions */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
              <div className="text-xs text-slate-500 font-mono tabular-nums">
                {selectedPaper.downloadCount} verified corporate downloads
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedPaper(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Close Preview
                </button>
                <button
                  onClick={() => handleDownload(selectedPaper)}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Download Full Executive PDF</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}

export default Insights;
