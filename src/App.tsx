/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HeroSection } from './components/HeroSection.tsx';
import { MeetTheFounderSection } from './components/MeetTheFounderSection.tsx';
import { AboutHecwodemSection } from './components/AboutHecwodemSection.tsx';
import { WhatTheMinistryDoesSection } from './components/WhatTheMinistryDoesSection.tsx';
import { WritingsSection } from './components/WritingsSection.tsx';
import { FounderStoryPage } from './components/FounderStoryPage.tsx';

export default function App() {
  // Support dynamic brand logo override if user drops a replacement SVG/image in preview
  const [customLogoSrc, setCustomLogoSrc] = useState<string | undefined>(undefined);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Lightweight, reliable client-side page routing without large external dependencies
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentRoute(path);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const showToast = (message: string) => {
    setFeedbackMessage(message);
    setTimeout(() => {
      setFeedbackMessage(null);
    }, 3200);
  };

  // Drag and drop handler allowing immediate local logo swap testing without UI clutter
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type.startsWith('image/') || file.name.endsWith('.svg'))) {
      const url = URL.createObjectURL(file);
      setCustomLogoSrc(url);
      showToast('Loaded local brand logo asset');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const scrollToFounder = () => {
    const founderEl = document.getElementById('about-founder');
    if (founderEl) {
      founderEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMinistryWork = () => {
    const ministryEl = document.getElementById('what-we-do');
    if (ministryEl) {
      ministryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Render dedicated founder story page when navigating to /the-story-of-bt-adesope
  if (currentRoute === '/the-story-of-bt-adesope') {
    return (
      <FounderStoryPage
        onBackToHome={() => navigateTo('/')}
        onDiscoverHecwodem={() => {
          navigateTo('/');
          setTimeout(() => {
            const aboutEl = document.getElementById('about');
            if (aboutEl) {
              aboutEl.scrollIntoView({ behavior: 'smooth' });
            }
          }, 120);
        }}
        logoSrc={customLogoSrc || '/images/hecwodem-logo.svg'}
        photoSrc="/images/founder-story-portrait.jpg"
      />
    );
  }

  return (
    <main
      className="min-h-screen bg-[#25265C] text-[#FBF8F3]"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* 
        Section 01: "Welcome to HECWODEM"
        Refined opening visual experience in Royal Indigo.
      */}
      <HeroSection
        logoSrc={customLogoSrc || '/images/hecwodem-logo.svg'}
        watermarkOpacity={0.10}
        watermarkOpacityMobile={0}
        layoutVariant="centered"
        onExploreClick={() => showToast('Section 01: "Explore HECWODEM" clicked')}
        onMeetFounderClick={scrollToFounder}
        onScrollClick={scrollToFounder}
        onBookCounsellingClick={() => showToast('Section 01: "Book Counselling" clicked')}
      />

      {/* 
        Section 02: "Meet the Founder"
        Editorial introduction for B.T. Adesope.
      */}
      <MeetTheFounderSection
        photoSrc="/images/hero-founder.jpg"
        photoAlt="B.T. Adesope, founder of HECWODEM"
        onReadStoryClick={() => navigateTo('/the-story-of-bt-adesope')}
      />

      {/* 
        Section 03: "About HECWODEM"
        Mission, vision statement highlight, and the three pillars of the ministry.
      */}
      <AboutHecwodemSection
        onDiscoverWorkClick={scrollToMinistryWork}
      />

      {/* 
        Section 04: "What the Ministry Does"
        Asymmetric editorial overview of HECWODEM's six key areas.
      */}
      <WhatTheMinistryDoesSection
        onExploreAllClick={() => showToast('Section 04: "Explore what HECWODEM offers" clicked')}
        onAreaClick={(areaId) => showToast(`Section 04: Explore "${areaId}" clicked`)}
      />

      {/* 
        Section 05: "Writings"
        Curated editorial reflections and ministry journal.
      */}
      <WritingsSection
        onExploreAllClick={() => showToast('Section 05: "Explore All Writings" clicked')}
        onWritingClick={(writing) => showToast(`Section 05: Read "${writing.title}" clicked`)}
      />

      {/* Understated notification feedback for interactive controls */}
      {feedbackMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-[6px] bg-[#121332]/95 text-[#FBF8F3] text-[13px] border border-[#FBF8F3]/20 shadow-lg backdrop-blur-sm transition-opacity duration-300"
        >
          {feedbackMessage}
        </div>
      )}
    </main>
  );
}
