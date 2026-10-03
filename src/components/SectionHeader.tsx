'use client';
import React from 'react';
import { useLens } from '@/context/LensContext';

interface SectionHeaderProps {
  number: string;
  title: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  title,
  className = ''
}) => {
  const { lens } = useLens();

  if (lens === 'swiss') {
    return (
      <h3 className={`font-sans text-xl sm:text-2xl font-black text-white mb-8 flex items-center ${className}`}>
        <span className="bg-white text-black font-mono font-bold px-2 py-0.5 mr-3 text-sm tracking-widest">
          {number}
        </span>
        <span className="font-extrabold uppercase tracking-tight">
          {title}
        </span>
      </h3>
    );
  }

  if (lens === 'brutalist') {
    return (
      <h3 className={`font-mono text-xl sm:text-2xl font-bold text-white mb-8 flex items-center ${className}`}>
        <span className="text-white mr-2">[{number} //</span>
        <span className="uppercase tracking-wider">{title}]</span>
      </h3>
    );
  }

  if (lens === 'editorial') {
    return (
      <h3 className={`font-serif text-2xl sm:text-3xl italic text-white mb-8 flex items-baseline ${className}`}>
        <span className="text-white/60 mr-3 text-base sm:text-lg font-normal tracking-wide not-italic font-mono">
          §{number} —
        </span>
        <span className="font-normal tracking-normal">
          {title}
        </span>
      </h3>
    );
  }

  if (lens === 'maximalist') {
    return (
      <h3 className={`font-sans text-2xl sm:text-3xl font-black text-white mb-8 flex items-center ${className}`}>
        <span className="bg-white text-black font-mono font-black px-2.5 py-1 mr-3 text-sm shadow-[3px_3px_0px_rgba(255,255,255,0.4)]">
          {number}
        </span>
        <span className="uppercase tracking-wider">
          {title}
        </span>
      </h3>
    );
  }

  if (lens === 'experimental') {
    return (
      <h3 className={`font-mono text-lg sm:text-xl font-normal text-white mb-8 flex items-center gap-2 ${className}`}>
        <span className="text-white/60">SYS.{number} //</span>
        <span className="uppercase tracking-widest font-semibold">{title}</span>
        <span className="text-[10px] text-white/50 tracking-wider ml-2 border border-white/30 px-1.5 py-0.5 border-dashed">
          ▲ ACTIVE_STREAM
        </span>
      </h3>
    );
  }

  if (lens === 'minimal') {
    return (
      <h3 className={`font-sans text-xl sm:text-2xl font-light text-white mb-8 flex items-baseline ${className}`}>
        <span className="inline-block w-8 font-mono text-white/40 text-sm">
          {number}
        </span>
        <span className="font-light tracking-tight text-white/90">
          {title}
        </span>
      </h3>
    );
  }

  // Exact Default Master Design
  return (
    <h3 className={`font-sans text-xl sm:text-2xl font-normal text-white mb-8 flex items-baseline ${className}`}>
      <span className="inline-block w-[var(--grid-sub-gap)] font-mono text-white/60 font-medium text-lg sm:text-xl">
        {number}
      </span>
      <span className="font-normal tracking-tight">
        {title}
      </span>
    </h3>
  );
};

