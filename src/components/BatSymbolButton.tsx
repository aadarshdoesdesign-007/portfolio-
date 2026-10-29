'use client';

import React, { useState } from 'react';
import { useGotham } from '@/context/GothamContext';

interface BatSymbolButtonProps {
  className?: string;
  size?: number;
}

export const BatSymbolButton: React.FC<BatSymbolButtonProps> = ({
  className = '',
  size = 40,
}) => {
  const { isGotham, toggleGotham, isTransitioning } = useGotham();
  const [isHovered, setIsHovered] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleGotham();
    }
  };

  const tooltipText = isGotham ? 'Exit Gotham' : 'Enter Gotham';

  return (
    <div
      className={`relative inline-block select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        type="button"
        role="button"
        onClick={toggleGotham}
        onKeyDown={handleKeyDown}
        disabled={isTransitioning}
        aria-label={tooltipText}
        title={tooltipText}
        className={`group relative flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FFE500]/70 ${
          isGotham
            ? 'bg-[#11151D] border-2 border-[#303540] shadow-[2px_2px_0px_#000000] hover:border-[#FFE500] hover:shadow-[0_0_14px_rgba(255,229,0,0.5)]'
            : 'bg-white/90 hover:bg-white border-2 border-black shadow-[2px_2px_0px_#000000] hover:shadow-[0_0_14px_rgba(255,229,0,0.45)]'
        }`}
        style={{
          width: size,
          height: size,
        }}
      >
        {/* Subtle Ambient Yellow Halo on Hover */}
        <div
          className={`absolute inset-0 rounded-full transition-opacity duration-300 pointer-events-none ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: isGotham
              ? 'radial-gradient(circle, rgba(255,229,0,0.2) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(255,229,0,0.3) 0%, transparent 70%)',
          }}
        />

        {/* Minimalist Batman Bat Symbol Vector */}
        <svg
          viewBox="0 0 48 30"
          width={size * 0.62}
          height={(size * 0.62 * 30) / 48}
          className={`block transition-transform duration-300 transform-gpu ${
            isHovered ? 'scale-110 -rotate-3' : 'scale-100 rotate-0'
          }`}
          style={{
            transformOrigin: '50% 50%',
          }}
        >
          {/* Authentic, sleek Bat silhouette */}
          <path
            d="M 24 6
               C 22.8 4.2, 22.2 1.5, 21.6 0
               C 21.0 1.5, 20.4 4.2, 19.2 6
               C 16.5 5.5, 12.0 4.5, 4.0 9.0
               C 7.5 13.0, 10.5 15.5, 10.0 19.5
               C 13.0 18.0, 16.5 19.5, 17.5 24.5
               C 19.5 22.0, 22.0 23.5, 24.0 29.5
               C 26.0 23.5, 28.5 22.0, 30.5 24.5
               C 31.5 19.5, 35.0 18.0, 38.0 19.5
               C 37.5 15.5, 40.5 13.0, 44.0 9.0
               C 36.0 4.5, 31.5 5.5, 28.8 6
               C 27.6 4.2, 27.0 1.5, 26.4 0
               C 25.8 1.5, 25.2 4.2, 24.0 6 Z"
            fill={isGotham ? '#FFE500' : '#000000'}
            className="transition-colors duration-300"
          />
        </svg>

        {/* Faint Signal Beam Ring on Gotham mode */}
        {isGotham && (
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#FFE500] border border-black shadow-[0_0_6px_#FFE500] animate-pulse" />
        )}
      </button>

      {/* Designer Tooltip on Hover */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 pointer-events-none transition-all duration-200 z-50 whitespace-nowrap ${
          isHovered
            ? 'opacity-100 translate-y-0 visible'
            : 'opacity-0 -translate-y-1 invisible'
        }`}
      >
        <div
          className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold tracking-wider shadow-[3px_3px_0px_#000000] border ${
            isGotham
              ? 'bg-[#11151D] text-[#FFE500] border-[#FFE500]/60 shadow-[0_4px_12px_rgba(0,0,0,0.6)]'
              : 'bg-[#FFFF5F] text-black border-black shadow-[2px_2px_0px_#000000]'
          }`}
        >
          {tooltipText}
        </div>
      </div>
    </div>
  );
};
