/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { MobileMenu, NavItem } from './MobileMenu.tsx';

export interface NavbarProps {
  onCounsellingClick?: () => void;
  onNavigate?: (href: string) => void;
  accentText?: string;
  accentBorder?: string;
  accentPrimary?: string;
  activeDotColor?: string;
  ctaBg?: string;
  ctaBorder?: string;
  ctaGlow?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT', href: '#about' },
  { label: 'OUR WORK', href: '#what-we-do' },
  { label: 'WRITINGS', href: '#writings' },
];

export const Navbar: React.FC<NavbarProps> = ({
  onCounsellingClick,
  onNavigate,
  accentText = '#C4A7FB',
  accentBorder = '#C4A7FB',
  activeDotColor = '#C4A7FB',
  ctaBg = '#C4A7FB',
  ctaBorder = '#C4A7FB',
  ctaGlow = 'rgba(196, 167, 251, 0.45)',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isStoryPage =
    typeof window !== 'undefined' &&
    window.location.pathname === '/the-story-of-bt-adesope';

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
      return;
    }

    if (isStoryPage) {
      e.preventDefault();
      const targetHash = href.startsWith('#') ? href : `#${href.replace(/^\//, '')}`;
      window.history.pushState({}, '', `/${targetHash}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'instant' });

      if (targetHash && targetHash !== '#home') {
        setTimeout(() => {
          const el = document.getElementById(targetHash.replace('#', ''));
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
      return;
    }

    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const el = document.getElementById(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleWordmarkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isStoryPage) {
      e.preventDefault();
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return (
    <header className="relative z-50 w-full transition-all duration-300">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-5 sm:py-6 flex items-center justify-between">
        {/* Left: HECWODEM Wordmark (Instrument Serif text-based matching Variation 11) */}
        <div className="flex-shrink-0">
          <a
            href={isStoryPage ? '/' : '#home'}
            onClick={handleWordmarkClick}
            className="text-2xl sm:text-3xl font-serif tracking-normal text-white transition-colors focus-visible:outline-2 rounded-sm"
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              outlineColor: accentBorder,
            }}
            aria-label="HECWODEM Home"
          >
            HECWODEM
          </a>
        </div>

        {/* Center Desktop Navigation Links (Monospace tracked uppercase matching Variation 11) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center space-x-7 lg:space-x-10"
        >
          {NAV_ITEMS.map((item) => {
            const isHome = !isStoryPage && item.href === '#home';
            const linkHref = isStoryPage ? `/${item.href}` : item.href;

            return (
              <a
                key={item.label}
                href={linkHref}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`
                  relative font-mono text-[11px] lg:text-[12px] tracking-[0.22em] transition-colors focus-visible:outline-2 rounded-sm whitespace-nowrap py-1
                  ${isHome ? 'text-white font-medium' : 'text-[#948DA7] hover:text-white'}
                `}
                style={{
                  outlineColor: accentBorder,
                }}
              >
                <span>{item.label}</span>
                {isHome && (
                  <span
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C4A7FB]"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Far Right: "Book Counselling" Lilac Solid Button (matching Variation 11) */}
        <div className="hidden md:flex items-center flex-shrink-0 pl-4">
          <button
            type="button"
            onClick={onCounsellingClick}
            className="px-5 py-2.5 min-h-[38px] rounded-[4px] text-[#120E22] bg-[#C4A7FB] hover:bg-[#DDD0FD] text-[12px] lg:text-[13px] font-semibold font-mono tracking-wider transition-all duration-200 shadow-[0_0_24px_rgba(196,167,251,0.35)] hover:shadow-[0_0_30px_rgba(196,167,251,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 whitespace-nowrap active:scale-[0.98]"
            style={{
              outlineColor: '#C4A7FB',
            }}
          >
            Book Counselling
          </button>
        </div>

        {/* Mobile & Tablet Right: Hamburger Icon Control */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            className="p-2 -mr-1 min-h-[44px] min-w-[44px] flex items-center justify-center text-white hover:text-[#C4A7FB] hover:bg-white/5 active:bg-white/10 rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ outlineColor: accentBorder }}
          >
            <Menu className="w-6 h-6" strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Accessible Mobile & Tablet Overlay Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={NAV_ITEMS}
        counsellingLabel="Book Counselling"
        onCounsellingClick={onCounsellingClick}
        onNavigate={onNavigate}
        accentText={accentText}
        accentBorder={accentBorder}
        ctaBg={ctaBg}
      />
    </header>
  );
};
