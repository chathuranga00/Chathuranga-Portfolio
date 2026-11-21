import React from 'react';
import { cn } from '@/utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'outline' | 'subtle';
  size?: 'sm' | 'md';
  hasDot?: boolean;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  hasDot = false,
  className,
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center gap-1.5 font-mono uppercase tracking-wider font-medium rounded-full transition-colors';

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5',
    md: 'text-xs px-3 py-1',
  };

  const variantStyles = {
    default: 'bg-card text-copy-secondary border border-border',
    accent: 'bg-accent-muted text-accent border border-accent/20',
    outline: 'border border-border text-copy-secondary bg-transparent hover:border-accent/40',
    subtle: 'bg-bg-secondary text-copy-secondary border border-border-subtle',
  };

  return (
    <span
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {hasDot && (
        <span
          className={cn(
            'inline-block h-1.5 w-1.5 rounded-full',
            variant === 'accent' ? 'bg-accent animate-pulse' : 'bg-copy-muted'
          )}
        />
      )}
      {children}
    </span>
  );
};
