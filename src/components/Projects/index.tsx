import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { SlidersHorizontal, Sparkles } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Badge } from '@/components/common/Badge';
import { ProjectCard } from './ProjectCard';
import { projectsData, type Project } from '@/data/projects';
import { cn } from '@/utils/cn';

type FilterType = 'All' | 'Education Tech' | 'AI' | 'Web' | 'FinTech';

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const shouldReduceMotion = useReducedMotion();

  const filterOptions: FilterType[] = ['All', 'Education Tech', 'AI', 'Web', 'FinTech'];

  const filteredProjects =
    activeFilter === 'All'
      ? projectsData
      : projectsData.filter((p) => p.filterCategory === activeFilter);

  return (
    <section id="projects" className="py-24 sm:py-32 bg-bg-secondary/30 border-y border-border/60 relative">
      <Container size="xl">
        <SectionHeading
          label="Featured Works"
          title="Selected Work. Real Problems. Practical Solutions."
          description="A curated compilation of full-stack systems, educational software, and AI-assisted platforms engineered for practical impact. Every project addresses concrete user pain points with clean architecture."
        />

        {/* Filter Chips Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12 sm:mb-16 pb-4 border-b border-border/80">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2 mr-2 text-xs font-mono uppercase text-copy-muted">
              <SlidersHorizontal size={14} className="text-accent" />
              <span>Category Filter:</span>
            </div>

            {filterOptions.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    'px-4 py-2 rounded-full text-xs font-mono tracking-wide transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                    isActive
                      ? 'bg-accent text-[#090B0A] font-semibold shadow-glow-accent'
                      : 'bg-card text-copy-secondary border border-border hover:border-accent/40 hover:text-copy'
                  )}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-copy-muted">
            <span className="text-copy font-bold">{filteredProjects.length}</span>
            <span>of {projectsData.length} Projects displayed</span>
          </div>
        </div>

        {/* Projects Responsive Grid (Single column on mobile, 2 col on tablet, 3 col on desktop) */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: Project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.35, ease: 'easeOut' }
                }
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Integrity Notice */}
        <div className="mt-14 p-5 rounded-2xl bg-card border border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-copy-secondary">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-accent shrink-0" />
            <span>
              All project metrics, technology stacks, and architectures are grounded strictly in implemented code.
            </span>
          </div>
          <Badge variant="outline" size="sm">
            NO FAKE STATS OR INVENTED METRICS
          </Badge>
        </div>
      </Container>
    </section>
  );
};
