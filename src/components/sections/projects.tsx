import { ProjectCard } from '../project-card';
import { ScrollReveal } from '../scroll-reveal';
import { projects } from '@/lib/data';

export default function ProjectsSection({ id }: { id: string }) {
  return (
    <section id={id} className="py-20 md:py-32 bg-white dark:bg-card">
      <div className="container mx-auto">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">
            My Projects
          </h2>
          <p className="text-lg text-muted-foreground mt-2">
            A selection of my work.
          </p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 100}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
