'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Project } from '@/lib/data';
import { ArrowUpRight, Github } from 'lucide-react';
import { useState } from 'react';

export function ProjectCard({ project }: { project: Project }) {
  const [imageError, setImageError] = useState(false);
  const projectImage = PlaceHolderImages.find(
    (img) => img.id === project.imageId
  );

  const imageUrl = projectImage ? `${projectImage.imageUrl}?v=1` : '';

  return (
    <Card className="group overflow-hidden glass border-white/[0.06] hover:border-emerald-400/20 transition-all duration-500 flex flex-col h-full shadow-card-float hover:shadow-card-float-hover hover:-translate-y-2">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/10] bg-zinc-900/80">
        {projectImage && !imageError ? (
          <>
            <img
              src={imageUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
            {/* Gradient overlay — feathers into card body */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-900/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800/80 to-zinc-900">
            <div className="text-zinc-600 font-medium text-xs tracking-widest uppercase">
              No Image Preview
            </div>
          </div>
        )}

        {/* Emerald glow accent on hover — top edge */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <CardHeader className="space-y-4 flex-grow">
        <div className="space-y-2">
          <CardTitle className="text-xl font-bold text-zinc-50 group-hover:text-white transition-colors leading-snug">
            {project.title}
          </CardTitle>
          <CardDescription className="text-zinc-400 leading-relaxed text-sm">
            {project.description}
          </CardDescription>
        </div>

        {/* Tech stack chips */}
        <div className="flex flex-wrap gap-2 pt-1">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 bg-white/[0.04] hover:bg-emerald-400/10 hover:text-emerald-300 hover:border-emerald-400/20 px-2.5 py-1 rounded-full border border-white/[0.07] transition-all duration-300 cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </CardHeader>

      <CardFooter className="gap-4 pt-4 border-t border-white/[0.06]">
        <Button
          asChild
          variant="link"
          className="px-0 text-zinc-400 hover:text-emerald-400 gap-2 group/btn font-bold uppercase tracking-widest text-[10px] transition-colors duration-300"
        >
          <Link href={project.liveDemoUrl} target="_blank">
            Live Preview{' '}
            <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="ml-auto rounded-full w-9 h-9 hover:bg-white/[0.08] hover:text-emerald-400 transition-all duration-300 border border-transparent hover:border-white/10"
        >
          <Link href={project.sourceCodeUrl} target="_blank">
            <Github className="h-4 w-4 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
