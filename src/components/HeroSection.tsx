/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './Navbar.tsx';
import { ScrollIndicator } from './ScrollIndicator.tsx';

export interface HeroSectionProps {
  /** Path to the HECWODEM brand logo SVG asset */
  logoSrc?: string;
  /** Accessible description of the HECWODEM brand mark */
  logoAlt?: string;
  /** Tunable opacity for the tonal watermark logo on desktop */
  watermarkOpacity?: number;
  /** Tunable opacity for the tonal watermark logo on mobile */
  watermarkOpacityMobile?: number;
  /** Tunable CSS filter applied to the watermark */
  watermarkFilter?: string;
  /** Tunable CSS mix-blend-mode for the watermark logo */
  watermarkBlendMode?: React.CSSProperties['mixBlendMode'];
  /** Layout variant: 'centered' (default) or 'split' */
  layoutVariant?: 'split' | 'centered';
  /** Interactive callbacks */
  onExploreClick?: () => void;
  onMeetFounderClick?: () => void;
  onBookCounsellingClick?: () => void;
  onScrollClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  logoSrc = '/images/hecwodem-logo.svg',
  logoAlt = 'HECWODEM ministry seal, shown as a background watermark',
  watermarkOpacity = 0.20,
  watermarkOpacityMobile = 0.16,
  watermarkFilter = 'grayscale(100%) brightness(0.75) contrast(0.65) sepia(50%) hue-rotate(320deg)',
  watermarkBlendMode = 'screen',
  layoutVariant = 'centered',
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

    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  const isCentered = layoutVariant === 'centered';

  return (
    <section
      id="home"
      aria-label="Welcome to HECWODEM"
      className="relative isolate min-h-screen w-full overflow-hidden bg-[#3A1D29] text-[#FBF8F4] flex flex-col justify-between"
    >
      {/* =========================================================
          LAYER 0: EDITORIAL BACKGROUND & WATERMARK (z-0)
      ========================================================== */}
      <div
        aria-hidden="true"
        role="presentation"
        className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden"
      >
        {/* Ambient atmospheric fields */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] lg:w-[950px] h-[700px] lg:h-[950px] rounded-full bg-[#542A3A]/30 blur-3xl opacity-70" />
        <div className="absolute top-20 left-1/4 w-[360px] h-[360px] rounded-full bg-[#C8A66A]/5 blur-3xl" />

        {/* 
          WATERMARK POSITIONING
          Centered Mode: Dead-center on both axes, scaled up significantly behind the text stack.
          Symmetric overflow is natural, intentional, and contained cleanly by overflow-hidden.
          Mobile view: Completely hidden per design specification to preserve pristine legibility on mobile.
        */}
        {isCentered ? (
          <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none select-none overflow-hidden">
            <div
              className="
                relative
                md:w-[860px] md:h-[875px]
                lg:w-[1060px] lg:h-[1078px]
                xl:w-[1260px] xl:h-[1281px]
                2xl:w-[1460px] 2xl:h-[1485px]
                shrink-0
                transition-transform duration-700 ease-out
              "
              style={
                {
                  '--logo-opacity-desktop': watermarkOpacity,
                } as React.CSSProperties
              }
            >
              <img
                src={logoSrc}
                alt={logoAlt}
                aria-hidden="true"
                role="presentation"
                loading="eager"
                decoding="async"
                draggable={false}
                className="w-full h-full object-contain pointer-events-none select-none watermark-element"
                style={{
                  filter: watermarkFilter,
                  mixBlendMode: watermarkBlendMode,
                }}
              />
            </div>
          </div>
        ) : (
          /* Split mode: right-anchored watermark */
          <div
            className="
              hidden lg:block absolute pointer-events-none select-none
              lg:top-[53%] lg:-translate-y-1/2 lg:right-6 lg:w-[380px] lg:h-[386px]
              xl:top-[53%] xl:-translate-y-1/2 xl:right-9 xl:w-[460px] xl:h-[468px]
              2xl:top-[53%] 2xl:-translate-y-1/2 2xl:right-12 2xl:w-[540px] 2xl:h-[550px]
            "
            style={
              {
                '--logo-opacity-desktop': watermarkOpacity,
              } as React.CSSProperties
            }
          >
            <img
              src={logoSrc}
              alt={logoAlt}
              aria-hidden="true"
              role="presentation"
              loading="eager"
              decoding="async"
              draggable={false}
              className="w-full h-full object-contain pointer-events-none select-none watermark-element"
              style={{
                filter: watermarkFilter,
                mixBlendMode: watermarkBlendMode,
              }}
            />
          </div>
        )}

        {/* 
          SOFT RADIAL SCRIM / CONTRAST LAYER
          Subtle darkening centered directly behind the text stack to guarantee 100% crisp legibility
          for Warm Ivory typography without muting the bold logo watermark underneath.
        */}
        <div
          className="
            absolute inset-0 pointer-events-none
            bg-[radial-gradient(circle_at_center,rgba(58,29,41,0.72)_0%,rgba(58,29,41,0.48)_40%,rgba(58,29,41,0.15)_70%,transparent_100%)]
          "
        />
      </div>

      {/* =========================================================
          LAYER 1: TRANSPARENT NAVBAR (Strict z-50)
      ========================================================== */}
      <Navbar onCounsellingClick={onBookCounsellingClick} />

      {/* =========================================================
          LAYER 2: MAIN HERO CONTENT WRAPPER (Strict z-20)
      ========================================================== */}
      <div className="relative z-20 flex-1 flex items-center justify-center w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 sm:py-14 lg:py-16">
        {isCentered ? (
          /* =======================================================
             FULLY CENTERED HERO COMPOSITION
          ======================================================== */
          <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center animate-hero-entrance">
            {/* Eyebrow text — EXACT COPY: No decorative dashes or rule lines */}
            <div className="mb-4 sm:mb-5">
              <span
                className="inline-block text-[11px] sm:text-[12px] font-medium tracking-[0.16em] uppercase text-[#F2E6E3]/90 font-sans"
                style={{ letterSpacing: '0.16em' }}
              >
                HEPHZIBAH CHRISTIAN WOMEN DEVELOPMENT MINISTRY
              </span>
            </div>

            {/* Large Serif Heading — EXACT COPY: Single color Warm Ivory (#FBF8F4), NO gold split */}
            <h1
              className="text-[48px] leading-[1.04] sm:text-[64px] lg:text-[78px] xl:text-[86px] font-serif font-normal text-[#FBF8F4] tracking-tight mb-5 sm:mb-6 text-balance"
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                lineHeight: 1.04,
              }}
            >
              Welcome to HECWODEM
            </h1>

            {/* Supporting paragraph — EXACT COPY: Warm Ivory, no decorative divider line */}
            <p className="text-[16px] sm:text-[17px] lg:text-[18px] leading-[1.65] font-normal text-[#FBF8F4]/85 max-w-xl mx-auto mb-8 sm:mb-10 font-sans text-center">
              A place of faith, growth and encouragement for women, created to
              help you walk through every season with God.
            </p>

            {/* CTA Group: Button + Secondary Link centered together */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-7 w-full sm:w-auto">
              {/* Primary CTA button — Deep Plum background with Warm Ivory text, NO gold background */}
              <button
                type="button"
                onClick={onExploreClick}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-[6px] bg-[#542A3A] hover:bg-[#432130] text-[#FBF8F4] text-[15px] font-medium tracking-normal transition-all duration-200 border border-[#FBF8F4]/20 shadow-md hover:shadow-lg focus-visible:outline-2 focus-visible:outline-[#C8A66A] focus-visible:outline-offset-2 active:scale-[0.98]"
              >
                Explore HECWODEM
              </button>

              {/* Secondary editorial text link — Warm Ivory with SVG arrow */}
              <a
                href="#about-founder"
                onClick={(e) => {
                  if (onMeetFounderClick) {
                    e.preventDefault();
                    onMeetFounderClick();
                  }
                }}
                className="group inline-flex items-center gap-2 text-[15px] font-medium text-[#FBF8F4] hover:text-[#C8A66A] transition-colors py-2 focus-visible:outline-2 focus-visible:outline-[#C8A66A] rounded-sm"
              >
                <span>Meet the Founder</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        ) : (
          /* Split layout fallback */
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-8 xl:col-span-7 flex flex-col items-start text-left animate-hero-entrance">
              <div className="mb-4 sm:mb-5">
                <span className="inline-block text-[11px] sm:text-[12px] font-medium tracking-[0.16em] uppercase text-[#F2E6E3]/90 font-sans">
                  HEPHZIBAH CHRISTIAN WOMEN DEVELOPMENT MINISTRY
                </span>
              </div>

              <h1
                className="text-[44px] leading-[1.05] sm:text-[58px] lg:text-[72px] font-serif font-normal text-[#FBF8F4] tracking-tight mb-5 sm:mb-6 text-balance"
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  lineHeight: 1.05,
                }}
              >
                Welcome to HECWODEM
              </h1>

              <p className="text-[16px] sm:text-[17px] leading-[1.65] font-normal text-[#FBF8F4]/85 max-w-xl mb-8 sm:mb-10 font-sans">
                A place of faith, growth and encouragement for women, created to
                help you walk through every season with God.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onExploreClick}
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-[6px] bg-[#542A3A] hover:bg-[#432130] text-[#FBF8F4] text-[15px] font-medium tracking-normal transition-all duration-200 border border-[#FBF8F4]/20 shadow-md hover:shadow-lg focus-visible:outline-2 focus-visible:outline-[#C8A66A] focus-visible:outline-offset-2 active:scale-[0.98]"
                >
                  Explore HECWODEM
                </button>

                <a
                  href="#about-founder"
                  onClick={(e) => {
                    if (onMeetFounderClick) {
                      e.preventDefault();
                      onMeetFounderClick();
                    }
                  }}
                  className="group inline-flex items-center gap-2 text-[15px] font-medium text-[#FBF8F4] hover:text-[#C8A66A] transition-colors py-2 focus-visible:outline-2 focus-visible:outline-[#C8A66A] rounded-sm"
                >
                  <span>Meet the Founder</span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="hidden lg:block lg:col-span-4 xl:col-span-5 pointer-events-none" aria-hidden="true" />
          </div>
        )}
      </div>

      {/* =========================================================
          LAYER 3: SCROLL INDICATOR (z-20)
      ========================================================== */}
      <div className="relative z-20 w-full flex justify-center pb-6 sm:pb-8">
        <ScrollIndicator label="Scroll" onClick={handleScrollClick} />
      </div>
    </section>
  );
};
