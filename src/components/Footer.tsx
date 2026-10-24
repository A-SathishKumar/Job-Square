/**
 * Clean & Quiet Footer for Job Square
 * Modern startup aesthetic with transparent navigation and contact info.
 */

export function Footer() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5 text-white text-lg font-bold">
              <div className="w-7 h-7 rounded bg-amber-500 text-slate-950 font-mono text-xs flex items-center justify-center font-bold">
                JS
              </div>
              <span>Job Square</span>
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Modern people operations and technical talent acquisition built exclusively for high-growth startups and founding teams.
            </p>

            <div className="text-slate-500 text-[11px]">
              Direct Inquiries: <a href="mailto:hello@jobsquare.in" className="text-amber-400 hover:underline">hello@jobsquare.in</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2.5">
            <div className="text-slate-200 font-bold uppercase tracking-wider text-[11px]">
              Explore
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Startup Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('how-we-work')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  How We Work
                </button>
              </li>
              <li>
                {/* <button
                  onClick={() => scrollToSection('case-studies')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Founder Case Studies
                </button> */}
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About Our Team
                </button>
              </li>
            </ul>
          </div>

          {/* Offices */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-slate-200 font-bold uppercase tracking-wider text-[11px]">
              Hubs
            </div>

            <div className="space-y-2 text-slate-400">
              <div>
                <span className="font-semibold text-slate-200">TamilNadu:</span> Chennai;
              </div>
              {/* <div>
                <span className="font-semibold text-slate-200">London:</span> 25 Luke St, Shoreditch, London EC2A
              </div> */}
            </div>

            <div className="pt-2">
              <button
                onClick={() => scrollToSection('contact')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium text-xs cursor-pointer"
              >
                Schedule an Alignment Call
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Job Square Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Confidentiality First</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
