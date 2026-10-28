export type ProjectCategory = 
  | 'Product Design'
  | 'Data Visualization'
  | 'Research & AI'
  | 'Branding'
  | 'Interaction Design';

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortTitle?: string;
  clientOrOrg: string;
  category: ProjectCategory;
  year: string;
  timeline: string;
  role: string;
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
  diagramType?: 'matrix' | 'system' | 'chart' | 'flow' | 'wireframe' | 'brand';
}

export interface Profile {
  name: string;
  role: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  bio: string;
}
