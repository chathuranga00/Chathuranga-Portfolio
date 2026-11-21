import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  FolderGit2,
  ExternalLink,
  Star,
  GitFork,
  Calendar,
} from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { type ProcessedRepo } from '@/utils/github';

interface RepoCardProps {
  repo: ProcessedRepo;
}

export const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={shouldReduceMotion ? {} : { y: -5 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="h-full"
    >
      <Card
        variant="interactive"
        padding="lg"
        className="h-full flex flex-col justify-between group"
      >
        <div>
          {/* Top Meta: Icon + Stats */}
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 rounded-xl bg-card-hover border border-border group-hover:border-accent/40 group-hover:bg-accent-muted/10 transition-colors">
              <FolderGit2 size={20} className="text-accent" />
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-copy-muted">
              {repo.stars > 0 && (
                <span className="flex items-center gap-1 text-copy-secondary">
                  <Star size={13} className="text-accent" />
                  <span>{repo.stars}</span>
                </span>
              )}
              {repo.forks > 0 && (
                <span className="flex items-center gap-1 text-copy-secondary">
                  <GitFork size={13} />
                  <span>{repo.forks}</span>
                </span>
              )}
            </div>
          </div>

          {/* Repo Name */}
          <h3 className="text-lg sm:text-xl font-bold font-display text-copy group-hover:text-accent transition-colors mb-2 break-words">
            {repo.name}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-copy-secondary leading-relaxed mb-6 line-clamp-3">
            {repo.description}
          </p>

          {/* Languages Top 3 Tags */}
          {repo.languages.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {repo.languages.map((lang) => (
                <Badge key={lang} variant="subtle" size="sm" className="font-mono text-[10px]">
                  {lang}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Footer: Last Updated + View Source CTA */}
        <div className="pt-4 border-t border-border/80 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-copy-muted font-mono text-[11px]">
            <Calendar size={12} className="shrink-0" />
            <span>{repo.updatedAt}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            href={repo.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            iconRight={<ExternalLink size={13} />}
            className="text-xs"
          >
            View Source
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};
