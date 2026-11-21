import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, Download, MessageSquare, Sun, Moon } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/common/Button';
import { profileData } from '@/data/profile';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/utils/cn';

interface NavItem {
  name: string;
  href: string;
  id: string;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Expertise', href: '#expertise', id: 'expertise' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Code', href: '#github', id: 'github' },
  { name: 'Services', href: '#services', id: 'services' },
  { name: 'Journey', href: '#journey', id: 'journey' },
  { name: 'Research', href: '#research', id: 'research' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

const SECTION_IDS = navItems.map((item) => item.id);

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const { isScrolled } = useScrollPosition(25);
  const activeSection = useActiveSection(SECTION_IDS, 120);
  const { isDark, toggleTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  // Focus trap in mobile navigation drawer
  useEffect(() => {
    if (!mobileMenuOpen || !drawerRef.current) return;

    const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleTab);
    return () => window.removeEventListener('keydown', handleTab);
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const topOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'py-3.5 bg-bg/80 backdrop-blur-xl border-b border-border/80 shadow-card-subtle'
            : 'py-5 sm:py-6 bg-transparent border-b border-transparent'
        )}
      >
        <Container size="xl">
          <div className="flex items-center justify-between">
            {/* Brand Logo with Monogram Square & Dual-Line Name Lockup */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl select-none shrink-0"
              aria-label={`${profileData.fullName} - Back to top`}
            >
              {/* Monogram Square with Clip-Transition Hover */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-[#252C26] bg-[#141914]/60 backdrop-blur-sm flex items-center justify-center shrink-0 overflow-hidden relative group-hover:border-accent/40 transition-colors shadow-sm">
                <div className="relative w-6 h-5 overflow-hidden flex items-center justify-center">
                  <span className="absolute inset-0 flex items-center justify-center font-display font-semibold text-xs sm:text-sm tracking-wider text-copy transition-all duration-300 ease-out group-hover:-translate-y-full group-hover:rotate-12">
                    {profileData.monogram}
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center font-display font-semibold text-xs sm:text-sm tracking-wider text-copy translate-y-full transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:rotate-0">
                    {profileData.monogram}
                  </span>
                </div>
              </div>

              {/* Name Typography Lockup */}
              <div className="flex flex-col justify-center leading-none whitespace-nowrap">
                <div className="flex items-center gap-1.5">
                  <span className="font-display text-sm sm:text-base xl:text-lg font-bold tracking-tight text-copy whitespace-nowrap">
                    {profileData.firstName}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                </div>
                <span className="hidden sm:block font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-copy-secondary whitespace-nowrap mt-0.5">
                  {profileData.lastName}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav
              className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 px-2.5 xl:px-3.5 py-1.5 rounded-full bg-card/60 backdrop-blur-md border border-border/80"
              aria-label="Main Navigation"
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      'relative px-2.5 xl:px-3.5 py-1.5 text-xs xl:text-sm font-medium tracking-wide transition-colors rounded-full whitespace-nowrap',
                      isActive
                        ? 'text-[#090B0A] font-semibold'
                        : 'text-copy-secondary hover:text-copy'
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 bg-accent rounded-full -z-10 shadow-glow-accent"
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { type: 'spring', stiffness: 380, damping: 30 }
                        }
                      />
                    )}
                    {item.name}
                  </a>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Theme Toggle Button */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                className="p-2.5 rounded-xl border border-border bg-card/60 text-copy-secondary hover:text-accent hover:border-accent/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {isDark ? <Sun size={17} /> : <Moon size={17} />}
              </button>

              {/* Download CV */}
              <Button
                variant="outline"
                size="sm"
                href={profileData.resumeUrl}
                download="Chathuranga_Sandaruwan_CV.pdf"
                iconLeft={<Download size={14} />}
                className="hidden xl:inline-flex"
              >
                Download CV
              </Button>

              {/* Contact CTA */}
              <Button
                variant="primary"
                size="sm"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.querySelector('#contact');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                iconRight={<MessageSquare size={14} />}
              >
                Let's Talk
              </Button>
            </div>

            {/* Mobile Controls (Theme Toggle + Hamburger) */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                className="p-2 rounded-xl border border-border bg-card text-copy-secondary hover:text-accent transition-colors"
              >
                {isDark ? <Sun size={17} /> : <Moon size={17} />}
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
                className="p-2.5 rounded-xl border border-border bg-card text-copy hover:border-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
            />

            {/* Sliding Drawer */}
            <motion.div
              ref={drawerRef}
              initial={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
              animate={shouldReduceMotion ? { opacity: 1 } : { x: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-xs bg-bg-secondary border-l border-border p-6 shadow-2xl flex flex-col justify-between overflow-y-auto lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
            >
              <div>
                {/* Header in Drawer */}
                <div className="flex items-center justify-between pb-6 border-b border-border">
                  <span className="font-display font-bold text-lg text-copy">Navigation</span>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                    className="p-2 rounded-lg border border-border text-copy-secondary hover:text-copy"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col gap-2 mt-6">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <a
                        key={item.id}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={cn(
                          'flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors',
                          isActive
                            ? 'bg-accent text-[#090B0A] font-semibold shadow-glow-accent'
                            : 'text-copy-secondary hover:text-copy hover:bg-card'
                        )}
                      >
                        <span>{item.name}</span>
                        {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[#090B0A]" />}
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Actions */}
              <div className="pt-8 border-t border-border space-y-3 mt-6">
                <Button
                  variant="outline"
                  href={profileData.resumeUrl}
                  download="Chathuranga_Sandaruwan_CV.pdf"
                  iconLeft={<Download size={15} />}
                  className="w-full justify-center"
                >
                  Download CV
                </Button>
                <Button
                  variant="primary"
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  iconRight={<MessageSquare size={15} />}
                  className="w-full justify-center"
                >
                  Let's Connect
                </Button>
                <div className="pt-2 text-center text-[11px] font-mono text-copy-muted">
                  CHATHURANGA. • Sri Lanka
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
