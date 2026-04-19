import { Code, Database, Wrench, type LucideIcon } from 'lucide-react';

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
    title: 'ProofChain — Blockchain-Based Digital Evidence Verification with AI Tamper Detection',
    description:
      'Secure digital evidence verification platform using blockchain anchoring and AI tamper detection. Leverages Polygon and IPFS for immutable record-keeping and audit-ready traceability.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'IPFS', 'FastAPI'],
    liveDemoUrl: 'https://proofchain.vercel.app',
    sourceCodeUrl: 'https://github.com/Codsach/proofchain',
    imageId: 'project-1',
  },
  {
    title: 'CodSach — Student Resource Platform',
    description: 'A GitHub-powered student resource hub for academic collaboration. Simplifies sharing and managing learning materials through a responsive interface and version-controlled backend.',
    techStack: ['Next.js', 'Tailwind CSS', 'Typescript','GitHub API'],
    liveDemoUrl: 'https://codsach.vercel.app',
    sourceCodeUrl: 'https://github.com/Codsach/codsach-student-hub',
    imageId: 'project-2',
  },
  {
    title: 'Wavelet-Based Image Processing using Machine Learning',
    description:
      'Real-time image processing platform utilizing wavelet packet decomposition and machine learning. Features interactive visualizations for advanced signal processing concepts.',
    techStack: ['Python', 'Machine Learning', 'Wavelet Transform','Image Processing','Web Interface(Scikit Learn,OpenCV,TensorflowLite)'],
    liveDemoUrl: 'https://wavelets2d.streamlit.app/',
    sourceCodeUrl: 'https://github.com/Codsach/wavelets',
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
      'MangoDB',
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
