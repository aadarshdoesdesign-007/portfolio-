'use client';
import React, { useState, useRef, useEffect } from 'react';
import { ThemeColor, ColourSwitcher } from './ColourSwitcher';
import { DesignLens } from '@/types';
import { lensOptions } from './LensSelector';

interface MobileControlAreaProps {
  currentColor: ThemeColor;
  onColorChange: (color: ThemeColor) => void;
  currentLens: DesignLens;
  onLensChange: (lens: DesignLens) => void;
  className?: string;
}

export const MobileControlArea: React.FC<MobileControlAreaProps> = ({
  currentColor,
  onColorChange,
  currentLens,
  onLensChange,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when tapping outside
  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div className={`md:hidden mt-12 sm:mt-14 w-full ${className}`}>
      {/* 1. ACCENT THEME */}
      <div>
        <div className="font-mono text-xs uppercase tracking-wider text-white/70">
          ACCENT THEME
        </div>
        <div className="mt-3">
          <ColourSwitcher
            currentColor={currentColor}
            onColorChange={onColorChange}
          />
        </div>
      </div>

      {/* 2. VISUAL LENS (28–36px gap below ACCENT THEME) */}
      <div className="mt-8 relative" ref={dropdownRef}>
        {/* Label above dropdown button (12–16px gap) */}
        <div className="font-mono text-xs uppercase tracking-wider text-white/70 mb-3.5">
          VISUAL LENS
        </div>

        {/* Dropdown Trigger Button: Full width within mobile content container */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className="w-full h-12 px-4 flex items-center justify-between border border-white/25 rounded bg-white/5 hover:bg-white/10 active:bg-white/15 text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
        >
          <span>LENS · {currentLens.toUpperCase()}</span>
          <span className={`text-xs text-white/70 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
            ▾
          </span>
        </button>

        {/* Responsive Anchored Dropdown Menu: Matches trigger width, never overflows viewport */}
        {isOpen && (
          <div
            role="listbox"
            className="absolute left-0 right-0 top-full mt-2 w-full bg-[#111111] border border-white/25 rounded shadow-2xl z-30 overflow-hidden animate-in fade-in zoom-in-98 duration-150"
          >
            <div className="px-4 py-3 border-b border-white/10 font-mono text-[11px] uppercase tracking-wider text-white/50 flex items-center justify-between">
              <span>VISUAL LENS</span>
              <span className="text-[10px] text-white/40">Select lens</span>
            </div>

            <div className="max-h-64 overflow-y-auto divide-y divide-white/5">
              {lensOptions.map((opt) => {
                const isSelected = opt.id === currentLens;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onLensChange(opt.id);
                      setIsOpen(false);
                    }}
                    className={`w-full px-4 py-4 flex items-center justify-between text-left font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-white/15 text-white font-bold'
                        : 'text-white/70 hover:bg-white/5 hover:text-white active:bg-white/10'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span>{opt.label}</span>
                      <span className="text-[10px] text-white/40 normal-case tracking-normal mt-0.5 font-sans">
                        {opt.desc}
                      </span>
                    </div>
                    {isSelected && (
                      <span className="text-white text-sm font-bold">✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
