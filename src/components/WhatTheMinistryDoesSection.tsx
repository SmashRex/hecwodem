/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';

export interface FocusArea {
  number: string;
  title: string;
  description: string;
}

export interface WhatTheMinistryDoesSectionProps {
  /** Optional callback when the closing CTA is clicked */
  onExploreAllClick?: () => void;
  /** Legacy callback preserved for interface compatibility */
  onAreaClick?: (areaId: string) => void;
  /** Optional custom class names */
  className?: string;
}

/*
  Four official editorial focus areas derived from the official ministry documentation.
  These represent commitments and areas of ministry emphasis, not independently scheduled programmes.
*/
const FOCUS_AREAS: FocusArea[] = [
  {
    number: '01',
    title: 'Intercession for Women',
    description:
      'Prayer and intercession for women across Africa, with concern for their faith, families, and communities.',
  },
  {
    number: '02',
    title: 'The Gospel and Spiritual Growth',
    description:
      'Proclaiming the Gospel of truth and encouraging women to build a genuine relationship with Jesus Christ through the Word of God, prayer, teaching, love, and encouragement.',
  },
  {
    number: '03',
    title: 'Encouragement Through Life\'s Challenges',
    description:
      'The ministry has served women facing challenges in their marriages, families, careers, businesses, and personal lives. These experiences have strengthened its conviction that women deserve love, support, encouragement, and the opportunity to grow in faith and purpose.',
  },
  {
    number: '04',
    title: 'Practical Empowerment',
    description:
      'Encouraging women to develop their potential through entrepreneurship, capacity building, knowledge, skills, and practical opportunities that support financial independence and meaningful contributions to society.',
  },
];

export const WhatTheMinistryDoesSection: React.FC<WhatTheMinistryDoesSectionProps> = ({
  onExploreAllClick,
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

  return (
    <section
      ref={sectionRef}
      id="what-we-do"
      aria-labelledby="what-we-do-heading"
      className={`relative w-full bg-warm-ivory text-soft-ink py-16 sm:py-24 lg:py-36 overflow-hidden border-t border-soft-border/60 ${className}`}
    >
      {/* Invisible anchor tag for seamless compatibility with legacy #ministry-work link */}
      <span id="ministry-work" className="sr-only" aria-hidden="true" />

      {/* Subtle background atmosphere: light warmth without heavy dark fills */}
      <div
        aria-hidden="true"
        role="presentation"
        className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden"
      >
        <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] rounded-full bg-pale-blue/30 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] rounded-full bg-champagne/8 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div
          className={`transition-all duration-1000 ease-out motion-reduce:transition-none ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* =========================================================================
              SECTION HEADER: EYEBROW + HEADING + INTRODUCTION
          ========================================================================== */}
          <div className="max-w-3xl mb-14 sm:mb-20">
            {/* Eyebrow with restrained champagne accent line */}
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <span
                className="text-[11px] sm:text-[12px] font-semibold tracking-[0.18em] uppercase text-warm-taupe font-sans"
                style={{ letterSpacing: '0.18em' }}
              >
                OUR CALLING IN PRACTICE
              </span>
              <div className="w-8 h-[1px] bg-champagne" aria-hidden="true" />
            </div>

            {/* Main Section Heading: Instrument Serif in Royal Indigo */}
            <h2
              id="what-we-do-heading"
              className="text-[38px] sm:text-[52px] lg:text-[64px] leading-[1.06] font-serif font-normal text-royal-indigo tracking-tight mb-6 text-balance"
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                lineHeight: 1.06,
              }}
            >
              How We Live Out This Calling
            </h2>

            {/* Introduction paragraph */}
            <p className="text-[17px] sm:text-[19px] lg:text-[20px] leading-[1.65] font-normal text-soft-ink/85 font-sans max-w-2xl">
              HECWODEM&apos;s calling brings together spiritual transformation and practical empowerment. Its work is guided by a commitment to help women grow in Christ, find hope through life&apos;s challenges, and develop their God-given potential.
            </p>
          </div>

          {/* =========================================================================
              FOUR NUMBERED EDITORIAL ROWS
              Distinct typographic identity through scale, fine dividers, and generous whitespace.
              Avoids generic dashboard-like card boxes.
          ========================================================================== */}
          <div className="divide-y divide-soft-border/70 border-y border-soft-border/70 mb-16 sm:mb-20">
            {FOCUS_AREAS.map((area) => (
              <div
                key={area.number}
                className="py-10 sm:py-12 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-baseline group"
              >
                {/* Number marker column (2 cols on desktop) */}
                <div className="lg:col-span-2 flex items-baseline gap-3">
                  <span
                    className="font-serif italic text-[32px] sm:text-[38px] lg:text-[44px] leading-none text-champagne select-none"
                    style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                  >
                    {area.number}
                  </span>
                  <div className="w-6 h-[1px] bg-champagne/40 lg:hidden" aria-hidden="true" />
                </div>

                {/* Title column (4 cols on desktop) */}
                <div className="lg:col-span-4">
                  <h3
                    className="font-serif text-[26px] sm:text-[30px] lg:text-[34px] leading-[1.15] text-royal-indigo tracking-tight"
                    style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                  >
                    {area.title}
                  </h3>
                </div>

                {/* Description column (6 cols on desktop) */}
                <div className="lg:col-span-6">
                  <p className="text-[16px] sm:text-[17px] lg:text-[18px] leading-[1.72] text-soft-ink/85 font-sans">
                    {area.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* =========================================================================
              CLOSING SECTION CTA
              "Explore Our Writings"
              Leads visitors smoothly into Section 05 (#writings)
          ========================================================================== */}
          <div className="pt-6 sm:pt-8 flex items-center justify-between">
            <a
              href="#writings"
              onClick={handleClosingCta}
              className="group inline-flex items-center min-h-[44px] gap-3 text-[16px] sm:text-[17px] font-medium text-royal-indigo hover:text-royal-indigo-accent transition-colors py-2 focus-visible:outline-2 focus-visible:outline-champagne focus-visible:outline-offset-4 rounded-sm"
              aria-label="Explore Our Writings: Read publications and reflections by B.T. Adesope"
            >
              <span className="relative">
                Explore Our Writings
                <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-champagne transition-all duration-300 group-hover:w-full" />
              </span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-200 text-champagne"
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
