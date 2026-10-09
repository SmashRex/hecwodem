/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { Navbar } from './Navbar.tsx';

export interface FounderStoryPageProps {
  /** Callback to navigate back to the homepage */
  onBackToHome: () => void;
  /** Callback to navigate to HECWODEM ministry overview */
  onDiscoverHecwodem?: () => void;
  /** Brand logo source */
  logoSrc?: string;
  /** Founder portrait photo source */
  photoSrc?: string;
}

const CHAPTERS = [
  { id: 'chapter-01', number: '01', title: 'The Beginning of Her Journey' },
  { id: 'chapter-02', number: '02', title: 'Returning to Christ' },
  { id: 'chapter-03', number: '03', title: 'A Growing Burden for Women' },
  { id: 'chapter-04', number: '04', title: 'Searching for Purpose' },
  { id: 'chapter-05', number: '05', title: 'When the Calling Became Clear' },
  { id: 'chapter-06', number: '06', title: 'The Birth of the Ministry' },
  { id: 'chapter-07', number: '07', title: 'Lessons from Marriage' },
  { id: 'chapter-08', number: '08', title: 'Lessons from Family' },
  { id: 'chapter-09', number: '09', title: 'What Ministry Has Taught Me' },
  { id: 'chapter-10', number: '10', title: 'A Calling to African Women' },
  { id: 'chapter-11', number: '11', title: 'From Her Journey to HECWODEM' },
];

export const FounderStoryPage: React.FC<FounderStoryPageProps> = ({
  onBackToHome,
  onDiscoverHecwodem,
  logoSrc = '/images/hecwodem-logo.svg',
  photoSrc = '/images/founder-story-portrait.jpg',
}) => {
  const [activeChapterId, setActiveChapterId] = useState<string>('chapter-01');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState(photoSrc);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // IntersectionObserver to highlight current active chapter in the sidebar
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by proximity to top
          visibleEntries.sort(
            (a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top)
          );
          setActiveChapterId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-80px 0px -55% 0px',
        threshold: [0, 0.2, 0.5],
      }
    );

    CHAPTERS.forEach((ch) => {
      const el = document.getElementById(ch.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToChapter = (chapterId: string) => {
    const el = document.getElementById(chapterId);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setActiveChapterId(chapterId);
    setIsMobileNavOpen(false);
  };

  const handleDiscoverClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onDiscoverHecwodem) {
      onDiscoverHecwodem();
    } else {
      onBackToHome();
    }
  };

  const currentActiveChapter = CHAPTERS.find((ch) => ch.id === activeChapterId) || CHAPTERS[0];

  return (
    <div
      className="min-h-screen bg-warm-ivory text-soft-ink selection:bg-royal-indigo-accent selection:text-white"
      aria-label="The Story of B.T. Adesope"
    >
      {/* =========================================================================
          GLOBAL NAVIGATION: Official HECWODEM Header
      ========================================================================== */}
      <div className="bg-royal-indigo border-b border-royal-indigo-accent/20 sticky top-0 z-50">
        <Navbar
          onCounsellingClick={onBackToHome}
          accentText="#7C84E8"
          accentBorder="#5964D8"
          accentPrimary="#5964D8"
          activeDotColor="#7C84E8"
          ctaBg="rgba(89, 100, 216, 0.20)"
          ctaBorder="#5964D8"
        />
      </div>

      {/* =========================================================================
          PAGE HERO & INTRODUCTION
      ========================================================================== */}
      <section className="relative w-full border-b border-soft-border/60 bg-warm-ivory pt-8 sm:pt-12 pb-14 sm:pb-20 overflow-hidden">
        {/* Soft atmospheric background glow */}
        <div
          aria-hidden="true"
          role="presentation"
          className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden"
        >
          <div className="absolute top-0 right-1/4 w-[480px] h-[480px] rounded-full bg-feminine-accent/10 blur-3xl" />
          <div className="absolute bottom-0 left-10 w-[380px] h-[380px] rounded-full bg-champagne/10 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Back Navigation: Quiet editorial link */}
          <div className="mb-8 sm:mb-10">
            <button
              type="button"
              onClick={onBackToHome}
              className="group inline-flex items-center gap-2 min-h-[44px] text-[14px] sm:text-[15px] font-medium text-royal-indigo hover:text-royal-indigo-accent transition-colors focus-visible:outline-2 focus-visible:outline-royal-indigo-accent focus-visible:outline-offset-4 rounded-sm"
              aria-label="Back to HECWODEM homepage"
            >
              <ArrowLeft
                className="w-4 h-4 text-current transform group-hover:-translate-x-1 transition-transform duration-200"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <span>Back to HECWODEM</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-16 items-start">
            {/* Hero Text Column */}
            <div className="lg:col-span-8 flex flex-col items-start">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <span className="text-[11px] sm:text-[12px] font-semibold tracking-[0.18em] uppercase text-royal-indigo font-sans">
                  HER STORY
                </span>
                <div className="w-8 h-[1px] bg-royal-indigo-accent" aria-hidden="true" />
              </div>

              {/* Main Heading */}
              <h1 className="text-[40px] sm:text-[54px] lg:text-[64px] leading-[1.06] font-serif font-normal text-royal-indigo tracking-tight mb-5 sm:mb-6 text-balance">
                The Story of B.T. Adesope
              </h1>

              {/* Supporting Text */}
              <p className="text-[19px] sm:text-[22px] leading-[1.5] font-normal text-soft-ink mb-6 max-w-2xl font-sans">
                A journey of faith, calling, family, and service to women.
              </p>

              {/* Small Editorial Attribution */}
              <div className="flex items-center gap-2 pt-2 border-t border-soft-border/80">
                <span className="font-serif italic text-[22px] sm:text-[24px] text-royal-indigo">
                  B.T. Adesope
                </span>
                <span className="text-[12px] text-warm-taupe uppercase tracking-[0.12em] font-sans">
                  · Founder, HECWODEM
                </span>
              </div>
            </div>

            {/* Founder Dignified Portrait Card */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[320px] sm:max-w-[360px] lg:max-w-none group">
                {/* Soft backdrop organic shape - adjusted on mobile/tablet to avoid hard edge behind bottom fade */}
                <div
                  aria-hidden="true"
                  role="presentation"
                  className="absolute -top-3 -left-3 -right-3 bottom-12 sm:bottom-16 lg:-bottom-4 bg-feminine-accent/20 rounded-t-organic rounded-b-xl lg:rounded-organic -rotate-1 scale-[0.98] transition-transform duration-700 ease-editorial group-hover:scale-100 group-hover:rotate-0"
                />
                <div
                  aria-hidden="true"
                  role="presentation"
                  className="hidden lg:block absolute -bottom-2 -right-2 w-24 h-24 rounded-full bg-champagne/15 blur-xl pointer-events-none"
                />

                {/* Portrait Container: aspect-[3/4] with dedicated .story-portrait-mask on mobile/tablet, full opacity on desktop */}
                <div className="relative z-10 w-full aspect-[3/4] overflow-hidden rounded-xl bg-soft-border/30 shadow-medium story-portrait-mask">
                  <img
                    src={imgSrc}
                    alt="B.T. Adesope, founder of HECWODEM"
                    loading="eager"
                    onError={() => {
                      const fallbacks = [
                        '/images/founder-story-portrait.jpg',
                        '/images/hero-founder.jpg',
                        '/hero-founder.jpg',
                        '/assets/brand/IMG-20260924-WA0016.jpg',
                        '/IMG-20260924-WA0016.jpg',
                      ];
                      const next = fallbacks.find((s) => s !== imgSrc);
                      if (next) setImgSrc(next);
                    }}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-editorial group-hover:scale-[1.018]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN STORY SECTION (2-Column Editorial Reading Layout)
      ========================================================================== */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 sm:py-14 lg:py-16">
        {/* MOBILE STORY NAVIGATION (Expandable / Collapsible Accordion) */}
        <div className="lg:hidden mb-8 sm:mb-10 border border-soft-border rounded-lg bg-white/70 p-4 shadow-sm">
          <button
            type="button"
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            aria-expanded={isMobileNavOpen}
            aria-controls="mobile-chapter-list"
            className="w-full flex items-center justify-between gap-3 min-h-[44px] text-left focus-visible:outline-2 focus-visible:outline-royal-indigo-accent rounded-sm"
          >
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
              <BookOpen className="w-4 h-4 text-royal-indigo-accent shrink-0" aria-hidden="true" />
              <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.16em] text-royal-indigo shrink-0">
                IN THIS STORY
              </span>
              <span className="text-[12px] sm:text-[13px] text-warm-taupe font-medium truncate">
                ({currentActiveChapter.number} {currentActiveChapter.title})
              </span>
            </div>
            {isMobileNavOpen ? (
              <ChevronUp className="w-5 h-5 text-royal-indigo shrink-0 ml-2" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-5 h-5 text-royal-indigo shrink-0 ml-2" aria-hidden="true" />
            )}
          </button>

          {isMobileNavOpen && (
            <div id="mobile-chapter-list" className="mt-4 pt-3 border-t border-soft-border space-y-1">
              {CHAPTERS.map((ch) => {
                const isActive = activeChapterId === ch.id;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => scrollToChapter(ch.id)}
                    className={`w-full text-left py-2.5 px-3 min-h-[44px] flex items-center gap-3 text-[14px] rounded-sm transition-colors ${
                      isActive
                        ? 'font-medium text-royal-indigo bg-royal-indigo-accent/10'
                        : 'text-warm-taupe hover:text-royal-indigo'
                    }`}
                  >
                    <span className="text-[11px] font-semibold text-royal-indigo-accent font-sans shrink-0">
                      {ch.number}
                    </span>
                    <span className="truncate">{ch.title}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 2-COLUMN GRID (Sticky Sidebar + Reading Column) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* DESKTOP STICKY LEFT RAIL: "IN THIS STORY" */}
          <aside
            aria-label="Story Chapters Navigation"
            className="hidden lg:block lg:col-span-4 sticky top-28 self-start max-h-[calc(100vh-140px)] overflow-y-auto pr-4"
          >
            <div className="pb-4 mb-4 border-b border-soft-border">
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-royal-indigo font-sans">
                IN THIS STORY
              </span>
            </div>

            <nav aria-label="Chapter Table of Contents" className="space-y-1">
              {CHAPTERS.map((ch) => {
                const isActive = activeChapterId === ch.id;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => scrollToChapter(ch.id)}
                    className={`group w-full text-left py-2 px-2.5 rounded-sm flex items-start gap-3 transition-colors text-[13px] leading-snug focus-visible:outline-2 focus-visible:outline-royal-indigo-accent ${
                      isActive
                        ? 'font-medium text-royal-indigo bg-royal-indigo-accent/10 border-l-2 border-royal-indigo-accent pl-2'
                        : 'text-warm-taupe hover:text-royal-indigo'
                    }`}
                  >
                    <span
                      className={`text-[11px] font-semibold tracking-wider font-sans mt-0.5 ${
                        isActive ? 'text-royal-indigo' : 'text-royal-indigo-accent/80'
                      }`}
                    >
                      {ch.number}
                    </span>
                    <span className="flex-1">{ch.title}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* MAIN READING COLUMN: 672px to 768px reading target */}
          <main className="lg:col-span-8 max-w-2xl lg:max-w-3xl space-y-16 sm:space-y-20">
            
            {/* ===================================================================
                CHAPTER 01: The Beginning of Her Journey
            ==================================================================== */}
            <article id="chapter-01" className="scroll-mt-28">
              <header className="mb-6">
                <span className="text-[13px] font-semibold text-royal-indigo-accent tracking-[0.18em] uppercase font-sans">
                  01
                </span>
                <h2 className="text-[32px] sm:text-[40px] leading-[1.12] font-serif font-normal text-royal-indigo tracking-tight mt-1">
                  The Beginning of Her Journey
                </h2>
              </header>

              <div className="space-y-5 text-[16px] sm:text-[17px] leading-[1.8] text-soft-ink font-sans">
                <p>
                  I was born into a nominal Christian family and attended a Baptist mission school. During our time at the school, a revival service was held at the church for the pupils in the morning.
                </p>

                {/* 1968 Story Milestone Highlight */}
                <div className="p-5 sm:p-6 bg-white/70 border-l-3 border-royal-indigo-accent rounded-r-lg my-6">
                  <span className="text-[11px] font-semibold tracking-[0.18em] text-royal-indigo-accent uppercase block mb-1">
                    1968
                  </span>
                  <p className="text-soft-ink">
                    In 1968, a man of God called Revd. Adedokun from First Baptist Church, Idi-Ikan, preached a message titled, “O ye slothful, go to the ants.” The message touched me deeply, and I answered the altar call. I became more involved and active in the children's church.
                  </p>
                </div>
              </div>
            </article>

            {/* ===================================================================
                CHAPTER 02: Returning to Christ
            ==================================================================== */}
            <article id="chapter-02" className="scroll-mt-28 pt-8 border-t border-soft-border/80">
              <header className="mb-6">
                <span className="text-[13px] font-semibold text-royal-indigo-accent tracking-[0.18em] uppercase font-sans">
                  02
                </span>
                <h2 className="text-[32px] sm:text-[40px] leading-[1.12] font-serif font-normal text-royal-indigo tracking-tight mt-1">
                  Returning to Christ
                </h2>
              </header>

              <div className="space-y-5 text-[16px] sm:text-[17px] leading-[1.8] text-soft-ink font-sans">
                <div className="p-5 sm:p-6 bg-white/70 border-l-3 border-champagne rounded-r-lg">
                  <span className="text-[11px] font-semibold tracking-[0.18em] text-royal-indigo-accent uppercase block mb-1">
                    1976
                  </span>
                  <p>
                    Eight years later, I went for GA camp in 1976. There, I realised that I needed to rededicate my life to Jesus Christ, and I did.
                  </p>
                </div>

                <p>
                  Years later, God opened my eyes to see my backsliding. I answered the altar call, and since then, God has upheld me.
                </p>

                <p>
                  Before then, I had often experienced restlessness. But the day I gave my life to Jesus Christ, I experienced peace and rest of mind. Glory be to God.
                </p>
              </div>

              {/* SCRIPTURE / REFLECTION BLOCK (After Chapter 02) */}
              <div className="my-10 p-6 sm:p-8 bg-white/80 border border-soft-border rounded-xl">
                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-royal-indigo font-sans block mb-3">
                  THE FOUNDATION
                </span>
                <blockquote className="text-[22px] sm:text-[26px] leading-[1.35] font-serif text-royal-indigo italic mb-4">
                  “He that hath the Son hath life; and he that hath not the Son of God hath not life.”
                </blockquote>
                <div className="flex items-center justify-between text-[13px] text-warm-taupe pt-3 border-t border-soft-border font-sans">
                  <span className="font-semibold text-royal-indigo">1 John 5:12</span>
                  <span>B.T. Adesope</span>
                </div>
              </div>
            </article>

            {/* ===================================================================
                CHAPTER 03: A Growing Burden for Women
            ==================================================================== */}
            <article id="chapter-03" className="scroll-mt-28 pt-8 border-t border-soft-border/80">
              <header className="mb-6">
                <span className="text-[13px] font-semibold text-royal-indigo-accent tracking-[0.18em] uppercase font-sans">
                  03
                </span>
                <h2 className="text-[32px] sm:text-[40px] leading-[1.12] font-serif font-normal text-royal-indigo tracking-tight mt-1">
                  A Growing Burden for Women
                </h2>
              </header>

              <div className="space-y-5 text-[16px] sm:text-[17px] leading-[1.8] text-soft-ink font-sans">
                <p>
                  I have had an interest in women for as long as I can remember. I cannot fully explain it; all I know is that anything about women would inspire me.
                </p>

                <p>
                  I am a member of a Baptist Church where girls of about ten years often gather for meetings. That meeting was unknowingly fanning the flame of my ministerial assignment.
                </p>

                <p>
                  The writing of projects for our steps became the beginning of my writing ministry. It also launched me into teaching ministry because, in one of the steps for promotion, we had to join the Sunday School department at age sixteen.
                </p>
              </div>
            </article>

            {/* ===================================================================
                CHAPTER 04: Searching for Purpose
            ==================================================================== */}
            <article id="chapter-04" className="scroll-mt-28 pt-8 border-t border-soft-border/80">
              <header className="mb-6">
                <span className="text-[13px] font-semibold text-royal-indigo-accent tracking-[0.18em] uppercase font-sans">
                  04
                </span>
                <h2 className="text-[32px] sm:text-[40px] leading-[1.12] font-serif font-normal text-royal-indigo tracking-tight mt-1">
                  Searching for Purpose
                </h2>
              </header>

              <div className="space-y-5 text-[16px] sm:text-[17px] leading-[1.8] text-soft-ink font-sans">
                <p>
                  One message changed the way I began to think about my life's purpose.
                </p>

                {/* Editorial Pull Quote */}
                <div className="my-6 p-6 bg-white/70 border-l-4 border-royal-indigo rounded-r-lg">
                  <blockquote className="text-[22px] sm:text-[26px] font-serif text-royal-indigo italic leading-[1.3] mb-2">
                    “My bell of hope shall ring again.”
                  </blockquote>
                  <span className="text-[12px] font-medium tracking-[0.12em] uppercase text-warm-taupe font-sans">
                    Ebenezer Church, Okoro, Oke-tunu, Ibadan
                  </span>
                </div>

                <p>
                  That message made me think deeply about my life's purpose. I started praying and asking God for my purpose in life. God gave me John 21:15-17.
                </p>

                {/* Quiet Scripture Reference Treatment */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white border border-soft-border text-[13px] font-medium text-royal-indigo font-sans">
                  <span>Scripture reference:</span>
                  <span className="font-semibold text-royal-indigo-accent">John 21:15-17</span>
                </div>

                <p>
                  At the time, I was ignorant of the revelation of the Word of God. I started opening restaurants, but they did not yield anything, and I wasted a lot of money on them. At one point, I started selling raw food.
                </p>

                <p>
                  I went to many ministers of God to share my vision, but they were unable to unravel it. This search took about seven years until I resigned from my banking job and had enough time to pray.
                </p>
              </div>
            </article>

            {/* ===================================================================
                CHAPTER 05: When the Calling Became Clear
            ==================================================================== */}
            <article id="chapter-05" className="scroll-mt-28 pt-8 border-t border-soft-border/80">
              <header className="mb-6">
                <span className="text-[13px] font-semibold text-royal-indigo-accent tracking-[0.18em] uppercase font-sans">
                  05
                </span>
                <h2 className="text-[32px] sm:text-[40px] leading-[1.12] font-serif font-normal text-royal-indigo tracking-tight mt-1">
                  When the Calling Became Clear
                </h2>
              </header>

              <div className="space-y-5 text-[16px] sm:text-[17px] leading-[1.8] text-soft-ink font-sans">
                <p>
                  In 2001, Evangelist Reinhard Bonnke came to Ibadan, Nigeria. It was during that programme that I received clarity concerning my purpose.
                </p>

                {/* Editorial Date Emphasis: 20 NOVEMBER 2001 */}
                <div className="p-6 bg-white/80 border border-royal-indigo-accent/30 rounded-xl my-6">
                  <span className="text-[12px] font-semibold tracking-[0.2em] uppercase text-royal-indigo-accent block mb-2 font-sans">
                    20 NOVEMBER 2001
                  </span>
                  <p className="text-soft-ink">
                    Immediately after the programme finished, on Tuesday, 20 November 2001, I carried a serious burden for women. I discussed it with my late husband, who agreed, and I started the Women Development Initiative, which was the first name of this ministry.
                  </p>
                </div>
              </div>
            </article>

            {/* ===================================================================
                CHAPTER 06: The Birth of the Ministry
            ==================================================================== */}
            <article id="chapter-06" className="scroll-mt-28 pt-8 border-t border-soft-border/80">
              <header className="mb-6">
                <span className="text-[13px] font-semibold text-royal-indigo-accent tracking-[0.18em] uppercase font-sans">
                  06
                </span>
                <h2 className="text-[32px] sm:text-[40px] leading-[1.12] font-serif font-normal text-royal-indigo tracking-tight mt-1">
                  The Birth of the Ministry
                </h2>
              </header>

              <div className="space-y-5 text-[16px] sm:text-[17px] leading-[1.8] text-soft-ink font-sans">
                <p>
                  I started the ministry in our sitting room with six members.
                </p>

                {/* Visual Emphasis: 6 women at the beginning */}
                <div className="my-6 p-6 sm:p-8 bg-white/70 border border-soft-border rounded-xl text-center">
                  <span className="block text-[56px] sm:text-[72px] font-serif text-royal-indigo leading-none mb-2">
                    6
                  </span>
                  <span className="text-[13px] sm:text-[14px] uppercase tracking-[0.16em] text-warm-taupe font-sans font-medium">
                    women at the beginning
                  </span>
                </div>

                <p>
                  I was not aware that my mother had dedicated me even before my birth. She had waited for thirteen years before she gave birth to me.
                </p>

                <p>
                  One day, as we were preparing to hold a meeting, my mother was around. When she saw women gathered, it was then that she opened up about this.
                </p>

                <p>
                  Those six members grew to more than 250 members.
                </p>

                {/* Editorial Growth Moment: 6 -> 250+ */}
                <div className="my-6 p-6 bg-white/80 border border-royal-indigo-accent/30 rounded-xl flex items-center justify-center gap-4 text-center">
                  <span className="text-[32px] sm:text-[44px] font-serif text-royal-indigo tracking-tight">
                    6 → 250+
                  </span>
                  <span className="text-[13px] uppercase tracking-[0.14em] text-warm-taupe font-sans font-medium">
                    growth in community
                  </span>
                </div>
              </div>
            </article>

            {/* ===================================================================
                TRANSITION: The calling did not unfold in isolation
            ==================================================================== */}
            <div className="my-12 py-8 px-6 sm:px-8 bg-royal-indigo text-warm-ivory rounded-2xl text-center">
              <p className="text-[20px] sm:text-[24px] font-serif italic mb-3">
                The calling did not unfold in isolation.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-warm-ivory/85 max-w-xl mx-auto font-sans">
                It was shaped through faith, marriage, family, prayer, challenges, and years of learning to trust God.
              </p>
            </div>

            {/* ===================================================================
                CHAPTER 07: Lessons from Marriage
            ==================================================================== */}
            <article id="chapter-07" className="scroll-mt-28 pt-8 border-t border-soft-border/80">
              <header className="mb-6">
                <span className="text-[13px] font-semibold text-royal-indigo-accent tracking-[0.18em] uppercase font-sans">
                  07
                </span>
                <h2 className="text-[32px] sm:text-[40px] leading-[1.12] font-serif font-normal text-royal-indigo tracking-tight mt-1">
                  Lessons from Marriage
                </h2>
              </header>

              <div className="space-y-5 text-[16px] sm:text-[17px] leading-[1.8] text-soft-ink font-sans">
                <p>
                  I got married to an unbelieving husband because I was not well grounded in the Word of God. Yet the experience had a positive effect on my ministry.
                </p>

                <p>
                  It shaped my spiritual life through the challenges I faced. It strengthened my prayer life and my faith.
                </p>

                <p>
                  My husband clubbed and partied. This led me to intercede for him, and that experience helped build my intercession, not knowing at the time that God wanted me to intercede for African women.
                </p>

                <p>
                  He eventually gave his life to Christ a month before his death. This strengthened my faith even more.
                </p>
              </div>
            </article>

            {/* ===================================================================
                CHAPTER 08: Lessons from Family
            ==================================================================== */}
            <article id="chapter-08" className="scroll-mt-28 pt-8 border-t border-soft-border/80">
              <header className="mb-6">
                <span className="text-[13px] font-semibold text-royal-indigo-accent tracking-[0.18em] uppercase font-sans">
                  08
                </span>
                <h2 className="text-[32px] sm:text-[40px] leading-[1.12] font-serif font-normal text-royal-indigo tracking-tight mt-1">
                  Lessons from Family
                </h2>
              </header>

              <div className="space-y-5 text-[16px] sm:text-[17px] leading-[1.8] text-soft-ink font-sans">
                <p>
                  Bringing up children alone without a husband was challenging. Paying school fees, house rent, and even training adolescent children was difficult.
                </p>

                {/* Pull Quote: God makes a way where there is no way. */}
                <div className="my-6 p-6 bg-white/70 border-l-3 border-champagne rounded-r-lg">
                  <blockquote className="text-[20px] sm:text-[23px] font-serif text-royal-indigo italic leading-[1.35]">
                    God makes a way where there is no way.
                  </blockquote>
                </div>

                <p>
                  This taught me to trust God for all my needs. It was challenging, especially with the boys, but God took control. They all received good education and have good careers.
                </p>

                <p>
                  Raising them with the Word of God and prayer really helped me. I committed them into the hands of God.
                </p>

                <p>
                  The Holy Spirit would sometimes alert me when they wanted to misbehave. Warning them or disclosing their thoughts to them made them afraid and helped to stop them.
                </p>
              </div>
            </article>

            {/* ===================================================================
                CHAPTER 09: What Ministry Has Taught Me
            ==================================================================== */}
            <article id="chapter-09" className="scroll-mt-28 pt-8 border-t border-soft-border/80">
              <header className="mb-6">
                <span className="text-[13px] font-semibold text-royal-indigo-accent tracking-[0.18em] uppercase font-sans">
                  09
                </span>
                <h2 className="text-[32px] sm:text-[40px] leading-[1.12] font-serif font-normal text-royal-indigo tracking-tight mt-1">
                  What Ministry Has Taught Me
                </h2>
              </header>

              <div className="space-y-5 text-[16px] sm:text-[17px] leading-[1.8] text-soft-ink font-sans">
                <p>
                  Women's ministry is very demanding but interesting. I meet different types of women, including those who are stubborn and those who are obedient.
                </p>

                <p>
                  Some women want you to just pray for them and are not ready to grow spiritually.
                </p>

                <p>
                  Others have come to the ministry hopeless, but now they are full of hope and doing great.
                </p>

                <p>
                  Though it may be challenging, ministry has really helped my faith.
                </p>

                <p>
                  Through the journey of women's ministry, I discovered that genuine salvation can help women in every area of their lives.
                </p>

                <p>
                  Another thing that helps women is love.
                </p>

                {/* Scripture Reference Treatment */}
                <div className="flex flex-wrap items-center gap-3 my-4">
                  <div className="px-3.5 py-1.5 rounded-md bg-white border border-soft-border text-[13px] font-medium text-royal-indigo font-sans">
                    <span>Scripture reference:</span>
                    <span className="font-semibold text-royal-indigo-accent ml-1.5">1 Corinthians 13:4-7</span>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-md bg-white border border-soft-border text-[13px] font-medium text-royal-indigo font-sans">
                    <span>Scripture reference:</span>
                    <span className="font-semibold text-royal-indigo-accent ml-1.5">Luke 6:24-30</span>
                  </div>
                </div>

                <p>
                  I have seen women thrive both spiritually and in other areas of their lives through these.
                </p>
              </div>
            </article>

            {/* ===================================================================
                CHAPTER 10: A Calling to African Women
            ==================================================================== */}
            <article id="chapter-10" className="scroll-mt-28 pt-8 border-t border-soft-border/80">
              <header className="mb-6">
                <span className="text-[13px] font-semibold text-royal-indigo-accent tracking-[0.18em] uppercase font-sans">
                  10
                </span>
                <h2 className="text-[32px] sm:text-[40px] leading-[1.12] font-serif font-normal text-royal-indigo tracking-tight mt-1">
                  A Calling to African Women
                </h2>
              </header>

              <div className="space-y-5 text-[16px] sm:text-[17px] leading-[1.8] text-soft-ink font-sans">
                <p>
                  Through the experiences of my life, marriage, family and ministry, I came to understand more deeply the burden God had placed in my heart for women.
                </p>

                <p>
                  What began as a personal interest in women became a clear ministerial assignment: to intercede for women across Africa, preach the Gospel of truth, and empower women to discover and fulfil their God-given purpose.
                </p>

                <p>
                  I believe that genuine salvation and a growing relationship with Jesus Christ are foundations for lasting transformation.
                </p>

                <p>
                  I also believe that women need more than spiritual encouragement alone. They need knowledge, skills, capacity, practical opportunities, and the support to develop their potential.
                </p>

                <p>
                  This is why the work of HECWODEM brings together spiritual transformation and practical empowerment.
                </p>
              </div>
            </article>

            {/* ===================================================================
                CHAPTER 11: From Her Journey to HECWODEM
            ==================================================================== */}
            <article id="chapter-11" className="scroll-mt-28 pt-8 border-t border-soft-border/80">
              <header className="mb-6">
                <span className="text-[13px] font-semibold text-royal-indigo-accent tracking-[0.18em] uppercase font-sans">
                  11
                </span>
                <h2 className="text-[32px] sm:text-[40px] leading-[1.12] font-serif font-normal text-royal-indigo tracking-tight mt-1">
                  From Her Journey to HECWODEM
                </h2>
              </header>

              <div className="space-y-5 text-[16px] sm:text-[17px] leading-[1.8] text-soft-ink font-sans">
                <p>
                  The journey that began with a young girl responding to the Gospel eventually became a lifelong burden for women.
                </p>

                <p>
                  Through years of prayer, searching, family experiences, teaching, writing, intercession and ministry, that burden became a clear calling.
                </p>

                <p>
                  What began in a sitting room with six women grew into a ministry that has reached women from different backgrounds and circumstances.
                </p>

                <p>
                  Some women have come seeking spiritual growth. Others have come carrying challenges in their marriages, families, careers, businesses and personal lives.
                </p>

                <p>
                  I have witnessed women move from hopelessness to hope, from uncertainty to purpose, and from spiritual weakness to renewed faith.
                </p>

                <p>
                  These experiences have strengthened my conviction that every woman deserves to be loved, supported, encouraged and equipped to become all that God has created her to be.
                </p>
              </div>
            </article>

            {/* ===================================================================
                CLOSING STATEMENT (Visually strong editorial quote)
            ==================================================================== */}
            <div className="my-14 p-8 sm:p-10 bg-white/90 border border-soft-border rounded-2xl shadow-sm">
              <blockquote className="text-[24px] sm:text-[30px] lg:text-[32px] font-serif text-royal-indigo leading-[1.25] mb-4">
                A woman who is grounded in Christ and equipped with the right knowledge and opportunities can become a powerful influence in her generation.
              </blockquote>
              <div className="flex items-center gap-2 pt-3 border-t border-soft-border">
                <span className="font-serif italic text-[22px] text-royal-indigo">
                  B.T. Adesope
                </span>
              </div>
            </div>

            {/* ===================================================================
                FINAL HECWODEM BRIDGE
            ==================================================================== */}
            <section className="pt-10 border-t border-soft-border">
              <h2 className="text-[32px] sm:text-[38px] font-serif font-normal text-royal-indigo tracking-tight mb-5">
                From One Calling to a Ministry
              </h2>

              <div className="space-y-5 text-[16px] sm:text-[17px] leading-[1.8] text-soft-ink font-sans">
                <p>
                  The story of B.T. Adesope is also part of the story of HECWODEM, a ministry committed to helping women grow in faith, discover purpose, overcome life's challenges, and become purposeful in their families and communities.
                </p>

                <p>
                  What began as the Women Development Initiative has grown into a ministry built around salvation, prayer, love, the Word of God, purposeful empowerment, and a burden to see women transformed by Christ.
                </p>
              </div>

              {/* FINAL CTAs */}
              <div className="mt-10 pt-8 border-t border-soft-border flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {/* Primary CTA: Discover HECWODEM */}
                <a
                  href="/#about"
                  onClick={handleDiscoverClick}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 min-h-[44px] rounded-[6px] bg-royal-indigo text-warm-ivory text-[15px] font-medium tracking-normal transition-all hover:bg-secondary-indigo focus-visible:outline-2 focus-visible:outline-royal-indigo-accent focus-visible:outline-offset-2 shadow-sm"
                  aria-label="Discover HECWODEM ministry overview"
                >
                  <span>Discover HECWODEM</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                </a>

                {/* Secondary CTA: Back to Homepage */}
                <button
                  type="button"
                  onClick={onBackToHome}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 min-h-[44px] rounded-[6px] border border-soft-border text-royal-indigo hover:text-royal-indigo-accent hover:border-royal-indigo-accent transition-colors text-[15px] font-medium focus-visible:outline-2 focus-visible:outline-royal-indigo-accent focus-visible:outline-offset-2"
                  aria-label="Return to HECWODEM homepage"
                >
                  <ArrowLeft className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                  <span>Back to Homepage</span>
                </button>
              </div>
            </section>

          </main>

        </div>
      </div>

      {/* =========================================================================
          PAGE FOOTER (Flows naturally into site footer style)
      ========================================================================== */}
      <footer className="w-full border-t border-soft-border py-12 bg-white/40">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src={logoSrc}
              alt="HECWODEM Logo"
              className="h-8 w-auto object-contain"
            />
            <span className="text-[13px] text-warm-taupe font-sans">
              © {new Date().getFullYear()} HECWODEM. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-6 text-[14px]">
            <button
              type="button"
              onClick={onBackToHome}
              className="text-royal-indigo hover:text-royal-indigo-accent transition-colors font-medium min-h-[44px] flex items-center"
            >
              Back to Homepage
            </button>
            <a
              href="/#about"
              onClick={handleDiscoverClick}
              className="text-warm-taupe hover:text-royal-indigo transition-colors min-h-[44px] flex items-center"
            >
              About HECWODEM
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
