import { SectionStack } from '@/components/section-stack';
import AboutSection from '@/components/sections/about';
import ContactSection from '@/components/sections/contact';
import HeroSection from '@/components/sections/hero';
import ProjectsSection from '@/components/sections/projects';
import SkillsSection from '@/components/sections/skills';

/**
 * Home page — cinematic stacked sticky scroll architecture.
 *
 * Each SectionStack wraps a major section inside a sticky container.
 * As the user scrolls, each section scales down and dims while the next
 * one slides above it, creating a premium layered, cinematic transition.
 *
 * z-index increases with each section so later sections appear on top.
 */
export default function Home() {
  return (
    <div className="relative">
      <SectionStack id="home" index={0} total={5} scalesDown>
        <HeroSection id="home-content" />
      </SectionStack>

      <SectionStack id="about" index={1} total={5} scalesDown>
        <AboutSection id="about-content" />
      </SectionStack>

      <SectionStack id="projects" index={2} total={5} scalesDown>
        <ProjectsSection id="projects-content" />
      </SectionStack>

      <SectionStack id="skills" index={3} total={5} scalesDown>
        <SkillsSection id="skills-content" />
      </SectionStack>

      {/* Last section — no scale-down since nothing follows it */}
      <SectionStack id="contact" index={4} total={5} scalesDown={false}>
        <ContactSection id="contact-content" />
      </SectionStack>
    </div>
  );
}
