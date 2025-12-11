import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import profileImage from '@/assets/profile.jpg';
import { useState, useEffect } from 'react';
import { ParticleBackground } from './ParticleBackground';

const roles = [
  'Full-Stack Developer',
  'AI Engineer',
  'Agentic Software Engineer'
];

export const Hero = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-radial" />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, -20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="container-custom section-padding relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-primary font-medium mb-4 tracking-wide"
            >
              Hello, I'm
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4"
            >
              Sridhar Reddy
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="h-12 sm:h-14 lg:h-16 mb-6 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.h2
                  key={currentRoleIndex}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold gradient-text flex items-center justify-center lg:justify-start"
                >
                  {roles[currentRoleIndex]}
                  <span className="ml-1 w-[3px] h-8 sm:h-10 lg:h-12 bg-primary animate-pulse" />
                </motion.h2>
              </AnimatePresence>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground text-lg max-w-xl mx-auto lg:mx-0 mb-6"
            >
              Building autonomous AI systems and production-ready web applications
              with Python, React.js, and modern ML frameworks.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground mb-8"
            >
              <MapPin className="w-4 h-4 text-primary" />
              <span>Chittoor, India</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8"
            >
              <Button
                size="lg"
                className="gap-2"
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Mail className="w-4 h-4" />
                Get in Touch
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-2"
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Projects
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-center lg:justify-start gap-4"
            >
              <a
                href="https://www.linkedin.com/in/sridhar-reddy-a4779b258"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/Sridhar1431S/sridhar_port"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:sridhar709398@gmail.com"
                className="p-3 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
              >
                <Mail className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-shrink-0"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl animate-pulse-glow" />
              
              {/* Rotating border */}
              <motion.div
                className="absolute -inset-2 rounded-full border-2 border-dashed border-primary/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Image container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/50">
                <img
                  src={profileImage}
                  alt="Sridhar Reddy - Full-Stack Developer"
                  className="w-full h-full object-cover"
                  fetchPriority="high"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToAbout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-sm font-medium">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
};
