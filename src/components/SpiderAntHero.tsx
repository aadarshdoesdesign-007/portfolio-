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

// Exact angle normalization keeping delta within [-PI, +PI]
const normalizeAngle = (angle: number) => {
  let a = (angle + Math.PI) % (Math.PI * 2);
  if (a < 0) a += Math.PI * 2;
  return a - Math.PI;
};

const radToDeg = (rad: number) => (rad * 180) / Math.PI;

export const SpiderAntHero: React.FC<SpiderAntHeroProps> = ({
  spiderSize = 230,
  antSize = 32,
  speed = 1.35,
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
  const audioCtxRef = useRef<AudioContext | null>(null);

  const [reducedMotion, setReducedMotion] = useState(false);

  // Cephalothorax center point in percentages
  const centerXPercent = (SPIDER_CENTER_X / SPIDER_VIEWBOX_W) * 100;
  const centerYPercent = (SPIDER_CENTER_Y / SPIDER_VIEWBOX_H) * 100;

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
    window.addEventListener('resize', handleResize, { passive: true });

    // Initial state matching the reference:
    // Spider rests near web center, ant rests slightly offset on the web
    const state = {
      t: 0,
      userHasMoved: false,

      target: {
        x: vpWidth * 0.65,
        y: vpHeight * 0.42,
      },

      prey: {
        x: vpWidth * 0.65,
        y: vpHeight * 0.42,
        heading: 0,
        speed: 0,
        spin: 0,
      },

      pursuer: {
        x: vpWidth * 0.50,
        y: vpHeight * 0.46,
        heading: -Math.PI / 4, // Initial angle facing towards ant
        speed: 0,
        maxSpeed: 700 * speed,
        acceleration: 2600 * speed,
        deceleration: 3400 * speed,
        gaitPhase: 0,
      },
    };

    // Soft organic step sound
    const playStepSound = () => {
      if (!soundEnabled) return;
      try {
        if (!audioCtxRef.current) {
          const AudioContextClass =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          if (AudioContextClass) {
            audioCtxRef.current = new AudioContextClass();
          }
        }
        const ctx = audioCtxRef.current;
        if (ctx && ctx.state !== 'suspended') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(170 + Math.random() * 40, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.025);
          gain.gain.setValueAtTime(0.012, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.025);
          osc.connect(gain).connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.03);
        }
      } catch {
        // Audio unavailable
      }
    };

    // Direct pointer tracking in viewport client coordinates
    const handlePointerMove = (e: PointerEvent) => {
      state.target.x = e.clientX;
      state.target.y = e.clientY;
      state.userHasMoved = true;
    };

    const handlePointerDown = (e: PointerEvent) => {
      handlePointerMove(e);
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume().catch(() => {});
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        state.target.x = e.touches[0].clientX;
        state.target.y = e.touches[0].clientY;
        state.userHasMoved = true;
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    let lastTime: number | null = null;
    let stepAccumulator = 0;

    // Viewport-level 60/120fps Animation Loop with ZERO React state updates
    const frame = (time: number) => {
      if (isDisposed) return;
      animId = requestAnimationFrame(frame);

      if (lastTime === null) {
        lastTime = time;
        return;
      }

      const dt = Math.min((time - lastTime) / 1000, 0.035);
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

      if (state.userHasMoved && distCursor > 1.0) {
        // Ultra-responsive direct tracking with near-zero latency
        prey.x += dxCursor * 0.94;
        prey.y += dyCursor * 0.94;
        prey.heading = Math.atan2(dyCursor, dxCursor);
        prey.speed = distCursor / Math.max(dt, 0.001);
        prey.spin += distCursor * 1.6;
      } else if (state.userHasMoved) {
        prey.x = state.target.x;
        prey.y = state.target.y;
        prey.speed = 0;
      }

      // ==========================================
      // 2. UPDATE PURSUER (SPIDER / DOG)
      // ==========================================
      if (mode !== 'ant-only') {
        const dxToPrey = prey.x - pursuer.x;
        const dyToPrey = prey.y - pursuer.y;
        const distToPrey = Math.hypot(dxToPrey, dyToPrey);

        // Stopping distance: closes in and settles gracefully near the ant
        const stoppingDistance = mode === 'dog' ? 75 : 68;

        // Desired heading towards the prey
        const targetAngle = Math.atan2(dyToPrey, dxToPrey);
        const angleDiff = normalizeAngle(targetAngle - pursuer.heading);

        // Responsive turning: faster rate when distant or reversing direction
        const turnSpeed = mode === 'dog' ? 18.0 : 25.0;
        const turnFactor = clamp(dt * turnSpeed, 0.18, 0.96);

        // Turn towards prey as long as we're not right on top of it to avoid micro-jitter
        if (distToPrey > stoppingDistance * 0.6) {
          pursuer.heading = normalizeAngle(pursuer.heading + angleDiff * turnFactor);
        }

        if (distToPrey > stoppingDistance) {
          // Accelerate quickly towards ant
          const desiredSpeed = clamp(
            (distToPrey - stoppingDistance) * (mode === 'dog' ? 3.8 : 4.4),
            180,
            pursuer.maxSpeed
          );

          if (pursuer.speed < desiredSpeed) {
            pursuer.speed = Math.min(desiredSpeed, pursuer.speed + pursuer.acceleration * dt);
          } else {
            pursuer.speed = Math.max(desiredSpeed, pursuer.speed - pursuer.deceleration * dt);
          }

          // Move forward leading directly with head
          pursuer.x += Math.cos(pursuer.heading) * pursuer.speed * dt;
          pursuer.y += Math.sin(pursuer.heading) * pursuer.speed * dt;
        } else {
          // Within stopping distance: smoothly decelerate and settle
          pursuer.speed = Math.max(0, pursuer.speed - pursuer.deceleration * 1.5 * dt);
          if (pursuer.speed > 5) {
            pursuer.x += Math.cos(pursuer.heading) * pursuer.speed * dt;
            pursuer.y += Math.sin(pursuer.heading) * pursuer.speed * dt;
          }
        }

        // Full viewport movement: soft edge bounds allow legs to reach edge without clipping
        pursuer.x = clamp(pursuer.x, -20, vpWidth + 20);
        pursuer.y = clamp(pursuer.y, -20, vpHeight + 20);

        // Gait cycle
        if (pursuer.speed > 15) {
          pursuer.gaitPhase += dt * pursuer.speed * 0.055;

          // Step sound
          stepAccumulator += dt * pursuer.speed;
          if (stepAccumulator > 70) {
            stepAccumulator = 0;
            playStepSound();
          }
        }

        // Spider leg IK & subtle organic body animation
        if (mode === 'spider') {
          const isMoving = pursuer.speed > 15;

          SPIDER_LEGS.forEach((leg, idx) => {
            const pathJoint = legRefs.current[`${leg.id}_JOINT`];
            const pathUpper = legRefs.current[`${leg.id}_UPPER`];

            if (pathJoint || pathUpper) {
              const legPhase = pursuer.gaitPhase + (idx % 2 === 0 ? 0 : Math.PI);
              const strideAngle = isMoving ? Math.sin(legPhase) * 6.0 : 0;

              if (pathJoint) {
                pathJoint.style.transform = strideAngle ? `rotate(${strideAngle}deg)` : '';
              }
              if (pathUpper) {
                pathUpper.style.transform = strideAngle ? `rotate(${strideAngle * 0.7}deg)` : '';
              }
            }
          });

          if (spiderBodyRef.current) {
            if (isMoving) {
              const squash = 1 + Math.sin(pursuer.gaitPhase * 2) * 0.02;
              const stretch = 1 - Math.sin(pursuer.gaitPhase * 2) * 0.018;
              spiderBodyRef.current.style.transform = `scale(${stretch}, ${squash})`;
            } else {
              spiderBodyRef.current.style.transform = 'scale(1, 1)';
            }
          }
        }
      }

      // ==========================================
      // 3. APPLY DOM TRANSFORMS
      // ==========================================
      // Spider transform:
      // - SVG artwork cephalothorax/head points UP (-90deg).
      // - Adding +90deg aligns the head perfectly with pursuer.heading so it always leads.
      // - Rotating around true cephalothorax center (47.35%, 44.77%) eliminates eccentric wobble.
      if (mode === 'spider' && spiderRef.current) {
        const spiderRotationDeg = radToDeg(pursuer.heading) + 90;
        spiderRef.current.style.transform = `translate3d(${pursuer.x}px, ${pursuer.y}px, 0) translate(-${centerXPercent}%, -${centerYPercent}%) rotate(${spiderRotationDeg}deg)`;
      }

      // Dog transform
      if (mode === 'dog' && dogRef.current) {
        const dogDeg = radToDeg(pursuer.heading);
        const flipY = Math.cos(pursuer.heading) < 0 ? -1 : 1;
        dogRef.current.style.transform = `translate3d(${pursuer.x}px, ${pursuer.y}px, 0) translate(-50%, -50%) rotate(${dogDeg}deg) scale(1, ${flipY})`;
        dogRef.current.classList.toggle('dora-running', pursuer.speed > 20);
      }

      // Ant transform:
      // - Mosquito illustration artwork proboscis points LEFT (180deg).
      // - Adding +180deg aligns the head/proboscis to lead in the direction of motion.
      // - Ant does NOT flutter or wander autonomously when stationary.
      if ((mode === 'spider' || mode === 'ant-only') && antRef.current) {
        const antRotationDeg = radToDeg(prey.heading) + 180;
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
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [reducedMotion, spiderSize, antSize, speed, soundEnabled, mode, centerXPercent, centerYPercent]);

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
          className="absolute will-change-transform z-20 pointer-events-none drop-shadow-[0_2px_6px_rgba(255,75,185,0.65)] overflow-visible"
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
          className="absolute will-change-transform z-20 pointer-events-none overflow-visible"
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
          className="absolute will-change-transform z-10 pointer-events-none drop-shadow-[0_6px_18px_rgba(0,0,0,0.22)] overflow-visible"
          style={{
            width: spiderSize,
            height: (spiderSize * SPIDER_VIEWBOX_H) / SPIDER_VIEWBOX_W,
            transformOrigin: `${centerXPercent}% ${centerYPercent}%`,
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
              <g key={leg.id} style={{ transformOrigin: `${centerXPercent}% ${centerYPercent}%` }}>
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
                  style={{ transformOrigin: '50% 50%' }}
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
                  style={{ transformOrigin: '50% 50%' }}
                />
              </g>
            ))}

            <g
              ref={spiderBodyRef}
              style={{
                transformOrigin: `${centerXPercent}% ${centerYPercent}%`,
              }}
            >
              <path d={SPIDER_PATHS.BODY} />
            </g>
          </svg>
        </div>
      )}

      {/* 2. Dora the Cinnamon Chow Chow (for Dog mode) */}
      {mode === 'dog' && (
        <div
          ref={dogRef}
          className="absolute will-change-transform z-10 pointer-events-none overflow-visible"
          style={{
            width: 150,
            height: 120,
            transformOrigin: '50% 50%',
          }}
        >
          <DogCharacter size={150} isMoving={false} isPanting={true} />
        </div>
      )}
    </div>
  );
};
