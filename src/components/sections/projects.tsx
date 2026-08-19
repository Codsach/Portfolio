'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ProjectCard } from '../project-card';
import { projects, type Project } from '@/lib/data';

function StackingCardItem({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of this card relative to the window viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start'],
  });

  // Scale down as the next card stacks on top of this one
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.93]);

  // Staggered sticky top offsets for tab deck look
  const stickyTop = 96 + index * 28;

  return (
    <div
      ref={cardRef}
      className="sticky mb-16 lg:mb-24 last:mb-0"
      style={{
        top: `${stickyTop}px`,
        zIndex: (index + 1) * 10,
      }}
    >
      <motion.div
        style={{
          scale: index === total - 1 ? 1 : scale,
          transformOrigin: 'top center',
        }}
        className="will-change-transform"
      >
        <ProjectCard project={project} index={index} />
      </motion.div>
    </div>
  );
}

export default function ProjectsSection({ id }: { id: string }) {
  return (
    <section
      id={id}
      className="relative px-6 py-24 pb-48 min-h-screen"
      style={{ background: '#070B15' }}
    >
      {/* ─── Background Glows ─── */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none">
        <div
          className="w-full h-full animate-pulse-glow"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(139,92,246,0.07) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(6,182,212,0.05) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* Watermark */}
      <div className="absolute -left-16 top-1/3 pointer-events-none hidden xl:block">
        <span className="text-[18rem] font-black text-white/[0.018] leading-none select-none">
          02
        </span>
      </div>

      <div className="absolute top-0 inset-x-0 separator-fade" />

      <div className="container mx-auto max-w-5xl relative z-10 w-full">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-50 mb-6 leading-tight"
          >
            Selected <span className="text-shimmer">Works.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-zinc-400 leading-relaxed"
          >
            A collection of high-impact digital products I&apos;ve engineered,
            focusing on clean code and exceptional user experiences.
          </motion.p>
        </div>

        {/* Sticky Stacking Deck of Cards */}
        <div className="relative flex flex-col pb-16">
          {projects.map((project, index) => (
            <StackingCardItem
              key={project.title}
              project={project}
              index={index}
              total={projects.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
