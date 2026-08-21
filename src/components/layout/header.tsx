'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import Logo from '@/components/logo';
import { useAnimation } from '@/context/animation-context';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
];

const mobileNavItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { isHeroAnimationDone } = useAnimation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    if (!isClient) return;
    const sectionIds = navItems.map((item) => item.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [isClient]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={isHeroAnimationDone ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 22, delay: 0.1 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'border-b border-zinc-200 shadow-xs backdrop-blur-md bg-white/90'
          : 'border-b border-transparent backdrop-blur-sm bg-white/50'
      )}
    >
      <div className="container mx-auto relative flex h-16 items-center justify-between px-6">
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Desktop Navigation - Mathematically Centered */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-zinc-100/90 border border-zinc-200/80 absolute left-1/2 -translate-x-1/2 shadow-2xs">
          {navItems.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <div key={item.label} className="relative">
                <Button
                  variant="ghost"
                  asChild
                  className={cn(
                    'text-xs font-semibold rounded-full transition-all duration-200 px-4 h-8',
                    isActive
                      ? 'text-white'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/60'
                  )}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                  >
                    {item.label}
                  </Link>
                </Button>
                {/* Active indicator */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-zinc-900 rounded-full -z-10 shadow-xs"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Header Action Buttons */}
        <div className="hidden md:flex items-center gap-2.5">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              window.open('/resume.pdf', '_blank');
            }}
            className="rounded-full bg-white hover:bg-amber-50/60 border border-zinc-200 hover:border-amber-400 text-zinc-800 hover:text-zinc-950 font-bold text-xs uppercase tracking-wider px-4 py-2 shadow-2xs gap-1.5 transition-all duration-200"
          >
            <FileText className="w-3.5 h-3.5 text-amber-600" />
            <span>Resume</span>
          </Button>

          <Button
            size="sm"
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 shadow-xs hover:shadow transition-all duration-200"
          >
            Let&apos;s Talk
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          {isClient && (
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-lg hover:bg-zinc-100 text-zinc-700">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[280px] bg-white border-l border-zinc-200 p-6"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-zinc-100">
                      <Logo />
                    </div>
                    <nav className="flex flex-col gap-1.5">
                      {mobileNavItems.map((item, i) => {
                        const sectionId = item.href.replace('#', '');
                        const isActive = activeSection === sectionId;
                        return (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: 15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04 }}
                          >
                            <Link
                              href={item.href}
                              onClick={(e) => handleLinkClick(e, item.href)}
                              className={cn(
                                'flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold transition-all duration-150',
                                isActive
                                  ? 'bg-zinc-900 text-white'
                                  : 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100'
                              )}
                            >
                              <span>{item.label}</span>
                              {isActive && (
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                              )}
                            </Link>
                          </motion.div>
                        );
                      })}
                    </nav>
                  </div>

                  {/* Mobile Drawer Bottom */}
                  <div className="pt-6 border-t border-zinc-100 space-y-3">
                    <Button
                      className="w-full rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold py-5"
                      onClick={() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Get in Touch
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </motion.header>
  );
}
