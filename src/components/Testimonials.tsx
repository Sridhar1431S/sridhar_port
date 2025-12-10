import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Quote, Star, Linkedin } from 'lucide-react';

const testimonials = [
  {
    name: 'Dr. Ramesh Kumar',
    role: 'Professor, SVCET',
    relationship: 'Academic Mentor',
    quote: 'Sridhar demonstrates exceptional problem-solving abilities and a deep understanding of AI concepts. His dedication to learning and ability to apply theoretical knowledge to practical projects sets him apart.',
    avatar: 'RK',
    linkedIn: '',
  },
  {
    name: 'Priya Sharma',
    role: 'Senior Developer, TechCorp',
    relationship: 'Internship Supervisor',
    quote: 'During his internship, Sridhar showed remarkable initiative in implementing full-stack solutions. His code quality and attention to detail are impressive for someone at his experience level.',
    avatar: 'PS',
    linkedIn: '',
  },
  {
    name: 'Venkat Reddy',
    role: 'Team Lead, AIStartup',
    relationship: 'Project Collaborator',
    quote: 'Working with Sridhar on our AI project was a great experience. He brings creativity and technical expertise together, always finding innovative solutions to complex problems.',
    avatar: 'VR',
    linkedIn: '',
  },
];

export const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="testimonials" className="relative section-padding overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-radial opacity-50" />
      
      <div className="container-custom relative" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            What People <span className="gradient-text">Say</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Feedback from mentors, colleagues, and collaborators I've worked with
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: 0.2 + index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="group"
            >
              <div className="glass-card rounded-2xl p-6 lg:p-8 h-full flex flex-col relative overflow-hidden hover:border-primary/50 transition-all duration-500">
                {/* Quote icon */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-16 h-16 text-primary" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-muted-foreground leading-relaxed mb-6 flex-1 relative z-10">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold font-display">
                    {testimonial.avatar}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-display font-semibold">{testimonial.name}</h4>
                      {testimonial.linkedIn && (
                        <a
                          href={testimonial.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-primary/70 mt-0.5">{testimonial.relationship}</p>
                  </div>
                </div>

                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.1), transparent 70%)',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            Want to leave a recommendation?{' '}
            <a
              href="https://www.linkedin.com/in/sridhar-reddy-a4779b258"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Connect on LinkedIn
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
