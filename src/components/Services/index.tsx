import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Globe,
  Code2,
  Palette,
  Layers,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Card } from '@/components/common/Card';
import { servicesData, type ServiceItem } from '@/data/services';

export const Services: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const getServiceIcon = (iconName: string) => {
    const props = { size: 24, className: 'text-accent' };
    switch (iconName) {
      case 'Globe':
        return <Globe {...props} />;
      case 'Code2':
        return <Code2 {...props} />;
      case 'Palette':
        return <Palette {...props} />;
      case 'Layers':
        return <Layers {...props} />;
      default:
        return <Code2 {...props} />;
    }
  };

  return (
    <section id="services" className="py-24 sm:py-32 bg-bg relative">
      <Container size="xl">
        <SectionHeading
          label="Core Offerings"
          title="Turning Ideas Into Digital Solutions."
          description="Transforming conceptual requirements into performant, reliable digital realities. Clear scopes, robust technical craftsmanship, and human-centered design principles."
        />

        {/* 4 Services Bento Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {servicesData.map((service: ServiceItem, index: number) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.5,
                delay: shouldReduceMotion ? 0 : index * 0.1,
                ease: 'easeOut',
              }}
              className="h-full"
            >
              <Card
                variant="interactive"
                padding="lg"
                className="h-full flex flex-col justify-between group"
              >
                <div>
                  {/* Top Header: Icon & Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-2xl bg-card-hover border border-border group-hover:border-accent/40 group-hover:bg-accent-muted/10 transition-colors">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <span className="font-mono text-xs sm:text-sm font-bold text-copy-muted group-hover:text-accent transition-colors">
                      {service.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-copy group-hover:text-accent transition-colors mb-3">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-copy-secondary leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2.5 pt-4 border-t border-border/70">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-copy-muted block mb-2">
                      Key Deliverables:
                    </span>
                    {service.deliverables.map((deliv, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-copy-secondary">
                        <CheckCircle2 size={13} className="text-accent shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action Anchor */}
                <div className="mt-8 pt-4 border-t border-border/80 flex items-center justify-between text-xs font-medium text-copy-secondary group-hover:text-copy transition-colors">
                  <span>Inquire Solution</span>
                  <ArrowUpRight
                    size={16}
                    className="text-accent transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
