import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import {
  ArrowRight,
  MessageSquare,
  MapPin,
  GraduationCap,
  ChevronDown,
} from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/common/Button';
import { GithubIcon, LinkedinIcon } from '@/components/common/BrandIcons';
import { HeroVisual } from './HeroVisual';
import { InteractiveName } from './InteractiveName';
import { profileData } from '@/data/profile';

export const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const handleScrollClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const topOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center pt-28 pb-16 sm:py-32 overflow-hidden bg-bg"
    >
      {/* Subtle Animated Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 65% 65% at 50% 45%, #000 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at 50% 45%, #000 30%, transparent 80%)',
        }}
      />

      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <Container size="xl" className="relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text & CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full flex flex-col items-start"
          >
            {/* Distinctive Hero Name Line */}
            <motion.div variants={itemVariants} className="w-full">
              <InteractiveName />
            </motion.div>

            {/* Oversized Editorial Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-display-xl sm:text-display-2xl font-bold font-display text-copy tracking-tight leading-[1.05] mb-6 text-balance"
            >
              Building Digital Experiences That Make a{' '}
              <span className="relative inline-block text-accent">
                Difference.
                {/* Subtle Decorative Underline Accent */}
                <span className="absolute left-0 -bottom-1 sm:-bottom-2 w-full h-[3px] bg-accent/30 rounded-full" />
              </span>
            </motion.h1>

            {/* Description Paragraph */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-copy-secondary font-light max-w-2xl leading-relaxed mb-8"
            >
              {profileData.heroDescription}
            </motion.p>

            {/* Details Pills: Location + University Status */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 mb-10 text-xs sm:text-sm text-copy-secondary"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border">
                <MapPin size={14} className="text-accent" />
                <span>Based in {profileData.location}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border">
                <GraduationCap size={14} className="text-accent" />
                <span>{profileData.roleStatus}</span>
              </div>
            </motion.div>

            {/* Primary Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto"
            >
              <Button
                variant="primary"
                size="lg"
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollClick('#projects');
                }}
                iconRight={<ArrowRight size={18} />}
                className="w-full sm:w-auto"
              >
                Explore My Work
              </Button>

              <Button
                variant="secondary"
                size="lg"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollClick('#contact');
                }}
                iconLeft={<MessageSquare size={17} />}
                className="w-full sm:w-auto"
              >
                Let's Connect
              </Button>
            </motion.div>

            {/* Social Links with Clear Placeholder Tooltips */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 pt-4 border-t border-border/80 w-full"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-copy-muted">
                Profiles:
              </span>

              <a
                href={profileData.socials.github.url}
                target="_blank"
                rel="noopener noreferrer"
                title={profileData.socials.github.label}
                aria-label={profileData.socials.github.label}
                className="group flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card text-copy-secondary hover:text-accent hover:border-accent/40 transition-colors text-xs font-mono"
              >
                <GithubIcon size={15} />
                <span>GitHub</span>
                {profileData.socials.github.isPlaceholder && (
                  <span className="text-[10px] text-copy-muted group-hover:text-accent/70 font-sans">
                    [placeholder]
                  </span>
                )}
              </a>

              <a
                href={profileData.socials.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                title={profileData.socials.linkedin.label}
                aria-label={profileData.socials.linkedin.label}
                className="group flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card text-copy-secondary hover:text-accent hover:border-accent/40 transition-colors text-xs font-mono"
              >
                <LinkedinIcon size={15} />
                <span>LinkedIn</span>
                {profileData.socials.linkedin.isPlaceholder && (
                  <span className="text-[10px] text-copy-muted group-hover:text-accent/70 font-sans">
                    [placeholder]
                  </span>
                )}
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Geometric Interactive Core / High-Efficiency Fallback */}
          <div className="w-full flex justify-center items-center self-center">
            <HeroVisual />
          </div>
        </div>
      </Container>

      {/* Scroll Down Indicator */}
      <div className="relative z-10 mt-12 sm:mt-16 flex flex-col items-center justify-center">
        <button
          type="button"
          onClick={() => handleScrollClick('#about')}
          aria-label="Scroll down to About section"
          className="group flex flex-col items-center gap-2 text-copy-muted hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg p-2"
        >
          <span className="text-[11px] font-mono uppercase tracking-widest text-copy-secondary group-hover:text-accent transition-colors">
            Scroll to explore
          </span>
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ChevronDown size={18} className="text-accent" />
          </motion.div>
        </button>
      </div>
    </section>
  );
};
