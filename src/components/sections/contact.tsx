'use client';

import { ParallaxElement } from '../parallax-element';
import { Mail, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { IconBrandGithub, IconBrandLinkedin } from '@/components/icons';
import Link from 'next/link';
import { motion } from 'framer-motion';

const connectors = [
  {
    label: 'Email',
    value: 'rsachinsachi@gmail.com',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=rsachinsachi@gmail.com&su=Opportunity%20Discussion',
    icon: Mail,
    featured: true,
    cta: 'Send Email',
  },
  {
    label: 'LinkedIn',
    value: 'Sachin R',
    href: 'https://linkedin.com/in/sachin-r-b737a7393',
    icon: IconBrandLinkedin,
    featured: false,
    cta: 'Connect',
  },
  {
    label: 'GitHub',
    value: 'Codsach',
    href: 'https://github.com/Codsach',
    icon: IconBrandGithub,
    featured: false,
    cta: 'View Profile',
  },
];

export default function ContactSection({ id }: { id: string }) {
  return (
    <section
      id={id}
      className="relative overflow-hidden px-6 py-28 md:py-52"
      style={{ background: '#0C0C11' }}
    >
      {/* ─── Aurora center glow ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 60%, rgba(16,185,129,0.05) 0%, rgba(99,102,241,0.06) 30%, transparent 65%)',
          animation: 'pulse-glow 7s ease-in-out infinite',
        }}
      />

      <ParallaxElement
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none"
        speed={0.08}
      >
        <div
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.07) 0%, rgba(20,184,166,0.04) 50%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </ParallaxElement>

      {/* Corner glows */}
      <ParallaxElement className="absolute top-0 left-0 w-64 h-64 pointer-events-none" speed={0.18}>
        <div className="w-full h-full" style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(99,102,241,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </ParallaxElement>
      <ParallaxElement className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none" speed={0.12}>
        <div className="w-full h-full" style={{ background: 'radial-gradient(ellipse at 100% 100%, rgba(16,185,129,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </ParallaxElement>

      {/* Watermark */}
      <ParallaxElement
        className="absolute -left-12 top-1/2 -translate-y-1/2 pointer-events-none hidden xl:block"
        speed={0.2}
      >
        <span className="text-[18rem] font-black text-white/[0.018] leading-none select-none">
          04
        </span>
      </ParallaxElement>

      <div className="absolute top-0 inset-x-0 separator-fade" />

      <div className="container mx-auto max-w-4xl relative z-10 w-full">
        <div className="flex flex-col items-center text-center">

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-emerald-500/20 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
              Open To Work — Full-Time &amp; Freelance
            </span>
          </motion.div>



          {/* Headline — two-line staggered */}
          <div className="mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-zinc-50 leading-tight"
            >
              Ready to start your
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: 0.22 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              <span className="text-shimmer">next big project?</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-16"
          >
            I&apos;m currently available for freelance work and full-time positions.
            Let&apos;s talk about how I can help your team succeed.
          </motion.p>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {connectors.map((connector, index) => {
              const isEmail = connector.featured;
              return (
                <motion.a
                  key={connector.label}
                  href={connector.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: 0.35 + index * 0.1 }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  style={{ transition: 'box-shadow 0.3s ease' }}
                  className={`group relative flex flex-col items-center p-8 rounded-3xl transition-all duration-500 overflow-hidden cursor-pointer z-20 ${
                    isEmail
                      ? 'glass-strong border border-[#10B981]/15 hover:border-[#10B981]/35 shadow-card-float hover:shadow-glow'
                      : 'glass border border-white/[0.06] hover:border-white/[0.15] hover:bg-white/[0.04] shadow-card-float'
                  }`}
                >
                  {isEmail && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[8px] font-bold uppercase tracking-widest text-[#10B981]/80">
                      Best way to reach me
                    </div>
                  )}

                  {/* Animated gradient border on email card */}
                  {isEmail && (
                    <div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(99,102,241,0.06) 100%)',
                      }}
                    />
                  )}

                  {/* Top accent glow */}
                  <div className={`absolute top-0 right-0 w-28 h-28 blur-3xl transition-colors duration-500 ${isEmail ? 'bg-[#10B981]/[0.08] group-hover:bg-[#10B981]/[0.16]' : 'bg-white/[0.02] group-hover:bg-white/[0.05]'}`} />

                  <div className="relative z-10 flex flex-col items-center">
                    <motion.div
                      className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 transition-all duration-500 ${isEmail ? 'bg-[#10B981]/10 border-[#10B981]/20 group-hover:border-[#10B981]/50 group-hover:bg-[#10B981]/15 group-hover:shadow-glow-sm' : 'glass border-white/10 group-hover:border-white/20'}`}
                      whileHover={{ scale: 1.14, rotate: 6 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    >
                      <connector.icon className={`w-5 h-5 transition-colors duration-300 ${isEmail ? 'text-[#10B981]' : 'text-zinc-400 group-hover:text-zinc-200'}`} />
                    </motion.div>

                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2 text-center">
                      {connector.label}
                    </p>
                    <p className="text-sm font-medium text-zinc-300 mb-6 text-center">
                      {connector.value}
                    </p>

                    <div className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${isEmail ? 'text-[#10B981]/60 group-hover:text-[#10B981]' : 'text-zinc-600 group-hover:text-zinc-200'}`}>
                      {connector.cta}{' '}
                      <motion.span
                        className="inline-block"
                        whileHover={{ x: 4 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      >
                        <ArrowRight className="w-3 h-3" />
                      </motion.span>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
