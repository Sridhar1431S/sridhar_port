import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Experience } from '@/components/Experience';
import { Projects } from '@/components/Projects';
import { Certifications } from '@/components/Certifications';
import { Blog } from '@/components/Blog';
import { Testimonials } from '@/components/Testimonials';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { SectionWrapper } from '@/components/SectionWrapper';
import { SectionProgress } from '@/components/SectionProgress';

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <Navbar />
      <SectionProgress />
      <Hero />
      <SectionWrapper>
        <About />
      </SectionWrapper>
      <SectionWrapper delay={0.1}>
        <Skills />
      </SectionWrapper>
      <SectionWrapper delay={0.1}>
        <Experience />
      </SectionWrapper>
      <SectionWrapper delay={0.1}>
        <Projects />
      </SectionWrapper>
      <SectionWrapper delay={0.1}>
        <Certifications />
      </SectionWrapper>
      <SectionWrapper delay={0.1}>
        <Blog />
      </SectionWrapper>
      <SectionWrapper delay={0.1}>
        <Testimonials />
      </SectionWrapper>
      <SectionWrapper delay={0.1}>
        <Contact />
      </SectionWrapper>
      <Footer />
    </main>
  );
};

export default Index;
