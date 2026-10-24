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
      className="relative overflow-hidden py-24 md:py-32 bg-[var(--brown)] text-[var(--paper)]"
    >
      {/* 1px hairline separator at the top */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-[rgba(247,241,234,0.12)]" />

      <div className="container mx-auto relative z-10 w-full">
        <div className="flex flex-col items-center text-center">

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[rgba(247,241,234,0.08)] border border-[rgba(247,241,234,0.16)] mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-sans font-medium text-[12px] uppercase tracking-[0.12em] text-[var(--paper)]">
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
              className="t-section text-center text-[var(--paper)]"
              style={{ color: 'var(--paper)' }}
            >
              LET&apos;S BUILD SOMETHING<span className="text-[var(--burnt)]">.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="t-lead max-w-xl mx-auto text-center mb-12 text-balance"
            style={{ color: 'rgba(247, 241, 234, 0.75)' }}
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
          background-color: rgba(247, 241, 234, 0.05);
          border: 1px solid rgba(247, 241, 234, 0.12);
          box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.35);
          transition:
            transform        0.22s ease,
            background-color 0.22s ease,
            border-color     0.22s ease,
            box-shadow       0.22s ease;
        }
        .contact-card:hover {
          background-color: rgba(247, 241, 234, 0.08);
          border-color: rgba(217, 112, 15, 0.6);
          box-shadow: 0 12px 32px -6px rgba(0, 0, 0, 0.5);
        }
        .contact-badge {
          background-color: rgba(217, 112, 15, 0.18);
          border: 1px solid rgba(217, 112, 15, 0.45);
          color: var(--paper);
          transition:
            background-color 0.22s ease,
            color            0.22s ease,
            border-color     0.22s ease;
        }
        .contact-card:hover .contact-badge,
        .contact-card:focus-visible .contact-badge {
          background-color: var(--burnt);
          border-color: var(--burnt);
          color: #fffaf4;
        }
        .contact-icon-wrap {
          background-color: rgba(247, 241, 234, 0.06);
          border: 1px solid rgba(247, 241, 234, 0.12);
          color: var(--paper);
          transition:
            background-color 0.22s ease,
            border-color     0.22s ease,
            color            0.22s ease;
        }
        .contact-icon {
          color: var(--paper);
          opacity: 0.85;
          transition: color 0.22s ease, opacity 0.22s ease;
        }
        .contact-card:hover .contact-icon-wrap,
        .contact-card:focus-visible .contact-icon-wrap {
          background-color: rgba(217, 112, 15, 0.15);
          border-color: rgba(217, 112, 15, 0.55);
        }
        .contact-card:hover .contact-icon,
        .contact-card:focus-visible .contact-icon {
          color: var(--burnt) !important;
          opacity: 1;
        }
        .contact-label {
          color: rgba(247, 241, 234, 0.65);
          transition: color 0.22s ease;
        }
        .contact-value {
          color: var(--paper);
          transition: color 0.22s ease;
        }
        .contact-cta {
          color: var(--burnt);
          transition: color 0.22s ease;
        }
        .contact-card:hover .contact-cta,
        .contact-card:focus-visible .contact-cta {
          color: #f7a858;
        }
      `}</style>
    </section>
  );
}
