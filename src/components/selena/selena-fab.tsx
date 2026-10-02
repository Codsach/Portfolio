'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface SelenaFabProps {
  onClick: () => void;
}

export function SelenaFab({ onClick }: SelenaFabProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Only show greeting on first visit this session
    const hasGreeted = sessionStorage.getItem('selena-greeted');
    if (hasGreeted) return;

    const showTimer = setTimeout(() => {
      setShowTooltip(true);
      sessionStorage.setItem('selena-greeted', 'true');
    }, 3000);

    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 9000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Greeting tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative bg-white rounded-xl shadow-lg border border-zinc-200 px-4 py-3 max-w-[220px] cursor-pointer"
            onClick={() => {
              setShowTooltip(false);
              onClick();
            }}
          >
            <p className="text-sm font-semibold text-zinc-900 font-jakarta">
              Hi, I&apos;m Selena 👋
            </p>
            <p className="text-xs text-zinc-500 mt-0.5">
              Curious about Sachin&apos;s work?
            </p>
            {/* Caret pointing down toward the FAB */}
            <div className="absolute -bottom-[6px] right-6 w-3 h-3 bg-white border-r border-b border-zinc-200 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setShowTooltip(false);
          onClick();
        }}
        className="relative w-14 h-14 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 ring-2 ring-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        aria-label="Chat with Selena, portfolio AI assistant"
      >
        <Image
          src="/selena-avatar.jpg"
          alt="Selena"
          width={56}
          height={56}
          className="w-full h-full object-cover"
          priority
        />

        {/* Subtle pulse ring */}
        <span className="absolute inset-0 rounded-full ring-2 ring-amber-400/40 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />
      </motion.button>
    </div>
  );
}
