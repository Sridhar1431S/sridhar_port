import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Calendar, Award } from 'lucide-react';

const education = [
  {
    degree: 'B.Tech - Computer Science',
    institution: 'Sri Venkateswara College Of Engineering and Technology (JNTUA)',
    year: '2022 - 2026',
    score: '87%',
  },
  {
    degree: 'Intermediate (MPC)',
    institution: 'Mother Theresa Junior College',
    year: '2020 - 2022',
    score: '73%',
  },
  {
    degree: 'SSC',
    institution: 'Sri Chaitanya Children\'s Academy',
    year: '2020',
    score: '100%',
  },
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative section-padding">
      <div className="container-custom" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A passionate developer on a journey to build impactful solutions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card rounded-2xl p-6 lg:p-8">
              <p className="text-lg leading-relaxed text-muted-foreground">
                I'm an innovative and versatile <span className="text-foreground font-medium">B.Tech Computer Science student</span> seeking 
                entry-level roles as an <span className="text-primary font-medium">Agentic Software Engineer</span> and{' '}
                <span className="text-primary font-medium">Full-Stack Developer</span>.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mt-4">
                Proficient in <span className="text-foreground">Python, JavaScript, Machine Learning, NLP</span>, and modern 
                web frameworks including React.js, Django, and Flask. Strong foundation in algorithms, data pipelines, 
                software development, and responsive web design.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mt-4">
                Eager to contribute to building <span className="text-primary font-medium">autonomous AI systems</span> and 
                robust web applications while continuously learning and growing in a dynamic environment.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '2+', label: 'Internships' },
                { value: '4+', label: 'Projects' },
                { value: '8+', label: 'Certifications' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="glass-card rounded-xl p-4 text-center"
                >
                  <p className="font-display text-3xl font-bold gradient-text">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-semibold">Education</h3>
            </div>

            <div className="space-y-4">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="glass-card rounded-xl p-5 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-display font-semibold text-lg">{edu.degree}</h4>
                      <p className="text-muted-foreground text-sm mt-1">{edu.institution}</p>
                    </div>
                    <div className="flex items-center gap-2 text-primary bg-primary/10 px-3 py-1 rounded-full text-sm font-medium">
                      <Award className="w-3.5 h-3.5" />
                      {edu.score}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3 text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4" />
                    {edu.year}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
