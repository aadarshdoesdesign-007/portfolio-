'use client';
import React from 'react';
import Link from 'next/link';
import { useGotham } from '@/context/GothamContext';

export const Footer: React.FC = () => {
  const { isGotham } = useGotham();

  return (
    <footer
      className={`relative z-10 w-full mt-24 border-t-2 px-5 sm:px-10 py-12 sm:py-16 transition-colors duration-400 overflow-hidden ${
        isGotham
          ? 'bg-[#080A0F]/95 border-[#303540]'
          : 'bg-[#E4E2D8]/95 border-black/80'
      }`}
    >
      {/* Subtle Illuminated Skyline Silhouette at end of page (Gotham mode) */}
      {isGotham && (
        <div className="absolute top-0 left-0 right-0 h-12 pointer-events-none opacity-30 overflow-hidden">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M 0 60 L 0 35 L 60 35 L 70 20 L 95 20 L 105 35 L 200 35 L 210 15 L 225 15 L 235 35 L 380 35 L 390 25 L 420 25 L 430 35 L 580 35 L 590 10 L 600 10 L 610 35 L 750 35 L 760 22 L 790 22 L 800 35 L 940 35 L 950 15 L 965 15 L 975 35 L 1100 35 L 1110 25 L 1140 25 L 1150 35 L 1280 35 L 1290 12 L 1300 12 L 1310 35 L 1440 35 L 1440 60 Z"
              fill="#FFE500"
              opacity="0.12"
            />
          </svg>
        </div>
      )}

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
        {/* Colophon & Identity */}
        <div className="space-y-2 max-w-md">
          <div className="font-pacaembu text-xl sm:text-2xl font-bold flex items-center gap-2">
            <span className={isGotham ? 'text-[#F3F1E9]' : 'text-black'}>aadarsh ramakrishnan</span>
            <span className={`w-2.5 h-2.5 rounded-full ${isGotham ? 'bg-[#FFE500]' : 'bg-[#FF4BB9]'}`} />
            {isGotham && (
              <svg viewBox="0 0 24 14" width="16" height="10" className="inline ml-1 opacity-75">
                <path
                  d="M 12 3 C 11.4 2, 11 0.5, 10.5 0 C 10 0.5, 9.6 2, 9 3 C 7.5 2.5, 5 2, 1 4 C 3 6.5, 5 8, 4.5 10 C 6.5 9, 8.5 10, 9 12 C 10 11, 11 11.5, 12 14 C 13 11.5, 14 11, 15 12 C 15.5 10, 17.5 9, 19.5 10 C 19 8, 21 6.5, 23 4 C 19 2, 16.5 2.5, 15 3 C 14.4 2, 14 0.5, 13.5 0 C 13 0.5, 12.6 2, 12 3 Z"
                  fill="#FFE500"
                />
              </svg>
            )}
          </div>
          <p className={`text-sm font-mooli leading-relaxed ${isGotham ? 'text-[#A4A9B4]' : 'text-black/75'}`}>
            Multidisciplinary designer exploring UI/UX, complex system visualization, design research, and playful creative engineering.
          </p>
          <div className={`text-xs font-mono pt-1 ${isGotham ? 'text-[#7E8696]' : 'text-black/60'}`}>
            2026 © Aadarsh Ramakrishnan · Bengaluru, Karnataka · 12°58&apos;N 77°35&apos;E ⌁
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
