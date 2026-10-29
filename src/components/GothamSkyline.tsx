'use client';

import React from 'react';
import { useGotham } from '@/context/GothamContext';

export const GothamSkyline: React.FC = () => {
  const { isGotham } = useGotham();

  if (!isGotham) return null;

  return (
    <div
      aria-hidden="true"
      className="absolute bottom-0 left-0 right-0 h-64 sm:h-80 pointer-events-none select-none overflow-hidden z-0"
    >
      <style>{`
        /* Rare, distant atmospheric sheet lightning (0.16s every 40s) */
        @keyframes gotham-skyline-lightning {
          0%, 93%, 94.2%, 94.6%, 100% {
            opacity: 0;
          }
          93.6% {
            opacity: 0.35;
          }
          94.4% {
            opacity: 0.6;
          }
        }

        /* Red Aviation Beacon Pulses */
        @keyframes beacon-pulse-slow {
          0%, 100% { opacity: 0.25; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.2); filter: drop-shadow(0 0 5px #FF3B30); }
        }

        .anim-sky-flash {
          animation: gotham-skyline-lightning 40s infinite ease-in-out;
        }
      `}</style>

      {/* Rare Distant Lightning Flash behind the skyline */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#FFE500]/10 via-[#B5D8FF]/20 to-transparent anim-sky-flash" />

      {/* Layered Architectural Gotham Skyline SVG */}
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        className="block w-full h-full"
      >
        <defs>
          {/* Distant Fogged Towers Gradient */}
          <linearGradient id="skyline-far-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#101726" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#0B0F19" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#06090E" stopOpacity="1" />
          </linearGradient>

          {/* Midground Gothic Skyscraper Gradient */}
          <linearGradient id="skyline-mid-grad-2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#141B29" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#0E1420" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#05070B" stopOpacity="1" />
          </linearGradient>

          {/* Foreground Rooftops Gradient */}
          <linearGradient id="skyline-near-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#090D14" />
            <stop offset="100%" stopColor="#020305" />
          </linearGradient>
        </defs>

        {/* -------------------------------------------------------------------
            1. DISTANT SKYLINE: Needle Spires & Suspension Bridge Towers
            ------------------------------------------------------------------- */}
        <path
          d="M 0 320
             L 0 180 L 30 180 L 35 120 L 40 70 L 45 70 L 50 120 L 55 180
             L 120 180 L 125 140 L 150 140 L 155 180
             L 220 180 L 225 100 L 230 50 L 235 50 L 240 100 L 250 180
             L 330 180 L 345 125 L 365 125 L 380 180
             L 450 180 L 455 90 L 460 40 L 465 40 L 470 90 L 480 180
             L 560 180 L 570 130 L 595 130 L 605 180
             L 690 180 L 700 80 L 705 30 L 710 30 L 715 80 L 725 180
             L 810 180 L 825 110 L 845 110 L 860 180
             L 930 180 L 940 90 L 945 45 L 950 45 L 955 90 L 965 180
             L 1040 180 L 1055 120 L 1075 120 L 1090 180
             L 1160 180 L 1170 80 L 1175 35 L 1180 35 L 1185 80 L 1195 180
             L 1280 180 L 1290 135 L 1315 135 L 1325 180
             L 1390 180 L 1400 95 L 1405 50 L 1410 50 L 1415 95 L 1425 180
             L 1440 180 L 1440 320 Z"
          fill="url(#skyline-far-grad)"
        />

        {/* Pulsing Red Aviation Warning Lights on High Spire Tips */}
        <circle cx="42" cy="68" r="2.2" fill="#FF3B30" style={{ animation: 'beacon-pulse-slow 2.5s infinite' }} />
        <circle cx="232" cy="48" r="2.2" fill="#FF3B30" style={{ animation: 'beacon-pulse-slow 2.9s infinite 0.5s' }} />
        <circle cx="462" cy="38" r="2.2" fill="#FF3B30" style={{ animation: 'beacon-pulse-slow 2.3s infinite 1.1s' }} />
        <circle cx="707" cy="28" r="2.5" fill="#FF3B30" style={{ animation: 'beacon-pulse-slow 2.7s infinite 0.3s' }} />
        <circle cx="947" cy="43" r="2.2" fill="#FF3B30" style={{ animation: 'beacon-pulse-slow 2.4s infinite 1.4s' }} />
        <circle cx="1177" cy="33" r="2.5" fill="#FF3B30" style={{ animation: 'beacon-pulse-slow 2.8s infinite 0.8s' }} />
        <circle cx="1407" cy="48" r="2.2" fill="#FF3B30" style={{ animation: 'beacon-pulse-slow 2.6s infinite 1.2s' }} />

        {/* -------------------------------------------------------------------
            2. MIDGROUND SKYLINE: Gothic Towers & Wayne Enterprises Centerpiece
            ------------------------------------------------------------------- */}
        <path
          d="M 0 320
             L 0 210 L 45 210 L 55 160 L 85 160 L 95 210
             L 140 210 L 150 140 L 175 120 L 205 140 L 215 210
             L 265 210 L 275 155 L 305 155 L 315 210
             L 370 210 L 380 130 L 400 105 L 425 130 L 435 210
             L 495 210 L 510 150 L 540 150 L 555 210
             L 610 210 L 620 120 L 640 95 L 665 120 L 675 210
             L 735 210 L 750 145 L 785 145 L 800 210
             {/* Wayne Enterprises Tower Centerpiece */}
             L 845 210 L 855 110 L 870 75 L 890 75 L 905 110 L 915 210
             L 970 210 L 985 140 L 1015 140 L 1030 210
             L 1080 210 L 1095 125 L 1115 105 L 1140 125 L 1155 210
             L 1215 210 L 1230 150 L 1260 150 L 1275 210
             L 1325 210 L 1340 130 L 1370 130 L 1385 210
             L 1440 210 L 1440 320 Z"
          fill="url(#skyline-mid-grad-2)"
        />

        {/* Wayne Tower Spire Signal Light */}
        <circle cx="880" cy="73" r="2.5" fill="#FFE500" opacity="0.9" className="animate-pulse" />

        {/* Lit Windows Clusters (Warm Amber Micro-Grids) */}
        <rect x="160" y="155" width="3.5" height="4.5" fill="#FFE500" opacity="0.5" />
        <rect x="170" y="155" width="3.5" height="4.5" fill="#FFE500" opacity="0.3" />
        <rect x="185" y="155" width="3.5" height="4.5" fill="#FFE500" opacity="0.55" />
        <rect x="160" y="166" width="3.5" height="4.5" fill="#FFE500" opacity="0.4" />
        <rect x="170" y="166" width="3.5" height="4.5" fill="#FFE500" opacity="0.6" />
        <rect x="185" y="166" width="3.5" height="4.5" fill="#FFE500" opacity="0.35" />

        <rect x="390" y="140" width="4" height="5" fill="#FFE500" opacity="0.45" />
        <rect x="400" y="140" width="4" height="5" fill="#FFE500" opacity="0.6" />
        <rect x="410" y="140" width="4" height="5" fill="#FFE500" opacity="0.35" />

        <rect x="872" y="125" width="4.5" height="5.5" fill="#FFE500" opacity="0.75" />
        <rect x="882" y="125" width="4.5" height="5.5" fill="#FFE500" opacity="0.5" />
        <rect x="872" y="140" width="4.5" height="5.5" fill="#FFE500" opacity="0.6" />
        <rect x="882" y="140" width="4.5" height="5.5" fill="#FFE500" opacity="0.7" />

        {/* -------------------------------------------------------------------
            3. FOREGROUND ROOFTOPS: Water Tanks, Antennae & Jagged Parapets
            ------------------------------------------------------------------- */}
        <path
          d="M 0 320
             L 0 250 L 75 250 L 80 220 L 120 220 L 125 250
             L 190 250 L 200 230 L 250 230 L 260 250
             L 340 250 L 345 215 L 385 215 L 390 250
             L 470 250 L 480 235 L 535 235 L 545 250
             L 630 250 L 635 220 L 675 220 L 680 250
             L 750 250 L 760 230 L 810 230 L 820 250
             L 880 250 L 890 238 L 980 238 L 990 120 L 1090 120 L 1100 238 L 1110 250
             L 1180 250 L 1190 230 L 1240 230 L 1250 250
             L 1320 250 L 1325 215 L 1365 215 L 1370 250
             L 1440 250 L 1440 320 Z"
          fill="url(#skyline-near-grad)"
        />

        {/* Foreground Rooftop Water Towers */}
        <path d="M 95 220 L 95 200 L 112 200 L 112 220 Z M 93 200 L 114 200 L 103.5 190 Z" fill="#040608" />
        <path d="M 360 215 L 360 195 L 377 195 L 377 215 Z M 358 195 L 379 195 L 368.5 185 Z" fill="#040608" />
        <path d="M 650 220 L 650 200 L 667 200 L 667 220 Z M 648 200 L 669 200 L 658.5 190 Z" fill="#040608" />
        <path d="M 1340 215 L 1340 195 L 1357 195 L 1357 215 Z M 1338 195 L 1359 195 L 1348.5 185 Z" fill="#040608" />
      </svg>
    </div>
  );
};
