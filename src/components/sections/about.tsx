'use client';

import { User, Layers, Server, Smartphone, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

const focusAreas = [
  {
    label: 'Full-Stack Apps',
    sub: 'React, Next.js & Node.js',
    icon: Layers,
    theme: 'border-indigo-200/80 bg-indigo-50/70 hover:border-indigo-300 text-indigo-700',
    iconBg: 'bg-indigo-100 text-indigo-700',
  },
  {
    label: 'Backend Systems',
    sub: 'APIs & Relational Databases',
    icon: Server,
    theme: 'border-emerald-200/80 bg-emerald-50/70 hover:border-emerald-300 text-emerald-700',
    iconBg: 'bg-emerald-100 text-emerald-700',
  },
  {
    label: 'Mobile & Flutter Apps',
    sub: 'Cross-Platform iOS & Android',
    icon: Smartphone,
    theme: 'border-purple-200/80 bg-purple-50/70 hover:border-purple-300 text-purple-700',
    iconBg: 'bg-purple-100 text-purple-700',
  },
  {
    label: 'AI Integrations',
    sub: 'LLMs, Pipelines & Workflows',
    icon: Bot,
    theme: 'border-rose-200/80 bg-rose-50/70 hover:border-rose-300 text-rose-700',
    iconBg: 'bg-rose-100 text-rose-700',
  },
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
            hidden: { opacity: 0, y: 16 },
            show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 18 } },
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
      className="relative flex items-center overflow-hidden px-6 py-24 md:py-32 bg-white"
    >
      <div className="absolute top-0 inset-x-0 separator-fade" />

      <div className="container mx-auto max-w-6xl relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Title */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-xs font-semibold uppercase tracking-wider text-zinc-700">
              <User className="w-3.5 h-3.5 text-amber-600" />
              <span>About Me</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-jakarta font-extrabold text-zinc-950 leading-tight">
              <WordReveal text="Sachin R." />
              <br />
              <span className="text-zinc-500 font-jakarta font-semibold italic text-2xl md:text-3xl lg:text-4xl block mt-2">
                <WordReveal text="Builder. Problem Solver." delay={200} />
              </span>
            </h2>

            {/* Signature Accent Line */}
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-1 w-20 bg-amber-600 rounded-full"
            />
          </div>

          {/* Right Column: Description & Focus Area Cards */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4 max-w-xl">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-base sm:text-lg text-zinc-700 leading-relaxed font-normal"
              >
                I am a <strong className="font-semibold text-zinc-950">Full-Stack Developer</strong> dedicated to building high-performance, accessible, and dependable web applications. My expertise spans responsive user interfaces, distributed backends, and decentralized systems.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base sm:text-lg text-zinc-600 leading-relaxed font-normal"
              >
                I prioritize clean architecture and maintainable systems over short-lived trends, engineering tools that deliver real utility.
              </motion.p>
            </div>

            {/* Focus area grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 max-w-xl w-full">
              {focusAreas.map(({ label, sub, icon: Icon, theme, iconBg }, i) => (
                <motion.div
                  key={label}
                  className={`group cursor-default rounded-xl p-4 border transition-all duration-200 shadow-2xs hover:shadow-xs ${theme}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                >
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center ${iconBg} transition-transform duration-200 group-hover:scale-105`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-base font-bold text-zinc-900 font-jakarta">
                      {label}
                    </div>
                  </div>
                  <div className="text-xs font-medium text-zinc-500 font-jakarta ml-11">
                    {sub}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

