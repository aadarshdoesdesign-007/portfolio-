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
        /* Stage 1: Power Grid Dim */
        @keyframes gotham-dim {
          0% { opacity: 0; }
          40% { opacity: 0.85; }
          60% { opacity: 0.65; }
          100% { opacity: 0.95; }
        }

        /* Stage 2: Thunder Flash */
        @keyframes gotham-lightning-flash {
          0% { opacity: 0; }
          15% { opacity: 0.95; }
          30% { opacity: 0.2; }
          45% { opacity: 0.85; }
          100% { opacity: 0; }
        }

        /* Stage 3: Volumetric Bat-Signal Beam Sweep */
        @keyframes bat-signal-sweep-enter {
          0% {
            transform: translate(-100%, 80%) rotate(-35deg);
            opacity: 0;
          }
          30% {
            opacity: 0.95;
          }
          70% {
            opacity: 0.95;
            transform: translate(20%, -30%) rotate(-15deg);
          }
          100% {
            transform: translate(100%, -80%) rotate(0deg);
            opacity: 0;
          }
        }

        @keyframes bat-signal-sweep-exit {
          0% {
            transform: translate(0%, 0%) rotate(0deg);
            opacity: 0.8;
          }
          100% {
            transform: translate(120%, -60%) rotate(25deg);
            opacity: 0;
          }
        }

        .anim-dim {
          animation: gotham-dim 0.22s ease-in forwards;
        }

        .anim-flash {
          animation: gotham-lightning-flash 0.3s ease-out forwards;
        }

        .anim-sweep-enter {
          animation: bat-signal-sweep-enter 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .anim-sweep-exit {
          animation: bat-signal-sweep-exit 0.55s ease-out forwards;
        }
      `}</style>

      {/* Dimming Darkness Overlay */}
      {transitionStage === 'dim' && (
        <div className="absolute inset-0 bg-[#080A0F] anim-dim" />
      )}

      {/* Distant Lightning Flash */}
      {transitionStage === 'flash' && (
        <div
          className={`absolute inset-0 anim-flash ${
            isGotham
              ? 'bg-[radial-gradient(ellipse_at_top,_rgba(240,248,255,0.95)_0%,_rgba(255,229,0,0.4)_50%,_transparent_100%)]'
              : 'bg-[radial-gradient(ellipse_at_center,_rgba(255,245,210,0.9)_0%,_rgba(255,180,100,0.3)_60%,_transparent_100%)]'
          }`}
        />
      )}

      {/* Volumetric Bat-Signal Beam Sweeping Across Viewport */}
      {transitionStage === 'sweep' && (
        <div
          className={`absolute w-[180vw] h-[180vh] -top-[40vh] -left-[40vw] flex items-center justify-center ${
            isGotham ? 'anim-sweep-enter' : 'anim-sweep-exit'
          }`}
        >
          {/* Conical Light Beam */}
          <div
            className="relative w-[100vw] h-[70vh] flex items-center justify-center"
            style={{
              background: isGotham
                ? 'radial-gradient(ellipse at center, rgba(255,229,0,0.42) 0%, rgba(255,229,0,0.18) 35%, rgba(255,229,0,0.04) 65%, transparent 75%)'
                : 'radial-gradient(ellipse at center, rgba(255,240,180,0.5) 0%, rgba(255,220,120,0.2) 40%, transparent 75%)',
              filter: 'blur(10px)',
            }}
          >
            {/* Bat Signal Silhouette Projected Inside Beam */}
            {isGotham && (
              <svg
                viewBox="0 0 48 30"
                width="160"
                height="100"
                className="opacity-90 drop-shadow-[0_0_25px_#FFE500]"
              >
                <path
                  d="M 24 6
                     C 22.8 4.2, 22.2 1.5, 21.6 0
                     C 21.0 1.5, 20.4 4.2, 19.2 6
                     C 16.5 5.5, 12.0 4.5, 4.0 9.0
                     C 7.5 13.0, 10.5 15.5, 10.0 19.5
                     C 13.0 18.0, 16.5 19.5, 17.5 24.5
                     C 19.5 22.0, 22.0 23.5, 24.0 29.5
                     C 26.0 23.5, 28.5 22.0, 30.5 24.5
                     C 31.5 19.5, 35.0 18.0, 38.0 19.5
                     C 37.5 15.5, 40.5 13.0, 44.0 9.0
                     C 36.0 4.5, 31.5 5.5, 28.8 6
                     C 27.6 4.2, 27.0 1.5, 26.4 0
                     C 25.8 1.5, 25.2 4.2, 24.0 6 Z"
                  fill="#080A0F"
                  stroke="#FFE500"
                  strokeWidth="0.8"
                />
              </svg>
            )}
          </div>
        </div>
      )}

      {/* Settle: Soft Ambient Fog Fade */}
      {transitionStage === 'settle' && (
        <div
          className="absolute inset-0 transition-opacity duration-300 opacity-0"
          style={{
            background: isGotham ? '#080A0F' : 'transparent',
          }}
        />
      )}
    </div>
  );
};
