export interface SkillItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'UI/UX' | 'Development' | 'Deployment';
  explanation: string;
  iconName: string;
}

export interface SkillCategory {
  title: string;
  slug: string;
  description: string;
  skills: SkillItem[];
}

export const skillsCategories: SkillCategory[] = [
  {
    title: "Frontend",
    slug: "frontend",
    description: "Building responsive, component-driven client interfaces with clean state and semantic markup.",
    skills: [
      {
        name: "HTML",
        category: "Frontend",
        explanation: "Structuring accessible, semantic web documents adhering to modern standards.",
        iconName: "Code2",
      },
      {
        name: "CSS",
        category: "Frontend",
        explanation: "Styling modern layouts with flexbox, grid, custom properties, and fluid typography.",
        iconName: "Palette",
      },
      {
        name: "JavaScript",
        category: "Frontend",
        explanation: "Writing clean ES6+ logic, DOM interaction, asynchronous flows, and API integrations.",
        iconName: "FileCode",
      },
      {
        name: "React",
        category: "Frontend",
        explanation: "Developing modular, reactive web interfaces with hooks, context, and reusable patterns.",
        iconName: "Atom",
      },
    ],
  },
  {
    title: "Backend",
    slug: "backend",
    description: "Architecting server-side services, application logic, and secure endpoints.",
    skills: [
      {
        name: "Java",
        category: "Backend",
        explanation: "Building robust, object-oriented software architectures and backend services.",
        iconName: "Coffee",
      },
      {
        name: "Spring Boot",
        category: "Backend",
        explanation: "Creating enterprise-grade REST APIs and microservice foundations with dependency injection.",
        iconName: "Leaf",
      },
      {
        name: "PHP",
        category: "Backend",
        explanation: "Executing server-side scripts, template processing, and dynamic database transactions.",
        iconName: "Server",
      },
      {
        name: "Python",
        category: "Backend",
        explanation: "Developing automation scripts, backend utilities, and data manipulation workflows.",
        iconName: "Terminal",
      },
    ],
  },
  {
    title: "Database",
    slug: "database",
    description: "Designing structured schemas, relational entities, and cloud persistence layers.",
    skills: [
      {
        name: "SQL",
        category: "Database",
        explanation: "Writing relational schema definitions, structured queries, joins, and data normalization.",
        iconName: "Database",
      },
      {
        name: "Supabase",
        category: "Database",
        explanation: "Utilizing managed PostgreSQL backend-as-a-service with auth and realtime capabilities.",
        iconName: "Boxes",
      },
    ],
  },
  {
    title: "UI/UX",
    slug: "ui-ux",
    description: "Crafting thoughtful user flows, design hierarchies, and interactive prototypes.",
    skills: [
      {
        name: "Figma",
        category: "UI/UX",
        explanation: "Designing component systems, wireframes, vector assets, and interactive screen prototypes.",
        iconName: "Figma",
      },
      {
        name: "Responsive Design",
        category: "UI/UX",
        explanation: "Ensuring flawless visual balance and ergonomics across mobile, tablet, and desktop viewports.",
        iconName: "Smartphone",
      },
      {
        name: "Interface Design",
        category: "UI/UX",
        explanation: "Balancing negative space, visual contrast, editorial typography, and user ergonomics.",
        iconName: "Layout",
      },
    ],
  },
  {
    title: "Development",
    slug: "development",
    description: "Maintaining engineering discipline with version control and standardized communication.",
    skills: [
      {
        name: "Git",
        category: "Development",
        explanation: "Managing distributed version control, branching workflows, and commit integrity.",
        iconName: "GitBranch",
      },
      {
        name: "GitHub",
        category: "Development",
        explanation: "Collaborating via pull requests, code reviews, issue tracking, and repository hosting.",
        iconName: "Github",
      },
      {
        name: "REST APIs",
        category: "Development",
        explanation: "Designing and consuming stateless HTTP endpoints with standardized status codes and payloads.",
        iconName: "Network",
      },
    ],
  },
  {
    title: "Deployment",
    slug: "deployment",
    description: "Shipping and hosting client applications and serverless services to global infrastructures.",
    skills: [
      {
        name: "Netlify",
        category: "Deployment",
        explanation: "Hosting modern static and JAMstack frontends with continuous Git deployment pipelines.",
        iconName: "Cloud",
      },
      {
        name: "AWS",
        category: "Deployment",
        explanation: "Leveraging core cloud storage, virtual instances, and compute infrastructure services.",
        iconName: "Cpu",
      },
      {
        name: "Vercel",
        category: "Deployment",
        explanation: "Deploying high-performance React frontends and serverless edge functions seamlessly.",
        iconName: "Zap",
      },
    ],
  },
];
