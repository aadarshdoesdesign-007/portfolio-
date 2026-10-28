export interface Project {
  id: string;
  slug: string;
  title: string;
  shortTitle?: string;
  clientOrOrg: string;
  category: 'Product Design' | 'Data Visualization' | 'Research & AI' | 'Branding' | 'Interaction Design';
  year: string;
  timeline: string;
  role: string;
  cardRole: string;
  cardOutcome: string;
  location: string;
  accentColor: string;
  tagline: string;
  description: string;
  tags: string[];
  overview: string[];
  problem?: string;
  keyContributions: string[];
  methodology: string[];
  outcomes: string[];
  featured?: boolean;
  coverBadge?: string;
  diagramType?: 'matrix' | 'wireframe' | 'chart' | 'system' | 'nudge-llm' | 'katha-brand' | 'wayfinding' | 'speculative' | 'brand' | 'flow';
}

export const projects: Project[] = [
  {
    id: 'iit-indore-viz',
    slug: 'iit-indore-ethnography-platform',
    title: 'IIT Indore — Ethnographic Research & Data Visualisation',
    shortTitle: 'IIT Indore Visualizer',
    clientOrOrg: 'IIT Indore',
    category: 'Data Visualization',
    year: '2026',
    timeline: '04/26 → 07/26',
    role: 'Data Visualization & UX Collaborator',
    cardRole: 'UX and Data Visualisation Design',
    cardOutcome: 'An interactive knowledge platform for exploring ethnographic methods, categories, and relationships.',
    location: 'Indore / Remote, IN',
    accentColor: '#00ADE6',
    tagline: 'Translating complex qualitative methodology across 28 ethnography types and 73 disciplines into an interactive relational dashboard.',
    description: 'Designed interactive data visualizations and an information architecture translating multi-variable academic research across 28 ethnography typologies and 73 academic disciplines.',
    tags: ['Data Visualization', 'Information Architecture', 'Dashboard UX', 'IIT Indore', 'Ethnography'],
    overview: [
      'Collaborated with a cross-disciplinary academic research team at IIT Indore to design an interactive data visualization platform and taxonomy for ethnographic research methodology.',
      'The platform transforms an extensive dataset covering 28 ethnography types across 73 academic disciplines into intuitive visual narratives accessible to both researchers and non-technical stakeholders.'
    ],
    problem: 'Academic researchers from divergent disciplines struggled to identify overlapping qualitative methodologies because taxonomy conventions were siloed in dense, disparate academic papers.',
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
    featured: true,
    coverBadge: 'IIT INDORE // TAXONOMY',
    diagramType: 'matrix'
  },
  {
    id: 'stash-finance',
    slug: 'stash-student-finance-ux',
    title: 'Stash — Student Finance & Financial Recall Gap',
    shortTitle: 'Stash FinTech UX',
    clientOrOrg: 'FinTech UX Research Initiative',
    category: 'Product Design',
    year: '2026',
    timeline: '2025 → 2026',
    role: 'Lead Product Designer & UX Researcher',
    cardRole: 'Product Design & UX Research',
    cardOutcome: 'A student finance concept exploring the financial recall gap and opportunities for better spending awareness.',
    location: 'Bengaluru, IN',
    accentColor: '#FF4BB9',
    tagline: 'Bridging the cognitive gap between digital micro-spending and financial recall for university students.',
    description: 'User research and mobile interface system addressing the cognitive "financial recall gap" in student spending through contextual micro-budgeting and ambient status anchors.',
    tags: ['Product Design', 'FinTech UX', 'Behavioral Economics', 'Mobile App', 'Design Research'],
    overview: [
      'Stash is a mobile personal finance product conceived specifically to address the cognitive friction of frictionless digital payments (UPI) among university students in India.',
      'Research revealed that while instant payments make spending effortless, they drastically impair students\' mental accounting and recall of cumulative daily expenses.'
    ],
    problem: 'Frictionless contactless payments detach consumers from the emotional feedback of physical cash exchange, leading to an 82% discrepancy between perceived and actual monthly expenditures.',
    keyContributions: [
      'Conducted contextual inquiry and payment diaries with 40+ college students tracking digital micro-transactions over 30 days.',
      'Invented an ambient "Pulse Envelope" interface replacing punitive monthly balance trackers with glanceable visual momentum indicators.',
      'Designed frictionless expense categorisation workflows using sensory haptic cues and instant transaction journaling.',
      'Prototyped full high-fidelity mobile application flows in Figma with interactive component state machines.'
    ],
    methodology: [
      'Behavioral Spending Shadowing: Audited daily food, transit, and social UPI payments to identify points of cognitive anxiety.',
      'Mental Model Mapping: Replaced traditional accounting ledger hierarchies with spatial buckets matching student mental categories.',
      'Heuristic Usability Evaluation: Tested with students under campus purchase contexts to measure input completion time.'
    ],
    outcomes: [
      'Reduced average transaction logging time to under 3 seconds in usability benchmarks.',
      'Demonstrated 45% increase in weekly spending awareness during controlled student user trials.',
      'Produced complete design system with reusable mobile component library and design tokens.'
    ],
    featured: true,
    coverBadge: 'FINTECH // BEHAVIORAL UX',
    diagramType: 'wireframe'
  },
  {
    id: 'iterative-archaeology',
    slug: 'iterative-archaeology-hampi-ai',
    title: 'Iterative Archaeology — AI Site Reconstruction at Hampi',
    shortTitle: 'Iterative Archaeology',
    clientOrOrg: 'Aarohan — IIT Delhi National Research Showcase',
    category: 'Research & AI',
    year: '2026',
    timeline: '2025 → 2026',
    role: 'Lead Student Author & Computational Visualizer',
    cardRole: 'Design Research & AI-Assisted Visualisation',
    cardOutcome: 'A constraint-based approach to visualising uncertainty in fragmented cultural heritage reconstruction.',
    location: 'Hampi / New Delhi, IN',
    accentColor: '#FFFF5F',
    tagline: 'Applying generative diffusion models and field photogrammetry to ethically reconstruct lost architectural reliefs at Vijayanagara.',
    description: 'Peer-reviewed academic research coupling archival field documentation of historic Hampi with fine-tuned spatial generative diffusion models for architectural reconstruction.',
    tags: ['Research & AI', 'Generative Diffusion', 'Cultural Heritage', 'IIT Delhi Aarohan', 'Field Documentation'],
    overview: [
      'Peer-reviewed research paper and visual methodology selected for national presentation at Aarohan, IIT Delhi\'s premier National Research Paper Showcase.',
      'Investigates how generative AI models, bounded by rigorous archaeological field measurements and carving morphological taxonomies, can reconstruct fragmented structural ruins without hallucinating inauthentic cultural motifs.'
    ],
    problem: 'Traditional monument restoration relies on either subjective artist illustrations or rigid CAD extrusions that fail to capture organic stone masonry and historical patina.',
    keyContributions: [
      'Documented 100+ stone column carvings across Hampi, creating a morphological database of architectural proportions and relief depths.',
      'Formulated a prompt-guidance pipeline constraining diffusion latent space to historical Dravidian architectural canons.',
      'Presented findings and visual proofs at Aarohan — IIT Delhi before panels of computer science and cultural researchers.',
      'Synthesized the academic visual documentation, comparative fidelity charts, and methodological figures published in the conference proceedings.'
    ],
    methodology: [
      'Field Photogrammetry: Captured multi-angle high-resolution spatial datasets across ruined temple courtyards in Hampi.',
      'Morphological Classification: Indexed stylistic motifs across column bases, capitals, and relief friezes.',
      'Ethical Fidelity Heuristics: Created confidence-interval visualization overlays differentiating verified stone remnants from model-inferred reconstructions.'
    ],
    outcomes: [
      'Selected for podium presentation at Aarohan — IIT Delhi National Showcase.',
      'Established a reproducible framework for cultural heritage institutions evaluating AI restoration tools.',
      'Co-authored 2 subsequent research papers expanding the methodology to endangered spatial sites.'
    ],
    featured: true,
    coverBadge: 'AAROHAN // IIT DELHI',
    diagramType: 'chart'
  },
  {
    id: 'rubbix-robotics',
    slug: 'rubbix-robotics-hmi-cockpit',
    title: 'Rubbix Robotics — Autonomous Systems & Telemetry Cockpit',
    shortTitle: 'Rubbix Robotics HMI',
    clientOrOrg: 'NewSpace Research & Technologies / Rubbix',
    category: 'Product Design',
    year: '2026',
    timeline: '10/25 → 04/26',
    role: 'UI/UX Design Intern',
    cardRole: 'UI/UX and Product Interface Design',
    cardOutcome: 'Interfaces for robotics-related workflows and system information, based on verified project materials.',
    location: 'Bengaluru, IN',
    accentColor: '#90CD26',
    tagline: 'Designing mission-critical ground control interfaces and flight telemetry systems for autonomous drone fleets.',
    description: 'Human-machine interface (HMI) design, real-time mission telemetry visualizers, and robust Figma design system architecture for autonomous aerial and robotic platforms.',
    tags: ['Product Design', 'UI/UX', 'Autonomous Systems', 'HMI', 'Design Systems'],
    overview: [
      'Contributed as a UI/UX design intern at NewSpace Research & Technologies, focusing on human-machine interface design for autonomous drone systems and ground control consoles.',
      'Translated dense operational telemetric requirements into clear, distraction-free interface solutions capable of supporting high-stress mission operations.'
    ],
    problem: 'Field drone operators were inundated with multi-monitor telemetry feeds, causing critical alert blindness during waypoint changes and emergency landing sequences.',
    keyContributions: [
      'Designed wireframes and interactive high-fidelity Figma prototypes for core mission planning and real-time telemetry flows.',
      'Collaborated directly with aerospace and software engineering teams to refine interaction patterns across mission waypoints and flight status indicators.',
      'Applied rigorous usability principles to streamline critical user journeys, reducing cognitive friction during high-frequency tasks.',
      'Maintained systematic component states, tokens, and dark-mode cockpits ahead of formal engineering implementation.'
    ],
    methodology: [
      'Telemetry Data Audits: Prioritized flight metrics requiring instant glanceability (altitude MSL, airspeed, battery link) versus secondary engineering logs.',
      'Low-Glare Cockpit Design: Engineered contrast tokens tested under variable field lighting and harsh sunlight.',
      'Figma Component Architecture: Built scalable component sets with variable modes for rapid mission prototyping.'
    ],
    outcomes: [
      'Standardized key interaction patterns across 12 mission management views.',
      'Strengthened component visual consistency and token reuse across the internal product design system.',
      'Delivered production-ready specifications for software engineering handoff.'
    ],
    featured: true,
    coverBadge: 'AUTONOMOUS HMI // COCKPIT',
    diagramType: 'system'
  },
  {
    id: 'nudge-llm',
    slug: 'nudge-llm-prompt-coaching-interface',
    title: 'Nudge — LLM Interface & Prompt-Coaching Concept',
    shortTitle: 'Nudge LLM Interface',
    clientOrOrg: 'IIIT Pune × IIT Bombay · ACM SIGCHI Hackathon (Runner-Up)',
    category: 'Interaction Design',
    year: '2026',
    timeline: '2026',
    role: 'Lead Interaction & Concept Designer',
    cardRole: 'Interaction Design',
    cardOutcome: 'An LLM interface and prompt-coaching concept (2nd Place ACM SIGCHI hackathon).',
    location: 'Pune / Mumbai, IN',
    accentColor: '#FF6100',
    tagline: 'Reimagining generative AI text boxes into proactive, human-centered cognitive scaffolds.',
    description: 'Award-winning LLM interface awarded 2nd Place Runner-Up at the Human-Centered Design of LLM Interfaces Hackathon (IIIT Pune × IIT Bombay · ACM SIGCHI).',
    tags: ['Interaction Design', 'Generative AI', 'ACM SIGCHI', 'Hackathon 2nd Place', 'LLM UX'],
    overview: [
      'Placed 2nd in the national hackathon organized by IIIT Pune × IIT Bombay and ACM SIGCHI, focused on designing human-centered mental models and interaction paradigms for large language model interfaces.',
      'Nudge replaces the intimidating blank chat prompt box with an adaptive, conversational co-pilot that surfaces implicit assumptions, prompts clarifying constraints, and scaffolds user intent.'
    ],
    problem: 'The blank chat input box creates prompt anxiety and encourages shallow one-shot queries, leading to generic hallucinations and user frustration.',
    keyContributions: [
      'Conceptualized the "Intent Canvas" paradigm: a dual-pane workspace blending prompt formulation with real-time semantic parameter tweaking.',
      'Created micro-interaction models for inline prompt suggestions, ambiguity highlights, and constraint pills.',
      'Prototyped interactive user flows and pitched the solution live to ACM SIGCHI jury members.',
      'Synthesized heuristics for non-intrusive AI suggestions during generative creative writing.'
    ],
    methodology: [
      'Cognitive Walkthrough: Identified breakdown points where users fail to articulate technical parameters to generic models.',
      'Low-Fidelity Paper Prototyping: Tested 4 interaction models for inline prompt assistance with hackathon participants.',
      'High-Fidelity Framer/Figma Prototype: Built stateful interactive walkthroughs demonstrating progressive disclosure.'
    ],
    outcomes: [
      'Awarded 2nd Place / Runner-Up nationally by ACM SIGCHI and academic jury.',
      'Commended for intuitive progressive disclosure of AI system prompts.',
      'Published open-source concept repository and design artifact.'
    ],
    featured: true,
    coverBadge: 'ACM SIGCHI // 2ND PLACE',
    diagramType: 'nudge-llm'
  },
  {
    id: 'katha-studio',
    slug: 'katha-creative-studio-branding',
    title: 'KATHA — Creative Studio Branding & Visual Identity',
    shortTitle: 'KATHA Studio',
    clientOrOrg: 'KATHA Creative Studio',
    category: 'Branding',
    year: '2025',
    timeline: '2025',
    role: 'Brand Identity & Visual Designer',
    cardRole: 'Brand Identity & Digital Experience',
    cardOutcome: 'A creative studio identity and website translating the studio\'s approach into a coherent visual system.',
    location: 'Bengaluru, IN',
    accentColor: '#FF7043',
    tagline: 'Contemporary visual identity celebrating vernacular storytelling through bold typography and tactile printmaking.',
    description: 'Complete brand identity, typography system, digital presence, and packaging design exploring the intersection of modern Indian design and folkloric narrative.',
    tags: ['Branding', 'Visual Identity', 'Typography', 'Packaging', 'Art Direction'],
    overview: [
      'Created the comprehensive visual identity and brand system for KATHA, a multidisciplinary creative studio dedicated to cultural publishing, exhibition design, and contemporary visual storytelling.',
      'The identity balances vibrant vernacular letterforms with clean Swiss grid structures to create an agile visual language spanning digital editorial layouts and physical screen-printed collateral.'
    ],
    problem: 'Cultural studios often fall into either cliched kitsch or sterile minimalist tropes that erase the warmth and dynamism of local narrative heritage.',
    keyContributions: [
      'Designed a custom logotype and variable typographic hierarchy rooted in geometric modularity.',
      'Developed a tactile print and packaging system utilizing recycled unbleached paper stocks and spot fluorescent inks.',
      'Produced digital guidelines, social design templates, and website design tokens.',
      'Curated art direction rules for studio exhibition photography and project documentation.'
    ],
    methodology: [
      'Archival Research: Surveyed early 20th-century Indian print house ephemera and woodblock typography.',
      'Grid & Proportion Studies: Balanced expressive display typography against disciplined multi-column editorial layouts.',
      'Material Experimentation: Screen-printed test proofs with risograph and offset inks to test color vibrancy.'
    ],
    outcomes: [
      'Delivered complete brand book with typographic rules, color codes, and packaging mockups.',
      'Deployed responsive digital studio portfolio and branded social templates.',
      'Client reported 60% increase in inbound commission inquiries within 3 months of launch.'
    ],
    featured: true,
    coverBadge: 'KATHA // BRAND IDENTITY',
    diagramType: 'katha-brand'
  },
  {
    id: 'zoo-navigation',
    slug: 'zoo-navigation-wayfinding-system',
    title: 'Zoo Navigation & Public Wayfinding System',
    shortTitle: 'Zoo Wayfinding',
    clientOrOrg: 'Zoo Authority of Karnataka (Mysore Zoo)',
    category: 'Product Design',
    year: '2026',
    timeline: '10/25 → 03/26',
    role: 'UX & Wayfinding Designer',
    cardRole: 'Wayfinding and Information Architecture',
    cardOutcome: 'Public wayfinding and orientation signage system for Mysore Zoo.',
    location: 'Mysuru / Shivamogga, IN',
    accentColor: '#90CD26',
    tagline: 'Simplifying pedestrian orientation and environmental wayfinding across a sprawling wildlife reserve.',
    description: 'Spatial information architecture, zoned color taxonomies, and companion digital map flows engineered for accessibility across multilingual pedestrian groups.',
    tags: ['Wayfinding', 'Information Architecture', 'Public UX', 'Accessibility', 'Spatial Design'],
    overview: [
      'Developed a comprehensive pedestrian orientation and digital wayfinding system for the Zoo Authority of Karnataka across their wildlife reserve (Mysore Zoo).',
      'The project combined field observation, behavioral shadowing, and cognitive mapping to resolve critical navigational bottlenecks encountered by diverse visitor demographics.'
    ],
    problem: 'Sprawling conservation terrain with confusing fork paths caused severe visitor disorientation, family fatigue, and emergency vehicle bottlenecks.',
    keyContributions: [
      'Conducted on-site visitor observation and route shadowing to identify high-congestion intersection points.',
      'Formulated a map-centric information architecture replacing confusing geographical distortion with landmark-based mental anchors.',
      'Engineered an environmental color-zoning taxonomy readable under direct sunlight across pedestrian viewing distances.',
      'Authored physical wayfinding placement geometry and tactile accessibility guidelines.'
    ],
    methodology: [
      'Pedestrian Shadowing: Tracked 30+ visiting cohorts to log hesitation intervals at un-signed intersections.',
      'Spatial Landmark Identification: Mapped prominent anchors (aviary domes, rest pavilions) as wayfinding milestones.',
      'Multilingual Contrast Testing: Evaluated Kannada and English typography legibility across viewing angles.'
    ],
    outcomes: [
      'Delivered full wayfinding framework featuring zoned cartography and modular sign specifications.',
      'Decreased visitor backtracking and disorientation during preliminary evaluation sessions.',
      'Supplied public agency with deployment-ready blueprint for site-wide implementation.'
    ],
    featured: true,
    coverBadge: 'PUBLIC UX // WAYFINDING',
    diagramType: 'wayfinding'
  },
  {
    id: 'slanted-future-bingo',
    slug: 'future-bingo-speculative-posters',
    title: 'Visions of the Future — Speculative Print & Posters',
    shortTitle: 'Future Bingo',
    clientOrOrg: 'Slanted Publishers',
    category: 'Branding',
    year: '2025',
    timeline: '2025',
    role: 'Visual Designer & Printmaker',
    cardRole: 'Editorial and Typography Design',
    cardOutcome: 'Poster and editorial contribution exploring future speculative systems.',
    location: 'Bengaluru / Germany',
    accentColor: '#FF4BB9',
    tagline: 'Speculative posters and graphic systems interrogating automated futures and human quirks.',
    description: 'Series of speculative posters and printmaking graphics selected for international publication exploring automated futures, human rituals, and visual irony.',
    tags: ['Printmaking', 'Poster Design', 'Typography', 'Speculative Design', 'Slanted Publishers'],
    overview: [
      'A series of speculative visual prints and posters exploring human idiosyncrasies in an increasingly algorithmic society, selected for feature by international design publication Slanted Publishers.',
      'Draws inspiration from game boards, everyday visual puns, and satirical information graphics to translate anxieties about automation into engaging, humorous visual dialogue.'
    ],
    problem: 'Speculative design frequently lapses into grim, inaccessible science fiction rather than engaging relatable everyday human rituals.',
    keyContributions: [
      'Designed a series of screen-printed posters exploring automated domestic rituals and speculative commodities.',
      'Developed high-contrast vector illustrations blending technical schematic linework with playful caricature.',
      'Selected for international publication and distribution by Slanted Publishers.'
    ],
    methodology: [
      'Satirical Heuristics: Subverted classic educational instructional graphics and bingo card formats.',
      'Screen-Printing Exploration: Used halftone dot matrices and spot inks on unbleached paper stock.'
    ],
    outcomes: [
      'Published in international design anthology by Slanted Publishers.',
      'Exhibited in university student showcase reviews.'
    ],
    featured: true,
    coverBadge: 'SLANTED // SPECULATIVE',
    diagramType: 'speculative'
  }
];
