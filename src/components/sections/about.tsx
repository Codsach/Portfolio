'use client';

import { Layers, Server, Network, Bot } from 'lucide-react';
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
    sub: 'APIs, Databases & Microservices',
    icon: Server,
    theme: 'border-emerald-200/80 bg-emerald-50/70 hover:border-emerald-300 text-emerald-700',
    iconBg: 'bg-emerald-100 text-emerald-700',
  },
  {
    label: 'Distributed Systems',
    sub: 'Blockchain, IPFS & Smart Contracts',
    icon: Network,
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

export default function AboutSection({ id }: { id: string }) {
  return (
    <section
      id={id}
      className="relative flex items-center overflow-hidden py-24 md:py-32 bg-white"
    >
      <div className="absolute top-0 inset-x-0 separator-fade" />

      <div className="container mx-auto relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Title */}
          <div className="lg:col-span-5 space-y-6">
            <div className="t-label">About Me</div>

            <div className="space-y-3">
              <h2 className="t-section">
                SACHIN R<span className="text-[var(--amber)]">.</span>
              </h2>
              <p className="font-sans font-normal italic text-[20px] text-[var(--body)] leading-snug">
                Builder. Engineer. Occasional Overbuilder.
              </p>
            </div>

            {/* Signature Accent Line */}
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-1 w-20 bg-[var(--amber)] rounded-full"
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
                className="t-body"
              >
                I&apos;m a <strong className="font-semibold text-[var(--ink)]">Software Engineer</strong> who builds things end-to-end — from database schema to the UI pixel. I&apos;ve worked across full-stack web apps, AI-integrated backends, and blockchain systems, and I care a lot about clean architecture.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="t-body"
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
                    <div className="font-sans font-semibold text-[18px] text-[var(--ink)] leading-snug">
                      {label}
                    </div>
                  </div>
                  <div className="font-sans font-normal text-[14px] text-[var(--body)] ml-11">
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

