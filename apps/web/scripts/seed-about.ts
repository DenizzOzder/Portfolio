import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const MOCK_ABOUT = [
  {
    order: 1,
    title: 'Ben Kimim?',
    content: "Merhaba! Ben modern web teknolojilerine tutkuyla bağlı bir yazılım geliştiricisiyim. Kodlamaya olan yolculuğum, çocukluğumda bilgisayar oyunlarına duyduğum meraktan başladı ve bugün karmaşık algoritmaları çözerek gerçek dünya problemlerine çözümler üreten bir kariyere dönüştü. Sürekli öğrenme ve kendini geliştirme vizyonumla Frontend ağırlıklı başladığım yolculuğuma artık bir Full-Stack Developer olarak devam ediyorum.",
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop',
    imagePosition: 'left'
  },
  {
    order: 2,
    title: 'Teknoloji Felsefem',
    content: "Bir projenin sadece 'çalışıyor' olması benim için yeterli değildir. Temiz kod prensipleri (Clean Code), SOLID ve test edilebilir mimariler üzerine kurduğum sistemlerin arkasında yatan düşünce; kodun sadece bugün değil, yıllar sonra da başka geliştiriciler tarafından okunabilir ve genişletilebilir olmasıdır. Modern dünyada aradığım tek bir şey var: Optimum Performans ve Kusursuz Kullanıcı Deneyimi.",
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
    imagePosition: 'right'
  },
  {
    order: 3,
    title: 'Hobilerim ve İlgi Alanlarım',
    content: "Sadece kod yazmakla yetinmiyorum! Ekrandan uzaklaştığım zamanlarda bilim kurgu romanları okumayı, strateji türü masa kutu oyunları (board games) oynamayı ve kahve eşliğinde yeni teknolojiler hakkında araştırmalar yapmayı seviyorum. Farklı perspektifler kazanmak için disiplinler arası düşüncenin kritik bir önem taşıdığına inanıyorum.",
    imageUrl: 'https://images.unsplash.com/photo-1497935586351-d67a482f5fc6?q=80&w=1000&auto=format&fit=crop',
    imagePosition: 'left'
  }
];

async function seedAbout() {
  console.log('--- Seeding About sections to Firestore ---');
  const aboutCol = collection(db, 'about');
  for (const row of MOCK_ABOUT) {
    const ref = doc(aboutCol);
    await setDoc(ref, row);
    console.log(`✅ Uploaded: ${row.title}`);
  }
  console.log('🎉 Done! All about sections seeded.');
  process.exit(0);
}

seedAbout().catch(err => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
