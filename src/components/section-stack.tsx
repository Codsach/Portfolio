'use client';

import { motion } from 'framer-motion';
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
 * Each section fades and slides up into view when it enters the viewport.
 * We use 'whileInView' for high-performance scroll reveal rather than 
 * physics-based continuous scroll tracking.
 */
export function SectionStack({
  children,
  className,
  id,
  index = 0,
}: SectionStackProps) {
  const stackZIndex = index + 1;

  return (
    <motion.div
      id={id}
      className={cn('relative w-full', className)}
      style={{ zIndex: stackZIndex }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1], // Custom ease-out
      }}
    >
      <div className="w-full">
        {children}
      </div>
    </motion.div>
  );
}
