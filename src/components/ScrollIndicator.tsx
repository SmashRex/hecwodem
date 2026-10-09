/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export interface ScrollIndicatorProps {
  label?: string;
  onClick?: () => void;
  accentBorder?: string;
  accentText?: string;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  label = 'Scroll',
  onClick,
  accentBorder = '#5964D8',
  accentText = '#7C84E8',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Scroll down"
      className="group inline-flex flex-col items-center gap-2 transition-colors focus-visible:outline-2 rounded-sm py-2 px-3 min-h-[44px]"
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
      {/* Subtle line capsule indicator with active variant border & dot */}
      <div
        className="w-5 h-8 rounded-full border flex items-start justify-center p-1.5 transition-all duration-300"
        style={{
          borderColor: accentBorder,
          boxShadow: `0 0 12px ${accentBorder}40`,
        }}
      >
        <div
          className="w-1.5 h-2.5 rounded-full animate-subtle-bounce transition-colors duration-300"
          style={{
            backgroundColor: accentText,
            boxShadow: `0 0 8px ${accentBorder}`,
          }}
        />
      </div>
    </button>
  );
};
