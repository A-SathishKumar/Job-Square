/**
 * Clean & Professional Top Navigation Bar for Job Square
 * Strictly enforces Top Bar Contract:
 * [Brand Wordmark] - [4-5 Nav Links] - [1 Primary Action]
 * 100% static, zero login/auth clutter.
 */

import { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element brand wordmark */}
        <a 
          href="#" 
          className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center text-white font-mono text-sm group-hover:bg-amber-600 transition-colors">
            JS
          </div>
          <span className="font-bold tracking-tight">Job Square</span>
        </a>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button 
            onClick={() => scrollToSection('services')} 
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection('how-we-work')} 
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            How We Work
          </button>
          {/* <button 
            onClick={() => scrollToSection('case-studies')} 
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Case Studies
          </button> */}
          <button 
            onClick={() => scrollToSection('about')} 
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            About Us
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          <button
            onClick={() => scrollToSection('contact')}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm hover:scale-[1.01] transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span>Get in Touch</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            <button
              onClick={() => scrollToSection('services')}
              className="text-left text-sm font-medium text-slate-700 hover:text-slate-900 py-1"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('how-we-work')}
              className="text-left text-sm font-medium text-slate-700 hover:text-slate-900 py-1"
            >
              How We Work
            </button>
            {/* <button
              onClick={() => scrollToSection('case-studies')}
              className="text-left text-sm font-medium text-slate-700 hover:text-slate-900 py-1"
            >
              Case Studies
            </button> */}
            <button
              onClick={() => scrollToSection('about')}
              className="text-left text-sm font-medium text-slate-700 hover:text-slate-900 py-1"
            >
              About Us
            </button>
          </nav>
          <div className="pt-2">
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full py-3 px-4 text-center text-sm font-semibold text-white bg-slate-900 rounded-lg shadow-sm"
            >
              Get in Touch
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
