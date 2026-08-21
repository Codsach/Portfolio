import { Code, Database, Wrench, type LucideIcon } from 'lucide-react';

export type Project = {
  title: string;
  description: string;
  problem: string;
  approach: string;
  result: string;
  techStack: string[];
  highlights: string[];
  liveDemoUrl: string;
  sourceCodeUrl: string;
  imageId: string;
  accentColor: string;
};

export const projects: Project[] = [
  {
    title: 'ProofChain',
    description: 'Blockchain-verified digital evidence with AI tamper detection',
    problem:
      'Digital evidence can be easily tampered with — courts and investigations need proof that a file hasn\'t been altered since submission.',
    approach:
      'Full-stack platform anchoring evidence hashes on Polygon, storing files on IPFS via Pinata, with AI tamper detection through FastAPI + Gemini.',
    result:
      'End-to-end tamper-proof evidence chain: upload → AI analysis → IPFS storage → blockchain anchoring → verifiable certificate.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'Solidity', 'IPFS', 'FastAPI'],
    highlights: [
      'Polygon smart contract for immutable records',
      'AI-powered tamper detection via Gemini',
      'Pinata IPFS for decentralized storage',
    ],
    liveDemoUrl: 'https://proofchain-web.vercel.app',
    sourceCodeUrl: 'https://github.com/Codsach/proofchain',
    imageId: 'project-1',
    accentColor: '#C2410C',
  },
  {
    title: 'CodSach',
    description: 'Full-stack MCA resource hub with GitHub-backed storage & AI workflows',
    problem:
      'Academic materials were scattered across WhatsApp groups and random drives — no version control, search, or structure for MCA students.',
    approach:
      'Next.js App Router platform storing resources in a public GitHub repo. Admin dashboard, Firebase Genkit + Gemini AI workflows, live filtering, real-time notifications, and SEO optimization.',
    result:
      'Centralized academic hub organized by category with search, sorting, admin management, and Vercel Analytics — used by MCA students.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Shadcn UI', 'Firebase Genkit', 'GitHub API'],
    highlights: [
      'Git-backed resource storage with version control',
      'Firebase Genkit AI-powered backend flows',
      'Admin dashboard with full CRUD operations',
    ],
    liveDemoUrl: 'https://codsach.vercel.app',
    sourceCodeUrl: 'https://github.com/Codsach/codsach-student-hub',
    imageId: 'project-2',
    accentColor: '#0F766E',
  },
  {
    title: 'TaskManager',
    description: 'Full-stack task management app with ShadCN UI and MongoDB',
    problem:
      'Most student task management tools rely on local storage or basic Firebase — needed a production-quality solution with proper database persistence.',
    approach:
      'Built with Next.js App Router, ShadCN UI for accessible components, full TypeScript coverage, and MongoDB for persistent CRUD operations.',
    result:
      'Production-ready task manager showcasing full-stack Next.js patterns with database integration and polished component design.',
    techStack: ['Next.js', 'TypeScript', 'ShadCN UI', 'Tailwind CSS', 'MongoDB'],
    highlights: [
      'ShadCN UI component system',
      'MongoDB-backed task persistence',
      'TypeScript end-to-end type safety',
    ],
    liveDemoUrl: 'https://task-manager-livid-pi-19.vercel.app',
    sourceCodeUrl: 'https://github.com/Codsach/TaskManager-',
    imageId: 'project-3',
    accentColor: '#334155',
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
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Tailwind CSS',
      'Flutter',
    ],
  },
  {
    title: 'Backend',
    icon: Database,
    technologies: [
      'Node.js',
      'Express',
      'MongoDB',
      'PostgreSQL',
      'MySQL',
      'REST APIs',
    ],
  },
  {
    title: 'Tools',
    icon: Wrench,
    technologies: ['Git & GitHub', 'Docker', 'Google Colab', 'VS Code', 'Vercel'],
  },
];
