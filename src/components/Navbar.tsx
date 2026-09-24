/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MobileMenu, NavItem } from './MobileMenu.tsx';

interface NavbarProps {
  onCounsellingClick?: () => void;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Writings', href: '#writings' },
  { label: 'Teachings', href: '#teachings' },
  { label: 'Books', href: '#books' },
  { label: 'Resources', href: '#resources' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onCounsellingClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-50 w-full transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 sm:py-8 flex items-center justify-between">
        {/* Left: HECWODEM Wordmark (Instrument Serif text-based per §4) */}
        <div className="flex-shrink-0">
          <a
            href="#home"
            className="text-2xl sm:text-3xl font-serif tracking-tight text-[#FBF8F4] hover:text-[#F2E6E3] transition-colors focus-visible:outline-2 focus-visible:outline-[#C8A66A] rounded-sm"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            aria-label="HECWODEM Home"
          >
            HECWODEM
          </a>
        </div>

        {/* Center/Right Desktop Navigation Links (Transparent bar, sitting directly over photo) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center space-x-6 lg:space-x-8"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[14px] font-normal tracking-wide text-[#FBF8F4]/85 hover:text-[#FBF8F4] hover:underline underline-offset-8 decoration-[#C8A66A]/60 transition-colors focus-visible:outline-2 focus-visible:outline-[#C8A66A] rounded-sm whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Far Right: "Book Counselling" Primary CTA Treatment (Desktop) */}
        <div className="hidden md:flex items-center flex-shrink-0 pl-4">
          <button
            type="button"
            onClick={onCounsellingClick}
            className="px-5 py-2.5 rounded-[6px] bg-[#542A3A] hover:bg-[#3A1D29] text-[#FBF8F4] text-[14px] font-medium tracking-normal transition-all duration-200 border border-[#FBF8F4]/15 shadow-sm hover:shadow-md focus-visible:outline-2 focus-visible:outline-[#C8A66A] focus-visible:outline-offset-2 whitespace-nowrap active:scale-[0.98]"
          >
            Book Counselling
          </button>
        </div>

        {/* Mobile Right: Hamburger Icon Only */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            className="p-2 -mr-2 text-[#FBF8F4] hover:text-[#C8A66A] focus-visible:outline-2 focus-visible:outline-[#C8A66A] rounded-md transition-colors"
          >
            {/* Clean SVG line icon ~1.75px stroke (no emoji, no clip-art) */}
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="3.75" y1="6.75" x2="20.25" y2="6.75" />
              <line x1="3.75" y1="12" x2="20.25" y2="12" />
              <line x1="3.75" y1="17.25" x2="20.25" y2="17.25" />
            </svg>
          </button>
        </div>
      </div>

      {/* Accessible Mobile Overlay Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={NAV_ITEMS}
        counsellingLabel="Book Counselling"
        onCounsellingClick={onCounsellingClick}
      />
    </header>
  );
};
