import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';

const experiences = [
  {
    title: 'Web Development Intern',
    company: 'CollegeTips.in',
    location: 'Remote, India & Netherlands',
    duration: 'May 2025 – Jun 2025',
    description: [
      'Built responsive web pages and AI-powered chatbots using no-code and automation platforms',
      'Optimized user experience through intelligent automation',
      'Enhanced communication, leadership, and project management skills through AI-driven virtual collaboration',
    ],
    technologies: ['No-Code Tools', 'AI Chatbots', 'Canva', 'Automation'],
  },
  {
    title: 'Full-Stack Development Intern',
    company: 'Unified Mentor Pvt Ltd',
    location: 'Remote, India',
    duration: 'Apr 2025 – May 2025',
    description: [
      'Developed dynamic web applications using React.js, MongoDB, HTML, CSS, and JavaScript',
      'Integrated Razorpay API for payment functionality',
      'Collaborated via Git and GitHub, earned a Letter of Recommendation for outstanding performance',
    ],
    technologies: ['React.js', 'MongoDB', 'JavaScript', 'Razorpay API', 'Git/GitHub'],
  },
];

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="relative section-padding">
      <div className="container-custom" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey and internship experiences
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title + exp.company}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 last:mb-0 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1.5 md:-translate-x-2 mt-6 ring-4 ring-background" />

              {/* Content */}
              <div className={`flex-1 ml-8 md:ml-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <div className="glass-card rounded-2xl p-6 hover:border-primary/50 transition-all duration-300">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-display text-xl font-semibold">{exp.title}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {exp.duration}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {exp.location}
                    </div>
                  </div>

                  {/* Description */}
                  <ul className="space-y-2 mb-4">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs bg-primary/10 text-primary rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
