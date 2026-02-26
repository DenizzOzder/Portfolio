import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, addDoc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import type { AboutRowItem } from '@/types';
import RichTextEditor from '@/components/admin/RichTextEditor';
import toast from 'react-hot-toast';

const AdminAbout: React.FC = () => {
   const [rows, setRows] = useState<AboutRowItem[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [isEditing, setIsEditing] = useState(false);
   const [current, setCurrent] = useState<Partial<AboutRowItem>>({});
   const [imageFile, setImageFile] = useState<File | null>(null);
   const [isSaving, setIsSaving] = useState(false);

   useEffect(() => { fetchRows(); }, []);

   const fetchRows = async () => {
      try {
         const q = query(collection(db, 'about'), orderBy('order', 'asc'));
         const snapshot = await getDocs(q);
         const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as AboutRowItem[];
         setRows(data);
      } catch (error) {
         toast.error('About verileri yüklenirken hata oluştu.');
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
         let imageUrl = current.imageUrl || '';

         if (imageFile) {
            const storageRef = ref(storage, `about/${Date.now()}_${imageFile.name}`);
            const snapshot = await uploadBytes(storageRef, imageFile);
            imageUrl = await getDownloadURL(snapshot.ref);
         }

         const rowData = {
            ...current,
            imageUrl,
            order: Number(current.order) || 0,
         };

         if (current.id) {
            await setDoc(doc(db, 'about', current.id), rowData, { merge: true });
         } else {
            await addDoc(collection(db, 'about'), rowData);
         }

         toast.success('Başarıyla kaydedildi!', { id: loadingToast });
         setIsEditing(false);
         setImageFile(null);
         setCurrent({});
         fetchRows();
      } catch (error) {
         console.error(error);
         toast.error('Kaydedilemedi.', { id: loadingToast });
      } finally {
         setIsSaving(false);
      }
   };

   const handleDelete = async (id: string) => {
      if (!window.confirm('Bu bölümü silmek istediğinize emin misiniz?')) return;
      try {
         await deleteDoc(doc(db, 'about', id));
         toast.success('Bölüm silindi.');
         fetchRows();
      } catch (error) {
         console.error(error);
         toast.error('Silme başarısız oldu.');
      }
   };

   const openEditor = (item?: AboutRowItem) => {
      if (item) {
         setCurrent({ ...item });
      } else {
         setCurrent({ order: rows.length + 1, imagePosition: 'left' });
      }
      setImageFile(null);
      setIsEditing(true);
   };

   if (isLoading) return <div className="text-white">Yükleniyor...</div>;

   return (
      <div className="space-y-6">
         <div className="flex justify-between items-center">
            <div>
               <h2 className="text-3xl font-black text-white mb-2">Hakkımda Bölümleri</h2>
               <p className="text-gray-400">About sayfasındaki zig-zag bölümleri buradan yönetebilirsiniz.</p>
            </div>
            {!isEditing && (
               <button onClick={() => openEditor()} className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:-translate-y-0.5 transition-all">
                  Yeni Bölüm Ekle
               </button>
            )}
         </div>

         {isEditing ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
               <h3 className="text-xl font-bold text-white mb-6">{current.id ? 'Bölümü Düzenle' : 'Yeni Bölüm'}</h3>
               <form onSubmit={handleSave} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Başlık (TR) (Opsiyonel)</label>
                        <input type="text" placeholder="Ben Kimim?" value={current.title || ''} onChange={e => setCurrent({ ...current, title: e.target.value })} className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white" />
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Başlık (EN) (Opsiyonel)</label>
                        <input type="text" placeholder="Who Am I?" value={current.title_en || ''} onChange={e => setCurrent({ ...current, title_en: e.target.value })} className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white" />
                     </div>
                  </div>

                  <div>
                     <label className="block text-sm font-bold text-gray-300 mb-2">İçerik (TR)</label>
                     <RichTextEditor
                        value={current.content || ''}
                        onChange={html => setCurrent({ ...current, content: html })}
                        placeholder="Hakkınızda paragraflar yazın (TR)..."
                        minHeight="180px"
                     />
                  </div>

                  <div>
                     <label className="block text-sm font-bold text-gray-300 mb-2">İçerik (EN)</label>
                     <RichTextEditor
                        value={current.content_en || ''}
                        onChange={html => setCurrent({ ...current, content_en: html })}
                        placeholder="Hakkınızda paragraflar yazın (EN)..."
                        minHeight="180px"
                     />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Görsel Konumu</label>
                        <select value={current.imagePosition || 'left'} onChange={e => setCurrent({ ...current, imagePosition: e.target.value as 'left' | 'right' })} className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white">
                           <option value="left">Sol</option>
                           <option value="right">Sağ</option>
                        </select>
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Sıralama</label>
                        <input type="number" min="0" value={current.order || 0} onChange={e => setCurrent({ ...current, order: parseInt(e.target.value) })} className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white" />
                     </div>
                  </div>

                  <div>
                     <label className="block text-sm font-bold text-gray-300 mb-2">Görsel</label>
                     <div className="flex items-center gap-4">
                        {current.imageUrl && !imageFile && (
                           <img src={current.imageUrl} alt="Current" className="w-20 h-20 object-cover rounded-lg" />
                        )}
                        <input
                           type="file"
                           accept="image/*"
                           onChange={e => { if (e.target.files?.[0]) setImageFile(e.target.files[0]); }}
                           className="text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-purple-600/20 file:text-purple-400 hover:file:bg-purple-600/30"
                        />
                     </div>
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
               {rows.map(row => (
                  <div key={row.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors shadow-lg flex gap-5 items-center">
                     {row.imageUrl && (
                        <img src={row.imageUrl} alt={row.title || 'About'} className="w-20 h-20 object-cover rounded-xl shrink-0" />
                     )}
                     <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                           <h3 className="text-lg font-bold text-white truncate">{row.title || '(Başlıksız)'}</h3>
                           <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-md shrink-0">
                              Görsel: {row.imagePosition === 'left' ? 'Sol' : 'Sağ'}
                           </span>
                           <span className="text-xs text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md shrink-0">
                              Sıra: {row.order}
                           </span>
                        </div>
                        <p className="text-gray-400 text-sm line-clamp-2">{row.content}</p>
                     </div>
                     <div className="flex gap-2 shrink-0">
                        <button onClick={() => openEditor(row)} className="px-4 py-2 text-gray-300 hover:text-white bg-white/5 rounded-xl hover:bg-white/10 transition-colors">Düzenle</button>
                        <button onClick={() => handleDelete(row.id)} className="px-4 py-2 text-red-400 hover:text-white bg-red-500/10 rounded-xl hover:bg-red-500 transition-colors">Sil</button>
                     </div>
                  </div>
               ))}
               {rows.length === 0 && (
                  <div className="text-center py-10 bg-white/5 rounded-2xl border border-white/10">
                     <p className="text-gray-400">Henüz hakkımda bölümü eklenmemiş.</p>
                  </div>
               )}
            </div>
         )}
      </div>
   );
};

export default AdminAbout;
