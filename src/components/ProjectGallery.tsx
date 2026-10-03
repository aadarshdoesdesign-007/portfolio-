'use client';
import React, { useState } from 'react';
import { Project, ProjectCategory } from '@/types';
import { SectionHeader } from './SectionHeader';
import { ProjectCard } from './ProjectCard';
import { useLens } from '@/context/LensContext';

interface ProjectGalleryProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenSearch: () => void;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  projects,
  onSelectProject,
  onOpenSearch
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const { lens } = useLens();

  const categories = ['All', 'Product Design', 'UI/UX', 'Information Visualization', 'Research', 'Wayfinding'];

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'All') return true;
    return p.category === activeFilter || p.tags.includes(activeFilter);
  });

  return (
    <section id="projects" className="py-20 sm:py-28 border-t border-b border-white/20 transition-colors duration-400">
      {/* Section Header Row */}
      <div className="gridRow items-baseline">
        <div className="grid_1">
          <SectionHeader number="02" title="Projects" className="mb-0" />
        </div>
        <div className="grid_2-4">
          <p className={`text-sm sm:text-base text-white/90 leading-relaxed ${
            lens === 'editorial' ? 'font-serif text-[17px]' : ''
          }`}>
            A chronological archive of selected digital products, data systems, and design research.{' '}
            <span className="text-white/60 font-mono">[Total: {projects.length} entries ⌁]</span>
          </p>
        </div>
        <div className="grid_5-6 flex justify-start md:justify-end mt-4 md:mt-0">
          <button
            onClick={onOpenSearch}
            className={`group flex items-center gap-1.5 text-xs font-mono text-white/80 hover:text-white transition-colors ${
              lens === 'brutalist' ? 'border border-white px-2 py-1 bg-black shadow-[2px_2px_0px_white]' : ''
            }`}
          >
            <span>{lens === 'experimental' ? 'QUERY_SEARCH' : 'Open Project Search'}</span>
            <div className="flex items-center gap-0.5 ml-1">
              <span className={`w-5 h-5 flex items-center justify-center border border-white/30 ${
                lens === 'swiss' || lens === 'brutalist' ? 'rounded-none' : 'rounded'
              } text-[11px] bg-white/10 group-hover:bg-white/20 text-white transition-colors`}>
                ⌘
              </span>
              <span className={`w-5 h-5 flex items-center justify-center border border-white/30 ${
                lens === 'swiss' || lens === 'brutalist' ? 'rounded-none' : 'rounded'
              } text-[11px] bg-white/10 group-hover:bg-white/20 text-white transition-colors`}>
                k
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Category Filter Chips Bar */}
      <div className="gridRow mt-8">
        <div className="grid_full flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isSelected = activeFilter === cat;

            // Lens-specific chip styling
            let chipClass = 'text-xs font-mono px-3 py-1 rounded transition-all duration-200 cursor-pointer ';
            if (lens === 'swiss') {
              chipClass = `text-xs font-sans uppercase font-bold tracking-wider px-3 py-1 rounded-none transition-all duration-150 cursor-pointer ${
                isSelected ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20 border border-white/30'
              }`;
            } else if (lens === 'brutalist') {
              chipClass = `text-xs font-mono uppercase font-bold px-3 py-1 rounded-none transition-all duration-100 cursor-pointer border-2 border-white ${
                isSelected ? 'bg-white text-black shadow-[2px_2px_0px_white]' : 'bg-black text-white hover:bg-white hover:text-black'
              }`;
            } else if (lens === 'editorial') {
              chipClass = `text-sm font-serif italic px-3 py-0.5 transition-all duration-200 cursor-pointer ${
                isSelected ? 'text-white border-b-2 border-white font-medium not-italic' : 'text-white/60 hover:text-white'
              }`;
            } else if (lens === 'maximalist') {
              chipClass = `text-xs font-sans uppercase font-black px-3.5 py-1.5 rounded-full transition-all duration-150 cursor-pointer border border-white ${
                isSelected ? 'bg-white text-black shadow-[3px_3px_0px_rgba(255,255,255,0.4)]' : 'bg-white/10 text-white hover:bg-white/20'
              }`;
            } else if (lens === 'experimental') {
              chipClass = `text-xs font-mono px-2.5 py-1 rounded-none border border-dashed transition-all duration-150 cursor-pointer ${
                isSelected ? 'border-white bg-white/20 text-white font-bold' : 'border-white/30 text-white/60 hover:border-white/60 hover:text-white'
              }`;
            } else {
              // Master Default
              chipClass += isSelected
                ? 'bg-white text-black font-medium shadow-sm'
                : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/20';
            }

            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={chipClass}
              >
                {lens === 'experimental' ? `>${cat.toLowerCase().replace(/\s+/g, '_')}` : cat}
                {cat !== 'All' && (
                  <span className="ml-1.5 opacity-60">
                    ({projects.filter(p => p.category === cat || p.tags.includes(cat)).length})
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid Display */}
      <div className="gridRow mt-12 sm:mt-16">
        <div className="grid_full">
          {filteredProjects.length === 0 ? (
            <div className="py-20 text-center font-mono text-sm text-white/60">
              No projects match the selected category.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {filteredProjects.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={idx}
                  onSelect={onSelectProject}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
