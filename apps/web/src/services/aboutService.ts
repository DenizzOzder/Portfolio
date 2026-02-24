import type { AboutRowItem } from '@/types';

// Onerilen "satır satır" zig-zag mimarisi için mock data
export const aboutRows: AboutRowItem[] = [
  {
    id: 'row-1',
    order: 1,
    title: 'Ben Kimim?',
    content: "Merhaba! Ben modern web teknolojilerine tutkuyla bağlı bir yazılım geliştiricisiyim. Kodlamaya olan yolculuğum, çocukluğumda bilgisayar oyunlarına duyduğum meraktan başladı ve bugün karmaşık algoritmaları çözerek gerçek dünya problemlerine çözümler üreten bir kariyere dönüştü. Sürekli öğrenme ve kendini geliştirme vizyonumla Frontend ağırlıklı başladığım yolculuğuma artık bir Full-Stack Developer olarak devam ediyorum.",
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop', // Portre türü kodlayan biri
    imagePosition: 'left'
  },
  {
    id: 'row-2',
    order: 2,
    title: 'Teknoloji Felsefem',
    content: "Bir projenin sadece 'çalışıyor' olması benim için yeterli değildir. Temiz kod prensipleri (Clean Code), SOLID ve test edilebilir mimariler üzerine kurduğum sistemlerin arkasında yatan düşünce; kodun sadece bugün değil, yıllar sonra da başka geliştiriciler tarafından okunabilir ve genişletilebilir olmasıdır. Modern dünyada aradığım tek bir şey var: Optimum Performans ve Kusursuz Kullanıcı Deneyimi.",
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop', // Kodlama ekranı / Matris kodları
    imagePosition: 'right'
  },
  {
    id: 'row-3',
    order: 3,
    title: 'Hobilerim ve İlgi Alanlarım',
    content: "Sadece kod yazmakla yetinmiyorum! Ekrandan uzaklaştığım zamanlarda bilim kurgu romanları okumayı, strateji türü masa kutu oyunları (board games) oynamayı ve kahve eşliğinde yeni teknolojiler hakkında araştırmalar yapmayı seviyorum. Farklı perspektifler kazanmak için disiplinler arası düşüncenin kritik bir önem taşıdığına inanıyorum.",
    imageUrl: 'https://images.unsplash.com/photo-1497935586351-d67a482f5fc6?q=80&w=1000&auto=format&fit=crop', // Kitap ve kahve, hobi ortamı
    imagePosition: 'left'
  }
];

export const getAboutData = async (): Promise<AboutRowItem[]> => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(aboutRows.sort((a, b) => a.order - b.order));
    }, 800); // 800ms wait
  });
};
