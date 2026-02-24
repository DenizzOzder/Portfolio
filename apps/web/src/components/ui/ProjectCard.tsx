import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProjectCardProps } from '../../types';


export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  techStack,
  projectUrl,
  status,
  role,
  actionLabel,
  id,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (id) {
      navigate(`/project/${id}`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`
        group relative flex flex-col 
        w-full h-[400px]
        transition-all duration-500 ease-out
        hover:-translate-y-2 
        ${id ? 'cursor-pointer' : ''}
      `}
    >
      {/* Main Card Content Wrapper - Moved styling here so badge can be outside without clipping */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden group-hover:bg-white/10 group-hover:border-purple-500/50 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-500 pointer-events-none"></div>

      {/* Main Layout containing content */}
      <div className="relative flex flex-col w-full h-full rounded-2xl overflow-hidden z-10">
        {/* Image Container with Hover Overlay - 75% height */}
        <div className="relative w-full h-[75%] overflow-hidden bg-black/50 shrink-0">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
          
          {/* Dark overlay that appears on hover to make description readable */}
          <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center p-6">
             {/* Description text sliding up */}
             <p className="text-gray-200 text-sm md:text-base text-center translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 line-clamp-6">
                {description}
             </p>
          </div>
        </div>

        {/* Content Container - 25% height */}
        <div className="flex flex-col items-center justify-center h-[25%] px-4 py-2 z-20 bg-gradient-to-t from-black/80 to-black/40">
          <h3 className="text-base md:text-lg font-bold text-white text-center truncate w-full">
            {title}
          </h3>
          
          {/* Role Indicator - Differentiated from the title */}
          {role && (
            <span className="text-[10px] md:text-xs font-medium text-purple-300 tracking-wide uppercase mt-0.5">
              {role}
            </span>
          )}

          {/* Tech Stack SVGs Row - Centered */}
          <div className="flex flex-wrap justify-center gap-2 mt-1.5">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="group/tech relative flex items-center justify-center"
              title={tech.name} // Native browser tooltip
            >
              <img
                src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech.iconName}`}
                alt={tech.name}
                className="w-6 h-6 opacity-60 group-hover/tech:opacity-100 transition-opacity filter grayscale group-hover/tech:grayscale-0"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement?.querySelector('.fallback-text')?.classList.remove('hidden');
                }}
              />
              <span className="fallback-text hidden text-xs font-bold text-gray-400 group-hover/tech:text-white transition-colors">
                {tech.name.substring(0, 2)}
              </span>
            </div>
          ))}
        </div>
        
        {/* Optional Action Button Container (Can be extended later) */}
        {(id || projectUrl) && (
            <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-30">
               {id ? (
                 <button 
                   onClick={(e) => { e.stopPropagation(); navigate(`/project/${id}`); }}
                   className="inline-flex items-center text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm border border-purple-500/30"
                 >
                   {actionLabel || 'Daha Fazla Bilgi \u2192'}
                 </button>
               ) : (
                 <a 
                   href={projectUrl} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm border border-purple-500/30"
                 >
                   {actionLabel || 'Projeyi İncele \u2192'}
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
          {status === 'completed' ? 'Tamamlandı' : 'Devam Ediyor'}
        </div>
      )}
    </div>
  );
};
