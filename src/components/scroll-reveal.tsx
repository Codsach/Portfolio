'use client';

import { motion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';

type ScrollRevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in milliseconds before the animation starts */
  delay?: number;
  /** Direction of reveal */
  direction?: ScrollRevealDirection;
  /** Distance in pixels for slide animations */
  distance?: number;
  /** Whether to use spring physics (natural bounce) vs easeOut */
  spring?: boolean;
};

const buildVariants = (
  direction: ScrollRevealDirection,
  distance: number,
  spring: boolean
): Variants => {
  const transition = spring
    ? { type: 'spring' as const, stiffness: 120, damping: 20, mass: 0.8 }
    : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }; // custom cubic-bezier: fast-out-slow-in

  const hiddenMap: Record<ScrollRevealDirection, object> = {
    up:    { opacity: 0, y: distance },
    down:  { opacity: 0, y: -distance },
    left:  { opacity: 0, x: distance },
    right: { opacity: 0, x: -distance },
    scale: { opacity: 0, scale: 0.88 },
    fade:  { opacity: 0 },
  };

  const showMap: Record<ScrollRevealDirection, object> = {
    up:    { opacity: 1, y: 0 },
    down:  { opacity: 1, y: 0 },
    left:  { opacity: 1, x: 0 },
    right: { opacity: 1, x: 0 },
    scale: { opacity: 1, scale: 1 },
    fade:  { opacity: 1 },
  };

  return {
    hidden: hiddenMap[direction],
    show: {
      ...showMap[direction],
      transition,
    },
  };
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = 36,
  spring = true,
}: ScrollRevealProps) {
  const variants = buildVariants(direction, distance, spring);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: delay / 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScrollRevealGroup — wraps multiple children and staggers their reveal animations.
 *
 * Usage:
 *   <ScrollRevealGroup stagger={100}>
 *     <div>item 1</div>
 *     <div>item 2</div>
 *     ...
 *   </ScrollRevealGroup>
 */
type ScrollRevealGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number; // ms between each child reveal
  delay?: number;   // initial delay in ms
  direction?: ScrollRevealDirection;
  distance?: number;
};

const containerVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger / 1000,
      delayChildren: delay / 1000,
    },
  },
});

export function ScrollRevealGroup({
  children,
  className,
  stagger = 80,
  delay = 0,
  direction = 'up',
  distance = 28,
}: ScrollRevealGroupProps) {
  const itemVariants = buildVariants(direction, distance, true);

  return (
    <motion.div
      variants={containerVariants(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className={className}
    >
      {/* Each direct child should be a motion.div with variants */}
      {/* Wrap children in motion.div automatically */}
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={itemVariants}>{children}</motion.div>
      }
    </motion.div>
  );
}
