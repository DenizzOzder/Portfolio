import type { ProjectCardProps } from '../types';

// Orijinal özelliklerin bir kısmını kullanarak Sertifika özellikleri oluşturacağız
const mockCertificates: ProjectCardProps[] = [
  {
    title: 'React Native Geliştirici C Bootcamp',
    description: 'React Native, Expo, Redux Toolkit, Firebase ve React Navigation gibi teknolojileri kapsayan kapsamlı bir mobil geliştirme bootcamp.',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop', // Mock foto, user will replace
    techStacks: ['React Native', 'Firebase'],
    projectUrl: 'https://example.com/certificate/1',
    actionLabel: 'Sertifikayı İncele \u2192',
    status: 'completed',
    role: 'Patika.dev', // Kurum adı olarak kullanılıyor
    date: 'Ağustos 2023'
  },
  {
    title: 'Modern Web Geliştirme (MERN)',
    description: 'MongoDB, Express.js, React ve Node.js ile modern uçtan uca web projeleri geliştirme üzerine profesyonel sertifika programı.',
    imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop',
    techStacks: ['MongoDB', 'Express', 'React', 'Node.js'],
    projectUrl: 'https://example.com/certificate/2',
    actionLabel: 'Programa Git \u2192',
    status: 'in-progress',
    role: 'Udemy',
    date: 'Devam Ediyor'
  },
  {
    title: 'İleri Seviye TypeScript',
    description: 'Solid prensipleri, Design Patterns, Generic tipler ve ileri düzey mimari yaklaşımları içeren kapsamlı TypeScript programı.',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
    techStacks: ['TypeScript'],
    projectUrl: '',
    status: 'completed',
    role: 'Frontend Masters',
    date: 'Şubat 2024'
  },
  {
    title: 'Bulut Bilişim ve AWS Temelleri',
    description: 'S3, EC2, Lambda, DynamoDB gibi temel AWS servislerinin kullanımını ve serverless mimari temellerini öğreten eğitim.',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    techStacks: ['Amazon Web Services'],
    projectUrl: '#',
    actionLabel: 'Sertifikayı İncele \u2192',
    status: 'completed',
    role: 'Coursera',
    date: 'Ocak 2024'
  },
  {
    title: 'UI/UX Tasarım İlkeleri',
    description: 'Figma kullanımı, kullanıcı deneyimi araştırmaları ve modern arayüz tasarımı yöntemleri üzerine bir atölye.',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop',
    techStacks: ['Figma'],
    projectUrl: '#',
    actionLabel: 'Sertifikayı İncele \u2192',
    status: 'completed',
    role: 'Google',
    date: 'Mayıs 2023'
  }
];

export const getCertificates = async (): Promise<ProjectCardProps[]> => {
  // Gelecekteki network gecikmesini simüle ediyoruz
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCertificates);
    }, 500);
  });
};
