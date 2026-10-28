'use client';

import React from 'react';

interface NotebookBackgroundProps {
  lineColor?: string;
  marginColor?: string;
  lineGap?: number;
}

export const NotebookBackground: React.FC<NotebookBackgroundProps> = ({
  lineColor = '#00aeef',
  marginColor = '#ff31bc',
  lineGap = 29, // Consistent 29px line spacing matching ruled paper
}) => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 select-none overflow-hidden"
    >
      <svg
        width="100%"
        height="100%"
        className="block w-full h-full"
      >
        <defs>
          {/* Continuous cyan horizontal ruled lines with 29px vertical spacing */}
          <pattern
            id="notebook-ruled-grid"
            width="100%"
            height={lineGap}
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1={lineGap}
              x2="100%"
              y2={lineGap}
              stroke={lineColor}
              strokeWidth="0.65"
              strokeOpacity="0.30"
            />
          </pattern>
        </defs>

        {/* 1. Page-level horizontal ruled lines covering entire viewport */}
        <rect width="100%" height="100%" fill="url(#notebook-ruled-grid)" />

        {/* 2. Responsive single vertical pink margin line: 32px on mobile, 55px on desktop */}
        {/* Mobile / Small Screen Margin Rule */}
        <line
          x1="32"
          y1="0"
          x2="32"
          y2="100%"
          stroke={marginColor}
          strokeWidth="1.2"
          strokeOpacity="0.85"
          className="sm:hidden"
        />

        {/* Desktop Notebook Margin Rule at consistent 55px inset */}
        <line
          x1="55"
          y1="0"
          x2="55"
          y2="100%"
          stroke={marginColor}
          strokeWidth="1.2"
          strokeOpacity="0.85"
          className="hidden sm:block"
        />
      </svg>
    </div>
  );
};
