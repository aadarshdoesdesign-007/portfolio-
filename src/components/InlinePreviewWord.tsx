'use client';
import React, { useState, useRef, useEffect } from 'react';

interface InlinePreviewWordProps {
  word: string;
  imageSrc: string;
  imageAlt: string;
  label: string;
  meta?: string;
  align?: 'center' | 'left' | 'right';
}

export const InlinePreviewWord: React.FC<InlinePreviewWordProps> = ({
  word,
  imageSrc,
  imageAlt,
  label,
  meta,
  align = 'center'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Close on outside click if toggled on touch devices
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isOpen]);

  const handleToggle = (e: React.MouseEvent) => {
    if (isTouchDevice) {
      e.stopPropagation();
      setIsOpen((prev) => !prev);
    }
  };

  // Alignment positioning classes for the popup
  const alignClasses = {
    center: 'left-1/2 -translate-x-1/2 origin-bottom',
    left: 'left-0 origin-bottom-left',
    right: 'right-0 origin-bottom-right'
  }[align];

  return (
    <span className="relative inline-block whitespace-nowrap align-baseline">
      {/* Interactive inline typographic trigger */}
      <button
        ref={triggerRef}
        type="button"
        onMouseEnter={() => !isTouchDevice && setIsOpen(true)}
        onMouseLeave={() => !isTouchDevice && setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen((prev) => !prev);
          }
        }}
        className="inline text-inherit font-inherit cursor-pointer transition-all duration-200 border-b-2 border-white/40 hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--highlight-color)] pb-0.5"
        aria-expanded={isOpen}
        aria-label={`${word} (hover or tap to reveal work preview)`}
      >
        {word}
      </button>

      {/* Floating rectangular media reveal */}
      <div
        className={`absolute bottom-full ${alignClasses} mb-3.5 z-40 pointer-events-none transition-all duration-300 ease-out ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-[0.96] translate-y-1.5'
        }`}
      >
        <div className="w-[200px] sm:w-[230px] aspect-[16/10] overflow-hidden rounded-[3px] border border-white/30 bg-black/80 shadow-2xl backdrop-blur-sm relative">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover filter contrast-[1.06] brightness-[0.98]"
            loading="eager"
          />
          {/* Editorial label at bottom */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-2 flex items-center justify-between text-[10px] font-mono text-white tracking-tight">
            <span className="font-medium truncate pr-1">{label}</span>
            {meta && <span className="text-white/60 flex-shrink-0 text-[9px]">{meta}</span>}
          </div>
        </div>

        {/* Pointer notch */}
        <div
          className={`w-2 h-2 bg-black/80 border-r border-b border-white/30 rotate-45 -mt-1 ${
            align === 'center'
              ? 'mx-auto'
              : align === 'left'
              ? 'ml-6'
              : 'mr-6 ml-auto'
          }`}
        />
      </div>
    </span>
  );
};
