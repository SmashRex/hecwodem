/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  counsellingLabel: string;
  onCounsellingClick?: () => void;
  onNavigate?: (href: string) => void;
  accentText?: string;
  accentBorder?: string;
  ctaBg?: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navItems,
  counsellingLabel,
  onCounsellingClick,
  onNavigate,
  accentText = '#7C84E8',
  accentBorder = '#5964D8',
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const isStoryPage =
    typeof window !== 'undefined' &&
    window.location.pathname === '/the-story-of-bt-adesope';

  // Focus management and Escape key dismissal
  useEffect(() => {
    if (!isOpen) return;

    // Prevent body scroll when menu drawer is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on mount
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    onClose();

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

    // On homepage, let anchor link jump smoothly
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
    onClose();
    if (isStoryPage) {
      e.preventDefault();
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      ref={menuRef}
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Dimmed backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Slide-in drawer with Royal Indigo styling and restrained width */}
      <div
        className="relative z-10 w-full max-w-[340px] xs:max-w-[360px] sm:max-w-[380px] h-full flex flex-col justify-between bg-[#25265C] border-l border-[#5964D8]/20 shadow-2xl text-[#FBF8F3] overflow-y-auto"
        style={{ backgroundColor: '#25265C' }}
      >
        {/* Top bar with wordmark & accessible close control */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#FBF8F3]/10 shrink-0">
          <a
            href={isStoryPage ? '/' : '#home'}
            onClick={handleWordmarkClick}
            className="font-serif text-2xl tracking-normal text-[#FBF8F3] hover:text-[#7C84E8] transition-colors focus-visible:outline-2 rounded-sm"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif", outlineColor: accentBorder }}
          >
            HECWODEM
          </a>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="p-2 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#FBF8F3] hover:text-[#7C84E8] hover:bg-white/5 rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ outlineColor: accentBorder }}
          >
            <X className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        {/* Navigation Links list */}
        <nav className="flex-1 px-5 py-6 overflow-y-auto" aria-label="Mobile Navigation Links">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isHomeActive = !isStoryPage && item.href === '#home';
              const linkHref = isStoryPage ? `/${item.href}` : item.href;

              return (
                <li key={item.label}>
                  <a
                    href={linkHref}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className={`block py-2.5 px-3 text-[17px] font-medium font-sans tracking-normal rounded-md transition-all focus-visible:outline-2 ${
                      isHomeActive
                        ? 'text-[#7C84E8] bg-white/5'
                        : 'text-[#FBF8F3]/90 hover:text-[#FBF8F3] hover:bg-white/5'
                    }`}
                    style={{
                      outlineColor: accentBorder,
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Primary CTA in mobile drawer */}
        <div className="p-6 border-t border-[#FBF8F3]/10 bg-[#1A1B44]/70 shrink-0">
          <button
            type="button"
            onClick={() => {
              onClose();
              onCounsellingClick?.();
            }}
            className="w-full py-3.5 px-6 min-h-[44px] rounded-[6px] text-white text-[14px] font-medium tracking-normal transition-all duration-300 border shadow-md active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              background: 'linear-gradient(135deg, #5964D8 0%, #444FC0 100%)',
              borderColor: '#7C84E8',
              outlineColor: accentBorder,
            }}
          >
            {counsellingLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
