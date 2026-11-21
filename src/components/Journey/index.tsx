import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  GraduationCap,
  Code2,
  GitMerge,
  QrCode,
  Sparkles,
  Palette,
  Terminal,
  CreditCard,
  Milestone as MilestoneIcon,
} from 'lucide-react';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { journeyMilestones, type Milestone } from '@/data/journey';

export const Journey: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const getMilestoneIcon = (iconName?: string) => {
    const props = { size: 18, className: 'text-accent' };
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap {...props} />;
      case 'Code2':
        return <Code2 {...props} />;
      case 'GitMerge':
        return <GitMerge {...props} />;
      case 'QrCode':
        return <QrCode {...props} />;
      case 'Sparkles':
        return <Sparkles {...props} />;
      case 'Palette':
        return <Palette {...props} />;
      case 'Terminal':
        return <Terminal {...props} />;
      case 'CreditCard':
        return <CreditCard {...props} />;
      default:
        return <MilestoneIcon {...props} />;
    }
  };

  return (
    <section id="journey" className="py-24 sm:py-32 bg-bg relative overflow-hidden">
      {/* Background Subtle Accent Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--accent) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <Container size="xl" className="relative z-10">
        <SectionHeading
          label="Evolutionary Path"
          title="My Journey So Far."
          description="A sequential progression reflecting academic immersion at NSBM Green University, project-driven learning, engineering breakthroughs, and disciplined skill acquisition."
        />

        {/* Vertical Timeline Container */}
        <div className="relative max-w-4xl mx-auto mt-12 sm:mt-16 pl-4 sm:pl-8 lg:pl-10">
          {/* Continuous Vertical Connecting Line */}
          <div className="absolute top-4 bottom-8 left-[23px] sm:left-[39px] lg:left-[47px] w-[2px] bg-border" />

          {/* Animated Glow Segment Overlay */}
          <div className="absolute top-4 bottom-8 left-[23px] sm:left-[39px] lg:left-[47px] w-[2px] bg-gradient-to-b from-accent via-accent/40 to-transparent pointer-events-none" />

          {/* Milestones Stack */}
          <div className="space-y-10 sm:space-y-12">
            {journeyMilestones.map((milestone: Milestone, index: number) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.5,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                  ease: 'easeOut',
                }}
                className="relative flex items-start gap-5 sm:gap-8 group"
              >
                {/* Timeline Circular Node Marker */}
                <div className="relative z-10 shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-card border-2 border-border group-hover:border-accent transition-colors flex items-center justify-center shadow-card-subtle">
                  <span className="font-mono text-xs sm:text-sm font-bold text-copy group-hover:text-accent transition-colors">
                    {milestone.stepNumber}
                  </span>
                  {/* Subtle Electric Lime Pulsing Core Indicator */}
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-accent/30 group-hover:bg-accent group-hover:animate-ping transition-all" />
                </div>

                {/* Milestone Detail Card */}
                <div className="flex-1">
                  <Card
                    variant="interactive"
                    padding="md"
                    className="relative group-hover:border-accent/40 transition-all duration-300"
                  >
                    {/* Header: Category & Optional Date (Only rendered if date exists!) */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-card-hover border border-border">
                          {getMilestoneIcon(milestone.iconName)}
                        </div>
                        <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                          {milestone.category}
                        </span>
                      </div>

                      {/* NO date rendered unless provided in data! */}
                      {milestone.date && (
                        <Badge variant="outline" size="sm">
                          {milestone.date}
                        </Badge>
                      )}
                    </div>

                    {/* Milestone Title */}
                    <h3 className="text-lg sm:text-xl font-bold font-display text-copy group-hover:text-accent transition-colors mb-2">
                      {milestone.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-copy-secondary leading-relaxed mb-4">
                      {milestone.description}
                    </p>

                    {/* Footer Milestone Highlight */}
                    {milestone.highlight && (
                      <div className="pt-3 border-t border-border/80 flex items-center justify-between text-[11px] font-mono text-copy-muted">
                        <span className="text-copy-secondary">{milestone.highlight}</span>
                        <span className="text-accent">PHASE ACCOMPLISHED</span>
                      </div>
                    )}
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
