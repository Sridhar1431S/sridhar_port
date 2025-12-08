import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'AI Powered Farming Assistant',
    subtitle: 'Smart India Hackathon 2025',
    period: 'Aug 2025 – Dec 2025',
    description:
      'An AI-driven multilingual web app with conversational and voice-enabled support for farmers using OpenAI API and Supabase.',
    features: [
      'Real-time query handling',
      'Contextual memory',
      'Secure authentication',
      'Responsive UI design',
      'Voice interaction',
    ],
    technologies: ['OpenAI API', 'Supabase', 'React.js', 'NLP'],
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'hover:border-green-500/50',
  },
  {
    title: 'CV Infinity Boost',
    subtitle: 'AI-Powered Resume Screening System',
    period: 'Apr 2025 – May 2025',
    description:
      'Built an AI-powered resume screening tool using LLMs for semantic search and candidate ranking with an intuitive Streamlit interface.',
    features: [
      'LLM-based analysis',
      'Semantic search with FAISS',
      'Pinecone vector DB',
      'Resume matching',
      'Recruiter dashboard',
    ],
    technologies: ['LangChain', 'Pinecone', 'FAISS', 'Streamlit', 'LLMs'],
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'hover:border-blue-500/50',
  },
  {
    title: 'Digital Literacy Platform',
    subtitle: 'CollegeTips.in Internship',
    period: 'May 2025 – Jun 2025',
    description:
      'Developed a full-stack application with an NLP chatbot for automated museum ticketing and gamified learning features.',
    features: [
      'Django REST APIs',
      'React.js frontend',
      'NLP chatbot integration',
      'Gamified modules',
      'User engagement tracking',
    ],
    technologies: ['Django', 'React.js', 'REST APIs', 'NLP', 'PostgreSQL'],
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'hover:border-purple-500/50',
  },
  {
    title: 'Learning Platform with Gamification',
    subtitle: 'Smart India Hackathon 2023',
    period: 'Aug 2023 – Dec 2023',
    description:
      'Integrated NLP with frontend and backend, built RESTful APIs, and created a chatbot-based museum ticketing system.',
    features: [
      'Django Rest Framework',
      'NLP integration',
      'Gamified learning',
      'Chatbot ticketing',
      'Cost optimization',
    ],
    technologies: ['Django', 'NLP', 'RESTful APIs', 'JavaScript', 'PostgreSQL'],
    color: 'from-orange-500/20 to-red-500/20',
    borderColor: 'hover:border-orange-500/50',
  },
];

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="relative section-padding bg-secondary/30">
      <div className="container-custom" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of projects showcasing my skills in AI, web development, and problem-solving
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group glass-card rounded-2xl overflow-hidden ${project.borderColor} transition-all duration-300`}
            >
              {/* Gradient Header */}
              <div className={`h-2 bg-gradient-to-r ${project.color.replace('/20', '')}`} />

              <div className="p-6 lg:p-8">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-display text-xl lg:text-2xl font-semibold mb-1">
                      {project.title}
                    </h3>
                    <p className="text-primary text-sm font-medium">{project.subtitle}</p>
                  </div>
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${project.color}`}>
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                </div>

                {/* Period */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar className="w-4 h-4" />
                  {project.period}
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-4">{project.description}</p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {project.features.slice(0, 3).map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs bg-background/50 border border-border rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
