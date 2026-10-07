'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState, useRef } from 'react';
import { useAnimation } from '@/context/animation-context';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';

// Cycling outcome focus labels — word-flip animation
const roles = [
  'Full-Stack Architecture',
  'High-Performance APIs',
  'Production Systems',
  'User-Centric Products',
];

// Counter hook — uses IntersectionObserver, re-triggers on scroll, fast animation
function useCounter(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

const stats = [
  { value: 10, suffix: '+', label: 'Projects Built' },
  { value: 15, suffix: '+', label: 'Technologies' },
  { value: 100, suffix: '%', label: 'Open Source' },
];

export default function HeroSection({ id }: { id: string }) {
  const { setHeroAnimationDone } = useAnimation();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const counter0 = useCounter(stats[0].value, 1200);
  const counter1 = useCounter(stats[1].value, 1000);
  const counter2 = useCounter(stats[2].value, 1400);
  const counters = [counter0, counter1, counter2];

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroAnimationDone(true);
    }, 600);
    return () => clearTimeout(timer);
  }, [setHeroAnimationDone]);

  return (
    <section
      id={id}
      className="relative flex flex-col items-center justify-center min-h-[90vh] overflow-hidden px-6 pt-32 pb-20 bg-[#FAFAFA]"
    >
      {/* Atmospheric Soft Orange Ambient Background Layer */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden pointer-events-none select-none z-[1]"
      >
        {/* Primary soft orange drifting glow — centered behind hero content */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[380px] rounded-full animate-ambient-drift-1"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(251, 146, 60, 0.25) 0%, rgba(234, 88, 12, 0.12) 42%, transparent 72%)',
            filter: 'blur(75px)',
          }}
        />

        {/* Secondary warm amber counter-drifting glow — organic floating counterpoint */}
        <div
          className="absolute top-[45%] left-[52%] -translate-x-1/2 -translate-y-1/2 w-[480px] h-[320px] rounded-full animate-ambient-drift-2"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(249, 115, 22, 0.20) 0%, rgba(245, 158, 11, 0.08) 45%, transparent 70%)',
            filter: 'blur(70px)',
          }}
        />
      </div>

      {/* ─── Main Content (Single-Column Symmetrical Layout) ─── */}
      <div className="container max-w-4xl mx-auto z-10 relative">
        <div className="flex flex-col items-center text-center space-y-7 sm:space-y-8">

          {/* Tagline chip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100/90 border border-zinc-200 text-xs font-jakarta font-semibold tracking-wide text-zinc-800 shadow-2xs"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Software Engineer · Open to SDE Roles</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-jakarta font-extrabold tracking-tight text-zinc-900 leading-[1.1] text-balance max-w-3xl"
          >
            Building fast, reliable software{' '}
            <br className="hidden sm:inline" />
            that solves real{' '}
            <span className="text-shimmer-amber font-extrabold inline-block">
              business problems.
            </span>
          </motion.h1>

          {/* Animated outcome focus word-flip */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 90, damping: 22, delay: 0.18 }}
            className="h-8 flex items-center justify-center text-base sm:text-lg md:text-xl font-jakarta font-semibold text-zinc-700 tracking-tight gap-2.5"
          >
            <span className="text-amber-500 font-bold select-none">—</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="inline-block text-zinc-800"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 90, damping: 22, delay: 0.24 }}
            className="text-base sm:text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto font-normal leading-relaxed text-balance"
          >
            Software engineer turning complex business requirements into fast, resilient
            web applications — from scalable backend services to polished interfaces.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 90, damping: 22, delay: 0.32 }}
            className="flex flex-wrap sm:flex-nowrap gap-4 items-center justify-center pt-1"
          >
            <Button
              size="lg"
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm tracking-wide px-8 py-6 shadow-sm hover:shadow-md hover:scale-102 transition-all duration-200 gap-2"
            >
              <span>View Selected Work</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                window.open('/resume.pdf', '_blank');
              }}
              className="button-shimmer relative rounded-2xl bg-white hover:bg-amber-50/60 border border-amber-300 hover:border-amber-500 text-zinc-900 hover:text-zinc-950 font-bold text-sm tracking-wide px-8 py-6 shadow-2xs hover:shadow-xs hover:scale-102 transition-all duration-200 gap-2.5 group"
            >
              <FileText className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-zinc-900 group-hover:text-zinc-950">Resume</span>
              <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100 border border-amber-200/80 px-1.5 py-0.5 rounded-md ml-0.5 shadow-2xs">
                PDF
              </span>
            </Button>
          </motion.div>

          {/* Unified Horizontal Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.4 }}
            className="pt-2"
          >
            <div className="inline-flex items-center divide-x divide-zinc-200/80 border border-zinc-200/80 bg-white/70 backdrop-blur-md rounded-2xl py-3.5 px-3 sm:px-6 shadow-2xs">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  ref={counters[i].ref}
                  className="px-4 sm:px-8 text-center"
                >
                  <div className="text-2xl sm:text-3xl font-jakarta font-extrabold text-zinc-900 leading-none">
                    {counters[i].count}
                    <span className="text-amber-600">{stat.suffix}</span>
                  </div>
                  <div className="text-[11px] font-jakarta font-medium uppercase tracking-wider text-zinc-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Fine grain noise — hero only, 3% opacity, tactile texture */}
      <div className="hero-grain-overlay" aria-hidden="true" />
    </section>
  );
}
