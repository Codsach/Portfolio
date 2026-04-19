'use client';

import { ScrollReveal } from '../scroll-reveal';
import { Sparkles } from 'lucide-react';

export default function AboutSection({ id }: { id: string }) {
  return (
    <section id={id} className="relative py-24 md:py-40 bg-black overflow-hidden px-6">
      {/* Background radial glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-zinc-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-zinc-500/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left Column: Title */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 font-medium text-xs text-zinc-400 uppercase tracking-widest">
                <Sparkles className="w-3 h-3 text-zinc-400" />
                <span>About Me</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight">
                Sachin R. <br />
                <span className="text-white/40 font-medium italic">Full-Stack Developer.</span>
              </h2>
            </div>

            {/* Right Column: Description & Stats */}
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-8 max-w-xl">
                <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed">
                  I am a Full-Stack Developer focused on building reliable web applications. 
                  My work covers everything from developing user-facing interfaces to setting up 
                  backend systems and integrating blockchain features.
                </p>
                <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed">
                  I value clear code and practical solutions. My goal is to engineer tools that 
                  work well, are easy to maintain, and solve actual problems for users.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-x-12 gap-y-10 border-t border-white/5 pt-12 max-w-xl">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">Full-Stack</div>
                  <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Development</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">Backend</div>
                  <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Systems</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">Blockchain</div>
                  <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Integration</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">Frontend</div>
                  <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold">UX & Design</div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
