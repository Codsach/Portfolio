'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ProjectCard } from '../project-card';
import { projects, type Project } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

/* ── Sticky stacking card — unchanged ───────────────────────────────────── */
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

/* ── Section ─────────────────────────────────────────────────────────────── */
export default function ProjectsSection({ id }: { id: string }) {
  return (
    <section
      id={id}
      className="relative py-16 sm:py-20 bg-[var(--sand)] -mb-[50vh]"
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

        {/* Sticky Stacking Deck of Cards — logic untouched */}
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
      </div>
    </section>
  );
}

/* ── GitHub CTA — exported so page.tsx can place it outside the projects    ──
   stacking context (z-[3]). Skills section is z-[4], so anything inside     ──
   the projects section is painted below skills no matter its own z-index.   ──
   Rendering between the two sections in the root div (z-auto) solves this.  ── */
export function GitHubCTA() {
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = blockRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReduced) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      return;
    }

    // Start hidden + shifted down
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition =
      'opacity 0.6s cubic-bezier(0.33, 1, 0.68, 1), transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)';

    // Trigger as soon as any part of the block enters the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: '0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={blockRef}
      className="flex flex-col items-center gap-4 py-10 sm:py-12 bg-[var(--sand)]"
    >
      {/* Caption */}
      <p
        className="text-[14px] font-['Inter',sans-serif] text-center leading-snug"
        style={{ color: 'var(--muted)' }}
      >
        A selection of my work. Everything else lives on GitHub.
      </p>

      {/* Button — shadcn outline, all overrides via Tailwind, button.tsx untouched */}
      <Button
        asChild
        variant="outline"
        className="
          group
          rounded-full h-11 px-6
          font-['Inter',sans-serif] font-medium text-[15px]
          bg-transparent
          border border-[rgba(42,26,16,0.18)]
          text-[var(--ink)]
          hover:border-[var(--burnt)]
          hover:text-[var(--burnt)]
          hover:bg-[rgba(217,112,15,0.06)]
          active:scale-[0.98]
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[var(--burnt)]
          focus-visible:ring-offset-[3px]
          focus-visible:ring-offset-[var(--sand)]
          transition-all duration-200 ease-out
          shadow-none
          no-underline
        "
      >
        <a
          href="https://github.com/Codsach"
          target="_blank"
          rel="noopener noreferrer"
        >
          More on GitHub
          <ArrowUpRight
            aria-hidden="true"
            className="
              w-4 h-4 flex-shrink-0
              transition-transform duration-200 ease-out
              group-hover:translate-x-[3px] group-hover:-translate-y-[3px]
            "
          />
        </a>
      </Button>
    </div>
  );
}
