import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { useProjects } from '../../hooks/useProjects';
import { useGlobalLoaderSync } from '../../hooks/useGlobalLoaderSync';

import type { FilterType } from '@/types/ui';

export const FeaturedProjects: React.FC = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<FilterType>('all');
  const [showAll, setShowAll] = useState(false);
  const { data: projects = [], isLoading } = useProjects();
  useGlobalLoaderSync(isLoading, t('projects.loading'));

  const filteredAndSortedProjects = useMemo(() => {
    // 1. Filter
    let result = (projects || []) as any[];
    if (filter !== 'all') {
      result = result.filter(project => project.status === filter);
    }

    // 2. Sort
    return [...result].sort((a, b) => {
      // Prioritize in-progress
      if (a.status === 'in-progress' && b.status !== 'in-progress') return -1;
      if (b.status === 'in-progress' && a.status !== 'in-progress') return 1;

      // If status is the same, sort by date descending (newest first)
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });
  }, [projects, filter]);

  const displayedProjects = showAll ? filteredAndSortedProjects : filteredAndSortedProjects.slice(0, 4);

  return (
    <section 
      id="projects" 
      className="relative w-full min-h-screen py-20 px-4 xl:px-8 mt-20 z-10"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 drop-shadow-2xl">
            {t('projects.title')}
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            {t('projects.description')}
          </p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <button
              onClick={() => { setFilter('all'); setShowAll(false); }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === 'all' 
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]' 
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {t('projects.filterAll')}
            </button>
            <button
              onClick={() => { setFilter('in-progress'); setShowAll(false); }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === 'in-progress' 
                  ? 'bg-amber-600 text-white shadow-[0_0_15px_rgba(217,119,6,0.5)]' 
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {t('projects.filterInProgress')}
            </button>
            <button
              onClick={() => { setFilter('completed'); setShowAll(false); }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === 'completed' 
                  ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(5,150,105,0.5)]' 
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {t('projects.filterCompleted')}
            </button>
          </div>
        </div>

        {/* CSS Grid for 4 columns on xl screens */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {/* Render Projects inline, loading overlay handles the wait */}
            {displayedProjects.map((project) => (
                <motion.div
                  key={project.id || project.title} // Ensure unique and stable key for animations
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -30 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <ProjectCard 
                    id={project.id}
                    title={project.title}
                    description={project.description}
                    imageUrl={project.imageUrl}
                    techStacks={project.techStacks}
                    projectUrl={project.projectUrl}
                    status={project.status}
                    role={project.role}
                  />
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination / View More Button */}
        <AnimatePresence>
          {filteredAndSortedProjects.length > 4 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="mt-16 flex justify-center"
            >
              <button
                onClick={() => setShowAll(!showAll)}
                className="group relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white transition-all duration-300 bg-white/5 border border-purple-500/30 rounded-full hover:bg-purple-600/20 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] overflow-hidden"
              >
                <span className="relative z-10">{showAll ? t('projects.showLess') : t('projects.showMore')}</span>
                <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-purple-500/10"></div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FeaturedProjects;
