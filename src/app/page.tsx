import { SectionStack } from '@/components/section-stack';
import AboutSection from '@/components/sections/about';
import ContactSection from '@/components/sections/contact';
import HeroSection from '@/components/sections/hero';
import ProjectsSection from '@/components/sections/projects';
import SkillsSection from '@/components/sections/skills';

export default function Home() {
  return (
    <div className="relative">
      <SectionStack id="home" index={0} total={5} scalesDown>
        <HeroSection id="home-content" />
      </SectionStack>

      <SectionStack id="about" index={1} total={5} scalesDown>
        <AboutSection id="about-content" />
      </SectionStack>

      {/* Projects section rendered directly without parent CSS transform to allow window sticky stacking */}
      <div id="projects" className="relative z-[3]">
        <ProjectsSection id="projects-content" />
      </div>

      <SectionStack id="skills" index={3} total={5} scalesDown>
        <SkillsSection id="skills-content" />
      </SectionStack>

      <SectionStack id="contact" index={4} total={5} scalesDown={false}>
        <ContactSection id="contact-content" />
      </SectionStack>
    </div>
  );
}
