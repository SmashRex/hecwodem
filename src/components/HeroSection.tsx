/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Navbar } from './Navbar.tsx';
import { ScrollIndicator } from './ScrollIndicator.tsx';

export interface HeroSectionProps {
  /** Path to the HECWODEM brand logo SVG asset */
  logoSrc?: string;
  /** Accessible description of the HECWODEM brand mark */
  logoAlt?: string;
  /** Tunable opacity for the tonal watermark logo on desktop */
  watermarkOpacity?: number;
  /** Tunable opacity for the tonal watermark logo on mobile (0 = hidden per design system) */
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
  watermarkOpacity = 0.10,
  watermarkOpacityMobile = 0,
  watermarkFilter = 'grayscale(100%) brightness(0.85) contrast(0.8)',
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
      className="relative isolate min-h-screen min-h-[100svh] w-full overflow-hidden text-[#FBF8F3] flex flex-col justify-between"
      style={
        {
          /* Royal Indigo Locked Atmosphere tokens */
          background: 'radial-gradient(circle at 50% 12%, #343777 0%, #25265C 55%, #181940 100%)',
          '--hero-accent': '#5964D8',
          '--hero-accent-soft': '#7C84E8',
          '--hero-feminine': '#D09AA5',
          '--hero-champagne': '#C7A76A',
          '--hero-bg-deep': '#25265C',
          '--hero-bg-secondary': '#343777',
        } as React.CSSProperties
      }
    >
      {/* =========================================================
          LAYER 0: EDITORIAL BACKGROUND & WATERMARK (z-0)
      ========================================================== */}
      <div
        aria-hidden="true"
        role="presentation"
        className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden"
      >
        {/* Ambient atmospheric fields with Royal Indigo tones */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] lg:w-[950px] h-[700px] lg:h-[950px] rounded-full bg-[#343777]/35 blur-3xl opacity-75" />
        
        {/* Primary atmospheric light glow */}
        <div
          className="absolute top-20 left-1/4 w-[440px] h-[440px] rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: 'rgba(89, 100, 216, 0.35)' }}
        />

        {/* Secondary ambient light glow on opposite quadrant with feminine accent warmth */}
        <div
          className="absolute bottom-24 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: 'rgba(208, 154, 165, 0.22)' }}
        />

        {/* Central backlight aura directly centered behind the logo watermark and text */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[600px] md:h-[900px] rounded-full blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(89, 100, 216, 0.38) 0%, transparent 70%)',
          }}
        />

        {/* 
          WATERMARK POSITIONING
          Centered Mode: Dead-center on both axes, scaled up significantly behind the text stack.
          Symmetric overflow is natural, intentional, and contained cleanly by overflow-hidden.
          Mobile view: Completely hidden per design specification to preserve pristine legibility.
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
                  filter: `${watermarkFilter} drop-shadow(0 0 45px rgba(89, 100, 216, 0.38))`,
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
                filter: `${watermarkFilter} drop-shadow(0 0 45px rgba(89, 100, 216, 0.38))`,
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
            bg-[radial-gradient(circle_at_center,rgba(37,38,92,0.50)_0%,rgba(37,38,92,0.30)_50%,rgba(37,38,92,0.05)_80%,transparent_100%)]
          "
        />
      </div>

      {/* =========================================================
          LAYER 1: TRANSPARENT NAVBAR (Strict z-50)
      ========================================================== */}
      <div style={{ paddingTop: '18px' }}>
        <Navbar
          onCounsellingClick={onBookCounsellingClick}
          accentText="#7C84E8"
          accentBorder="#5964D8"
          accentPrimary="#5964D8"
          activeDotColor="#7C84E8"
          ctaBg="rgba(89, 100, 216, 0.20)"
          ctaBorder="#5964D8"
          ctaGlow="rgba(89, 100, 216, 0.38)"
        />
      </div>

      {/* =========================================================
          LAYER 2: MAIN HERO CONTENT WRAPPER (Strict z-20)
      ========================================================== */}
      <div className="relative z-20 flex-1 flex items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-10 lg:py-14">
        {isCentered ? (
          /* =======================================================
             FULLY CENTERED HERO COMPOSITION
          ======================================================== */
          <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center animate-hero-entrance">
            {/* Large Serif Heading: Warm Ivory (#FBF8F3) - lead visual element */}
            <h1
              className="text-[44px] leading-[1.04] xs:text-[50px] sm:text-[68px] lg:text-[80px] xl:text-[86px] font-serif font-normal text-[#FBF8F3] tracking-tight mb-5 sm:mb-6 text-balance"
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                lineHeight: 1.04,
              }}
            >
              Welcome to HECWODEM
            </h1>

            {/* Supporting paragraph: Warm Ivory readable measure */}
            <p className="text-[15px] xs:text-[16px] sm:text-[17px] lg:text-[18px] leading-[1.68] font-normal text-[#FBF8F3]/90 max-w-xl mx-auto mb-8 sm:mb-10 font-sans text-center">
              A place of faith, growth and encouragement for women, created to
              help you walk through every season with God.
            </p>

            {/* CTA Group: Responsive stack on mobile, horizontal row on sm+ */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto">
              {/* Primary CTA button: Royal Indigo gradient */}
              <button
                type="button"
                onClick={onExploreClick}
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center px-7 py-3.5 rounded-[6px] text-[15px] font-medium tracking-normal transition-all duration-300 border shadow-md hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg, #5964D8 0%, #444FC0 100%)',
                  color: '#FFFFFF',
                  borderColor: '#7C84E8',
                  boxShadow: '0 8px 24px -2px rgba(89, 100, 216, 0.52), 0 2px 8px rgba(0, 0, 0, 0.35)',
                  outlineColor: '#5964D8',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, #444FC0 0%, #353FA8 100%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, #5964D8 0%, #444FC0 100%)';
                }}
              >
                Explore HECWODEM
              </button>

              {/* Secondary editorial text link: Warm Ivory with Lucide ArrowRight transition */}
              <a
                href="#about-founder"
                onClick={(e) => {
                  if (onMeetFounderClick) {
                    e.preventDefault();
                    onMeetFounderClick();
                  }
                }}
                className="group inline-flex items-center justify-center min-h-[44px] gap-2 px-3 py-2 text-[15px] font-medium text-[#FBF8F3] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 rounded-sm"
                style={{
                  outlineColor: '#5964D8',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#7C84E8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#FBF8F3';
                }}
              >
                <span className="relative">
                  Meet the Founder
                  <span
                    className="absolute bottom-0 left-0 w-0 h-[1px] group-hover:w-full transition-all duration-300"
                    style={{ backgroundColor: '#7C84E8' }}
                  />
                </span>
                <ArrowRight
                  className="w-4 h-4 transform group-hover:translate-x-1.5 transition-all duration-200"
                  style={{ color: '#7C84E8' }}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        ) : (
          /* Split layout fallback */
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-8 xl:col-span-7 flex flex-col items-start text-left animate-hero-entrance">
              <h1
                className="text-[44px] leading-[1.05] sm:text-[58px] lg:text-[72px] font-serif font-normal text-[#FBF8F3] tracking-tight mb-5 sm:mb-6 text-balance"
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  lineHeight: 1.05,
                }}
              >
                Welcome to HECWODEM
              </h1>

              <p className="text-[15px] sm:text-[17px] leading-[1.68] font-normal text-[#FBF8F3]/90 max-w-xl mb-8 sm:mb-10 font-sans">
                A place of faith, growth and encouragement for women, created to
                help you walk through every season with God.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onExploreClick}
                  className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center px-7 py-3.5 rounded-[6px] text-[15px] font-medium tracking-normal transition-all duration-300 border shadow-md hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #5964D8 0%, #444FC0 100%)',
                    color: '#FFFFFF',
                    borderColor: '#7C84E8',
                    boxShadow: '0 8px 24px -2px rgba(89, 100, 216, 0.52), 0 2px 8px rgba(0, 0, 0, 0.35)',
                    outlineColor: '#5964D8',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.background = 'linear-gradient(135deg, #444FC0 0%, #353FA8 100%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.background = 'linear-gradient(135deg, #5964D8 0%, #444FC0 100%)';
                  }}
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
                  className="group inline-flex items-center justify-center min-h-[44px] gap-2 px-3 py-2 text-[15px] font-medium text-[#FBF8F3] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 rounded-sm"
                  style={{
                    outlineColor: '#5964D8',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#7C84E8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#FBF8F3';
                  }}
                >
                  <span className="relative">
                    Meet the Founder
                    <span
                      className="absolute bottom-0 left-0 w-0 h-[1px] group-hover:w-full transition-all duration-300"
                      style={{ backgroundColor: '#7C84E8' }}
                    />
                  </span>
                  <ArrowRight
                    className="w-4 h-4 transform group-hover:translate-x-1.5 transition-all duration-200"
                    style={{ color: '#7C84E8' }}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
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
      <div className="relative z-20 w-full flex justify-center pb-4 sm:pb-6 lg:pb-8">
        <ScrollIndicator
          label="Scroll"
          onClick={handleScrollClick}
          accentBorder="#5964D8"
          accentText="#7C84E8"
        />
      </div>
    </section>
  );
};
