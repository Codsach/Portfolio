'use client';

import { AnimationProvider } from '@/context/animation-context';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

function SiteWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AnimationProvider>
      <SiteWrapper>
        <Header />
        <main>{children}</main>
        <Footer />
      </SiteWrapper>
      <Toaster />
    </AnimationProvider>
  );
}
