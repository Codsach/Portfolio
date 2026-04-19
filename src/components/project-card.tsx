'use client';

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

  // Use a static version to prevent hydration mismatch and constant re-renders
  const imageUrl = projectImage ? `${projectImage.imageUrl}?v=1` : '';

  return (
    <Card className="group overflow-hidden bg-white/[0.02] border-white/5 hover:border-white/20 transition-all duration-500 flex flex-col h-full hover:bg-white/[0.04] hover:-translate-y-2">
      <div className="relative overflow-hidden aspect-[16/10] bg-zinc-900">
        {projectImage && !imageError ? (
          <>
            <img
              src={imageUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
            <div className="text-zinc-700 font-medium text-sm tracking-widest uppercase opacity-50">
              No Image Preview
            </div>
          </div>
        )}
      </div>
      <CardHeader className="space-y-4 flex-grow">
        <div className="space-y-2">
          <CardTitle className="text-2xl font-bold text-white group-hover:text-zinc-300 transition-colors">
            {project.title}
          </CardTitle>
          <CardDescription className="text-zinc-400 leading-relaxed">
            {project.description}
          </CardDescription>
        </div>
        
        <div className="flex flex-wrap gap-2 pt-2">
          {project.techStack.map((tech) => (
            <span 
              key={tech} 
              className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 bg-white/5 px-2 py-1 rounded-full border border-white/10"
            >
              {tech}
            </span>
          ))}
        </div>
      </CardHeader>
      
      <CardFooter className="gap-4 pt-4 border-t border-white/5">
        <Button asChild variant="link" className="px-0 text-white hover:text-zinc-300 gap-2 overflow-hidden group/btn font-bold uppercase tracking-widest text-[10px]">
          <Link href={project.liveDemoUrl} target="_blank">
            Live Preview <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Link>
        </Button>
        <Button asChild variant="ghost" size="icon" className="ml-auto rounded-full w-10 h-10 hover:bg-white/10">
          <Link href={project.sourceCodeUrl} target="_blank">
            <Github className="h-5 w-5 text-zinc-400 hover:text-white transition-colors" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
