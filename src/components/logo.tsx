import Link from 'next/link';
import { Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'flex items-center gap-2 text-xl font-bold font-headline text-primary',
        className
      )}
    >
      <Code2 className="h-6 w-6 text-accent" />
      <span>PortfolioPro</span>
    </Link>
  );
}
