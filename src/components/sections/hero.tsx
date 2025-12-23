'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Download, Forward } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
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
              className="fill-primary/5"
              style={{ animation: 'wave 45s linear infinite' }}
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              className="fill-primary/5"
              style={{ animation: 'wave 38s linear infinite reverse' }}
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              className="fill-accent/5"
              style={{ animation: 'wave 32s linear infinite' }}
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="7"
              className="fill-accent/5"
              style={{ animation: 'wave 27s linear infinite' }}
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
            transform: translateX(-176px);
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
  
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const fullAnimationTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
    typingTimerRef.current = setTimeout(() => {
      setIsTypingDone(true);
    }, 2500); // Typing animation duration

    fullAnimationTimerRef.current = setTimeout(() => {
      setHeroAnimationDone(true);
    }, 4500); // Full animation (typing + glow)

    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      if (fullAnimationTimerRef.current) clearTimeout(fullAnimationTimerRef.current);
    };
  }, [setHeroAnimationDone]);

  const handleSkipAnimation = () => {
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    if (fullAnimationTimerRef.current) clearTimeout(fullAnimationTimerRef.current);
    setIsTypingDone(true);
    setHeroAnimationDone(true);
  };

  return (
    <section
      id={id}
      className={cn(
        'relative flex items-center min-h-screen overflow-hidden transition-colors duration-1000',
        isHeroAnimationDone ? 'bg-transparent' : 'bg-black'
      )}
    >
      {!isHeroAnimationDone && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 z-20 text-white/50 hover:text-white hover:bg-white/10"
          onClick={handleSkipAnimation}
        >
          Skip Animation <Forward className="ml-2 h-4 w-4" />
        </Button>
      )}

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
                    'flex flex-wrap gap-4 justify-center transition-opacity duration-1000',
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
                    <Link href="/resume.pdf" target="_blank">
                      View Resume <FileText className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a href="/resume.pdf" download>
                      Download Resume <Download className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                  <Button asChild variant="secondary" size="lg">
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
