
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
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Outfit:wght@500;700&family=Plus+Jakarta+Sans:wght@500;700;800&family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased relative',
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
