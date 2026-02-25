import type { ProjectCardProps } from '../types';

// Moved from featuredProjects.tsx
const MOCK_PROJECTS_DATA: ProjectCardProps[] = [
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

/**
 * Simulates fetching featured projects from a backend API.
 * This can easily be replaced with a real fetch call later.
 * 
 * @returns Promise resolving to an array of ProjectCardProps
 */
export const getFeaturedProjects = async (): Promise<ProjectCardProps[]> => {
  return new Promise((resolve) => {
    // Simulate network delay of 800ms
    setTimeout(() => {
      resolve(MOCK_PROJECTS_DATA);
    }, 800);
  });
};
