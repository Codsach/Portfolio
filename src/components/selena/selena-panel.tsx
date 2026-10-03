'use client';

import { useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { X, Minus, RotateCcw, ArrowUp } from 'lucide-react';
import { SelenaMessage } from './selena-message';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

interface SelenaPanelProps {
  messages: Message[];
  isStreaming: boolean;
  onSend: (text: string) => void;
  onClose: () => void;
  onNewChat: () => void;
}

const starterQuestions = [
  'What has Sachin built?',
  'Tell me about ProofChain',
  'Which projects use AI?',
];

export function SelenaPanel({
  messages,
  isStreaming,
  onSend,
  onClose,
  onNewChat,
}: SelenaPanelProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const textareaElement = useRef<HTMLTextAreaElement | null>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus textarea on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      textareaRef.current?.focus();
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  // ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Click outside to close (desktop only)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (window.innerWidth < 768) return; // skip on mobile
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    // Delay listener to avoid immediately closing from the FAB click
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleSubmit = useCallback(() => {
    const text = textareaElement.current?.value.trim();
    if (!text || isStreaming) return;
    onSend(text);
    if (textareaElement.current) {
      textareaElement.current.value = '';
      textareaElement.current.style.height = 'auto';
    }
  }, [isStreaming, onSend]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  const handleTextareaInput = useCallback(() => {
    const el = textareaElement.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  }, []);

  // Whether to show starter chips (only before user has sent a message)
  const hasUserMessage = messages.some((m) => m.role === 'user');

  return (
    <>
      {/* Mobile backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[51] md:hidden"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        ref={panelRef}
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 20 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        style={{ transformOrigin: 'bottom right' }}
        className="fixed z-[52] flex flex-col
          inset-0 md:inset-auto
          md:bottom-6 md:right-6
          md:w-[400px] md:h-[560px]
          md:rounded-2xl
          bg-white/95 backdrop-blur-xl
          border-0 md:border md:border-zinc-200/80
          shadow-none md:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)]
          overflow-hidden"
        role="dialog"
        aria-label="Chat with Selena"
      >
        {/* ── Header ───────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-100 bg-white/80 backdrop-blur-md flex-shrink-0">
          <div className="w-7 h-7 rounded-full overflow-hidden ring-1 ring-zinc-200/80 flex-shrink-0">
            <Image
              src="/selena-avatar.jpg"
              alt="Selena"
              width={28}
              height={28}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-zinc-900 font-jakarta">
                ✦ Selena
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
            </div>
            <p className="text-[11px] text-zinc-500 font-medium leading-tight">
              Portfolio AI Assistant
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={onNewChat}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors duration-150"
              title="New chat"
              aria-label="Start new conversation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors duration-150 md:hidden"
              title="Close"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="hidden md:flex w-7 h-7 rounded-lg items-center justify-center text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors duration-150"
              title="Minimize"
              aria-label="Minimize chat"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Messages ─────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth">
          {/* Welcome message (always first) */}
          <SelenaMessage
            role="assistant"
            content={`Hey! I'm Selena 👋\n\nI can help you explore Sachin's projects, skills, and the technologies he's worked with.\n\nWhat would you like to know?`}
          />

          {/* Starter chips */}
          {!hasUserMessage && (
            <div className="flex flex-wrap gap-2 pl-8">
              {starterQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => onSend(q)}
                  disabled={isStreaming}
                  className="text-xs font-medium text-zinc-700 bg-white border border-zinc-200 rounded-lg px-3 py-2 hover:border-amber-400 hover:text-zinc-900 hover:bg-amber-50/30 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xs"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Conversation messages */}
          {messages.map((msg, i) => (
            <SelenaMessage
              key={msg.id}
              role={msg.role}
              content={msg.content}
              isStreaming={
                isStreaming &&
                msg.role === 'assistant' &&
                i === messages.length - 1
              }
            />
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* ── Input bar ────────────────────────────────────────────── */}
        <div className="flex-shrink-0 border-t border-zinc-100 bg-white/80 backdrop-blur-md px-3 py-3">
          <div className="flex items-end gap-2 bg-zinc-50 rounded-xl border border-zinc-200 focus-within:border-amber-400 focus-within:ring-1 focus-within:ring-amber-400/30 transition-all duration-150 px-3 py-2">
            <textarea
              ref={(el) => {
                textareaRef.current = el;
                textareaElement.current = el;
              }}
              rows={1}
              placeholder="Ask Selena anything..."
              className="flex-1 resize-none bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none leading-relaxed max-h-[120px]"
              onKeyDown={handleKeyDown}
              onInput={handleTextareaInput}
              disabled={isStreaming}
            />
            <button
              onClick={handleSubmit}
              disabled={isStreaming}
              className="w-8 h-8 rounded-lg bg-amber-600 hover:bg-amber-700 disabled:bg-zinc-300 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0 transition-colors duration-150 shadow-sm"
              aria-label="Send message"
            >
              <ArrowUp className="w-4 h-4 text-white" />
            </button>
          </div>
          <p className="text-[10px] text-zinc-400 text-center mt-1.5 font-medium">
            Selena uses AI · Answers are based on portfolio data
          </p>
        </div>
      </motion.div>
    </>
  );
}
