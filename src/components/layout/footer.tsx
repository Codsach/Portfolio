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
    hoverClass: 'group-hover:bg-[var(--card)] group-hover:text-[var(--burnt)] group-hover:border-[rgba(217,112,15,0.4)]',
  },
  {
    href: 'https://www.linkedin.com/in/sachinr-dev/',
    icon: IconBrandLinkedin,
    label: 'LinkedIn',
    hoverClass: 'group-hover:bg-[var(--card)] group-hover:text-[var(--burnt)] group-hover:border-[rgba(217,112,15,0.4)]',
  },
  {
    href: 'mailto:rsachinsachi@gmail.com?subject=Opportunity%20Discussion',
    icon: Mail,
    label: 'Email',
    hoverClass: 'group-hover:bg-[var(--card)] group-hover:text-[var(--burnt)] group-hover:border-[rgba(217,112,15,0.4)]',
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-16 pb-12 overflow-hidden bg-[var(--sand)] border-t border-[var(--line)]">
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Logo />
            <p className="font-sans font-normal text-[15px] text-[var(--body)] max-w-[40ch] leading-relaxed">
              Building scalable web applications, decentralized blockchain systems, and
              AI-driven workflows focused on maintainability and craft.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[var(--tile)] border border-[var(--line)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-sans font-medium text-[12px] uppercase tracking-wider text-[var(--ink)]">
                Open for opportunities
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-sans font-semibold text-[12px] uppercase tracking-[0.14em] text-[var(--ink)]">Navigation</h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-sans font-normal text-[15px] text-[var(--body)] hover:text-[var(--burnt)] transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h4 className="font-sans font-semibold text-[12px] uppercase tracking-[0.14em] text-[var(--ink)]">Connect</h4>
            <div className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-[var(--body)] hover:text-[var(--ink)] transition-colors duration-150 group"
                  whileHover={{ x: 2 }}
                >
                  <div className={`flex items-center justify-center w-7 h-7 rounded-md bg-[var(--tile)] border border-[var(--line)] text-[var(--icon-muted)] transition-all duration-150 ${link.hoverClass}`}>
                    <link.icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-sans font-normal text-[15px] text-[var(--body)] group-hover:text-[var(--ink)] transition-colors duration-150">{link.label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[var(--line)] flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-sans font-normal text-[13px] text-[var(--muted)] text-center md:text-left">
            <span>© {new Date().getFullYear()} Sachin R. All rights reserved.</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={scrollToTop}
            className="rounded-md bg-[var(--card)] hover:bg-[var(--tile)] border-[var(--line)] hover:border-[rgba(42,26,16,0.25)] font-sans font-normal text-[13px] text-[var(--muted)] hover:text-[var(--ink)] gap-1.5 shadow-2xs transition-all duration-150"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </footer>
  );
}

