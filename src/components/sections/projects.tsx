'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ProjectCard } from '../project-card';
import { projects } from '@/lib/data';
import { Sparkles } from 'lucide-react';
import { useRef } from 'react';
import { getIconForTechnology } from '@/components/brand-icons';

// Marquee of tech terms
const marqueeItems = [
  'Next.js', 'React', 'TypeScript', 'Node.js', 'MongoDB', 'Solidity',
  'Tailwind CSS', 'Framer Motion', 'Web3.js', 'Firebase', 'REST APIs', 'Git',
  'Next.js', 'React', 'TypeScript', 'Node.js', 'MongoDB', 'Solidity',
  'Tailwind CSS', 'Framer Motion', 'Web3.js', 'Firebase', 'REST APIs', 'Git',
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 110, damping: 20 },
  },
};

export default function ProjectsSection({ id }: { id: string }) {
  return (
    <section
      id={id}
      className="relative overflow-hidden px-6 py-28 md:py-44"
      style={{ background: '#0C0C11' }}
    >
      {/* ─── Background Glows ─── */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none"
      >
        <div
          className="w-full h-full animate-pulse-glow"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.07) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] pointer-events-none"
      >
        <div
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(20,184,166,0.05) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* Watermark */}
      <div
        className="absolute -left-16 top-1/2 -translate-y-1/2 pointer-events-none hidden xl:block"
      >
        <span className="text-[18rem] font-black text-white/[0.018] leading-none select-none">
          02
        </span>
      </div>

      <div className="absolute top-0 inset-x-0 separator-fade" />

      <div className="container mx-auto max-w-6xl relative z-10 w-full">
        {/* Section Header */}
        <div className="max-w-2xl mb-8">


          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-50 mb-6 leading-tight"
          >
            Selected{' '}
            <span className="text-shimmer">Works.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-xl text-zinc-400 leading-relaxed"
          >
            A collection of high-impact digital products I&apos;ve engineered,
            focusing on clean code and exceptional user experiences.
          </motion.p>
        </div>

        {/* Scrolling tech marquee */}
        <div className="relative overflow-hidden mb-12 py-3">
          <div className="flex gap-6 animate-scroll-marquee w-max">
            {marqueeItems.map((item, i) => {
              const Icon = getIconForTechnology(item);
              return (
                <div
                  key={i}
                  className="flex-shrink-0 flex items-center gap-2 bg-[#18181F]/60 border border-white/[0.05] hover:border-[#10B981]/18 hover:bg-[#10B981]/[0.06] px-4 py-2 rounded-full transition-all duration-300 cursor-default group"
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-300 transition-colors duration-300">
                    {item}
                  </span>
                </div>
              );
            })}
          </div>
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0C0C11] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0C0C11] to-transparent pointer-events-none" />
        </div>

        {/* Project Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.imageId || index}
              variants={itemVariants}
              className="flex"
            >
              <div className="flex w-full h-full">
                <ProjectCard project={project} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
