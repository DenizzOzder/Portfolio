import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import type { AdminSettings } from '@/types/admin';
import toast from 'react-hot-toast';

const DEFAULT_SETTINGS: AdminSettings = {
   contactEmail: '',
   resumePdfUrlTr: '',
   resumePdfUrlEn: '',
   socialLinks: {
      github: '',
      linkedin: '',
   },
};

const AdminSettingsPage: React.FC = () => {
   const [settings, setSettings] = useState<AdminSettings>(DEFAULT_SETTINGS);
   const [isLoading, setIsLoading] = useState(true);
   const [isSaving, setIsSaving] = useState(false);
   const [resumeFileTr, setResumeFileTr] = useState<File | null>(null);
   const [resumeFileEn, setResumeFileEn] = useState<File | null>(null);

   // For adding new social link keys
   const [newSocialKey, setNewSocialKey] = useState('');
   const [newSocialValue, setNewSocialValue] = useState('');

   useEffect(() => { fetchSettings(); }, []);

   const fetchSettings = async () => {
      try {
         const docRef = doc(db, 'settings', 'profile');
         const snapshot = await getDoc(docRef);
         if (snapshot.exists()) {
            setSettings({ ...DEFAULT_SETTINGS, ...snapshot.data() } as AdminSettings);
         }
      } catch (error) {
         toast.error('Ayarlar yüklenirken hata oluştu.');
         console.error(error);
      } finally {
         setIsLoading(false);
      }
   };

   const handleSave = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSaving(true);
      const loadingToast = toast.loading('Ayarlar kaydediliyor...');

      try {
         let resumeUrlTr = settings.resumePdfUrlTr || settings.resumePdfUrl || '';
         let resumeUrlEn = settings.resumePdfUrlEn || settings.resumePdfUrl || '';

         // Upload new TR CV file if selected
         if (resumeFileTr) {
            const storageRef = ref(storage, `settings/resume_tr_${Date.now()}_${resumeFileTr.name}`);
            const snapshot = await uploadBytes(storageRef, resumeFileTr);
            resumeUrlTr = await getDownloadURL(snapshot.ref);
         }

         // Upload new EN CV file if selected
         if (resumeFileEn) {
            const storageRef = ref(storage, `settings/resume_en_${Date.now()}_${resumeFileEn.name}`);
            const snapshot = await uploadBytes(storageRef, resumeFileEn);
            resumeUrlEn = await getDownloadURL(snapshot.ref);
         }

         const data: AdminSettings = {
            ...settings,
            resumePdfUrlTr: resumeUrlTr,
            resumePdfUrlEn: resumeUrlEn,
         };

         await setDoc(doc(db, 'settings', 'profile'), data);
         toast.success('Ayarlar başarıyla kaydedildi!', { id: loadingToast });
         setResumeFileTr(null);
         setResumeFileEn(null);
         setSettings(data);
      } catch (error) {
         console.error(error);
         toast.error('Kaydedilemedi.', { id: loadingToast });
      } finally {
         setIsSaving(false);
      }
   };

   const addSocialLink = () => {
      if (!newSocialKey.trim()) return;
      setSettings({
         ...settings,
         socialLinks: {
            ...settings.socialLinks,
            [newSocialKey.trim().toLowerCase()]: newSocialValue.trim(),
         },
      });
      setNewSocialKey('');
      setNewSocialValue('');
   };

   const removeSocialLink = (key: string) => {
      const updated = { ...settings.socialLinks };
      delete updated[key];
      setSettings({ ...settings, socialLinks: updated });
   };

   if (isLoading) return <div className="text-white">Yükleniyor...</div>;

   return (
      <div className="space-y-6">
         <div>
            <h2 className="text-3xl font-black text-white mb-2">Profil Ayarları</h2>
            <p className="text-gray-400">Genel iletişim bilgilerinizi ve özgeçmiş dosyanızı buradan yönetebilirsiniz.</p>
         </div>

         <form onSubmit={handleSave} className="space-y-6">
            {/* Contact Email */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
               <h3 className="text-lg font-bold text-white mb-4">İletişim Bilgileri</h3>
               <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">İletişim E-postası</label>
                  <input
                     type="email"
                     value={settings.contactEmail}
                     onChange={e => setSettings({ ...settings, contactEmail: e.target.value })}
                     placeholder="ornek@email.com"
                     className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white"
                  />
               </div>
            </div>

            {/* Resume / CV (TR & EN) */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
               <h3 className="text-lg font-bold text-white">Özgeçmiş (CV) Dosyaları</h3>

               {/* TR CV */}
               <div>
                  <h4 className="text-sm font-bold text-gray-300 mb-2">Türkçe CV</h4>
                  {(settings.resumePdfUrlTr || settings.resumePdfUrl) && (
                     <div className="flex items-center gap-3 mb-4 text-sm">
                        <span className="text-gray-400">Mevcut TR CV:</span>
                        <a href={settings.resumePdfUrlTr || settings.resumePdfUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline truncate max-w-xs">
                           {(settings.resumePdfUrlTr || settings.resumePdfUrl)?.split('/').pop()?.split('?')[0] || 'TR CV Dosyası'}
                        </a>
                     </div>
                  )}
                  <input
                     type="file"
                     accept=".pdf,.doc,.docx"
                     onChange={e => { if (e.target.files?.[0]) setResumeFileTr(e.target.files[0]); }}
                     className="text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-purple-600/20 file:text-purple-400 hover:file:bg-purple-600/30 w-full"
                  />
                  {resumeFileTr && <p className="text-xs text-gray-500 mt-2">Yeni dosya seçildi: {resumeFileTr.name}</p>}
               </div>

               <div className="w-full h-px bg-white/10"></div>

               {/* EN CV */}
               <div>
                  <h4 className="text-sm font-bold text-gray-300 mb-2">İngilizce CV</h4>
                  {(settings.resumePdfUrlEn || settings.resumePdfUrl) && (
                     <div className="flex items-center gap-3 mb-4 text-sm">
                        <span className="text-gray-400">Mevcut EN CV:</span>
                        <a href={settings.resumePdfUrlEn || settings.resumePdfUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline truncate max-w-xs">
                           {(settings.resumePdfUrlEn || settings.resumePdfUrl)?.split('/').pop()?.split('?')[0] || 'EN CV Dosyası'}
                        </a>
                     </div>
                  )}
                  <input
                     type="file"
                     accept=".pdf,.doc,.docx"
                     onChange={e => { if (e.target.files?.[0]) setResumeFileEn(e.target.files[0]); }}
                     className="text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-purple-600/20 file:text-purple-400 hover:file:bg-purple-600/30 w-full"
                  />
                  {resumeFileEn && <p className="text-xs text-gray-500 mt-2">Yeni dosya seçildi: {resumeFileEn.name}</p>}
               </div>
            </div>

            {/* Social Links */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
               <h3 className="text-lg font-bold text-white mb-4">Sosyal Medya Bağlantıları</h3>

               <div className="space-y-3 mb-6">
                  {Object.entries(settings.socialLinks).map(([key, value]) => (
                     <div key={key} className="flex items-center gap-3">
                        <span className="text-sm font-bold text-purple-400 capitalize min-w-[80px]">{key}</span>
                        <input
                           type="text"
                           value={value}
                           onChange={e => setSettings({
                              ...settings,
                              socialLinks: { ...settings.socialLinks, [key]: e.target.value },
                           })}
                           className="flex-1 px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm"
                        />
                        <button
                           type="button"
                           onClick={() => removeSocialLink(key)}
                           className="p-2 text-red-400 hover:text-white bg-red-500/10 rounded-lg hover:bg-red-500 transition-colors text-xs"
                        >
                           Kaldır
                        </button>
                     </div>
                  ))}
               </div>

               {/* Add new social link */}
               <div className="flex items-end gap-3 pt-4 border-t border-white/5">
                  <div className="flex-1">
                     <label className="block text-xs font-bold text-gray-400 mb-1">Platform Adı</label>
                     <input type="text" placeholder="twitter" value={newSocialKey} onChange={e => setNewSocialKey(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm" />
                  </div>
                  <div className="flex-[2]">
                     <label className="block text-xs font-bold text-gray-400 mb-1">URL</label>
                     <input type="text" placeholder="https://twitter.com/..." value={newSocialValue} onChange={e => setNewSocialValue(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm" />
                  </div>
                  <button type="button" onClick={addSocialLink} className="px-4 py-2 bg-purple-600/20 text-purple-400 font-bold rounded-lg hover:bg-purple-600/30 transition-colors text-sm whitespace-nowrap">
                     + Ekle
                  </button>
               </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
               <button type="submit" disabled={isSaving} className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg disabled:opacity-50 transition-all hover:-translate-y-0.5">
                  {isSaving ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
               </button>
            </div>
         </form>
      </div>
   );
};

export default AdminSettingsPage;
