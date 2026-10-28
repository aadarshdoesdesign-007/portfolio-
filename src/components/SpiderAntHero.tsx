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
const distance = (x1: number, y1: number, x2: number, y2: number) => Math.hypot(x2 - x1, y2 - y1);
const radToDeg = (rad: number) => (rad * 180) / Math.PI;

export const SpiderAntHero: React.FC<SpiderAntHeroProps> = ({
  spiderSize = 250,
  antSize = 34,
  speed = 1.2,
  spiderColor = '#000000',
  antColor = '#FF4BB9',
  soundEnabled = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
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
    if (reducedMotion || !containerRef.current) return;

    const container = containerRef.current;
    let animId: number;
    let isDisposed = false;

    // Viewport dimensions
    let width = container.clientWidth || 800;
    let height = container.clientHeight || 600;

    const updateDimensions = () => {
      if (container) {
        width = container.clientWidth;
        height = container.clientHeight;
      }
    };
    window.addEventListener('resize', updateDimensions);

    // Initial state
    const state = {
      t: 0,
      userHasMoved: false,
      cursorInside: false,
      
      // Target for the pink ant (driven directly by the mouse cursor)
      target: {
        x: width * 0.65,
        y: height * 0.42,
      },

      // Pink Ant (Mouse Cursor)
      ant: {
        x: width * 0.65,
        y: height * 0.42,
        heading: 0,
        flutterAngle: 0,
        speed: 0,
      },

      // Black Spider (Active Pursuer)
      spider: {
        x: width * 0.35,
        y: height * 0.58,
        heading: 0, // Radians: 0 = right (+x), PI/2 = down (+y), -PI/2 = up (-y)
        speed: 0,
        maxSpeed: 500 * speed,
        acceleration: 1200 * speed,
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

    // Track mouse coordinates directly relative to container
    const updateTargetFromPointer = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const localX = clientX - rect.left;
      const localY = clientY - rect.top;

      const isInside = localX >= -100 && localX <= rect.width + 100 && localY >= -100 && localY <= rect.height + 100;
      state.cursorInside = isInside;

      if (isInside || !state.userHasMoved) {
        state.target.x = clamp(localX, 25, rect.width - 25);
        state.target.y = clamp(localY, 25, rect.height - 25);
        state.userHasMoved = true;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      updateTargetFromPointer(e.clientX, e.clientY);
    };

    const handlePointerDown = (e: PointerEvent) => {
      updateTargetFromPointer(e.clientX, e.clientY);
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume().catch(() => {});
      }
    };

    // Capture global pointermove so tracking remains butter-smooth during rapid sweeps
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerdown', handlePointerDown, { passive: true });

    let lastTime: number | null = null;
    let stepAccumulator = 0;

    // Animation Loop
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
      // 1. PINK ANT = MOUSE CURSOR
      // ==========================================
      // The pink ant immediately tracks the user's cursor position with ultra-low latency
      const dxCursor = state.target.x - ant.x;
      const dyCursor = state.target.y - ant.y;
      const distCursor = Math.hypot(dxCursor, dyCursor);

      if (distCursor > 0.5) {
        // High responsiveness: immediate follow with subtle smoothing
        const followSpeed = clamp(dt * 38, 0.65, 1.0);
        ant.x += dxCursor * followSpeed;
        ant.y += dyCursor * followSpeed;
        ant.heading = Math.atan2(dyCursor, dxCursor);
        ant.speed = distCursor / Math.max(dt, 0.001);
      } else {
        ant.speed = 0;
      }

      // Subtle wing flutter proportional to motion
      ant.flutterAngle = Math.sin(state.t * 35) * (ant.speed > 20 ? 0.22 : 0.08);

      // ==========================================
      // 2. BLACK SPIDER = ACTIVE PURSUER
      // ==========================================
      // Distance from spider to pink ant
      const dxToAnt = ant.x - sp.x;
      const dyToAnt = ant.y - sp.y;
      const distToAnt = Math.hypot(dxToAnt, dyToAnt);

      // Calculate direction from spider to ant
      // When target is right, angle = 0. In SVG, head is at y=307 (UP, -y).
      // Rotating by (headingRad + 90deg) brings the head directly into alignment!
      const targetAngleToAnt = Math.atan2(dyToAnt, dxToAnt);

      // Fast, responsive steering towards the ant
      const angleDiff = normalizeAngle(targetAngleToAnt - sp.heading);
      const turnRate = 18.0; // Rapid turns when cursor changes direction
      sp.heading = normalizeAngle(sp.heading + angleDiff * clamp(dt * turnRate, 0.12, 0.9));

      // Pursuit speed and stopping distance behavior:
      // When the spider is at a short, visually appealing distance (~85px), it decelerates smoothly.
      // When the ant moves away, the spider rapidly accelerates in hot pursuit!
      const stoppingDistance = 88;

      if (distToAnt > stoppingDistance) {
        // Accelerate in pursuit: faster when farther away
        const desiredSpeed = clamp((distToAnt - stoppingDistance) * 3.2, 160, sp.maxSpeed);
        if (sp.speed < desiredSpeed) {
          sp.speed = Math.min(desiredSpeed, sp.speed + sp.acceleration * dt);
        } else {
          sp.speed = Math.max(desiredSpeed, sp.speed - sp.acceleration * 1.5 * dt);
        }

        // Move forward leading with the head
        const forwardX = Math.cos(sp.heading);
        const forwardY = Math.sin(sp.heading);
        sp.x += forwardX * sp.speed * dt;
        sp.y += forwardY * sp.speed * dt;
      } else {
        // Settle smoothly near the ant
        sp.speed = Math.max(0, sp.speed - sp.acceleration * 2.2 * dt);
      }

      // Clamp spider inside hero bounds
      sp.x = clamp(sp.x, 50, width - 50);
      sp.y = clamp(sp.y, 50, height - 50);

      // ==========================================
      // 3. ORGANIC GAIT & LEG STEPPING
      // ==========================================
      sp.gaitPhase += dt * sp.speed * 0.06;

      // Step sound when moving
      stepAccumulator += dt * sp.speed;
      if (stepAccumulator > 80) {
        stepAccumulator = 0;
        playStepSound();
      }

      // Alternating tripod stride on 10 legs
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

      // Body stretch/squash during stride
      if (spiderBodyRef.current) {
        const squash = 1 + Math.sin(sp.gaitPhase * 2) * 0.03;
        const stretch = 1 - Math.sin(sp.gaitPhase * 2) * 0.025;
        spiderBodyRef.current.style.transform = `scale(${stretch}, ${squash})`;
        spiderBodyRef.current.style.transformOrigin = `${(SPIDER_CENTER_X / SPIDER_VIEWBOX_W) * 100}% ${(SPIDER_CENTER_Y / SPIDER_VIEWBOX_H) * 100}%`;
      }

      // ==========================================
      // 4. APPLY DOM TRANSFORMS
      // ==========================================
      // Rotate spider: +90deg aligns SVG head (12 o'clock) with forward heading
      if (spiderRef.current) {
        const spiderRotationDeg = radToDeg(sp.heading) + 90;
        spiderRef.current.style.transform = `translate3d(${sp.x}px, ${sp.y}px, 0) translate(-50%, -50%) rotate(${spiderRotationDeg}deg)`;
      }

      // Rotate ant to face its movement direction
      if (antRef.current) {
        const antRotationDeg = radToDeg(ant.heading) + radToDeg(ant.flutterAngle);
        antRef.current.style.transform = `translate3d(${ant.x}px, ${ant.y}px, 0) translate(-50%, -50%) rotate(${antRotationDeg}deg)`;
      }
    };

    animId = requestAnimationFrame(frame);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [reducedMotion, spiderSize, antSize, speed, soundEnabled]);

  // Reduced-motion fallback: static peaceful aesthetic display
  if (reducedMotion) {
    return (
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <img
          src="/spiderweb.svg"
          alt="Geometric spiderweb background"
          className="absolute inset-0 w-full h-full object-contain opacity-35"
        />
        <div
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: spiderSize,
          }}
        >
          <svg
            viewBox={`0 0 ${SPIDER_VIEWBOX_W} ${SPIDER_VIEWBOX_H}`}
            fill={spiderColor}
            className="w-full h-full block"
          >
            {SPIDER_LEGS.map((leg) => (
              <g key={leg.id}>
                <path d={SPIDER_PATHS[`${leg.id}_LOWER`]} />
                {leg.three && SPIDER_PATHS[`${leg.id}_MIDDLE`] && (
                  <path d={SPIDER_PATHS[`${leg.id}_MIDDLE`]} />
                )}
                <path d={SPIDER_PATHS[`${leg.id}_UPPER`]} />
                <path d={SPIDER_PATHS[`${leg.id}_KNEE`]} />
                {leg.three && SPIDER_PATHS[`${leg.id}_KNEE2`] && (
                  <path d={SPIDER_PATHS[`${leg.id}_KNEE2`]} />
                )}
                <path d={SPIDER_PATHS[`${leg.id}_JOINT`]} />
              </g>
            ))}
            <path d={SPIDER_PATHS.BODY} />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-auto select-none cursor-none"
      style={{ touchAction: 'none' }}
    >
      {/* Spiderweb Background Graphic */}
      <img
        src="/spiderweb.svg"
        alt="Geometric spiderweb background"
        className="absolute inset-0 w-full h-full object-contain opacity-35 md:opacity-45 pointer-events-none transition-opacity duration-700"
      />

      {/* Pink Ant (Tracks Mouse Cursor directly) */}
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

      {/* Black Spider (Active Pursuer chasing the Pink Ant) */}
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
          {/* 10 Animated Leg Assemblies */}
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

          {/* Spider Body */}
          <g ref={spiderBodyRef}>
            <path d={SPIDER_PATHS.BODY} />
          </g>
        </svg>
      </div>
    </div>
  );
};
