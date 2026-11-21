import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  X,
  Send,
  Bot,
  User,
} from 'lucide-react';
import { profileData } from '@/data/profile';
import { projectsData } from '@/data/projects';
import { skillsCategories } from '@/data/skills';
import { researchInterests } from '@/data/research';
import { cn } from '@/utils/cn';

interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  timestamp: string;
}

const SUGGESTED_QUESTIONS = [
  "What technologies does Chathuranga specialize in?",
  "Tell me about the AttendX project.",
  "What is EduPulse?",
  "What is his educational background?",
  "How can I contact him?",
];

// Offline knowledge engine built ONLY from verified portfolio data
function generateAssistantReply(query: string): string {
  const q = query.toLowerCase().trim();

  // 1. Technologies & Skills
  if (
    q.includes('skill') ||
    q.includes('technolog') ||
    q.includes('stack') ||
    q.includes('tools') ||
    q.includes('specialize')
  ) {
    const categoriesList = skillsCategories
      .map((c) => `${c.title}: ${c.skills.map((s) => s.name).join(', ')}`)
      .join(' | ');
    return `Chathuranga's technical stack spans six core areas:\n\n• ${categoriesList}.\n\nHe emphasizes clean architecture, responsive ergonomics, and end-to-end full-stack development.`;
  }

  // 2. LabAttend
  if (q.includes('labattend') || q.includes('attendx') || q.includes('attendance') || q.includes('qr')) {
    const labattend = projectsData.find((p) => p.slug === 'labattend' || p.slug === 'attendx');
    if (labattend) {
      return `LabAttend is a QR-based lab attendance platform for NSBM Green University where Chathuranga served as sole developer across design, backend, frontend, database, and deployment. Built with Spring Boot (Java), dual React SPAs (Staff Console & Student PWA), and PostgreSQL, it records attendance with a single phone camera scan, detects cross-group visits, features role-based access control, and exports PDF, Excel, and CSV reports.`;
    }
  }

  // 3. EduPulse
  if (q.includes('edupulse') || q.includes('learning') || q.includes('a/l') || q.includes('advanced level') || q.includes('deepseek')) {
    const edupulse = projectsData.find((p) => p.slug === 'edupulse');
    if (edupulse) {
      return `EduPulse is an AI-powered learning platform designed for Advanced Level (A/L) students across Science, Commerce, and Arts. Built with a React web client on Netlify and a Flutter mobile app, it leverages DeepSeek AI via NVIDIA NIM and Supabase PostgreSQL for automated model paper generation across 126+ topics, intelligent study planning, and contextual PDF analysis.`;
    }
  }

  // 4. Fitness Sharks
  if (q.includes('fitness') || q.includes('sharks') || q.includes('gym')) {
    return `Fitness Sharks is a collaborative full-stack web application developed at NSBM Green University using React and Java Spring Boot. Chathuranga worked as the Backend Developer engineering secure REST APIs, database management, and frontend-backend integration to support gym tours, membership tier comparisons, and workout tracking.`;
  }

  // 5. LankaPay ID
  if (
    q.includes('lankapay') ||
    q.includes('lanka-pay') ||
    q.includes('payment') ||
    q.includes('cefts') ||
    q.includes('lankaqr') ||
    q.includes('fintech') ||
    q.includes('banking')
  ) {
    const lankapay = projectsData.find((p) => p.slug === 'lankapay');
    if (lankapay) {
      return `LankaPay ID is a national payment identifier and digital banking super-app platform combining a Java 21 / Spring Boot 3.3 modular monolith, a 5-tab Flutter 3.22+ Super-App, and a React 18 back-office portal. It features a proxy identifier registry, EMVCo LankaQR payment engine, AES-GCM credential encryption, BCrypt PIN hashing, minor-unit financial precision (cents/sats), and 547+ automated tests (318+ Spring Boot and 229 Flutter tests).`;
    }
  }

  // 6. Education
  if (q.includes('education') || q.includes('degree') || q.includes('university') || q.includes('nsbm') || q.includes('school') || q.includes('background')) {
    return `Chathuranga is pursuing a ${profileData.education.degree} at ${profileData.education.institution}, based in ${profileData.education.location}. His academic progression focuses on software engineering, computational algorithms, and system design.`;
  }

  // 6. Contact & Socials
  if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach') || q.includes('touch') || q.includes('phone')) {
    return `You can reach out to Chathuranga directly through the contact form, by email at ${profileData.socials.email.url.replace('mailto:', '')} (academic: ${profileData.academicEmail}), or by phone at ${profileData.phone}. You can also connect on LinkedIn at ${profileData.socials.linkedin.url} and view his code on GitHub at ${profileData.socials.github.url}.`;
  }

  // 7. Research Interests & Authored Paper
  if (q.includes('research') || q.includes('security') || q.includes('crypto') || q.includes('privacy') || q.includes('paper') || q.includes('iot')) {
    const otherTopics = researchInterests
      .filter((r) => r.id !== 'lightweight-cryptography-iot')
      .map((r) => r.title)
      .join(', ');
    return `Chathuranga has authored an academic research paper titled "Lightweight Cryptography for Resource-constrained IoT Devices", conducting a systematic review across 34 peer-reviewed studies on NIST SP 800-232 (Ascon), microcontroller energy evaluation, and 8 critical deployment gaps under Dr. Pabudi Abeyrathne at NSBM Green University. You can view or download the full PDF directly in the Research section! Other active study interests include: ${otherTopics}.`;
  }

  // 8. Location / Country
  if (q.includes('location') || q.includes('where') || q.includes('country') || q.includes('sri lanka')) {
    return `Chathuranga is based in Sri Lanka and is available for both local and global opportunities.`;
  }

  // 9. Honest Fallback
  return `I don't have verified details on that specific topic in my portfolio knowledge base. For specific inquiries or opportunities, please contact Chathuranga directly via the contact form below or email him at ${profileData.socials.email.url.replace('mailto:', '')}!`;
}

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      text: `Hi! I'm the portfolio assistant. Ask me about Chathuranga's skills, projects, technologies or professional interests.`,
      timestamp: 'Just now',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (userText: string) => {
    const text = userText.trim();
    if (!text) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputVal('');
    setIsTyping(true);

    // Simulated assistant latency for natural conversation
    setTimeout(() => {
      const replyText = generateAssistantReply(text);
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <motion.button
          type="button"
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
          className="p-3.5 sm:p-4 rounded-full bg-accent text-[#090B0A] shadow-glow-accent hover:shadow-[0_0_35px_-5px_rgba(182,255,74,0.5)] transition-all flex items-center gap-2.5 font-display font-semibold select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Open portfolio AI assistant"
        >
          <Bot size={22} className="shrink-0" />
          <span className="hidden sm:inline text-xs font-mono uppercase tracking-wider pr-1">
            Ask Assistant
          </span>
          <span className="h-2 w-2 rounded-full bg-[#090B0A] animate-pulse" />
        </motion.button>
      )}

      {/* Chat Dialog Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="w-[92vw] sm:w-[400px] h-[520px] max-h-[85vh] rounded-3xl bg-card border border-border shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
            role="dialog"
            aria-label="Portfolio AI Assistant"
          >
            {/* Chat Header */}
            <div className="p-4 bg-bg-secondary border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-accent-muted text-accent border border-accent/20">
                  <Bot size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold font-display text-copy">
                    Portfolio Assistant
                  </h4>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-copy-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>Verified Knowledge Base</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl border border-border text-copy-secondary hover:text-copy hover:border-accent/40 transition-colors"
                aria-label="Close assistant"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Messages Feed */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs sm:text-sm">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    'flex items-start gap-2 max-w-[88%]',
                    msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                  )}
                >
                  <div
                    className={cn(
                      'p-1.5 rounded-lg shrink-0 mt-0.5',
                      msg.sender === 'user'
                        ? 'bg-accent text-[#090B0A]'
                        : 'bg-card border border-border text-accent'
                    )}
                  >
                    {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>

                  <div
                    className={cn(
                      'p-3.5 rounded-2xl leading-relaxed whitespace-pre-line',
                      msg.sender === 'user'
                        ? 'bg-accent text-[#090B0A] font-medium rounded-tr-none'
                        : 'bg-bg border border-border text-copy rounded-tl-none'
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-copy-muted text-xs font-mono py-1">
                  <Bot size={14} className="text-accent animate-pulse" />
                  <span>Assistant searching verified data...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Question Chips (Only show when message count is low) */}
            {messages.length < 5 && (
              <div className="px-4 py-2 border-t border-border/60 bg-bg/50">
                <span className="text-[10px] font-mono uppercase tracking-wider text-copy-muted block mb-1.5">
                  Suggested queries:
                </span>
                <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {SUGGESTED_QUESTIONS.slice(0, 3).map((sq) => (
                    <button
                      key={sq}
                      type="button"
                      onClick={() => handleSend(sq)}
                      className="px-2.5 py-1 rounded-lg bg-card border border-border text-[11px] text-copy-secondary hover:text-accent hover:border-accent/40 whitespace-nowrap transition-colors"
                    >
                      {sq}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <div className="p-3 bg-bg-secondary border-t border-border">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputVal);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-card border border-border text-xs sm:text-sm text-copy placeholder:text-copy-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim() || isTyping}
                  className="p-2.5 rounded-xl bg-accent text-[#090B0A] hover:bg-accent-hover transition-colors disabled:opacity-40 focus-visible:outline-none"
                  aria-label="Send message to assistant"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
