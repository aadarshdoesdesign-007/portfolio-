'use client';

import React from 'react';
import { useGotham } from '@/context/GothamContext';

export const GothamAtmosphere: React.FC = () => {
  const { isGotham } = useGotham();

  if (!isGotham) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 select-none overflow-hidden"
    >
      <style>{`
        /* Slow, ambient sweeping searchlights in deep background */
        @keyframes gotham-distant-sweep-1 {
          0%, 100% {
            transform: rotate(-14deg) scaleY(1);
          }
          50% {
            transform: rotate(10deg) scaleY(1.05);
          }
        }

        @keyframes gotham-distant-sweep-2 {
          0%, 100% {
            transform: rotate(18deg) scaleY(1.04);
          }
          50% {
            transform: rotate(-8deg) scaleY(0.98);
          }
        }

        @keyframes gotham-ambient-rain {
          0% {
            background-position: 0px 0px;
          }
          100% {
            background-position: -30px 500px;
          }
        }

        .anim-ambient-beam-1 {
          transform-origin: 15% 100%;
          animation: gotham-distant-sweep-1 28s infinite ease-in-out;
        }

        .anim-ambient-beam-2 {
          transform-origin: 85% 100%;
          animation: gotham-distant-sweep-2 34s infinite ease-in-out;
        }

        .gotham-page-rain {
          background-image: repeating-linear-gradient(
            110deg,
            transparent,
            transparent 65px,
            rgba(255, 255, 255, 0.018) 66px,
            transparent 68px
          );
          background-size: 150px 300px;
          animation: gotham-ambient-rain 2.6s linear infinite;
        }
      `}</style>

      {/* 1. Page-level Subtle Rain Texture */}
      <div className="absolute inset-0 gotham-page-rain opacity-50" />

      {/* 2. Soft Ambient Distant Searchlight (Left Edge) */}
      <div
        className="absolute bottom-0 left-[5%] w-[28vw] h-[115vh] anim-ambient-beam-1 opacity-40 pointer-events-none"
        style={{
          background: 'conic-gradient(from 180deg at 50% 100%, transparent 84deg, rgba(255, 229, 0, 0.03) 89deg, rgba(255, 229, 0, 0.055) 90deg, rgba(255, 229, 0, 0.03) 91deg, transparent 96deg)',
          filter: 'blur(24px)',
        }}
      />

      {/* 3. Soft Ambient Distant Searchlight (Right Edge) */}
      <div
        className="absolute bottom-0 right-[8%] w-[32vw] h-[120vh] anim-ambient-beam-2 opacity-35 pointer-events-none"
        style={{
          background: 'conic-gradient(from 180deg at 50% 100%, transparent 83deg, rgba(255, 229, 0, 0.025) 88deg, rgba(255, 229, 0, 0.045) 90deg, rgba(255, 229, 0, 0.025) 92deg, transparent 97deg)',
          filter: 'blur(28px)',
        }}
      />

      {/* 4. Film Grain / Atmospheric Depth Vignette */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(5, 7, 11, 0.6) 100%)',
        }}
      />
    </div>
  );
};
