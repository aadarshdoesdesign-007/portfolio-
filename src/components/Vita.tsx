'use client';
import React from 'react';
import { SectionHeader } from './SectionHeader';
import { vitaSections } from '@/content/vita';
import { useLens } from '@/context/LensContext';

export const Vita: React.FC = () => {
  const { lens } = useLens();

  return (
    <section id="vita" className="py-20 sm:py-28 transition-colors duration-400">
      {/* Section Title */}
      <div className="gridRow">
        <div className="grid_full">
          <SectionHeader number="03" title="Vita" />
        </div>
      </div>

      {/* 3-Column Masonry Resume Layout */}
      <div className="gridRow">
        <div className="grid_full">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-12">
            {vitaSections.map((section, sIdx) => (
              <div
                key={sIdx}
                className="relative pt-6 break-inside-avoid"
              >
                {/* Hairline Rule across column */}
                <div className={`absolute top-0 left-0 right-0 ${
                  lens === 'brutalist' ? 'h-0.5 bg-white' :
                  lens === 'experimental' ? 'h-px border-t border-dashed border-white/40' :
                  'h-px bg-white/25'
                }`} />

                {/* Section Title */}
                <div className={`inline-block pr-3 uppercase tracking-wider text-white font-semibold mb-6 ${
                  lens === 'swiss' ? 'bg-white text-black px-2 py-0.5 font-bold font-sans text-xs' :
                  lens === 'brutalist' ? 'font-mono text-xs font-bold text-white' :
                  lens === 'editorial' ? 'font-serif text-sm italic font-normal text-white/90' :
                  lens === 'experimental' ? 'font-mono text-xs text-white/70' :
                  'font-mono text-xs'
                }`}>
                  {lens === 'brutalist' ? `== ${section.title.toUpperCase()} ==` :
                   lens === 'experimental' ? `NODE_LOG::${section.title.toUpperCase()}` :
                   section.title}
                </div>

                {/* Entries List */}
                <ul className="space-y-6">
                  {section.entries.map((entry) => (
                    <li key={entry.id} className="space-y-1 text-sm">
                      <div className="font-mono text-xs text-white/60 flex items-center justify-between">
                        <span>{entry.date}</span>
                        {entry.location && <span>{entry.location}</span>}
                      </div>

                      <h5 className={`font-medium text-[15px] text-white ${
                        lens === 'editorial' ? 'font-serif text-[16px]' :
                        lens === 'brutalist' ? 'font-mono uppercase font-bold' :
                        'font-sans'
                      }`}>
                        {entry.orgUrl ? (
                          <a
                            href={entry.orgUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white/80 underline decoration-white/30 underline-offset-2 transition-colors"
                          >
                            {entry.organization}
                          </a>
                        ) : (
                          entry.organization
                        )}
                      </h5>

                      <div className="space-y-1 pt-0.5">
                        {entry.positions.map((pos, pIdx) => (
                          <div
                            key={pIdx}
                            className={`relative text-xs text-white/90 ${
                              pos.isCurrent ? 'pl-3.5 font-medium' : ''
                            } ${lens === 'editorial' ? 'font-serif italic' : ''}`}
                          >
                            {pos.isCurrent && (
                              <span className={`absolute left-0 top-1.5 w-2 h-2 ${
                                lens === 'swiss' || lens === 'brutalist' ? 'rounded-none' : 'rounded-full'
                              } bg-white ring-4 ring-white/20`} />
                            )}
                            <div>{pos.title}</div>
                            {pos.date && (
                              <div className="text-[11px] font-mono text-white/50">
                                {pos.date}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {entry.note && (
                        <p className={`text-xs text-white/70 leading-relaxed pt-1 ${
                          lens === 'editorial' ? 'font-serif text-white/80' : 'font-sans'
                        }`}>
                          {entry.note}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

