'use client';
import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { NotebookBackground } from '@/components/NotebookBackground';
import { MorphingArrowBadge } from '@/components/MorphingArrowBadge';
import { SpiderAntHero } from '@/components/SpiderAntHero';
import { CompanionSelector } from '@/components/CompanionSelector';
import { useCompanion } from '@/context/CompanionContext';
import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/content/projects';
import { profile } from '@/content/profile';
import { motion } from 'framer-motion';

export default function HomePage() {
  const { mode } = useCompanion();
  const featuredProjects = projects.filter((p) => p.featured);
  const totalProjectsCount = projects.length;

  return (
    <div className="relative min-h-screen flex flex-col justify-between selection:bg-[#FFFF5F] overflow-x-hidden">
      <NotebookBackground />
      {/* Viewport-level Spider & Ant Interaction Layer (pointer-events: none, non-blocking) */}
      <SpiderAntHero spiderSize={250} antSize={34} speed={1.3} />

      <Navbar />

      <main className="relative z-10 flex-1 max-w-7xl mx-auto px-5 sm:px-10 py-8 sm:py-16 w-full pointer-events-auto">
        {/* Hero Section */}
        <section className="relative min-h-[75vh] sm:min-h-[85vh] flex flex-col justify-center mb-16 sm:mb-24">
          {/* Decorative Web Background Graphic (in Spider Mode) */}
          {mode === 'spider' && (
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 transition-opacity duration-500">
              <img
                src="/spiderweb.svg"
                alt="Geometric spiderweb background"
                className="absolute inset-0 w-full h-full object-contain opacity-35 md:opacity-45 pointer-events-none"
              />
            </div>
          )}

          {/* Foreground Hero Content */}
          <div className="relative z-10 max-w-3xl space-y-6 pointer-events-auto">
            {/* Availability Pill & Non-blocking Companion Preference Selector */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black bg-white shadow-[2px_2px_0px_#000000] text-xs font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-[#90CD26] animate-pulse" />
                <span className="uppercase">{profile.availability}</span>
              </div>
              <CompanionSelector />
            </div>

            {/* Primary Headline */}
            <h1 className="font-pacaembu text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-black leading-[1.08]">
              I design interfaces for <span className="underline decoration-[#FF4BB9] decoration-wavy decoration-4 underline-offset-8">complex systems</span>.
            </h1>

            {/* Clear, Supporting Value Proposition & Identity */}
            <div className="space-y-3 max-w-2xl">
              <p className="font-mooli text-lg sm:text-xl text-black/85 leading-relaxed">
                {profile.supportingCopy}
              </p>
              <p className="font-mooli text-sm sm:text-base text-black/70 leading-relaxed">
                I'm <span className="font-semibold text-black">{profile.name}</span>, a <span className="font-semibold text-black underline decoration-[#00ADE6] underline-offset-4">{profile.primaryRole}</span> based in {profile.location.split(',')[0]}, focusing on {profile.supportingRoles.join(', ')}.
              </p>
            </div>

            {/* Call-to-Action Pill Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/work"
                className="px-6 py-3 rounded-full border-2 border-black bg-[#FFFF5F] text-black font-pacaembu font-bold text-base shadow-[4px_4px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000000] transition-all flex items-center gap-2"
              >
                <span>explore work</span>
                <span className="font-bold">→</span>
              </Link>

              <Link
                href="/about"
                className="px-6 py-3 rounded-full border-2 border-black bg-white text-black font-pacaembu font-bold text-base shadow-[4px_4px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000000] transition-all"
              >
                about me
              </Link>

              <div className="ml-2 hidden sm:block">
                <MorphingArrowBadge size={52} shapeColor="#FF4BB9" />
              </div>
            </div>
          </div>
        </section>

        {/* Selected Work Section */}
        <section className="mb-24">
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
        </section>

        {/* Design Philosophy Callout */}
        <section className="rounded-3xl bg-[#F9F3EB] border-2 border-black shadow-[5px_5px_0px_#000000] p-8 sm:p-12 mb-16 relative overflow-hidden">
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
