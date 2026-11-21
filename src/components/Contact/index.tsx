import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Mail,
  MapPin,
  Send,
  AlertCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldCheck,
  Phone,
  GraduationCap,
} from 'lucide-react';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { GithubIcon, LinkedinIcon, FiverrIcon } from '@/components/common/BrandIcons';
import { contactFormSchema, type ContactFormValues } from '@/utils/contactValidation';
import { sendContactMessage, type ContactSendResult } from '@/services/contact';
import { profileData } from '@/data/profile';
import { cn } from '@/utils/cn';

export const Contact: React.FC = () => {
  const [submissionResult, setSubmissionResult] = useState<ContactSendResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      subject: '',
      message: '',
      honeypot: '',
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      const result = await sendContactMessage(values);
      setSubmissionResult(result);
      if (result.success) {
        reset();
      }
    } catch (err) {
      setSubmissionResult({
        success: false,
        status: 'error',
        message: 'An unexpected error occurred. Please reach out to me directly via email.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEndpointConfigured = Boolean(
    import.meta.env.VITE_CONTACT_ENDPOINT &&
    import.meta.env.VITE_CONTACT_ENDPOINT.trim() !== ''
  );

  return (
    <section id="contact" className="py-24 sm:py-32 bg-bg relative overflow-hidden">
      {/* Background Matrix Effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--accent) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <Container size="xl" className="relative z-10">
        <SectionHeading
          label="Direct Inquiries"
          title="Have an Idea? Let's Build Something Meaningful."
          description="Whether you have an upcoming project, an opportunity, or a collaborative venture, my inbox is open. Fill out the form or connect through any of my direct channels."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* Left Column: Direct Contact Info & Verified Channels */}
          <div className="lg:col-span-5 space-y-6">
            <Card variant="default" padding="lg">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold block mb-2">
                Location & Availability
              </span>
              <h3 className="text-2xl font-bold font-display text-copy mb-3">
                Connect Directly
              </h3>
              <p className="text-sm text-copy-secondary leading-relaxed mb-6">
                Based in {profileData.location}. Dedicated to full-stack engineering, responsive interfaces, and scalable architectures.
              </p>

              {/* Direct Info List */}
              <div className="space-y-4 text-sm pb-6 border-b border-border">
                <div className="flex items-center gap-3 text-copy">
                  <div className="p-2.5 rounded-xl bg-card-hover border border-border text-accent">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-copy-muted block">Location</span>
                    <span className="font-semibold">{profileData.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-copy">
                  <div className="p-2.5 rounded-xl bg-card-hover border border-border text-accent">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-copy-muted block">Direct Email</span>
                    <a
                      href={profileData.socials.email.url}
                      className="font-mono text-xs text-copy hover:text-accent transition-colors underline decoration-accent/40 underline-offset-4"
                    >
                      {profileData.socials.email.url.replace('mailto:', '')}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-copy">
                  <div className="p-2.5 rounded-xl bg-card-hover border border-border text-accent">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-copy-muted block">Academic Student Email</span>
                    <a
                      href={`mailto:${profileData.academicEmail}`}
                      className="font-mono text-xs text-copy hover:text-accent transition-colors underline decoration-accent/40 underline-offset-4"
                    >
                      {profileData.academicEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-copy">
                  <div className="p-2.5 rounded-xl bg-card-hover border border-border text-accent">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-copy-muted block">Direct Phone</span>
                    <a
                      href={`tel:${profileData.phoneRaw}`}
                      className="font-mono text-xs text-copy hover:text-accent transition-colors font-semibold"
                    >
                      {profileData.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-copy">
                  <div className="p-2.5 rounded-xl bg-card-hover border border-border text-accent">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-copy-muted block">Work Status</span>
                    <span className="text-xs font-medium text-accent">
                      {profileData.status.availabilityText}
                    </span>
                  </div>
                </div>
              </div>

              {/* Professional Channels */}
              <div className="pt-6">
                <span className="text-xs font-mono uppercase tracking-wider text-copy-muted block mb-3">
                  Online Profiles & Channels:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* GitHub (Verified) */}
                  <a
                    href={profileData.socials.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl border border-border bg-bg hover:border-accent/50 hover:bg-card-hover transition-colors flex items-center justify-between group text-xs font-mono"
                  >
                    <div className="flex items-center gap-2 text-copy group-hover:text-accent transition-colors">
                      <GithubIcon size={16} />
                      <span className="font-medium">GitHub</span>
                    </div>
                    <ExternalLink size={13} className="text-copy-muted group-hover:text-accent" />
                  </a>

                  {/* LinkedIn (Verified) */}
                  <a
                    href={profileData.socials.linkedin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl border border-border bg-bg hover:border-accent/50 hover:bg-card-hover transition-colors flex items-center justify-between group text-xs font-mono"
                    title={profileData.socials.linkedin.label}
                  >
                    <div className="flex items-center gap-2 text-copy group-hover:text-accent transition-colors">
                      <LinkedinIcon size={16} />
                      <span className="font-medium">LinkedIn</span>
                    </div>
                    <ExternalLink size={13} className="text-copy-muted group-hover:text-accent" />
                  </a>

                  {/* Fiverr */}
                  <a
                    href={profileData.socials.fiverr.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl border border-border bg-bg hover:border-accent/50 hover:bg-card-hover transition-colors flex items-center justify-between group text-xs font-mono"
                    title={profileData.socials.fiverr.label}
                  >
                    <div className="flex items-center gap-2 text-copy group-hover:text-accent transition-colors">
                      <FiverrIcon size={16} />
                      <span className="font-medium">Fiverr</span>
                    </div>
                    <span className="text-[10px] text-copy-muted font-sans">[link]</span>
                  </a>

                  {/* Email Quick Action */}
                  <a
                    href={profileData.socials.email.url}
                    className="p-3 rounded-xl border border-border bg-bg hover:border-accent/50 hover:bg-card-hover transition-colors flex items-center justify-between group text-xs font-mono"
                  >
                    <div className="flex items-center gap-2 text-copy group-hover:text-accent transition-colors">
                      <Mail size={16} />
                      <span className="font-medium">Direct Mail</span>
                    </div>
                    <span className="text-[10px] text-accent font-sans">Open</span>
                  </a>
                </div>
              </div>
            </Card>

            {/* Verification & Transparency Callout */}
            <div className="p-4 rounded-2xl bg-card border border-border flex items-center gap-3 text-xs text-copy-secondary">
              <ShieldCheck size={18} className="text-accent shrink-0" />
              <span>
                Protected with honeypot bot detection, input sanitization, and client throttling.
              </span>
            </div>
          </div>

          {/* Right Column: React Hook Form + Zod Validated Form */}
          <div className="lg:col-span-7">
            <Card variant="glass" padding="lg">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-6 pb-4 border-b border-border/80">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-copy">
                    Send a Message
                  </h3>
                  <p className="text-xs text-copy-secondary mt-0.5">
                    Structured submission with instantaneous input validation
                  </p>
                </div>
                <Badge variant={isEndpointConfigured ? 'accent' : 'outline'} size="sm">
                  {isEndpointConfigured ? 'Live Endpoint Ready' : 'Setup In README'}
                </Badge>
              </div>

              {/* Status Alert Banners */}
              {submissionResult && (
                <motion.div
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    'p-4 rounded-xl border text-xs sm:text-sm mb-6 flex items-start gap-3',
                    submissionResult.success
                      ? 'bg-accent-muted/20 border-accent/40 text-copy'
                      : submissionResult.status === 'unconfigured'
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                      : 'bg-red-500/10 border-red-500/30 text-red-200'
                  )}
                  role="alert"
                >
                  {submissionResult.success ? (
                    <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <p className="font-semibold font-display">
                      {submissionResult.success
                        ? 'Submission Successful'
                        : submissionResult.status === 'unconfigured'
                        ? 'Endpoint Configuration Notice'
                        : 'Submission Failed'}
                    </p>
                    <p className="leading-relaxed opacity-90">{submissionResult.message}</p>
                    {submissionResult.status === 'unconfigured' && (
                      <p className="pt-1 font-mono text-xs text-copy-secondary">
                        Direct Email: <a href={profileData.socials.email.url} className="text-accent underline">{profileData.socials.email.url.replace('mailto:', '')}</a>
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Form Element */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                {/* Honeypot field (hidden from human visitors) */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden opacity-0 absolute pointer-events-none"
                  aria-hidden="true"
                  {...register('honeypot')}
                />

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-mono uppercase tracking-wider text-copy-secondary font-medium"
                    >
                      Full Name <span className="text-accent">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      placeholder="Your name"
                      aria-invalid={errors.fullName ? 'true' : 'false'}
                      aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                      disabled={isSubmitting}
                      className={cn(
                        'w-full px-4 py-3 rounded-xl bg-card border text-copy text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                        errors.fullName
                          ? 'border-red-500/60 focus-visible:ring-red-400'
                          : 'border-border focus-visible:border-accent'
                      )}
                      {...register('fullName')}
                    />
                    {errors.fullName && (
                      <p id="fullName-error" className="text-xs text-red-400 flex items-center gap-1 mt-1">
                        <AlertCircle size={12} />
                        <span>{errors.fullName.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono uppercase tracking-wider text-copy-secondary font-medium"
                    >
                      Email Address <span className="text-accent">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      disabled={isSubmitting}
                      className={cn(
                        'w-full px-4 py-3 rounded-xl bg-card border text-copy text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                        errors.email
                          ? 'border-red-500/60 focus-visible:ring-red-400'
                          : 'border-border focus-visible:border-accent'
                      )}
                      {...register('email')}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-xs text-red-400 flex items-center gap-1 mt-1">
                        <AlertCircle size={12} />
                        <span>{errors.email.message}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="subject"
                    className="block text-xs font-mono uppercase tracking-wider text-copy-secondary font-medium"
                  >
                    Subject <span className="text-accent">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Project Inquiry / Opportunity"
                    aria-invalid={errors.subject ? 'true' : 'false'}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                    disabled={isSubmitting}
                    className={cn(
                      'w-full px-4 py-3 rounded-xl bg-card border text-copy text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                      errors.subject
                        ? 'border-red-500/60 focus-visible:ring-red-400'
                        : 'border-border focus-visible:border-accent'
                    )}
                    {...register('subject')}
                  />
                  {errors.subject && (
                    <p id="subject-error" className="text-xs text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle size={12} />
                      <span>{errors.subject.message}</span>
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono uppercase tracking-wider text-copy-secondary font-medium"
                  >
                    Message <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell me about your requirements, project scope, or questions..."
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    disabled={isSubmitting}
                    className={cn(
                      'w-full px-4 py-3 rounded-xl bg-card border text-copy text-sm transition-colors resize-y focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                      errors.message
                        ? 'border-red-500/60 focus-visible:ring-red-400'
                        : 'border-border focus-visible:border-accent'
                    )}
                    {...register('message')}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-xs text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle size={12} />
                      <span>{errors.message.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                    iconRight={<Send size={16} />}
                    className="w-full justify-center"
                  >
                    {isSubmitting ? 'Verifying & Sending...' : 'Send Message'}
                  </Button>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-copy-muted pt-2 border-t border-border/80">
                  <span>SSL ENCRYPTED CHANNEL</span>
                  <span>15S SPAM THROTTLING</span>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
};
