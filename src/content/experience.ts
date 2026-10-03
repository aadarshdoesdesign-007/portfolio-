export interface ExperienceItem {
  id: string;
  year: string;
  role: string;
  organization: string;
  category: string;
  location: string;
  description: string;
  keyWork: string[];
  status: string;
  elevation: string;
}

export const experienceData: ExperienceItem[] = [
  {
    id: "exp-01",
    year: "AUG 2023 – AUG 2027",
    role: "Communication Design Student",
    organization: "Jain University",
    category: "EDUCATION & DESIGN PRACTICE",
    location: "Bengaluru, India",
    description: "Specializing in UX design, information visualization, design research methodologies, and interactive visual systems.",
    keyWork: [
      "UX design and information architecture coursework",
      "Qualitative research methods & systems mapping",
      "Brand identity, typography & 3D visual storytelling"
    ],
    status: "CURRENT ENROLLMENT",
    elevation: "0000 M – 0600 M"
  },
  {
    id: "exp-02",
    year: "2026 – PRESENT",
    role: "Spatial UX & Systems Researcher",
    organization: "Karnataka Zoo Authority, Shivamogga",
    category: "DESIGN RESEARCH & WAYFINDING",
    location: "Shivamogga, India",
    description: "Developing visitor navigation systems and spatial wayfinding frameworks based on field observations and behavioral mapping.",
    keyWork: [
      "Pedestrian traffic flow observation & behavioral mapping",
      "Modular outdoor signage system design",
      "Spatial map graphics balancing detail density with rapid glanceability"
    ],
    status: "ONGOING PROJECT",
    elevation: "1200 M"
  },
  {
    id: "exp-03",
    year: "2025 – 2026",
    role: "Ethnographic Research Collaborator",
    organization: "IIT Indore Field Research",
    category: "QUALITATIVE RESEARCH & ETHNOGRAPHY",
    location: "Indore, India",
    description: "Applied ethnographic methods, field observation, contextual inquiry, and affinity diagramming to understand user behaviors.",
    keyWork: [
      "Participant observation & shadowing in public environments",
      "Qualitative research synthesis & affinity mapping",
      "Translating behavioral findings into service design recommendations"
    ],
    status: "COMPLETED SURVEY",
    elevation: "1800 M"
  },
  {
    id: "exp-04",
    year: "2024 – PRESENT",
    role: "Multidisciplinary Designer",
    organization: "Independent Practice",
    category: "BRAND, UI/UX & 3D VISUALIZATION",
    location: "Bengaluru, India",
    description: "Designing brand identities, packaging systems, UI component libraries, Blender 3D visualizations, and information graphics.",
    keyWork: [
      "Pampa Luxury Jewellery brand identity & 3D packaging",
      "Interactive data visualization prototypes & UI design systems",
      "Visual communication collateral and editorial publications"
    ],
    status: "AVAILABLE",
    elevation: "2400 M"
  }
];