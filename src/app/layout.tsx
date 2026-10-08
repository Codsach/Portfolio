
import { Anton, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Providers } from '@/components/layout/providers';
import { AmbientLight } from '@/components/ui/ambient-light';
import type { Metadata } from 'next';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sachin R | Portfolio',
  description: 'Personal portfolio of Sachin R',
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn('scroll-smooth', anton.variable, inter.variable, mono.variable)}>
      <body
        className="min-h-screen bg-slate-50 text-[var(--ink)] font-sans antialiased relative selection:bg-indigo-500 selection:text-white"
      >
        {/* Ambient atmospheric lighting — sits behind everything */}
        <AmbientLight />

        {/* Page content stack sits above ambient lighting */}
        <div className="relative z-10">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
