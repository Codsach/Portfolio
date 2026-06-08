'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'border-b border-white/[0.06] shadow-navbar backdrop-blur-2xl'
          : 'border-b border-transparent backdrop-blur-md'
      )}
      style={{
        background: isScrolled
          ? 'rgba(12, 12, 17, 0.88)'
          : 'rgba(12, 12, 17, 0.45)',
      }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 relative">
          {navItems.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <div key={item.label} className="relative">
                <Button variant="ghost" asChild>
                  <Link
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className={cn(
                      'text-sm font-medium transition-colors duration-200 px-4',
                      isActive ? 'text-zinc-50' : 'text-zinc-400 hover:text-zinc-50'
                    )}
                  >
                    {item.label}
                  </Link>
                </Button>
                {/* Active underline indicator */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 inset-x-4 h-px bg-gradient-to-r from-[#10B981] to-transparent rounded-full"
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0, scaleX: 0 }}
                      transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                    />
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          {isClient && (
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[280px]"
                style={{ background: 'rgba(12, 12, 17, 0.97)', borderLeft: '1px solid rgba(255,255,255,0.07)' }}
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-8">
                    <Logo />
                  </div>
                  <nav className="flex flex-col gap-2">
                    {navItems.map((item, i) => {
                      const sectionId = item.href.replace('#', '');
                      const isActive = activeSection === sectionId;
                      return (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                        >
                          <Link
                            href={item.href}
                            onClick={(e) => handleLinkClick(e, item.href)}
                            className={cn(
                              'block py-3 px-4 rounded-xl text-base font-medium transition-all duration-200',
                              isActive
                                ? 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20'
                                : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.05]'
                            )}
                          >
                            {item.label}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </motion.header>
  );
}
