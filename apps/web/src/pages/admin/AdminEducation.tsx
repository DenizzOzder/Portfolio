import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, addDoc, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { EducationItem } from '@/types/education';
import toast from 'react-hot-toast';

const AdminEducation: React.FC = () => {
   const [educations, setEducations] = useState<EducationItem[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [isEditing, setIsEditing] = useState(false);
   const [currentEdu, setCurrentEdu] = useState<Partial<EducationItem>>({});
   const [isSaving, setIsSaving] = useState(false);

   // Local state for single badge editing
   const [badgeText, setBadgeText] = useState('');
   const [badgeColor, setBadgeColor] = useState('blue');

   useEffect(() => {
      fetchEducations();
   }, []);

   const fetchEducations = async () => {
      try {
         const q = query(collection(db, 'education'), orderBy('sortOrder', 'asc'));
         const snapshot = await getDocs(q);
         const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as EducationItem[];
         setEducations(data);
      } catch (error) {
         toast.error('Eğitim bilgileri yüklenirken hata oluştu.');
         console.error(error);
      } finally {
         setIsLoading(false);
      }
   };

   const handleSave = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSaving(true);
      const loadingToast = toast.loading('Eğitim kaydediliyor...');

      try {
         const eduData = {
            ...currentEdu,
            // Convert comma separated string back to array if needed
            techStacks: typeof currentEdu.techStacks === 'string' 
               ? (currentEdu.techStacks as string).split(',').map(s => s.trim()).filter(s => s) 
               : (currentEdu.techStacks || []),
            // Parse SortOrder as number
            sortOrder: Number(currentEdu.sortOrder) || 0,
            // Build the single badge if text is provided
            badges: badgeText ? [{ text: badgeText, color: badgeColor }] : []
         };

         if (currentEdu.id) {
            // Update
            await setDoc(doc(db, 'education', currentEdu.id.toString()), eduData, { merge: true });
         } else {
            // Create
            await addDoc(collection(db, 'education'), eduData);
         }

         toast.success('Eğitim başarıyla kaydedildi!', { id: loadingToast });
         setIsEditing(false);
         setCurrentEdu({});
         setBadgeText('');
         fetchEducations();
      } catch (error) {
         console.error(error);
         toast.error('Kaydedilemedi.', { id: loadingToast });
      } finally {
         setIsSaving(false);
      }
   };

   const handleDelete = async (id: string | number) => {
      if (!window.confirm('Bu eğitimi silmek istediğinize emin misiniz?')) return;
      
      try {
         await deleteDoc(doc(db, 'education', id.toString()));
         toast.success('Eğitim silindi.');
         fetchEducations();
      } catch (error) {
         console.error(error);
         toast.error('Silme işlemi başarısız oldu.');
      }
   };

   const openEditor = (edu?: EducationItem) => {
      if (edu) {
         setCurrentEdu({
            ...edu,
            // Convert array to string for easy editing
            techStacks: ((edu.techStacks || []).join(', ') as unknown) as string[]
         });
         // Fill badge states if exists
         if (edu.badges && edu.badges.length > 0) {
            setBadgeText(edu.badges[0].text);
            setBadgeColor(edu.badges[0].color);
         } else {
            setBadgeText('');
            setBadgeColor('blue');
         }
      } else {
         setCurrentEdu({ emphasizeSchool: false, sortOrder: educations.length + 1 });
         setBadgeText('');
         setBadgeColor('blue');
      }
      setIsEditing(true);
   };

   if (isLoading) return <div className="text-white">Yükleniyor...</div>;

   return (
      <div className="space-y-6">
         <div className="flex justify-between items-center">
            <div>
               <h2 className="text-3xl font-black text-white mb-2">Eğitim Geçmişi</h2>
               <p className="text-gray-400">Okul, üniversite ve eğitim programlarını buradan yönetebilirsiniz.</p>
            </div>
            {!isEditing && (
               <button 
                  onClick={() => openEditor()}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:-translate-y-0.5 transition-all"
               >
                  Yeni Eğitim Ekle
               </button>
            )}
         </div>
         
         {isEditing ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
               <h3 className="text-xl font-bold text-white mb-6">{currentEdu.id ? 'Eğitimi Düzenle' : 'Yeni Eğitim'}</h3>
               <form onSubmit={handleSave} className="space-y-4">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Kurum / Okul Adı</label>
                        <input required type="text" value={currentEdu.institution || ''} onChange={e => setCurrentEdu({...currentEdu, institution: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white" />
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Derece / Bölüm</label>
                        <input required type="text" value={currentEdu.degree || ''} onChange={e => setCurrentEdu({...currentEdu, degree: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white" />
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Tarih</label>
                        <input type="text" placeholder="2018 - 2022" value={currentEdu.date || ''} onChange={e => setCurrentEdu({...currentEdu, date: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white" />
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Not / Ortalama (Ops.)</label>
                        <input type="text" placeholder="Ortalama: 3.43" value={currentEdu.grade || ''} onChange={e => setCurrentEdu({...currentEdu, grade: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white" />
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Durum (Ops.)</label>
                        <input type="text" placeholder="%100 Burslu" value={currentEdu.status || ''} onChange={e => setCurrentEdu({...currentEdu, status: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white" />
                     </div>
                  </div>

                  <div>
                     <label className="block text-sm font-bold text-gray-300 mb-2">Kullanılan Teknolojiler / Dersler (Virgülle Ayırın)</label>
                     <input type="text" placeholder="C++, SQL, Java" value={(currentEdu.techStacks as unknown as string) || ''} onChange={e => setCurrentEdu({...currentEdu, techStacks: (e.target.value as unknown) as string[]})} className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end bg-black/20 p-4 rounded-xl border border-white/5">
                     <div className="col-span-2">
                        <label className="block text-sm font-bold text-gray-300 mb-2">Vurgu Rozeti Sloganı (Opsiyonel)</label>
                        <input type="text" placeholder="Tamamlandı, Öğrenime Ara Verdim vb." value={badgeText} onChange={e => setBadgeText(e.target.value)} className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white" />
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Rozet Rengi</label>
                        <select value={badgeColor} onChange={e => setBadgeColor(e.target.value)} className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white">
                           <option value="blue">Mavi</option>
                           <option value="green">Yeşil</option>
                           <option value="orange">Turuncu</option>
                           <option value="red">Kırmızı</option>
                           <option value="purple">Mor</option>
                        </select>
                     </div>
                  </div>

                  <div className="flex items-center gap-6 mt-4">
                     <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={currentEdu.emphasizeSchool || false} onChange={e => setCurrentEdu({...currentEdu, emphasizeSchool: e.target.checked})} className="w-5 h-5 rounded bg-black border-white/10 text-purple-600 focus:ring-purple-500" />
                        <span className="text-gray-300 font-bold text-sm">Okul Adını Vurgula (Logo/Başlıkta)</span>
                     </label>
                     
                     <div className="flex items-center gap-2">
                        <label className="text-gray-300 font-bold text-sm">Sıralama (Küçükten büyüğe):</label>
                        <input type="number" min="0" value={currentEdu.sortOrder || 0} onChange={e => setCurrentEdu({...currentEdu, sortOrder: parseInt(e.target.value)})} className="w-20 px-3 py-1 rounded-lg bg-black/40 border border-white/10 text-white text-center" />
                     </div>
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
            <div className="space-y-4">
               {educations.map(edu => (
                  <div key={edu.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors shadow-lg flex justify-between items-center">
                     <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                           {edu.emphasizeSchool ? edu.institution : edu.degree}
                        </h3>
                        <p className="text-purple-400 font-medium mb-2">
                           {edu.emphasizeSchool ? edu.degree : edu.institution}
                        </p>
                        <div className="flex flex-wrap gap-2 items-center text-sm text-gray-400">
                           <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md text-gray-300">{edu.date}</span>
                           {(edu.badges && edu.badges.length > 0) && (
                              <span className={`px-2 py-1 rounded-md bg-${edu.badges[0].color}-500/20 text-${edu.badges[0].color}-400 font-bold border border-${edu.badges[0].color}-500/20`}>
                                 {edu.badges[0].text}
                              </span>
                           )}
                           {edu.grade && <span>• {edu.grade}</span>}
                        </div>
                     </div>
                     <div className="flex gap-2 shrink-0">
                        <button onClick={() => openEditor(edu)} className="px-4 py-2 text-gray-300 hover:text-white bg-white/5 rounded-xl hover:bg-white/10 transition-colors">Düzenle</button>
                        <button onClick={() => handleDelete(edu.id as string)} className="px-4 py-2 text-red-400 hover:text-white bg-red-500/10 rounded-xl hover:bg-red-500 transition-colors">Sil</button>
                     </div>
                  </div>
               ))}
               {educations.length === 0 && (
                  <div className="text-center py-10 bg-white/5 rounded-2xl border border-white/10">
                     <p className="text-gray-400">Veritabanında henüz eğitim bilgisi bulunmuyor.</p>
                  </div>
               )}
            </div>
         )}
      </div>
   );
};

export default AdminEducation;
