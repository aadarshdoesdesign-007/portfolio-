import React from 'react';

// Cute hand-drawn style animated dog vector
export const DogCharacter: React.FC<{
  size?: number;
  gaitPhase: number;
  isPanting?: boolean;
}> = ({ size = 200, gaitPhase, isPanting = true }) => {
  // Gait angles for 4 legs
  const frontLeftAngle = Math.sin(gaitPhase) * 22;
  const frontRightAngle = Math.sin(gaitPhase + Math.PI) * 22;
  const backLeftAngle = Math.sin(gaitPhase + Math.PI * 0.5) * 20;
  const backRightAngle = Math.sin(gaitPhase + Math.PI * 1.5) * 20;

  // Tail wagging
  const tailAngle = Math.sin(gaitPhase * 3.5) * 25;
  // Ear bounce
  const earBounce = Math.abs(Math.sin(gaitPhase * 2)) * 6;

  return (
    <svg
      viewBox="0 0 160 120"
      width={size}
      height={(size * 120) / 160}
      className="block overflow-visible drop-shadow-[0_4px_10px_rgba(0,0,0,0.18)]"
    >
      {/* Back Right Leg */}
      <g style={{ transform: `rotate(${backRightAngle}deg)`, transformOrigin: '40px 75px' }}>
        <rect x="36" y="75" width="8" height="24" rx="4" fill="#D48B38" stroke="#000" strokeWidth="2.5" />
        <ellipse cx="40" cy="100" rx="6" ry="4" fill="#D48B38" stroke="#000" strokeWidth="2.5" />
      </g>

      {/* Front Right Leg */}
      <g style={{ transform: `rotate(${frontRightAngle}deg)`, transformOrigin: '115px 75px' }}>
        <rect x="111" y="75" width="8" height="24" rx="4" fill="#D48B38" stroke="#000" strokeWidth="2.5" />
        <ellipse cx="115" cy="100" rx="6" ry="4" fill="#D48B38" stroke="#000" strokeWidth="2.5" />
      </g>

      {/* Wagging Tail */}
      <g style={{ transform: `rotate(${tailAngle}deg)`, transformOrigin: '30px 52px' }}>
        <path
          d="M 30 52 C 15 48, 5 35, 12 25 C 18 18, 25 35, 30 52"
          fill="#F5A623"
          stroke="#000"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </g>

      {/* Dog Torso / Body */}
      <ellipse cx="78" cy="62" rx="44" ry="24" fill="#F5A623" stroke="#000" strokeWidth="2.8" />

      {/* White chest patch */}
      <path
        d="M 98 52 C 112 58, 110 72, 98 76 C 90 74, 92 56, 98 52"
        fill="#FFFFFF"
        stroke="#000"
        strokeWidth="2"
      />

      {/* Back Left Leg */}
      <g style={{ transform: `rotate(${backLeftAngle}deg)`, transformOrigin: '50px 75px' }}>
        <rect x="46" y="75" width="9" height="25" rx="4.5" fill="#F5A623" stroke="#000" strokeWidth="2.8" />
        <ellipse cx="50" cy="101" rx="7" ry="4.5" fill="#F5A623" stroke="#000" strokeWidth="2.8" />
      </g>

      {/* Front Left Leg */}
      <g style={{ transform: `rotate(${frontLeftAngle}deg)`, transformOrigin: '105px 75px' }}>
        <rect x="101" y="75" width="9" height="25" rx="4.5" fill="#F5A623" stroke="#000" strokeWidth="2.8" />
        <ellipse cx="105" cy="101" rx="7" ry="4.5" fill="#F5A623" stroke="#000" strokeWidth="2.8" />
      </g>

      {/* Head Group */}
      <g transform="translate(112, 42)">
        {/* Floppy Left Ear */}
        <g style={{ transform: `rotate(${earBounce}deg)`, transformOrigin: '6px -8px' }}>
          <path
            d="M 6 -8 C -4 -4, -8 16, 2 22 C 8 24, 12 12, 10 -4 Z"
            fill="#D48B38"
            stroke="#000"
            strokeWidth="2.5"
          />
        </g>

        {/* Head Base */}
        <circle cx="12" cy="0" r="20" fill="#F5A623" stroke="#000" strokeWidth="2.8" />

        {/* Snout */}
        <ellipse cx="26" cy="4" rx="12" ry="9" fill="#FFF2D6" stroke="#000" strokeWidth="2.5" />

        {/* Nose */}
        <polygon points="34,1 38,4 34,7" fill="#000000" />

        {/* Happy Eye */}
        <circle cx="16" cy="-5" r="3.2" fill="#000000" />
        <circle cx="17.2" cy="-6" r="1.1" fill="#FFFFFF" />

        {/* Playful Eyebrow */}
        <path d="M 12 -11 Q 16 -13 20 -10" stroke="#000" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Happy Panting Tongue */}
        {isPanting && (
          <path
            d="M 28 8 C 30 14, 26 18, 22 18 C 18 18, 22 10, 24 8"
            fill="#FF4BB9"
            stroke="#000"
            strokeWidth="2"
          />
        )}

        {/* Cute Collar with golden tag */}
        <path d="M -2 12 C 4 17, 14 17, 18 12" stroke="#FF4BB9" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <circle cx="8" cy="18" r="3.5" fill="#FFFF5F" stroke="#000" strokeWidth="1.8" />
      </g>
    </svg>
  );
};

// Vibrant tennis ball / play ball
export const BallCharacter: React.FC<{ size?: number; spin?: number }> = ({ size = 28, spin = 0 }) => {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      style={{ transform: `rotate(${spin}deg)` }}
      className="block overflow-visible drop-shadow-[0_2px_5px_rgba(0,0,0,0.3)]"
    >
      {/* Tennis Ball Body */}
      <circle cx="20" cy="20" r="18" fill="#90CD26" stroke="#000000" strokeWidth="2.5" />

      {/* Curved tennis seams */}
      <path
        d="M 7 10 Q 20 18 33 10"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        d="M 7 30 Q 20 22 33 30"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  );
};
