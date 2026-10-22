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
      className={`group overflow-hidden rounded-xl border transition-all duration-300 flex flex-col h-full shadow-sm hover:shadow-md ${
        project.featured
          ? 'border-[rgba(217,112,15,0.35)] hover:border-[rgba(217,112,15,0.6)] ring-1 ring-[rgba(217,112,15,0.15)]'
          : 'border-[var(--line)] hover:border-[rgba(217,112,15,0.3)]'
      }`}
      style={{
        backgroundColor: 'var(--card-warm)',
        boxShadow: '0 8px 30px -4px rgba(42, 26, 16, 0.09), 0 2px 6px -1px rgba(42, 26, 16, 0.04)',
      }}
    >
      {/* ── Chrome Header ─────────────────────────────────────────────── */}
      <div
        className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 border-b"
        style={{
          backgroundColor: 'var(--tile)',
          borderColor: 'var(--line)',
        }}
      >
        {/* Traffic lights — decorative browser chrome, kept as-is */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-400 shadow-2xs" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-400 shadow-2xs" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400 shadow-2xs" />
        </div>

        <span
          className="ml-2 sm:ml-3 font-mono text-[11px] sm:text-[12px] px-1.5 sm:px-2 py-0.5 rounded border truncate max-w-[130px] sm:max-w-[220px] lg:max-w-none"
          style={{
            color: 'var(--muted)',
            backgroundColor: 'var(--card-warm)',
            borderColor: 'var(--line)',
          }}
        >
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
            className="rounded-full px-2.5 sm:px-3 py-1 font-sans font-medium text-[12px] sm:text-[13px] text-[var(--body)] hover:text-[var(--burnt)] hover:bg-[var(--tile)] gap-1 sm:gap-1.5 transition-colors duration-150 h-7 sm:h-8"
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
            className="rounded-full w-7 h-7 hover:bg-[var(--tile)] hover:text-[var(--ink)] transition-all duration-150 text-[var(--muted)]"
          >
            <Link href={project.sourceCodeUrl} target="_blank" aria-label="Source code">
              <Github className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────────────────────── */}
      <CardContent className="p-0">
        {/* Screenshot Banner */}
        <div
          className="relative w-full overflow-hidden h-[125px] sm:h-[155px] lg:h-[250px] xl:h-[275px] 2xl:h-[295px] border-b"
          style={{ backgroundColor: 'var(--tile)', borderColor: 'var(--line)' }}
        >
          {projectImage && !imageError ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={project.title}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-101"
                onError={() => setImageError(true)}
              />
              <div
                className="absolute inset-0 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none"
                style={{ backgroundColor: 'rgba(42,26,16,0.04)' }}
              />
            </>
          ) : (
            <div
              className="w-full h-full flex items-center justify-center p-4 text-center"
              style={{ backgroundColor: 'var(--tile)' }}
            >
              <div className="font-sans font-semibold text-xs sm:text-sm" style={{ color: 'var(--body)' }}>
                {project.title} Preview
              </div>
            </div>
          )}
        </div>

        {/* Info Grid */}
        <div className="p-3.5 sm:p-5 lg:py-3.5 lg:px-5 xl:py-4 xl:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-5 lg:gap-5 xl:gap-6 items-start">

            {/* Left: Project Story & Problem/Approach/Result */}
            <div className="lg:col-span-8 space-y-2 sm:space-y-3.5 lg:space-y-2.5">
              {/* Title & Description */}
              <div className="space-y-0.5 sm:space-y-1">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: project.accentColor }}
                  />
                  <h3 className="font-sans font-semibold text-[18px] sm:text-[22px] lg:text-[21px] xl:text-[23px] leading-tight tracking-tight" style={{ color: 'var(--ink)' }}>
                    {project.title}
                  </h3>
                </div>
                <p className="font-sans font-normal text-[13px] sm:text-[14.5px] lg:text-[13.5px] xl:text-[14.5px] leading-relaxed" style={{ color: 'var(--body)' }}>
                  {project.description}
                </p>
              </div>

              {/* Problem → Approach → Result */}
              <div
                className="space-y-2 sm:space-y-2.5 lg:space-y-1.5 p-3 sm:p-3.5 lg:py-2.5 lg:px-3.5 rounded-xl border par-block"
                style={{
                  backgroundColor: 'var(--tile)',
                  borderColor: 'var(--line)',
                }}
              >
                {/* Problem */}
                <div className="flex gap-2.5 items-start par-row group/par">
                  <div
                    className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs par-icon-tile"
                    style={{ backgroundColor: 'var(--tile)', border: '1px solid var(--line)' }}
                  >
                    <Lightbulb
                      className="w-3 h-3 par-icon"
                      style={{ color: 'var(--icon-muted)', strokeWidth: 1.7 }}
                    />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <span className="t-label block text-[11px] sm:text-[12px] text-[var(--amber-text)]">Problem</span>
                    <p className="font-sans font-normal text-[13.5px] sm:text-[14px] lg:text-[13px] xl:text-[13.5px] leading-[1.45] sm:leading-[1.5]" style={{ color: 'var(--body)' }}>{project.problem}</p>
                  </div>
                </div>

                {/* Approach */}
                <div className="flex gap-2.5 items-start par-row group/par">
                  <div
                    className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs par-icon-tile"
                    style={{ backgroundColor: 'var(--tile)', border: '1px solid var(--line)' }}
                  >
                    <Wrench
                      className="w-3 h-3 par-icon"
                      style={{ color: 'var(--icon-muted)', strokeWidth: 1.7 }}
                    />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <span className="t-label block text-[11px] sm:text-[12px] text-[var(--amber-text)]">Approach</span>
                    <p className="font-sans font-normal text-[13.5px] sm:text-[14px] lg:text-[13px] xl:text-[13.5px] leading-[1.45] sm:leading-[1.5]" style={{ color: 'var(--body)' }}>{project.approach}</p>
                  </div>
                </div>

                {/* Result */}
                <div className="flex gap-2.5 items-start par-row group/par">
                  <div
                    className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs par-icon-tile"
                    style={{ backgroundColor: 'var(--tile)', border: '1px solid var(--line)' }}
                  >
                    <Trophy
                      className="w-3 h-3 par-icon"
                      style={{ color: 'var(--icon-muted)', strokeWidth: 1.7 }}
                    />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <span className="t-label block text-[11px] sm:text-[12px] text-[var(--amber-text)]">Result</span>
                    <p className="font-sans font-normal text-[13.5px] sm:text-[14px] lg:text-[13px] xl:text-[13.5px] leading-[1.45] sm:leading-[1.5]" style={{ color: 'var(--body)' }}>{project.result}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Highlights & Tech Stack */}
            <div
              className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-4 lg:space-y-3 xl:space-y-3.5 lg:gap-0 lg:pl-4 lg:border-l"
              style={{ borderColor: 'var(--line)' }}
            >
              {/* Highlights */}
              <div className="space-y-1.5">
                <span className="t-label block text-[11px] sm:text-[12px] text-[var(--amber-text)]">
                  Key Highlights
                </span>
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {project.highlights.map((h) => (
                    <span
                      key={h}
                      className="font-sans font-medium text-[11.5px] sm:text-[12.5px] lg:text-[11.5px] xl:text-[12px] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border"
                      style={{
                        backgroundColor: 'var(--tile)',
                        borderColor: 'var(--line)',
                        color: 'var(--ink)',
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="space-y-1.5 lg:pt-0.5">
                <span className="t-label block text-[11px] sm:text-[12px] text-[var(--amber-text)]">
                  Technologies
                </span>
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {project.techStack.map((tech) => {
                    const Icon = getIconForTechnology(tech);
                    return (
                      <div
                        key={tech}
                        className="tech-chip flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-0.5 xl:py-1 rounded-md border font-sans font-medium text-[11.5px] sm:text-[12.5px] lg:text-[11px] xl:text-[12px] shadow-2xs"
                        style={{
                          backgroundColor: 'var(--card-warm)',
                          borderColor: 'var(--line)',
                          color: 'var(--ink)',
                        }}
                      >
                        {Icon && (
                          <Icon
                            className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0 tech-icon"
                            style={{ display: 'block' }}
                          />
                        )}
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

      {/* ── Scoped styles ─────────────────────────────────────────────── */}
      <style>{`
        /* P/A/R icon hover: muted → burnt */
        .par-row:hover .par-icon {
          color: var(--burnt) !important;
        }
        .par-row:hover .par-icon-tile {
          background-color: rgba(217, 112, 15, 0.10) !important;
          border-color: rgba(217, 112, 15, 0.30) !important;
        }

        /* Tech chip icon: greyscale at rest → brand color on chip hover */
        .tech-chip .tech-icon {
          filter: grayscale(1) opacity(0.55);
          transition: filter 0.18s ease;
        }
        .tech-chip:hover .tech-icon {
          filter: none;
        }
        .tech-chip {
          transition: border-color 0.18s ease, background-color 0.18s ease;
        }
        .tech-chip:hover {
          border-color: rgba(217, 112, 15, 0.35) !important;
          background-color: var(--tile) !important;
        }
      `}</style>
    </Card>
  );
}
