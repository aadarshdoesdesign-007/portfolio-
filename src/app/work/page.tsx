'use client';
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { NotebookBackground } from '@/components/NotebookBackground';
import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/content/projects';
import { motion, AnimatePresence } from 'framer-motion';

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Derive categories dynamically from content while keeping 'All' first
  const rawCategories = Array.from(new Set(projects.map((p) => p.category)));
  const categories = ['All', ...rawCategories];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="relative min-h-screen flex flex-col justify-between selection:bg-[#FFFF5F]">
      <NotebookBackground />
      <Navbar />

      <main className="relative z-10 flex-1 max-w-7xl mx-auto px-5 sm:px-10 py-8 sm:py-16 w-full">
        {/* Header */}
        <section className="mb-10 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <h1 className="font-pacaembu text-4xl sm:text-6xl font-bold tracking-tight text-black">
                work
              </h1>
              <span className="px-3 py-1 rounded-full bg-[#FFFF5F] border-2 border-black text-sm font-mono font-bold shadow-[2px_2px_0px_#000000]">
                {filteredProjects.length}
              </span>
            </div>
            <p className="font-mooli text-sm sm:text-base text-black/70 max-w-md">
              Showing {filteredProjects.length} of {projects.length} verified projects across UI/UX, product design, complex data visualization, design research, and visual branding.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count = cat === 'All' ? projects.length : projects.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 sm:px-5 sm:py-2 rounded-full font-pacaembu text-xs sm:text-sm font-semibold tracking-wide border-2 border-black transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[#FFFF5F] text-black shadow-[3px_3px_0px_#000000] -translate-y-0.5'
                      : 'bg-white/80 hover:bg-white text-black/80 hover:text-black shadow-[1px_1px_0px_#000000]'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full border border-black ${isSelected ? 'bg-white text-black' : 'bg-black/5 text-black/60'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Project Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
