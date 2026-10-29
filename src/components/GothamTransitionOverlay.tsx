'use client';

import React from 'react';
import { useGotham } from '@/context/GothamContext';

export const GothamTransitionOverlay: React.FC = () => {
  const { isTransitioning, transitionStage, isGotham } = useGotham();

  if (!isTransitioning) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-screen h-screen z-[100] pointer-events-none overflow-hidden select-none"
    >
      <style>{`
        /* Stage 1: Power Brownout & Fade to Near-Black */
        @keyframes gotham-fade-dark {
          0% { opacity: 0; }
          100% { opacity: 0.96; }
        }

        /* Stage 2: Distant Searchlight Ignition & Sweep */
        @keyframes gotham-searchlight-ignite {
          0% {
            opacity: 0;
            transform: rotate(-30deg) scaleY(0.3);
          }
          40% {
            opacity: 0.85;
          }
          100% {
            opacity: 0.95;
            transform: rotate(-10deg) scaleY(1);
          }
        }

        /* Stage 3: Volumetric Beam Rising Upward */
        @keyframes gotham-beam-rise {
          0% {
            clip-path: polygon(48% 100%, 52% 100%, 52% 100%, 48% 100%);
            opacity: 0.2;
          }
          100% {
            clip-path: polygon(44% 100%, 56% 100%, 90% 0%, 20% 0%);
            opacity: 0.9;
          }
        }

        /* Stage 4: Bat Emblem Materialization & Cloud Burst */
        @keyframes gotham-bat-materialize {
          0% {
            transform: scale(0.3) rotate(-8deg);
            opacity: 0;
            filter: blur(16px);
          }
          50% {
            transform: scale(1.15) rotate(2deg);
            opacity: 1;
            filter: blur(2px);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
            filter: blur(0px);
          }
        }

        /* Stage 5: Emerge Dissolve */
        @keyframes gotham-emerge-dissolve {
          0% { opacity: 0.95; }
          100% { opacity: 0; }
        }

        .anim-darken {
          animation: gotham-fade-dark 0.3s ease-in forwards;
        }

        .anim-ignite {
          animation: gotham-searchlight-ignite 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .anim-beam-rise {
          animation: gotham-beam-rise 0.45s ease-out forwards;
        }

        .anim-bat-pop {
          animation: gotham-bat-materialize 0.45s cubic-bezier(0.2, 0.9, 0.3, 1) forwards;
        }

        .anim-dissolve {
          animation: gotham-emerge-dissolve 0.45s ease-out forwards;
        }
      `}</style>

      {/* Stage 1: Screen Fades to Near-Black */}
      {transitionStage === 'dim' && (
        <div className="absolute inset-0 bg-[#05070A] anim-darken" />
      )}

      {/* Stage 2 & 3: Searchlight Switch-On & Beam Rising Through Fog */}
      {(transitionStage === 'searchlight' || transitionStage === 'beam') && (
        <div className="absolute inset-0 bg-[#07090F]">
          {/* Intense Searchlight Ground Ignition */}
          <div
            className="absolute bottom-[-10%] right-[22%] w-[40vw] h-[120vh] anim-ignite"
            style={{
              background: 'conic-gradient(from 180deg at 50% 100%, transparent 82deg, rgba(255, 229, 0, 0.4) 89deg, rgba(255, 255, 255, 0.8) 90deg, rgba(255, 229, 0, 0.4) 91deg, transparent 98deg)',
              filter: 'blur(16px)',
              transformOrigin: '50% 100%',
            }}
          />

          {/* Rising Volumetric Beam Overlay */}
          {transitionStage === 'beam' && (
            <div
              className="absolute inset-0 anim-beam-rise"
              style={{
                background: 'linear-gradient(to top, rgba(255,229,0,0.4) 0%, rgba(255,255,255,0.7) 40%, rgba(255,229,0,0.5) 100%)',
                filter: 'blur(20px)',
              }}
            />
          )}

          {/* Atmospheric Sparkle / Fog Glint */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,229,0,0.15)_0%,_transparent_70%)]" />
        </div>
      )}

      {/* Stage 4: Bat Emblem Materializes in the Glowing Sky */}
      {transitionStage === 'bat' && (
        <div className="absolute inset-0 bg-[#080A0F] flex items-center justify-center">
          {/* Glowing Circular High-Beam Disc */}
          <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full flex items-center justify-center anim-bat-pop">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, #FFFFD0 0%, #FFE500 55%, transparent 75%)',
                boxShadow: '0 0 100px rgba(255, 229, 0, 0.9), inset 0 0 60px #FFFFFF',
                filter: 'blur(6px)',
              }}
            />

            {/* The Materializing Bat Silhouette */}
            <svg
              viewBox="0 0 200 110"
              className="w-48 sm:w-60 h-auto relative z-10 drop-shadow-[0_0_16px_#000000]"
            >
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
                stroke="#000000"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Stage 5: Skyline & Content Emerge (Smooth Dissolve Handoff) */}
      {transitionStage === 'emerge' && (
        <div className="absolute inset-0 bg-[#080A0F] anim-dissolve" />
      )}
    </div>
  );
};
