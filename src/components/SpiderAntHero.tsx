'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  SPIDER_PATHS,
  SPIDER_LEGS,
  SPIDER_VIEWBOX_W,
  SPIDER_VIEWBOX_H,
  SPIDER_CENTER_X,
  SPIDER_CENTER_Y,
  MOSQUITO_VIEWBOX_W,
  MOSQUITO_VIEWBOX_H,
} from './SpiderAntGeometry';

interface SpiderAntHeroProps {
  spiderSize?: number;
  antSize?: number;
  speed?: number;
  spiderColor?: string;
  antColor?: string;
  soundEnabled?: boolean;
}

// Math helpers
const clamp = (val: number, min: number, max: number) => (val < min ? min : val > max ? max : val);
const normalizeAngle = (angle: number) => {
  let a = angle;
  const TWO_PI = Math.PI * 2;
  while (a > Math.PI) a -= TWO_PI;
  while (a < -Math.PI) a += TWO_PI;
  return a;
};
const radToDeg = (rad: number) => (rad * 180) / Math.PI;

export const SpiderAntHero: React.FC<SpiderAntHeroProps> = ({
  spiderSize = 240,
  antSize = 32,
  speed = 1.3,
  spiderColor = '#000000',
  antColor = '#FF4BB9',
  soundEnabled = false,
}) => {
  const spiderRef = useRef<HTMLDivElement>(null);
  const antRef = useRef<HTMLDivElement>(null);
  const spiderBodyRef = useRef<SVGGElement>(null);
  const legRefs = useRef<Record<string, SVGPathElement>>({});

  const [reducedMotion, setReducedMotion] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined') return;

    let animId: number;
    let isDisposed = false;

    // Viewport dimensions (full window width and height)
    let vpWidth = window.innerWidth;
    let vpHeight = window.innerHeight;

    const handleResize = () => {
      vpWidth = window.innerWidth;
      vpHeight = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initial state in true viewport coordinates
    const state = {
      t: 0,
      userHasMoved: false,

      // Target for the pink ant (direct clientX, clientY)
      target: {
        x: vpWidth * 0.7,
        y: vpHeight * 0.38,
      },

      // Pink Ant (follows mouse cursor across entire viewport)
      ant: {
        x: vpWidth * 0.7,
        y: vpHeight * 0.38,
        heading: 0,
        flutterAngle: 0,
        speed: 0,
      },

      // Black Spider (chases pink ant anywhere on the screen)
      spider: {
        x: vpWidth * 0.35,
        y: vpHeight * 0.55,
        heading: 0,
        speed: 0,
        maxSpeed: 520 * speed,
        acceleration: 1300 * speed,
        gaitPhase: 0,
      },
    };

    // Soft step sound
    const playStepSound = () => {
      if (!soundEnabled) return;
      try {
        if (!audioCtxRef.current) {
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          if (AudioContextClass) {
            audioCtxRef.current = new AudioContextClass();
          }
        }
        const ctx = audioCtxRef.current;
        if (ctx && ctx.state !== 'suspended') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(160 + Math.random() * 50, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.03);
          gain.gain.setValueAtTime(0.012, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);
          osc.connect(gain).connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.04);
        }
      } catch {
        // Audio unavailable
      }
    };

    // Global pointer tracking directly in viewport coordinates
    const handlePointerMove = (e: PointerEvent) => {
      state.target.x = clamp(e.clientX, 15, vpWidth - 15);
      state.target.y = clamp(e.clientY, 15, vpHeight - 15);
      state.userHasMoved = true;
    };

    const handlePointerDown = (e: PointerEvent) => {
      handlePointerMove(e);
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume().catch(() => {});
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    let lastTime: number | null = null;
    let stepAccumulator = 0;

    // Viewport-level Animation Loop
    const frame = (time: number) => {
      if (isDisposed) return;
      animId = requestAnimationFrame(frame);

      if (lastTime === null) {
        lastTime = time;
        return;
      }

      const dt = Math.min((time - lastTime) / 1000, 0.04);
      lastTime = time;
      state.t += dt;

      const ant = state.ant;
      const sp = state.spider;

      // ==========================================
      // 1. PINK ANT TRACKS VIEWPORT CURSOR
      // ==========================================
      const dxCursor = state.target.x - ant.x;
      const dyCursor = state.target.y - ant.y;
      const distCursor = Math.hypot(dxCursor, dyCursor);

      if (distCursor > 0.5) {
        const followSpeed = clamp(dt * 42, 0.7, 1.0);
        ant.x += dxCursor * followSpeed;
        ant.y += dyCursor * followSpeed;
        ant.heading = Math.atan2(dyCursor, dxCursor);
        ant.speed = distCursor / Math.max(dt, 0.001);
      } else {
        ant.speed = 0;
      }

      ant.flutterAngle = Math.sin(state.t * 35) * (ant.speed > 20 ? 0.22 : 0.08);

      // ==========================================
      // 2. BLACK SPIDER PURSUES ACROSS VIEWPORT
      // ==========================================
      const dxToAnt = ant.x - sp.x;
      const dyToAnt = ant.y - sp.y;
      const distToAnt = Math.hypot(dxToAnt, dyToAnt);

      // Desired heading: 0 is right (+x), PI/2 is down (+y), -PI/2 is up (-y)
      const targetAngleToAnt = Math.atan2(dyToAnt, dxToAnt);
      const angleDiff = normalizeAngle(targetAngleToAnt - sp.heading);
      const turnRate = 20.0;
      sp.heading = normalizeAngle(sp.heading + angleDiff * clamp(dt * turnRate, 0.15, 0.95));

      // Stopping distance: closes in and stops right at the ant's heels
      const stoppingDistance = 85;

      if (distToAnt > stoppingDistance) {
        const desiredSpeed = clamp((distToAnt - stoppingDistance) * 3.4, 180, sp.maxSpeed);
        if (sp.speed < desiredSpeed) {
          sp.speed = Math.min(desiredSpeed, sp.speed + sp.acceleration * dt);
        } else {
          sp.speed = Math.max(desiredSpeed, sp.speed - sp.acceleration * 1.5 * dt);
        }

        // Forward motion leading with head
        sp.x += Math.cos(sp.heading) * sp.speed * dt;
        sp.y += Math.sin(sp.heading) * sp.speed * dt;
      } else {
        sp.speed = Math.max(0, sp.speed - sp.acceleration * 2.5 * dt);
      }

      // Constrain spider strictly to the viewport edges (no invisible internal boxes!)
      sp.x = clamp(sp.x, 25, vpWidth - 25);
      sp.y = clamp(sp.y, 25, vpHeight - 25);

      // ==========================================
      // 3. LEG STRIDE & GAIT
      // ==========================================
      sp.gaitPhase += dt * sp.speed * 0.06;

      stepAccumulator += dt * sp.speed;
      if (stepAccumulator > 75) {
        stepAccumulator = 0;
        playStepSound();
      }

      SPIDER_LEGS.forEach((leg, idx) => {
        const pathJoint = legRefs.current[`${leg.id}_JOINT`];
        const pathUpper = legRefs.current[`${leg.id}_UPPER`];
        const pathLower = legRefs.current[`${leg.id}_LOWER`];

        const legPhase = sp.gaitPhase + (idx % 2 === 0 ? 0 : Math.PI);
        const strideAngle = Math.sin(legPhase) * (sp.speed > 25 ? 7.0 : 1.0);

        if (pathJoint) {
          pathJoint.style.transform = `rotate(${strideAngle}deg)`;
          pathJoint.style.transformOrigin = '50% 50%';
        }
        if (pathUpper) {
          pathUpper.style.transform = `rotate(${strideAngle * 0.8}deg)`;
          pathUpper.style.transformOrigin = '50% 50%';
        }
        if (pathLower) {
          pathLower.style.transform = `rotate(${-strideAngle * 0.5}deg)`;
          pathLower.style.transformOrigin = '50% 50%';
        }
      });

      if (spiderBodyRef.current) {
        const squash = 1 + Math.sin(sp.gaitPhase * 2) * 0.03;
        const stretch = 1 - Math.sin(sp.gaitPhase * 2) * 0.025;
        spiderBodyRef.current.style.transform = `scale(${stretch}, ${squash})`;
        spiderBodyRef.current.style.transformOrigin = `${(SPIDER_CENTER_X / SPIDER_VIEWBOX_W) * 100}% ${(SPIDER_CENTER_Y / SPIDER_VIEWBOX_H) * 100}%`;
      }

      // ==========================================
      // 4. DOM TRANSFORMS IN VIEWPORT SPACE
      // ==========================================
      // In SVG artwork, the spider faces UP. Adding +90deg aligns the head with `heading`
      if (spiderRef.current) {
        const spiderRotationDeg = radToDeg(sp.heading) + 90;
        spiderRef.current.style.transform = `translate3d(${sp.x}px, ${sp.y}px, 0) translate(-50%, -50%) rotate(${spiderRotationDeg}deg)`;
      }

      if (antRef.current) {
        const antRotationDeg = radToDeg(ant.heading) + radToDeg(ant.flutterAngle);
        antRef.current.style.transform = `translate3d(${ant.x}px, ${ant.y}px, 0) translate(-50%, -50%) rotate(${antRotationDeg}deg)`;
      }
    };

    animId = requestAnimationFrame(frame);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [reducedMotion, spiderSize, antSize, speed, soundEnabled]);

  // Reduced-motion fallback
  if (reducedMotion) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-screen h-screen pointer-events-none z-30 overflow-visible select-none"
    >
      {/* Pink Ant (Tracks Viewport Mouse Cursor with zero clipping) */}
      <div
        ref={antRef}
        className="absolute will-change-transform z-20 pointer-events-none drop-shadow-[0_2px_6px_rgba(255,75,185,0.6)]"
        style={{
          width: antSize,
          height: (antSize * MOSQUITO_VIEWBOX_H) / MOSQUITO_VIEWBOX_W,
          transformOrigin: '50% 50%',
        }}
      >
        <svg
          viewBox={`0 0 ${MOSQUITO_VIEWBOX_W} ${MOSQUITO_VIEWBOX_H}`}
          width="100%"
          height="100%"
          className="block overflow-visible"
        >
          <path d={SPIDER_PATHS.MOSQUITO} fill={antColor} />
        </svg>
      </div>

      {/* Black Spider (Active Pursuer across the entire viewport) */}
      <div
        ref={spiderRef}
        className="absolute will-change-transform z-10 pointer-events-none drop-shadow-[0_6px_16px_rgba(0,0,0,0.22)]"
        style={{
          width: spiderSize,
          height: (spiderSize * SPIDER_VIEWBOX_H) / SPIDER_VIEWBOX_W,
          transformOrigin: `${(SPIDER_CENTER_X / SPIDER_VIEWBOX_W) * 100}% ${(SPIDER_CENTER_Y / SPIDER_VIEWBOX_H) * 100}%`,
        }}
      >
        <svg
          viewBox={`0 0 ${SPIDER_VIEWBOX_W} ${SPIDER_VIEWBOX_H}`}
          width="100%"
          height="100%"
          fill={spiderColor}
          className="block overflow-visible"
        >
          {SPIDER_LEGS.map((leg) => (
            <g key={leg.id}>
              <path
                d={SPIDER_PATHS[`${leg.id}_LOWER`]}
                ref={(el) => {
                  if (el) legRefs.current[`${leg.id}_LOWER`] = el;
                }}
              />
              {leg.three && SPIDER_PATHS[`${leg.id}_MIDDLE`] && (
                <path
                  d={SPIDER_PATHS[`${leg.id}_MIDDLE`]}
                  ref={(el) => {
                    if (el) legRefs.current[`${leg.id}_MIDDLE`] = el;
                  }}
                />
              )}
              <path
                d={SPIDER_PATHS[`${leg.id}_UPPER`]}
                ref={(el) => {
                  if (el) legRefs.current[`${leg.id}_UPPER`] = el;
                }}
              />
              <path
                d={SPIDER_PATHS[`${leg.id}_KNEE`]}
                ref={(el) => {
                  if (el) legRefs.current[`${leg.id}_KNEE`] = el;
                }}
              />
              {leg.three && SPIDER_PATHS[`${leg.id}_KNEE2`] && (
                <path
                  d={SPIDER_PATHS[`${leg.id}_KNEE2`]}
                  ref={(el) => {
                    if (el) legRefs.current[`${leg.id}_KNEE2`] = el;
                  }}
                />
              )}
              <path
                d={SPIDER_PATHS[`${leg.id}_JOINT`]}
                ref={(el) => {
                  if (el) legRefs.current[`${leg.id}_JOINT`] = el;
                }}
              />
            </g>
          ))}

          <g ref={spiderBodyRef}>
            <path d={SPIDER_PATHS.BODY} />
          </g>
        </svg>
      </div>
    </div>
  );
};
