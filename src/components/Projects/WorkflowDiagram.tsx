import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Lock,
  CalendarPlus,
  QrCode,
  CheckCircle,
  FileSpreadsheet,
  ArrowDown,
  Sparkles,
} from 'lucide-react';
import { type WorkflowStep } from '@/data/projects';
import { cn } from '@/utils/cn';

interface WorkflowDiagramProps {
  steps: WorkflowStep[];
  title?: string;
}

export const WorkflowDiagram: React.FC<WorkflowDiagramProps> = ({
  steps,
  title = 'System Operational Workflow',
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const shouldReduceMotion = useReducedMotion();

  const getStepIcon = (iconName?: string) => {
    const props = { size: 20, className: 'text-accent' };
    switch (iconName) {
      case 'Lock':
        return <Lock {...props} />;
      case 'CalendarPlus':
        return <CalendarPlus {...props} />;
      case 'QrCode':
        return <QrCode {...props} />;
      case 'CheckCircle':
        return <CheckCircle {...props} />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet {...props} />;
      default:
        return <Sparkles {...props} />;
    }
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border relative overflow-hidden shadow-card-subtle">
      {/* Background Matrix Pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--accent) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-border/80">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
            Interactive Architecture
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-copy mt-1">
            {title}
          </h3>
        </div>
        <div className="text-xs font-mono text-copy-muted bg-bg px-3 py-1.5 rounded-full border border-border flex items-center gap-2 w-fit">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span>5-Stage Lifecycle Execution</span>
        </div>
      </div>

      {/* Desktop / Large Screen Horizontal Workflow */}
      <div className="hidden lg:grid grid-cols-5 gap-3 items-stretch relative">
        {steps.map((step) => {
          const isActive = activeStep === step.step;
          const isPast = activeStep > step.step;

          return (
            <React.Fragment key={step.step}>
              <motion.div
                whileHover={shouldReduceMotion ? {} : { y: -3 }}
                onClick={() => setActiveStep(step.step)}
                className={cn(
                  'cursor-pointer rounded-2xl p-4 flex flex-col justify-between border transition-all duration-300 relative',
                  isActive
                    ? 'bg-card-hover border-accent shadow-glow-accent/30'
                    : 'bg-bg/60 border-border hover:border-border/80 hover:bg-card-hover/50'
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={cn(
                        'w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-colors',
                        isActive
                          ? 'bg-accent text-[#090B0A]'
                          : isPast
                          ? 'bg-accent-muted text-accent border border-accent/30'
                          : 'bg-card border border-border text-copy-muted'
                      )}
                    >
                      0{step.step}
                    </span>
                    <div className="p-1.5 rounded-lg bg-card border border-border/80">
                      {getStepIcon(step.iconName)}
                    </div>
                  </div>

                  <h4
                    className={cn(
                      'text-sm font-bold font-display mb-1.5 transition-colors',
                      isActive ? 'text-accent' : 'text-copy'
                    )}
                  >
                    {step.title}
                  </h4>

                  <p className="text-xs text-copy-secondary leading-relaxed line-clamp-3">
                    {step.description}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-border/60 flex items-center justify-between text-[10px] font-mono text-copy-muted">
                  <span>STAGE {step.step}/05</span>
                  {isActive && <span className="text-accent font-semibold">ACTIVE</span>}
                </div>
              </motion.div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile & Tablet Vertical Sequential Timeline */}
      <div className="lg:hidden space-y-4">
        {steps.map((step, idx) => {
          const isActive = activeStep === step.step;
          const isLast = idx === steps.length - 1;

          return (
            <div key={step.step} className="relative">
              <motion.div
                whileTap={shouldReduceMotion ? {} : { scale: 0.99 }}
                onClick={() => setActiveStep(step.step)}
                className={cn(
                  'rounded-2xl p-4 sm:p-5 border transition-all cursor-pointer',
                  isActive
                    ? 'bg-card-hover border-accent shadow-glow-accent/20'
                    : 'bg-bg/80 border-border hover:border-border/80'
                )}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={cn(
                      'shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-colors',
                      isActive
                        ? 'bg-accent text-[#090B0A]'
                        : 'bg-card border border-border text-copy-secondary'
                    )}
                  >
                    0{step.step}
                  </span>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4
                        className={cn(
                          'text-base font-bold font-display',
                          isActive ? 'text-accent' : 'text-copy'
                        )}
                      >
                        {step.title}
                      </h4>
                      <div className="p-1 rounded bg-card border border-border/80">
                        {getStepIcon(step.iconName)}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-copy-secondary leading-relaxed mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>

              {!isLast && (
                <div className="flex justify-center my-1.5 text-accent/60">
                  <ArrowDown size={16} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Workflow Footnote */}
      <div className="mt-6 pt-4 border-t border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-copy-muted font-mono">
        <span>Click stages to inspect each transition node</span>
        <span className="text-accent">Zero Manual Data Entry Barrier</span>
      </div>
    </div>
  );
};
