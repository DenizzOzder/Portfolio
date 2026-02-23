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
    tech: ['HTML/CSS', 'JavaScript', 'ReactJS', 'NodeJS', 'TypeScript', 'MongoDB', 'Git', 'GitHub'],
  },
  {
    id: 2,
    degree: 'Yıldız Teknik Üniversitesi',
    institution: 'Fizik Bölümü',
    date: '2022 - 2026',
    grade: '',
    status: 'Öğrenime Ara Verdim',
    tech: [],
  },
  {
    id: 3,
    degree: 'Ataşehir Adıgüzel Meslek Yüksekokulu',
    institution: 'Bilgisayar Programcılığı',
    date: '2018 - 2020',
    grade: 'Ortalama: 3.43',
    status: '%100 Burslu',
    tech: ['C++', 'SQL', 'Java', 'HTML', 'CSS', 'JS'],
  },
  {
    id: 4,
    degree: 'İbrahim Müteferrika Mesleki ve Teknik Anadolu Lisesi',
    institution: 'Bilişim Teknolojileri: Veritabanı Dalı',
    date: '2014 - 2018',
    grade: 'Ortalama: 80',
    status: '',
    tech: ['C#', 'SQL', 'PHP', 'HTML'],
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
