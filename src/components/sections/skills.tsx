'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { ScrollReveal } from '../scroll-reveal';
import { skills } from '@/lib/data';
import { getIconForTechnology } from '@/components/icons';
import { Sparkles } from 'lucide-react';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export default function SkillsSection({ id }: { id: string }) {
  return (
    <section id={id} className="relative py-24 md:py-40 bg-black overflow-hidden px-6">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-zinc-500/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <ScrollReveal className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 font-medium text-xs text-zinc-400 uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-zinc-400" />
            <span>Expertise</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Toolbox & <span className="text-zinc-500">Technologies.</span>
          </h2>
          <p className="text-xl text-zinc-400 leading-relaxed">
            I specialize in building robust full-stack applications using 
            modern frameworks and high-performance tools.
          </p>
        </ScrollReveal>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {skills.map((category) => (
            <motion.div key={category.title} variants={itemVariants}>
              <Card className="h-full bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-500">
                <CardContent className="p-8">
                  <div className="mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                      <category.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                    <div className="h-1 w-10 bg-zinc-400/40 rounded-full" />
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {category.technologies.map((tech) => {
                      const Icon = getIconForTechnology(tech);
                      return (
                        <div
                          key={tech}
                          className="flex items-center gap-2 bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 rounded-xl px-4 py-2 transition-all duration-300 group"
                        >
                          {Icon && <Icon className="h-5 w-5 text-zinc-400 group-hover:text-white transition-colors" />}
                          <span className="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">
                            {tech}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

