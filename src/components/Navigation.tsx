'use client';
import React, { useState, useEffect } from 'react';
import { ColourSwitcher, ThemeColor } from './ColourSwitcher';
import { LensSelector } from './LensSelector';
import { DesignLens } from '@/types';

interface NavigationProps {
  currentColor: ThemeColor;
  onColorChange: (color: ThemeColor) => void;
  activeSection: string;
  currentLens: DesignLens;
  onLensChange: (lens: DesignLens) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentColor,
  onColorChange,
  activeSection,
  currentLens,
  onLensChange
}) => {
  const [rotation, setRotation] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setRotation(scrollY * 0.4);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { num: '01', title: 'About', href: '#about', id: 'about' },
    { num: '02', title: 'Projects', href: '#projects', id: 'projects' },
    { num: '03', title: 'Vita', href: '#vita', id: 'vita' }
  ];

  return (
    <>
      <nav 
        className="sticky top-0 z-40 w-full bg-[var(--background)] h-14 sm:h-16 transition-colors duration-400 md:fixed md:top-0 md:left-0 md:right-0 md:h-[88px] md:bg-transparent md:pointer-events-none md:z-30"
      >
        {/* Mobile Header (320px - 767px): Art-directed 56px-64px bar, 20-24px side padding */}
        <div className="flex md:hidden h-full px-5 sm:px-6 items-center justify-between w-full pointer-events-auto">
          {/* Brand Identity: Radial Mark + Handwritten Aadarsh Signature */}
          <div className="flex items-center gap-3">
            {/* Radial Mark */}
            <a 
              href="#" 
              aria-label="Scroll to top"
              className="relative block w-6 h-6 cursor-pointer group flex-shrink-0"
              title="Aadarsh R — Scroll to top"
            >
              <div 
                className="w-full h-full relative"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-colors duration-300"
                    style={{
                      width: '2px',
                      height: '100%',
                      backgroundColor: 'var(--accent)',
                      transform: `translate(-50%, -50%) rotate(${(180 / 8) * i}deg)`
                    }}
                  />
                ))}
              </div>
            </a>

            {/* Handwritten Signature */}
            <a
              href="#"
              aria-label="Aadarsh signature - Scroll to top"
              className="inline-flex items-center cursor-pointer transition-opacity duration-200 hover:opacity-80"
              title="Aadarsh — Scroll to top"
            >
              <span
                className="inline-block transition-colors duration-300"
                style={{
                  width: '64px',
                  height: '20px',
                  backgroundColor: 'var(--accent)',
                  WebkitMaskImage: `url('/images/aadarsh_signature.png')`,
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'left center',
                  maskImage: `url('/images/aadarsh_signature.png')`,
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'left center',
                }}
              />
            </a>
          </div>

          {/* Mobile Right: Colour Switcher + Hamburger Menu Button */}
          <div className="flex items-center gap-2">
            <ColourSwitcher
              currentColor={currentColor}
              onColorChange={onColorChange}
            />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded bg-white/10 hover:bg-white/20 transition-colors text-white"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-white transition-all duration-300 ${
                    mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-white transition-all duration-300 ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Desktop Header (>= 768px): Pristine 6-column gridRow wrapped in hidden md:block */}
        <div className="hidden md:block h-full">
          <div className="gridRow h-full items-center">
            {/* Top-Left Brand Identity: Radial Mark + Handwritten Aadarsh Signature */}
            <div className="grid_1-2 flex items-center gap-3.5 pointer-events-auto">
            {/* 1. THE CIRCULAR / RADIAL MARK */}
            <a 
              href="#" 
              aria-label="Scroll to top"
              className="relative block w-7 h-7 cursor-pointer group flex-shrink-0"
              title="Aadarsh R — Scroll to top"
            >
              <div 
                className="w-full h-full relative"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-colors duration-300"
                    style={{
                      width: '2px',
                      height: '100%',
                      backgroundColor: 'var(--accent)',
                      transform: `translate(-50%, -50%) rotate(${(180 / 8) * i}deg)`
                    }}
                  />
                ))}
              </div>
            </a>

            {/* 2. HANDWRITTEN "Aadarsh" SIGNATURE LOGO */}
            <a
              href="#"
              aria-label="Aadarsh signature - Scroll to top"
              className="inline-flex items-center cursor-pointer transition-opacity duration-200 hover:opacity-80"
              title="Aadarsh — Scroll to top"
            >
              <span
                className="inline-block transition-colors duration-300"
                style={{
                  width: '68px',
                  height: '22px',
                  backgroundColor: 'var(--accent)',
                  WebkitMaskImage: `url('/images/aadarsh_signature.png')`,
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'left center',
                  maskImage: `url('/images/aadarsh_signature.png')`,
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'left center',
                }}
              />
            </a>
          </div>

          {/* Desktop Navigation Links: 01 02 03 */}
          <div className="grid_3-4 hidden md:flex items-center justify-center pointer-events-auto">
            <ul className="flex items-center space-x-1 font-sans text-[15px] font-normal tracking-tight group/nav">
              {navLinks.map((link) => {
                const isCurrent = activeSection === link.id;

                if (currentLens === 'swiss') {
                  return (
                    <li key={link.num}>
                      <a
                        href={link.href}
                        className={`group flex items-center px-3 py-1 font-sans text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                          isCurrent
                            ? 'bg-white text-black'
                            : 'text-white/80 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <span className="font-mono mr-1.5">{link.num}</span>
                        <span>{link.title}</span>
                      </a>
                    </li>
                  );
                }

                if (currentLens === 'brutalist') {
                  return (
                    <li key={link.num}>
                      <a
                        href={link.href}
                        className={`flex items-center px-2.5 py-1 font-mono text-xs uppercase tracking-tight transition-transform duration-100 ${
                          isCurrent
                            ? 'bg-white text-black font-bold shadow-[2px_2px_0px_white]'
                            : 'border border-white/60 text-white hover:bg-white hover:text-black'
                        }`}
                      >
                        <span>[{link.num}/{link.title}]</span>
                      </a>
                    </li>
                  );
                }

                if (currentLens === 'editorial') {
                  const roman = link.num === '01' ? 'I' : link.num === '02' ? 'II' : 'III';
                  return (
                    <li key={link.num}>
                      <a
                        href={link.href}
                        className={`group flex items-center px-3 py-1 font-serif text-sm tracking-wide transition-all duration-200 ${
                          isCurrent
                            ? 'text-white italic underline underline-offset-4 decoration-white/60 font-medium'
                            : 'text-white/70 hover:text-white'
                        }`}
                      >
                        <span className="font-mono text-xs mr-1.5 opacity-60 not-italic">{roman}.</span>
                        <span>{link.title}</span>
                      </a>
                    </li>
                  );
                }

                if (currentLens === 'maximalist') {
                  return (
                    <li key={link.num}>
                      <a
                        href={link.href}
                        className={`group flex items-center px-3 py-1 text-xs font-black uppercase tracking-wider transition-all duration-150 ${
                          isCurrent
                            ? 'bg-white text-black shadow-[3px_3px_0px_rgba(255,255,255,0.4)]'
                            : 'bg-white/10 text-white hover:bg-white/20 border border-white/30'
                        }`}
                      >
                        <span className="font-mono mr-1">{link.num}</span>
                        <span>{link.title}</span>
                      </a>
                    </li>
                  );
                }

                if (currentLens === 'experimental') {
                  return (
                    <li key={link.num}>
                      <a
                        href={link.href}
                        className={`group flex items-center px-2 py-0.5 font-mono text-xs tracking-wider transition-colors duration-150 ${
                          isCurrent
                            ? 'text-white border border-white/80 bg-white/15'
                            : 'text-white/60 border border-transparent hover:border-white/30 hover:text-white'
                        }`}
                      >
                        <span className="text-[10px] text-white/50 mr-1">LOC::</span>
                        <span className="font-bold">{link.num}</span>
                        <span className="ml-1 opacity-70">_{link.title.toUpperCase()}</span>
                      </a>
                    </li>
                  );
                }

                // Default & Minimal Master Navigation
                return (
                  <li key={link.num}>
                    <a
                      href={link.href}
                      className={`group flex items-center px-2.5 py-1 rounded transition-colors duration-200 ${
                        isCurrent
                          ? 'bg-white/20 text-white font-medium'
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span className="w-6 font-mono text-[13px] opacity-75">
                        {link.num}
                      </span>
                      <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-xs group-hover/nav:max-w-xs">
                        {link.title}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Desktop Controls: 6-Colour Switcher + Subtle Lens Dropdown Below */}
          <div className="grid_5-6 hidden md:flex flex-col items-end justify-center pointer-events-auto gap-0.5">
            <ColourSwitcher
              currentColor={currentColor}
              onColorChange={onColorChange}
            />
            <LensSelector
              currentLens={currentLens}
              onLensChange={onLensChange}
            />
          </div>
        </div>
      </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[var(--background)] text-white pt-24 px-6 pb-12 flex flex-col justify-between md:hidden animate-in fade-in duration-200">
          <ul className="space-y-6 font-sans text-2xl font-light">
            {navLinks.map((link) => (
              <li key={link.num}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-4 text-white hover:text-white/80 transition-colors py-2 border-b border-white/20"
                >
                  <span className="font-mono text-sm text-white/60 font-medium">
                    {link.num}
                  </span>
                  <span>{link.title}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="pt-6 border-t border-white/20 text-xs font-mono text-white/50 flex items-center justify-between">
            <span>Aadarsh R — Portfolio</span>
            <span>2026</span>
          </div>
        </div>
      )}
    </>
  );
};
