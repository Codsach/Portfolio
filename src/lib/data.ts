import { Code, Database, Wrench, LucideIcon } from 'lucide-react';

export type Project = {
  title: string;
  description: string;
  techStack: string[];
  liveDemoUrl: string;
  sourceCodeUrl: string;
  imageId: string;
};

export const projects: Project[] = [
  {
    title: 'Project Alpha',
    description: 'A modern e-commerce platform with a focus on user experience and performance.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe'],
    liveDemoUrl: '#',
    sourceCodeUrl: '#',
    imageId: 'project-1',
  },
  {
    title: 'Project Beta',
    description: 'A collaborative task management application for small teams.',
    techStack: ['React', 'Firebase', 'Shadcn/UI', 'Zustand'],
    liveDemoUrl: '#',
    sourceCodeUrl: '#',
    imageId: 'project-2',
  },
  {
    title: 'Project Gamma',
    description: 'A data visualization dashboard for tracking key business metrics.',
    techStack: ['SvelteKit', 'D3.js', 'PostgreSQL', 'Auth.js'],
    liveDemoUrl: '#',
    sourceCodeUrl: '#',
    imageId: 'project-3',
  },
];

export type SkillCategory = {
  title: string;
  icon: LucideIcon;
  technologies: string[];
};

export const skills: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: Code,
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript (ES6+)',
      'TypeScript',
      'React',
      'Next.js',
      'Tailwind CSS',
    ],
  },
  {
    title: 'Backend',
    icon: Database,
    technologies: ['Node.js', 'Express', 'Firebase', 'PostgreSQL', 'REST APIs', 'GraphQL'],
  },
  {
    title: 'Tools',
    icon: Wrench,
    technologies: ['Git & GitHub', 'Docker', 'Figma', 'VS Code', 'pnpm', 'Vercel'],
  },
];
