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
    hoverClass: 'group-hover:bg-zinc-200 group-hover:text-zinc-900 group-hover:border-zinc-300',
  },
  {
    href: 'https://linkedin.com/in/sachin-r-b737a7393',
    icon: IconBrandLinkedin,
    label: 'LinkedIn',
    hoverClass: 'group-hover:bg-zinc-200 group-hover:text-zinc-900 group-hover:border-zinc-300',
  },
  {
    href: 'mailto:rsachinsachi@gmail.com?subject=Opportunity%20Discussion',
    icon: Mail,
    label: 'Email',
    hoverClass: 'group-hover:bg-amber-100 group-hover:text-amber-800 group-hover:border-amber-300',
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-16 pb-12 overflow-hidden bg-white border-t border-zinc-200">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Logo />
            <p className="text-zinc-600 max-w-sm text-sm leading-relaxed font-normal">
              Building scalable web applications, decentralized blockchain systems, and
              AI-driven workflows focused on maintainability and craft.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-xs font-semibold uppercase tracking-wider text-zinc-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Open for opportunities</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-jakarta">Navigation</h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-zinc-600 hover:text-amber-600 transition-colors duration-150 text-sm font-medium"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-jakarta">Connect</h4>
            <div className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-zinc-600 hover:text-zinc-950 transition-colors duration-150 group"
                  whileHover={{ x: 2 }}
                >
                  <div className={`flex items-center justify-center w-7 h-7 rounded-md bg-zinc-100 border border-zinc-200 transition-all duration-150 ${link.hoverClass}`}>
                    <link.icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm font-medium">{link.label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-zinc-500 text-xs font-normal text-center md:text-left">
            <span>© {new Date().getFullYear()} Sachin R. All rights reserved.</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={scrollToTop}
            className="rounded-md bg-white hover:bg-zinc-50 border-zinc-200 hover:border-zinc-300 text-zinc-700 hover:text-zinc-950 font-medium text-xs gap-1.5 shadow-2xs transition-all duration-150"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </footer>
  );
}

