/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

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
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navItems,
  counsellingLabel,
  onCounsellingClick,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management and Escape key dismissal
  useEffect(() => {
    if (!isOpen) return;

    // Trap focus inside menu when opened
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      ref={menuRef}
      className="fixed inset-0 z-50 flex flex-col bg-[#3A1D29]/95 backdrop-blur-md text-[#FBF8F4] transition-all duration-300 ease-out"
    >
      {/* Top bar with wordmark & accessible close control */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-[#FBF8F4]/10">
        <span
          className="font-serif text-2xl tracking-normal text-[#FBF8F4]"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          HECWODEM
        </span>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className="p-2.5 -mr-2 text-[#FBF8F4] hover:text-[#C8A66A] rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-[#C8A66A] focus-visible:outline-offset-2"
        >
          {/* 1.5-2px line SVG close icon (no emojis, no clip-art) */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Navigation Links list */}
      <nav className="flex-1 overflow-y-auto px-6 py-8 flex flex-col justify-between">
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={onClose}
                className="block py-2 text-xl font-serif tracking-wide text-[#FBF8F4] hover:text-[#C8A66A] transition-colors focus-visible:outline-2 focus-visible:outline-[#C8A66A] rounded-sm"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Primary CTA in mobile overlay */}
        <div className="pt-8 border-t border-[#FBF8F4]/10 mt-6">
          <button
            type="button"
            onClick={() => {
              onClose();
              onCounsellingClick?.();
            }}
            className="w-full py-3.5 px-6 rounded-[6px] bg-[#542A3A] hover:bg-[#43202E] text-[#FBF8F4] text-sm font-medium tracking-wide transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-[#C8A66A] focus-visible:outline-offset-2"
          >
            {counsellingLabel}
          </button>
        </div>
      </nav>
    </div>
  );
};
