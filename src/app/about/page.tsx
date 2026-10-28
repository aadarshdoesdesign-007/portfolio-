'use client';
import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { NotebookBackground } from '@/components/NotebookBackground';
import { MorphingArrowBadge } from '@/components/MorphingArrowBadge';

export default function AboutPage() {
  const principles = [
    'collaboration',
    'exploration',
    'transformation',
    'stories & systems',
    'play',
    'simplifying complexities',
    'curious ideas',
    'cognitive empathy',
  ];

  const experience = [
    {
      role: 'Data Visualization & UX Collaborator',
      org: 'IIT Indore',
      date: '04/26 → 07/26',
      location: 'Indore / Remote',
      note: 'Designed interactive data visualizer and structured research database spanning 28 ethnography types across 73 academic disciplines.',
    },
    {
      role: 'UI/UX Design Intern',
      org: 'NewSpace Research & Technologies',
      date: '10/25 → 04/26',
      location: 'Bengaluru, IN',
      note: 'Architected wireframes and interactive Figma prototypes for mission-critical autonomous drone telemetry cockpits and ground control software.',
    },
    {
      role: 'UX & Wayfinding Designer',
      org: 'Zoo Authority of Karnataka',
      date: '10/25 → 03/26',
      location: 'Shivamogga, IN',
      note: 'Developed map-centric information architecture, environmental sign taxonomy, and pedestrian orientation systems across 100+ acre conservation reserve.',
    },
  ];

  const research = [
    {
      title: 'AI-Assisted Architectural Heritage Reconstruction',
      forum: 'Aarohan — IIT Delhi National Research Showcase',
      date: '2026',
      note: 'Lead student author; presented methodology coupling archival field documentation with fine-tuned diffusion models to restore Vijayanagara column carvings.',
    },
    {
      title: 'Human-Centered Design of LLM Interfaces',
      forum: 'IIIT Pune × IIT Bombay · ACM SIGCHI Hackathon',
      date: '2026',
      note: 'Awarded 2nd Place / National Runner-Up for Nudge, an adaptive cognitive scaffolding interface for generative language models.',
    },
    {
      title: 'Behavioral UX & Financial Recall Gap in UPI Payments',
      forum: 'Faculty-Mentored FinTech Research Initiative',
      date: '2025 → ongoing',
      note: 'Co-authoring research investigating cognitive trust indicators, haptic feedback, and spending recall discrepancies among Indian university students.',
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col justify-between selection:bg-[#FFFF5F]">
      <NotebookBackground />
      <Navbar />

      <main className="relative z-10 flex-1 max-w-5xl mx-auto px-5 sm:px-10 py-8 sm:py-16 w-full">
        {/* Header */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <h1 className="font-pacaembu text-4xl sm:text-6xl font-bold tracking-tight text-black">
              about
            </h1>
            <span className="w-3 h-3 rounded-full bg-[#FF4BB9]" />
          </div>

          <p className="font-mooli text-xl sm:text-2xl text-black leading-relaxed font-semibold max-w-3xl">
            My practice spans UI/UX design, product design, complex data visualization, design research, and visual communication, using storytelling to create engaging visual experiences across digital and spatial mediums.
          </p>
        </section>

        {/* Bio Body & Photo */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 items-start">
          {/* Left: Bio Text */}
          <div className="lg:col-span-7 space-y-6">
            <p className="font-mooli text-base sm:text-lg text-black/85 leading-relaxed">
              I work with research institutions, emerging technology platforms, and cultural initiatives to translate complex ideas into thoughtful, accessible visual narratives. My collaborators include <span className="font-bold text-black">IIT Indore</span>, <span className="font-bold text-black">NewSpace Research &amp; Technologies</span>, <span className="font-bold text-black">Zoo Authority of Karnataka</span>, <span className="font-bold text-black">Aarohan IIT Delhi</span>, and <span className="font-bold text-black">ACM SIGCHI</span>.
            </p>

            <p className="font-mooli text-base sm:text-lg text-black/85 leading-relaxed">
              I use design as a translation device and I'm drawn to curiosity, stories, systems, collaboration, simplifying complex forms, and exploring unexpected connections between computational logic and human behavior.
            </p>

            {/* Principles Pill Cloud */}
            <div className="pt-4">
              <div className="text-xs font-mono text-black/50 uppercase tracking-wider mb-3">
                AREAS OF FOCUS &amp; ETHOS
              </div>
              <div className="flex flex-wrap gap-2">
                {principles.map((item, idx) => (
                  <span
                    key={item}
                    className={`px-3.5 py-1.5 rounded-full border-2 border-black text-xs sm:text-sm font-pacaembu font-bold text-black shadow-[2px_2px_0px_#000000] ${
                      idx % 3 === 0
                        ? 'bg-[#FFFF5F]'
                        : idx % 3 === 1
                        ? 'bg-[#FF4BB9] text-white'
                        : 'bg-[#00ADE6] text-white'
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Portrait Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-3xl bg-[#F9F3EB] border-2 border-black shadow-[6px_6px_0px_#000000] p-5 space-y-4">
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-black bg-white flex items-center justify-center">
                <img
                  src="/images/aadarsh_portrait.png"
                  alt="Aadarsh Ramakrishnan portrait"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="pt-1 flex items-center justify-between">
                <div>
                  <div className="font-pacaembu font-bold text-base text-black">
                    Aadarsh Ramakrishnan
                  </div>
                  <div className="font-mono text-xs text-black/60">
                    Designer &amp; Researcher
                  </div>
                </div>

                <MorphingArrowBadge size={40} shapeColor="#FFFF5F" />
              </div>
            </div>
          </div>
        </section>

        {/* Experience & Timeline Section */}
        <section className="space-y-12 pt-8 border-t-2 border-black/30">
          {/* Professional Experience */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <h2 className="font-pacaembu text-2xl font-bold text-black">
                Professional Experience
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-[#00ADE6] text-white text-[11px] font-mono font-bold">
                INDUSTRY
              </span>
            </div>

            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white/90 border-2 border-black shadow-[3px_3px_0px_#000000] flex flex-col sm:flex-row sm:items-baseline justify-between gap-3"
                >
                  <div className="space-y-1 max-w-xl">
                    <div className="font-pacaembu font-bold text-lg text-black">
                      {exp.role}
                    </div>
                    <div className="font-mono text-xs font-semibold text-[#00ADE6]">
                      {exp.org} · {exp.location}
                    </div>
                    <p className="font-mooli text-sm text-black/75 pt-1">
                      {exp.note}
                    </p>
                  </div>
                  <span className="font-mono text-xs font-bold text-black bg-[#F9F3EB] px-3 py-1 rounded-full border border-black shrink-0 self-start">
                    {exp.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Scholarship & Research */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <h2 className="font-pacaembu text-2xl font-bold text-black">
                Research Publications &amp; Honors
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-[#FF4BB9] text-white text-[11px] font-mono font-bold">
                SCHOLARSHIP
              </span>
            </div>

            <div className="space-y-4">
              {research.map((res, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white/90 border-2 border-black shadow-[3px_3px_0px_#000000] flex flex-col sm:flex-row sm:items-baseline justify-between gap-3"
                >
                  <div className="space-y-1 max-w-xl">
                    <div className="font-pacaembu font-bold text-lg text-black">
                      {res.title}
                    </div>
                    <div className="font-mono text-xs font-semibold text-[#FF4BB9]">
                      {res.forum}
                    </div>
                    <p className="font-mooli text-sm text-black/75 pt-1">
                      {res.note}
                    </p>
                  </div>
                  <span className="font-mono text-xs font-bold text-black bg-[#FFFF5F] px-3 py-1 rounded-full border border-black shrink-0 self-start">
                    {res.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="font-pacaembu text-2xl font-bold text-black mb-6">
              Education
            </h2>
            <div className="p-6 rounded-2xl bg-white/90 border-2 border-black shadow-[3px_3px_0px_#000000] flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
              <div className="space-y-1">
                <div className="font-pacaembu font-bold text-lg text-black">
                  Bachelor of Design (B.Des) in Communication Design
                </div>
                <div className="font-mono text-xs text-black/60">
                  Jain (Deemed-to-be) University, School of Design, Media and Creative Arts · Bengaluru, IN
                </div>
                <p className="font-mooli text-sm text-black/75 pt-1">
                  Focus on UI/UX, interaction design, information visualization, and design research methodologies.
                </p>
              </div>
              <span className="font-mono text-xs font-bold text-black bg-[#F9F3EB] px-3 py-1 rounded-full border border-black shrink-0 self-start">
                2023 → Expected 2027
              </span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
