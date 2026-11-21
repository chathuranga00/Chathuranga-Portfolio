export interface Milestone {
  id: string;
  stepNumber: string;
  title: string;
  category: string;
  description: string;
  highlight?: string;
  date: string | null; // Leave null unless provided; do NOT render if null
  iconName?: string;
}

export const journeyMilestones: Milestone[] = [
  {
    id: "nsbm-education",
    stepNumber: "01",
    title: "Computer Science Education at NSBM Green University",
    category: "Academic Foundation",
    description:
      "Commenced the BSc in Computer Science degree program at NSBM Green University, Sri Lanka. Built foundational grounding in computational theory, data structures, algorithms, object-oriented design, and discrete mathematics.",
    highlight: "NSBM Green University, Sri Lanka",
    date: null,
    iconName: "GraduationCap",
  },
  {
    id: "web-dev-foundations",
    stepNumber: "02",
    title: "Learning Web Development",
    category: "Technical Evolution",
    description:
      "Transitioned from foundational programming to modern web technologies. Deepened understanding of semantic HTML, responsive CSS, modern JavaScript (ES6+), component-driven architectures, and the React ecosystem.",
    highlight: "Frontend Engineering & Component Architecture",
    date: null,
    iconName: "Code2",
  },
  {
    id: "collaborative-projects",
    stepNumber: "03",
    title: "Building Collaborative University Projects",
    category: "Team Engineering",
    description:
      "Collaborated with academic peers on structured university software engineering projects, including the Fitness Sharks web application. Engineered backend Spring Boot REST APIs, managed Git branch workflows, executed code reviews, and integrated frontend-backend contracts with React.",
    highlight: "Full-Stack Teamwork & Version Control",
    date: null,
    iconName: "GitMerge",
  },
  {
    id: "developing-attendx",
    stepNumber: "04",
    title: "Developing LabAttend",
    category: "Flagship Software System",
    description:
      "Conceived, designed, and developed LabAttend as sole developer — a QR-based lab attendance platform for NSBM Green University combining dual React SPAs (Staff Console and Student PWA), Spring Boot (Java), and PostgreSQL with cross-group visit detection and multi-format report exports.",
    highlight: "Used / Piloted at NSBM Green University",
    date: null,
    iconName: "QrCode",
  },
  {
    id: "developing-edupulse",
    stepNumber: "05",
    title: "Developing EduPulse",
    category: "Intelligent Systems",
    description:
      "Engineered EduPulse across React web and Flutter mobile applications, integrating DeepSeek AI via NVIDIA NIM and Supabase PostgreSQL to deliver on-demand model paper generation, intelligent tutoring, and PDF analysis for A/L students.",
    highlight: "Multi-Platform AI EdTech System",
    date: null,
    iconName: "Sparkles",
  },
  {
    id: "developing-lankapay",
    stepNumber: "06",
    title: "Engineering LankaPay ID Platform",
    category: "Financial Technology",
    description:
      "Engineered LankaPay ID — a national payment identifier and digital banking super-app platform combining a Java 21 / Spring Boot 3.3 modular monolith, Flutter 3.22+ multi-account super-app, React 18 back-office portal, and EMVCo-compliant LankaQR engine with 547+ automated tests.",
    highlight: "National FinTech Simulation & Digital Banking",
    date: null,
    iconName: "CreditCard",
  },
  {
    id: "engineering-and-uiux",
    stepNumber: "07",
    title: "Improving Software Engineering and UI/UX Skills",
    category: "Craft Refinement",
    description:
      "Focused on engineering rigor, clean code principles, REST API optimizations, and refined UI/UX design. Mastered typography hierarchies, subtle micro-interactions, responsive ergonomics, and design systems in Figma.",
    highlight: "Full-Stack Precision & Human Ergonomics",
    date: null,
    iconName: "Palette",
  },
  {
    id: "professional-presence",
    stepNumber: "08",
    title: "Building a Professional Developer Presence",
    category: "Public Engineering",
    description:
      "Cultivating an authentic digital presence, establishing a showcase of verified projects, documenting technical architectures, and actively preparing for modern software engineering industry opportunities.",
    highlight: "Engineering Portfolio & Open Source Engagement",
    date: null,
    iconName: "Terminal",
  },
];
