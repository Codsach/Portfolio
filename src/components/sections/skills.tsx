'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { ParallaxElement } from '../parallax-element';
import { skills } from '@/lib/data';
import { getIconForTechnology } from '@/components/icons';
import { Sparkles } from 'lucide-react';
import { useRef } from 'react';

// 3D tilt card wrapper
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 22 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotateX.set(((e.clientY - cy) / (rect.height / 2)) * -7);
    rotateY.set(((e.clientX - cx) / (rect.width / 2)) * 7);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 900 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { rotateX.set(0); rotateY.set(0); }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

// All technologies flattened for the bottom marquee
const allTechs = [
  'Next.js', 'React', 'TypeScript', 'Node.js', 'Express', 'MongoDB',
  'Solidity', 'Web3.js', 'Tailwind CSS', 'Framer Motion', 'Firebase',
  'REST APIs', 'Git', 'Vercel', 'PostgreSQL', 'GraphQL', 'Docker',
  'Next.js', 'React', 'TypeScript', 'Node.js', 'Express', 'MongoDB',
  'Solidity', 'Web3.js', 'Tailwind CSS', 'Framer Motion', 'Firebase',
  'REST APIs', 'Git', 'Vercel', 'PostgreSQL', 'GraphQL', 'Docker',
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 120, damping: 18 },
  },
};

const techItemVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 200, damping: 20 },
  },
};

export default function SkillsSection({ id }: { id: string }) {
  return (
    <section
      id={id}
      className="relative overflow-hidden px-6 py-28 md:py-44"
      style={{ background: '#0F0F16' }}
    >
      {/* ─── Background Glows ─── */}
      <ParallaxElement
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        speed={0.16}
      >
        <div
          className="w-full h-full animate-pulse-glow"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(20,184,166,0.05) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </ParallaxElement>

      <ParallaxElement
        className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
        speed={0.08}
      >
        <div
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.06) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </ParallaxElement>

      {/* Watermark */}
      <ParallaxElement
        className="absolute -right-8 top-1/2 -translate-y-1/2 pointer-events-none hidden xl:block"
        speed={0.22}
      >
        <span className="text-[18rem] font-black text-white/[0.018] leading-none select-none">
          03
        </span>
      </ParallaxElement>

      <div className="absolute top-0 inset-x-0 separator-fade" />

      <div className="container mx-auto max-w-6xl relative z-10 w-full">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-white/[0.08] mb-6 font-medium text-xs text-zinc-400 uppercase tracking-widest"
          >
            <Sparkles className="w-3 h-3 text-cyan-400/70" />
            <span>Expertise</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-50 mb-6 leading-tight"
          >
            Toolbox &amp;{' '}
            <span className="text-shimmer">Technologies.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-xl text-zinc-400 leading-relaxed"
          >
            I specialize in building robust full-stack applications using
            modern frameworks and high-performance tools.
          </motion.p>
        </div>

        {/* Skills Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {skills.map((category) => (
            <motion.div key={category.title} variants={cardVariants}>
              <TiltCard>
                <Card className="h-full glass border-white/[0.06] hover:border-[#00F5FF]/20 hover:bg-white/[0.03] transition-all duration-500 shadow-card-float hover:shadow-glow group">
                  <CardContent className="p-8">
                    <div className="mb-8">
                      {/* Category icon — spins on hover */}
                      <motion.div
                        className="w-14 h-14 rounded-2xl glass-strong border border-white/10 hover:border-cyan-400/25 flex items-center justify-center mb-6 transition-all duration-300 group-hover:shadow-glow-sm cursor-default"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                      >
                        <category.icon className="h-7 w-7 text-zinc-300 group-hover:text-[#00F5FF] transition-colors duration-300" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-zinc-50 mb-2">{category.title}</h3>
                      <div className="h-px w-10 bg-gradient-to-r from-cyan-400/60 to-transparent rounded-full" />
                    </div>

                    {/* Tech tags */}
                    <motion.div
                      className="flex flex-wrap gap-3"
                      variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
                      }}
                    >
                      {category.technologies.map((tech) => {
                        const Icon = getIconForTechnology(tech);
                        return (
                          <motion.div
                            key={tech}
                            variants={techItemVariants}
                            className="flex items-center gap-2 bg-[#18181F]/60 border border-white/[0.05] hover:border-cyan-400/25 hover:bg-[#00F5FF]/[0.06] rounded-xl px-4 py-2 transition-all duration-300 group/tech cursor-default hover:shadow-glow-sm"
                            whileHover={{ scale: 1.08, y: -2 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                          >
                            {Icon && <Icon className="h-4 w-4 text-zinc-500 group-hover/tech:text-[#00F5FF] transition-colors duration-300" />}
                            <span className="text-sm font-medium text-zinc-400 group-hover/tech:text-zinc-200 transition-colors duration-300">
                              {tech}
                            </span>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </CardContent>
                </Card>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom infinite marquee */}
        <div className="relative overflow-hidden py-4">
          <div className="flex gap-5 animate-scroll-marquee w-max">
            {allTechs.map((tech, i) => {
              const Icon = getIconForTechnology(tech);
              return (
                <div
                  key={i}
                  className="flex-shrink-0 flex items-center gap-2 bg-[#18181F]/60 border border-white/[0.05] hover:border-cyan-400/20 hover:bg-cyan-400/[0.05] px-5 py-2.5 rounded-full transition-all duration-300 cursor-default group"
                >
                  {Icon && <Icon className="h-4 w-4 text-zinc-500 group-hover:text-[#00F5FF] transition-colors duration-200" />}
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors duration-200">
                    {tech}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0F0F16] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0F0F16] to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
