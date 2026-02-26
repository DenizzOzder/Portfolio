import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { ProjectCardProps } from '../../types';
import { TechBadge } from './TechBadge';

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  techStacks = [],
  projectUrl,
  status,
  role,
  actionLabel,
  id,
  title_en,
  description_en,
  role_en,
}) => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const isCompleted = status === 'completed';
  const targetUrl = id && isCompleted ? `/project/${id}` : undefined;

  const displayTitle = isEn && title_en ? title_en : title;
  const displayDescription = isEn && description_en ? description_en : description;
  const displayRole = isEn && role_en ? role_en : role;

  // Render the inner content of the card safely
  const CardContent = (
    <>
      {/* Main Card Content Wrapper - Moved styling here so badge can be outside without clipping */}
      <div className={`absolute inset-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 pointer-events-none 
        ${isCompleted ? 'group-hover:bg-white/10 group-hover:border-purple-500/50 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]' : ''}
      `}></div>

      {/* Main Layout containing content */}
      <div className="relative flex flex-col w-full h-full rounded-2xl overflow-hidden z-10">
        {/* Image Container with Hover Overlay - 75% height */}
        <div className="relative w-full h-[75%] overflow-hidden bg-black/50 shrink-0">
          <img
            src={imageUrl}
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-700 ease-in-out ${isCompleted ? 'group-hover:scale-110' : ''}`}
          />
          
          {/* Dark overlay that appears on hover to make description readable */}
          <div className={`absolute inset-0 bg-black/80 opacity-0 ${isCompleted ? 'group-hover:opacity-100' : ''} transition-opacity duration-500 z-10 flex items-center justify-center p-6`}>
             {/* Description text sliding up */}
             <p className={`text-gray-200 text-sm md:text-base text-center translate-y-8 opacity-0 ${isCompleted ? 'group-hover:translate-y-0 group-hover:opacity-100' : ''} transition-all duration-500 delay-100 line-clamp-6`}>
                {displayDescription}
             </p>
          </div>
        </div>

        {/* Content Container - 25% height */}
        <div className="flex flex-col items-center justify-center h-[25%] px-4 py-2 z-20 bg-gradient-to-t from-black/80 to-black/40">
          <h3 className="text-base md:text-lg font-bold text-white text-center truncate w-full">
            {displayTitle}
          </h3>
          
          {/* Role Indicator - Differentiated from the title */}
          {displayRole && (
            <span className="text-[10px] md:text-xs font-medium text-purple-300 tracking-wide uppercase mt-0.5">
              {displayRole}
            </span>
          )}

          {/* Tech Stack SVGs Row - Centered */}
          <div className="flex flex-wrap justify-center gap-2 mt-1.5">
          {techStacks.map((tech) => (
             <TechBadge key={tech} tech={tech} />
          ))}
        </div>
        
        {/* Optional Action Button Container (Can be extended later) */}
        {isCompleted && (id || projectUrl) && (
            <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-30">
               {id ? (
                 <span 
                   className="inline-flex items-center text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm border border-purple-500/30"
                 >
                   {actionLabel || (isEn ? 'More Info \u2192' : 'Daha Fazla Bilgi \u2192')}
                 </span>
               ) : (
                 <a 
                   href={projectUrl} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   onClick={(e) => e.stopPropagation()} // Prevent card click when clicking external link
                   className="inline-flex items-center text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm border border-purple-500/30"
                 >
                   {actionLabel || (isEn ? 'View Project \u2192' : 'Projeyi İncele \u2192')}
                 </a>
               )}
            </div>
        )}
      </div>
      </div>

      {/* Status Badge - Outside the inner wrapper to avoid clipping */}
      {status && (
        <div className={`absolute -top-3 -left-3 z-40 px-3 py-1 text-xs font-semibold rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-xl border ${
          status === 'completed' 
            ? 'bg-emerald-500/30 text-emerald-300 border-emerald-500/50' 
            : 'bg-amber-500/30 text-amber-300 border-amber-500/50'
        }`}>
          {status === 'completed' ? (isEn ? 'Completed' : 'Tamamlandı') : (isEn ? 'In Progress' : 'Devam Ediyor')}
        </div>
      )}
    </>
  );

  const cardClasses = `
    group relative flex flex-col 
    w-full h-[400px]
    transition-all duration-500 ease-out text-left
    ${isCompleted ? 'hover:-translate-y-2 cursor-pointer' : 'opacity-80 cursor-not-allowed grayscale-[0.2]'}
  `;

  // If a valid route target exists and project is completed, wrap in Link for native SPA routing
  if (targetUrl) {
    return (
      <Link to={targetUrl} className={cardClasses}>
        {CardContent}
      </Link>
    );
  }

  // Fallback to div for non-navigable cards
  return (
    <div className={cardClasses}>
      {CardContent}
    </div>
  );
};
