'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { NotebookBackground } from '@/components/NotebookBackground';
import { SpiderAntHero } from '@/components/SpiderAntHero';
import { useCompanion } from '@/context/CompanionContext';
import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/content/projects';
import { profile } from '@/content/profile';

export default function HomePage() {
  const { mode } = useCompanion();
  const featuredProjects = projects.filter((p) => p.featured);
  const totalProjectsCount = projects.length;

  return (
    <div className="relative min-h-screen flex flex-col justify-between selection:bg-[#FFFF5F]">
      <NotebookBackground />

      {/* Dedicated Viewport-level Interaction Layer (pointer-events: none, non-blocking) */}
      <SpiderAntHero spiderSize={220} antSize={30} speed={1.35} />

      <Navbar />

      {/* Hero Section — Minimal Editorial Layout Matching eranamjoshi.com */}
      <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-end px-6 sm:px-14 py-12 sm:py-16 w-full overflow-visible">
        {/* Subtle Centered Geometric Spiderweb Background Motif */}
        {mode === 'spider' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="relative w-[80vw] max-w-2xl h-[55vh] flex items-center justify-center">
              <img
                src="/spiderweb.svg"
                alt=""
                aria-hidden="true"
                className="w-full h-full object-contain opacity-30 select-none pointer-events-none transition-opacity duration-700"
              />
            </div>
          </div>
        )}

        {/* Lower-Left Minimal Introductory Statement */}
        <div className="relative z-10 max-w-lg space-y-4 pointer-events-auto pb-4 sm:pb-8">
          <div className="space-y-1.5">
            <h1 className="font-pacaembu text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black leading-tight">
              Aadarsh Ramakrishnan
            </h1>

            <p className="font-mooli text-base sm:text-lg text-black/80 leading-relaxed">
              Product designer exploring interfaces, data, and ideas.
            </p>
          </div>

          {/* Understated One-CTA + Small Unobtrusive Availability Indicator */}
          <div className="pt-1 flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono">
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-black bg-[#FFFF5F] text-black font-pacaembu font-bold text-xs shadow-[2px_2px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#000000] transition-all"
            >
              <span>Explore work</span>
              <span className="font-bold">→</span>
            </a>

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-black/25 text-black/75 text-[11px] font-mono shadow-[1px_1px_0px_#000000]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#90CD26] animate-pulse" />
              <span>{profile.availability}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Selected Work Section (revealed as visitor scrolls down) */}
      <main id="work" className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 py-16 sm:py-24 w-full pointer-events-auto">
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <div className="flex items-center gap-3">
            <h2 className="font-pacaembu text-3xl sm:text-4xl font-bold tracking-tight text-black">
              selected projects
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FF4BB9] text-white border border-black text-xs font-mono font-bold shadow-[2px_2px_0px_#000000]">
              {featuredProjects.length}
            </span>
          </div>

          <Link
            href="/work"
            className="group hidden sm:flex items-center gap-2 font-pacaembu font-bold text-sm text-black hover:text-[#FF4BB9] transition-colors"
          >
            <span>view all {totalProjectsCount} projects</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} priority={idx < 2} />
          ))}
        </div>

        {/* View All Button on Mobile */}
        <div className="mt-10 sm:hidden flex justify-center">
          <Link
            href="/work"
            className="w-full text-center px-6 py-3 rounded-full border-2 border-black bg-[#FFFF5F] text-black font-pacaembu font-bold text-base shadow-[3px_3px_0px_#000000]"
          >
            view all {totalProjectsCount} projects →
          </Link>
        </div>

        {/* Design Philosophy Callout */}
        <section className="mt-24 rounded-3xl bg-[#F9F3EB] border-2 border-black shadow-[5px_5px_0px_#000000] p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-[#FFFF5F] border border-black text-xs font-mono font-bold tracking-wider">
              PHILOSOPHY // INFORMATION ARCHITECTURE
            </div>

            <h3 className="font-pacaembu text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-black leading-snug">
              "I use design as a translation device to untangle complex systems, visualize multi-layered research, and build thoughtful, human interfaces."
            </h3>

            <p className="font-mooli text-base sm:text-lg text-black/80 leading-relaxed">
              Whether untangling 28 ethnography methodologies at IIT Indore, mapping cognitive friction in UPI payments, or architecting telemetry cockpits for autonomous drone systems, I treat interface design as an information architecture discipline where clarity meets genuine playfulness.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              {['systems & stories', 'cognitive empathy', 'data visualization', 'speculative design', 'ethical AI', 'play'].map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1 rounded-full bg-white border border-black text-xs font-mono font-bold text-black shadow-[1px_1px_0px_#000000]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
