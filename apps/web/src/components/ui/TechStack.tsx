import { BlackHoleBackground } from '../effects/BlackHoleBackground';
import { useTranslation } from 'react-i18next';

import { useState, useEffect } from 'react';
import { getTechStacks } from '../../services/techStackService';
import type { TechStackItem } from '../../types/techstack';

export const TechStack = () => {
  const { t } = useTranslation();
  const [techItems, setTechItems] = useState<TechStackItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTechs = async () => {
      try {
        const items = await getTechStacks();
        setTechItems(items);
      } catch (error) {
        console.error('Failed to fetch tech stack:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTechs();
  }, []);

  const buildTechGroups = (items: TechStackItem[]) => {
    const groups: TechStackItem[][] = [];
    let startIndex = 0;
    const rowSizes = [9, 7, 5, 3, 1];
    
    for (let i = 0; i < rowSizes.length; i++) {
      const size = rowSizes[i];
      if (startIndex >= items.length) break;
      groups.push(items.slice(startIndex, startIndex + size));
      startIndex += size;
    }
    
    while (startIndex < items.length) {
      groups.push(items.slice(startIndex, startIndex + 9));
      startIndex += 9;
    }
    
    return groups;
  };

  const techGroups = buildTechGroups(techItems);

  return (
    <section 
      id="techstack" 
      className="relative w-full min-h-screen flex flex-col justify-center items-center py-20 px-4 overflow-hidden snap-center"
    >
      <BlackHoleBackground />

      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 drop-shadow-2xl">
            {t('tech.title') || 'Teknoloji Yığını'}
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            {t('tech.subtitle') || 'Kullandığım teknolojiler ve araçlar'}
          </p>
        </div>

        {/* Pyramid Layout Container */}
        {isLoading ? (
          <div className="text-gray-400 text-lg animate-pulse">{t('common.loading') || 'Yükleniyor...'}</div>
        ) : techItems.length === 0 ? (
          <div className="text-gray-500">{t('tech.empty') || 'Teknoloji yığını bulunamadı.'}</div>
        ) : (
          <div className="flex flex-col items-center gap-4 md:gap-6 w-full">
            {techGroups.map((group, rowIndex) => (
              <div 
                key={`row-${rowIndex}`} 
                className="flex flex-wrap justify-center gap-4 md:gap-6 w-full"
              >
                {group.map((tech) => (
                  <div 
                    key={tech.id || tech.name}
                    className={`
                      group relative flex flex-col items-center justify-center 
                      w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 
                      bg-white/10 backdrop-blur-md
                      border border-white/10 rounded-2xl md:rounded-[20px]
                      transition-all duration-300 ease-out
                      hover:-translate-y-2 hover:bg-white/20 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]
                      cursor-pointer
                    `}
                  >
                    {tech.iconName && (
                      <img 
                          src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech.iconName}`} 
                          alt={tech.name}
                          className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 opacity-80 group-hover:opacity-100 transition-opacity filter grayscale group-hover:grayscale-0"
                          onError={(e) => {
                             // Fallback empty or custom SVG if unpkg fails
                             e.currentTarget.style.display = 'none';
                             e.currentTarget.parentElement?.querySelector('.fallback-text')?.classList.remove('hidden');
                          }}
                      />
                    )}
                    
                    <span className={`fallback-text ${tech.iconName ? 'hidden' : ''} text-xs md:text-sm font-bold text-gray-400 group-hover:text-white transition-colors uppercase`}>
                      {tech.name.substring(0,2)}
                    </span>

                    <span className="text-[10px] md:text-xs font-medium text-gray-500 group-hover:text-gray-200 transition-colors mt-2 text-center px-1 leading-tight">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
