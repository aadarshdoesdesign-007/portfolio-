'use client';
import React from 'react';

interface GridToggleProps {
  isVisible: boolean;
}

export const GridDisplay: React.FC<GridToggleProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[99999] transition-opacity duration-300 mix-blend-multiply"
      style={{
        '--grid-color': 'var(--highlight-color-300)',
        '--grid-color-light': 'var(--highlight-color-100)',
      } as React.CSSProperties}
    >
      <div className="gridRow h-full">
        {[1, 2, 3, 4, 5, 6].map((col) => (
          <div
            key={col}
            className={`relative h-full border-l border-r border-[var(--grid-color)] ${
              col > 1 ? 'm-hide' : ''
            }`}
          >
            <span className="absolute top-1 left-1 font-mono text-[11px] leading-none text-[var(--grid-color)] font-semibold">
              {col}
            </span>
            <div className="absolute top-0 left-0 h-full border-r border-[var(--grid-color-light)] w-[var(--grid-sub-gap)]" />
          </div>
        ))}
      </div>
      {/* Dashed center vertical line */}
      <div className="fixed top-0 bottom-0 left-1/2 -translate-x-1/2 border-l border-dashed border-[var(--grid-color)]" />
    </div>
  );
};
