/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';

export interface MeetTheFounderSectionProps {
  /** Path to the founder photograph asset */
  photoSrc?: string;
  /** Accessible alt text strictly adhering to brief */
  photoAlt?: string;
  /** Callback for when the "Read Her Story" CTA link is clicked */
  onReadStoryClick?: () => void;
  /** Optional custom class names */
  className?: string;
}

export const MeetTheFounderSection: React.FC<MeetTheFounderSectionProps> = ({
  photoSrc = '/images/hero-founder.jpg',
  photoAlt = 'Bolanle Titilayo Adesope, founder of HECWODEM',
  onReadStoryClick,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imgSrc, setImgSrc] = useState(photoSrc);
  const sectionRef = useRef<HTMLElement>(null);

  // Update image source if prop changes
  useEffect(() => {
    setImgSrc(photoSrc);
  }, [photoSrc]);

  // Gentle intersection observer entrance animation respecting prefers-reduced-motion
  useEffect(() => {
    // Check prefers-reduced-motion media query
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
        threshold: 0.15,
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
    if (onReadStoryClick) {
      e.preventDefault();
      onReadStoryClick();
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about-founder"
      aria-labelledby="founder-heading"
      className={`relative w-full bg-[#FBF8F4] text-[#332E2F] py-20 sm:py-28 lg:py-36 overflow-hidden ${className}`}
    >
      {/* Soft atmospheric background glow behind the section — airy and serene breathing point */}
      <div
        aria-hidden="true"
        role="presentation"
        className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden"
      >
        {/* Soft, warm blush accent glow to integrate composition */}
        <div className="absolute -top-32 right-10 w-[500px] h-[500px] rounded-full bg-[#F2E6E3]/60 blur-3xl" />
        <div className="absolute -bottom-20 left-10 w-[420px] h-[420px] rounded-full bg-[#C8A66A]/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-20 items-center">
          
          {/* =========================================================================
              COLUMN 1: FOUNDER PHOTOGRAPH
              Mobile: Stacked first.
              Desktop: Full/near-full height editorial portrait with soft organic backdrop.
              No heavy cards, borders, or drop shadows.
          ========================================================================== */}
          <div
            className={`lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-start transition-all duration-1000 ease-out motion-reduce:transition-none ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-none group">
              {/* Soft, low-opacity organic background shape behind photograph to ground it without a heavy card border */}
              <div
                aria-hidden="true"
                role="presentation"
                className="absolute -inset-3 sm:-inset-4 lg:-inset-5 bg-[#F2E6E3]/75 rounded-[24px] sm:rounded-[28px] -rotate-1 scale-[0.98] transition-transform duration-700 ease-out group-hover:scale-100 group-hover:rotate-0 motion-reduce:transform-none"
              />

              {/* Secondary subtle champagne glow line accent behind the corner */}
              <div
                aria-hidden="true"
                role="presentation"
                className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-28 h-28 rounded-full bg-[#C8A66A]/10 blur-xl pointer-events-none"
              />

              {/* Portrait Image Container: Clean 16px radius matching design system, integrated naturally */}
              <div className="relative z-10 w-full aspect-[3/4] overflow-hidden rounded-[16px] bg-[#E8DDD8] shadow-[0_12px_36px_-16px_rgba(58,29,41,0.12)]">
                <img
                  src={imgSrc}
                  alt={photoAlt}
                  loading="lazy"
                  decoding="async"
                  onError={() => {
                    const fallbacks = [
                      '/hero-founder.jpg',
                      '/images/hero-founder.jpg',
                      '/assets/brand/IMG-20260924-WA0016.jpg',
                      '/IMG-20260924-WA0016.jpg',
                    ];
                    const next = fallbacks.find((src) => src !== imgSrc);
                    if (next) {
                      setImgSrc(next);
                    }
                  }}
                  className="w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-[1.018] group-hover:brightness-[1.015] motion-reduce:transform-none motion-reduce:filter-none"
                />
              </div>
            </div>
          </div>

          {/* =========================================================================
              COLUMN 2: FOUNDER INTRODUCTION & STORY
              Mobile: Stacked after photograph.
              Desktop: Balanced visual weight, generous whitespace.
          ========================================================================== */}
          <div
            className={`lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left transition-all duration-1000 delay-150 ease-out motion-reduce:transition-none ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Eyebrow with restrained champagne accent line */}
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <span
                className="text-[11px] sm:text-[12px] font-semibold tracking-[0.18em] uppercase text-[#542A3A]/85 font-sans"
                style={{ letterSpacing: '0.18em' }}
              >
                MEET THE FOUNDER
              </span>
              <div className="w-8 h-[1px] bg-[#C8A66A]" aria-hidden="true" />
            </div>

            {/* Heading: Instrument Serif in Deep Plum */}
            <h2
              id="founder-heading"
              className="text-[36px] sm:text-[46px] lg:text-[54px] leading-[1.1] font-serif font-normal text-[#3A1D29] tracking-tight mb-6 sm:mb-7 text-balance"
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                lineHeight: 1.1,
              }}
            >
              A Heart for Women. A Calling to Serve.
            </h2>

            {/* Introductory Lead Line — Prominent editorial tone */}
            <p className="text-[18px] sm:text-[20px] lg:text-[21px] leading-[1.6] font-normal text-[#332E2F] mb-5 font-sans">
              Bolanle Titilayo Adesope is the woman behind HECWODEM — a ministry
              born from a simple but persistent conviction: that women deserve a
              safe, faith-filled place to grow.
            </p>

            {/* 
              DUMMY COPY — TO BE REPLACED WITH BOLANLE'S ACTUAL WORDING
              Founder story (short, 2–3 sentences max — deliberately concise placeholder):
            */}
            <p className="text-[15px] sm:text-[16px] leading-[1.75] font-normal text-[#5A4D51] mb-8 sm:mb-10 max-w-2xl font-sans">
              Her journey into ministry came from a calling she couldn't ignore:
              a heart for women navigating faith, life, relationships, and every
              season in between. Through teaching, writing, and counselling, she has
              walked alongside women seeking clarity, healing, and purpose — and
              HECWODEM exists to carry that work further.
            </p>

            {/* Signature Block & CTA Row */}
            <div className="w-full pt-2 sm:pt-4 border-t border-[#3A1D29]/10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              {/* Signature Block: Personal, warm, editorial feel */}
              <div className="flex flex-col">
                <span
                  className="font-serif italic text-[30px] sm:text-[34px] leading-none text-[#3A1D29] tracking-tight"
                  style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                >
                  Bolanle
                </span>
                <span className="text-[11px] sm:text-[12px] font-medium tracking-[0.14em] uppercase text-[#827577] mt-1.5 font-sans">
                  Founder, HECWODEM
                </span>
              </div>

              {/* Refined CTA: "Read Her Story" with understated SVG arrow hover interaction */}
              <div className="flex items-center">
                <a
                  href="#founder-story"
                  onClick={handleCtaClick}
                  className="group inline-flex items-center gap-2.5 text-[15px] sm:text-[16px] font-medium text-[#542A3A] hover:text-[#C8A66A] transition-colors py-2 focus-visible:outline-2 focus-visible:outline-[#C8A66A] focus-visible:outline-offset-4 rounded-sm"
                  aria-label="Read Her Story — Bolanle Titilayo Adesope"
                >
                  <span className="relative">
                    Read Her Story
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

        </div>
      </div>
    </section>
  );
};
