export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
  iconName?: string;
}

export interface ProjectGalleryItem {
  url: string;
  title: string;
  tag: string;
  description: string;
  aspect?: 'portrait' | 'landscape';
  isPlaceholder?: boolean;
}

export interface ProjectFeatureCard {
  title: string;
  description: string;
  iconName?: string;
  tag?: string;
}

export interface ProjectLearning {
  topic: string;
  description: string;
}

export interface ProjectSecurityPrivacy {
  summary: string;
  points: string[];
  notice: string;
}

export interface ProjectSourceCodeNotice {
  isPrivate: boolean;
  statusText: string;
  description: string;
  demoActionText: string;
  demoActionUrl: string;
}

export interface Project {
  id: string;
  slug: string;
  number: string;
  title: string;
  tagline?: string;
  role?: string;
  statusBadge?: string;
  category: string;
  filterCategory: 'Education Tech' | 'AI' | 'Web' | 'FinTech';
  shortDescription: string;
  overview: string;
  problemStatement: string;
  solutionSummary?: string;
  objectives: string[];
  proposedSolution: string;
  systemArchitecture: {
    overview: string;
    diagramNotes?: string;
    layers?: { name: string; details: string }[];
  };
  features: string[];
  featureCards?: ProjectFeatureCard[];
  technologies: {
    name: string;
    note?: string;
  }[];
  workflow?: WorkflowStep[];
  challenges: string[];
  securityAndPrivacy?: ProjectSecurityPrivacy;
  learnings?: ProjectLearning[];
  acknowledgement?: {
    name: string;
    message: string;
  };
  sourceCodeNotice?: ProjectSourceCodeNotice;
  myContribution?: string; // Will show "[To be added]" if undefined
  resultsAndLessons?: string; // Will show "[To be added]" if undefined
  thumbnailUrl: string | null;
  screenshots: string[];
  gallery?: ProjectGalleryItem[];
  deviceType?: 'mobile' | 'desktop';
  liveUrl?: string | null;
  githubUrl?: string | null;
  announcementUrl?: string | null;
}

export const projectsData: Project[] = [
  {
    id: "labattend",
    slug: "labattend",
    number: "01",
    title: "LabAttend — QR-Based Lab Attendance for NSBM Green University",
    tagline: "QR-based lab attendance for NSBM Green University",
    role: "Sole developer (design, backend, frontend, database, deployment)",
    statusBadge: "Used / Piloted at my university",
    category: "Higher Education Tech / Institutional Attendance Platform",
    filterCategory: "Education Tech",
    shortDescription:
      "A university-piloted QR attendance platform engineered for NSBM Green University. Features dual SPAs, 1-scan phone camera badge verification, cross-group visit detection, role-based access, and automated multi-format report exports.",
    overview:
      "LabAttend is an institutional attendance management system built for NSBM Green University. Developed as sole developer across UI/UX design, Spring Boot backend, dual React frontends, PostgreSQL database modeling, and cloud deployment, it transitions university laboratory attendance from slow manual paper sign-in sheets into an instantaneous single-scan verification workflow.",
    problemStatement:
      "Marking attendance by hand in large lab groups is slow, error-prone and hard to report on. Paper attendance sheets waste valuable lab instructional time, invite proxy sign-ins, and create administrative delays when calculating semester eligibility across large academic cohorts.",
    solutionSummary:
      "A lecturer scans a student's QR badge with a phone camera and attendance is recorded in one scan, with automatic verification of assigned lab groups and instant reporting.",
    objectives: [
      "Eliminate paper attendance sheets and proxy sign-ins with 1-scan phone camera badge recording.",
      "Automatically detect and flag cross-group visits (e.g. students from Group B attending Group A) in reports.",
      "Separate staff management from student access through dedicated consoles and a read-only student portal.",
      "Stream multi-format institutional compliance reports in formatted PDF, Excel, and CSV.",
      "Protect student privacy through strict role-based access with zero real student data in the codebase.",
    ],
    proposedSolution:
      "An end-to-end full-stack platform featuring dual React 18 SPAs (Staff Administration Console and Student PWA), an asynchronous Java Spring Boot REST backend with Flyway schema migrations, and a PostgreSQL database. Lecturers scan badges with smartphone cameras, while students view their personal turnout and digital badges securely.",
    systemArchitecture: {
      overview:
        "Architected as a multi-tier decoupled system with separate staff and student client portals hosted on AWS S3 + CloudFront, an asynchronous Spring Boot backend deployed on Render, and a secure PostgreSQL relational database with Flyway versioned migrations.",
      layers: [
        {
          name: "Client Tier (React + Vite + Tailwind CSS)",
          details: "Dual SPAs: Staff Management Console and an installable, mobile-responsive Student PWA adaptive from 360px phones to desktop workstations.",
        },
        {
          name: "API & Business Logic (Spring Boot / Java)",
          details: "Spring Boot REST API managing session lifecycles, JWT security filters, BCrypt password hashing, token-bucket rate limiting, and report streaming.",
        },
        {
          name: "Persistence & Migrations (PostgreSQL + Flyway)",
          details: "Relational database with Flyway schema migration scripts, unique constraints preventing duplicate session scans, and immutable audit logs.",
        },
        {
          name: "Infrastructure & CI/CD (Docker, AWS, Render)",
          details: "Frontend SPAs hosted on AWS S3 with CloudFront CDN; Spring Boot backend containerized with Docker and deployed on Render via GitHub Actions.",
        },
      ],
    },
    workflow: [
      {
        step: 1,
        title: "Admin Adds Students",
        description:
          "Admin configures students, batches, modules, lecturers, and assigned lab groups (A, B, C...) through the management console.",
        iconName: "UserCheck",
      },
      {
        step: 2,
        title: "Lecturer Scans QR Badges",
        description:
          "Lecturer schedules a lab, scans student QR badges with a phone camera for 1-scan recording (with manual search fallback), and finalizes the session.",
        iconName: "QrCode",
      },
      {
        step: 3,
        title: "Student Views Own Attendance",
        description:
          "Students authenticate to a read-only portal to view personal attendance history by session and module, and access their digital QR badge.",
        iconName: "CheckCircle",
      },
    ],
    featureCards: [
      {
        title: "Lab Groups & Cross-Group Detection",
        description: "Configures lab groups (A, B, C...) with automatic flagging when a student attends a different group's session, with flags included in exports.",
        iconName: "Users",
        tag: "CORE LOGIC",
      },
      {
        title: "Admin Operations Console",
        description: "Centralized control hub for managing students, batches, modules, lecturers, and lab group allocations with single-use activation links.",
        iconName: "Settings",
        tag: "ADMINISTRATION",
      },
      {
        title: "Lecturer Session Console",
        description: "Allows lecturers to schedule labs, scan QR badges using smartphone cameras, use manual search fallback if needed, and finalize sessions.",
        iconName: "Camera",
        tag: "SESSION MANAGEMENT",
      },
      {
        title: "Read-Only Student Portal",
        description: "Empowers students to inspect their own attendance history by session and module, view attendance records, and display digital QR badges.",
        iconName: "Eye",
        tag: "STUDENT ACCESS",
      },
      {
        title: "Confidential Student Feedback",
        description: "Integrated in-app feedback form allowing students to submit feedback that only the university administrator can read.",
        iconName: "MessageSquare",
        tag: "ADMIN ONLY",
      },
      {
        title: "Multi-Format Report Export",
        description: "Generates comprehensive attendance records on-demand, exported cleanly as formatted PDF, Excel, and CSV files for academic records.",
        iconName: "FileSpreadsheet",
        tag: "REPORTING",
      },
      {
        title: "Installable PWA (360px to Desktop)",
        description: "Engineered as an installable Progressive Web App with an offline-capable shell, responsive from 360px mobile viewports to large desktops.",
        iconName: "Smartphone",
        tag: "PWA & RESPONSIVE",
      },
    ],
    features: [
      "Lab groups (A, B, C...) with automatic flagging of cross-group visits, included in reports",
      "Admin console for students, batches, modules, lecturers and lab groups",
      "Lecturer console: schedule a lab, scan QR badges, manual search fallback, finalize the session",
      "Read-only student portal: own attendance by session and module, digital QR badge",
      "Student feedback form that only the admin can read",
      "Reports exported as PDF, Excel and CSV",
      "Installable PWA, responsive from 360px phones to desktops",
    ],
    technologies: [
      { name: "Spring Boot", note: "Java" },
      { name: "React" },
      { name: "Vite" },
      { name: "Tailwind CSS" },
      { name: "PostgreSQL" },
      { name: "JWT" },
      { name: "Flyway" },
      { name: "Docker" },
      { name: "GitHub Actions" },
      { name: "AWS S3" },
      { name: "AWS CloudFront" },
      { name: "Render" },
    ],
    challenges: [
      "Cross-Group Visit Flagging: Automatically tracking and highlighting when a student attends a lab session assigned to a different lab group (e.g., attending Group B instead of Group A), while preserving record integrity in all PDF/Excel reports.",
      "Lighting & Camera QR Calibration: Tuning camera constraints to achieve reliable 1-scan badge reading across budget smartphone webcams in varied laboratory lighting, complemented by a fast manual search fallback.",
      "Role Separation & Security: Enforcing strict boundary isolation between Admin, Lecturer, and Student roles with independent login gateways and server-side JWT claim derivation.",
      "Dual Frontend Deployment: Decoupling staff operations from student self-service into independent SPAs hosted on AWS S3 + CloudFront with CI/CD automation via GitHub Actions.",
    ],
    securityAndPrivacy: {
      summary:
        "Engineered with strict zero-trust security principles to safeguard institutional attendance records and prevent unauthorized access or identity tampering.",
      points: [
        "Role-Based Access Control (RBAC): Enforced across Admin, Lecturer, and Student privileges at both API filter and route guard layers.",
        "Separate Staff and Student Logins: Dedicated authentication gateways prevent privilege elevation and isolate administrative capabilities.",
        "Hashed Passwords & Activation Links: Credential protection with strong cryptographic hashing and single-use account activation links.",
        "Token-Bucket Rate Limiting: Protection against brute-force attacks and abuse across all public and authenticated endpoints.",
        "Audit Log of Attendance Corrections: Comprehensive audit trail recording every manual attendance adjustment or correction with timestamps.",
        "Zero Real Student Data in Codebase: Strict compliance with student privacy guidelines — zero real student names, emails, ID numbers, or QR tokens exist in the source code.",
        "Private Repository: The source repository remains private because it handles real university data and internal institutional workflows.",
      ],
      notice:
        "In compliance with university data protection policies, all real student records, student IDs, and live deployment endpoints are omitted from this case study.",
    },
    learnings: [
      {
        topic: "Full-Stack Development",
        description:
          "Architected and delivered an enterprise multi-tier ecosystem uniting a Java Spring Boot backend, dual React SPAs, and PostgreSQL with Flyway automated schema migrations, managing end-to-end domain modeling from database constraints to client ergonomics.",
      },
      {
        topic: "Security Hardening",
        description:
          "Implemented practical defense-in-depth: strict role-based access control (RBAC), isolated authentication gateways, single-use activation workflows, rate limiting, and an audit log for attendance corrections.",
      },
      {
        topic: "Deployment & Cloud Infrastructure",
        description:
          "Designed a production-ready DevOps pipeline integrating GitHub Actions CI/CD, hosting dual frontend SPAs on AWS S3 with CloudFront global CDN distribution, and containerizing the backend service with Docker on Render.",
      },
    ],
    acknowledgement: {
      name: "Mrs. Nimesha Hewawasam",
      message:
        "Special thanks to Mrs. Nimesha Hewawasam for her guidance, continuous encouragement, and invaluable support throughout the development and university implementation of the LabAttend platform.",
    },
    sourceCodeNotice: {
      isPrivate: true,
      statusText: "Source code: private (university system)",
      description:
        "This project handles real university data and institutional infrastructure for NSBM Green University. To protect university security and student privacy, the source repository and live system URL are kept private.",
      demoActionText: "Request a Demo",
      demoActionUrl: "/#contact",
    },
    myContribution:
      "Sole developer responsible for the complete lifecycle: UI/UX design, database architecture, Spring Boot REST backend, dual React Single Page Applications (Staff and Student PWA), automated Flyway migrations, and deployment to AWS S3/CloudFront and Render.",
    resultsAndLessons:
      "Used / Piloted at NSBM Green University. Successfully eliminated manual paper sign-in sheets, reduced attendance verification time to one scan per student, enabled automated cross-group visit detection, and provided academic departments with on-demand PDF, Excel, and CSV attendance reports.",
    thumbnailUrl: "/projects/labattend/staff-login.jpg",
    screenshots: [
      "/projects/labattend/staff-login.jpg",
      "/projects/labattend/student-login.jpg",
    ],
    gallery: [
      {
        url: "/projects/labattend/staff-login.jpg",
        tag: "STAFF GATEWAY",
        title: "Separate Staff Login Portal",
        description:
          "Dedicated authentication portal for university lecturers and administrators, enforcing role-based permissions and isolated session security.",
        aspect: "portrait",
      },
      {
        url: "/projects/labattend/student-login.jpg",
        tag: "STUDENT PWA",
        title: "Student Portal & Digital Badge Access",
        description:
          "Mobile-first PWA interface allowing students to authenticate, inspect personal attendance percentages by module, and display their digital QR badge.",
        aspect: "portrait",
      },
      {
        // TODO: Place lecturer QR scanner screen capture in /public/projects/labattend/lecturer-scanner.jpg
        url: "/projects/labattend/lecturer-scanner.jpg",
        tag: "LECTURER CONSOLE",
        title: "1-Scan Camera Badge Scanner [Placeholder]",
        description:
          "Lecturer interface showing real-time smartphone camera QR badge scanning with immediate duplicate scan rejection and manual search fallback.",
        aspect: "landscape",
        isPlaceholder: true,
      },
      {
        // TODO: Place admin console screen capture in /public/projects/labattend/admin-console.jpg
        url: "/projects/labattend/admin-console.jpg",
        tag: "ADMIN CONSOLE",
        title: "Lab Group & Roster Management [Placeholder]",
        description:
          "Administrative control dashboard for managing batches, modules, lecturers, and lab groups (A, B, C...) with cross-group visit notifications.",
        aspect: "landscape",
        isPlaceholder: true,
      },
      {
        // TODO: Place reports export screen capture in /public/projects/labattend/reports-export.jpg
        url: "/projects/labattend/reports-export.jpg",
        tag: "COMPLIANCE REPORTING",
        title: "Multi-Format Export Engine [Placeholder]",
        description:
          "On-demand reporting dashboard exporting attendance registries and cross-group attendance flags directly into formatted PDF, Excel (.xlsx), and CSV.",
        aspect: "landscape",
        isPlaceholder: true,
      },
    ],
    deviceType: "mobile",
    liveUrl: null, // Private university system
    githubUrl: null, // Private university repository
  },
  {
    id: "edupulse",
    slug: "edupulse",
    number: "02",
    title: "EduPulse — AI-Powered Learning Platform for A/L Students",
    category: "Artificial Intelligence / EdTech",
    filterCategory: "AI",
    shortDescription:
      "An AI-powered learning platform designed to support Advanced Level (A/L) students with intelligent tutoring, DeepSeek AI model paper generation, PDF document analysis, and comprehensive stream coverage across Science, Commerce, and Arts.",
    overview:
      "EduPulse is an intelligent educational ecosystem engineered to help Advanced Level (A/L) secondary students master dense theoretical curricula. Built with a React web client hosted on Netlify and a cross-platform Flutter mobile app, EduPulse interfaces with Supabase PostgreSQL and leverages DeepSeek AI via NVIDIA NIM / NVIDIA API Catalog. It delivers automated model paper synthesis across 126+ topics, intelligent study planning, scholar gamification, and contextual PDF lecture note analysis.",
    problemStatement:
      "Advanced Level secondary curricula encompass dense theoretical topics across Science, Commerce, and Arts where students routinely face conceptual bottlenecks outside the classroom. Private tutoring is costly and inaccessible to many, while static textbooks lack interactive problem-solving feedback, adaptive evaluation, or on-demand model paper generation tailored to specific examination standards.",
    objectives: [
      "Provide 24/7 on-demand AI tutoring and concept clarification for difficult A/L academic subjects.",
      "Automate model paper generation and interactive quizzes with tiered difficulties (Easy, Medium, Hard) across all major streams.",
      "Enable intelligent PDF document analysis allowing students to query lecture notes and study guides directly.",
      "Deliver structured study planning, metric tracking, and scholar progression gamification to sustain student engagement.",
      "Engineer a unified multi-platform architecture bridging a responsive React web application and a Flutter mobile app backed by Supabase.",
    ],
    proposedSolution:
      "A full-stack, AI-driven educational platform featuring a clean React single-page web interface and a Flutter mobile companion. Powered by Supabase for PostgreSQL persistence and authentication, and leveraging DeepSeek LLMs accessed through NVIDIA NIM / NVIDIA API Catalog, EduPulse processes natural language student queries, generates syllabus-aligned model papers, and analyzes uploaded study PDFs in real time.",
    systemArchitecture: {
      overview:
        "Architected with a decoupled multi-client system where both the React web application and Flutter mobile app interface with Supabase PostgreSQL and the NVIDIA NIM DeepSeek AI intelligence layer via authenticated REST APIs.",
      layers: [
        { name: "Web Application (React + JS)", details: "Responsive single-page web application hosted on Netlify, featuring dashboard metrics, quiz generators, and interactive AI chat." },
        { name: "Mobile Client (Flutter / Dart)", details: "Cross-platform mobile application utilizing identical JSON data structures and REST endpoints for on-the-go studying." },
        { name: "AI Intelligence Layer (DeepSeek + NVIDIA NIM)", details: "Leverages DeepSeek AI via the NVIDIA API Catalog / NVIDIA NIM for syllabus-aligned quiz synthesis and PDF document analysis." },
        { name: "Database & Backend (Supabase PostgreSQL)", details: "Relational persistence for user accounts, quiz attempts, study planner tasks, scholar tiers, and session histories." },
      ],
    },
    features: [
      "AI-Powered Personal Tutor with Contextual Concept Clarification",
      "Automated Model Paper & Quiz Generation across 126+ A/L Topics",
      "Multi-Stream Syllabus Coverage (Science, Commerce, Arts & Social Sciences)",
      "Intelligent PDF Document Analysis & Lecture Note Ingestion",
      "Interactive Study Planner, Task Management & Score Progress Analytics",
      "Dual-Client Execution (React Web App + Flutter Mobile Companion)",
      "DeepSeek LLM Integration via NVIDIA API Catalog / NVIDIA NIM",
      "Gamified Scholar Progression Tiers (e.g., Level 2 Scholar)",
    ],
    technologies: [
      { name: "React" },
      { name: "JavaScript" },
      { name: "Flutter" },
      { name: "Dart" },
      { name: "DeepSeek AI" },
      { name: "NVIDIA NIM" },
      { name: "Supabase PostgreSQL" },
      { name: "Netlify" },
      { name: "REST APIs" },
      { name: "Git & GitHub" },
    ],
    workflow: [
      {
        step: 1,
        title: "Student Dashboard & Scholar Profile",
        description: "Students log into EduPulse to view personalized study metrics, completed quizzes, and current scholar tier.",
        iconName: "LayoutDashboard",
      },
      {
        step: 2,
        title: "Subject & Stream Selection",
        description: "Select from Science, Commerce, or Arts streams, filtering by subject (Chemistry, Physics, Biology, Accounting) and difficulty.",
        iconName: "BookOpen",
      },
      {
        step: 3,
        title: "AI Model Paper Generation",
        description: "DeepSeek AI synthesizes tailored model papers and timed problem sets via NVIDIA NIM endpoints.",
        iconName: "Sparkles",
      },
      {
        step: 4,
        title: "Interactive Quiz & Analysis",
        description: "Students solve questions with real-time scoring, estimated completion times, and instant solution breakdowns.",
        iconName: "CheckCircle",
      },
      {
        step: 5,
        title: "AI Tutor & PDF Ingestion",
        description: "Students upload lecture PDFs for deep contextual querying and on-demand conceptual clarification.",
        iconName: "FileText",
      },
    ],
    challenges: [
      "Synthesizing syllabus-accurate A/L model examination papers across diverse streams: Solved by integrating DeepSeek AI through NVIDIA NIM with carefully engineered pedagogical prompts and difficulty constraints.",
      "Architecting cross-platform parity between React and Flutter: Maintained unified JSON schema contracts, shared Supabase PostgreSQL schemas, and consistent state synchronization across web and mobile.",
      "Handling complex PDF document extraction and query contextualization: Implemented document parsing pipelines to allow students to ask questions directly about dense academic notes.",
      "Designing an encouraging, low-friction study environment: Engineered responsive quick actions, clean stream filter trees, and progress milestones (scholar levels) to motivate self-directed studying.",
    ],
    myContribution:
      "Conceived, designed, and developed the end-to-end EduPulse platform: built the React web application; engineered the Flutter mobile app; integrated DeepSeek AI via NVIDIA NIM API Catalog; designed the Supabase PostgreSQL database schemas and REST API communication; deployed the web production environment to Netlify.",
    resultsAndLessons:
      "Successfully launched and shared with the educational community. Validated multi-platform architecture serving 126+ subject quizzes across Science, Commerce, and Arts streams with instant AI model paper generation, demonstrating the effectiveness of combining modern LLMs with structured student curricula.",
    thumbnailUrl: "/projects/edupulse/dashboard.jpg",
    screenshots: [
      "/projects/edupulse/dashboard.jpg",
      "/projects/edupulse/quizzes.jpg",
    ],
    gallery: [
      {
        url: "/projects/edupulse/dashboard.jpg",
        tag: "STUDENT DASHBOARD",
        title: "Intelligent Student Dashboard & Metrics Overview",
        description:
          "Centralized student study hub showcasing quiz completion stats, average scores, Level 2 Scholar progression, and quick access to AI Tutor, Tasks, and PDF Analysis.",
        aspect: "landscape",
      },
      {
        url: "/projects/edupulse/quizzes.jpg",
        tag: "AI MODEL PAPER GENERATOR",
        title: "Stream-Specific Quizzes & Model Paper Synthesis",
        description:
          "Multi-stream quiz hub covering Science, Commerce, and Arts with 126+ interactive model papers, difficulty filters, and DeepSeek AI paper generation.",
        aspect: "landscape",
      },
    ],
    deviceType: "desktop",
    liveUrl: "https://lnkd.in/gPqm7eUy",
    githubUrl: "https://github.com/chathuranga00/EduPulse/tree/Web-dev-2",
    announcementUrl: "https://lnkd.in/p/gCtA2KCH",
  },
  {
    id: "fitness-sharks",
    slug: "fitness-sharks",
    number: "03",
    title: "Fitness Sharks — Gym & Fitness Web Application",
    category: "Full-Stack Web Development / Fitness Tech",
    filterCategory: "Web",
    shortDescription:
      "A collaborative full-stack web application developed as an academic team project at NSBM Green University. Enables gym members to explore facilities, compare membership tiers, connect with certified personal trainers, and manage their fitness progress.",
    overview:
      "Fitness Sharks is a modern web application developed as a collaborative team project at NSBM Green University. Engineered with a React single-page frontend and a robust Java Spring Boot REST API backend, the platform provides gym members with transparent membership tier comparisons, credentialed trainer profiles, and a personalized user dashboard to facilitate onboarding, training coordination, and fitness community engagement.",
    problemStatement:
      "Fitness clients and gym members often struggle to find clear information regarding membership tiers, qualified training staff, and personalized schedule management through fragmented traditional websites lacking direct digital onboarding.",
    objectives: [
      "Deliver a high-impact digital storefront showcasing gym facilities, training equipment, and brand identity.",
      "Provide transparent membership tier comparisons and streamlined digital onboarding.",
      "Feature credentialed personal trainers with detailed specializations and coaching profiles.",
      "Engineer secure REST APIs with Spring Boot for user authentication, profile management, and contact requests.",
      "Facilitate seamless team collaboration and frontend-backend integration across a multi-member engineering team.",
    ],
    proposedSolution:
      "A full-stack, responsive web application combining an aesthetic React frontend with a secure Spring Boot REST API layer and relational database storage, designed through collaborative version control to manage member lifecycles and fitness schedules.",
    systemArchitecture: {
      overview:
        "Constructed with a decoupled full-stack architecture featuring a React single-page client interfacing with a Java Spring Boot REST API service layer backed by relational persistence.",
      layers: [
        { name: "Client UI (React + CSS3)", details: "Responsive single-page web application with interactive gym tour hero, membership comparisons, and trainer showcases." },
        { name: "Backend Services (Java & Spring Boot)", details: "Secure REST API layer managing member profiles, plan subscriptions, contact inquiries, and business logic." },
        { name: "Database & Integration", details: "Relational persistence storing member records, membership tiers, and workout progress tracking data." },
      ],
    },
    features: [
      "High-Impact Hero Experience with Interactive Gym Tour & Membership CTAs",
      "Transparent Membership Plans & Tier Comparison Grid",
      "Certified Personal Trainer Profiles & Coaching Specializations",
      "Member Dashboard & Fitness Progress Monitoring",
      "Secure Spring Boot REST API Integration & Form Validation",
      "Responsive Multi-Device Ergonomics with Dark/Light Mode Adaptability",
      "Collaborative Team Development with Git & GitHub Version Control",
    ],
    technologies: [
      { name: "React" },
      { name: "JavaScript" },
      { name: "Java" },
      { name: "Spring Boot" },
      { name: "REST APIs" },
      { name: "Git & GitHub" },
    ],
    challenges: [
      "Coordinating collaborative team development across multiple contributors: Solved through structured Git branching, clean code reviews, and well-defined REST API endpoint contracts between frontend and backend.",
      "Engineering secure, reliable REST APIs in Spring Boot for user profiles and plan management with comprehensive validation.",
      "Designing an engaging, responsive gym landing experience with clear visual hierarchy, transparent pricing tables, and dark/light mode support.",
    ],
    myContribution:
      "Contributed as Backend Developer in a university teamwork project: developed secure Spring Boot REST APIs, implemented database management and schema designs, handled frontend-backend integration with React, and participated in collaborative debugging and version control.",
    resultsAndLessons:
      "Successfully delivered as a collaborative academic project at NSBM Green University with guidance from university lecturers. Strengthened practical competencies in Spring Boot, Java REST APIs, database management, team git workflows, and full-stack integration.",
    thumbnailUrl: "/projects/fitness-sharks/landing.jpg",
    screenshots: [
      "/projects/fitness-sharks/landing.jpg",
    ],
    gallery: [
      {
        url: "/projects/fitness-sharks/landing.jpg",
        tag: "WEB APPLICATION LANDING",
        title: "Fitness Sharks Center & Membership Portal",
        description:
          "High-impact landing interface featuring gym tour CTAs, transparent membership tiers, certified trainer directories, and authenticated member access.",
        aspect: "landscape",
      },
    ],
    deviceType: "desktop",
    liveUrl: "https://lnkd.in/g_ZcrqGT",
    githubUrl: "https://github.com/chathuranga00/Fitness-sharks",
    announcementUrl: "https://lnkd.in/p/gwN4qGGG",
  },
  {
    id: "lankapay",
    slug: "lankapay",
    number: "04",
    title: "LankaPay ID — National Payment Identifier & Digital Banking Super-App",
    category: "Financial Technology / Multi-Platform Banking",
    filterCategory: "FinTech",
    shortDescription:
      "A national proxy payment identifier platform and simulated digital banking Super-App for Sri Lanka. Features multi-bank orchestration, LankaQR/EMVCo dynamic generation, privacy-preserving proxy registries, and 547+ automated tests.",
    overview:
      "LankaPay ID is a full-stack, enterprise-hardened prototype demonstrating a national proxy payment identifier platform and simulated digital banking Super-App for Sri Lanka. Inspired by modern real-time retail payment networks (such as India's UPI, Singapore's PayNow, and Australia's PayID), LankaPay ID decouples sensitive bank account numbers from consumer interactions through encrypted proxy identifiers. The platform features an asynchronous Spring Boot 3.3 / Java 21 backend with AES-GCM encryption, a 5-tab Flutter Super-App (Home, Pay, City, Chat, Explore) with trilingual localization, and a React 18 back-office operations portal.",
    problemStatement:
      "Traditional retail payment workflows in Sri Lanka require consumers to share sensitive 12-16 digit bank account numbers and branch codes, creating friction and substantial privacy risks. Furthermore, fragmented banking applications force consumers to juggle multiple portals for utility bills, P2P transfers, split expenses, and merchant payments without unified proxy identification or real-time payment reconciliation.",
    objectives: [
      "Decouple sensitive bank account details from consumer transactions via verified phone number proxy mapping.",
      "Support multi-bank orchestration enabling users to link multiple accounts and switch default receiving institutions.",
      "Implement dynamic and static EMVCo / LankaQR code generation with minor-unit precision and cryptographic signatures.",
      "Deliver a unified 5-tab Flutter Super-App featuring Home, Pay Hub, City Directory, AI Support, and Products Explore.",
      "Provide bank administrators with a real-time React back-office operations portal for live CEFTS sync and fraud monitoring.",
      "Enforce rigorous automated testing across both backend and mobile tiers with CI/CD security quality gates.",
    ],
    proposedSolution:
      "A 3-tier financial technology architecture comprising a Spring Boot 3.3 (Java 21 LTS) modular monolith with minor-unit financial precision (cents), a 5-tab Flutter 3.22+ Super-App with Riverpod and GoRouter, and a React 18 / TypeScript operations portal. Secured with AES-GCM encryption, BCrypt, Bucket4j rate limiting, server-side @FeatureToggle interceptors, and Google Gemini AI customer support with automated PII redaction.",
    systemArchitecture: {
      overview:
        "Engineered as a decoupled financial system linking a Flutter mobile client and a React administration portal to a Java 21 Spring Boot REST service layer backed by Cloud Firestore and MySQL persistence, guarded by 547+ passing automated tests.",
      layers: [
        { name: "Mobile Client (Flutter 3.22+ & Dart 3.4+)", details: "5-tab Super-App (Home, Pay Hub, City, Chat, Explore) with Riverpod, GoRouter, trilingual localization (EN, SI, TA), and 14 golden visual regression tests." },
        { name: "Admin Portal (React 18 + TypeScript + Vite)", details: "Central Bank (CBSL) & LankaPay CEFTS Simulated Network Dashboard with live sync, adapter status, reconciliation queues, and dynamic feature toggles." },
        { name: "Backend Core (Spring Boot 3.3 / Java 21 LTS)", details: "Modular financial monolith with proxy registry, P2P transfer processor, LankaQR engine, standing orders, split bills, and resilient Home aggregator (< 500ms SLA)." },
        { name: "Security & Governance Layer", details: "AES-GCM encryption for bank accounts, BCrypt PIN verification, Bucket4j rate limiting, append-only immutable audit logs, and automated PII redaction." },
      ],
    },
    features: [
      "Privacy-Preserving Proxy Payment Registry (Mobile-to-Account Mapping with Masked Names)",
      "Multi-Bank Dynamic Routing (Link Bank A, B, C; Switch Default Receiving Bank)",
      "EMVCo / LankaQR Dynamic QR Generation & Decoding with TTL Expiration",
      "Unified Pay Hub (Send P2P, Scan LankaQR, Utility Bills, Split Bill, Standing Orders)",
      "Resilient Home Aggregator with Under-500ms SLA & Section Timeout Isolation",
      "Google Gemini AI Customer Assistant with Automatic PII & Card-Data Redaction",
      "5-Tab Super-App Experience with English, Sinhala, and Tamil Localization",
      "React 18 Admin Back-Office Portal with Live CEFTS Network Sync & Fraud Alerts",
      "547+ Automated Tests (318+ Spring Boot / JUnit 5 Tests + 229 Flutter Tests)",
    ],
    technologies: [
      { name: "Java 21 LTS" },
      { name: "Spring Boot 3.3" },
      { name: "Flutter 3.22+" },
      { name: "Dart 3.4+" },
      { name: "React 18" },
      { name: "TypeScript" },
      { name: "Google Gemini AI" },
      { name: "Cloud Firestore" },
      { name: "LankaQR / EMVCo" },
      { name: "AES-GCM & BCrypt" },
      { name: "Riverpod & GoRouter" },
      { name: "JUnit 5 & Mockito" },
    ],
    workflow: [
      {
        step: 1,
        title: "Proxy Identifier Resolution",
        description: "Sender inputs recipient's verified mobile number; system resolves proxy mapping to masked name (e.g. Nimal P.) without exposing raw account numbers.",
        iconName: "Search",
      },
      {
        step: 2,
        title: "Multi-Bank Account Selection",
        description: "Sender selects debit account from linked commercial banks and inputs transfer amount in minor units (cents).",
        iconName: "CreditCard",
      },
      {
        step: 3,
        title: "LankaQR & P2P Execution",
        description: "Payment executes with idempotent transaction token, embedded HMAC signature, and real-time balance updates.",
        iconName: "QrCode",
      },
      {
        step: 4,
        title: "Loyalty Points & Audit Commitment",
        description: "Successful transfer increments loyalty points ledger and appends immutable audit event store entry.",
        iconName: "CheckCircle",
      },
      {
        step: 5,
        title: "CEFTS Clearing & Admin Sync",
        description: "Back-office operations portal monitors live CEFTS clearing status, adapter health, and reconciliation queues.",
        iconName: "Building2",
      },
    ],
    challenges: [
      "Decoupling sensitive financial account numbers while preventing phone directory scraping: Solved with a privacy-preserving proxy registry displaying masked recipient initials only.",
      "Eliminating floating-point financial precision errors: Enforced strict integer minor-unit calculations (cents) across all transfers, utility bill inquiries, and split expenses.",
      "Achieving under-500ms Home aggregator SLA under concurrent load: Engineered multi-threaded Section Timeout Isolation (CompletableFuture.allOf) so individual module slowdowns never crash the mobile dashboard.",
      "Managing multi-platform security compliance across Flutter, React, and Spring Boot: Integrated unified CI/CD quality gates running OWASP Dependency-Check, Gitleaks, and LUHN card scans.",
    ],
    myContribution:
      "Conceived, architected, and engineered the end-to-end LankaPay ID platform: developed the modular Spring Boot 3.3 / Java 21 backend with AES-GCM encryption, Bucket4j rate limiting, and minor-unit financial precision; designed and implemented the 5-tab Flutter Super-App (Riverpod, GoRouter, 3-language localization); built the React 18 / TypeScript admin back-office portal; authored 547+ automated tests across backend and mobile.",
    resultsAndLessons:
      "Engineered as a comprehensive national payment prototype adhering to Central Bank of Sri Lanka (CBSL) and LankaClear specifications. Validated with 547+ automated tests (318+ Spring Boot tests and 229 Flutter tests including 14 golden visual regression tests) and a unified CI/CD quality gate with OWASP Dependency-Check and Gitleaks security scanning.",
    thumbnailUrl: "/projects/lankapay/admin-dashboard.png",
    screenshots: [
      "/projects/lankapay/admin-dashboard.png",
      "/projects/lankapay/mobile-payhub.png",
      "/projects/lankapay/mobile-home.png",
      "/projects/lankapay/mobile-explore.png",
    ],
    gallery: [
      {
        url: "/projects/lankapay/admin-dashboard.png",
        tag: "REACT 18 ADMIN PORTAL",
        title: "Central Bank & CEFTS Network Operations Dashboard",
        description:
          "Back-office operations portal for live CEFTS sync, participating bank adapter health monitoring, uncertain reconciliation queues, and dynamic feature flag toggles.",
        aspect: "landscape",
      },
      {
        url: "/projects/lankapay/mobile-payhub.png",
        tag: "FLUTTER SUPER-APP // PAY HUB",
        title: "Unified Payments Suite & LankaQR Engine",
        description:
          "Mobile payment hub supporting instant P2P phone transfers, dynamic LankaQR scanning/display, utility bill settlement, standing orders, and social bill splits.",
        aspect: "portrait",
      },
      {
        url: "/projects/lankapay/mobile-home.png",
        tag: "FLUTTER SUPER-APP // HOME",
        title: "Lifestyle Banking Hub & Interactive Stories",
        description:
          "Personalized dashboard with authenticated greeting, interactive Stories carousel with deep links, spending breakdown, simulated loyalty points, and quick shortcuts.",
        aspect: "portrait",
      },
      {
        url: "/projects/lankapay/mobile-explore.png",
        tag: "FLUTTER SUPER-APP // EXPLORE",
        title: "Accounts, Cards & Savings Goals Explorer",
        description:
          "Financial products discovery hub for managing multi-bank account links, virtual cards, simulated target savings ledgers, and statement PDF downloads.",
        aspect: "portrait",
      },
    ],
    deviceType: "desktop",
    liveUrl: null, // Simulated educational FinTech prototype
    githubUrl: "https://github.com/chathuranga00/Lanka-Pay.git",
    announcementUrl: "https://lnkd.in/p/gvx75JQc",
  },
];
