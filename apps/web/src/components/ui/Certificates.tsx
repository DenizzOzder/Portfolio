import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ProjectCard } from './ProjectCard';
import { getCertificates } from '../../services/certificateService';
import type { ProjectCardProps } from '../../types';

export const Certificates: React.FC = () => {
  const { t } = useTranslation();
  const [certificates, setCertificates] = useState<ProjectCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      setIsLoading(true);
      try {
        const data = await getCertificates();
        setCertificates(data);
      } catch (error) {
        console.error('Sertifikalar yüklenirken hata oluştu:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  // Auto-slide effect every 15 seconds
  useEffect(() => {
    if (showAll || isLoading || certificates.length === 0) return;

    const slideInterval = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        
        // Find the width of one card item to scroll accurately
        const firstChild = sliderRef.current.children[0] as HTMLElement;
        const gap = 32; // gap-8 in tailwind is 2rem (32px)
        const cardWidth = firstChild ? firstChild.getBoundingClientRect().width + gap : 350; 

        // Check if we reached the end (with a small 10px buffer)
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          // Reached the end, scroll back to the very beginning
          sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll next
          sliderRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }
    }, 15000); 

    return () => clearInterval(slideInterval);
  }, [showAll, isLoading, certificates]);

  const ProjectSkeleton = () => (
    <div className="w-full h-[400px] bg-white/5 border border-white/5 rounded-2xl animate-pulse flex flex-col overflow-hidden shrink-0">
      <div className="w-full h-[75%] bg-white/10"></div>
      <div className="flex flex-col items-center justify-center h-[25%] p-4 bg-white/5">
        <div className="w-3/4 h-5 bg-white/20 rounded mb-2"></div>
        <div className="w-1/2 h-3 bg-white/10 rounded mb-3"></div>
        <div className="flex gap-2">
          {[1,2,3,4].map(i => <div key={i} className="w-5 h-5 bg-white/10 rounded-full"></div>)}
        </div>
      </div>
    </div>
  );

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const firstChild = sliderRef.current.children[0] as HTMLElement;
      const gap = 32; 
      const cardWidth = firstChild ? firstChild.getBoundingClientRect().width + gap : 350;
      sliderRef.current.scrollBy({ left: direction === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full pb-16 mt-20 md:mt-32 relative z-10">
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-5xl font-black mb-4 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-lg leading-tight">
          {t('certificates.title')}
        </h3>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto px-4">
          {t('certificates.description')}
        </p>
      </div>

      {!showAll ? (
        // Slider View Container
        <div className="relative w-full max-w-[1400px] mx-auto overflow-hidden">
            <div 
              ref={sliderRef}
              className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory py-8 px-12 md:px-24"
              // A custom class can be added to globals.css for no-scrollbar, or inline styles:
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* Injecting CSS to hide scrollbar for webkit browsers directly in layout makes it cleaner, but inline style works for modern ones */}
              <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>

              {isLoading ? (
                // Skeletons in slider
                [1, 2, 3, 4].map((i) => (
                  <div key={`skeleton-${i}`} className="snap-center shrink-0 w-full sm:w-[80%] md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] xl:w-[calc(25%-1.75rem)]">
                    <ProjectSkeleton />
                  </div>
                ))
              ) : (
                // Actual Certificates
                certificates.map((cert) => (
                  <div key={cert.title} className="snap-center shrink-0 w-full sm:w-[80%] md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] xl:w-[calc(25%-1.75rem)]">
                    <ProjectCard 
                      {...cert}
                    />
                  </div>
                ))
              )}
            </div>
            
            {/* Soft gradients for sides to hint scrollable area */}
            <div className="absolute left-0 top-0 bottom-0 w-4 md:w-16 bg-gradient-to-r from-[#050010] to-transparent pointer-events-none z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-4 md:w-16 bg-gradient-to-l from-[#050010] to-transparent pointer-events-none z-10"></div>

            {/* Navigation Arrows */}
            <button 
              onClick={() => scrollSlider('left')}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white shadow-lg hover:bg-pink-500 hover:border-pink-400 hover:scale-110 transition-all duration-300"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button 
              onClick={() => scrollSlider('right')}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white shadow-lg hover:bg-pink-500 hover:border-pink-400 hover:scale-110 transition-all duration-300"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
        </div>
      ) : (
        // Expanded Grid View
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
            <motion.div layout className="flex flex-wrap justify-center gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {isLoading ? (
                // Skeletons in flex wrap
                [1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={`skeleton-${i}`}
                    className="w-full sm:w-[calc(80%-1.5rem)] md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] xl:w-[calc(25%-1.5rem)] shrink-0"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProjectSkeleton />
                  </motion.div>
                ))
              ) : (
                // Actual Certificates in Flex Wrap
                certificates.map((cert) => (
                  <motion.div
                    key={cert.title}
                    layout
                    className="w-full sm:w-[calc(80%-1.5rem)] md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] xl:w-[calc(25%-1.5rem)] shrink-0"
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <ProjectCard 
                        {...cert}
                    />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}

      {/* Show More / Show Less Button */}
      <AnimatePresence>
        {certificates.length > 4 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mt-12 flex justify-center pb-8"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="group relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white transition-all duration-300 bg-white/5 border border-pink-500/30 rounded-full hover:bg-pink-600/20 hover:border-pink-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] overflow-hidden"
            >
              <span className="relative z-10">{showAll ? t('certificates.showLess') : t('certificates.showMore')}</span>
              <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-pink-500/10"></div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
