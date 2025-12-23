import { ContactForm } from '../contact-form';
import { ScrollReveal } from '../scroll-reveal';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { IconBrandGithub, IconBrandLinkedin } from '@/components/icons';

const socialLinks = [
  {
    name: 'GitHub',
    icon: IconBrandGithub,
    url: 'https://github.com',
  },
  {
    name: 'LinkedIn',
    icon: IconBrandLinkedin,
    url: 'https://linkedin.com',
  },
  {
    name: 'Email',
    icon: Mail,
    url: 'mailto:hello@example.com',
  },
];

export default function ContactSection({ id }: { id: string }) {
  return (
    <section id={id} className="py-20 md:py-32 bg-background">
      <div className="container mx-auto">
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground mt-2">
            Have a project in mind or just want to say hi? Feel free to reach
            out.
          </p>
        </ScrollReveal>
        <ScrollReveal className="max-w-xl mx-auto" delay={200}>
          <ContactForm />
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">Or connect with me on:</p>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
