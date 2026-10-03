'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Project, ProjectCategory } from '@/types';
import { useLens } from '@/context/LensContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  projects,
  onSelectProject
}) => {
  const { lens } = useLens();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const categories = ['All', 'Product Design', 'UI/UX', 'Information Visualization', 'Research', 'Wayfinding'];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  // Filter projects based on query and category
  const filtered = projects.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory || p.tags.includes(selectedCategory);
    const q = query.toLowerCase().trim();
    if (!q) return matchesCat;

    const matchesQuery = 
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.clientOrOrg.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q));

    return matchesCat && matchesQuery;
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, selectedCategory]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      onSelectProject(filtered[selectedIndex]);
      onClose();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-150"
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
        className={`bg-white w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh] transition-all ${
          lens === 'swiss' ? 'rounded-none border border-black shadow-2xl' :
          lens === 'brutalist' ? 'rounded-none border-2 border-black shadow-[6px_6px_0px_black]' :
          lens === 'editorial' ? 'rounded-none border border-gray-300 shadow-xl' :
          lens === 'maximalist' ? 'rounded-xl border-2 border-black shadow-[8px_8px_0px_rgba(0,0,0,0.8)]' :
          lens === 'experimental' ? 'rounded-none border border-dashed border-black' :
          'rounded-lg shadow-2xl border border-gray-200'
        }`}
        onKeyDown={handleKeyDown}
      >
        {/* Search Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects by keyword, category, client, or tag..."
              className={`w-full text-base sm:text-lg font-normal text-gray-900 placeholder:text-gray-400 bg-transparent outline-none pr-10 ${
                lens === 'editorial' ? 'font-serif' : lens === 'brutalist' ? 'font-mono uppercase' : 'font-sans'
              }`}
            />
            {query ? (
              <button 
                onClick={() => setQuery('')}
                className="text-xs font-mono text-gray-400 hover:text-black"
              >
                Clear
              </button>
            ) : (
              <kbd className={`hidden sm:inline-block px-1.5 py-0.5 border border-gray-200 text-[10px] text-gray-400 font-mono ${
                lens === 'swiss' || lens === 'brutalist' ? 'rounded-none' : 'rounded'
              }`}>
                ESC
              </kbd>
            )}
          </div>

          {/* Quick Filter Categories */}
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-100">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-mono px-2 py-0.5 transition-colors ${
                    lens === 'swiss' || lens === 'brutalist' ? 'rounded-none' : 'rounded'
                  } ${
                    active
                      ? 'bg-[var(--highlight-color)] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-gray-100 max-h-96">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-gray-400 font-mono text-xs">
              No matching projects found for "{query}".
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectProject(item);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-md cursor-pointer transition-colors duration-150 flex items-start justify-between gap-4 ${
                    isSelected ? 'bg-[var(--highlight-color-100)]' : 'hover:bg-gray-50'
                  }`}
                >
                  <div>
                    <h5 className="font-sans text-[15px] font-medium text-[var(--color-headline)]">
                      {item.title}
                    </h5>
                    <p className="text-xs text-gray-500 font-sans line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-mono px-1 py-0.5 bg-white border border-gray-200 text-gray-600 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="font-mono text-xs text-[var(--color-font-soft)] block">
                      {item.year}
                    </span>
                    <span className="font-mono text-[11px] text-[var(--highlight-color)] block uppercase">
                      {item.type}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Search Modal Footer */}
        <div className="p-2.5 px-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-[11px] font-mono text-gray-400">
          <span>{filtered.length} project{filtered.length === 1 ? '' : 's'} indexed</span>
          <div className="flex items-center gap-3">
            <span>↑↓ navigate</span>
            <span>↵ select</span>
            <span>esc close</span>
          </div>
        </div>
      </div>
    </div>
  );
};
