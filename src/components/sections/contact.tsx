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
    brandBg: '#d97706',
    brandBorder: '#d97706',
    iconDefaultBg: 'bg-amber-50',
    iconDefaultText: 'text-amber-600',
    iconDefaultBorder: 'border border-amber-100',
  },
  {
    label: 'LinkedIn',
    value: 'Sachin R',
    href: 'https://www.linkedin.com/in/sachinr-dev/',
    icon: IconBrandLinkedin,
    featured: false,
    cta: 'Connect on LinkedIn',
    brandBg: '#0A66C2',
    brandBorder: '#0A66C2',
    iconDefaultBg: 'bg-blue-50',
    iconDefaultText: 'text-blue-600',
    iconDefaultBorder: 'border border-blue-100',
  },
  {
    label: 'GitHub',
    value: 'Codsach',
    href: 'https://github.com/Codsach',
    icon: IconBrandGithub,
    featured: false,
    cta: 'Explore Repositories',
    brandBg: '#181717',
    brandBorder: '#181717',
    iconDefaultBg: 'bg-zinc-100',
    iconDefaultText: 'text-zinc-900',
    iconDefaultBorder: 'border border-zinc-200',
  },
];

export default function ContactSection({ id }: { id: string }) {
  return (
    <section
      id={id}
      className="relative overflow-hidden px-6 py-24 md:py-32 bg-[#F8F9FA]"
    >
      <div className="absolute top-0 inset-x-0 separator-fade" />

      <div className="container mx-auto max-w-4xl relative z-10 w-full">
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
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-800 font-jakarta">
              Open To Opportunities — Full-Time &amp; Contracts
            </span>
          </motion.div>

          {/* Headline - Solid High-Craft Typography, NO duplicate gradient */}
          <div className="mb-5">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-950 font-jakarta tracking-tight leading-tight"
            >
              Ready to start your <br className="hidden sm:inline" />
              <span className="text-amber-600">next big project?</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-600 max-w-xl mx-auto leading-relaxed mb-12 font-normal"
          >
            I am available for engineering roles and select client builds.
            Feel free to email me directly or connect through LinkedIn.
          </motion.p>

          {/* Contact Cards */}
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
                className="contact-card group relative flex flex-col items-center p-6 sm:p-8 rounded-2xl cursor-pointer"
                style={
                  {
                    '--brand-bg': connector.brandBg,
                    '--brand-border': connector.brandBorder,
                  } as React.CSSProperties
                }
              >
                {connector.featured && (
                  <div className="contact-badge absolute top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    Primary Contact
                  </div>
                )}

                <div className="relative z-10 flex flex-col items-center w-full mt-2">
                  <div
                    className={`contact-icon-wrap w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-2xs ${connector.iconDefaultBg} ${connector.iconDefaultText} ${connector.iconDefaultBorder}`}
                  >
                    <connector.icon className="w-5 h-5" />
                  </div>

                  <p className="contact-label text-xs font-semibold uppercase tracking-wider mb-1 text-center font-jakarta text-zinc-500">
                    {connector.label}
                  </p>

                  <p className="contact-value text-sm sm:text-base font-bold mb-6 text-center break-all font-jakarta text-zinc-900">
                    {connector.value}
                  </p>

                  <div className="contact-cta inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mt-auto text-amber-600">
                    <span>{connector.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-150" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .contact-card {
          background-color: #ffffff;
          border: 1px solid #e4e4e7;
          box-shadow: 0 1px 3px 0 rgba(0,0,0,0.06);
          transition:
            background-color 0.22s ease,
            border-color     0.22s ease,
            box-shadow       0.22s ease;
        }
        .contact-card:hover {
          background-color: var(--brand-bg);
          border-color:     var(--brand-border);
          box-shadow: 0 10px 28px -6px rgba(0,0,0,0.22);
        }
        .contact-badge {
          background-color: rgba(0,0,0,0.08);
          color: #52525b;
          transition: background-color 0.22s ease, color 0.22s ease;
        }
        .contact-card:hover .contact-badge {
          background-color: rgba(255,255,255,0.18);
          color: rgba(255,255,255,0.88);
        }
        .contact-icon-wrap {
          transition:
            background-color 0.22s ease,
            border-color     0.22s ease,
            color            0.22s ease;
        }
        .contact-card:hover .contact-icon-wrap {
          background-color: rgba(255,255,255,0.20) !important;
          border-color:     transparent            !important;
          color:            #ffffff                !important;
        }
        .contact-label {
          transition: color 0.22s ease;
        }
        .contact-card:hover .contact-label {
          color: rgba(255,255,255,0.72);
        }
        .contact-value {
          transition: color 0.22s ease;
        }
        .contact-card:hover .contact-value {
          color: #ffffff;
        }
        .contact-cta {
          transition: color 0.22s ease;
        }
        .contact-card:hover .contact-cta {
          color: rgba(255,255,255,0.90);
        }
      `}</style>
    </section>
  );
}
