'use client';

import React, { useState } from 'react';
import { useGotham } from '@/context/GothamContext';

interface BatSymbolButtonProps {
  className?: string;
  size?: number;
}

export const BatSymbolButton: React.FC<BatSymbolButtonProps> = ({
  className = '',
  size = 42,
}) => {
  const { isGotham, toggleGotham, isTransitioning } = useGotham();
  const [isHovered, setIsHovered] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleGotham();
    }
  };

  const tooltipText = isGotham ? 'Deactivate Bat-Signal' : 'Project Bat-Signal';
  const ariaLabel = isGotham ? 'Deactivate Gotham Mode and Bat-Signal' : 'Activate Gotham Mode and Bat-Signal';

  return (
    <div
      className={`relative inline-block select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Searchlight Projector Button Unit */}
      <button
        type="button"
        role="button"
        aria-pressed={isGotham}
        aria-label={ariaLabel}
        title={tooltipText}
        onClick={toggleGotham}
        onKeyDown={handleKeyDown}
        disabled={isTransitioning}
        className={`group relative flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FFE500] ${
          isGotham
            ? 'bg-[#121620] border-2 border-[#FFE500] shadow-[0_0_18px_rgba(255,229,0,0.45),2px_2px_0px_#000000]'
            : 'bg-white/95 hover:bg-white border-2 border-black shadow-[2px_2px_0px_#000000] hover:shadow-[0_0_14px_rgba(255,229,0,0.5)]'
        }`}
        style={{
          width: size,
          height: size,
        }}
      >
        {/* Outer Knurled Housing Rim / Aperture Notches */}
        <div
          className={`absolute inset-0.5 rounded-full border border-dashed transition-colors duration-300 pointer-events-none ${
            isGotham ? 'border-[#FFE500]/60' : 'border-black/30 group-hover:border-[#FFE500]'
          }`}
        />

        {/* High-Beam Reflector Lens (Radial Core) */}
        <div
          className={`absolute inset-1 rounded-full transition-all duration-300 pointer-events-none ${
            isGotham
              ? 'opacity-100 scale-100'
              : isHovered
              ? 'opacity-70 scale-95'
              : 'opacity-0 scale-90'
          }`}
          style={{
            background: isGotham
              ? 'radial-gradient(circle, #FFFFF0 0%, #FFE500 55%, rgba(255,229,0,0.2) 90%)'
              : 'radial-gradient(circle, rgba(255,245,180,0.9) 0%, rgba(255,229,0,0.4) 60%, transparent 90%)',
            boxShadow: isGotham ? '0 0 12px #FFE500, inset 0 0 6px #FFFFFF' : 'none',
          }}
        />

        {/* Mechanical Gimbal Pivot Tilt on Hover */}
        <div
          className={`relative z-10 flex items-center justify-center transition-transform duration-300 transform-gpu ${
            isHovered ? 'scale-110 -rotate-6' : 'scale-100 rotate-0'
          }`}
        >
          {/* Authentic Bat-Signal Insignia Silhouette */}
          <svg
            viewBox="0 0 48 28"
            width={size * 0.62}
            height={(size * 0.62 * 28) / 48}
            className="block"
          >
            <path
              d="M 24 5
                 C 22.8 3.5, 22.3 1.2, 21.6 0
                 C 21.0 1.2, 20.4 3.5, 19.2 5
                 C 16.5 4.5, 12.0 3.8, 3.0 7.5
                 C 6.5 11.5, 9.8 14.0, 9.2 17.5
                 C 12.5 16.0, 16.2 17.5, 17.2 22.0
                 C 19.2 19.8, 22.0 21.0, 24.0 27.0
                 C 26.0 21.0, 28.8 19.8, 30.8 22.0
                 C 31.8 17.5, 35.5 16.0, 38.8 17.5
                 C 38.2 14.0, 41.5 11.5, 45.0 7.5
                 C 36.0 3.8, 31.5 4.5, 28.8 5
                 C 27.6 3.5, 27.0 1.2, 26.4 0
                 C 25.7 1.2, 25.2 3.5, 24.0 5 Z"
              fill={isGotham ? '#07090E' : isHovered ? '#000000' : '#111111'}
              stroke={isGotham ? '#FFE500' : '#000000'}
              strokeWidth={isGotham ? '0.7' : '0.5'}
              className="transition-colors duration-300"
            />
          </svg>
        </div>

        {/* Physical Status Indicator Beacon */}
        <span
          className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-black transition-all ${
            isGotham
              ? 'bg-[#FFE500] shadow-[0_0_8px_#FFE500] animate-pulse'
              : 'bg-black/30'
          }`}
        />
      </button>

      {/* Accessible Cinematic Tooltip on Hover */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 pointer-events-none transition-all duration-200 z-50 whitespace-nowrap ${
          isHovered
            ? 'opacity-100 translate-y-0 visible'
            : 'opacity-0 -translate-y-1 invisible'
        }`}
      >
        <div
          className={`px-3 py-1 rounded-lg text-[11px] font-mono font-bold tracking-wider border flex items-center gap-1.5 ${
            isGotham
              ? 'bg-[#11151D] text-[#FFE500] border-[#FFE500]/60 shadow-[0_4px_16px_rgba(0,0,0,0.8)]'
              : 'bg-[#FFFF5F] text-black border-black shadow-[2px_2px_0px_#000000]'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFE500] animate-ping" />
          <span>{tooltipText}</span>
        </div>
      </div>
    </div>
  );
};
