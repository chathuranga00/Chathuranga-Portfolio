import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ShieldAlert,
  Lock,
  Cpu,
  BrainCircuit,
  Code2,
  BookmarkCheck,
  Compass,
  FileText,
  Download,
  ExternalLink,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { researchInterests, type ResearchInterest } from '@/data/research';

export const Research: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const getInterestIcon = (iconName?: string) => {
    const props = { size: 22, className: 'text-accent' };
    switch (iconName) {
      case 'ShieldAlert':
        return <ShieldAlert {...props} />;
      case 'Lock':
        return <Lock {...props} />;
      case 'Cpu':
        return <Cpu {...props} />;
      case 'BrainCircuit':
        return <BrainCircuit {...props} />;
      case 'Code2':
        return <Code2 {...props} />;
      default:
        return <Compass {...props} />;
    }
  };

  return (
    <section id="research" className="py-24 sm:py-32 bg-bg-secondary/40 border-y border-border/60 relative">
      <Container size="xl">
        <SectionHeading
          label="Academic Research & Foundations"
          title="Exploring Technology Beyond Development."
          description="Investigating foundational security principles, cryptographic architectures, and algorithmic intelligence. Featuring an authored academic review on Lightweight Cryptography alongside active theoretical research interests."
        />

        {/* Research Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {researchInterests.map((item: ResearchInterest, index: number) => {
            const isAuthored = item.publicationStatus === 'Authored Research Paper';
            // Give the authored paper a wider, primary spotlight card
            const colSpanClass = isAuthored
              ? 'md:col-span-2 lg:col-span-2'
              : 'col-span-1';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.5,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                  ease: 'easeOut',
                }}
                className={colSpanClass}
              >
                <Card
                  variant={isAuthored ? 'default' : 'interactive'}
                  padding="lg"
                  className={`h-full flex flex-col justify-between group transition-all duration-300 ${
                    isAuthored
                      ? 'border-accent/40 bg-card/90 shadow-glow-sm hover:border-accent'
                      : ''
                  }`}
                >
                  <div>
                    {/* Top Meta Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-3 rounded-2xl border transition-colors ${
                            isAuthored
                              ? 'bg-accent/10 border-accent/30 text-accent'
                              : 'bg-card-hover border-border group-hover:border-accent/40'
                          }`}
                        >
                          {getInterestIcon(item.iconName)}
                        </div>

                        {item.institution && (
                          <div className="text-xs font-mono text-copy-secondary">
                            <span className="font-semibold text-copy block">{item.institution}</span>
                            {item.module && <span className="text-[11px] text-copy-muted">{item.module}</span>}
                          </div>
                        )}
                      </div>

                      <Badge
                        variant={isAuthored ? 'accent' : 'outline'}
                        size="sm"
                        hasDot={isAuthored}
                      >
                        {item.publicationStatus}
                      </Badge>
                    </div>

                    {/* Research Area Tag */}
                    <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold block mb-2">
                      {item.area}
                    </span>

                    {/* Title */}
                    <h3
                      className={`font-bold font-display text-copy mb-3 ${
                        isAuthored
                          ? 'text-2xl sm:text-3xl group-hover:text-accent transition-colors'
                          : 'text-xl sm:text-2xl group-hover:text-accent transition-colors'
                      }`}
                    >
                      {item.title}
                    </h3>

                    {/* Supervisor (if present) */}
                    {item.supervisor && (
                      <div className="flex items-center gap-2 mb-4 text-xs font-mono text-copy-secondary">
                        <GraduationCap size={14} className="text-accent shrink-0" />
                        <span>Academic Reviewer / Supervisor: <strong className="text-copy">{item.supervisor}</strong></span>
                      </div>
                    )}

                    {/* Abstract / Scope Summary */}
                    <p className="text-xs sm:text-sm text-copy-secondary leading-relaxed mb-6">
                      {item.abstract}
                    </p>

                    {/* Keywords pills */}
                    {item.keywords && item.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {item.keywords.map((kw) => (
                          <span
                            key={kw}
                            className="px-2.5 py-1 rounded-md bg-bg text-[11px] font-mono text-copy-secondary border border-border"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Bottom Meta & Actions */}
                  <div className="pt-4 border-t border-border/80 space-y-4">
                    {/* Author Contribution Summary */}
                    <div className="text-xs">
                      <span className="font-mono text-copy-muted block mb-1">Author Contribution:</span>
                      <p className="text-xs text-copy font-medium leading-relaxed bg-bg/50 p-2.5 rounded-xl border border-border/60">
                        {item.personalContribution}
                      </p>
                    </div>

                    {/* Action Bar for Authored Paper with PDF link */}
                    {item.pdfUrl ? (
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <Button
                          variant="primary"
                          size="sm"
                          href={item.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          iconLeft={<FileText size={14} />}
                          iconRight={<ExternalLink size={13} />}
                        >
                          View Research Paper
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          href={item.pdfUrl}
                          download="Lightweight-Cryptography-for-IoT.pdf"
                          iconLeft={<Download size={14} />}
                        >
                          Download PDF
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-[11px] font-mono text-copy-muted pt-1">
                        <div className="flex items-center gap-1.5 text-copy-secondary">
                          <BookmarkCheck size={13} className="text-accent" />
                          <span>Theoretical Study Direction</span>
                        </div>
                        <span className="text-accent group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Research Integrity Clarification Banner */}
        <div className="mt-12 p-5 rounded-2xl bg-card border border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-copy-secondary">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-accent shrink-0" />
            <span>
              Academic Integrity: The paper <em>&ldquo;Lightweight Cryptography for Resource-constrained IoT Devices&rdquo;</em> is an authored systematic literature review for academic coursework. Other cards represent active study domains and literature exploration.
            </span>
          </div>
          <Badge variant="outline" size="sm">
            VERIFIED ACADEMIC MANUSCRIPT
          </Badge>
        </div>
      </Container>
    </section>
  );
};

export default Research;
