'use client';

import { motion } from 'framer-motion';
import { skills } from '@/lib/data';
import { useRef, useEffect, useState, useSyncExternalStore } from 'react';
import { getIconForTechnology } from '@/components/brand-icons';

// ── Desktop interactive guard ────────────────────────────────────────────────
// Only enable magnetic tilt, spotlight, and row pull when:
// (hover: hover) and (pointer: fine), and NOT prefers-reduced-motion.
// On touch devices or reduced motion, skip everything.
const subscribeInteractive = (callback: () => void) => {
  const mqlHover = window.matchMedia('(hover: hover) and (pointer: fine)');
  const mqlMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  mqlHover.addEventListener('change', callback);
  mqlMotion.addEventListener('change', callback);
  return () => {
    mqlHover.removeEventListener('change', callback);
    mqlMotion.removeEventListener('change', callback);
  };
};

const getInteractiveSnapshot = () =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const getInteractiveServerSnapshot = () => false;

function useIsDesktopInteractive() {
  return useSyncExternalStore(
    subscribeInteractive,
    getInteractiveSnapshot,
    getInteractiveServerSnapshot,
  );
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
function ToolRow({
  tech,
  color,
  dividerColor,
  isLast,
  iconRestFilter,
}: {
  tech: string;
  color: string;
  dividerColor: string;
  isLast: boolean;
  iconRestFilter: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      data-toolbox-row=""
      tabIndex={0}
      style={{
        borderBottom: isLast ? 'none' : `1px solid ${dividerColor}`,
        listStyle: 'none',
        willChange: 'transform',
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
    </li>
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
  isDesktopInteractive,
}: {
  category: (typeof skills)[0];
  idx: number;
  isDesktopInteractive: boolean;
}) {
  const theme = idx === 1 ? DARK : LIGHT;
  const cardRef = useRef<HTMLDivElement>(null);
  const [isSpotlightVisible, setIsSpotlightVisible] = useState(false);

  // Ghost numeral: padded to 2 digits, matches actual list length (08/07/07)
  const ghostNum = String(category.technologies.length).padStart(2, '0');

  // Desktop magnetic card effects (GSAP quickTo tilt + row pull + CSS var spotlight)
  useEffect(() => {
    const cardEl = cardRef.current;
    if (!cardEl || !isDesktopInteractive) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any = null;
    let handlePointerEnter: (() => void) | null = null;
    let handlePointerMove: ((e: PointerEvent) => void) | null = null;
    let handlePointerLeave: (() => void) | null = null;

    import('gsap').then(({ default: gsap }) => {
      if (!cardRef.current) return;

      ctx = gsap.context(() => {
        // Perspective 900px
        gsap.set(cardEl, { transformPerspective: 900 });

        // Tilt: max 3 degrees toward cursor, smooth settle via gsap.quickTo
        const quickRotateX = gsap.quickTo(cardEl, 'rotationX', {
          duration: 0.35,
          ease: 'power2.out',
        });
        const quickRotateY = gsap.quickTo(cardEl, 'rotationY', {
          duration: 0.35,
          ease: 'power2.out',
        });

        // Row pull: rows shift up to 6px toward cursor within ~80px
        const rowEls = Array.from(
          cardEl.querySelectorAll<HTMLElement>('[data-toolbox-row]'),
        );
        const rowQuickTos = rowEls.map((row) =>
          gsap.quickTo(row, 'y', { duration: 0.25, ease: 'power2.out' }),
        );

        handlePointerEnter = () => {
          setIsSpotlightVisible(true);
        };

        handlePointerMove = (e: PointerEvent) => {
          const rect = cardEl.getBoundingClientRect();
          const mx = e.clientX - rect.left;
          const my = e.clientY - rect.top;

          // Spotlight: follow cursor via CSS variables --mx/--my
          cardEl.style.setProperty('--mx', `${mx}px`);
          cardEl.style.setProperty('--my', `${my}px`);

          // Tilt: max 3 degrees toward the cursor
          const cx = rect.width / 2;
          const cy = rect.height / 2;
          const normX = Math.max(-1, Math.min(1, (mx - cx) / cx));
          const normY = Math.max(-1, Math.min(1, (my - cy) / cy));

          quickRotateX(-normY * 3);
          quickRotateY(normX * 3);

          // Row pull: rows shift up to 6px toward cursor within ~80px
          const cursorY = e.clientY;
          rowEls.forEach((row, i) => {
            const rowRect = row.getBoundingClientRect();
            const rowCenterY = rowRect.top + rowRect.height / 2;
            const dist = Math.abs(cursorY - rowCenterY);
            if (dist < 80) {
              const magnitude = (1 - dist / 80) * 6;
              const shift = cursorY < rowCenterY ? -magnitude : magnitude;
              rowQuickTos[i](shift);
            } else {
              rowQuickTos[i](0);
            }
          });
        };

        handlePointerLeave = () => {
          setIsSpotlightVisible(false);
          // Smooth settle on pointerleave
          quickRotateX(0);
          quickRotateY(0);
          rowQuickTos.forEach((quickTo) => quickTo(0));
        };

        cardEl.addEventListener('pointerenter', handlePointerEnter);
        cardEl.addEventListener('pointermove', handlePointerMove);
        cardEl.addEventListener('pointerleave', handlePointerLeave);
      }, cardRef);
    });

    return () => {
      if (cardEl) {
        if (handlePointerEnter) cardEl.removeEventListener('pointerenter', handlePointerEnter);
        if (handlePointerMove) cardEl.removeEventListener('pointermove', handlePointerMove);
        if (handlePointerLeave) cardEl.removeEventListener('pointerleave', handlePointerLeave);
      }
      ctx?.revert();
    };
  }, [isDesktopInteractive]);

  // Card style
  const cardStyle = {
    background: theme.bg,
    border: `1px solid ${theme.border}`,
    boxShadow: theme.shadow,
    borderRadius: 28,
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '28px 28px 32px',
    willChange: isDesktopInteractive ? 'transform' : 'auto',
  };

  return (
    <div
      ref={cardRef}
      style={cardStyle}
      className="h-full relative overflow-hidden cursor-default"
    >
      {/* Spotlight: soft radial glow (--burnt at ~12% opacity, 240px radius) */}
      {isDesktopInteractive && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 28,
            pointerEvents: 'none',
            background:
              'radial-gradient(240px circle at var(--mx, -999px) var(--my, -999px), rgba(217, 112, 15, 0.12), transparent 70%)',
            opacity: isSpotlightVisible ? 1 : 0,
            transition: 'opacity 0.25s ease',
            zIndex: 0,
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
        {category.technologies.map((tech, i) => (
          <ToolRow
            key={tech}
            tech={tech}
            color={theme.toolColor}
            dividerColor={theme.divider}
            isLast={i === category.technologies.length - 1}
            iconRestFilter={theme.iconRestFilter}
          />
        ))}
      </ul>
    </div>
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
  const isDesktopInteractive = useIsDesktopInteractive();

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
              <SpecCard
                category={category}
                idx={idx}
                isDesktopInteractive={isDesktopInteractive}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Marquee: muted tech pills, GSAP scroll-velocity speed-up */}
        <ToolboxMarquee />
      </div>
    </section>
  );
}
