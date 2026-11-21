import React from 'react';
import { cn } from '@/utils/cn';
import { Container } from './Container';
import { SectionHeading } from './SectionHeading';

export interface SectionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  id?: string;
  label?: string;
  title?: string | React.ReactNode;
  description?: string;
  alignHeading?: 'left' | 'center';
  bgVariant?: 'default' | 'secondary';
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  id,
  label,
  title,
  description,
  alignHeading = 'left',
  bgVariant = 'default',
  containerSize = 'xl',
  className,
  children,
  ...props
}) => {
  const bgStyles = {
    default: 'bg-bg',
    secondary: 'bg-bg-secondary border-y border-border',
  };

  const hasHeading = Boolean(label || title || description);

  return (
    <section
      id={id}
      className={cn('py-20 sm:py-28 lg:py-32 relative', bgStyles[bgVariant], className)}
      {...props}
    >
      <Container size={containerSize}>
        {hasHeading && (
          <SectionHeading
            label={label}
            title={title || ''}
            description={description}
            align={alignHeading}
          />
        )}
        {children}
      </Container>
    </section>
  );
};
