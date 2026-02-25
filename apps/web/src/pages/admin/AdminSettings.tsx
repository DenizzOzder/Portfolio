import React from 'react';

const AdminSettings: React.FC = () => {
   return (
      <div className="space-y-6">
         <div>
            <h2 className="text-3xl font-black text-white mb-2">Profil Ayarları</h2>
            <p className="text-gray-400">Genel iletişim bilgilerinizi ve özgeçmiş dosyanızı buradan yönetebilirsiniz.</p>
         </div>
         
         <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-gray-400 text-sm">Ayarlar formu yakında buraya eklenecektir.</p>
         </div>
      </div>
   );
};

export default AdminSettings;
