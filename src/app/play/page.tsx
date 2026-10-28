'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { NotebookBackground } from '@/components/NotebookBackground';
import { MorphingArrowBadge } from '@/components/MorphingArrowBadge';
import { motion } from 'framer-motion';

export default function PlayPage() {
  const [activeToy, setActiveToy] = useState<'doodle' | 'physics' | 'morph'>('doodle');
  const [brushColor, setBrushColor] = useState<string>('#000000');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);

  // Physics bubbles state
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; y: number; size: number; color: string }>>([]);

  // Doodle Canvas Setup
  useEffect(() => {
    if (activeToy !== 'doodle') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas resolution
    canvas.width = canvas.parentElement?.clientWidth || 600;
    canvas.height = 380;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 4;
  }, [activeToy]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    isDrawing.current = true;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.strokeStyle = brushColor;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Physics Ripple Toy
  const handlePhysicsClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const colors = ['#FF4BB9', '#FFFF5F', '#00ADE6', '#90CD26', '#FF6100'];
    const newBubble = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      size: Math.floor(Math.random() * 50) + 40,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
    setBubbles((prev) => [...prev.slice(-12), newBubble]);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between selection:bg-[#FFFF5F]">
      <NotebookBackground />
      <Navbar />

      <main className="relative z-10 flex-1 max-w-5xl mx-auto px-5 sm:px-10 py-8 sm:py-16 w-full">
        {/* Header */}
        <section className="mb-10 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="font-pacaembu text-4xl sm:text-6xl font-bold tracking-tight text-black">
              play
            </h1>
            <span className="px-3 py-1 rounded-full bg-[#00ADE6] text-white text-xs font-mono font-bold border-2 border-black shadow-[2px_2px_0px_#000000]">
              EXPERIMENTS &amp; TOYS
            </span>
          </div>
          <p className="font-mooli text-base sm:text-lg text-black/75 max-w-xl">
            A sandbox for interactive micro-interactions, sensory simulations, creative sketches, and playful interface prototypes.
          </p>

          {/* Toy Switcher Pills */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => setActiveToy('doodle')}
              className={`px-5 py-2 rounded-full font-pacaembu text-sm font-bold border-2 border-black transition-all ${
                activeToy === 'doodle'
                  ? 'bg-[#FFFF5F] text-black shadow-[3px_3px_0px_#000000]'
                  : 'bg-white text-black/80 hover:bg-white shadow-[1px_1px_0px_#000000]'
              }`}
            >
              ✎ Notebook Doodler
            </button>

            <button
              onClick={() => setActiveToy('physics')}
              className={`px-5 py-2 rounded-full font-pacaembu text-sm font-bold border-2 border-black transition-all ${
                activeToy === 'physics'
                  ? 'bg-[#FF4BB9] text-white shadow-[3px_3px_0px_#000000]'
                  : 'bg-white text-black/80 hover:bg-white shadow-[1px_1px_0px_#000000]'
              }`}
            >
              ✦ Haptic Ripple Sandbox
            </button>

            <button
              onClick={() => setActiveToy('morph')}
              className={`px-5 py-2 rounded-full font-pacaembu text-sm font-bold border-2 border-black transition-all ${
                activeToy === 'morph'
                  ? 'bg-[#00ADE6] text-white shadow-[3px_3px_0px_#000000]'
                  : 'bg-white text-black/80 hover:bg-white shadow-[1px_1px_0px_#000000]'
              }`}
            >
              ✹ Morphing Geometry
            </button>
          </div>
        </section>

        {/* Active Toy Container */}
        <section className="relative rounded-3xl bg-[#F9F3EB] border-2 border-black shadow-[6px_6px_0px_#000000] p-6 sm:p-10 overflow-hidden min-h-[460px] flex flex-col justify-between">
          {activeToy === 'doodle' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/20 pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-black/70">INK:</span>
                  {['#000000', '#FF4BB9', '#00ADE6', '#90CD26', '#FF6100'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setBrushColor(color)}
                      style={{ backgroundColor: color }}
                      className={`w-7 h-7 rounded-full border-2 border-black transition-transform ${
                        brushColor === color ? 'scale-125 shadow-[1px_1px_0px_#000000]' : 'hover:scale-110'
                      }`}
                      aria-label={`Select ink color ${color}`}
                    />
                  ))}
                </div>

                <button
                  onClick={clearCanvas}
                  className="px-4 py-1.5 rounded-full border border-black bg-white text-xs font-mono font-bold hover:bg-black hover:text-white transition-colors"
                >
                  Clear Sheet
                </button>
              </div>

              {/* Drawing Area */}
              <div className="relative w-full h-[360px] rounded-2xl bg-white border-2 border-black overflow-hidden shadow-inner cursor-crosshair">
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-full block"
                />
              </div>

              <div className="text-xs font-mono text-black/50 text-center">
                Draw or scribble freely directly on the paper canvas.
              </div>
            </div>
          )}

          {activeToy === 'physics' && (
            <div
              onClick={handlePhysicsClick}
              className="relative w-full h-[400px] rounded-2xl bg-white border-2 border-black overflow-hidden shadow-inner cursor-pointer p-6 select-none flex flex-col justify-between"
            >
              <div className="text-xs font-mono font-bold text-black/60">
                [TAP ANYWHERE TO SPAWN SENSORY HAPTIC RIPPLES]
              </div>

              {bubbles.map((b) => (
                <motion.div
                  key={b.id}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    left: b.x - b.size / 2,
                    top: b.y - b.size / 2,
                    width: b.size,
                    height: b.size,
                    backgroundColor: b.color,
                  }}
                  className="rounded-full border-2 border-black pointer-events-none"
                />
              ))}

              <div className="text-center my-auto pointer-events-none space-y-2">
                <div className="font-pacaembu font-bold text-2xl text-black">
                  Sensory Haptic Feedback
                </div>
                <p className="text-sm font-mooli text-black/70 max-w-sm mx-auto">
                  Derived from behavioral studies in FinTech (Stash) exploring tactile feedback for digital payments.
                </p>
              </div>

              <div className="text-xs font-mono text-black/40 text-right">
                SPAWNED: {bubbles.length} RIPPLES
              </div>
            </div>
          )}

          {activeToy === 'morph' && (
            <div className="flex flex-col items-center justify-center py-10 space-y-8">
              <div className="text-center space-y-2">
                <div className="font-pacaembu font-bold text-2xl text-black">
                  Rotating &amp; Morphing Badges
                </div>
                <p className="text-sm font-mooli text-black/70 max-w-md mx-auto">
                  Interactive radial vector morphing between Burst, Flower, and Star mathematical polynomials on pointer events.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-10">
                <div className="text-center space-y-3">
                  <MorphingArrowBadge size={90} shapeColor="#FFFF5F" />
                  <div className="text-xs font-mono font-bold">BURST // STAR</div>
                </div>

                <div className="text-center space-y-3">
                  <MorphingArrowBadge size={90} shapeColor="#FF4BB9" />
                  <div className="text-xs font-mono font-bold">FLOWER // SPRING</div>
                </div>

                <div className="text-center space-y-3">
                  <MorphingArrowBadge size={90} shapeColor="#00ADE6" />
                  <div className="text-xs font-mono font-bold">RADIAL // ROTATE</div>
                </div>
              </div>

              <div className="text-xs font-mono text-black/50">
                Hover or tap each badge to trigger spring geometry recalculation.
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
