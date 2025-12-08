import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Star, Code, Briefcase, GraduationCap } from 'lucide-react';

const certifications = [
  {
    title: '5-Star Python Rating',
    issuer: 'HackerRank',
    icon: Star,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
  },
  {
    title: 'Smart India Hackathon',
    issuer: 'Government of India - 2023',
    icon: Award,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    title: 'Web Development',
    issuer: 'Smart India Hackathon',
    icon: Code,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    title: 'Python Development',
    issuer: 'Techno Hacks Edu Tech',
    icon: Code,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    title: 'Python Basic & UX Design',
    issuer: 'Infosys',
    icon: GraduationCap,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
  },
  {
    title: 'Software Development',
    issuer: 'Flipkart Grid 5.0',
    icon: Briefcase,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  {
    title: 'Full-Stack Web Development',
    issuer: 'Unified Mentor Pvt Ltd',
    icon: Code,
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
  },
  {
    title: 'AI Internship',
    issuer: 'CollegeTips.in',
    icon: Award,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
  },
];

export const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="certifications" className="relative section-padding">
      <div className="container-custom" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Certifications</span> & Achievements
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Recognition of my skills and continuous learning journey
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title + cert.issuer}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group glass-card rounded-xl p-5 hover:border-primary/50 transition-all duration-300"
            >
              <div className={`inline-flex p-2.5 rounded-lg ${cert.bgColor} mb-4`}>
                <cert.icon className={`w-5 h-5 ${cert.color}`} />
              </div>
              <h3 className="font-display font-semibold mb-1 group-hover:text-primary transition-colors">
                {cert.title}
              </h3>
              <p className="text-sm text-muted-foreground">{cert.issuer}</p>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <h3 className="font-display text-2xl font-semibold text-center mb-8">
            Other <span className="gradient-text">Skills</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Problem Solving',
              'Analytical Thinking',
              'Team Collaboration',
              'Content Creation',
              'Video Editing',
              'Graphic Design',
              'Dashboard Creation',
              'AI Tools Exploration',
            ].map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                className="px-4 py-2 bg-secondary/50 border border-border rounded-full text-sm hover:border-primary/50 hover:text-primary transition-colors"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
