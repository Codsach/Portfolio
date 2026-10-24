'use client';

import { useEffect, useRef } from 'react';
import { Layers, Server, Network, Bot } from 'lucide-react';

/* ── Static data ─────────────────────────────────────────────────────────── */
const STATEMENT =
  "I'm a Software Engineer who builds things end-to-end, from database schema to the UI pixel.";

const STATEMENT_WORDS = STATEMENT.split(' ');

const focusAreas = [
  {
    label: 'Full-Stack Apps',
    sub: 'React, Next.js & Node.js',
    icon: Layers,
  },
  {
    label: 'Backend Systems',
    sub: 'APIs, Databases & Microservices',
    icon: Server,
  },
  {
    label: 'Distributed Systems',
    sub: 'Blockchain, IPFS & Smart Contracts',
    icon: Network,
  },
  {
    label: 'AI Integrations',
    sub: 'LLMs, Pipelines & Workflows',
    icon: Bot,
  },
];

/* ── Component ───────────────────────────────────────────────────────────── */
export default function AboutSection({ id }: { id: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stmtRef = useRef<HTMLParagraphElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any = null;

    const init = async () => {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        /* b) Statement word-scrub (disabled under reduced-motion) */
        if (!prefersReduced && stmtRef.current) {
          const words = Array.from(
            stmtRef.current.querySelectorAll<HTMLElement>('[data-word]'),
          );
          if (words.length > 0) {
            gsap.fromTo(
              words,
              { opacity: 0.16 },
              {
                opacity: 1,
                ease: 'none',
                stagger: 0.1,
                duration: 0.4,
                scrollTrigger: {
                  trigger: stmtRef.current,
                  start: 'top 78%',
                  end: 'bottom 42%',
                  scrub: true,
                },
              },
            );
          }
        }

        /* c) Detail columns — one-time reveal */
        if (!prefersReduced && detailRef.current) {
          gsap.fromTo(
            Array.from(detailRef.current.children),
            { opacity: 0, y: 36 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: detailRef.current,
                start: 'top 82%',
                toggleActions: 'play none none reverse',
              },
            },
          );
        }

        /* d) Cards — one-time reveal */
        if (!prefersReduced && cardsRef.current) {
          gsap.fromTo(
            Array.from(cardsRef.current.children),
            { opacity: 0, y: 36 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: cardsRef.current,
                start: 'top 86%',
                toggleActions: 'play none none reverse',
              },
            },
          );
        }
      }, sectionRef);
    };

    init();

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32 bg-[var(--paper)]"
    >
      <div className="absolute top-0 inset-x-0 separator-fade" />

      <div className="container mx-auto relative z-10 w-full">

        {/* ── a) Label + Heading ──────────────────────────────────────────── */}
        <div className="mb-10 sm:mb-14 text-left">
          <div className="t-label mb-3">About Me</div>
          <h2 className="t-section">
            SACHIN R<span style={{ color: 'var(--amber)' }}>.</span>
          </h2>
        </div>

        {/* ── b) Statement ────────────────────────────────────────────────── */}
        <p
          ref={stmtRef}
          aria-label={STATEMENT}
          className="about-statement font-display font-normal uppercase mb-14 sm:mb-18"
        >
          {STATEMENT_WORDS.map((word, i) => (
            <span
              key={i}
              aria-hidden="true"
              data-word=""
              className="about-word"
            >
              {word}
            </span>
          ))}
        </p>

        {/* ── c) Detail — two columns ─────────────────────────────────────── */}
        <div ref={detailRef} className="about-detail mb-14 sm:mb-18">
          {/* Left: tagline + orange rule */}
          <div>
            <p className="about-tagline">
              Builder. Engineer. Occasional Overbuilder.
            </p>
            <div className="about-rule" aria-hidden="true" />
          </div>

          {/* Right: body paragraphs */}
          <div className="about-body-col space-y-4">
            <p className="t-body">
              I&apos;ve worked across full-stack web apps, AI-integrated
              backends, and blockchain systems, and I care a lot about clean
              architecture.
            </p>
            <p className="t-body">
              I prioritize clean architecture and maintainable systems over
              short-lived trends, engineering tools that deliver real utility.
            </p>
          </div>
        </div>

        {/* ── d) Cards — 2 × 2 grid ───────────────────────────────────────── */}
        <div ref={cardsRef} className="about-cards">
          {focusAreas.map(({ label, sub, icon: Icon }) => (
            <div key={label} className="about-card">
              {/* Icon tile */}
              <div className="about-icon-tile" aria-hidden="true">
                <Icon
                  aria-hidden="true"
                  style={{ width: 20, height: 20, strokeWidth: 1.7 }}
                  className="about-icon"
                />
              </div>

              {/* Card text */}
              <h3 className="about-card-title">{label}</h3>
              <p className="about-card-sub">{sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scoped styles ─────────────────────────────────────────────────── */}
      <style>{`
        /* b) Statement */
        .about-statement {
          font-size: clamp(2rem, 5.2vw, 4.25rem);
          line-height: 1.1;
          letter-spacing: 0.01em;
          color: var(--ink);
          max-width: 1000px;
          margin-left: 0;
          margin-right: auto;
          text-align: left;
        }
        .about-word {
          display: inline-block;
          margin-right: 0.3em;
          opacity: 0.16;
        }
        .about-word:last-child {
          margin-right: 0;
        }
        /* Reduced-motion: show all words at full opacity immediately */
        @media (prefers-reduced-motion: reduce) {
          .about-word { opacity: 1 !important; }
        }

        /* c) Detail */
        .about-detail {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem 3.5rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .about-detail {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
        .about-tagline {
          font-family: var(--font-sans), system-ui, sans-serif;
          font-style: italic;
          font-size: clamp(18px, 1.6vw, 22px);
          color: var(--muted);
          line-height: 1.45;
          text-align: left;
        }
        .about-rule {
          width: 56px;
          height: 3px;
          background: var(--amber);
          border-radius: 2px;
          margin-top: 1.25rem;
          margin-left: 0;
        }
        .about-body-col {
          max-width: 100%;
          text-align: left;
        }

        /* d) Cards */
        .about-cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 768px) {
          .about-cards {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
        .about-card {
          background: var(--card-warm, #fffaf4);
          border: 1px solid var(--line);
          border-radius: 24px;
          padding: 1.75rem;
          box-shadow: 0 2px 16px rgba(42, 26, 16, 0.05);
          cursor: default;
          transition:
            transform      0.22s ease,
            border-color   0.22s ease,
            box-shadow     0.22s ease;
        }
        .about-card:hover {
          transform: translateY(-4px);
          border-color: rgba(217, 112, 15, 0.45);
          box-shadow: 0 10px 28px -6px rgba(42, 26, 16, 0.12);
        }
        .about-card:focus-visible {
          outline: 2px solid var(--burnt);
          outline-offset: 3px;
        }
        .about-icon-tile {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: var(--tile);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }
        .about-icon {
          color: var(--icon-muted);
          transition: color 0.22s ease;
        }
        .about-card:hover .about-icon {
          color: var(--burnt);
        }
        .about-card-title {
          font-family: var(--font-display), Impact, 'Arial Narrow', sans-serif;
          font-weight: 400;
          text-transform: uppercase;
          font-size: 1.35rem;
          letter-spacing: 0.01em;
          line-height: 1.2;
          color: var(--ink);
          margin-bottom: 0.4rem;
          text-align: left;
        }
        .about-card-sub {
          font-family: var(--font-sans), system-ui, sans-serif;
          font-size: 14px;
          color: var(--muted);
          line-height: 1.5;
          text-align: left;
        }
      `}</style>
    </section>
  );
}
