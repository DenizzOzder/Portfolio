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

const MOCK_CERTIFICATES = [
  {
    title: 'React Native Geliştirici Bootcamp',
    issuer: 'Patika.dev',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop',
    hoverDescription: 'React Native, Expo, Redux Toolkit, Firebase ve React Navigation gibi teknolojileri kapsayan kapsamlı bir mobil geliştirme bootcamp.',
    techStacks: ['React Native', 'Firebase'],
  },
  {
    title: 'Modern Web Geliştirme (MERN)',
    issuer: 'Udemy',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop',
    hoverDescription: 'MongoDB, Express.js, React ve Node.js ile modern uçtan uca web projeleri geliştirme üzerine profesyonel sertifika programı.',
    techStacks: ['MongoDB', 'Express', 'React', 'Node.js'],
  },
  {
    title: 'İleri Seviye TypeScript',
    issuer: 'Frontend Masters',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
    hoverDescription: 'Solid prensipleri, Design Patterns, Generic tipler ve ileri düzey mimari yaklaşımları içeren kapsamlı TypeScript programı.',
    techStacks: ['TypeScript'],
  },
  {
    title: 'Bulut Bilişim ve AWS Temelleri',
    issuer: 'Coursera',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    hoverDescription: 'S3, EC2, Lambda, DynamoDB gibi temel AWS servislerinin kullanımını ve serverless mimari temellerini öğreten eğitim.',
    techStacks: ['Amazon Web Services'],
  },
  {
    title: 'UI/UX Tasarım İlkeleri',
    issuer: 'Google',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop',
    hoverDescription: 'Figma kullanımı, kullanıcı deneyimi araştırmaları ve modern arayüz tasarımı yöntemleri üzerine bir atölye.',
    techStacks: ['Figma'],
  }
];

async function seedCertificates() {
  console.log('--- Seeding Certificates to Firestore ---');
  const certCol = collection(db, 'certificates');
  for (const cert of MOCK_CERTIFICATES) {
    const ref = doc(certCol);
    await setDoc(ref, cert);
    console.log(`✅ Uploaded: ${cert.title}`);
  }
  console.log('🎉 Done! All certificates seeded.');
  process.exit(0);
}

seedCertificates().catch(err => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
