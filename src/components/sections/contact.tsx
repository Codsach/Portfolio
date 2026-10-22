'use client';

import { Mail, ArrowRight } from 'lucide-react';
import { IconBrandGithub, IconBrandLinkedin } from '@/components/icons';
import { motion } from 'framer-motion';

const connectors = [
  {
    label: 'Email',
    value: 'rsachinsachi@gmail.com',
    href: 'mailto:rsachinsachi@gmail.com?subject=Opportunity%20Discussion',
    icon: Mail,
    featured: true,
    cta: 'Send Direct Email',
  },
  {
    label: 'LinkedIn',
    value: 'Sachin R',
    href: 'https://www.linkedin.com/in/sachinr-dev/',
    icon: IconBrandLinkedin,
    featured: false,
    cta: 'Connect on LinkedIn',
  },
  {
    label: 'GitHub',
    value: 'Codsach',
    href: 'https://github.com/Codsach',
    icon: IconBrandGithub,
    featured: false,
    cta: 'Explore Repositories',
  },
];

export default function ContactSection({ id }: { id: string }) {
  return (
    <section
      id={id}
      className="relative overflow-hidden py-24 md:py-32 bg-[var(--paper)]"
    >
      <div className="absolute top-0 inset-x-0 separator-fade" />

      <div className="container mx-auto relative z-10 w-full">
        <div className="flex flex-col items-center text-center">

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-zinc-100 border border-zinc-200 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-sans font-medium text-[12px] uppercase tracking-[0.12em] text-[var(--ink)]">
              Open to Software Engineering Roles
            </span>
          </motion.div>

          {/* Headline */}
          <div className="mb-5">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="t-section text-center"
            >
              LET&apos;S BUILD SOMETHING<span className="text-[var(--amber)]">.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="t-lead max-w-xl mx-auto text-center mb-12 text-balance"
          >
            Currently looking for full-time roles in software engineering — full-stack, backend, or product. Open to contracts on the side. Let&apos;s talk.
          </motion.p>

          {/* Contact Cards */}
          <div className="w-full max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
              {connectors.map((connector, index) => (
                <motion.a
                  key={connector.label}
                  href={connector.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: 0.25 + index * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="contact-card group relative flex flex-col items-center p-6 sm:p-8 pt-8 sm:pt-9 rounded-2xl cursor-pointer outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--burnt)] focus-visible:outline-offset-2"
                >
                  {connector.featured && (
                    <div className="contact-badge absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[11px] font-sans font-semibold uppercase tracking-[0.1em] whitespace-nowrap shadow-xs">
                      Primary Contact
                    </div>
                  )}

                  <div className="relative z-10 flex flex-col items-center w-full mt-1">
                    <div className="contact-icon-wrap w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-2xs">
                      <connector.icon className="contact-icon w-5 h-5" />
                    </div>

                    <p className="contact-label font-sans font-semibold text-[12px] uppercase tracking-[0.14em] mb-1 text-center">
                      {connector.label}
                    </p>

                    <p className="contact-value font-sans font-semibold text-[16px] mb-6 text-center break-all">
                      {connector.value}
                    </p>

                    <div className="contact-cta inline-flex items-center gap-1.5 font-sans font-semibold text-[12px] uppercase tracking-wider mt-auto">
                      <span>{connector.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-150" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-card {
          background-color: var(--card-warm, #fffaf4);
          border: 1px solid var(--line);
          box-shadow: 0 1px 3px 0 rgba(42, 26, 16, 0.05);
          transition:
            transform        0.22s ease,
            border-color     0.22s ease,
            box-shadow       0.22s ease;
        }
        .contact-card:hover {
          border-color: rgba(217, 112, 15, 0.45);
          box-shadow: 0 10px 28px -6px rgba(42, 26, 16, 0.14);
        }
        .contact-badge {
          background-color: var(--tile);
          border: 1px solid var(--line);
          color: var(--amber-text);
          transition:
            background-color 0.22s ease,
            color            0.22s ease,
            border-color     0.22s ease;
        }
        .contact-card:hover .contact-badge,
        .contact-card:focus-visible .contact-badge {
          border-color: rgba(217, 112, 15, 0.40);
          color: var(--burnt);
        }
        .contact-icon-wrap {
          background-color: var(--tile);
          border: 1px solid var(--line);
          color: var(--icon-muted);
          transition:
            background-color 0.22s ease,
            border-color     0.22s ease,
            color            0.22s ease;
        }
        .contact-icon {
          color: var(--icon-muted);
          transition: color 0.22s ease;
        }
        .contact-card:hover .contact-icon-wrap,
        .contact-card:focus-visible .contact-icon-wrap {
          border-color: rgba(217, 112, 15, 0.35);
        }
        .contact-card:hover .contact-icon,
        .contact-card:focus-visible .contact-icon {
          color: var(--burnt) !important;
        }
        .contact-label {
          color: var(--muted);
          transition: color 0.22s ease;
        }
        .contact-value {
          color: var(--ink);
          transition: color 0.22s ease;
        }
        .contact-cta {
          color: var(--amber-text);
          transition: color 0.22s ease;
        }
        .contact-card:hover .contact-cta,
        .contact-card:focus-visible .contact-cta {
          color: var(--burnt);
        }
      `}</style>
    </section>
  );
}
