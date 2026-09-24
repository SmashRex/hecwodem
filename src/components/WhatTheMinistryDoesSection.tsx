/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';

export interface MinistryArea {
  id: string;
  number: string;
  title: string;
  description: string;
  isFeaturedDark?: boolean;
}

export interface WhatTheMinistryDoesSectionProps {
  /** Optional callback when the closing CTA is clicked */
  onExploreAllClick?: () => void;
  /** Optional callback when an individual area "Explore" link is clicked */
  onAreaClick?: (areaId: string) => void;
  /** Optional custom class names */
  className?: string;
}

/*
  DUMMY COPY — CONFIRM AGAINST ACTUAL HECWODEM ACTIVITIES BEFORE PUBLISHING
  Six ministry-area blocks (number, title, 1–2 sentence description each):
*/
const MINISTRY_AREAS: MinistryArea[] = [
  {
    id: 'spiritual-growth',
    number: '01',
    title: 'Spiritual Growth',
    description:
      'Helping women deepen their relationship with God through faith, teaching, prayer, and encouragement.',
    isFeaturedDark: true, // Distinct deep-plum visual anchor to break grid monotony
  },
  {
    id: 'womens-development',
    number: '02',
    title: "Women's Development",
    description:
      'Encouraging women to grow personally and practically — in confidence, purpose, and everyday life skills.',
    isFeaturedDark: false,
  },
  {
    id: 'teaching-resources',
    number: '03',
    title: 'Teaching & Resources',
    description:
      'Accessible faith-based teaching and resources women can return to whenever they need it.',
    isFeaturedDark: false,
  },
  {
    id: 'counselling-encouragement',
    number: '04',
    title: 'Counselling & Encouragement',
    description:
      'A supportive space for guidance, prayer, and encouragement along the way.',
    isFeaturedDark: true, // Second rhythmic plum accent block maintaining editorial balance
  },
  {
    id: 'community-connection',
    number: '05',
    title: 'Community & Connection',
    description:
      'Creating opportunities for women to connect, encourage one another, and belong.',
    isFeaturedDark: false,
  },
  {
    id: 'purpose-life-development',
    number: '06',
    title: 'Purpose & Life Development',
    description:
      'Helping women live intentionally and grow into the purpose God has given them.',
    isFeaturedDark: false,
  },
];

export const WhatTheMinistryDoesSection: React.FC<WhatTheMinistryDoesSectionProps> = ({
  onExploreAllClick,
  onAreaClick,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Gentle scroll-in entrance respecting prefers-reduced-motion
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
        threshold: 0.1,
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

  const handleClosingCta = (e: React.MouseEvent) => {
    if (onExploreAllClick) {
      e.preventDefault();
      onExploreAllClick();
    }
  };

  const handleAreaLink = (e: React.MouseEvent, areaId: string) => {
    if (onAreaClick) {
      e.preventDefault();
      onAreaClick(areaId);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="what-we-do"
      aria-labelledby="what-we-do-heading"
      className={`relative w-full bg-[#FBF8F4] text-[#332E2F] py-24 sm:py-32 lg:py-40 overflow-hidden border-t border-[#3A1D29]/5 ${className}`}
    >
      {/* Invisible anchor tag for seamless compatibility with prior section's #ministry-work link */}
      <span id="ministry-work" className="sr-only" aria-hidden="true" />

      {/* Subtle background atmosphere: light warmth without heavy dark fills */}
      <div
        aria-hidden="true"
        role="presentation"
        className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden"
      >
        <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] rounded-full bg-[#F2E6E3]/50 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] rounded-full bg-[#C8A66A]/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div
          className={`transition-all duration-1000 ease-out motion-reduce:transition-none ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* =========================================================================
              SECTION HEADER: EYEBROW + HEADING + SUPPORTING PARAGRAPH
          ========================================================================== */}
          <div className="max-w-3xl mb-14 sm:mb-20">
            {/* Eyebrow with restrained champagne accent line */}
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <span
                className="text-[11px] sm:text-[12px] font-semibold tracking-[0.18em] uppercase text-[#542A3A]/85 font-sans"
                style={{ letterSpacing: '0.18em' }}
              >
                WHAT WE DO
              </span>
              <div className="w-8 h-[1px] bg-[#C8A66A]" aria-hidden="true" />
            </div>

            {/* Main Section Heading: Instrument Serif in Deep Plum */}
            <h2
              id="what-we-do-heading"
              className="text-[38px] sm:text-[52px] lg:text-[64px] leading-[1.06] font-serif font-normal text-[#3A1D29] tracking-tight mb-6 text-balance"
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                lineHeight: 1.06,
              }}
            >
              Faith in Action.
            </h2>

            {/* 
              DUMMY COPY — CONFIRM AGAINST ACTUAL HECWODEM ACTIVITIES BEFORE PUBLISHING
              Supporting paragraph (below heading):
            */}
            <p className="text-[17px] sm:text-[19px] lg:text-[20px] leading-[1.65] font-normal text-[#5A4D51] font-sans max-w-2xl">
              HECWODEM creates space for women to grow — spiritually, personally,
              and in relationship with one another. Here's a glimpse of how that
              happens.
            </p>
          </div>

          {/* =========================================================================
              ASYMMETRIC EDITORIAL GRID
              Desktop: Asymmetric composition with rhythm, not a uniform card grid.
              Block 01 & 04 use the dark-plum rhythmic treatment with inverted cream text.
              Mobile: Single-column clean stack.
          ========================================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-8 mb-16 sm:mb-20">
            
            {/* -----------------------------------------------------------------
                01 — SPIRITUAL GROWTH (Featured Asymmetric Dark Block: 7 cols)
            ------------------------------------------------------------------ */}
            <div
              className="group lg:col-span-7 flex flex-col justify-between p-8 sm:p-10 lg:p-12 rounded-[14px] bg-[#3A1D29] text-[#FBF8F4] transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle interior glow for depth */}
              <div
                aria-hidden="true"
                role="presentation"
                className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#542A3A]/40 blur-2xl pointer-events-none"
              />

              <div className="relative z-10">
                {/* Header: Number Marker + Accent Rule */}
                <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
                  <span
                    className="font-serif italic text-[28px] sm:text-[34px] leading-none text-[#C8A66A]"
                    style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                  >
                    01
                  </span>
                  <div className="w-10 sm:w-14 h-[1px] bg-[#C8A66A]/40 group-hover:w-20 transition-all duration-300" aria-hidden="true" />
                </div>

                {/* Title */}
                <h3
                  className="font-serif text-[28px] sm:text-[34px] lg:text-[38px] leading-[1.12] text-[#FBF8F4] tracking-tight mb-4"
                  style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                >
                  Spiritual Growth
                </h3>

                {/* Description */}
                <p className="text-[16px] sm:text-[17px] leading-[1.7] text-[#FBF8F4]/80 font-sans max-w-xl mb-8">
                  Helping women deepen their relationship with God through faith,
                  teaching, prayer, and encouragement.
                </p>
              </div>

              {/* Action Link: Refined understated link */}
              <div className="relative z-10 pt-4 border-t border-[#FBF8F4]/15 flex items-center">
                <a
                  href="#ministry-areas"
                  onClick={(e) => handleAreaLink(e, 'spiritual-growth')}
                  className="inline-flex items-center gap-2 text-[14px] sm:text-[15px] font-medium text-[#FBF8F4] hover:text-[#C8A66A] transition-colors py-1 focus-visible:outline-2 focus-visible:outline-[#C8A66A] rounded-sm"
                  aria-label="Explore Spiritual Growth"
                >
                  <span className="relative">
                    Explore
                    <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-[#C8A66A] transition-all duration-300 group-hover:w-full" />
                  </span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200 text-[#C8A66A]"
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

            {/* -----------------------------------------------------------------
                02 — WOMEN'S DEVELOPMENT (Cream Editorial Block: 5 cols)
            ------------------------------------------------------------------ */}
            <div
              className="group lg:col-span-5 flex flex-col justify-between p-8 sm:p-10 lg:p-12 rounded-[14px] bg-[#FAF6F0] text-[#332E2F] border border-[#3A1D29]/10 hover:border-[#3A1D29]/25 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
                  <span
                    className="font-serif italic text-[28px] sm:text-[34px] leading-none text-[#C8A66A]"
                    style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                  >
                    02
                  </span>
                  <div className="w-10 sm:w-14 h-[1px] bg-[#3A1D29]/15 group-hover:bg-[#C8A66A] transition-all duration-300" aria-hidden="true" />
                </div>

                <h3
                  className="font-serif text-[26px] sm:text-[30px] lg:text-[32px] leading-[1.15] text-[#3A1D29] tracking-tight mb-4"
                  style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                >
                  Women's Development
                </h3>

                <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#5A4D51] font-sans mb-8">
                  Encouraging women to grow personally and practically — in
                  confidence, purpose, and everyday life skills.
                </p>
              </div>

              <div className="pt-4 border-t border-[#3A1D29]/10 flex items-center">
                <a
                  href="#ministry-areas"
                  onClick={(e) => handleAreaLink(e, 'womens-development')}
                  className="inline-flex items-center gap-2 text-[14px] sm:text-[15px] font-medium text-[#3A1D29] hover:text-[#542A3A] transition-colors py-1 focus-visible:outline-2 focus-visible:outline-[#C8A66A] rounded-sm"
                  aria-label="Explore Women's Development"
                >
                  <span className="relative">
                    Explore
                    <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-[#C8A66A] transition-all duration-300 group-hover:w-full" />
                  </span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200 text-[#C8A66A]"
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

            {/* -----------------------------------------------------------------
                03 — TEACHING & RESOURCES (Cream Block: 4 cols)
            ------------------------------------------------------------------ */}
            <div
              className="group md:col-span-1 lg:col-span-4 flex flex-col justify-between p-8 sm:p-9 rounded-[14px] bg-[#FAF6F0] text-[#332E2F] border border-[#3A1D29]/10 hover:border-[#3A1D29]/25 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span
                    className="font-serif italic text-[26px] sm:text-[30px] leading-none text-[#C8A66A]"
                    style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                  >
                    03
                  </span>
                  <div className="w-8 sm:w-10 h-[1px] bg-[#3A1D29]/15 group-hover:bg-[#C8A66A] transition-all duration-300" aria-hidden="true" />
                </div>

                <h3
                  className="font-serif text-[24px] sm:text-[27px] leading-[1.18] text-[#3A1D29] tracking-tight mb-3"
                  style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                >
                  Teaching &amp; Resources
                </h3>

                <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#5A4D51] font-sans mb-8">
                  Accessible faith-based teaching and resources women can return
                  to whenever they need it.
                </p>
              </div>

              <div className="pt-4 border-t border-[#3A1D29]/10 flex items-center">
                <a
                  href="#ministry-areas"
                  onClick={(e) => handleAreaLink(e, 'teaching-resources')}
                  className="inline-flex items-center gap-2 text-[14px] font-medium text-[#3A1D29] hover:text-[#542A3A] transition-colors py-1 focus-visible:outline-2 focus-visible:outline-[#C8A66A] rounded-sm"
                  aria-label="Explore Teaching & Resources"
                >
                  <span className="relative">
                    Explore
                    <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-[#C8A66A] transition-all duration-300 group-hover:w-full" />
                  </span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200 text-[#C8A66A]"
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

            {/* -----------------------------------------------------------------
                04 — COUNSELLING & ENCOURAGEMENT (Dark Plum Block: 4 cols)
                Strictly non-clinical guidance, prayer, and encouragement.
            ------------------------------------------------------------------ */}
            <div
              className="group md:col-span-1 lg:col-span-4 flex flex-col justify-between p-8 sm:p-9 rounded-[14px] bg-[#3A1D29] text-[#FBF8F4] transition-all duration-300 relative overflow-hidden"
            >
              <div
                aria-hidden="true"
                role="presentation"
                className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full bg-[#542A3A]/40 blur-xl pointer-events-none"
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span
                    className="font-serif italic text-[26px] sm:text-[30px] leading-none text-[#C8A66A]"
                    style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                  >
                    04
                  </span>
                  <div className="w-8 sm:w-10 h-[1px] bg-[#C8A66A]/40 group-hover:w-14 transition-all duration-300" aria-hidden="true" />
                </div>

                <h3
                  className="font-serif text-[24px] sm:text-[27px] leading-[1.18] text-[#FBF8F4] tracking-tight mb-3"
                  style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                >
                  Counselling &amp; Encouragement
                </h3>

                <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#FBF8F4]/80 font-sans mb-8">
                  A supportive space for guidance, prayer, and encouragement
                  along the way.
                </p>
              </div>

              <div className="relative z-10 pt-4 border-t border-[#FBF8F4]/15 flex items-center">
                <a
                  href="#ministry-areas"
                  onClick={(e) => handleAreaLink(e, 'counselling-encouragement')}
                  className="inline-flex items-center gap-2 text-[14px] font-medium text-[#FBF8F4] hover:text-[#C8A66A] transition-colors py-1 focus-visible:outline-2 focus-visible:outline-[#C8A66A] rounded-sm"
                  aria-label="Explore Counselling & Encouragement"
                >
                  <span className="relative">
                    Explore
                    <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-[#C8A66A] transition-all duration-300 group-hover:w-full" />
                  </span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200 text-[#C8A66A]"
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

            {/* -----------------------------------------------------------------
                05 — COMMUNITY & CONNECTION (Cream Block: 4 cols)
            ------------------------------------------------------------------ */}
            <div
              className="group md:col-span-1 lg:col-span-4 flex flex-col justify-between p-8 sm:p-9 rounded-[14px] bg-[#FAF6F0] text-[#332E2F] border border-[#3A1D29]/10 hover:border-[#3A1D29]/25 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span
                    className="font-serif italic text-[26px] sm:text-[30px] leading-none text-[#C8A66A]"
                    style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                  >
                    05
                  </span>
                  <div className="w-8 sm:w-10 h-[1px] bg-[#3A1D29]/15 group-hover:bg-[#C8A66A] transition-all duration-300" aria-hidden="true" />
                </div>

                <h3
                  className="font-serif text-[24px] sm:text-[27px] leading-[1.18] text-[#3A1D29] tracking-tight mb-3"
                  style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                >
                  Community &amp; Connection
                </h3>

                <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#5A4D51] font-sans mb-8">
                  Creating opportunities for women to connect, encourage one
                  another, and belong.
                </p>
              </div>

              <div className="pt-4 border-t border-[#3A1D29]/10 flex items-center">
                <a
                  href="#ministry-areas"
                  onClick={(e) => handleAreaLink(e, 'community-connection')}
                  className="inline-flex items-center gap-2 text-[14px] font-medium text-[#3A1D29] hover:text-[#542A3A] transition-colors py-1 focus-visible:outline-2 focus-visible:outline-[#C8A66A] rounded-sm"
                  aria-label="Explore Community & Connection"
                >
                  <span className="relative">
                    Explore
                    <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-[#C8A66A] transition-all duration-300 group-hover:w-full" />
                  </span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200 text-[#C8A66A]"
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

            {/* -----------------------------------------------------------------
                06 — PURPOSE & LIFE DEVELOPMENT (Expansive Editorial Block: 12 cols)
            ------------------------------------------------------------------ */}
            <div
              className="group md:col-span-2 lg:col-span-12 flex flex-col lg:flex-row lg:items-center justify-between p-8 sm:p-10 lg:p-12 rounded-[14px] bg-[#FAF6F0] text-[#332E2F] border border-[#3A1D29]/10 hover:border-[#3A1D29]/25 transition-all duration-300 gap-8"
            >
              <div className="max-w-3xl">
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className="font-serif italic text-[28px] sm:text-[32px] leading-none text-[#C8A66A]"
                    style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                  >
                    06
                  </span>
                  <div className="w-8 h-[1px] bg-[#3A1D29]/15 group-hover:bg-[#C8A66A] transition-all duration-300" aria-hidden="true" />
                  <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#542A3A]/70 font-sans">
                    Ministry Focus
                  </span>
                </div>

                <h3
                  className="font-serif text-[28px] sm:text-[34px] lg:text-[38px] leading-[1.12] text-[#3A1D29] tracking-tight mb-3"
                  style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                >
                  Purpose &amp; Life Development
                </h3>

                <p className="text-[16px] sm:text-[17px] leading-[1.7] text-[#5A4D51] font-sans">
                  Helping women live intentionally and grow into the purpose God
                  has given them.
                </p>
              </div>

              <div className="lg:shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#3A1D29]/10 flex items-center">
                <a
                  href="#ministry-areas"
                  onClick={(e) => handleAreaLink(e, 'purpose-life-development')}
                  className="inline-flex items-center gap-2 text-[15px] font-medium text-[#3A1D29] hover:text-[#542A3A] transition-colors py-2 focus-visible:outline-2 focus-visible:outline-[#C8A66A] rounded-sm"
                  aria-label="Explore Purpose & Life Development"
                >
                  <span className="relative">
                    Explore
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

          {/* =========================================================================
              CLOSING SECTION CTA
              "Explore what HECWODEM offers →"
              Refined, understated forward-pointing link with champagne underline & arrow.
          ========================================================================== */}
          <div className="pt-8 sm:pt-10 border-t border-[#3A1D29]/10 flex items-center justify-between">
            <a
              href="#ministry-offerings"
              onClick={handleClosingCta}
              className="group inline-flex items-center gap-3 text-[16px] sm:text-[17px] font-medium text-[#3A1D29] hover:text-[#542A3A] transition-colors py-2 focus-visible:outline-2 focus-visible:outline-[#C8A66A] focus-visible:outline-offset-4 rounded-sm"
              aria-label="Explore what HECWODEM offers"
            >
              <span className="relative">
                Explore what HECWODEM offers
                <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-[#C8A66A] transition-all duration-300 group-hover:w-full" />
              </span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-200 text-[#C8A66A]"
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
