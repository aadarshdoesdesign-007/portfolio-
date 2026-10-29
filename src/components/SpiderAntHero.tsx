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

  const containerRef = useRef<HTMLDivElement>(null);
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

    // Hero container dimensions
    let heroWidth = window.innerWidth;
    let heroHeight = window.innerHeight;

    const updateDimensions = () => {
      if (containerRef.current) {
        heroWidth = containerRef.current.clientWidth || window.innerWidth;
        heroHeight = containerRef.current.clientHeight || window.innerHeight;
      } else {
        heroWidth = window.innerWidth;
        heroHeight = window.innerHeight;
      }
    };
    updateDimensions();

    const handleResize = () => {
      updateDimensions();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Initial state matching the hero composition
    const isMobile = heroWidth < 640;
    const defaultPreyX = isMobile ? heroWidth * 0.65 : heroWidth * 0.68;
    const defaultPreyY = isMobile ? heroHeight * 0.32 : heroHeight * 0.44;
    const defaultPursuerX = isMobile ? heroWidth * 0.45 : heroWidth * 0.58;
    const defaultPursuerY = isMobile ? heroHeight * 0.35 : heroHeight * 0.46;

    const state = {
      t: 0,
      userHasMoved: false,
      isHoveringHero: false,

      target: {
        x: defaultPreyX,
        y: defaultPreyY,
      },

      prey: {
        x: defaultPreyX,
        y: defaultPreyY,
        heading: 0,
        speed: 0,
        spin: 0,
      },

      pursuer: {
        x: defaultPursuerX,
        y: defaultPursuerY,
        heading: 0,
        facing: 1, // 1 = facing right, -1 = facing left
        speed: 0,
        maxSpeed: 680 * speed,
        acceleration: 2600 * speed,
        deceleration: 3200 * speed,
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

    // Direct pointer tracking relative to the Hero Section container
    const handlePointerMove = (e: PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      // Check if cursor is within hero section
      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (isInside) {
        state.target.x = e.clientX - rect.left;
        state.target.y = e.clientY - rect.top;
        state.userHasMoved = true;
        state.isHoveringHero = true;
      } else {
        state.isHoveringHero = false;
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      handlePointerMove(e);
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume().catch(() => {});
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current || !e.touches || !e.touches[0]) return;
      const rect = containerRef.current.getBoundingClientRect();
      const touch = e.touches[0];

      const isInside =
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom;

      if (isInside) {
        state.target.x = touch.clientX - rect.left;
        state.target.y = touch.clientY - rect.top;
        state.userHasMoved = true;
        state.isHoveringHero = true;
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    let lastTime: number | null = null;
    let stepAccumulator = 0;

    // Viewport/Hero-level 60/120fps Animation Loop with ZERO React state updates
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
      // If cursor is outside hero, gently glide home to hero rest spot
      const currentTargetX = state.isHoveringHero
        ? state.target.x
        : (heroWidth < 640 ? heroWidth * 0.65 : heroWidth * 0.68);
      const currentTargetY = state.isHoveringHero
        ? state.target.y
        : (heroWidth < 640 ? heroHeight * 0.32 : heroHeight * 0.44);

      const dxCursor = currentTargetX - prey.x;
      const dyCursor = currentTargetY - prey.y;
      const distCursor = Math.hypot(dxCursor, dyCursor);

      if (state.userHasMoved && distCursor > 1.0) {
        const lerpFactor = state.isHoveringHero ? 0.92 : 0.08;
        prey.x += dxCursor * lerpFactor;
        prey.y += dyCursor * lerpFactor;
        prey.heading = Math.atan2(dyCursor, dxCursor);
        prey.speed = distCursor / Math.max(dt, 0.001);
        prey.spin += distCursor * 1.5;
      } else if (state.userHasMoved && state.isHoveringHero) {
        prey.x = currentTargetX;
        prey.y = currentTargetY;
        prey.speed = 0;
      }

      // Constrain prey to safe bounds within hero
      prey.x = clamp(prey.x, 30, heroWidth - 30);
      prey.y = clamp(prey.y, 35, heroHeight - 40);

      // ==========================================
      // 2. UPDATE PURSUER (DORA / SPIDER)
      // ==========================================
      if (mode !== 'ant-only') {
        const dxToPrey = prey.x - pursuer.x;
        const dyToPrey = prey.y - pursuer.y;
        const distToPrey = Math.hypot(dxToPrey, dyToPrey);

        // ================= DOG MODE KINEMATICS =================
        if (mode === 'dog') {
          // Stopping distance: settle comfortably and naturally beside the ball
          const stoppingDistance = 72;

          // Determine horizontal facing with deadband to prevent rapid flipping
          if (dxToPrey < -10) {
            pursuer.facing = -1; // Facing left
          } else if (dxToPrey > 10) {
            pursuer.facing = 1; // Facing right
          }

          if (distToPrey > stoppingDistance) {
            // Accelerate towards the ball
            const desiredSpeed = clamp(
              (distToPrey - stoppingDistance) * 3.8,
              140,
              pursuer.maxSpeed
            );

            if (pursuer.speed < desiredSpeed) {
              pursuer.speed = Math.min(desiredSpeed, pursuer.speed + pursuer.acceleration * dt);
            } else {
              pursuer.speed = Math.max(desiredSpeed, pursuer.speed - pursuer.deceleration * dt);
            }

            const nx = dxToPrey / distToPrey;
            const ny = dyToPrey / distToPrey;

            pursuer.x += nx * pursuer.speed * dt;
            pursuer.y += ny * pursuer.speed * dt;
          } else {
            // Within stopping distance: smoothly decelerate and rest
            pursuer.speed = Math.max(0, pursuer.speed - pursuer.deceleration * 2.5 * dt);
            if (pursuer.speed > 5) {
              const nx = dxToPrey / Math.max(distToPrey, 1);
              const ny = dyToPrey / Math.max(distToPrey, 1);
              pursuer.x += nx * pursuer.speed * dt;
              pursuer.y += ny * pursuer.speed * dt;
            }
          }

          // Confine Dora strictly within the hero section bounds
          pursuer.x = clamp(pursuer.x, 60, heroWidth - 60);
          pursuer.y = clamp(pursuer.y, 60, heroHeight - 65);
        }

        // ================= SPIDER MODE KINEMATICS =================
        if (mode === 'spider') {
          const stoppingDistance = 68;
          const targetAngle = Math.atan2(dyToPrey, dxToPrey);
          const angleDiff = normalizeAngle(targetAngle - pursuer.heading);

          const turnSpeed = 25.0;
          const turnFactor = clamp(dt * turnSpeed, 0.18, 0.96);

          if (distToPrey > stoppingDistance * 0.6) {
            pursuer.heading = normalizeAngle(pursuer.heading + angleDiff * turnFactor);
          }

          if (distToPrey > stoppingDistance) {
            const desiredSpeed = clamp((distToPrey - stoppingDistance) * 4.4, 180, pursuer.maxSpeed);

            if (pursuer.speed < desiredSpeed) {
              pursuer.speed = Math.min(desiredSpeed, pursuer.speed + pursuer.acceleration * dt);
            } else {
              pursuer.speed = Math.max(desiredSpeed, pursuer.speed - pursuer.deceleration * dt);
            }

            pursuer.x += Math.cos(pursuer.heading) * pursuer.speed * dt;
            pursuer.y += Math.sin(pursuer.heading) * pursuer.speed * dt;
          } else {
            pursuer.speed = Math.max(0, pursuer.speed - pursuer.deceleration * 1.5 * dt);
            if (pursuer.speed > 5) {
              pursuer.x += Math.cos(pursuer.heading) * pursuer.speed * dt;
              pursuer.y += Math.sin(pursuer.heading) * pursuer.speed * dt;
            }
          }

          pursuer.x = clamp(pursuer.x, -20, heroWidth + 20);
          pursuer.y = clamp(pursuer.y, -20, heroHeight + 20);

          if (pursuer.speed > 15) {
            pursuer.gaitPhase += dt * pursuer.speed * 0.055;

            stepAccumulator += dt * pursuer.speed;
            if (stepAccumulator > 70) {
              stepAccumulator = 0;
              playStepSound();
            }
          }

          // Spider leg IK
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
      // Spider transform
      if (mode === 'spider' && spiderRef.current) {
        const spiderRotationDeg = radToDeg(pursuer.heading) + 90;
        spiderRef.current.style.transform = `translate3d(${pursuer.x}px, ${pursuer.y}px, 0) translate(-${centerXPercent}%, -${centerYPercent}%) rotate(${spiderRotationDeg}deg)`;
      }

      // Dora Chow Chow transform:
      // CRITICAL: Dora is ALWAYS 100% UPRIGHT!
      // No sideways rotation! No roll/pitch! No upside-down flipping!
      // Turning left/right is achieved strictly via scaleX(-1) or scaleX(1).
      if (mode === 'dog' && dogRef.current) {
        const scaleX = pursuer.facing < 0 ? -1 : 1;
        const isRunning = pursuer.speed > 25;
        dogRef.current.classList.toggle('dora-running', isRunning);
        dogRef.current.style.transform = `translate3d(${pursuer.x}px, ${pursuer.y}px, 0) translate(-50%, -50%) scale(${scaleX}, 1)`;
      }

      // Ant transform
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
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-hidden select-none"
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
            width: 32,
            height: 32,
            transformOrigin: '50% 50%',
          }}
        >
          <BallCharacter size={32} />
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
