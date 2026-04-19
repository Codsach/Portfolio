'use client';

import { motion } from 'framer-motion';
import { ProjectCard } from '../project-card';
import { ScrollReveal } from '../scroll-reveal';
import { projects } from '@/lib/data';
import { Sparkles } from 'lucide-react';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProjectsSection({ id }: { id: string }) {
  return (
    <section id={id} className="relative py-24 md:py-40 bg-black overflow-hidden px-6">
      {/* Background radial glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-zinc-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-zinc-500/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <ScrollReveal className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 font-medium text-xs text-zinc-400 uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-zinc-400" />
            <span>Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Selected <span className="text-zinc-500">Works.</span>
          </h2>
          <p className="text-xl text-zinc-400 leading-relaxed">
            A collection of high-impact digital products I&apos;ve engineered, 
            focusing on clean code and exceptional user experiences.
          </p>
        </ScrollReveal>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div 
              key={project.imageId || index} 
              variants={itemVariants}
              className="flex"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

