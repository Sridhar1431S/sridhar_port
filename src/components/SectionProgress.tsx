import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certs' },
  { id: 'blog', label: 'Blog' },
  { id: 'testimonials', label: 'Reviews' },
  { id: 'contact', label: 'Contact' },
];

export const SectionProgress = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [sectionProgress, setSectionProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    const handleScroll = () => {
      const newProgress: Record<string, number> = {};
      
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const elementHeight = element.offsetHeight;
          
          // Calculate how much of the section is visible/scrolled through
          if (rect.top >= windowHeight) {
            newProgress[id] = 0;
          } else if (rect.bottom <= 0) {
            newProgress[id] = 100;
          } else {
            const visibleHeight = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top);
            const scrolledThrough = Math.max(0, -rect.top);
            const progress = Math.min(100, (scrolledThrough / (elementHeight - windowHeight / 2)) * 100);
            newProgress[id] = Math.max(0, Math.min(100, progress));
          }
          
          // Set active section
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            setActiveSection(id);
          }
        }
      });
      
      setSectionProgress(newProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3"
    >
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          className="group flex items-center gap-3"
        >
          {/* Label */}
          <span
            className={`text-xs font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 ${
              activeSection === id ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            {label}
          </span>
          
          {/* Progress indicator */}
          <div className="relative w-1.5 h-8 rounded-full bg-muted overflow-hidden">
            <motion.div
              className={`absolute bottom-0 left-0 right-0 rounded-full transition-colors duration-300 ${
                activeSection === id ? 'bg-primary' : 'bg-muted-foreground/50'
              }`}
              style={{ height: `${sectionProgress[id] || 0}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          
          {/* Active indicator dot */}
          <motion.div
            className={`absolute right-0 w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              activeSection === id ? 'bg-primary scale-100' : 'bg-transparent scale-0'
            }`}
            animate={{ scale: activeSection === id ? 1 : 0 }}
          />
        </button>
      ))}
    </motion.div>
  );
};
