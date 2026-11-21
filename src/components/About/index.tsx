import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import {
  GraduationCap,
  Layers,
  Sparkles,
  Compass,
  Download,
  ShieldCheck,
  ArrowUpRight,
  Terminal,
} from 'lucide-react';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { profileData } from '@/data/profile';

export const About: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const getCardIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap size={22} className="text-accent" />;
      case 'Layers':
        return <Layers size={22} className="text-accent" />;
      case 'Sparkles':
        return <Sparkles size={22} className="text-accent" />;
      case 'Compass':
        return <Compass size={22} className="text-accent" />;
      default:
        return <Terminal size={22} className="text-accent" />;
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: shouldReduceMotion ? 0 : index * 0.1,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <section id="about" className="py-24 sm:py-32 bg-bg-secondary/40 border-y border-border/60 relative">
      <Container size="xl">
        <SectionHeading
          label="About The Developer"
          title={profileData.aboutHeading}
          description="A balanced union of disciplined software engineering, architectural clarity, and human-centered user experiences."
        />

        {/* Editorial Top Grid: Story & Profile Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16">
          {/* Left Column: Narrative Story & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-base sm:text-lg text-copy-secondary leading-relaxed">
              {profileData.aboutIntro.map((paragraph, idx) => (
                <p key={idx} className="text-balance">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Development Philosophy Quote Card */}
            <div className="p-6 rounded-2xl bg-card border border-border relative overflow-hidden">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck size={18} className="text-accent" />
                <span className="text-xs font-mono uppercase tracking-wider text-copy font-semibold">
                  Engineering Philosophy
                </span>
              </div>
              <p className="text-sm sm:text-base text-copy italic leading-relaxed">
                "{profileData.developmentPhilosophy}"
              </p>
            </div>

            {/* Quick Education Callout */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-bg border border-border">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-accent-muted text-accent border border-accent/20">
                  <GraduationCap size={22} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-copy">{profileData.education.degree}</h4>
                  <p className="text-xs text-copy-secondary">
                    {profileData.education.institution} • {profileData.education.location}
                  </p>
                </div>
              </div>

              <Badge variant="outline" size="sm">
                {profileData.education.status}
              </Badge>
            </div>

            {/* CTA Button */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                href={profileData.resumeUrl}
                download="Chathuranga_Resume.pdf"
                iconLeft={<Download size={16} />}
              >
                Download CV (Placeholder)
              </Button>

              <Button
                variant="outline"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.querySelector('#contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                iconRight={<ArrowUpRight size={16} />}
              >
                Get In Touch
              </Button>
            </div>
          </div>

          {/* Right Column: Clearly Labelled Editorial Profile Photo Placeholder */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm rounded-3xl bg-card border border-border p-6 shadow-xl relative overflow-hidden group">
              {/* Corner Reticle Accents */}
              <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-accent/60" />
              <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-accent/60" />
              <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-accent/60" />
              <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-accent/60" />

              {/* Authentic Developer Portrait Frame */}
              <div className="relative aspect-[4/5] rounded-2xl bg-bg border border-border flex flex-col items-center justify-center text-center overflow-hidden">
                <img
                  src={profileData.avatarUrl}
                  alt={`${profileData.fullName} - Software Developer`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle Gradient Scrim at Bottom for Technical Reticle Info */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#090B0A]/90 via-[#090B0A]/50 to-transparent pointer-events-none" />

                <div className="absolute bottom-3 left-3 right-3 py-1.5 px-3 rounded-lg bg-card/85 backdrop-blur-md border border-border/80 text-[10px] font-mono text-copy-secondary flex justify-between items-center z-10 shadow-lg">
                  <span className="text-copy font-semibold">{profileData.fullName}</span>
                  <span className="text-accent flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                    VERIFIED
                  </span>
                </div>
              </div>

              {/* Caption Below Placeholder */}
              <div className="mt-4 flex items-center justify-between text-xs text-copy-secondary">
                <span className="font-display font-semibold text-copy">{profileData.fullName}</span>
                <span className="font-mono text-[11px] text-copy-muted">{profileData.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Four Info Cards: Asymmetric Bento Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {profileData.infoCards.map((card, index) => (
            <motion.div
              key={card.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <Card
                variant="interactive"
                padding="md"
                className="h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-card-hover border border-border">
                      {getCardIcon(card.iconName)}
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-copy-muted">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-xs font-mono uppercase tracking-wider text-accent mb-1 font-semibold">
                    {card.title}
                  </h3>

                  <h4 className="text-lg font-bold font-display text-copy mb-2">
                    {card.subtitle}
                  </h4>

                  <p className="text-xs sm:text-sm text-copy-secondary leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-border/80 flex items-center justify-between text-[11px] font-mono text-copy-muted">
                  <span>VERIFIED ATTRIBUTE</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
