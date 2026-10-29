'use client';

import React from 'react';
import { useGotham } from '@/context/GothamContext';

export const BatSignal: React.FC = () => {
  const { isGotham } = useGotham();

  if (!isGotham) return null;

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0"
    >
      <style>{`
        /* 1. Continuous, slow, majestic searchlight sweep across Gotham clouds */
        @keyframes batsignal-pan-sweep {
          0% {
            transform: rotate(-10deg);
          }
          50% {
            transform: rotate(8deg);
          }
          100% {
            transform: rotate(-10deg);
          }
        }

        /* 2. Atmospheric Cloud Drift Behind the Bat-Signal */
        @keyframes batsignal-clouds-panning {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        /* 3. Subtle Beam Atmospheric Flare / Haze Pulse */
        @keyframes batsignal-haze-breathe {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }

        .anim-signal-sweep {
          transform-origin: 75% 82%;
          animation: batsignal-pan-sweep 22s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .anim-signal-sweep {
            transform-origin: 50% 84%;
          }
        }

        .anim-clouds-bg {
          animation: batsignal-clouds-panning 75s linear infinite;
        }

        .anim-beam-breathe {
          animation: batsignal-haze-breathe 4s ease-in-out infinite;
        }
      `}</style>

      {/* -----------------------------------------------------------------------
          BACKGROUND CLOUDS (Subtle cloud silhouettes illuminated by the sky)
          ----------------------------------------------------------------------- */}
      <div className="absolute top-0 left-0 w-[200%] h-80 opacity-35 anim-clouds-bg pointer-events-none">
        <svg viewBox="0 0 2000 280" width="100%" height="100%" preserveAspectRatio="none">
          <path
            d="M 0 120 Q 250 60 500 110 Q 750 40 1000 100 Q 1250 50 1500 120 Q 1750 60 2000 110 L 2000 280 L 0 280 Z"
            fill="#101522"
            filter="blur(20px)"
          />
        </svg>
      </div>

      {/* -----------------------------------------------------------------------
          THE SWEEPING SEARCHLIGHT GROUP (BEAM + SKY SIGNAL)
          Both beam and projected bat emblem pivot seamlessly from the rooftop torch
          ----------------------------------------------------------------------- */}
      <div className="absolute inset-0 anim-signal-sweep">
        {/* SVG Volumetric Light Beam */}
        <svg
          viewBox="0 0 1200 900"
          className="absolute inset-0 w-full h-full anim-beam-breathe"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Core Volumetric Beam Gradient */}
            <linearGradient id="torch-core-beam" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="8%" stopColor="#FFE500" stopOpacity="0.75" />
              <stop offset="35%" stopColor="#FFE500" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#FFF7A8" stopOpacity="0.25" />
              <stop offset="90%" stopColor="#FFE500" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#FFE500" stopOpacity="0.6" />
            </linearGradient>

            {/* Translucent Scattering Cone Gradient */}
            <linearGradient id="torch-haze-cone" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FFE500" stopOpacity="0.5" />
              <stop offset="30%" stopColor="#FFE500" stopOpacity="0.2" />
              <stop offset="80%" stopColor="#FFE500" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#FFE500" stopOpacity="0.05" />
            </linearGradient>

            {/* Circular Aperture Sky Mask */}
            <mask id="batsignal-sky-circle-mask">
              <rect width="100%" height="100%" fill="black" />
              <circle cx="900" cy="180" r="140" fill="white" />
            </mask>
          </defs>

          {/* 1. Broad Volumetric Scattering Glow (Atmospheric Fog) */}
          <polygon
            points="875,740 925,740 1140,80 660,80"
            fill="url(#torch-haze-cone)"
            filter="blur(30px)"
          />

          {/* 2. Primary Volumetric Light Beam Extending from Searchlight Lens to Sky */}
          <polygon
            points="888,740 912,740 1060,140 740,140"
            fill="url(#torch-core-beam)"
            filter="blur(14px)"
          />

          {/* 3. High-Intensity Sharp Beam Core Spine */}
          <polygon
            points="895,740 905,740 970,160 830,160"
            fill="#FFFFFF"
            opacity="0.35"
            filter="blur(8px)"
          />
        </svg>

        {/* ---------------------------------------------------------------------
            THE PROJECTED BAT-SIGNAL IN THE CLOUDS (Upper Sky Centerpiece)
            Distinct, large (260-340px) circular illuminated beam with black Bat Emblem
            --------------------------------------------------------------------- */}
        <div
          className="absolute will-change-transform flex items-center justify-center"
          style={{
            top: '7%',
            right: '16%',
            width: 'clamp(240px, 30vw, 340px)',
            height: 'clamp(240px, 30vw, 340px)',
            transform: 'translate(20%, 0%)',
          }}
        >
          {/* Diffuse Outer Ambient Cloud Illumination Halo */}
          <div
            className="absolute -inset-10 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255, 245, 170, 0.75) 0%, rgba(255, 229, 0, 0.35) 45%, rgba(255, 229, 0, 0.1) 70%, transparent 85%)',
              filter: 'blur(28px)',
            }}
          />

          {/* High-Intensity Inner Projector Disc */}
          <div
            className="absolute inset-4 rounded-full"
            style={{
              background: 'radial-gradient(circle, #FFFFF0 0%, #FFF59D 35%, #FFE500 70%, rgba(255, 229, 0, 0.4) 100%)',
              boxShadow: '0 0 70px rgba(255, 229, 0, 0.95), inset 0 0 45px #FFFFFF',
              filter: 'blur(2px)',
            }}
          />

          {/* Atmospheric Cloud Edge Scatter Ring */}
          <div
            className="absolute inset-0 rounded-full border-2 border-[#FFE500]/50"
            style={{
              boxShadow: '0 0 35px #FFE500, inset 0 0 20px #FFE500',
              filter: 'blur(3px)',
            }}
          />

          {/* THE PROMINENT, RECOGNIZABLE BATMAN BAT SILHOUETTE */}
          <div className="relative z-10 w-[74%] h-[74%] flex items-center justify-center">
            <svg
              viewBox="0 0 220 120"
              className="w-full h-auto drop-shadow-[0_0_14px_rgba(0,0,0,0.95)]"
              style={{
                filter: 'drop-shadow(0 0 6px rgba(5,7,11,0.95)) drop-shadow(0 0 2px #000000)',
              }}
            >
              {/* Sharp, classic Bat-Signal Emblem */}
              <path
                d="M 110 22
                   C 105 15, 102 4, 99 0
                   C 96 6, 93 16, 88 22
                   C 75 20, 52 18, 14 36
                   C 30 54, 45 65, 43 80
                   C 58 74, 76 80, 80 100
                   C 89 90, 102 96, 110 120
                   C 118 96, 131 90, 140 100
                   C 144 80, 162 74, 177 80
                   C 175 65, 190 54, 206 36
                   C 168 18, 145 20, 132 22
                   C 127 16, 124 6, 121 0
                   C 118 4, 115 15, 110 22 Z"
                fill="#05070B"
                stroke="#000000"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* -----------------------------------------------------------------------
          THE PHYSICAL ROOFTOP SEARCHLIGHT TORCH (Mounted at x=900, y=740)
          Visibly produces the beam and stands on the Gotham rooftop
          ----------------------------------------------------------------------- */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '50px',
          right: '25%',
          transform: 'translate(50%, 0)',
        }}
      >
        <svg
          viewBox="0 0 120 140"
          width="90"
          height="105"
          className="block overflow-visible drop-shadow-[0_6px_16px_rgba(0,0,0,0.95)]"
        >
          <defs>
            <linearGradient id="searchlight-metal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#374151" />
              <stop offset="40%" stopColor="#1F2937" />
              <stop offset="100%" stopColor="#0B0F17" />
            </linearGradient>

            <linearGradient id="searchlight-lens-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#FFF7A8" />
              <stop offset="100%" stopColor="#FFE500" />
            </linearGradient>
          </defs>

          {/* Heavy Steel Rooftop Gantry Platform */}
          <rect x="20" y="125" width="80" height="12" rx="3" fill="#111827" stroke="#374151" strokeWidth="1.5" />
          <line x1="32" y1="125" x2="15" y2="140" stroke="#1F2937" strokeWidth="3" />
          <line x1="88" y1="125" x2="105" y2="140" stroke="#1F2937" strokeWidth="3" />
          <circle cx="32" cy="131" r="2" fill="#FFE500" opacity="0.6" />
          <circle cx="88" cy="131" r="2" fill="#FFE500" opacity="0.6" />

          {/* Gimbal Turntable Base & Pivots */}
          <ellipse cx="60" cy="120" rx="22" ry="7" fill="#0D1117" stroke="#4B5563" strokeWidth="1" />
          <path d="M 45 120 L 45 95 L 50 90 L 50 120 Z" fill="#1F2937" />
          <path d="M 75 120 L 75 95 L 70 90 L 70 120 Z" fill="#1F2937" />

          {/* Rotated Industrial Lamp Housing Drum */}
          <g transform="rotate(-28 60 90)">
            {/* Drum Body */}
            <rect x="42" y="45" width="36" height="48" rx="6" fill="url(#searchlight-metal-grad)" stroke="#4B5563" strokeWidth="1.5" />

            {/* Metal Cooling Fins */}
            <line x1="44" y1="58" x2="76" y2="58" stroke="#374151" strokeWidth="1.5" />
            <line x1="44" y1="66" x2="76" y2="66" stroke="#374151" strokeWidth="1.5" />
            <line x1="44" y1="74" x2="76" y2="74" stroke="#374151" strokeWidth="1.5" />
            <line x1="44" y1="82" x2="76" y2="82" stroke="#374151" strokeWidth="1.5" />

            {/* Trunnion Swivel Knobs */}
            <circle cx="42" cy="70" r="4" fill="#6B7280" />
            <circle cx="78" cy="70" r="4" fill="#6B7280" />

            {/* Aperture Bezel & Glass Lens Rim */}
            <ellipse cx="60" cy="45" rx="19" ry="7" fill="#111827" stroke="#FFE500" strokeWidth="1.2" />
            <ellipse cx="60" cy="45" rx="17" ry="5.5" fill="url(#searchlight-lens-grad)" />

            {/* High-Power Center Filament Spark */}
            <ellipse cx="60" cy="45" rx="8" ry="3" fill="#FFFFFF" filter="drop-shadow(0 0 10px #FFFFFF)" />
          </g>

          {/* Blazing Searchlight Aperture Flare Halo */}
          <circle
            cx="44"
            cy="48"
            r="20"
            fill="#FFFFFF"
            opacity="0.9"
            filter="drop-shadow(0 0 25px #FFE500) drop-shadow(0 0 50px #FFF7A8)"
          />
        </svg>
      </div>
    </div>
  );
};
