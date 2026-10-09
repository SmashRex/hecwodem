/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

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
  photoAlt = 'B.T. Adesope, founder of HECWODEM',
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
    e.preventDefault();
    if (onReadStoryClick) {
      onReadStoryClick();
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about-founder"
      aria-labelledby="founder-heading"
      className={`relative w-full bg-warm-ivory text-soft-ink py-14 sm:py-20 md:py-24 lg:py-36 overflow-hidden ${className}`}
    >
      {/* Soft atmospheric background glow behind the section: airy and serene breathing point */}
      <div
        aria-hidden="true"
        role="presentation"
        className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden"
      >
        {/* Soft, restrained feminine accent glow to integrate composition */}
        <div className="absolute -top-32 right-10 w-[500px] h-[500px] rounded-full bg-feminine-accent/15 blur-3xl" />
        <div className="absolute -bottom-20 left-10 w-[420px] h-[420px] rounded-full bg-champagne/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-7 sm:gap-9 md:gap-10 lg:gap-16 xl:gap-20 items-center">
          
          {/* =========================================================================
              COLUMN 1: FOUNDER PHOTOGRAPH
              Mobile (<768px): Centered, fluid width (260px-340px) with bottom gradient fade.
              Tablet (768px-1023px): 5-column left editorial portrait, balanced with text.
              Desktop (1024px+): Approved 5-column editorial composition with subtle backdrop.
          ========================================================================== */}
          <div
            className={`md:col-span-5 lg:col-span-5 xl:col-span-5 flex justify-center md:justify-start transition-all duration-1000 ease-editorial motion-reduce:transition-none ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative w-full max-w-[260px] min-[375px]:max-w-[290px] min-[430px]:max-w-[320px] sm:max-w-[340px] md:max-w-none group mx-auto md:mx-0">
              {/* Restrained backing shape: Hidden on phones to eliminate tilted-card look, restored on tablet/desktop */}
              <div
                aria-hidden="true"
                role="presentation"
                className="hidden md:block absolute -inset-3 sm:-inset-4 lg:-inset-5 bg-feminine-accent/20 rounded-organic -rotate-1 scale-[0.98] transition-transform duration-700 ease-editorial group-hover:scale-100 group-hover:rotate-0 motion-reduce:transform-none"
              />

              {/* Secondary subtle champagne glow line accent behind the corner */}
              <div
                aria-hidden="true"
                role="presentation"
                className="hidden sm:block absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-28 h-28 rounded-full bg-champagne/15 blur-xl pointer-events-none"
              />

              {/* Portrait Image Container: 16px radius matching design system with bottom gradient mask on mobile/tablet (<1024px), full opacity on desktop (>=1024px) */}
              <div
                className="relative z-10 w-full aspect-[3/4] overflow-hidden rounded-xl bg-soft-border/20 shadow-medium founder-portrait-mask"
              >
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
                  className="w-full h-full object-cover object-top transition-all duration-700 ease-editorial group-hover:scale-[1.018] group-hover:brightness-[1.015] motion-reduce:transform-none motion-reduce:filter-none"
                />
              </div>
            </div>
          </div>

          {/* =========================================================================
              COLUMN 2: FOUNDER INTRODUCTION & STORY
              Mobile (<768px): Stacked below portrait with refined typography and natural line lengths.
              Tablet (768px-1023px): 7-column right editorial story with comfortable reading measure.
              Desktop (1024px+): Approved 7-column editorial layout with generous whitespace.
          ========================================================================== */}
          <div
            className={`md:col-span-7 lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left transition-all duration-1000 delay-150 ease-editorial motion-reduce:transition-none ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Eyebrow with restrained Royal Indigo Accent hairline */}
            <div className="flex items-center gap-3 mb-3.5 sm:mb-4 lg:mb-5">
              <span
                className="text-[11px] sm:text-[12px] font-semibold tracking-[0.18em] uppercase text-royal-indigo font-sans"
              >
                MEET THE FOUNDER
              </span>
              <div className="w-8 h-[1px] bg-royal-indigo-accent" aria-hidden="true" />
            </div>

            {/* Exact Headline: Instrument Serif in Royal Indigo with fluid responsive scale */}
            <h2
              id="founder-heading"
              className="text-[28px] min-[375px]:text-[32px] sm:text-[38px] md:text-[42px] lg:text-[54px] leading-[1.12] sm:leading-[1.1] font-serif font-normal text-royal-indigo tracking-tight mb-5 sm:mb-6 lg:mb-7 text-balance"
            >
              A Life Shaped by Faith, Calling and a Burden for Women
            </h2>

            {/* Exact Introductory Copy: Paragraph 1 */}
            <p className="text-[16px] sm:text-[17px] lg:text-[19px] leading-[1.65] font-normal text-soft-ink mb-4 sm:mb-5 font-sans">
              B.T. Adesope's journey with Christ began at an early age, through a Baptist mission school and a revival service that first stirred her heart to respond to the call of the Gospel. Over the years, her faith journey continued through seasons of growth, rededication, searching and prayer.
            </p>

            {/* Exact Introductory Copy: Paragraph 2 ending with exact ellipsis */}
            <p className="text-[14.5px] sm:text-[15.5px] lg:text-[16px] leading-[1.75] font-normal text-warm-taupe mb-7 sm:mb-8 lg:mb-10 max-w-2xl font-sans">
              Along the way, a deep and growing burden for women began to take shape. Through years of seeking God's direction, teaching, writing, family experiences and ministry, that burden eventually became a clear calling, and in 2001, the Women Development Initiative was born with just six women gathered in her sitting room...
            </p>

            {/* Signature Block & CTA Row */}
            <div className="w-full pt-4 border-t border-soft-border flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-6">
              {/* Founder Attribution: Exact name and role */}
              <div className="flex flex-col">
                <span className="font-serif italic text-[26px] sm:text-[30px] lg:text-[34px] leading-none text-royal-indigo tracking-tight">
                  B.T. Adesope
                </span>
                <span className="text-[11px] sm:text-[12px] font-medium tracking-[0.14em] uppercase text-warm-taupe mt-1.5 font-sans">
                  Founder, HECWODEM
                </span>
              </div>

              {/* Exact CTA: "Read Her Story" leading to dedicated story page */}
              <div className="flex items-center">
                <a
                  href="/the-story-of-bt-adesope"
                  onClick={handleCtaClick}
                  className="group inline-flex items-center gap-2.5 min-h-[44px] text-[15px] sm:text-[16px] font-medium text-royal-indigo hover:text-royal-indigo-accent transition-colors py-2 focus-visible:outline-2 focus-visible:outline-royal-indigo-accent focus-visible:outline-offset-4 rounded-sm"
                  aria-label="Read Her Story: The Story of B.T. Adesope"
                >
                  <span className="relative">
                    Read Her Story
                    <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-royal-indigo-accent transition-all duration-300 group-hover:w-full" />
                  </span>
                  <ArrowRight
                    className="w-[18px] h-[18px] text-current transform group-hover:translate-x-1.5 transition-transform duration-200"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
