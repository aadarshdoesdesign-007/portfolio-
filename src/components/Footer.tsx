'use client';
import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 w-full mt-24 border-t-2 border-black/80 bg-[#E4E2D8]/95 px-5 sm:px-10 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Colophon & Identity */}
        <div className="space-y-2 max-w-md">
          <div className="font-pacaembu text-xl sm:text-2xl font-bold text-black flex items-center gap-2">
            <span>aadarsh ramakrishnan</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF4BB9]" />
          </div>
          <p className="text-sm font-mooli text-black/75 leading-relaxed">
            Multidisciplinary designer exploring UI/UX, complex system visualization, design research, and playful creative engineering.
          </p>
          <div className="text-xs font-mono text-black/60 pt-1">
            2026 © Aadarsh Ramakrishnan · Bengaluru, Karnataka · 12°58'N 77°35'E ⌁
          </div>
        </div>

        {/* Center / Right Links */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <a
            href="mailto:aadarshdoesdesign@gmail.com"
            className="px-5 py-2.5 rounded-full border-2 border-black bg-[#FFFF5F] text-black font-pacaembu font-bold text-sm shadow-[3px_3px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#000000] transition-all"
          >
            say hi ✉
          </a>

          <a
            href="https://www.linkedin.com/in/aadarsh-ramakrishnan-b46052293/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full border border-black bg-white/80 hover:bg-white text-black font-pacaembu text-sm font-semibold transition-all hover:shadow-[2px_2px_0px_#000000]"
          >
            LinkedIn ↗
          </a>

          <a
            href="https://github.com/aadarshdoesdesign"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full border border-black bg-white/80 hover:bg-white text-black font-pacaembu text-sm font-semibold transition-all hover:shadow-[2px_2px_0px_#000000]"
          >
            GitHub ↗
          </a>

          <Link
            href="/about"
            className="px-4 py-2 rounded-full border border-black bg-white/80 hover:bg-white text-black font-pacaembu text-sm font-semibold transition-all hover:shadow-[2px_2px_0px_#000000]"
          >
            about me →
          </Link>
        </div>
      </div>
    </footer>
  );
};
