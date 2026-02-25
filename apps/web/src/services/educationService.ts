import type { EducationItem } from '@/types/education';

// Mock veri tabanı. Gelecekte Firebase/GraphQL üzerinden gelecek.
const mockEducationData: EducationItem[] = [
  {
    id: 1,
    institution: 'Go IT Turkey',
    degree: 'Fullstack Developer Eğitimi (Sertifikalı)',
    date: 'Kasım 2024 - Aralık 2025',
    grade: '',
    status: '',
    techStacks: ['HTML/CSS', 'JavaScript', 'ReactJS', 'NodeJS', 'TypeScript', 'MongoDB', 'Git', 'GitHub'],
    badges: [{ text: 'Tamamlandı', color: 'green' }],
    emphasizeSchool: false,
  },
  {
    id: 2,
    degree: 'Yıldız Teknik Üniversitesi',
    institution: 'Fizik Bölümü',
    date: '2022 - 2026',
    grade: '',
    status: 'Öğrenime Ara Verdim',
    techStacks: [],
    badges: [{ text: 'Öğrenime Ara Verdim', color: 'orange' }],
    emphasizeSchool: true,
  },
  {
    id: 3,
    degree: 'Ataşehir Adıgüzel Meslek Yüksekokulu',
    institution: 'Bilgisayar Programcılığı',
    date: '2018 - 2020',
    grade: 'Ortalama: 3.43',
    status: '%100 Burslu',
    techStacks: ['C++', 'SQL', 'Java', 'HTML', 'CSS', 'JS'],
    badges: [{ text: '%100 Burslu', color: 'blue' }],
    emphasizeSchool: true,
  },
  {
    id: 4,
    degree: 'İbrahim Müteferrika Mesleki ve Teknik Anadolu Lisesi',
    institution: 'Bilişim Teknolojileri: Veritabanı Dalı',
    date: '2014 - 2018',
    grade: 'Ortalama: 80',
    status: '',
    techStacks: ['C#', 'SQL', 'PHP', 'HTML'],
    emphasizeSchool: true,
  }
];

export const getEducationHistory = async (): Promise<EducationItem[]> => {
  // Gelecekteki network gecikmesini simüle ediyoruz
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockEducationData);
    }, 600);
  });
};
