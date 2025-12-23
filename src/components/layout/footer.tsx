import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';

const socialLinks = [
  {
    href: 'https://github.com',
    icon: Github,
    label: 'GitHub',
  },
  {
    href: 'https://linkedin.com',
    icon: Linkedin,
    label: 'LinkedIn',
  },
  {
    href: 'mailto:hello@example.com',
    icon: Mail,
    label: 'Email',
  },
];

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <Logo />
            <p className="text-sm text-muted-foreground mt-2">
              © {new Date().getFullYear()} Portfolio. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <Button
                key={link.label}
                variant="ghost"
                size="icon"
                asChild
                aria-label={link.label}
              >
                <Link href={link.href} target="_blank" rel="noopener noreferrer">
                  <link.icon className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
