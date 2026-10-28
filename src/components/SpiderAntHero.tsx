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
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const radToDeg = (rad: number) => (rad * 180) / Math.PI;

export const SpiderAntHero: React.FC<SpiderAntHeroProps> = ({
  spiderSize = 260,
  antSize = 32,
  speed = 1.6,
  spiderColor = '#000000',
  antColor = '#FF4BB9',
  soundEnabled = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const spiderRef = useRef<HTMLDivElement>(null);
  const mosquitoRef = useRef<HTMLDivElement>(null);
  const spiderBodyRef = useRef<SVGGElement>(null);
  const legRefs = useRef<Record<string, SVGPathElement>>({});

  const [reducedMotion, setReducedMotion] = useState(false);

  // Audio Context ref
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
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

    // Dimensions
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
      autoMode: false,
      userActive: false,
      cursor: { x: width * 0.65, y: height * 0.45 },
      wander: { wx: width * 0.65, wy: height * 0.45, dwellStart: 0, dwellLen: 1.8 },
      spider: {
        x: width * 0.45,
        y: height * 0.5,
        heading: 0,
        sp: 0,
        state: 'REST', // REST, CHASE, POUNCE, EAT, RETURN, AVOID
        pt: 0,
        pdur: 0.35,
        pounce: null as { sx: number; sy: number; tx: number; ty: number; t0: number; dur: number } | null,
        eatT: 0,
        pounceCd: 0,
      },
      mosq: {
        x: width * 0.65,
        y: height * 0.45,
        vx: 0,
        vy: 0,
        state: 'landed', // landed, flying, dead
        phi: 0,
        alpha: 1,
        scl: 1,
      },
    };

    // Leg Inverse Kinematics setup
    interface LegState {
      id: string;
      three: boolean;
      side: string;
      n: number;
      S: { x: number; y: number };
      K: { x: number; y: number };
      F: { x: number; y: number };
      l1: number;
      l2: number;
      sign: number;
      planted: { x: number; y: number };
      swing: { sx: number; sy: number; tx: number; ty: number; t0: number; dur: number } | null;
      lastEnd: number;
    }

    const legs: LegState[] = SPIDER_LEGS.map((leg) => {
      const isLeft = leg.id.startsWith('L');
      const num = parseInt(leg.id.split('_')[1], 10);
      const angle = (isLeft ? Math.PI : 0) + (num - 3) * 0.35;
      const reach = 180 + (num === 1 ? -20 : num === 5 ? 40 : 10);

      const sx = SPIDER_CENTER_X + (isLeft ? -40 : 40);
      const sy = SPIDER_CENTER_Y + (num - 3) * 28;
      const kx = sx + Math.cos(angle) * (reach * 0.55);
      const ky = sy + Math.sin(angle) * (reach * 0.45);
      const fx = sx + Math.cos(angle) * reach;
      const fy = sy + Math.sin(angle) * reach;

      const l1 = distance(sx, sy, kx, ky);
      const l2 = distance(kx, ky, fx, fy);

      return {
        id: leg.id,
        three: leg.three,
        side: isLeft ? 'L' : 'R',
        n: num,
        S: { x: sx, y: sy },
        K: { x: kx, y: ky },
        F: { x: fx, y: fy },
        l1: Math.max(30, l1),
        l2: Math.max(30, l2),
        sign: isLeft ? -1 : 1,
        planted: { x: fx, y: fy },
        swing: null,
        lastEnd: 0,
      };
    });

    // Sound effect trigger (gentle click/step)
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
          osc.frequency.setValueAtTime(140 + Math.random() * 40, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.04);
          gain.gain.setValueAtTime(0.015, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
          osc.connect(gain).connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.05);
        }
      } catch {
        // audio disabled or restricted
      }
    };

    // Pointer move listener
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const px = clamp(e.clientX - rect.left, 20, rect.width - 20);
      const py = clamp(e.clientY - rect.top, 20, rect.height - 20);
      state.cursor.x = px;
      state.cursor.y = py;
      state.userActive = true;
      state.autoMode = false;
    };

    container.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Touch / click listener
    const handlePointerDown = (e: PointerEvent) => {
      handlePointerMove(e);
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume().catch(() => {});
      }
    };
    container.addEventListener('pointerdown', handlePointerDown, { passive: true });

    // World to local coords helper
    const spiderScale = spiderSize / SPIDER_VIEWBOX_W;
    const toWorld = (localPt: { x: number; y: number }) => {
      const rad = state.spider.heading + Math.PI / 2;
      const ox = (localPt.x - SPIDER_CENTER_X) * spiderScale;
      const oy = (localPt.y - SPIDER_CENTER_Y) * spiderScale;
      const c = Math.cos(rad);
      const s = Math.sin(rad);
      return {
        x: state.spider.x + ox * c - oy * s,
        y: state.spider.y + ox * s + oy * c,
      };
    };

    let lastTime: number | null = null;

    // Main animation loop
    const frame = (time: number) => {
      if (isDisposed) return;
      animId = requestAnimationFrame(frame);

      if (lastTime === null) {
        lastTime = time;
        return;
      }

      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      state.t += dt;

      // 1. Update Ant / Mosquito
      const m = state.mosq;
      let targetX = state.cursor.x;
      let targetY = state.cursor.y;

      // In auto mode, wander smoothly
      if (!state.userActive) {
        targetX = width * 0.5 + Math.sin(state.t * 0.8) * (width * 0.28);
        targetY = height * 0.45 + Math.cos(state.t * 0.6) * (height * 0.22);
      }

      if (m.state !== 'dead') {
        const dTarget = distance(m.x, m.y, targetX, targetY);
        const lerpFactor = clamp(dt * 9, 0.05, 0.35);
        m.x += (targetX - m.x) * lerpFactor;
        m.y += (targetY - m.y) * lerpFactor;
        m.phi = Math.sin(state.t * 30) * 0.15; // subtle fluttering
        m.alpha = 1;
        m.scl = 1;
      } else {
        // Eaten / dead: fade out and respawn after 2 seconds
        m.alpha = Math.max(0, m.alpha - dt * 1.5);
        if (m.alpha <= 0.05 && state.t - state.spider.eatT > 2.2) {
          m.state = 'landed';
          m.x = clamp(state.spider.x + (Math.random() - 0.5) * 350, 40, width - 40);
          m.y = clamp(state.spider.y + (Math.random() - 0.5) * 280, 40, height - 40);
          m.alpha = 1;
        }
      }

      // 2. Update Spider State Machine
      const sp = state.spider;
      const dToPrey = distance(sp.x, sp.y, m.x, m.y);
      const angleToPrey = Math.atan2(m.y - sp.y, m.x - sp.x) - Math.PI / 2;

      // State transitions
      if (sp.state === 'REST') {
        sp.sp = 0;
        if (m.state !== 'dead' && dToPrey < 480) {
          sp.state = 'CHASE';
        }
      } else if (sp.state === 'CHASE') {
        if (m.state === 'dead') {
          sp.state = 'RETURN';
        } else if (dToPrey < 95) {
          // Trigger pounce!
          sp.state = 'POUNCE';
          sp.pt = 0;
          sp.pounce = {
            sx: sp.x,
            sy: sp.y,
            tx: m.x,
            ty: m.y,
            t0: state.t,
            dur: 0.22,
          };
          playStepSound();
        } else {
          // Crawl smoothly toward prey
          const rotDiff = normalizeAngle(angleToPrey - sp.heading);
          sp.heading += rotDiff * clamp(dt * 5 * speed, 0.05, 0.4);

          const maxSp = 120 * speed;
          sp.sp = maxSp;
          const forwardRad = sp.heading + Math.PI / 2;
          sp.x += Math.cos(forwardRad) * sp.sp * dt;
          sp.y += Math.sin(forwardRad) * sp.sp * dt;
        }
      } else if (sp.state === 'POUNCE') {
        if (sp.pounce) {
          sp.pt += dt;
          const progress = clamp(sp.pt / sp.pounce.dur, 0, 1);
          const ease = easeOutCubic(progress);
          sp.x = sp.pounce.sx + (sp.pounce.tx - sp.pounce.sx) * ease;
          sp.y = sp.pounce.sy + (sp.pounce.ty - sp.pounce.sy) * ease;

          if (progress >= 1) {
            sp.state = 'EAT';
            sp.eatT = state.t;
            m.state = 'dead';
            sp.pounce = null;
          }
        }
      } else if (sp.state === 'EAT') {
        sp.sp = 0;
        if (state.t - sp.eatT > 1.2) {
          sp.state = 'RETURN';
        }
      } else if (sp.state === 'RETURN') {
        const homeX = width * 0.45;
        const homeY = height * 0.5;
        const dHome = distance(sp.x, sp.y, homeX, homeY);
        if (dHome < 30) {
          sp.state = 'REST';
          sp.sp = 0;
        } else {
          const homeAngle = Math.atan2(homeY - sp.y, homeX - sp.x) - Math.PI / 2;
          const rotDiff = normalizeAngle(homeAngle - sp.heading);
          sp.heading += rotDiff * clamp(dt * 3, 0.03, 0.25);
          sp.sp = 80 * speed;
          const forwardRad = sp.heading + Math.PI / 2;
          sp.x += Math.cos(forwardRad) * sp.sp * dt;
          sp.y += Math.sin(forwardRad) * sp.sp * dt;
        }
      }

      // 3. Update Leg IK & Gait Cycling
      legs.forEach((leg) => {
        const worldJoint = toWorld(leg.S);
        const worldFootTarget = toWorld(leg.F);

        // Check if foot is overstretched from target
        const footDist = distance(leg.planted.x, leg.planted.y, worldFootTarget.x, worldFootTarget.y);
        const maxStretch = 45;

        if (!leg.swing && footDist > maxStretch) {
          // Plant new step
          leg.swing = {
            sx: leg.planted.x,
            sy: leg.planted.y,
            tx: worldFootTarget.x,
            ty: worldFootTarget.y,
            t0: state.t,
            dur: 0.16 / speed,
          };
          playStepSound();
        }

        if (leg.swing) {
          const swingProg = clamp((state.t - leg.swing.t0) / leg.swing.dur, 0, 1);
          const ease = easeOutCubic(swingProg);
          leg.planted.x = leg.swing.sx + (leg.swing.tx - leg.swing.sx) * ease;
          leg.planted.y = leg.swing.sy + (leg.swing.ty - leg.swing.sy) * ease;
          if (swingProg >= 1) {
            leg.swing = null;
          }
        }

        // Apply IK transform to DOM paths
        const pathUpper = legRefs.current[`${leg.id}_UPPER`];
        const pathLower = legRefs.current[`${leg.id}_LOWER`];
        const pathJoint = legRefs.current[`${leg.id}_JOINT`];
        const pathKnee = legRefs.current[`${leg.id}_KNEE`];

        // Micro-rotate joints slightly for realistic organic feeling
        if (pathJoint) {
          const subtleFlex = Math.sin(state.t * 8 + leg.n) * 1.5;
          pathJoint.style.transform = `rotate(${subtleFlex}deg)`;
        }
      });

      // 4. Update DOM Elements
      if (spiderRef.current) {
        const deg = radToDeg(sp.heading);
        spiderRef.current.style.transform = `translate3d(${sp.x}px, ${sp.y}px, 0) translate(-50%, -50%) rotate(${deg}deg)`;
      }

      if (mosquitoRef.current) {
        mosquitoRef.current.style.transform = `translate3d(${m.x}px, ${m.y}px, 0) translate(-50%, -50%) rotate(${radToDeg(m.phi)}deg) scale(${m.scl})`;
        mosquitoRef.current.style.opacity = String(m.alpha);
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
  }, [reducedMotion, speed, spiderSize, soundEnabled]);

  // Reduced motion fallback: static tasteful display
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
            left: '48%',
            top: '52%',
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

      {/* Prey: Ant / Mosquito Character */}
      <div
        ref={mosquitoRef}
        className="absolute will-change-transform z-10 pointer-events-none drop-shadow-[0_2px_4px_rgba(255,75,185,0.4)]"
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

      {/* Predator: Spider Character with 10 IK Legs */}
      <div
        ref={spiderRef}
        className="absolute will-change-transform z-10 pointer-events-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.18)]"
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
