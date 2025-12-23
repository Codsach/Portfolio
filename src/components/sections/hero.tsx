'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useAnimation } from '@/context/animation-context';

const AbstractShape = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxStyle = {
    transform: `translateY(${scrollY * 0.3}px)`,
  };

  return (
    <div
      className="absolute inset-0 -z-10 overflow-hidden"
      style={parallaxStyle}
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px]">
        <div className="absolute w-full h-full rounded-full bg-primary/5 animate-[spin_40s_linear_infinite]"></div>
        <div className="absolute w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 animate-[spin_50s_linear_infinite_reverse]"></div>
        <div className="absolute w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/20 animate-[spin_60s_linear_infinite]"></div>
      </div>
    </div>
  );
};

export default function HeroSection({ id }: { id: string }) {
  const [isMounted, setIsMounted] = useState(false);
  const { isHeroAnimationDone, setHeroAnimationDone } = useAnimation();
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const typingTimer = setTimeout(() => {
      setIsTypingDone(true);
    }, 2500); // Typing animation duration

    const fullAnimationTimer = setTimeout(() => {
      setHeroAnimationDone(true);
    }, 4500); // Full animation (typing + glow)

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(fullAnimationTimer);
    };
  }, [setHeroAnimationDone]);

  return (
    <section
      id={id}
      className="relative flex items-center min-h-screen bg-background overflow-hidden"
    >
      <div className="container mx-auto">
        <div className="relative z-10 text-center">
          <div className="space-y-6">
            {isMounted && (
              <>
                <div className="inline-block">
                  <h1
                    className={cn(
                      'text-5xl md:text-8xl font-headline font-bold tracking-tighter',
                      !isTypingDone && 'typing-glow-effect',
                      isTypingDone && 'typing-glow-effect animation-done'
                    )}
                  >
                    Hi, I’m John Doe
                  </h1>
                </div>
                <div
                  className={cn(
                    'transition-opacity duration-1000',
                    isHeroAnimationDone ? 'opacity-100' : 'opacity-0'
                  )}
                  style={{transitionDelay: '200ms'}}
                >
                  <p className="text-lg md:text-xl font-medium text-accent">
                    I design & build modern web experiences
                  </p>
                </div>
                <div
                  className={cn(
                    'transition-opacity duration-1000',
                    isHeroAnimationDone ? 'opacity-100' : 'opacity-0'
                  )}
                  style={{transitionDelay: '400ms'}}
                >
                  <p className="text-md md:text-xl text-muted-foreground max-w-lg mx-auto">
                    A passionate developer and designer creating beautiful,
                    functional, and user-centered digital products.
                  </p>
                </div>
                <div
                  className={cn(
                    'flex gap-4 justify-center transition-opacity duration-1000',
                    isHeroAnimationDone ? 'opacity-100' : 'opacity-0'
                  )}
                   style={{transitionDelay: '600ms'}}
                >
                  <Button asChild size="lg">
                    <Link href="#projects">
                      View My Work <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="#contact">Contact Me</Link>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <AbstractShape />
    </section>
  );
}
