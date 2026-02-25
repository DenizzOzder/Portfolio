import React from 'react';

const AdminCertificates: React.FC = () => {
   return (
      <div className="space-y-6">
         <div className="flex justify-between items-center">
            <div>
               <h2 className="text-3xl font-black text-white mb-2">Sertifikalar</h2>
               <p className="text-gray-400">Aldığınız sertifikaları veya ödülleri buradan sergileyebilirsiniz.</p>
            </div>
            <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:-translate-y-0.5 transition-all">
               Yeni Sertifika Ekle
            </button>
         </div>
         
         <div className="bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[400px] flex items-center justify-center">
            <div className="text-center">
               <p className="text-gray-400">Henüz sertifika eklenmemiş.</p>
            </div>
         </div>
      </div>
   );
};

export default AdminCertificates;
