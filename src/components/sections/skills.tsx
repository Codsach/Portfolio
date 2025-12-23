import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ScrollReveal } from '../scroll-reveal';
import { skills } from '@/lib/data';
import { getIconForTechnology } from '@/components/icons';

export default function SkillsSection({ id }: { id: string }) {
  return (
    <section id={id} className="py-20 md:py-32 bg-background">
      <div className="container mx-auto">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">
            My Skills
          </h2>
          <p className="text-lg text-muted-foreground mt-2">
            Technologies and tools I work with.
          </p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((category, index) => (
            <ScrollReveal key={category.title} delay={index * 100}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-3">
                    <category.icon className="h-7 w-7 text-accent" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    {category.technologies.map((tech) => {
                      const Icon = getIconForTechnology(tech);
                      return (
                        <div
                          key={tech}
                          className="flex items-center gap-2 bg-muted/50 border border-transparent hover:border-accent rounded-full px-3 py-1 transition-colors"
                        >
                          {Icon && <Icon className="h-5 w-5" />}
                          <span className="text-sm font-medium">{tech}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
