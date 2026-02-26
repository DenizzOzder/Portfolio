import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import type { ProjectCardProps } from '@/types';
import RichTextEditor from '@/components/admin/RichTextEditor';
import toast from 'react-hot-toast';

const AdminProjects: React.FC = () => {
   const [projects, setProjects] = useState<ProjectCardProps[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [isEditing, setIsEditing] = useState(false);
   const [currentProject, setCurrentProject] = useState<Partial<ProjectCardProps>>({});
   const [imageFile, setImageFile] = useState<File | null>(null);
   const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
   const [isSaving, setIsSaving] = useState(false);

   useEffect(() => {
      fetchProjects();
   }, []);

   const fetchProjects = async () => {
      try {
         const snapshot = await getDocs(collection(db, 'projects'));
         const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ProjectCardProps[];
         setProjects(data);
      } catch (error) {
         toast.error('Projeler yüklenirken hata oluştu.');
         console.error(error);
      } finally {
         setIsLoading(false);
      }
   };

   const handleSave = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSaving(true);
      const loadingToast = toast.loading('Proje kaydediliyor...');

      try {
         let uploadedImageUrl = currentProject.imageUrl || '';

         // If user selected a new cover image, upload it to Storage
         if (imageFile) {
            const storageRef = ref(storage, `projects/${Date.now()}_${imageFile.name}`);
            const snapshot = await uploadBytes(storageRef, imageFile);
            uploadedImageUrl = await getDownloadURL(snapshot.ref);
         }

         // Upload gallery images
         const galleryUrls: string[] = [];
         for (const file of galleryFiles) {
            const storageRef = ref(storage, `projects/gallery/${Date.now()}_${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            const url = await getDownloadURL(snapshot.ref);
            galleryUrls.push(url);
         }

         // Merge existing gallery images with newly uploaded ones
         const existingImages = currentProject.images ?? [];
         const allImages = [...existingImages, ...galleryUrls];

         const projectData = {
            ...currentProject,
            imageUrl: uploadedImageUrl,
            images: allImages,
            // Ensure arrays are handled correctly if user types comma separated strings
            techStacks: typeof currentProject.techStacks === 'string' 
               ? (currentProject.techStacks as string).split(',').map(s => s.trim()) 
               : (currentProject.techStacks || [])
         };

         if (currentProject.id) {
            // Update existing
            await setDoc(doc(db, 'projects', currentProject.id), projectData, { merge: true });
         } else {
            // Create new
            await addDoc(collection(db, 'projects'), projectData);
         }

         toast.success('Proje başarıyla kaydedildi!', { id: loadingToast });
         setIsEditing(false);
         setImageFile(null);
         setGalleryFiles([]);
         setCurrentProject({});
         fetchProjects();
      } catch (error) {
         console.error(error);
         toast.error('Proje kaydedilemedi.', { id: loadingToast });
      } finally {
         setIsSaving(false);
      }
   };

   const handleDelete = async (id: string) => {
      if (!window.confirm('Bu projeyi silmek istediğinize emin misiniz?')) return;
      
      try {
         await deleteDoc(doc(db, 'projects', id));
         toast.success('Proje silindi.');
         fetchProjects();
      } catch (error) {
         console.error(error);
         toast.error('Silme işlemi başarısız oldu.');
      }
   };

   const openEditor = (project?: ProjectCardProps) => {
      if (project) {
         setCurrentProject({
            ...project,
            // Convert array back to comma string for easy editing in simple input
            techStacks: (project.techStacks?.join(', ') as unknown) as string[]
         });
      } else {
         setCurrentProject({ status: 'completed' });
       }
       setImageFile(null);
       setGalleryFiles([]);
       setIsEditing(true);
   };

   if (isLoading) return <div className="text-white">Yükleniyor...</div>;

   return (
      <div className="space-y-6">
         <div className="flex justify-between items-center">
            <div>
               <h2 className="text-3xl font-black text-white mb-2">Projeler</h2>
               <p className="text-gray-400">Portfolyonuzda sergilenen projeleri ekleyin, düzenleyin veya silin.</p>
            </div>
            {!isEditing && (
               <button 
                  onClick={() => openEditor()}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:-translate-y-0.5 transition-all"
               >
                  Yeni Proje Ekle
               </button>
            )}
         </div>

         {isEditing ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
               <h3 className="text-xl font-bold text-white mb-6">{currentProject.id ? 'Projeyi Düzenle' : 'Yeni Proje'}</h3>
               <form onSubmit={handleSave} className="space-y-4">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Proje Adı (TR)</label>
                        <input required type="text" value={currentProject.title || ''} onChange={e => setCurrentProject({...currentProject, title: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white" />
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Proje Adı (EN)</label>
                        <input type="text" value={currentProject.title_en || ''} onChange={e => setCurrentProject({...currentProject, title_en: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white" />
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Rolünüz (TR)</label>
                        <input type="text" value={currentProject.role || ''} onChange={e => setCurrentProject({...currentProject, role: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white" />
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Rolünüz (EN)</label>
                        <input type="text" value={currentProject.role_en || ''} onChange={e => setCurrentProject({...currentProject, role_en: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white" />
                     </div>
                  </div>

                  <div>
                     <label className="block text-sm font-bold text-gray-300 mb-2">Kısa Açıklama (TR)</label>
                     <textarea required rows={2} value={currentProject.description || ''} onChange={e => setCurrentProject({...currentProject, description: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white" />
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-gray-300 mb-2">Kısa Açıklama (EN)</label>
                     <textarea rows={2} value={currentProject.description_en || ''} onChange={e => setCurrentProject({...currentProject, description_en: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white" />
                  </div>

                  <div>
                     <label className="block text-sm font-bold text-gray-300 mb-2">Detaylı İçerik (TR)</label>
                     <RichTextEditor
                        value={currentProject.content || ''}
                        onChange={html => setCurrentProject({...currentProject, content: html})}
                        placeholder="Proje detaylarını yazın (TR)..."
                        minHeight="220px"
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-gray-300 mb-2">Detaylı İçerik (EN)</label>
                     <RichTextEditor
                        value={currentProject.content_en || ''}
                        onChange={html => setCurrentProject({...currentProject, content_en: html})}
                        placeholder="Proje detaylarını yazın (EN)..."
                        minHeight="220px"
                     />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Tarih (Yıl-Ay)</label>
                        <input type="text" placeholder="2024-03" value={currentProject.date || ''} onChange={e => setCurrentProject({...currentProject, date: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white" />
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Durum</label>
                        <select value={currentProject.status || 'completed'} onChange={e => setCurrentProject({...currentProject, status: e.target.value as 'completed' | 'in-progress'})} className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white">
                           <option value="completed">Tamamlandı</option>
                           <option value="in-progress">Devam Ediyor</option>
                        </select>
                     </div>
                  </div>

                  <div>
                     <label className="block text-sm font-bold text-gray-300 mb-2">Kullanılan Teknolojiler (Virgülle Ayırın)</label>
                     <input type="text" placeholder="React, Node.js, MongoDB" value={(currentProject.techStacks as unknown as string) || ''} onChange={e => setCurrentProject({...currentProject, techStacks: (e.target.value as unknown) as string[]})} className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white" />
                  </div>

                  <div>
                     <label className="block text-sm font-bold text-gray-300 mb-2">Canlı / Repo Linki (Opsiyonel)</label>
                     <input type="text" value={currentProject.projectUrl || ''} onChange={e => setCurrentProject({...currentProject, projectUrl: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white" />
                  </div>

                  <div>
                     <label className="block text-sm font-bold text-gray-300 mb-2">Proje Kapak Resmi (Firebase Storage)</label>
                     <div className="flex items-center gap-4">
                        {currentProject.imageUrl && !imageFile && (
                           <img src={currentProject.imageUrl} alt="Current" className="w-16 h-16 object-cover rounded-lg" />
                        )}
                        <input 
                           type="file" 
                           accept="image/*"
                           onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                 setImageFile(e.target.files[0]);
                              }
                           }}
                           className="text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-purple-600/20 file:text-purple-400 hover:file:bg-purple-600/30"
                        />
                     </div>
                   </div>

                   {/* Gallery Images Section */}
                   <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                      <label className="block text-sm font-bold text-gray-300 mb-3">Galeri Görselleri (Slider için birden fazla)</label>
                      
                      {/* Existing gallery preview */}
                      {(currentProject.images ?? []).length > 0 && (
                         <div className="flex flex-wrap gap-3 mb-4">
                            {(currentProject.images ?? []).map((url, idx) => (
                               <div key={idx} className="relative group">
                                  <img src={url} alt={`Gallery ${idx + 1}`} className="w-20 h-20 object-cover rounded-lg border border-white/10" />
                                  <button
                                     type="button"
                                     onClick={() => {
                                        const updated = [...(currentProject.images ?? [])];
                                        updated.splice(idx, 1);
                                        setCurrentProject({ ...currentProject, images: updated });
                                     }}
                                     className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                     ✕
                                  </button>
                               </div>
                            ))}
                         </div>
                      )}

                      {/* New gallery file picker */}
                      <input 
                         type="file" 
                         accept="image/*"
                         multiple
                         onChange={(e) => {
                            if (e.target.files) {
                               setGalleryFiles(prev => [...prev, ...Array.from(e.target.files!)]);
                            }
                         }}
                         className="text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-purple-600/20 file:text-purple-400 hover:file:bg-purple-600/30"
                      />
                      {galleryFiles.length > 0 && (
                         <p className="text-xs text-gray-500 mt-2">{galleryFiles.length} yeni görsel seçildi</p>
                      )}
                   </div>

                   <div className="flex justify-end gap-3 pt-6 border-t border-white/10 mt-6 !mb-0">
                     <button type="button" onClick={() => setIsEditing(false)} className="px-5 py-2 rounded-xl font-bold text-gray-400 hover:text-white transition-colors">İptal</button>
                     <button type="submit" disabled={isSaving} className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg disabled:opacity-50 transition-all">
                        {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
                     </button>
                  </div>
               </form>
            </div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {projects.map(project => (
                  <div key={project.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors shadow-lg flex flex-col">
                     {project.imageUrl && (
                        <img src={project.imageUrl} alt={project.title} className="w-full h-40 object-cover rounded-xl mb-4" />
                     )}
                     <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                     <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-grow">{project.description}</p>
                     
                     <div className="flex justify-between items-center pt-4 border-t border-white/10">
                        <span className="text-xs text-purple-400 font-bold px-2 py-1 bg-purple-500/10 rounded-lg">{project.status === 'completed' ? 'Tamamlandı' : 'Sürüyor'}</span>
                        <div className="flex gap-2">
                           <button onClick={() => openEditor(project)} className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg hover:bg-white/10 transition-colors">Ayarlar</button>
                           <button onClick={() => handleDelete(project.id as string)} className="p-2 text-red-500 hover:text-white bg-red-500/10 rounded-lg hover:bg-red-500 transition-colors">Sil</button>
                        </div>
                     </div>
                  </div>
               ))}
               {projects.length === 0 && (
                  <div className="col-span-full text-center py-10 bg-white/5 rounded-2xl border border-white/10">
                     <p className="text-gray-400">Veritabanında henüz proje bulunmuyor.</p>
                  </div>
               )}
            </div>
         )}
      </div>
   );
};

export default AdminProjects;
