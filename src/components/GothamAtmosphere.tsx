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
        /* Slow, cinematic sweeping searchlight beams */
        @keyframes gotham-searchlight-1 {
          0%, 100% {
            transform: rotate(-18deg) scaleY(1);
          }
          50% {
            transform: rotate(14deg) scaleY(1.05);
          }
        }

        @keyframes gotham-searchlight-2 {
          0%, 100% {
            transform: rotate(22deg) scaleY(1.05);
          }
          50% {
            transform: rotate(-12deg) scaleY(0.98);
          }
        }

        /* Subtle ambient rain mist streaks */
        @keyframes gotham-rain {
          0% {
            background-position: 0px 0px;
          }
          100% {
            background-position: -40px 600px;
          }
        }

        .anim-searchlight-1 {
          transform-origin: 25% 100%;
          animation: gotham-searchlight-1 22s infinite ease-in-out;
        }

        .anim-searchlight-2 {
          transform-origin: 75% 100%;
          animation: gotham-searchlight-2 28s infinite ease-in-out;
        }

        .gotham-rain-layer {
          background-image: repeating-linear-gradient(
            105deg,
            transparent,
            transparent 60px,
            rgba(255, 255, 255, 0.02) 61px,
            transparent 63px
          );
          background-size: 140px 300px;
          animation: gotham-rain 2.5s linear infinite;
        }
      `}</style>

      {/* 1. Cinematic Rain Mist Texture */}
      <div className="absolute inset-0 gotham-rain-layer opacity-60" />

      {/* 2. Soft Searchlight Beam 1 (Left) */}
      <div
        className="absolute bottom-0 left-[15%] w-[35vw] h-[120vh] anim-searchlight-1 opacity-70"
        style={{
          background: 'conic-gradient(from 180deg at 50% 100%, transparent 80deg, rgba(255, 229, 0, 0.045) 89deg, rgba(255, 229, 0, 0.075) 90deg, rgba(255, 229, 0, 0.045) 91deg, transparent 100deg)',
          filter: 'blur(16px)',
        }}
      />

      {/* 3. Soft Searchlight Beam 2 (Right) */}
      <div
        className="absolute bottom-0 right-[20%] w-[38vw] h-[125vh] anim-searchlight-2 opacity-60"
        style={{
          background: 'conic-gradient(from 180deg at 50% 100%, transparent 78deg, rgba(255, 229, 0, 0.035) 88deg, rgba(255, 229, 0, 0.065) 90deg, rgba(255, 229, 0, 0.035) 92deg, transparent 102deg)',
          filter: 'blur(20px)',
        }}
      />

      {/* 4. Architectural Gotham City Skyline Silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none overflow-hidden opacity-85">
        <svg
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          width="100%"
          height="100%"
          className="block w-full h-full"
        >
          <defs>
            <linearGradient id="gotham-skyline-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0B0E14" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#080A0F" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#080A0F" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Distant Spire Towers (Back Layer) */}
          <path
            d="M 0 180
               L 0 120 L 30 120 L 35 70 L 45 70 L 48 115 L 75 115 L 80 40 L 85 40 L 90 120
               L 160 120 L 165 95 L 185 95 L 190 130
               L 260 130 L 265 60 L 270 20 L 275 20 L 280 60 L 290 130
               L 360 130 L 375 80 L 390 80 L 405 130
               L 520 130 L 525 50 L 535 50 L 540 130
               L 680 130 L 690 30 L 695 10 L 700 10 L 705 30 L 715 130
               L 840 130 L 850 65 L 865 65 L 875 130
               L 980 130 L 990 45 L 995 15 L 1000 15 L 1005 45 L 1015 130
               L 1140 130 L 1155 75 L 1170 75 L 1185 130
               L 1280 130 L 1290 55 L 1300 55 L 1310 130
               L 1440 130 L 1440 180 Z"
            fill="#06080C"
            opacity="0.6"
          />

          {/* Near Gotham Architecture Silhouette (Front Layer) */}
          <path
            d="M 0 180
               L 0 140 L 40 140 L 50 110 L 80 110 L 90 140
               L 120 140 L 130 90 L 160 90 L 170 140
               L 210 140 L 220 100 L 245 100 L 255 140
               L 310 140 L 320 85 L 340 70 L 360 85 L 370 140
               L 430 140 L 440 105 L 470 105 L 480 140
               L 530 140 L 540 80 L 565 60 L 590 80 L 600 140
               L 660 140 L 675 95 L 710 95 L 725 140
               L 780 140 L 795 75 L 805 50 L 815 75 L 830 140
               L 890 140 L 905 100 L 935 100 L 950 140
               L 1010 140 L 1025 80 L 1040 60 L 1055 80 L 1070 140
               L 1130 140 L 1145 105 L 1175 105 L 1190 140
               L 1250 140 L 1265 90 L 1295 90 L 1310 140
               L 1370 140 L 1385 110 L 1415 110 L 1430 140
               L 1440 140 L 1440 180 Z"
            fill="url(#gotham-skyline-grad)"
          />

          {/* Subtle Wayne Tower Antenna Warning Light */}
          <circle cx="697" cy="12" r="1.8" fill="#FFE500" opacity="0.8" className="animate-pulse" />
          <circle cx="272" cy="22" r="1.5" fill="#FFE500" opacity="0.6" className="animate-pulse" />
          <circle cx="997" cy="17" r="1.6" fill="#FFE500" opacity="0.7" className="animate-pulse" />

          {/* Faint Window Grid Illuminations */}
          <rect x="135" y="105" width="2" height="3" fill="#FFE500" opacity="0.3" />
          <rect x="142" y="105" width="2" height="3" fill="#FFE500" opacity="0.25" />
          <rect x="150" y="105" width="2" height="3" fill="#FFE500" opacity="0.3" />
          <rect x="135" y="115" width="2" height="3" fill="#FFE500" opacity="0.2" />
          <rect x="142" y="115" width="2" height="3" fill="#FFE500" opacity="0.35" />
          <rect x="150" y="115" width="2" height="3" fill="#FFE500" opacity="0.25" />

          <rect x="545" y="95" width="2.5" height="3.5" fill="#FFE500" opacity="0.3" />
          <rect x="555" y="95" width="2.5" height="3.5" fill="#FFE500" opacity="0.35" />
          <rect x="575" y="95" width="2.5" height="3.5" fill="#FFE500" opacity="0.2" />
          <rect x="545" y="105" width="2.5" height="3.5" fill="#FFE500" opacity="0.2" />
          <rect x="555" y="105" width="2.5" height="3.5" fill="#FFE500" opacity="0.4" />
          <rect x="575" y="105" width="2.5" height="3.5" fill="#FFE500" opacity="0.3" />

          <rect x="912" y="112" width="2" height="3" fill="#FFE500" opacity="0.3" />
          <rect x="920" y="112" width="2" height="3" fill="#FFE500" opacity="0.25" />
          <rect x="928" y="112" width="2" height="3" fill="#FFE500" opacity="0.35" />
        </svg>
      </div>
    </div>
  );
};
