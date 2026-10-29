'use client';

import React from 'react';
import { useGotham } from '@/context/GothamContext';

export const BatSignalHero: React.FC = () => {
  const { isGotham } = useGotham();

  if (!isGotham) return null;

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0"
    >
      <style>{`
        /* 1. Dramatic Slow Sweep of the Bat-Signal Projector & Beam across Gotham Sky */
        @keyframes batsignal-beam-sweep {
          0% {
            transform: rotate(-7deg);
          }
          50% {
            transform: rotate(5deg);
          }
          100% {
            transform: rotate(-7deg);
          }
        }

        /* 2. Slow Drifting Storm Clouds in Upper Sky */
        @keyframes gotham-cloud-drift-1 {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        @keyframes gotham-cloud-drift-2 {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        /* 3. Rare, Brief Distant Sheet Lightning (40s cycle, flashes for 160ms) */
        @keyframes gotham-distant-sheet-lightning {
          0%, 93%, 94.2%, 94.6%, 100% {
            opacity: 0;
          }
          93.5% {
            opacity: 0.35;
          }
          94.4% {
            opacity: 0.55;
          }
        }

        /* 4. Fine Atmospheric Rain Mist */
        @keyframes gotham-fine-rain {
          0% {
            background-position: 0px 0px;
          }
          100% {
            background-position: -40px 650px;
          }
        }

        /* 5. Aviation Tower Warning Light Pulse */
        @keyframes beacon-pulse-red {
          0%, 100% { opacity: 0.2; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.15); filter: drop-shadow(0 0 6px #FF3B30); }
        }

        .anim-beam-sweep {
          transform-origin: 75% 92%;
          animation: batsignal-beam-sweep 24s ease-in-out infinite;
        }

        @media (max-width: 640px) {
          .anim-beam-sweep {
            transform-origin: 50% 92%;
          }
        }

        .anim-clouds-far {
          animation: gotham-cloud-drift-1 90s linear infinite;
        }

        .anim-clouds-near {
          animation: gotham-cloud-drift-2 65s linear infinite;
        }

        .anim-lightning {
          animation: gotham-distant-sheet-lightning 38s infinite ease-in-out;
        }

        .gotham-rain-mist {
          background-image: repeating-linear-gradient(
            110deg,
            transparent,
            transparent 55px,
            rgba(255, 255, 255, 0.025) 56px,
            transparent 58px
          );
          background-size: 160px 320px;
          animation: gotham-fine-rain 2.4s linear infinite;
        }
      `}</style>

      {/* =========================================================================
          LAYER 1: NIGHT SKY, CLOUDS & RARE DISTANT LIGHTNING
          ========================================================================= */}
      {/* Deep Night Atmosphere Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070B] via-[#080A0F] to-[#0A0D14]" />

      {/* Rare Distant Sheet Lightning Illumination */}
      <div className="absolute inset-0 bg-radial-at-t from-[#B0D4FF]/30 via-[#FFE500]/10 to-transparent anim-lightning" />

      {/* Drifting Storm Cloud Layer 1 (Far) */}
      <div className="absolute top-0 left-0 w-[200%] h-96 opacity-40 anim-clouds-far pointer-events-none">
        <svg viewBox="0 0 2000 300" width="100%" height="100%" preserveAspectRatio="none">
          <path
            d="M 0 140 Q 200 80 400 130 Q 600 50 850 120 Q 1100 70 1350 140 Q 1600 60 1850 130 Q 2000 90 2000 300 L 0 300 Z"
            fill="#0F141F"
            filter="blur(18px)"
          />
        </svg>
      </div>

      {/* Drifting Storm Cloud Layer 2 (Mid-sky) */}
      <div className="absolute top-4 left-0 w-[200%] h-80 opacity-30 anim-clouds-near pointer-events-none">
        <svg viewBox="0 0 2000 260" width="100%" height="100%" preserveAspectRatio="none">
          <path
            d="M 0 110 Q 250 40 500 100 Q 750 30 1000 90 Q 1300 30 1600 110 Q 1850 40 2000 100 L 2000 260 L 0 260 Z"
            fill="#141926"
            filter="blur(22px)"
          />
        </svg>
      </div>

      {/* =========================================================================
          LAYER 2: THE PHYSICAL VOLUMETRIC SEARCHLIGHT & THE LARGE BAT-SIGNAL
          ========================================================================= */}
      <div className="absolute inset-0 anim-beam-sweep">
        {/* Volumetric Conical Searchlight Beam */}
        <svg
          viewBox="0 0 1200 900"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Volumetric Beam Gradient */}
            <linearGradient id="volumetric-beam-grad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="5%" stopColor="#FFE500" stopOpacity="0.6" />
              <stop offset="25%" stopColor="#FFE500" stopOpacity="0.32" />
              <stop offset="65%" stopColor="#FFE500" stopOpacity="0.18" />
              <stop offset="90%" stopColor="#FFF7A8" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#FFE500" stopOpacity="0.45" />
            </linearGradient>

            {/* Beam Edge Soft Scatter */}
            <linearGradient id="beam-scatter-grad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FFE500" stopOpacity="0.35" />
              <stop offset="40%" stopColor="#FFE500" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#FFE500" stopOpacity="0.04" />
            </linearGradient>
          </defs>

          {/* Core Powerful Conical Beam (Originates from searchlight drum at x=900, y=780) */}
          <polygon
            points="892,780 908,780 1080,120 720,120"
            fill="url(#volumetric-beam-grad)"
            filter="blur(14px)"
          />

          {/* Broad Atmospheric Light Scatter / Haze Cone */}
          <polygon
            points="880,780 920,780 1140,80 660,80"
            fill="url(#beam-scatter-grad)"
            filter="blur(28px)"
          />
        </svg>

        {/* -----------------------------------------------------------------------
            THE BAT-SIGNAL IN THE CLOUDS (Upper Sky Centerpiece)
            ----------------------------------------------------------------------- */}
        <div
          className="absolute will-change-transform"
          style={{
            top: '8%',
            right: '18%',
            width: 'clamp(280px, 34vw, 420px)',
            height: 'clamp(200px, 24vw, 300px)',
            transform: 'translate(25%, 0%)',
          }}
        >
          {/* Luminous Diffuse Outer Light Pool */}
          <div
            className="absolute inset-0 rounded-[50%] opacity-85"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255, 248, 175, 0.8) 0%, rgba(255, 229, 0, 0.45) 45%, rgba(255, 229, 0, 0.15) 70%, transparent 85%)',
              filter: 'blur(24px)',
            }}
          />

          {/* Intense Inner High-Beam Cloud Spot */}
          <div
            className="absolute inset-[10%] rounded-[50%]"
            style={{
              background: 'radial-gradient(ellipse at center, #FFFFE0 0%, #FFF7A8 35%, #FFE500 70%, transparent 100%)',
              boxShadow: '0 0 60px rgba(255, 229, 0, 0.8), inset 0 0 40px rgba(255, 255, 255, 0.9)',
              filter: 'blur(4px)',
            }}
          />

          {/* Surrounding Atmospheric Cloud Illumination Fringe */}
          <div
            className="absolute -inset-6 rounded-[50%] opacity-60"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255, 229, 0, 0.25) 0%, transparent 75%)',
              filter: 'blur(35px)',
            }}
          />

          {/* THE ICONIC BATMAN BAT SILHOUETTE */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <svg
              viewBox="0 0 200 110"
              className="w-[78%] h-auto drop-shadow-[0_0_12px_rgba(0,0,0,0.95)]"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(8, 10, 15, 0.9)) drop-shadow(0 0 2px #000000)',
              }}
            >
              {/* Crisp, authentic high-contrast Bat Insignia */}
              <path
                d="M 100 20
                   C 95 14, 93 4, 90 0
                   C 87 5, 85 14, 80 20
                   C 68 18, 48 16, 12 32
                   C 26 48, 40 58, 38 72
                   C 52 66, 68 72, 72 90
                   C 80 81, 92 86, 100 110
                   C 108 86, 120 81, 128 90
                   C 132 72, 148 66, 162 72
                   C 160 58, 174 48, 188 32
                   C 152 16, 132 18, 120 20
                   C 115 14, 113 5, 110 0
                   C 107 4, 105 14, 100 20 Z"
                fill="#07090E"
                stroke="#020305"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* =========================================================================
          LAYER 3: MULTI-LAYER GOTHAM SKYLINE (Lower Hero Depth)
          ========================================================================= */}
      <div className="absolute bottom-0 left-0 right-0 h-64 sm:h-72 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 1440 280"
          preserveAspectRatio="none"
          width="100%"
          height="100%"
          className="block w-full h-full"
        >
          <defs>
            {/* Distant Skyline Fog Gradient */}
            <linearGradient id="skyline-dist-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0B101D" stopOpacity="0.7" />
              <stop offset="60%" stopColor="#080C14" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#05070B" stopOpacity="1" />
            </linearGradient>

            {/* Midground Skyline Gradient */}
            <linearGradient id="skyline-mid-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#121824" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#0E131C" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#06090E" stopOpacity="1" />
            </linearGradient>

            {/* Foreground Rooftops Gradient */}
            <linearGradient id="skyline-fore-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0B0E14" stopOpacity="1" />
              <stop offset="100%" stopColor="#020305" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* -------------------------------------------------------------------
              3A. DISTANT SKYLINE: Towering Spires, Needle Towers & Bridges
              ------------------------------------------------------------------- */}
          <path
            d="M 0 280
               L 0 160 L 25 160 L 30 110 L 35 70 L 40 70 L 45 110 L 50 160
               L 110 160 L 115 130 L 140 130 L 145 160
               L 210 160 L 215 90 L 220 50 L 225 50 L 230 90 L 240 160
               L 310 160 L 325 115 L 340 115 L 355 160
               L 420 160 L 425 80 L 430 40 L 435 40 L 440 80 L 450 160
               L 530 160 L 540 120 L 560 120 L 570 160
               L 650 160 L 660 70 L 665 30 L 670 30 L 675 70 L 685 160
               L 770 160 L 785 100 L 805 100 L 820 160
               L 890 160 L 900 85 L 905 45 L 910 45 L 915 85 L 925 160
               L 1000 160 L 1015 110 L 1030 110 L 1045 160
               L 1120 160 L 1130 75 L 1135 35 L 1140 35 L 1145 75 L 1155 160
               L 1240 160 L 1250 125 L 1275 125 L 1285 160
               L 1350 160 L 1360 90 L 1365 50 L 1370 50 L 1375 90 L 1385 160
               L 1440 160 L 1440 280 Z"
            fill="url(#skyline-dist-grad)"
          />

          {/* Distant Aviation Beacon Warning Lights */}
          <circle cx="37" cy="68" r="2" fill="#FF3B30" style={{ animation: 'beacon-pulse-red 2.4s infinite' }} />
          <circle cx="222" cy="48" r="2" fill="#FF3B30" style={{ animation: 'beacon-pulse-red 2.8s infinite 0.4s' }} />
          <circle cx="432" cy="38" r="2" fill="#FF3B30" style={{ animation: 'beacon-pulse-red 2.2s infinite 0.8s' }} />
          <circle cx="667" cy="28" r="2.2" fill="#FF3B30" style={{ animation: 'beacon-pulse-red 2.6s infinite 1.2s' }} />
          <circle cx="907" cy="43" r="2" fill="#FF3B30" style={{ animation: 'beacon-pulse-red 2.5s infinite 0.6s' }} />
          <circle cx="1137" cy="33" r="2.2" fill="#FF3B30" style={{ animation: 'beacon-pulse-red 2.7s infinite 1.5s' }} />
          <circle cx="1367" cy="48" r="2" fill="#FF3B30" style={{ animation: 'beacon-pulse-red 2.3s infinite 0.9s' }} />

          {/* -------------------------------------------------------------------
              3B. MIDGROUND SKYLINE: Gothic Buildings, Wayne Tower & Arches
              ------------------------------------------------------------------- */}
          <path
            d="M 0 280
               L 0 190 L 40 190 L 50 150 L 80 150 L 90 190
               L 130 190 L 140 130 L 165 110 L 190 130 L 200 190
               L 250 190 L 260 145 L 290 145 L 300 190
               L 350 190 L 360 120 L 380 95 L 400 120 L 410 190
               L 470 190 L 485 140 L 515 140 L 530 190
               L 580 190 L 590 110 L 610 85 L 630 110 L 640 190
               L 700 190 L 715 135 L 750 135 L 765 190
               {/* Wayne Enterprises Tower Centerpiece */}
               L 810 190 L 820 100 L 835 70 L 850 70 L 865 100 L 875 190
               L 930 190 L 945 130 L 975 130 L 990 190
               L 1040 190 L 1055 115 L 1075 95 L 1095 115 L 1110 190
               L 1170 190 L 1185 140 L 1215 140 L 1230 190
               L 1280 190 L 1295 120 L 1325 120 L 1340 190
               L 1390 190 L 1405 150 L 1435 150 L 1440 190
               L 1440 280 Z"
            fill="url(#skyline-mid-grad)"
          />

          {/* Wayne Tower Spire Signal Light */}
          <circle cx="842" cy="68" r="2.5" fill="#FFE500" opacity="0.9" className="animate-pulse" />

          {/* Midground Lit Windows (Warm Amber Micro-Grids) */}
          <rect x="150" y="145" width="3" height="4" fill="#FFE500" opacity="0.45" />
          <rect x="157" y="145" width="3" height="4" fill="#FFE500" opacity="0.3" />
          <rect x="175" y="145" width="3" height="4" fill="#FFE500" opacity="0.5" />
          <rect x="150" y="155" width="3" height="4" fill="#FFE500" opacity="0.35" />
          <rect x="157" y="155" width="3" height="4" fill="#FFE500" opacity="0.55" />
          <rect x="175" y="155" width="3" height="4" fill="#FFE500" opacity="0.4" />

          <rect x="370" y="130" width="3.5" height="4.5" fill="#FFE500" opacity="0.4" />
          <rect x="380" y="130" width="3.5" height="4.5" fill="#FFE500" opacity="0.5" />
          <rect x="390" y="130" width="3.5" height="4.5" fill="#FFE500" opacity="0.3" />
          <rect x="370" y="142" width="3.5" height="4.5" fill="#FFE500" opacity="0.5" />
          <rect x="380" y="142" width="3.5" height="4.5" fill="#FFE500" opacity="0.35" />
          <rect x="390" y="142" width="3.5" height="4.5" fill="#FFE500" opacity="0.6" />

          <rect x="835" y="115" width="4" height="5" fill="#FFE500" opacity="0.6" />
          <rect x="845" y="115" width="4" height="5" fill="#FFE500" opacity="0.75" />
          <rect x="835" y="128" width="4" height="5" fill="#FFE500" opacity="0.5" />
          <rect x="845" y="128" width="4" height="5" fill="#FFE500" opacity="0.65" />
          <rect x="835" y="142" width="4" height="5" fill="#FFE500" opacity="0.7" />
          <rect x="845" y="142" width="4" height="5" fill="#FFE500" opacity="0.4" />

          <rect x="1065" y="130" width="3" height="4" fill="#FFE500" opacity="0.4" />
          <rect x="1075" y="130" width="3" height="4" fill="#FFE500" opacity="0.55" />
          <rect x="1085" y="130" width="3" height="4" fill="#FFE500" opacity="0.35" />

          {/* -------------------------------------------------------------------
              3C. FOREGROUND ROOFTOPS: Water Tanks, Gantry & Physical Searchlight
              ------------------------------------------------------------------- */}
          <path
            d="M 0 280
               L 0 220 L 70 220 L 75 195 L 115 195 L 120 220
               L 180 220 L 190 205 L 240 205 L 250 220
               L 330 220 L 335 190 L 375 190 L 380 220
               L 460 220 L 470 210 L 520 210 L 530 220
               L 610 220 L 615 195 L 655 195 L 660 220
               L 730 220 L 740 205 L 790 205 L 800 220
               {/* Searchlight Rooftop Platform at x=860..940 */}
               L 850 220 L 860 212 L 940 212 L 950 220
               L 1020 220 L 1030 195 L 1070 195 L 1080 220
               L 1150 220 L 1160 205 L 1210 205 L 1220 220
               L 1290 220 L 1295 190 L 1335 190 L 1340 220
               L 1440 220 L 1440 280 Z"
            fill="url(#skyline-fore-grad)"
          />

          {/* Rooftop Water Tower Silhouettes */}
          <path d="M 90 195 L 90 178 L 105 178 L 105 195 Z M 88 178 L 107 178 L 97.5 170 Z" fill="#040609" />
          <path d="M 350 190 L 350 172 L 365 172 L 365 190 Z M 348 172 L 367 172 L 357.5 164 Z" fill="#040609" />
          <path d="M 630 195 L 630 178 L 645 178 L 645 195 Z M 628 178 L 647 178 L 637.5 170 Z" fill="#040609" />
          <path d="M 1310 190 L 1310 172 L 1325 172 L 1325 190 Z M 1308 172 L 1327 172 L 1317.5 164 Z" fill="#040609" />

          {/* -------------------------------------------------------------------
              3D. PHYSICAL SEARCHLIGHT APPARATUS (Rooftop Emitter at x=900, y=212)
              ------------------------------------------------------------------- */}
          <g transform="translate(900, 212)">
            {/* Gantry Mounting Base & Stanchions */}
            <rect x="-24" y="-3" width="48" height="6" rx="2" fill="#1A202C" stroke="#2D3748" strokeWidth="0.8" />
            <line x1="-16" y1="3" x2="-22" y2="12" stroke="#1A202C" strokeWidth="2.5" />
            <line x1="16" y1="3" x2="22" y2="12" stroke="#1A202C" strokeWidth="2.5" />

            {/* Industrial Gimbal Turntable */}
            <circle cx="0" cy="-6" r="10" fill="#0D1117" stroke="#30363D" strokeWidth="1" />
            <path d="M -9 -6 L -9 -18 L -6 -20 L -6 -6 Z" fill="#161B22" />
            <path d="M 9 -6 L 9 -18 L 6 -20 L 6 -6 Z" fill="#161B22" />

            {/* Heavy-Duty Searchlight Drum Housing */}
            <g transform="rotate(-15)">
              <rect x="-14" y="-34" width="28" height="24" rx="4" fill="#0A0D14" stroke="#484F58" strokeWidth="1" />
              {/* Cooling Fins */}
              <line x1="-12" y1="-28" x2="12" y2="-28" stroke="#30363D" strokeWidth="1" />
              <line x1="-12" y1="-24" x2="12" y2="-24" stroke="#30363D" strokeWidth="1" />
              <line x1="-12" y1="-20" x2="12" y2="-20" stroke="#30363D" strokeWidth="1" />

              {/* Radiant Lens Emitter Ring */}
              <ellipse cx="0" cy="-34" rx="14" ry="4" fill="#FFFFFF" />
              <ellipse cx="0" cy="-34" rx="16" ry="5" fill="#FFE500" opacity="0.75" />
            </g>

            {/* Intense Physical Emitter Light Burst */}
            <circle
              cx="0"
              cy="-34"
              r="12"
              fill="#FFFFFF"
              filter="drop-shadow(0 0 24px #FFE500) drop-shadow(0 0 45px #FFF7A8)"
            />
          </g>
        </svg>
      </div>

      {/* =========================================================================
          LAYER 4: RESTRAINED FINE RAIN MIST OVERLAY
          ========================================================================= */}
      <div className="absolute inset-0 gotham-rain-mist opacity-45 pointer-events-none" />
    </div>
  );
};
