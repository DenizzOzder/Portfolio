import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import toast from 'react-hot-toast';

interface StatCard {
  title: string;
  count: number;
  color: string;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<StatCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [projectsSnap, educationSnap, careersSnap, certificatesSnap] = await Promise.all([
        getDocs(collection(db, 'projects')),
        getDocs(collection(db, 'education')),
        getDocs(collection(db, 'careers')),
        getDocs(collection(db, 'certificates')),
      ]);

      setStats([
        { title: 'Yayındaki Projeler', count: projectsSnap.size, color: 'from-blue-500 to-blue-600' },
        { title: 'Eğitim Geçmişi', count: educationSnap.size, color: 'from-purple-500 to-purple-600' },
        { title: 'Kariyer Deneyimi', count: careersSnap.size, color: 'from-pink-500 to-pink-600' },
        { title: 'Sertifikalar', count: certificatesSnap.size, color: 'from-emerald-500 to-emerald-600' },
      ]);
    } catch (error) {
      console.error(error);
      toast.error('İstatistikler yüklenirken hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Gösterge Paneli</h1>
          <p className="text-gray-400">Genel sistem durumu ve son aktiviteler.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl animate-pulse">
              <div className="h-4 bg-white/10 rounded w-2/3 mb-4" />
              <div className="h-10 bg-white/10 rounded w-1/3" />
            </div>
          ))
        ) : (
          stats.map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors shadow-lg">
              <h3 className="text-gray-400 font-semibold mb-4">{stat.title}</h3>
              <div className="flex items-end gap-3">
                <span className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                  {stat.count}
                </span>
                <span className="text-sm font-medium text-gray-500 mb-1">kayıt</span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-4">Hoş Geldiniz</h2>
        <p className="text-gray-300 leading-relaxed max-w-3xl mb-8">
          Bu yönetim paneli üzerinden portfolyo sitenizdeki verileri dinamik olarak yönetebilir, yeni projeler ekleyebilir ve kariyer geçmişinizi güncelleyebilirsiniz. Sol menüden işlem yapmak istediğiniz modülü seçin.
        </p>

        {/* Development Seed Data Button */}
        <div className="p-6 border border-white/20 bg-black/20 rounded-xl max-w-xl">
          <h3 className="text-lg font-bold text-white mb-2">Veritabanını Doldur (Geliştirici)</h3>
          <p className="text-gray-400 text-sm mb-4">Eski statik mock verileri (Proje, Kariyer, Eğitim, Sertifika) Firestore veritabanına otomatik yüklemek için bu butonu kullanabilirsiniz.</p>
          <button 
            onClick={async () => {
              try {
                const toastId = toast.loading('Veriler Firestore\'a yükleniyor...');
                const { uploadMocksToFirestore } = await import('../../../scripts/seed-firestore');
                await uploadMocksToFirestore();
                toast.success('Tüm mock veriler başarıyla Firestore\'a yüklendi!', { id: toastId });
                fetchStats(); // Refresh stats after seeding
              } catch (error) {
                console.error(error);
                toast.error('Veri yükleme sırasında bir hata oluştu.');
              }
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl shadow-lg hover:-translate-y-0.5 transition-all"
          >
            Mock Verileri Yükle
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
