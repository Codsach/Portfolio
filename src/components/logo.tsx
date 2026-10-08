'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function Logo({ className, textClassName }: { className?: string; textClassName?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'group flex items-center gap-3 text-lg font-bold tracking-tight text-slate-900',
        className
      )}
    >
      <motion.div
        className="relative w-8 h-8 rounded-xl overflow-hidden shadow-sm border border-slate-200/80 group-hover:scale-105 group-hover:shadow-md transition-all duration-300 flex-shrink-0"
        whileTap={{ scale: 0.95 }}
      >
        <Image
          src="/images/logo.png"
          alt="Sachin R Logo"
          width={32}
          height={32}
          priority
          className="w-full h-full object-cover"
        />
      </motion.div>
      <span className={cn("font-sans font-semibold text-[18px] text-[var(--ink)] group-hover:text-[var(--amber)] transition-colors duration-200", textClassName)}>
        Sachin R
      </span>
    </Link>
  );
}


