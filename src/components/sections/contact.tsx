'use client';

import { ScrollReveal } from '../scroll-reveal';
import { Mail, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { IconBrandGithub, IconBrandLinkedin } from '@/components/icons';
import Link from 'next/link';

const connectors = [
  {
    label: 'Email',
    value: 'rsachinsachi@gmail.com',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=rsachinsachi@gmail.com&su=Opportunity%20Discussion',
    icon: Mail,
    color: 'zinc',
    cta: 'Send Email',
    featured: true,
  },
  {
    label: 'LinkedIn',
    value: 'Sachin R',
    href: 'https://linkedin.com/in/sachin-r-b737a7393',
    icon: IconBrandLinkedin,
    color: 'zinc',
    cta: 'Connect',
  },
  {
    label: 'GitHub',
    value: 'Codsach',
    href: 'https://github.com/Codsach',
    icon: IconBrandGithub,
    color: 'zinc',
    cta: 'View Profile',
  },
];

export default function ContactSection({ id }: { id: string }) {
  return (
    <section id={id} className="relative py-24 md:py-48 bg-black overflow-hidden px-6">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-zinc-500/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="flex flex-col items-center text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 font-medium text-xs text-zinc-400 uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-zinc-400" />
              <span>Get in Touch</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Ready to start your <br />
              <span className="text-zinc-500">next big project?</span>
            </h2>
            
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-16">
              I&apos;m currently available for freelance work and full-time positions. 
              Let&apos;s talk about how I can help your team succeed.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {connectors.map((connector, index) => {
              const isMailto = connector.href.startsWith('mailto:');
              const isEmail = connector.label === 'Email';
              
              return (
                <ScrollReveal key={connector.label} delay={index * 100}>
                  <a
                    href={connector.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative flex flex-col items-center p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border cursor-pointer z-20 ${
                      isEmail 
                        ? 'bg-white/[0.04] border-white/20 hover:border-white/40 hover:bg-white/[0.08] shadow-[0_0_40px_-15px_rgba(255,255,255,0.1)]' 
                        : 'bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.05]'
                    }`}
                  >
                    {isEmail && (
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-[8px] font-bold uppercase tracking-widest text-white/70">
                        Best way to reach me
                      </div>
                    )}
                    
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-${connector.color}-500/5 blur-2xl group-hover:bg-${connector.color}-500/10 transition-colors duration-500 ${isEmail ? 'opacity-40' : ''}`} />
                    
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                        <connector.icon className="w-5 h-5 text-white" />
                      </div>
                      
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2 text-center">{connector.label}</p>
                      <p className="text-sm font-medium text-white mb-6 text-center">{connector.value}</p>
                      
                      <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-600 group-hover:text-white transition-colors">
                        {connector.cta} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </a>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


