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

  // Track scroll progress with extended range for cinematic smooth stacking
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start'],
  });

  // Smooth scale down as next card slides over (solid 100% opacity throughout)
  const scale = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.98, 0.95]);

  // Uniform sticky top offset for complete 100% card-over-card alignment
  const stickyTop = 80;

  return (
    <div
      ref={cardRef}
      className="sticky pb-[35vh] sm:pb-[45vh] lg:pb-[50vh] last:pb-0"
      style={{
        top: `${stickyTop}px`,
        zIndex: (index + 1) * 10,
      }}
    >
      <motion.div
        style={{
          scale,
          transformOrigin: 'top center',
        }}
        className="relative will-change-transform"
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
      className="relative px-6 py-20 pb-20 bg-[#F8F9FA] -mb-[35vh] sm:-mb-[45vh] lg:-mb-[50vh]"
    >
      <div className="absolute top-0 inset-x-0 separator-fade" />

      <div className="container mx-auto max-w-5xl relative z-10 w-full">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 sm:mb-18">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-950 mb-4 font-jakarta tracking-tight leading-tight"
          >
            Selected <span className="text-amber-600">Works.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg text-zinc-600 leading-relaxed font-normal"
          >
            A curated selection of web and mobile applications engineered with clean architecture,
            robust backends, and responsive user experience.
          </motion.p>
        </div>

        {/* Sticky Stacking Deck of Cards */}
        <div className="relative flex flex-col">
          {projects.map((project, index) => (
            <StackingCardItem
              key={project.title}
              project={project}
              index={index}
              total={projects.length}
            />
          ))}
          {/* Spacer: gives the last sticky card enough scroll runway to fully overlap the previous card */}
          <div className="h-[35vh] sm:h-[45vh] lg:h-[50vh]" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

