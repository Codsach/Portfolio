import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'text-lg font-medium tracking-wider text-white',
        className
      )}
    >
      Sachin R
    </Link>
  );
}
