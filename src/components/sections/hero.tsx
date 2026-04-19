'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useAnimation } from '@/context/animation-context';
import { motion } from 'framer-motion';
import { BackgroundPaths } from '@/components/ui/background-paths';

export default function HeroSection({ id }: { id: string }) {
  const { isHeroAnimationDone, setHeroAnimationDone } = useAnimation();

  useEffect(() => {
    // Set animation as done after a reasonable delay for other components to sync
    const timer = setTimeout(() => {
      setHeroAnimationDone(true);
    }, 800);

    return () => clearTimeout(timer);
  }, [setHeroAnimationDone]);

  return (
    <section
      id={id}
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-black text-white px-6 pt-24"
    >
      {/* Dynamic Background Paths */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none">
        <BackgroundPaths />
      </div>

      {/* Subtle Depth Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      
      <div className="container max-w-4xl mx-auto z-10 relative">
        <div className="flex flex-col items-center text-center space-y-8">
          
          {/* Headline - Primary Focus */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1]"
          >
            Engineering premium digital experiences.
          </motion.h1>

          {/* Muted Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Full-stack developer focused on creating smooth, high-impact products
            that blend robust engineering with minimalist design.
          </motion.p>

          {/* Buttons CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-wrap gap-4 justify-center mt-8"
          >
            <Button 
              variant="outline"
              size="lg" 
              className="rounded-full px-8 h-14 border-white/10 bg-transparent hover:bg-white/5 hover:text-white transition-all duration-300 hover:scale-105 hover:opacity-90 active:scale-[0.98] text-white font-medium text-base hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Projects 
            </Button>
            
            <Button 
              asChild 
              size="lg" 
              className="rounded-full px-8 h-14 bg-white text-black hover:bg-white/90 transition-all duration-300 hover:scale-105 active:scale-[0.98] font-medium text-base hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] shadow-md"
            >
              <Link href="/resume.pdf" target="_blank">
                Resume
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Apple-style subtle scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isHeroAnimationDone ? { opacity: 0.4 } : { opacity: 0 }}
        transition={{ delay: 1.8, duration: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-zinc-500 to-transparent" />
      </motion.div>
    </section>
  );
}
