'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect, useState, useRef } from 'react';
import { useAnimation } from '@/context/animation-context';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, FileText, Sparkles, Code2 } from 'lucide-react';

// Cycling titles that type in and out
const roles = ['Full Stack Developer', 'Flutter & Mobile Builder', 'Web App Builder', 'Creative Problem Solver'];

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

// Typing animation hook
function useTypingText(texts: string[], speed = 70, pause = 2000) {
  const [displayed, setDisplayed] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed === current) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && displayed === '') {
      setIsDeleting(false);
      setTextIndex((i) => (i + 1) % texts.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayed(isDeleting
          ? current.slice(0, displayed.length - 1)
          : current.slice(0, displayed.length + 1)
        );
      }, isDeleting ? speed / 2 : speed);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, textIndex, texts, speed, pause]);

  return displayed;
}

// 3D tilt card
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotateX.set(((e.clientY - cy) / (rect.height / 2)) * -8);
    rotateY.set(((e.clientX - cx) / (rect.width / 2)) * 8);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

const stats = [
  { value: 10, suffix: '+', label: 'Projects Built' },
  { value: 2, suffix: '+', label: 'Years Experience' },
  { value: 100, suffix: '%', label: 'Client Dedication' },
];

export default function HeroSection({ id }: { id: string }) {
  const { setHeroAnimationDone } = useAnimation();
  const typedRole = useTypingText(roles);

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
      {/* Subtle architectural grid */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none -z-20" />

      {/* Subtle warm ambient illumination */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] pointer-events-none -z-10 opacity-30">
        <div
          className="w-full h-full animate-pulse-glow"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(234,88,12,0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* ─── Main Content ─── */}
      <div className="container max-w-6xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

          {/* Left Column (Span 7) */}
          <div className="lg:col-span-7 flex flex-col space-y-7 text-center lg:text-left">

            {/* Tagline chip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-xs font-jakarta font-semibold tracking-wide text-zinc-800 self-center lg:self-start"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Full Stack • Blockchain • AI Systems</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] font-jakarta font-extrabold tracking-tight text-zinc-950 leading-[1.1]"
            >
              Building software{' '}
              <br className="hidden sm:block" />
              that{' '}
              <span className="text-shimmer-amber font-extrabold">
                solves real
              </span>
              <br />
              problems.
            </motion.h1>

            {/* Typing role */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 90, damping: 22, delay: 0.18 }}
              className="flex items-center gap-2 justify-center lg:justify-start"
            >
              <span className="text-base md:text-xl font-jakarta font-semibold text-zinc-700 bg-zinc-100/90 px-3 py-1 rounded-xl border border-zinc-200/80">
                {typedRole}
                <span className="animate-blink-cursor border-r-2 border-amber-600 ml-1">&nbsp;</span>
              </span>
            </motion.div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 90, damping: 22, delay: 0.24 }}
              className="text-base sm:text-lg text-zinc-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed"
            >
              I develop scalable web applications, responsive websites, and
              cross-platform mobile apps with Flutter, focusing on clean architecture and high craft.
            </motion.p>

            {/* CTA Buttons - Restored rounded-2xl smooth squircle shape with highlighted Resume */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 90, damping: 22, delay: 0.32 }}
              className="flex flex-wrap gap-4 items-center justify-center lg:justify-start pt-1"
            >
              <Button
                size="lg"
                onClick={() => {
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm tracking-wide px-7 py-6 shadow-sm hover:shadow-md hover:scale-102 transition-all duration-200 gap-2"
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
                className="button-shimmer relative rounded-2xl bg-white hover:bg-amber-50/60 border border-amber-300 hover:border-amber-500 text-zinc-900 hover:text-zinc-950 font-bold text-sm tracking-wide px-7 py-6 shadow-2xs hover:shadow-xs hover:scale-102 transition-all duration-200 gap-2.5 group"
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
              transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.42 }}
              className="pt-4"
            >
              <div className="inline-flex items-center divide-x divide-zinc-200 border-y border-zinc-200 py-3.5 self-center lg:self-start">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    ref={counters[i].ref}
                    className="px-4 sm:px-6 first:pl-0 last:pr-0 text-left"
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

          {/* Right Column: Interactive 3D Magnetic Container (Slightly Bigger, Perfect Fill) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 22, delay: 0.35 }}
            className="lg:col-span-5 flex items-center justify-center w-full"
          >
            <TiltCard>
              <div className="relative w-full flex justify-center">
                {/* Floating code card */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative bg-white/95 backdrop-blur-xl rounded-2xl border border-zinc-200/90 p-7 sm:p-8 shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-lg lg:max-w-xl"
                >
                  {/* Apple macOS Traffic Light Window Chrome */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-100">
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 rounded-full bg-rose-500/85 shadow-2xs" />
                      <div className="w-3.5 h-3.5 rounded-full bg-amber-500/85 shadow-2xs" />
                      <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/85 shadow-2xs" />
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 bg-zinc-50 px-3 py-1 rounded-md border border-zinc-200/70">
                      <Code2 className="w-3.5 h-3.5 text-amber-600" />
                      <span>developer.ts</span>
                    </div>
                  </div>

                  {/* Code Content - Slightly larger, legible sizing */}
                  <pre className="text-sm sm:text-[15px] font-mono leading-relaxed bg-zinc-50/90 p-5 sm:p-6 rounded-xl border border-zinc-100 overflow-x-auto text-zinc-800">
                    <code>
                      <span className="text-purple-600 font-bold">const</span>{' '}
                      <span className="text-indigo-600 font-semibold">developer</span>{' '}
                      <span className="text-zinc-400">=</span>{' '}
                      <span className="text-zinc-700">{'{'}</span>
                      {'\n'}
                      {'  '}<span className="text-rose-600 font-medium">name</span>
                      <span className="text-zinc-400">:</span>{' '}
                      <span className="text-emerald-600 font-medium">&quot;Sachin R&quot;</span>
                      <span className="text-zinc-400">,</span>
                      {'\n'}
                      {'  '}<span className="text-rose-600 font-medium">role</span>
                      <span className="text-zinc-400">:</span>{' '}
                      <span className="text-emerald-600 font-medium">&quot;Full Stack Dev&quot;</span>
                      <span className="text-zinc-400">,</span>
                      {'\n'}
                      {'  '}<span className="text-rose-600 font-medium">passion</span>
                      <span className="text-zinc-400">:</span>{' '}
                      <span className="text-emerald-600 font-medium">&quot;Building Products&quot;</span>
                      <span className="text-zinc-400">,</span>
                      {'\n'}
                      {'  '}<span className="text-rose-600 font-medium">available</span>
                      <span className="text-zinc-400">:</span>{' '}
                      <span className="text-amber-600 font-bold">true</span>
                      <span className="text-zinc-400">,</span>
                      {'\n'}
                      <span className="text-zinc-700">{'}'}</span>
                      <span className="text-zinc-400">;</span>
                      <span className="animate-blink-cursor border-r-2 border-amber-600 ml-1">&nbsp;</span>
                    </code>
                  </pre>

                  {/* Status bar */}
                  <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs sm:text-sm font-jakarta font-semibold text-zinc-700">
                        Available for hire
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

