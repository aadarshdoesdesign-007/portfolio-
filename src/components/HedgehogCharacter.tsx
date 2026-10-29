import React from 'react';

// ============================================================================
// LEO — THE HEDGEHOG COMPANION 🦔
// A recognizable, adorable little hedgehog vector illustration.
// Features: Rounded body, natural layered two-tone spines, soft peach underbelly,
// cute snout with black button nose, dark twinkling eye, tiny ears, stubby feet,
// and delicate whiskers.
// Upright stance — no sideways rotation.
// Animations: Sniffing nose, eating munch, and fast pitter-patter scurry feet.
// ============================================================================

export const HedgehogCharacter: React.FC<{
  size?: number;
  isMoving?: boolean;
  isEating?: boolean;
}> = ({ size = 95, isMoving = false, isEating = false }) => {
  return (
    <div
      className={`relative block select-none pointer-events-none ${isMoving ? 'leo-running' : ''} ${isEating ? 'leo-eating' : ''}`}
      style={{
        width: size,
        height: (size * 80) / 100,
        overflow: 'visible',
      }}
    >
      <style>{`
        /* 1. Sniffing nose & snout wiggle */
        @keyframes leo-sniff-twitch {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          30% { transform: translateY(-1.2px) rotate(-1deg); }
          60% { transform: translateY(0.8px) rotate(1deg); }
        }

        /* 2. Munching / eating animation */
        @keyframes leo-munch {
          0%, 100% { transform: translateY(0px) scale(1, 1); }
          50% { transform: translateY(-2px) scale(1.03, 0.97); }
        }

        /* 3. Fast pitter-patter feet scurry */
        @keyframes leo-foot-front {
          0%, 100% { transform: rotate(14deg); }
          50% { transform: rotate(-14deg); }
        }
        @keyframes leo-foot-back {
          0%, 100% { transform: rotate(-14deg); }
          50% { transform: rotate(14deg); }
        }
        @keyframes leo-scurry-waddle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-2px) rotate(1deg); }
        }

        /* Default Idle: Gentle Sniffing */
        .leo-snout-group {
          transform-origin: 68px 52px;
          animation: leo-sniff-twitch 1.2s infinite ease-in-out;
        }

        /* Eating: Active Munching */
        .leo-eating .leo-body-root {
          animation: leo-munch 0.35s infinite ease-in-out;
        }
        .leo-eating .leo-snout-group {
          animation: leo-sniff-twitch 0.25s infinite ease-in-out;
        }

        /* Running: Fast Scurry */
        .leo-running .leo-body-root {
          animation: leo-scurry-waddle 0.16s infinite ease-in-out;
        }
        .leo-running .leo-foot-f {
          transform-origin: 64px 71px;
          animation: leo-foot-front 0.16s infinite ease-in-out;
        }
        .leo-running .leo-foot-b {
          transform-origin: 36px 71px;
          animation: leo-foot-back 0.16s infinite ease-in-out;
        }
      `}</style>

      <svg
        viewBox="0 0 100 80"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        className="block overflow-visible drop-shadow-[0_3px_8px_rgba(0,0,0,0.12)]"
      >
        {/* ================= 0. GROUND CONTACT SHADOW ================= */}
        <ellipse cx="50" cy="73" rx="34" ry="4.5" fill="rgba(0,0,0,0.15)" />

        {/* ================= ANIMATED BODY ROOT ================= */}
        <g className="leo-body-root">
          {/* ================= 1. FAR FEET ================= */}
          <g fill="#D89D78" stroke="#000000" strokeWidth="1.8">
            <ellipse cx="30" cy="70" rx="4.5" ry="3" />
            <ellipse cx="60" cy="70" rx="4.5" ry="3" />
          </g>

          {/* ================= 2. SPINES & NATURAL QUILL COAT ================= */}
          {/* Main Quill Mantle */}
          <path
            d="M 46 25 
               C 34 16, 18 20, 12 34 
               C 6 48, 10 62, 22 67 
               C 32 70, 42 68, 52 64 
               C 56 60, 58 54, 56 46 
               C 54 36, 52 28, 46 25 Z"
            fill="#3E2415"
            stroke="#000000"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />

          {/* Quill Tufts & Textures */}
          <g stroke="#000000" strokeWidth="2" strokeLinecap="round" fill="none">
            {/* Outer perimeter spines */}
            <path d="M 12 36 L 6 32 M 10 44 L 4 43 M 12 52 L 6 54 M 18 60 L 12 64" />
            <path d="M 22 22 L 18 15 M 32 18 L 30 11 M 42 20 L 44 13 M 48 26 L 54 20" />

            {/* Inner two-tone tan quill spines */}
            <path d="M 24 30 L 16 26" stroke="#D2A374" strokeWidth="2.2" />
            <path d="M 34 26 L 28 20" stroke="#D2A374" strokeWidth="2.2" />
            <path d="M 40 32 L 36 24" stroke="#D2A374" strokeWidth="2.2" />
            <path d="M 22 42 L 14 42" stroke="#D2A374" strokeWidth="2.2" />
            <path d="M 32 38 L 24 36" stroke="#D2A374" strokeWidth="2.2" />
            <path d="M 42 42 L 34 40" stroke="#D2A374" strokeWidth="2.2" />
            <path d="M 24 54 L 16 56" stroke="#D2A374" strokeWidth="2.2" />
            <path d="M 34 50 L 26 52" stroke="#D2A374" strokeWidth="2.2" />
            <path d="M 44 52 L 36 52" stroke="#D2A374" strokeWidth="2.2" />
          </g>

          {/* ================= 3. SOFT FACE & UNDERBELLY ================= */}
          <path
            d="M 48 32 
               C 58 35, 70 42, 78 50 
               C 82 52, 82 56, 78 58 
               C 70 62, 58 66, 44 66 
               C 38 66, 32 64, 30 62 
               C 40 60, 48 54, 48 44 
               C 48 38, 48 34, 48 32 Z"
            fill="#F0C7A6"
            stroke="#000000"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          {/* Snout blush highlight */}
          <ellipse cx="68" cy="54" rx="7" ry="4.5" fill="#E8B088" />

          {/* ================= 4. NEAR LITTLE FEET ================= */}
          <g fill="#F0C7A6" stroke="#000000" strokeWidth="2">
            {/* Back near foot */}
            <g className="leo-foot-b">
              <ellipse cx="36" cy="71" rx="5" ry="3.2" />
              <line x1="34" y1="71" x2="34" y2="73" stroke="#000000" strokeWidth="1.4" />
              <line x1="37" y1="71" x2="37" y2="73" stroke="#000000" strokeWidth="1.4" />
            </g>

            {/* Front near foot */}
            <g className="leo-foot-f">
              <ellipse cx="64" cy="71" rx="5" ry="3.2" />
              <line x1="62" y1="71" x2="62" y2="73" stroke="#000000" strokeWidth="1.4" />
              <line x1="65" y1="71" x2="65" y2="73" stroke="#000000" strokeWidth="1.4" />
            </g>
          </g>

          {/* ================= 5. TINY ROUND EAR ================= */}
          <path
            d="M 50 38 C 48 32, 54 30, 57 34 C 58 36, 56 40, 52 40 Z"
            fill="#D89D78"
            stroke="#000000"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M 52 36 C 51 34, 54 33, 55 35" stroke="#B87650" strokeWidth="1.4" fill="none" />

          {/* ================= 6. DARK TWINKLING EYE ================= */}
          <circle cx="64" cy="46" r="3.2" fill="#1A1A1A" />
          <circle cx="65.2" cy="44.8" r="1.1" fill="#FFFFFF" />

          {/* ================= 7. SNOUT, NOSE & WHISKERS ================= */}
          <g className="leo-snout-group">
            {/* Tiny Snout Tip & Black Button Nose */}
            <ellipse cx="80" cy="52" rx="2.5" ry="2" fill="#1A1A1A" stroke="#000000" strokeWidth="1.4" />
            <circle cx="79.8" cy="51.4" r="0.7" fill="#FFFFFF" />

            {/* Smiling mouth line */}
            <path d="M 74 57 Q 76 60 78 57" stroke="#3E2415" strokeWidth="1.5" strokeLinecap="round" fill="none" />

            {/* Delicate Whiskers */}
            <line x1="72" y1="52" x2="66" y2="52" stroke="#5C3A21" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="73" y1="55" x2="68" y2="58" stroke="#5C3A21" strokeWidth="1.2" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    </div>
  );
};

// ============================================================================
// CRUNCHY PELLET TREAT (Leo's favorite snack!)
// Small, distinct pellet biscuit shaped like crunchy kibble (#8B4513) with toasted
// golden highlights and crumbs. Not a ball!
// ============================================================================

export const PelletTreat: React.FC<{
  size?: number;
  isNibbled?: boolean;
}> = ({ size = 22, isNibbled = false }) => {
  return (
    <div
      className={`relative block select-none pointer-events-none transition-transform duration-200 ${
        isNibbled ? 'scale-90' : 'scale-100'
      }`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className="block overflow-visible drop-shadow-[0_2px_4px_rgba(0,0,0,0.22)]"
      >
        {/* Pellet Shadow */}
        <ellipse cx="12" cy="19" rx="7.5" ry="2.2" fill="rgba(0,0,0,0.18)" />

        {/* Crunchy Biscuit Pellet Body */}
        <rect
          x="4"
          y="6.5"
          width="16"
          height="10"
          rx="5"
          ry="5"
          fill="#8B4513"
          stroke="#000000"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* Golden toasted top surface */}
        <rect x="6" y="8" width="12" height="4.5" rx="2.2" ry="2.2" fill="#D27D2D" />

        {/* Crunchy texture dots & crumbs */}
        <circle cx="8.5" cy="10" r="0.7" fill="#F4A460" />
        <circle cx="12.5" cy="9.5" r="0.8" fill="#F4A460" />
        <circle cx="15.5" cy="10" r="0.6" fill="#F4A460" />
        <circle cx="11" cy="12.8" r="0.7" fill="#5C2E0B" />
      </svg>
    </div>
  );
};
