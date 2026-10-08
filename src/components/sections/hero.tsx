'use client';

import { useEffect, useState, useRef } from 'react';
import { useAnimation } from '@/context/animation-context';

function StatCounter({
  target,
  suffix,
  label,
  duration = 1200,
}: {
  target: number;
  suffix: string;
  label: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let hasAnimated = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      <b className="font-display font-normal text-[40px] leading-none text-white">
        {count}
        <u className="no-underline text-[#e08a2c]">{suffix}</u>
      </b>
      <small className="text-[12px] font-medium tracking-[0.12em] uppercase text-[#d8c9bb]">
        {label}
      </small>
    </div>
  );
}

export default function HeroSection({ id }: { id: string }) {
  const { setHeroAnimationDone } = useAnimation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroAnimationDone(true);
    }, 600);
    return () => clearTimeout(timer);
  }, [setHeroAnimationDone]);

  return (
    <section
      id={id}
      className="relative w-full overflow-hidden isolate m-0 p-0 rounded-none max-w-none h-auto min-[861px]:h-[min(100svh,880px)] min-[861px]:min-h-[660px] bg-[linear-gradient(100deg,#1a0a04_0%,#4a1a06_24%,#8f4309_52%,#b4590a_78%,#c8690a_100%)] flex flex-col justify-center"
    >
      {/* 2. Direct absolute background layers (edge-to-edge across entire screen width) */}
      <div className="hero-bg absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <i className="hero-c1 absolute rounded-full block will-change-transform" />
        <i className="hero-c2 absolute rounded-full block will-change-transform" />
        <i className="hero-c4 absolute rounded-full block will-change-transform" />
        <i className="hero-glow-blob absolute rounded-full block will-change-transform" />
      </div>

      {/* Directional shade gradient */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none bg-[linear-gradient(180deg,rgba(14,7,3,0.65)_0%,rgba(14,7,3,0.3)_50%,transparent_80%)] min-[861px]:bg-[linear-gradient(90deg,rgba(14,7,3,0.6)_0%,rgba(14,7,3,0.35)_35%,transparent_58%)]"
        aria-hidden="true"
      />

      {/* 3. Content container: Shared container */}
      <div className="container mx-auto relative z-[10] w-full pt-24 min-[861px]:pt-24 pb-8 min-[861px]:pb-0 min-[861px]:h-full min-[861px]:flex min-[861px]:items-center">
        <div className="w-full min-[861px]:max-w-[min(50%,640px)] text-left flex flex-col justify-center">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 py-2 px-4 border border-white/25 rounded-full text-[13px] font-medium text-[#f1e6dc] bg-white/[0.06] w-fit">
            <i className="w-2 h-2 rounded-full bg-[#3dbb8a] inline-block" />
            Software engineer, open to SDE roles
          </div>

          {/* Headline: clamp(38px, 4.2vw, 68px), exactly 4 lines on desktop (>=861px), natural below */}
          <h1 className="font-display font-normal uppercase text-white tracking-[0.01em] text-[clamp(38px,4.2vw,68px)] leading-[0.96] my-6">
            <span className="min-[861px]:hidden">
              Building fast, reliable software that solves real business problems
              <span className="text-[#e08a2c]">.</span>
            </span>
            <span className="hidden min-[861px]:inline">
              Building fast,<br />
              reliable software<br />
              that solves real<br />
              business problems<span className="text-[#e08a2c]">.</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-[38ch] text-[clamp(16px,1.35vw,19px)] font-light leading-[1.55] text-[#eadfd5]">
            Software engineer turning complex business requirements into fast, resilient web applications, from scalable backend services to polished interfaces.
          </p>

          {/* Action buttons */}
          <div className="flex gap-3 mt-7 flex-wrap">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="py-[15px] px-7 rounded-full text-[15px] font-semibold text-white bg-[#c8690a] hover:bg-[#b4590a] transition-colors no-underline cursor-pointer"
            >
              View selected work
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="py-[15px] px-7 rounded-full text-[15px] font-semibold text-white border border-white/40 hover:bg-white/10 transition-colors no-underline"
            >
              Download resume
            </a>
          </div>

          {/* Stats row */}
          <div className="flex gap-7 min-[861px]:gap-10 mt-9 sm:mt-10">
            <StatCounter target={10} suffix="+" label="Projects built" duration={1200} />
            <StatCounter target={15} suffix="+" label="Technologies" duration={1000} />
          </div>
        </div>
      </div>

      {/* 4. Laptop: Positioned directly inside hero (absolute right 0 bottom 0 on desktop, stacked on mobile) */}
      <div className="hero-art relative z-[2] self-end w-[116%] -mr-[6%] mt-[22vw] min-[861px]:mt-0 min-[861px]:absolute min-[861px]:right-0 min-[861px]:bottom-0 min-[861px]:w-[min(62vw,1040px)] min-[861px]:mr-0 pointer-events-none select-none overflow-visible">
        {/* Dark decorative circle centered behind laptop */}
        <div className="hero-ringpos" aria-hidden="true">
          <i className="hero-ring" />
        </div>

        {/* Laptop image touching bottom and right edges */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-laptop.webp"
          alt="Laptop showing code on a glowing dark rock"
          className="relative z-[1] block w-full max-w-none h-auto [filter:saturate(0.92)] pointer-events-none select-none m-0 p-0"
        />
      </div>
    </section>
  );
}
