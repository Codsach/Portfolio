'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { skills } from '@/lib/data';
import { getIconForTechnology } from '@/components/brand-icons';
import { useRef } from 'react';
import { Wrench, Sparkles } from 'lucide-react';

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
    rotateX.set(((e.clientY - cy) / (rect.height / 2)) * -6);
    rotateY.set(((e.clientX - cx) / (rect.width / 2)) * 6);
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

const allTechs = [
  'Next.js',
  'React',
  'TypeScript',
  'Node.js',
  'Express',
  'MongoDB',
  'Solidity',
  'Tailwind CSS',
  'Framer Motion',
  'PostgreSQL',
  'Firebase',
  'Docker',
  'Git',
  'GraphQL',
  'Next.js',
  'React',
  'TypeScript',
  'Node.js',
  'Express',
  'MongoDB',
  'Solidity',
  'Tailwind CSS',
  'Framer Motion',
  'PostgreSQL',
  'Firebase',
  'Docker',
  'Git',
  'GraphQL',
];

const categoryThemes = [
  {
    leftBorder: 'border-l-4 border-l-rose-500',
    iconBg: 'bg-rose-50 text-rose-600 border border-rose-200/80',
    tagHover: 'hover:border-rose-300 hover:bg-rose-50/40 hover:text-zinc-900',
    accentLine: 'bg-rose-500',
  },
  {
    leftBorder: 'border-l-4 border-l-cyan-600',
    iconBg: 'bg-cyan-50 text-cyan-600 border border-cyan-200/80',
    tagHover: 'hover:border-cyan-300 hover:bg-cyan-50/40 hover:text-zinc-900',
    accentLine: 'bg-cyan-600',
  },
  {
    leftBorder: 'border-l-4 border-l-amber-600',
    iconBg: 'bg-amber-50 text-amber-600 border border-amber-200/80',
    tagHover: 'hover:border-amber-300 hover:bg-amber-50/40 hover:text-zinc-900',
    accentLine: 'bg-amber-600',
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 120, damping: 18 },
  },
};

const techItemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
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
      className="relative overflow-hidden px-6 py-24 md:py-32 bg-white"
    >
      <div className="absolute top-0 inset-x-0 separator-fade" />

      <div className="container mx-auto max-w-6xl relative z-10 w-full">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-4">
            <Wrench className="w-3.5 h-3.5 text-amber-600" />
            <span>Technical Capabilities</span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-950 mb-4 font-jakarta tracking-tight leading-tight"
          >
            Engineering <span className="text-amber-600">Toolbox.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg text-zinc-600 leading-relaxed font-normal"
          >
            A breakdown of technologies, frameworks, and architectural tools I leverage to build robust applications.
          </motion.p>
        </div>

        {/* Differentiated Skills Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {skills.map((category, idx) => {
            const theme = categoryThemes[idx % categoryThemes.length];
            return (
              <motion.div key={category.title} variants={cardVariants}>
                <TiltCard>
                  <Card className={`h-full bg-[#FAFAFA] border border-zinc-200 ${theme.leftBorder} transition-all duration-300 shadow-sm hover:shadow-md rounded-xl group overflow-hidden`}>
                    <CardContent className="p-6 sm:p-7">
                      <div className="mb-6">
                        {/* Category icon */}
                        <div
                          className={`w-11 h-11 rounded-xl ${theme.iconBg} flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-105 shadow-2xs`}
                        >
                          <category.icon className="h-5 w-5" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 font-jakarta">{category.title}</h3>
                        <div className={`h-0.5 w-8 ${theme.accentLine} rounded-full mt-2`} />
                      </div>

                      {/* Tech tags */}
                      <motion.div
                        className="flex flex-wrap gap-2"
                        variants={{
                          hidden: {},
                          show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
                        }}
                      >
                        {category.technologies.map((tech) => {
                          const Icon = getIconForTechnology(tech);
                          return (
                            <motion.div
                              key={tech}
                              variants={techItemVariants}
                              className={`flex items-center gap-2 bg-white border border-zinc-200 ${theme.tagHover} rounded-lg px-2.5 py-1.5 transition-all duration-150 cursor-default shadow-2xs`}
                            >
                              {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
                              <span className="text-xs font-semibold text-zinc-800">
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
            );
          })}
        </motion.div>

        {/* High-Contrast Technical Marquee */}
        <div className="relative overflow-hidden py-4 mt-16 sm:mt-20 border-y border-zinc-200/80 bg-zinc-50">
          <div className="flex gap-3 animate-scroll-marquee w-max">
            {allTechs.map((tech, i) => {
              const Icon = getIconForTechnology(tech);
              return (
                <div
                  key={i}
                  className="flex-shrink-0 flex items-center gap-2 bg-white border border-zinc-300 px-3.5 py-1.5 rounded-lg cursor-default text-zinc-900 shadow-2xs hover:border-amber-400 transition-colors duration-150"
                >
                  {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
                  <span className="text-xs font-mono font-bold tracking-tight text-zinc-900 uppercase">
                    {tech}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-zinc-50 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-zinc-50 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

