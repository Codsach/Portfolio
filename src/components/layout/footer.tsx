'use client';

import { Mail, ArrowUp, Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { IconBrandGithub, IconBrandLinkedin } from '@/components/icons';
import { ScrollReveal } from '../scroll-reveal';

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
    <footer className="relative bg-black border-t border-white/5 pt-20 pb-10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-zinc-500/10 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-6">
            <Logo className="text-2xl" />
            <p className="text-zinc-400 max-w-sm text-lg leading-relaxed">
              Engineering premium digital experiences with a focus on performance, 
              minimalist design, and scalable architecture.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Available for new opportunities
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-white">Navigation</h4>
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link 
                    href={item.href}
                    className="text-zinc-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-white">Social</h4>
            <div className="flex flex-col gap-4">
              {socialLinks.map((link) => {
                const isMailto = link.href.startsWith('mailto:');
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={isMailto ? undefined : "_blank"}
                    rel={isMailto ? undefined : "noopener noreferrer"}
                    className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors duration-300 group"
                  >
                    <link.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-sm">{link.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 text-zinc-500 text-xs text-center md:text-left">
            <span>© {new Date().getFullYear()} Sachin R. All rights reserved.</span>
            <span className="hidden md:inline text-zinc-800">|</span>
            <span>Built with Next.js, Tailwind & Framer Motion.</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="text-zinc-500 hover:text-white gap-2 transition-all duration-300 group"
          >
            <span className="text-xs uppercase tracking-widest font-bold">Back to top</span>
            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
