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
        name: "React",
        category: "Frontend",
        explanation: "Developing modular, reactive web interfaces with hooks, context, and reusable patterns.",
        iconName: "Atom",
      },
      {
        name: "Tailwind CSS",
        category: "Frontend",
        explanation: "Rapid utility-first styling with responsive ergonomics and design system design tokens.",
        iconName: "Palette",
      },
      {
        name: "Vite",
        category: "Frontend",
        explanation: "Fast modern build tooling with ES modules, instant HMR, and optimized production bundles.",
        iconName: "Zap",
      },
      {
        name: "JavaScript",
        category: "Frontend",
        explanation: "Writing clean ES6+ logic, DOM interaction, asynchronous flows, and API integrations.",
        iconName: "FileCode",
      },
      {
        name: "HTML / CSS",
        category: "Frontend",
        explanation: "Structuring accessible, semantic web documents adhering to modern standards and fluid layouts.",
        iconName: "Code2",
      },
      {
        name: "React Router",
        category: "Frontend",
        explanation: "Client-side declarative routing, nested layouts, loaders, and route-level code splitting.",
        iconName: "Network",
      },
    ],
  },
  {
    title: "Backend",
    slug: "backend",
    description: "Architecting server-side services, application logic, and secure endpoints.",
    skills: [
      {
        name: "Spring Boot",
        category: "Backend",
        explanation: "Creating enterprise-grade REST APIs and microservice foundations with dependency injection.",
        iconName: "Leaf",
      },
      {
        name: "Java",
        category: "Backend",
        explanation: "Building robust, object-oriented software architectures, data structures, and backend services.",
        iconName: "Coffee",
      },
      {
        name: "Node.js",
        category: "Backend",
        explanation: "Event-driven asynchronous server runtimes, RESTful API endpoints, and middleware services.",
        iconName: "Server",
      },
      {
        name: "Spring Security",
        category: "Backend",
        explanation: "Role-based access control (RBAC), JWT token validation, and secure session management.",
        iconName: "Shield",
      },
      {
        name: "JPA / Hibernate",
        category: "Backend",
        explanation: "Object-relational mapping, transactional data queries, entity relationships, and persistence.",
        iconName: "Database",
      },
      {
        name: "PHP",
        category: "Backend",
        explanation: "Executing server-side scripts, template processing, and dynamic database transactions.",
        iconName: "Server",
      },
    ],
  },
  {
    title: "Database",
    slug: "database",
    description: "Designing structured schemas, relational entities, and cloud persistence layers.",
    skills: [
      {
        name: "PostgreSQL",
        category: "Database",
        explanation: "Enterprise relational database with ACID compliance, advanced indexing, and constraint enforcement.",
        iconName: "Database",
      },
      {
        name: "MySQL",
        category: "Database",
        explanation: "Relational database schema modeling, normalized entity tables, and high-performance queries.",
        iconName: "Database",
      },
      {
        name: "Supabase",
        category: "Database",
        explanation: "Utilizing managed PostgreSQL backend-as-a-service with auth and realtime capabilities.",
        iconName: "Boxes",
      },
      {
        name: "Firebase",
        category: "Database",
        explanation: "NoSQL document persistence, cloud authentication, and real-time synchronization.",
        iconName: "Boxes",
      },
      {
        name: "SQL",
        category: "Database",
        explanation: "Writing relational schema definitions, structured queries, joins, and data normalization.",
        iconName: "Database",
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
    title: "Development & Tools",
    slug: "development",
    description: "Maintaining engineering discipline with version control, build tools, and modern AI acceleration.",
    skills: [
      {
        name: "Git & GitHub",
        category: "Development",
        explanation: "Managing distributed version control, branch strategies, pull requests, and code reviews.",
        iconName: "GitBranch",
      },
      {
        name: "Maven",
        category: "Development",
        explanation: "Java dependency management, build automation, lifecycle phases, and packaging.",
        iconName: "Cpu",
      },
      {
        name: "Capacitor (Android)",
        category: "Development",
        explanation: "Cross-platform mobile runtimes bridging modern web applications to native Android devices.",
        iconName: "Smartphone",
      },
      {
        name: "Cursor AI",
        category: "Development",
        explanation: "AI-assisted rapid prototyping, code refactoring, context-aware indexing, and productivity.",
        iconName: "Zap",
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
