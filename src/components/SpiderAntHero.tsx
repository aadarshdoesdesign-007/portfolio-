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

// Math utilities
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
  speed = 1.0,
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

    // Initial positions: Spider starts near center, Ant starts in upper right
    const state = {
      t: 0,
      userActive: false,
      cursor: { x: width * 0.7, y: height * 0.35 },
      
      // Ant state: independent quick insect movement
      ant: {
        x: width * 0.72,
        y: height * 0.32,
        vx: 0,
        vy: 0,
        heading: 0,
        targetX: width * 0.7,
        targetY: height * 0.35,
        speed: 180,
        state: 'scuttle', // 'scuttle' | 'pause' | 'panic'
        stateTimer: 0.8,
        flutterAngle: 0,
        scale: 1,
      },

      // Spider state: aggressive active hunter
      spider: {
        x: width * 0.35,
        y: height * 0.55,
        heading: 0, // In radians: 0 = facing right (+x), PI/2 = down (+y), -PI/2 = up (-y)
        speed: 0,
        maxSpeed: 450 * speed,
        acceleration: 900 * speed,
        state: 'chase', // 'chase' | 'pounce' | 'recover'
        pounceProgress: 0,
        pounceStart: { x: 0, y: 0 },
        pounceTarget: { x: 0, y: 0 },
        gaitPhase: 0,
        bodyBob: 0,
      },
    };

    // Soft step sound effect
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
          osc.frequency.setValueAtTime(160 + Math.random() * 60, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.03);
          gain.gain.setValueAtTime(0.012, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);
          osc.connect(gain).connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.04);
        }
      } catch {
        // Audio suspended or blocked
      }
    };

    // Pointer listeners for interactive influence
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      state.cursor.x = clamp(e.clientX - rect.left, 40, rect.width - 40);
      state.cursor.y = clamp(e.clientY - rect.top, 40, rect.height - 40);
      state.userActive = true;
    };

    const handlePointerDown = (e: PointerEvent) => {
      handlePointerMove(e);
      // On click/tap, ant startles and dashes towards the pointer
      state.ant.targetX = state.cursor.x;
      state.ant.targetY = state.cursor.y;
      state.ant.state = 'panic';
      state.ant.stateTimer = 1.0;
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume().catch(() => {});
      }
    };

    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerdown', handlePointerDown, { passive: true });

    let lastTime: number | null = null;
    let stepAccumulator = 0;

    // Core Animation Frame Loop
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
      // 1. UPDATE ANT (PREY) BEHAVIOR
      // ==========================================
      ant.stateTimer -= dt;
      const distToSpider = distance(ant.x, ant.y, sp.x, sp.y);

      // Panic check: if spider gets uncomfortably close (< 150px), ant flees in panic!
      if (distToSpider < 150 && ant.state !== 'panic') {
        ant.state = 'panic';
        ant.stateTimer = 1.2;

        // Choose escape trajectory directly away from the spider
        const fleeAngle = Math.atan2(ant.y - sp.y, ant.x - sp.x) + (Math.random() - 0.5) * 0.8;
        const fleeDist = 220 + Math.random() * 150;
        ant.targetX = clamp(ant.x + Math.cos(fleeAngle) * fleeDist, 50, width - 50);
        ant.targetY = clamp(ant.y + Math.sin(fleeAngle) * fleeDist, 50, height - 50);
      }

      // Switch ant behavior state when timer expires
      if (ant.stateTimer <= 0) {
        if (ant.state === 'scuttle') {
          // Brief insect pause/twitch
          ant.state = 'pause';
          ant.stateTimer = 0.15 + Math.random() * 0.35;
        } else {
          // Pick new erratic target
          ant.state = 'scuttle';
          ant.stateTimer = 0.6 + Math.random() * 1.2;

          if (state.userActive && Math.random() < 0.6) {
            // Bias towards cursor
            const angleToCursor = Math.atan2(state.cursor.y - ant.y, state.cursor.x - ant.x) + (Math.random() - 0.5) * 1.0;
            const stepLen = 140 + Math.random() * 180;
            ant.targetX = clamp(ant.x + Math.cos(angleToCursor) * stepLen, 50, width - 50);
            ant.targetY = clamp(ant.y + Math.sin(angleToCursor) * stepLen, 50, height - 50);
          } else {
            // Independent insect exploration
            const randomAngle = Math.random() * Math.PI * 2;
            const stepLen = 120 + Math.random() * 200;
            ant.targetX = clamp(ant.x + Math.cos(randomAngle) * stepLen, 50, width - 50);
            ant.targetY = clamp(ant.y + Math.sin(randomAngle) * stepLen, 50, height - 50);
          }
        }
      }

      // Move ant towards target
      const antSpeed = ant.state === 'panic' ? 520 : ant.state === 'pause' ? 0 : 260;
      const antDist = distance(ant.x, ant.y, ant.targetX, ant.targetY);

      if (antDist > 8 && antSpeed > 0) {
        const moveDist = Math.min(antDist, antSpeed * dt);
        const antMoveAngle = Math.atan2(ant.targetY - ant.y, ant.targetX - ant.x);
        ant.x += Math.cos(antMoveAngle) * moveDist;
        ant.y += Math.sin(antMoveAngle) * moveDist;
        ant.heading = antMoveAngle;
      }

      // Fluttering wings
      ant.flutterAngle = Math.sin(state.t * 35) * 0.18;

      // ==========================================
      // 2. UPDATE SPIDER (PREDATOR) PURSUIT BEHAVIOR
      // ==========================================
      // CRITICAL FIX: The spider's head and front legs must face the ant at all times!
      // In the SVG asset, head is at y=307 (pointing UP / -y), body center is (556, 400), legs 5 at y=524.
      // Math.atan2(dy, dx) returns angle where 0 = right (+x), PI/2 = down (+y), -PI/2 = up (-y).
      // Since SVG artwork faces UP (-PI/2), rotating by (headingRad + PI/2) rotates the head to exactly match heading!
      const targetAngleToAnt = Math.atan2(ant.y - sp.y, ant.x - sp.x);

      // Fast, responsive steering towards the ant
      const headingDiff = normalizeAngle(targetAngleToAnt - sp.heading);
      const turnSpeed = 16.0; // Fast angular steering
      sp.heading = normalizeAngle(sp.heading + headingDiff * clamp(dt * turnSpeed, 0.08, 0.75));

      // Pursuit States: chase | pounce | recover
      if (sp.state === 'chase') {
        // Speed scaling based on distance: accelerates aggressively when ant is further away
        const targetSpeed = clamp(distToSpider * 2.2, 180, sp.maxSpeed);
        if (sp.speed < targetSpeed) {
          sp.speed = Math.min(targetSpeed, sp.speed + sp.acceleration * dt);
        } else {
          sp.speed = Math.max(targetSpeed, sp.speed - sp.acceleration * 1.2 * dt);
        }

        // Move forward along spider's heading (leading with its head!)
        const forwardX = Math.cos(sp.heading);
        const forwardY = Math.sin(sp.heading);
        sp.x += forwardX * sp.speed * dt;
        sp.y += forwardY * sp.speed * dt;

        // Pounce trigger: when spider gets close (< 95px), it lunges into a strike!
        if (distToSpider < 95) {
          sp.state = 'pounce';
          sp.pounceProgress = 0;
          sp.pounceStart = { x: sp.x, y: sp.y };
          sp.pounceTarget = { x: ant.x, y: ant.y };
          playStepSound();
        }
      } else if (sp.state === 'pounce') {
        // High-velocity lunge
        sp.pounceProgress += dt * 5.0; // 0.2s duration
        const p = Math.min(1, sp.pounceProgress);
        const ease = 1 - Math.pow(1 - p, 3);
        sp.x = sp.pounceStart.x + (sp.pounceTarget.x - sp.pounceStart.x) * ease;
        sp.y = sp.pounceStart.y + (sp.pounceTarget.y - sp.pounceStart.y) * ease;

        if (p >= 1) {
          // Close encounter finished: Ant flees immediately, spider recovers
          sp.state = 'recover';
          sp.speed = 40;
          ant.state = 'panic';
          ant.stateTimer = 1.5;

          // Ant darts to a far position
          const escapeAngle = sp.heading + Math.PI + (Math.random() - 0.5) * 1.5;
          ant.targetX = clamp(ant.x + Math.cos(escapeAngle) * 320, 60, width - 60);
          ant.targetY = clamp(ant.y + Math.sin(escapeAngle) * 320, 60, height - 60);
        }
      } else if (sp.state === 'recover') {
        // Brief 0.25s recovery pause, then immediately resume the chase
        sp.speed = Math.max(0, sp.speed - 300 * dt);
        if (distToSpider > 110) {
          sp.state = 'chase';
        }
      }

      // Clamp spider inside hero bounds
      sp.x = clamp(sp.x, 60, width - 60);
      sp.y = clamp(sp.y, 60, height - 60);

      // Gait & Leg Cycle animation
      const currentSpeed = sp.state === 'pounce' ? 600 : sp.speed;
      sp.gaitPhase += dt * currentSpeed * 0.055;
      sp.bodyBob = Math.sin(sp.gaitPhase * 2) * 2.5;

      // Step sound trigger on gait cycles
      stepAccumulator += dt * currentSpeed;
      if (stepAccumulator > 75) {
        stepAccumulator = 0;
        playStepSound();
      }

      // Animate leg micro-steps
      SPIDER_LEGS.forEach((leg, idx) => {
        const pathJoint = legRefs.current[`${leg.id}_JOINT`];
        const pathUpper = legRefs.current[`${leg.id}_UPPER`];
        const pathLower = legRefs.current[`${leg.id}_LOWER`];

        // Tripod alternating gait offset
        const legPhase = sp.gaitPhase + (idx % 2 === 0 ? 0 : Math.PI);
        const strideAngle = Math.sin(legPhase) * (currentSpeed > 30 ? 6.5 : 1.0);

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
        const squash = 1 + Math.sin(sp.gaitPhase * 2) * 0.025;
        const stretch = 1 - Math.sin(sp.gaitPhase * 2) * 0.02;
        spiderBodyRef.current.style.transform = `scale(${stretch}, ${squash})`;
        spiderBodyRef.current.style.transformOrigin = `${(SPIDER_CENTER_X / SPIDER_VIEWBOX_W) * 100}% ${(SPIDER_CENTER_Y / SPIDER_VIEWBOX_H) * 100}%`;
      }

      // ==========================================
      // 3. APPLY DOM TRANSFORMS
      // ==========================================
      // CRITICAL FIX: The spider SVG art faces UP at 12 o'clock.
      // Adding 90 degrees (+PI/2) aligns the head with `heading` so the head leads in the direction of motion!
      if (spiderRef.current) {
        const spiderRotationDeg = radToDeg(sp.heading) + 90;
        spiderRef.current.style.transform = `translate3d(${sp.x}px, ${sp.y}px, 0) translate(-50%, -50%) rotate(${spiderRotationDeg}deg)`;
      }

      if (antRef.current) {
        const antRotationDeg = radToDeg(ant.heading) + radToDeg(ant.flutterAngle);
        antRef.current.style.transform = `translate3d(${ant.x}px, ${ant.y}px, 0) translate(-50%, -50%) rotate(${antRotationDeg}deg) scale(${ant.scale})`;
      }
    };

    animId = requestAnimationFrame(frame);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', updateDimensions);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [reducedMotion, spiderSize, antSize, speed, soundEnabled]);

  // Accessibility: Static fallback for prefers-reduced-motion
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
      className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-auto select-none"
      style={{ touchAction: 'none' }}
    >
      {/* Spiderweb Background Graphic */}
      <img
        src="/spiderweb.svg"
        alt="Geometric spiderweb background"
        className="absolute inset-0 w-full h-full object-contain opacity-35 md:opacity-45 pointer-events-none transition-opacity duration-700"
      />

      {/* Prey: Ant Character */}
      <div
        ref={antRef}
        className="absolute will-change-transform z-10 pointer-events-none drop-shadow-[0_2px_4px_rgba(255,75,185,0.5)]"
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

      {/* Predator: Spider Character with 10 Articulated Legs */}
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

          {/* Spider Thorax & Abdomen Body */}
          <g ref={spiderBodyRef}>
            <path d={SPIDER_PATHS.BODY} />
          </g>
        </svg>
      </div>
    </div>
  );
};
