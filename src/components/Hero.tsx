'use client';
import React, { useState } from 'react';
import { useLens } from '@/context/LensContext';

export const Hero: React.FC = () => {
  const [isMountainHovered, setIsMountainHovered] = useState(false);
  const { lens } = useLens();

  return (
    <header className="min-h-screen flex flex-col justify-between pt-32 sm:pt-40 lg:pt-48 pb-12 sm:pb-16 text-white transition-colors duration-400">
      {/* Primary Dominant Editorial Statement */}
      <div className="gridRow">
        <div className="grid_2-6">
          <h1 
            className="text-white font-sans font-light tracking-[-0.025em] max-w-[960px] leading-[1.14]"
            style={{
              fontSize: 'clamp(38px, 5.2vw, 80px)',
            }}
          >
            I design interfaces, visualise complexity, tell stories, and occasionally{' '}
            <span className="relative inline-block align-baseline">
              <span
                role="button"
                tabIndex={0}
                onMouseEnter={() => setIsMountainHovered(true)}
                onMouseLeave={() => setIsMountainHovered(false)}
                onFocus={() => setIsMountainHovered(true)}
                onBlur={() => setIsMountainHovered(false)}
                onClick={() => setIsMountainHovered((prev) => !prev)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsMountainHovered((prev) => !prev);
                  }
                }}
                className={`cursor-pointer text-white transition-opacity duration-200 hover:opacity-75 focus-visible:outline-none select-none ${
                  lens === 'brutalist' ? 'underline decoration-2 underline-offset-4' : ''
                }`}
                aria-label="climb mountains (hover to reveal photograph)"
              >
                climb mountains
              </span>

              {/* Adjacent Floating Mountain Photograph Preview — Editorial Inline Reveal */}
              <div
                aria-hidden={!isMountainHovered}
                className={`absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-300 ease-out z-40 ${
                  isMountainHovered
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-[0.96] translate-y-2 pointer-events-none'
                }`}
              >
                <div className={`w-[220px] sm:w-[260px] overflow-hidden ${
                  lens === 'swiss' || lens === 'brutalist' ? 'rounded-none' : 'rounded-md'
                } ${
                  lens === 'brutalist' ? 'border-2 border-white shadow-[4px_4px_0px_white]' :
                  lens === 'maximalist' ? 'border-2 border-white shadow-[4px_4px_0px_rgba(255,255,255,0.4)]' :
                  'shadow-lg border border-white/20'
                } bg-neutral-900`}>
                  <img
                    src="/images/mountain_climbing.jpg"
                    alt="Mountain landscape trail"
                    className="w-full h-auto object-cover block"
                    loading="eager"
                  />
                </div>
              </div>
            </span>
            .
          </h1>

          {/* Secondary Understated Identity Metadata */}
          <div className="mt-8 sm:mt-10 font-mono text-xs sm:text-sm tracking-wide space-y-1">
            <div className="text-white font-medium">
              {lens === 'experimental' ? 'NODE::AADARSH_R [STATUS: ONLINE]' :
               lens === 'brutalist' ? '== AADARSH R //' :
               lens === 'editorial' ? 'Aadarsh R — Designer & Researcher' :
               'Aadarsh R'}
            </div>
            <div className="text-white/70 text-[11px] sm:text-xs tracking-wider">
              {lens === 'experimental' ? 'TELEMETRY: UI/UX · DATA VISUALIZATION · COMPUTATIONAL DESIGN' :
               lens === 'swiss' ? 'COMMUNICATION DESIGN · UI/UX · RESEARCH' :
               'Communication Design · UI/UX · Product · Research'}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Table of Contents Nav */}
      <div className="gridRow mt-auto pt-20 sm:pt-28">
        <div className="grid_2-6">
          <ul className={`max-w-md ${
            lens === 'editorial' ? 'font-serif text-2xl sm:text-3xl' : 'font-sans text-2xl sm:text-3xl lg:text-[34px]'
          } font-light leading-[1.2]`}>
            <li>
              <a 
                href="#about" 
                className={`group flex items-center py-3 border-t border-white/30 text-white transition-all duration-300 hover:pl-3 ${
                  lens === 'brutalist' ? 'border-t-2 border-white' : ''
                }`}
              >
                <span className={`inline-block w-12 font-mono text-sm sm:text-base ${
                  lens === 'swiss' ? 'font-bold text-white' : 'text-white/50'
                } group-hover:text-white/80 transition-colors`}>
                  {lens === 'editorial' ? 'I.' : lens === 'experimental' ? '01_' : '01'}
                </span>
                <span className="tracking-tight">
                  {lens === 'brutalist' ? 'ABOUT' : 'About'}
                </span>
              </a>
            </li>
            <li>
              <a 
                href="#projects" 
                className={`group flex items-center py-3 border-t border-white/30 text-white transition-all duration-300 hover:pl-3 ${
                  lens === 'brutalist' ? 'border-t-2 border-white' : ''
                }`}
              >
                <span className={`inline-block w-12 font-mono text-sm sm:text-base ${
                  lens === 'swiss' ? 'font-bold text-white' : 'text-white/50'
                } group-hover:text-white/80 transition-colors`}>
                  {lens === 'editorial' ? 'II.' : lens === 'experimental' ? '02_' : '02'}
                </span>
                <span className="tracking-tight">
                  {lens === 'brutalist' ? 'PROJECTS' : 'Projects'}
                </span>
              </a>
            </li>
            <li>
              <a 
                href="#vita" 
                className={`group flex items-center py-3 border-t border-b border-white/30 text-white transition-all duration-300 hover:pl-3 ${
                  lens === 'brutalist' ? 'border-t-2 border-b-2 border-white' : ''
                }`}
              >
                <span className={`inline-block w-12 font-mono text-sm sm:text-base ${
                  lens === 'swiss' ? 'font-bold text-white' : 'text-white/50'
                } group-hover:text-white/80 transition-colors`}>
                  {lens === 'editorial' ? 'III.' : lens === 'experimental' ? '03_' : '03'}
                </span>
                <span className="tracking-tight">
                  {lens === 'brutalist' ? 'VITA' : 'Vita'}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

