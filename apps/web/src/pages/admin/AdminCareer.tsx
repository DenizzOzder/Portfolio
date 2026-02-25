import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, addDoc, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { CareerItem } from '@/types/career';
import toast from 'react-hot-toast';

const AdminCareer: React.FC = () => {
   const [careers, setCareers] = useState<CareerItem[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [isEditing, setIsEditing] = useState(false);
   const [current, setCurrent] = useState<Partial<CareerItem & { sortOrder?: number }>>({});
   const [isSaving, setIsSaving] = useState(false);

   useEffect(() => { fetchCareers(); }, []);

   const fetchCareers = async () => {
      try {
         const q = query(collection(db, 'careers'), orderBy('sortOrder', 'asc'));
         const snapshot = await getDocs(q);
         const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as (CareerItem & { sortOrder?: number })[];
         setCareers(data);
      } catch (error) {
         toast.error('Kariyer bilgileri yüklenirken hata oluştu.');
         console.error(error);
      } finally {
         setIsLoading(false);
      }
   };

   const handleSave = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSaving(true);
      const loadingToast = toast.loading('Kaydediliyor...');

      try {
         const careerData = {
            ...current,
            techStacks: typeof current.techStacks === 'string'
               ? (current.techStacks as string).split(',').map(s => s.trim()).filter(Boolean)
               : (current.techStacks || []),
            sortOrder: Number(current.sortOrder) || 0,
         };

         if (current.id) {
            await setDoc(doc(db, 'careers', current.id), careerData, { merge: true });
         } else {
            await addDoc(collection(db, 'careers'), careerData);
         }

         toast.success('Kariyer başarıyla kaydedildi!', { id: loadingToast });
         setIsEditing(false);
         setCurrent({});
         fetchCareers();
      } catch (error) {
         console.error(error);
         toast.error('Kaydedilemedi.', { id: loadingToast });
      } finally {
         setIsSaving(false);
      }
   };

   const handleDelete = async (id: string) => {
      if (!window.confirm('Bu kariyer kaydını silmek istediğinize emin misiniz?')) return;
      try {
         await deleteDoc(doc(db, 'careers', id));
         toast.success('Kariyer silindi.');
         fetchCareers();
      } catch (error) {
         console.error(error);
         toast.error('Silme başarısız oldu.');
      }
   };

   const openEditor = (item?: CareerItem & { sortOrder?: number }) => {
      if (item) {
         setCurrent({ ...item, techStacks: ((item.techStacks || []).join(', ') as unknown) as string[] });
      } else {
         setCurrent({ sortOrder: careers.length + 1 });
      }
      setIsEditing(true);
   };

   if (isLoading) return <div className="text-white">Yükleniyor...</div>;

   return (
      <div className="space-y-6">
         <div className="flex justify-between items-center">
            <div>
               <h2 className="text-3xl font-black text-white mb-2">Kariyer & Deneyimler</h2>
               <p className="text-gray-400">İş tecrübelerinizi ve rollerinizi buradan yönetebilirsiniz.</p>
            </div>
            {!isEditing && (
               <button onClick={() => openEditor()} className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:-translate-y-0.5 transition-all">
                  Yeni Deneyim Ekle
               </button>
            )}
         </div>

         {isEditing ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
               <h3 className="text-xl font-bold text-white mb-6">{current.id ? 'Deneyimi Düzenle' : 'Yeni Deneyim'}</h3>
               <form onSubmit={handleSave} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Pozisyon / Rol</label>
                        <input required type="text" value={current.role || ''} onChange={e => setCurrent({ ...current, role: e.target.value })} className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white" />
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Şirket Adı</label>
                        <input type="text" value={current.companyName || ''} onChange={e => setCurrent({ ...current, companyName: e.target.value })} className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white" />
                     </div>
                  </div>

                  <div>
                     <label className="block text-sm font-bold text-gray-300 mb-2">Tarih Aralığı</label>
                     <input required type="text" placeholder="2022 – Hâlâ devam ediyor" value={current.years || ''} onChange={e => setCurrent({ ...current, years: e.target.value })} className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white" />
                  </div>

                  <div>
                     <label className="block text-sm font-bold text-gray-300 mb-2">Açıklama</label>
                     <textarea required rows={4} value={current.description || ''} onChange={e => setCurrent({ ...current, description: e.target.value })} className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white" />
                  </div>

                  <div>
                     <label className="block text-sm font-bold text-gray-300 mb-2">Kullanılan Teknolojiler (Virgülle Ayırın)</label>
                     <input type="text" placeholder="TypeScript, Firebase, GraphQL" value={(current.techStacks as unknown as string) || ''} onChange={e => setCurrent({ ...current, techStacks: (e.target.value as unknown) as string[] })} className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white" />
                  </div>

                  <div className="flex items-center gap-2">
                     <label className="text-gray-300 font-bold text-sm">Sıralama:</label>
                     <input type="number" min="0" value={current.sortOrder || 0} onChange={e => setCurrent({ ...current, sortOrder: parseInt(e.target.value) })} className="w-20 px-3 py-1 rounded-lg bg-black/40 border border-white/10 text-white text-center" />
                  </div>

                  <div className="flex justify-end gap-3 pt-6 border-t border-white/10 mt-6">
                     <button type="button" onClick={() => setIsEditing(false)} className="px-5 py-2 rounded-xl font-bold text-gray-400 hover:text-white transition-colors">İptal</button>
                     <button type="submit" disabled={isSaving} className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg disabled:opacity-50 transition-all">
                        {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
                     </button>
                  </div>
               </form>
            </div>
         ) : (
            <div className="space-y-4">
               {careers.map(c => (
                  <div key={c.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors shadow-lg flex justify-between items-center">
                     <div>
                        <h3 className="text-xl font-bold text-white mb-1">{c.role}</h3>
                        {c.companyName && <p className="text-purple-400 font-medium mb-1">{c.companyName}</p>}
                        <span className="text-sm text-gray-400">{c.years}</span>
                     </div>
                     <div className="flex gap-2 shrink-0">
                        <button onClick={() => openEditor(c as CareerItem & { sortOrder?: number })} className="px-4 py-2 text-gray-300 hover:text-white bg-white/5 rounded-xl hover:bg-white/10 transition-colors">Düzenle</button>
                        <button onClick={() => handleDelete(c.id)} className="px-4 py-2 text-red-400 hover:text-white bg-red-500/10 rounded-xl hover:bg-red-500 transition-colors">Sil</button>
                     </div>
                  </div>
               ))}
               {careers.length === 0 && (
                  <div className="text-center py-10 bg-white/5 rounded-2xl border border-white/10">
                     <p className="text-gray-400">Veritabanında henüz kariyer bilgisi bulunmuyor.</p>
                  </div>
               )}
            </div>
         )}
      </div>
   );
};

export default AdminCareer;
