import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Gösterge Paneli</h1>
          <p className="text-gray-400">Genel sistem durumu ve son aktiviteler.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Yayındaki Projeler', count: 12, trend: '+2 bu ay', color: 'from-blue-500 to-blue-600' },
          { title: 'Eğitim / Sertifika', count: 8, trend: 'Sürekli Güncel', color: 'from-purple-500 to-purple-600' },
          { title: 'Kariyer Geçmişi', count: 4, trend: '2 Yıldır', color: 'from-pink-500 to-pink-600' },
          { title: 'Profil Ziyareti (Mock)', count: '1.2k', trend: '+15% bu ay', color: 'from-emerald-500 to-emerald-600' }
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors shadow-lg">
            <h3 className="text-gray-400 font-semibold mb-4">{stat.title}</h3>
            <div className="flex items-end gap-3">
              <span className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                {stat.count}
              </span>
              <span className="text-sm font-medium text-gray-500 mb-1">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-4">Hoş Geldiniz</h2>
        <p className="text-gray-300 leading-relaxed max-w-3xl">
          Bu yönetim paneli üzerinden portfolyo sitenizdeki verileri dinamik olarak yönetebilir, yeni projeler ekleyebilir ve kariyer geçmişinizi güncelleyebilirsiniz. Sol menüden işlem yapmak istediğiniz modülü seçin.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
