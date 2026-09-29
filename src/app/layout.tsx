
import { Inter, Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Providers } from '@/components/layout/providers';
import { AmbientLight } from '@/components/ui/ambient-light';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const headlineFont = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
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
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          'min-h-screen bg-slate-50 text-slate-900 font-body antialiased relative selection:bg-indigo-500 selection:text-white',
          inter.variable,
          headlineFont.variable,
          plusJakartaSans.variable
        )}
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
