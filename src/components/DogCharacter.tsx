import React from 'react';

// ============================================================================
// DORA — THE CINNAMON CHOW CHOW 🐕
// A recognizable, adorable cinnamon-colored Chow Chow with a lion-like ruff,
// broad head, small upright ears, compact sturdy build, and curled plume tail.
// ============================================================================

export const DogCharacter: React.FC<{
  size?: number;
  isMoving?: boolean;
  isPanting?: boolean;
}> = ({ size = 150, isMoving = false, isPanting = true }) => {
  return (
    <div className={`relative block overflow-visible select-none ${isMoving ? 'dora-running' : ''}`}>
      <style>{`
        /* Short, stout, energetic scamper matching a fluffy Chow Chow build */
        @keyframes chow-leg-fl {
          0%, 100% { transform: rotate(18deg); }
          50% { transform: rotate(-18deg); }
        }
        @keyframes chow-leg-fr {
          0%, 100% { transform: rotate(-18deg); }
          50% { transform: rotate(18deg); }
        }
        @keyframes chow-leg-bl {
          0%, 100% { transform: rotate(-16deg); }
          50% { transform: rotate(16deg); }
        }
        @keyframes chow-leg-br {
          0%, 100% { transform: rotate(16deg); }
          50% { transform: rotate(-16deg); }
        }
        @keyframes chow-tail-bob {
          0%, 100% { transform: rotate(0deg) translateY(0px); }
          50% { transform: rotate(-12deg) translateY(-2px); }
        }
        @keyframes chow-body-trot {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-3.5px) rotate(1.2deg); }
        }
        @keyframes chow-mane-bounce {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.02, 0.98) rotate(-1deg); }
        }
        @keyframes chow-tongue-pant {
          0%, 100% { transform: translateY(0px) scale(1, 1); }
          50% { transform: translateY(1.5px) scale(1.06, 1.12); }
        }

        .dora-running .anim-fl { animation: chow-leg-fl 0.22s infinite ease-in-out; }
        .dora-running .anim-fr { animation: chow-leg-fr 0.22s infinite ease-in-out; }
        .dora-running .anim-bl { animation: chow-leg-bl 0.22s infinite ease-in-out; }
        .dora-running .anim-br { animation: chow-leg-br 0.22s infinite ease-in-out; }
        .dora-running .anim-tail { animation: chow-tail-bob 0.26s infinite ease-in-out; }
        .dora-running .anim-body { animation: chow-body-trot 0.22s infinite ease-in-out; }
        .dora-running .anim-mane { animation: chow-mane-bounce 0.22s infinite ease-in-out; }
        .anim-tongue-pant { animation: chow-tongue-pant 0.38s infinite ease-in-out; transform-origin: 20px 13px; }
      `}</style>

      <svg
        viewBox="0 0 170 135"
        width={size}
        height={(size * 135) / 170}
        className="block overflow-visible drop-shadow-[0_6px_14px_rgba(0,0,0,0.18)]"
      >
        {/* ================= 1. PLUMY CURLED TAIL (tight over back) ================= */}
        <g className="anim-tail" style={{ transformOrigin: '38px 46px' }}>
          {/* Thick curled tail plumage */}
          <path
            d="M 38 46 C 24 38, 16 16, 32 8 C 48 0, 62 14, 52 28 C 46 34, 40 38, 38 46 Z"
            fill="#D4702D"
            stroke="#000000"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          {/* Fluffy scalloped plume highlights */}
          <path
            d="M 28 20 C 26 12, 36 6, 44 10 C 52 14, 56 22, 48 26 C 42 22, 34 22, 28 20 Z"
            fill="#E88B46"
          />
          <path
            d="M 36 12 C 40 8, 48 10, 50 16"
            stroke="#A64614"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* ================= 2. FAR LEGS (shaded chestnut) ================= */}
        {/* Back Right Leg (far) */}
        <g className="anim-br" style={{ transformOrigin: '48px 84px' }}>
          <path
            d="M 42 80 C 40 92, 41 106, 44 112 C 46 116, 54 116, 56 112 C 58 106, 56 90, 54 80 Z"
            fill="#9C3E0E"
            stroke="#000000"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Paws */}
          <ellipse cx="49" cy="112" rx="7" ry="4" fill="#803208" stroke="#000000" strokeWidth="2.2" />
        </g>

        {/* Front Right Leg (far) */}
        <g className="anim-fr" style={{ transformOrigin: '110px 84px' }}>
          <path
            d="M 104 80 C 103 92, 104 106, 107 112 C 109 116, 117 116, 119 112 C 121 106, 119 90, 117 80 Z"
            fill="#9C3E0E"
            stroke="#000000"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <ellipse cx="112" cy="112" rx="7" ry="4" fill="#803208" stroke="#000000" strokeWidth="2.2" />
        </g>

        {/* ================= 3. COMPACT FLUFFY BODY & HINDQUARTERS ================= */}
        <g className="anim-body">
          {/* Deep undercoat */}
          <ellipse cx="80" cy="68" rx="46" ry="29" fill="#C86226" stroke="#000000" strokeWidth="2.8" />

          {/* Fluffy rump scallops / pantaloons */}
          <path
            d="M 40 52 C 32 58, 30 74, 38 84 C 44 92, 56 94, 62 86 C 54 80, 52 66, 50 54 Z"
            fill="#D4702D"
            stroke="#000000"
            strokeWidth="2.5"
          />

          {/* Warm cinnamon coat highlights */}
          <ellipse cx="78" cy="62" rx="34" ry="18" fill="#E88B46" />
          <path
            d="M 52 68 C 60 76, 76 78, 88 74"
            stroke="#A64614"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* ================= 4. NEAR LEGS (cinnamon with sturdy bear paws) ================= */}
        {/* Back Left Leg (near) */}
        <g className="anim-bl" style={{ transformOrigin: '56px 82px' }}>
          {/* Fluffy pantaloon thigh */}
          <path
            d="M 48 74 C 46 84, 48 94, 52 106 C 54 112, 64 112, 66 106 C 68 96, 68 84, 66 74 Z"
            fill="#D4702D"
            stroke="#000000"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          {/* Sturdy rounded paw */}
          <ellipse cx="58" cy="108" rx="8" ry="5" fill="#E88B46" stroke="#000000" strokeWidth="2.4" />
          <line x1="56" y1="106" x2="56" y2="111" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="60" y1="106" x2="60" y2="111" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" />
        </g>

        {/* Front Left Leg (near) */}
        <g className="anim-fl" style={{ transformOrigin: '102px 82px' }}>
          <path
            d="M 96 74 C 94 84, 96 96, 98 106 C 100 112, 110 112, 112 106 C 114 96, 114 84, 110 74 Z"
            fill="#D4702D"
            stroke="#000000"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          {/* Sturdy rounded paw */}
          <ellipse cx="104" cy="108" rx="8" ry="5" fill="#E88B46" stroke="#000000" strokeWidth="2.4" />
          <line x1="102" y1="106" x2="102" y2="111" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="106" y1="106" x2="106" y2="111" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" />
        </g>

        {/* ================= 5. DORA'S LION MANE & CHOW CHOW HEAD ================= */}
        <g transform="translate(108, 38)" className="anim-body">
          {/* Dense outer lion ruff / mane behind head */}
          <g className="anim-mane">
            <path
              d="M -14 -12 C -24 4, -28 32, -18 48 C -6 64, 18 68, 32 58 C 42 48, 48 30, 44 14 C 40 -4, 20 -20, 4 -20 C -6 -20, -10 -18, -14 -12 Z"
              fill="#A64614"
              stroke="#000000"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
            {/* Fluffy scalloped mane layer */}
            <path
              d="M -10 -6 C -18 8, -20 28, -12 40 C -4 52, 14 56, 26 48 C 34 40, 38 24, 34 10 C 30 -4, 14 -14, 2 -14 Z"
              fill="#C86226"
            />
            <path
              d="M -4 4 C -10 16, -8 32, -2 40 C 6 48, 20 48, 26 40 C 22 28, 20 12, 12 2 Z"
              fill="#E88B46"
            />
          </g>

          {/* Small, rounded-triangular Chow Chow ears emerging from mane */}
          {/* Far Ear */}
          <path
            d="M 6 -20 C 4 -28, 12 -30, 16 -24 C 18 -20, 16 -16, 12 -16 Z"
            fill="#7A2A08"
            stroke="#000000"
            strokeWidth="2.4"
          />
          {/* Near Ear */}
          <path
            d="M 18 -18 C 16 -28, 26 -30, 30 -22 C 32 -18, 30 -14, 26 -14 Z"
            fill="#A64614"
            stroke="#000000"
            strokeWidth="2.4"
          />
          <path d="M 20 -22 C 20 -26, 26 -27, 27 -22" fill="#D4702D" />

          {/* Broad, rounded Chow Chow face base */}
          <circle cx="16" cy="4" r="23" fill="#D4702D" stroke="#000000" strokeWidth="2.8" />
          <ellipse cx="14" cy="-2" rx="18" ry="14" fill="#E88B46" />

          {/* Chow Chow forehead furrow & brow ridges */}
          <path d="M 10 -10 Q 16 -14 22 -10" stroke="#803208" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M 13 -6 Q 16 -9 19 -6" stroke="#803208" strokeWidth="1.6" strokeLinecap="round" fill="none" />

          {/* Small, deep-set kind Chow eyes */}
          <g>
            {/* Left Eye */}
            <circle cx="11" cy="-4" r="3.4" fill="#000000" />
            <circle cx="12.2" cy="-5" r="1.1" fill="#FFFFFF" />

            {/* Right Eye */}
            <circle cx="24" cy="-4" r="3.4" fill="#000000" />
            <circle cx="25.2" cy="-5" r="1.1" fill="#FFFFFF" />
          </g>

          {/* Broad, short Chow Chow muzzle */}
          <path
            d="M 8 4 C 6 12, 10 20, 18 21 C 26 21, 32 14, 30 5 C 28 0, 10 -1, 8 4 Z"
            fill="#FCE4D0"
            stroke="#000000"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Chunky black button nose with highlight */}
          <polygon points="17,5 23,5 20,9" fill="#000000" stroke="#000000" strokeWidth="1.8" strokeLinejoin="round" />
          <circle cx="19" cy="6" r="0.8" fill="#FFFFFF" />
          <line x1="20" y1="9" x2="20" y2="12" stroke="#000000" strokeWidth="2" strokeLinecap="round" />

          {/* Signature Chow Chow Blue-Purple Tongue! */}
          <g className={isPanting ? 'anim-tongue-pant' : ''}>
            {/* Happy open mouth */}
            <path
              d="M 15 12 Q 20 14 25 12 Q 20 23 15 12 Z"
              fill="#2E1C38"
              stroke="#000000"
              strokeWidth="2"
            />
            {/* Iconic Blue/Purple Tongue protruding happily */}
            <path
              d="M 16 13 C 15 19, 18 24, 21 24 C 24 24, 25 18, 24 13 Z"
              fill="#52396B"
              stroke="#000000"
              strokeWidth="1.8"
            />
            <path
              d="M 18 15 C 18 19, 19 22, 21 22"
              stroke="#7E5F9E"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

// ============================================================================
// VIBRANT TENNIS BALL (Dora's favorite toy!)
// Bright lime-green tennis ball (#90CD26) with crisp curved white seams.
// ============================================================================

export const BallCharacter: React.FC<{ size?: number; spin?: number }> = ({ size = 30, spin = 0 }) => {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      style={{ transform: `rotate(${spin}deg)` }}
      className="block overflow-visible drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
    >
      {/* Tennis Ball Felt Body */}
      <circle cx="20" cy="20" r="18" fill="#90CD26" stroke="#000000" strokeWidth="2.5" />

      {/* Curved white tennis seams */}
      <path
        d="M 6 11 Q 20 18 34 11"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        d="M 6 29 Q 20 22 34 29"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  );
};
