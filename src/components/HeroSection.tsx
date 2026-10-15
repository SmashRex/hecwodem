/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Navbar } from './Navbar.tsx';
import { ScrollIndicator } from './ScrollIndicator.tsx';

export interface HeroSectionProps {
  /** Path to the founder photograph asset */
  photoSrc?: string;
  /** Accessible description for founder photograph */
  photoAlt?: string;
  /** Path to the HECWODEM brand logo SVG asset (kept invisible per user instruction) */
  logoSrc?: string;
  /** Accessible description of the HECWODEM brand mark */
  logoAlt?: string;
  /** Watermark opacity - explicitly 0 per user instruction */
  watermarkOpacity?: number;
  /** Tunable opacity for mobile watermark (default 0) */
  watermarkOpacityMobile?: number;
  /** Layout variant */
  layoutVariant?: 'split' | 'centered';
  /** Interactive callbacks */
  onExploreClick?: () => void;
  onMeetFounderClick?: () => void;
  onBookCounsellingClick?: () => void;
  onScrollClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  photoSrc = '/images/hero-founder.jpg',
  photoAlt = 'B.T. Adesope, founder of HECWODEM',
  onExploreClick,
  onMeetFounderClick,
  onBookCounsellingClick,
  onScrollClick,
}) => {
  const handleScrollClick = () => {
    if (onScrollClick) {
      onScrollClick();
      return;
    }

    const founderEl = document.getElementById('about-founder');
    if (founderEl) {
      founderEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onExploreClick) {
      onExploreClick();
      return;
    }
    const aboutEl = document.getElementById('about');
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFounderClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onMeetFounderClick) {
      onMeetFounderClick();
      return;
    }
    const founderEl = document.getElementById('about-founder');
    if (founderEl) {
      founderEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      aria-label="Welcome to HECWODEM"
      className="relative isolate min-h-screen min-h-[100svh] w-full overflow-hidden text-white flex flex-col justify-between"
      style={{
        backgroundColor: '#0C0B14',
        backgroundImage: `
          radial-gradient(circle at 25% 30%, rgba(95, 60, 160, 0.22) 0%, transparent 55%),
          radial-gradient(circle at 80% 65%, rgba(65, 40, 110, 0.18) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 15%, #181329 0%, #100E1C 55%, #0A0912 100%)
        `,
      }}
    >
      {/* =========================================================
          LAYER 0: ATMOSPHERIC AMBIENT GLOWS (Watermark explicitly omitted per instruction)
      ========================================================== */}
      <div
        aria-hidden="true"
        role="presentation"
        className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden"
      >
        {/* Soft violet illumination bloom behind the headline */}
        <div
          className="absolute top-24 left-10 sm:left-1/6 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full blur-[130px] pointer-events-none"
          style={{ backgroundColor: 'rgba(138, 92, 246, 0.12)' }}
        />

        {/* Deep magenta/purple reflection behind the founder card */}
        <div
          className="absolute top-1/3 right-10 w-[400px] lg:w-[550px] h-[400px] lg:h-[550px] rounded-full blur-[140px] pointer-events-none"
          style={{ backgroundColor: 'rgba(90, 50, 140, 0.15)' }}
        />

        {/* Vignette edge containment */}
        <div
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_55%,rgba(6,5,10,0.85)_100%)]"
        />
      </div>

      {/* =========================================================
          LAYER 1: TOP NAVIGATION BAR
      ========================================================== */}
      <div>
        <Navbar
          onCounsellingClick={onBookCounsellingClick}
          accentText="#C4A7FB"
          accentBorder="#C4A7FB"
          activeDotColor="#C4A7FB"
          ctaBg="#C4A7FB"
        />
      </div>

      {/* =========================================================
          LAYER 2: MAIN HERO BODY (REPLICATING VARIATION 11 EXACTLY)
      ========================================================== */}
      <div className="relative z-20 flex-1 flex items-center justify-center w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-6 sm:py-10 lg:py-12">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
          
          {/* -----------------------------------------------------
              LEFT COLUMN: FAITH FOR WOMEN EDITORIAL DISPLAY
          ------------------------------------------------------ */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow: ESTABLISHED 2001 with leading rule */}
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <span className="w-8 h-[1px] bg-[#A594D0]" aria-hidden="true" />
              <span className="font-mono text-[11px] sm:text-[12px] tracking-[0.26em] uppercase text-[#A594D0]">
                ESTABLISHED 2001
              </span>
            </div>

            {/* Giant Title: Line 1 "Faith" (upright white), Line 2 "For Women" (italic silvery-lavender) */}
            <h1 className="flex flex-col tracking-tight text-balance mb-5 sm:mb-8">
              <span
                className="text-[52px] xs:text-[64px] sm:text-[84px] md:text-[98px] lg:text-[112px] xl:text-[120px] font-serif font-normal text-white leading-[0.92] tracking-tight block"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                Faith
              </span>
              <span
                className="text-[52px] xs:text-[64px] sm:text-[84px] md:text-[98px] lg:text-[112px] xl:text-[120px] font-serif italic font-normal text-[#C5BFD6] leading-[0.94] tracking-tight -mt-1 xs:mt-0 sm:mt-1 block"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                For Women
              </span>
            </h1>

            {/* Exact Lead Prose from Variation 11 */}
            <div className="text-[15px] sm:text-[17px] lg:text-[18px] leading-[1.65] text-[#A59EBA] max-w-xl font-sans mb-10 sm:mb-12">
              <p>A sanctuary for spiritual growth and encouragement.</p>
              <p className="mt-1 text-[#948DA7]">
                We walk with you through every season, rooted in grace and purposeful calling.
              </p>
            </div>

            {/* Bottom Actions Row */}
            <div className="flex items-center gap-8 sm:gap-10 pt-2">
              {/* Primary: "Explore the Ministry" with prominent lilac underline */}
              <a
                href="#about"
                onClick={handleExploreClick}
                className="group relative inline-flex items-center text-[15px] sm:text-[16px] font-sans font-medium text-white pb-2 transition-colors focus-visible:outline-2 rounded-sm"
              >
                <span>Explore the Ministry</span>
                <span
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C4A7FB] shadow-[0_0_12px_rgba(196,167,251,0.85)] group-hover:bg-white transition-colors"
                  aria-hidden="true"
                />
              </a>

              {/* Secondary: "FOUNDER STORY →" in tracked uppercase mono */}
              <a
                href="#about-founder"
                onClick={handleFounderClick}
                className="group inline-flex items-center gap-2 font-mono text-[11px] sm:text-[12px] tracking-[0.22em] uppercase text-[#A594D0] hover:text-white transition-colors py-2 focus-visible:outline-2 rounded-sm"
              >
                <span>FOUNDER STORY</span>
                <ArrowRight
                  className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          {/* -----------------------------------------------------
              RIGHT COLUMN: ARCHITECTURAL B.T. ADESOPE CARD
          ------------------------------------------------------ */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[440px] border border-[#2D2545] rounded-[4px] bg-[#120F1F]/70 backdrop-blur-md p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative group">
              {/* Subtle ambient back-glow behind card */}
              <div
                aria-hidden="true"
                className="absolute -inset-1 rounded-[6px] bg-gradient-to-b from-[#C4A7FB]/15 via-transparent to-transparent opacity-60 blur-md pointer-events-none"
              />

              {/* Upper Box: Moody Portrait Frame with subtle monochrome/violet tone */}
              <div className="relative w-full h-[280px] xs:h-[320px] sm:h-[360px] lg:h-[380px] overflow-hidden rounded-[2px] border border-[#2D2545]/80 bg-[#0A0912]">
                <img
                  src={photoSrc}
                  alt={photoAlt}
                  loading="eager"
                  className="w-full h-full object-cover object-top filter grayscale-[25%] contrast-[1.08] brightness-[0.92] group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />

                {/* Editorial Vignette & Deep Violet Wash */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#120F1F] via-[#120F1F]/25 to-transparent pointer-events-none"
                />

                {/* Subtle centered attribution watermark matching Variation 11 */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                >
                  <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-white/30 text-center px-4">
                    B.T. ADESOPE — FOUNDER
                  </span>
                </div>
              </div>

              {/* Lower Section: Visionary Meta & Bio */}
              <div className="pt-6 text-left">
                {/* Eyebrow: THE VISIONARY */}
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-5 h-[1px] bg-[#C4A7FB]" aria-hidden="true" />
                  <span className="font-mono text-[11px] tracking-[0.24em] uppercase text-[#C4A7FB]">
                    THE VISIONARY
                  </span>
                </div>

                {/* Founder Name in Instrument Serif */}
                <h2
                  className="text-[32px] sm:text-[38px] font-serif font-normal text-white tracking-tight mb-2.5"
                  style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                >
                  B.T. Adesope
                </h2>

                {/* Exact Bio copy from Variation 11 */}
                <p className="text-[13px] sm:text-[14px] leading-[1.65] text-[#9B94B0] font-sans">
                  A life dedicated to the development of women through profound spiritual
                  transformation and practical leadership empowerment.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================
          LAYER 3: BOTTOM HERO STATUS STRIP (DEDICATED MOBILE-RESPONSIVE TICKER)
      ========================================================== */}
      <div className="relative z-20 w-full max-w-full overflow-hidden border-t border-b border-[#2D2545]/60 bg-[#08070E]/85 backdrop-blur-md py-2.5 sm:py-3.5 select-none touch-pan-y">
        <div className="relative w-full max-w-full overflow-hidden ticker-mask">
          <div className="animate-marquee-scroll flex items-center whitespace-nowrap">
            {/* Track 1 */}
            <div className="flex items-center shrink-0">
              <span className="font-mono text-[10px] xs:text-[11px] sm:text-[12px] tracking-[0.2em] sm:tracking-[0.24em] text-[#C4A7FB] uppercase font-medium px-4 xs:px-6 sm:px-10">
                AFRICA / INTERCESSION / GROWTH
              </span>
              <span className="text-[#C4A7FB]/40 select-none text-[10px] font-mono px-1 sm:px-2" aria-hidden="true">
                //
              </span>
              <span className="font-mono text-[10px] xs:text-[11px] sm:text-[12px] tracking-[0.2em] sm:tracking-[0.24em] text-[#A594D0] uppercase font-medium px-4 xs:px-6 sm:px-10">
                HEPHZIBAH CHRISTIAN WOMEN DEVELOPMENT MINISTRY
              </span>
              <span className="text-[#C4A7FB]/40 select-none text-[10px] font-mono px-1 sm:px-2" aria-hidden="true">
                //
              </span>
              <span className="font-mono text-[10px] xs:text-[11px] sm:text-[12px] tracking-[0.2em] sm:tracking-[0.24em] text-[#C4A7FB] uppercase font-medium px-4 xs:px-6 sm:px-10">
                AFRICA / INTERCESSION / GROWTH
              </span>
              <span className="text-[#C4A7FB]/40 select-none text-[10px] font-mono px-1 sm:px-2" aria-hidden="true">
                //
              </span>
              <span className="font-mono text-[10px] xs:text-[11px] sm:text-[12px] tracking-[0.2em] sm:tracking-[0.24em] text-[#A594D0] uppercase font-medium px-4 xs:px-6 sm:px-10">
                HEPHZIBAH CHRISTIAN WOMEN DEVELOPMENT MINISTRY
              </span>
              <span className="text-[#C4A7FB]/40 select-none text-[10px] font-mono px-1 sm:px-2" aria-hidden="true">
                //
              </span>
            </div>

            {/* Track 2 (Duplicate for continuous seamless loop) */}
            <div className="flex items-center shrink-0" aria-hidden="true">
              <span className="font-mono text-[10px] xs:text-[11px] sm:text-[12px] tracking-[0.2em] sm:tracking-[0.24em] text-[#C4A7FB] uppercase font-medium px-4 xs:px-6 sm:px-10">
                AFRICA / INTERCESSION / GROWTH
              </span>
              <span className="text-[#C4A7FB]/40 select-none text-[10px] font-mono px-1 sm:px-2" aria-hidden="true">
                //
              </span>
              <span className="font-mono text-[10px] xs:text-[11px] sm:text-[12px] tracking-[0.2em] sm:tracking-[0.24em] text-[#A594D0] uppercase font-medium px-4 xs:px-6 sm:px-10">
                HEPHZIBAH CHRISTIAN WOMEN DEVELOPMENT MINISTRY
              </span>
              <span className="text-[#C4A7FB]/40 select-none text-[10px] font-mono px-1 sm:px-2" aria-hidden="true">
                //
              </span>
              <span className="font-mono text-[10px] xs:text-[11px] sm:text-[12px] tracking-[0.2em] sm:tracking-[0.24em] text-[#C4A7FB] uppercase font-medium px-4 xs:px-6 sm:px-10">
                AFRICA / INTERCESSION / GROWTH
              </span>
              <span className="text-[#C4A7FB]/40 select-none text-[10px] font-mono px-1 sm:px-2" aria-hidden="true">
                //
              </span>
              <span className="font-mono text-[10px] xs:text-[11px] sm:text-[12px] tracking-[0.2em] sm:tracking-[0.24em] text-[#A594D0] uppercase font-medium px-4 xs:px-6 sm:px-10">
                HEPHZIBAH CHRISTIAN WOMEN DEVELOPMENT MINISTRY
              </span>
              <span className="text-[#C4A7FB]/40 select-none text-[10px] font-mono px-1 sm:px-2" aria-hidden="true">
                //
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle floating down indicator */}
      <div className="relative z-20 w-full flex justify-center pb-2 pt-1">
        <ScrollIndicator
          label="Scroll"
          onClick={handleScrollClick}
          accentBorder="#C4A7FB"
          accentText="#C4A7FB"
        />
      </div>
    </section>
  );
};
