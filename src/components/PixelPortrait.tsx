'use client';
import React, { useRef, useState, useEffect, useCallback } from 'react';

import { useLens } from '@/context/LensContext';

interface PixelPortraitProps {
  className?: string;
}

export const PixelPortrait: React.FC<PixelPortraitProps> = ({ className = '' }) => {
  const { lens } = useLens();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isResolved, setIsResolved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Subtle 7.5px pixel block size (visible but unresolved)
  const RESTING_PIXEL_SIZE = 7.5;
  const currentPixelSizeRef = useRef<number>(RESTING_PIXEL_SIZE);
  const targetPixelSizeRef = useRef<number>(RESTING_PIXEL_SIZE);

  // Detect touch device on mount
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Nearest-neighbor canvas pixelation
  const renderPixelated = useCallback((pixelSize: number) => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Calculate object-fit: cover coordinates
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;
    let renderW = width;
    let renderH = height;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      renderW = height * imgRatio;
      offsetX = (width - renderW) / 2;
    } else {
      renderH = width / imgRatio;
      offsetY = (height - renderH) / 2;
    }

    if (pixelSize <= 1) {
      ctx.clearRect(0, 0, width, height);
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
      return;
    }

    // Downscale onto small offscreen canvas preserving true colors & luminance
    const pSize = Math.max(1, pixelSize);
    const smallW = Math.max(1, Math.floor(width / pSize));
    const smallH = Math.max(1, Math.floor(height / pSize));

    const offscreen = document.createElement('canvas');
    offscreen.width = smallW;
    offscreen.height = smallH;
    const offCtx = offscreen.getContext('2d');
    if (!offCtx) return;

    offCtx.imageSmoothingEnabled = true;
    offCtx.drawImage(
      img,
      (offsetX / width) * smallW,
      (offsetY / height) * smallH,
      (renderW / width) * smallW,
      (renderH / height) * smallH
    );

    // Upscale with nearest-neighbor rendering
    ctx.clearRect(0, 0, width, height);
    ctx.imageSmoothingEnabled = false;
    // @ts-ignore
    ctx.mozImageSmoothingEnabled = false;
    // @ts-ignore
    ctx.webkitImageSmoothingEnabled = false;
    // @ts-ignore
    ctx.msImageSmoothingEnabled = false;

    ctx.drawImage(offscreen, 0, 0, smallW, smallH, 0, 0, width, height);
  }, []);

  // Smooth animation loop for resolving pixels
  const startPixelTransition = useCallback((targetSize: number) => {
    targetPixelSizeRef.current = targetSize;

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    const animate = () => {
      const current = currentPixelSizeRef.current;
      const target = targetPixelSizeRef.current;
      const diff = target - current;

      if (Math.abs(diff) < 0.15) {
        currentPixelSizeRef.current = target;
        renderPixelated(target);
        return;
      }

      // Smooth ease-out interpolation
      const nextSize = current + diff * 0.18;
      currentPixelSizeRef.current = nextSize;
      renderPixelated(nextSize);

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
  }, [renderPixelated]);

  // Handle image load
  useEffect(() => {
    const img = new Image();
    img.src = '/images/aadarsh_portrait.png';
    img.onload = () => {
      imgRef.current = img;
      setImageLoaded(true);

      const canvas = canvasRef.current;
      if (canvas && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = (rect.width || 320) * dpr;
        canvas.height = (rect.height || 380) * dpr;
        renderPixelated(RESTING_PIXEL_SIZE);
      }
    };

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [renderPixelated, RESTING_PIXEL_SIZE]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container || !imgRef.current) return;

      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = (rect.width || 320) * dpr;
      canvas.height = (rect.height || 380) * dpr;
      renderPixelated(currentPixelSizeRef.current);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderPixelated]);

  // State determination
  const shouldResolve = isHovered || isResolved;

  useEffect(() => {
    if (!imageLoaded) return;
    if (shouldResolve) {
      startPixelTransition(1); // Gradually resolve down to sharp 1px
    } else {
      startPixelTransition(RESTING_PIXEL_SIZE); // Smoothly return to 7.5px subtle pixel texture
    }
  }, [shouldResolve, imageLoaded, startPixelTransition, RESTING_PIXEL_SIZE]);

  // Touch device tap toggle
  const handleToggle = () => {
    if (isTouchDevice) {
      setIsResolved((prev) => !prev);
    }
  };

  let frameClass = 'relative overflow-hidden aspect-[4/5] bg-black/20 cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-white transition-all duration-300 ';
  if (lens === 'swiss') {
    frameClass += 'rounded-none border border-white/40';
  } else if (lens === 'brutalist') {
    frameClass += 'rounded-none border-2 border-white shadow-[4px_4px_0px_white]';
  } else if (lens === 'maximalist') {
    frameClass += 'rounded-lg border-2 border-white shadow-[5px_5px_0px_rgba(255,255,255,0.4)]';
  } else if (lens === 'experimental') {
    frameClass += 'rounded-none border border-dashed border-white/40';
  } else if (lens === 'editorial') {
    frameClass += 'rounded-none border border-white/20';
  } else {
    frameClass += 'border border-white/25 rounded-[2px]';
  }

  return (
    <div className={`relative max-w-sm w-full ${className}`}>
      {/* Outer interactive portrait container */}
      <div
        ref={containerRef}
        tabIndex={0}
        role="button"
        aria-label="Portrait of Aadarsh R. Hover or tap to resolve fine photographic details."
        onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
        onMouseLeave={() => !isTouchDevice && setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsResolved((prev) => !prev);
          }
        }}
        className={frameClass}
      >
        {/* Layer 1: Sharp Original Photograph Layer (10% at rest, 100% on hover) */}
        <img
          src="/images/aadarsh_portrait.png"
          alt="Aadarsh R"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-600 ease-out"
          style={{
            opacity: shouldResolve ? 1 : 0.12,
            willChange: 'opacity'
          }}
        />

        {/* Layer 2: Softened/Slightly Blurred Original Layer (20% at rest, 0% on hover) */}
        <img
          src="/images/aadarsh_portrait.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none filter blur-[2px] transition-opacity duration-600 ease-out"
          style={{
            opacity: shouldResolve ? 0 : 0.22,
            willChange: 'opacity'
          }}
        />

        {/* Layer 3: Subtle Pixelated Canvas Layer (70% at rest, 0% on hover) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-600 ease-out"
          style={{
            imageRendering: 'pixelated',
            opacity: shouldResolve ? 0 : 0.74,
            willChange: 'opacity'
          }}
        />
      </div>

      {/* Subtle Editorial Caption matching Olivier's Reference */}
      <div className="mt-2.5 flex items-center justify-between text-xs font-mono text-white/70">
        <span className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 bg-white ${lens === 'swiss' || lens === 'brutalist' ? 'rounded-none' : 'rounded-full'}`} />
          <span>
            {lens === 'experimental' ? 'NODE::PORTRAIT_PIXELS [FEED: ACTIVE]' :
             lens === 'editorial' ? 'Portrait — subtle resolution' :
             <>Me, pixelated. <span className="opacity-60 text-[11px]">☻</span></>}
          </span>
        </span>
        <span className="text-[11px] text-white/50">
          {isTouchDevice ? '[Tap to resolve]' : '[Hover to resolve]'}
        </span>
      </div>
    </div>
  );
};
