export type DesignLens = 
  | 'default'
  | 'minimal'
  | 'swiss'
  | 'brutalist'
  | 'editorial'
  | 'maximalist'
  | 'experimental';

export type ProjectCategory = 
  | 'Product Design'
  | 'UI/UX'
  | 'Information Visualization'
  | 'Research'
  | 'Communication Design'
  | 'Wayfinding';

export interface ProjectDetailSection {
  title: string;
  content: string[];
  bulletPoints?: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  year: string;
  dateRange: string;
  category: ProjectCategory;
  type: 'client' | 'research' | 'university' | 'practice';
  clientOrOrg: string;
  role: string;
  location?: string;
  description: string;
  tags: string[];
  accentColor?: string;
  externalLink?: {
    label: string;
    url: string;
  };
  metrics?: {
    label: string;
    value: string;
  }[];
  overview: string[];
  keyContributions: string[];
  methodology: string[];
  outcomes: string[];
  imagePlaceholder: {
    aspectRatio: string;
    caption: string;
    svgDiagramType?: 'flow' | 'chart' | 'matrix' | 'system' | 'map' | 'wireframe';
  };
}

export interface VitaPosition {
  title: string;
  date?: string;
  isCurrent?: boolean;
}

export interface VitaEntry {
  id: string;
  date: string;
  organization: string;
  orgUrl?: string;
  location?: string;
  positions: VitaPosition[];
  note?: string;
}

export interface VitaSection {
  title: string;
  entries: VitaEntry[];
}
