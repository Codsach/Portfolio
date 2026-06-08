'use client';

import { ParallaxElement } from '../parallax-element';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Full-Stack', sub: 'Development' },
  { label: 'Backend', sub: 'Systems' },
  { label: 'Blockchain', sub: 'Integration' },
  { label: 'Frontend', sub: 'UX & Design' },
];

// Split a string into word spans for staggered animation
function WordReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(' ');
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08, delayChildren: delay / 1000 } },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          variants={{
            hidden: { opacity: 0, y: 24, rotateX: -20 },
            show: { opacity: 1, y: 0, rotateX: 0, transition: { type: 'spring', stiffness: 120, damping: 18 } },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function AboutSection({ id }: { id: string }) {
  return (
    <section
      id={id}
      className="relative flex items-center overflow-hidden px-6 py-28 md:py-44"
      style={{ background: '#0E0E14' }}
    >
      {/* ─── Background Glows ─── */}
      <ParallaxElement
        className="absolute top-1/4 right-0 w-[550px] h-[550px] pointer-events-none"
        speed={0.18}
      >
        <div
          className="w-full h-full animate-pulse-glow"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </ParallaxElement>

      <ParallaxElement
        className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] pointer-events-none"
        speed={0.1}
      >
        <div
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.05) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </ParallaxElement>

      {/* Decorative rotating ring watermark */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 pointer-events-none hidden xl:block">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="w-[480px] h-[480px] rounded-full border border-white/[0.025]"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-8 rounded-full border border-white/[0.015]"
        />
      </div>

      {/* Large watermark number */}
      <ParallaxElement
        className="absolute -right-4 top-1/2 -translate-y-1/2 pointer-events-none hidden xl:block"
        speed={0.25}
        rotate
      >
        <span className="text-[18rem] font-black text-white/[0.018] leading-none select-none">
          01
        </span>
      </ParallaxElement>

      {/* Top separator */}
      <div className="absolute top-0 inset-x-0 separator-fade" />

      <div className="container mx-auto max-w-6xl relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Left Column: Title */}
          <div className="lg:col-span-5 space-y-8">


            <h2 className="text-4xl md:text-5xl lg:text-7xl font-jakarta font-extrabold text-zinc-50 leading-tight">
              <WordReveal text="Sachin R." />
              <br />
              <span className="text-zinc-500 font-jakarta font-medium italic text-3xl md:text-4xl lg:text-5xl">
                <WordReveal text="Builder. Problem Solver." delay={200} />
              </span>
            </h2>

            {/* Decorative cyan line */}
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="h-px w-24 bg-gradient-to-r from-[#10B981] to-transparent rounded-full"
            />
          </div>

          {/* Right Column: Description & Stats */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-6 max-w-xl">
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg md:text-xl text-zinc-300 leading-relaxed"
              >
                I am a Full-Stack Developer focused on building reliable web applications.
                My work covers everything from developing user-facing interfaces to setting up
                backend systems and integrating blockchain features.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.22 }}
                className="text-lg md:text-xl text-zinc-400 leading-relaxed"
              >
                I value clear code and practical solutions. My goal is to engineer tools that
                work well, are easy to maintain, and solve actual problems for users.
              </motion.p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/[0.06] pt-12 max-w-xl w-full">
              {stats.map(({ label, sub }, i) => (
                <motion.div
                  key={label}
                  className="group cursor-default animated-border rounded-2xl p-4 sm:p-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  style={{
                    background: 'rgba(24, 24, 31, 0.50)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div className="text-lg sm:text-2xl font-bold text-zinc-50 mb-1 group-hover:text-gradient-emerald transition-all duration-300 font-jakarta">
                    {label}
                  </div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-widest text-zinc-500 font-bold font-jakarta">{sub}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
