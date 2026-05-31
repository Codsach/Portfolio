'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

type SectionStackProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  index?: number;
  total?: number;
  scalesDown?: boolean;
};

/**
 * SectionStack — scroll-reveal section wrapper.
 *
 * Each section fades and slides up into view as the user scrolls.
 * No h-screen clipping — sections render at their full natural height.
 */
export function SectionStack({
  children,
  className,
  id,
  index = 0,
}: SectionStackProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 0.2'],
  });

  const springCfg = { stiffness: 80, damping: 24, mass: 0.6 };

  const rawOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useSpring(rawOpacity, springCfg);

  const rawY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const y = useSpring(rawY, springCfg);

  const stackZIndex = index + 1;

  return (
    <div
      ref={ref}
      id={id}
      className={cn('relative w-full', className)}
      style={{ zIndex: stackZIndex }}
    >
      <motion.div
        style={{ opacity, y }}
        className="w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
