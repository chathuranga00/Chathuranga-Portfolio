import React, { useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import {
  Code2,
  Palette,
  FileCode,
  Atom,
  Coffee,
  Leaf,
  Server,
  Terminal,
  Database,
  Boxes,
  Smartphone,
  Layout,
  GitBranch,
  Network,
  Cloud,
  Cpu,
  Zap,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { FigmaIcon, GithubIcon } from '@/components/common/BrandIcons';
import { skillsCategories, type SkillItem } from '@/data/skills';
import { cn } from '@/utils/cn';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const shouldReduceMotion = useReducedMotion();

  const getSkillIcon = (iconName: string) => {
    const props = { size: 20, className: 'text-accent' };
    switch (iconName) {
      case 'Code2':
        return <Code2 {...props} />;
      case 'Palette':
        return <Palette {...props} />;
      case 'FileCode':
        return <FileCode {...props} />;
      case 'Atom':
        return <Atom {...props} />;
      case 'Coffee':
        return <Coffee {...props} />;
      case 'Leaf':
        return <Leaf {...props} />;
      case 'Server':
        return <Server {...props} />;
      case 'Terminal':
        return <Terminal {...props} />;
      case 'Database':
        return <Database {...props} />;
      case 'Boxes':
        return <Boxes {...props} />;
      case 'Figma':
        return <FigmaIcon {...props} />;
      case 'Smartphone':
        return <Smartphone {...props} />;
      case 'Layout':
        return <Layout {...props} />;
      case 'GitBranch':
        return <GitBranch {...props} />;
      case 'Github':
        return <GithubIcon {...props} />;
      case 'Network':
        return <Network {...props} />;
      case 'Cloud':
        return <Cloud {...props} />;
      case 'Cpu':
        return <Cpu {...props} />;
      case 'Zap':
        return <Zap {...props} />;
      default:
        return <Code2 {...props} />;
    }
  };

  const categories = [
    { label: 'All Disciplines', value: 'all' },
    ...skillsCategories.map((c) => ({ label: c.title, value: c.slug })),
  ];

  const filteredCategories =
    selectedCategory === 'all'
      ? skillsCategories
      : skillsCategories.filter((cat) => cat.slug === selectedCategory);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <section id="expertise" className="py-24 sm:py-32 bg-bg relative">
      <Container size="xl">
        <SectionHeading
          label="Technical Arsenal"
          title="Tools I Use to Build Things."
          description="A curated toolchain focused on modular frontend architectures, scalable backend logic, relational data, and clean ergonomics. No arbitrary percentages or inflated proficiency claims."
        />

        {/* Category Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mr-2 text-xs font-mono uppercase text-copy-muted">
            <SlidersHorizontal size={14} className="text-accent" />
            <span className="hidden sm:inline">Filter By:</span>
          </div>

          {categories.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => setSelectedCategory(cat.value)}
                className={cn(
                  'px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                  isActive
                    ? 'bg-accent text-[#090B0A] font-semibold shadow-glow-accent'
                    : 'bg-card text-copy-secondary border border-border hover:border-accent/40 hover:text-copy'
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Skills Display: Categorized Bento Clusters */}
        <div className="space-y-12 sm:space-y-16">
          {filteredCategories.map((category) => (
            <div key={category.slug} className="space-y-6">
              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-border/80">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-copy">
                    {category.title}
                  </h3>
                  <Badge variant="outline" size="sm">
                    {category.skills.length} Tools
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-copy-secondary max-w-xl">
                  {category.description}
                </p>
              </div>

              {/* Skills Cards Grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
              >
                {category.skills.map((skill: SkillItem) => (
                  <motion.div key={skill.name} variants={itemVariants}>
                    <Card
                      variant="interactive"
                      padding="md"
                      className="h-full group flex flex-col justify-between"
                    >
                      <div>
                        {/* Icon and Category Tag */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-2.5 rounded-xl bg-card-hover border border-border group-hover:border-accent/40 group-hover:bg-accent-muted/10 transition-colors">
                            {getSkillIcon(skill.iconName)}
                          </div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-copy-muted group-hover:text-accent transition-colors">
                            {skill.category}
                          </span>
                        </div>

                        {/* Technology Name */}
                        <h4 className="text-base sm:text-lg font-bold font-display text-copy group-hover:text-accent transition-colors mb-2">
                          {skill.name}
                        </h4>

                        {/* Short Honest Explanation */}
                        <p className="text-xs sm:text-sm text-copy-secondary leading-relaxed">
                          {skill.explanation}
                        </p>
                      </div>

                      {/* Card Footer: Honest Standardized Badge */}
                      <div className="mt-5 pt-3 border-t border-border/80 flex items-center justify-between text-[11px] font-mono text-copy-muted">
                        <div className="flex items-center gap-1.5 text-copy-secondary">
                          <CheckCircle2 size={12} className="text-accent" />
                          <span>Active Competency</span>
                        </div>
                        <span className="group-hover:translate-x-1 transition-transform text-accent">
                          →
                        </span>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
