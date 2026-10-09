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
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Writings', href: '#writings' },
  { label: 'Teachings', href: '#teachings' },
  { label: 'Books', href: '#books' },
  { label: 'Resources', href: '#resources' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  onCounsellingClick,
  onNavigate,
  accentText = '#7C84E8',
  accentBorder = '#5964D8',
  activeDotColor = '#7C84E8',
  ctaBg = 'rgba(89, 100, 216, 0.20)',
  ctaBorder = '#5964D8',
  ctaGlow = 'rgba(89, 100, 216, 0.38)',
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-5 lg:py-6 flex items-center justify-between">
        {/* Left: HECWODEM Wordmark (Instrument Serif text-based) */}
        <div className="flex-shrink-0">
          <a
            href={isStoryPage ? '/' : '#home'}
            onClick={handleWordmarkClick}
            className="text-2xl sm:text-3xl font-serif tracking-tight text-[#FBF8F3] transition-colors focus-visible:outline-2 rounded-sm"
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              outlineColor: accentBorder,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = accentText;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#FBF8F3';
            }}
            aria-label="HECWODEM Home"
          >
            HECWODEM
          </a>
        </div>

        {/* Center/Right Desktop Navigation Links (shown only at lg+ to avoid tablet cramping) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center space-x-6 xl:space-x-8"
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
                  relative text-[14px] tracking-wide transition-colors focus-visible:outline-2 rounded-sm whitespace-nowrap py-1
                  ${isHome ? 'text-[#FBF8F3] font-medium' : 'text-[#FBF8F3]/80 font-normal hover:text-[#FBF8F3]'}
                `}
                style={{
                  outlineColor: accentBorder,
                }}
              >
                <span>{item.label}</span>
                {isHome && (
                  <span
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-colors duration-300"
                    style={{ backgroundColor: activeDotColor }}
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Far Right: "Book Counselling" Primary CTA Treatment (Desktop lg+) */}
        <div className="hidden lg:flex items-center flex-shrink-0 pl-4">
          <button
            type="button"
            onClick={onCounsellingClick}
            className="px-5 py-2.5 min-h-[40px] rounded-[6px] text-[#FBF8F3] text-[14px] font-medium tracking-normal transition-all duration-300 border shadow-sm hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 whitespace-nowrap active:scale-[0.98]"
            style={{
              backgroundColor: ctaBg || 'rgba(89, 100, 216, 0.20)',
              borderColor: ctaBorder || accentBorder,
              boxShadow: ctaGlow ? `0 0 16px ${ctaGlow}` : undefined,
              outlineColor: accentBorder,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = accentText;
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = ctaBorder || accentBorder;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Book Counselling
          </button>
        </div>

        {/* Mobile & Tablet Right: Hamburger Icon Control */}
        <div className="flex lg:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            className="p-2 -mr-1 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#FBF8F3] hover:text-[#7C84E8] hover:bg-white/5 active:bg-white/10 rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
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
