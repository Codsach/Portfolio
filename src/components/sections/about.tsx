import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ScrollReveal } from '../scroll-reveal';
import { Card } from '../ui/card';

const aboutImage = PlaceHolderImages.find((img) => img.id === 'about-profile');

export default function AboutSection({ id }: { id: string }) {
  return (
    <section id={id} className="py-20 md:py-32 bg-background">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="relative flex justify-center">
              {aboutImage && (
                <Card className="overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src={aboutImage.imageUrl}
                    alt={aboutImage.description}
                    width={400}
                    height={400}
                    className="object-cover"
                    data-ai-hint={aboutImage.imageHint}
                  />
                </Card>
              )}
            </div>
            <div className="space-y-6 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">
                About Me
              </h2>
              <p className="text-lg text-muted-foreground">
                I'm a full-stack developer with a passion for creating beautiful
                and intuitive web applications. With a background in both design
                and development, I bridge the gap between aesthetics and
                functionality.
              </p>
              <p className="text-lg text-muted-foreground">
                My goal is to build products that not only look good but also
                provide a seamless user experience. When I'm not coding, you can
                find me exploring new technologies or contributing to open-source
                projects.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
