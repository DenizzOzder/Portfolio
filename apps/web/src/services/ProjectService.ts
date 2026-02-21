import type { ProjectCardProps } from '../types';

// Moved from featuredProjects.tsx
const MOCK_PROJECTS_DATA: ProjectCardProps[] = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with modern UI, secure payment integration, and a comprehensive admin dashboard for inventory management.',
    imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop',
    techStack: [
      { name: 'React', iconName: 'react/react-original.svg' },
      { name: 'Node.js', iconName: 'nodejs/nodejs-original.svg' },
      { name: 'MongoDB', iconName: 'mongodb/mongodb-original.svg' },
      { name: 'Tailwind', iconName: 'tailwindcss/tailwindcss-original.svg' }
    ],
    projectUrl: '#',
    status: 'completed',
    role: 'Full Stack Developer',
    date: '2023-08'
  },
  {
    title: 'AI Dashboard Analyzer',
    description: 'An AI-powered dashboard that analyzes user data and provides actionable insights utilizing machine learning models backend by Python.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    techStack: [
      { name: 'React', iconName: 'react/react-original.svg' },
      { name: 'TypeScript', iconName: 'typescript/typescript-original.svg' },
      { name: 'Firebase', iconName: 'firebase/firebase-plain.svg' },
      { name: 'Python', iconName: 'python/python-original.svg' }
    ],
    projectUrl: '#',
    status: 'completed',
    role: 'Frontend Lead',
    date: '2024-01'
  },
  {
    title: 'Real Estate App',
    description: 'Mobile-first real estate application for listing, searching, and booking property viewings with integrated map support.',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop',
    techStack: [
      { name: 'Next.js', iconName: 'nextjs/nextjs-original.svg' },
      { name: 'PostgreSQL', iconName: 'postgresql/postgresql-original.svg' },
      { name: 'Prisma', iconName: 'prisma/prisma-original.svg' }
    ],
    projectUrl: '#',
    status: 'completed',
    role: 'Backend Developer',
    date: '2023-11'
  },
  {
    title: 'Fintech Management',
    description: 'Secure financial management application allowing users to track expenses, set budgets, and monitor their financial health in real-time.',
    imageUrl: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1000&auto=format&fit=crop',
    techStack: [
      { name: 'C#', iconName: 'csharp/csharp-original.svg' },
      { name: 'SQL Server', iconName: 'microsoftsqlserver/microsoftsqlserver-plain.svg' },
      { name: 'Docker', iconName: 'docker/docker-original.svg' },
      { name: 'Redis', iconName: 'redis/redis-original.svg' }
    ],
    projectUrl: '#',
    status: 'in-progress',
    role: 'Software Architect',
    date: '2024-02'
  },
  {
     title: 'Social Network API',
     description: 'A highly scalable backend service for a social networking platform featuring real-time messaging, notifications, and feed generation.',
     imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop',
     techStack: [
       { name: 'Go', iconName: 'go/go-original.svg' },
       { name: 'Docker', iconName: 'docker/docker-original.svg' },
       { name: 'Redis', iconName: 'redis/redis-original.svg' },
       { name: 'GraphQL', iconName: 'graphql/graphql-plain.svg' }
     ],
     projectUrl: '#',
     status: 'in-progress',
     role: 'Backend Lead',
     date: '2023-05'
   },
   {
     title: 'Legacy CMS Migration',
     description: 'Migrating an outdated CMS to a modern headless architecture using Strapi and Next.js.',
     imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
     techStack: [
       { name: 'Next.js', iconName: 'nextjs/nextjs-original.svg' },
       { name: 'Node.js', iconName: 'nodejs/nodejs-original.svg' }
     ],
     projectUrl: '#',
     status: 'completed',
     role: 'Consultant',
     date: '2022-10'
   }
];

/**
 * Simulates fetching featured projects from a backend API.
 * This can easily be replaced with a real fetch call later.
 * 
 * @returns Promise resolving to an array of ProjectCardProps
 */
export const getFeaturedProjects = async (): Promise<ProjectCardProps[]> => {
  return new Promise((resolve) => {
    // Simulate network delay of 800ms
    setTimeout(() => {
      resolve(MOCK_PROJECTS_DATA);
    }, 800);
  });
};
