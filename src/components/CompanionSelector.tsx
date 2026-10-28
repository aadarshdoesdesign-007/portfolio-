'use client';

import React from 'react';
import { useCompanion, CompanionMode } from '@/context/CompanionContext';

export const CompanionSelector: React.FC = () => {
  const { mode, setMode } = useCompanion();

  return (
    <div className="inline-flex flex-wrap items-center gap-2 p-1.5 sm:p-2 rounded-2xl bg-[#F9F3EB] border-2 border-black shadow-[3px_3px_0px_#000000] text-xs font-mono font-bold select-none transition-all">
      <span className="flex items-center gap-1.5 pl-1.5 text-black/80 font-pacaembu font-bold text-xs sm:text-sm">
        <span className="text-sm">💬</span>
        <span>Scared of spiders?</span>
      </span>

      <div className="relative">
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as CompanionMode)}
          aria-label="Choose your cursor companion mode"
          className="appearance-none bg-white hover:bg-[#FFFF5F] text-black font-pacaembu font-bold text-xs sm:text-sm px-3 py-1.5 pr-8 rounded-xl border border-black shadow-[1px_1px_0px_#000000] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FF4BB9] transition-all"
        >
          <option value="spider">🕷️ No, let the spider chase me!</option>
          <option value="dog">🐕 Yes, give me a dog chasing a ball!</option>
          <option value="ant-only">🐜 Just the ant, please. No chaser.</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black font-bold">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
