'use client';
import React from 'react';
import { Project } from '@/types';
import { useLens } from '@/context/LensContext';

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onSelect }) => {
  const { lens } = useLens();

  // Render bespoke schematic SVG representations according to project diagram type
  const renderDiagram = () => {
    switch (project.imagePlaceholder.svgDiagramType) {
      case 'system': // IRIS SaaS Platform
        return (
          <svg viewBox="0 0 600 380" className="w-full h-full bg-[#f8fafc] text-slate-800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="380" fill="#f8fafc"/>
            <rect x="20" y="20" width="560" height="340" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1"/>
            {/* Top Toolbar */}
            <line x1="20" y1="56" x2="580" y2="56" stroke="#e2e8f0" strokeWidth="1"/>
            <circle cx="38" cy="38" r="4" fill="#ef4444"/>
            <circle cx="54" cy="38" r="4" fill="#f59e0b"/>
            <circle cx="70" cy="38" r="4" fill="#10b981"/>
            <rect x="94" y="32" width="160" height="14" rx="2" fill="#f1f5f9"/>
            <text x="100" y="42" fontFamily="monospace" fontSize="8" fill="#64748b">IRIS // INVENTORY_DISPATCH</text>
            
            {/* Left sidebar nav */}
            <rect x="20" y="56" width="130" height="304" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
            <rect x="32" y="74" width="106" height="16" rx="2" fill="#e2e8f0"/>
            <rect x="32" y="98" width="80" height="10" rx="2" fill="#cbd5e1"/>
            <rect x="32" y="116" width="90" height="10" rx="2" fill="#cbd5e1"/>
            <rect x="32" y="134" width="70" height="10" rx="2" fill="#cbd5e1"/>

            {/* Metric cards */}
            <rect x="166" y="74" width="125" height="56" rx="3" fill="#ffffff" stroke="#e2e8f0"/>
            <text x="176" y="92" fontFamily="monospace" fontSize="9" fill="#64748b">STOCK UNITS</text>
            <text x="176" y="114" fontFamily="sans-serif" fontSize="18" fontWeight="600" fill="#0f172a">14,892</text>

            <rect x="303" y="74" width="125" height="56" rx="3" fill="#ffffff" stroke="#e2e8f0"/>
            <text x="313" y="92" fontFamily="monospace" fontSize="9" fill="#64748b">DISPATCH QUEUE</text>
            <text x="313" y="114" fontFamily="sans-serif" fontSize="18" fontWeight="600" fill="#0f172a">142 PKGS</text>

            <rect x="440" y="74" width="125" height="56" rx="3" fill="#ffffff" stroke="#e2e8f0"/>
            <text x="450" y="92" fontFamily="monospace" fontSize="9" fill="#64748b">SYSTEM LATENCY</text>
            <text x="450" y="114" fontFamily="sans-serif" fontSize="18" fontWeight="600" fill="#0f172a">18 MS</text>

            {/* Inventory Data Table */}
            <rect x="166" y="146" width="399" height="194" rx="3" fill="#ffffff" stroke="#e2e8f0"/>
            <line x1="166" y1="172" x2="565" y2="172" stroke="#f1f5f9" strokeWidth="1"/>
            <line x1="166" y1="202" x2="565" y2="202" stroke="#f1f5f9" strokeWidth="1"/>
            <line x1="166" y1="232" x2="565" y2="232" stroke="#f1f5f9" strokeWidth="1"/>
            <line x1="166" y1="262" x2="565" y2="262" stroke="#f1f5f9" strokeWidth="1"/>
            <line x1="166" y1="292" x2="565" y2="292" stroke="#f1f5f9" strokeWidth="1"/>

            <text x="180" y="163" fontFamily="monospace" fontSize="8" fill="#94a3b8">PART NO.</text>
            <text x="270" y="163" fontFamily="monospace" fontSize="8" fill="#94a3b8">ASSET DESCR</text>
            <text x="390" y="163" fontFamily="monospace" fontSize="8" fill="#94a3b8">ROLE PERMISSION</text>
            <text x="495" y="163" fontFamily="monospace" fontSize="8" fill="#94a3b8">STATUS</text>

            <text x="180" y="191" fontFamily="monospace" fontSize="9" fill="#1e293b">SKU-7729</text>
            <text x="270" y="191" fontFamily="sans-serif" fontSize="9" fill="#1e293b">Flight Telemetry Unit</text>
            <text x="390" y="191" fontFamily="monospace" fontSize="8" fill="#475569">TIER 01 / OPS</text>
            <rect x="495" y="181" width="54" height="14" rx="2" fill="#dcfce7"/>
            <text x="502" y="191" fontFamily="monospace" fontSize="8" fill="#166534">VERIFIED</text>
          </svg>
        );

      case 'map': // Zoo Navigation System
        return (
          <svg viewBox="0 0 600 380" className="w-full h-full bg-[#f8fafc]" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="380" fill="#f8fafc"/>
            <g stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4">
              <line x1="40" y1="0" x2="40" y2="380"/>
              <line x1="160" y1="0" x2="160" y2="380"/>
              <line x1="280" y1="0" x2="280" y2="380"/>
              <line x1="400" y1="0" x2="400" y2="380"/>
              <line x1="520" y1="0" x2="520" y2="380"/>
              <line x1="0" y1="80" x2="600" y2="80"/>
              <line x1="0" y1="180" x2="600" y2="180"/>
              <line x1="0" y1="280" x2="600" y2="280"/>
            </g>
            {/* Curving topographical trail paths */}
            <path d="M 60 320 C 140 280, 220 310, 300 240 C 380 170, 420 190, 520 100" stroke="#334155" strokeWidth="3" fill="none"/>
            <path d="M 120 340 C 200 260, 240 180, 360 140 C 440 110, 480 80, 540 60" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 4" fill="none"/>
            {/* Wayfinding Nodes */}
            <circle cx="140" cy="280" r="14" fill="#ffffff" stroke="#0f172a" strokeWidth="2"/>
            <text x="140" y="284" fontFamily="monospace" fontSize="9" textAnchor="middle" fill="#0f172a" fontWeight="bold">01</text>
            <circle cx="300" cy="240" r="14" fill="#ffffff" stroke="#0f172a" strokeWidth="2"/>
            <text x="300" y="244" fontFamily="monospace" fontSize="9" textAnchor="middle" fill="#0f172a" fontWeight="bold">02</text>
            <circle cx="420" cy="180" r="14" fill="#ffffff" stroke="#0f172a" strokeWidth="2"/>
            <text x="420" y="184" fontFamily="monospace" fontSize="9" textAnchor="middle" fill="#0f172a" fontWeight="bold">03</text>
            <circle cx="520" cy="100" r="14" fill="#ffffff" stroke="#0f172a" strokeWidth="2"/>
            <text x="520" y="104" fontFamily="monospace" fontSize="9" textAnchor="middle" fill="#0f172a" fontWeight="bold">04</text>
            {/* Labels */}
            <rect x="325" y="228" width="110" height="22" rx="2" fill="#ffffff" stroke="#e2e8f0"/>
            <text x="333" y="242" fontFamily="sans-serif" fontSize="9" fill="#0f172a" fontWeight="500">SAVANNAH SECTOR</text>
          </svg>
        );

      case 'matrix': // IIT Indore Ethnography Visualizer
        return (
          <svg viewBox="0 0 600 380" className="w-full h-full bg-[#f8fafc]" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="380" fill="#f8fafc"/>
            <text x="40" y="46" fontFamily="monospace" fontSize="10" fill="#64748b" fontWeight="600">
              IIT INDORE // 28 ETHNOGRAPHY TYPOLOGIES × 73 DISCIPLINES
            </text>
            {/* Matrix grid cells */}
            {Array.from({ length: 12 }).map((_, r) =>
              Array.from({ length: 18 }).map((_, c) => {
                const opacity = ((r * 7 + c * 13) % 10) / 10;
                return (
                  <rect
                    key={`${r}-${c}`}
                    x={40 + c * 28}
                    y={66 + r * 22}
                    width={22}
                    height={16}
                    rx={2}
                    fill={opacity > 0.4 ? '#334155' : '#cbd5e1'}
                    opacity={Math.max(0.15, opacity)}
                  />
                );
              })
            )}
            <line x1="40" y1="340" x2="540" y2="340" stroke="#cbd5e1" strokeWidth="1"/>
            <text x="40" y="360" fontFamily="monospace" fontSize="9" fill="#64748b">
              CROSS-DISCIPLINARY CO-OCCURRENCE INDEX [NORMALIZED]
            </text>
          </svg>
        );

      case 'chart': // Academic Research & GenAI
        return (
          <svg viewBox="0 0 600 380" className="w-full h-full bg-[#f8fafc]" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="380" fill="#f8fafc"/>
            <rect x="40" y="30" width="130" height="80" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1"/>
            <text x="50" y="52" fontFamily="monospace" fontSize="8" fill="#64748b">STAGE 01</text>
            <text x="50" y="70" fontFamily="sans-serif" fontSize="11" fontWeight="600" fill="#0f172a">Archival Survey</text>
            <text x="50" y="86" fontFamily="sans-serif" fontSize="9" fill="#475569">Photogrammetry &amp; Field</text>

            <line x1="170" y1="70" x2="230" y2="70" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3"/>

            <rect x="230" y="30" width="140" height="80" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1"/>
            <text x="240" y="52" fontFamily="monospace" fontSize="8" fill="#64748b">STAGE 02</text>
            <text x="240" y="70" fontFamily="sans-serif" fontSize="11" fontWeight="600" fill="#0f172a">Diffusion Synthesis</text>
            <text x="240" y="86" fontFamily="sans-serif" fontSize="9" fill="#475569">Spatial Latent Guidance</text>

            <line x1="370" y1="70" x2="430" y2="70" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3"/>

            <rect x="430" y="30" width="130" height="80" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1"/>
            <text x="440" y="52" fontFamily="monospace" fontSize="8" fill="#64748b">STAGE 03</text>
            <text x="440" y="70" fontFamily="sans-serif" fontSize="11" fontWeight="600" fill="#0f172a">IIT Delhi Showcase</text>
            <text x="440" y="86" fontFamily="sans-serif" fontSize="9" fill="#475569">Aarohan Presentation</text>

            {/* Lower comparison charts */}
            <rect x="40" y="140" width="520" height="190" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1"/>
            <text x="56" y="165" fontFamily="monospace" fontSize="9" fill="#64748b">MODEL ERROR CONVERGENCE VS HUMAN EXPERT FIDELITY</text>
            <path d="M 60 300 Q 200 290 320 200 T 530 180" stroke="#2563eb" strokeWidth="2" fill="none"/>
            <path d="M 60 310 Q 220 270 340 240 T 530 210" stroke="#f97316" strokeWidth="2" strokeDasharray="4 4" fill="none"/>
          </svg>
        );

      case 'wireframe': // NewSpace Drone Interface
        return (
          <svg viewBox="0 0 600 380" className="w-full h-full bg-[#0f172a]" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="380" fill="#0f172a"/>
            <circle cx="300" cy="190" r="120" stroke="#334155" strokeWidth="1" strokeDasharray="4 4"/>
            <circle cx="300" cy="190" r="70" stroke="#334155" strokeWidth="1"/>
            <line x1="300" y1="50" x2="300" y2="330" stroke="#1e293b" strokeWidth="1"/>
            <line x1="160" y1="190" x2="440" y2="190" stroke="#1e293b" strokeWidth="1"/>

            {/* Flight horizon line */}
            <line x1="220" y1="180" x2="380" y2="180" stroke="#38bdf8" strokeWidth="2"/>
            <circle cx="300" cy="180" r="4" fill="#38bdf8"/>

            {/* Telemetry badges */}
            <rect x="30" y="30" width="130" height="40" rx="2" fill="#1e293b"/>
            <text x="40" y="46" fontFamily="monospace" fontSize="8" fill="#94a3b8">ALTITUDE MSL</text>
            <text x="40" y="62" fontFamily="monospace" fontSize="13" fontWeight="bold" fill="#f8fafc">1,420 M</text>

            <rect x="440" y="30" width="130" height="40" rx="2" fill="#1e293b"/>
            <text x="450" y="46" fontFamily="monospace" fontSize="8" fill="#94a3b8">AIRSPEED</text>
            <text x="450" y="62" fontFamily="monospace" fontSize="13" fontWeight="bold" fill="#f8fafc">68 KTS</text>

            <rect x="30" y="310" width="130" height="40" rx="2" fill="#1e293b"/>
            <text x="40" y="326" fontFamily="monospace" fontSize="8" fill="#94a3b8">BATTERY LINK</text>
            <text x="40" y="342" fontFamily="monospace" fontSize="13" fontWeight="bold" fill="#4ade80">94.2%</text>
          </svg>
        );

      default: // Cultural Hampi field research
        return (
          <svg viewBox="0 0 600 380" className="w-full h-full bg-[#f8fafc]" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="380" fill="#f8fafc"/>
            <rect x="40" y="40" width="520" height="300" stroke="#cbd5e1" strokeWidth="1"/>
            <line x1="40" y1="190" x2="560" y2="190" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4"/>
            <line x1="300" y1="40" x2="300" y2="340" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4"/>
            {/* Monument Silhouette */}
            <path d="M 120 300 L 120 220 L 160 220 L 160 160 L 220 160 L 220 100 L 300 60 L 380 100 L 380 160 L 440 160 L 440 220 L 480 220 L 480 300 Z" stroke="#334155" strokeWidth="1.5" fill="#f1f5f9"/>
            <text x="300" y="270" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#475569" fontWeight="600">
              HAMPI SPATIAL GEOMETRY &amp; ICONOGRAPHY TAXONOMY
            </text>
          </svg>
        );
    }
  };

  // Determine card outer class per lens
  let articleClass = 'group cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--highlight-color)] transition-all duration-300 ';
  if (lens === 'swiss') {
    articleClass += 'rounded-none border border-white/30 p-2.5 bg-white/5';
  } else if (lens === 'brutalist') {
    articleClass += 'rounded-none border-2 border-white p-2.5 bg-black shadow-[4px_4px_0px_white] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_white]';
  } else if (lens === 'editorial') {
    articleClass += 'rounded-none border-b border-white/20 pb-5';
  } else if (lens === 'maximalist') {
    articleClass += 'rounded-lg border-2 border-white p-2.5 bg-white/10 shadow-[5px_5px_0px_rgba(255,255,255,0.35)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_rgba(255,255,255,0.55)]';
  } else if (lens === 'experimental') {
    articleClass += 'rounded-none border border-dashed border-white/40 p-2 relative bg-black/20';
  }

  return (
    <article
      tabIndex={0}
      onClick={() => onSelect(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(project);
        }
      }}
      className={articleClass}
    >
      {/* Experimental Lens corner crosshair decoration */}
      {lens === 'experimental' && (
        <span className="absolute top-1 right-1.5 font-mono text-[10px] text-white/50 pointer-events-none select-none">
          +
        </span>
      )}

      {/* Visual Container with Grayscale-to-Color & Screen Blend Overlay */}
      <div className={`relative overflow-hidden bg-gray-100 aspect-[16/10] border border-gray-200 ${
        lens === 'swiss' || lens === 'brutalist' || lens === 'experimental' || lens === 'minimal' ? 'rounded-none' : 'rounded'
      }`}>
        <div className="w-full h-full filter grayscale contrast-125 transition-all duration-500 group-hover:grayscale-0 group-hover:contrast-100">
          {renderDiagram()}
        </div>

        {/* Highlight screen overlay with color dissolve on hover */}
        <div className="absolute inset-0 bg-[var(--highlight-color)] mix-blend-screen opacity-100 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none" />

        {/* Year tag indicator in corner */}
        <div className={`absolute top-2 right-2 text-[10px] font-mono tracking-wider ${
          lens === 'swiss' ? 'bg-white text-black font-bold px-1.5 py-0.5 rounded-none' :
          lens === 'brutalist' ? 'bg-black text-white border border-white px-1.5 py-0.5 rounded-none shadow-[1px_1px_0px_white]' :
          lens === 'experimental' ? 'bg-black/90 text-white border border-dashed border-white/40 px-1.5 py-0.5 rounded-none' :
          'bg-black/60 text-white px-1.5 py-0.5 rounded shadow-sm backdrop-blur-xs'
        }`}>
          {project.year}
        </div>
      </div>

      {/* Project Metadata */}
      <div className="mt-3.5 space-y-1">
        <div className="flex items-baseline justify-between gap-2">
          <h4 className={`leading-snug flex items-center gap-1.5 transition-colors ${
            lens === 'editorial' ? 'font-serif text-[18px] italic font-normal text-white group-hover:text-white/80' :
            lens === 'brutalist' ? 'font-mono text-[15px] font-bold uppercase text-white' :
            lens === 'swiss' ? 'font-sans text-[15px] font-bold uppercase tracking-tight text-white' :
            lens === 'experimental' ? 'font-mono text-[15px] font-medium text-white' :
            'font-sans text-[16px] font-medium text-white group-hover:text-white/80'
          }`}>
            <span>{project.title}</span>
            <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity font-mono text-white">
              {lens === 'brutalist' ? '-->' : '↗'}
            </span>
          </h4>
          <span className="font-mono text-xs text-white/60 flex-shrink-0">
            {project.type}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-white/70 font-mono">
          <span>{project.category}</span>
          <span>{project.clientOrOrg}</span>
        </div>

        {/* Tag pills */}
        <div className="pt-1.5 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className={`transition-colors ${
                lens === 'swiss' ? 'text-[10px] font-sans uppercase font-bold px-1.5 py-0.5 rounded-none border border-white/30 text-white bg-white/5' :
                lens === 'brutalist' ? 'text-[10px] font-mono uppercase font-bold px-1.5 py-0.5 rounded-none border border-white bg-white text-black' :
                lens === 'editorial' ? 'text-[11px] font-serif italic text-white/70 px-0' :
                lens === 'maximalist' ? 'text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/30' :
                lens === 'experimental' ? 'text-[10px] font-mono px-1.5 py-0.2 border border-dashed border-white/30 rounded-none text-white/80' :
                'text-[11px] font-mono px-1.5 py-0.5 bg-white/10 text-white/90 rounded border border-white/15 group-hover:bg-white/20'
              }`}
            >
              {lens === 'experimental' ? `#${tag.toLowerCase()}` : tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};