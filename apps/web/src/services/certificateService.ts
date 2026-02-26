import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { ProjectCardProps } from '../types';

export const getCertificates = async (): Promise<ProjectCardProps[]> => {
  try {
    const snapshot = await getDocs(collection(db, 'certificates'));
    if (snapshot.empty) return [];

    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || '',
        title_en: data.title_en || '',
        description: data.hoverDescription || '',
        description_en: data.hoverDescription_en || '',
        imageUrl: data.image || '',
        techStacks: data.techStacks || [],
        role: data.issuer || '',
        role_en: data.issuer_en || '',
        status: 'completed', // Sertifikaları "tamamlandı" olarak varsayalım
      } as ProjectCardProps;
    });
  } catch (error) {
    console.error('Error fetching certificates from Firestore:', error);
    return [];
  }
};
