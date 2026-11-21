import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Badge } from '@/components/common/Badge';
import { GithubIcon, LinkedinIcon } from '@/components/common/BrandIcons';
import { type Project } from '@/data/projects';
import { cn } from '@/utils/cn';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={shouldReduceMotion ? {} : { y: -5 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="h-full"
    >
      <div className="h-full flex flex-col justify-between rounded-3xl bg-card border border-border overflow-hidden transition-all duration-300 hover:border-accent/40 hover:bg-card-hover hover:shadow-[0_10px_30px_-10px_rgba(182,255,74,0.15)] group">
        <div>
          {/* Screenshot / Media Banner */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-bg-secondary border-b border-border overflow-hidden flex flex-col items-center justify-center text-center select-none">
            {project.thumbnailUrl ? (
              <>
                <img
                  src={project.thumbnailUrl}
                  alt={project.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-black/40 pointer-events-none" />
              </>
            ) : (
              <>
                {/* Background Geometric Grid Accent */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none group-hover:scale-105 transition-transform duration-700"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Placeholder Visual Centerpiece */}
                <div className="relative z-10 flex flex-col items-center gap-3 p-6">
                  <div className="p-3.5 rounded-2xl bg-card border border-border text-copy-muted group-hover:text-accent group-hover:border-accent/40 group-hover:scale-110 transition-all duration-300">
                    <ImageIcon size={30} />
                  </div>
                  <div className="space-y-1">
                    <Badge variant="outline" size="sm" hasDot className="text-[10px] bg-bg/80">
                      Screenshot coming soon
                    </Badge>
                    <p className="text-[11px] font-mono text-copy-muted">
                      Authentic asset in preparation
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Corner Decorative Tech Marks */}
            <div className="absolute top-3 left-3 text-[10px] font-mono text-copy-muted bg-bg/80 backdrop-blur-md px-2 py-0.5 rounded border border-border/60">
              SYS-PRJ // {project.number}
            </div>
            <div className="absolute top-3 right-3">
              <Badge variant="subtle" size="sm" className="bg-bg/80 backdrop-blur-md">
                {project.filterCategory}
              </Badge>
            </div>

            {/* Bottom Overlay Pill on Hover */}
            <div className="absolute bottom-3 left-3 right-3 py-1.5 px-3 rounded-lg bg-bg/85 backdrop-blur-sm border border-border/70 text-[10px] font-mono text-copy-muted flex justify-between items-center opacity-90 group-hover:opacity-100 transition-opacity">
              <span>CASE STUDY REF: {project.slug}</span>
              <span className="text-accent flex items-center gap-1">
                <Sparkles size={11} /> READY TO EXPLORE
              </span>
            </div>
          </div>

          {/* Card Body Content */}
          <div className="p-6 sm:p-7">
            {/* Category and Index */}
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="text-accent font-semibold">{project.category}</span>
              <span className="text-copy-muted">#{project.number}</span>
            </div>

            {/* Project Title */}
            <h3 className="text-xl sm:text-2xl font-bold font-display text-copy group-hover:text-accent transition-colors mb-3 leading-snug">
              <Link to={`/projects/${project.slug}`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md">
                {project.title}
              </Link>
            </h3>

            {/* Short Description */}
            <p className="text-sm text-copy-secondary leading-relaxed mb-6 line-clamp-3">
              {project.shortDescription}
            </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2">
              {project.technologies.map((t) => (
                <span
                  key={t.name}
                  className={cn(
                    'text-[11px] font-mono px-2.5 py-1 rounded-lg border transition-colors',
                    t.note
                      ? 'border-accent/30 bg-accent-muted/10 text-copy'
                      : 'border-border bg-bg text-copy-secondary group-hover:border-border/80'
                  )}
                  title={t.note ? `${t.name} (${t.note})` : t.name}
                >
                  {t.name}
                  {t.note && (
                    <span className="text-[9px] text-accent ml-1 font-sans">*</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Card Actions Footer */}
        <div className="p-6 sm:p-7 pt-0 border-t border-border/60 flex flex-wrap items-center justify-between gap-3 mt-4">
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-copy group-hover:text-accent transition-colors font-display"
          >
            <span>View Case Study</span>
            <ArrowUpRight
              size={16}
              className="text-accent transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />
          </Link>

          {/* Optional External Links (ONLY rendered when URL exists, no invented links) */}
          <div className="flex items-center gap-2">
            {project.announcementUrl && (
              <a
                href={project.announcementUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-bg border border-border text-copy-secondary hover:text-accent hover:border-accent/40 transition-colors"
                title="View Project Announcement on LinkedIn"
              >
                <LinkedinIcon size={15} />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-bg border border-border text-copy-secondary hover:text-accent hover:border-accent/40 transition-colors"
                title="View GitHub Repository"
              >
                <GithubIcon size={15} />
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-bg border border-border text-copy-secondary hover:text-accent hover:border-accent/40 transition-colors"
                title="Open Live Deployment"
              >
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
