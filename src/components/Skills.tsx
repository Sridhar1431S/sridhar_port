import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Code2, 
  Brain, 
  Globe, 
  Database, 
  Wrench, 
  Cpu 
} from 'lucide-react';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: Code2,
    skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'SQL'],
    color: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'AI & Machine Learning',
    icon: Brain,
    skills: ['NLP', 'PyTorch', 'TensorFlow', 'LangChain', 'OpenAI API', 'Prompt Engineering'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Web Development',
    icon: Globe,
    skills: ['React.js', 'Django', 'Flask', 'REST APIs', 'HTML/CSS', 'Flutter'],
    color: 'from-green-500 to-teal-500',
  },
  {
    title: 'Databases',
    icon: Database,
    skills: ['MySQL', 'MongoDB', 'PostgreSQL'],
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'Tools & Frameworks',
    icon: Wrench,
    skills: ['VS Code', 'Jupyter', 'Power BI', 'Git/GitHub'],
    color: 'from-yellow-500 to-orange-500',
  },
  {
    title: 'Core Competencies',
    icon: Cpu,
    skills: ['Agent Workflow Design', 'Automation Systems', 'Data Pipelines', 'AI Agent Integration'],
    color: 'from-indigo-500 to-purple-500',
  },
];

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="relative section-padding bg-secondary/30">
      <div className="container-custom" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group glass-card rounded-2xl p-6 hover:border-primary/50 transition-all duration-300"
            >
              {/* Icon */}
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category.color} mb-4`}>
                <category.icon className="w-6 h-6 text-white" />
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-semibold mb-4">{category.title}</h3>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm bg-background/50 rounded-lg border border-border hover:border-primary/50 hover:text-primary transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
