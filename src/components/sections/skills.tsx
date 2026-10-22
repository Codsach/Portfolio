'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { skills } from '@/lib/data';
import { useRef, useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import { getIconForTechnology } from '@/components/brand-icons';

// ── Touch guard ─────────────────────────────────────────────────────────────
const subscribeTouch = (callback: () => void) => {
  const mql = window.matchMedia('(hover: none)');
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
};
const getTouchSnapshot = () => window.matchMedia('(hover: none)').matches;
const getTouchServerSnapshot = () => false;

function useIsTouchDevice() {
  return useSyncExternalStore(subscribeTouch, getTouchSnapshot, getTouchServerSnapshot);
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
  // muted: greyscale at 45% opacity on the light linen background
  iconRestFilter: 'grayscale(1) opacity(0.45)',
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
  // soft paper tone: invert + brighten so icons read as warm paper on dark bg
  iconRestFilter: 'grayscale(1) invert(1) brightness(1.6) opacity(0.45)',
};

// ── Row icon helper ───────────────────────────────────────────────────────────
function RowIcon({
  tech,
  filter,
  isHovered,
}: {
  tech: string;
  filter: string;
  isHovered?: boolean;
}) {
  const Icon = getIconForTechnology(tech);
  if (!Icon) {
    return (
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block',
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: isHovered ? 'var(--burnt)' : 'var(--icon-muted)',
          flexShrink: 0,
          transition: 'background 0.18s ease',
        }}
      />
    );
  }
  return Icon({
    alt: '',
    'aria-hidden': true,
    style: {
      width: 18,
      height: 18,
      flexShrink: 0,
      filter: isHovered ? 'none' : filter,
      transition: 'filter 0.18s ease',
    },
  });
}

// ── Magnetic tool row ────────────────────────────────────────────────────────
function MagneticRow({
  tech,
  color,
  dividerColor,
  isLast,
  mouseY,
  iconRestFilter,
}: {
  tech: string;
  color: string;
  dividerColor: string;
  isLast: boolean;
  mouseY: number | null;
  iconRestFilter: string;
}) {
  const rowRef = useRef<HTMLLIElement>(null);
  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 180, damping: 22 });
  const [isHovered, setIsHovered] = useState(false);

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
      tabIndex={0}
      style={{
        y: springY,
        borderBottom: isLast ? 'none' : `1px solid ${dividerColor}`,
        listStyle: 'none',
      }}
      className="flex items-center gap-3 py-2.5 outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--burnt)] rounded-sm cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <RowIcon tech={tech} filter={iconRestFilter} isHovered={isHovered} />
      <span
        className="font-sans font-medium text-[14px] leading-snug"
        style={{ color }}
      >
        {tech}
      </span>
    </motion.li>
  );
}

// ── Marquee ───────────────────────────────────────────────────────────────────
// All listed technologies (flat, in order). Duplicated in JSX for seamless loop.
const MARQUEE_ITEMS = skills.flatMap((cat) => cat.technologies);

function ToolboxMarquee() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let tl: any = null;
    let velocityTimer: ReturnType<typeof setTimeout>;
    const outer = outerRef.current;

    const pauseMarquee = () => tl?.pause();
    const resumeMarquee = () => {
      if (!prefersReduced) tl?.resume();
    };

    const init = async () => {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!outerRef.current || !trackRef.current) return;

      ctx = gsap.context(() => {
        // Main tween: xPercent -50 on the doubled track = seamless loop
        tl = gsap.to(trackRef.current, {
          xPercent: -50,
          ease: 'none',
          duration: 25,
          repeat: -1,
        });

        if (prefersReduced) {
          tl.pause();
          return;
        }

        // Scroll velocity → timeScale up to 6×, ease back to 1× in 0.8s
        ScrollTrigger.create({
          onUpdate: (self) => {
            const v = Math.abs(self.getVelocity());
            const scale = Math.min(1 + v / 400, 6);
            if (tl) gsap.to(tl, { timeScale: scale, duration: 0.2 });
            clearTimeout(velocityTimer);
            velocityTimer = setTimeout(() => {
              if (tl) gsap.to(tl, { timeScale: 1, duration: 0.8, ease: 'power1.out' });
            }, 150);
          },
        });
      }, outerRef);

      if (outer) {
        outer.addEventListener('mouseenter', pauseMarquee);
        outer.addEventListener('mouseleave', resumeMarquee);
      }
    };

    init();

    return () => {
      clearTimeout(velocityTimer);
      if (outer) {
        outer.removeEventListener('mouseenter', pauseMarquee);
        outer.removeEventListener('mouseleave', resumeMarquee);
      }
      ctx?.revert();
    };
  }, []);

  return (
    <div
      ref={outerRef}
      style={{ overflow: 'hidden', width: '100%', marginTop: '3.5rem' }}
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          width: 'max-content',
        }}
      >
        {/* Content duplicated so GSAP xPercent -50 seamlessly loops */}
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((tech, i) => {
          const Icon = getIconForTechnology(tech);
          return (
            <div
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.28rem 0.72rem',
                border: '1px solid var(--line)',
                borderRadius: '9999px',
                flexShrink: 0,
                backgroundColor: 'transparent',
              }}
            >
              {Icon &&
                Icon({
                  alt: '',
                  'aria-hidden': true,
                  style: {
                    width: 14,
                    height: 14,
                    filter: 'grayscale(1) opacity(0.40)',
                    flexShrink: 0,
                  },
                })}
              <span
                style={{
                  fontFamily: 'var(--font-sans), system-ui, sans-serif',
                  fontSize: '11px',
                  fontVariant: 'small-caps',
                  letterSpacing: '0.05em',
                  color: 'var(--muted)',
                  whiteSpace: 'nowrap',
                }}
              >
                {tech}
              </span>
            </div>
          );
        })}
      </div>
    </div>
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

  // Ghost numeral: padded to 2 digits, matches actual list length (08/07/07)
  const ghostNum = String(category.technologies.length).padStart(2, '0');

  // Shared interior
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

      {/* Heading row: title left, ghost numeral right */}
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
            /* Touch: simple li with icon at rest filter */
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
              <RowIcon tech={tech} filter={theme.iconRestFilter} />
              <span
                className="font-sans font-medium text-[14px] leading-snug"
                style={{ color: theme.toolColor }}
              >
                {tech}
              </span>
            </li>
          ) : (
            /* Pointer: full magnetic row with hover icon activation */
            <MagneticRow
              key={tech}
              tech={tech}
              color={theme.toolColor}
              dividerColor={theme.divider}
              isLast={i === category.technologies.length - 1}
              mouseY={mouseY}
              iconRestFilter={theme.iconRestFilter}
            />
          ),
        )}
      </ul>
    </>
  );

  // Shared card style
  const cardClass = 'h-full relative overflow-hidden cursor-default';
  const cardStyle = {
    background: theme.bg,
    border: `1px solid ${theme.border}`,
    boxShadow: theme.shadow,
    borderRadius: 28,
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
      className="relative overflow-hidden py-24 md:py-32 bg-[var(--paper)]"
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

        {/* Marquee: muted tech pills, GSAP scroll-velocity speed-up */}
        <ToolboxMarquee />
      </div>
    </section>
  );
}
