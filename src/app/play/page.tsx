'use client';

import React, { useState, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { NotebookBackground } from '@/components/NotebookBackground';
import { puns, PunItem } from '@/content/puns';
import { motion, AnimatePresence } from 'framer-motion';

type CategoryFilter = 'All' | 'Design' | 'Tech' | 'Wordplay' | 'Everyday';

export default function PlayPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Spotlighted random pun
  const [spotlightPun, setSpotlightPun] = useState<PunItem>(() => puns[0]);
  const [spotlightKey, setSpotlightKey] = useState(0);

  // Filtered puns
  const filteredPuns = useMemo(() => {
    if (selectedCategory === 'All') return puns;
    return puns.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  // Toggle punchline reveal
  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Copy pun to clipboard
  const copyPun = async (e: React.MouseEvent, pun: PunItem) => {
    e.stopPropagation();
    const textToCopy = pun.punchline ? `${pun.setup}\n\n${pun.punchline}` : pun.setup;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedId(pun.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback
    }
  };

  // Random pun generator
  const rollRandomPun = () => {
    const remaining = puns.filter((p) => p.id !== spotlightPun.id);
    const nextPun = remaining[Math.floor(Math.random() * remaining.length)] || puns[0];
    setSpotlightPun(nextPun);
    setSpotlightKey((k) => k + 1);
    setRevealedIds((prev) => ({ ...prev, [nextPun.id]: true }));
  };

  const categories: CategoryFilter[] = ['All', 'Design', 'Tech', 'Wordplay', 'Everyday'];

  return (
    <div className="relative min-h-screen flex flex-col justify-between selection:bg-[#FFFF5F]">
      <NotebookBackground />
      <Navbar />

      <main className="relative z-10 flex-1 max-w-6xl mx-auto px-5 sm:px-10 py-8 sm:py-16 w-full">
        {/* Header */}
        <section className="mb-10 sm:mb-14">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h1 className="font-pacaembu text-4xl sm:text-6xl font-bold tracking-tight text-black">
              pun intended.
            </h1>
            <span className="px-3.5 py-1 rounded-full bg-[#FFFF5F] text-black text-xs font-mono font-bold border-2 border-black shadow-[2px_2px_0px_#000000]">
              WIT &amp; WORDPLAY ARCHIVE
            </span>
          </div>

          <p className="font-mooli text-lg sm:text-xl text-black/80 max-w-2xl leading-relaxed">
            A little wordplay never hurt anybody. Probably. 😌 A designer&apos;s personal collection of typography gags, developer confessions, and linguistic dad jokes.
          </p>

          {/* Random Pun Spotlight Generator Banner */}
          <div className="mt-8 rounded-3xl bg-white border-2 border-black shadow-[5px_5px_0px_#000000] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden">
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF4BB9] animate-ping" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-black/60">
                  SPOTLIGHT PUN
                </span>
                <span
                  style={{ backgroundColor: spotlightPun.accentColor }}
                  className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold border border-black shadow-[1px_1px_0px_#000000]"
                >
                  {spotlightPun.tag}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={spotlightKey}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-2"
                >
                  <div className="font-pacaembu text-xl sm:text-2xl font-bold text-black leading-snug">
                    &ldquo;{spotlightPun.setup}&rdquo;
                  </div>
                  {spotlightPun.punchline && (
                    <div className="font-mooli text-base sm:text-lg text-black/85 font-medium border-l-2 border-[#FF4BB9] pl-3 py-0.5">
                      {spotlightPun.punchline}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={rollRandomPun}
              className="px-6 py-3 rounded-full border-2 border-black bg-[#FFFF5F] text-black font-pacaembu font-bold text-sm shadow-[4px_4px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000000] active:translate-x-1 active:translate-y-1 transition-all flex items-center gap-2 shrink-0 select-none"
            >
              <span>🎲 Give me another pun</span>
              <span className="font-bold">↗</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2.5 mt-8 pt-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-black/60 mr-1">
              CATEGORY:
            </span>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count = cat === 'All' ? puns.length : puns.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full font-pacaembu text-xs sm:text-sm font-bold border-2 border-black transition-all flex items-center gap-1.5 select-none ${
                    isSelected
                      ? 'bg-black text-white shadow-[3px_3px_0px_#FF4BB9] -translate-y-0.5'
                      : 'bg-white text-black hover:bg-[#F9F3EB] shadow-[2px_2px_0px_#000000]'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-black/10 text-black'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Puns Grid */}
        <section className="mb-16">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
          >
            <AnimatePresence>
              {filteredPuns.map((pun) => {
                const isRevealed = revealedIds[pun.id];
                const isCopied = copiedId === pun.id;

                return (
                  <motion.div
                    key={pun.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => toggleReveal(pun.id)}
                    className="group relative rounded-3xl bg-[#F9F3EB] hover:bg-white border-2 border-black shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:-translate-y-1 transition-all p-6 flex flex-col justify-between cursor-pointer select-none"
                  >
                    <div>
                      {/* Card Header: Tag & Badge */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span
                          style={{ backgroundColor: pun.accentColor }}
                          className="px-2.5 py-1 rounded-full text-xs font-mono font-bold text-black border border-black shadow-[1px_1px_0px_#000000]"
                        >
                          {pun.tag}
                        </span>

                        <span className="w-8 h-8 rounded-full border border-black bg-white flex items-center justify-center text-xs font-mono font-bold shadow-[1px_1px_0px_#000000] group-hover:rotate-12 transition-transform">
                          {pun.badge}
                        </span>
                      </div>

                      {/* Pun Setup */}
                      <h3 className="font-pacaembu font-bold text-lg sm:text-xl text-black leading-snug mb-3">
                        &ldquo;{pun.setup}&rdquo;
                      </h3>

                      {/* Punchline Disclosure Area */}
                      {pun.punchline && (
                        <div className="mt-3">
                          {isRevealed ? (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="p-3 rounded-2xl bg-[#FFFF5F]/60 border border-black font-mooli text-base font-semibold text-black leading-relaxed"
                            >
                              👉 {pun.punchline}
                            </motion.div>
                          ) : (
                            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-black/60 group-hover:text-black transition-colors">
                              <span>[ Click to reveal punchline ]</span>
                              <span>▾</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Card Footer: Category & Copy Button */}
                    <div className="mt-6 pt-4 border-t border-black/15 flex items-center justify-between text-xs font-mono">
                      <span className="text-black/50 uppercase tracking-wider font-semibold">
                        #{pun.category}
                      </span>

                      <button
                        onClick={(e) => copyPun(e, pun)}
                        className={`px-3 py-1 rounded-full border border-black font-mono font-bold transition-all flex items-center gap-1 ${
                          isCopied
                            ? 'bg-[#90CD26] text-black shadow-[1px_1px_0px_#000000]'
                            : 'bg-white hover:bg-black hover:text-white text-black shadow-[1px_1px_0px_#000000]'
                        }`}
                        aria-label={`Copy pun: ${pun.setup}`}
                      >
                        {isCopied ? (
                          <>
                            <span>✓</span>
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <span>⧉</span>
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Closing Punchline Footer */}
        <section className="text-center py-10 border-t-2 border-black/10">
          <div className="inline-block px-5 py-2.5 rounded-full bg-[#F9F3EB] border-2 border-black shadow-[3px_3px_0px_#000000] font-pacaembu text-sm sm:text-base font-bold text-black">
            Okay, I&apos;ll stop now. That&apos;s the last straw. 🌾
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
