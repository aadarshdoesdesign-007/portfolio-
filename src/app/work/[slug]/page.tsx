import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { NotebookBackground } from '@/components/NotebookBackground';
import { projects, Project } from '@/content/projects';
import { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} — Aadarsh Ramakrishnan`,
    description: project.tagline || project.description,
  };
}

export default function ProjectDetailPage({ params }: Props) {
  const projectIndex = projects.findIndex((p) => p.slug === params.slug);
  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : projects[projects.length - 1];
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : projects[0];

  return (
    <div className="relative min-h-screen flex flex-col justify-between selection:bg-[#FFFF5F]">
      <NotebookBackground />
      <Navbar />

      <main className="relative z-10 flex-1 max-w-5xl mx-auto px-5 sm:px-10 py-8 sm:py-16 w-full">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black bg-white/90 text-xs font-pacaembu font-bold text-black shadow-[2px_2px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#000000] transition-all"
          >
            <span>←</span>
            <span>back to work</span>
          </Link>
        </div>

        {/* Project Header */}
        <header className="mb-12 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="px-3.5 py-1 rounded-full text-xs font-pacaembu font-bold border border-black"
              style={{ backgroundColor: project.accentColor, color: project.accentColor === '#000000' ? '#ffffff' : '#000000' }}
            >
              {project.category}
            </span>
            <span className="text-xs font-mono text-black/70">
              {project.timeline}
            </span>
            <span className="text-xs font-mono text-black/50">·</span>
            <span className="text-xs font-mono text-black/70">
              {project.location}
            </span>
          </div>

          <h1 className="font-pacaembu text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black leading-tight">
            {project.title}
          </h1>

          <p className="font-mooli text-lg sm:text-xl text-black/85 leading-relaxed max-w-3xl">
            {project.tagline}
          </p>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#F9F3EB] border-2 border-black shadow-[3px_3px_0px_#000000] text-xs font-mono">
            <div>
              <div className="text-black/50 uppercase tracking-wider mb-1">CLIENT / ORG</div>
              <div className="font-bold text-black text-sm">{project.clientOrOrg}</div>
            </div>
            <div>
              <div className="text-black/50 uppercase tracking-wider mb-1">ROLE</div>
              <div className="font-bold text-black text-sm">{project.role}</div>
            </div>
            <div>
              <div className="text-black/50 uppercase tracking-wider mb-1">YEAR</div>
              <div className="font-bold text-black text-sm">{project.year}</div>
            </div>
            <div>
              <div className="text-black/50 uppercase tracking-wider mb-1">DISCIPLINE</div>
              <div className="font-bold text-black text-sm">{project.category}</div>
            </div>
          </div>
        </header>

        {/* Case Study Body */}
        <article className="space-y-12">
          {/* Section: Overview */}
          <section className="p-8 rounded-3xl bg-[#F9F3EB] border-2 border-black shadow-[4px_4px_0px_#000000] space-y-4">
            <h2 className="font-pacaembu text-xl sm:text-2xl font-bold text-black">
              Project Context &amp; Objectives
            </h2>
            {project.overview.map((para, i) => (
              <p key={i} className="font-mooli text-base sm:text-lg text-black/80 leading-relaxed">
                {para}
              </p>
            ))}
          </section>

          {/* Section: Problem Space */}
          {project.problem && (
            <section className="p-8 rounded-3xl bg-white border-2 border-black shadow-[4px_4px_0px_#000000] space-y-4">
              <div className="inline-block px-3 py-1 rounded-full bg-[#FF4BB9] text-white border border-black text-xs font-mono font-bold">
                THE PROBLEM SPACE
              </div>
              <p className="font-mooli text-base sm:text-lg text-black/85 leading-relaxed font-medium">
                {project.problem}
              </p>
            </section>
          )}

          {/* Section: Key Contributions */}
          <section className="p-8 rounded-3xl bg-[#F9F3EB] border-2 border-black shadow-[4px_4px_0px_#000000] space-y-6">
            <h2 className="font-pacaembu text-xl sm:text-2xl font-bold text-black flex items-center gap-2">
              <span>Key Architectural &amp; Design Contributions</span>
              <span className="w-2 h-2 rounded-full bg-[#00ADE6]" />
            </h2>
            <ul className="space-y-3">
              {project.keyContributions.map((contrib, i) => (
                <li key={i} className="flex items-start gap-3 text-base font-mooli text-black/85 leading-relaxed">
                  <span className="font-bold text-black text-lg mt-0.5 leading-none">✦</span>
                  <span>{contrib}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section: Research & Methodology */}
          <section className="p-8 rounded-3xl bg-white border-2 border-black shadow-[4px_4px_0px_#000000] space-y-6">
            <h2 className="font-pacaembu text-xl sm:text-2xl font-bold text-black flex items-center gap-2">
              <span>Research Methodology &amp; Execution</span>
              <span className="w-2 h-2 rounded-full bg-[#FFFF5F]" />
            </h2>
            <ul className="space-y-3">
              {project.methodology.map((m, i) => (
                <li key={i} className="flex items-start gap-3 text-base font-mooli text-black/85 leading-relaxed">
                  <span className="px-2 py-0.5 rounded bg-black/5 border border-black/20 text-xs font-mono font-bold text-black mt-1">
                    0{i + 1}
                  </span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section: Outcomes */}
          <section className="p-8 rounded-3xl bg-[#F9F3EB] border-2 border-black shadow-[4px_4px_0px_#000000] space-y-6">
            <h2 className="font-pacaembu text-xl sm:text-2xl font-bold text-black flex items-center gap-2">
              <span>Deliverables &amp; Outcomes</span>
              <span className="w-2 h-2 rounded-full bg-[#90CD26]" />
            </h2>
            <ul className="space-y-3">
              {project.outcomes.map((outcome, i) => (
                <li key={i} className="flex items-start gap-3 text-base font-mooli text-black/85 leading-relaxed">
                  <span className="text-[#90CD26] font-bold text-lg mt-0.5 leading-none">✓</span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Tags */}
          <div className="pt-4 flex flex-wrap gap-2 items-center">
            <span className="text-xs font-mono text-black/50 mr-2">TAGS:</span>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-white border border-black text-xs font-mono font-medium text-black shadow-[1px_1px_0px_#000000]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </article>

        {/* Next / Previous Project Pagination Bar */}
        <nav className="mt-16 pt-8 border-t-2 border-black/40 flex items-center justify-between gap-4">
          <Link
            href={`/work/${prevProject.slug}`}
            className="group flex flex-col items-start p-4 rounded-2xl bg-white/70 hover:bg-white border border-black transition-all shadow-[2px_2px_0px_#000000]"
          >
            <span className="text-[10px] font-mono text-black/50 uppercase tracking-wider">← Previous</span>
            <span className="font-pacaembu font-bold text-sm sm:text-base text-black group-hover:text-[#FF4BB9] transition-colors">
              {prevProject.shortTitle || prevProject.title}
            </span>
          </Link>

          <Link
            href={`/work/${nextProject.slug}`}
            className="group flex flex-col items-end p-4 rounded-2xl bg-white/70 hover:bg-white border border-black transition-all shadow-[2px_2px_0px_#000000]"
          >
            <span className="text-[10px] font-mono text-black/50 uppercase tracking-wider">Next →</span>
            <span className="font-pacaembu font-bold text-sm sm:text-base text-black group-hover:text-[#FF4BB9] transition-colors">
              {nextProject.shortTitle || nextProject.title}
            </span>
          </Link>
        </nav>
      </main>

      <Footer />
    </div>
  );
}
