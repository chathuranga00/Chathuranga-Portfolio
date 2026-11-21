import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUp, Mail } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { GithubIcon, LinkedinIcon, FiverrIcon } from '@/components/common/BrandIcons';
import { profileData } from '@/data/profile';

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const currentYear = new Date().getFullYear();

  // Slow horizontal scroll-linked parallax drift
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end start'],
  });

  const driftX = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0%', '0%'] : ['2%', '-3%']
  );

  return (
    <footer
      ref={footerRef}
      className="group relative border-t border-border bg-bg-secondary pt-14 pb-0 text-sm text-copy-secondary overflow-hidden"
    >
      <Container size="xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-10 border-b border-border/80">
          {/* Brand & Title */}
          <div className="space-y-2 max-w-md">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-2xl text-copy tracking-tight">
                {profileData.fullName}
              </span>
              <span className="h-2 w-2 rounded-full bg-accent" />
            </div>
            <p className="text-xs sm:text-sm text-copy-secondary leading-relaxed">
              {profileData.title}
            </p>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono">
            {/* GitHub */}
            <a
              href={profileData.socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg border border-border bg-card hover:border-accent hover:text-accent transition-colors flex items-center gap-2"
              title="GitHub Profile"
            >
              <GithubIcon size={15} />
              <span>GitHub</span>
            </a>

            {/* LinkedIn */}
            <a
              href={profileData.socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg border border-border bg-card hover:border-accent hover:text-accent transition-colors flex items-center gap-2"
              title="LinkedIn Profile"
            >
              <LinkedinIcon size={15} />
              <span>LinkedIn</span>
            </a>

            {/* Fiverr */}
            <a
              href={profileData.socials.fiverr.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg border border-border bg-card hover:border-accent hover:text-accent transition-colors flex items-center gap-2"
              title="Fiverr Freelance Profile"
            >
              <FiverrIcon size={15} />
              <span>Fiverr</span>
            </a>

            {/* Email */}
            <a
              href={profileData.socials.email.url}
              className="px-3 py-1.5 rounded-lg border border-border bg-card hover:border-accent hover:text-accent transition-colors flex items-center gap-2"
              title="Direct Email"
            >
              <Mail size={15} />
              <span>Email</span>
            </a>

            {/* Back to top button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-card border border-border hover:border-accent text-copy-secondary hover:text-accent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ml-auto sm:ml-2"
              aria-label="Scroll back to top of page"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Footer Bottom Metadata & Copyright */}
        <div className="pt-8 pb-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-copy-muted">
          <p>© {currentYear} {profileData.fullName}. All rights reserved.</p>

          <p className="text-copy-secondary font-medium text-center sm:text-right">
            Designed and developed with curiosity, creativity and code.
          </p>
        </div>
      </Container>

      {/* Editorial Giant Outlined Wordmark Statement Clipped at Bottom Edge */}
      <div
        className="w-full overflow-hidden select-none pointer-events-none flex justify-center -mb-[0.14em]"
        aria-hidden="true"
      >
        <motion.div
          style={{ x: driftX }}
          className="font-display font-black uppercase tracking-tighter text-transparent whitespace-nowrap text-[clamp(44px,9.5vw,148px)] leading-[0.80] text-center will-change-transform"
        >
          <span
            style={{
              WebkitTextStroke: 'var(--stroke-width, 1px) var(--border)',
            }}
            className="transition-[webkit-text-stroke-width] duration-300 group-hover:[--stroke-width:2px]"
          >
            {profileData.displayName.toUpperCase()}
          </span>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
