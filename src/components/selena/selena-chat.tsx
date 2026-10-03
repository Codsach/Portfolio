'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SelenaFab } from './selena-fab';
import { SelenaPanel, type Message } from './selena-panel';

let messageIdCounter = 0;
function nextId() {
  return `msg-${++messageIdCounter}-${Date.now()}`;
}

export function SelenaChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  const handleSend = useCallback(
    async (text: string) => {
      if (isStreaming) return;

      // Add user message
      const userMsg: Message = { id: nextId(), role: 'user', content: text };
      const assistantMsg: Message = {
        id: nextId(),
        role: 'assistant',
        content: '',
      };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setIsStreaming(true);

      try {
        // Build conversation history for the API (last 10 messages + current)
        const history = [...messages, userMsg]
          .filter((m) => m.content.trim() !== '')
          .slice(-10)
          .map((m) => ({ role: m.role, content: m.content }));

        const res = await fetch('/api/selena', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          const errorText =
            res.status === 429
              ? "You're sending messages too quickly. Please wait a moment."
              : data.error || 'Something went wrong. Try again in a moment.';

          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsg.id ? { ...m, content: errorText } : m
            )
          );
          setIsStreaming(false);
          return;
        }

        // Stream the response
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          throw new Error('No response body');
        }

        let accumulated = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          accumulated += chunk;

          // Update the assistant message with accumulated text
          const currentText = accumulated;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsg.id ? { ...m, content: currentText } : m
            )
          );
        }
      } catch (err) {
        console.error('Selena chat error:', err);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsg.id
              ? {
                  ...m,
                  content:
                    'Sorry, I had trouble connecting. Please try again.',
                }
              : m
          )
        );
      } finally {
        setIsStreaming(false);
      }
    },
    [isStreaming, messages]
  );

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleNewChat = useCallback(() => {
    setMessages([]);
    setIsStreaming(false);
  }, []);

  return (
    <>
      {/* FAB — visible when panel is closed */}
      {!isOpen && <SelenaFab onClick={() => setIsOpen(true)} />}

      {/* Panel — animated in/out */}
      <AnimatePresence>
        {isOpen && (
          <SelenaPanel
            messages={messages}
            isStreaming={isStreaming}
            onSend={handleSend}
            onClose={handleClose}
            onNewChat={handleNewChat}
          />
        )}
      </AnimatePresence>
    </>
  );
}
