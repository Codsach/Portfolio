'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Project } from '@/lib/data';
import { ArrowUpRight, Github, Lightbulb, Wrench, Trophy } from 'lucide-react';
import { useState } from 'react';
import { getIconForTechnology } from '@/components/brand-icons';

export function ProjectCard({ project }: { project: Project; index?: number }) {
  const [imageError, setImageError] = useState(false);
  const projectImage = PlaceHolderImages.find(
    (img) => img.id === project.imageId
  );

  const imageUrl = projectImage ? `${projectImage.imageUrl}?v=1` : '';

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
      className={`group overflow-hidden rounded-xl border transition-all duration-300 flex flex-col h-full bg-white shadow-sm hover:shadow-md ${
        project.featured
          ? 'border-amber-300 hover:border-amber-400 ring-1 ring-amber-200/60'
          : 'border-zinc-200 hover:border-zinc-300'
      }`}
    >
      {/* Chrome Header */}
      <div className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 border-b border-zinc-100 bg-zinc-50/70">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-400 shadow-2xs" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-400 shadow-2xs" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400 shadow-2xs" />
        </div>
        
        <span className="ml-2 sm:ml-3 font-mono text-[11px] sm:text-[12px] text-[var(--muted)] bg-white px-1.5 sm:px-2 py-0.5 rounded border border-zinc-200/60 truncate max-w-[130px] sm:max-w-[220px] lg:max-w-none">
          {displayDomain}
        </span>

        {project.featured && (
          <span className="ml-1.5 sm:ml-2 inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 font-sans font-semibold text-[10px] sm:text-[11px] uppercase tracking-wider text-[var(--amber-text)]">
            <Trophy className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <span className="hidden sm:inline">Flagship</span>
            <span className="sm:hidden">Top</span>
          </span>
        )}

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="rounded-full px-2.5 sm:px-3 py-1 font-sans font-medium text-[12px] sm:text-[13px] text-[var(--body)] hover:text-[var(--amber)] hover:bg-zinc-100 gap-1 sm:gap-1.5 transition-colors duration-150 h-7 sm:h-8"
          >
            <Link href={project.liveDemoUrl} target="_blank">
              <span>Live Site</span>
              <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
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

      {/* Main Content Area: Compact Screenshot + Story & Highlights Layout */}
      <CardContent className="p-0">
        {/* Screenshot Banner - Sized comfortably to fit viewport on both mobile and desktop */}
        <div className="relative w-full overflow-hidden h-[125px] sm:h-[155px] lg:h-[175px] bg-zinc-100 border-b border-zinc-100">
          {projectImage && !imageError ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={project.title}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-101"
                onError={() => setImageError(true)}
              />
              <div className="absolute inset-0 bg-zinc-900/5 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-100 p-4 text-center">
              <div className="text-[var(--body)] font-sans font-semibold text-xs sm:text-sm">
                {project.title} Preview
              </div>
            </div>
          )}
        </div>

        {/* Info Grid: Responsive 2-column or side-by-side */}
        <div className="p-3.5 sm:p-5 lg:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-5 lg:gap-6 items-start">
            
            {/* Left Column (lg:col-span-8): Project Story & Problem/Approach/Result */}
            <div className="lg:col-span-8 space-y-2.5 sm:space-y-3.5">
              {/* Title & Description */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: project.accentColor }}
                  />
                  <h3 className="font-sans font-semibold text-[18px] sm:text-[22px] lg:text-[24px] leading-tight text-[var(--ink)] tracking-tight">
                    {project.title}
                  </h3>
                </div>
                <p className="font-sans font-normal text-[13px] sm:text-[14.5px] lg:text-[15px] text-[var(--body)] leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Problem → Approach → Result */}
              <div className="space-y-2 sm:space-y-2.5 bg-zinc-50/90 p-3 sm:p-3.5 rounded-xl border border-zinc-200/70">
                <div className="flex gap-2.5 items-start">
                  <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 bg-amber-100 text-amber-700 shadow-2xs">
                    <Lightbulb className="w-3 h-3 text-amber-700" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <span className="t-label block text-[11px] sm:text-[12px] text-[var(--amber-text)]">Problem</span>
                    <p className="font-sans font-normal text-[13.5px] sm:text-[14px] leading-[1.45] sm:leading-[1.5] text-[var(--body)]">{project.problem}</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 bg-cyan-100 text-cyan-700 shadow-2xs">
                    <Wrench className="w-3 h-3 text-cyan-700" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <span className="t-label block text-[11px] sm:text-[12px] text-[var(--amber-text)]">Approach</span>
                    <p className="font-sans font-normal text-[13.5px] sm:text-[14px] leading-[1.45] sm:leading-[1.5] text-[var(--body)]">{project.approach}</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 bg-emerald-100 text-emerald-700 shadow-2xs">
                    <Trophy className="w-3 h-3 text-emerald-700" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <span className="t-label block text-[11px] sm:text-[12px] text-[var(--amber-text)]">Result</span>
                    <p className="font-sans font-normal text-[13.5px] sm:text-[14px] leading-[1.45] sm:leading-[1.5] text-[var(--body)]">{project.result}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (lg:col-span-4): Highlights & Tech Stack */}
            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-4 lg:space-y-4 lg:gap-0 lg:pl-4 lg:border-l lg:border-zinc-200/70">
              {/* Highlights */}
              <div className="space-y-1.5">
                <span className="t-label block text-[11px] sm:text-[12px] text-[var(--amber-text)]">
                  Key Highlights
                </span>
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {project.highlights.map((h) => (
                    <span
                      key={h}
                      className="font-sans font-medium text-[11.5px] sm:text-[12.5px] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-zinc-100 border border-zinc-200 text-[var(--ink)]"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="space-y-1.5 lg:pt-1">
                <span className="t-label block text-[11px] sm:text-[12px] text-[var(--amber-text)]">
                  Technologies
                </span>
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {project.techStack.map((tech) => {
                    const Icon = getIconForTechnology(tech);
                    return (
                      <div
                        key={tech}
                        className="flex items-center gap-1 sm:gap-1.5 bg-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border border-zinc-200 text-[var(--ink)] font-sans font-medium text-[11.5px] sm:text-[12.5px] shadow-2xs"
                      >
                        {Icon && <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />}
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
