/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import ServicesSection from './components/ServicesSection.tsx';
import WhyJobSquare from './components/WhyJobSquare.tsx';
import ProcessSection from './components/ProcessSection.tsx';
import StartupCaseStudies from './components/StartupCaseStudies.tsx';
import AboutSection from './components/AboutSection.tsx';
import ContactSection from './components/ContactSection.tsx';
import Footer from './components/Footer.tsx';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Clean 3-Zone Startup Top Navigation */}
      <Navbar />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* Hero Section with Startup Team Imagery & Key Proof Markers */}
        <Hero />

        {/* Startup Services & Deliverables Hub */}
        <ServicesSection />

        {/* Why Job Square (Transparent Comparison Matrix) */}
        <WhyJobSquare />

        {/* 3-Phase Agile Hiring & Scaling Process */}
        <ProcessSection />

        {/* Real Founder Case Studies & Attributable Stories */}
        {/* <StartupCaseStudies /> */}

        {/* About Job Square & Operator Background */}
        <AboutSection />

        {/* Clean, Non-Intrusive Startup Contact Section */}
        <ContactSection />
      </main>

      {/* Quiet Professional Footer */}
      <Footer />
    </div>
  );
}
