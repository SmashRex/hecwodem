/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';

export interface WritingAuthor {
  name: string;
  role?: string;
}

export interface Writing {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  category?: string;
  author?: WritingAuthor;
  date?: string; // omit rendering entirely if absent — never fabricate
  featuredImage?: string;
  featured?: boolean;
  published: boolean;
}

export interface WritingsSectionProps {
  /** Optional array of writings — defaults to carefully structured development placeholder items */
  writings?: Writing[];
  /** Optional callback when "Explore All Writings" CTA is clicked */
  onExploreAllClick?: () => void;
  /** Optional callback when a writing article is clicked */
  onWritingClick?: (writing: Writing) => void;
  /** Optional custom class names */
  className?: string;
}

/*
  PLACEHOLDER CONTENT FOR DEVELOPMENT — REPLACE WITH REAL PUBLISHED WRITINGS
  Demonstrates optional category, author, date, and image fields gracefully.
  No invented Scripture quotes, statistics, or attributed claims.
*/
export const DEFAULT_WRITINGS: Writing[] = [
  {
    id: 'writing-1',
    title: 'On Waiting Well',
    slug: 'on-waiting-well',
    excerpt:
      'Learning that seasons of quiet and anticipation are rarely wasted time, but often where the deepest roots are formed.',
    category: 'Reflection',
    author: {
      name: 'Bolanle',
      role: 'Founder, HECWODEM',
    },
    date: 'Autumn Reflection',
    featured: true,
    published: true,
  },
  {
    id: 'writing-2',
    title: 'Quiet Faith in Loud Seasons',
    slug: 'quiet-faith-in-loud-seasons',
    excerpt:
      'Finding daily stillness and grounded perspective when everyday demands and expectations compete for attention.',
    category: 'Faith & Life',
    published: true,
  },
  {
    id: 'writing-3',
    title: 'Anchored Through Change',
    slug: 'anchored-through-change',
    excerpt:
      'How shifting circumstances can become invitations to anchor our trust in something firmer than the moment.',
    category: 'Encouragement',
    author: {
      name: 'HECWODEM Team',
    },
    published: true,
  },
  {
    id: 'writing-4',
    title: 'The Discipline of Showing Up',
    slug: 'the-discipline-of-showing-up',
    excerpt:
      'Small, faithful steps taken day by day create a steady foundation that grand gestures cannot replicate.',
    category: 'Spiritual Growth',
    published: true,
  },
];

export const WritingsSection: React.FC<WritingsSectionProps> = ({
  writings = DEFAULT_WRITINGS,
  onExploreAllClick,
  onWritingClick,
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

  // Filter only published writings
  const publishedWritings = writings.filter((w) => w.published);

  // Identify featured writing (explicit featured flag or first item)
  const featuredWriting =
    publishedWritings.find((w) => w.featured) || publishedWritings[0];

  // Secondary writings excluding the featured one
  const secondaryWritings = publishedWritings.filter(
    (w) => w.id !== featuredWriting?.id
  );

  const handleCtaClick = (e: React.MouseEvent) => {
    if (onExploreAllClick) {
      e.preventDefault();
      onExploreAllClick();
    }
  };

  const handleArticleClick = (e: React.MouseEvent, item: Writing) => {
    if (onWritingClick) {
      e.preventDefault();
      onWritingClick(item);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="writings"
      aria-labelledby="writings-heading"
      className={`relative w-full bg-[#FAF6F0] text-[#332E2F] py-24 sm:py-32 lg:py-40 overflow-hidden border-t border-[#3A1D29]/5 ${className}`}
    >
      {/* Soft atmospheric background wash for a contemplative reading sanctuary */}
      <div
        aria-hidden="true"
        role="presentation"
        className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden"
      >
        <div className="absolute top-10 right-1/4 w-[500px] h-[500px] rounded-full bg-[#F2E6E3]/40 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-[380px] h-[380px] rounded-full bg-[#C8A66A]/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div
          className={`transition-all duration-1000 ease-out motion-reduce:transition-none ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* =========================================================================
              SECTION HEADER: EYEBROW + HEADING + SUPPORTING PROSE
          ========================================================================== */}
          <div className="max-w-3xl mb-14 sm:mb-20">
            {/* Eyebrow with restrained champagne accent line */}
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <span
                className="text-[11px] sm:text-[12px] font-semibold tracking-[0.18em] uppercase text-[#542A3A]/85 font-sans"
                style={{ letterSpacing: '0.18em' }}
              >
                WRITINGS
              </span>
              <div className="w-8 h-[1px] bg-[#C8A66A]" aria-hidden="true" />
            </div>

            {/* Main Section Heading: Instrument Serif in Deep Plum */}
            <h2
              id="writings-heading"
              className="text-[38px] sm:text-[52px] lg:text-[64px] leading-[1.06] font-serif font-normal text-[#3A1D29] tracking-tight mb-5 sm:mb-6 text-balance"
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                lineHeight: 1.06,
              }}
            >
              Words for the Journey.
            </h2>

            {/* 
              DUMMY COPY — TO BE REPLACED WITH OFFICIAL WORDING
              Supporting copy (short, 1–2 sentences):
            */}
            <p className="text-[17px] sm:text-[19px] lg:text-[20px] leading-[1.65] font-normal text-[#5A4D51] font-sans max-w-2xl">
              Reflections, encouragement, and written thoughts from HECWODEM —
              words to sit with as you walk through your own season.
            </p>
          </div>

          {/* =========================================================================
              EDITORIAL WRITINGS COMPOSITION
              - Graceful empty state if zero published items
              - Singular featured composition if only 1 item
              - Asymmetric featured + journal entries if multiple items
          ========================================================================== */}
          {publishedWritings.length === 0 ? (
            /* EMPTY / UPCOMING STATE */
            <div className="py-20 sm:py-28 text-center max-w-lg mx-auto border-y border-[#3A1D29]/10">
              <div className="w-10 h-[1px] bg-[#C8A66A] mx-auto mb-6" aria-hidden="true" />
              <p
                className="font-serif italic text-[26px] sm:text-[32px] text-[#3A1D29] mb-3 leading-snug"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                New reflections are coming soon
              </p>
              <p className="text-[15px] sm:text-[16px] text-[#5A4D51] font-sans leading-relaxed">
                Our written reflections, devotionals, and journal entries are currently being prepared. Check back shortly for new publications.
              </p>
            </div>
          ) : (
            <div className="space-y-16 sm:space-y-20">
              
              {/* FEATURED WRITING (Asymmetric, prominent visual weight) */}
              {featuredWriting && (
                <article
                  aria-labelledby={`writing-title-${featuredWriting.id}`}
                  className="group relative p-8 sm:p-12 lg:p-14 rounded-[16px] bg-[#FBF8F4] border border-[#3A1D29]/10 hover:border-[#3A1D29]/25 transition-all duration-300"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                    
                    {/* Left Column: Metadata, Title, Excerpt, Author */}
                    <div className={featuredWriting.featuredImage ? 'lg:col-span-7' : 'lg:col-span-12'}>
                      
                      {/* Category & Date Metadata: Clean unboxed text with subtle separator */}
                      {(featuredWriting.category || featuredWriting.date) && (
                        <div className="flex items-center gap-2 mb-4 sm:mb-5">
                          {featuredWriting.category && (
                            <span className="text-[11px] sm:text-[12px] font-semibold tracking-[0.16em] uppercase text-[#C8A66A] font-sans">
                              {featuredWriting.category}
                            </span>
                          )}
                          {featuredWriting.category && featuredWriting.date && (
                            <span className="text-[#827577] text-[12px]" aria-hidden="true">
                              ·
                            </span>
                          )}
                          {featuredWriting.date && (
                            <span className="text-[12px] sm:text-[13px] text-[#827577] font-sans">
                              {featuredWriting.date}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Featured Title */}
                      <h3
                        id={`writing-title-${featuredWriting.id}`}
                        className="font-serif text-[32px] sm:text-[42px] lg:text-[48px] leading-[1.1] text-[#3A1D29] tracking-tight mb-5 text-balance group-hover:text-[#542A3A] transition-colors"
                        style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                      >
                        <a
                          href={`#writing-${featuredWriting.slug}`}
                          onClick={(e) => handleArticleClick(e, featuredWriting)}
                          className="focus-visible:outline-2 focus-visible:outline-[#C8A66A] rounded-sm"
                        >
                          {featuredWriting.title}
                        </a>
                      </h3>

                      {/* Excerpt */}
                      <p className="text-[16px] sm:text-[18px] leading-[1.7] text-[#5A4D51] font-sans mb-8 max-w-2xl">
                        {featuredWriting.excerpt}
                      </p>

                      {/* Author Byline & CTA Link */}
                      <div className="pt-5 border-t border-[#3A1D29]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                        {/* Author if present */}
                        {featuredWriting.author ? (
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] sm:text-[14px] font-serif italic text-[#3A1D29]">
                              By {featuredWriting.author.name}
                            </span>
                            {featuredWriting.author.role && (
                              <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.12em] text-[#827577] font-sans">
                                — {featuredWriting.author.role}
                              </span>
                            )}
                          </div>
                        ) : (
                          <div />
                        )}

                        {/* Read Full Writing Link */}
                        <a
                          href={`#writing-${featuredWriting.slug}`}
                          onClick={(e) => handleArticleClick(e, featuredWriting)}
                          className="inline-flex items-center gap-2.5 text-[15px] font-medium text-[#3A1D29] group-hover:text-[#542A3A] transition-colors py-1 focus-visible:outline-2 focus-visible:outline-[#C8A66A] rounded-sm"
                          aria-label={`Read the full writing: ${featuredWriting.title}`}
                        >
                          <span className="relative">
                            Read the full writing
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

                    {/* Right Column: Featured Image (if supplied) */}
                    {featuredWriting.featuredImage && (
                      <div className="lg:col-span-5 order-first lg:order-last">
                        <div className="w-full aspect-[4/3] rounded-[12px] overflow-hidden bg-[#E8DDD8] shadow-[0_8px_30px_-12px_rgba(58,29,41,0.12)]">
                          <img
                            src={featuredWriting.featuredImage}
                            alt={featuredWriting.title}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transform-none"
                          />
                        </div>
                      </div>
                    )}

                  </div>
                </article>
              )}

              {/* LATEST WRITINGS / FROM THE JOURNAL (Lighter visual weight) */}
              {secondaryWritings.length > 0 && (
                <div>
                  {/* Sub-header for secondary entries */}
                  <div className="flex items-center justify-between pb-4 mb-8 sm:mb-10 border-b border-[#3A1D29]/10">
                    <span
                      className="text-[12px] sm:text-[13px] font-semibold tracking-[0.16em] uppercase text-[#542A3A]/80 font-sans"
                      style={{ letterSpacing: '0.16em' }}
                    >
                      From the Journal
                    </span>
                    <span className="text-[12px] text-[#827577] font-sans">
                      Recent reflections &amp; notes
                    </span>
                  </div>

                  {/* Clean editorial column grid without heavy cards or drop shadows */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
                    {secondaryWritings.map((item) => (
                      <article
                        key={item.id}
                        aria-labelledby={`writing-title-${item.id}`}
                        className="group flex flex-col justify-between pt-2 pb-6 border-b border-[#3A1D29]/10 transition-colors"
                      >
                        <div>
                          {/* Category & Date Metadata */}
                          {(item.category || item.date) && (
                            <div className="flex items-center gap-2 mb-3">
                              {item.category && (
                                <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#C8A66A] font-sans">
                                  {item.category}
                                </span>
                              )}
                              {item.category && item.date && (
                                <span className="text-[#827577] text-[11px]" aria-hidden="true">
                                  ·
                                </span>
                              )}
                              {item.date && (
                                <span className="text-[12px] text-[#827577] font-sans">
                                  {item.date}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Title */}
                          <h3
                            id={`writing-title-${item.id}`}
                            className="font-serif text-[24px] sm:text-[28px] leading-[1.18] text-[#3A1D29] tracking-tight mb-3 group-hover:text-[#542A3A] transition-colors"
                            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                          >
                            <a
                              href={`#writing-${item.slug}`}
                              onClick={(e) => handleArticleClick(e, item)}
                              className="focus-visible:outline-2 focus-visible:outline-[#C8A66A] rounded-sm"
                            >
                              {item.title}
                            </a>
                          </h3>

                          {/* Excerpt */}
                          <p className="text-[15px] leading-[1.7] text-[#5A4D51] font-sans mb-6">
                            {item.excerpt}
                          </p>
                        </div>

                        {/* Footer: Author (if present) & Read Arrow */}
                        <div className="pt-4 border-t border-[#3A1D29]/5 flex items-center justify-between">
                          {item.author ? (
                            <span className="text-[12px] font-serif italic text-[#827577]">
                              {item.author.name}
                            </span>
                          ) : (
                            <span />
                          )}

                          <a
                            href={`#writing-${item.slug}`}
                            onClick={(e) => handleArticleClick(e, item)}
                            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#3A1D29] group-hover:text-[#C8A66A] transition-colors py-1 focus-visible:outline-2 focus-visible:outline-[#C8A66A] rounded-sm"
                            aria-label={`Read: ${item.title}`}
                          >
                            <span>Read</span>
                            <svg
                              className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-200 text-[#C8A66A]"
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
                      </article>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* =========================================================================
              CLOSING SECTION CTA
              "Explore All Writings →"
              Understated text-link invitation with champagne underline and SVG arrow.
          ========================================================================== */}
          <div className="pt-10 sm:pt-14 mt-16 sm:mt-20 border-t border-[#3A1D29]/10 flex items-center justify-between">
            <a
              href="#all-writings"
              onClick={handleCtaClick}
              className="group inline-flex items-center gap-3 text-[16px] sm:text-[17px] font-medium text-[#3A1D29] hover:text-[#542A3A] transition-colors py-2 focus-visible:outline-2 focus-visible:outline-[#C8A66A] focus-visible:outline-offset-4 rounded-sm"
              aria-label="Explore All Writings"
            >
              <span className="relative">
                Explore All Writings
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
