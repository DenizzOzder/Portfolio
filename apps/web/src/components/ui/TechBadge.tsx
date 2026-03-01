import React from 'react';
import type { TechBadgeProps } from '@/types/ui';

import { resolveIconName } from '@/utils/icons';
export const TechBadge: React.FC<TechBadgeProps> = ({ tech }) => {
  const iconPath = resolveIconName(tech);

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
