'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

type ParallaxElementProps = {
  children: React.ReactNode;
  className?: string;
  /**
   * Speed multiplier. Controls how fast/slow relative to scroll:
   *   > 0 → element moves SLOWER than scroll (ideal for backgrounds/glows)
   *   < 0 → element moves FASTER than scroll (ideal for foreground cards)
   *   = 0 → no parallax
   * Typical range: -0.5 to 0.5
   */
  speed?: number;
  /** Axis to apply parallax on */
  axis?: 'y' | 'x';
  /** Adds a subtle rotation as the element moves through the viewport */
  rotate?: boolean;
  /**
   * Optional entry scale: [hiddenScale, visibleScale]
   * Example: [0.9, 1] → element grows slightly as it enters view
   */
  scaleRange?: [number, number];
};

/**
 * ParallaxElement — wraps any content with scroll-driven parallax movement.
 *
 * All springs use physics-based easing for natural, non-stiff movement.
 */
export function ParallaxElement({
  children,
  className,
  speed = 0.3,
  axis = 'y',
  rotate = false,
  scaleRange,
}: ParallaxElementProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Convert speed to pixel-percent offset range
  const pxRange: [number, number] = [speed * -100, speed * 100];

  const rawY = useTransform(scrollYProgress, [0, 1], axis === 'y' ? pxRange : [0, 0]);
  const rawX = useTransform(scrollYProgress, [0, 1], axis === 'x' ? pxRange : [0, 0]);
  const rawRotate = useTransform(scrollYProgress, [0, 1], rotate ? [-3, 3] : [0, 0]);

  // Optional scale entry/exit
  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    scaleRange
      ? [scaleRange[0], scaleRange[1], scaleRange[1], scaleRange[0]]
      : [1, 1, 1, 1]
  );

  // Spring physics for all values — natural, slightly bouncy movement
  const springConfig = { stiffness: 80, damping: 20, mass: 0.8 };
  const y = useSpring(rawY, springConfig);
  const x = useSpring(rawX, springConfig);
  const rotation = useSpring(rawRotate, { stiffness: 60, damping: 25 });
  const scale = useSpring(rawScale, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y, x, rotate: rotation, scale }}
    >
      {children}
    </motion.div>
  );
}
