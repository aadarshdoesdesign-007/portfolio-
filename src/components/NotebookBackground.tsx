'use client';

import React from 'react';
import { useGotham } from '@/context/GothamContext';
import { GothamAtmosphere } from './GothamAtmosphere';

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
  const { isGotham } = useGotham();

  const activeLineColor = isGotham ? 'rgba(255, 229, 0, 0.05)' : lineColor;
  const activeMarginColor = isGotham ? 'rgba(255, 229, 0, 0.45)' : marginColor;

  return (
    <>
      <div
        aria-hidden="true"
        className={`fixed inset-0 w-full h-full pointer-events-none z-0 select-none overflow-hidden transition-colors duration-500 ${
          isGotham ? 'bg-[#080A0F]' : 'bg-[#E4E2D8]'
        }`}
      >
        <svg
          width="100%"
          height="100%"
          className="block w-full h-full"
        >
          <defs>
            {/* Horizontal ruled lines with 29px vertical spacing */}
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
                stroke={activeLineColor}
                strokeWidth="0.65"
                strokeOpacity={isGotham ? '0.7' : '0.30'}
                className="transition-colors duration-500"
              />
            </pattern>
          </defs>

          {/* 1. Page-level horizontal ruled lines covering entire viewport */}
          <rect width="100%" height="100%" fill="url(#notebook-ruled-grid)" />

          {/* 2. Responsive single vertical margin line: 32px on mobile, 55px on desktop */}
          {/* Mobile Margin Rule */}
          <line
            x1="32"
            y1="0"
            x2="32"
            y2="100%"
            stroke={activeMarginColor}
            strokeWidth="1.2"
            strokeOpacity={isGotham ? '0.6' : '0.85'}
            className="sm:hidden transition-colors duration-500"
          />

          {/* Desktop Margin Rule at consistent 55px inset */}
          <line
            x1="55"
            y1="0"
            x2="55"
            y2="100%"
            stroke={activeMarginColor}
            strokeWidth="1.2"
            strokeOpacity={isGotham ? '0.6' : '0.85'}
            className="hidden sm:block transition-colors duration-500"
          />
        </svg>
      </div>

      {/* Gotham Atmosphere Layer (Atmospheric Searchlights, Rain Mist & Skyline) */}
      <GothamAtmosphere />
    </>
  );
};
