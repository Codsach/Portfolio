'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect, useState, useRef } from 'react';
import { useAnimation } from '@/context/animation-context';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ParallaxElement } from '@/components/parallax-element';
import { WebGLShader } from '@/components/ui/web-gl-shader';
import { LiquidButton, MetalButton } from '@/components/ui/liquid-glass-button';

// Cycling titles that type in and out
const roles = ['Full Stack Developer', 'Blockchain Engineer', 'Problem Solver', 'AI Integrator'];

// Counter hook — animates a number from 0 to target
function useCounter(target: number, duration = 1800, startOn = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startOn) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, startOn]);
  return count;
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
  { value: 4, suffix: '+', label: 'Projects' },
  { value: 1, suffix: '+', label: 'Years Exp.' },
  { value: 100, suffix: '%', label: 'Passion' },
];

export default function HeroSection({ id }: { id: string }) {
  const { setHeroAnimationDone } = useAnimation();
  const [started, setStarted] = useState(false);
  const typedRole = useTypingText(roles);
  const count0 = useCounter(stats[0].value, 1600, started);
  const count1 = useCounter(stats[1].value, 1200, started);
  const count2 = useCounter(stats[2].value, 2000, started);
  const counts = [count0, count1, count2];

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroAnimationDone(true);
      setStarted(true);
    }, 600);
    return () => clearTimeout(timer);
  }, [setHeroAnimationDone]);

  return (
    <section
      id={id}
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-6 pt-24 pb-16"
    >
      {/* Base Solid Background Color */}
      <div className="absolute inset-0 bg-[#0C0C11] -z-30 pointer-events-none" />

      <WebGLShader />

      {/* ─── Aurora animated background ─── */}
      <div
        className="absolute inset-0 opacity-100 pointer-events-none -z-20"
        style={{
          background: 'linear-gradient(135deg, rgba(16,185,129,0.05) 0%, rgba(99,102,241,0.06) 25%, rgba(20,184,166,0.04) 50%, rgba(99,102,241,0.05) 75%, rgba(16,185,129,0.05) 100%)',
          backgroundSize: '400% 400%',
          animation: 'aurora 14s ease infinite',
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-[0.08] pointer-events-none -z-20" />

      {/* Top emerald bloom */}
      <ParallaxElement
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[700px] pointer-events-none"
        speed={0.2}
      >
        <div
          className="w-full h-full animate-pulse-glow"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.09) 0%, rgba(99,102,241,0.06) 40%, transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
      </ParallaxElement>

      {/* Bottom-left teal glow */}
      <ParallaxElement
        className="absolute bottom-0 left-1/4 w-[600px] h-[500px] pointer-events-none"
        speed={0.1}
      >
        <div
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(20,184,166,0.06) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </ParallaxElement>

      {/* Decorative floating orbs */}
      <ParallaxElement
        className="absolute top-1/3 right-8 w-56 h-56 pointer-events-none hidden lg:block"
        speed={-0.1}
        rotate
      >
        <div className="w-full h-full rounded-full border border-white/[0.025] bg-white/[0.015] animate-spin-slow" />
      </ParallaxElement>

      <ParallaxElement
        className="absolute bottom-1/4 left-10 w-28 h-28 pointer-events-none hidden lg:block"
        speed={-0.06}
        rotate
      >
        <div className="w-full h-full rounded-full border border-white/[0.025] bg-white/[0.015] animate-float-medium" />
      </ParallaxElement>

      {/* ─── Main Content ─── */}
      <div className="container max-w-6xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Column */}
          <div className="flex flex-col space-y-8 text-center lg:text-left">

            {/* Tagline chip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass border border-white/[0.08] text-[10px] font-jakarta font-bold uppercase tracking-[0.25em] text-zinc-400 self-center lg:self-start"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              Full Stack • Blockchain • AI
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-jakarta font-extrabold tracking-tight text-zinc-50 leading-[1.05]"
            >
              Building software{' '}
              <br className="hidden sm:block" />
              that{' '}
              <span className="text-gradient-emerald">solves real</span>
              <br />
              problems.
            </motion.h1>

            {/* Typing role */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 90, damping: 22, delay: 0.18 }}
              className="flex items-center gap-2 justify-center lg:justify-start"
            >
              <span className="text-lg md:text-xl font-jakarta font-semibold text-[#10B981]">
                {typedRole}
                <span className="animate-blink-cursor border-r-2 border-[#10B981] ml-0.5">&nbsp;</span>
              </span>
            </motion.div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 90, damping: 22, delay: 0.26 }}
              className="text-lg md:text-xl text-zinc-400 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed"
            >
              I develop scalable web applications, blockchain systems and
              AI-powered products focused on performance and usability.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 90, damping: 22, delay: 0.36 }}
              className="flex flex-wrap gap-4 items-center justify-center lg:justify-start"
            >
              <LiquidButton
                className="text-white border border-white/15 rounded-full hover:scale-105 duration-300 transition backdrop-blur-sm"
                size="xl"
                onClick={() => {
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View Projects
              </LiquidButton>

              <LiquidButton
                className="text-[#10B981] border border-[#10B981]/20 rounded-full hover:scale-105 duration-300 transition backdrop-blur-sm font-bold shadow-glow"
                size="xl"
                onClick={() => {
                  window.open('/resume.pdf', '_blank');
                }}
              >
                Resume
              </LiquidButton>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.48 }}
              className="flex items-center gap-6 justify-center lg:justify-start pt-4"
            >
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-6">
                  <div className="text-center lg:text-left">
                    <div className="text-2xl font-jakarta font-black text-zinc-50">
                      {counts[i]}
                      <span className="text-[#10B981]">{stat.suffix}</span>
                    </div>
                    <div className="text-[10px] font-jakarta font-bold uppercase tracking-[0.2em] text-zinc-500">
                      {stat.label}
                    </div>
                  </div>
                  {i < stats.length - 1 && (
                    <div className="w-px h-8 bg-gradient-to-b from-transparent via-zinc-600 to-transparent" />
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: 3D Tilt Code Card */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 80, damping: 22, delay: 0.4 }}
            className="hidden lg:flex items-center justify-center"
          >
            <TiltCard>
              <div className="relative group">
                {/* Glow behind card */}
                <div className="absolute -inset-4 bg-gradient-to-br from-[#10B981]/8 via-transparent to-transparent rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-700" />

                {/* Floating code card */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative glass-strong rounded-2xl border border-white/[0.10] hover:border-[#10B981]/25 p-8 transition-all duration-500 hover:shadow-glow max-w-sm"
                >
                  {/* Window chrome */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                    <span className="ml-3 text-[10px] font-jakarta font-bold uppercase tracking-[0.2em] text-zinc-500">
                      developer.ts
                    </span>
                  </div>

                  {/* Code content */}
                  <pre className="text-sm font-mono leading-relaxed">
                    <code>
                      <span className="text-[#10B981]/80">const</span>{' '}
                      <span className="text-zinc-200">developer</span>{' '}
                      <span className="text-zinc-500">=</span>{' '}
                      <span className="text-zinc-500">{'{'}</span>
                      {'\n'}
                      {'  '}<span className="text-indigo-300/80">name</span>
                      <span className="text-zinc-500">:</span>{' '}
                      <span className="text-emerald-400/90">&quot;Sachin R&quot;</span>
                      <span className="text-zinc-600">,</span>
                      {'\n'}
                      {'  '}<span className="text-indigo-300/80">role</span>
                      <span className="text-zinc-500">:</span>{' '}
                      <span className="text-emerald-400/90">&quot;Full Stack Dev&quot;</span>
                      <span className="text-zinc-600">,</span>
                      {'\n'}
                      {'  '}<span className="text-indigo-300/80">passion</span>
                      <span className="text-zinc-500">:</span>{' '}
                      <span className="text-emerald-400/90">&quot;Building Products&quot;</span>
                      <span className="text-zinc-600">,</span>
                      {'\n'}
                      {'  '}<span className="text-indigo-300/80">available</span>
                      <span className="text-zinc-500">:</span>{' '}
                      <span className="text-[#10B981]/80">true</span>
                      <span className="text-zinc-600">,</span>
                      {'\n'}
                      <span className="text-zinc-500">{'}'}</span>
                      <span className="text-zinc-600">;</span>
                      <span className="animate-blink-cursor border-r-2 border-[#10B981] ml-1">&nbsp;</span>
                    </code>
                  </pre>

                  {/* Status bar */}
                  <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-jakarta font-bold uppercase tracking-[0.2em] text-zinc-400">
                        Available for hire
                      </span>
                    </div>
                    <span className="text-[10px] font-jakarta font-bold uppercase tracking-[0.2em] text-zinc-600">
                      TypeScript
                    </span>
                  </div>
                </motion.div>

                {/* Floating mini badge: ProofChain */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-8 -left-14 glass rounded-xl border border-[#10B981]/15 px-4 py-3 hidden xl:block"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                    <span className="text-xs font-semibold text-zinc-300">ProofChain</span>
                  </div>
                  <div className="text-[9px] text-zinc-500 mt-1">Blockchain Verified ✓</div>
                </motion.div>

                {/* Floating mini badge: Next.js */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute -top-6 -right-10 glass rounded-xl border border-white/[0.08] px-3 py-2 hidden xl:block"
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-zinc-400" />
                    <span className="text-[10px] font-bold text-zinc-300">Next.js 15</span>
                  </div>
                </motion.div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2.2, duration: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#10B981]/40 to-transparent" />
      </motion.div>
    </section>
  );
}
