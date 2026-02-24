import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '@/store/slices/uiSlice';
import { getFeaturedProjects } from '@/services/projectService';
import type { ProjectCardProps } from '@/types';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectCardProps | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    let isLoadingStarted = false;

    // In a real app, you might have a getProjectById service.
    // Here we reuse getFeaturedProjects and filter by id.
    const fetchProject = async () => {
      dispatch(startLoading('Proje Detayları Yükleniyor...'));
      isLoadingStarted = true;
      try {
        const projects = await getFeaturedProjects();
        if (isMounted) {
          const found = projects.find(p => p.id === id);
          if (found) {
            setProject(found);
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching project:", error);
        }
      } finally {
        if (isMounted && isLoadingStarted) {
          dispatch(stopLoading());
          isLoadingStarted = false;
        }
      }
    };

    fetchProject();

    return () => {
      isMounted = false;
      if (isLoadingStarted) {
        dispatch(stopLoading());
        isLoadingStarted = false;
      }
    };
  }, [id, dispatch]);

  if (!project) {
    return (
      <div className="w-full min-h-screen bg-[#050010] flex flex-col items-center justify-center text-white gap-4">
        <h1 className="text-4xl font-bold">Proje Bulunamadı</h1>
        <button onClick={() => navigate('/projects')} className="text-purple-400 hover:text-purple-300 underline">Aramaya dön</button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#050010] text-white pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto relative z-10">
        
        <button onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Geri Dön
        </button>

        <div className="relative rounded-3xl overflow-hidden mb-12 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
          <img src={project.imageUrl} alt={project.title} className="w-full max-h-[500px] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050010] to-transparent"></div>
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 pr-6">
             <div className="flex gap-3 mb-4 flex-wrap">
               {project.techStack.map(tech => (
                 <span key={tech.name} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold border border-white/20">
                   {tech.name}
                 </span>
               ))}
             </div>
             <h1 className="text-4xl md:text-6xl font-black">{project.title}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">Proje Detayları</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {project.description}
            </p>
            {/* Extended dummy description since this is a detail page */}
            <p className="text-gray-400 leading-relaxed mb-6">
              Bu proje, modern web teknolojilerini kullanarak kullanıcı deneyimini en üst seviyeye çıkarmak hedefiyle geliştirildi. {project.title} üzerinde çalışırken güncel mimari kalıplar, temiz kod prensipleri ve performans optimizasyonları birincil önceliğim oldu. Ölçeklenebilirlik ve güvenlik açısından en uygun altyapılar tercih edildi.
            </p>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-fit sticky top-32">
             <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">Proje Özeti</h3>
             <ul className="space-y-4">
               {project.role && (
                 <li>
                   <span className="block text-sm text-gray-500 mb-1">Rol</span>
                   <span className="font-medium text-white">{project.role}</span>
                 </li>
               )}
               {project.date && (
                 <li>
                   <span className="block text-sm text-gray-500 mb-1">Tarih</span>
                   <span className="font-medium text-white">{project.date}</span>
                 </li>
               )}
               {project.status && (
                 <li>
                   <span className="block text-sm text-gray-500 mb-1">Durum</span>
                   <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mt-1 ${project.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                     {project.status === 'completed' ? 'Tamamlandı' : 'Devam Ediyor'}
                   </span>
                 </li>
               )}
             </ul>
             
             {project.projectUrl && project.projectUrl !== '#' && (
               <a 
                 href={project.projectUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="block w-full text-center mt-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold transition-transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)]"
               >
                 Canlı Projeyi Görüntüle
               </a>
             )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectDetail;
