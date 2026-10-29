'use client';
import React from 'react';
import Link from 'next/link';
import { useGotham } from '@/context/GothamContext';

export const Footer: React.FC = () => {
  const { isGotham } = useGotham();

  return (
    <footer
      className={`relative z-10 w-full mt-24 border-t-2 px-5 sm:px-10 py-12 sm:py-16 transition-colors duration-400 ${
        isGotham
          ? 'bg-[#080A0F]/95 border-[#303540]'
          : 'bg-[#E4E2D8]/95 border-black/80'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Colophon & Identity */}
        <div className="space-y-2 max-w-md">
          <div className="font-pacaembu text-xl sm:text-2xl font-bold flex items-center gap-2">
            <span className={isGotham ? 'text-[#F3F1E9]' : 'text-black'}>aadarsh ramakrishnan</span>
            <span className={`w-2.5 h-2.5 rounded-full ${isGotham ? 'bg-[#FFE500]' : 'bg-[#FF4BB9]'}`} />
          </div>
          <p className={`text-sm font-mooli leading-relaxed ${isGotham ? 'text-[#A4A9B4]' : 'text-black/75'}`}>
            Multidisciplinary designer exploring UI/UX, complex system visualization, design research, and playful creative engineering.
          </p>
          <div className={`text-xs font-mono pt-1 ${isGotham ? 'text-[#7E8696]' : 'text-black/60'}`}>
            2026 © Aadarsh Ramakrishnan · Bengaluru, Karnataka · 12°58'N 77°35'E ⌁
          </div>
        </div>

        {/* Center / Right Links */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <a
            href="mailto:aadarshdoesdesign@gmail.com"
            className={`px-5 py-2.5 rounded-full border-2 font-pacaembu font-bold text-sm transition-all ${
              isGotham
                ? 'border-[#FFE500] bg-[#FFE500] text-[#080A0F] shadow-[3px_3px_0px_#000000] hover:shadow-[0_0_14px_rgba(255,229,0,0.5)]'
                : 'border-black bg-[#FFFF5F] text-black shadow-[3px_3px_0px_#000000] hover:shadow-[1px_1px_0px_#000000]'
            } hover:translate-x-0.5 hover:translate-y-0.5`}
          >
            say hi ✉
          </a>

          <a
            href="https://www.linkedin.com/in/aadarsh-ramakrishnan-b46052293/"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 py-2 rounded-full border font-pacaembu text-sm font-semibold transition-all ${
              isGotham
                ? 'border-[#303540] bg-[#11151D] text-[#F3F1E9] hover:border-[#FFE500] hover:text-[#FFE500]'
                : 'border-black bg-white/80 hover:bg-white text-black hover:shadow-[2px_2px_0px_#000000]'
            }`}
          >
            LinkedIn ↗
          </a>

          <a
            href="https://github.com/aadarshdoesdesign"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 py-2 rounded-full border font-pacaembu text-sm font-semibold transition-all ${
              isGotham
                ? 'border-[#303540] bg-[#11151D] text-[#F3F1E9] hover:border-[#FFE500] hover:text-[#FFE500]'
                : 'border-black bg-white/80 hover:bg-white text-black hover:shadow-[2px_2px_0px_#000000]'
            }`}
          >
            GitHub ↗
          </a>

          <Link
            href="/about"
            className={`px-4 py-2 rounded-full border font-pacaembu text-sm font-semibold transition-all ${
              isGotham
                ? 'border-[#303540] bg-[#11151D] text-[#F3F1E9] hover:border-[#FFE500] hover:text-[#FFE500]'
                : 'border-black bg-white/80 hover:bg-white text-black hover:shadow-[2px_2px_0px_#000000]'
            }`}
          >
            about me →
          </Link>
        </div>
      </div>
    </footer>
  );
};
