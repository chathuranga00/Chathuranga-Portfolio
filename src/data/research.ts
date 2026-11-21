export interface ResearchInterest {
  id: string;
  title: string;
  area: string;
  abstract: string;
  personalContribution: string;
  publicationStatus: 'Authored Research Paper' | 'Interest area' | 'Not published';
  pdfUrl?: string | null;
  iconName?: string;
  supervisor?: string;
  institution?: string;
  module?: string;
  keywords?: string[];
}

export const researchInterests: ResearchInterest[] = [
  {
    id: "lightweight-cryptography-iot",
    title: "Lightweight Cryptography for Resource-constrained IoT Devices",
    area: "Embedded Security, NIST SP 800-232 & Constrained Cryptography",
    abstract:
      "A systematic literature review examining 34 peer-reviewed studies (2017–2026) alongside NIST, ISO/IEC, and IETF standards. Evaluates the industry consensus on Ascon (NIST SP 800-232), analyzes hardware efficiency (3.6–17 kGE, 417 Gbit/J), and identifies 8 critical research gaps across RFC 7228 Class 0–2 microcontrollers, side-channel attack countermeasures, nonce discipline, and post-quantum key establishment offload.",
    personalContribution: "Sole author. PRISMA-guided review of 34 IEEE Xplore papers, 4-theme taxonomy, cross-study synthesis of 10 NIST LWC finalists, and definition of 8 research directions (G1–G8).",
    publicationStatus: "Authored Research Paper",
    pdfUrl: "/research/Lightweight-Cryptography-for-IoT.pdf",
    iconName: "Cpu",
    institution: "NSBM Green University",
    module: "CS302.3 Cryptography",
    supervisor: "Dr. Pabudi Abeyrathne",
    keywords: [
      "Lightweight Cryptography",
      "Internet of Things",
      "Ascon",
      "NIST SP 800-232",
      "PRISMA Systematic Review",
      "Side-Channel Attacks",
      "Post-Quantum Cryptography",
    ],
  },
  {
    id: "privacy-enhancing-tech",
    title: "Privacy Enhancing Technologies",
    area: "Data Privacy & Cryptographic Protocols",
    abstract:
      "Investigating cryptographic and algorithmic mechanisms that protect user privacy, minimize unnecessary data exposure, and enable verifiable computations while preserving individual confidentiality.",
    personalContribution: "Active study area & literature review",
    publicationStatus: "Interest area",
    pdfUrl: null,
    iconName: "ShieldAlert",
    keywords: ["Zero-Knowledge Proofs", "Differential Privacy", "Homomorphic Encryption"],
  },
  {
    id: "information-security",
    title: "Information Security",
    area: "System Defense & Access Control",
    abstract:
      "Exploring principles of zero-trust architecture, threat modeling, secure credential exchange, and vulnerability mitigation across modern multi-tier web applications and distributed networks.",
    personalContribution: "Active study area & experimental review",
    publicationStatus: "Interest area",
    pdfUrl: null,
    iconName: "Lock",
    keywords: ["Zero-Trust", "Threat Modeling", "Access Control"],
  },
  {
    id: "artificial-intelligence",
    title: "Artificial Intelligence",
    area: "Machine Learning & Computational Reasoning",
    abstract:
      "Investigating the practical deployment of intelligent models, contextual educational reasoning systems, and automated decision-support frameworks to enhance user learning curves and system adaptability.",
    personalContribution: "Applied exploration in university platforms (EduPulse)",
    publicationStatus: "Interest area",
    pdfUrl: null,
    iconName: "BrainCircuit",
    keywords: ["Adaptive Learning", "LLM Reasoning", "Recommendation Engines"],
  },
  {
    id: "secure-software-development",
    title: "Secure Software Development",
    area: "Application Security & DevSecOps",
    abstract:
      "Examining secure coding practices, static code analysis patterns, automated input sanitization, and defensive API architectures to prevent vulnerabilities before reaching production environments.",
    personalContribution: "Implementation in web projects (AttendX, Clean-Spot)",
    publicationStatus: "Interest area",
    pdfUrl: null,
    iconName: "Code2",
    keywords: ["OWASP Top 10", "DevSecOps", "Input Validation"],
  },
];
