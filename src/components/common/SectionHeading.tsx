import React from 'react';
import { cn } from '@/utils/cn';
import { Badge } from './Badge';

export interface SectionHeadingProps {
  label?: string;
  title: string | React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  label,
  title,
  description,
  align = 'left',
  className,
}) => {
  return (
    <div
      className={cn(
        'max-w-3xl mb-12 sm:mb-16',
        align === 'center' ? 'mx-auto text-center' : '',
        className
      )}
    >
      {label && (
        <div className="mb-4">
          <Badge variant="accent" hasDot>
            {label}
          </Badge>
        </div>
      )}
      <h2 className="text-display-lg sm:text-display-xl font-bold tracking-tight text-copy text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-copy-secondary leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
};
