import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import type { CertificateItem } from '@/types/certificate';
import toast from 'react-hot-toast';

const AdminCertificates: React.FC = () => {
   const [certificates, setCertificates] = useState<CertificateItem[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [isEditing, setIsEditing] = useState(false);
   const [current, setCurrent] = useState<Partial<CertificateItem>>({});
   const [imageFile, setImageFile] = useState<File | null>(null);
   const [isSaving, setIsSaving] = useState(false);

   useEffect(() => { fetchCertificates(); }, []);

   const fetchCertificates = async () => {
      try {
         const snapshot = await getDocs(collection(db, 'certificates'));
         const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as CertificateItem[];
         setCertificates(data);
      } catch (error) {
         toast.error('Sertifikalar yüklenirken hata oluştu.');
         console.error(error);
      } finally {
         setIsLoading(false);
      }
   };

   const handleSave = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSaving(true);
      const loadingToast = toast.loading('Sertifika kaydediliyor...');

      try {
         let imageUrl = current.image || '';

         if (imageFile) {
            const storageRef = ref(storage, `certificates/${Date.now()}_${imageFile.name}`);
            const snapshot = await uploadBytes(storageRef, imageFile);
            imageUrl = await getDownloadURL(snapshot.ref);
         }

         const certData = {
            ...current,
            image: imageUrl,
            techStacks: typeof current.techStacks === 'string'
               ? (current.techStacks as string).split(',').map(s => s.trim()).filter(Boolean)
               : (current.techStacks || []),
         };

         if (current.id) {
            await setDoc(doc(db, 'certificates', current.id), certData, { merge: true });
         } else {
            await addDoc(collection(db, 'certificates'), certData);
         }

         toast.success('Sertifika başarıyla kaydedildi!', { id: loadingToast });
         setIsEditing(false);
         setImageFile(null);
         setCurrent({});
         fetchCertificates();
      } catch (error) {
         console.error(error);
         toast.error('Kaydedilemedi.', { id: loadingToast });
      } finally {
         setIsSaving(false);
      }
   };

   const handleDelete = async (id: string) => {
      if (!window.confirm('Bu sertifikayı silmek istediğinize emin misiniz?')) return;
      try {
         await deleteDoc(doc(db, 'certificates', id));
         toast.success('Sertifika silindi.');
         fetchCertificates();
      } catch (error) {
         console.error(error);
         toast.error('Silme başarısız oldu.');
      }
   };

   const openEditor = (item?: CertificateItem) => {
      if (item) {
         setCurrent({ ...item, techStacks: ((item.techStacks || []).join(', ') as unknown) as string[] });
      } else {
         setCurrent({});
      }
      setImageFile(null);
      setIsEditing(true);
   };

   if (isLoading) return <div className="text-white">Yükleniyor...</div>;

   return (
      <div className="space-y-6">
         <div className="flex justify-between items-center">
            <div>
               <h2 className="text-3xl font-black text-white mb-2">Sertifikalar</h2>
               <p className="text-gray-400">Aldığınız sertifikaları veya ödülleri buradan sergileyebilirsiniz.</p>
            </div>
            {!isEditing && (
               <button onClick={() => openEditor()} className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:-translate-y-0.5 transition-all">
                  Yeni Sertifika Ekle
               </button>
            )}
         </div>

         {isEditing ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
               <h3 className="text-xl font-bold text-white mb-6">{current.id ? 'Sertifikayı Düzenle' : 'Yeni Sertifika'}</h3>
               <form onSubmit={handleSave} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Sertifika Başlığı</label>
                        <input required type="text" value={current.title || ''} onChange={e => setCurrent({ ...current, title: e.target.value })} className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white" />
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Veren Kurum</label>
                        <input required type="text" value={current.issuer || ''} onChange={e => setCurrent({ ...current, issuer: e.target.value })} className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white" />
                     </div>
                  </div>

                  <div>
                     <label className="block text-sm font-bold text-gray-300 mb-2">Kısa Açıklama (Hover'da Görünecek)</label>
                     <textarea rows={3} value={current.hoverDescription || ''} onChange={e => setCurrent({ ...current, hoverDescription: e.target.value })} className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white" />
                  </div>

                  <div>
                     <label className="block text-sm font-bold text-gray-300 mb-2">İlgili Teknolojiler (Virgülle Ayırın)</label>
                     <input type="text" placeholder="React Native, Firebase" value={(current.techStacks as unknown as string) || ''} onChange={e => setCurrent({ ...current, techStacks: (e.target.value as unknown) as string[] })} className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white" />
                  </div>

                  <div>
                     <label className="block text-sm font-bold text-gray-300 mb-2">Sertifika Görseli</label>
                     <div className="flex items-center gap-4">
                        {current.image && !imageFile && (
                           <img src={current.image} alt="Current" className="w-16 h-16 object-cover rounded-lg" />
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {certificates.map(cert => (
                  <div key={cert.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors shadow-lg flex flex-col">
                     {cert.image && (
                        <img src={cert.image} alt={cert.title} className="w-full h-40 object-cover rounded-xl mb-4" />
                     )}
                     <h3 className="text-lg font-bold text-white mb-1">{cert.title}</h3>
                     <p className="text-purple-400 text-sm font-medium mb-3">{cert.issuer}</p>
                     <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-grow">{cert.hoverDescription}</p>
                     <div className="flex justify-between items-center pt-4 border-t border-white/10">
                        <div className="flex flex-wrap gap-1">
                           {(cert.techStacks ?? []).slice(0, 2).map((t, i) => (
                              <span key={i} className="text-xs text-purple-400 font-bold px-2 py-0.5 bg-purple-500/10 rounded-md">{t}</span>
                           ))}
                        </div>
                        <div className="flex gap-2">
                           <button onClick={() => openEditor(cert)} className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg hover:bg-white/10 transition-colors">Düzenle</button>
                           <button onClick={() => handleDelete(cert.id)} className="p-2 text-red-500 hover:text-white bg-red-500/10 rounded-lg hover:bg-red-500 transition-colors">Sil</button>
                        </div>
                     </div>
                  </div>
               ))}
               {certificates.length === 0 && (
                  <div className="col-span-full text-center py-10 bg-white/5 rounded-2xl border border-white/10">
                     <p className="text-gray-400">Henüz sertifika eklenmemiş.</p>
                  </div>
               )}
            </div>
         )}
      </div>
   );
};

export default AdminCertificates;
