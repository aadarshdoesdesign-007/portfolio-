'use client';
import React from 'react';
import Link from 'next/link';
import { Project } from '@/content/projects';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, priority = false }) => {
  // Render bespoke schematic SVG illustrations matching the reference aesthetic
  const renderThumbnail = () => {
    switch (project.diagramType) {
      case 'matrix': // IIT Indore
        return (
          <svg viewBox="0 0 600 380" className="w-full h-full bg-[#F4F9FF]" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="380" fill="#F4F9FF"/>
            <rect x="24" y="24" width="552" height="332" rx="16" fill="#FFFFFF" stroke="#000000" strokeWidth="2"/>
            
            {/* Top header bar */}
            <rect x="24" y="24" width="552" height="48" rx="16" fill="#00ADE6"/>
            <rect x="24" y="56" width="552" height="16" fill="#00ADE6"/>
            <line x1="24" y1="72" x2="576" y2="72" stroke="#000000" strokeWidth="2"/>
            <circle cx="50" cy="48" r="6" fill="#FFFF5F" stroke="#000000" strokeWidth="1.5"/>
            <circle cx="68" cy="48" r="6" fill="#FF4BB9" stroke="#000000" strokeWidth="1.5"/>
            <circle cx="86" cy="48" r="6" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5"/>
            <text x="110" y="53" fontFamily="JetBrains Mono" fontSize="11" fontWeight="700" fill="#000000">IIT INDORE // 28 ETHNOGRAPHIES × 73 DISCIPLINES</text>

            {/* Matrix Cells */}
            <g transform="translate(48, 96)">
              {Array.from({ length: 8 }).map((_, r) =>
                Array.from({ length: 14 }).map((_, c) => {
                  const val = ((r * 7 + c * 13) % 10) / 10;
                  const fill = val > 0.6 ? '#00ADE6' : val > 0.3 ? '#B3D3FF' : '#F0F4F8';
                  return (
                    <rect
                      key={`${r}-${c}`}
                      x={c * 36}
                      y={r * 24}
                      width={28}
                      height={18}
                      rx={4}
                      fill={fill}
                      stroke="#000000"
                      strokeWidth="1"
                    />
                  );
                })
              )}
            </g>

            {/* Metric pill */}
            <rect x="48" y="304" width="220" height="32" rx="16" fill="#FFFF5F" stroke="#000000" strokeWidth="1.5"/>
            <text x="64" y="324" fontFamily="JetBrains Mono" fontSize="11" fontWeight="700" fill="#000000">RELATIONAL CORRELATION: 0.88</text>
          </svg>
        );

      case 'wireframe': // Stash FinTech
        return (
          <svg viewBox="0 0 600 380" className="w-full h-full bg-[#FFF5FA]" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="380" fill="#FFF5FA"/>
            <rect x="24" y="24" width="552" height="332" rx="16" fill="#FFFFFF" stroke="#000000" strokeWidth="2"/>

            {/* Mobile phone mock in center */}
            <g transform="translate(180, 40)">
              <rect width="240" height="300" rx="24" fill="#000000" stroke="#000000" strokeWidth="2"/>
              <rect x="6" y="6" width="228" height="288" rx="20" fill="#FFFFFF"/>
              {/* Notch */}
              <rect x="80" y="10" width="80" height="12" rx="6" fill="#000000"/>
              {/* Card visual inside phone */}
              <rect x="20" y="36" width="200" height="100" rx="14" fill="#FF4BB9" stroke="#000000" strokeWidth="1.5"/>
              <text x="36" y="60" fontFamily="sans-serif" fontSize="10" fontWeight="700" fill="#FFFFFF">STASH PULSE</text>
              <text x="36" y="94" fontFamily="sans-serif" fontSize="22" fontWeight="800" fill="#FFFFFF">₹ 4,820.00</text>
              <text x="36" y="118" fontFamily="JetBrains Mono" fontSize="9" fill="#FFFFFF">WEEKLY CASH VELOCITY</text>

              {/* Transactions */}
              <rect x="20" y="152" width="200" height="36" rx="8" fill="#F8FAFC" stroke="#000000" strokeWidth="1"/>
              <circle cx="38" cy="170" r="10" fill="#FFFF5F" stroke="#000000" strokeWidth="1"/>
              <text x="56" y="174" fontFamily="sans-serif" fontSize="10" fontWeight="700" fill="#000000">Campus Canteen</text>
              <text x="180" y="174" fontFamily="JetBrains Mono" fontSize="10" fontWeight="700" fill="#000000">-₹120</text>

              <rect x="20" y="196" width="200" height="36" rx="8" fill="#F8FAFC" stroke="#000000" strokeWidth="1"/>
              <circle cx="38" cy="214" r="10" fill="#00ADE6" stroke="#000000" strokeWidth="1"/>
              <text x="56" y="218" fontFamily="sans-serif" fontSize="10" fontWeight="700" fill="#000000">Metro Transit UPI</text>
              <text x="186" y="218" fontFamily="JetBrains Mono" fontSize="10" fontWeight="700" fill="#000000">-₹45</text>
            </g>

            {/* Floating sticky badges */}
            <g transform="translate(48, 120)">
              <rect width="110" height="40" rx="8" fill="#FFFF5F" stroke="#000000" strokeWidth="1.5" transform="rotate(-6)"/>
              <text x="14" y="26" fontFamily="sans-serif" fontSize="11" fontWeight="800" fill="#000000" transform="rotate(-6)">RECALL GAP</text>
            </g>

            <g transform="translate(430, 180)">
              <rect width="120" height="40" rx="8" fill="#00ADE6" stroke="#000000" strokeWidth="1.5" transform="rotate(5)"/>
              <text x="14" y="25" fontFamily="sans-serif" fontSize="11" fontWeight="800" fill="#FFFFFF" transform="rotate(5)">SENSORY HAPTIC</text>
            </g>
          </svg>
        );

      case 'chart': // Iterative Archaeology
        return (
          <svg viewBox="0 0 600 380" className="w-full h-full bg-[#FFFDEB]" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="380" fill="#FFFDEB"/>
            <rect x="24" y="24" width="552" height="332" rx="16" fill="#FFFFFF" stroke="#000000" strokeWidth="2"/>

            {/* Archival stone temple illustration */}
            <path d="M 60 280 L 100 280 L 100 160 L 140 160 L 140 120 L 200 80 L 260 120 L 260 160 L 300 160 L 300 280 Z" stroke="#000000" strokeWidth="2.5" fill="#F4EDE0"/>
            <circle cx="200" cy="80" r="12" fill="#FFFF5F" stroke="#000000" strokeWidth="2"/>
            <line x1="200" y1="92" x2="200" y2="280" stroke="#000000" strokeWidth="1.5" strokeDasharray="4 4"/>

            {/* AI reconstruction comparison curve */}
            <g transform="translate(320, 80)">
              <rect width="220" height="160" rx="12" fill="#F8FAFC" stroke="#000000" strokeWidth="1.5"/>
              <text x="16" y="28" fontFamily="JetBrains Mono" fontSize="9" fontWeight="700" fill="#000000">LATENT GUIDANCE FIDELITY</text>
              <line x1="20" y1="130" x2="200" y2="130" stroke="#000000" strokeWidth="1"/>
              <line x1="20" y1="40" x2="20" y2="130" stroke="#000000" strokeWidth="1"/>

              {/* Curve */}
              <path d="M 24 120 Q 80 110, 120 70 T 190 50" stroke="#FF4BB9" strokeWidth="3" fill="none"/>
              <path d="M 24 125 Q 90 120, 140 90 T 190 75" stroke="#00ADE6" strokeWidth="2" strokeDasharray="4 3" fill="none"/>
            </g>

            {/* Aarohan Banner */}
            <rect x="320" y="260" width="220" height="36" rx="8" fill="#FFFF5F" stroke="#000000" strokeWidth="1.5"/>
            <text x="336" y="283" fontFamily="JetBrains Mono" fontSize="10" fontWeight="800" fill="#000000">AAROHAN // IIT DELHI SHOWCASE</text>
          </svg>
        );

      case 'system': // Rubbix Robotics HMI
        return (
          <svg viewBox="0 0 600 380" className="w-full h-full bg-[#F4FAF0]" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="380" fill="#F4FAF0"/>
            <rect x="24" y="24" width="552" height="332" rx="16" fill="#FFFFFF" stroke="#000000" strokeWidth="2"/>

            {/* Radar circles */}
            <circle cx="300" cy="180" r="110" stroke="#90CD26" strokeWidth="2" strokeDasharray="6 4"/>
            <circle cx="300" cy="180" r="60" stroke="#000000" strokeWidth="1.5"/>
            <line x1="300" y1="40" x2="300" y2="320" stroke="#000000" strokeWidth="1"/>
            <line x1="160" y1="180" x2="440" y2="180" stroke="#000000" strokeWidth="1"/>

            {/* Flight horizon */}
            <line x1="210" y1="170" x2="390" y2="170" stroke="#00ADE6" strokeWidth="3"/>
            <circle cx="300" cy="170" r="6" fill="#00ADE6" stroke="#000000" strokeWidth="1.5"/>

            {/* Telemetry pill badges */}
            <g transform="translate(48, 50)">
              <rect width="130" height="46" rx="10" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5"/>
              <text x="12" y="20" fontFamily="JetBrains Mono" fontSize="8" fill="#666666">ALTITUDE MSL</text>
              <text x="12" y="38" fontFamily="JetBrains Mono" fontSize="14" fontWeight="800" fill="#000000">1,420 M</text>
            </g>

            <g transform="translate(422, 50)">
              <rect width="130" height="46" rx="10" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5"/>
              <text x="12" y="20" fontFamily="JetBrains Mono" fontSize="8" fill="#666666">AIRSPEED</text>
              <text x="12" y="38" fontFamily="JetBrains Mono" fontSize="14" fontWeight="800" fill="#000000">68 KTS</text>
            </g>

            <g transform="translate(48, 270)">
              <rect width="150" height="46" rx="10" fill="#90CD26" stroke="#000000" strokeWidth="1.5"/>
              <text x="14" y="20" fontFamily="JetBrains Mono" fontSize="8" fill="#000000">AUTONOMOUS LINK</text>
              <text x="14" y="38" fontFamily="JetBrains Mono" fontSize="14" fontWeight="800" fill="#000000">ONLINE · 99.4%</text>
            </g>
          </svg>
        );

      case 'brand': // Nudge / Katha
        return (
          <svg viewBox="0 0 600 380" className="w-full h-full bg-[#FFF7EE]" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="380" fill="#FFF7EE"/>
            <rect x="24" y="24" width="552" height="332" rx="16" fill="#FFFFFF" stroke="#000000" strokeWidth="2"/>

            {/* Split layout: Prompt Canvas */}
            <rect x="48" y="56" width="240" height="268" rx="12" fill="#F8FAFC" stroke="#000000" strokeWidth="1.5"/>
            <rect x="48" y="56" width="240" height="36" rx="12" fill="#FF6100"/>
            <rect x="48" y="80" width="240" height="12" fill="#FF6100"/>
            <line x1="48" y1="92" x2="288" y2="92" stroke="#000000" strokeWidth="1.5"/>
            <text x="64" y="79" fontFamily="sans-serif" fontSize="11" fontWeight="800" fill="#FFFFFF">PROMPT INTENT CANVAS</text>

            <rect x="64" y="110" width="208" height="60" rx="8" fill="#FFFFFF" stroke="#000000" strokeWidth="1"/>
            <text x="76" y="132" fontFamily="JetBrains Mono" fontSize="9" fill="#000000">Drafting spatial UI tokens...</text>
            <text x="76" y="152" fontFamily="JetBrains Mono" fontSize="8" fill="#FF6100">✦ Nudge: add constraint?</text>

            <rect x="64" y="184" width="130" height="28" rx="14" fill="#FFFF5F" stroke="#000000" strokeWidth="1"/>
            <text x="78" y="202" fontFamily="sans-serif" fontSize="9" fontWeight="700" fill="#000000">+ WCAG AAA Mode</text>

            {/* ACM SIGCHI Badge */}
            <g transform="translate(320, 110)">
              <circle cx="110" cy="90" r="75" fill="#FFFF5F" stroke="#000000" strokeWidth="2"/>
              <text x="110" y="80" textAnchor="middle" fontFamily="sans-serif" fontSize="13" fontWeight="900" fill="#000000">ACM SIGCHI</text>
              <text x="110" y="100" textAnchor="middle" fontFamily="sans-serif" fontSize="12" fontWeight="800" fill="#FF6100">2ND PLACE</text>
              <text x="110" y="118" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fill="#000000">HACKATHON '26</text>
            </g>
          </svg>
        );

      default: // Wayfinding / Slanted
        return (
          <svg viewBox="0 0 600 380" className="w-full h-full bg-[#F4F9F8]" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="380" fill="#F4F9F8"/>
            <rect x="24" y="24" width="552" height="332" rx="16" fill="#FFFFFF" stroke="#000000" strokeWidth="2"/>

            {/* Topographical trail */}
            <path d="M 60 300 C 140 260, 220 290, 300 220 C 380 150, 420 170, 520 90" stroke="#000000" strokeWidth="3" fill="none"/>
            <path d="M 120 320 C 200 240, 240 160, 360 120 C 440 90, 480 60, 540 50" stroke="#90CD26" strokeWidth="2.5" strokeDasharray="6 4" fill="none"/>

            <circle cx="140" cy="260" r="16" fill="#FFFF5F" stroke="#000000" strokeWidth="2"/>
            <text x="140" y="265" fontFamily="JetBrains Mono" fontSize="10" fontWeight="800" textAnchor="middle" fill="#000000">01</text>

            <circle cx="300" cy="220" r="16" fill="#FF4BB9" stroke="#000000" strokeWidth="2"/>
            <text x="300" y="225" fontFamily="JetBrains Mono" fontSize="10" fontWeight="800" textAnchor="middle" fill="#FFFFFF">02</text>

            <circle cx="440" cy="140" r="16" fill="#00ADE6" stroke="#000000" strokeWidth="2"/>
            <text x="440" y="145" fontFamily="JetBrains Mono" fontSize="10" fontWeight="800" textAnchor="middle" fill="#FFFFFF">03</text>
          </svg>
        );
    }
  };

  return (
    <article className="group relative block w-full">
      <Link href={`/work/${project.slug}`} className="block focus:outline-none">
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative rounded-3xl bg-[#F9F3EB] border-2 border-black p-4 sm:p-5 shadow-[4px_4px_0px_#000000] hover:shadow-[7px_7px_0px_#000000] transition-shadow duration-200 overflow-hidden flex flex-col justify-between"
        >
          {/* Card Visual Header / Media */}
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-black/30 bg-white">
            <div className="w-full h-full transform transition-transform duration-500 group-hover:scale-[1.03]">
              {renderThumbnail()}
            </div>

            {/* Corner Badge */}
            {project.coverBadge && (
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 border border-black text-[10px] font-mono font-bold tracking-wider text-black shadow-[1px_1px_0px_#000000]">
                {project.coverBadge}
              </div>
            )}

            {/* Year Tag */}
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black text-white text-[10px] font-mono font-semibold">
              {project.year}
            </div>
          </div>

          {/* Card Metadata & Content */}
          <div className="mt-5 space-y-2.5">
            {/* Category / Discipline Pill */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="px-3 py-0.5 rounded-full text-xs font-pacaembu font-bold tracking-wide border border-black"
                style={{ backgroundColor: project.accentColor, color: project.accentColor === '#000000' ? '#ffffff' : '#000000' }}
              >
                {project.category}
              </span>
              <span className="text-xs font-mono text-black/60">
                {project.clientOrOrg}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-pacaembu text-lg sm:text-xl font-bold tracking-tight text-black group-hover:text-[#FF4BB9] transition-colors leading-snug">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm font-mooli text-black/75 line-clamp-2 leading-relaxed">
              {project.tagline || project.description}
            </p>

            {/* Tags footer */}
            <div className="pt-2 flex flex-wrap gap-1.5 items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-white border border-black/30 text-[10px] font-mono text-black/80"
                  >
                    #{tag.toLowerCase().replace(/\s+/g, '')}
                  </span>
                ))}
              </div>

              {/* Arrow button icon */}
              <div className="w-7 h-7 rounded-full border border-black bg-white flex items-center justify-center text-black font-bold group-hover:bg-[#FFFF5F] group-hover:translate-x-1 transition-all">
                ↗
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </article>
  );
};
