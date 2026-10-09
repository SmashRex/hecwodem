/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export interface AboutHecwodemSectionProps {
  /** Optional callback when primary CTA is clicked */
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
      className={`relative w-full bg-warm-ivory text-soft-ink py-16 sm:py-24 lg:py-36 overflow-hidden border-t border-soft-border/60 ${className}`}
    >
      {/* 
        Restrained atmospheric glow:
        Subtle warm wash clearly secondary to the editorial typography without heavy card fills.
      */}
      <div
        aria-hidden="true"
        role="presentation"
        className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden"
      >
        <div className="absolute top-1/4 right-1/6 w-[480px] h-[480px] rounded-full bg-feminine-accent/10 blur-3xl" />
        <div className="absolute bottom-12 left-10 w-[380px] h-[380px] rounded-full bg-champagne/8 blur-3xl" />
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
          <div className="max-w-4xl mb-12 sm:mb-16 lg:mb-20">
            {/* Restrained eyebrow with champagne accent rule */}
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <span
                className="text-[11px] sm:text-[12px] font-semibold tracking-[0.18em] uppercase text-secondary-indigo font-sans"
                style={{ letterSpacing: '0.18em' }}
              >
                ABOUT HECWODEM
              </span>
              <div className="w-8 h-[1px] bg-champagne" aria-hidden="true" />
            </div>

            {/* Display Heading with deliberate editorial scale */}
            <h2
              id="about-hecwodem-heading"
              className="text-[36px] sm:text-[50px] lg:text-[62px] leading-[1.08] font-serif font-normal text-royal-indigo tracking-tight text-balance"
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                lineHeight: 1.08,
              }}
            >
              A Calling to Serve, Intercede for, and Empower Women
            </h2>
          </div>

          {/* =========================================================================
              EDITORIAL COMPOSITION: NARRATIVE COLUMN & VISION STATEMENT
              Desktop (lg): Two-column layout with generous gutter.
              Column 1 (7 cols): The three narrative paragraphs in a comfortable measure.
              Column 2 (5 cols): The prominent editorial vision statement and scripture.
              Mobile/Tablet: Natural sequential stack with generous breathing room.
          ========================================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-14 lg:gap-16 items-start mb-14 sm:mb-20">
            
            {/* -----------------------------------------------------------------
                NARRATIVE TEXT COLUMN (3 exact paragraphs)
            ------------------------------------------------------------------ */}
            <div className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-7">
              {/* Paragraph 1: Opening calling statement */}
              <p className="text-[18px] sm:text-[20px] lg:text-[21px] leading-[1.62] font-normal text-soft-ink font-sans">
                Our calling is to intercede for women across Africa, preach the Gospel of truth, and empower women to discover and fulfil their God-given purpose.
              </p>

              {/* Paragraph 2: Foundational salvation and transformation */}
              <p className="text-[16px] sm:text-[17px] lg:text-[18px] leading-[1.75] font-normal text-soft-ink/85 font-sans">
                We believe that genuine salvation and a growing relationship with Jesus Christ are the foundation for lasting transformation. Through the Word of God, prayer, teaching, love, and encouragement, we help women grow in faith, overcome life&apos;s challenges, and become purposeful in their families and communities.
              </p>

              {/* Paragraph 3: Spiritual transformation and practical empowerment */}
              <p className="text-[16px] sm:text-[17px] lg:text-[18px] leading-[1.75] font-normal text-soft-ink/85 font-sans">
                Our calling brings together spiritual transformation and practical empowerment. Through entrepreneurship, capacity building, knowledge, skills, and practical opportunities, we encourage women to develop their potential, pursue financial independence, and make meaningful contributions to society.
              </p>
            </div>

            {/* -----------------------------------------------------------------
                VISION STATEMENT BLOCK
                Visual and emotional anchor of Section 03, paired with restrained 1 John 5:12
            ------------------------------------------------------------------ */}
            <div className="lg:col-span-5">
              <div className="relative p-7 sm:p-9 lg:p-10 rounded-[14px] bg-white border border-soft-border/80 shadow-[0_4px_24px_-8px_rgba(37,38,92,0.06)]">
                {/* Subtle champagne accent line along the top border */}
                <div
                  className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-champagne/60 to-transparent"
                  aria-hidden="true"
                />

                {/* Vision label */}
                <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne" aria-hidden="true" />
                  <span
                    className="text-[11px] sm:text-[12px] font-semibold tracking-[0.18em] uppercase text-royal-indigo font-sans"
                    style={{ letterSpacing: '0.18em' }}
                  >
                    OUR VISION
                  </span>
                </div>

                {/* Vision statement: Prominent Instrument Serif quote */}
                <blockquote className="m-0 mb-7 sm:mb-8">
                  <p
                    className="font-serif italic text-[24px] sm:text-[28px] lg:text-[30px] leading-[1.24] text-royal-indigo tracking-tight"
                    style={{
                      fontFamily: "'Instrument Serif', Georgia, serif",
                      lineHeight: 1.24,
                    }}
                  >
                    &ldquo;To see women transformed by Christ, established in faith, empowered for purpose, and equipped to positively influence their families, communities, and society.&rdquo;
                  </p>
                </blockquote>

                {/* Restrained Scriptural Foundation: 1 John 5:12 */}
                <div className="pt-5 border-t border-soft-border/60">
                  <p className="font-serif italic text-[15px] sm:text-[16px] leading-[1.5] text-soft-ink/80 mb-1.5">
                    &ldquo;He that hath the Son hath life; and he that hath not the Son of God hath not life.&rdquo;
                  </p>
                  <cite className="block text-[11px] sm:text-[12px] font-semibold tracking-[0.14em] uppercase text-warm-taupe not-italic font-sans">
                    1 John 5:12
                  </cite>
                </div>
              </div>
            </div>

          </div>

          {/* =========================================================================
              PRIMARY CTA: EXPLORE OUR CALLING
              Directs visitors smoothly to Section 04 (#what-we-do)
          ========================================================================== */}
          <div className="pt-6 sm:pt-8 border-t border-soft-border/70 flex items-center justify-between">
            <a
              href="#what-we-do"
              onClick={handleCtaClick}
              className="group inline-flex items-center min-h-[44px] gap-3 text-[15px] sm:text-[16px] font-medium text-royal-indigo hover:text-royal-indigo-accent transition-colors py-2 focus-visible:outline-2 focus-visible:outline-champagne focus-visible:outline-offset-4 rounded-sm"
              aria-label="Explore Our Calling: Learn how HECWODEM lives out its calling"
            >
              <span className="relative">
                Explore Our Calling
                <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-champagne transition-all duration-300 group-hover:w-full" />
              </span>
              <ArrowRight
                className="w-4 h-4 text-champagne transform group-hover:translate-x-1.5 transition-transform duration-200"
                aria-hidden="true"
              />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
