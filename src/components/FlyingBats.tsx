'use client';

import React, { useEffect, useState } from 'react';
import { useGotham } from '@/context/GothamContext';

interface BatSpec {
  id: number;
  size: number;
  animClass: string;
  flapSpeed: string;
  opacity: number;
}

export const FlyingBats: React.FC = () => {
  const { isGotham } = useGotham();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(media.matches);
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
  }, []);

  if (!isGotham || reducedMotion) return null;

  const bats: BatSpec[] = [
    // 1. Foreground leader bat passing near the Bat-Signal
    { id: 1, size: 48, animClass: 'bat-flight-1', flapSpeed: '0.32s', opacity: 0.95 },
    // 2. Trailing partner following leader
    { id: 2, size: 38, animClass: 'bat-flight-2', flapSpeed: '0.28s', opacity: 0.9 },
    // 3. Midground bat crossing middle sky
    { id: 3, size: 32, animClass: 'bat-flight-3', flapSpeed: '0.36s', opacity: 0.8 },
    // 4. Gliding bat diving near the searchlight beam
    { id: 4, size: 26, animClass: 'bat-flight-4', flapSpeed: '0.3s', opacity: 0.75 },
    // 5. Distant skyline bat
    { id: 5, size: 20, animClass: 'bat-flight-5', flapSpeed: '0.25s', opacity: 0.65 },
    // 6. High-altitude distant bat
    { id: 6, size: 18, animClass: 'bat-flight-6', flapSpeed: '0.22s', opacity: 0.55 },
  ];

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-10"
    >
      <style>{`
        /* Wing Flapping Keyframes for Left & Right Wings */
        @keyframes bat-flap-left {
          0%, 100% {
            transform: scaleY(1) rotate(0deg);
          }
          50% {
            transform: scaleY(-0.7) rotate(-22deg);
          }
        }

        @keyframes bat-flap-right {
          0%, 100% {
            transform: scaleY(1) rotate(0deg);
          }
          50% {
            transform: scaleY(-0.7) rotate(22deg);
          }
        }

        /* -------------------------------------------------------------------
           Deterministic Staggered Flight Trajectories Across the Hero Sky
           ------------------------------------------------------------------- */
        /* Path 1: High glide crossing from upper-right past Bat-Signal to left */
        @keyframes bat-traj-1 {
          0% {
            transform: translate(105vw, 15vh) rotate(-12deg);
            opacity: 0;
          }
          10% { opacity: 0.95; }
          45% {
            transform: translate(55vw, 10vh) rotate(-6deg);
          }
          85% { opacity: 0.95; }
          100% {
            transform: translate(-10vw, 22vh) rotate(-16deg);
            opacity: 0;
          }
        }

        /* Path 2: Close trailing companion bat */
        @keyframes bat-traj-2 {
          0% {
            transform: translate(110vw, 20vh) rotate(-8deg);
            opacity: 0;
          }
          12% { opacity: 0.9; }
          50% {
            transform: translate(60vw, 16vh) rotate(-4deg);
          }
          88% { opacity: 0.9; }
          100% {
            transform: translate(-12vw, 28vh) rotate(-14deg);
            opacity: 0;
          }
        }

        /* Path 3: Midground sweeping swoop across beam center */
        @keyframes bat-traj-3 {
          0% {
            transform: translate(108vw, 38vh) rotate(-15deg);
            opacity: 0;
          }
          10% { opacity: 0.8; }
          40% {
            transform: translate(65vw, 28vh) rotate(-8deg);
          }
          75% {
            transform: translate(25vw, 36vh) rotate(5deg);
          }
          90% { opacity: 0.8; }
          100% {
            transform: translate(-10vw, 42vh) rotate(-10deg);
            opacity: 0;
          }
        }

        /* Path 4: Fast swoop diving near the skyline and climbing */
        @keyframes bat-traj-4 {
          0% {
            transform: translate(-10vw, 45vh) rotate(18deg) scaleX(-1);
            opacity: 0;
          }
          12% { opacity: 0.75; }
          50% {
            transform: translate(45vw, 32vh) rotate(10deg) scaleX(-1);
          }
          85% { opacity: 0.75; }
          100% {
            transform: translate(108vw, 20vh) rotate(22deg) scaleX(-1);
            opacity: 0;
          }
        }

        /* Path 5: Distant bat across skyscraper spires */
        @keyframes bat-traj-5 {
          0% {
            transform: translate(105vw, 55vh) rotate(-6deg);
            opacity: 0;
          }
          10% { opacity: 0.65; }
          50% {
            transform: translate(50vw, 52vh) rotate(-2deg);
          }
          90% { opacity: 0.65; }
          100% {
            transform: translate(-10vw, 58vh) rotate(-10deg);
            opacity: 0;
          }
        }

        /* Path 6: High distant flutter near cloud ceiling */
        @keyframes bat-traj-6 {
          0% {
            transform: translate(105vw, 6vh) rotate(-10deg);
            opacity: 0;
          }
          15% { opacity: 0.55; }
          50% {
            transform: translate(48vw, 5vh) rotate(-4deg);
          }
          85% { opacity: 0.55; }
          100% {
            transform: translate(-10vw, 8vh) rotate(-12deg);
            opacity: 0;
          }
        }

        .bat-flight-1 {
          animation: bat-traj-1 18s linear infinite;
          animation-delay: 0.5s;
        }

        .bat-flight-2 {
          animation: bat-traj-2 19s linear infinite;
          animation-delay: 4.5s;
        }

        .bat-flight-3 {
          animation: bat-traj-3 23s linear infinite;
          animation-delay: 9s;
        }

        .bat-flight-4 {
          animation: bat-traj-4 21s linear infinite;
          animation-delay: 14s;
        }

        .bat-flight-5 {
          animation: bat-traj-5 28s linear infinite;
          animation-delay: 7s;
        }

        .bat-flight-6 {
          animation: bat-traj-6 32s linear infinite;
          animation-delay: 18s;
        }
      `}</style>

      {bats.map((bat) => (
        <div
          key={bat.id}
          className={`absolute will-change-transform ${bat.animClass}`}
          style={{
            width: bat.size,
            height: (bat.size * 22) / 38,
            opacity: bat.opacity,
          }}
        >
          {/* Authentic Vector Bat with Animated Flapping Wings */}
          <svg
            viewBox="0 0 76 44"
            width="100%"
            height="100%"
            className="block overflow-visible drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]"
          >
            {/* Bat Torso and Head with Pointed Ears */}
            <path
              d="M 38 16
                 C 37 13, 35 9, 34 7
                 C 35 11, 36 14, 35 17
                 C 33 19, 31 24, 33 30
                 C 35 34, 38 37, 38 39
                 C 38 37, 41 34, 43 30
                 C 45 24, 43 19, 41 17
                 C 40 14, 41 11, 42 7
                 C 41 9, 39 13, 38 16 Z"
              fill="#05070B"
            />

            {/* Left Flapping Wing */}
            <g
              style={{
                transformOrigin: '35px 20px',
                animation: `bat-flap-left ${bat.flapSpeed} ease-in-out infinite`,
              }}
            >
              <path
                d="M 35 18
                   C 28 10, 18 6, 2 12
                   C 8 19, 14 24, 15 32
                   C 21 26, 27 28, 29 34
                   C 33 28, 35 24, 35 18 Z"
                fill="#07090F"
              />
            </g>

            {/* Right Flapping Wing */}
            <g
              style={{
                transformOrigin: '41px 20px',
                animation: `bat-flap-right ${bat.flapSpeed} ease-in-out infinite`,
              }}
            >
              <path
                d="M 41 18
                   C 48 10, 58 6, 74 12
                   C 68 19, 62 24, 61 32
                   C 55 26, 49 28, 47 34
                   C 43 28, 41 24, 41 18 Z"
                fill="#07090F"
              />
            </g>
          </svg>
        </div>
      ))}
    </div>
  );
};
