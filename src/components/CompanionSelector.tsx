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

  const options: { mode: CompanionMode; icon: string; label: string }[] = [
    { mode: 'spider', icon: '🕷️', label: 'Spider & Ant' },
    { mode: 'dog', icon: '🐕', label: 'Dog & Ball' },
    { mode: 'ant-only', icon: '🐜', label: 'Ant Only' },
  ];

  const currentOption = options.find((o) => o.mode === mode) || options[0];

  return (
    <div ref={containerRef} className="relative inline-block text-left select-none">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-black/30 bg-white/90 hover:bg-white text-black font-mono text-xs font-semibold shadow-[1px_1px_0px_#000000] hover:shadow-[2px_2px_0px_#000000] transition-all cursor-pointer"
        aria-label="Change cursor companion"
        title="Change cursor companion"
      >
        <span>{currentOption.icon}</span>
        <span className="hidden sm:inline text-[11px] font-pacaembu font-bold text-black/80">companion</span>
        <span className="text-[9px] text-black/50">▾</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-[#F9F3EB] border-2 border-black shadow-[4px_4px_0px_#000000] p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2 py-1 text-[10px] font-mono font-bold text-black/50 uppercase tracking-wider border-b border-black/10 mb-1">
            Cursor Companion
          </div>
          {options.map((opt) => (
            <button
              key={opt.mode}
              type="button"
              onClick={() => {
                setMode(opt.mode);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-left text-xs font-pacaembu font-bold transition-all cursor-pointer ${
                mode === opt.mode
                  ? 'bg-[#FFFF5F] text-black border border-black shadow-[1px_1px_0px_#000000]'
                  : 'hover:bg-white text-black/80 hover:text-black'
              }`}
            >
              <span className="text-sm">{opt.icon}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
