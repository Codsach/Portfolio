import AboutSection from '@/components/sections/about';
import ContactSection from '@/components/sections/contact';
import HeroSection from '@/components/sections/hero';
import ProjectsSection from '@/components/sections/projects';
import SkillsSection from '@/components/sections/skills';

export default function Home() {
  return (
    <>
      <HeroSection id="home" />
      <AboutSection id="about" />
      <ProjectsSection id="projects" />
      <SkillsSection id="skills" />
      <ContactSection id="contact" />
    </>
  );
}
