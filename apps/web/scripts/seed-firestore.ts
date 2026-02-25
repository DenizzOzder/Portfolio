import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Mock Data Arrays
const MOCK_PROJECTS = [
  {
    id: 'e-commerce-platform',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with modern UI, secure payment integration, and a comprehensive admin dashboard for inventory management.',
    imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop',
    techStacks: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
    projectUrl: '#',
    status: 'completed',
    role: 'Full Stack Developer',
    date: '2023-08',
    content: "## Proje Özeti\nBu platform modern web standartlarına uygun, yüksek hızlı bir e-ticaret çözümüdür. Ölçeklenebilir mikroservis mimarisi ile tasarlanmıştır. \n### Öne Çıkan Özellikler\n- Sepet ve Sipariş yönetimi\n- Güvenli iyzico entegrasyonu\n- Admin paneli üzerinden anlık stok takibi\n- SEO uyumlu server-side rendering (SSR)",
    images: [
      'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=1000&auto=format&fit=crop'
    ]
  },
  {
    id: 'ai-dashboard',
    title: 'AI Dashboard Analyzer',
    description: 'An AI-powered dashboard that analyzes user data and provides actionable insights utilizing machine learning models backend by Python.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    techStacks: ['React', 'TypeScript', 'Firebase', 'Python'],
    projectUrl: '#',
    status: 'completed',
    role: 'Frontend Lead',
    date: '2024-01',
    content: "## Dashboard Mimarisi\nPython ile eğitilmiş makine öğrenimi modellerinin verilerini anlık olarak görselleştiren reaktif bir arayüz projesidir. Dev veri setlerini tarayıcı (browser) kilitlenmeden işlemek için Web Worker'lar kullanılmıştır.\n### Temel Yetkinlikler\n- Anomali tespiti uyarıları\n- Özelleştirilebilir grafik panelleri (Chart.js / D3)\n- Gerçek zamanlı (Real-time) veri akışı için WebSockets",
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=1000&auto=format&fit=crop'
    ]
  },
  {
    id: 'real-estate-app',
    title: 'Real Estate App',
    description: 'Mobile-first real estate application for listing, searching, and booking property viewings with integrated map support.',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop',
    techStacks: ['Next.js', 'PostgreSQL', 'Prisma'],
    projectUrl: '#',
    status: 'completed',
    role: 'Backend Developer',
    date: '2023-11',
    content: "## Kapsamlı Emlak Yönetimi\nKullanıcıların harita üzerinden ev arayabildiği, Next.js API katmanıyla desteklenen hızlı bir mobil-öncelikli SPA.\n### Teknik Zorluklar\n- Prisma ile kompleks coğrafi sorguların (PostGIS) optimizasyonu.\n- Performans kaybı olmadan binlerce pinin (marker) Google Maps haritasında gösterimi.",
    images: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop'
    ]
  },
  {
    id: 'fintech-management',
    title: 'Fintech Management',
    description: 'Secure financial management application allowing users to track expenses, set budgets, and monitor their financial health in real-time.',
    imageUrl: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1000&auto=format&fit=crop',
    techStacks: ['C#', 'SQL Server', 'Docker', 'Redis'],
    projectUrl: '#',
    status: 'in-progress',
    role: 'Software Architect',
    date: '2024-02'
  },
  {
     id: 'social-network-api',
     title: 'Social Network API',
     description: 'A highly scalable backend service for a social networking platform featuring real-time messaging, notifications, and feed generation.',
     imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop',
     techStacks: ['Go', 'Docker', 'Redis', 'GraphQL'],
     projectUrl: '#',
     status: 'in-progress',
     role: 'Backend Lead',
     date: '2023-05'
   },
   {
     id: 'legacy-cms-migration',
     title: 'Legacy CMS Migration',
     description: 'Migrating an outdated CMS to a modern headless architecture using Strapi and Next.js.',
     imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
     techStacks: ['Next.js', 'Node.js'],
     projectUrl: '#',
     status: 'completed',
     role: 'Consultant',
     date: '2022-10',
     content: "## Modernizasyon Süreci\nEski ve monolitik altyapıyı mikroservis yapısına geçirerek içerik yönetimini (CMS) hızlandıran ve dışa bağımlılığı (Headless) ayrıştıran B2B bir göç projesi.\n### Kazanımlar\n- Sayfa hızlarında (Core Web Vitals) %45 oranında artış.\n- Yeni sistemin Strapi üzerinden esnek API uçları ile yönetilmesi.",
     images: [
       'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
       'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1000&auto=format&fit=crop',
       'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop'
     ]
   }
];

const MOCK_EDUCATION = [
  {
    institution: 'Go IT Turkey',
    degree: 'Fullstack Developer Eğitimi (Sertifikalı)',
    date: 'Kasım 2024 - Aralık 2025',
    grade: '',
    status: '',
    techStacks: ['HTML/CSS', 'JavaScript', 'ReactJS', 'NodeJS', 'TypeScript', 'MongoDB', 'Git', 'GitHub'],
    badges: [{ text: 'Tamamlandı', color: 'green' }],
    emphasizeSchool: false,
    sortOrder: 1
  },
  {
    degree: 'Yıldız Teknik Üniversitesi',
    institution: 'Fizik Bölümü',
    date: '2022 - 2026',
    grade: '',
    status: 'Öğrenime Ara Verdim',
    techStacks: [],
    badges: [{ text: 'Öğrenime Ara Verdim', color: 'orange' }],
    emphasizeSchool: true,
    sortOrder: 2
  },
  {
    degree: 'Ataşehir Adıgüzel Meslek Yüksekokulu',
    institution: 'Bilgisayar Programcılığı',
    date: '2018 - 2020',
    grade: 'Ortalama: 3.43',
    status: '%100 Burslu',
    techStacks: ['C++', 'SQL', 'Java', 'HTML', 'CSS', 'JS'],
    badges: [{ text: '%100 Burslu', color: 'blue' }],
    emphasizeSchool: true,
    sortOrder: 3
  },
  {
    degree: 'İbrahim Müteferrika Mesleki ve Teknik Anadolu Lisesi',
    institution: 'Bilişim Teknolojileri: Veritabanı Dalı',
    date: '2014 - 2018',
    grade: 'Ortalama: 80',
    status: '',
    techStacks: ['C#', 'SQL', 'PHP', 'HTML'],
    emphasizeSchool: true,
    sortOrder: 4
  }
];

const MOCK_CAREERS = [
  {
    title: 'Backend Developer',
    company: 'Bimakas',
    date: '2026 – Present',
    description: `TypeScript tabanlı Layered Architecture (Katmanlı Mimari: GraphQL Resolvers → Services → Repositories → Firebase) yapısında görev alıyor, sistemin geneline yeni feature'lar geliştiriyor ve servislerin optimizasyonunu sağlıyorum. Firebase üzerine kurgulanmış, güçlü ve ölçeklenebilir altyapıda modüller tasarlayarak süreçleri hızlandırıyorum. Görev aldığım ilk günden itibaren sorumluluklarımı production-ready standartlarda teslim ediyor; TypeScript ekosistemine hızlı adaptasyonumla aktif geliştirme döngüsüne değer katıyorum.`,
    techStacks: [
      'Katmanlı Mimari (GraphQL Resolvers → Services → Repositories → Firebase)',
      'TypeScript',
      'Firebase',
      'GraphQL'
    ],
    sortOrder: 1
  },
  {
    title: 'System Administrator',
    company: '',
    date: '2022 – Present',
    description: `Sistem operasyonlarının devamlılığını sağlarken yazılım ekibiyle dirsek teması halinde çalışıyor, bug triage ve haftalık teknik raporlama süreçlerini uçtan uca yönetiyorum. Kritik sistemsel düzeydeki hataları henüz kullanıcıya yansımadan tespit ederek geliştirme ekiplerine iletiyor ve çözüm adımlarını yakından takip ediyorum. Hem teknik analiz hem de kriz anlarındaki problem çözme süreçlerinde inisiyatif alarak sistem kararlılığını artırıyorum.`,
    techStacks: [
      'HTML/CSS'
    ],
    sortOrder: 2
  }
];

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

export async function uploadMocksToFirestore() {
  console.log('--- Seeding Projects ---');
  for (const project of MOCK_PROJECTS) {
    const { id, ...data } = project;
    const ref = doc(db, 'projects', id);
    await setDoc(ref, data);
    console.log(`Uploaded Project: ${id}`);
  }

  console.log('--- Seeding Education ---');
  const educationCol = collection(db, 'education');
  for (const edu of MOCK_EDUCATION) {
    const ref = doc(educationCol);
    await setDoc(ref, edu);
    console.log(`Uploaded Education: ${edu.degree}`);
  }

  console.log('--- Seeding Careers ---');
  const careerCol = collection(db, 'careers');
  for (const career of MOCK_CAREERS) {
    const ref = doc(careerCol);
    await setDoc(ref, career);
    console.log(`Uploaded Career: ${career.title}`);
  }

  console.log('--- Seeding Certificates ---');
  const certCol = collection(db, 'certificates');
  for (const cert of MOCK_CERTIFICATES) {
    const ref = doc(certCol);
    await setDoc(ref, cert);
    console.log(`Uploaded Certificate: ${cert.title}`);
  }

  console.log('✅ COMPLETE: Firestore Mock Data Seeding');
}
