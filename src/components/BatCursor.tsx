'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useGotham } from '@/context/GothamContext';

export const BatCursor: React.FC = () => {
  const { isGotham } = useGotham();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const isTouchOnly = 'ontouchstart' in window && !hasFinePointer;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isGotham || isTouchOnly || prefersReducedMotion) {
      setIsEnabled(false);
      document.documentElement.classList.remove('has-bat-cursor');
      return;
    }

    setIsEnabled(true);
    document.documentElement.classList.add('has-bat-cursor');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let prevX = mouseX;
    let bankAngle = 0;
    let isVisible = false;
    let animId: number;

    const handlePointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible && cursorRef.current) {
        isVisible = true;
        cursorRef.current.style.opacity = '1';
      }

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

    const loop = () => {
      animId = requestAnimationFrame(loop);

      const vx = mouseX - prevX;
      prevX = mouseX;

      // Smooth banking rotation in direction of movement (-18deg to +18deg)
      const targetBank = Math.max(-18, Math.min(18, vx * 1.6));
      bankAngle += (targetBank - bankAngle) * 0.22;

      if (cursorRef.current) {
        // Precise click position: Bat head apex at pointer (x, y)
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0px) translate(-50%, -20%) rotate(${bankAngle}deg)`;
      }
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.documentElement.classList.remove('has-bat-cursor');
    };
  }, [isGotham]);

  if (!isGotham || !isEnabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[999999] opacity-0 select-none will-change-transform transition-opacity duration-150"
      style={{
        width: 34,
        height: 22,
      }}
    >
      <svg
        viewBox="0 0 68 44"
        width="34"
        height="22"
        className={`block overflow-visible transition-transform duration-150 ${
          isHoveringClickable ? 'scale-115' : 'scale-100'
        }`}
        style={{
          filter: isHoveringClickable
            ? 'drop-shadow(0 0 6px #FFE500) drop-shadow(0 0 10px rgba(255,229,0,0.85))'
            : 'drop-shadow(0 0 3px rgba(255, 229, 0, 0.55)) drop-shadow(0 1px 2px rgba(0,0,0,0.95))',
        }}
      >
        {/* Crisp, authentic Batman Bat silhouette with subtle yellow rim */}
        <path
          d="M 34 8
             C 32.5 5, 31.8 1.5, 31 0
             C 30.2 1.5, 29.5 5, 28 8
             C 24 6.5, 17 5.5, 4 11
             C 9 17, 14 21, 13 27
             C 18 24.5, 23.5 27, 25 34
             C 28 30.5, 32 32.5, 34 42
             C 36 32.5, 40 30.5, 43 34
             C 44.5 27, 50 24.5, 55 27
             C 54 21, 59 17, 64 11
             C 51 5.5, 44 6.5, 40 8
             C 38.5 5, 37.8 1.5, 37 0
             C 36.2 1.5, 35.5 5, 34 8 Z"
          fill="#06080C"
          stroke="#FFE500"
          strokeWidth={isHoveringClickable ? '1.4' : '0.9'}
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
