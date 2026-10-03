'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { ProjectGallery } from '@/components/ProjectGallery';
import { ProjectModal } from '@/components/ProjectModal';
import { Vita } from '@/components/Vita';
import { Footer } from '@/components/Footer';
import { SearchModal } from '@/components/SearchModal';
import { GridDisplay } from '@/components/GridDisplay';
import { themeColors, ThemeColor } from '@/components/ColourSwitcher';
import { projects } from '@/content/projects';
import { Project, DesignLens } from '@/types';
import { LensProvider, useLens } from '@/context/LensContext';

function HomeContent() {
  const { lens, setLens } = useLens();
  const [currentColor, setCurrentColor] = useState<ThemeColor>(themeColors[0]);
  const [gridVisible, setGridVisible] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState<string>('about');

  // Apply theme color changes to CSS variables globally
  const applyThemeColor = useCallback((color: ThemeColor) => {
    setCurrentColor(color);
    const root = document.documentElement;
    root.setAttribute('data-theme', color.id);
    root.style.setProperty('--background', color.hex);
    root.style.setProperty('--foreground', color.fontColor);
    root.style.setProperty('--accent', color.fontColor);
    root.style.setProperty('--highlight-color', color.hex);
    root.style.setProperty('--highlight-color-font', color.fontColor);
    
    // Hex to RGB breakdown for translucent variants
    const r = parseInt(color.hex.slice(1, 3), 16);
    const g = parseInt(color.hex.slice(3, 5), 16);
    const b = parseInt(color.hex.slice(5, 7), 16);

    root.style.setProperty('--highlight-color-50', `rgba(${r}, ${g}, ${b}, 0.05)`);
    root.style.setProperty('--highlight-color-100', `rgba(${r}, ${g}, ${b}, 0.1)`);
    root.style.setProperty('--highlight-color-200', `rgba(${r}, ${g}, ${b}, 0.2)`);
    root.style.setProperty('--highlight-color-300', `rgba(${r}, ${g}, ${b}, 0.3)`);
    root.style.setProperty('--highlight-color-400', `rgba(${r}, ${g}, ${b}, 0.4)`);
    root.style.setProperty('--highlight-color-500', `rgba(${r}, ${g}, ${b}, 0.5)`);
    root.style.setProperty('--highlight-color-600', `rgba(${r}, ${g}, ${b}, 0.6)`);
    root.style.setProperty('--highlight-color-700', `rgba(${r}, ${g}, ${b}, 0.7)`);
    root.style.setProperty('--highlight-color-800', `rgba(${r}, ${g}, ${b}, 0.8)`);
  }, []);

  // Cycle to next color in palette
  const cycleColor = useCallback(() => {
    const nextIdx = (themeColors.findIndex((c) => c.id === currentColor.id) + 1) % themeColors.length;
    applyThemeColor(themeColors[nextIdx]);
  }, [currentColor, applyThemeColor]);

  // Global Keyboard shortcuts: 'c' to cycle color, 'g' to toggle grid, Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === 'c' || e.key === 'C') {
        cycleColor();
      } else if (e.key === 'g' || e.key === 'G') {
        setGridVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cycleColor]);

  // Active section scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  // Initialize default theme (Black) on mount
  useEffect(() => {
    applyThemeColor(themeColors[0]);
  }, [applyThemeColor]);

  return (
    <div 
      data-lens={lens}
      className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans selection:bg-white/30 selection:text-white transition-colors duration-400"
    >
      {/* 6-Column Grid Overlay Visualizer */}
      <GridDisplay isVisible={gridVisible} />

      {/* Fixed Navigation Bar with rotating star, links, colour switcher & lens selector */}
      <Navigation
        currentColor={currentColor}
        onColorChange={applyThemeColor}
        activeSection={activeSection}
        currentLens={lens}
        onLensChange={setLens}
      />

      {/* 00 Hero Header with bold statement and Table of Contents */}
      <Hero />

      <main className="main">
        {/* 01 About Section */}
        <About />

        {/* 02 Projects Section & Archive */}
        <ProjectGallery
          projects={projects}
          onSelectProject={(proj) => setSelectedProject(proj)}
          onOpenSearch={() => setSearchOpen(true)}
        />

        {/* 03 Vita Section */}
        <Vita />
      </main>

      {/* Footer with colophon and keyboard shortcuts */}
      <Footer
        onCycleColor={cycleColor}
        onToggleGrid={() => setGridVisible(!gridVisible)}
        gridActive={gridVisible}
      />

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        allProjects={projects}
        onClose={() => setSelectedProject(null)}
        onNavigate={(proj) => setSelectedProject(proj)}
      />

      {/* Search Modal (Cmd+K) */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        projects={projects}
        onSelectProject={(proj) => {
          setSelectedProject(proj);
          setSearchOpen(false);
        }}
      />
    </div>
  );
}

export default function Home() {
  return (
    <LensProvider>
      <HomeContent />
    </LensProvider>
  );
}