import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Brain, Eye, Database, ExternalLink, Sparkles, Cpu, Zap } from 'lucide-react';

const aiProjects = [
  {
    title: 'Detectra AI',
    subtitle: 'Intelligent Object Detection System',
    description:
      'An AI-powered computer vision system that detects and analyzes objects from images and videos in real-time.',
    features: [
      'Real-time object detection',
      'Image/video upload',
      'AI-based classification',
      'Bounding box visualization',
    ],
    tags: ['AI', 'Computer Vision', 'React', 'ML'],
    icon: Eye,
    link: 'https://detectraai-orcin.vercel.app/',
    accent: 'from-cyan-500 to-blue-600',
    accentMuted: 'from-cyan-500/10 to-blue-600/10',
    glowColor: 'shadow-cyan-500/20',
  },
  {
    title: 'Emp AI',
    subtitle: 'Smart AI Data Processing Platform',
    description:
      'An AI-driven platform that processes user data, analyzes it, and generates predictions and insights.',
    features: [
      'AI-based query processing',
      'Data upload & analysis',
      'Prediction system',
      'Interactive AI interface',
    ],
    tags: ['AI', 'ML', 'Data Science', 'React'],
    icon: Database,
    link: 'https://empai.vercel.app',
    accent: 'from-violet-500 to-purple-600',
    accentMuted: 'from-violet-500/10 to-purple-600/10',
    glowColor: 'shadow-violet-500/20',
  },
];

const FloatingOrb = ({ delay, className }: { delay: number; className: string }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className}`}
    animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

const AIProjectCard = ({ project, index }: { project: typeof aiProjects[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        animate={{
          rotateX: isHovered ? 2 : 0,
          rotateY: isHovered ? (index === 0 ? 3 : -3) : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl transition-shadow duration-500 ${
          isHovered ? `shadow-2xl ${project.glowColor}` : 'shadow-lg'
        }`}
      >
        {/* Top gradient bar */}
        <div className={`h-1 bg-gradient-to-r ${project.accent}`} />

        {/* Hover glow overlay */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${project.accentMuted} pointer-events-none`}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        <div className="relative p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <motion.div
                className={`p-2.5 rounded-xl bg-gradient-to-br ${project.accentMuted} border border-border/30`}
                animate={{ rotate: isHovered ? 10 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Icon className="w-5 h-5 text-primary" />
              </motion.div>
              <div>
                <h3 className="font-display text-xl lg:text-2xl font-bold text-foreground">
                  {project.title}
                </h3>
                <p className="text-sm text-primary font-medium">{project.subtitle}</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isHovered ? 180 : 0, scale: isHovered ? 1.2 : 1 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="w-5 h-5 text-primary/60" />
            </motion.div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed mb-5">{project.description}</p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {project.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Zap className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r ${project.accent} text-white transition-all duration-300 hover:shadow-lg ${project.glowColor} hover:scale-105`}
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const AIProjects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="ai-projects" className="relative section-padding overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />
      <FloatingOrb delay={0} className="w-72 h-72 bg-primary/30 top-20 -left-20" />
      <FloatingOrb delay={3} className="w-96 h-96 bg-accent/20 bottom-10 -right-32" />
      <FloatingOrb delay={5} className="w-48 h-48 bg-primary/20 top-1/2 left-1/3" />

      <div className="container-custom relative" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
          >
            <Brain className="w-4 h-4" />
            AI & Machine Learning
            <Cpu className="w-4 h-4" />
          </motion.div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            AI <span className="gradient-text">Innovations</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Building intelligent systems that solve real-world problems using AI & ML
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {aiProjects.map((project, index) => (
            <AIProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
