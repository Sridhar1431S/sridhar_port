import { lazy, Suspense } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { SectionWrapper } from '@/components/SectionWrapper';
import { SectionProgress } from '@/components/SectionProgress';

// Lazy load below-the-fold components
const About = lazy(() => import('@/components/About').then(m => ({ default: m.About })));
const Skills = lazy(() => import('@/components/Skills').then(m => ({ default: m.Skills })));
const Experience = lazy(() => import('@/components/Experience').then(m => ({ default: m.Experience })));
const Projects = lazy(() => import('@/components/Projects').then(m => ({ default: m.Projects })));
const Certifications = lazy(() => import('@/components/Certifications').then(m => ({ default: m.Certifications })));
const Blog = lazy(() => import('@/components/Blog').then(m => ({ default: m.Blog })));
const Testimonials = lazy(() => import('@/components/Testimonials').then(m => ({ default: m.Testimonials })));
const Contact = lazy(() => import('@/components/Contact').then(m => ({ default: m.Contact })));
const Footer = lazy(() => import('@/components/Footer').then(m => ({ default: m.Footer })));

const LazySection = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="min-h-[200px]" />}>
    {children}
  </Suspense>
);

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <Navbar />
      <SectionProgress />
      <Hero />
      <LazySection>
        <SectionWrapper>
          <About />
        </SectionWrapper>
      </LazySection>
      <LazySection>
        <SectionWrapper delay={0.1}>
          <Skills />
        </SectionWrapper>
      </LazySection>
      <LazySection>
        <SectionWrapper delay={0.1}>
          <Experience />
        </SectionWrapper>
      </LazySection>
      <LazySection>
        <SectionWrapper delay={0.1}>
          <Projects />
        </SectionWrapper>
      </LazySection>
      <LazySection>
        <SectionWrapper delay={0.1}>
          <Certifications />
        </SectionWrapper>
      </LazySection>
      <LazySection>
        <SectionWrapper delay={0.1}>
          <Blog />
        </SectionWrapper>
      </LazySection>
      <LazySection>
        <SectionWrapper delay={0.1}>
          <Testimonials />
        </SectionWrapper>
      </LazySection>
      <LazySection>
        <SectionWrapper delay={0.1}>
          <Contact />
        </SectionWrapper>
      </LazySection>
      <LazySection>
        <Footer />
      </LazySection>
    </main>
  );
};

export default Index;
