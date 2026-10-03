'use client';
import React from 'react';
import { profile } from '@/content/profile';
import { useLens } from '@/context/LensContext';

interface FooterProps {
  onCycleColor: () => void;
  onToggleGrid: () => void;
  gridActive: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  onCycleColor,
  onToggleGrid,
  gridActive
}) => {
  const { lens } = useLens();

  return (
    <footer className={`background--highlight py-12 sm:py-16 md:py-20 text-white transition-colors duration-400 ${
      lens === 'brutalist' ? 'border-t-2 border-white' :
      lens === 'experimental' ? 'border-t border-dashed border-white/40' :
      'border-t border-white/20'
    }`}>
      <div className="gridRow grid_reverse gap-y-12">
        {/* Left Column: Credits and Colophon */}
        <div className={`grid_1-2 space-y-4 text-xs sm:text-sm text-white/80 ${
          lens === 'editorial' ? 'font-serif text-sm' : 'font-sans'
        }`}>
          <p className="leading-relaxed">
            {lens === 'experimental' ? (
              <span className="font-mono text-xs">
                DATA_FEED::ARCHIVE // OPERATOR: <span className="text-white font-bold">{profile.name.toUpperCase()}</span>
              </span>
            ) : (
              <>
                Personal portfolio and research archive of <span className="font-semibold text-white">{profile.name}</span>.
              </>
            )}
          </p>
          <p className={`leading-relaxed text-white/70 ${lens === 'editorial' ? 'italic' : ''}`}>
            UI/UX Designer · Product Designer · Communication Designer
            <br />
            Student at Jain University, School of Design, Media and Creative Arts.
          </p>
          <div className="pt-4 text-white/60 font-mono text-[11px] leading-relaxed">
            <p>2026 © {profile.name}. Bengaluru, Karnataka · 12°58'N 77°35'E ⌁</p>
            <p>
              {lens === 'swiss' ? 'International Typographic System // Helvetica Grid Archive.' :
               lens === 'brutalist' ? 'RAW MONOSPACE ARCHIVE // NO BLOAT.' :
               lens === 'editorial' ? 'Typeset in literary measure with editorial annotations.' :
               lens === 'experimental' ? 'EOF // TELEMETRY TERMINATED // ALL SYSTEMS NOMINAL.' :
               'Typography-led design system & research archive.'}
            </p>
          </div>
        </div>

        {/* Middle Column: Direct Contact & Portfolio Links */}
        <div className="grid_3-4">
          <ul className={`space-y-2 text-sm ${lens === 'editorial' ? 'font-serif' : 'font-sans'}`}>
            <li>
              <a
                href={profile.links.email}
                className="inline-block py-1 hover:text-white underline decoration-white/30 underline-offset-4 transition-colors"
              >
                {lens === 'brutalist' ? `[EMAIL] --> ${profile.email}` : `Email — ${profile.email}`}
              </a>
            </li>
            <li>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-1 hover:text-white underline decoration-white/30 underline-offset-4 transition-colors"
              >
                {lens === 'brutalist' ? '[LINKEDIN] --> /in/aadarsh-ramakrishnan-b46052293/' : 'LinkedIn — /in/aadarsh-ramakrishnan-b46052293/'}
              </a>
            </li>
            <li>
              <a
                href={`tel:${profile.phone}`}
                className="inline-block py-1 hover:text-white underline decoration-white/30 underline-offset-4 transition-colors font-mono text-xs"
              >
                {profile.phone}
              </a>
            </li>
          </ul>
        </div>

        {/* Right Column: Interaction Keyboard Controls */}
        <div className="grid_5-6 flex flex-col items-start md:items-end justify-between gap-4">
          <div className="space-y-3">
            <button
              onClick={onCycleColor}
              className={`flex items-center gap-2 text-xs font-mono text-white/80 hover:text-white transition-colors cursor-pointer group ${
                lens === 'brutalist' ? 'border border-white px-2 py-1 bg-black shadow-[2px_2px_0px_white]' : ''
              }`}
              title="Cycle accent theme (Press 'c')"
            >
              <span>{lens === 'experimental' ? 'COLOR_CYCLE' : 'Change Colour'}</span>
              <kbd className={`w-5 h-5 flex items-center justify-center border border-white/40 ${
                lens === 'swiss' || lens === 'brutalist' ? 'rounded-none' : 'rounded'
              } text-[11px] bg-white/10 group-hover:bg-white/20 transition-colors uppercase`}>
                c
              </kbd>
            </button>

            <button
              onClick={onToggleGrid}
              className={`flex items-center gap-2 text-xs font-mono text-white/80 hover:text-white transition-colors cursor-pointer group ${
                lens === 'brutalist' ? 'border border-white px-2 py-1 bg-black shadow-[2px_2px_0px_white]' : ''
              }`}
              title="Toggle 6-column grid visualizer (Press 'g')"
            >
              <span>{gridActive ? (lens === 'experimental' ? 'GRID_OFF' : 'Hide Grid') : (lens === 'experimental' ? 'GRID_ON' : 'Toggle Grid')}</span>
              <kbd className={`w-5 h-5 flex items-center justify-center border border-white/40 ${
                lens === 'swiss' || lens === 'brutalist' ? 'rounded-none' : 'rounded'
              } text-[11px] bg-white/10 group-hover:bg-white/20 transition-colors uppercase`}>
                g
              </kbd>
            </button>
          </div>

          <div className="text-[11px] font-mono text-white/50 text-left md:text-right pt-6">
            Press <kbd className={`px-1 border border-white/30 ${lens === 'swiss' || lens === 'brutalist' ? 'rounded-none' : 'rounded'}`}>⌘K</kbd> to search archive
          </div>
        </div>
      </div>
    </footer>
  );
};