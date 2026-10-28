'use client';
import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { NotebookBackground } from '@/components/NotebookBackground';
import { MorphingArrowBadge } from '@/components/MorphingArrowBadge';
import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/content/projects';
import { motion } from 'framer-motion';

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 6);

  return (
    <div className="relative min-h-screen flex flex-col justify-between selection:bg-[#FFFF5F]">
      <NotebookBackground />
      <Navbar />

      <main className="relative z-10 flex-1 max-w-7xl mx-auto px-5 sm:px-10 py-8 sm:py-16 w-full">
        {/* Hero Section */}
        <section className="mb-20 sm:mb-28">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            {/* Left Headline & Bio */}
            <div className="max-w-2xl space-y-6">
              {/* Badge sticker */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black bg-white shadow-[2px_2px_0px_#000000] text-xs font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-[#90CD26] animate-pulse" />
                <span>OPEN FOR SELECT PRODUCT &amp; RESEARCH COLLABORATIONS</span>
              </div>

              <h1 className="font-pacaembu text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-black leading-[1.08]">
                welcome to my <span className="underline decoration-[#FF4BB9] decoration-wavy decoration-4 underline-offset-8">portfolio</span>.
              </h1>

              <p className="font-mooli text-lg sm:text-xl text-black/85 leading-relaxed max-w-xl">
                I'm <span className="font-semibold text-black">Aadarsh Ramakrishnan</span>, a multidisciplinary designer and creative technologist based in Bengaluru, India, creating work across <span className="font-semibold text-black">UI/UX</span>, <span className="font-semibold text-black">product design</span>, <span className="font-semibold text-black">data visualization</span>, and <span className="font-semibold text-black">design research</span>.
              </p>

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

            {/* Right Hero Graphic / Character Illustration */}
            <div className="w-full lg:w-auto flex justify-center">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative w-72 sm:w-80 md:w-96 aspect-square rounded-3xl bg-[#F9F3EB] border-2 border-black shadow-[6px_6px_0px_#000000] p-6 flex flex-col justify-between overflow-hidden"
              >
                {/* Decorative sticker pills */}
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 rounded-full bg-[#00ADE6] text-white border border-black text-xs font-mono font-bold shadow-[1px_1px_0px_#000000]">
                    BENGALURU ⌁
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#FFFF5F] text-black border border-black text-xs font-mono font-bold shadow-[1px_1px_0px_#000000]">
                    2026 ARCHIVE
                  </span>
                </div>

                {/* Central Illustrated Doodled Character/Portrait */}
                <div className="my-auto flex flex-col items-center justify-center">
                  <svg viewBox="0 0 200 200" className="w-48 h-48 drop-shadow-md">
                    {/* Character Face / Body */}
                    <circle cx="100" cy="90" r="60" fill="#FFFF5F" stroke="#000000" strokeWidth="3" />
                    
                    {/* Whimsical Glasses */}
                    <rect x="62" y="75" width="30" height="24" rx="6" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
                    <rect x="108" y="75" width="30" height="24" rx="6" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
                    <line x1="92" y1="87" x2="108" y2="87" stroke="#000000" strokeWidth="3" />

                    {/* Eyes */}
                    <circle cx="77" cy="87" r="4" fill="#000000" />
                    <circle cx="123" cy="87" r="4" fill="#000000" />

                    {/* Smile */}
                    <path d="M 85 115 Q 100 130 115 115" stroke="#000000" strokeWidth="3" fill="none" strokeLinecap="round" />

                    {/* Cheeks */}
                    <circle cx="68" cy="110" r="6" fill="#FF4BB9" opacity="0.6" />
                    <circle cx="132" cy="110" r="6" fill="#FF4BB9" opacity="0.6" />

                    {/* Hair tuft / Creative spark */}
                    <path d="M 100 30 Q 95 10 115 20 Q 100 25 100 30" fill="#000000" />
                  </svg>
                  <span className="font-pacaembu font-bold text-sm text-black mt-2">
                    Aadarsh R — curious by design
                  </span>
                </div>

                {/* Footer caption */}
                <div className="pt-2 border-t border-black/15 flex items-center justify-between text-xs font-mono text-black/70">
                  <span>UI/UX · RESEARCH</span>
                  <span className="text-[#FF4BB9] font-bold">● ACTIVE</span>
                </div>
              </motion.div>
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
              <span>all projects</span>
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
              view all {projects.length} projects →
            </Link>
          </div>
        </section>

        {/* Design Philosophy Callout */}
        <section className="rounded-3xl bg-[#F9F3EB] border-2 border-black shadow-[5px_5px_0px_#000000] p-8 sm:p-12 mb-16 relative overflow-hidden">
          <div className="max-w-3xl space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-[#FFFF5F] border border-black text-xs font-mono font-bold tracking-wider">
              PHILOSOPHY // TRANSLATION DEVICE
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
