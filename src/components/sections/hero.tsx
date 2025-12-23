'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useAnimation } from '@/context/animation-context';

const WaveBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-full w-full">
        <svg
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallax">
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              className="fill-primary/5 animate-[wave_45s_cubic-bezier(0.55,0.5,0.45,0.5)_infinite]"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              className="fill-primary/5 animate-[wave_38s_cubic-bezier(0.55,0.5,0.45,0.5)_infinite_reverse]"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              className="fill-accent/5 animate-[wave_32s_linear_infinite]"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="7"
              className="fill-accent/5 animate-[wave_27s_cubic-bezier(0.55,0.5,0.45,0.5)_infinite]"
            />
          </g>
        </svg>
      </div>
      <style jsx>{`
        @keyframes wave {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-160px);
          }
        }
        .parallax > use {
          animation-delay: -2s;
        }
      `}</style>
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
      className={cn(
        'relative flex items-center min-h-screen overflow-hidden transition-colors duration-1000',
        isHeroAnimationDone ? 'bg-transparent' : 'bg-black'
      )}
    >
      <div className="container mx-auto">
        <div className="relative z-10 text-center">
          <div className="space-y-6">
            {isMounted && (
              <>
                <div className="inline-block">
                  <h1
                    className={cn(
                      'text-5xl md:text-8xl font-headline font-bold tracking-tighter text-gradient',
                      !isTypingDone && 'typing-glow-effect',
                      isTypingDone && 'typing-glow-effect animation-done'
                    )}
                  >
                    Hi, I’m Sachin R
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
      <div
        className={cn(
          'transition-opacity duration-1000',
          isHeroAnimationDone ? 'opacity-100' : 'opacity-0'
        )}
      >
        <WaveBackground />
      </div>
    </section>
  );
}
