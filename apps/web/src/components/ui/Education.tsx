import { useEducationData } from '@/hooks/useEducation';
import { useGlobalLoaderSync } from '@/hooks/useGlobalLoaderSync';
import { Certificates } from './Certificates';
import Hyperspeed, { hyperspeedPresets } from '../effects/Hyperspeed';

export const Education = () => {
  const { data: educationData = [], isLoading } = useEducationData();
  useGlobalLoaderSync(isLoading, 'Eğitim Bilgileri Yükleniyor...');

  return (
    <section id="education" className="relative w-full py-24 md:py-32 overflow-hidden bg-[#050010] flex flex-col items-center justify-center z-10 text-white">
      
      {/* Dynamic Hyperspeed Background */}
      <div className="absolute inset-0 z-0 opacity-20 md:opacity-15 flex items-center justify-center pointer-events-none mix-blend-screen overflow-hidden">
        <Hyperspeed effectOptions={hyperspeedPresets.portfolio} />
      </div>

      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[80%] h-full bg-gradient-to-b from-purple-900/5 via-pink-900/5 to-transparent blur-[120px] pointer-events-none -z-10"></div>

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
        
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                  Eğitim
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                  {" "}Yolculuğum
              </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">Akademik geçmişim ve yazılım dünyasındaki gelişim haritam.</p>
        </div>

        {/* Roadmap Container */}
        <div className="relative w-full max-w-5xl mx-auto">          
          {/* The Winding Path Line */}
          <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-1 bg-transparent border-l-4 border-dashed border-purple-500/30 transform md:-translate-x-1/2 z-0"></div>

          <div className="flex flex-col gap-16 relative z-10">
            {educationData.map((edu, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={edu.id} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:justify-start' : 'md:justify-end'} w-full pl-20 md:pl-0 group`}>
                  
                  {/* Map Node / Pin */}
                  <div className={`absolute left-8 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-[#050010] border-4 border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.8)] z-20 flex items-center justify-center transition-transform duration-500 group-hover:scale-125 group-hover:bg-pink-500`}>
                    <div className="w-2 h-2 bg-white rounded-full group-hover:opacity-0 transition-opacity"></div>
                  </div>

                  {/* Connecting Horizontal Line (Desktop only) */}
                  <div className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 h-[2px] bg-gradient-to-r ${isEven ? 'from-transparent to-pink-500/50 right-1/2 w-12' : 'from-pink-500/50 to-transparent left-1/2 w-12'} z-0`}></div>

                  {/* Content Card with floating Status Badge if exists */}
                  <div className={`w-full md:w-[48%] relative ${isEven ? 'md:pr-8 lg:pr-12' : 'md:pl-8 lg:pl-12'}`}>
                    
                    {/* Floating Status Ribbon / Badge */}
                    {edu.status && (
                        <div className={`absolute -top-4 ${isEven ? 'right-6 md:right-12' : 'left-8 md:left-12'} z-30 inline-flex items-center justify-center h-8 px-4 text-xs font-black tracking-widest uppercase rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.5)] border ${edu.status.includes('Ara Verdim') ? 'text-amber-200 bg-gradient-to-r from-amber-600 to-amber-900 border-amber-500' : 'text-emerald-200 bg-gradient-to-r from-emerald-600 to-emerald-900 border-emerald-500'}`}>
                          {edu.status}
                        </div>
                    )}

                    <div className="relative p-6 md:p-8 rounded-[2rem] bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500 hover:border-purple-500/50 hover:bg-white/[0.05] hover:-translate-y-2 overflow-hidden mt-2">
                      
                      {/* Hover Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                      <div className="relative z-10">
                        {/* Top Header Row (Date & Grade Badges ONLY) */}
                        <div className="flex flex-row items-center justify-between gap-2 md:gap-3 mb-5 w-full">
                          
                          {/* Left Side: Date */}
                          <span className="inline-flex items-center justify-center h-8 px-3 md:px-4 text-xs md:text-sm font-bold tracking-wider text-purple-200 bg-purple-900/40 rounded-lg border border-purple-500/30 shadow-inner whitespace-nowrap shrink-0">
                            {edu.date}
                          </span>
                          
                          {/* Right Side: Grade */}
                          <div className="flex flex-row gap-2 shrink-0">
                            {edu.grade && (
                              <span className="inline-flex items-center justify-center h-8 px-2 md:px-3 text-[10px] md:text-xs font-black tracking-widest uppercase text-pink-300 bg-pink-900/20 border border-pink-500/30 rounded-lg whitespace-nowrap">
                                {edu.grade}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title (Degree) & Subtitle (Institution) */}
                        <h3 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight drop-shadow-md">
                          {edu.degree}
                        </h3>
                        <h4 className="text-lg md:text-xl font-semibold text-purple-300/80 mb-6 tracking-wide drop-shadow-sm">
                          {edu.institution}
                        </h4>

                        {/* Technologies / Skills */}
                        {edu.tech && edu.tech.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {edu.tech.map((t, idx) => (
                              <span 
                                key={idx} 
                                className="px-3 py-1 text-xs md:text-sm font-semibold text-gray-300 bg-black/50 rounded-lg border border-white/5 transition-colors group-hover:border-pink-500/30 group-hover:text-white"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sertifikalar Bölümü */}
      <Certificates />
    </section>
  );
};
