'use client';

import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Project } from '@/lib/data';
import { ArrowUpRight, Github, Lightbulb, Wrench, Trophy } from 'lucide-react';
import { useState } from 'react';
import { getIconForTechnology } from '@/components/brand-icons';
import { motion } from 'framer-motion';

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const [imageError, setImageError] = useState(false);
  const projectImage = PlaceHolderImages.find(
    (img) => img.id === project.imageId
  );

  const imageUrl = projectImage ? `${projectImage.imageUrl}?v=1` : '';
  const isReversed = index % 2 !== 0;

  return (
    <Card
      className="group overflow-hidden border-white/[0.08] hover:border-emerald-400/30 transition-all duration-500 flex flex-col h-full shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
      style={{ background: '#0A0F1E', backdropFilter: 'blur(20px)' }}
    >
      {/* Browser Chrome Header */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06]"
        style={{ background: 'rgba(10, 15, 30, 0.80)' }}
      >
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-amber-500/60" />
        <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
        <span className="ml-3 text-[10px] font-jakarta font-bold uppercase tracking-[0.2em] text-zinc-500">
          {project.title.toLowerCase()}.dev
        </span>
        <div className="ml-auto flex items-center gap-3">
          <Button
            asChild
            variant="link"
            className="px-0 text-zinc-500 hover:text-emerald-400 gap-1.5 font-bold uppercase tracking-widest text-[9px] transition-colors duration-300 h-auto py-0"
          >
            <Link href={project.liveDemoUrl} target="_blank">
              Live
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="rounded-full w-7 h-7 hover:bg-white/[0.08] hover:text-emerald-400 transition-all duration-300 border border-transparent hover:border-white/10"
          >
            <Link href={project.sourceCodeUrl} target="_blank">
              <Github className="h-3.5 w-3.5 text-zinc-500" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <CardContent className="p-0">
        <div className={`grid grid-cols-1 lg:grid-cols-2 ${isReversed ? 'lg:[direction:rtl]' : ''}`}>

          {/* Image Side */}
          <div className="relative overflow-hidden aspect-[16/10] lg:aspect-auto lg:min-h-[320px] bg-zinc-900/80 lg:[direction:ltr]">
            {projectImage && !imageError ? (
              <>
                <img
                  src={imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={() => setImageError(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy-900 via-navy-800/80 to-navy-900">
                <div className="text-zinc-600 font-medium text-xs tracking-widest uppercase">
                  {project.title}
                </div>
              </div>
            )}

            {/* Accent glow on image side */}
            <div
              className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity duration-500"
              style={{
                background: `linear-gradient(to top, ${project.accentColor}15, transparent)`,
              }}
            />
          </div>

          {/* Content Side */}
          <div className="p-6 lg:p-8 flex flex-col justify-between space-y-5 lg:[direction:ltr]">
            {/* Title & Description */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="text-xl lg:text-2xl font-bold text-zinc-50 font-jakarta leading-snug">
                  {project.title}
                </h3>
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: project.accentColor }}
                />
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Problem → Approach → Result */}
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `${project.accentColor}15`, border: `1px solid ${project.accentColor}25` }}
                >
                  <Lightbulb className="w-3.5 h-3.5" style={{ color: project.accentColor }} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500 mb-1">Problem</div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{project.problem}</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `${project.accentColor}15`, border: `1px solid ${project.accentColor}25` }}
                >
                  <Wrench className="w-3.5 h-3.5" style={{ color: project.accentColor }} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500 mb-1">Approach</div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{project.approach}</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `${project.accentColor}15`, border: `1px solid ${project.accentColor}25` }}
                >
                  <Trophy className="w-3.5 h-3.5" style={{ color: project.accentColor }} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500 mb-1">Result</div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{project.result}</p>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="flex flex-wrap gap-1.5">
              {project.highlights.map((h) => (
                <span
                  key={h}
                  className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border transition-colors duration-300"
                  style={{
                    color: project.accentColor,
                    borderColor: `${project.accentColor}30`,
                    background: `${project.accentColor}08`,
                  }}
                >
                  {h}
                </span>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.06]">
              {project.techStack.map((tech) => {
                const Icon = getIconForTechnology(tech);
                return (
                  <div
                    key={tech}
                    className="flex items-center gap-1.5 bg-white/[0.03] hover:bg-emerald-400/10 hover:border-emerald-400/20 px-2.5 py-1 rounded-full border border-white/[0.07] transition-all duration-300 cursor-default group/chip"
                  >
                    {Icon && <Icon className="h-3 w-3" />}
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover/chip:text-emerald-300 transition-colors duration-300">
                      {tech}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
