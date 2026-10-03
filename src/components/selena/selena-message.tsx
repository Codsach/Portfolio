'use client';

import Image from 'next/image';

type MessageRole = 'user' | 'assistant';

interface SelenaMessageProps {
  role: MessageRole;
  content: string;
  isStreaming?: boolean;
}

export function SelenaMessage({ role, content, isStreaming }: SelenaMessageProps) {
  if (role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] bg-amber-600 text-white px-4 py-2.5 rounded-2xl rounded-br-md text-sm leading-relaxed shadow-sm">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2.5 items-start">
      {/* Selena avatar */}
      <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 mt-0.5 ring-1 ring-zinc-200/80">
        <Image
          src="/selena-avatar.jpg"
          alt="Selena"
          width={24}
          height={24}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Message bubble */}
      <div className="max-w-[85%] bg-zinc-100 text-zinc-900 px-4 py-2.5 rounded-2xl rounded-bl-md text-sm leading-relaxed">
        {/* Render content with preserved line breaks */}
        {content.split('\n').map((line, i, arr) => (
          <span key={i}>
            {line}
            {i < arr.length - 1 && <br />}
          </span>
        ))}
        {/* Streaming cursor */}
        {isStreaming && (
          <span className="inline-block w-[2px] h-4 bg-amber-600 ml-0.5 align-text-bottom animate-blink-cursor" />
        )}
      </div>
    </div>
  );
}
