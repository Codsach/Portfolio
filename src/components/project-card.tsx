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
import { ArrowUpRight } from 'lucide-react';

export function ProjectCard({ project }: { project: Project }) {
  const projectImage = PlaceHolderImages.find(
    (img) => img.id === project.imageId
  );

  return (
    <Card className="h-full flex flex-col group overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
      {projectImage && (
        <div className="overflow-hidden">
          <Image
            src={projectImage.imageUrl}
            alt={project.title}
            width={600}
            height={400}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={projectImage.imageHint}
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="font-headline">{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="gap-4">
        <Button asChild variant="outline">
          <Link href={project.liveDemoUrl} target="_blank">
            Live Demo <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href={project.sourceCodeUrl} target="_blank">
            Source Code
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
