'use client';
import React, { useEffect } from 'react';
import { Project } from '@/types';
import { useLens } from '@/context/LensContext';

interface ProjectModalProps {
  project: Project | null;
  allProjects: Project[];
  onClose: () => void;
  onNavigate: (project: Project) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  allProjects,
  onClose,
  onNavigate
}) => {
  const { lens } = useLens();

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        const currIdx = allProjects.findIndex((p) => p.id === project.id);
        if (currIdx < allProjects.length - 1) {
          onNavigate(allProjects[currIdx + 1]);
        }
      } else if (e.key === 'ArrowLeft') {
        const currIdx = allProjects.findIndex((p) => p.id === project.id);
        if (currIdx > 0) {
          onNavigate(allProjects[currIdx - 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [project, allProjects, onClose, onNavigate]);

  if (!project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      style={{
        backgroundColor: 'var(--highlight-color-200)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className={`bg-white w-full max-w-4xl max-h-[92vh] overflow-y-auto flex flex-col my-auto transition-all ${
          lens === 'swiss' ? 'rounded-none border border-black shadow-2xl' :
          lens === 'brutalist' ? 'rounded-none border-2 border-black shadow-[8px_8px_0px_black]' :
          lens === 'editorial' ? 'rounded-none border border-gray-300 shadow-xl' :
          lens === 'maximalist' ? 'rounded-xl border-2 border-black shadow-[10px_10px_0px_rgba(0,0,0,0.8)]' :
          lens === 'experimental' ? 'rounded-none border border-dashed border-black shadow-none' :
          'rounded-lg shadow-2xl border border-gray-200'
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Sticky Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur z-20 px-6 sm:px-8 py-5 border-b border-gray-200 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`font-mono text-xs text-[var(--highlight-color)] font-semibold uppercase tracking-wider ${
                lens === 'swiss' ? 'bg-black text-white px-2 py-0.5 font-bold' : ''
              }`}>
                {project.category}
              </span>
              <span className="text-gray-300">·</span>
              <span className="font-mono text-xs text-gray-500">
                {project.year}
              </span>
            </div>
            <h2 className={`text-2xl sm:text-3xl text-[var(--color-headline)] tracking-tight ${
              lens === 'editorial' ? 'font-serif italic font-normal' :
              lens === 'brutalist' ? 'font-mono uppercase font-bold' :
              lens === 'swiss' ? 'font-sans uppercase font-bold' :
              'font-sans font-medium'
            }`}>
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className={`flex items-center gap-1.5 px-3 py-1.5 hover:bg-gray-100 text-gray-500 hover:text-black transition-colors font-mono text-xs border border-gray-200 ${
              lens === 'swiss' || lens === 'brutalist' ? 'rounded-none' : 'rounded-md'
            }`}
            aria-label="Close project modal"
          >
            <span>Close</span>
            <kbd className={`px-1.5 py-0.5 bg-gray-100 border border-gray-300 text-[10px] text-gray-600 font-mono ${
              lens === 'swiss' || lens === 'brutalist' ? 'rounded-none' : 'rounded'
            }`}>
              esc
            </kbd>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* 4-Column Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100 text-xs">
            <div>
              <span className="font-mono uppercase text-gray-400 block text-[10px] tracking-wider mb-1">
                Timeline
              </span>
              <span className="font-medium text-gray-800 font-mono">
                {project.dateRange}
              </span>
            </div>
            <div>
              <span className="font-mono uppercase text-gray-400 block text-[10px] tracking-wider mb-1">
                Discipline
              </span>
              <span className="font-medium text-gray-800">
                {project.category}
              </span>
            </div>
            <div>
              <span className="font-mono uppercase text-gray-400 block text-[10px] tracking-wider mb-1">
                Role
              </span>
              <span className="font-medium text-gray-800">
                {project.role}
              </span>
            </div>
            <div>
              <span className="font-mono uppercase text-gray-400 block text-[10px] tracking-wider mb-1">
                Context / Entity
              </span>
              <span className="font-medium text-gray-800">
                {project.clientOrOrg}
              </span>
            </div>
          </div>

          {/* Project Schematic Visual */}
          <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
            <div className="p-4 sm:p-6 flex items-center justify-center">
              <div className="w-full max-w-2xl aspect-[16/9] border border-gray-200 rounded shadow-sm overflow-hidden bg-white">
                <svg viewBox="0 0 600 340" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="600" height="340" fill="#fafafa"/>
                  <g stroke="#e2e8f0" strokeWidth="1" strokeDasharray="6 6">
                    <line x1="100" y1="0" x2="100" y2="340"/>
                    <line x1="300" y1="0" x2="300" y2="340"/>
                    <line x1="500" y1="0" x2="500" y2="340"/>
                    <line x1="0" y1="170" x2="600" y2="170"/>
                  </g>
                  <rect x="50" y="40" width="500" height="260" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5"/>
                  <line x1="50" y1="80" x2="550" y2="80" stroke="#f1f5f9" strokeWidth="1"/>
                  <circle cx="75" cy="60" r="4" fill="#cbd5e1"/>
                  <circle cx="90" cy="60" r="4" fill="#cbd5e1"/>
                  <circle cx="105" cy="60" r="4" fill="#cbd5e1"/>
                  <text x="130" y="64" fontFamily="monospace" fontSize="9" fill="#64748b">
                    ARCHITECTURE SPECIFICATION // {project.slug.toUpperCase()}
                  </text>
                  <rect x="80" y="110" width="120" height="70" rx="3" fill="#f8fafc" stroke="#e2e8f0"/>
                  <text x="92" y="132" fontFamily="monospace" fontSize="8" fill="#94a3b8">TAXONOMY NODE</text>
                  <text x="92" y="152" fontFamily="sans-serif" fontSize="11" fontWeight="600" fill="#1e293b">Data Layer</text>

                  <line x1="200" y1="145" x2="250" y2="145" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3"/>

                  <rect x="250" y="110" width="130" height="70" rx="3" fill="#f8fafc" stroke="#e2e8f0"/>
                  <text x="262" y="132" fontFamily="monospace" fontSize="8" fill="#94a3b8">HEURISTIC EVAL</text>
                  <text x="262" y="152" fontFamily="sans-serif" fontSize="11" fontWeight="600" fill="#1e293b">UX Logic</text>

                  <line x1="380" y1="145" x2="430" y2="145" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3"/>

                  <rect x="430" y="110" width="90" height="70" rx="3" fill="#f8fafc" stroke="#e2e8f0"/>
                  <text x="440" y="132" fontFamily="monospace" fontSize="8" fill="#94a3b8">VIEWPORT</text>
                  <text x="440" y="152" fontFamily="sans-serif" fontSize="11" fontWeight="600" fill="#1e293b">Output</text>

                  <rect x="80" y="210" width="440" height="60" rx="3" fill="#f8fafc" stroke="#e2e8f0"/>
                  <text x="95" y="235" fontFamily="monospace" fontSize="8" fill="#64748b">INTERACTION VERIFICATION MATRIX</text>
                  <line x1="95" y1="245" x2="500" y2="245" stroke="#e2e8f0" strokeWidth="1"/>
                  <text x="95" y="258" fontFamily="monospace" fontSize="7" fill="#94a3b8">
                    VERIFIED IN ACADEMIC / INDUSTRY FLIGHT ENVIRONMENT
                  </text>
                </svg>
              </div>
            </div>
            <div className="px-4 py-2 bg-gray-100 border-t border-gray-200 text-xs font-mono text-gray-500">
              {project.imagePlaceholder.caption}
            </div>
          </div>

          {/* Section: Overview */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--highlight-color)] font-semibold">
              Project Context &amp; Problem Space
            </h4>
            {project.overview.map((para, i) => (
              <p key={i} className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {para}
              </p>
            ))}
          </div>

          {/* Section: Key Contributions */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--highlight-color)] font-semibold">
              Key Contributions &amp; Architectural Decisions
            </h4>
            <ul className="space-y-2">
              {project.keyContributions.map((point, i) => (
                <li key={i} className="text-sm sm:text-base text-gray-700 flex items-start gap-2.5">
                  <span className="text-[var(--highlight-color)] font-bold text-xs mt-1">→</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Research & Methodology */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--highlight-color)] font-semibold">
              Research Process &amp; Methodology
            </h4>
            <ul className="space-y-2">
              {project.methodology.map((m, i) => (
                <li key={i} className="text-sm sm:text-base text-gray-700 flex items-start gap-2.5">
                  <span className="text-gray-400 font-mono text-xs mt-1">[{i + 1}]</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Outcomes */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--highlight-color)] font-semibold">
              Deliverables &amp; Outcomes
            </h4>
            <ul className="space-y-2">
              {project.outcomes.map((out, i) => (
                <li key={i} className="text-sm sm:text-base text-gray-700 flex items-start gap-2.5">
                  <span className="text-green-600 font-bold text-xs mt-1">✓</span>
                  <span>{out}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="pt-4 border-t border-gray-200">
            <span className="font-mono text-xs text-gray-400 uppercase tracking-wider block mb-2">
              Index Tags
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer with Project Pagination */}
        <div className="sticky bottom-0 bg-gray-50 px-6 sm:px-8 py-4 border-t border-gray-200 flex items-center justify-between text-xs font-mono">
          <div>
            {prevProject ? (
              <button
                onClick={() => onNavigate(prevProject)}
                className="flex items-center gap-1.5 text-gray-700 hover:text-[var(--highlight-color)] transition-colors"
              >
                <span>←</span>
                <span>{prevProject.title}</span>
              </button>
            ) : (
              <span className="text-gray-400">First Project</span>
            )}
          </div>

          <div className="text-gray-400 hidden sm:block">
            Use ← / → keys to navigate
          </div>

          <div>
            {nextProject ? (
              <button
                onClick={() => onNavigate(nextProject)}
                className="flex items-center gap-1.5 text-gray-700 hover:text-[var(--highlight-color)] transition-colors"
              >
                <span>{nextProject.title}</span>
                <span>→</span>
              </button>
            ) : (
              <span className="text-gray-400">Last Project</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
