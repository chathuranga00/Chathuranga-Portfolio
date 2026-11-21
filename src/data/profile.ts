export interface SocialLink {
  name: string;
  url: string;
  label: string;
  isPlaceholder: boolean;
}

export interface InfoCard {
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface ProfileData {
  name: string;
  fullName: string;
  displayName: string;
  displayNameLetters: string[];
  firstName: string;
  lastName: string;
  monogram: string;
  heroLabel: string;
  heroGreeting: string;
  tagline: string;
  title: string;
  headline: string;
  heroDescription: string;
  location: string;
  phone: string;
  phoneRaw: string;
  academicEmail: string;
  roleStatus: string;
  education: {
    degree: string;
    institution: string;
    location: string;
    status: string;
  };
  aboutHeading: string;
  aboutIntro: string[];
  developmentPhilosophy: string;
  infoCards: InfoCard[];
  avatarUrl: string;
  resumeUrl: string;
  socials: {
    github: SocialLink;
    linkedin: SocialLink;
    email: SocialLink;
    fiverr: SocialLink;
  };
  githubUsername: string;
  featuredRepos: string[];
  status: {
    availableForHire: boolean;
    availabilityText: string;
  };
}

const DISPLAY_NAME = "Chathuranga Sandaruwan";

export const profileData: ProfileData = {
  name: "CHATHURANGA.",
  fullName: DISPLAY_NAME,
  displayName: DISPLAY_NAME,
  displayNameLetters: Array.from(DISPLAY_NAME),
  firstName: "CHATHURANGA.",
  lastName: "SANDARUWAN",
  monogram: "CS",
  heroLabel: "HELLO, I'M CHATHURANGA SANDARUWAN",
  heroGreeting: "HELLO, I'M",
  tagline: "Software Developer | Full-Stack Developer",
  title: "Software Developer & Full-Stack Developer",
  headline: "Building Digital Experiences That Make a Difference.",
  heroDescription:
    "I design and develop modern web applications, intelligent software solutions and intuitive digital experiences.",
  location: "Sri Lanka",
  phone: "+94 76 835 3650",
  phoneRaw: "0768353650",
  academicEmail: "hacsandaruwan@students.nsbm.ac.lk",
  roleStatus: "Computer Science Undergraduate",
  education: {
    degree: "BSc in Computer Science",
    institution: "NSBM Green University",
    location: "Sri Lanka",
    status: "Undergraduate",
  },
  aboutHeading: "More Than Just Code.",
  aboutIntro: [
    "I am Chathuranga Sandaruwan, a passionate software developer dedicated to crafting robust, high-performance web applications, intelligent software solutions, and intuitive digital interfaces.",
    "Specializing in modern full-stack engineering with an eye for refined typography, responsive design, and fluid user experiences, I bridge technical architecture with thoughtful design.",
  ],
  developmentPhilosophy:
    "I believe great software is rooted in clarity, disciplined code structure, and respectful user experiences. Every line of code should serve a tangible purpose, maintaining elegance in simplicity and resilience under load.",
  infoCards: [
    {
      title: "Education",
      subtitle: "BSc in Computer Science",
      description: "NSBM Green University, Sri Lanka",
      iconName: "GraduationCap",
    },
    {
      title: "Main Focus",
      subtitle: "Full-Stack Development",
      description: "Modern web architecture, component design, and end-to-end reliability",
      iconName: "Layers",
    },
    {
      title: "Creative Interest",
      subtitle: "UI/UX & Minimalism",
      description: "Editorial typography, asymmetric bento layouts, and fluid micro-interactions",
      iconName: "Sparkles",
    },
    {
      title: "Current Direction",
      subtitle: "System Engineering",
      description: "Scalable backend services, cloud deployments, and resilient APIs",
      iconName: "Compass",
    },
  ],
  avatarUrl: "/images/profile.png",
  resumeUrl: "/resume.pdf",
  socials: {
    github: {
      name: "GitHub",
      url: "https://github.com/chathuranga00",
      label: "GitHub Profile",
      isPlaceholder: false,
    },
    linkedin: {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/chathuranga-sandaruwan-44b054365",
      label: "LinkedIn Profile",
      isPlaceholder: false,
    },
    email: {
      name: "Email",
      url: "mailto:chathurangasadaruwan076@gmail.com",
      label: "chathurangasadaruwan076@gmail.com",
      isPlaceholder: false,
    },
    fiverr: {
      name: "Fiverr",
      url: "https://fiverr.com/placeholder-username",
      label: "Fiverr Freelance Profile [Placeholder URL]",
      isPlaceholder: true,
    },
  },
  githubUsername: "chathuranga00",
  // Configure the exact repository names you want featured in the GitHub section
  featuredRepos: ["EduPulse", "Fitness-sharks", "attendx", "Lanka-Pay"],
  status: {
    availableForHire: true,
    availabilityText: "Available for Opportunities",
  },
};
