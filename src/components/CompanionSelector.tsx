'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useCompanion, CompanionMode } from '@/context/CompanionContext';
import { useGotham } from '@/context/GothamContext';

export const CompanionSelector: React.FC = () => {
  const { mode, setMode } = useCompanion();
  const { isGotham } = useGotham();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const options: { mode: CompanionMode; icon: string; title: string; subtitle: string; shortLabel: string }[] = [
    {
      mode: 'dora',
      icon: '🐕',
      title: 'Dora (Chow Chow)',
      subtitle: 'Cinnamon pup chases tennis ball!',
      shortLabel: 'Dora',
    },
    {
      mode: 'leo',
      icon: '🦔',
      title: 'Leo (Hedgehog)',
      subtitle: 'Scurries for crunchy treat pellets!',
      shortLabel: 'Leo',
    },
    {
      mode: 'none',
      icon: '👆',
      title: 'Normal Cursor',
      subtitle: 'Clean, distraction-free browser pointer',
      shortLabel: 'Normal',
    },
    {
      mode: 'spider',
      icon: '🕷️',
      title: 'Spider & Ant',
      subtitle: 'Black spider pursues the pink ant',
      shortLabel: 'Spider',
    },
  ];

  const currentOption = options.find((o) => o.mode === mode) || options[0];

  return (
    <div ref={containerRef} className="relative inline-block text-left select-none">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-mono text-xs font-semibold shadow-[1px_1px_0px_#000000] hover:shadow-[2px_2px_0px_#000000] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FFE500]/50 ${
          isGotham
            ? 'bg-[#11151D] border-[#303540] text-[#F3F1E9] hover:border-[#FFE500]'
            : 'bg-white/90 hover:bg-white text-black border-black/30'
        }`}
        aria-label="Choose cursor companion"
        title="Choose cursor companion"
      >
        <span className="text-sm">{currentOption.icon}</span>
        <span className={`hidden sm:inline text-[11px] font-mono font-bold ${isGotham ? 'text-[#F3F1E9]' : 'text-black/80'}`}>
          {currentOption.shortLabel}
        </span>
        <span className={`text-[9px] ${isGotham ? 'text-[#A4A9B4]' : 'text-black/50'}`} aria-hidden="true">▾</span>
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Cursor companion options"
          className={`absolute right-0 mt-2 w-64 rounded-2xl border-2 p-2 z-50 animate-in fade-in zoom-in-95 duration-150 ${
            isGotham
              ? 'bg-[#11151D] border-[#303540] shadow-[0_8px_24px_rgba(0,0,0,0.85)]'
              : 'bg-[#F9F3EB] border-black shadow-[4px_4px_0px_#000000]'
          }`}
        >
          <div className={`px-2 py-1 text-[10px] font-mono font-bold uppercase tracking-wider border-b mb-1.5 flex items-center justify-between ${
            isGotham ? 'border-[#303540] text-[#A4A9B4]' : 'border-black/10 text-black/50'
          }`}>
            <span>Cursor Companion</span>
            <span className={`text-[9px] font-bold ${isGotham ? 'text-[#FFE500]' : 'text-[#FF4BB9]'}`}>
              Personal Pets
            </span>
          </div>

          <div className="space-y-1">
            {options.map((opt) => (
              <button
                key={opt.mode}
                type="button"
                role="option"
                aria-selected={mode === opt.mode}
                onClick={() => {
                  setMode(opt.mode);
                  setIsOpen(false);
                }}
                className={`w-full flex items-start gap-2.5 px-2.5 py-2 rounded-xl text-left transition-all cursor-pointer ${
                  mode === opt.mode
                    ? isGotham
                      ? 'bg-[#FFE500] text-[#080A0F] border border-black shadow-[1px_1px_0px_#000000]'
                      : 'bg-[#FFFF5F] text-black border border-black shadow-[1px_1px_0px_#000000]'
                    : isGotham
                    ? 'hover:bg-white/5 text-[#A4A9B4] hover:text-[#F3F1E9] border border-transparent'
                    : 'hover:bg-white text-black/80 hover:text-black border border-transparent'
                }`}
              >
                <span className="text-lg leading-tight mt-0.5">{opt.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-pacaembu font-bold leading-tight truncate ${
                    mode === opt.mode && isGotham ? 'text-[#080A0F]' : ''
                  }`}>
                    {opt.title}
                  </div>
                  <div className={`text-[10px] font-mono leading-tight mt-0.5 ${
                    mode === opt.mode
                      ? isGotham ? 'text-[#080A0F]/80' : 'text-black/60'
                      : isGotham ? 'text-[#7E8696]' : 'text-black/60'
                  }`}>
                    {opt.subtitle}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
