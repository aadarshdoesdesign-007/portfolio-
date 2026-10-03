export interface FieldNote {
  id: string;
  number: string;
  date: string;
  title: string;
  category: string;
  summary: string;
  tags: string[];
}

export const notesData: FieldNote[] = [
  {
    id: "note-01",
    number: "FIELD NOTE 014",
    date: "09 / 2026",
    title: "Systems Mapping in Disorienting Terrains",
    category: "DESIGN RESEARCH",
    summary: "Observations on how users build mental maps in physical spaces vs digital interfaces. Why wayfinding systems must prioritize landmarks over raw grid coordinates.",
    tags: ["Systems Design", "Spatial UX", "Cognitive Maps"]
  },
  {
    id: "note-02",
    number: "FIELD NOTE 012",
    date: "06 / 2026",
    title: "Typography as Spatial Architecture",
    category: "TYPOGRAPHY",
    summary: "Exploring typographic scale, contrast, and optical weight in high-density data layouts. How sans, serif, and monospace fonts establish micro-boundaries.",
    tags: ["Typography", "Information Design", "Layout"]
  },
  {
    id: "note-03",
    number: "FIELD NOTE 009",
    date: "03 / 2026",
    title: "Ethnographic Observation & Contextual Truth",
    category: "QUALITATIVE RESEARCH",
    summary: "Why user interviews alone lie, but participant observation in natural environments reveals true friction points. Notes from field surveys at IIT Indore.",
    tags: ["Ethnography", "Field Research", "User Observation"]
  },
  {
    id: "note-04",
    number: "FIELD NOTE 005",
    date: "11 / 2025",
    title: "Cultural Archetypes in Contemporary Branding",
    category: "BRAND IDENTITY",
    summary: "Reflections from designing Pampa: how ancient stone architecture can be distilled into minimalist luxury packaging without losing historical authenticity.",
    tags: ["Brand Identity", "Cultural Design", "Packaging"]
  }
];