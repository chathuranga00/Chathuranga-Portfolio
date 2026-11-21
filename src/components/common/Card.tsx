import React from 'react';
import { cn } from '@/utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'interactive' | 'outline';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  className,
  children,
  ...props
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-4 sm:p-5',
    md: 'p-6 sm:p-8',
    lg: 'p-8 sm:p-10 lg:p-12',
  };

  const variantStyles = {
    default: 'bg-card border border-border shadow-card-subtle',
    glass: 'glassmorphism shadow-card-subtle',
    interactive:
      'bg-card border border-border shadow-card-subtle transition-all duration-300 hover:border-accent/40 hover:bg-card-hover hover:shadow-glow-accent/20 cursor-pointer',
    outline: 'bg-transparent border border-border hover:border-border/80',
  };

  return (
    <div
      className={cn(
        'rounded-2xl transition-colors duration-200 relative overflow-hidden',
        paddingStyles[padding],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
