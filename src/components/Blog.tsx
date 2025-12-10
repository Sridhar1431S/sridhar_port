import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Clock, ArrowUpRight, BookOpen, Code2, Brain, Lightbulb } from 'lucide-react';

const articles = [
  {
    title: 'Building Scalable ML Pipelines with Python',
    excerpt: 'A comprehensive guide to designing and implementing production-ready machine learning pipelines using modern Python tooling.',
    date: '2024-12-05',
    readTime: '8 min read',
    category: 'Machine Learning',
    icon: Brain,
    gradient: 'from-purple-500/20 to-pink-500/20',
    tags: ['Python', 'MLOps', 'Data Engineering'],
  },
  {
    title: 'Modern React Patterns for 2024',
    excerpt: 'Exploring advanced React patterns including compound components, render props, and the latest hooks patterns.',
    date: '2024-11-20',
    readTime: '6 min read',
    category: 'Frontend',
    icon: Code2,
    gradient: 'from-blue-500/20 to-cyan-500/20',
    tags: ['React', 'TypeScript', 'Patterns'],
  },
  {
    title: 'Optimizing LLM Applications for Production',
    excerpt: 'Best practices for deploying and optimizing large language model applications in production environments.',
    date: '2024-11-10',
    readTime: '10 min read',
    category: 'AI/ML',
    icon: Lightbulb,
    gradient: 'from-amber-500/20 to-orange-500/20',
    tags: ['LLM', 'AI', 'Production'],
  },
  {
    title: 'Full-Stack TypeScript: From Zero to Hero',
    excerpt: 'A deep dive into building type-safe applications from frontend to backend using TypeScript and modern frameworks.',
    date: '2024-10-28',
    readTime: '12 min read',
    category: 'Tutorial',
    icon: BookOpen,
    gradient: 'from-emerald-500/20 to-teal-500/20',
    tags: ['TypeScript', 'Node.js', 'Full-Stack'],
  },
];

export const Blog = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="blog" className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Technical Writing
          </span>
          <h2 className="heading-lg mb-4">
            Blog & <span className="gradient-text">Articles</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sharing insights, tutorials, and best practices from my experience in software development and AI.
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article, index) => {
            const Icon = article.icon;
            return (
              <motion.article
                key={article.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className={`glass-card p-6 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br ${article.gradient}`}>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${article.gradient} ring-1 ring-border/50`}>
                      <Icon className="w-5 h-5 text-foreground" />
                    </div>
                    <span className="px-3 py-1 text-xs font-medium bg-background/50 rounded-full text-muted-foreground">
                      {article.category}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-background/50 rounded-md text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(article.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime}
                      </span>
                    </div>
                    <motion.span
                      className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ x: 3 }}
                    >
                      Read
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Coming Soon Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground text-sm">
            More articles coming soon. Stay tuned for in-depth tutorials and insights!
          </p>
        </motion.div>
      </div>
    </section>
  );
};
