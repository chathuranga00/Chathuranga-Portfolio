import React from 'react';
import { motion, useReducedMotion, type TargetAndTransition, type Transition } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  to?: string;
  target?: string;
  rel?: string;
  download?: string | boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  to,
  target,
  rel,
  download,
  iconLeft,
  iconRight,
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  const baseStyles =
    'relative inline-flex items-center justify-center font-medium font-sans tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 disabled:pointer-events-none rounded-xl select-none';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-accent text-[#090B0A] font-semibold hover:bg-accent-hover shadow-glow-accent hover:shadow-[0_0_30px_-2px_rgba(182,255,74,0.4)]',
    secondary:
      'bg-bg-secondary text-copy border border-border hover:border-accent/50 hover:bg-card-hover',
    outline:
      'bg-transparent border border-border text-copy hover:border-accent hover:text-accent hover:bg-accent-muted/10',
    ghost:
      'bg-transparent text-copy-secondary hover:text-copy hover:bg-bg-secondary',
  };

  const content = (
    <>
      {isLoading ? (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
      ) : (
        iconLeft && <span className="inline-flex shrink-0">{iconLeft}</span>
      )}
      <span>{children}</span>
      {!isLoading && iconRight && <span className="inline-flex shrink-0 transition-transform group-hover:translate-x-0.5">{iconRight}</span>}
    </>
  );

  const hoverAnimation: TargetAndTransition = { y: -1 };
  const tapAnimation: TargetAndTransition = { scale: 0.98 };
  const transitionConfig: Transition = { duration: 0.15, ease: 'easeOut' };

  const motionProps = shouldReduceMotion
    ? {}
    : {
        whileHover: hoverAnimation,
        whileTap: tapAnimation,
        transition: transitionConfig,
      };

  const combinedClasses = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    'group',
    className
  );

  if (to) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link to={to} className={combinedClasses}>
          {content}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <a
          href={href}
          download={download}
          target={target}
          rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
          className={combinedClasses}
        >
          {content}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...motionProps}
      className={combinedClasses}
      disabled={disabled || isLoading}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {content}
    </motion.button>
  );
};
