import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'iris-saas',
    slug: 'iris-saas-platform',
    title: 'IRIS — SaaS Inventory Platform',
    year: '2026',
    dateRange: '2025/11 → 2026/04',
    category: 'Product Design',
    type: 'client',
    clientOrOrg: 'Autonomous Systems Company',
    role: 'UI/UX & Product Designer',
    location: 'Bengaluru, IN',
    description: 'End-to-end UI/UX and product architecture for an enterprise inventory tracking platform with multi-tiered operational roles.',
    tags: ['Product Design', 'UI/UX', 'Design Systems', 'Enterprise SaaS', 'Figma'],
    overview: [
      'Designed the complete interface and interaction models for IRIS, an enterprise SaaS platform managing hardware inventory, tracking transit logistics, and orchestrating equipment dispatch for autonomous systems operations.',
      'The platform addresses friction in high-velocity warehouse and field logistics by replacing fragmented legacy spreadsheets with a unified, permission-tailored digital workspace.'
    ],
    keyContributions: [
      'Engineered role-tailored dashboard states for distinct permission tiers: warehouse floor operatives, procurement leads, and system administrators.',
      'Mapped comprehensive end-to-end inventory workflows from automated replenishment triggers to real-time asset reconciliation.',
      'Constructed a robust Figma design system of modular tokens, data grids, stateful interactive components, and keyboard-accessible inputs.',
      'Ran usability reviews with operational team leads to refine task completion velocity and error-prevention guards.'
    ],
    methodology: [
      'Contextual Workflow Mapping: Traced physical item movement and barcode scanning bottlenecks against existing software input steps.',
      'Permission & Information Architecture: Built a matrix of operational access tiers ensuring minimal visual noise for floor technicians while maintaining complete audit trails for admins.',
      'High-Fidelity Component Library: Defined consistent typography, interactive hover/active states, and accessible WCAG-compliant contrast ratios.'
    ],
    outcomes: [
      'Created a production-ready Figma component library scalable across desktop operations consoles and tablet handhelds.',
      'Cut routine stock audit time in simulated user testing by providing instant glanceability and batch action workflows.',
      'Supplied engineers with comprehensive interactive prototypes, responsive layout guidelines, and token specifications for zero-ambiguity handoff.'
    ],
    imagePlaceholder: {
      aspectRatio: '16/9',
      caption: 'IRIS — Multi-tenant inventory control architecture & permission-scoped dashboard',
      svgDiagramType: 'system'
    }
  },
  {
    id: 'zoo-navigation',
    slug: 'zoo-navigation-system',
    title: 'Zoo Navigation & Wayfinding System',
    year: '2026',
    dateRange: '2025/10 → 2026/03',
    category: 'Wayfinding',
    type: 'client',
    clientOrOrg: 'Zoo Authority of Karnataka',
    role: 'UX & Wayfinding Designer',
    location: 'Shivamogga, IN',
    description: 'Digital wayfinding and physical information architecture designed to simplify pedestrian orientation across a 100+ acre conservation reserve.',
    tags: ['Wayfinding', 'Information Architecture', 'Public UX', 'Accessibility', 'Field Research'],
    overview: [
      'Developed a comprehensive pedestrian orientation and digital wayfinding system for the Zoo Authority of Karnataka across their Tyavarekoppa wildlife and safari reserve in Shivamogga.',
      'The project combined field observation, behavioral shadowing, and cognitive mapping to resolve critical navigational pain points encountered by diverse visitor groups across sprawling terrain.'
    ],
    keyContributions: [
      'Conducted on-site visitor observation and route shadowing to identify high-congestion intersection points, missing decision cues, and accessibility barriers.',
      'Formulated a map-centric information architecture that replaces confusing geographical distortion with landmark-based mental anchors.',
      'Engineered an environmental color-zoning taxonomy and high-legibility sign hierarchy readable in harsh sunlight and across pedestrian viewing distances.',
      'Authored wayfinding guidelines detailing physical sign placement geometry, multilingual text priorities, and tactile accessibility standards.'
    ],
    methodology: [
      'Pedestrian Shadowing & Behavioral Mapping: Tracked 30+ family and student visiting groups to log hesitation intervals at trail splits.',
      'Spatial Landmark Identification: Identified prominent physical anchors (aviary domes, rest pavilions, safari embarkation zones) as wayfinding milestones.',
      'Contrast & Legibility Testing: Evaluated typography scale, symbol recognition, and outdoor lighting readability across various times of day.'
    ],
    outcomes: [
      'Delivered full wayfinding framework featuring zoned cartography, pedestrian route nodes, and modular sign specifications.',
      'Significantly reduced visitor backtracking and disorientation during preliminary evaluation sessions.',
      'Established an accessible, intuitive public interface standard ready for physical deployment and companion mobile digital access.'
    ],
    imagePlaceholder: {
      aspectRatio: '16/9',
      caption: 'Zoo Authority of Karnataka — Spatial navigation nodes & environmental wayfinding system',
      svgDiagramType: 'map'
    }
  },
  {
    id: 'academic-research',
    slug: 'generative-ai-fintech-ux-research',
    title: 'Research Publications — GenAI & FinTech UX',
    year: '2026',
    dateRange: '2025/08 → ongoing',
    category: 'Research',
    type: 'research',
    clientOrOrg: 'Faculty-Mentored Academic Research',
    role: 'Co-Author & Design Researcher',
    location: 'Bengaluru / New Delhi, IN',
    description: 'Co-authoring three academic research papers spanning AI-assisted heritage reconstruction and behavioral UX friction in digital payment systems.',
    tags: ['Research', 'Generative AI', 'FinTech UX', 'Heritage Reconstruction', 'Information Design'],
    overview: [
      'Engaged in rigorous academic scholarship co-authoring three faculty-mentored research papers exploring the application of generative artificial intelligence to cultural preservation and behavioral human-computer interaction in financial technologies.',
      'Research on AI-assisted architectural heritage reconstruction was selected for presentation at Aarohan, IIT Delhi\'s National Research Paper Showcase.'
    ],
    keyContributions: [
      'Lead student author for AI-assisted heritage reconstruction paper presented at Aarohan, IIT Delhi National Research Paper Showcase.',
      'Co-authoring two papers investigating generative diffusion models and spatial prompt engineering for reconstructing damaged architectural heritage.',
      'Co-authoring a third paper examining cognitive trust factors, sensory feedback, and behavioral UX friction in Indian UPI digital payment interfaces.',
      'Synthesized quantitative user testing data and authored academic visual documentation, comparative diagrams, and methodological flowcharts.'
    ],
    methodology: [
      'Iterative Architectural Synthesis: Coupled archival photographic records and stone carving taxonomies with fine-tuned diffusion models to visualize lost monument details.',
      'Behavioral Interaction Analysis: Conducted cognitive walkthroughs and heuristic audits of digital payment flows across demographic cohorts.',
      'Academic Visual Documentation: Formatted complex algorithmic pipelines into legible, publication-grade academic figures.'
    ],
    outcomes: [
      'Selected for presentation at Aarohan, IIT Delhi\'s premier National Research Paper Showcase under faculty guidance.',
      'Formulated reproducible frameworks for evaluating ethical fidelity in generative AI architectural restoration.',
      'Generated actionable UX heuristics for reducing cognitive load and error anxiety in peer-to-peer and merchant payment interfaces.'
    ],
    imagePlaceholder: {
      aspectRatio: '16/9',
      caption: 'Aarohan IIT Delhi — Generative AI architectural reconstruction methodology & publication pipeline',
      svgDiagramType: 'chart'
    }
  },
  {
    id: 'iit-indore-viz',
    slug: 'iit-indore-ethnography-platform',
    title: 'Data Visualization & Ethnography Platform',
    year: '2026',
    dateRange: '2026/04 → 2026/07',
    category: 'Information Visualization',
    type: 'client',
    clientOrOrg: 'IIT Indore',
    role: 'Data Visualization & UX Collaborator',
    location: 'Indore, IN',
    description: 'Interactive dashboard and information architecture translating complex multi-variable academic research spanning 28 ethnography types across 73 disciplines.',
    tags: ['Information Visualization', 'Data Graphics', 'Dashboard UX', 'IIT Indore', 'Ethnography'],
    overview: [
      'Collaborated with a cross-disciplinary academic research team at IIT Indore to design an interactive data visualization platform and taxonomy for ethnographic research methodology.',
      'The platform transforms an extensive dataset covering 28 ethnography types across 73 academic disciplines into intuitive visual narratives accessible to both researchers and non-technical stakeholders.'
    ],
    keyContributions: [
      'Structured a multidimensional research classification database systematically categorizing 28 ethnography types across 73 distinct academic disciplines.',
      'Built an interactive HTML/JavaScript dashboard prototype featuring six custom chart types designed for multi-variable research exploration.',
      'Authored a comprehensive information architecture document defining relational data models, navigation logic, and interactive filter states.',
      'Engineered typographic hierarchies and color-safe data encoding palettes ensuring analytical legibility during prolonged screen sessions.'
    ],
    methodology: [
      'Taxonomic Matrix Structuring: Organized complex qualitative methodologies into hierarchical ontology categories based on field methods and disciplinary origins.',
      'Multi-Variable Visual Encoding: Developed coordinate plots, sankey-style relationship ribbons, and heat-matrix representations for cross-disciplinary querying.',
      'Cognitive Walkthroughs: Evaluated dashboard interaction patterns with university faculty to ensure intuitive exploration without analytical disorientation.'
    ],
    outcomes: [
      'Delivered fully functional interactive HTML/JS dashboard prototype with 6 distinct explorable visualization modules.',
      'Created standard information architecture documentation establishing permanent reference for future academic development.',
      'Enabled cross-disciplinary research teams to identify methodological intersections previously obscured in flat literature.'
    ],
    imagePlaceholder: {
      aspectRatio: '16/9',
      caption: 'IIT Indore — Relational matrix visualizer spanning 28 ethnography types across 73 disciplines',
      svgDiagramType: 'matrix'
    }
  },
  {
    id: 'newspace-ground-control',
    slug: 'newspace-drone-ground-control',
    title: 'Autonomous Drone Interface & Flight Workflows',
    year: '2026',
    dateRange: '2025/10 → 2026/04',
    category: 'Product Design',
    type: 'client',
    clientOrOrg: 'NewSpace Research and Technologies',
    role: 'UI/UX Design Intern',
    location: 'Bengaluru, IN',
    description: 'Wireframing, interactive prototyping, and design system component standards for mission-critical unmanned aerial system workflows.',
    tags: ['Product Design', 'UI/UX', 'Design Systems', 'Autonomous Systems', 'Figma'],
    overview: [
      'Contributed as a UI/UX design intern at NewSpace Research & Technologies, focusing on human-machine interface design for autonomous drone systems and ground control software.',
      'Translated dense operational telemetric requirements into clear, distraction-free interface solutions capable of supporting high-stress mission operations.'
    ],
    keyContributions: [
      'Designed wireframes and interactive high-fidelity Figma prototypes for core mission planning and real-time telemetry flows.',
      'Collaborated directly with aerospace and software engineering teams to refine interaction patterns across mission waypoints and flight status indicators.',
      'Applied rigorous usability principles to streamline critical user journeys, reducing cognitive friction during high-frequency tasks.',
      'Executed iterative design review cycles and maintained systematic component states ahead of formal engineering implementation.'
    ],
    methodology: [
      'Telemetry Data Audits: Identified highest-priority flight metrics requiring instant glanceability versus secondary engineering diagnostics.',
      'Dark-Mode Cockpit Interface Design: Engineered low-glare, high-contrast visual tokens engineered specifically for variable field and console lighting.',
      'Figma Variable & Component Tokens: Implemented robust component property architectures for fast prototyping and clean developer handoff.'
    ],
    outcomes: [
      'Standardized key interaction patterns across multiple mission management views.',
      'Strengthened component visual consistency and token reuse across the internal product design system.',
      'Reduced prototype iteration cycle time through modular design component architecture.'
    ],
    imagePlaceholder: {
      aspectRatio: '16/9',
      caption: 'NewSpace Research & Technologies — Telemetry control architecture and flight parameter dashboard',
      svgDiagramType: 'wireframe'
    }
  },
  {
    id: 'cultural-narratives-hampi',
    slug: 'cultural-narratives-hampi',
    title: 'Spatial Heritage & Cultural Field Documentation',
    year: '2025',
    dateRange: '2024/09 → 2025/04',
    category: 'Communication Design',
    type: 'university',
    clientOrOrg: 'School of Design, Media & Creative Arts',
    role: 'Design Researcher & Visualizer',
    location: 'Hampi / Bengaluru, IN',
    description: 'Field research, visual ethnography, and spatial mapping of architectural geometry and stone relief iconography in historic Hampi.',
    tags: ['Communication Design', 'Visual Ethnography', 'Spatial Mapping', 'Cultural Heritage', 'Documentation'],
    overview: [
      'Conducted extensive field-based visual ethnography and spatial analysis investigating the architectural morphology, stone carving iconography, and pedestrian circulation systems across Hampi.',
      'This research formed the essential empirical foundation that later fed directly into the ongoing AI-assisted heritage reconstruction studies presented at IIT Delhi.'
    ],
    keyContributions: [
      'Executed on-site observational studies documenting spatial progression, temple courtyards, and light filtration across historical monuments.',
      'Synthesized hundreds of architectural stone relief photographs into a structured visual taxonomy of carving motifs and structural columns.',
      'Created comparative spatial diagrams illustrating human movement dynamics through historical civic and sacred spaces.',
      'Produced editorial visual publications articulating the intersection of cultural narrative, material craft, and historical memory.'
    ],
    methodology: [
      'Field Sketching & Spatial Notation: Recorded real-time volume dimensions, material decay patterns, and sightlines on location.',
      'Iconographic Cataloging: Categorized 100+ stone reliefs based on mythological narratives, geometrical symmetry, and sculptural depth.',
      'Visual Narrative Synthesis: Combined archival historical research with modern graphic layouts to communicate heritage insights.'
    ],
    outcomes: [
      'Created a comprehensive visual archive of historical Vijayanagara architectural forms.',
      'Supplied the baseline training dataset and structural constraints utilized in faculty-mentored generative AI heritage papers.',
      'Exhibited visual documentation within academic institutional research reviews.'
    ],
    imagePlaceholder: {
      aspectRatio: '16/9',
      caption: 'Hampi Heritage Documentation — Spatial proportion studies & stone carving morphological taxonomy',
      svgDiagramType: 'flow'
    }
  }
];