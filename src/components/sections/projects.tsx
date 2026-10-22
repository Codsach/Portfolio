'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ProjectCard } from '../project-card';
import { projects, type Project } from '@/lib/data';

function StackingCardItem({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Track scroll progress with extended range for cinematic smooth stacking
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start'],
  });

  // Smooth scale down as next card slides over (solid 100% opacity throughout)
  const scale = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.98, 0.95]);

  return (
    <div
      ref={cardRef}
      className="sticky top-[64px] sm:top-[72px] lg:top-[76px] pb-[50vh] last:pb-0"
      style={{
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
      className="relative py-16 sm:py-20 bg-[var(--paper)] -mb-[50vh]"
    >
      <div className="absolute top-0 inset-x-0 separator-fade" />

      <div className="container mx-auto relative z-10 w-full">
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-14 lg:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="t-section mb-3 sm:mb-4"
          >
            SELECTED WORKS<span className="text-[var(--amber)]">.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="t-lead max-w-[52ch]"
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
            />
          ))}
          {/* Spacer: gives the last sticky card enough scroll runway to fully overlap the previous card */}
          <div className="h-[50vh]" aria-hidden="true" />
        </div>

        {/* GitHub link */}
        <div className="flex flex-col items-center gap-4 pt-10 pb-4">
          <p className="text-sm text-[#6B7280] font-['Inter',sans-serif]">
            A selection of my work. Everything else lives on GitHub.
          </p>
          <a
            href="https://github.com/Codsach"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full border border-[#D1D5DB] text-sm font-medium font-['Inter',sans-serif] text-[#374151] bg-transparent hover:bg-[#F3F4F6] transition-colors duration-150 no-underline outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#374151]/60"
          >
            More on GitHub
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-150 group-hover:translate-x-[3px]"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

