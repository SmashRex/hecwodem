/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChevronDown } from 'lucide-react';

export interface ScrollIndicatorProps {
  label?: string;
  onClick?: () => void;
  accentBorder?: string;
  accentText?: string;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  label = 'Scroll',
  onClick,
  accentBorder = '#C4A7FB',
  accentText = '#C4A7FB',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Scroll to Meet the Founder section"
      className="group inline-flex flex-col items-center gap-1.5 transition-colors focus-visible:outline-2 rounded-sm py-2 px-3 min-h-[44px]"
      style={{
        outlineColor: accentBorder,
      }}
    >
      <span
        className="text-[11px] uppercase tracking-[0.2em] font-medium font-sans transition-colors duration-300"
        style={{ color: accentText }}
      >
        {label}
      </span>
      {/* SVG Down-Chevron Indicator with subtle bounce and glow */}
      <div
        className="w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300 group-hover:translate-y-1"
        style={{
          color: accentText,
        }}
      >
        <ChevronDown
          className="w-4 h-4 animate-subtle-bounce"
          strokeWidth={2.2}
          aria-hidden="true"
        />
      </div>
    </button>
  );
};
