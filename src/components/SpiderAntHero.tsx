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
import { DogCharacter, BallCharacter } from './DogCharacter';
import { useCompanion } from '@/context/CompanionContext';

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
  const { mode } = useCompanion();

  const spiderRef = useRef<HTMLDivElement>(null);
  const dogRef = useRef<HTMLDivElement>(null);
  const antRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const spiderBodyRef = useRef<SVGGElement>(null);
  const legRefs = useRef<Record<string, SVGPathElement>>({});

  const [reducedMotion, setReducedMotion] = useState(false);
  const [gaitState, setGaitState] = useState(0);
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

    // Viewport dimensions
    let vpWidth = window.innerWidth;
    let vpHeight = window.innerHeight;

    const handleResize = () => {
      vpWidth = window.innerWidth;
      vpHeight = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initial state in true viewport space
    const state = {
      t: 0,
      userHasMoved: false,

      // Target for the cursor companion
      target: {
        x: vpWidth * 0.68,
        y: vpHeight * 0.38,
      },

      // Prey (Ant or Ball)
      prey: {
        x: vpWidth * 0.68,
        y: vpHeight * 0.38,
        heading: 0,
        flutterAngle: 0,
        spin: 0,
        speed: 0,
      },

      // Pursuer (Spider or Dog)
      pursuer: {
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

      const prey = state.prey;
      const pursuer = state.pursuer;

      // ==========================================
      // 1. UPDATE PREY (ANT / BALL)
      // ==========================================
      const dxCursor = state.target.x - prey.x;
      const dyCursor = state.target.y - prey.y;
      const distCursor = Math.hypot(dxCursor, dyCursor);

      if (distCursor > 0.5) {
        const followSpeed = clamp(dt * 42, 0.7, 1.0);
        prey.x += dxCursor * followSpeed;
        prey.y += dyCursor * followSpeed;
        prey.heading = Math.atan2(dyCursor, dxCursor);
        prey.speed = distCursor / Math.max(dt, 0.001);
        prey.spin += distCursor * 1.5;
      } else {
        prey.speed = 0;
      }

      prey.flutterAngle = Math.sin(state.t * 35) * (prey.speed > 20 ? 0.22 : 0.08);

      // ==========================================
      // 2. UPDATE PURSUER (SPIDER / DOG)
      // ==========================================
      if (mode !== 'ant-only') {
        const dxToPrey = prey.x - pursuer.x;
        const dyToPrey = prey.y - pursuer.y;
        const distToPrey = Math.hypot(dxToPrey, dyToPrey);

        // Desired heading towards the prey
        const targetAngle = Math.atan2(dyToPrey, dxToPrey);
        const angleDiff = normalizeAngle(targetAngle - pursuer.heading);
        const turnRate = mode === 'dog' ? 14.0 : 20.0;
        pursuer.heading = normalizeAngle(pursuer.heading + angleDiff * clamp(dt * turnRate, 0.15, 0.95));

        // Stopping distance: closes in and stops right at the heels
        const stoppingDistance = mode === 'dog' ? 95 : 85;

        if (distToPrey > stoppingDistance) {
          const desiredSpeed = clamp((distToPrey - stoppingDistance) * (mode === 'dog' ? 3.0 : 3.4), 160, pursuer.maxSpeed);
          if (pursuer.speed < desiredSpeed) {
            pursuer.speed = Math.min(desiredSpeed, pursuer.speed + pursuer.acceleration * dt);
          } else {
            pursuer.speed = Math.max(desiredSpeed, pursuer.speed - pursuer.acceleration * 1.5 * dt);
          }

          // Forward motion leading with head/snout
          pursuer.x += Math.cos(pursuer.heading) * pursuer.speed * dt;
          pursuer.y += Math.sin(pursuer.heading) * pursuer.speed * dt;
        } else {
          pursuer.speed = Math.max(0, pursuer.speed - pursuer.acceleration * 2.5 * dt);
        }

        // Keep pursuer inside viewport boundaries
        pursuer.x = clamp(pursuer.x, 25, vpWidth - 25);
        pursuer.y = clamp(pursuer.y, 25, vpHeight - 25);

        // Gait cycle
        pursuer.gaitPhase += dt * pursuer.speed * 0.06;
        setGaitState(pursuer.gaitPhase);

        // Step sound
        stepAccumulator += dt * pursuer.speed;
        if (stepAccumulator > 75) {
          stepAccumulator = 0;
          playStepSound();
        }

        // Animate Spider IK Legs if spider mode
        if (mode === 'spider') {
          SPIDER_LEGS.forEach((leg, idx) => {
            const pathJoint = legRefs.current[`${leg.id}_JOINT`];
            const pathUpper = legRefs.current[`${leg.id}_UPPER`];
            const pathLower = legRefs.current[`${leg.id}_LOWER`];

            const legPhase = pursuer.gaitPhase + (idx % 2 === 0 ? 0 : Math.PI);
            const strideAngle = Math.sin(legPhase) * (pursuer.speed > 25 ? 7.0 : 1.0);

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
            const squash = 1 + Math.sin(pursuer.gaitPhase * 2) * 0.03;
            const stretch = 1 - Math.sin(pursuer.gaitPhase * 2) * 0.025;
            spiderBodyRef.current.style.transform = `scale(${stretch}, ${squash})`;
            spiderBodyRef.current.style.transformOrigin = `${(SPIDER_CENTER_X / SPIDER_VIEWBOX_W) * 100}% ${(SPIDER_CENTER_Y / SPIDER_VIEWBOX_H) * 100}%`;
          }
        }
      }

      // ==========================================
      // 3. APPLY DOM TRANSFORMS
      // ==========================================
      // Spider transform: +90deg aligns upward-facing SVG head with forward heading
      if (mode === 'spider' && spiderRef.current) {
        const spiderRotationDeg = radToDeg(pursuer.heading) + 90;
        spiderRef.current.style.transform = `translate3d(${pursuer.x}px, ${pursuer.y}px, 0) translate(-50%, -50%) rotate(${spiderRotationDeg}deg)`;
      }

      // Dog transform: illustration naturally faces right, flip vertically if travelling leftwards so it stays upright
      if (mode === 'dog' && dogRef.current) {
        const dogDeg = radToDeg(pursuer.heading);
        const flipY = Math.cos(pursuer.heading) < 0 ? -1 : 1;
        dogRef.current.style.transform = `translate3d(${pursuer.x}px, ${pursuer.y}px, 0) translate(-50%, -50%) rotate(${dogDeg}deg) scale(1, ${flipY})`;
      }

      // Ant transform
      if ((mode === 'spider' || mode === 'ant-only') && antRef.current) {
        const antRotationDeg = radToDeg(prey.heading) + radToDeg(prey.flutterAngle);
        antRef.current.style.transform = `translate3d(${prey.x}px, ${prey.y}px, 0) translate(-50%, -50%) rotate(${antRotationDeg}deg)`;
      }

      // Ball transform
      if (mode === 'dog' && ballRef.current) {
        ballRef.current.style.transform = `translate3d(${prey.x}px, ${prey.y}px, 0) translate(-50%, -50%) rotate(${prey.spin}deg)`;
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
  }, [reducedMotion, spiderSize, antSize, speed, soundEnabled, mode]);

  if (reducedMotion) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-screen h-screen pointer-events-none z-30 overflow-visible select-none"
    >
      {/* ================= PREY ================= */}
      {/* 1. Pink Ant (for Spider & Ant-only modes) */}
      {(mode === 'spider' || mode === 'ant-only') && (
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
      )}

      {/* 2. Tennis Ball (for Dog mode) */}
      {mode === 'dog' && (
        <div
          ref={ballRef}
          className="absolute will-change-transform z-20 pointer-events-none"
          style={{
            width: 30,
            height: 30,
            transformOrigin: '50% 50%',
          }}
        >
          <BallCharacter size={30} />
        </div>
      )}

      {/* ================= PURSUER ================= */}
      {/* 1. Black Spider (for Spider mode) */}
      {mode === 'spider' && (
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
      )}

      {/* 2. Cute Dog (for Dog mode) */}
      {mode === 'dog' && (
        <div
          ref={dogRef}
          className="absolute will-change-transform z-10 pointer-events-none"
          style={{
            width: 140,
            height: 105,
            transformOrigin: '50% 50%',
          }}
        >
          <DogCharacter size={140} gaitPhase={gaitState} isPanting={true} />
        </div>
      )}
    </div>
  );
};
