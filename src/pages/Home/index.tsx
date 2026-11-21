import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { GitHubSection } from '@/components/GitHub';
import { GitHubActivity } from '@/components/GitHubActivity';
import { Services } from '@/components/Services';
import { Journey } from '@/components/Journey';
import { Research } from '@/components/Research';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { profileData } from '@/data/profile';

export const HomePage: React.FC = () => {
  const jsonLdPerson = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profileData.fullName,
    alternateName: profileData.name.replace('.', ''),
    jobTitle: 'Software Developer',
    description: profileData.heroDescription,
    email: profileData.socials.email.url,
    telephone: profileData.phone,
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: profileData.education.institution,
      location: profileData.education.location,
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: profileData.location,
    },
    sameAs: [
      profileData.socials.github.url,
      profileData.socials.linkedin.url,
    ],
    knowsAbout: [
      'Full-Stack Web Development',
      'React',
      'TypeScript',
      'Java',
      'Spring Boot',
      'SQL',
      'Supabase',
      'UI/UX Design',
    ],
  };

  return (
    <>
      <Helmet>
        {/* Core Metadata */}
        <title>{`${profileData.fullName} | ${profileData.title}`}</title>
        <meta
          name="description"
          content={`${profileData.fullName} - ${profileData.heroDescription} ${profileData.education.degree} at ${profileData.education.institution}.`}
        />
        <link rel="canonical" href="https://chathuranga.dev/" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chathuranga.dev/" />
        <meta property="og:site_name" content={`${profileData.fullName} Portfolio`} />
        <meta property="og:title" content={`${profileData.fullName} | ${profileData.title}`} />
        <meta property="og:description" content={`${profileData.fullName} - ${profileData.heroDescription}`} />
        <meta property="og:image" content="https://chathuranga.dev/images/og-preview.png" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${profileData.fullName} | ${profileData.title}`} />
        <meta name="twitter:description" content={`${profileData.fullName} - ${profileData.heroDescription}`} />
        <meta name="twitter:image" content="https://chathuranga.dev/images/og-preview.png" />

        {/* JSON-LD Person Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLdPerson)}
        </script>
      </Helmet>

      {/* Main Layout Shell */}
      <div className="relative min-h-screen bg-bg text-copy selection:bg-accent selection:text-[#090B0A] overflow-x-hidden">
        {/* Accessible Skip to Content Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-accent focus:text-black focus:font-semibold focus:rounded-xl focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        >
          Skip to main content
        </a>

        {/* Sticky/Floating Navigation Bar */}
        <Navbar />

        {/* Semantic Main Landmark */}
        <main id="main-content">
          {/* Hero Section */}
          <Hero />

          {/* About Section */}
          <About />

          {/* Technical Expertise (Skills) Section */}
          <Skills />

          {/* Featured Projects Section */}
          <Projects />

          {/* GitHub Open Source & Code Section */}
          <GitHubSection />

          {/* GitHub Activity & Contributions Matrix */}
          <GitHubActivity />

          {/* Services Section */}
          <Services />

          {/* Journey Section */}
          <Journey />

          {/* Academic Research Section */}
          <Research />

          {/* Contact Section */}
          <Contact />
        </main>

        {/* Global Footer Landmark */}
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
