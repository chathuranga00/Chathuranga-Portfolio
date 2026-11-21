export interface ServiceItem {
  number: string;
  title: string;
  shortDescription: string;
  deliverables: string[];
  iconName: string;
}

export const servicesData: ServiceItem[] = [
  {
    number: "01",
    title: "Web Development",
    shortDescription: "Modern, responsive and user-friendly web applications.",
    deliverables: [
      "Responsive, cross-browser web interfaces",
      "Single-page applications (SPA) with React",
      "Semantic HTML, modern CSS & Tailwind",
      "Fast rendering, accessibility & performance",
    ],
    iconName: "Globe",
  },
  {
    number: "02",
    title: "Software Development",
    shortDescription: "Practical software solutions, APIs and application logic.",
    deliverables: [
      "Robust RESTful API design & integration",
      "Object-oriented backend services in Java / Spring Boot",
      "Business logic decomposition & automation scripts",
      "Maintainable, testable, and clean codebases",
    ],
    iconName: "Code2",
  },
  {
    number: "03",
    title: "UI/UX Design",
    shortDescription: "Intuitive interfaces and carefully designed user experiences.",
    deliverables: [
      "Figma wireframes, prototypes & design systems",
      "Asymmetric bento layouts & editorial typography",
      "Subtle micro-interactions & fluid transitions",
      "Human-centered usability & ergonomics",
    ],
    iconName: "Palette",
  },
  {
    number: "04",
    title: "Full-Stack Development",
    shortDescription: "Integrated frontend, backend and database solutions.",
    deliverables: [
      "End-to-end web system architecture",
      "Relational schema modeling in SQL & Supabase",
      "Secure authentication & state management",
      "Full lifecycle deployment & continuous delivery",
    ],
    iconName: "Layers",
  },
];
