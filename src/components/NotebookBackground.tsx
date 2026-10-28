'use client';
import React from 'react';

interface NotebookBackgroundProps {
  lineColor?: string;
  marginColor?: string;
  lineGap?: number;
  marginX?: number;
  showMargin?: boolean;
}

export const NotebookBackground: React.FC<NotebookBackgroundProps> = ({
  lineColor = '#00aeef',
  marginColor = '#ff31bc',
  lineGap = 24,
  marginX = 48,
  showMargin = true,
}) => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="xMinYMin slice"
        className="block w-full h-full opacity-60 sm:opacity-75"
      >
        <defs>
          <pattern
            id="notebook-baseline-grid"
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
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#notebook-baseline-grid)" />
        {showMargin && (
          <line
            x1={marginX}
            y1="0"
            x2={marginX}
            y2="100%"
            stroke={marginColor}
            strokeWidth="1"
            className="hidden sm:block"
          />
        )}
      </svg>
    </div>
  );
};
