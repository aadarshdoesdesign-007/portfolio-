'use client';
import React from 'react';
import { SectionHeader } from './SectionHeader';
import { PixelPortrait } from './PixelPortrait';
import { profile } from '@/content/profile';
import { shortVitaEntries } from '@/content/vita';
import { useLens } from '@/context/LensContext';

export const About: React.FC = () => {
  const { lens } = useLens();

  return (
    <section id="about" className="pt-10 sm:pt-14 md:pt-28 pb-14 sm:pb-20 md:pb-28 transition-colors duration-400">
      {/* Section Title */}
      <div className="gridRow">
        <div className="grid_full">
          <SectionHeader number="01" title="About" />
        </div>
      </div>

      {/* Main About Layout: Content Column (Cols 1-4) & Short Vita Column (Cols 5-6) */}
      <div className="gridRow">
        {/* Left: Editorial Narrative & Visuals */}
        <div className="grid_1-4 space-y-6 sm:space-y-8">
          {/* Interactive Pixelated Portrait of Aadarsh - Full width on mobile, 320px on desktop */}
          <div className="w-full max-w-full md:max-w-[320px] mb-6 sm:mb-8">
            <PixelPortrait className="w-full" />
          </div>

          {/* Pullquote */}
          <blockquote className={`leading-[1.3] text-white py-1 ${
            lens === 'editorial' ? 'font-serif text-xl sm:text-2xl md:text-3xl italic border-l border-white/60 pl-4' :
            lens === 'brutalist' ? 'font-mono text-base sm:text-lg md:text-xl font-bold border-l-4 border-white pl-4' :
            lens === 'swiss' ? 'font-sans text-lg sm:text-xl md:text-2xl font-bold border-l-4 border-white pl-4' :
            lens === 'experimental' ? 'font-mono text-sm sm:text-base md:text-lg border-l-2 border-dashed border-white/60 pl-4' :
            'font-sans text-lg sm:text-xl md:text-2xl font-light border-l-2 border-white/60 pl-4'
          }`}>
            "{profile.quote}"
          </blockquote>

          {/* Body paragraphs */}
          <div className={`space-y-4 sm:space-y-5 text-[17px] sm:text-[18px] leading-[1.55] text-white/90 ${
            lens === 'editorial' ? 'font-serif text-[18px]' : 'font-normal'
          }`}>
            <p>
              I work at the convergence of digital product design, information visualization, and design research. Rather than treating design as decorative styling, I approach interface design as an information architecture challenge—translating ambiguous user needs, technical telemetry, and cultural data into coherent, legible systems.
            </p>
            <p>
              My recent work spans mission-critical telemetry interfaces for autonomous systems at <span className="font-medium text-white">NewSpace Research & Technologies</span>, large-scale multi-variable data visualizations for 28 ethnography methodologies at <span className="font-medium text-white">IIT Indore</span>, and accessible public wayfinding for the <span className="font-medium text-white">Zoo Authority of Karnataka</span>.
            </p>
            <p>
              I am pursuing a Bachelor of Design at <span className="font-medium text-white">Jain University</span>, School of Design, Media and Creative Arts. Concurrently, I am co-authoring three faculty-mentored research papers—including studies on AI-assisted architectural heritage reconstruction selected for presentation at <span className="font-medium text-white">Aarohan, IIT Delhi's National Research Paper Showcase</span>.
            </p>
          </div>
        </div>

        {/* Right: Short Vita (Cols 5-6) - Full-width stacked card on mobile */}
        <div className="grid_5-6 mt-10 md:mt-0">
          <div className={`w-full p-5 sm:p-6 space-y-6 text-white backdrop-blur-sm transition-all duration-300 ${
            lens === 'swiss' ? 'bg-white/10 rounded-none border border-white/40' :
            lens === 'brutalist' ? 'bg-black rounded-none border-2 border-white shadow-[4px_4px_0px_white]' :
            lens === 'editorial' ? 'bg-white/5 rounded border-l-2 border-white/40 border-t-0 border-r-0 border-b-0 pl-6' :
            lens === 'maximalist' ? 'bg-white/15 rounded-lg border-2 border-white shadow-[5px_5px_0px_rgba(255,255,255,0.35)]' :
            lens === 'experimental' ? 'bg-black/40 rounded-none border border-dashed border-white/40' :
            lens === 'minimal' ? 'bg-transparent p-0 border-none' :
            'bg-white/10 rounded-lg border border-white/20'
          }`}>
            <div className={`text-[12px] font-mono uppercase tracking-wider text-white font-semibold pb-2 ${
              lens === 'swiss' ? 'bg-white text-black px-2 py-1 -mx-6 -mt-6 mb-4 flex items-center justify-between font-bold' :
              lens === 'brutalist' ? 'border-b-2 border-white' :
              'border-b border-white/20'
            }`}>
              {lens === 'swiss' ? (
                <>
                  <span>SHORT VITA</span>
                  <span>2024—2026</span>
                </>
              ) : lens === 'experimental' ? (
                <span>TELEMETRY_LOG // RECENT_NODES</span>
              ) : (
                'Short Vita'
              )}
            </div>

            <ul className="space-y-6">
              {shortVitaEntries.map((entry, idx) => (
                <li key={idx} className={`relative pl-4 ${
                  lens === 'brutalist' ? 'border-l-2 border-white' :
                  lens === 'experimental' ? 'border-l border-dashed border-white/40' :
                  'border-l border-white/30'
                }`}>
                  {/* Pulsing indicator for active positions */}
                  {entry.isCurrent ? (
                    <span className={`absolute -left-[5px] top-1.5 w-2 h-2 ${
                      lens === 'swiss' || lens === 'brutalist' ? 'rounded-none' : 'rounded-full'
                    } bg-white ring-4 ring-white/20`} />
                  ) : (
                    <span className={`absolute -left-[4px] top-2 w-1.5 h-1.5 ${
                      lens === 'swiss' || lens === 'brutalist' ? 'rounded-none' : 'rounded-full'
                    } bg-white/40`} />
                  )}
                  <div className="font-mono text-xs text-white/60">
                    {entry.date}
                  </div>
                  <div className={`font-medium text-[15px] text-white mt-0.5 ${
                    lens === 'editorial' ? 'font-serif' : 'font-sans'
                  }`}>
                    {entry.organization}
                  </div>
                  <div className={`text-xs text-white/80 mt-0.5 ${
                    lens === 'editorial' ? 'italic' : ''
                  }`}>
                    {entry.role}
                  </div>
                  <div className="text-[11px] text-white/50 font-mono mt-0.5">
                    {entry.location}
                  </div>
                </li>
              ))}
            </ul>

            <div className={`pt-4 ${
              lens === 'brutalist' ? 'border-t-2 border-white' : 'border-t border-white/20'
            }`}>
              <a
                href="#vita"
                className={`inline-flex items-center gap-1.5 text-xs font-mono text-white hover:text-white/80 font-medium ${
                  lens === 'brutalist' ? 'border border-white px-2 py-1 bg-white text-black' : 'underline'
                }`}
              >
                <span>↓</span> Go to Full Vita
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

