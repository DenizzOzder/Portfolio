import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { useGlobalLoaderSync } from '@/hooks/useGlobalLoaderSync';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: projects = [], isLoading } = useProjects();
  useGlobalLoaderSync(isLoading, 'Proje Detayları Yükleniyor...');

  // Compute derived state using cached data
  const { project, completedProjects } = useMemo(() => {
    const completedList = projects.filter(p => p.status === 'completed');
    const found = completedList.find(p => p.id === id) || null;
    return { project: found, completedProjects: completedList };
  }, [projects, id]);

  // Scroll to top when ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentImageIndex(0);
  }, [id]);

  // Compute Prev and Next Projects
  const { prevProject, nextProject } = useMemo(() => {
    if (!project || completedProjects.length === 0) return { prevProject: null, nextProject: null };
    
    const currentIndex = completedProjects.findIndex(p => p.id === project.id);
    if (currentIndex === -1) return { prevProject: null, nextProject: null };

    const prev = currentIndex > 0 ? completedProjects[currentIndex - 1] : null;
    const next = currentIndex < completedProjects.length - 1 ? completedProjects[currentIndex + 1] : null;
    
    return { prevProject: prev, nextProject: next };
  }, [project, completedProjects]);


  // Image Slider Controllers
  const nextImage = () => {
    if (!project?.images?.length) return;
    setCurrentImageIndex((prev) => (prev + 1) % project.images!.length);
  };

  const prevImage = () => {
    if (!project?.images?.length) return;
    setCurrentImageIndex((prev) => (prev - 1 + project.images!.length) % project.images!.length);
  };

  if (!project) {
    return (
      <div className="w-full min-h-screen bg-[#050010] flex flex-col items-center justify-center text-white gap-4">
        <h1 className="text-4xl font-bold">Proje Bulunamadı</h1>
        <button onClick={() => navigate('/projects')} className="text-purple-400 hover:text-purple-300 underline">Aramaya dön</button>
      </div>
    );
  }

  // To display HTML content (like markdown converted to HTML from backend) safely or raw string
  // For this mock, we assume 'content' might contain simple markdown formatting.
  // We'll write a simple regex to bolden subtitles if they start with ## or ###
  const renderContent = (text?: string) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
      if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold text-white mt-6 mb-2">{line.replace('### ', '')}</h3>;
      if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-purple-400 mt-8 mb-4">{line.replace('## ', '')}</h2>;
      if (line.startsWith('- ')) return <li key={i} className="ml-4 list-disc text-gray-300 mb-2">{line.replace('- ', '')}</li>;
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} className="text-gray-300 text-lg leading-relaxed mb-4">{line}</p>;
    });
  };


  return (
    <div className="w-full min-h-screen bg-[#050010] text-white pt-24 pb-20 px-4 md:px-8 relative overflow-hidden">
      
      {/* Background Blur Hero Effect */}
      <div 
        className="absolute top-0 left-0 w-full h-[60vh] opacity-20 bg-cover bg-center bg-no-repeat filter blur-[100px] pointer-events-none"
        style={{ backgroundImage: `url(${project.imageUrl})` }}
      ></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group w-fit">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Hızlı Geri Dön
        </button>

        {/* Header Section */}
        <div className="flex flex-col mb-12">
           <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-4 tracking-tight drop-shadow-lg">
             {project.title}
           </h1>
           {project.role && (
             <div className="text-xl md:text-2xl font-medium text-purple-400 tracking-wide uppercase">
               {project.role}
             </div>
           )}
        </div>

        {/* Grid Layout for Slider and Sidebar Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          
          {/* Main Content (Left, 2 columns wide) */}
          <div className="lg:col-span-2 flex flex-col gap-12">
            
            {/* Image Slider */}
            {project.images && project.images.length > 0 ? (
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black/50 border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)] group/slider">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={project.images[currentImageIndex]}
                    alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
                
                {/* Image Navigation Controls */}
                {project.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-md opacity-0 group-hover/slider:opacity-100 transition-all duration-300 border border-white/10"
                    >
                      &#x276E;
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-md opacity-0 group-hover/slider:opacity-100 transition-all duration-300 border border-white/10"
                    >
                      &#x276F;
                    </button>
                    {/* Dots */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                      {project.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-purple-500 w-8' : 'bg-white/50 hover:bg-white'} `}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              /* Fallback single image if no slider array provided */
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black/50 border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                 <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Content Description */}
            <div className="prose prose-invert prose-lg max-w-none">
              {project.content ? (
                <>
                  <p className="text-gray-300 text-xl leading-relaxed mb-8 italic">
                    {project.description}
                  </p>
                  {renderContent(project.content)}
                </>
              ) : (
                <p className="text-gray-300 text-xl leading-relaxed">
                  {project.description}
                </p>
              )}
            </div>

          </div>

          {/* Sidebar / Info Column (Right, 1 column wide) */}
          <div className="flex flex-col gap-8">
             <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sticky top-24 backdrop-blur-sm">
               
               <h3 className="text-xl font-bold mb-6 text-white border-b border-white/10 pb-4">Proje Künyesi</h3>
               
               {/* Tech Stack Chips */}
               <div className="mb-8">
                  <span className="block text-sm text-gray-400 mb-3">Kullanılan Teknolojiler</span>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map(tech => (
                      <div key={tech.name} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                         <img 
                           src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech.iconName}`} 
                           className="w-4 h-4" 
                           alt={tech.name}
                           onError={(e) => { e.currentTarget.style.display = 'none'; }}
                         />
                         <span className="text-sm font-medium text-gray-200">{tech.name}</span>
                      </div>
                    ))}
                  </div>
               </div>

               <ul className="space-y-5">
                 {project.date && (
                   <li>
                     <span className="block text-sm text-gray-400 mb-1">Teslim Tarihi</span>
                     <span className="font-semibold text-white text-lg">{project.date}</span>
                   </li>
                 )}
                 <li>
                   <span className="block text-sm text-gray-400 mb-1">Proje Durumu</span>
                   <span className="inline-block px-3 py-1 text-xs font-bold rounded-full mt-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                     Tamamlandı
                   </span>
                 </li>
               </ul>

               {project.projectUrl && project.projectUrl !== '#' && (
                 <a 
                   href={project.projectUrl}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="mt-10 flex items-center justify-center gap-2 w-full py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold transition-all hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                 >
                   <span>Canlı Projeyi Görüntüle</span>
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                     <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                     <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                   </svg>
                 </a>
               )}
             </div>
          </div>

        </div>

        {/* Footer Navigation (Prev / Next Completed Project) */}
        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
           {prevProject ? (
             <Link 
               to={`/project/${prevProject.id}`}
               className="group flex flex-col items-start w-full md:w-1/2 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 gap-2"
             >
               <span className="text-gray-400 text-sm group-hover:text-purple-400 transition-colors uppercase tracking-widest">&#x2190; Önceki Proje</span>
               <span className="text-xl md:text-2xl font-bold text-white group-hover:translate-x-2 transition-transform truncate w-full">{prevProject.title}</span>
             </Link>
           ) : (
             <div className="w-full md:w-1/2"></div> // Empty spacer
           )}

           {nextProject && (
             <Link 
               to={`/project/${nextProject.id}`}
               className="group flex flex-col items-end w-full md:w-1/2 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 gap-2 text-right"
             >
               <span className="text-gray-400 text-sm group-hover:text-purple-400 transition-colors uppercase tracking-widest">Sonraki Proje &#x2192;</span>
               <span className="text-xl md:text-2xl font-bold text-white group-hover:-translate-x-2 transition-transform truncate w-full">{nextProject.title}</span>
             </Link>
           )}
        </div>

      </div>
    </div>
  );
};

export default ProjectDetail;
