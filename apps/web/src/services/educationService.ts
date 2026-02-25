

import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { EducationItem } from '@/types/education';

export const getEducationHistory = async (): Promise<EducationItem[]> => {
  try {
    const educationRef = collection(db, 'education');
    const q = query(educationRef, orderBy('sortOrder', 'asc'));
    
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      console.log('No education found in Firestore.');
      return [];
    }

    const education: EducationItem[] = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        institution: data.institution || '',
        degree: data.degree || '',
        date: data.date || '',
        grade: data.grade || '',
        status: data.status || '',
        techStacks: data.techStacks || [],
        badges: data.badges || [],
        emphasizeSchool: data.emphasizeSchool || false,
        sortOrder: data.sortOrder || 0,
      } as EducationItem;
    });

    return education;
  } catch (error) {
    console.error("Error fetching education from Firestore:", error);
    return [];
  }
};
