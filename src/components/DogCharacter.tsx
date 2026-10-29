import React from 'react';

// ============================================================================
// DORA — THE CINNAMON CHOW CHOW 🐕
// A recognizable, adorable cinnamon-colored Chow Chow vector illustration.
// Features: Dense double-coat lion mane, broad round face, small upright ears,
// short plush muzzle, sturdy compact build, four natural legs with bear paws,
// tightly curled plume tail over the back, and iconic blue-purple tongue.
// 100% upright stance — no sideways rotation or unnatural distortion.
// ============================================================================

export const DogCharacter: React.FC<{
  size?: number;
  isMoving?: boolean;
  isPanting?: boolean;
}> = ({ size = 150, isMoving = false, isPanting = true }) => {
  return (
    <div
      className={`relative block select-none pointer-events-none ${isMoving ? 'dora-running' : ''}`}
      style={{
        width: size,
        height: (size * 160) / 200,
        overflow: 'visible',
      }}
    >
      <style>{`
        /* 1. Tail Wagging */
        @keyframes dora-tail-wag-idle {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-5deg); }
        }
        @keyframes dora-tail-wag-run {
          0%, 100% { transform: rotate(4deg); }
          50% { transform: rotate(-8deg); }
        }

        /* 2. Tongue Panting */
        @keyframes dora-tongue-pant {
          0%, 100% { transform: translateY(0px) scale(1, 1); }
          50% { transform: translateY(1.5px) scale(1.05, 1.1); }
        }

        /* 3. Subtle Scamper Trot Cycle (Active only when running) */
        @keyframes dora-trot-bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3.5px); }
        }
        @keyframes dora-leg-front-near {
          0%, 100% { transform: rotate(10deg); }
          50% { transform: rotate(-10deg); }
        }
        @keyframes dora-leg-front-far {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
        }
        @keyframes dora-leg-back-near {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(8deg); }
        }
        @keyframes dora-leg-back-far {
          0%, 100% { transform: rotate(8deg); }
          50% { transform: rotate(-8deg); }
        }

        /* Default Idle Animations */
        .dora-tail {
          transform-origin: 44px 76px;
          animation: dora-tail-wag-idle 1.8s infinite ease-in-out;
        }
        .dora-tongue {
          transform-origin: 165px 65px;
          animation: dora-tongue-pant 0.4s infinite ease-in-out;
        }

        /* Active Running Animations */
        .dora-running .dora-body-root {
          animation: dora-trot-bounce 0.24s infinite ease-in-out;
        }
        .dora-running .dora-tail {
          animation: dora-tail-wag-run 0.3s infinite ease-in-out;
        }
        .dora-running .dora-leg-fn {
          transform-origin: 138px 94px;
          animation: dora-leg-front-near 0.24s infinite ease-in-out;
        }
        .dora-running .dora-leg-ff {
          transform-origin: 128px 94px;
          animation: dora-leg-front-far 0.24s infinite ease-in-out;
        }
        .dora-running .dora-leg-bn {
          transform-origin: 64px 94px;
          animation: dora-leg-back-near 0.24s infinite ease-in-out;
        }
        .dora-running .dora-leg-bf {
          transform-origin: 54px 94px;
          animation: dora-leg-back-far 0.24s infinite ease-in-out;
        }
      `}</style>

      <svg
        viewBox="0 0 200 160"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        className="block overflow-visible drop-shadow-[0_4px_10px_rgba(0,0,0,0.12)]"
      >
        {/* ================= 0. GROUND CONTACT SHADOW ================= */}
        <ellipse cx="102" cy="146" rx="66" ry="7" fill="rgba(0,0,0,0.14)" />

        {/* ================= ANIMATED BODY ROOT ================= */}
        <g className="dora-body-root">
          {/* ================= 1. FAR LEGS (Shaded Chestnut) ================= */}
          <g fill="#9C3E0E" stroke="#000000" strokeWidth="2.6" strokeLinejoin="round">
            {/* Back Right Far Leg */}
            <g className="dora-leg-bf">
              <path d="M 52 96 C 50 108, 48 126, 52 138 C 53 141, 60 142, 63 139 C 65 132, 63 112, 62 96 Z" />
              <ellipse cx="57" cy="139" rx="7.5" ry="4" fill="#803208" />
            </g>

            {/* Front Right Far Leg */}
            <g className="dora-leg-ff">
              <path d="M 124 94 C 122 106, 122 125, 124 138 C 125 141, 132 142, 135 139 C 137 132, 135 110, 134 94 Z" />
              <ellipse cx="129" cy="139" rx="7.5" ry="4" fill="#803208" />
            </g>
          </g>

          {/* ================= 2. CURLED PLUME TAIL ================= */}
          <g className="dora-tail">
            {/* Base Plume curled tightly over back */}
            <path
              d="M 44 76 C 26 66, 16 38, 32 20 C 46 6, 68 12, 74 28 C 78 38, 72 48, 60 50 C 52 52, 46 62, 44 76 Z"
              fill="#D4702D"
              stroke="#000000"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
            {/* Fluffy scalloped highlights */}
            <path
              d="M 28 28 C 24 18, 36 10, 48 14 C 60 18, 66 28, 58 34 C 48 30, 36 32, 28 28 Z"
              fill="#E88B46"
            />
            <path
              d="M 42 16 C 48 12, 58 14, 62 22"
              stroke="#A64614"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* ================= 3. COMPACT FLUFFY BODY ================= */}
          <g>
            {/* Torso & Barrel Chest */}
            <path
              d="M 46 80 C 42 66, 56 60, 78 62 C 104 64, 124 66, 136 78 C 146 88, 142 108, 126 116 C 110 120, 78 120, 60 114 C 48 108, 48 94, 46 80 Z"
              fill="#D4702D"
              stroke="#000000"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
            {/* Rear fluffy pantaloons / rump tuft */}
            <path
              d="M 42 76 C 34 84, 34 98, 44 108 C 50 114, 58 116, 62 108 C 54 102, 50 90, 48 78 Z"
              fill="#C86226"
              stroke="#000000"
              strokeWidth="2.6"
              strokeLinejoin="round"
            />
            {/* Warm cinnamon coat highlight */}
            <ellipse cx="88" cy="84" rx="36" ry="18" fill="#E88B46" />
            <path
              d="M 64 92 C 76 100, 96 102, 108 96"
              stroke="#A64614"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* ================= 4. NEAR LEGS & STURDY BEAR PAWS ================= */}
          <g>
            {/* Back Left Near Leg */}
            <g className="dora-leg-bn">
              <path
                d="M 58 92 C 54 105, 56 122, 60 138 C 62 143, 72 144, 75 140 C 78 130, 76 110, 74 92 Z"
                fill="#D4702D"
                stroke="#000000"
                strokeWidth="2.8"
                strokeLinejoin="round"
              />
              <ellipse cx="67" cy="141" rx="9" ry="5.5" fill="#E88B46" stroke="#000000" strokeWidth="2.6" />
              <line x1="64" y1="139" x2="64" y2="144" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
              <line x1="69" y1="139" x2="69" y2="144" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* Front Left Near Leg */}
            <g className="dora-leg-fn">
              <path
                d="M 134 90 C 132 104, 134 122, 137 138 C 139 143, 149 144, 152 140 C 155 130, 153 110, 148 90 Z"
                fill="#D4702D"
                stroke="#000000"
                strokeWidth="2.8"
                strokeLinejoin="round"
              />
              <ellipse cx="144" cy="141" rx="9" ry="5.5" fill="#E88B46" stroke="#000000" strokeWidth="2.6" />
              <line x1="141" y1="139" x2="141" y2="144" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
              <line x1="146" y1="139" x2="146" y2="144" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
            </g>
          </g>

          {/* ================= 5. THE MAGNIFICENT LION MANE (RUFF) ================= */}
          <g>
            {/* Outer deep mane silhouette */}
            <path
              d="M 112 50 C 104 62, 106 82, 116 98 C 126 112, 146 118, 162 108 C 174 98, 180 82, 178 68 C 176 52, 164 36, 146 32 C 132 30, 118 38, 112 50 Z"
              fill="#A64614"
              stroke="#000000"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
            {/* Scalloped middle mane layer */}
            <path
              d="M 118 54 C 112 66, 114 82, 124 94 C 132 104, 148 108, 160 100 C 168 92, 172 78, 168 66 C 164 52, 154 40, 140 38 C 128 36, 122 44, 118 54 Z"
              fill="#C86226"
            />
            {/* Warm amber fluffy chest tufts */}
            <path
              d="M 126 62 C 122 72, 126 86, 134 92 C 142 98, 154 96, 158 88 C 162 80, 160 70, 152 64 C 144 58, 130 56, 126 62 Z"
              fill="#E88B46"
            />
            {/* Fawn chest accent bib */}
            <path
              d="M 134 72 C 132 78, 136 86, 142 88 C 148 90, 152 86, 154 80 C 150 74, 138 70, 134 72 Z"
              fill="#FCE6D2"
            />
          </g>

          {/* ================= 6. BROAD HEAD & CHOW CHOW EXPRESSION ================= */}
          <g>
            {/* Far Ear (small, rounded-triangular, upright, nestled in fur) */}
            <path
              d="M 132 34 C 128 24, 138 18, 144 24 C 146 28, 144 34, 138 36 Z"
              fill="#803208"
              stroke="#000000"
              strokeWidth="2.6"
              strokeLinejoin="round"
            />

            {/* Broad rounded skull */}
            <circle cx="150" cy="54" r="22" fill="#D4702D" stroke="#000000" strokeWidth="2.8" />
            <ellipse cx="147" cy="48" rx="17" ry="13" fill="#E88B46" />

            {/* Near Ear (small, rounded-triangular, upright) */}
            <path
              d="M 152 32 C 150 20, 162 16, 168 24 C 170 30, 166 36, 158 36 Z"
              fill="#9C3E0E"
              stroke="#000000"
              strokeWidth="2.6"
              strokeLinejoin="round"
            />
            <path d="M 156 26 C 154 22, 160 20, 164 24" stroke="#D4702D" strokeWidth="2" fill="none" />

            {/* Brow furrow / forehead wrinkles */}
            <path d="M 142 42 Q 148 38 154 42" stroke="#803208" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <path d="M 145 46 Q 148 44 152 46" stroke="#803208" strokeWidth="1.8" strokeLinecap="round" fill="none" />

            {/* Deep-set dark eyes with bright catchlights */}
            <circle cx="142" cy="48" r="3.5" fill="#000000" />
            <circle cx="143.5" cy="46.5" r="1.2" fill="#FFFFFF" />

            <circle cx="157" cy="48" r="3.5" fill="#000000" />
            <circle cx="158.5" cy="46.5" r="1.2" fill="#FFFFFF" />

            {/* Broad, short plush muzzle (creamy fawn) */}
            <path
              d="M 144 54 C 140 62, 142 70, 152 74 C 164 78, 178 74, 180 64 C 182 54, 172 50, 162 50 C 154 50, 146 50, 144 54 Z"
              fill="#FCE6D2"
              stroke="#000000"
              strokeWidth="2.6"
              strokeLinejoin="round"
            />

            {/* Chunky black truffle button nose */}
            <polygon points="166,54 176,54 171,60" fill="#000000" stroke="#000000" strokeWidth="2" strokeLinejoin="round" />
            <circle cx="170" cy="55.5" r="1" fill="#FFFFFF" />
            <line x1="171" y1="60" x2="171" y2="64" stroke="#000000" strokeWidth="2" strokeLinecap="round" />

            {/* Signature Chow Chow Blue-Purple Tongue! 👅 */}
            <g className={isPanting ? 'dora-tongue' : ''}>
              {/* Happy open mouth */}
              <path
                d="M 158 64 Q 165 67 172 64 Q 165 77 158 64 Z"
                fill="#2E1C38"
                stroke="#000000"
                strokeWidth="2"
              />
              {/* Iconic Blue/Purple Tongue */}
              <path
                d="M 159 65 C 157 73, 161 78, 165 78 C 169 78, 171 72, 170 65 Z"
                fill="#52396B"
                stroke="#000000"
                strokeWidth="2"
              />
              <path
                d="M 163 67 C 162 72, 163 76, 165 76"
                stroke="#7E5F9E"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            </g>
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
