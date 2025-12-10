import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Calendar, Sparkles, ExternalLink } from 'lucide-react';

type Category = 'All' | 'AI' | 'Web' | 'Hackathon';

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
    category: ['AI', 'Hackathon'] as Category[],
    link: 'https://agri-grow-nine.vercel.app/',
  },
  {
    title: 'CV Infinity Boost',
    subtitle: 'Unified Mentor - AI Resume Screening',
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
    category: ['AI'] as Category[],
    link: 'https://cv-infinity-boost-ai.vercel.app/',
  },
  {
    title: 'Fit Infinity Fuel AI',
    subtitle: 'Unified Mentor - AI Fitness Platform',
    period: 'Apr 2025 – May 2025',
    description:
      'AI-powered fitness and nutrition platform providing personalized workout plans and dietary recommendations.',
    features: [
      'AI-powered recommendations',
      'Personalized meal plans',
      'Workout tracking',
      'Progress analytics',
      'Health insights',
    ],
    technologies: ['React.js', 'AI/ML', 'Supabase', 'Tailwind CSS'],
    color: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'hover:border-emerald-500/50',
    category: ['AI', 'Web'] as Category[],
    link: 'https://fit-infinity-fuel-ai.vercel.app/',
  },
  {
    title: 'Pet Friendly City Hub',
    subtitle: 'CollegeTips.in Internship',
    period: 'May 2025 – Jun 2025',
    description:
      'A platform helping pet owners find pet-friendly locations, services, and communities in their city.',
    features: [
      'Location-based search',
      'Pet services directory',
      'Community features',
      'User reviews',
      'Interactive maps',
    ],
    technologies: ['React.js', 'REST APIs', 'Maps API', 'Tailwind CSS'],
    color: 'from-amber-500/20 to-orange-500/20',
    borderColor: 'hover:border-amber-500/50',
    category: ['Web'] as Category[],
    link: 'https://pet-friendly-city-hub.vercel.app/',
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
    category: ['Web', 'AI'] as Category[],
    link: 'https://digital-literacy-virid.vercel.app/',
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
    category: ['Web', 'Hackathon'] as Category[],
  },
];

const categories: Category[] = ['All', 'AI', 'Web', 'Hackathon'];

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category.includes(activeCategory));

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
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            A selection of projects showcasing my skills in AI, web development, and problem-solving
          </p>
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
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
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs bg-background/50 border border-border rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Link */}
                {'link' in project && project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Live Project
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
