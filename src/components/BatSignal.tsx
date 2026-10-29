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
        /* 1. Authentic slow searchlight sweep pivoting from the rooftop gimbal */
        @keyframes batsignal-authentic-sweep {
          0% {
            transform: rotate(-5deg);
          }
          50% {
            transform: rotate(4deg);
          }
          100% {
            transform: rotate(-5deg);
          }
        }

        /* 2. Atmospheric cloud drift */
        @keyframes batsignal-clouds-drift {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        /* 3. Subtle atmospheric beam pulse */
        @keyframes beam-atmospheric-shimmer {
          0%, 100% { opacity: 0.92; }
          50% { opacity: 1; }
        }

        .anim-authentic-sweep {
          transform-origin: 72% 78%;
          animation: batsignal-authentic-sweep 24s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .anim-authentic-sweep {
            transform-origin: 65% 82%;
          }
        }

        .anim-clouds-pass {
          animation: batsignal-clouds-drift 80s linear infinite;
        }

        .anim-shimmer {
          animation: beam-atmospheric-shimmer 5s ease-in-out infinite;
        }
      `}</style>

      {/* Background Soft Cloud Silhouettes Behind Signal */}
      <div className="absolute top-0 left-0 w-[200%] h-80 opacity-30 anim-clouds-pass pointer-events-none">
        <svg viewBox="0 0 2000 280" width="100%" height="100%" preserveAspectRatio="none">
          <path
            d="M 0 130 Q 300 70 600 120 Q 900 60 1200 110 Q 1500 70 1800 130 Q 1900 80 2000 120 L 2000 280 L 0 280 Z"
            fill="#0E131F"
            filter="blur(22px)"
          />
        </svg>
      </div>

      {/* Unified Coordinate SVG Space (1440 x 900) for Exact Physical Realism */}
      <div className="absolute inset-0 w-full h-full anim-authentic-sweep">
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full block"
        >
          <defs>
            {/* Volumetric Beam Gradients */}
            {/* Core Tapered Beam Gradient */}
            <linearGradient id="authentic-beam-core" x1="1000" y1="665" x2="740" y2="240" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="12%" stopColor="#FFF8C4" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#FDE047" stopOpacity="0.2" />
              <stop offset="85%" stopColor="#FDE047" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#FFF9C4" stopOpacity="0.35" />
            </linearGradient>

            {/* Ambient Scatter Haze Gradient */}
            <linearGradient id="authentic-beam-haze" x1="1000" y1="665" x2="740" y2="240" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FDE047" stopOpacity="0.4" />
              <stop offset="40%" stopColor="#FDE047" stopOpacity="0.12" />
              <stop offset="80%" stopColor="#FDE047" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#FDE047" stopOpacity="0.02" />
            </linearGradient>

            {/* High-Intensity Center Shaft */}
            <linearGradient id="authentic-beam-shaft" x1="1000" y1="665" x2="740" y2="240" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.3" />
              <stop offset="70%" stopColor="#FFFBEB" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.2" />
            </linearGradient>

            {/* Projected Pale Yellow-White Sky Field */}
            <radialGradient id="sky-disc-illumination" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFA" stopOpacity="1" />
              <stop offset="45%" stopColor="#FFF9C4" stopOpacity="0.95" />
              <stop offset="78%" stopColor="#FDE047" stopOpacity="0.75" />
              <stop offset="92%" stopColor="#EAB308" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#EAB308" stopOpacity="0" />
            </radialGradient>

            {/* Cloud Ambient Halo Radial */}
            <radialGradient id="cloud-halo-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF9C4" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#FDE047" stopOpacity="0.12" />
              <stop offset="80%" stopColor="#FDE047" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#FDE047" stopOpacity="0" />
            </radialGradient>

            {/* Industrial Metal Gradients for Housing */}
            <linearGradient id="housing-metal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#374151" />
              <stop offset="30%" stopColor="#1F2937" />
              <stop offset="70%" stopColor="#111827" />
              <stop offset="100%" stopColor="#0B0F17" />
            </linearGradient>

            <linearGradient id="lens-filament-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#FFF9C4" />
              <stop offset="100%" stopColor="#FDE047" />
            </linearGradient>
          </defs>

          {/* -------------------------------------------------------------------
              SECTION B: THE GENUINE VOLUMETRIC BEAM
              Defined tapered cone connecting aperture (998, 665) to sky circle (740, 240)
              ------------------------------------------------------------------- */}
          <g className="anim-shimmer">
            {/* 1. Atmospheric Scatter Haze (Wide blurred envelope) */}
            <polygon
              points="984,650 1012,680 845,315 635,165"
              fill="url(#authentic-beam-haze)"
              filter="blur(22px)"
            />

            {/* 2. Main Volumetric Light Cone */}
            <polygon
              points="988,653 1008,677 825,300 655,180"
              fill="url(#authentic-beam-core)"
              filter="blur(5px)"
            />

            {/* 3. Intense Inner Shaft of Light */}
            <polygon
              points="995,660 1001,670 780,265 700,215"
              fill="url(#authentic-beam-shaft)"
              filter="blur(2.5px)"
            />
          </g>

          {/* -------------------------------------------------------------------
              SECTION C: THE PROJECTED BAT-SIGNAL (Upper Sky Centerpiece)
              Centered at (740, 240), diameter approx 210px (fits 180-260px desktop spec)
              ------------------------------------------------------------------- */}
          <g transform="translate(740, 240)">
            {/* 1. Surrounding Ambient Cloud Illumination Halo (Falloff to clouds) */}
            <circle
              cx="0"
              cy="0"
              r="150"
              fill="url(#cloud-halo-glow)"
              filter="blur(18px)"
            />

            {/* 2. Circular Field of Pale Yellow-White Light (The Stencil Projector Disc) */}
            <circle
              cx="0"
              cy="0"
              r="105"
              fill="url(#sky-disc-illumination)"
              filter="blur(1.2px)"
            />

            {/* 3. Subtle Atmospheric Soft Rim Edge */}
            <circle
              cx="0"
              cy="0"
              r="104"
              fill="none"
              stroke="#FFF9C4"
              strokeWidth="1.5"
              strokeOpacity="0.4"
              filter="blur(1px)"
            />

            {/* 4. THE BAT EMBLEM: Physical Stencil Silhouette Cast in Midnight Charcoal */}
            {/* Crisp, clean, recognizable Batman wings and ears (130px width x 62px height) */}
            <path
              d="M 0 -13
                 C -3.2 -7, -5.2 0, -7.5 -3.5
                 C -6.2 -8, -4.8 -16, -1.8 -23
                 C -3.8 -22, -6.8 -18, -9 -13
                 C -18 -11, -38 -9, -65 3
                 C -52 16, -42 24, -43 36
                 C -31 31, -17 36, -14 51
                 C -7 43, 2 48, 0 62
                 C -2 48, 7 43, 14 51
                 C 17 36, 31 31, 43 36
                 C 42 24, 52 16, 65 3
                 C 38 -9, 18 -11, 9 -13
                 C 6.8 -18, 3.8 -22, 1.8 -23
                 C 4.8 -16, 6.2 -8, 7.5 -3.5
                 C 5.2 0, 3.2 -7, 0 -13 Z"
              fill="#06080C"
              stroke="#FFF9C4"
              strokeWidth="0.6"
              strokeOpacity="0.3"
              style={{
                filter: 'drop-shadow(0 0 4px rgba(6, 8, 12, 0.95))',
              }}
            />
          </g>

          {/* -------------------------------------------------------------------
              SECTION A: DETAILED PHYSICAL ROOFTOP SEARCHLIGHT SOURCE
              Positioned on the building rooftop at (1040, 700), pointing toward (740, 240)
              Angle: -39.8 degrees
              ------------------------------------------------------------------- */}
          <g transform="translate(1040, 700)">
            {/* Roof Parapet Rim Lighting Directly Under the Searchlight Beam */}
            <path
              d="M -70 45 L 80 45"
              stroke="#FDE047"
              strokeWidth="2.5"
              strokeOpacity="0.35"
              filter="blur(3px)"
            />

            {/* Structural Steel I-Beam Stanchions & Base Plate */}
            <rect x="-35" y="38" width="70" height="8" rx="2" fill="#111827" stroke="#374151" strokeWidth="1" />
            <line x1="-24" y1="38" x2="-32" y2="52" stroke="#1F2937" strokeWidth="3" />
            <line x1="24" y1="38" x2="32" y2="52" stroke="#1F2937" strokeWidth="3" />
            <circle cx="-24" cy="42" r="1.5" fill="#4B5563" />
            <circle cx="24" cy="42" r="1.5" fill="#4B5563" />

            {/* Turntable Gimbal Base */}
            <ellipse cx="0" cy="35" rx="22" ry="6" fill="#0D1117" stroke="#374151" strokeWidth="1" />
            {/* Fork Yoke Arms */}
            <path d="M -16 35 L -16 12 L -11 8 L -11 35 Z" fill="#1F2937" stroke="#374151" strokeWidth="0.8" />
            <path d="M 16 35 L 16 12 L 11 8 L 11 35 Z" fill="#1F2937" stroke="#374151" strokeWidth="0.8" />

            {/* Cylindrical Lamp Housing Drum (Tilted at -40° toward sky projection) */}
            <g transform="rotate(-40 0 10)">
              {/* Main Drum Body */}
              <rect x="-18" y="-36" width="36" height="48" rx="5" fill="url(#housing-metal-grad)" stroke="#4B5563" strokeWidth="1.2" />

              {/* Cooling Louvers / Heat Dissipation Ribs */}
              <line x1="-16" y1="-26" x2="16" y2="-26" stroke="#374151" strokeWidth="1.2" />
              <line x1="-16" y1="-18" x2="16" y2="-18" stroke="#374151" strokeWidth="1.2" />
              <line x1="-16" y1="-10" x2="16" y2="-10" stroke="#374151" strokeWidth="1.2" />
              <line x1="-16" y1="-2" x2="16" y2="-2" stroke="#374151" strokeWidth="1.2" />

              {/* Side Trunnion Pivot Knobs */}
              <circle cx="-18" cy="-12" r="3.5" fill="#6B7280" stroke="#374151" strokeWidth="0.8" />
              <circle cx="18" cy="-12" r="3.5" fill="#6B7280" stroke="#374151" strokeWidth="0.8" />

              {/* Front Aperture Retaining Ring */}
              <ellipse cx="0" cy="-36" rx="18" ry="6" fill="#111827" stroke="#4B5563" strokeWidth="1.2" />

              {/* Parabolic Reflector & Glowing Lens Face */}
              <ellipse cx="0" cy="-36" rx="16" ry="5" fill="url(#lens-filament-grad)" />

              {/* Incandescent Bulb Filament Core */}
              <ellipse cx="0" cy="-36" rx="8" ry="2.5" fill="#FFFFFF" />
            </g>

            {/* Believable Focused Lens Flare at the Aperture Face */}
            <circle
              cx="-27"
              cy="-21"
              r="14"
              fill="#FFFFFF"
              opacity="0.85"
              filter="drop-shadow(0 0 16px #FDE047) drop-shadow(0 0 32px #FFF9C4)"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};
