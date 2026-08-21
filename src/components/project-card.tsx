'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Project } from '@/lib/data';
import { ArrowUpRight, Github, Lightbulb, Wrench, Trophy } from 'lucide-react';
import { useState } from 'react';
import { getIconForTechnology } from '@/components/brand-icons';

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const [imageError, setImageError] = useState(false);
  const projectImage = PlaceHolderImages.find(
    (img) => img.id === project.imageId
  );

  const imageUrl = projectImage ? `${projectImage.imageUrl}?v=1` : '';
  
  // Layout variation: even cards = image left, odd cards = image right
  const isImageRight = index % 2 === 1;

  // Extract clean domain from liveDemoUrl
  const displayDomain = (() => {
    try {
      return new URL(project.liveDemoUrl).hostname;
    } catch {
      return project.liveDemoUrl.replace(/^https?:\/\//, '');
    }
  })();

  return (
    <Card
      className="group overflow-hidden rounded-xl border border-zinc-200 hover:border-zinc-300 transition-all duration-300 flex flex-col h-full bg-white shadow-sm hover:shadow-md"
    >
      {/* Chrome Header */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-zinc-100 bg-zinc-50/70">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-400 shadow-2xs" />
          <div className="w-3 h-3 rounded-full bg-amber-400 shadow-2xs" />
          <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-2xs" />
        </div>
        
        <span className="ml-3 text-xs font-mono font-medium text-zinc-500 bg-white px-2 py-0.5 rounded border border-zinc-200/60 truncate max-w-[200px] sm:max-w-none">
          {displayDomain}
        </span>

        <div className="ml-auto flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="rounded-full px-3 py-1 text-zinc-700 hover:text-amber-600 hover:bg-zinc-100 gap-1.5 font-semibold text-xs transition-colors duration-150 h-auto"
          >
            <Link href={project.liveDemoUrl} target="_blank">
              <span>Live Site</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="rounded-full w-7 h-7 hover:bg-zinc-100 hover:text-zinc-950 transition-all duration-150 text-zinc-500"
          >
            <Link href={project.sourceCodeUrl} target="_blank" aria-label="Source code">
              <Github className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content Area: Top Full-Width Image + 65/35 Story Layout */}
      <CardContent className="p-0">
        {/* Full-Width Panoramic Screenshot - Sized so entire card fits on screen */}
        <div className="relative w-full overflow-hidden aspect-[16/9] sm:aspect-[2.4/1] lg:aspect-[2.8/1] max-h-[220px] sm:max-h-[250px] bg-zinc-100 border-b border-zinc-100">
          {projectImage && !imageError ? (
            <>
              <img
                src={imageUrl}
                alt={project.title}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-101"
                onError={() => setImageError(true)}
              />
              <div className="absolute inset-0 bg-zinc-900/5 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
            </>
          ) : (
            <div className="w-full h-full min-h-[180px] flex items-center justify-center bg-zinc-100 p-6 text-center">
              <div className="text-zinc-700 font-semibold text-sm">
                {project.title} Preview
              </div>
            </div>
          )}
        </div>

        {/* Lower Info Grid: 65% Story / 35% Highlights & Tech Stack */}
        <div className="p-5 sm:p-6 lg:p-7">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-start">
            
            {/* Left Column (65% / lg:col-span-8): Project Story & Problem/Approach/Result */}
            <div className="lg:col-span-8 space-y-4">
              {/* Title & Description */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: project.accentColor }}
                  />
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 font-jakarta">
                    {project.title}
                  </h3>
                </div>
                <p className="text-sm text-zinc-600 leading-relaxed font-normal">
                  {project.description}
                </p>
              </div>

              {/* Problem → Approach → Result with colorful distinct iconography */}
              <div className="space-y-2 bg-zinc-50/90 p-3 sm:p-3.5 rounded-xl border border-zinc-200/70">
                <div className="flex gap-2.5 items-start">
                  <div className="w-5.5 h-5.5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 bg-amber-100 text-amber-700 shadow-2xs">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-700" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block mb-0.5">Problem</span>
                    <p className="text-xs sm:text-sm text-zinc-700 leading-normal">{project.problem}</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <div className="w-5.5 h-5.5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 bg-cyan-100 text-cyan-700 shadow-2xs">
                    <Wrench className="w-3.5 h-3.5 text-cyan-700" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-800 block mb-0.5">Approach</span>
                    <p className="text-xs sm:text-sm text-zinc-700 leading-normal">{project.approach}</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <div className="w-5.5 h-5.5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 bg-emerald-100 text-emerald-700 shadow-2xs">
                    <Trophy className="w-3.5 h-3.5 text-emerald-700" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-0.5">Result</span>
                    <p className="text-xs sm:text-sm text-zinc-700 leading-normal">{project.result}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (35% / lg:col-span-4): Highlights & Tech Stack */}
            <div className="lg:col-span-4 space-y-5 lg:pl-4 lg:border-l lg:border-zinc-200/70">
              {/* Highlights */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold font-jakarta uppercase tracking-wider text-zinc-500 block">
                  Key Highlights
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-xs font-medium px-2.5 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-700"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-bold font-jakarta uppercase tracking-wider text-zinc-500 block">
                  Technologies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => {
                    const Icon = getIconForTechnology(tech);
                    return (
                      <div
                        key={tech}
                        className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-md border border-zinc-200 text-zinc-800 text-xs font-medium shadow-2xs"
                      >
                        {Icon && <Icon className="h-3.5 w-3.5 flex-shrink-0" />}
                        <span>{tech}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>
      </CardContent>
    </Card>
  );
}
