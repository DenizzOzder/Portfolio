import React from 'react';
import type { TechBadgeProps } from '@/types/ui';

// Maps common tech stack names to their DevIcon class or URL path
const TECH_ICON_MAP: Record<string, string> = {
  'HTML/CSS': 'html5/html5-original.svg',
  'HTML': 'html5/html5-original.svg',
  'CSS': 'css3/css3-original.svg',
  'JavaScript': 'javascript/javascript-original.svg',
  'JS': 'javascript/javascript-original.svg',
  'TypeScript': 'typescript/typescript-original.svg',
  'ReactJS': 'react/react-original.svg',
  'React': 'react/react-original.svg',
  'NodeJS': 'nodejs/nodejs-original.svg',
  'Node.js': 'nodejs/nodejs-original.svg',
  'MongoDB': 'mongodb/mongodb-original.svg',
  'Git': 'git/git-original.svg',
  'GitHub': 'github/github-original.svg',
  'C++': 'cplusplus/cplusplus-original.svg',
  'C#': 'csharp/csharp-original.svg',
  'PHP': 'php/php-original.svg',
  'SQL': 'mysql/mysql-original.svg', // generic fallback mapping
  'MySQL': 'mysql/mysql-original.svg',
  'Java': 'java/java-original.svg'
};


export const TechBadge: React.FC<TechBadgeProps> = ({ tech }) => {
  const iconPath = TECH_ICON_MAP[tech];

  // If we have an exact mapped icon, render a small icon + text badge
  if (iconPath) {
    return (
      <span className="flex items-center gap-2 px-3 py-1 text-xs md:text-sm font-semibold text-gray-300 bg-black/50 rounded-lg border border-white/5 transition-colors group-hover:border-purple-500/30 group-hover:text-white">
        <img 
          src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${iconPath}`} 
          alt={tech} 
          className="w-4 h-4 opacity-80"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        {tech}
      </span>
    );
  }

  // If no mapped icon (e.g. "Katmanlı Mimari"), render simple text badge
  return (
    <span className="px-3 py-1 text-xs md:text-sm font-semibold text-gray-300 bg-black/50 rounded-lg border border-white/5 transition-colors group-hover:border-pink-500/30 group-hover:text-white">
      {tech}
    </span>
  );
};
