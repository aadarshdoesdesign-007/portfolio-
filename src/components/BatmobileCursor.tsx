'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useGotham } from '@/context/GothamContext';

export const BatmobileCursor: React.FC = () => {
  const { isGotham } = useGotham();
  const cursorRef = useRef<HTMLDivElement>(null);
  const wheelsRef = useRef<{ front: SVGGElement | null; rear: SVGGElement | null }>({
    front: null,
    rear: null,
  });
  const flameRef = useRef<SVGGElement>(null);
  const headlightsRef = useRef<SVGGElement>(null);

  const [isEnabled, setIsEnabled] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);

  useEffect(() => {
    // 1. Check if device supports fine pointer (mouse/trackpad), not touch-only
    if (typeof window === 'undefined') return;

    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const isTouchOnly = 'ontouchstart' in window && !hasFinePointer;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isGotham || isTouchOnly || prefersReducedMotion) {
      setIsEnabled(false);
      document.documentElement.classList.remove('has-batmobile-cursor');
      return;
    }

    setIsEnabled(true);
    document.documentElement.classList.add('has-batmobile-cursor');

    // 2. Physics & Kinematics State
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: mouse.x, y: mouse.y };
    const prevPos = { x: mouse.x, y: mouse.y };
    let currentAngle = 0;
    let wheelRotation = 0;
    let flameScale = 0;
    let isVisible = false;
    let idleTimer: NodeJS.Timeout | null = null;
    let isIdle = false;
    let animId: number;

    const handlePointerMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (!isVisible && cursorRef.current) {
        isVisible = true;
        cursorRef.current.style.opacity = '1';
      }

      isIdle = false;
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        isIdle = true;
      }, 1200);

      // Check if hovering clickable interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.closest('a, button, [role="button"], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        );
        setIsHoveringClickable(isClickable);
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
    };

    const handleMouseEnter = () => {
      isVisible = true;
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1';
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Shortest angular difference helper
    const angleDiff = (a: number, b: number) => {
      let diff = (b - a + Math.PI) % (Math.PI * 2);
      if (diff < 0) diff += Math.PI * 2;
      return diff - Math.PI;
    };

    // Animation Loop
    let lastTime = performance.now();

    const loop = (time: number) => {
      animId = requestAnimationFrame(loop);

      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      // Smooth trailing interpolation
      const lerpFactor = 0.22;
      pos.x += (mouse.x - pos.x) * lerpFactor;
      pos.y += (mouse.y - pos.y) * lerpFactor;

      const vx = pos.x - prevPos.x;
      const vy = pos.y - prevPos.y;
      prevPos.x = pos.x;
      prevPos.y = pos.y;

      const speed = Math.hypot(vx, vy);

      // Determine vehicle orientation
      if (speed > 0.4) {
        const targetAngle = Math.atan2(vy, vx);
        currentAngle += angleDiff(currentAngle, targetAngle) * 0.28;
      }

      // Wheel rotation based on distance travelled
      wheelRotation = (wheelRotation + speed * 4.5) % 360;
      if (wheelsRef.current.front) {
        wheelsRef.current.front.setAttribute('transform', `rotate(${wheelRotation} 26 25)`);
      }
      if (wheelsRef.current.rear) {
        wheelsRef.current.rear.setAttribute('transform', `rotate(${wheelRotation} 88 25)`);
      }

      // Afterburner flame kinetics
      const targetFlame = speed > 3.5 ? Math.min(1.2, speed / 8) : 0;
      flameScale += (targetFlame - flameScale) * 0.25;

      if (flameRef.current) {
        if (flameScale > 0.05) {
          const jitter = 0.85 + Math.random() * 0.3;
          flameRef.current.style.opacity = `${Math.min(1, flameScale * 1.5)}`;
          flameRef.current.setAttribute('transform', `scale(${flameScale * jitter}, ${flameScale})`);
        } else {
          flameRef.current.style.opacity = '0';
        }
      }

      // Flip vehicle horizontally if moving leftwards so it remains upright
      const isFacingLeft = Math.cos(currentAngle) < 0;
      const displayAngle = isFacingLeft ? currentAngle - Math.PI : currentAngle;
      const flipScaleY = isFacingLeft ? -1 : 1;

      // Offset so the vehicle's cockpit / front nose leads the pointer smoothly
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0px) translate(-50%, -50%) rotate(${displayAngle}rad) scaleY(${flipScaleY})`;
      }
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      if (idleTimer) clearTimeout(idleTimer);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.documentElement.classList.remove('has-batmobile-cursor');
    };
  }, [isGotham]);

  if (!isGotham || !isEnabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[99999] opacity-0 select-none will-change-transform transition-opacity duration-200"
      style={{
        width: 88,
        height: 38,
      }}
    >
      <svg
        viewBox="0 0 110 40"
        width="88"
        height="32"
        className="block overflow-visible drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
      >
        <defs>
          {/* Graphite Armor Gradient */}
          <linearGradient id="bm-armor-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2A303C" />
            <stop offset="35%" stopColor="#151922" />
            <stop offset="80%" stopColor="#0D1017" />
            <stop offset="100%" stopColor="#05070A" />
          </linearGradient>

          {/* Canopy Tint Gradient */}
          <linearGradient id="bm-canopy-grad" x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#FFE500" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#00ADE6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0D1017" stopOpacity="0.95" />
          </linearGradient>

          {/* Afterburner Jet Flame Gradient */}
          <linearGradient id="bm-flame-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#00E5FF" />
            <stop offset="65%" stopColor="#FFE500" />
            <stop offset="100%" stopColor="#FF3B30" stopOpacity="0" />
          </linearGradient>

          {/* Wheel Alloy Gradient */}
          <radialGradient id="bm-wheel-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3E4756" />
            <stop offset="60%" stopColor="#1A1F29" />
            <stop offset="90%" stopColor="#0B0E14" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>
        </defs>

        {/* 1. Afterburner Flame (Rear Exhaust) */}
        <g
          ref={flameRef}
          transform="translate(4, 21)"
          className="will-change-transform"
          style={{ opacity: 0, transformOrigin: '0px 0px' }}
        >
          <path
            d="M 0 0 L -24 -4 Q -32 0 -24 4 Z"
            fill="url(#bm-flame-grad)"
            filter="drop-shadow(0 0 6px #00E5FF)"
          />
        </g>

        {/* 2. Amber Underglow Ground Effect */}
        <ellipse
          cx="55"
          cy="32"
          rx="44"
          ry="5"
          fill="#FFE500"
          opacity={isHoveringClickable ? '0.45' : '0.18'}
          className="transition-opacity duration-200"
          filter="blur(4px)"
        />

        {/* 3. Main Batmobile Chassis & Fin Silhouette */}
        {/* Sleek low-slung body with raised dual bat-fins */}
        <path
          d="M 12 18
             L 14 6
             L 24 16
             L 42 16
             L 52 10
             L 72 10
             L 86 16
             L 104 22
             L 108 25
             L 100 27
             L 94 25
             L 82 25
             L 76 27
             L 38 27
             L 32 25
             L 20 25
             L 16 27
             L 8 26
             L 6 22
             Z"
          fill="url(#bm-armor-grad)"
          stroke="#3A4354"
          strokeWidth="0.8"
        />

        {/* 4. Sculpted Rear Bat-Fins */}
        {/* Left/Far Fin */}
        <path
          d="M 8 18 L 10 3 L 20 15 Z"
          fill="#11151D"
          stroke="#303847"
          strokeWidth="0.5"
        />
        {/* Right/Near Fin */}
        <path
          d="M 14 18 L 18 5 L 28 16 Z"
          fill="#1C222D"
          stroke="#475369"
          strokeWidth="0.6"
        />

        {/* 5. Armored Cockpit Canopy */}
        <path
          d="M 50 16
             L 58 11
             L 70 11
             L 80 16
             Z"
          fill="url(#bm-canopy-grad)"
          stroke="#FFE500"
          strokeWidth="0.6"
          strokeOpacity={isHoveringClickable ? '0.85' : '0.4'}
        />

        {/* 6. Intake Turbine & Side Armor Pods */}
        <path
          d="M 38 18 L 52 18 L 56 24 L 36 24 Z"
          fill="#0D1016"
          stroke="#2D3442"
          strokeWidth="0.5"
        />
        <circle cx="44" cy="21" r="2.5" fill="#FFE500" opacity="0.3" />

        {/* 7. Front Headlights with Forward Beam Projection */}
        <g ref={headlightsRef}>
          {/* Twin Headlight Lenses */}
          <circle cx="106" cy="23.5" r="1.6" fill="#FFFFFF" />
          <circle cx="106" cy="23.5" r="2.8" fill="#FFE500" opacity="0.8" />
          {/* Forward Light Projection Cone */}
          <polygon
            points="106,23 138,15 138,32"
            fill="url(#bm-flame-grad)"
            opacity={isHoveringClickable ? '0.55' : '0.22'}
            className="transition-opacity duration-200"
            filter="blur(3px)"
          />
        </g>

        {/* 8. Glowing Ruby Red Taillights & Fin Markers */}
        <circle cx="8" cy="18" r="1.4" fill="#FF2233" filter="drop-shadow(0 0 3px #FF2233)" />
        <circle cx="18" cy="5.5" r="1" fill="#FF3B30" filter="drop-shadow(0 0 2px #FF3B30)" />

        {/* 9. Heavy Armored Wheels */}
        {/* Front Wheel */}
        <g
          ref={(el) => {
            wheelsRef.current.rear = el;
          }}
          style={{ transformOrigin: '88px 25px' }}
        >
          <circle cx="88" cy="25" r="7" fill="url(#bm-wheel-grad)" stroke="#262D3B" strokeWidth="1" />
          <line x1="88" y1="18" x2="88" y2="32" stroke="#525E73" strokeWidth="0.8" />
          <line x1="81" y1="25" x2="95" y2="25" stroke="#525E73" strokeWidth="0.8" />
          <circle cx="88" cy="25" r="2.2" fill="#FFE500" opacity="0.75" />
        </g>

        {/* Rear Wheel (Larger) */}
        <g
          ref={(el) => {
            wheelsRef.current.front = el;
          }}
          style={{ transformOrigin: '26px 25px' }}
        >
          <circle cx="26" cy="25" r="7.5" fill="url(#bm-wheel-grad)" stroke="#262D3B" strokeWidth="1" />
          <line x1="26" y1="17.5" x2="26" y2="32.5" stroke="#525E73" strokeWidth="0.8" />
          <line x1="18.5" y1="25" x2="33.5" y2="25" stroke="#525E73" strokeWidth="0.8" />
          <circle cx="26" cy="25" r="2.4" fill="#FFE500" opacity="0.75" />
        </g>

        {/* 10. Clickable Hover Target Reticle Pulse */}
        {isHoveringClickable && (
          <circle
            cx="106"
            cy="23.5"
            r="8"
            fill="none"
            stroke="#FFE500"
            strokeWidth="0.8"
            strokeDasharray="2 2"
            className="animate-spin"
            style={{ transformOrigin: '106px 23.5px' }}
          />
        )}
      </svg>
    </div>
  );
};
