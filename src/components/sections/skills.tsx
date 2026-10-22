'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { skills } from '@/lib/data';
import { useRef, useCallback, useEffect, useState } from 'react';

// ── Touch guard ─────────────────────────────────────────────────────────────
function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches);
  }, []);
  return isTouch;
}

// ── Card theme tokens ────────────────────────────────────────────────────────
const LIGHT = {
  bg: '#FAF7F4',
  border: 'rgba(0,0,0,0.08)',
  shadow: '0 2px 16px rgba(60,28,8,0.08)',
  titleColor: 'var(--ink)',
  toolColor: '#5E5249',
  divider: 'rgba(0,0,0,0.06)',
  ghost: 'rgba(0,0,0,0.045)',
  spotlightColor: 'rgba(200,105,10,0.10)',
};

const DARK = {
  bg: '#2C1A0E',
  border: 'rgba(255,255,255,0.08)',
  shadow: '0 2px 24px rgba(0,0,0,0.30)',
  titleColor: '#EAD9CA',
  toolColor: '#C9B5A3',
  divider: 'rgba(255,255,255,0.08)',
  ghost: 'rgba(255,255,255,0.045)',
  spotlightColor: 'rgba(200,105,10,0.14)',
};

// ── Magnetic tool row ────────────────────────────────────────────────────────
function MagneticRow({
  tech,
  color,
  dividerColor,
  isLast,
  mouseY,
}: {
  tech: string;
  color: string;
  dividerColor: string;
  isLast: boolean;
  mouseY: number | null;
}) {
  const rowRef = useRef<HTMLLIElement>(null);
  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 180, damping: 22 });

  useEffect(() => {
    if (mouseY === null || !rowRef.current) {
      y.set(0);
      return;
    }
    const rect = rowRef.current.getBoundingClientRect();
    const rowCY = rect.top + rect.height / 2;
    const dist = Math.abs(mouseY - rowCY);
    const maxDist = 140;
    const magnitude = Math.max(0, 1 - dist / maxDist) * 6; // max 6 px
    y.set(mouseY > rowCY ? magnitude : -magnitude);
  }, [mouseY, y]);

  return (
    <motion.li
      ref={rowRef}
      style={{
        y: springY,
        borderBottom: isLast ? 'none' : `1px solid ${dividerColor}`,
        listStyle: 'none',
      }}
      className="flex items-center gap-3 py-2.5"
    >
      {/* 6×6 px solid orange dot */}
      <span
        aria-hidden
        style={{
          display: 'inline-block',
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'var(--amber)',
          flexShrink: 0,
        }}
      />
      <span
        className="font-sans font-medium text-[14px] leading-snug"
        style={{ color }}
      >
        {tech}
      </span>
    </motion.li>
  );
}

// ── Spec card ────────────────────────────────────────────────────────────────
function SpecCard({
  category,
  idx,
  isTouch,
}: {
  category: (typeof skills)[0];
  idx: number;
  isTouch: boolean;
}) {
  const theme = idx === 1 ? DARK : LIGHT;
  const cardRef = useRef<HTMLDivElement>(null);

  // Tilt — ±3° with softer damping
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRX = useSpring(rotateX, { stiffness: 200, damping: 28 });
  const springRY = useSpring(rotateY, { stiffness: 200, damping: 28 });

  // Spotlight position
  const [spot, setSpot] = useState({ x: '50%', y: '50%', visible: false });

  // Cursor Y (viewport coords) for magnetic rows
  const [mouseY, setMouseY] = useState<number | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;

      rotateX.set(((e.clientY - cy) / (rect.height / 2)) * -3);
      rotateY.set(((e.clientX - cx) / (rect.width / 2)) * 3);

      setSpot({ x: `${localX}px`, y: `${localY}px`, visible: true });
      setMouseY(e.clientY);
    },
    [rotateX, rotateY],
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    setSpot((p) => ({ ...p, visible: false }));
    setMouseY(null);
  }, [rotateX, rotateY]);

  const ghostNum = String(category.technologies.length).padStart(2, '0');

  // Shared interior — same markup for both touch and pointer
  const interior = (
    <>
      {/* Spotlight radial glow */}
      {!isTouch && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 28,
            pointerEvents: 'none',
            background: `radial-gradient(280px at ${spot.x} ${spot.y}, ${theme.spotlightColor}, transparent 70%)`,
            opacity: spot.visible ? 1 : 0,
            transition: 'opacity 0.35s ease',
          }}
        />
      )}

      {/* Heading row: title left, ghost numeral right — same baseline, can never collide */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: '20px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-display), Impact, "Arial Narrow", sans-serif',
            /* Tight clamp so long titles wrap at ≈2 lines rather than squeeze the numeral */
            fontSize: 'clamp(17px, 1.55vw, 22px)',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '0.01em',
            lineHeight: 1.1,
            color: theme.titleColor,
            margin: 0,
            flex: '1 1 0',
            minWidth: 0,
          }}
        >
          {category.title}
          <span style={{ color: 'var(--amber)' }}>.</span>
        </h3>

        {/* Ghost numeral — top-right, same flex row as heading */}
        <span
          aria-hidden
          style={{
            fontFamily: 'var(--font-display), Impact, "Arial Narrow", sans-serif',
            fontSize: 'clamp(3rem, 4.5vw, 5rem)',
            lineHeight: 0.85,
            letterSpacing: '0.01em',
            color: theme.ghost,
            userSelect: 'none',
            pointerEvents: 'none',
            flexShrink: 0,
            /* Pull it up so the baseline of the numeral aligns with the cap-height of the heading */
            marginTop: '-0.1em',
          }}
        >
          {ghostNum}
        </span>
      </div>

      {/* Tool list */}
      <ul
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {category.technologies.map((tech, i) =>
          isTouch ? (
            <li
              key={tech}
              className="flex items-center gap-3 py-2.5"
              style={{
                listStyle: 'none',
                borderBottom:
                  i < category.technologies.length - 1
                    ? `1px solid ${theme.divider}`
                    : 'none',
              }}
            >
              {/* 6×6 px solid orange dot */}
              <span
                aria-hidden
                style={{
                  display: 'inline-block',
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--amber)',
                  flexShrink: 0,
                }}
              />
              <span
                className="font-sans font-medium text-[14px] leading-snug"
                style={{ color: theme.toolColor }}
              >
                {tech}
              </span>
            </li>
          ) : (
            <MagneticRow
              key={tech}
              tech={tech}
              color={theme.toolColor}
              dividerColor={theme.divider}
              isLast={i === category.technologies.length - 1}
              mouseY={mouseY}
            />
          ),
        )}
      </ul>
    </>
  );

  // Shared card style — list anchored to top, guaranteed bottom padding
  const cardClass = 'h-full relative overflow-hidden cursor-default';
  const cardStyle = {
    background: theme.bg,
    border: `1px solid ${theme.border}`,
    boxShadow: theme.shadow,
    borderRadius: 28,
    // flex column so the list fills top-down and bottom padding is always present
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '28px 28px 32px',
  };

  // Touch — plain div, simple press state
  if (isTouch) {
    return (
      <motion.div
        whileTap={{ scale: 0.97 }}
        style={cardStyle}
        className={cardClass}
      >
        {interior}
      </motion.div>
    );
  }

  // Pointer — full interactive version
  return (
    <motion.div
      ref={cardRef}
      style={{
        ...cardStyle,
        rotateX: springRX,
        rotateY: springRY,
        transformPerspective: 900,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cardClass}
    >
      {interior}
    </motion.div>
  );
}

// ── Entry animation variants ─────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 110, damping: 18 },
  },
};

// ── Section ──────────────────────────────────────────────────────────────────
export default function SkillsSection({ id }: { id: string }) {
  const isTouch = useIsTouchDevice();

  return (
    <section
      id={id}
      className="relative overflow-hidden py-24 md:py-32 bg-white"
    >
      <div className="absolute top-0 inset-x-0 separator-fade" />

      <div className="container mx-auto relative z-10 w-full">
        {/* Section header */}
        <div className="max-w-2xl mb-14 sm:mb-18">
          <div className="t-label mb-4">Technical Capabilities</div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="t-section mb-4"
          >
            Engineering Toolbox<span className="text-[var(--amber)]">.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="t-lead max-w-2xl"
          >
            A breakdown of technologies, frameworks, and architectural tools I
            leverage to build robust applications.
          </motion.p>
        </div>

        {/* Spec-sheet cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {skills.map((category, idx) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              className="h-full"
            >
              <SpecCard category={category} idx={idx} isTouch={isTouch} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
