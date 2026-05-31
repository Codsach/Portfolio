'use client';

import { Mail, ArrowUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { IconBrandGithub, IconBrandLinkedin } from '@/components/icons';
import { motion } from 'framer-motion';

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

const socialLinks = [
  {
    href: 'https://github.com/Codsach',
    icon: IconBrandGithub,
    label: 'GitHub',
  },
  {
    href: 'https://linkedin.com/in/sachin-r-b737a7393',
    icon: IconBrandLinkedin,
    label: 'LinkedIn',
  },
  {
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=rsachinsachi@gmail.com&su=Opportunity%20Discussion',
    icon: Mail,
    label: 'Email',
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="relative pt-24 pb-12 overflow-hidden bg-gradient-to-b from-[#0C0C11] via-[#08080C] to-[#040406]"
    >
      {/* Vercel-style subtle grid overlay with fade mask */}
      <div 
        className="absolute inset-0 bg-grid opacity-[0.06] pointer-events-none"
        style={{
          maskImage: 'radial-gradient(circle at 50% 20%, black, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 20%, black, transparent 75%)',
        }}
      />

      {/* Dynamic Mono Ambient Glows */}
      <motion.div
        className="absolute top-0 left-1/4 w-[500px] h-[250px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.015) 0%, rgba(99, 102, 241, 0.005) 50%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [-20, 20, -20],
          y: [-10, 10, -10],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-0 right-1/4 w-[450px] h-[200px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0, 245, 255, 0.02) 0%, rgba(99, 102, 241, 0.005) 50%, transparent 70%)',
          filter: 'blur(70px)',
        }}
        animate={{
          x: [20, -20, 20],
          y: [10, -10, 10],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Monochromatic & Cyber Shimmer Top Border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      <motion.div
        className="absolute top-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent w-1/3 pointer-events-none"
        animate={{
          left: ["-35%", "105%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "linear",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-6">
            <Logo className="text-2xl font-bold tracking-widest hover:text-[#00F5FF] transition-colors duration-300" />
            <p className="text-zinc-400 max-w-sm text-base leading-relaxed font-light">
              Building scalable web applications, blockchain systems and
              AI-powered products focused on performance and usability.
            </p>
            <motion.div
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/[0.03] border border-emerald-500/10 hover:border-emerald-500/30 hover:bg-emerald-500/[0.06] transition-all duration-500 shadow-[0_0_15px_rgba(16,185,129,0.02)] hover:shadow-[0_0_20px_rgba(16,185,129,0.06)]"
              whileHover={{ scale: 1.02, y: -1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400/90 selection:bg-emerald-500/20">
                Available for new opportunities
              </span>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-300 font-headline">Navigation</h4>
            <ul className="space-y-3.5">
              {navItems.map((item) => (
                <li key={item.label} className="overflow-hidden">
                  <Link
                    href={item.href}
                    className="group relative flex items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-300 text-sm font-medium py-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 origin-center" />
                    <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-300 font-headline">Social</h4>
            <div className="flex flex-col gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors duration-300 group py-1"
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                >
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.02] border border-white/[0.05] group-hover:bg-[#00F5FF]/10 group-hover:border-[#00F5FF]/30 group-hover:text-[#00F5FF] transition-all duration-300 shadow-sm">
                    <link.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium tracking-wide">{link.label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 text-zinc-500 text-xs text-center md:text-left font-light">
            <span>© {new Date().getFullYear()} Sachin R. All rights reserved.</span>
            <span className="hidden md:inline text-zinc-800">|</span>
            <span>Built with Next.js, Tailwind &amp; Framer Motion.</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="text-zinc-400 hover:text-[#00F5FF] gap-2 transition-all duration-300 group border border-white/[0.02] hover:border-cyan-500/20 bg-white/[0.01] hover:bg-cyan-500/[0.02] rounded-full px-5 py-2.5 h-auto shadow-sm"
          >
            <span className="text-xs uppercase tracking-widest font-bold">Back to top</span>
            <motion.div
              className="inline-block"
              animate={{ y: [0, -2, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
            >
              <ArrowUp className="h-4 w-4" />
            </motion.div>
          </Button>
        </div>
      </div>
    </footer>
  );
}
