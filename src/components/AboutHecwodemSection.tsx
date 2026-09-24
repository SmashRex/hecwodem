/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';

export interface AboutHecwodemSectionProps {
  /** Optional callback when "Discover Our Work" CTA is triggered */
  onDiscoverWorkClick?: () => void;
  /** Optional custom class names */
  className?: string;
}

export const AboutHecwodemSection: React.FC<AboutHecwodemSectionProps> = ({
  onDiscoverWorkClick,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Subtle scroll-in entrance respecting prefers-reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleCtaClick = (e: React.MouseEvent) => {
    if (onDiscoverWorkClick) {
      e.preventDefault();
      onDiscoverWorkClick();
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-hecwodem-heading"
      className={`relative w-full bg-[#FAF6F0] text-[#332E2F] py-24 sm:py-32 lg:py-40 overflow-hidden border-t border-[#3A1D29]/5 ${className}`}
    >
      {/* 
        Supporting Visual:
        A single restrained atmospheric accent — delicate champagne linear wash and subtle glow
        clearly secondary to the editorial typography without introducing heavy decorations or dashboard cards.
      */}
      <div
        aria-hidden="true"
        role="presentation"
        className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden"
      >
        <div className="absolute top-0 right-1/4 w-[480px] h-[480px] rounded-full bg-[#F2E6E3]/40 blur-3xl" />
        <div className="absolute bottom-10 left-1/5 w-[360px] h-[360px] rounded-full bg-[#C8A66A]/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div
          className={`transition-all duration-1000 ease-out motion-reduce:transition-none ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* =========================================================================
              HEADER BLOCK: EYEBROW & MAIN HEADING
          ========================================================================== */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            {/* Eyebrow with restrained champagne accent line */}
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <span
                className="text-[11px] sm:text-[12px] font-semibold tracking-[0.18em] uppercase text-[#542A3A]/85 font-sans"
                style={{ letterSpacing: '0.18em' }}
              >
                ABOUT HECWODEM
              </span>
              <div className="w-8 h-[1px] bg-[#C8A66A]" aria-hidden="true" />
            </div>

            {/* Main Section Heading: Instrument Serif in Deep Plum */}
            <h2
              id="about-hecwodem-heading"
              className="text-[38px] sm:text-[50px] lg:text-[62px] leading-[1.08] font-serif font-normal text-[#3A1D29] tracking-tight text-balance"
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                lineHeight: 1.08,
              }}
            >
              Growing Women. Strengthening Faith. Building Lives.
            </h2>
          </div>

          {/* =========================================================================
              NARRATIVE: EDITORIAL TWO-COLUMN CONTENT BLOCK
              Widens the story from founder to mission with balanced visual weight.
          ========================================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 mb-16 sm:mb-20 items-start">
            {/* Column 1: Introduction */}
            <div className="lg:col-span-5">
              {/* 
                DUMMY COPY — TO BE REPLACED WITH OFFICIAL MINISTRY WORDING
                Introduction (short paragraph):
              */}
              <p className="text-[18px] sm:text-[20px] lg:text-[21px] leading-[1.6] font-normal text-[#332E2F] font-sans">
                HECWODEM exists to walk alongside women in their relationship with God — encouraging growth, offering guidance through every season, and building a community where women can be strengthened in faith and purposeful in life.
              </p>
            </div>

            {/* Column 2: The Heart of HECWODEM */}
            <div className="lg:col-span-7 lg:pt-1">
              {/* 
                DUMMY COPY — TO BE REPLACED WITH OFFICIAL MINISTRY WORDING
                The Heart of HECWODEM (deeper content block, concise):
              */}
              <p className="text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.8] font-normal text-[#5A4D51] font-sans">
                At its heart, HECWODEM is about helping women grow closer to God, supporting one another through life's different seasons, and creating space for real, honest community. It's a place to learn, to be encouraged, and to discover the purpose God has for each woman who walks through it.
              </p>
            </div>
          </div>

          {/* =========================================================================
              VISION STATEMENT HIGHLIGHT
              Stand-alone large serif statement, distinctly framed without heavy cards.
          ========================================================================== */}
          <div className="my-16 sm:my-20 py-10 sm:py-14 border-y border-[#3A1D29]/10 relative">
            {/* Sparing champagne accent bar */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-16 sm:h-20 bg-[#C8A66A] rounded-full hidden sm:block"
              aria-hidden="true"
            />
            
            <div className="sm:pl-8 max-w-4xl">
              {/* 
                DUMMY COPY — TO BE REPLACED WITH OFFICIAL MINISTRY WORDING
                [PLACEHOLDER — DESIGN PLACEHOLDER, NOT OFFICIAL MINISTRY LANGUAGE]
              */}
              <blockquote className="m-0">
                <p
                  className="font-serif italic text-[26px] sm:text-[34px] lg:text-[42px] leading-[1.22] text-[#3A1D29] tracking-tight text-balance"
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    lineHeight: 1.22,
                  }}
                >
                  &ldquo;Helping women grow in faith, discover purpose, and live with courage.&rdquo;
                </p>
                <cite className="block mt-4 text-[12px] sm:text-[13px] font-medium tracking-[0.14em] uppercase text-[#827577] not-italic font-sans">
                  Ministry Vision
                </cite>
              </blockquote>
            </div>
          </div>

          {/* =========================================================================
              THE THREE PILLARS: FAITH / GROWTH / PURPOSE
              Restrained trio — simple typographic groupings (label + one-line description),
              NOT heavy cards, NOT dashboard tiles.
          ========================================================================== */}
          <div className="pt-4 sm:pt-6 mb-16 sm:mb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 lg:gap-16">
              
              {/* PILLAR 1: FAITH */}
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8A66A]" aria-hidden="true" />
                  <h3
                    className="text-[13px] sm:text-[14px] font-semibold tracking-[0.16em] uppercase text-[#3A1D29] font-sans"
                    style={{ letterSpacing: '0.16em' }}
                  >
                    FAITH
                  </h3>
                </div>
                <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#5A4D51] font-sans">
                  Helping women deepen their relationship with God and grow spiritually.
                </p>
              </div>

              {/* PILLAR 2: GROWTH */}
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8A66A]" aria-hidden="true" />
                  <h3
                    className="text-[13px] sm:text-[14px] font-semibold tracking-[0.16em] uppercase text-[#3A1D29] font-sans"
                    style={{ letterSpacing: '0.16em' }}
                  >
                    GROWTH
                  </h3>
                </div>
                <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#5A4D51] font-sans">
                  Encouraging personal, emotional, and practical development.
                </p>
              </div>

              {/* PILLAR 3: PURPOSE */}
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8A66A]" aria-hidden="true" />
                  <h3
                    className="text-[13px] sm:text-[14px] font-semibold tracking-[0.16em] uppercase text-[#3A1D29] font-sans"
                    style={{ letterSpacing: '0.16em' }}
                  >
                    PURPOSE
                  </h3>
                </div>
                <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#5A4D51] font-sans">
                  Helping women recognize their potential and live intentionally.
                </p>
              </div>

            </div>
          </div>

          {/* =========================================================================
              CTA: FORWARD-POINTING LINK TO FUTURE MINISTRY WORK
              Signals continuation without sales-style buttons or prematurely building Section 04.
          ========================================================================== */}
          <div className="pt-6 sm:pt-8 border-t border-[#3A1D29]/10 flex items-center justify-between">
            <a
              href="#ministry-work"
              onClick={handleCtaClick}
              className="group inline-flex items-center gap-3 text-[15px] sm:text-[16px] font-medium text-[#3A1D29] hover:text-[#542A3A] transition-colors py-2 focus-visible:outline-2 focus-visible:outline-[#C8A66A] focus-visible:outline-offset-4 rounded-sm"
              aria-label="Discover Our Work — Learn more about HECWODEM's ministry"
            >
              <span className="relative">
                Discover Our Work
                <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-[#C8A66A] transition-all duration-300 group-hover:w-full" />
              </span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-200 text-[#C8A66A]"
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
      </div>
    </section>
  );
};
