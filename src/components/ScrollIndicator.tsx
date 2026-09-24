/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ScrollIndicatorProps {
  label?: string;
  onClick?: () => void;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  label = 'Scroll',
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Scroll down"
      className="group inline-flex flex-col items-center gap-2 text-[#FBF8F4]/70 hover:text-[#FBF8F4] transition-colors focus-visible:outline-2 focus-visible:outline-[#C8A66A] rounded-sm py-1"
    >
      <span className="text-[11px] uppercase tracking-[0.18em] font-medium font-sans opacity-70 group-hover:opacity-100 transition-opacity">
        {label}
      </span>
      {/* Subtle line indicator with understated movement (disabled with prefers-reduced-motion) */}
      <div className="w-5 h-8 rounded-full border border-[#FBF8F4]/30 flex items-start justify-center p-1.5 transition-colors group-hover:border-[#C8A66A]">
        <div className="w-1 h-2 rounded-full bg-[#FBF8F4] opacity-80 animate-subtle-bounce" />
      </div>
    </button>
  );
};
