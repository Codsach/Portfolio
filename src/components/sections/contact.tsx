'use client';

import { Mail, MapPin, Sparkles, ArrowRight, MessageSquare } from 'lucide-react';
import { IconBrandGithub, IconBrandLinkedin } from '@/components/icons';
import Link from 'next/link';
import { motion } from 'framer-motion';

const connectors = [
  {
    label: 'Email',
    value: 'rsachinsachi@gmail.com',
    href: 'mailto:rsachinsachi@gmail.com?subject=Opportunity%20Discussion',
    icon: Mail,
    featured: true,
    cta: 'Send Direct Email',
  },
  {
    label: 'LinkedIn',
    value: 'Sachin R',
    href: 'https://linkedin.com/in/sachin-r-b737a7393',
    icon: IconBrandLinkedin,
    featured: false,
    cta: 'Connect on LinkedIn',
  },
  {
    label: 'GitHub',
    value: 'Codsach',
    href: 'https://github.com/Codsach',
    icon: IconBrandGithub,
    featured: false,
    cta: 'Explore Repositories',
  },
];

export default function ContactSection({ id }: { id: string }) {
  return (
    <section
      id={id}
      className="relative overflow-hidden px-6 py-24 md:py-32 bg-[#F8F9FA]"
    >
      <div className="absolute top-0 inset-x-0 separator-fade" />

      <div className="container mx-auto max-w-4xl relative z-10 w-full">
        <div className="flex flex-col items-center text-center">

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-zinc-100 border border-zinc-200 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-800 font-jakarta">
              Open To Opportunities — Full-Time &amp; Contracts
            </span>
          </motion.div>

          {/* Headline - Solid High-Craft Typography, NO duplicate gradient */}
          <div className="mb-5">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-950 font-jakarta tracking-tight leading-tight"
            >
              Ready to start your <br className="hidden sm:inline" />
              <span className="text-amber-600">next big project?</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-600 max-w-xl mx-auto leading-relaxed mb-12 font-normal"
          >
            I am available for engineering roles and select client builds.
            Feel free to email me directly or connect through LinkedIn.
          </motion.p>

          {/* Contact Cards - Solid Terracotta Email card + clean neutral cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
            {connectors.map((connector, index) => {
              const isEmail = connector.featured;
              return (
                <motion.a
                  key={connector.label}
                  href={connector.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: 0.25 + index * 0.08 }}
                  whileHover={{ y: -4 }}
                  className={`group relative flex flex-col items-center p-6 sm:p-8 rounded-2xl transition-all duration-200 cursor-pointer ${
                    isEmail
                      ? 'bg-amber-600 text-white shadow-md hover:bg-amber-700 hover:scale-102 border border-amber-600'
                      : 'bg-white border border-zinc-200 hover:border-zinc-300 hover:scale-102 shadow-sm hover:shadow-md'
                  }`}
                >
                  {isEmail && (
                    <div className="absolute top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-black/15 text-[10px] font-bold uppercase tracking-widest text-white">
                      Primary Contact
                    </div>
                  )}

                  <div className="relative z-10 flex flex-col items-center w-full mt-2">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-105 shadow-2xs ${
                        isEmail
                          ? 'bg-white/20 text-white'
                          : connector.label === 'LinkedIn'
                          ? 'bg-blue-50 text-blue-600 border border-blue-100'
                          : 'bg-zinc-100 text-zinc-900 border border-zinc-200'
                      }`}
                    >
                      <connector.icon className="w-5 h-5" />
                    </div>

                    <p className={`text-xs font-semibold uppercase tracking-wider mb-1 text-center font-jakarta ${isEmail ? 'text-white/80' : 'text-zinc-500'}`}>
                      {connector.label}
                    </p>
                    
                    <p className={`text-sm sm:text-base font-bold mb-6 text-center break-all font-jakarta ${isEmail ? 'text-white' : 'text-zinc-900'}`}>
                      {connector.value}
                    </p>

                    <div className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors duration-150 mt-auto ${
                      isEmail ? 'text-white' : 'text-amber-600 group-hover:text-amber-700'
                    }`}>
                      <span>{connector.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-150" />
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

