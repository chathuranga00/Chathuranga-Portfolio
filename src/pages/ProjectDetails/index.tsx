import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Layers,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Lock,
  Users,
  Camera,
  MessageSquare,
  FileSpreadsheet,
  Smartphone,
  Settings,
  Eye,
  UserCheck,
  HeartHandshake,
  Sparkles,
  QrCode,
} from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { GithubIcon, LinkedinIcon } from '@/components/common/BrandIcons';
import { projectsData, type Project } from '@/data/projects';
import { profileData } from '@/data/profile';

export const ProjectDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Scroll to top upon navigating to a new project
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // Support both current slug and legacy 'attendx' slug
  const currentIndex = projectsData.findIndex(
    (p) => p.slug === slug || (slug === 'attendx' && p.slug === 'labattend')
  );
  const project: Project | undefined = projectsData[currentIndex];

  const prevProject =
    currentIndex > 0 ? projectsData[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : null;

  const getFeatureIcon = (iconName?: string) => {
    const props = { size: 18, className: 'text-accent shrink-0' };
    switch (iconName) {
      case 'Users':
        return <Users {...props} />;
      case 'Settings':
        return <Settings {...props} />;
      case 'Camera':
        return <Camera {...props} />;
      case 'Eye':
        return <Eye {...props} />;
      case 'MessageSquare':
        return <MessageSquare {...props} />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet {...props} />;
      case 'Smartphone':
        return <Smartphone {...props} />;
      case 'UserCheck':
        return <UserCheck {...props} />;
      case 'QrCode':
        return <QrCode {...props} />;
      case 'ShieldCheck':
        return <ShieldCheck {...props} />;
      case 'Lock':
        return <Lock {...props} />;
      default:
        return <Sparkles {...props} />;
    }
  };

  // 404 Not Found State
  if (!project) {
    return (
      <>
        <Helmet>
          <title>Project Not Found | {profileData.fullName}</title>
        </Helmet>
        <main className="min-h-screen py-32 bg-bg text-copy flex items-center justify-center">
          <Container size="sm" className="text-center">
            <div className="p-8 rounded-3xl bg-card border border-border space-y-6">
              <div className="inline-flex p-4 rounded-2xl bg-card-hover border border-border text-accent">
                <AlertCircle size={40} />
              </div>
              <Badge variant="outline" size="sm">
                404 // ROUTE_NOT_FOUND
              </Badge>
              <h1 className="text-display-lg font-bold font-display text-copy">
                Project Not Found
              </h1>
              <p className="text-copy-secondary text-sm max-w-md mx-auto">
                No verified project case study matches the URL parameter{' '}
                <code className="text-accent font-mono">/projects/{slug}</code>.
              </p>
              <div className="pt-2">
                <Button to="/#projects" variant="primary" iconLeft={<ArrowLeft size={16} />}>
                  Return to Portfolio
                </Button>
              </div>
            </div>
          </Container>
        </main>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${project.title} | Technical Case Study | ${profileData.fullName}`}</title>
        <meta name="description" content={project.shortDescription} />
        <link rel="canonical" href={`https://chathuranga.dev/projects/${project.slug}`} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://chathuranga.dev/projects/${project.slug}`} />
        <meta property="og:title" content={`${project.title} | Technical Case Study`} />
        <meta property="og:description" content={project.shortDescription} />
        <meta property="og:image" content="https://chathuranga.dev/images/og-preview.png" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${project.title} | Technical Case Study`} />
        <meta name="twitter:description" content={project.shortDescription} />
        <meta name="twitter:image" content="https://chathuranga.dev/images/og-preview.png" />
      </Helmet>

      <div className="min-h-screen bg-bg text-copy selection:bg-accent selection:text-[#090B0A] pb-24">
        {/* Accessible Skip Link */}
        <a
          href="#case-study-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-accent focus:text-black focus:font-semibold focus:rounded-xl focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-accent"
        >
          Skip to case study content
        </a>

        {/* Navigation Sticky Top Bar */}
        <header className="sticky top-0 z-40 bg-bg/85 backdrop-blur-md border-b border-border/80 py-4">
          <Container size="xl" className="flex items-center justify-between">
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-copy-secondary hover:text-accent transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Back to Selected Work</span>
            </Link>

            <div className="flex items-center gap-3">
              <Badge variant="outline" size="sm" className="hidden sm:inline-flex">
                CASE STUDY REF // {project.number}
              </Badge>
              <Badge variant="accent" size="sm">
                {project.filterCategory}
              </Badge>
            </div>
          </Container>
        </header>

        {/* 1. Hero Section: Name, Tagline, Status, Tech Badges, Role & Actions */}
        <section className="pt-12 sm:pt-20 pb-12 border-b border-border/70 relative overflow-hidden bg-bg-secondary/30">
          <Container size="xl">
            <div className="max-w-4xl space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                  PROJECT {project.number} // TECHNICAL CASE STUDY
                </span>
                <span className="text-copy-muted">•</span>
                <span className="text-xs font-mono text-copy-secondary">{project.category}</span>
                {project.statusBadge && (
                  <>
                    <span className="text-copy-muted">•</span>
                    <Badge variant="accent" size="sm" hasDot className="font-mono text-xs">
                      {project.statusBadge}
                    </Badge>
                  </>
                )}
              </div>

              <h1 className="text-display-lg sm:text-display-xl font-bold font-display text-copy tracking-tight text-balance">
                {project.title}
              </h1>

              {project.tagline && (
                <p className="text-sm sm:text-base font-mono uppercase tracking-wider text-accent font-medium">
                  // {project.tagline}
                </p>
              )}

              <p className="text-lg sm:text-xl text-copy-secondary font-light leading-relaxed">
                {project.shortDescription}
              </p>

              {project.role && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card border border-border/80 text-xs font-mono text-copy-secondary">
                  <span className="text-accent font-semibold">ROLE:</span>
                  <span>{project.role}</span>
                </div>
              )}

              {/* Technologies Badges Bar */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-copy-muted mr-1">Stack:</span>
                {project.technologies.map((t) => (
                  <Badge
                    key={t.name}
                    variant={t.note ? 'accent' : 'default'}
                    size="sm"
                    className="font-mono"
                  >
                    {t.name}
                    {t.note && ` [${t.note}]`}
                  </Badge>
                ))}
              </div>

              {/* External Action Links & Source Code Privacy */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                {project.sourceCodeNotice ? (
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-card border border-border text-xs font-mono text-copy-muted">
                      <Lock size={14} className="text-accent" />
                      <span>{project.sourceCodeNotice.statusText}</span>
                    </div>

                    <Button
                      variant="primary"
                      to={project.sourceCodeNotice.demoActionUrl || '/#contact'}
                      iconRight={<ExternalLink size={16} />}
                    >
                      {project.sourceCodeNotice.demoActionText || 'Request a Demo'}
                    </Button>

                    <Button
                      variant="outline"
                      href={profileData.socials.linkedin.url}
                      target="_blank"
                      iconLeft={<LinkedinIcon size={16} />}
                    >
                      Connect on LinkedIn
                    </Button>
                  </div>
                ) : (
                  <>
                    {project.liveUrl && (
                      <Button
                        variant="primary"
                        href={project.liveUrl}
                        target="_blank"
                        iconRight={<ExternalLink size={16} />}
                      >
                        Live Demo
                      </Button>
                    )}

                    {project.githubUrl && (
                      <Button
                        variant="outline"
                        href={project.githubUrl}
                        target="_blank"
                        iconLeft={<GithubIcon size={16} />}
                      >
                        Source Code
                      </Button>
                    )}

                    {project.announcementUrl && (
                      <Button
                        variant="secondary"
                        href={project.announcementUrl}
                        target="_blank"
                        iconLeft={<LinkedinIcon size={16} />}
                      >
                        LinkedIn Announcement
                      </Button>
                    )}

                    {!project.liveUrl && !project.githubUrl && !project.announcementUrl && (
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card border border-border text-xs font-mono text-copy-muted">
                        <AlertCircle size={14} className="text-accent" />
                        <span>Repository and deployment links under verification</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </Container>
        </section>

        {/* Hero Media / Screenshot Showcase Frame */}
        <section className="py-12 bg-bg border-b border-border/60">
          <Container size="xl">
            {project.screenshots && project.screenshots.length > 0 ? (
              <div className="rounded-3xl bg-card/60 backdrop-blur-md border border-border overflow-hidden shadow-2xl relative p-6 sm:p-10 lg:p-12">
                {/* Subtle Ambient Background Gradients */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 50% 30%, rgba(182, 255, 74, 0.15), transparent 70%), linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)',
                    backgroundSize: '100% 100%, 32px 32px, 32px 32px',
                  }}
                />

                {/* Header Tag inside Frame */}
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                        PRODUCTION INTERFACE SHOWCASE
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-copy">
                      {project.slug === 'lankapay'
                        ? 'Administrative Clearing Portal & Multi-Device Interfaces'
                        : project.slug === 'labattend'
                        ? 'Dual Portal Architecture (Staff Management & Student PWA)'
                        : project.deviceType === 'desktop'
                        ? 'Web Platform Interface in Production'
                        : 'Dual Portal Architecture in Production'}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" size="sm" className="font-mono text-xs">
                      {project.filterCategory.toUpperCase()}
                    </Badge>
                    <Badge variant="accent" size="sm" className="font-mono text-xs">
                      {project.statusBadge || 'ACTIVE SYSTEM'}
                    </Badge>
                  </div>
                </div>

                {/* Desktop Viewport Mockup */}
                {project.deviceType === 'desktop' ? (
                  <div className="relative z-10 w-full max-w-5xl mx-auto rounded-2xl overflow-hidden border border-border/80 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9)] bg-[#121613]">
                    {/* Browser Window Header Chrome */}
                    <div className="px-4 py-3 bg-[#19201A] border-b border-border/80 flex items-center justify-between gap-4 select-none">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#FF5F56]/80" />
                        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]/80" />
                        <div className="w-3 h-3 rounded-full bg-[#27C93F]/80" />
                      </div>

                      <div className="flex-1 max-w-md mx-auto px-4 py-1 rounded-lg bg-bg/60 border border-border/60 text-xs font-mono text-copy-muted flex items-center justify-center gap-2 text-center truncate">
                        <span className="w-2 h-2 rounded-full bg-accent/60" />
                        <span>
                          {project.slug === 'edupulse'
                            ? 'edupulse-ai.netlify.app'
                            : project.slug === 'lankapay'
                            ? 'lankapay-admin.cbsl.gov.lk'
                            : project.slug === 'labattend'
                            ? 'labattend.nsbm.ac.lk [Private]'
                            : 'production.app'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-[10px] font-mono text-copy-muted">
                        <span className="hidden sm:inline">SECURE HTTPS</span>
                      </div>
                    </div>

                    {/* Browser Screen Content */}
                    <div className="relative aspect-[16/8] sm:aspect-[16/7.5] w-full overflow-hidden bg-black group">
                      <img
                        src={project.screenshots[0]}
                        alt={`${project.title} Interface Preview`}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                        loading="eager"
                      />
                    </div>
                  </div>
                ) : (
                  /* Dual Mobile Device Showcases Grid */
                  <div className="relative z-10 flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16 py-4">
                    {project.screenshots.map((src, idx) => (
                      <div key={idx} className="group relative flex flex-col items-center">
                        {/* Top Label Pill */}
                        <div className="mb-3 px-3 py-1 rounded-full bg-card border border-border/80 text-[11px] font-mono font-medium text-copy-secondary flex items-center gap-1.5 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          <span>
                            {idx === 0 ? 'Staff Management Portal' : 'Student Attendance PWA'}
                          </span>
                        </div>

                        {/* Phone Mockup Frame */}
                        <div className="relative w-[230px] sm:w-[270px] aspect-[9/18.5] rounded-[2.5rem] p-2 bg-gradient-to-b from-[#2B352D] via-[#1A211B] to-[#121613] border border-border/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_30px_70px_-15px_rgba(182,255,74,0.18)]">
                          {/* Phone Screen Container */}
                          <div className="w-full h-full rounded-[2.2rem] overflow-hidden bg-black relative border border-black/40">
                            <img
                              src={src}
                              alt={
                                idx === 0
                                  ? 'Staff Portal Login Screen'
                                  : 'Student Portal Login Screen'
                              }
                              className="w-full h-full object-cover object-top"
                              loading="eager"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Footer Details Bar inside Frame */}
                <div className="relative z-10 mt-8 pt-4 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-copy-muted">
                  <span>
                    {project.deviceType === 'desktop'
                      ? 'FORMAT // RESPONSIVE DESKTOP BROWSER ENVIRONMENT'
                      : 'FORMAT // MOBILE VIEWPORT ADAPTIVE PWA (360PX TO DESKTOP)'}
                  </span>
                  <span className="text-accent flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {project.statusBadge
                      ? project.statusBadge.toUpperCase()
                      : 'VERIFIED PRODUCTION DEPLOYMENT'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl bg-card border border-border overflow-hidden shadow-2xl relative aspect-[16/9] max-h-[560px] flex flex-col items-center justify-center p-8 text-center">
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, var(--accent) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />

                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="p-4 rounded-2xl bg-bg border border-border text-accent">
                    <ImageIcon size={44} />
                  </div>
                  <Badge variant="accent" hasDot>
                    PRIMARY SCREENSHOT PLACEHOLDER
                  </Badge>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-copy">
                    {project.title} Visual Overview
                  </h3>
                  <p className="text-xs sm:text-sm text-copy-secondary max-w-md font-mono">
                    Official UI captures and interface assets will be linked in this container.
                  </p>
                </div>
              </div>
            )}
          </Container>
        </section>

        {/* Main Content Layout */}
        <main id="case-study-content">
          <Container size="xl" className="py-16 sm:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Main Column */}
              <div className="lg:col-span-8 space-y-16">
                {/* 2. The Problem & The Solution */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                      01 // PROBLEM & SOLUTION
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Card variant="default" padding="lg" className="border-border/90 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-accent">
                          <AlertCircle size={20} />
                          <h3 className="text-lg font-bold font-display text-copy">
                            The Problem
                          </h3>
                        </div>
                        <p className="text-sm text-copy-secondary leading-relaxed">
                          {project.problemStatement}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-border/60 text-[11px] font-mono text-copy-muted">
                        CHALLENGE // SLOW PAPER SIGN-INS & PROXY LOGS
                      </div>
                    </Card>

                    <Card variant="default" padding="lg" className="border-border/90 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-accent">
                          <CheckCircle2 size={20} />
                          <h3 className="text-lg font-bold font-display text-copy">
                            The Solution
                          </h3>
                        </div>
                        <p className="text-sm text-copy-secondary leading-relaxed">
                          {project.solutionSummary || project.proposedSolution}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-border/60 text-[11px] font-mono text-accent">
                        IMPACT // 1-SCAN CAMERA VERIFICATION
                      </div>
                    </Card>
                  </div>
                </div>

                {/* 3. How It Works in 3 Steps */}
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                        02 // HOW IT WORKS
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold font-display text-copy mt-1">
                        How It Works in 3 Steps
                      </h2>
                    </div>
                    <Badge variant="outline" size="sm" className="font-mono text-xs w-fit">
                      END-TO-END WORKFLOW
                    </Badge>
                  </div>

                  {project.workflow && project.workflow.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {project.workflow.map((item) => (
                        <Card
                          key={item.step}
                          variant="glass"
                          padding="lg"
                          className="relative flex flex-col justify-between border-border/90 hover:border-accent/40 transition-colors"
                        >
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-accent/15 text-accent border border-accent/30">
                                STEP 0{item.step}
                              </span>
                              <div className="p-2 rounded-xl bg-bg border border-border">
                                {getFeatureIcon(item.iconName)}
                              </div>
                            </div>

                            <h3 className="text-base font-bold font-display text-copy">
                              {item.title}
                            </h3>

                            <p className="text-xs sm:text-sm text-copy-secondary leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>

                {/* 4. Key Features as Short Cards */}
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                        03 // KEY FEATURES
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold font-display text-copy mt-1">
                        Engineered Capabilities
                      </h2>
                    </div>
                    <Badge variant="outline" size="sm" className="font-mono text-xs w-fit">
                      {project.featureCards ? `${project.featureCards.length} CORE CAPABILITIES` : 'FEATURE SPECIFICATIONS'}
                    </Badge>
                  </div>

                  {project.featureCards && project.featureCards.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {project.featureCards.map((card, idx) => (
                        <div
                          key={idx}
                          className="p-5 rounded-2xl bg-card border border-border hover:border-accent/40 transition-colors flex flex-col justify-between gap-3 group"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              {card.tag && (
                                <Badge variant="outline" size="sm" className="font-mono text-[10px]">
                                  {card.tag}
                                </Badge>
                              )}
                              <div className="p-1.5 rounded-lg bg-bg border border-border">
                                {getFeatureIcon(card.iconName)}
                              </div>
                            </div>
                            <h3 className="text-sm font-bold font-display text-copy group-hover:text-accent transition-colors">
                              {card.title}
                            </h3>
                            <p className="text-xs text-copy-secondary leading-relaxed">
                              {card.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {project.features.map((feat, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-card border border-border flex items-start gap-3"
                        >
                          <div className="p-1 rounded bg-bg text-accent mt-0.5">
                            <CheckCircle2 size={14} />
                          </div>
                          <span className="text-xs sm:text-sm text-copy font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 5. Screenshot Gallery with Captions & Clear Placeholders */}
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                        04 // SCREENSHOT GALLERY
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold font-display text-copy mt-1">
                        Interface & Console Previews
                      </h2>
                    </div>
                    <Badge variant="outline" size="sm">
                      {project.gallery ? `${project.gallery.length} DOCUMENTED VIEWS` : 'GALLERY'}
                    </Badge>
                  </div>

                  {project.gallery && project.gallery.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {project.gallery.map((item, idx) => (
                        <Card
                          key={idx}
                          variant="default"
                          padding="none"
                          className="overflow-hidden border border-border hover:border-accent/40 transition-colors group flex flex-col justify-between"
                        >
                          {/* When it is a placeholder */}
                          {item.isPlaceholder ? (
                            <div className="relative aspect-[16/10] bg-gradient-to-b from-[#18201A] to-[#0E1310] p-6 flex flex-col items-center justify-center text-center border-b border-border/80 border-dashed">
                              <div className="p-3 rounded-2xl bg-bg border border-border text-accent mb-3 group-hover:scale-110 transition-transform">
                                <ImageIcon size={28} />
                              </div>
                              <Badge variant="accent" size="sm" className="font-mono text-[10px] mb-2">
                                SCREENSHOT PLACEHOLDER // TODO
                              </Badge>
                              <span className="text-xs font-semibold text-copy mb-1">{item.title}</span>
                              <p className="text-[11px] font-mono text-copy-muted max-w-xs">
                                Target file: <code className="text-accent">{item.url}</code>
                              </p>
                            </div>
                          ) : item.aspect === 'landscape' ? (
                            /* Landscape Desktop Screen Frame */
                            <div className="relative bg-[#141A15] p-3 sm:p-4 border-b border-border overflow-hidden">
                              <div className="mb-2 px-3 py-1.5 rounded-t-lg bg-[#1C241E] border border-border/60 flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/70" />
                                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/70" />
                                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/70" />
                                </div>
                                <span className="text-[10px] font-mono text-copy-muted truncate">
                                  {item.tag}
                                </span>
                              </div>
                              <div className="relative aspect-[16/8.5] rounded-b-lg overflow-hidden border border-border/80 bg-black group-hover:border-accent/40 transition-colors">
                                <img
                                  src={item.url}
                                  alt={item.title}
                                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                  loading="lazy"
                                />
                              </div>
                            </div>
                          ) : (
                            /* Portrait Mobile Device Frame */
                            <div className="relative bg-gradient-to-b from-[#18201A] to-[#0E1310] p-6 flex items-center justify-center border-b border-border overflow-hidden">
                              <div
                                className="absolute inset-0 opacity-15 pointer-events-none group-hover:scale-105 transition-transform duration-700"
                                style={{
                                  backgroundImage:
                                    'linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)',
                                  backgroundSize: '24px 24px',
                                }}
                              />
                              <div className="relative z-10 w-[190px] sm:w-[210px] aspect-[9/18.5] rounded-[2rem] p-1.5 bg-gradient-to-b from-[#2B352D] via-[#1A211B] to-[#121613] border border-border/70 shadow-xl group-hover:scale-105 transition-transform duration-500">
                                <div className="w-full h-full rounded-[1.8rem] overflow-hidden bg-black">
                                  <img
                                    src={item.url}
                                    alt={item.title}
                                    className="w-full h-full object-cover object-top"
                                    loading="lazy"
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Caption & Metadata */}
                          <div className="p-5 space-y-2 bg-card/60">
                            <div className="flex items-center justify-between">
                              <Badge variant="accent" size="sm" className="font-mono text-[10px]">
                                {item.tag}
                              </Badge>
                              <span className="text-[10px] font-mono text-copy-muted">
                                CAPTURE 0{idx + 1}
                              </span>
                            </div>
                            <h4 className="text-base font-bold font-display text-copy group-hover:text-accent transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-xs text-copy-secondary leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>

                {/* 6. System Architecture & Infrastructure */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                      05 // SYSTEM ARCHITECTURE & DEPLOYMENT
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-copy">
                    Multi-Tier Cloud Pipeline
                  </h2>
                  <p className="text-base text-copy-secondary leading-relaxed">
                    {project.systemArchitecture.overview}
                  </p>

                  {project.systemArchitecture.layers && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      {project.systemArchitecture.layers.map((layer, idx) => (
                        <Card key={idx} variant="glass" padding="md">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono text-copy-muted">
                              LAYER 0{idx + 1}
                            </span>
                            <Layers size={16} className="text-accent" />
                          </div>
                          <h4 className="text-sm font-bold font-display text-copy mb-1">
                            {layer.name}
                          </h4>
                          <p className="text-xs text-copy-secondary leading-relaxed">
                            {layer.details}
                          </p>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>

                {/* 7. Security and Privacy */}
                {project.securityAndPrivacy && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                        06 // SECURITY & PRIVACY
                      </span>
                    </div>

                    <Card variant="default" padding="lg" className="border-border space-y-6 relative overflow-hidden">
                      <div
                        className="absolute inset-0 opacity-5 pointer-events-none"
                        style={{
                          backgroundImage: 'radial-gradient(circle, var(--accent) 1px, transparent 1px)',
                          backgroundSize: '20px 20px',
                        }}
                      />

                      <div className="relative z-10 flex items-start gap-4">
                        <div className="p-3 rounded-2xl bg-bg border border-border text-accent shrink-0">
                          <ShieldCheck size={28} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold font-display text-copy">
                            Zero-Trust Security & Data Protection
                          </h3>
                          <p className="text-sm text-copy-secondary mt-1 leading-relaxed">
                            {project.securityAndPrivacy.summary}
                          </p>
                        </div>
                      </div>

                      <div className="relative z-10 grid grid-cols-1 gap-3 pt-2">
                        {project.securityAndPrivacy.points.map((point, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl bg-bg/60 border border-border/80 flex items-start gap-3"
                          >
                            <Lock size={15} className="text-accent shrink-0 mt-0.5" />
                            <span className="text-xs sm:text-sm text-copy-secondary leading-relaxed">
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="relative z-10 p-4 rounded-xl bg-card-hover border border-border/90 flex items-center gap-3 text-xs font-mono text-copy-muted">
                        <AlertCircle size={16} className="text-accent shrink-0" />
                        <span>{project.securityAndPrivacy.notice}</span>
                      </div>
                    </Card>
                  </div>
                )}

                {/* 8. What I Learned (3 Short Bullets) */}
                {project.learnings && project.learnings.length > 0 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                        07 // RETROSPECTIVE
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-display text-copy">
                      What I Learned
                    </h2>

                    <div className="space-y-4">
                      {project.learnings.map((learning, idx) => (
                        <div
                          key={idx}
                          className="p-5 rounded-2xl bg-card border border-border flex items-start gap-4 hover:border-accent/40 transition-colors"
                        >
                          <span className="w-8 h-8 rounded-full bg-accent/15 text-accent font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-accent/30">
                            0{idx + 1}
                          </span>
                          <div className="space-y-1">
                            <h3 className="text-sm font-bold font-display text-copy">
                              {learning.topic}
                            </h3>
                            <p className="text-xs sm:text-sm text-copy-secondary leading-relaxed">
                              {learning.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 9. Acknowledgement */}
                {project.acknowledgement && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                        08 // ACKNOWLEDGEMENT
                      </span>
                    </div>

                    <Card variant="glass" padding="lg" className="border-border space-y-4">
                      <div className="flex items-center gap-3 text-accent">
                        <HeartHandshake size={24} />
                        <h3 className="text-lg font-bold font-display text-copy">
                          Academic Mentorship & Gratitude
                        </h3>
                      </div>
                      <p className="text-sm text-copy-secondary leading-relaxed">
                        {project.acknowledgement.message}
                      </p>
                      <div className="pt-2 text-xs font-mono text-accent">
                        MENTOR // {project.acknowledgement.name.toUpperCase()}
                      </div>
                    </Card>
                  </div>
                )}

                {/* 10. Source Code: Private & Request a Demo CTA */}
                {project.sourceCodeNotice && (
                  <div className="p-8 rounded-3xl bg-gradient-to-b from-card to-bg-secondary border border-border space-y-5">
                    <div className="flex items-center gap-2">
                      <Lock size={18} className="text-accent" />
                      <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                        {project.sourceCodeNotice.statusText}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold font-display text-copy">
                      Interested in Seeing a System Demonstration?
                    </h3>

                    <p className="text-sm text-copy-secondary leading-relaxed max-w-2xl">
                      {project.sourceCodeNotice.description}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <Button
                        to={project.sourceCodeNotice.demoActionUrl || '/#contact'}
                        variant="primary"
                        iconRight={<ExternalLink size={16} />}
                      >
                        {project.sourceCodeNotice.demoActionText || 'Request a Demo'}
                      </Button>

                      <Button
                        href={profileData.socials.linkedin.url}
                        target="_blank"
                        variant="outline"
                        iconLeft={<LinkedinIcon size={16} />}
                      >
                        Connect on LinkedIn
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Sidebar: Meta Details, Role, Tech, CTAs */}
              <aside className="lg:col-span-4 space-y-6 sticky top-24">
                {/* Project Meta Card */}
                <Card variant="default" padding="md" className="space-y-4">
                  <h3 className="text-sm font-mono uppercase tracking-wider text-copy font-semibold pb-3 border-b border-border">
                    Project Specifications
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-copy-muted block font-mono">Category</span>
                      <span className="text-copy font-medium">{project.category}</span>
                    </div>

                    <div>
                      <span className="text-copy-muted block font-mono">Filter Tag</span>
                      <span className="text-copy font-medium">{project.filterCategory}</span>
                    </div>

                    {project.statusBadge && (
                      <div>
                        <span className="text-copy-muted block font-mono">Status</span>
                        <span className="text-accent font-medium">{project.statusBadge}</span>
                      </div>
                    )}

                    {project.role && (
                      <div>
                        <span className="text-copy-muted block font-mono">Engineering Role</span>
                        <span className="text-copy font-medium">{project.role}</span>
                      </div>
                    )}

                    <div>
                      <span className="text-copy-muted block font-mono">Technologies</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.technologies.map((t) => (
                          <Badge key={t.name} variant="outline" size="sm">
                            {t.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Verified Contribution Callout */}
                <Card variant="glass" padding="md" className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-copy font-semibold">
                      My Contribution
                    </span>
                    {project.myContribution ? (
                      <Badge variant="accent" size="sm">
                        Verified Role
                      </Badge>
                    ) : (
                      <Badge variant="outline" size="sm">
                        To be added
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-copy-secondary leading-relaxed">
                    {project.myContribution ||
                      'Detailed personal engineering role, specific module ownership, and commit highlights will be documented once validated against the repository records.'}
                  </p>
                  <div className="pt-2 text-[10px] font-mono text-copy-muted">
                    {project.myContribution
                      ? 'VERIFIED ARCHITECTURE // REPO SPEC'
                      : 'INTEGRITY RULE // NO HALLUCINATED CLAIMS'}
                  </div>
                </Card>

                {/* Verified Results & Lessons Learned Callout */}
                <Card variant="glass" padding="md" className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-copy font-semibold">
                      Results & Impact
                    </span>
                    {project.resultsAndLessons ? (
                      <Badge variant="accent" size="sm">
                        Active In Production
                      </Badge>
                    ) : (
                      <Badge variant="outline" size="sm">
                        To be added
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-copy-secondary leading-relaxed">
                    {project.resultsAndLessons ||
                      'Empirical benchmarks, user feedback data, and key retrospective lessons learned will be added upon milestone completion.'}
                  </p>
                  <div className="pt-2 text-[10px] font-mono text-copy-muted">
                    {project.resultsAndLessons
                      ? 'VERIFIED IMPACT // INSTITUTIONAL DEPLOYMENT'
                      : 'INTEGRITY RULE // NO FAKE PERFORMANCE METRICS'}
                  </div>
                </Card>

                {/* Source Code Notice / Demo CTA in Sidebar */}
                <Card variant="default" padding="md" className="text-center space-y-3">
                  <div className="inline-flex p-3 rounded-2xl bg-bg border border-border text-accent mb-1">
                    <Lock size={20} />
                  </div>
                  <h4 className="text-sm font-bold font-display text-copy">
                    Private University System
                  </h4>
                  <p className="text-xs text-copy-secondary">
                    Due to student privacy and institutional security, source code and live administrative endpoints are private.
                  </p>
                  <Button to="/#contact" variant="primary" size="sm" className="w-full justify-center">
                    Request a Demo
                  </Button>
                </Card>
              </aside>
            </div>
          </Container>
        </main>

        {/* Previous / Next Project Navigation Bar */}
        <section className="border-t border-border bg-bg-secondary/40 py-12">
          <Container size="xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {prevProject ? (
                <Link
                  to={`/projects/${prevProject.slug}`}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-accent/40 transition-colors flex items-center gap-4"
                >
                  <div className="p-3 rounded-xl bg-bg border border-border group-hover:text-accent transition-colors">
                    <ChevronLeft size={20} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-copy-muted block">
                      Previous Case Study
                    </span>
                    <span className="text-base font-bold font-display text-copy group-hover:text-accent transition-colors">
                      {prevProject.title}
                    </span>
                  </div>
                </Link>
              ) : (
                <div className="p-6 rounded-2xl bg-card/40 border border-border/40 text-copy-muted text-xs font-mono flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-copy-muted" />
                  <span>First Case Study in Sequence</span>
                </div>
              )}

              {nextProject ? (
                <Link
                  to={`/projects/${nextProject.slug}`}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-accent/40 transition-colors flex items-center justify-end gap-4 text-right"
                >
                  <div>
                    <span className="text-[11px] font-mono uppercase text-copy-muted block">
                      Next Case Study
                    </span>
                    <span className="text-base font-bold font-display text-copy group-hover:text-accent transition-colors">
                      {nextProject.title}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-bg border border-border group-hover:text-accent transition-colors">
                    <ChevronRight size={20} />
                  </div>
                </Link>
              ) : (
                <div className="p-6 rounded-2xl bg-card/40 border border-border/40 text-copy-muted text-xs font-mono flex items-center justify-end gap-3">
                  <span>Last Case Study in Sequence</span>
                  <span className="h-2 w-2 rounded-full bg-copy-muted" />
                </div>
              )}
            </div>
          </Container>
        </section>
      </div>
    </>
  );
};

export default ProjectDetailsPage;
