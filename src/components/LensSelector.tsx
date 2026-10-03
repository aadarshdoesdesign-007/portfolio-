'use client';
import React, { useState, useRef, useEffect } from 'react';
import { DesignLens } from '@/types';

interface LensSelectorProps {
  currentLens: DesignLens;
  onLensChange: (lens: DesignLens) => void;
}

interface LensOption {
  id: DesignLens;
  label: string;
  desc: string;
}

export const lensOptions: LensOption[] = [
  { id: 'default', label: 'DEFAULT', desc: 'Master Portfolio Design' },
  { id: 'minimal', label: 'MINIMAL', desc: 'Stripped & Quiet Rhythm' },
  { id: 'swiss', label: 'SWISS', desc: 'Rigid Grid & Grotesque' },
  { id: 'brutalist', label: 'BRUTALIST', desc: 'Raw Edge & Heavy Mono' },
  { id: 'editorial', label: 'EDITORIAL', desc: 'Serif & Magazine Hierarchy' },
  { id: 'maximalist', label: 'MAXIMALIST', desc: 'Dense Typographic Energy' },
  { id: 'experimental', label: 'EXPERIMENTAL', desc: 'Telemetry & Wireframe HUD' }
];

export const LensSelector: React.FC<LensSelectorProps> = ({
  currentLens,
  onLensChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isOpen]);

  // Close dropdown on Esc
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative inline-block text-right">
      {/* Subtle Unobtrusive Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        title="Design Lens: Optional Visual Variations"
        className="group inline-flex items-center gap-1 font-mono text-[9px] sm:text-[10px] tracking-wider uppercase px-2 py-0.5 border border-white/20 hover:border-white/40 text-white/60 hover:text-white rounded transition-all duration-200 cursor-pointer bg-black/20 hover:bg-black/40"
      >
        <span>LENS · {currentLens.toUpperCase()}</span>
        <span className={`text-[8px] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {/* Floating Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-1.5 w-52 bg-black/95 backdrop-blur-md border border-white/25 rounded shadow-2xl py-1 z-50 text-left font-mono text-xs animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="px-3 py-1.5 border-b border-white/10 text-[9px] uppercase tracking-wider text-white/40 flex justify-between items-center">
            <span>Visual Lens</span>
            <span className="text-[8px]">[Experimental]</span>
          </div>

          <div className="py-1">
            {lensOptions.map((opt) => {
              const isSelected = opt.id === currentLens;
              return (
                <button
                  key={opt.id}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onLensChange(opt.id);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-1.5 text-left flex flex-col transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-white/15 text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[11px] tracking-wide">
                      {opt.label}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] text-white">✓</span>
                    )}
                  </div>
                  <span className="text-[9px] text-white/40 leading-tight mt-0.5">
                    {opt.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
