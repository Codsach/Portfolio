import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ScrollReveal } from '../scroll-reveal';
import { skills } from '@/lib/data';

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
                  <div className="flex flex-wrap gap-2">
                    {category.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-sm">
                        {tech}
                      </Badge>
                    ))}
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
