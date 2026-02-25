import React from 'react';

const AdminEducation: React.FC = () => {
   return (
      <div className="space-y-6">
         <div className="flex justify-between items-center">
            <div>
               <h2 className="text-3xl font-black text-white mb-2">Eğitim Geçmişi</h2>
               <p className="text-gray-400">Okul, üniversite ve eğitim programlarını buradan yönetebilirsiniz.</p>
            </div>
            <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:-translate-y-0.5 transition-all">
               Yeni Eğitim Ekle
            </button>
         </div>
         
         <div className="bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[400px] flex items-center justify-center">
            <div className="text-center">
               <p className="text-gray-400">Henüz eğitim bilgisi eklenmemiş.</p>
            </div>
         </div>
      </div>
   );
};

export default AdminEducation;
