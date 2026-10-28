'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useCompanion, CompanionMode } from '@/context/CompanionContext';

export const CompanionSelector: React.FC = () => {
  const { mode, setMode } = useCompanion();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options: { mode: CompanionMode; icon: string; title: string; subtitle: string }[] = [
    {
      mode: 'spider',
      icon: '🕷️',
      title: 'Spider & Ant',
      subtitle: 'Let the spider chase me!',
    },
    {
      mode: 'dog',
      icon: '🐕',
      title: 'Dora (Chow Chow)',
      subtitle: 'Cinnamon pup chases tennis ball!',
    },
    {
      mode: 'ant-only',
      icon: '🐜',
      title: 'Just the Ant',
      subtitle: 'Solo ant, no chaser',
    },
  ];

  const currentOption = options.find((o) => o.mode === mode) || options[0];

  return (
    <div ref={containerRef} className="relative inline-block text-left select-none">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-black/30 bg-white/90 hover:bg-white text-black font-mono text-xs font-semibold shadow-[1px_1px_0px_#000000] hover:shadow-[2px_2px_0px_#000000] transition-all cursor-pointer"
        aria-label="Choose cursor companion"
        title="Choose cursor companion"
      >
        <span className="text-sm">{currentOption.icon}</span>
        <span className="hidden sm:inline text-[11px] font-mono font-bold text-black/80">
          {currentOption.mode === 'dog' ? 'Dora' : currentOption.mode === 'spider' ? 'Spider' : 'Ant'}
        </span>
        <span className="text-[9px] text-black/50">▾</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#F9F3EB] border-2 border-black shadow-[4px_4px_0px_#000000] p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2 py-1 text-[10px] font-mono font-bold text-black/50 uppercase tracking-wider border-b border-black/10 mb-1.5 flex items-center justify-between">
            <span>Cursor Companion</span>
            <span className="text-[9px] text-[#FF4BB9] font-bold">Interactive</span>
          </div>
          <div className="px-2 py-0.5 mb-1.5 text-[11px] font-pacaembu font-bold text-black/80">
            Scared of spiders?
          </div>
          <div className="space-y-1">
            {options.map((opt) => (
              <button
                key={opt.mode}
                type="button"
                onClick={() => {
                  setMode(opt.mode);
                  setIsOpen(false);
                }}
                className={`w-full flex items-start gap-2.5 px-2.5 py-2 rounded-xl text-left transition-all cursor-pointer ${
                  mode === opt.mode
                    ? 'bg-[#FFFF5F] text-black border border-black shadow-[1px_1px_0px_#000000]'
                    : 'hover:bg-white text-black/80 hover:text-black border border-transparent'
                }`}
              >
                <span className="text-lg leading-tight mt-0.5">{opt.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-pacaembu font-bold leading-tight truncate">
                    {opt.title}
                  </div>
                  <div className="text-[10px] font-mono text-black/60 leading-tight mt-0.5">
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
